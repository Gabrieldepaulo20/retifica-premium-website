"use client";

import Link from "next/link";
import { trackEngagementEvent } from "@/lib/trackingEvents";

export function HomeWhatsAppCtaLink() {
  return (
    <Link
      href="https://wa.me/5516993021998?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Ret%C3%ADfica%20Premium%20e%20gostaria%20de%20solicitar%20um%20or%C3%A7amento%20para%20ret%C3%ADfica%20de%20cabe%C3%A7ote."
      target="_blank"
      rel="noopener noreferrer"
      className="relative z-40 inline-flex h-[50px] w-auto items-center justify-center rounded-[62px] px-6 text-[12px] font-bold uppercase text-white whitespace-nowrap transition-all hover:brightness-110 md:h-[68px] md:px-12 md:text-base"
      style={{
        background: "linear-gradient(0deg, #F3B839 0%, #F4891F 100%)",
      }}
      onClick={() =>
        trackEngagementEvent(
          "whatsapp_home_cta_click",
          "whatsapp_click",
          "home_cta"
        )
      }
    >
      Solicitar orçamento pelo WhatsApp
    </Link>
  );
}
