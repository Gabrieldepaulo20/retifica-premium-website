"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  CONSENT_CHANGED_EVENT,
  hasAnalyticsConsent,
  hasMeasurementConsent,
} from "@/lib/consent";
import {
  captureTrafficAttribution,
  sendExternalMarketingEvent,
  trackMarketingEvent,
} from "@/lib/trackingEvents";

const SCROLL_THRESHOLDS = [50, 75, 90] as const;
const ACTIVE_TIME_STORAGE_KEY = "retifica_premium_active_time_ms";
const ENGAGEMENT_PULSE_MS = 30_000;

export function AnalyticsRuntime() {
  const pathname = usePathname();
  const previousPathnameRef = useRef<string | null>(null);
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
    if (!hasAnalyticsConsent()) return;

    let accumulatedActiveMs = 0;
    let activeStartedAt = document.visibilityState === "visible" ? Date.now() : null;
    let lastReportedSeconds = -1;

    try {
      const stored = Number(window.sessionStorage.getItem(ACTIVE_TIME_STORAGE_KEY));
      if (Number.isFinite(stored) && stored >= 0) accumulatedActiveMs = stored;
    } catch {
      // A medição continua em memória quando o storage está indisponível.
    }

    const persistActiveTime = () => {
      try {
        window.sessionStorage.setItem(
          ACTIVE_TIME_STORAGE_KEY,
          String(Math.round(accumulatedActiveMs))
        );
      } catch {
        // A indisponibilidade do storage não pode afetar o site.
      }
    };

    const reportActiveTime = () => {
      const now = Date.now();
      if (activeStartedAt !== null) {
        accumulatedActiveMs += Math.max(0, now - activeStartedAt);
        activeStartedAt = now;
      }
      persistActiveTime();

      const engagedSeconds = Math.floor(accumulatedActiveMs / 1000);
      if (
        engagedSeconds <= 0 ||
        engagedSeconds === lastReportedSeconds ||
        !hasAnalyticsConsent()
      ) {
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

    if (hasMeasurementConsent()) {
      captureTrafficAttribution();
    }

    if (hasAnalyticsConsent()) {
      sendExternalMarketingEvent("page_view", {
        event_category: "navigation",
        event_label: "page_view",
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
