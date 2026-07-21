"use client";

import Image from "next/image";
import Link from "next/link";
import {
  buildWhatsAppUrlWithAttribution,
  trackEngagementEvent,
} from "@/lib/trackingEvents";
import { siteConfig, whatsappBudgetText, whatsappBudgetUrl } from "@/lib/site";

export function FloatingWhatsApp() {
  return (
    <Link
      href={whatsappBudgetUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        e.stopPropagation();
        e.currentTarget.href = buildWhatsAppUrlWithAttribution(
          siteConfig.whatsapp.number,
          whatsappBudgetText
        );
        trackEngagementEvent(
          "whatsapp_floating_click",
          "whatsapp_click",
          "floating"
        );
      }}
      className="fixed bottom-[calc(60px+env(safe-area-inset-bottom))] right-4 z-[999] animate-bounce-subtle transition-transform duration-300 hover:scale-110 active:scale-105 max-[640px]:bottom-[calc(96px+env(safe-area-inset-bottom))] md:bottom-5 md:right-5"
      aria-label="Chamar no WhatsApp"
    >
      <div className="relative h-[52px] w-[52px] overflow-hidden rounded-full shadow-lg ring-2 ring-white/20 transition-all hover:shadow-2xl hover:ring-white/40 md:h-[68px] md:w-[68px]">
        <Image
          src="/whatsapprodape.png"
          alt="WhatsApp"
          width={68}
          height={68}
          className="h-full w-full object-cover"
        />
      </div>
    </Link>
  );
}
