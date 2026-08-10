import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/site/StructuredData";
import { ContatoScroll } from "@/components/site/ContatoScroll";
import { ContatoWhatsAppForm } from "@/components/site/ContatoWhatsAppForm";
import {
  TrackedCtaLink,
  TrackedDirectionsLink,
  TrackedPhoneLink,
  TrackedWhatsAppLink,
} from "@/components/site/TrackedLinks";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contato e Orçamento em Sertãozinho-SP",
  description:
    "Conte o que aconteceu com o veículo e fale com a Retífica Premium por WhatsApp, telefone ou pedido de retorno em Sertãozinho-SP.",
  alternates: { canonical: "/contato" },
  openGraph: {
    title: "Contato da Retífica Premium em Sertãozinho-SP",
    description:
      "WhatsApp, telefone, endereço e triagem para orientar a avaliação do cabeçote.",
    url: "https://www.premiumretifica.com.br/contato",
    siteName: "Retífica Premium",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/retificapremium.jpeg",
        width: 1200,
        height: 630,
        alt: "Retífica Premium em Sertãozinho-SP",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contato da Retífica Premium em Sertãozinho-SP",
    description:
      "WhatsApp, telefone e triagem para orientar a avaliação do cabeçote.",
    images: ["/retificapremium.jpeg"],
  },
};

const whatsappMessage =
  "Olá! Vim pela página de contato. Preciso de orientação sobre um cabeçote, mas ainda não sei exatamente qual serviço pedir.";

const preparationItems = [
  "O que aconteceu com o veículo",
  "Se o cabeçote já foi removido",
  "Marca, modelo e motor, se souber",
  "Fotos ou avaliação do mecânico, se tiver",
];

export default function ContatoPage() {
  return (
    <main className="min-h-screen bg-[#F4F0E8]">
      <ContatoScroll />

      <section className="relative overflow-hidden bg-rp-navy py-12 text-white md:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(251,191,36,0.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(251,191,36,0.055) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-start lg:px-8">
          <div className="pt-2">
            <p className="font-heading text-xs font-bold uppercase tracking-[0.22em] text-rp-gold">
              Atendimento em Sertãozinho-SP
            </p>
            <h1 className="mt-4 max-w-2xl font-heading text-[2.25rem] font-bold leading-[1.04] tracking-[-0.02em] sm:text-5xl lg:text-[3.55rem]">
              Você não precisa saber o nome do serviço para falar com a gente
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              Conte o que aconteceu. Organizamos as informações e indicamos o
              próximo passo sem tratar sintoma como diagnóstico.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <TrackedWhatsAppLink
                eventLabel="contact_hero_whatsapp"
                clarityEventName="whatsapp_contact_cta_click"
                message={whatsappMessage}
                className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#25D366] px-6 text-center font-heading text-base font-bold text-[#04240F] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Chamar no WhatsApp
              </TrackedWhatsAppLink>
              <TrackedPhoneLink
                eventLabel="contact_hero_phone"
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/35 px-6 text-center font-heading text-base font-bold text-white transition hover:border-rp-gold hover:text-rp-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Ligar {siteConfig.phone.display}
              </TrackedPhoneLink>
            </div>

            <TrackedCtaLink
              href="/quanto-custa?source=contact"
              eventLabel="contact_guided_triage"
              className="mt-4 inline-flex min-h-11 items-center font-heading text-sm font-bold text-rp-gold underline decoration-rp-gold/45 underline-offset-4 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Prefere começar sem falar com ninguém? Fazer triagem guiada →
            </TrackedCtaLink>

            <div className="mt-9 border-t border-white/12 pt-6">
              <p className="font-heading text-sm font-bold text-white">
                Se tiver, deixe estas informações por perto
              </p>
              <ul className="mt-3 grid gap-2 text-sm text-white/68 sm:grid-cols-2">
                {preparationItems.map((item) => (
                  <li key={item} className="flex gap-2.5 leading-relaxed">
                    <span className="mt-1 text-rp-gold" aria-hidden="true">
                      •
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            id="formulario"
            className="scroll-mt-24 rounded-3xl border border-white/12 bg-[#0A1B31] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.32)] sm:p-7"
          >
            <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-rp-gold">
              Prefiro receber retorno
            </p>
            <h2 className="mt-2 font-heading text-2xl font-bold leading-tight text-white sm:text-3xl">
              Deixe seu telefone e um resumo do caso
            </h2>
            <p className="mb-6 mt-2 text-sm leading-relaxed text-white/65">
              Nome e telefone são necessários para responder. Cidade é opcional;
              nenhum dado de localização precisa é solicitado.
            </p>
            <ContatoWhatsAppForm />
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-5 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <article className="rounded-3xl border border-[#D9D1C2] bg-white p-6 md:p-8">
            <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-rp-accent">
              Endereço
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-tight text-rp-navy">
              Levar a peça até a oficina
            </h2>
            <address className="mt-4 not-italic text-base leading-relaxed text-gray-600">
              {siteConfig.address.formatted}
            </address>
            <TrackedDirectionsLink
              eventLabel="contact_map_directions"
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-rp-accent px-6 font-heading text-sm font-bold text-white transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rp-accent"
            >
              Abrir rota no Google Maps
            </TrackedDirectionsLink>
          </article>

          <article className="rounded-3xl border border-[#D9D1C2] bg-white p-6 md:p-8">
            <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-rp-accent">
              Horário
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-tight text-rp-navy">
              Confirme antes de sair
            </h2>
            <dl className="mt-4 space-y-3 text-sm leading-relaxed text-gray-700">
              <div className="flex justify-between gap-5 border-b border-gray-200 pb-3">
                <dt className="font-bold">Segunda a quinta</dt>
                <dd className="text-right">08h–11h30 e 13h–18h</dd>
              </div>
              <div className="flex justify-between gap-5">
                <dt className="font-bold">Sexta-feira</dt>
                <dd className="text-right">08h–12h e 13h–17h30</dd>
              </div>
            </dl>
            <TrackedPhoneLink
              eventLabel="contact_hours_phone"
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full border border-rp-navy/25 px-6 font-heading text-sm font-bold text-rp-navy transition hover:border-rp-accent hover:text-rp-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rp-accent"
            >
              Confirmar por telefone
            </TrackedPhoneLink>
          </article>
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
