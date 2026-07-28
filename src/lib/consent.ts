export type ConsentPreferences = {
  version: string;
  necessary: true;
  analytics: boolean;
  advertising: boolean;
  savedAt: string;
  expiresAt: string;
};

type ConsentWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  clarity?: ((...args: unknown[]) => void) & { q?: unknown[][] };
};

export const CONSENT_STORAGE_KEY = "retifica_premium_consent";
export const CONSENT_CHANGED_EVENT = "retifica:consent-changed";
export const CONSENT_POLICY_VERSION = "2026-07-28";

const CONSENT_TTL_MS = 180 * 24 * 60 * 60 * 1000;
const TRACKING_STORAGE_KEYS = [
  "retifica_premium_attribution",
  "retifica_premium_anonymous_id",
  "retifica_premium_session_id",
  "retifica_premium_contact_intent",
  "retifica_premium_reported_events",
] as const;
const EXPERIENCE_COOKIE_PREFIXES = ["_clck", "_clsk"] as const;
const ADVERTISING_COOKIE_PREFIXES = ["_gcl"] as const;
const TRACKING_COOKIE_PREFIXES = [
  ...EXPERIENCE_COOKIE_PREFIXES,
  ...ADVERTISING_COOKIE_PREFIXES,
] as const;
const AD_QUERY_PARAMS = [
  "gclid",
  "dclid",
  "gbraid",
  "wbraid",
  "gad_source",
  "gad_campaignid",
] as const;

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
  choices: Pick<ConsentPreferences, "analytics" | "advertising">
): ConsentPreferences {
  const savedAt = new Date();

  return {
    version: CONSENT_POLICY_VERSION,
    necessary: true,
    analytics: choices.analytics,
    advertising: choices.advertising,
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
    // O GA4 permanece ativo para a medição estatística básica do site.
    analytics_storage: "granted",
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

function clearCookiesWithPrefixes(prefixes: readonly string[]) {
  const domain = window.location.hostname;
  const domainVariants = ["", domain, `.${domain}`];

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

export function clearDisallowedTrackingStorage(
  preferences: ConsentPreferences
) {
  if (typeof window === "undefined") return;

  if (!preferences.analytics && !preferences.advertising) {
    clearTrackingStorage();
    return;
  }

  if (!preferences.analytics) {
    clearCookiesWithPrefixes(EXPERIENCE_COOKIE_PREFIXES);
  }

  if (!preferences.advertising) {
    clearCookiesWithPrefixes(ADVERTISING_COOKIE_PREFIXES);
    clearAdvertisingAttribution();
  }
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
  if (!hasMeasurementConsent()) {
    return `${window.location.origin}${window.location.pathname}`;
  }
  if (hasAdvertisingConsent()) return window.location.href;

  const url = new URL(window.location.href);
  for (const parameter of AD_QUERY_PARAMS) {
    url.searchParams.delete(parameter);
  }
  return url.toString();
}
