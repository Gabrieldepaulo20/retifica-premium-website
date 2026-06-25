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
  title:
    "Contato da Retífica Premium em Sertãozinho-SP | WhatsApp e Orçamento",
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
      {/* PARTE A — HERO/FORMULÁRIO */}
      <section className="bg-white">
        <div className="relative min-h-[700px] overflow-hidden bg-[#2E5AA7]">
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
            <div className="absolute inset-0 bg-linear-to-b from-[#2E5AA7]/75 via-[#1E3B73]/65 to-black/60" />
          </div>

          <div className="relative z-10 mx-auto flex min-h-[700px] max-w-7xl items-center justify-center px-4 text-center sm:px-6 lg:px-8">
            <div className="space-y-4">
              <h1
                className="text-4xl font-bold text-white md:text-5xl lg:text-6xl"
                style={{ fontFamily: "var(--font-rajdhani)", lineHeight: 1.3 }}
              >
                Fale com um especialista
              </h1>
              <div
                className="mx-auto max-w-2xl space-y-2 text-lg md:text-xl"
                style={{ fontFamily: "var(--font-open-sans)", lineHeight: 1.6 }}
              >
                <p className="font-semibold text-[#F3B839]">
                  Orçamento rápido para retífica de cabeçote.
                </p>
                <p className="text-white/90">
                  Fale por WhatsApp, telefone ou envie sua mensagem.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center gap-3 pt-4 sm:flex-row">
                <TrackedWhatsAppLink
                  href={whatsappBudgetUrl}
                  eventLabel="contact_hero_whatsapp"
                  clarityEventName="whatsapp_contact_cta_click"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-[#25D366] px-8 text-sm font-bold text-white transition-all hover:brightness-110 md:h-14 md:text-base"
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
          </div>
        </div>

        <div className="-mt-[90px] mx-auto max-w-7xl px-4 pb-40 pt-2 sm:px-6 lg:px-8">
          <div id="formulario" className="relative z-10 mx-auto w-full max-w-2xl rounded-3xl bg-[#F8B628] p-5 shadow-xl max-[640px]:p-6 md:p-10">
            <h2
              className="mb-6 text-center text-xl font-bold uppercase text-white max-[640px]:mb-5 md:text-2xl md:mb-8 lg:text-3xl"
              style={{ fontFamily: "var(--font-rajdhani)", lineHeight: 1.2 }}
            >
              Solicite seu orçamento
            </h2>

            <ContatoWhatsAppForm />
          </div>
        </div>
      </section>

      {/* PARTE B — ONDE ESTAMOS */}
      <section className="relative -mt-[90px] overflow-hidden bg-linear-to-b from-[#2E5AA7] via-[#2A5197] to-[#1F407A] pb-20 pt-28 md:pt-32">
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
              className="material-symbols-outlined inline-block leading-none text-[130px] text-[#F3B839] md:text-[134px]"
              aria-hidden="true"
            >
              location_on
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
            <div className="w-full max-w-[974px]">
              <div className="h-[380px] w-full overflow-hidden rounded-[60px] shadow-2xl md:h-[520px] md:rounded-[126px] lg:h-[647px]">
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
