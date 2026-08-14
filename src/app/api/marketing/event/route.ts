import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import {
  type ExternalMarketingEvent,
  saveExternalMarketingEvent,
  updateExternalMarketingAlert,
} from "@/lib/external-marketing";
import { sendWhatsAppClickAlert } from "@/lib/contact-email";
import { classifyTrafficAttribution } from "@/lib/traffic-attribution";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const allowedEventTypes = new Set([
  "page_view",
  "whatsapp_click",
  "instagram_click",
  "phone_click",
  "directions_click",
  "cta_click",
  "service_detail_click",
  "form_view",
  "form_start",
  "form_field_complete",
  "form_abandon",
  "form_submit_attempt",
  "form_validation_error",
  "form_submit_error",
  "scroll_depth",
  "custom",
]);
const allowedMetadataKeys = new Set([
  "eventLabel",
  "method",
  "formName",
  "lastField",
  "validationReason",
  "elapsedSeconds",
  "fieldsCompleted",
  "completionPercent",
  "engagedSeconds",
  "percentScrolled",
  "experimentId",
  "variantId",
  "componentId",
  "position",
  "pageType",
  "serviceId",
  "flowType",
  "stepId",
  "optionId",
  "fieldId",
  "interactionAction",
  "estimateState",
  "destinationType",
  "destinationPath",
  "visitorCity",
  "sessionOriginType",
  "siteHostname",
  "environment",
  "measurementMode",
  "eventContractVersion",
]);
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
const destinationTypes = new Set([
  "whatsapp",
  "phone",
  "estimate",
  "service",
  "contact",
  "directions",
  "video",
  "other",
]);
const measurementModes = new Set([
  "analytics",
  "advertising",
  "analytics_and_advertising",
]);
const technicalDimensionKeys = new Set([
  "optionId",
  "fieldId",
  "interactionAction",
]);

function clean(value: unknown, max = 500) {
  return typeof value === "string"
    ? value.replace(/\s+/g, " ").trim().slice(0, max)
    : "";
}

function validLeadCode(value: string) {
  return /^RP-(?:\d{8}-[A-Z0-9]{4,16}|\d{4}-\d{2}-[A-Z0-9]{4,16})$/.test(
    value
  );
}

function cleanMetadata(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};

  const metadata: Record<string, string | number | boolean> = {};

  for (const [key, item] of Object.entries(value)) {
    if (!allowedMetadataKeys.has(key)) continue;

    if (key === "destinationType") {
      const destinationType = clean(item, 32).toLowerCase();
      if (destinationTypes.has(destinationType)) {
        metadata[key] = destinationType;
      }
      continue;
    }

    if (key === "destinationPath") {
      const destinationPath = clean(item, 180).split(/[?#]/, 1)[0];
      if (/^\/[a-z0-9/_-]*$/i.test(destinationPath)) {
        metadata[key] = `/${destinationPath.replace(/^\/+/, "")}`;
      }
      continue;
    }

    if (key === "visitorCity") {
      const city = clean(item, 60);
      if (/^[\p{L}\s.'-]+$/u.test(city)) metadata[key] = city;
      continue;
    }

    if (key === "measurementMode") {
      const measurementMode = clean(item, 40);
      if (measurementModes.has(measurementMode)) {
        metadata[key] = measurementMode;
      }
      continue;
    }

    if (technicalDimensionKeys.has(key)) {
      const dimension = clean(item, 100);
      if (
        dimension &&
        /^[A-Za-z0-9_-]+$/.test(dimension) &&
        dimension.replace(/\D/g, "").length < 10
      ) {
        metadata[key] = dimension;
      }
      continue;
    }

    if (typeof item === "string") {
      const cleaned = clean(item, key === "siteHostname" ? 255 : 180);
      if (cleaned) metadata[key] = cleaned;
      continue;
    }

    if (typeof item === "number" && Number.isFinite(item)) {
      metadata[key] = Math.max(-1_000_000, Math.min(1_000_000, item));
      continue;
    }

    if (typeof item === "boolean") metadata[key] = item;
  }

  return metadata;
}

function cleanPagePath(value: unknown) {
  const path = clean(value, 500).split(/[?#]/, 1)[0];
  return path.startsWith("/") ? `/${path.replace(/^\/+/, "")}` : "/";
}

function cleanPageLocation(value: unknown) {
  const location = clean(value, 800);
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
  const referrer = clean(value, 800);
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
  if (contentLength > 32_000) {
    return NextResponse.json(
      { ok: false, message: "Evento muito grande." },
      { status: 413 }
    );
  }

  const rawBody = await request.text().catch(() => "");
  if (rawBody.length > 32_000) {
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
  const eventType = clean(body?.eventType, 60);

  if (!body || !allowedEventTypes.has(eventType)) {
    return NextResponse.json(
      { ok: false, message: "Evento inválido." },
      { status: 400 }
    );
  }

  const normalizedLeadCode = clean(body.leadCode, 40).toUpperCase();
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
    clean(body.gclid, 220) || clean(body.gbraid, 220) || clean(body.wbraid, 220)
  );
  const attribution = classifyTrafficAttribution({
    source: clean(body.source, 120) || undefined,
    medium: clean(body.medium, 120) || undefined,
    referrer: clean(body.referrer, 800) || undefined,
    hasGoogleClickId,
  });
  const pageLocation = cleanPageLocation(body.pageLocation);
  const metadata = cleanMetadata(body.metadata);
  if (
    metadata.measurementMode !== "analytics" &&
    metadata.measurementMode !== "analytics_and_advertising"
  ) {
    delete metadata.visitorCity;
  }
  const environment = pageEnvironment(pageLocation);
  const event: ExternalMarketingEvent = {
    eventId: clean(body.eventId, 80) || randomUUID(),
    leadCode: normalizedLeadCode,
    anonymousId: clean(body.anonymousId, 120) || undefined,
    sessionId: clean(body.sessionId, 120) || undefined,
    eventType,
    channel: clean(body.channel, 80) || undefined,
    occurredAt: clean(body.occurredAt, 80) || new Date().toISOString(),
    pagePath: cleanPagePath(body.pagePath),
    pageLocation,
    pageTitle: clean(body.pageTitle, 300) || undefined,
    referrer: cleanReferrerOrigin(body.referrer),
    source: attribution.source || "direto",
    medium: attribution.medium,
    campaign: clean(body.campaign, 180) || undefined,
    term: clean(body.term, 180) || undefined,
    content: clean(body.content, 180) || undefined,
    gclid: clean(body.gclid, 220) || undefined,
    gbraid: clean(body.gbraid, 220) || undefined,
    wbraid: clean(body.wbraid, 220) || undefined,
    deviceType: clean(body.deviceType, 40) || undefined,
    city:
      typeof metadata.visitorCity === "string"
        ? metadata.visitorCity
        : undefined,
    metadata: {
      ...metadata,
      siteHostname: environment.hostname,
      environment: environment.environment,
    },
  };

  const storage = await saveExternalMarketingEvent(event);
  if (!storage.saved) {
    return NextResponse.json(
      {
        ok: false,
        eventId: event.eventId,
        leadCode: event.leadCode,
        storageSaved: false,
        alertStatus: "not_stored",
        storage,
        message: "Não foi possível armazenar o evento agora.",
      },
      { status: 503 }
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
            error instanceof Error ? error.message : "UNKNOWN_ERROR"
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
