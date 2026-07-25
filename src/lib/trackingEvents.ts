export type ClarityEventName =
  | "whatsapp_floating_click"
  | "whatsapp_home_cta_click"
  | "whatsapp_service_cta_click"
  | "whatsapp_contact_cta_click"
  | "whatsapp_contact_form_submit"
  | "whatsapp_footer_click"
  | "instagram_footer_click"
  | "phone_click"
  | "directions_click"
  | "cta_click"
  | "service_detail_click"
  | "form_start"
  | "scroll_depth";

type GaEventName =
  | "page_view"
  | "whatsapp_click"
  | "instagram_click"
  | "phone_click"
  | "directions_click"
  | "cta_click"
  | "service_detail_click"
  | "form_view"
  | "form_start"
  | "form_field_complete"
  | "form_submit_attempt"
  | "form_validation_error"
  | "form_abandon"
  | "form_submit_error"
  | "generate_lead"
  | "scroll_depth";

type MarketingEventParams = {
  event_category?: "engagement" | "lead" | "navigation";
  event_label?: string;
  link_url?: string;
  method?: string;
  percent_scrolled?: number;
  service_name?: string;
  page_location?: string;
  traffic_source?: string;
  traffic_medium?: string;
  traffic_campaign?: string;
  traffic_term?: string;
  gclid?: string;
  transaction_id?: string;
  [key: string]: string | number | undefined;
};

type GoogleAdsConversionParams = MarketingEventParams & {
  send_to: string;
  value: number;
  currency: "BRL";
  transaction_id: string;
};

export type StoredAttribution = {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  landingPage: string;
  referrer?: string;
  capturedAt: string;
};

export type ContactIntent = {
  eventId: string;
  leadCode: string;
  anonymousId: string;
  sessionId: string;
  createdAt: string;
};

type TrackingWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>;
  clarity?: (command: "event", eventName: ClarityEventName) => void;
  gtag?: (
    command: "event",
    eventName: GaEventName | "conversion",
    params: MarketingEventParams | GoogleAdsConversionParams
  ) => void;
};

const ATTRIBUTION_KEY = "retifica_premium_attribution";
const ANONYMOUS_ID_KEY = "retifica_premium_anonymous_id";
const SESSION_ID_KEY = "retifica_premium_session_id";
const CONTACT_INTENT_KEY = "retifica_premium_contact_intent";
const REPORTED_EVENTS_KEY = "retifica_premium_reported_events";
const CONTACT_INTENT_TTL_MS = 30 * 60 * 1000;
const pendingEvents = new Set<string>();
const GOOGLE_ADS_CONVERSIONS: Partial<Record<GaEventName, string>> = {
  generate_lead: process.env.NEXT_PUBLIC_GOOGLE_ADS_FORM_SEND_TO,
  whatsapp_click: process.env.NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_SEND_TO,
  phone_click: process.env.NEXT_PUBLIC_GOOGLE_ADS_PHONE_SEND_TO,
};

function storageAvailable() {
  try {
    return typeof window !== "undefined" && "localStorage" in window;
  } catch {
    return false;
  }
}

function sessionStorageAvailable() {
  try {
    return typeof window !== "undefined" && "sessionStorage" in window;
  } catch {
    return false;
  }
}

function randomId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

export function createMarketingEventId() {
  return randomId();
}

function getOrCreateBrowserId(
  storage: Storage | null,
  key: string,
  prefix: string
) {
  const existing = storage?.getItem(key);
  if (existing) return existing;

  const value = `${prefix}-${randomId()}`;
  storage?.setItem(key, value);
  return value;
}

function leadCode() {
  const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  const suffix = randomId().replaceAll("-", "").slice(0, 8).toUpperCase();
  return `RP-${date}-${suffix}`;
}

export function getOrCreateContactIntent(): ContactIntent {
  if (typeof window === "undefined") {
    const now = new Date().toISOString();
    return {
      eventId: randomId(),
      leadCode: leadCode(),
      anonymousId: `anon-${randomId()}`,
      sessionId: `session-${randomId()}`,
      createdAt: now,
    };
  }

  const localStorage = storageAvailable() ? window.localStorage : null;
  const sessionStorage = sessionStorageAvailable()
    ? window.sessionStorage
    : null;

  try {
    const raw = sessionStorage?.getItem(CONTACT_INTENT_KEY);
    if (raw) {
      const existing = JSON.parse(raw) as ContactIntent;
      const age = Date.now() - new Date(existing.createdAt).getTime();
      if (
        existing.eventId &&
        existing.leadCode &&
        Number.isFinite(age) &&
        age >= 0 &&
        age < CONTACT_INTENT_TTL_MS
      ) {
        return existing;
      }
    }
  } catch {
    sessionStorage?.removeItem(CONTACT_INTENT_KEY);
  }

  const intent: ContactIntent = {
    eventId: randomId(),
    leadCode: leadCode(),
    anonymousId: getOrCreateBrowserId(
      localStorage,
      ANONYMOUS_ID_KEY,
      "anon"
    ),
    sessionId: getOrCreateBrowserId(
      sessionStorage,
      SESSION_ID_KEY,
      "session"
    ),
    createdAt: new Date().toISOString(),
  };

  sessionStorage?.setItem(CONTACT_INTENT_KEY, JSON.stringify(intent));
  return intent;
}

function reportedEventKey(eventType: string, eventId: string) {
  return `${eventType}:${eventId}`;
}

function wasReported(eventType: string, eventId: string) {
  if (!sessionStorageAvailable()) return false;

  try {
    const raw = window.sessionStorage.getItem(REPORTED_EVENTS_KEY);
    const reported = raw ? (JSON.parse(raw) as string[]) : [];
    return reported.includes(reportedEventKey(eventType, eventId));
  } catch {
    return false;
  }
}

function markAsReported(eventType: string, eventId: string) {
  if (!sessionStorageAvailable()) return;

  try {
    const raw = window.sessionStorage.getItem(REPORTED_EVENTS_KEY);
    const reported = raw ? (JSON.parse(raw) as string[]) : [];
    const key = reportedEventKey(eventType, eventId);
    if (reported.includes(key)) return;

    window.sessionStorage.setItem(
      REPORTED_EVENTS_KEY,
      JSON.stringify([...reported.slice(-49), key])
    );
  } catch {
    // A indisponibilidade do storage não pode afetar o contato.
  }
}

function deviceType() {
  if (typeof window === "undefined") return "unknown";
  if (window.matchMedia("(max-width: 767px)").matches) return "mobile";
  if (window.matchMedia("(max-width: 1024px)").matches) return "tablet";
  return "desktop";
}

export function sendExternalMarketingEvent(
  eventType: string,
  params: MarketingEventParams = {},
  contactIntent?: ContactIntent
) {
  if (typeof window === "undefined") return;

  const baseIntent = contactIntent ?? getOrCreateContactIntent();
  const intent =
    eventType === "whatsapp_click"
      ? baseIntent
      : { ...baseIntent, eventId: createMarketingEventId() };
  const pendingKey = reportedEventKey(eventType, intent.eventId);
  if (wasReported(eventType, intent.eventId) || pendingEvents.has(pendingKey)) {
    return;
  }
  pendingEvents.add(pendingKey);

  const attribution = getStoredAttribution();
  const payload = {
    eventId: intent.eventId,
    leadCode: intent.leadCode,
    anonymousId: intent.anonymousId,
    sessionId: intent.sessionId,
    eventType,
    channel:
      eventType === "whatsapp_click"
        ? "site_whatsapp"
        : eventType === "phone_click"
          ? "site_phone"
          : "site",
    occurredAt: new Date().toISOString(),
    pagePath: window.location.pathname,
    pageLocation: window.location.href,
    pageTitle: document.title,
    referrer: attribution?.referrer ?? document.referrer ?? undefined,
    source: attribution?.source,
    medium: attribution?.medium,
    campaign: attribution?.campaign,
    term: attribution?.term,
    content: attribution?.content,
    gclid: attribution?.gclid,
    gbraid: attribution?.gbraid,
    wbraid: attribution?.wbraid,
    deviceType: deviceType(),
    metadata: {
      eventLabel: params.event_label,
      method: params.method,
      formName: params.form_name,
      lastField: params.last_field,
      validationReason: params.validation_reason,
      elapsedSeconds: params.form_elapsed_seconds,
      fieldsCompleted: params.fields_completed,
      completionPercent: params.completion_percent,
    },
  };

  void fetch("/api/marketing/event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  })
    .then(async (response) => {
      const result = (await response.json().catch(() => null)) as {
        alertStatus?: string;
      } | null;
      const alertAccepted =
        eventType !== "whatsapp_click" ||
        result?.alertStatus === "sent" ||
        result?.alertStatus === "already_sent";

      if (response.ok && alertAccepted) {
        markAsReported(eventType, intent.eventId);
      }
    })
    .catch(() => {
      // Rastreamento nunca pode bloquear a navegação ou o contato.
    })
    .finally(() => pendingEvents.delete(pendingKey));
}

export function captureTrafficAttribution() {
  if (typeof window === "undefined" || !storageAvailable()) return;

  const params = new URLSearchParams(window.location.search);
  const trackedKeys = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "gclid",
    "gbraid",
    "wbraid",
  ];
  const hasTrackedParam = trackedKeys.some((key) => params.has(key));
  const existing = window.localStorage.getItem(ATTRIBUTION_KEY);

  if (!hasTrackedParam && existing) return;

  const hasGoogleClickId = Boolean(
    params.get("gclid") || params.get("gbraid") || params.get("wbraid")
  );
  const attribution: StoredAttribution = {
    source: params.get("utm_source") || (hasGoogleClickId ? "google" : undefined),
    medium: params.get("utm_medium") || (hasGoogleClickId ? "cpc" : undefined),
    campaign: params.get("utm_campaign") || undefined,
    term: params.get("utm_term") || undefined,
    content: params.get("utm_content") || undefined,
    gclid: params.get("gclid") || undefined,
    gbraid: params.get("gbraid") || undefined,
    wbraid: params.get("wbraid") || undefined,
    landingPage: window.location.href,
    referrer: document.referrer || undefined,
    capturedAt: new Date().toISOString(),
  };

  window.localStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attribution));
}

export function getStoredAttribution(): StoredAttribution | null {
  if (typeof window === "undefined" || !storageAvailable()) return null;

  try {
    const raw = window.localStorage.getItem(ATTRIBUTION_KEY);
    return raw ? (JSON.parse(raw) as StoredAttribution) : null;
  } catch {
    return null;
  }
}

export function attributionEventParams(): MarketingEventParams {
  const attribution = getStoredAttribution();

  if (!attribution) return {};

  return {
    traffic_source: attribution.source,
    traffic_medium: attribution.medium,
    traffic_campaign: attribution.campaign,
    traffic_term: attribution.term,
    gclid: attribution.gclid || attribution.gbraid || attribution.wbraid,
  };
}

export function attributionMessageLines() {
  const attribution = getStoredAttribution();

  if (!attribution) return [];

  return [
    "",
    "Origem do contato:",
    attribution.source ? `Fonte: ${attribution.source}` : "",
    attribution.medium ? `Mídia: ${attribution.medium}` : "",
    attribution.campaign ? `Campanha: ${attribution.campaign}` : "",
    attribution.term ? `Termo: ${attribution.term}` : "",
    attribution.content ? `Conteúdo: ${attribution.content}` : "",
    attribution.gclid ? `GCLID: ${attribution.gclid}` : "",
    attribution.gbraid ? `GBRAID: ${attribution.gbraid}` : "",
    attribution.wbraid ? `WBRAID: ${attribution.wbraid}` : "",
    attribution.referrer ? `Referência: ${attribution.referrer}` : "",
    `Página de entrada: ${attribution.landingPage}`,
  ].filter(Boolean);
}

export function buildWhatsAppUrlWithAttribution(
  phoneNumber: string,
  baseText: string
) {
  const intent = getOrCreateContactIntent();
  const text = [
    ...baseText.split("\n"),
    "",
    `Código do contato: ${intent.leadCode}`,
    ...attributionMessageLines(),
  ].join("\n");

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
}

export function trackMarketingEvent(
  eventName: GaEventName,
  params: MarketingEventParams = {}
) {
  if (typeof window === "undefined") return;

  const trackingWindow = window as TrackingWindow;
  const eventParams = {
    page_location: window.location.href,
    ...attributionEventParams(),
    ...params,
  };

  if (Array.isArray(trackingWindow.dataLayer)) {
    trackingWindow.dataLayer.push({
      event: eventName,
      ...eventParams,
    });
  }

  if (typeof trackingWindow.gtag === "function") {
    trackingWindow.gtag("event", eventName, eventParams);

    const conversionSendTo = GOOGLE_ADS_CONVERSIONS[eventName];
    if (conversionSendTo) {
      const transactionId =
        params.transaction_id || getOrCreateContactIntent().leadCode;

      trackingWindow.gtag("event", "conversion", {
        send_to: conversionSendTo,
        value: 1,
        currency: "BRL",
        transaction_id: transactionId,
      });
    }
  }

  if (
    eventName === "whatsapp_click" ||
    eventName === "phone_click" ||
    eventName === "form_view" ||
    eventName === "form_start" ||
    eventName === "form_submit_attempt" ||
    eventName === "form_validation_error" ||
    eventName === "form_abandon" ||
    eventName === "form_submit_error" ||
    eventName === "generate_lead"
  ) {
    sendExternalMarketingEvent(eventName, eventParams);
  }
}

export function trackEngagementEvent(
  clarityEventName: ClarityEventName,
  gaEventName: GaEventName,
  gaEventLabel: string,
  params: MarketingEventParams = {}
) {
  if (typeof window === "undefined") return;

  const trackingWindow = window as TrackingWindow;

  if (typeof trackingWindow.clarity === "function") {
    trackingWindow.clarity("event", clarityEventName);
  }

  trackMarketingEvent(gaEventName, {
    event_category: "engagement",
    event_label: gaEventLabel,
    ...params,
  });
}
