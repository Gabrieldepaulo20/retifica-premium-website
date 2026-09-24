export type GoogleTag = (...args: unknown[]) => void;
export const CONTACT_NAVIGATION_TIMEOUT_MS = 250;
export type AdsDispatchResult = "processed" | "timeout" | "unavailable";

/** A callback confirms tag processing, not attribution or receipt by Google. */
export function dispatchAdsConversion(args: {
  gtag?: GoogleTag;
  sendTo?: string;
  transactionId?: string;
  pageLocation: string;
}): Promise<AdsDispatchResult> {
  if (!args.gtag || !/^AW-\d+\/[\w-]+$/.test(args.sendTo ?? "")) {
    return Promise.resolve("unavailable");
  }
  return new Promise((resolve) => {
    let settled = false;
    const finish = (result: AdsDispatchResult) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve(result);
    };
    const timer = setTimeout(() => finish("timeout"), CONTACT_NAVIGATION_TIMEOUT_MS);
    try {
      args.gtag!("event", "conversion", {
        send_to: args.sendTo,
        // Contact intent has no known revenue. Do not manufacture BRL 1 sales.
        value: 0,
        currency: "BRL",
        ...(args.transactionId ? { transaction_id: args.transactionId } : {}),
        page_location: args.pageLocation,
        event_callback: () => finish("processed"),
        event_timeout: CONTACT_NAVIGATION_TIMEOUT_MS,
      });
    } catch {
      finish("unavailable");
    }
  });
}

export function isContactDestination(href: string) {
  try {
    const url = new URL(href);
    return url.protocol === "tel:" || (
      url.protocol === "https:" &&
      ["wa.me", "api.whatsapp.com", "web.whatsapp.com"].includes(url.hostname)
    );
  } catch { return false; }
}

/** Only same-tab navigation needs a delay. Preserve modifier keys and new tabs. */
export function installContactNavigationGuard(
  doc: Document,
  pending: () => Promise<unknown> | null,
  navigate: (href: string) => void,
) {
  const handle = (event: MouseEvent) => {
    if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const anchor = event.target instanceof Element ? event.target.closest("a") : null;
    if (!anchor || (anchor.target && anchor.target !== "_self") || anchor.hasAttribute("download") || !isContactDestination(anchor.href)) return;
    const dispatched = pending();
    if (!dispatched) return;
    const href = anchor.href;
    event.preventDefault();
    // Independent ceiling also protects against a stalled or broken tag.
    let navigated = false;
    const leave = () => { if (!navigated) { navigated = true; clearTimeout(timer); navigate(href); } };
    const timer = setTimeout(leave, CONTACT_NAVIGATION_TIMEOUT_MS);
    void dispatched.then(leave, leave);
  };
  doc.addEventListener("click", handle);
  return () => doc.removeEventListener("click", handle);
}
