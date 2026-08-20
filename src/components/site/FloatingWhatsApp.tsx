"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CONSENT_BANNER_VISIBILITY_EVENT, readConsentPreferences } from "@/lib/consent";
import {
  buildWhatsAppUrlWithAttribution,
  trackEngagementEvent,
} from "@/lib/trackingEvents";
import { siteConfig, whatsappBudgetText, whatsappBudgetUrl } from "@/lib/site";

/**
 * Botão flutuante do WhatsApp.
 *
 * O QUE ESTAVA ACONTECENDO — medido, não suposto
 *
 * A condição era:
 *
 *   if (consentBannerOpen || pathname === "/quanto-custa") return null;
 *
 * Duas exclusões somadas deixavam o visitante pago SEM NENHUM caminho para o
 * WhatsApp na primeira dobra:
 *
 * 1. `consentBannerOpen` nasce `true`, então o botão ficava escondido até a
 *    pessoa decidir sobre cookies. Visitante novo nunca tinha botão.
 * 2. `/quanto-custa` escondia o botão para TODO MUNDO, sempre — e é a principal
 *    página de destino dos anúncios.
 *
 * Medido no Clarity, sessão paga real de 17/08 14:44, palavra-chave
 * "cabeçote ribeirão preto", celular Android: entrou em /quanto-custa, 7,8s,
 * foi para /servicos/teste-de-trinca, 8,7s, ZERO cliques, saiu. Verificado num
 * viewport de 375x812: a primeira dobra tinha "Menu", um ícone de telefone de
 * 18px no cabeçalho e nada mais. Nenhum botão de WhatsApp.
 *
 * A pessoa não saiu sem clicar. Ela saiu porque não havia o que clicar.
 *
 * POR QUE AS DUAS EXCLUSÕES PODEM SAIR AGORA
 *
 * A exclusão por causa do aviso de cookies existia porque os dois disputavam a
 * base da tela no celular. O aviso passou para o TOPO em 19/08, então a colisão
 * não existe mais.
 *
 * A exclusão de /quanto-custa existia para não competir com o CTA da faixa de
 * preço. Só que aquele CTA aparece apenas DEPOIS de responder marca e diesel, e
 * ainda abaixo da dobra. Quem fica 8 segundos nunca chega nele. Um caminho que
 * exige duas respostas não substitui um botão sempre visível.
 */
export function FloatingWhatsApp() {
  const pathname = usePathname();
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

  // `consentBannerOpen` continua sendo lido de propósito: se um dia o aviso
  // voltar para a base da tela, este é o lugar de tratar a colisão de novo.
  void consentBannerOpen;
  void pathname;

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
          {
            component_id: "floating_whatsapp",
            position: "floating",
            destination_type: "whatsapp",
            destination_path: "/whatsapp",
          }
        );
      }}
      /* Verde do WhatsApp, não o gradiente dourado. O dourado é a cor de dado e
         de rótulo técnico no site inteiro — usá-lo aqui fazia o botão brigar
         com o conteúdo em vez de se destacar dele, e é o que deixava a leitura
         confusa no celular.

         Colado na base: antes ficava 96px acima dela no celular, o que fazia o
         botão pairar no meio da tela e cobrir texto. E maior, para o polegar
         acertar sem mira. */
      /* z-[1200] fica ACIMA do aviso de privacidade, que usa z-[1100]. O
         caminho para o WhatsApp nunca pode ser coberto por nada: foi
         justamente por ficar escondido que o visitante pago saía em 8
         segundos sem clicar. */
      className="group fixed bottom-[max(0.9rem,env(safe-area-inset-bottom))] right-3 z-[1200] inline-flex min-h-13 items-center gap-2.5 rounded-full bg-[#25D366] py-2 pl-2 pr-5 text-[#04240F] shadow-[0_12px_30px_rgba(4,36,15,0.45)] ring-1 ring-black/10 transition duration-300 hover:-translate-y-1 hover:brightness-110 active:translate-y-0 md:bottom-5 md:right-5 md:min-h-14"
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
