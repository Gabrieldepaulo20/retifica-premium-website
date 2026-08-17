"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { LinkPrivacidade } from "@/components/site/LinkPrivacidade";
import { siteConfig, whatsappBudgetText } from "@/lib/site";
import {
  buildWhatsAppUrlWithAttribution,
  trackEngagementEvent,
  trackMarketingEvent,
} from "@/lib/trackingEvents";

const HORARIOS = [
  { dia: "Segunda-feira", horario: "08:00–11:30, 13:00–18:00" },
  { dia: "Terça-feira", horario: "08:00–11:30, 13:00–18:00" },
  { dia: "Quarta-feira", horario: "08:00–11:30, 13:00–18:00" },
  { dia: "Quinta-feira", horario: "08:00–11:30, 13:00–18:00" },
  { dia: "Sexta-feira", horario: "08:00–12:00, 13:00–17:30" },
  { dia: "Sábado", horario: "Fechado" },
  { dia: "Domingo", horario: "Fechado" },
] as const;

const FOOTER_LINKS = [
  { id: "about", href: "/sobre", label: "Sobre a Retífica" },
  { id: "services", href: "/servicos", label: "Nossos Serviços" },
  {
    id: "ribeirao",
    href: "/retifica-em-ribeirao-preto",
    label: "Retífica em Ribeirão Preto",
  },
  { id: "region", href: "/servicos#regiao", label: "Região atendida" },
  { id: "b2b", href: "/b2b", label: "Parceria B2B (Oficinas)" },
  { id: "contact", href: "/contato", label: "Fale Conosco" },
] as const;

function FooterNavLink({
  id,
  href,
  position,
  children,
}: {
  id: string;
  href: string;
  position: string;
  children: ReactNode;
}) {
  const destinationPath = href.split(/[?#]/, 1)[0] || "/";
  const destinationType = destinationPath.startsWith("/servicos")
    ? "service"
    : destinationPath === "/contato"
      ? "contact"
      : "other";

  return (
    <Link
      href={href}
      onClick={() =>
        trackMarketingEvent("cta_click", {
          event_category: "navigation",
          event_label: `footer_${id}`,
          component_id: `footer_nav_${id}`,
          position,
          destination_type: destinationType,
          destination_path: destinationPath,
        })
      }
      className="transition-colors hover:text-rp-gold md:hover:text-white"
    >
      {children}
    </Link>
  );
}

function trackFooterEmail(position: string) {
  trackMarketingEvent("cta_click", {
    event_category: "lead",
    event_label: `${position}_email`,
    method: "email",
    component_id: `${position}_email`,
    position,
    destination_type: "contact",
    destination_path: "/email",
  });
}

function trackFooterInstagram(position: string) {
  trackEngagementEvent(
    "instagram_footer_click",
    "instagram_click",
    `${position}_instagram`,
    {
      method: "instagram",
      component_id: `${position}_instagram`,
      position,
      destination_type: "other",
      destination_path: "/instagram",
    }
  );
}

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden bg-[#053282] text-white"
      role="contentinfo"
    >
      {/* Textura de fundo com overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-35 mix-blend-overlay"
        style={{
          backgroundImage: "url('/fundorodape.webp')",
          backgroundRepeat: "repeat",
          backgroundSize: "420px 420px",
        }}
        aria-hidden
      />

      {/* Conteúdo acima da textura */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-14 lg:px-8">
        {/* Footer Mobile */}
        <div className="md:hidden space-y-8 pb-[90px]">
          <div className="flex flex-col items-center text-center space-y-4">
            <Link
              href="/"
              className="inline-block focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#053282] rounded"
              aria-label="Retífica Premium - Página inicial"
            >
              <Image
                src="/logo.png"
                alt="Retífica Premium"
                width={729}
                height={551}
                sizes="180px"
                className="h-auto w-[180px]"
              />
            </Link>
            <p className="max-w-[260px] text-sm leading-relaxed text-white/85">
              Especialistas em retífica de cabeçotes com mais de 20 anos de
              experiência.
            </p>
            <nav className="flex flex-col gap-2 mt-4 text-sm font-medium">
              {FOOTER_LINKS.map((item) => (
                <FooterNavLink
                  key={item.id}
                  id={item.id}
                  href={item.href}
                  position="footer_mobile_navigation"
                >
                  {item.label.replace(" (Oficinas)", " Oficinas")}
                </FooterNavLink>
              ))}
            </nav>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/85">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-white">
              Contato
            </h3>
            <ul className="space-y-2 leading-relaxed">
              <li>
                Av. Fioravante Magro, 1059 - Jardim Boa Vista, Sertãozinho - SP,
                14177-578
              </li>
              <li>
                <a
                  href="tel:+551635244661"
                  onClick={(e) => {
                    e.stopPropagation();
                    trackEngagementEvent(
                      "phone_click",
                      "phone_click",
                      "footer_mobile",
                      {
                        link_url: e.currentTarget.href,
                        method: "phone",
                        component_id: "footer_mobile_phone",
                        position: "footer_mobile_contact",
                        destination_type: "phone",
                        destination_path: "/phone",
                      }
                    );
                  }}
                  className="transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#053282] rounded"
                >
                  (16) 3524-4661
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5516993021998"
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.currentTarget.href = buildWhatsAppUrlWithAttribution(
                      siteConfig.whatsapp.number,
                      whatsappBudgetText
                    );
                    trackEngagementEvent(
                      "whatsapp_footer_click",
                      "whatsapp_click",
                      "footer_mobile_whatsapp_text",
                      {
                        method: "whatsapp",
                        component_id: "footer_mobile_whatsapp_text",
                        position: "footer_mobile_contact",
                        destination_type: "whatsapp",
                        destination_path: "/whatsapp",
                      }
                    );
                  }}
                  className="transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#053282] rounded"
                >
                  (16) 99302-1998
                </a>{" "}
                <span className="text-white/60">(WhatsApp)</span>
              </li>
              <li>
                <a
                  href="mailto:retificapremium5@gmail.com"
                  onClick={() => trackFooterEmail("footer_mobile_contact")}
                  className="break-all transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#053282] rounded"
                >
                  retificapremium5@gmail.com
                </a>
              </li>
              <li className="text-white/70">CNPJ: 48.842.592/0001-15</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-white">
              Funcionamento
            </h3>
            <ul className="space-y-2 text-sm leading-relaxed text-white/80">
              {HORARIOS.map(({ dia, horario }) => (
                <li key={dia} className="flex justify-between gap-3">
                  <span>{dia}</span>
                  <span className="text-right">{horario}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-center gap-6">
            <a
              href="https://wa.me/5516993021998"
              target="_blank"
              rel="noreferrer"
              onClick={(e) => {
                e.stopPropagation();
                e.currentTarget.href = buildWhatsAppUrlWithAttribution(
                  siteConfig.whatsapp.number,
                  whatsappBudgetText
                );
                trackEngagementEvent(
                  "whatsapp_footer_click",
                  "whatsapp_click",
                  "footer_mobile_whatsapp_icon",
                  {
                    method: "whatsapp",
                    component_id: "footer_mobile_whatsapp_icon",
                    position: "footer_mobile_social",
                    destination_type: "whatsapp",
                    destination_path: "/whatsapp",
                  }
                );
              }}
              className="flex items-center gap-2 transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#053282] rounded"
              aria-label="WhatsApp"
            >
              <Image
                src="/whatsapprodape.png"
                alt="WhatsApp"
                width={36}
                height={36}
                className="h-9 w-9 object-contain"
              />
              <span className="text-xs text-white/80">WhatsApp</span>
            </a>
            <a
              href="https://www.instagram.com/retifica_premium/"
              target="_blank"
              rel="noreferrer"
              onClick={(e) => {
                e.stopPropagation();
                trackFooterInstagram("footer_mobile_social");
              }}
              className="flex items-center gap-2 transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#053282] rounded"
              aria-label="Instagram"
            >
              <Image
                src="/instagram.png"
                alt="Instagram"
                width={36}
                height={36}
                className="h-9 w-9 object-contain"
              />
              <span className="text-xs text-white/80">Instagram</span>
            </a>
          </div>

          <div className="border-t border-white/15 pt-6 text-center text-xs leading-relaxed text-white/70">
            <p>© 2026 Retífica Premium. Todos os direitos reservados.</p>
            <LinkPrivacidade className="mt-2 inline-flex underline decoration-white/30 underline-offset-4 transition-colors hover:text-white" />
          </div>
        </div>

        {/* Footer Desktop */}
        <div className="hidden md:block">
          <div className="grid grid-cols-1 gap-10 border-white/10 sm:gap-12 lg:grid-cols-3 lg:gap-14 [&>div]:border-b [&>div]:border-white/10 [&>div]:pb-10 lg:[&>div]:border-b-0 lg:[&>div]:pb-0">
            {/* Coluna A — Brand */}
            <div className="space-y-5">
              <Link
                href="/"
                className="inline-block focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#053282] rounded"
                aria-label="Retífica Premium - Página inicial"
              >
                <Image
                  src="/logo.png"
                  alt="Retífica Premium"
                  width={729}
                  height={551}
                  sizes="140px"
                  className="h-auto w-[140px]"
                />
              </Link>
              <p className="max-w-xs text-sm leading-relaxed text-white/80">
                Especialistas em retífica de cabeçotes com mais de 20 anos de
                experiência.
              </p>

              <div className="pt-2">
                <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-white">Links Rápidos</h3>
                <nav className="flex flex-col gap-2.5 text-sm text-white/80">
                  {FOOTER_LINKS.map((item) => (
                    <FooterNavLink
                      key={item.id}
                      id={item.id}
                      href={item.href}
                      position="footer_desktop_navigation"
                    >
                      {item.label}
                    </FooterNavLink>
                  ))}
                </nav>
              </div>
            </div>

            {/* Coluna B — Contato */}
            <div className="space-y-5">
              <h3 className="text-sm font-bold uppercase tracking-widest text-white">
                Contato
              </h3>
              <ul className="space-y-2.5 text-sm leading-relaxed text-white/80">
                <li>
                  Av. Fioravante Magro, 1059 - Jardim Boa Vista, Sertãozinho - SP,
                  14177-578
                </li>
                <li>
                  <a
                    href="tel:+551635244661"
                    onClick={(e) => {
                      e.stopPropagation();
                      trackEngagementEvent(
                        "phone_click",
                        "phone_click",
                        "footer_desktop",
                        {
                          link_url: e.currentTarget.href,
                          method: "phone",
                          component_id: "footer_desktop_phone",
                          position: "footer_desktop_contact",
                          destination_type: "phone",
                          destination_path: "/phone",
                        }
                      );
                    }}
                    className="transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#053282] rounded"
                  >
                    (16) 3524-4661
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/5516993021998"
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.currentTarget.href = buildWhatsAppUrlWithAttribution(
                        siteConfig.whatsapp.number,
                        whatsappBudgetText
                      );
                      trackEngagementEvent(
                        "whatsapp_footer_click",
                        "whatsapp_click",
                        "footer_desktop_whatsapp_text",
                        {
                          method: "whatsapp",
                          component_id: "footer_desktop_whatsapp_text",
                          position: "footer_desktop_contact",
                          destination_type: "whatsapp",
                          destination_path: "/whatsapp",
                        }
                      );
                    }}
                    className="transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#053282] rounded"
                  >
                    (16) 99302-1998
                  </a>{" "}
                  <span className="text-white/60">(WhatsApp)</span>
                </li>
                <li>
                  <a
                    href="mailto:retificapremium5@gmail.com"
                    onClick={() => trackFooterEmail("footer_desktop_contact")}
                    className="break-all transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#053282] rounded"
                  >
                    retificapremium5@gmail.com
                  </a>
                </li>
                <li className="text-white/70">CNPJ: 48.842.592/0001-15</li>
              </ul>

              {/* Ícones WhatsApp e Instagram */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="https://wa.me/5516993021998"
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.currentTarget.href = buildWhatsAppUrlWithAttribution(
                      siteConfig.whatsapp.number,
                      whatsappBudgetText
                    );
                    trackEngagementEvent(
                      "whatsapp_footer_click",
                      "whatsapp_click",
                      "footer_desktop_whatsapp_icon",
                      {
                        method: "whatsapp",
                        component_id: "footer_desktop_whatsapp_icon",
                        position: "footer_desktop_social",
                        destination_type: "whatsapp",
                        destination_path: "/whatsapp",
                      }
                    );
                  }}
                  className="flex items-center gap-2 transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#053282] rounded"
                  aria-label="WhatsApp"
                >
                  <Image
                    src="/whatsapprodape.png"
                    alt="WhatsApp"
                    width={32}
                    height={32}
                    className="h-8 w-8 object-contain"
                  />
                  <span className="text-xs text-white/70">WhatsApp</span>
                </a>
                <a
                  href="https://www.instagram.com/retifica_premium/"
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => {
                    e.stopPropagation();
                    trackFooterInstagram("footer_desktop_social");
                  }}
                  className="flex items-center gap-2 transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#053282] rounded"
                  aria-label="Instagram"
                >
                  <Image
                    src="/instagram.png"
                    alt="Instagram"
                    width={32}
                    height={32}
                    className="h-8 w-8 object-contain"
                  />
                  <span className="text-xs text-white/70">Instagram</span>
                </a>
              </div>
            </div>

            {/* Coluna C — Funcionamento */}
            <div className="space-y-5">
              <h3 className="text-sm font-bold uppercase tracking-widest text-white">
                Funcionamento
              </h3>
              <ul className="space-y-2 text-sm leading-relaxed text-white/80">
                {HORARIOS.map(({ dia, horario }) => (
                  <li
                    key={dia}
                    className="grid grid-cols-[1fr_auto] gap-4 sm:gap-6"
                  >
                    <span>{dia}:</span>
                    <span className="text-right">{horario}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Linha divisória antes do copyright */}
          <div className="mt-10 border-t border-white/15 md:mt-12" />

          {/* Copyright */}
          <div className="pt-8 text-center text-sm leading-relaxed text-white/70">
            <p>© 2026 Retífica Premium. Todos os direitos reservados.</p>
            <LinkPrivacidade className="mt-2 inline-flex underline decoration-white/30 underline-offset-4 transition-colors hover:text-white" />
          </div>
        </div>
      </div>
    </footer>
  );
}
