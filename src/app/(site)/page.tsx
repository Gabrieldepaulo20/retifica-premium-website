import Image from "next/image";
import type { Metadata } from "next";
import {
  LocalBusinessSchema,
  ServiceSchema,
  FAQSchema,
} from "@/components/site/StructuredData";
import { HomeWhatsAppCtaLink } from "@/components/site/HomeWhatsAppCtaLink";
import {
  TrackedCtaLink,
  TrackedServiceLink,
  TrackedWhatsAppLink,
} from "@/components/site/TrackedLinks";
import { VideoEmbed } from "@/components/site/VideoEmbed";
import { primaryRegionalCities } from "@/lib/regional";
import { servicePath } from "@/lib/service-pages";
import { whatsappBudgetUrl } from "@/lib/site";
import { videos } from "@/lib/videos";

export const metadata: Metadata = {
  title: "Retífica de Cabeçote em Sertãozinho-SP",
  description:
    "Retífica de cabeçote em Sertãozinho-SP, com atendimento a Ribeirão Preto e região. Diagnóstico técnico e orçamento pelo WhatsApp.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "Retífica de Cabeçote | Sertãozinho e Ribeirão Preto",
    description:
      "Retífica de cabeçote, usinagem e diagnóstico técnico para motor fumando, baixando óleo ou superaquecendo. Atende Sertãozinho, Ribeirão Preto e região.",
    url: "https://www.premiumretifica.com.br",
    siteName: "Retífica Premium",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/retificapremium.jpeg",
        width: 1200,
        height: 630,
        alt: "Retífica Premium - Retífica de Cabeçote em Sertãozinho-SP",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Retífica de Cabeçote | Sertãozinho e Ribeirão Preto",
    description:
      "Retífica de cabeçote, usinagem e diagnóstico técnico para motor fumando, baixando óleo ou superaquecendo. Atende Sertãozinho, Ribeirão Preto e região.",
    images: ["/retificapremium.jpeg"],
  },
};

const iconStroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const differentiators = [
  {
    title: "Prazo combinado",
    desc: "Prazos combinados e acompanhamento do serviço do início à entrega.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8 md:h-9 md:w-9" {...iconStroke}>
        <circle cx="12" cy="13" r="8" />
        <path d="M12 9v4l2.5 2.5M9 2h6M12 5V2" />
      </svg>
    ),
  },
  {
    title: "Garantia do serviço",
    desc: "6 meses de garantia no serviço executado, com cobertura confirmada no atendimento.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8 md:h-9 md:w-9" {...iconStroke}>
        <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Equipe Especializada",
    desc: "Técnicos experientes em retífica de cabeçotes e usinagem de precisão.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8 md:h-9 md:w-9" {...iconStroke}>
        <path d="M14.7 6.3a4 4 0 010 5.6l-1.4 1.4 2.8 2.8 1.4-1.4 2 2-2.8 2.8-2-2-3.5-3.5a4 4 0 01-5.6-5.6l2.6 2.6 1.4-1.4-2.6-2.6a4 4 0 015.7 1.3z" />
      </svg>
    ),
  },
  {
    title: "Padrão Premium",
    desc: "Controle de qualidade e medição técnica em cada conjunto entregue.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8 md:h-9 md:w-9" {...iconStroke}>
        <path d="M7 4h10v3a5 5 0 01-10 0V4z" />
        <path d="M7 5H4v2a3 3 0 003 3M17 5h3v2a3 3 0 01-3 3M9 14h6M8 20h8M10 14v3a2 2 0 002 2 2 2 0 002-2v-3" />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-rp-navy md:bg-transparent">
      {/* 1. HERO — altura por viewport para que a faixa azul fique acima da dobra */}
      <section className="relative z-10 flex min-h-[calc(100svh-14rem)] flex-col overflow-hidden bg-rp-navy pt-6 pb-6 max-[640px]:min-h-[calc(100svh-(56px+env(safe-area-inset-bottom)+112px))] max-[640px]:pt-12 max-[640px]:pb-0 md:min-h-[calc(100svh-17rem)] md:pt-8 md:pb-0 lg:pt-8 lg:pb-0">
        {/* Fundo com imagem de cabeçote + overlays para profundidade */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/cabecote.webp"
            alt=""
            fill
            sizes="100vw"
            className="hidden object-cover object-center opacity-[0.3] md:block"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[rgba(2,14,29,0.82)]" />
          <div className="absolute inset-0 bg-linear-to-b from-rp-navy/70 via-rp-navy/40 to-rp-navy" />
          {/* brilho dourado sutil atrás do título */}
          <div className="absolute left-1/2 top-[38%] h-[420px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rp-gold/10 blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-7xl flex-1 flex-col px-4 sm:px-6 lg:px-8">
          <div className="relative z-30 flex min-h-0 flex-1 flex-col items-center justify-start pb-8 max-[640px]:pb-0 text-center md:justify-center md:pb-6 lg:pb-6">
            {/* Bloco Superior: H1 + Textos (logo já aparece no header) */}
            <div className="flex flex-col items-center gap-3 md:gap-3.5 lg:gap-4 pt-4 max-[640px]:pt-12 md:pt-2 lg:pt-4">
              {/* Título em 2 linhas */}
              <h1 className="font-heading text-[28px] font-extrabold uppercase leading-[1.1] tracking-tight md:text-5xl md:leading-[1.08] lg:text-6xl lg:leading-[1.1]">
                <span className="text-[#f59e0b]">RETÍFICA DE CABEÇOTE </span>
                <br />
                <span className="text-white text-[22px] md:text-[42px] lg:text-5xl">
                  COM MEDIÇÃO ANTES DO ORÇAMENTO
                </span>
              </h1>

              {/* Subtexto */}
              <div className="flex flex-col gap-1.5 md:gap-2">
                <p className="mx-auto max-w-3xl text-[14px] leading-relaxed text-gray-300 md:max-w-4xl md:text-lg md:leading-relaxed">
                  Usinagem de precisão, revisão de válvulas e montagem técnica
                  para carro, caminhão, ônibus e trator. Motor diesel, gasolina
                  ou álcool.
                </p>
              </div>
              {/* Micro-prova social */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] text-gray-300 md:text-sm">
                <span className="inline-flex items-center gap-1.5">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 text-rp-gold"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 2l2.9 6.26L21.5 9l-5 4.6L18 21l-6-3.5L6 21l1.5-7.4-5-4.6 6.6-.74z" />
                  </svg>
                  Atendimento para clientes e oficinas
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-rp-gold" />
                  6 meses de garantia no serviço executado
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-rp-gold" />
                  Desde 2004 em Sertãozinho-SP
                </span>
              </div>

              {/* Bloco Inferior: CTA */}
              <div className="relative z-40 mt-5 flex justify-center max-[640px]:mt-7 md:mt-5">
                <HomeWhatsAppCtaLink />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BANNER/MARQUEE — sobe para aparecer na primeira dobra */}
      <section className="pointer-events-none relative z-20 h-[calc(44px+env(safe-area-inset-bottom))] overflow-hidden bg-rp-royal max-[640px]:-mt-12 max-[640px]:h-[calc(56px+env(safe-area-inset-bottom))] md:h-auto md:mt-0 md:py-4">
        <div className="marquee-infinite flex h-full items-center whitespace-nowrap text-[11px] font-semibold uppercase text-white max-[640px]:text-[12px] md:text-base">
          <div className="flex items-center gap-4 px-6 md:px-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <span key={i} className="flex items-center gap-4">
                USINAGEM DE PRECISÃO • RETÍFICA DE CABEÇOTES • DIAGNÓSTICO
                TÉCNICO • ORÇAMENTO APÓS AVALIAÇÃO • GARANTIA NO SERVIÇO
                {i < 2 && <span className="text-rp-gold">•</span>}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 3. DIFERENCIAIS */}
      <section className="relative overflow-hidden bg-rp-navy py-16 md:py-24">
        {/* Imagem de fundo */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/cabecote.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center opacity-[0.16]"
            aria-hidden="true"
          />
          {/* Overlays para legibilidade e profundidade */}
          <div className="absolute inset-0 bg-[rgba(2,14,29,0.82)]" />
          <div className="absolute inset-0 bg-linear-to-b from-rp-navy via-transparent to-rp-navy" />
        </div>

        {/* Conteúdo por cima da imagem */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-rp-gold">
              DIFERENCIAIS
            </p>
            <h2 className="font-heading text-[26px] font-bold leading-tight text-white md:text-4xl">
              Como conduzimos cada cabeçote na oficina
            </h2>
            <div className="mx-auto mt-5 flex justify-center gap-2">
              <div className="h-1 w-12 rounded-full bg-rp-gold" />
              <div className="h-1 w-24 rounded-full bg-rp-accent" />
            </div>
          </div>

          {/* Grid full-width de diferenciais */}
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
            {differentiators.map((item) => (
              <div
                key={item.title}
                className="group flex flex-col items-center rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center shadow-[0_18px_45px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-rp-gold/40 hover:bg-white/[0.07] md:p-7"
              >
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-rp-gold/15 text-rp-gold ring-1 ring-rp-gold/30 transition-colors group-hover:bg-rp-gold group-hover:text-rp-navy md:h-[72px] md:w-[72px]">
                  {item.icon}
                </div>
                <h3 className="font-heading text-base font-bold text-white md:text-lg">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-300/90">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SERVIÇOS */}
      <section className="bg-[#FFFBF2] pt-20 pb-12 md:pt-32 md:pb-14">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
          {/* Textos */}
          <div className="mb-10 text-center lg:text-left">
            <p
              className="mb-2 uppercase text-gray-600 text-[13px] md:text-[25.63px]"
              style={{
                fontFamily: "var(--font-rajdhani)",
                fontWeight: 400,
                lineHeight: "100%",
                letterSpacing: "0%",
              }}
            >
              SERVIÇOS
            </p>

            <h2
              className="mb-4 text-[24px] leading-tight text-rp-accent md:text-[42.41px]"
              style={{
                fontFamily: "var(--font-rajdhani)",
                fontWeight: 700,
                lineHeight: "100%",
                letterSpacing: "0%",
              }}
            >
              Serviços para cabeçotes, <br className="hidden lg:block" />
              definidos depois da medição
            </h2>

            <p
              className="mx-auto max-w-[520px] text-[14px] leading-relaxed text-gray-700 lg:mx-0 md:max-w-[680px] md:text-[20px]"
              style={{
                fontFamily: "var(--font-open-sans)",
                fontWeight: 400,
                lineHeight: "140%",
              }}
            >
              Trabalhamos nas etapas do cabeçote: usinagem, revisão de
              válvulas, guias e montagem técnica. A medição da peça orienta o
              escopo, e a garantia se aplica ao serviço executado.
            </p>
          </div>

          {/* Cards */}
          <div className="mt-25 mb-8 grid grid-cols-1 justify-items-center gap-y-16 md:grid-cols-2 md:gap-x-10 md:gap-y-14 xl:grid-cols-3">
            {[
              {
                img: "/retificademotor.jpg",
                alt: "Cabeçote em bancada de usinagem",
                title: "Retífica de Cabeçote",
                desc: "Plaina, sedes, válvulas e guias com medição de empeno e vedação para recuperar a compressão.",
                href: servicePath("retifica-de-cabecote"),
                serviceId: "retifica-de-cabecote",
              },
              {
                img: "/montagemdemotores.jpg",
                alt: "Montagem técnica de cabeçote em bancada",
                title: "Montagem de Cabeçote",
                desc: "Conferência de componentes, montagem de válvulas e regulagem final para vedação correta.",
                href: servicePath("montagem-de-cabecote"),
                serviceId: "montagem-e-regulagem-final",
              },
              {
                img: "/diagnosticotecnico.webp",
                alt: "Diagnóstico técnico de cabeçote",
                title: "Diagnóstico Técnico",
                desc: "Avaliação de sintomas como motor fumando, baixando óleo ou superaquecendo para indicar o reparo do cabeçote.",
                href: "/quanto-custa",
                serviceId: "diagnostico-tecnico-de-motor",
              },
            ].map((card, index) => {
              const stackClass = `service-card-stack service-card-stack-${
                index + 1
              }`;

              return (
                <div
                  key={card.title}
                  className={`group relative h-[287px] w-[252px] rounded-[10px] transition-transform duration-200 hover:-translate-y-1 md:h-auto md:w-full md:max-w-[324px] md:min-h-[382px] ${stackClass}`}
                  style={{
                    background: "#D9E7FF",
                    border: "1px solid #053282",
                    boxShadow: "0px 4px 10px 0px #00000040",
                  }}
                >
                  {/* Imagem flutuando (fora do card) */}
                  <div className="absolute left-1/2 top-[-28px] w-[214px] max-w-[calc(100%+24px)] -translate-x-1/2 md:top-[-52px] md:w-[276px]">
                    <div className="relative h-[157px] w-[214px] overflow-hidden rounded-[10px] shadow-md transition-transform duration-200 group-hover:scale-[1.02] md:h-[209px] md:w-[276px]">
                      <Image
                        src={card.img}
                        alt={card.alt}
                        width={276}
                        height={209}
                        sizes="(max-width: 768px) 214px, 276px"
                        quality={75}
                        className="h-full w-full object-cover object-center"
                        loading="lazy"
                      />
                      {/* Overlay com gradiente azul */}
                      <div className="pointer-events-none absolute inset-0 rounded-[10px] bg-linear-to-b from-[#053282]/15 to-[#053282]/30" />
                    </div>
                  </div>

                  {/* Conteúdo */}
                  <div className="flex h-full flex-col items-center px-4 pb-4 pt-[118px] text-center md:px-6 md:pb-6 md:pt-[176px]">
                    <h3
                      className="uppercase text-[13px] md:text-[24px]"
                      style={{
                        fontFamily: "var(--font-rajdhani)",
                        fontWeight: 700,
                        lineHeight: "100%",
                        color: "#053282",
                      }}
                    >
                      {card.title}
                    </h3>

                    <p
                      className="mt-2 max-w-[200px] text-[11px] md:mt-4 md:max-w-[240px] md:text-[15px]"
                      style={{
                        fontFamily: "var(--font-open-sans)",
                        fontWeight: 400,
                        lineHeight: "140%",
                        color: "#053282",
                      }}
                    >
                      {card.desc}
                    </p>

                    {/* Botão do card */}
                    <TrackedServiceLink
                      href={card.href}
                      serviceId={card.serviceId}
                      serviceName={card.title}
                      className="mt-auto inline-flex h-8 w-[128px] items-center justify-center rounded-[62px] text-[11px] font-bold text-white shadow-[0px_4px_10px_rgba(0,0,0,0.25)] transition-all duration-200 hover:brightness-110 hover:shadow-[0px_8px_18px_rgba(0,0,0,0.25)] md:h-[44px] md:w-[180px] md:text-[18px]"
                      style={{
                        background: "#053282",
                        fontFamily: "var(--font-open-sans)",
                        fontWeight: 700,
                        lineHeight: "100%",
                      }}
                    >
                      Ver detalhes
                    </TrackedServiceLink>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Botão central (perto do fim amarelo) */}
          <div className="mt-2 flex justify-center">
            <TrackedCtaLink
              href="/servicos"
              eventLabel="home_all_services"
              className="flex h-12 w-full max-w-[300px] items-center justify-center rounded-[62px] text-center text-sm text-white transition-all duration-200 hover:brightness-110 hover:shadow-[0px_10px_20px_rgba(0,0,0,0.25)] sm:h-[56px] sm:max-w-[340px] sm:text-base md:h-[68.2667px] md:max-w-[354.061px] md:text-[23px]"
              style={{
                background: "linear-gradient(0deg, #1654A6 0%, #0E62F6 100%)",
                fontFamily: "var(--font-open-sans)",
                fontWeight: 700,
                lineHeight: "100%",
              }}
            >
              Ver todos os serviços
            </TrackedCtaLink>
          </div>
        </div>
      </section>

      {/* 4.5 VÍDEO — institucional (aparece quando houver youtubeId em lib/videos.ts) */}
      {videos.homeShowcase.youtubeId && (
        <section className="bg-rp-navy py-16 md:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-8 max-w-2xl text-center">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-rp-gold">
                A Retífica por dentro
              </p>
              <h2 className="font-heading text-2xl font-bold text-white md:text-4xl">
                Veja nossa estrutura e o padrão de cada serviço
              </h2>
            </div>
            <VideoEmbed slot={videos.homeShowcase} eventLabel="home_video" />
          </div>
        </section>
      )}

      {/* 5. B2B */}
      <section className="relative overflow-hidden bg-rp-navy py-20 md:py-28 lg:py-36">
        {/* Acento diagonal decorativo (atrás do conteúdo, sem cobrir nada) */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-1/3 -skew-x-12 bg-linear-to-l from-rp-gold/10 to-transparent md:block" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
            {/* Esquerda: Texto */}
            <div className="flex flex-col items-center text-center text-white md:items-start md:text-left">
              <p className="font-heading text-sm font-semibold uppercase tracking-[0.18em] text-rp-gold md:text-base">
                PARCEIROS B2B
              </p>

              <h2 className="b2b-headline mt-3 text-[28px]! leading-tight md:text-[52px]!">
                <span className="text-rp-accent">Programa B2B</span> para Oficinas
                Parceiras
              </h2>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-gray-300 md:text-lg">
                A parceria pode incluir presença digital, organização de
                oportunidades e apoio comercial, conforme rotina, volume e
                condições combinadas com cada oficina.
              </p>

              <ul className="mt-6 space-y-3 text-left">
                {[
                  "Presença digital definida conforme o nível da parceria",
                  "Organização de orçamentos e retornos quando aplicável",
                  "Logística e apoio comercial combinados caso a caso",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rp-gold/15 text-rp-gold ring-1 ring-rp-gold/30">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.4}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M5 12.5l4 4 10-10" />
                      </svg>
                    </span>
                    <span className="text-sm font-semibold text-white md:text-base">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <TrackedCtaLink
                  href="/b2b"
                  eventLabel="home_b2b_partner"
                  className="inline-flex h-12 items-center justify-center rounded-full px-8 text-sm font-bold uppercase text-white shadow-lg transition hover:brightness-110 md:h-[60px] md:px-10 md:text-base"
                  style={{
                    background: "linear-gradient(0deg, #1654A6 0%, #0E62F6 100%)",
                  }}
                >
                  Conhecer o programa
                </TrackedCtaLink>
              </div>
            </div>

            {/* Direita: Imagem */}
            <div className="relative mx-auto w-full max-w-[640px]">
              <div
                className="relative w-full overflow-hidden rounded-2xl border border-rp-gold/25 shadow-[0_25px_60px_rgba(0,0,0,0.45)]"
                style={{ aspectRatio: "5 / 4" }}
              >
                <Image
                  src="/oficina.jpeg"
                  alt="Fachada da Retífica Premium em Sertãozinho-SP"
                  fill
                  sizes="(max-width: 768px) 92vw, 45vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-rp-navy/55 via-transparent to-transparent" />
              </div>
              {/* Selo flutuante */}
              <div className="absolute -bottom-4 -left-4 hidden rounded-xl bg-rp-gold px-5 py-3 shadow-xl md:block">
                <p className="font-heading text-xl font-extrabold leading-none text-rp-navy">
                  Condições combinadas
                </p>
                <p className="mt-1 text-xs font-semibold text-rp-navy/80">
                  conforme a parceria
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. DEPOIMENTOS — carrossel infinito + cards premium */}
      <section className="relative overflow-hidden">
        {/* Imagem de fundo */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/homecomment.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[#000617]/70 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 flex min-h-[700px] flex-col justify-between md:min-h-[950px]">
          <div className="mx-auto max-w-7xl px-4 pt-16 text-center sm:px-6 lg:px-8 md:pt-24">
            <h2 className="mb-2 font-heading text-2xl font-bold text-white md:text-4xl">
              Quem já confia na{" "}
              <span className="text-rp-accent">Retífica Premium</span>
            </h2>
            <p className="text-sm text-gray-300 md:text-lg">
              Depoimentos reais sobre qualidade, prazo e atendimento.
            </p>
          </div>

          {/* Viewport do carrossel: mascara nas laterais para foco no centro */}
          <div
            className="flex flex-1 items-center py-8 md:py-12"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
            }}
          >
            <div className="w-full overflow-hidden">
              {/* Track: 2 cópias dos 3 cards para loop infinito */}
              <div
                className="testimonials-carousel-track flex w-max flex-nowrap gap-6 md:gap-10"
                tabIndex={0}
                aria-label="Carrossel de depoimentos"
              >
                {[1, 2].map((copy) =>
                  [
                    {
                      id: "marcio",
                      quote:
                        "Nós, da oficina Márcio Auto Mecânica, recomendamos os serviços da Retífica Premium pela confiança, agilidade e qualidade.",
                      logoType: "text" as const,
                      line1: "MARCIO",
                      line2: "Auto Mecânica",
                    },
                    {
                      id: "sert",
                      quote:
                        "Serviço profissional, ótimo atendimento, sempre prestativos e com excelente custo-benefício. Pessoas de confiança. Recomendo.",
                      logoType: "image" as const,
                      src: "/sert-pecas.jpg",
                      alt: "Sert Peças",
                    },
                    {
                      id: "diego",
                      quote:
                        "Serviço de excelência. Profissionais dedicados e entrega com qualidade. Agradecemos a parceria dessa equipe. Super recomendo.",
                      logoType: "image" as const,
                      src: "/Diego.png",
                      alt: "Diego",
                    },
                  ].map((item) => (
                    <div
                      key={`${copy}-${item.id}`}
                      aria-hidden={copy === 2 ? true : undefined}
                      className="flex h-[280px] w-[240px] shrink-0 flex-col rounded-2xl border-2 border-[#F8B628] bg-white px-4 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)] md:h-[380px] md:w-[380px] md:px-10 md:py-10"
                    >
                      <div className="flex flex-1 flex-col items-center justify-center text-center">
                        <p
                          className="mx-auto max-w-[26ch] leading-snug text-slate-700 text-[14px] md:text-[22px]"
                          style={{
                            fontFamily: "var(--font-open-sans)",
                          }}
                        >
                          &quot;{item.quote}&quot;
                        </p>
                      </div>
                      <div className="mt-auto flex h-[72px] items-center justify-center md:h-[96px]">
                        {item.logoType === "text" && (
                          <>
                            <p
                              className="text-center text-[18px] font-bold leading-tight md:text-[28px]"
                              style={{
                                fontFamily: "var(--font-rajdhani)",
                                color: "#c41e3a",
                                textShadow:
                                  "1px 1px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 0 1px 0 #fff, 0 -1px 0 #fff, 1px 0 0 #fff, -1px 0 0 #fff",
                              }}
                            >
                              {item.line1}
                            </p>
                            <p
                              className="mt-1 text-center text-[12px] font-bold leading-tight md:text-[18px]"
                              style={{
                                fontFamily: "var(--font-rajdhani)",
                                color: "#0E62F6",
                                textShadow:
                                  "1px 1px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff",
                              }}
                            >
                              {item.line2}
                            </p>
                          </>
                        )}
                        {item.logoType === "image" &&
                          item.src === "/sert-pecas.jpg" && (
                            <div className="flex h-[60px] w-[160px] items-center justify-center md:h-[90px] md:w-[220px]">
                              <Image
                                src="/sert-pecas.jpg"
                                alt={item.alt}
                                width={220}
                                height={90}
                                className="h-[60px] w-[160px] object-contain md:h-[90px] md:w-[220px]"
                              />
                            </div>
                          )}
                        {item.logoType === "image" &&
                          item.src === "/Diego.png" && (
                            <div className="flex h-[70px] w-[160px] items-center justify-center md:h-[96px] md:w-[220px]">
                              <Image
                                src="/Diego.png"
                                alt={item.alt}
                                width={220}
                                height={80}
                                className="h-[60px] w-auto object-contain -translate-y-1 drop-shadow-sm md:h-[80px] md:-translate-y-2"
                              />
                            </div>
                          )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ — PARA SGE/IA */}
      <section className="bg-white py-12 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center font-heading text-2xl font-bold text-gray-900 md:mb-10 md:text-4xl">
            Dúvidas Frequentes sobre Retífica de Cabeçote
          </h2>
          <div className="space-y-4 md:space-y-6">
            {[
              {
                q: "Quanto custa retífica de cabeçote?",
                a: "O valor varia conforme o conjunto, o estado da peça e as operações necessárias. A triagem organiza o caso, mas o orçamento final depende da identificação e da medição do cabeçote.",
              },
              {
                q: "Quanto tempo demora a retífica?",
                a: "O prazo depende das medições, das peças necessárias e do escopo aprovado. A previsão é confirmada antes da execução do serviço.",
              },
              {
                q: "Retífica de cabeçote tem garantia?",
                a: "A Retífica Premium oferece 6 meses de garantia sobre o serviço executado. A cobertura e os limites são confirmados no atendimento.",
              },
              {
                q: "Quando o cabeçote precisa de retífica?",
                a: "Principais sinais: superaquecimento constante, perda de potência, consumo alto de óleo, fumaça branca ou azul, junta queimada ou cabeçote trincado. Esses sintomas podem ter origem no cabeçote ou na parte inferior do motor — o diagnóstico técnico confirma se o reparo é conosco.",
              },
              {
                q: "Atendem caminhão e motor diesel?",
                a: "Sim. Atendemos carro (passeio e utilitário), caminhão, ônibus, van, trator e motores diesel, gasolina e álcool.",
              },
              {
                q: "Vocês atendem oficinas?",
                a: "Sim. Oficinas podem solicitar atendimento recorrente, apoio técnico e condições comerciais avaliadas conforme perfil e volume.",
              },
              {
                q: "Como solicitar orçamento?",
                a: "Chame no WhatsApp (16) 99302-1998, ligue no (16) 3524-4661 ou preencha o formulário no site. Respondemos rápido.",
              },
              {
                q: "Onde fica a Retífica Premium?",
                a: "Av. Fioravante Magro, 1059 - Jardim Boa Vista, Sertãozinho-SP. Atendemos Ribeirão Preto, Sertãozinho e toda a região.",
              },
            ].map((item, idx) => (
              <details
                key={idx}
                className="group rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-rp-accent md:p-6"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-3 text-sm font-semibold text-gray-900 md:text-base">
                  <span className="flex-1">{item.q}</span>
                  <span
                    className="text-xs text-rp-accent transition-transform group-open:rotate-180 md:text-sm"
                    aria-hidden="true"
                  >
                    ▼
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-gray-700 md:mt-4 md:text-base">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
          <div className="mt-10 text-center">
            <TrackedWhatsAppLink
              href={whatsappBudgetUrl}
              eventLabel="home_faq_cta"
              className="inline-flex h-12 items-center justify-center rounded-full bg-rp-accent px-8 text-sm font-bold text-white transition-all hover:brightness-110 md:h-14 md:px-10 md:text-base"
            >
              Chamar no WhatsApp agora
            </TrackedWhatsAppLink>
          </div>
        </div>
      </section>

      {/* 8. REGIÃO ATENDIDA — SEO LOCAL */}
      <section className="bg-rp-navy pt-12 pb-14 md:py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 font-heading text-[22px] font-bold leading-tight text-white md:mb-6 md:text-4xl">
            Atendemos Ribeirão Preto, Sertãozinho e Toda a Região
          </h2>
          <p className="mx-auto mb-6 max-w-[520px] text-[14px] leading-relaxed text-gray-300 md:mb-8 md:max-w-3xl md:text-lg">
            A Retífica Premium fica em Sertãozinho e atende motoristas,
            oficinas e frotas que procuram retífica de cabeçote, plaina,
            banho químico e diagnóstico técnico em{" "}
            <TrackedCtaLink
              href="/retifica-em-ribeirao-preto"
              eventLabel="home_regional_ribeirao_inline"
              trackingPosition="home_region"
              className="font-semibold text-rp-gold underline-offset-4 hover:underline"
            >
              Ribeirão Preto
            </TrackedCtaLink>{" "}
            e cidades próximas.
          </p>
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {primaryRegionalCities.map((city) => (
              <span
                key={city}
                className="rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-semibold text-white/85"
              >
                {city}
              </span>
            ))}
          </div>
          <p className="mb-6 text-[13px] leading-relaxed text-gray-400 md:mb-8 md:text-base">
            Atendemos em um raio de até cerca de 60 km de Sertãozinho. Mande o
            sintoma ou a foto da peça pelo WhatsApp e confirmamos rápido se
            cobrimos a sua cidade.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <TrackedWhatsAppLink
              href={whatsappBudgetUrl}
              eventLabel="home_region_cta"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#25D366] px-8 text-sm font-bold text-[#052E16] transition-all hover:brightness-110 md:h-14 md:px-10 md:text-base"
            >
              <svg
                className="mr-2 h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Chamar no WhatsApp
            </TrackedWhatsAppLink>
            <TrackedCtaLink
              href="/servicos#regiao"
              eventLabel="home_region_page"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/35 px-8 text-sm font-bold text-white transition-all hover:bg-white/10 md:h-14 md:px-10 md:text-base"
            >
              Ver cidades atendidas
            </TrackedCtaLink>
          </div>
        </div>
      </section>

      {/* JSON-LD Structured Data */}
      <LocalBusinessSchema />
      <ServiceSchema />
      <FAQSchema
        items={[
          {
            question: "Quanto custa retífica de cabeçote?",
            answer:
              "O valor varia conforme o conjunto, o estado da peça e as operações necessárias. A triagem organiza o caso, mas o orçamento final depende da identificação e da medição do cabeçote.",
          },
          {
            question: "Quanto tempo demora a retífica?",
            answer:
              "O prazo depende das medições, das peças necessárias e do escopo aprovado. A previsão é confirmada antes da execução do serviço.",
          },
          {
            question: "Retífica de cabeçote tem garantia?",
            answer:
              "A Retífica Premium oferece 6 meses de garantia sobre o serviço executado. A cobertura e os limites são confirmados no atendimento.",
          },
          {
            question: "Quando o cabeçote precisa de retífica?",
            answer:
              "Principais sinais: superaquecimento constante, perda de potência, consumo alto de óleo, fumaça branca ou azul, junta queimada ou cabeçote trincado. Esses sintomas podem ter origem no cabeçote ou na parte inferior do motor — o diagnóstico técnico confirma se o reparo é conosco.",
          },
          {
            question: "Atendem caminhão e motor diesel?",
            answer:
              "Sim. Atendemos carro (passeio e utilitário), caminhão, ônibus, van, trator e motores diesel, gasolina e álcool.",
          },
          {
            question: "Vocês atendem oficinas?",
            answer:
              "Sim. Oficinas podem solicitar atendimento recorrente, apoio técnico e condições comerciais avaliadas conforme perfil e volume.",
          },
          {
            question: "Como solicitar orçamento?",
            answer:
              "Chame no WhatsApp (16) 99302-1998, ligue no (16) 3524-4661 ou preencha o formulário no site. Respondemos rápido.",
          },
          {
            question: "Onde fica a Retífica Premium?",
            answer:
              "Av. Fioravante Magro, 1059 - Jardim Boa Vista, Sertãozinho-SP. Atendemos Ribeirão Preto, Sertãozinho e toda a região.",
          },
        ]}
      />
    </main>
  );
}
