"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  CONSENT_CHANGED_EVENT,
  CONSENT_RUNTIME_READY_EVENT,
  hasAnalyticsConsent,
  isConsentRuntimeReady,
} from "@/lib/consent";
import {
  captureTrafficAttribution,
  flushExternalMarketingEventOutbox,
  getOrCreateContactIntent,
  MEASUREMENT_SESSION_ROTATED_EVENT,
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
  const lastMeasuredPathnameRef = useRef<string | null>(null);
  const accumulatedActiveMsRef = useRef(0);
  const sessionRevisionRef = useRef(0);
  const [consentReady, setConsentReady] = useState(false);
  const [consentRevision, setConsentRevision] = useState(0);
  const [sessionRevision, setSessionRevision] = useState(0);

  useEffect(() => {
    const handleConsentChanged = () => {
      setConsentRevision((current) => current + 1);
    };
    const handleRuntimeReady = () => {
      setConsentReady(true);
      setConsentRevision((current) => current + 1);
    };
    const handleSessionRotated = () => {
      const nextRevision = sessionRevisionRef.current + 1;
      sessionRevisionRef.current = nextRevision;
      accumulatedActiveMsRef.current = 0;
      previousPathnameRef.current = null;
      lastMeasuredPathnameRef.current = null;
      setSessionRevision(nextRevision);
    };

    window.addEventListener(CONSENT_CHANGED_EVENT, handleConsentChanged);
    window.addEventListener(CONSENT_RUNTIME_READY_EVENT, handleRuntimeReady);
    window.addEventListener(
      MEASUREMENT_SESSION_ROTATED_EVENT,
      handleSessionRotated
    );
    if (isConsentRuntimeReady()) handleRuntimeReady();

    return () => {
      window.removeEventListener(CONSENT_CHANGED_EVENT, handleConsentChanged);
      window.removeEventListener(CONSENT_RUNTIME_READY_EVENT, handleRuntimeReady);
      window.removeEventListener(
        MEASUREMENT_SESSION_ROTATED_EVENT,
        handleSessionRotated
      );
    };
  }, []);

  useEffect(() => {
    if (!consentReady) return;

    const flushOutbox = () => {
      void flushExternalMarketingEventOutbox();
    };
    window.addEventListener("online", flushOutbox);
    flushOutbox();

    return () => window.removeEventListener("online", flushOutbox);
  }, [consentReady, consentRevision, sessionRevision]);

  useEffect(() => {
    if (!consentReady || !hasAnalyticsConsent()) return;

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
  }, [consentReady, consentRevision, pathname, sessionRevision]);

  useEffect(() => {
    if (!consentReady || !hasAnalyticsConsent()) {
      accumulatedActiveMsRef.current = 0;
      return;
    }

    const effectSessionRevision = sessionRevision;
    let activeStartedAt =
      document.visibilityState === "visible" ? Date.now() : null;
    let lastReportedSeconds = -1;

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

    const persistActiveTime = () => {
      if (!hasAnalyticsConsent()) return;
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
      // Verifica a janela de 30 min antes de voltar a acumular tempo. Se a
      // sessão expirou, o evento de rotação zera os refs antes do novo pulso.
      getOrCreateContactIntent();
      activeStartedAt = Date.now();
    };

    const intervalId = window.setInterval(reportActiveTime, ENGAGEMENT_PULSE_MS);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", reportActiveTime);

    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", reportActiveTime);
      if (effectSessionRevision === sessionRevisionRef.current) {
        reportActiveTime();
      }
    };
  }, [consentReady, consentRevision, sessionRevision]);

  useEffect(() => {
    if (!consentReady) return;

    const previousPathname = previousPathnameRef.current;
    previousPathnameRef.current = pathname;

    captureTrafficAttribution();

    if (
      hasAnalyticsConsent() &&
      lastMeasuredPathnameRef.current !== pathname
    ) {
      trackMarketingEvent("page_view", {
        event_category: "navigation",
        event_label:
          lastMeasuredPathnameRef.current === null || previousPathname === null
            ? "page_view"
            : "spa_navigation",
      });
      lastMeasuredPathnameRef.current = pathname;
    }

    if (!hasAnalyticsConsent()) return;
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
  }, [consentReady, consentRevision, pathname, sessionRevision]);

  return null;
}
