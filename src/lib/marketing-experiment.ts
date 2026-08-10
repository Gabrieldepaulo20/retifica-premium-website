export const SERVICES_HERO_EXPERIMENT_ID = "services-hero-v1";

export type ServicesHeroVariant =
  | "guided_v1"
  | "whatsapp_direct"
  | "organic";

export function normalizeServicesHeroExperimentId(value: string | null) {
  if (value === SERVICES_HERO_EXPERIMENT_ID) return value;
  return SERVICES_HERO_EXPERIMENT_ID;
}

export function normalizeServicesHeroVariant(
  value: string | null,
  fallback: ServicesHeroVariant
): ServicesHeroVariant {
  if (["guided", "guided_v1", "estimate", "treatment"].includes(value ?? "")) {
    return "guided_v1";
  }
  if (["whatsapp_direct", "control"].includes(value ?? "")) {
    return "whatsapp_direct";
  }
  if (value === "organic") return "organic";
  return fallback;
}
