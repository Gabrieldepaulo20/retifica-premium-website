export type ConsentPreferences = {
  version: string;
  necessary: true;
  analytics: boolean;
  advertising: boolean;
  decisionMethod?: "explicit";
  savedAt: string;
  expiresAt: string;
};

type ConsentWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  clarity?: ((...args: unknown[]) => void) & { q?: unknown[][] };
  __retificaConsentRuntimeReady?: boolean;
};

export const CONSENT_STORAGE_KEY = "retifica_premium_consent";
export const CONSENT_CHANGED_EVENT = "retifica:consent-changed";
export const CONSENT_RUNTIME_READY_EVENT = "retifica:consent-runtime-ready";
export const CONSENT_BANNER_VISIBILITY_EVENT = "retifica:consent-banner-visibility";
export const CONSENT_POLICY_VERSION = "2026-08-10";

const CONSENT_TTL_MS = 180 * 24 * 60 * 60 * 1000;
const TRACKING_STORAGE_KEYS = [
  "retifica_premium_attribution",
  "retifica_premium_anonymous_id",
  "retifica_premium_session_id",
  "retifica_premium_session_activity",
  "retifica_premium_session_attribution",
  "retifica_premium_contact_intent",
  "retifica_premium_reported_events",
  "retifica_premium_active_time_ms",
  "retifica_premium_event_outbox",
] as const;
const ANALYTICS_COOKIE_PREFIXES = ["_ga", "_gid", "_gat"] as const;
const EXPERIENCE_COOKIE_PREFIXES = ["_clck", "_clsk"] as const;
const ADVERTISING_COOKIE_PREFIXES = ["_gcl", "_gac"] as const;
const TRACKING_COOKIE_PREFIXES = [
  ...ANALYTICS_COOKIE_PREFIXES,
  ...EXPERIENCE_COOKIE_PREFIXES,
  ...ADVERTISING_COOKIE_PREFIXES,
] as const;
const ATTRIBUTION_QUERY_PARAMS = [
  "utm_source",
  "utm_conferium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;
const AD_QUERY_PARAMS = [
  "gclid",
  "dclid",
  "gbraid",
  "wbraid",
  "gad_source",
  "gad_campaignid",
] as const;
const ADVERTISING_MEASUREMENT_EVENT_TYPES = new Set([
  "whatsapp_click",
  "phone_click",
]);
const EXPERIENCE_QUERY_PARAMS = [
  "experiment_id",
  "variant_id",
  "service",
  "flow",
  "nivel_b2b",
] as const;
const PRODUCTION_HOSTNAMES = new Set([
  "premiumretifica.com.br",
  "www.premiumretifica.com.br",
]);

export type TrackingEnvironment =
  | "production"
  | "preview"
  | "development"
  | "unknown";

function storageAvailable(kind: "localStorage" | "sessionStorage") {
  try {
    return typeof window !== "undefined" && kind in window;
  } catch {
    return false;
  }
}

function isConsentPreferences(value: unknown): value is ConsentPreferences {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;

  const preferences = value as Partial<ConsentPreferences>;
  return (
    preferences.version === CONSENT_POLICY_VERSION &&
    preferences.necessary === true &&
    typeof preferences.analytics === "boolean" &&
    typeof preferences.advertising === "boolean" &&
    (preferences.decisionMethod === undefined ||
      preferences.decisionMethod === "explicit") &&
    typeof preferences.savedAt === "string" &&
    typeof preferences.expiresAt === "string" &&
    Number.isFinite(new Date(preferences.expiresAt).getTime())
  );
}

export function readConsentPreferences(): ConsentPreferences | null {
  if (!storageAvailable("localStorage")) return null;

  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;

    const preferences = JSON.parse(raw) as unknown;
    if (
      !isConsentPreferences(preferences) ||
      new Date(preferences.expiresAt).getTime() <= Date.now()
    ) {
      window.localStorage.removeItem(CONSENT_STORAGE_KEY);
      return null;
    }

    return preferences;
  } catch {
    window.localStorage.removeItem(CONSENT_STORAGE_KEY);
    return null;
  }
}

export function createConsentPreferences(
  choices: Pick<ConsentPreferences, "analytics" | "advertising">,
  decisionMethod: NonNullable<ConsentPreferences["decisionMethod"]> = "explicit"
): ConsentPreferences {
  const savedAt = new Date();

  return {
    version: CONSENT_POLICY_VERSION,
    necessary: true,
    analytics: choices.analytics,
    advertising: choices.advertising,
    decisionMethod,
    savedAt: savedAt.toISOString(),
    expiresAt: new Date(savedAt.getTime() + CONSENT_TTL_MS).toISOString(),
  };
}

export function saveConsentPreferences(preferences: ConsentPreferences) {
  if (!storageAvailable("localStorage")) return;
  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(preferences));
}

export function hasAnalyticsConsent() {
  return readConsentPreferences()?.analytics === true;
}

export function hasAdvertisingConsent() {
  return readConsentPreferences()?.advertising === true;
}

export function hasMeasurementConsent() {
  const preferences = readConsentPreferences();
  return Boolean(preferences?.analytics || preferences?.advertising);
}

export function currentTrackingHostname() {
  return typeof window === "undefined"
    ? "unknown"
    : window.location.hostname.toLowerCase();
}

export function currentTrackingEnvironment(): TrackingEnvironment {
  if (typeof window === "undefined") return "unknown";

  const hostname = currentTrackingHostname();
  if (PRODUCTION_HOSTNAMES.has(hostname)) return "production";
  if (hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1") {
    return "development";
  }
  return "preview";
}

/**
 * Evita contaminar GA4, Ads, Clarity e Retiflow com localhost ou previews.
 * O override existe somente para um smoke test deliberado e mantém o ambiente
 * identificado no payload para permitir sua exclusão dos relatórios.
 */
export function canSendTrackingRequests() {
  return (
    currentTrackingEnvironment() === "production" ||
    process.env.NEXT_PUBLIC_TRACKING_DEBUG === "true"
  );
}

export function updateGoogleConsent(preferences: ConsentPreferences | null) {
  if (typeof window === "undefined") return;

  const consentWindow = window as ConsentWindow;
  consentWindow.dataLayer = consentWindow.dataLayer || [];
  consentWindow.gtag =
    consentWindow.gtag ||
    function gtag(...args: unknown[]) {
      consentWindow.dataLayer?.push(args);
    };

  consentWindow.gtag("consent", "update", {
    analytics_storage: preferences?.analytics ? "granted" : "denied",
    ad_storage: preferences?.advertising ? "granted" : "denied",
    ad_user_data: preferences?.advertising ? "granted" : "denied",
    // A Retífica Premium ainda não utiliza remarketing personalizado.
    ad_personalization: "denied",
  });
}

export function updateClarityConsent(preferences: ConsentPreferences | null) {
  if (typeof window === "undefined") return;

  const consentWindow = window as ConsentWindow;
  if (!consentWindow.clarity) return;

  consentWindow.clarity("consentv2", {
    ad_Storage: "denied",
    analytics_Storage: preferences?.analytics ? "granted" : "denied",
  });

  if (!preferences?.analytics) {
    consentWindow.clarity("consent", false);
  }
}

export function dispatchConsentChanged(preferences: ConsentPreferences) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<ConsentPreferences>(CONSENT_CHANGED_EVENT, {
      detail: preferences,
    })
  );
}

export function isConsentRuntimeReady() {
  return (
    typeof window !== "undefined" &&
    (window as ConsentWindow).__retificaConsentRuntimeReady === true
  );
}

export function dispatchConsentRuntimeReady() {
  if (typeof window === "undefined") return;
  (window as ConsentWindow).__retificaConsentRuntimeReady = true;
  window.dispatchEvent(new Event(CONSENT_RUNTIME_READY_EVENT));
}

function clearCookiesWithPrefixes(prefixes: readonly string[]) {
  const domain = window.location.hostname;
  const domainVariants = new Set(["", domain, `.${domain}`]);
  if (
    domain === "premiumretifica.com.br" ||
    domain.endsWith(".premiumretifica.com.br")
  ) {
    domainVariants.add("premiumretifica.com.br");
    domainVariants.add(".premiumretifica.com.br");
  }

  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0]?.trim();
    if (!name || !prefixes.some((prefix) => name.startsWith(prefix))) {
      continue;
    }

    for (const cookieDomain of domainVariants) {
      const domainAttribute = cookieDomain
        ? `; domain=${cookieDomain}`
        : "";
      document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax${domainAttribute}`;
    }
  }
}

function clearAdvertisingAttribution() {
  if (!storageAvailable("localStorage")) return;

  try {
    const raw = window.localStorage.getItem("retifica_premium_attribution");
    if (!raw) return;

    const attribution = JSON.parse(raw) as Record<string, unknown>;
    delete attribution.gclid;
    delete attribution.gbraid;
    delete attribution.wbraid;

    if (typeof attribution.landingPage === "string") {
      const landingPage = new URL(attribution.landingPage);
      for (const parameter of AD_QUERY_PARAMS) {
        landingPage.searchParams.delete(parameter);
      }
      attribution.landingPage = landingPage.toString();
    }

    window.localStorage.setItem(
      "retifica_premium_attribution",
      JSON.stringify(attribution)
    );
  } catch {
    window.localStorage.removeItem("retifica_premium_attribution");
  }
}

function sanitizeTrackingOutbox(preferences: ConsentPreferences) {
  if (!storageAvailable("localStorage")) return;

  const outboxKey = "retifica_premium_event_outbox";
  try {
    const raw = window.localStorage.getItem(outboxKey);
    if (!raw) return;
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      window.localStorage.removeItem(outboxKey);
      return;
    }

    const allowed = parsed.flatMap((item) => {
      if (!item || typeof item !== "object" || Array.isArray(item)) return [];
      const entry = item as Record<string, unknown>;
      const payload = entry.payload;
      if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
        return [];
      }

      const cleanedPayload = { ...(payload as Record<string, unknown>) };
      if (
        !preferences.analytics &&
        !ADVERTISING_MEASUREMENT_EVENT_TYPES.has(
          typeof cleanedPayload.eventType === "string"
            ? cleanedPayload.eventType
            : ""
        )
      ) {
        return [];
      }

      if (!preferences.analytics) {
        delete cleanedPayload.city;
        delete cleanedPayload.visitorCity;
        const metadata = cleanedPayload.metadata;
        if (metadata && typeof metadata === "object" && !Array.isArray(metadata)) {
          const cleanedMetadata = { ...(metadata as Record<string, unknown>) };
          delete cleanedMetadata.visitorCity;
          cleanedPayload.metadata = cleanedMetadata;
        }
      }

      if (!preferences.advertising) {
        delete cleanedPayload.gclid;
        delete cleanedPayload.gbraid;
        delete cleanedPayload.wbraid;
      }

      return [{ ...entry, payload: cleanedPayload }];
    });

    if (allowed.length === 0) {
      window.localStorage.removeItem(outboxKey);
      return;
    }
    window.localStorage.setItem(outboxKey, JSON.stringify(allowed));
  } catch {
    window.localStorage.removeItem(outboxKey);
  }
}

export function clearDisallowedTrackingStorage(
  preferences: ConsentPreferences
) {
  if (typeof window === "undefined") return;

  if (!preferences.analytics && !preferences.advertising) {
    clearTrackingStorage();
    return;
  }

  if (!preferences.analytics) {
    clearCookiesWithPrefixes(ANALYTICS_COOKIE_PREFIXES);
    clearCookiesWithPrefixes(EXPERIENCE_COOKIE_PREFIXES);
  }

  if (!preferences.advertising) {
    clearCookiesWithPrefixes(ADVERTISING_COOKIE_PREFIXES);
    clearAdvertisingAttribution();
  }

  sanitizeTrackingOutbox(preferences);
}

export function clearTrackingStorage() {
  if (typeof window === "undefined") return;

  if (storageAvailable("localStorage")) {
    for (const key of TRACKING_STORAGE_KEYS) {
      window.localStorage.removeItem(key);
    }
  }

  if (storageAvailable("sessionStorage")) {
    for (const key of TRACKING_STORAGE_KEYS) {
      window.sessionStorage.removeItem(key);
    }
  }

  clearCookiesWithPrefixes(TRACKING_COOKIE_PREFIXES);
}

export function privacySafePageLocation() {
  if (typeof window === "undefined") return "";

  const source = new URL(window.location.href);
  const safe = new URL(source.pathname, source.origin);
  const allowedParameters: string[] = hasMeasurementConsent()
    ? [...EXPERIENCE_QUERY_PARAMS, ...ATTRIBUTION_QUERY_PARAMS]
    : [];

  if (hasAdvertisingConsent()) {
    allowedParameters.push(...AD_QUERY_PARAMS);
  }

  for (const parameter of allowedParameters) {
    const value = source.searchParams.get(parameter)?.trim();
    if (value) safe.searchParams.set(parameter, value.slice(0, 220));
  }

  return safe.toString();
}
