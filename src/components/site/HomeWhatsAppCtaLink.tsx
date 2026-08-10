"use client";

import Link from "next/link";
import {
  buildWhatsAppUrlWithAttribution,
  trackEngagementEvent,
} from "@/lib/trackingEvents";
import { siteConfig, whatsappBudgetText, whatsappBudgetUrl } from "@/lib/site";

export function HomeWhatsAppCtaLink() {
  return (
    <Link
      href={whatsappBudgetUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="relative z-40 inline-flex h-[46px] w-auto items-center justify-center rounded-full px-6 text-[12px] font-bold uppercase text-white whitespace-nowrap transition-all hover:brightness-110 md:h-[54px] md:px-9 md:text-[15px]"
      style={{
        background: "linear-gradient(0deg, #F3B839 0%, #F4891F 100%)",
      }}
      onClick={(e) => {
        e.stopPropagation();
        e.currentTarget.href = buildWhatsAppUrlWithAttribution(
          siteConfig.whatsapp.number,
          whatsappBudgetText
        );
        trackEngagementEvent(
          "whatsapp_home_cta_click",
          "whatsapp_click",
          "home_cta",
          {
            component_id: "home_whatsapp_cta",
            position: "home_hero",
            destination_type: "whatsapp",
            destination_path: "/whatsapp",
          }
        );
      }}
    >
      Solicitar orçamento pelo WhatsApp
    </Link>
  );
}
