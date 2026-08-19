export const MARKETING_EVENT_CONTRACT = {
  schemaVersion: "marketing-events-v3",
  aliases: {},
  events: [
    { name: "page_view", storageEventType: "page_view" },
    { name: "whatsapp_click", storageEventType: "whatsapp_click" },
    {
      name: "instagram_click",
      storageEventType: "custom",
      metadataEventLabel: "instagram_click",
    },
    { name: "phone_click", storageEventType: "phone_click" },
    {
      name: "directions_click",
      storageEventType: "custom",
      metadataEventLabel: "directions_click",
    },
    {
      name: "cta_click",
      storageEventType: "custom",
      metadataEventLabel: "cta_click",
    },
    {
      name: "service_detail_click",
      storageEventType: "custom",
      metadataEventLabel: "service_detail_click",
    },
    { name: "form_view", storageEventType: "form_view" },
    { name: "form_start", storageEventType: "form_start" },
    {
      name: "form_field_complete",
      storageEventType: "custom",
      metadataEventLabel: "form_field_complete",
    },
    { name: "form_abandon", storageEventType: "form_abandon" },
    {
      name: "form_submit_attempt",
      storageEventType: "form_submit_attempt",
    },
    {
      name: "form_validation_error",
      storageEventType: "form_validation_error",
    },
    { name: "form_submit_error", storageEventType: "form_submit_error" },
    { name: "form_submit", storageEventType: "form_submit" },
    { name: "lead_created", storageEventType: "lead_created" },
    { name: "critical_page_view", storageEventType: "critical_page_view" },
    {
      name: "scroll_depth",
      storageEventType: "custom",
      metadataEventLabel: "scroll_depth",
    },
    { name: "custom", storageEventType: "custom" },
  ],
  requiredFields: ["eventType", "leadCode"],
  optionalFields: [
    "eventId",
    "anonymousId",
    "sessionId",
    "channel",
    "occurredAt",
    "pagePath",
    "pageLocation",
    "pageTitle",
    "referrer",
    "source",
    "medium",
    "campaign",
    "term",
    "content",
    "gclid",
    "gbraid",
    "wbraid",
    "deviceType",
    "city",
    "region",
    "metadata",
    "lead",
  ],
  limits: {
    bodyBytes: 32_000,
    eventType: 60,
    eventId: 80,
    leadCode: 40,
    anonymousId: 120,
    sessionId: 120,
    channel: 80,
    occurredAt: 80,
    pagePath: 500,
    pageLocation: 800,
    pageTitle: 300,
    referrer: 800,
    source: 120,
    medium: 120,
    campaign: 180,
    term: 180,
    content: 180,
    clickId: 220,
    deviceType: 40,
    city: 60,
    region: 60,
    metadataString: 180,
    metadataHostname: 255,
  },
  metadata: {
    allowedKeys: [
      "eventLabel",
      "method",
      "formName",
      "lastField",
      "validationReason",
      "elapsedSeconds",
      "fieldsCompleted",
      "completionPercent",
      "engagedSeconds",
      "percentScrolled",
      "experimentId",
      "variantId",
      "componentId",
      "position",
      "pageType",
      "serviceId",
      "flowType",
      "stepId",
      "optionId",
      "fieldId",
      "interactionAction",
      "estimateState",
      "destinationType",
      "destinationPath",
      "visitorCity",
      "sessionOriginType",
      "siteHostname",
      "environment",
      "measurementMode",
      "eventContractVersion",
    ],
    maxKeys: 30,
    keyLength: 80,
    numericMin: -1_000_000,
    numericMax: 1_000_000,
    destinationTypes: [
      "whatsapp",
      "phone",
      "estimate",
      "service",
      "contact",
      "directions",
      "video",
      "other",
    ],
    measurementModes: [
      "analytics",
      "advertising",
      "analytics_and_advertising",
    ],
    technicalDimensionKeys: [
      "optionId",
      "fieldId",
      "interactionAction",
    ],
    technicalDimensionLimit: 100,
    technicalDimensionMaxDigits: 9,
    destinationPathLimit: 180,
    visitorCityLimit: "city",
    defaultStringLimit: "metadataString",
    hostnameStringLimit: "metadataHostname",
    allowBoolean: true,
    allowNull: false,
  },
  normalization: {
    eventType: "trim_exact_case_no_unknown_fallback",
    leadCode: "trim_uppercase",
    strings: "collapse_whitespace_trim_truncate",
    pageLocation: "origin_and_path_only",
    referrer: "origin_only",
  },
  pii: {
    siteTelemetryEndpointForwardsLead: false,
    edgeAcceptsLeadOnlyForEvents: ["form_submit", "lead_created"],
    genericFreeTextWithEmailOrPhone: "drop",
    queryStringsInPageLocationOrReferrer: "drop",
  },
} as const;

export type MarketingEventType =
  (typeof MARKETING_EVENT_CONTRACT.events)[number]["name"];

const EVENT_BY_NAME = new Map(
  MARKETING_EVENT_CONTRACT.events.map((event) => [event.name, event])
);

export function normalizeMarketingEventType(value: unknown) {
  if (typeof value !== "string") return null;
  const normalized = value.trim();
  return EVENT_BY_NAME.get(normalized as MarketingEventType) ?? null;
}

export function isMarketingEventType(value: unknown): value is MarketingEventType {
  return normalizeMarketingEventType(value) !== null;
}

export function containsHighConfidencePersonalData(value: string) {
  if (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i.test(value)) return true;
  const digits = value.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 14;
}

export type SanitizedMarketingMetadata = Record<
  string,
  string | number | boolean
>;

const ALLOWED_METADATA_KEYS = new Set<string>(
  MARKETING_EVENT_CONTRACT.metadata.allowedKeys
);
const DESTINATION_TYPES = new Set<string>(
  MARKETING_EVENT_CONTRACT.metadata.destinationTypes
);
const MEASUREMENT_MODES = new Set<string>(
  MARKETING_EVENT_CONTRACT.metadata.measurementModes
);
const TECHNICAL_DIMENSION_KEYS = new Set<string>(
  MARKETING_EVENT_CONTRACT.metadata.technicalDimensionKeys
);

function cleanContractMetadataString(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim().slice(0, max);
}

export function sanitizeMarketingEventMetadata(
  value: unknown
): SanitizedMarketingMetadata {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};

  const metadata: SanitizedMarketingMetadata = {};
  const rules = MARKETING_EVENT_CONTRACT.metadata;

  for (const [key, item] of Object.entries(value)) {
    if (Object.keys(metadata).length >= rules.maxKeys) break;
    if (key.length > rules.keyLength || !ALLOWED_METADATA_KEYS.has(key)) {
      continue;
    }

    if (key === "destinationType") {
      const destinationType = cleanContractMetadataString(item, 32).toLowerCase();
      if (DESTINATION_TYPES.has(destinationType)) {
        metadata[key] = destinationType;
      }
      continue;
    }

    if (key === "destinationPath") {
      const destinationPath = cleanContractMetadataString(
        item,
        rules.destinationPathLimit
      ).split(/[?#]/, 1)[0];
      if (/^\/[a-z0-9/_-]*$/i.test(destinationPath)) {
        metadata[key] = `/${destinationPath.replace(/^\/+/, "")}`;
      }
      continue;
    }

    if (key === "visitorCity") {
      const cityLimit = MARKETING_EVENT_CONTRACT.limits[rules.visitorCityLimit];
      const city = cleanContractMetadataString(item, cityLimit);
      if (/^[\p{L}\s.'-]+$/u.test(city)) metadata[key] = city;
      continue;
    }

    if (key === "measurementMode") {
      const measurementMode = cleanContractMetadataString(item, 40);
      if (MEASUREMENT_MODES.has(measurementMode)) {
        metadata[key] = measurementMode;
      }
      continue;
    }

    if (TECHNICAL_DIMENSION_KEYS.has(key)) {
      const dimension = cleanContractMetadataString(
        item,
        rules.technicalDimensionLimit
      );
      if (
        dimension &&
        /^[A-Za-z0-9_-]+$/.test(dimension) &&
        dimension.replace(/\D/g, "").length <=
          rules.technicalDimensionMaxDigits
      ) {
        metadata[key] = dimension;
      }
      continue;
    }

    if (typeof item === "string") {
      const limitKey =
        key === "siteHostname"
          ? rules.hostnameStringLimit
          : rules.defaultStringLimit;
      const cleaned = cleanContractMetadataString(
        item,
        MARKETING_EVENT_CONTRACT.limits[limitKey]
      );
      if (cleaned && !containsHighConfidencePersonalData(cleaned)) {
        metadata[key] = cleaned;
      }
      continue;
    }

    if (typeof item === "number" && Number.isFinite(item)) {
      metadata[key] = Math.max(
        rules.numericMin,
        Math.min(rules.numericMax, item)
      );
      continue;
    }

    if (typeof item === "boolean" && rules.allowBoolean) {
      metadata[key] = item;
    }
  }

  return metadata;
}
