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
