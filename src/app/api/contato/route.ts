import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import {
  buildContactEmail,
  sendContactEmail,
  subjectLabels,
} from "@/lib/contact-email";
import { saveExternalMarketingEvent } from "@/lib/external-marketing";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ContactPayload = {
  eventId?: unknown;
  leadCode?: unknown;
  anonymousId?: unknown;
  sessionId?: unknown;
  nome?: unknown;
  telefone?: unknown;
  email?: unknown;
  assunto?: unknown;
  mensagem?: unknown;
  b2bLevel?: unknown;
  pageLocation?: unknown;
  website?: unknown;
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
  const email = cleanText(payload.email, 160);
  const assuntoKey = cleanText(payload.assunto, 60);
  const assunto = subjectLabels[assuntoKey] ?? assuntoKey;
  const mensagem = cleanMultiline(payload.mensagem, 2000);
  const b2bLevel = cleanText(payload.b2bLevel, 160);
  const pageLocation = cleanText(payload.pageLocation, 400);
  const eventId = cleanText(payload.eventId, 80) || randomUUID();
  const leadCode =
    cleanText(payload.leadCode, 40) ||
    `RP-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${randomUUID()
      .replaceAll("-", "")
      .slice(0, 8)
      .toUpperCase()}`;

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
    email,
    assunto,
    mensagem,
    b2bLevel,
    pageLocation,
    sourceLines,
  });

  try {
    await sendContactEmail({ nome, email, assunto, text, html });
  } catch (error) {
    const code = error instanceof Error ? error.message : "CONTACT_EMAIL_FAILED";
    console.error("Contact form email failed:", code);

    return NextResponse.json(
      {
        ok: false,
        message:
          "Não conseguimos enviar o e-mail agora. Use o WhatsApp para garantir seu atendimento.",
      },
      { status: 503 }
    );
  }

  const attribution = payload.attribution ?? {};
  const storage = await saveExternalMarketingEvent({
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
    source: cleanText(attribution.source, 120) || "direto",
    medium: cleanText(attribution.medium, 120) || undefined,
    campaign: cleanText(attribution.campaign, 180) || undefined,
    term: cleanText(attribution.term, 180) || undefined,
    content: cleanText(attribution.content, 180) || undefined,
    gclid: cleanText(attribution.gclid, 220) || undefined,
    gbraid: cleanText(attribution.gbraid, 220) || undefined,
    wbraid: cleanText(attribution.wbraid, 220) || undefined,
    metadata: {
      subject: assuntoKey,
      b2bLevel: b2bLevel || undefined,
    },
    lead: {
      name: nome,
      email: email || undefined,
      phone: telefone,
    },
  });

  return NextResponse.json({ ok: true, leadCode, storage });
}
