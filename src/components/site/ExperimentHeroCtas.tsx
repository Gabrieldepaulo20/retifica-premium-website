"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { TrackedPhoneLink, TrackedWhatsAppLink } from "@/components/site/TrackedLinks";
import {
  SERVICES_HERO_EXPERIMENT_ID,
  normalizeServicesHeroExperimentId,
  normalizeServicesHeroVariant,
} from "@/lib/marketing-experiment";
import { siteConfig } from "@/lib/site";
import { trackFunnelEvent } from "@/lib/trackingEvents";

export function ExperimentHeroCtas({ whatsappMessage }: { whatsappMessage: string }) {
  const searchParams = useSearchParams();
  const variantId = normalizeServicesHeroVariant(
    searchParams.get("variant_id") ?? searchParams.get("variant"),
    "organic"
  );
  const experimentId = normalizeServicesHeroExperimentId(
    searchParams.get("experiment_id") ??
      searchParams.get("exp") ??
      SERVICES_HERO_EXPERIMENT_ID
  );
  const common = useMemo(
    () => ({
      experiment_id: experimentId,
      variant_id: variantId,
      position: "services_hero",
      page_type: "service_catalog",
    }),
    [experimentId, variantId]
  );

  useEffect(() => {
    trackFunnelEvent("cta_impression", {
      ...common,
      component_id: variantId === "guided_v1" ? "hero_guided_estimate" : "hero_whatsapp",
    });
  }, [common, variantId]);

  if (variantId === "guided_v1") {
    const query = new URLSearchParams({
      experiment_id: experimentId,
      variant_id: variantId,
    });

    return (
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href={`/quanto-custa?${query.toString()}`}
          onClick={() =>
            trackFunnelEvent("cta_click", {
              ...common,
              component_id: "hero_guided_estimate",
              destination_type: "estimate",
              destination_path: "/quanto-custa",
            })
          }
          className="inline-flex min-h-14 items-center justify-center rounded-full bg-rp-gold px-7 text-center font-heading text-base font-bold text-[#1A1200] transition hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Descubra o que pode precisar — cerca de 2 min
        </Link>
        <TrackedWhatsAppLink
          eventLabel="servicos_hero_whatsapp_secondary"
          message={whatsappMessage}
          onClick={() =>
            trackFunnelEvent("cta_click", {
              ...common,
              component_id: "hero_whatsapp_secondary",
              destination_type: "whatsapp",
              destination_path: "/whatsapp",
            })
          }
          className="inline-flex min-h-14 items-center justify-center rounded-full border border-[#25D366]/70 px-7 font-heading text-base font-bold text-[#60e795] transition hover:bg-[#25D366] hover:text-[#04240F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Ir direto ao WhatsApp
        </TrackedWhatsAppLink>
      </div>
    );
  }

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <TrackedWhatsAppLink
        eventLabel="servicos_hero_whatsapp"
        message={whatsappMessage}
        onClick={() =>
          trackFunnelEvent("cta_click", {
            ...common,
            component_id: "hero_whatsapp",
            destination_type: "whatsapp",
            destination_path: "/whatsapp",
          })
        }
        className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#25D366] px-7 font-heading text-base font-bold text-[#04240F] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        Pedir orçamento no WhatsApp
      </TrackedWhatsAppLink>
      <TrackedPhoneLink
        eventLabel="servicos_hero_phone"
        onClick={() =>
          trackFunnelEvent("cta_click", {
            ...common,
            component_id: "hero_phone",
            destination_type: "phone",
            destination_path: "/phone",
          })
        }
        className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/35 px-7 font-heading text-base font-bold text-white transition hover:border-rp-gold hover:text-rp-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        Ligar {siteConfig.phone.display}
      </TrackedPhoneLink>
    </div>
  );
}
