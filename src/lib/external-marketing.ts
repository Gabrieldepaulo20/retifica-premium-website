export type ExternalMarketingEvent = {
  eventId: string;
  leadCode: string;
  anonymousId?: string;
  sessionId?: string;
  eventType: string;
  channel?: string;
  occurredAt?: string;
  pagePath?: string;
  pageLocation?: string;
  pageTitle?: string;
  referrer?: string;
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  deviceType?: string;
  /** Cidade informada voluntariamente no formulário/quiz. */
  city?: string;
  /** UF informada voluntariamente, quando disponível. */
  region?: string;
  metadata?: Record<string, unknown>;
  lead?: {
    name?: string;
    email?: string;
    phone?: string;
  };
};

export type ExternalMarketingResult = {
  configured: boolean;
  saved: boolean;
  status?: number;
  deduplicated?: boolean;
  shouldAlert?: boolean;
  storedEventId?: string;
};

const EXTERNAL_REQUEST_TIMEOUT_MS = 10_000;

export async function saveExternalMarketingEvent(
  event: ExternalMarketingEvent
): Promise<ExternalMarketingResult> {
  const endpoint = process.env.EXTERNAL_MARKETING_EVENTS_URL;
  const siteKey = process.env.EXTERNAL_MARKETING_SITE_KEY;

  if (!endpoint || !siteKey) {
    return { configured: false, saved: false };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-site-key": siteKey,
      },
      body: JSON.stringify({ ...event, siteKey }),
      cache: "no-store",
      signal: AbortSignal.timeout(EXTERNAL_REQUEST_TIMEOUT_MS),
    });

    const result = (await response.json().catch(() => null)) as {
      ok?: boolean;
      eventId?: string;
      deduplicated?: boolean;
      shouldAlert?: boolean;
    } | null;

    return {
      configured: true,
      saved: response.ok && result?.ok === true,
      status: response.status,
      deduplicated: result?.deduplicated,
      shouldAlert: result?.shouldAlert,
      storedEventId: result?.eventId,
    };
  } catch {
    return { configured: true, saved: false };
  }
}

export async function updateExternalMarketingAlert(
  eventId: string,
  alertStatus: "sent" | "failed" | "already_sent"
) {
  const endpoint = process.env.EXTERNAL_MARKETING_EVENTS_URL;
  const siteKey = process.env.EXTERNAL_MARKETING_SITE_KEY;
  if (!endpoint || !siteKey) return;

  try {
    await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        operation: "alert_update",
        eventId,
        alertStatus,
        siteKey,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(EXTERNAL_REQUEST_TIMEOUT_MS),
    });
  } catch {
    // O alerta já foi processado; a atualização de qualidade pode ser refeita.
  }
}
