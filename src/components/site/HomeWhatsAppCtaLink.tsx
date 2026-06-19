"use client";

import Link from "next/link";
import { trackEngagementEvent } from "@/lib/trackingEvents";
import { whatsappBudgetUrl } from "@/lib/site";

export function HomeWhatsAppCtaLink() {
  return (
    <Link
      href={whatsappBudgetUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="relative z-40 inline-flex h-[50px] w-auto items-center justify-center rounded-[62px] px-6 text-[12px] font-bold uppercase text-white whitespace-nowrap transition-all hover:brightness-110 md:h-[68px] md:px-12 md:text-base"
      style={{
        background: "linear-gradient(0deg, #F3B839 0%, #F4891F 100%)",
      }}
      onClick={(e) => {
        e.stopPropagation();
        trackEngagementEvent(
          "whatsapp_home_cta_click",
          "whatsapp_click",
          "home_cta"
        );
      }}
    >
      Solicitar orçamento pelo WhatsApp
    </Link>
  );
}
