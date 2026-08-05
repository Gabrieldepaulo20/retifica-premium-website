import Image from "next/image";
import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/site/StructuredData";
import { ContatoScroll } from "@/components/site/ContatoScroll";
import { ContatoWhatsAppForm } from "@/components/site/ContatoWhatsAppForm";
import {
  TrackedDirectionsLink,
  TrackedPhoneLink,
  TrackedWhatsAppLink,
} from "@/components/site/TrackedLinks";
import { siteConfig, whatsappBudgetUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contato e Orçamento em Sertãozinho-SP",
  description:
    "Fale com a Retífica Premium pelo WhatsApp ou telefone para orçamento de retífica de cabeçote, diagnóstico de motor e usinagem em Sertãozinho-SP.",
  alternates: {
    canonical: "/contato",
  },
  openGraph: {
    title: "Contato da Retífica Premium em Sertãozinho-SP",
    description:
      "WhatsApp, telefone, endereço e formulário para orçamento de retífica de cabeçote e diagnóstico de motor.",
    url: "https://www.premiumretifica.com.br/contato",
    siteName: "Retífica Premium",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/retificapremium.jpeg",
        width: 1200,
        height: 630,
        alt: "Contato Retífica Premium",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contato da Retífica Premium em Sertãozinho-SP",
    description:
      "WhatsApp, telefone, endereço e formulário para orçamento de retífica de cabeçote e diagnóstico de motor.",
    images: ["/retificapremium.jpeg"],
  },
};

export default function ContatoPage() {
  return (
    <main className="min-h-screen bg-white">
      <ContatoScroll />
      {/* PARTE A — HERO + FORMULÁRIO (2 colunas no desktop) */}
      <section className="relative overflow-hidden bg-[#2E5AA7]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/cabecotefundo.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[#2E5AA7]/90" />
          <div className="absolute inset-0 bg-linear-to-b from-[#2E5AA7]/80 via-[#1E3B73]/70 to-black/70" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-20 lg:px-8">
          <div className="grid items-start gap-7 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8">
            {/* Esquerda — Texto, contatos e informações */}
            <div className="text-center lg:col-start-1 lg:row-start-1 lg:text-left">
              <h1
                className="text-4xl font-bold text-white md:text-5xl lg:text-6xl"
                style={{ fontFamily: "var(--font-rajdhani)", lineHeight: 1.15 }}
              >
                Fale com um especialista
              </h1>
              <div
                className="mx-auto mt-4 max-w-xl space-y-2 text-lg md:text-xl lg:mx-0"
                style={{ fontFamily: "var(--font-open-sans)", lineHeight: 1.6 }}
              >
                <p className="font-semibold text-[#F3B839]">
                  Orçamento rápido para retífica de cabeçote.
                </p>
                <p className="text-white/90">
                  Fale por WhatsApp, telefone ou envie sua mensagem.
                </p>
              </div>
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
                <TrackedWhatsAppLink
                  href={whatsappBudgetUrl}
                  eventLabel="contact_hero_whatsapp"
                  clarityEventName="whatsapp_contact_cta_click"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-[#25D366] px-8 text-sm font-bold text-[#052E16] transition-all hover:brightness-110 md:h-14 md:text-base"
                >
                  WhatsApp {siteConfig.whatsapp.display}
                </TrackedWhatsAppLink>
                <TrackedPhoneLink
                  href={siteConfig.phone.href}
                  eventLabel="contact_hero_phone"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-white/50 bg-white/10 px-8 text-sm font-bold text-white transition-all hover:bg-white/20 md:h-14 md:text-base"
                >
                  Ligar {siteConfig.phone.display}
                </TrackedPhoneLink>
              </div>

            </div>

            {/* Direita — Formulário */}
            <div
              id="formulario"
              className="scroll-mt-24 rounded-3xl bg-[#F8B628] p-5 shadow-2xl sm:p-6 lg:col-start-2 lg:row-span-2 lg:row-start-1 md:p-7"
            >
              <h2
                className="mb-1 text-center text-xl font-bold uppercase text-white md:text-2xl lg:text-3xl"
                style={{ fontFamily: "var(--font-rajdhani)", lineHeight: 1.2 }}
              >
                Solicite seu orçamento
              </h2>
              <p className="mb-4 text-center text-xs font-semibold text-[#17325d] md:text-sm">
                Três informações e a equipe retorna pelo WhatsApp ou ligação.
              </p>
              <ContatoWhatsAppForm />
            </div>

            {/* Informações ficam depois do formulário no celular */}
            <div className="grid gap-3 text-left sm:grid-cols-2 lg:col-start-1 lg:row-start-2">
              <div className="rounded-2xl border border-white/15 bg-white/8 p-4 backdrop-blur-sm">
                <p className="text-xs font-bold uppercase tracking-wide text-[#F3B839]">
                  Endereço
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-white/85">
                  Av. Fioravante Magro, 1059 — Jardim Boa Vista, Sertãozinho-SP
                </p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/8 p-4 backdrop-blur-sm">
                <p className="text-xs font-bold uppercase tracking-wide text-[#F3B839]">
                  Horário
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-white/85">
                  Seg a Qui: 08h–11h30 e 13h–18h
                  <br />
                  Sexta: 08h–12h e 13h–17h30
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARTE B — ONDE ESTAMOS */}
      <section className="relative overflow-hidden bg-linear-to-b from-[#2E5AA7] via-[#2A5197] to-[#1F407A] py-16 md:py-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/cabecotefundo.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-15"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[#2E5AA7]/85" />
          <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/40" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center text-white">
            <span
              className="mx-auto inline-flex h-16 w-16 items-center justify-center text-[#F3B839] md:h-20 md:w-20"
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
            </span>
            <h2
              className="mt-2 text-3xl font-bold md:text-4xl lg:text-5xl"
              style={{ fontFamily: "var(--font-rajdhani)" }}
            >
              Onde estamos?
            </h2>
            <p
              className="mt-4 text-base text-white/90 md:text-lg"
              style={{ fontFamily: "var(--font-open-sans)", lineHeight: 1.7 }}
            >
              Av. Fioravante Magro, 1059 - Jardim Boa Vista, Sertãozinho - SP,
              14177-578. Visite nossa oficina e conheça nossa estrutura.
            </p>
            <div className="mt-6">
              <TrackedDirectionsLink
                eventLabel="contact_map_directions"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#F3B839] px-8 text-sm font-bold text-[#053282] transition-all hover:brightness-105 md:h-14 md:text-base"
              >
                Abrir rota no Google Maps
              </TrackedDirectionsLink>
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <div className="w-full max-w-[1000px]">
              <div className="h-[360px] w-full overflow-hidden rounded-3xl shadow-2xl md:h-[460px] lg:h-[540px]">
                <iframe
                  title="Mapa - Retífica Premium"
                  src="https://www.google.com/maps?q=Av.%20Fioravante%20Magro,%201059%20-%20Jardim%20Boa%20Vista,%20Sert%C3%A3ozinho%20-%20SP,%2014177-578&output=embed"
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  style={{ border: 0 }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <BreadcrumbSchema
        items={[
          { name: "Início", url: "/" },
          { name: "Contato", url: "/contato" },
        ]}
      />
    </main>
  );
}
