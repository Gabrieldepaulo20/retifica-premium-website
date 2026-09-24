import type { GoogleTag } from "@/lib/google-ads-dispatch";

export function normalizeEnhancedEmail(value?: string) {
  const email = value?.trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return undefined;
  const [local, domain] = email.split("@");
  return `${/^(gmail|googlemail)\.com$/.test(domain) ? local.replaceAll(".", "") : local}@${domain}`;
}

export function normalizeEnhancedPhone(value?: string) {
  const digits = value?.replace(/\D/g, "") ?? "";
  if (/^\d{10,11}$/.test(digits)) return `+55${digits}`;
  if (/^55\d{10,11}$/.test(digits)) return `+${digits}`;
  if (value?.trim().startsWith("+") && /^[1-9]\d{10,14}$/.test(digits)) return `+${digits}`;
  return undefined;
}

/** Call only after successful lead persistence, never while typing. */
export async function sendEnhancedLead(args: {
  enabled: boolean;
  consent: () => boolean;
  allowed: () => boolean;
  gtag?: GoogleTag;
  adsId?: string;
  email?: string;
  phone?: string;
}) {
  if (!args.enabled || !args.consent() || !args.allowed() || !args.gtag || !/^AW-\d+$/.test(args.adsId ?? "")) return false;
  const sha256 = async (value: string) => Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value))), byte => byte.toString(16).padStart(2, "0")).join("");
  try {
    const email = normalizeEnhancedEmail(args.email);
    const phone = normalizeEnhancedPhone(args.phone);
    const data: Record<string, string> = {};
    if (email) data.sha256_email_address = await sha256(email);
    if (phone) data.sha256_phone_number = await sha256(phone);
    if (!Object.keys(data).length || !args.consent() || !args.allowed()) return false;
    args.gtag("set", "user_data", data);
    try { args.gtag("event", "form_submit", { send_to: args.adsId }); }
    finally { args.gtag("set", "user_data", null); }
    return true;
  } catch { return false; }
}
