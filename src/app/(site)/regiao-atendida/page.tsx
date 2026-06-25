import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  BreadcrumbSchema,
  FAQSchema,
  RegionalServiceAreaSchema,
} from "@/components/site/StructuredData";
import {
  TrackedCtaLink,
  TrackedPhoneLink,
  TrackedWhatsAppLink,
} from "@/components/site/TrackedLinks";
import {
  citiesByTier,
  primaryRegionalCities,
  regionalSearchTerms,
} from "@/lib/regional";
import { servicePath } from "@/lib/service-pages";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Retífica na Região de Ribeirão Preto | Retífica Premium",
  description:
    "Retífica de cabeçote e motor para Ribeirão Preto, Sertãozinho, Pontal, Dumont, Cravinhos e cidades em até 60 km. Orçamento por WhatsApp ou formulário.",
  alternates: {
    canonical: "/regiao-atendida",
  },
  openGraph: {
    title: "Retífica de Cabeçote e Motor na Região de Ribeirão Preto",
    description:
      "Atendimento regional para oficinas, motoristas e frotas em Ribeirão Preto, Sertãozinho, Pontal, Dumont, Cravinhos e cidades próximas.",
    url: "https://www.premiumretifica.com.br/regiao-atendida",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [
      {
        url: "/oficina.jpeg",
        width: 1200,
        height: 630,
        alt: "Oficina da Retífica Premium atendendo a região de Ribeirão Preto",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Retífica na Região de Ribeirão Preto | Retífica Premium",
    description:
      "Retífica de cabeçote e motor para Ribeirão Preto, Sertãozinho, Pontal, Dumont, Cravinhos e cidades próximas.",
    images: ["/oficina.jpeg"],
  },
};

const cityGroups = [
  {
    title: "Até 20 km",
    description: "Atendimento mais próximo da sede em Sertãozinho.",
    cities: citiesByTier("ate-20km"),
  },
  {
    title: "20 a 40 km",
    description: "Cidades com fluxo recorrente de oficinas e motoristas.",
    cities: citiesByTier("20-40km"),
  },
  {
    title: "40 a 60 km",
    description:
      "Atendimento regional para quem busca retífica especializada na região.",
    cities: citiesByTier("40-60km"),
  },
] as const;

const regionalFaq = [
  {
    question: "A Retífica Premium atende Ribeirão Preto?",
    answer:
      "Sim. A empresa fica em Sertãozinho e atende clientes, oficinas e frotas de Ribeirão Preto que procuram retífica de cabeçote, diagnóstico de motor, plaina, banho químico e serviços relacionados.",
  },
  {
    question: "Vocês atendem Pontal, Dumont e Cravinhos?",
    answer:
      "Sim. Pontal, Dumont e Cravinhos estão dentro da região atendida. O ideal é enviar o sintoma ou a foto da peça pelo WhatsApp ou formulário para receber orientação antes de levar o componente.",
  },
  {
    question: "Vocês buscam peça ou veículo nas cidades da região?",
    answer:
      "A logística deve ser confirmada no atendimento. O site informa a região atendida e os canais para orçamento, sem prometer coleta automática em todas as cidades.",
  },
  {
    question: "Qual serviço é mais procurado por oficinas da região?",
    answer:
      "Os pedidos mais comuns envolvem retífica de cabeçote, plaina, sedes e válvulas, banho químico, teste de trinca, montagem e diagnóstico para motor fumando, baixando óleo ou superaquecendo.",
  },
] as const;

const serviceLinks = [
  {
    href: servicePath("retifica-de-cabecote"),
    title: "Retífica de cabeçote",
    text: "Para junta queimada, cabeçote empenado, perda de compressão, sedes, válvulas e guias.",
  },
  {
    href: servicePath("retifica-de-motor"),
    title: "Retífica de motor",
    text: "Para motor fumando, baixando óleo, superaquecendo, fraco ou com suspeita de motor fundido.",
  },
  {
    href: servicePath("plaina-de-cabecote"),
    title: "Plaina de cabeçote",
    text: "Correção de empeno e preparação da superfície para vedação correta.",
  },
  {
    href: servicePath("teste-de-trinca"),
    title: "Teste de trinca",
    text: "Inspeção técnica para vazamentos, mistura de óleo e água e retorno de superaquecimento.",
  },
] as const;

export default function RegiaoAtendidaPage() {
  const whatsappMessage =
    "Olá, vim pelo site da Retífica Premium e gostaria de atendimento para retífica na minha cidade.";

  return (
    <main className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-[#041936] py-16 text-white md:py-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/oficina.jpeg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-22"
            priority
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-linear-to-b from-[#041936]/96 via-[#082C62]/86 to-[#020E1D]" />
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-[1fr_0.85fr] md:items-center lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-rp-gold">
              Atendimento regional
            </p>
            <h1 className="mt-3 font-heading text-3xl font-extrabold leading-tight md:text-5xl">
              Retífica de cabeçote e motor na região de Ribeirão Preto
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/82 md:text-lg">
              A Retífica Premium fica em Sertãozinho e atende motoristas,
              oficinas e frotas que procuram retífica, plaina, banho químico,
              teste de trinca, montagem de cabeçote e diagnóstico de motor em
              cidades próximas.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
              O foco é orientar o serviço correto para sintomas como motor
              fumando, motor baixando óleo, superaquecimento, junta queimada,
              cabeçote empenado e perda de compressão.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <TrackedWhatsAppLink
                eventLabel="regional_hero_whatsapp"
                message={whatsappMessage}
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#25D366] px-8 text-sm font-bold text-white transition-all hover:brightness-110 md:h-14 md:text-base"
              >
                Pedir orçamento no WhatsApp
              </TrackedWhatsAppLink>
              <TrackedCtaLink
                href="/contato#formulario"
                eventLabel="regional_hero_form"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/45 px-8 text-sm font-bold text-white transition-all hover:bg-white/10 md:h-14 md:text-base"
              >
                Enviar formulário
              </TrackedCtaLink>
            </div>
          </div>

          <aside className="rounded-lg border border-white/15 bg-white/8 p-5 shadow-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-rp-gold">
              Buscas que queremos atender
            </p>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-white/80">
              {regionalSearchTerms.map((term) => (
                <li key={term} className="flex gap-2">
                  <span className="text-rp-gold" aria-hidden="true">
                    •
                  </span>
                  <span>{term}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="bg-[#FFFBF2] py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-rp-accent">
              Cidades em até 60 km
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
              Região atendida pela Retífica Premium
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-700 md:text-lg">
              A lista abaixo organiza as cidades próximas por distância
              aproximada a partir de Sertãozinho. Ela ajuda o Google e o
              cliente a entenderem a área real de atendimento sem criar páginas
              repetidas para cada cidade.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {cityGroups.map((group) => (
              <section
                key={group.title}
                className="rounded-lg border border-[#D9E7FF] bg-white p-5 shadow-sm"
              >
                <h3 className="font-heading text-2xl font-bold text-[#053282]">
                  {group.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {group.description}
                </p>
                <ul className="mt-5 grid gap-2 text-sm text-gray-800">
                  {group.cities.map((city) => (
                    <li
                      key={city.name}
                      className="flex items-center justify-between gap-3 border-b border-gray-100 pb-2 last:border-b-0 last:pb-0"
                    >
                      <span className="font-semibold">{city.name}</span>
                      <span className="text-xs text-gray-500">
                        {city.distanceKm} km
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-rp-accent">
                Serviços buscados na região
              </p>
              <h2 className="mt-2 font-heading text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
                O que clientes de Ribeirão Preto e cidades próximas procuram
              </h2>
              <p className="mt-4 text-base leading-relaxed text-gray-700 md:text-lg">
                Em vez de espalhar páginas duplicadas por cidade, concentramos
                conteúdo útil por serviço e problema. Isso cria relevância para
                pesquisas locais sem exagero de palavras-chave.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <TrackedPhoneLink
                  eventLabel="regional_services_phone"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-[#053282] px-8 text-sm font-bold text-[#053282] transition-all hover:bg-[#D9E7FF]"
                >
                  Ligar {siteConfig.phone.display}
                </TrackedPhoneLink>
                <TrackedCtaLink
                  href="/servicos"
                  eventLabel="regional_services_all"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-[#053282] px-8 text-sm font-bold text-white transition hover:brightness-110"
                >
                  Ver todos os serviços
                </TrackedCtaLink>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {serviceLinks.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="rounded-lg border border-[#E8EEF8] bg-[#F8FBFF] p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#0E62F6]"
                >
                  <h3 className="font-heading text-xl font-bold text-[#053282]">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-700">
                    {service.text}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0B2F6B] py-14 text-white md:py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-rp-gold">
            Prioridade comercial
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold md:text-5xl">
            Ribeirão Preto, Sertãozinho, Pontal, Dumont e Cravinhos
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-white/80 md:text-lg">
            Essas cidades recebem reforço em conteúdo, schema e links internos
            porque concentram buscas de alta intenção por retífica, retífica de
            cabeçote, retífica de motor, mecânica e serviços automotivos na
            região.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-2">
            {primaryRegionalCities.map((city) => (
              <span
                key={city}
                className="rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-semibold text-white/88"
              >
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-heading text-3xl font-bold text-gray-900 md:text-5xl">
            Dúvidas sobre atendimento regional
          </h2>
          <div className="mt-8 space-y-4">
            {regionalFaq.map((item) => (
              <details
                key={item.question}
                className="group rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-3 font-semibold text-gray-900">
                  <span>{item.question}</span>
                  <span
                    className="text-rp-accent transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  >
                    ▼
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-gray-700">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <TrackedWhatsAppLink
              eventLabel="regional_faq_whatsapp"
              message={whatsappMessage}
              className="inline-flex h-12 items-center justify-center rounded-full bg-rp-accent px-8 text-sm font-bold text-white transition-all hover:brightness-110 md:h-14 md:text-base"
            >
              Tirar dúvida no WhatsApp
            </TrackedWhatsAppLink>
          </div>
        </div>
      </section>

      <RegionalServiceAreaSchema />
      <FAQSchema items={[...regionalFaq]} />
      <BreadcrumbSchema
        items={[
          { name: "Início", url: "/" },
          { name: "Região atendida", url: "/regiao-atendida" },
        ]}
      />
    </main>
  );
}
