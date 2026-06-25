import { NextResponse } from "next/server";
import { createHash, createHmac } from "node:crypto";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ContactPayload = {
  nome?: unknown;
  telefone?: unknown;
  email?: unknown;
  assunto?: unknown;
  mensagem?: unknown;
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

const subjectLabels: Record<string, string> = {
  orcamento: "Solicitar orçamento",
  duvidas: "Tirar dúvidas",
  b2b: "Parceria para oficina",
  outros: "Outros assuntos",
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

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[char] ?? char;
  });
}

function validEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function formatEmailAddress(email: string, displayName?: string) {
  const address = email.replace(/[\r\n]/g, "").trim();
  if (address.includes("<") && address.includes(">")) return address;

  const safeName = (displayName ?? "").replace(/["\r\n]/g, "").trim();
  return safeName ? `"${safeName}" <${address}>` : address;
}

function sha256Hex(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function hmac(key: Buffer | string, value: string) {
  return createHmac("sha256", key).update(value).digest();
}

function hmacHex(key: Buffer | string, value: string) {
  return createHmac("sha256", key).update(value).digest("hex");
}

function signingKey(secret: string, date: string, region: string) {
  const kDate = hmac(`AWS4${secret}`, date);
  const kRegion = hmac(kDate, region);
  const kService = hmac(kRegion, "ses");
  return hmac(kService, "aws4_request");
}

function amzDates(now = new Date()) {
  const iso = now.toISOString().replace(/[:-]|\.\d{3}/g, "");
  return { amzDate: iso, dateStamp: iso.slice(0, 8) };
}

function attributionLines(payload: ContactPayload) {
  const attribution = payload.attribution ?? {};
  const values = [
    ["Fonte", cleanText(attribution.source, 120)],
    ["Mídia", cleanText(attribution.medium, 120)],
    ["Campanha", cleanText(attribution.campaign, 160)],
    ["Termo", cleanText(attribution.term, 160)],
    ["Conteúdo", cleanText(attribution.content, 160)],
    ["GCLID/GBRAID/WBRAID", cleanText(attribution.gclid, 220) || cleanText(attribution.gbraid, 220) || cleanText(attribution.wbraid, 220)],
    ["Página de entrada", cleanText(attribution.landingPage, 400)],
    ["Referência", cleanText(attribution.referrer, 400)],
    ["Capturado em", cleanText(attribution.capturedAt, 80)],
  ].filter(([, value]) => value);

  return values.map(([label, value]) => `${label}: ${value}`);
}

function buildEmail({
  nome,
  telefone,
  email,
  assunto,
  mensagem,
  pageLocation,
  sourceLines,
}: {
  nome: string;
  telefone: string;
  email: string;
  assunto: string;
  mensagem: string;
  pageLocation: string;
  sourceLines: string[];
}) {
  const leadLines = [
    `Nome: ${nome}`,
    `Telefone/WhatsApp: ${telefone}`,
    email ? `E-mail: ${email}` : "",
    `Assunto: ${assunto}`,
    "",
    "Mensagem:",
    mensagem,
    "",
    "Origem do contato:",
    pageLocation ? `Página do formulário: ${pageLocation}` : "",
    ...sourceLines,
  ].filter(Boolean);

  const text = leadLines.join("\n");
  const htmlRows = [
    ["Nome", nome],
    ["Telefone/WhatsApp", telefone],
    ["E-mail", email || "Não informado"],
    ["Assunto", assunto],
    ["Página do formulário", pageLocation || "Não informada"],
  ];

  const html = `
    <div style="font-family: Arial, sans-serif; color: #1f2937; line-height: 1.5;">
      <h1 style="font-size: 22px; color: #0f2f65;">Novo lead pelo site da Retífica Premium</h1>
      <table style="border-collapse: collapse; width: 100%; max-width: 640px;">
        ${htmlRows
          .map(
            ([label, value]) => `
              <tr>
                <td style="border: 1px solid #e5e7eb; padding: 8px 10px; font-weight: 700; width: 190px;">${escapeHtml(label)}</td>
                <td style="border: 1px solid #e5e7eb; padding: 8px 10px;">${escapeHtml(value)}</td>
              </tr>
            `
          )
          .join("")}
      </table>
      <h2 style="font-size: 16px; margin-top: 20px;">Mensagem</h2>
      <p style="white-space: pre-line; background: #f9fafb; border: 1px solid #e5e7eb; padding: 12px;">${escapeHtml(
        mensagem
      )}</p>
      ${
        sourceLines.length
          ? `<h2 style="font-size: 16px; margin-top: 20px;">Origem e campanha</h2><ul>${sourceLines
              .map((line) => `<li>${escapeHtml(line)}</li>`)
              .join("")}</ul>`
          : ""
      }
    </div>
  `;

  return { text, html };
}

async function sendWithResend({
  nome,
  email,
  assunto,
  text,
  html,
}: {
  nome: string;
  email: string;
  assunto: string;
  text: string;
  html: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_EMAIL_FROM;
  const to = process.env.CONTACT_EMAIL_TO || siteConfig.email;

  if (!apiKey || !from || !to) {
    throw new Error("CONTACT_EMAIL_NOT_CONFIGURED");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email || undefined,
      subject: `[Site] ${assunto} - ${nome}`,
      text,
      html,
    }),
  });

  if (!response.ok) {
    throw new Error(`RESEND_EMAIL_FAILED_${response.status}`);
  }
}

async function sendWithSes({
  nome,
  email,
  assunto,
  text,
  html,
}: {
  nome: string;
  email: string;
  assunto: string;
  text: string;
  html: string;
}) {
  const region =
    process.env.SES_REGION ||
    process.env.AWS_REGION ||
    process.env.AWS_SES_REGION ||
    "us-east-1";
  const accessKey =
    process.env.SES_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID || "";
  const secretKey =
    process.env.SES_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY || "";
  const from =
    process.env.SUPPORT_FROM_EMAIL ||
    process.env.CONTACT_EMAIL_FROM ||
    "";
  const fromName =
    process.env.SUPPORT_FROM_NAME ||
    process.env.CONTACT_EMAIL_FROM_NAME ||
    siteConfig.name;
  const to =
    process.env.SUPPORT_TO_EMAIL ||
    process.env.CONTACT_EMAIL_TO ||
    siteConfig.email;
  const replyTo =
    email ||
    process.env.SUPPORT_REPLY_TO_EMAIL ||
    process.env.CONTACT_EMAIL_REPLY_TO ||
    to;

  if (!accessKey || !secretKey || !from || !to) {
    throw new Error("SES_EMAIL_NOT_CONFIGURED");
  }

  const host = `email.${region}.amazonaws.com`;
  const path = "/v2/email/outbound-emails";
  const body = JSON.stringify({
    FromEmailAddress: formatEmailAddress(from, fromName),
    ReplyToAddresses: [replyTo],
    Destination: { ToAddresses: [to] },
    Content: {
      Simple: {
        Subject: { Data: `[Site] ${assunto} - ${nome}`, Charset: "UTF-8" },
        Body: {
          Text: { Data: text, Charset: "UTF-8" },
          Html: { Data: html, Charset: "UTF-8" },
        },
      },
    },
  });

  const { amzDate, dateStamp } = amzDates();
  const payloadHash = sha256Hex(body);
  const canonicalHeaders = `content-type:application/json\nhost:${host}\nx-amz-date:${amzDate}\n`;
  const signedHeaders = "content-type;host;x-amz-date";
  const canonicalRequest = [
    "POST",
    path,
    "",
    canonicalHeaders,
    signedHeaders,
    payloadHash,
  ].join("\n");
  const credentialScope = `${dateStamp}/${region}/ses/aws4_request`;
  const stringToSign = [
    "AWS4-HMAC-SHA256",
    amzDate,
    credentialScope,
    sha256Hex(canonicalRequest),
  ].join("\n");
  const signature = hmacHex(
    signingKey(secretKey, dateStamp, region),
    stringToSign
  );
  const authorization = `AWS4-HMAC-SHA256 Credential=${accessKey}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

  const response = await fetch(`https://${host}${path}`, {
    method: "POST",
    headers: {
      Authorization: authorization,
      "Content-Type": "application/json",
      "X-Amz-Date": amzDate,
    },
    body,
  });

  if (!response.ok) {
    throw new Error(`SES_EMAIL_FAILED_${response.status}`);
  }
}

function hasResendConfig() {
  return Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_EMAIL_FROM);
}

function hasSesConfig() {
  return Boolean(
    (process.env.SES_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID) &&
      (process.env.SES_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY) &&
      (process.env.CONTACT_EMAIL_FROM || process.env.SUPPORT_FROM_EMAIL)
  );
}

async function sendContactEmail(params: {
  nome: string;
  email: string;
  assunto: string;
  text: string;
  html: string;
}) {
  if (hasResendConfig()) {
    try {
      return await sendWithResend(params);
    } catch (error) {
      if (!hasSesConfig()) throw error;
    }
  }

  if (hasSesConfig()) {
    return sendWithSes(params);
  }

  throw new Error("CONTACT_EMAIL_NOT_CONFIGURED");
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
  const { text, html } = buildEmail({
    nome,
    telefone,
    email,
    assunto,
    mensagem,
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
