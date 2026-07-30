export type NormalizedTrafficAttribution = {
  source?: string;
  medium?: string;
  aiEngine?: string;
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
    };
  }

  return {
    source: cleanSource || (hasGoogleClickId ? "google" : undefined),
    medium: cleanMedium || (hasGoogleClickId ? "cpc" : undefined),
  };
}
