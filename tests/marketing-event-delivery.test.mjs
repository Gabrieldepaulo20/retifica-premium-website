import assert from "node:assert/strict";
import test from "node:test";

import {
  classifyMarketingDelivery,
  classifyMarketingNetworkFailure,
  deduplicateQueueByEventId,
  downstreamFailureStatus,
  isRetryableMarketingStatus,
  marketingRetryDelayMs,
  MARKETING_EVENT_MAX_ATTEMPTS,
  parseRetryAfterMs,
  queueAfterInitialFailure,
  rescheduleAfterFailure,
  retryMarketingDelivery,
} from "../src/lib/marketing-event-delivery.ts";

function response(status, overrides = {}) {
  return classifyMarketingDelivery({
    status,
    responseOk: status >= 200 && status < 300,
    bodyOk: false,
    storageSaved: false,
    ...overrides,
  });
}

test("evento válido só é entregue após confirmação de storage", () => {
  assert.deepEqual(
    response(200, { bodyOk: true, storageSaved: true }),
    {
      delivered: true,
      retryable: false,
      status: 200,
      reason: "stored",
    }
  );
  assert.equal(response(202).delivered, false);
  assert.equal(response(202).retryable, false);
  assert.equal(response(202).reason, "unconfirmed_2xx");
});

test("400 e erros permanentes preservam status e não entram em retry", () => {
  for (const status of [400, 401, 403, 404, 409, 413, 422]) {
    const delivery = response(status);
    assert.equal(delivery.status, status);
    assert.equal(delivery.retryable, false);
    assert.equal(delivery.reason, "permanent_http");
    assert.equal(
      downstreamFailureStatus({ configured: true, saved: false, status }),
      status
    );
  }
  assert.equal(
    downstreamFailureStatus({ configured: false, saved: false }),
    503
  );
});

test("apenas 408, 429 e 5xx são HTTP retryable", () => {
  for (const status of [408, 429, 500, 502, 503, 504]) {
    const delivery = response(status);
    assert.equal(delivery.retryable, true);
    assert.equal(delivery.reason, "transient_http");
  }
  for (const status of [
    200, 201, 202, 204, 301, 400, 401, 403, 404, 409, 413, 422,
  ]) {
    assert.equal(response(status).retryable, false);
  }
});

test("falha de rede é retryable e Retry-After é respeitado", () => {
  assert.equal(classifyMarketingNetworkFailure().retryable, true);
  assert.equal(parseRetryAfterMs("12"), 12_000);

  const now = Date.parse("2026-08-19T12:00:00Z");
  assert.equal(
    parseRetryAfterMs("Wed, 19 Aug 2026 12:01:00 GMT", now),
    60_000
  );
  assert.equal(
    response(429, { retryAfter: "12", now }).retryAfterMs,
    12_000
  );
});

test("backoff exponencial tem jitter limitado", () => {
  assert.equal(marketingRetryDelayMs(1, undefined, () => 0), 1_000);
  assert.equal(marketingRetryDelayMs(2, undefined, () => 0), 2_000);
  assert.equal(marketingRetryDelayMs(3, undefined, () => 1), 5_000);
  assert.equal(marketingRetryDelayMs(1, 17_000, () => 0), 17_000);
});

test("retry é limitado e o esgotamento fica distinguível", () => {
  const payload = { eventId: "evt-1", eventType: "page_view" };
  const failure = classifyMarketingNetworkFailure();
  const queued = queueAfterInitialFailure(payload, failure, 1_000, () => 0);
  assert.ok(queued);
  assert.equal(queued.attempts, 1);

  let entry = queued;
  for (let attempts = 2; attempts < MARKETING_EVENT_MAX_ATTEMPTS; attempts += 1) {
    const result = rescheduleAfterFailure(entry, failure, 2_000, () => 0);
    if (attempts === MARKETING_EVENT_MAX_ATTEMPTS - 1) {
      assert.equal(result.state, "retry_scheduled");
    }
    if (result.state === "retry_scheduled") entry = result.entry;
  }

  const exhausted = rescheduleAfterFailure(entry, failure, 3_000, () => 0);
  assert.equal(exhausted.state, "exhausted");
});

test("eventId estável impede duplicidade na fila", () => {
  const first = {
    queuedAt: 1,
    attempts: 1,
    nextAttemptAt: 2,
    payload: { eventId: "same", eventType: "page_view" },
  };
  const newest = { ...first, queuedAt: 3, attempts: 2 };
  const unique = deduplicateQueueByEventId([first, newest]);
  assert.equal(unique.length, 1);
  assert.equal(unique[0].queuedAt, 3);
  assert.equal(unique[0].attempts, 2);
});

test("retry interativo não chama novamente em falha permanente", async () => {
  let calls = 0;
  const result = await retryMarketingDelivery(
    response(400),
    async () => {
      calls += 1;
      return { delivery: response(200) };
    },
    { sleep: async () => undefined }
  );

  assert.equal(isRetryableMarketingStatus(400), false);
  assert.equal(calls, 0);
  assert.equal(result.attempts, 1);
  assert.equal(result.delivery.reason, "permanent_http");
});

test("retry interativo limita transientes com backoff e jitter", async () => {
  let calls = 0;
  const delays = [];
  const result = await retryMarketingDelivery(
    response(503),
    async () => {
      calls += 1;
      return { delivery: classifyMarketingNetworkFailure() };
    },
    {
      sleep: async (delay) => {
        delays.push(delay);
      },
      random: () => 0,
    }
  );

  assert.equal(calls, 3);
  assert.equal(result.attempts, MARKETING_EVENT_MAX_ATTEMPTS);
  assert.deepEqual(delays, [1_000, 2_000, 4_000]);
  assert.equal(result.delivery.retryable, true);
});

test("retry interativo respeita Retry-After e para ao armazenar", async () => {
  const delays = [];
  const result = await retryMarketingDelivery(
    response(429, { retryAfter: "7" }),
    async () => ({
      value: "stored",
      delivery: response(200, { bodyOk: true, storageSaved: true }),
    }),
    {
      sleep: async (delay) => {
        delays.push(delay);
      },
    }
  );

  assert.deepEqual(delays, [7_000]);
  assert.equal(result.attempts, 2);
  assert.equal(result.value, "stored");
  assert.equal(result.delivery.delivered, true);
});

test("retry foreground não espera Retry-After além do orçamento", async () => {
  let calls = 0;
  const delays = [];
  const result = await retryMarketingDelivery(
    response(429, { retryAfter: "600" }),
    async () => {
      calls += 1;
      return { delivery: response(200) };
    },
    {
      maxAttempts: 2,
      maxWaitMs: 2_000,
      sleep: async (delay) => {
        delays.push(delay);
      },
    }
  );

  assert.equal(calls, 0);
  assert.equal(result.attempts, 1);
  assert.equal(result.retryStoppedReason, "wait_budget_exceeded");
  assert.deepEqual(delays, []);
});

test("retry foreground faz no máximo uma nova chamada em transiente curto", async () => {
  let calls = 0;
  const delays = [];
  const result = await retryMarketingDelivery(
    response(503),
    async () => {
      calls += 1;
      return { delivery: classifyMarketingNetworkFailure() };
    },
    {
      maxAttempts: 2,
      maxWaitMs: 2_000,
      sleep: async (delay) => {
        delays.push(delay);
      },
      random: () => 0,
    }
  );

  assert.equal(calls, 1);
  assert.equal(result.attempts, 2);
  assert.equal(result.retryStoppedReason, "attempt_limit");
  assert.deepEqual(delays, [1_000]);
});
