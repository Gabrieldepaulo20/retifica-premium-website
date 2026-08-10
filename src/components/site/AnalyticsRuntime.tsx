"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  CONSENT_CHANGED_EVENT,
  hasMeasurementConsent,
} from "@/lib/consent";
import {
  captureTrafficAttribution,
  sendExternalMarketingEvent,
  trackFunnelEvent,
  trackMarketingEvent,
} from "@/lib/trackingEvents";

const SCROLL_THRESHOLDS = [50, 75, 90] as const;
const ACTIVE_TIME_STORAGE_KEY = "retifica_premium_active_time_ms";
const ENGAGEMENT_PULSE_MS = 30_000;

export function AnalyticsRuntime() {
  const pathname = usePathname();
  const previousPathnameRef = useRef<string | null>(null);
  const accumulatedActiveMsRef = useRef(0);
  const [consentRevision, setConsentRevision] = useState(0);

  useEffect(() => {
    const handleConsentChanged = () => {
      setConsentRevision((current) => current + 1);
    };

    window.addEventListener(CONSENT_CHANGED_EVENT, handleConsentChanged);
    return () =>
      window.removeEventListener(CONSENT_CHANGED_EVENT, handleConsentChanged);
  }, []);

  useEffect(() => {
    if (!hasMeasurementConsent()) return;

    let visibleStartedAt = document.visibilityState === "visible" ? performance.now() : null;
    let activeMs = 0;
    const fired = new Set<number>();

    const update = () => {
      const now = performance.now();
      if (visibleStartedAt !== null) {
        activeMs += Math.max(0, now - visibleStartedAt);
        visibleStartedAt = now;
      }

      for (const seconds of [5, 10] as const) {
        if (activeMs >= seconds * 1000 && !fired.has(seconds)) {
          fired.add(seconds);
          trackFunnelEvent(seconds === 5 ? "engagement_5s" : "engagement_10s", {
            component_id: "page_active_time",
            position: "page",
            page_type: pathname.startsWith("/servicos/")
              ? "service_detail"
              : pathname === "/servicos"
                ? "service_catalog"
                : pathname === "/quanto-custa"
                  ? "estimate"
                  : "other",
            engaged_seconds: seconds,
          });
        }
      }
    };

    const handleVisibility = () => {
      update();
      visibleStartedAt = document.visibilityState === "visible" ? performance.now() : null;
    };
    const interval = window.setInterval(update, 250);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [consentRevision, pathname]);

  useEffect(() => {
    let activeStartedAt =
      document.visibilityState === "visible" ? Date.now() : null;
    let lastReportedSeconds = -1;

    if (hasMeasurementConsent()) {
      try {
        const stored = Number(
          window.sessionStorage.getItem(ACTIVE_TIME_STORAGE_KEY)
        );
        if (Number.isFinite(stored) && stored >= 0) {
          accumulatedActiveMsRef.current = Math.max(
            accumulatedActiveMsRef.current,
            stored
          );
        }
      } catch {
        // A medição continua somente em memória quando o storage está indisponível.
      }
    }

    const persistActiveTime = () => {
      if (!hasMeasurementConsent()) return;
      try {
        window.sessionStorage.setItem(
          ACTIVE_TIME_STORAGE_KEY,
          String(Math.round(accumulatedActiveMsRef.current))
        );
      } catch {
        // A indisponibilidade do storage não pode afetar o site.
      }
    };

    const reportActiveTime = () => {
      const now = Date.now();
      if (activeStartedAt !== null) {
        accumulatedActiveMsRef.current += Math.max(0, now - activeStartedAt);
        activeStartedAt = now;
      }
      persistActiveTime();

      const engagedSeconds = Math.floor(accumulatedActiveMsRef.current / 1000);
      if (engagedSeconds <= 0 || engagedSeconds === lastReportedSeconds) {
        return;
      }
      lastReportedSeconds = engagedSeconds;
      sendExternalMarketingEvent("custom", {
        event_category: "engagement",
        event_label: "session_engagement",
        engaged_seconds: engagedSeconds,
      });
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        reportActiveTime();
        activeStartedAt = null;
        return;
      }
      activeStartedAt = Date.now();
    };

    const intervalId = window.setInterval(reportActiveTime, ENGAGEMENT_PULSE_MS);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", reportActiveTime);

    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", reportActiveTime);
      reportActiveTime();
    };
  }, [consentRevision]);

  useEffect(() => {
    const previousPathname = previousPathnameRef.current;
    previousPathnameRef.current = pathname;
    const pathnameChanged =
      previousPathname === null || previousPathname !== pathname;

    captureTrafficAttribution();

    if (pathnameChanged) {
      sendExternalMarketingEvent("page_view", {
        event_category: "navigation",
        event_label: previousPathname === null ? "page_view" : "spa_navigation",
      });
    }

    if (previousPathname !== null && previousPathname !== pathname) {
      trackMarketingEvent("page_view", {
        event_category: "navigation",
        event_label: "spa_navigation",
      });
    }
    const fired = new Set<number>();

    function handleScroll() {
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (documentHeight <= 0) return;

      const percentScrolled = Math.round(
        (window.scrollY / documentHeight) * 100
      );

      for (const threshold of SCROLL_THRESHOLDS) {
        if (percentScrolled >= threshold && !fired.has(threshold)) {
          fired.add(threshold);
          sendExternalMarketingEvent("custom", {
            event_category: "engagement",
            event_label: `scroll_${threshold}`,
            percent_scrolled: threshold,
          });
          trackMarketingEvent("scroll_depth", {
            event_category: "engagement",
            event_label: `scroll_${threshold}`,
            percent_scrolled: threshold,
          });
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [consentRevision, pathname]);

  return null;
}
