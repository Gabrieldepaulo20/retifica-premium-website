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
  | "whatsapp_click"
  | "instagram_click"
  | "phone_click"
  | "directions_click"
  | "cta_click"
  | "service_detail_click"
  | "form_start"
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
  [key: string]: string | number | undefined;
};

type StoredAttribution = {
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

type TrackingWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>;
  clarity?: (command: "event", eventName: ClarityEventName) => void;
  gtag?: (
    command: "event",
    eventName: GaEventName,
    params: MarketingEventParams
  ) => void;
};

const ATTRIBUTION_KEY = "retifica_premium_attribution";

function storageAvailable() {
  try {
    return typeof window !== "undefined" && "localStorage" in window;
  } catch {
    return false;
  }
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

  const attribution: StoredAttribution = {
    source: params.get("utm_source") || undefined,
    medium: params.get("utm_medium") || undefined,
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
  const text = [...baseText.split("\n"), ...attributionMessageLines()].join(
    "\n"
  );

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
