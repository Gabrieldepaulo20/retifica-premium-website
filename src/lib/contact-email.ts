import { createHash, createHmac } from "node:crypto";
import { siteConfig } from "@/lib/site";

export const subjectLabels: Record<string, string> = {
  orcamento: "Solicitar orçamento",
  duvidas: "Tirar dúvidas",
  b2b: "Parceria para oficina",
  outros: "Outros assuntos",
};

type ContactEmailContent = {
  text: string;
  html: string;
};

type ContactEmailInput = {
  nome: string;
  telefone: string;
  cidade?: string;
  email: string;
  assunto: string;
  mensagem: string;
  b2bLevel?: string;
  pageLocation: string;
  sourceLines: string[];
};

type ContactEmailDelivery = {
  nome: string;
  email: string;
  assunto: string;
  text: string;
  html: string;
  subjectLine?: string;
};

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

function validEmailAddress(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function parseEmailList(...values: Array<string | undefined>) {
  const addresses = values
    .flatMap((value) => (value ?? "").split(/[,\n;]/))
    .map((value) => value.trim())
    .filter(Boolean)
    .filter(validEmailAddress);

  return Array.from(new Set(addresses));
}

function recipientEmails() {
  const recipients = parseEmailList(
    process.env.SUPPORT_TO_EMAILS,
    process.env.SUPPORT_TO_EMAIL,
    process.env.CONTACT_EMAIL_TO
  );

  return recipients.length ? recipients : [siteConfig.email];
}

function replyToEmail(leadEmail: string, recipients: string[]) {
  if (validEmailAddress(leadEmail)) return leadEmail;

  const [configuredReplyTo] = parseEmailList(
    process.env.SUPPORT_REPLY_TO_EMAIL,
    process.env.CONTACT_EMAIL_REPLY_TO
  );

  return configuredReplyTo || recipients[0] || siteConfig.email;
}

function formatEmailAddress(email: string, displayName?: string) {
  const address = email.replace(/[\r\n]/g, "").trim();
  if (address.includes("<") && address.includes(">")) return address;

  const safeName = (displayName ?? "").replace(/["\r\n]/g, "").trim();
  return safeName ? `"${safeName}" <${address}>` : address;
}

function normalizeBrazilPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 13) return "";
  if (digits.startsWith("55")) return digits;
  return `55${digits}`;
}

function leadWhatsappUrl(telefone: string, nome: string) {
  const phone = normalizeBrazilPhone(telefone);
  if (!phone) return "";

  const text = `Olá, ${nome}. Recebemos seu contato pelo site da Retífica Premium e vamos te ajudar com o orçamento.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
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

export function buildContactEmail({
  nome,
  telefone,
  cidade,
  email,
  assunto,
  mensagem,
  b2bLevel,
  pageLocation,
  sourceLines,
}: ContactEmailInput): ContactEmailContent {
  const whatsappUrl = leadWhatsappUrl(telefone, nome);
  const leadRows = [
    ["Nome", nome],
    ["Telefone/WhatsApp", telefone],
    ["Cidade", cidade || "Não informada"],
    ["E-mail", email || "Não informado"],
    ["Assunto", assunto],
    ...(b2bLevel ? [["Nível B2B escolhido", b2bLevel]] : []),
    ["Página do formulário", pageLocation || "Não informada"],
  ];
  const textLines = [
    "Novo lead pelo site da Retífica Premium",
    "",
    `Nome: ${nome}`,
    `Telefone/WhatsApp: ${telefone}`,
    cidade ? `Cidade: ${cidade}` : "Cidade: Não informada",
    email ? `E-mail: ${email}` : "E-mail: Não informado",
    `Assunto: ${assunto}`,
    b2bLevel ? `Nível B2B escolhido: ${b2bLevel}` : "",
    "",
    "Mensagem:",
    mensagem,
    "",
    "Ações rápidas:",
    whatsappUrl ? `Responder no WhatsApp do cliente: ${whatsappUrl}` : "",
    `Telefone da Retífica Premium: ${siteConfig.phone.display}`,
    `WhatsApp da Retífica Premium: ${siteConfig.whatsapp.display}`,
    "",
    "Origem do contato:",
    pageLocation ? `Página do formulário: ${pageLocation}` : "",
    ...sourceLines,
  ].filter(Boolean);

  const htmlRows = leadRows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding: 12px 14px; color: #64748b; font-size: 13px; border-bottom: 1px solid #e5e7eb; width: 170px;">${escapeHtml(
            label
          )}</td>
          <td style="padding: 12px 14px; color: #0f172a; font-size: 15px; font-weight: 700; border-bottom: 1px solid #e5e7eb;">${escapeHtml(
            value
          )}</td>
        </tr>
      `
    )
    .join("");

  const sourceHtml = sourceLines.length
    ? `
      <div style="margin-top: 22px;">
        <h2 style="margin: 0 0 10px; color: #0f172a; font-size: 16px;">Origem e campanha</h2>
        <div style="background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 10px; padding: 12px 16px;">
          ${sourceLines
            .map(
              (line) =>
                `<p style="margin: 6px 0; color: #475569; font-size: 13px;">${escapeHtml(
                  line
                )}</p>`
            )
            .join("")}
        </div>
      </div>
    `
    : "";

  const html = `
    <!doctype html>
    <html lang="pt-BR">
      <body style="margin: 0; padding: 0; background: #eef2f7; font-family: Arial, Helvetica, sans-serif;">
        <div style="display: none; max-height: 0; overflow: hidden; opacity: 0;">
          Novo lead do site: ${escapeHtml(nome)} - ${escapeHtml(assunto)}
        </div>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: #eef2f7; padding: 28px 12px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 680px; background: #ffffff; border-radius: 18px; overflow: hidden; box-shadow: 0 18px 45px rgba(15, 23, 42, 0.12);">
                <tr>
                  <td style="background: #0f172a; padding: 28px 30px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td>
                          <div style="display: inline-block; background: #0891b2; color: #ffffff; width: 44px; height: 44px; line-height: 44px; text-align: center; border-radius: 12px; font-weight: 800; font-size: 18px;">RP</div>
                        </td>
                        <td align="right">
                          <span style="display: inline-block; padding: 7px 12px; border-radius: 999px; background: rgba(20, 184, 166, 0.16); color: #a7f3d0; font-size: 12px; font-weight: 700; letter-spacing: 0.02em;">Novo lead do site</span>
                        </td>
                      </tr>
                    </table>
                    <h1 style="margin: 22px 0 8px; color: #ffffff; font-size: 26px; line-height: 1.25;">${escapeHtml(
                      nome
                    )} pediu contato</h1>
                    <p style="margin: 0; color: #cbd5e1; font-size: 15px; line-height: 1.6;">Lead recebido pelo formulário da Retífica Premium. Priorize retorno rápido por WhatsApp ou ligação.</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 26px 30px 30px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; border-collapse: separate;">
                      ${htmlRows}
                    </table>

                    ${
                      whatsappUrl
                        ? `<div style="margin: 22px 0 4px;">
                            <a href="${escapeHtml(
                              whatsappUrl
                            )}" style="display: inline-block; background: #16a34a; color: #ffffff; text-decoration: none; padding: 13px 18px; border-radius: 10px; font-size: 15px; font-weight: 800;">Responder no WhatsApp do cliente</a>
                          </div>`
                        : ""
                    }

                    <div style="margin-top: 24px;">
                      <h2 style="margin: 0 0 10px; color: #0f172a; font-size: 16px;">Mensagem do cliente</h2>
                      <div style="background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; color: #1f2937; font-size: 15px; line-height: 1.65; white-space: pre-line;">${escapeHtml(
                        mensagem
                      )}</div>
                    </div>

                    ${sourceHtml}

                    <div style="margin-top: 24px; padding-top: 18px; border-top: 1px solid #e5e7eb; color: #64748b; font-size: 12px; line-height: 1.5;">
                      <strong style="color: #334155;">Retífica Premium</strong><br>
                      ${escapeHtml(siteConfig.phone.display)} | WhatsApp ${escapeHtml(
                        siteConfig.whatsapp.display
                      )}<br>
                      ${escapeHtml(siteConfig.address.formatted)}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  return { text: textLines.join("\n"), html };
}

async function sendWithResend({
  nome,
  email,
  assunto,
  text,
  html,
  subjectLine,
}: ContactEmailDelivery) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_EMAIL_FROM;
  const to = recipientEmails();

  if (!apiKey || !from || !to.length) {
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
      to,
      reply_to: replyToEmail(email, to),
      subject: subjectLine || `[Site] ${assunto} - ${nome}`,
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
  subjectLine,
}: ContactEmailDelivery) {
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
  const to = recipientEmails();
  const replyTo = replyToEmail(email, to);

  if (!accessKey || !secretKey || !from || !to.length) {
    throw new Error("SES_EMAIL_NOT_CONFIGURED");
  }

  async function sendToRecipient(recipient: string) {
    const host = `email.${region}.amazonaws.com`;
    const path = "/v2/email/outbound-emails";
    const body = JSON.stringify({
      FromEmailAddress: formatEmailAddress(from, fromName),
      ReplyToAddresses: [replyTo],
      Destination: { ToAddresses: [recipient] },
      Content: {
        Simple: {
          Subject: {
            Data: subjectLine || `[Site] ${assunto} - ${nome}`,
            Charset: "UTF-8",
          },
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

  const results = await Promise.allSettled(to.map(sendToRecipient));
  const delivered = results.filter((result) => result.status === "fulfilled");
  const failed = results.length - delivered.length;

  if (failed && delivered.length) {
    console.warn("Contact form email partially delivered:", failed);
  }

  if (!delivered.length) {
    const firstFailure = results.find(
      (result): result is PromiseRejectedResult => result.status === "rejected"
    );
    throw firstFailure?.reason ?? new Error("SES_EMAIL_FAILED");
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

export async function sendContactEmail(params: ContactEmailDelivery) {
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

type MarketingAlertInput = {
  leadCode: string;
  occurredAt: string;
  pageLocation: string;
  source?: string;
  conferium?: string;
  campaign?: string;
  term?: string;
  deviceType?: string;
};

export async function sendWhatsAppClickAlert({
  leadCode,
  occurredAt,
  pageLocation,
  source,
  conferium,
  campaign,
  term,
  deviceType,
}: MarketingAlertInput) {
  const rows = [
    ["Código", leadCode],
    ["Horário", occurredAt],
    ["Página", pageLocation],
    ["Fonte", source || "direto"],
    ["Mídia", conferium || "não informada"],
    ["Campanha", campaign || "não informada"],
    ["Termo", term || "não informado"],
    ["Dispositivo", deviceType || "não informado"],
  ];
  const text = [
    "Clique único no WhatsApp pelo site",
    "",
    "Atenção: este alerta confirma somente o clique. Não comprova que a mensagem foi enviada.",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
  ].join("\n");
  const htmlRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:9px 12px;color:#64748b;border-bottom:1px solid #e5e7eb">${escapeHtml(
          label
        )}</td><td style="padding:9px 12px;color:#0f172a;font-weight:700;border-bottom:1px solid #e5e7eb">${escapeHtml(
          value
        )}</td></tr>`
    )
    .join("");
  const html = `
    <!doctype html>
    <html lang="pt-BR">
      <body style="margin:0;background:#eef2f7;font-family:Arial,Helvetica,sans-serif;padding:24px">
        <div style="max-width:680px;margin:auto;background:#fff;border-radius:16px;overflow:hidden">
          <div style="background:#0f172a;color:#fff;padding:24px">
            <div style="font-size:12px;color:#f8c454;font-weight:800;letter-spacing:.08em">RETÍFICA PREMIUM</div>
            <h1 style="margin:10px 0 4px;font-size:24px">Clique único no WhatsApp</h1>
            <p style="margin:0;color:#cbd5e1">Código ${escapeHtml(leadCode)}</p>
          </div>
          <div style="padding:24px">
            <p style="margin:0 0 18px;padding:12px;border-radius:10px;background:#fff7ed;color:#9a3412;font-weight:700">
              Este alerta confirma apenas o clique. A mensagem pode não ter sido enviada pelo visitante.
            </p>
            <table width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e5e7eb;border-radius:10px;overflow:hidden">
              ${htmlRows}
            </table>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendContactEmail({
    nome: leadCode,
    email: "",
    assunto: "Clique no WhatsApp",
    subjectLine: `[Site] Clique no WhatsApp - ${leadCode}`,
    text,
    html,
  });
}
