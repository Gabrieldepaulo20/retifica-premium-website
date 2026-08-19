import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  containsHighConfidencePersonalData,
  isCanonicalMarketingLeadCode,
  isSiteTelemetryEndpointEventAllowed,
  MARKETING_EVENT_CONTRACT,
  normalizeMarketingLeadCode,
  normalizeMarketingEventType,
  sanitizeMarketingClickId,
  sanitizeMarketingEventId,
  sanitizeMarketingEventMetadata,
  sanitizeMarketingPageLocation,
  sanitizeMarketingPath,
  sanitizeMarketingTechnicalId,
} from "../src/lib/marketing-event-contract.ts";

test("o fixture versionado e a fonte usada pelo site são idênticos", async () => {
  const fixture = JSON.parse(
    await readFile(
      new URL("../contracts/marketing-events-v3.json", import.meta.url),
      "utf8"
    )
  );

  assert.deepEqual(MARKETING_EVENT_CONTRACT, fixture);
});

test("todos os eventos do corpus são aceitos sem fallback para desconhecidos", () => {
  for (const event of MARKETING_EVENT_CONTRACT.events) {
    assert.deepEqual(normalizeMarketingEventType(event.name), event);
  }

  assert.equal(normalizeMarketingEventType("unknown_event"), null);
  assert.equal(normalizeMarketingEventType("PAGE_VIEW"), null);
  assert.equal(normalizeMarketingEventType(""), null);
  assert.equal(normalizeMarketingEventType(null), null);
  assert.equal(normalizeMarketingEventType(" page_view ")?.name, "page_view");
  assert.deepEqual(MARKETING_EVENT_CONTRACT.aliases, {});
});

test("as seis normalizações de storage sem migration são explícitas", () => {
  const normalized = MARKETING_EVENT_CONTRACT.events.filter(
    (event) => "metadataEventLabel" in event
  );

  assert.deepEqual(
    normalized.map((event) => event.name),
    [
      "instagram_click",
      "directions_click",
      "cta_click",
      "service_detail_click",
      "form_field_complete",
      "scroll_depth",
    ]
  );
  for (const event of normalized) {
    assert.equal(event.storageEventType, "custom");
    assert.equal(event.metadataEventLabel, event.name);
  }
});

test("o endpoint genérico não autoriza lead e identifica PII em texto livre", () => {
  assert.equal(
    MARKETING_EVENT_CONTRACT.pii.siteTelemetryEndpointForwardsLead,
    false
  );
  assert.deepEqual(
    MARKETING_EVENT_CONTRACT.pii.siteTelemetryEndpointRejectedEvents,
    ["form_submit", "lead_created"]
  );
  assert.deepEqual(
    MARKETING_EVENT_CONTRACT.pii.edgeAcceptsLeadOnlyForEvents,
    ["form_submit", "lead_created"]
  );
  assert.equal(containsHighConfidencePersonalData("cliente@example.com"), true);
  assert.equal(containsHighConfidencePersonalData("(16) 99999-9999"), true);
  assert.equal(
    containsHighConfidencePersonalData("cliente%2540example.com"),
    true
  );
  assert.equal(
    containsHighConfidencePersonalData("11999999999 ramal 1234"),
    true
  );
  assert.equal(
    containsHighConfidencePersonalData("11999999999-1234"),
    true
  );
  assert.equal(
    containsHighConfidencePersonalData("11999999999 / 1630000000"),
    true
  );
  assert.equal(
    containsHighConfidencePersonalData("telefone 119999999991234"),
    true
  );
  assert.equal(containsHighConfidencePersonalData("scroll_75"), false);
  assert.equal(isSiteTelemetryEndpointEventAllowed("page_view"), true);
  assert.equal(isSiteTelemetryEndpointEventAllowed("form_submit"), false);
  assert.equal(isSiteTelemetryEndpointEventAllowed("lead_created"), false);
});

test("campos obrigatórios, opcionais e limites críticos permanecem versionados", () => {
  assert.deepEqual(MARKETING_EVENT_CONTRACT.requiredFields, [
    "eventType",
    "leadCode",
    "eventId",
  ]);
  assert.equal(MARKETING_EVENT_CONTRACT.optionalFields.includes("eventId"), false);
  assert.ok(MARKETING_EVENT_CONTRACT.optionalFields.includes("metadata"));
  assert.equal(MARKETING_EVENT_CONTRACT.limits.bodyBytes, 32_000);
  assert.equal(MARKETING_EVENT_CONTRACT.limits.eventId, 80);
  assert.equal(MARKETING_EVENT_CONTRACT.limits.clickId, 220);
  assert.equal(MARKETING_EVENT_CONTRACT.limits.metadataString, 180);
  assert.equal(MARKETING_EVENT_CONTRACT.metadata.allowedKeys.length, 30);
  assert.equal(MARKETING_EVENT_CONTRACT.metadata.maxKeys, 30);
  assert.equal(MARKETING_EVENT_CONTRACT.metadata.keyLength, 80);
  assert.equal(MARKETING_EVENT_CONTRACT.metadata.numericMin, -1_000_000);
  assert.equal(MARKETING_EVENT_CONTRACT.metadata.numericMax, 1_000_000);
  assert.equal(
    MARKETING_EVENT_CONTRACT.metadata.technicalDimensionMaxDigits,
    9
  );
});

test("metadata válida segue as normalizações versionadas", () => {
  const sanitized = sanitizeMarketingEventMetadata({
    destinationType: " WHATSAPP ",
    destinationPath: "/servicos/cabecote?origem=teste#topo",
    visitorCity: ` ${"Á".repeat(70)} `,
    measurementMode: "analytics_and_advertising",
    optionId: "option_123456789",
    elapsedSeconds: 2_000_000,
    fieldsCompleted: -2_000_000,
    estimateState: true,
    siteHostname: "a".repeat(300),
  });

  assert.equal(sanitized.destinationType, "whatsapp");
  assert.equal(sanitized.destinationPath, "/servicos/cabecote");
  assert.equal(sanitized.visitorCity, "Á".repeat(60));
  assert.equal(sanitized.measurementMode, "analytics_and_advertising");
  assert.equal(sanitized.optionId, "option_123456789");
  assert.equal(sanitized.elapsedSeconds, 1_000_000);
  assert.equal(sanitized.fieldsCompleted, -1_000_000);
  assert.equal(sanitized.estimateState, true);
  assert.equal(sanitized.siteHostname.length, 255);
});

test("metadata desconhecida, PII e valores fora do domínio são descartados", () => {
  const sanitized = sanitizeMarketingEventMetadata({
    unknownKey: "não entra",
    eventLabel: "cliente@example.com",
    method: null,
    formName: { nested: true },
    lastField: ["telefone"],
    destinationType: "email",
    destinationPath: "https://example.com/rota",
    visitorCity: "Ribeirão Preto 123",
    measurementMode: "advanced",
    optionId: "1234567890",
    fieldId: "campo com espaço",
  });

  assert.deepEqual(sanitized, { destinationPath: "/" });
});

test("allowlist, quantidade e limites de metadata são determinísticos", () => {
  const specialValues = {
    destinationType: "other",
    destinationPath: `/${"a".repeat(240)}`,
    visitorCity: "Sertãozinho",
    measurementMode: "analytics",
    optionId: "option_1",
    fieldId: "field_2",
    interactionAction: "select_3",
  };
  const allAllowed = Object.fromEntries(
    MARKETING_EVENT_CONTRACT.metadata.allowedKeys.map((key) => [
      key,
      specialValues[key] ?? "valid_value",
    ])
  );
  const sanitized = sanitizeMarketingEventMetadata({
    unknownBefore: "ignorado",
    ...allAllowed,
    unknownAfter: "ignorado",
  });

  assert.equal(Object.keys(sanitized).length, 30);
  assert.deepEqual(
    Object.keys(sanitized),
    [...MARKETING_EVENT_CONTRACT.metadata.allowedKeys]
  );
  assert.equal(sanitized.destinationPath.length, 180);
});

test("leadCode aceita apenas o formato canônico e normaliza caixa", () => {
  assert.equal(
    normalizeMarketingLeadCode(" rp-20260819-ab12cd34 "),
    "RP-20260819-AB12CD34"
  );
  assert.equal(isCanonicalMarketingLeadCode("RP-20260819-AB12CD34"), true);
  for (const legacy of [
    "RP-2026-08-AB12CD34",
    "RP-20260819-AB12",
    "RP-20260819-AB12CD345",
  ]) {
    assert.equal(normalizeMarketingLeadCode(legacy), null);
    assert.equal(isCanonicalMarketingLeadCode(legacy), false);
  }
});

test("IDs técnicos exigem charset ASCII seguro, mínimo, limite e ausência de PII", () => {
  assert.equal(sanitizeMarketingEventId(" evt-abc_123 "), "evt-abc_123");
  assert.equal(sanitizeMarketingEventId("short"), null);
  assert.equal(sanitizeMarketingEventId("x".repeat(81)), null);
  assert.equal(sanitizeMarketingEventId("cliente@example.com"), null);
  assert.equal(sanitizeMarketingEventId("cliente%2540example.com"), null);
  assert.equal(sanitizeMarketingEventId("11999999999"), null);
  assert.equal(sanitizeMarketingEventId("evt com espaço"), null);
  assert.equal(
    sanitizeMarketingTechnicalId("anon-abc_123", 120),
    "anon-abc_123"
  );
  assert.equal(sanitizeMarketingTechnicalId("abc", 120), null);
  assert.equal(
    sanitizeMarketingTechnicalId("%2531%2531%2539%2539%2539%2539%2539%2539%2539%2539%2539", 120),
    null
  );
});

test("click IDs são opacos, limitados e rejeitam charset inválido ou PII", () => {
  assert.equal(sanitizeMarketingClickId("abc123"), "abc123");
  assert.equal(sanitizeMarketingClickId("A.b_c-d~e"), "A.b_c-d~e");
  assert.equal(sanitizeMarketingClickId("x".repeat(221)), null);
  assert.equal(sanitizeMarketingClickId("id com espaço"), null);
  assert.equal(sanitizeMarketingClickId("cliente@example.com"), null);
  assert.equal(sanitizeMarketingClickId("cliente%40example.com"), null);
  assert.equal(sanitizeMarketingClickId("cliente%2540example.com"), null);
  assert.equal(
    sanitizeMarketingClickId("%2531%2531%2539%2539%2539%2539%2539%2539%2539%2539%2539"),
    null
  );
  assert.equal(sanitizeMarketingClickId("11999999999"), null);
  assert.equal(sanitizeMarketingClickId("(11) 99999-9999"), null);
  assert.equal(
    sanitizeMarketingClickId("119999999991234"),
    "119999999991234"
  );
});

test("paths e pageLocation removem query/hash e substituem PII por raiz", () => {
  assert.equal(sanitizeMarketingPath("/servicos/cabecote?utm=x#topo"), "/servicos/cabecote");
  assert.equal(sanitizeMarketingPath("/cliente@example.com"), "/");
  assert.equal(sanitizeMarketingPath("/cliente%40example.com"), "/");
  assert.equal(sanitizeMarketingPath("/cliente%2540example.com"), "/");
  assert.equal(sanitizeMarketingPath("/telefone-11999999999"), "/");
  assert.equal(sanitizeMarketingPath("/telefone-119999999991234"), "/");
  assert.equal(sanitizeMarketingPath("/telefone-%31%31%39%39%39%39%39%39%39%39%39"), "/");
  assert.equal(sanitizeMarketingPath("/telefone-%2531%2531%2539%2539%2539%2539%2539%2539%2539%2539%2539"), "/");
  assert.equal(sanitizeMarketingPath("/percentual-%E0%A4%A"), "/");
  assert.equal(
    sanitizeMarketingPageLocation(
      "https://premiumretifica.com.br/contato?email=cliente@example.com#form"
    ),
    "https://premiumretifica.com.br/contato"
  );
  assert.equal(
    sanitizeMarketingPageLocation(
      "https://premiumretifica.com.br/telefone-11999999999?utm=x"
    ),
    "https://premiumretifica.com.br/"
  );
});

test("metadata free-text rejeita PII codificada e sequências telefônicas", () => {
  assert.deepEqual(
    sanitizeMarketingEventMetadata({
      eventLabel: "cliente%40example.com",
      formName: "cliente%2540example.com",
      method: "11999999999 ramal 1234",
      lastField: "11999999999 / 1630000000",
      pageType: "servico",
    }),
    { pageType: "servico" }
  );
});
