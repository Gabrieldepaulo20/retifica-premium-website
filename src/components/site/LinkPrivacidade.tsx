"use client";

import Link from "next/link";
import { ABRIR_PREFERENCIAS_EVENTO } from "@/components/site/CookieConsent";

/**
 * Link de privacidade do rodapé.
 *
 * Substitui o botão flutuante que ficava colado na base da tela: no celular ele
 * disputava espaço com o WhatsApp e cobria conteúdo. Aqui ele abre o painel de
 * preferências sem ocupar área útil — a LGPD pede que dê para rever o
 * consentimento a qualquer momento, não que isso fique flutuando na tela.
 *
 * Se o JavaScript não tiver carregado, o link continua funcionando e leva para
 * a página de privacidade.
 */
export function LinkPrivacidade({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/privacidade"
      className={className}
      onClick={(e) => {
        // Só intercepta em clique simples: cmd/ctrl+clique e botão do meio
        // continuam abrindo a página numa aba nova.
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        window.dispatchEvent(new Event(ABRIR_PREFERENCIAS_EVENTO));
      }}
    >
      Privacidade e cookies
    </Link>
  );
}
