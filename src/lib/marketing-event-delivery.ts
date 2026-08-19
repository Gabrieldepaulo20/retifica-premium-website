export const MARKETING_EVENT_MAX_ATTEMPTS = 4;
export const MARKETING_EVENT_RETRY_BASE_MS = 1_000;
export const MARKETING_EVENT_RETRY_MAX_MS = 60_000;

export type MarketingDelivery = {
  delivered: boolean;
  retryable: boolean;
  status?: number;
  retryAfterMs?: number;
  reason:
    | "stored"
    | "network"
    | "transient_http"
    | "permanent_http"
    | "unconfirmed_2xx";
};

export type RetryableQueueEntry<T> = {
  queuedAt: number;
  attempts: number;
  nextAttemptAt: number;
  lastStatus?: number;
  payload: T;
};

export function parseRetryAfterMs(
  value: string | null | undefined,
  now = Date.now()
) {
  if (!value) return undefined;

  const seconds = Number(value.trim());
  if (Number.isFinite(seconds) && seconds >= 0) {
    return Math.ceil(seconds * 1_000);
  }

  const date = Date.parse(value);
  if (!Number.isFinite(date)) return undefined;
  return Math.max(0, date - now);
}

export function classifyMarketingDelivery(args: {
  status: number;
  responseOk: boolean;
  bodyOk: boolean;
  storageSaved: boolean;
  retryAfter?: string | null;
  now?: number;
}): MarketingDelivery {
  if (args.responseOk && args.bodyOk && args.storageSaved) {
    return {
      delivered: true,
      retryable: false,
      status: args.status,
      reason: "stored",
    };
  }

  if (
    args.status === 408 ||
    args.status === 429 ||
    (args.status >= 500 && args.status <= 599)
  ) {
    return {
      delivered: false,
      retryable: true,
      status: args.status,
      retryAfterMs: parseRetryAfterMs(args.retryAfter, args.now),
      reason: "transient_http",
    };
  }

  return {
    delivered: false,
    retryable: false,
    status: args.status,
    reason:
      args.status >= 200 && args.status <= 299
        ? "unconfirmed_2xx"
        : "permanent_http",
  };
}

export function classifyMarketingNetworkFailure(): MarketingDelivery {
  return {
    delivered: false,
    retryable: true,
    reason: "network",
  };
}

export function marketingRetryDelayMs(
  attemptsAlreadyMade: number,
  retryAfterMs?: number,
  random = Math.random
) {
  if (retryAfterMs !== undefined) return Math.max(0, retryAfterMs);

  const exponent = Math.max(0, attemptsAlreadyMade - 1);
  const base = Math.min(
    MARKETING_EVENT_RETRY_MAX_MS,
    MARKETING_EVENT_RETRY_BASE_MS * 2 ** exponent
  );
  const jitter = Math.floor(base * 0.25 * Math.max(0, Math.min(1, random())));
  return base + jitter;
}

export function queueAfterInitialFailure<T>(
  payload: T,
  delivery: MarketingDelivery,
  now = Date.now(),
  random = Math.random
): RetryableQueueEntry<T> | null {
  if (!delivery.retryable) return null;
  return {
    queuedAt: now,
    attempts: 1,
    nextAttemptAt:
      now + marketingRetryDelayMs(1, delivery.retryAfterMs, random),
    lastStatus: delivery.status,
    payload,
  };
}

export function rescheduleAfterFailure<T>(
  entry: RetryableQueueEntry<T>,
  delivery: MarketingDelivery,
  now = Date.now(),
  random = Math.random
):
  | { state: "permanent" | "exhausted" }
  | { state: "retry_scheduled"; entry: RetryableQueueEntry<T> } {
  if (!delivery.retryable) return { state: "permanent" };

  const attempts = entry.attempts + 1;
  if (attempts >= MARKETING_EVENT_MAX_ATTEMPTS) {
    return { state: "exhausted" };
  }

  return {
    state: "retry_scheduled",
    entry: {
      ...entry,
      attempts,
      nextAttemptAt:
        now + marketingRetryDelayMs(attempts, delivery.retryAfterMs, random),
      lastStatus: delivery.status,
    },
  };
}

export function deduplicateQueueByEventId<
  T extends { payload: { eventId: string } },
>(entries: T[]) {
  const seen = new Set<string>();
  const deduplicated: T[] = [];

  for (let index = entries.length - 1; index >= 0; index -= 1) {
    const entry = entries[index];
    if (!entry || seen.has(entry.payload.eventId)) continue;
    seen.add(entry.payload.eventId);
    deduplicated.push(entry);
  }

  return deduplicated.reverse();
}

export function downstreamFailureStatus(storage: {
  configured: boolean;
  saved: boolean;
  status?: number;
}) {
  if (storage.saved) return 200;
  if (
    storage.configured &&
    storage.status !== undefined &&
    storage.status >= 200 &&
    storage.status <= 599
  ) {
    return storage.status;
  }
  return 503;
}
