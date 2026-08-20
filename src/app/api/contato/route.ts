import { NextResponse } from "next/server";
import {
  buildContactEmail,
  sendContactEmail,
  subjectLabels,
} from "@/lib/contact-email";
import { saveExternalMarketingEvent } from "@/lib/external-marketing";
import {
  containsHighConfidencePersonalData,
  MARKETING_EVENT_CONTRACT,
  normalizeMarketingLeadCode,
  sanitizeMarketingClickId,
  sanitizeMarketingEventId,
  sanitizeMarketingEventMetadata,
  sanitizeMarketingPageLocation,
  sanitizeMarketingPath,
  sanitizeMarketingTechnicalId,
} from "@/lib/marketing-event-contract";
import {
  downstreamFailureStatus,
  isRetryableMarketingStatus,
} from "@/lib/marketing-event-delivery";
import { classifyTrafficAttribution } from "@/lib/traffic-attribution";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const productionHostnames = new Set([
  "premiumretifica.com.br",
  "www.premiumretifica.com.br",
]);
const contactRequests = new Map<
  string,
  { count: number; expiresAt: number }
>();
const CONTACT_RATE_WINDOW_MS = 10 * 60 * 1000;
const CONTACT_RATE_MAX = 5;
const measurementModes = new Set<string>(
  MARKETING_EVENT_CONTRACT.metadata.measurementModes
);

type ContactPayload = {
  eventId?: unknown;
  leadCode?: unknown;
  anonymousId?: unknown;
  sessionId?: unknown;
  nome?: unknown;
  telefone?: unknown;
  cidade?: unknown;
  email?: unknown;
  assunto?: unknown;
  mensagem?: unknown;
  b2bLevel?: unknown;
  pageLocation?: unknown;
  measurementMode?: unknown;
  website?: unknown;
  storageOnly?: unknown;
  attribution?: {
    source?: unknown;
    medium?: unknown;
    campaign?: unknown;
    term?: unknown;
    content?: unknown;
    gclid?: unknown;
    gbraid?: unknown;
    wbraid?: unknown;
    landingPage?: unknown;
    referrer?: unknown;
    capturedAt?: unknown;
  };
};

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function cleanNonPersonalText(value: unknown, maxLength: number) {
  const cleaned = cleanText(value, maxLength);
  return cleaned && !containsHighConfidencePersonalData(cleaned) ? cleaned : "";
}

function cleanMultiline(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value
    .replace(/\r\n/g, "\n")
    .replace(/\n{4,}/g, "\n\n\n")
    .trim()
    .slice(0, maxLength);
}

function validEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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

function contactRateKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "unknown";
}

function contactRequestAllowed(request: Request) {
  const now = Date.now();

  if (contactRequests.size > 2_000) {
    for (const [key, entry] of contactRequests) {
      if (entry.expiresAt <= now) contactRequests.delete(key);
    }
  }

  const key = contactRateKey(request);
  const current = contactRequests.get(key);
  if (!current || current.expiresAt <= now) {
    contactRequests.set(key, {
      count: 1,
      expiresAt: now + CONTACT_RATE_WINDOW_MS,
    });
    return true;
  }

  if (current.count >= CONTACT_RATE_MAX) return false;
  current.count += 1;
  return true;
}

function attributionLines(payload: ContactPayload) {
  const attribution = payload.attribution ?? {};
  const clickId =
    sanitizeMarketingClickId(attribution.gclid) ||
    sanitizeMarketingClickId(attribution.gbraid) ||
    sanitizeMarketingClickId(attribution.wbraid);
  const values = [
    ["Fonte", cleanNonPersonalText(attribution.source, 120)],
    ["Mídia", cleanNonPersonalText(attribution.medium, 120)],
    ["Campanha", cleanNonPersonalText(attribution.campaign, 160)],
    ["Termo", cleanNonPersonalText(attribution.term, 160)],
    ["Conteúdo", cleanNonPersonalText(attribution.content, 160)],
    [
      "GCLID/GBRAID/WBRAID",
      clickId,
    ],
    [
      "Página de entrada",
      sanitizeMarketingPageLocation(attribution.landingPage) || "",
    ],
    ["Referência", sanitizeMarketingPageLocation(attribution.referrer) || ""],
    ["Capturado em", cleanText(attribution.capturedAt, 80)],
  ].filter(([, value]) => value);

  return values.map(([label, value]) => `${label}: ${value}`);
}

function pagePathFromLocation(pageLocation: string) {
  if (!pageLocation) return "/";
  try {
    return sanitizeMarketingPath(new URL(pageLocation).pathname);
  } catch {
    return "/";
  }
}

export async function POST(request: Request) {
  if (!requestOriginAllowed(request)) {
    return NextResponse.json(
      { ok: false, message: "Origem não permitida." },
      { status: 403 }
    );
  }

  if (!contactRequestAllowed(request)) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Muitas tentativas em pouco tempo. Aguarde alguns minutos ou use o WhatsApp.",
      },
      { status: 429, headers: { "Retry-After": "600" } }
    );
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 48_000) {
    return NextResponse.json(
      { ok: false, message: "Dados do formulário muito grandes." },
      { status: 413 }
    );
  }

  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Dados inválidos no formulário." },
      { status: 400 }
    );
  }

  const honeypot = cleanText(payload.website, 120);
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  const nome = cleanText(payload.nome, 120);
  const telefone = cleanText(payload.telefone, 80);
  const cidade = cleanText(payload.cidade, 100);
  const email = cleanText(payload.email, 160);
  const assuntoKey = cleanText(payload.assunto, 60);
  const assunto = subjectLabels[assuntoKey] ?? assuntoKey;
  const mensagem = cleanMultiline(payload.mensagem, 2000);
  const b2bLevel = cleanText(payload.b2bLevel, 160);
  const pageLocation = sanitizeMarketingPageLocation(payload.pageLocation) || "";
  const submittedMeasurementMode = cleanText(payload.measurementMode, 40);
  const measurementMode = measurementModes.has(submittedMeasurementMode)
    ? submittedMeasurementMode
    : undefined;
  const eventId = sanitizeMarketingEventId(payload.eventId);
  const storageOnly = payload.storageOnly === true;
  const leadCode = normalizeMarketingLeadCode(payload.leadCode);

  if (!eventId) {
    return NextResponse.json(
      { ok: false, message: "Identificador do evento inválido." },
      { status: 400 }
    );
  }

  if (!leadCode) {
    return NextResponse.json(
      { ok: false, message: "Código do contato inválido." },
      { status: 400 }
    );
  }

  if (!nome || nome.length < 2) {
    return NextResponse.json(
      { ok: false, message: "Informe seu nome." },
      { status: 400 }
    );
  }

  if (telefone.replace(/\D/g, "").length < 8) {
    return NextResponse.json(
      { ok: false, message: "Informe um telefone válido." },
      { status: 400 }
    );
  }

  if (email && !validEmail(email)) {
    return NextResponse.json(
      { ok: false, message: "Informe um e-mail válido ou deixe em branco." },
      { status: 400 }
    );
  }

  if (!assunto) {
    return NextResponse.json(
      { ok: false, message: "Selecione um assunto." },
      { status: 400 }
    );
  }

  if (mensagem.length < 8) {
    return NextResponse.json(
      { ok: false, message: "Descreva brevemente o que você precisa." },
      { status: 400 }
    );
  }

  const sourceLines = [`Código do contato: ${leadCode}`, ...attributionLines(payload)];
  const { text, html } = buildContactEmail({
    nome,
    telefone,
    cidade,
    email,
    assunto,
    mensagem,
    b2bLevel,
    pageLocation,
    sourceLines,
  });

  const attribution = payload.attribution ?? {};
  const gclid = sanitizeMarketingClickId(attribution.gclid);
  const gbraid = sanitizeMarketingClickId(attribution.gbraid);
  const wbraid = sanitizeMarketingClickId(attribution.wbraid);
  const hasGoogleClickId = Boolean(gclid || gbraid || wbraid);
  const referrer =
    sanitizeMarketingPageLocation(attribution.referrer) || undefined;
  const normalizedAttribution = classifyTrafficAttribution({
    source: cleanNonPersonalText(attribution.source, 120) || undefined,
    medium: cleanNonPersonalText(attribution.medium, 120) || undefined,
    referrer,
    hasGoogleClickId,
  });
  const storageEvent = {
    eventId,
    leadCode,
    anonymousId:
      sanitizeMarketingTechnicalId(
        payload.anonymousId,
        MARKETING_EVENT_CONTRACT.limits.anonymousId
      ) || undefined,
    sessionId:
      sanitizeMarketingTechnicalId(
        payload.sessionId,
        MARKETING_EVENT_CONTRACT.limits.sessionId
      ) || undefined,
    eventType: "form_submit",
    channel: "site_form",
    occurredAt: new Date().toISOString(),
    pagePath: pagePathFromLocation(pageLocation),
    pageLocation: pageLocation || undefined,
    referrer,
    source: normalizedAttribution.source || "direto",
    medium: normalizedAttribution.medium,
    campaign: cleanNonPersonalText(attribution.campaign, 180) || undefined,
    term: cleanNonPersonalText(attribution.term, 180) || undefined,
    content: cleanNonPersonalText(attribution.content, 180) || undefined,
    gclid: gclid || undefined,
    gbraid: gbraid || undefined,
    wbraid: wbraid || undefined,
    city: cidade || undefined,
    metadata: sanitizeMarketingEventMetadata({
      // Cidade é dado digitado voluntariamente no formulário, não
      // rastreamento de terceiro. Bloqueada só no modo publicidade-apenas;
      // liberada em análise e no modo essencial (ninguém decidiu ainda).
      visitorCity:
        measurementMode === "analytics" ||
        measurementMode === "analytics_and_advertising" ||
        measurementMode === "essencial"
          ? cidade
          : undefined,
      measurementMode,
      eventContractVersion: MARKETING_EVENT_CONTRACT.schemaVersion,
      mensagem: mensagem || undefined,
      assunto: assunto || undefined,
      nivel_b2b: b2bLevel || undefined,
    }),
    lead: {
      name: nome,
      email: email || undefined,
      phone: telefone,
    },
  };
  const storagePromise = saveExternalMarketingEvent(storageEvent);
  const emailPromise = storageOnly
    ? Promise.resolve(null)
    : sendContactEmail({ nome, email, assunto, text, html });
  const [emailResult, storageResult] = await Promise.allSettled([
    emailPromise,
    storagePromise,
  ]);

  const emailSent = !storageOnly && emailResult.status === "fulfilled";
  if (!storageOnly && emailResult.status === "rejected") {
    const code =
      emailResult.reason instanceof Error
        ? emailResult.reason.message
        : "CONTACT_EMAIL_FAILED";
    console.error("Contact form email failed:", code);
  }

  const storage =
    storageResult.status === "fulfilled"
      ? storageResult.value
      : { configured: true, saved: false };
  const retiflowSaved = storage.saved === true;
  const retiflowStatus = retiflowSaved
    ? storage.status ?? 200
    : downstreamFailureStatus(storage);
  const retiflowRetryable =
    !retiflowSaved && isRetryableMarketingStatus(retiflowStatus);
  const delivery = {
    emailSent,
    retiflowSaved,
    retiflowRetryable,
    retiflowStatus,
  };
  const responseHeaders = storage.retryAfter
    ? { "Retry-After": storage.retryAfter }
    : undefined;

  if (storageOnly && !retiflowSaved) {
    if (retiflowStatus === 204 || retiflowStatus === 304) {
      return new NextResponse(null, {
        status: retiflowStatus,
        headers: responseHeaders,
      });
    }
    return NextResponse.json(
      {
        ok: false,
        leadCode,
        storageOnly: true,
        delivery,
        message:
          "O painel continua indisponível. Seu formulário foi preservado para uma nova tentativa.",
      },
      { status: retiflowStatus, headers: responseHeaders }
    );
  }

  if (!emailSent && !retiflowSaved) {
    if (retiflowStatus === 204 || retiflowStatus === 304) {
      return new NextResponse(null, {
        status: retiflowStatus,
        headers: responseHeaders,
      });
    }
    return NextResponse.json(
      {
        ok: false,
        delivery,
        message:
          "Não conseguimos registrar o pedido agora. Use o WhatsApp para garantir seu atendimento.",
      },
      { status: retiflowStatus, headers: responseHeaders }
    );
  }

  return NextResponse.json(
    {
      ok: true,
      leadCode,
      storageOnly,
      delivery,
      message: retiflowSaved
        ? "Seu pedido ficou registrado para retorno. Se o caso for urgente, você também pode abrir o WhatsApp abaixo."
        : "Seu pedido foi enviado por e-mail, mas ainda não apareceu no painel. Para garantir atendimento imediato, abra o WhatsApp abaixo.",
    },
    { headers: responseHeaders }
  );
}
