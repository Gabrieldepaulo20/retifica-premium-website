import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import {
  type ExternalMarketingEvent,
  saveExternalMarketingEvent,
  updateExternalMarketingAlert,
} from "@/lib/external-marketing";
import { sendWhatsAppClickAlert } from "@/lib/contact-email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const allowedEventTypes = new Set([
  "page_view",
  "whatsapp_click",
  "phone_click",
  "form_view",
  "form_start",
  "form_abandon",
  "form_submit_attempt",
  "form_submit",
  "form_validation_error",
  "form_submit_error",
]);
const whatsappDedupe = new Map<string, { expiresAt: number }>();
const DEDUPE_MS = 30 * 60 * 1000;

function clean(value: unknown, max = 500) {
  return typeof value === "string"
    ? value.replace(/\s+/g, " ").trim().slice(0, max)
    : "";
}

function cleanMetadata(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};

  return Object.fromEntries(
    Object.entries(value)
      .slice(0, 20)
      .map(([key, item]) => [
        key.slice(0, 80),
        typeof item === "string" ? item.slice(0, 300) : item,
      ])
  );
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
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 32_000) {
    return NextResponse.json(
      { ok: false, message: "Evento muito grande." },
      { status: 413 }
    );
  }

  const body = (await request.json().catch(() => null)) as
    | Record<string, unknown>
    | null;
  const eventType = clean(body?.eventType, 60);

  if (!body || !allowedEventTypes.has(eventType)) {
    return NextResponse.json(
      { ok: false, message: "Evento inválido." },
      { status: 400 }
    );
  }

  const event: ExternalMarketingEvent = {
    eventId: clean(body.eventId, 80) || randomUUID(),
    leadCode: clean(body.leadCode, 40),
    anonymousId: clean(body.anonymousId, 120) || undefined,
    sessionId: clean(body.sessionId, 120) || undefined,
    eventType,
    channel: clean(body.channel, 80) || undefined,
    occurredAt: clean(body.occurredAt, 80) || new Date().toISOString(),
    pagePath: clean(body.pagePath, 500) || "/",
    pageLocation: clean(body.pageLocation, 800) || undefined,
    pageTitle: clean(body.pageTitle, 300) || undefined,
    referrer: clean(body.referrer, 800) || undefined,
    source: clean(body.source, 120) || "direto",
    medium: clean(body.medium, 120) || undefined,
    campaign: clean(body.campaign, 180) || undefined,
    term: clean(body.term, 180) || undefined,
    content: clean(body.content, 180) || undefined,
    gclid: clean(body.gclid, 220) || undefined,
    gbraid: clean(body.gbraid, 220) || undefined,
    wbraid: clean(body.wbraid, 220) || undefined,
    deviceType: clean(body.deviceType, 40) || undefined,
    metadata: cleanMetadata(body.metadata),
  };

  if (!event.leadCode) {
    return NextResponse.json(
      { ok: false, message: "Código do contato ausente." },
      { status: 400 }
    );
  }

  const dedupeKey = `${event.sessionId || event.anonymousId || "unknown"}:${eventType}:${event.eventId}`;
  if (eventType === "whatsapp_click" && isRecentDuplicate(dedupeKey)) {
    return NextResponse.json({
      ok: true,
      eventId: event.eventId,
      leadCode: event.leadCode,
      deduplicated: true,
      alertStatus: "already_sent",
    });
  }

  const storage = await saveExternalMarketingEvent(event);
  let alertStatus = "not_required";

  if (eventType === "whatsapp_click") {
    if (storage.saved && storage.deduplicated) {
      return NextResponse.json({
        ok: true,
        eventId: storage.storedEventId || event.eventId,
        leadCode: event.leadCode,
        deduplicated: true,
        alertStatus: "already_sent",
        storage,
      });
    }

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
      whatsappDedupe.delete(dedupeKey);
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

  return NextResponse.json(
    {
      ok: true,
      eventId: event.eventId,
      leadCode: event.leadCode,
      deduplicated: false,
      alertStatus,
      storage,
    },
    {
      status:
        alertStatus === "failed" || (storage.configured && !storage.saved)
          ? 202
          : 200,
    }
  );
}
