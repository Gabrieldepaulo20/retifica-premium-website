export type ClarityEventName =
  | "whatsapp_floating_click"
  | "whatsapp_home_cta_click"
  | "whatsapp_footer_click"
  | "instagram_footer_click";

type GaEventName = "whatsapp_click" | "instagram_click";

type TrackingWindow = Window & {
  clarity?: (command: "event", eventName: ClarityEventName) => void;
  gtag?: (
    command: "event",
    eventName: GaEventName,
    params: {
      event_category: "engagement";
      event_label: string;
    }
  ) => void;
};

export function trackEngagementEvent(
  clarityEventName: ClarityEventName,
  gaEventName: GaEventName,
  gaEventLabel: string
) {
  if (typeof window === "undefined") return;

  const trackingWindow = window as TrackingWindow;

  if (typeof trackingWindow.clarity === "function") {
    trackingWindow.clarity("event", clarityEventName);
  }

  if (typeof trackingWindow.gtag === "function") {
    trackingWindow.gtag("event", gaEventName, {
      event_category: "engagement",
      event_label: gaEventLabel,
    });
  }
}
