export type NormalizedTrafficAttribution = {
  source?: string;
  medium?: string;
  aiEngine?: string;
  originType: "paid" | "organic" | "other";
};

const AI_SOURCE_RULES = [
  { engine: "ChatGPT", hosts: ["chatgpt.com", "chat.openai.com"] },
  { engine: "Perplexity", hosts: ["perplexity.ai"] },
  { engine: "Gemini", hosts: ["gemini.google.com"] },
  { engine: "Microsoft Copilot", hosts: ["copilot.microsoft.com"] },
  { engine: "Claude", hosts: ["claude.ai"] },
  { engine: "Meta AI", hosts: ["meta.ai"] },
  { engine: "Grok", hosts: ["grok.com"] },
  { engine: "You.com", hosts: ["you.com"] },
] as const;

function normalizedHost(value?: string) {
  if (!value) return "";

  try {
    const url = value.includes("://") ? new URL(value) : new URL(`https://${value}`);
    return url.hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return value.toLowerCase().trim().replace(/^www\./, "").split("/")[0];
  }
}

function matchingAiSource(value?: string) {
  const host = normalizedHost(value);
  if (!host) return undefined;

  return AI_SOURCE_RULES.find((rule) =>
    rule.hosts.some((candidate) => host === candidate || host.endsWith(`.${candidate}`))
  );
}

function isOrganicSearchHost(value?: string) {
  const host = normalizedHost(value);
  return (
    host === "google.com" ||
    host.startsWith("google.") ||
    host === "bing.com" ||
    host.endsWith(".bing.com") ||
    host === "search.yahoo.com" ||
    host === "duckduckgo.com" ||
    host.endsWith(".duckduckgo.com") ||
    host === "ecosia.org" ||
    host.endsWith(".ecosia.org") ||
    host === "search.brave.com"
  );
}

export function classifyTrafficAttribution({
  source,
  medium,
  referrer,
  hasGoogleClickId = false,
}: {
  source?: string;
  medium?: string;
  referrer?: string;
  hasGoogleClickId?: boolean;
}): NormalizedTrafficAttribution {
  const cleanSource = source?.trim() || undefined;
  const cleanMedium = medium?.trim() || undefined;
  const sourceMatch = matchingAiSource(cleanSource);
  const referrerMatch = matchingAiSource(referrer);
  const aiMatch = sourceMatch ?? referrerMatch;

  if (aiMatch) {
    return {
      source: cleanSource || aiMatch.hosts[0],
      medium: cleanMedium || "ai_referral",
      aiEngine: aiMatch.engine,
      originType: "other",
    };
  }

  const normalizedMedium = cleanMedium?.toLowerCase();
  const paid = hasGoogleClickId || ["cpc", "ppc", "paid", "paid_search", "display"].includes(normalizedMedium ?? "");
  if (paid) {
    return {
      source: cleanSource || "google",
      medium: cleanMedium || "cpc",
      originType: "paid",
    };
  }

  if (normalizedMedium === "organic" || isOrganicSearchHost(referrer)) {
    return {
      source: cleanSource || normalizedHost(referrer) || "busca organica",
      medium: cleanMedium || "organic",
      originType: "organic",
    };
  }

  return {
    source: cleanSource,
    medium: cleanMedium,
    originType: "other",
  };
}
