import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import {
  buildContactEmail,
  sendContactEmail,
  subjectLabels,
} from "@/lib/contact-email";
import { saveExternalMarketingEvent } from "@/lib/external-marketing";
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

function validLeadCode(value: string) {
  return /^RP-(?:\d{8}-[A-Z0-9]{4,16}|\d{4}-\d{2}-[A-Z0-9]{4,16})$/.test(
    value
  );
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
  const values = [
    ["Fonte", cleanText(attribution.source, 120)],
    ["Mídia", cleanText(attribution.medium, 120)],
    ["Campanha", cleanText(attribution.campaign, 160)],
    ["Termo", cleanText(attribution.term, 160)],
    ["Conteúdo", cleanText(attribution.content, 160)],
    [
      "GCLID/GBRAID/WBRAID",
      cleanText(attribution.gclid, 220) ||
        cleanText(attribution.gbraid, 220) ||
        cleanText(attribution.wbraid, 220),
    ],
    ["Página de entrada", cleanText(attribution.landingPage, 400)],
    ["Referência", cleanText(attribution.referrer, 400)],
    ["Capturado em", cleanText(attribution.capturedAt, 80)],
  ].filter(([, value]) => value);

  return values.map(([label, value]) => `${label}: ${value}`);
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
  const pageLocation = cleanText(payload.pageLocation, 400);
  const eventId = cleanText(payload.eventId, 80) || randomUUID();
  const storageOnly = payload.storageOnly === true;
  const submittedLeadCode = cleanText(payload.leadCode, 40).toUpperCase();
  const leadCode = submittedLeadCode ||
    `RP-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${randomUUID()
      .replaceAll("-", "")
      .slice(0, 8)
      .toUpperCase()}`;

  if (!validLeadCode(leadCode)) {
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
  const hasGoogleClickId = Boolean(
    cleanText(attribution.gclid, 220) ||
      cleanText(attribution.gbraid, 220) ||
      cleanText(attribution.wbraid, 220)
  );
  const normalizedAttribution = classifyTrafficAttribution({
    source: cleanText(attribution.source, 120) || undefined,
    medium: cleanText(attribution.medium, 120) || undefined,
    referrer: cleanText(attribution.referrer, 800) || undefined,
    hasGoogleClickId,
  });
  const storageEvent = {
    eventId,
    leadCode,
    anonymousId: cleanText(payload.anonymousId, 120) || undefined,
    sessionId: cleanText(payload.sessionId, 120) || undefined,
    eventType: "form_submit",
    channel: "site_form",
    occurredAt: new Date().toISOString(),
    pagePath: (() => {
      try {
        return new URL(pageLocation).pathname;
      } catch {
        return "/";
      }
    })(),
    pageLocation,
    referrer: cleanText(attribution.referrer, 800) || undefined,
    source: normalizedAttribution.source || "direto",
    medium: normalizedAttribution.medium,
    campaign: cleanText(attribution.campaign, 180) || undefined,
    term: cleanText(attribution.term, 180) || undefined,
    content: cleanText(attribution.content, 180) || undefined,
    gclid: cleanText(attribution.gclid, 220) || undefined,
    gbraid: cleanText(attribution.gbraid, 220) || undefined,
    wbraid: cleanText(attribution.wbraid, 220) || undefined,
    city: cidade || undefined,
    metadata: {
      subject: assuntoKey,
      b2bLevel: b2bLevel || undefined,
    },
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

  let storage =
    storageResult.status === "fulfilled"
      ? storageResult.value
      : { configured: true, saved: false };
  if (storage.configured && !storage.saved) {
    storage = await saveExternalMarketingEvent(storageEvent);
  }
  const retiflowSaved = storage.saved === true;

  if (storageOnly && !retiflowSaved) {
    return NextResponse.json(
      {
        ok: false,
        leadCode,
        storageOnly: true,
        delivery: { emailSent: false, retiflowSaved: false },
        message:
          "O painel continua indisponível. Seu formulário foi preservado para uma nova tentativa.",
      },
      { status: 503 }
    );
  }

  if (!emailSent && !retiflowSaved) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Não conseguimos registrar o pedido agora. Use o WhatsApp para garantir seu atendimento.",
      },
      { status: 503 }
    );
  }

  return NextResponse.json({
    ok: true,
    leadCode,
    storageOnly,
    delivery: { emailSent, retiflowSaved },
    message: retiflowSaved
      ? "Seu pedido ficou registrado para retorno. Se o caso for urgente, você também pode abrir o WhatsApp abaixo."
      : "Seu pedido foi enviado por e-mail, mas ainda não apareceu no painel. Para garantir atendimento imediato, abra o WhatsApp abaixo.",
  });
}
