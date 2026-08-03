export type NormalizedTrafficAttribution = {
  source?: string;
  medium?: string;
  originType: "paid" | "organic" | "other";
};

function normalizedHost(value?: string) {
  if (!value) return "";

  try {
    const url = value.includes("://") ? new URL(value) : new URL(`https://${value}`);
    return url.hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return value.toLowerCase().trim().replace(/^www\./, "").split("/")[0];
  }
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
