"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CONSENT_BANNER_VISIBILITY_EVENT, readConsentPreferences } from "@/lib/consent";
import {
  buildWhatsAppUrlWithAttribution,
  trackEngagementEvent,
} from "@/lib/trackingEvents";
import { siteConfig, whatsappBudgetText, whatsappBudgetUrl } from "@/lib/site";

export function FloatingWhatsApp() {
  const [consentBannerOpen, setConsentBannerOpen] = useState(true);

  useEffect(() => {
    const handleVisibility = (event: Event) => {
      const customEvent = event as CustomEvent<{ open?: boolean }>;
      setConsentBannerOpen(Boolean(customEvent.detail?.open));
    };
    window.addEventListener(CONSENT_BANNER_VISIBILITY_EVENT, handleVisibility);
    const initializationTimer = window.setTimeout(
      () => setConsentBannerOpen(!readConsentPreferences()),
      0
    );
    return () => {
      window.clearTimeout(initializationTimer);
      window.removeEventListener(CONSENT_BANNER_VISIBILITY_EVENT, handleVisibility);
    };
  }, []);

  if (consentBannerOpen) return null;

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
          "floating",
          { component_id: "floating_whatsapp", position: "floating" }
        );
      }}
      /* Verde do WhatsApp, não o gradiente dourado. O dourado é a cor de dado e
         de rótulo técnico no site inteiro — usá-lo aqui fazia o botão brigar
         com o conteúdo em vez de se destacar dele, e é o que deixava a leitura
         confusa no celular.

         Colado na base: antes ficava 96px acima dela no celular, o que fazia o
         botão pairar no meio da tela e cobrir texto. E maior, para o polegar
         acertar sem mira. */
      className="group fixed bottom-[max(0.9rem,env(safe-area-inset-bottom))] right-3 z-[999] inline-flex min-h-13 items-center gap-2.5 rounded-full bg-[#25D366] py-2 pl-2 pr-5 text-[#04240F] shadow-[0_12px_30px_rgba(4,36,15,0.45)] ring-1 ring-black/10 transition duration-300 hover:-translate-y-1 hover:brightness-110 active:translate-y-0 md:bottom-5 md:right-5 md:min-h-14"
      aria-label="Fale conosco no WhatsApp"
    >
      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm md:h-10 md:w-10">
        <Image
          src="/whatsapprodape.png"
          alt=""
          width={40}
          height={40}
          className="h-7 w-7 object-contain md:h-8 md:w-8"
          aria-hidden="true"
        />
      </span>
      <span className="whitespace-nowrap font-heading text-sm font-bold leading-none md:text-base">
        Fale no WhatsApp
      </span>
    </Link>
  );
}
