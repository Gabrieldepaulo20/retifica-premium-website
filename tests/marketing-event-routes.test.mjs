import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { POST as postContact } from "../src/app/api/contato/route.ts";
import { POST as postMarketingEvent } from "../src/app/api/marketing/event/route.ts";
import { isSupportedLeadCode } from "../src/lib/trackingEvents.ts";

const canonicalLeadCode = "RP-20260819-AB12CD34";
const canonicalEventId = "evt-route-abc123";

function request(path, body, client = "127.0.0.1") {
  return new Request(`http://localhost${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      origin: "http://localhost",
      "x-forwarded-for": client,
    },
    body: JSON.stringify(body),
  });
}

test("endpoint genérico rejeita eventos reservados ao formulário", async () => {
  for (const [index, eventType] of ["form_submit", "lead_created"].entries()) {
    const response = await postMarketingEvent(
      request(
        "/api/marketing/event",
        { eventType, eventId: canonicalEventId, leadCode: canonicalLeadCode },
        `127.0.0.${index + 2}`
      )
    );
    assert.equal(response.status, 400);
    assert.match((await response.json()).message, /reservado/i);
  }
});

test("endpoint genérico exige eventId estável e leadCode canônico", async () => {
  const missingEventId = await postMarketingEvent(
    request(
      "/api/marketing/event",
      { eventType: "page_view", leadCode: canonicalLeadCode },
      "127.0.0.10"
    )
  );
  assert.equal(missingEventId.status, 400);

  const legacyLeadCode = await postMarketingEvent(
    request(
      "/api/marketing/event",
      {
        eventType: "page_view",
        eventId: canonicalEventId,
        leadCode: "RP-2026-08-AB12CD34",
      },
      "127.0.0.11"
    )
  );
  assert.equal(legacyLeadCode.status, 400);
});

test("endpoint de contato também exige eventId e leadCode canônicos", async () => {
  const base = {
    nome: "Cliente Teste",
    telefone: "1630000000",
    assunto: "orcamento",
    mensagem: "Preciso avaliar o cabeçote.",
  };
  const missingEventId = await postContact(
    request(
      "/api/contato",
      { ...base, leadCode: canonicalLeadCode },
      "127.0.0.20"
    )
  );
  assert.equal(missingEventId.status, 400);

  const legacyLeadCode = await postContact(
    request(
      "/api/contato",
      {
        ...base,
        eventId: canonicalEventId,
        leadCode: "RP-20260819-AB12",
      },
      "127.0.0.21"
    )
  );
  assert.equal(legacyLeadCode.status, 400);
});

test("cliente invalida códigos legados para que o storage local regenere", () => {
  assert.equal(isSupportedLeadCode(canonicalLeadCode), true);
  assert.equal(isSupportedLeadCode("RP-2026-08-AB12CD34"), false);
  assert.equal(isSupportedLeadCode("RP-20260819-AB12"), false);
});

test("rotas não geram IDs no retry e metadata de contato leva mensagem, assunto e nível B2B ao Retiflow", async () => {
  const contactSource = await readFile(
    new URL("../src/app/api/contato/route.ts", import.meta.url),
    "utf8"
  );
  const genericSource = await readFile(
    new URL("../src/app/api/marketing/event/route.ts", import.meta.url),
    "utf8"
  );

  assert.doesNotMatch(contactSource, /randomUUID/);
  assert.doesNotMatch(genericSource, /randomUUID/);
  const metadataStart = contactSource.indexOf(
    "metadata: sanitizeMarketingEventMetadata"
  );
  const leadStart = contactSource.indexOf("lead:", metadataStart);
  assert.ok(metadataStart >= 0 && leadStart > metadataStart);
  const metadataSource = contactSource.slice(metadataStart, leadStart);
  assert.match(metadataSource, /mensagem: mensagem \|\| undefined/);
  assert.match(metadataSource, /assunto: assunto \|\| undefined/);
  assert.match(metadataSource, /nivel_b2b: b2bLevel \|\| undefined/);
});

test("rotas removem PII de IDs e paths antes de encaminhar ao Edge", async () => {
  const originalFetch = globalThis.fetch;
  const originalUrl = process.env.EXTERNAL_MARKETING_EVENTS_URL;
  const originalKey = process.env.EXTERNAL_MARKETING_SITE_KEY;
  const forwarded = [];
  process.env.EXTERNAL_MARKETING_EVENTS_URL = "https://edge.invalid/events";
  process.env.EXTERNAL_MARKETING_SITE_KEY = "test-site-key";
  globalThis.fetch = async (_url, init) => {
    forwarded.push(JSON.parse(String(init?.body)));
    return Response.json({ ok: true, eventId: canonicalEventId });
  };

  try {
    const genericResponse = await postMarketingEvent(
      request(
        "/api/marketing/event",
        {
          eventType: "page_view",
          eventId: canonicalEventId,
          leadCode: canonicalLeadCode,
          anonymousId: "11999999999",
          sessionId: "session com espaço",
          pagePath:
            "/telefone-%2531%2531%2539%2539%2539%2539%2539%2539%2539%2539%2539?utm=x#topo",
          pageLocation:
            "https://premiumretifica.com.br/cliente%2540example.com?utm=x#topo",
          gclid: "cliente%2540example.com",
          campaign: "cliente%2540example.com",
        },
        "127.0.0.30"
      )
    );
    assert.equal(genericResponse.status, 200);

    const contactResponse = await postContact(
      request(
        "/api/contato",
        {
          eventId: "evt-contact-abc123",
          leadCode: canonicalLeadCode,
          nome: "Cliente Teste",
          telefone: "1630000000",
          cidade: "Ribeirão Preto",
          assunto: "orcamento",
          mensagem: "Preciso avaliar o cabeçote.",
          storageOnly: true,
          measurementMode: "analytics",
          pageLocation:
            "https://premiumretifica.com.br/telefone-11999999999?utm=x#topo",
          attribution: {
            source: "11999999999 / 1630000000",
            campaign: "cliente%2540example.com",
            gclid: "cliente%40example.com",
          },
        },
        "127.0.0.31"
      )
    );
    assert.equal(contactResponse.status, 200);

    for (const [index, measurementMode] of [
      "advertising",
      "unknown",
    ].entries()) {
      const response = await postContact(
        request(
          "/api/contato",
          {
            eventId: `evt-contact-${measurementMode}`,
            leadCode: canonicalLeadCode,
            nome: "Cliente Teste",
            telefone: "1630000000",
            cidade: "Ribeirão Preto",
            assunto: "orcamento",
            mensagem: "Preciso avaliar o cabeçote.",
            storageOnly: true,
            measurementMode,
          },
          `127.0.0.${32 + index}`
        )
      );
      assert.equal(response.status, 200);
    }
  } finally {
    globalThis.fetch = originalFetch;
    if (originalUrl === undefined) delete process.env.EXTERNAL_MARKETING_EVENTS_URL;
    else process.env.EXTERNAL_MARKETING_EVENTS_URL = originalUrl;
    if (originalKey === undefined) delete process.env.EXTERNAL_MARKETING_SITE_KEY;
    else process.env.EXTERNAL_MARKETING_SITE_KEY = originalKey;
  }

  assert.equal(forwarded.length, 4);
  const [generic, analyticsContact, advertisingContact, unknownContact] =
    forwarded;
  assert.equal(generic.pagePath, "/");
  assert.equal(generic.pageLocation, "https://premiumretifica.com.br/");
  assert.equal(generic.gclid, undefined);
  assert.equal(generic.campaign, undefined);
  assert.equal(generic.anonymousId, undefined);
  assert.equal(generic.sessionId, undefined);

  assert.equal(analyticsContact.eventType, "form_submit");
  assert.equal(analyticsContact.pagePath, "/");
  assert.equal(
    analyticsContact.pageLocation,
    "https://premiumretifica.com.br/"
  );
  assert.equal(analyticsContact.gclid, undefined);
  assert.equal(analyticsContact.campaign, undefined);
  assert.equal(analyticsContact.source, "direto");
  assert.equal(analyticsContact.city, "Ribeirão Preto");
  assert.deepEqual(analyticsContact.metadata, {
    visitorCity: "Ribeirão Preto",
    measurementMode: "analytics",
    eventContractVersion: "marketing-events-v3",
    mensagem: "Preciso avaliar o cabeçote.",
    assunto: "Solicitar orçamento",
  });
  assert.deepEqual(analyticsContact.lead, {
    name: "Cliente Teste",
    phone: "1630000000",
  });
  assert.equal(advertisingContact.city, "Ribeirão Preto");
  assert.equal(advertisingContact.metadata.visitorCity, undefined);
  assert.equal(advertisingContact.metadata.measurementMode, "advertising");
  assert.equal(unknownContact.city, "Ribeirão Preto");
  assert.equal(unknownContact.metadata.visitorCity, undefined);
  assert.equal(unknownContact.metadata.measurementMode, undefined);
});

test("contato não repete falha permanente e preserva o status downstream", async () => {
  const originalFetch = globalThis.fetch;
  const originalUrl = process.env.EXTERNAL_MARKETING_EVENTS_URL;
  const originalKey = process.env.EXTERNAL_MARKETING_SITE_KEY;
  let calls = 0;
  process.env.EXTERNAL_MARKETING_EVENTS_URL = "https://edge.invalid/events";
  process.env.EXTERNAL_MARKETING_SITE_KEY = "test-site-key";
  globalThis.fetch = async () => {
    calls += 1;
    return Response.json({ ok: false }, { status: 400 });
  };

  try {
    const response = await postContact(
      request(
        "/api/contato",
        {
          eventId: "evt-contact-permanent-1",
          leadCode: canonicalLeadCode,
          nome: "Cliente Teste",
          telefone: "1630000000",
          assunto: "orcamento",
          mensagem: "Preciso avaliar o cabeçote.",
          storageOnly: true,
        },
        "127.0.0.40"
      )
    );
    const body = await response.json();

    assert.equal(response.status, 400);
    assert.equal(calls, 1);
    assert.equal(body.delivery.retiflowSaved, false);
    assert.equal(body.delivery.retiflowRetryable, false);
    assert.equal(body.delivery.retiflowStatus, 400);
  } finally {
    globalThis.fetch = originalFetch;
    if (originalUrl === undefined) delete process.env.EXTERNAL_MARKETING_EVENTS_URL;
    else process.env.EXTERNAL_MARKETING_EVENTS_URL = originalUrl;
    if (originalKey === undefined) delete process.env.EXTERNAL_MARKETING_SITE_KEY;
    else process.env.EXTERNAL_MARKETING_SITE_KEY = originalKey;
  }
});

test("contato não repete transiente no servidor e propaga Retry-After", async () => {
  const originalFetch = globalThis.fetch;
  const originalUrl = process.env.EXTERNAL_MARKETING_EVENTS_URL;
  const originalKey = process.env.EXTERNAL_MARKETING_SITE_KEY;
  let calls = 0;
  process.env.EXTERNAL_MARKETING_EVENTS_URL = "https://edge.invalid/events";
  process.env.EXTERNAL_MARKETING_SITE_KEY = "test-site-key";
  globalThis.fetch = async () => {
    calls += 1;
    return Response.json(
      { ok: false },
      { status: 503, headers: { "Retry-After": "9" } }
    );
  };

  try {
    const response = await postContact(
      request(
        "/api/contato",
        {
          eventId: "evt-contact-transient-1",
          leadCode: canonicalLeadCode,
          nome: "Cliente Teste",
          telefone: "1630000000",
          assunto: "orcamento",
          mensagem: "Preciso avaliar o cabeçote.",
          storageOnly: true,
        },
        "127.0.0.41"
      )
    );
    const body = await response.json();

    assert.equal(response.status, 503);
    assert.equal(response.headers.get("retry-after"), "9");
    assert.equal(calls, 1);
    assert.equal(body.delivery.retiflowSaved, false);
    assert.equal(body.delivery.retiflowRetryable, true);
    assert.equal(body.delivery.retiflowStatus, 503);
  } finally {
    globalThis.fetch = originalFetch;
    if (originalUrl === undefined) delete process.env.EXTERNAL_MARKETING_EVENTS_URL;
    else process.env.EXTERNAL_MARKETING_EVENTS_URL = originalUrl;
    if (originalKey === undefined) delete process.env.EXTERNAL_MARKETING_SITE_KEY;
    else process.env.EXTERNAL_MARKETING_SITE_KEY = originalKey;
  }
});
