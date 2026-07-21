import { NextResponse } from "next/server";
import {
  buildContactEmail,
  sendContactEmail,
  subjectLabels,
} from "@/lib/contact-email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ContactPayload = {
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

  const sourceLines = attributionLines(payload);
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

  return NextResponse.json({ ok: true });
}
