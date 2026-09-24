export const ATTRIBUTION_STORAGE_KEY = "retifica_premium_attribution";
export const ATTRIBUTION_COOKIE_NAME = "rp_attribution";

/** First-party fallback; callers must gate access on current consent. */
export function readAttributionStorage(): string | null {
  try {
    const stored = window.localStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (stored) return stored;
  } catch { /* Cookies may remain available when localStorage is blocked. */ }
  try {
    const value = document.cookie.split(";").map(v => v.trim()).find(v => v.startsWith(`${ATTRIBUTION_COOKIE_NAME}=`));
    return value ? decodeURIComponent(value.slice(ATTRIBUTION_COOKIE_NAME.length + 1)) : null;
  } catch { return null; }
}

export function clearAttributionCookie() {
  if (typeof document === "undefined") return;
  document.cookie = `${ATTRIBUTION_COOKIE_NAME}=; Max-Age=0; Path=/; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
}

export function writeAttributionStorage(value: string, expiresAt: string) {
  try { window.localStorage.setItem(ATTRIBUTION_STORAGE_KEY, value); } catch { /* Fall back to cookie. */ }
  try {
    const encoded = encodeURIComponent(value);
    // Leave room for attributes within the browser's per-cookie limit.
    if (encoded.length > 3500) { clearAttributionCookie(); return; }
    const maxAge = Math.max(0, Math.floor((Date.parse(expiresAt) - Date.now()) / 1000));
    document.cookie = `${ATTRIBUTION_COOKIE_NAME}=${encoded}; Max-Age=${Math.min(maxAge, 7776000)}; Path=/; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
  } catch { /* Attribution failure must never block contact. */ }
}

export function removeAttributionStorage() {
  try { window.localStorage.removeItem(ATTRIBUTION_STORAGE_KEY); } catch { /* No storage. */ }
  clearAttributionCookie();
}
