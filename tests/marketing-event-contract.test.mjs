import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  containsHighConfidencePersonalData,
  MARKETING_EVENT_CONTRACT,
  normalizeMarketingEventType,
  sanitizeMarketingEventMetadata,
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
    MARKETING_EVENT_CONTRACT.pii.edgeAcceptsLeadOnlyForEvents,
    ["form_submit", "lead_created"]
  );
  assert.equal(containsHighConfidencePersonalData("cliente@example.com"), true);
  assert.equal(containsHighConfidencePersonalData("(16) 99999-9999"), true);
  assert.equal(containsHighConfidencePersonalData("scroll_75"), false);
});

test("campos obrigatórios, opcionais e limites críticos permanecem versionados", () => {
  assert.deepEqual(MARKETING_EVENT_CONTRACT.requiredFields, [
    "eventType",
    "leadCode",
  ]);
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
    ["x".repeat(81)]: "não entra",
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

  assert.deepEqual(sanitized, {});
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
