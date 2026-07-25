"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import {
  captureTrafficAttribution,
  sendExternalMarketingEvent,
  trackMarketingEvent,
} from "@/lib/trackingEvents";

const SCROLL_THRESHOLDS = [50, 75, 90] as const;

export function AnalyticsRuntime() {
  const pathname = usePathname();
  const previousPathnameRef = useRef<string | null>(null);

  useEffect(() => {
    captureTrafficAttribution();
    sendExternalMarketingEvent("page_view", {
      event_category: "navigation",
      event_label: "page_view",
    });

    if (
      previousPathnameRef.current !== null &&
      previousPathnameRef.current !== pathname
    ) {
      trackMarketingEvent("page_view", {
        event_category: "navigation",
        event_label: "spa_navigation",
        page_location: window.location.href,
      });
    }
    previousPathnameRef.current = pathname;

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
  }, [pathname]);

  return null;
}
