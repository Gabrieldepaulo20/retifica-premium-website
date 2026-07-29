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
      className="group fixed bottom-[calc(60px+env(safe-area-inset-bottom))] right-3 z-[999] inline-flex min-h-11 items-center gap-2 rounded-full border border-white/70 bg-[#25D366] py-1.5 pl-1.5 pr-3 text-[#052E16] shadow-[0_12px_30px_rgba(5,46,22,0.28)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(5,46,22,0.36)] active:translate-y-0 max-[640px]:bottom-[calc(96px+env(safe-area-inset-bottom))] md:bottom-5 md:right-5 md:min-h-14 md:gap-2.5 md:py-2 md:pl-2 md:pr-5"
      aria-label="Fale conosco no WhatsApp"
    >
      <span className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-black/5 md:h-10 md:w-10">
        <Image
          src="/whatsapprodape.png"
          alt="WhatsApp"
          width={40}
          height={40}
          className="h-7 w-7 object-contain md:h-9 md:w-9"
        />
      </span>
      <span
        className="whitespace-nowrap text-[11px] font-extrabold leading-none tracking-[-0.01em] md:text-sm"
        style={{ fontFamily: "var(--font-open-sans)" }}
      >
        Fale no WhatsApp
      </span>
    </Link>
  );
}
