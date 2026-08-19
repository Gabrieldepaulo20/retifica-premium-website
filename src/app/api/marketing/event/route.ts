import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import {
  type ExternalMarketingEvent,
  saveExternalMarketingEvent,
  updateExternalMarketingAlert,
} from "@/lib/external-marketing";
import {
  containsHighConfidencePersonalData,
  MARKETING_EVENT_CONTRACT,
  normalizeMarketingEventType,
  sanitizeMarketingEventMetadata,
} from "@/lib/marketing-event-contract";
import { downstreamFailureStatus } from "@/lib/marketing-event-delivery";
import { sendWhatsAppClickAlert } from "@/lib/contact-email";
import { classifyTrafficAttribution } from "@/lib/traffic-attribution";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const whatsappDedupe = new Map<string, { expiresAt: number }>();
const DEDUPE_MS = 30 * 60 * 1000;
const eventRequests = new Map<string, { count: number; expiresAt: number }>();
const whatsappRequests = new Map<string, { count: number; expiresAt: number }>();
const EVENT_RATE_WINDOW_MS = 10 * 60 * 1000;
const EVENT_RATE_MAX = 180;
const WHATSAPP_RATE_MAX = 12;
const productionHostnames = new Set([
  "premiumretifica.com.br",
  "www.premiumretifica.com.br",
]);
function clean(value: unknown, max = 500) {
  return typeof value === "string"
    ? value.replace(/\s+/g, " ").trim().slice(0, max)
    : "";
}

function cleanNonPersonal(value: unknown, max: number) {
  const cleaned = clean(value, max);
  return cleaned && !containsHighConfidencePersonalData(cleaned) ? cleaned : "";
}

function validLeadCode(value: string) {
  return /^RP-(?:\d{8}-[A-Z0-9]{4,16}|\d{4}-\d{2}-[A-Z0-9]{4,16})$/.test(
    value
  );
}

function cleanPagePath(value: unknown) {
  const path = clean(value, MARKETING_EVENT_CONTRACT.limits.pagePath).split(
    /[?#]/,
    1
  )[0];
  return path.startsWith("/") ? `/${path.replace(/^\/+/, "")}` : "/";
}

function cleanPageLocation(value: unknown) {
  const location = clean(value, MARKETING_EVENT_CONTRACT.limits.pageLocation);
  if (!location) return undefined;

  try {
    const url = new URL(location);
    if (url.protocol !== "https:" && url.protocol !== "http:") return undefined;
    return `${url.origin}${url.pathname}`;
  } catch {
    return undefined;
  }
}

function cleanReferrerOrigin(value: unknown) {
  const referrer = clean(value, MARKETING_EVENT_CONTRACT.limits.referrer);
  if (!referrer) return undefined;

  try {
    const url = new URL(referrer);
    return url.protocol === "https:" || url.protocol === "http:"
      ? url.origin
      : undefined;
  } catch {
    return undefined;
  }
}

function requestOriginAllowed(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return process.env.NODE_ENV !== "production";

  try {
    const originHostname = new URL(origin).hostname.toLowerCase();
    const requestHostname = new URL(request.url).hostname.toLowerCase();
    return (
      originHostname === requestHostname ||
      productionHostnames.has(originHostname)
    );
  } catch {
    return false;
  }
}

function requestRateKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "unknown";
}

function consumeRateLimit(
  requests: Map<string, { count: number; expiresAt: number }>,
  key: string,
  maximum: number
) {
  const now = Date.now();

  if (requests.size > 2_000) {
    for (const [storedKey, entry] of requests) {
      if (entry.expiresAt <= now) requests.delete(storedKey);
    }
  }

  const current = requests.get(key);
  if (!current || current.expiresAt <= now) {
    requests.set(key, { count: 1, expiresAt: now + EVENT_RATE_WINDOW_MS });
    return true;
  }
  if (current.count >= maximum) return false;
  current.count += 1;
  return true;
}

function eventRequestAllowed(request: Request, eventType: string) {
  const key = requestRateKey(request);
  if (!consumeRateLimit(eventRequests, key, EVENT_RATE_MAX)) return false;
  return (
    eventType !== "whatsapp_click" ||
    consumeRateLimit(whatsappRequests, key, WHATSAPP_RATE_MAX)
  );
}

function pageEnvironment(pageLocation?: string) {
  if (!pageLocation) return { hostname: "unknown", environment: "unknown" };

  const hostname = new URL(pageLocation).hostname.toLowerCase();
  return {
    hostname,
    environment: productionHostnames.has(hostname)
      ? "production"
      : hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1"
        ? "development"
        : "preview",
  };
}

function isRecentDuplicate(key: string) {
  const now = Date.now();

  for (const [storedKey, entry] of whatsappDedupe) {
    if (entry.expiresAt <= now) whatsappDedupe.delete(storedKey);
  }

  const entry = whatsappDedupe.get(key);
  if (entry && entry.expiresAt > now) return true;

  whatsappDedupe.set(key, { expiresAt: now + DEDUPE_MS });
  return false;
}

export async function POST(request: Request) {
  if (!requestOriginAllowed(request)) {
    return NextResponse.json(
      { ok: false, message: "Origem não permitida." },
      { status: 403 }
    );
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MARKETING_EVENT_CONTRACT.limits.bodyBytes) {
    return NextResponse.json(
      { ok: false, message: "Evento muito grande." },
      { status: 413 }
    );
  }

  const rawBody = await request.text().catch(() => "");
  if (
    new TextEncoder().encode(rawBody).byteLength >
    MARKETING_EVENT_CONTRACT.limits.bodyBytes
  ) {
    return NextResponse.json(
      { ok: false, message: "Evento muito grande." },
      { status: 413 }
    );
  }

  let body: Record<string, unknown> | null = null;
  try {
    const parsed = JSON.parse(rawBody) as unknown;
    body = parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? parsed as Record<string, unknown>
      : null;
  } catch {
    body = null;
  }
  const eventDefinition = normalizeMarketingEventType(body?.eventType);

  if (!body || !eventDefinition) {
    return NextResponse.json(
      { ok: false, message: "Evento inválido." },
      { status: 400 }
    );
  }
  const eventType = eventDefinition.name;

  const normalizedLeadCode = clean(
    body.leadCode,
    MARKETING_EVENT_CONTRACT.limits.leadCode
  ).toUpperCase();
  if (!validLeadCode(normalizedLeadCode)) {
    return NextResponse.json(
      { ok: false, message: "Código do contato inválido." },
      { status: 400 }
    );
  }

  if (!eventRequestAllowed(request, eventType)) {
    return NextResponse.json(
      { ok: false, message: "Muitos eventos em pouco tempo." },
      { status: 429, headers: { "Retry-After": "600" } }
    );
  }

  const hasGoogleClickId = Boolean(
    clean(body.gclid, MARKETING_EVENT_CONTRACT.limits.clickId) ||
      clean(body.gbraid, MARKETING_EVENT_CONTRACT.limits.clickId) ||
      clean(body.wbraid, MARKETING_EVENT_CONTRACT.limits.clickId)
  );
  const attribution = classifyTrafficAttribution({
    source:
      cleanNonPersonal(body.source, MARKETING_EVENT_CONTRACT.limits.source) ||
      undefined,
    medium:
      cleanNonPersonal(body.medium, MARKETING_EVENT_CONTRACT.limits.medium) ||
      undefined,
    referrer: cleanReferrerOrigin(body.referrer),
    hasGoogleClickId,
  });
  const pageLocation = cleanPageLocation(body.pageLocation);
  const metadata = sanitizeMarketingEventMetadata(body.metadata);
  if (
    metadata.measurementMode !== "analytics" &&
    metadata.measurementMode !== "analytics_and_advertising"
  ) {
    delete metadata.visitorCity;
  }
  const environment = pageEnvironment(pageLocation);
  const event: ExternalMarketingEvent = {
    eventId:
      clean(body.eventId, MARKETING_EVENT_CONTRACT.limits.eventId) ||
      randomUUID(),
    leadCode: normalizedLeadCode,
    anonymousId:
      clean(body.anonymousId, MARKETING_EVENT_CONTRACT.limits.anonymousId) ||
      undefined,
    sessionId:
      clean(body.sessionId, MARKETING_EVENT_CONTRACT.limits.sessionId) ||
      undefined,
    eventType,
    channel:
      cleanNonPersonal(body.channel, MARKETING_EVENT_CONTRACT.limits.channel) ||
      undefined,
    occurredAt:
      clean(body.occurredAt, MARKETING_EVENT_CONTRACT.limits.occurredAt) ||
      new Date().toISOString(),
    pagePath: cleanPagePath(body.pagePath),
    pageLocation,
    pageTitle:
      cleanNonPersonal(
        body.pageTitle,
        MARKETING_EVENT_CONTRACT.limits.pageTitle
      ) || undefined,
    referrer: cleanReferrerOrigin(body.referrer),
    source: attribution.source || "direto",
    medium: attribution.medium,
    campaign:
      cleanNonPersonal(body.campaign, MARKETING_EVENT_CONTRACT.limits.campaign) ||
      undefined,
    term:
      cleanNonPersonal(body.term, MARKETING_EVENT_CONTRACT.limits.term) ||
      undefined,
    content:
      cleanNonPersonal(body.content, MARKETING_EVENT_CONTRACT.limits.content) ||
      undefined,
    gclid:
      clean(body.gclid, MARKETING_EVENT_CONTRACT.limits.clickId) || undefined,
    gbraid:
      clean(body.gbraid, MARKETING_EVENT_CONTRACT.limits.clickId) || undefined,
    wbraid:
      clean(body.wbraid, MARKETING_EVENT_CONTRACT.limits.clickId) || undefined,
    deviceType:
      cleanNonPersonal(
        body.deviceType,
        MARKETING_EVENT_CONTRACT.limits.deviceType
      ) || undefined,
    city:
      typeof metadata.visitorCity === "string"
        ? metadata.visitorCity
        : undefined,
    metadata: {
      ...metadata,
      siteHostname: environment.hostname,
      environment: environment.environment,
      eventContractVersion: MARKETING_EVENT_CONTRACT.schemaVersion,
    },
  };

  const storage = await saveExternalMarketingEvent(event);
  if (!storage.saved) {
    const failureStatus = downstreamFailureStatus(storage);
    const headers = storage.retryAfter
      ? { "Retry-After": storage.retryAfter }
      : undefined;
    if (failureStatus === 204 || failureStatus === 304) {
      return new NextResponse(null, { status: failureStatus, headers });
    }
    return NextResponse.json(
      {
        ok: false,
        eventId: event.eventId,
        leadCode: event.leadCode,
        storageSaved: false,
        alertStatus: "not_stored",
        storage: {
          configured: storage.configured,
          saved: false,
          status: storage.status,
        },
        message: "O destino não confirmou o armazenamento do evento.",
      },
      { status: failureStatus, headers }
    );
  }

  let alertStatus = "not_required";
  let alertAlreadySent = false;

  if (eventType === "whatsapp_click") {
    if (storage.deduplicated || storage.shouldAlert !== true) {
      alertStatus = storage.deduplicated ? "already_sent" : "not_requested";
    } else {
      const alertDedupeKey = `${event.sessionId || event.anonymousId || "unknown"}:${eventType}:${event.leadCode}`;
      alertAlreadySent = isRecentDuplicate(alertDedupeKey);
      if (alertAlreadySent) {
        alertStatus = "already_sent";
        void updateExternalMarketingAlert(
          storage.storedEventId || event.eventId,
          "already_sent"
        );
      } else {
        try {
          await sendWhatsAppClickAlert({
            leadCode: event.leadCode,
            occurredAt: event.occurredAt || new Date().toISOString(),
            pageLocation: event.pageLocation || event.pagePath || "/",
            source: event.source,
            medium: event.medium,
            campaign: event.campaign,
            term: event.term,
            deviceType: event.deviceType,
          });
          alertStatus = "sent";
          void updateExternalMarketingAlert(
            storage.storedEventId || event.eventId,
            "sent"
          );
        } catch (error) {
          alertStatus = "failed";
          whatsappDedupe.delete(alertDedupeKey);
          void updateExternalMarketingAlert(
            storage.storedEventId || event.eventId,
            "failed"
          );
          console.error(
            "WhatsApp click alert failed:",
            error instanceof Error ? error.name : "UNKNOWN_ERROR"
          );
        }
      }
    }
  }

  return NextResponse.json({
    ok: true,
    eventId: storage.storedEventId || event.eventId,
    leadCode: event.leadCode,
    deduplicated: storage.deduplicated === true,
    alertDeduplicated: alertAlreadySent,
    alertStatus,
    storageSaved: true,
    storage,
  });
}
