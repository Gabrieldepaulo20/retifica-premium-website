import Image from "next/image";
import { NumerosProva } from "@/components/site/NumerosProva";
import { TrackedCtaLink } from "@/components/site/TrackedLinks";
import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/site/StructuredData";
import { numerosProva } from "@/lib/prova";

export const metadata: Metadata = {
  title: "Sobre a Oficina em Sertãozinho-SP",
  description:
    "Conheça a Retífica Premium: retífica, conferência e usinagem de cabeçotes em Sertãozinho-SP, com atuação desde 2004.",
  alternates: {
    canonical: "/sobre",
  },
  openGraph: {
    title: "Retífica Premium: Sobre a Oficina em Sertãozinho-SP",
    description:
      "Retífica, conferência e usinagem de cabeçotes em Sertãozinho-SP desde 2004.",
    url: "https://www.premiumretifica.com.br/sobre",
    siteName: "Retífica Premium",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/retificapremium.jpeg",
        width: 1200,
        height: 630,
        alt: "Sobre a Retífica Premium",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Retífica Premium: Sobre a Oficina em Sertãozinho-SP",
    description:
      "Retífica, conferência e usinagem de cabeçotes em Sertãozinho-SP desde 2004.",
    images: ["/retificapremium.jpeg"],
  },
};

type AboutIconName =
  | "target"
  | "vision"
  | "precision"
  | "commitment"
  | "quality"
  | "team";

function AboutIcon({ name, className = "" }: { name: AboutIconName; className?: string }) {
  const paths: Record<AboutIconName, React.ReactNode> = {
    target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><path d="m12 12 7-7M16 5h3v3" /></>,
    vision: <><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" /><circle cx="12" cy="12" r="2.7" /></>,
    precision: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" /></>,
    commitment: <><path d="m8 12 2.5 2.5L16 9" /><path d="M4 8.5 7.5 5H11l1.5 1.5L14 5h3.5L21 8.5l-6 6a4.2 4.2 0 0 1-6 0l-6-6Z" /></>,
    quality: <><path d="m12 3 7 3v5c0 4.4-2.8 7.4-7 9-4.2-1.6-7-4.6-7-9V6l7-3Z" /><path d="m9 12 2 2 4-4" /></>,
    team: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3.5 20v-2.5A4.5 4.5 0 0 1 8 13h2a4.5 4.5 0 0 1 4.5 4.5V20M14 14.5h2.5a4 4 0 0 1 4 4V20" /></>,
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

export default function SobrePage() {
  return (
    <main className="min-h-screen">
      {/* 1. HERO */}
      <section className="relative min-h-[440px] overflow-hidden bg-white max-[640px]:min-h-[302px] max-[640px]:h-auto max-[640px]:overflow-visible">
        {/* Background com textura */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image
            src="/texturewhite.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-85"
            aria-hidden="true"
          />

          {/* Overlay leve (não “apaga” a textura) */}
          <div className="absolute inset-0 bg-white/20" />
          {/* opcional: dá um “polimento” */}
          <div className="absolute inset-0 bg-linear-to-b from-white/30 via-transparent to-white/30" />
        </div>

        {/* Conteúdo */}
        <div className="relative z-10 mx-auto flex min-h-[440px] max-w-7xl items-center justify-center px-4 py-16 text-center sm:px-6 md:py-20 lg:px-8 max-[640px]:min-h-[300px] max-[640px]:items-center max-[640px]:justify-center max-[640px]:pt-10 max-[640px]:pb-10">
          {/* Desktop / tablet */}
          <div className="space-y-6 max-[640px]:hidden">
            <h1
              className="font-rajdhani text-3xl font-bold leading-tight sm:text-4xl md:text-6xl lg:text-7xl"
              style={{ fontFamily: "var(--font-rajdhani)", lineHeight: 1.2 }}
            >
              Mais de{" "}
              <span className="text-rp-accent">20 Anos de Experiência</span> em
              Retífica e Usinagem de Cabeçotes
            </h1>

            <p
              className="mx-auto max-w-3xl text-base text-gray-700 sm:text-lg md:text-2xl"
              style={{
                fontFamily: "var(--font-open-sans)",
                fontWeight: 400,
                lineHeight: 1.5,
              }}
            >
              Desde 2004, a Retífica Premium trabalha com retífica de
              cabeçotes, conferência, prazo combinado e transparência.
              Atendemos carros, caminhões, ônibus e tratores em Sertãozinho-SP,
              Ribeirão Preto e região.
            </p>
          </div>

          {/* Mobile (<= 640px) — igual ao print */}
          <div className="hidden w-full max-[640px]:block">
            <div className="mx-auto w-full max-w-[340px] text-center">
              <div
                className="font-rajdhani text-[30px] font-bold leading-[1.12] tracking-tight text-gray-900"
                style={{ fontFamily: "var(--font-rajdhani)" }}
              >
                <span className="text-rp-royal">Conferência</span> em cada
                cabeçote.{" "}
                <br />
                <span className="text-rp-royal">Clareza</span> em cada etapa.
              </div>

              <div className="mt-8 space-y-2">
                <p
                  className="text-[18px] font-bold text-[#0b1f3a]"
                  style={{
                    fontFamily: "var(--font-open-sans)",
                    lineHeight: 1.35,
                  }}
                >
                  Desde 2004 em Sertãozinho-SP
                </p>
                <p
                  className="text-[16px] text-[#0b1f3a]"
                  style={{
                    fontFamily: "var(--font-open-sans)",
                    lineHeight: 1.45,
                  }}
                >
                  Retífica de cabeçotes com conferência,
                </p>
                <p
                  className="text-[16px] text-[#0b1f3a]"
                  style={{
                    fontFamily: "var(--font-open-sans)",
                    lineHeight: 1.45,
                  }}
                >
                  conferência e escopo combinado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUEM SOMOS */}
      <section className="relative overflow-hidden py-20 md:min-h-[650px] md:py-32 max-[640px]:h-auto max-[640px]:min-h-0 max-[640px]:py-12 max-[640px]:overflow-visible">
        {/* Background com imagem blur */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/fundoquemsomos.webp"
            alt=""
            fill
            className="object-cover opacity-35"
            style={{ filter: "blur(6px)" }}
            sizes="100vw"
            aria-hidden="true"
          />

          {/* Película escura para destacar o conteúdo */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Vignette suave para dar profundidade */}
          <div className="absolute inset-0 bg-linear-to-b from-black/35 via-transparent to-black/45" />
        </div>

        {/* Conteúdo */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
            {/* Coluna esquerda: Textos */}
            <div className="space-y-6 text-white max-[640px]:text-center max-[640px]:space-y-4">
              <h2
                className="font-rajdhani text-4xl font-bold md:text-5xl max-[640px]:text-[30px]"
                style={{ fontFamily: "var(--font-rajdhani)", lineHeight: 1.2 }}
              >
                Quem <span className="text-rp-accent">somos?</span>
              </h2>

              <div
                className="space-y-5 text-base leading-relaxed md:text-lg max-[640px]:space-y-4 max-[640px]:text-[14px] max-[640px]:leading-relaxed"
                style={{ fontFamily: "var(--font-open-sans)" }}
              >
                <p className="font-bold">
                  Fundada em 2004, a Retífica Premium nasceu do sonho de
                  oferecer serviços de retífica de cabeçotes com conferência,
                  explicação técnica e atendimento próximo.
                </p>

                <p>
                  <span className="font-bold">
                    Com equipamentos de conferência e uma equipe dedicada ao
                    trabalho em cabeçotes,
                  </span>{" "}
                  a oficina organiza cada serviço a partir da avaliação da peça.
                </p>

                <p>
                  Ao longo dos anos, investimos continuamente em tecnologia e
                  capacitação profissional para manter o processo de retífica
                  de cabeçotes atualizado.
                </p>

                <p className="font-bold uppercase text-rp-accent">
                  NOSSA FILOSOFIA É SIMPLES: TRATAR CADA CABEÇOTE COM O MESMO
                  CUIDADO E PRECISÃO QUE GOSTARÍAMOS QUE TRATASSEM O NOSSO.
                </p>

                <p>
                  Hoje, o compromisso continua sendo explicar o que foi
                  encontrado, combinar o prazo e executar somente o escopo
                  aprovado com o cliente.
                </p>
              </div>
            </div>

            {/* Coluna direita: Mosaico de 3 imagens */}
            <div className="relative mx-auto w-full max-w-[540px] md:h-[720px]">
              {/* Imagem 1 - Topo */}
              <div className="relative h-[300px] w-full max-w-[400px] overflow-hidden rounded-xl border-4 border-white shadow-xl max-[640px]:mx-auto max-[640px]:h-[115px] max-[640px]:w-[172px] max-[640px]:max-w-[172px]">
                <Image
                  src="/quemsomos.png"
                  alt="Equipe da Retífica Premium"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>

              {/* Imagem 2 - Baixo */}
              <div className="relative mt-6 h-[300px] w-full max-w-[400px] overflow-hidden rounded-xl border-4 border-white shadow-xl max-[640px]:mx-auto max-[640px]:mt-4 max-[640px]:h-[115px] max-[640px]:w-[172px] max-[640px]:max-w-[172px]">
                <Image
                  src="/quemsomos.png"
                  alt="Equipe da Retífica Premium"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>

              {/* Imagem 3 - Sobreposta no desktop, empilhada no mobile */}
              <div className="relative mt-6 h-[300px] w-full max-w-[400px] overflow-hidden rounded-xl border-4 border-white shadow-xl md:absolute md:right-[-125px] md:top-[180px] md:mt-0 md:w-[400px] max-[640px]:mx-auto max-[640px]:mt-4 max-[640px]:h-[115px] max-[640px]:w-[172px] max-[640px]:max-w-[172px]">
                <Image
                  src="/quemsomos.png"
                  alt="Equipe da Retífica Premium"
                  fill
                  className="object-cover"
                  sizes="400px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. NO QUE ACREDITAMOS */}
      <section className="relative min-h-[1100px] bg-white py-20 md:py-32 max-[640px]:min-h-0 max-[640px]:py-16">
        {/* Película azul */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-[#053282]/20" />
        <div className="relative z-10 mx-auto max-w-[1149px] px-4 sm:px-6 lg:px-8">
          {/* Título central */}
          <div className="mb-16 text-center">
            <h2
              className="font-rajdhani text-4xl font-bold text-gray-900 md:text-5xl"
              style={{ fontFamily: "var(--font-rajdhani)", lineHeight: 1.2 }}
            >
              No que <span className="text-rp-accent">acreditamos?</span>
            </h2>
          </div>

          {/* Cards Missão e Visão */}
          <div className="mb-16 flex flex-col items-center gap-8">
            {/* Missão */}
            <div
              className="group w-full max-w-[1149px] overflow-hidden rounded-lg p-6 shadow-xl transition-all duration-300 hover:shadow-2xl md:h-[212px] md:p-8"
              style={{
                background:
                  "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)",
              }}
            >
              <div className="flex h-full items-center justify-between gap-6">
                <div className="flex-1">
                  <h3
                    className="mb-3 font-rajdhani text-2xl font-bold text-white md:text-3xl"
                    style={{ fontFamily: "var(--font-rajdhani)" }}
                  >
                    Nossa Missão
                  </h3>
                  {/* Linhas duplas com animação */}
                  <div className="mb-4 flex items-center gap-2">
                    {/* Barra grande com efeito story */}
                    <div className="relative h-[3px] w-[220px] overflow-hidden rounded-full bg-white/30">
                      <div className="absolute left-0 top-0 h-full w-0 rounded-full bg-[#F3B839] transition-[width] duration-1100 ease-out will-change-[width] group-hover:w-full group-active:w-full group-focus-within:w-full" />
                    </div>
                    {/* Barra pequena */}
                    <div className="h-[3px] w-8 rounded-full bg-white transition-colors duration-300 group-hover:bg-[#F3B839] group-active:bg-[#F3B839] group-focus-within:bg-[#F3B839]" />
                  </div>
                  <p
                    className="text-base leading-relaxed text-white md:text-lg"
                    style={{ fontFamily: "var(--font-open-sans)" }}
                  >
                    Avaliar e recuperar o cabeçote dentro do escopo aprovado,
                    com conferência, prazo combinado e atendimento direto.
                  </p>
                </div>
                <div className="shrink-0">
                  <AboutIcon name="target" className="h-20 w-20 text-[#F3B839] md:h-[130px] md:w-[130px]" />
                </div>
              </div>
            </div>

            {/* Visão */}
            <div
              className="group w-full max-w-[1149px] overflow-hidden rounded-lg p-6 shadow-xl transition-all duration-300 hover:shadow-2xl md:h-[212px] md:p-8"
              style={{
                background:
                  "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)",
              }}
            >
              <div className="flex h-full items-center justify-between gap-6">
                <div className="flex-1">
                  <h3
                    className="mb-3 font-rajdhani text-2xl font-bold text-white md:text-3xl"
                    style={{ fontFamily: "var(--font-rajdhani)" }}
                  >
                    Nossa Visão
                  </h3>
                  {/* Linhas duplas com animação */}
                  <div className="mb-4 flex items-center gap-2">
                    {/* Barra grande com efeito story */}
                    <div className="relative h-[3px] w-[220px] overflow-hidden rounded-full bg-white/30">
                      <div className="absolute left-0 top-0 h-full w-0 rounded-full bg-[#F3B839] transition-[width] duration-1100 ease-out will-change-[width] group-hover:w-full group-active:w-full group-focus-within:w-full" />
                    </div>
                    {/* Barra pequena */}
                    <div className="h-[3px] w-8 rounded-full bg-white transition-colors duration-300 group-hover:bg-[#F3B839] group-active:bg-[#F3B839] group-focus-within:bg-[#F3B839]" />
                  </div>
                  <p
                    className="text-base leading-relaxed text-white md:text-lg"
                    style={{ fontFamily: "var(--font-open-sans)" }}
                  >
                    Ser referência regional em retífica de cabeçotes, inovação e
                    atendimento ao cliente.
                  </p>
                </div>
                <div className="shrink-0">
                  <AboutIcon name="vision" className="h-20 w-20 text-[#F3B839] md:h-[130px] md:w-[130px]" />
                </div>
              </div>
            </div>
          </div>

          {/* Grid 2x2 de Valores */}
          <div className="grid grid-cols-1 justify-items-center gap-y-8 md:grid-cols-2 md:gap-x-[60px] md:gap-y-[60px]">
            {/* Precisão */}
            <div
              className="w-full max-w-[360px] rounded-lg border border-rp-gold/20 p-6 shadow-lg transition-transform duration-200 will-change-transform hover:scale-105 max-[640px]:h-[282px] max-[640px]:w-[282px] md:h-[360px] md:w-[360px] md:p-8"
              style={{ background: "#1a1a1a" }}
            >
              <div className="flex h-full flex-col items-center justify-center text-center">
                <AboutIcon name="precision" className="mb-4 h-20 w-20 text-[#F3B839] md:h-[130px] md:w-[130px]" />
                <h3
                  className="mb-3 font-rajdhani text-xl font-bold text-white md:text-2xl"
                  style={{ fontFamily: "var(--font-rajdhani)" }}
                >
                  Precisão
                </h3>
                <p
                  className="text-sm leading-relaxed text-gray-300 md:text-base"
                  style={{ fontFamily: "var(--font-open-sans)" }}
                >
                  Trabalhamos com instrumentos de conferência e processos definidos
                  para conferir cada etapa do serviço.
                </p>
              </div>
            </div>

            {/* Compromisso */}
            <div
              className="w-full max-w-[360px] rounded-lg border border-rp-gold/20 p-6 shadow-lg transition-transform duration-200 will-change-transform hover:scale-105 max-[640px]:h-[282px] max-[640px]:w-[282px] md:h-[360px] md:w-[360px] md:p-8"
              style={{ background: "#1a1a1a" }}
            >
              <div className="flex h-full flex-col items-center justify-center text-center">
                <AboutIcon name="commitment" className="mb-4 h-20 w-20 text-[#F3B839] md:h-[130px] md:w-[130px]" />
                <h3
                  className="mb-3 font-rajdhani text-xl font-bold text-white md:text-2xl"
                  style={{ fontFamily: "var(--font-rajdhani)" }}
                >
                  Compromisso
                </h3>
                <p
                  className="text-sm leading-relaxed text-gray-300 md:text-base"
                  style={{ fontFamily: "var(--font-open-sans)" }}
                >
                  Combinamos escopo e prazo antes da execução e explicamos o
                  serviço realizado na entrega.
                </p>
              </div>
            </div>

            {/* Qualidade */}
            <div
              className="w-full max-w-[360px] rounded-lg border border-rp-gold/20 p-6 shadow-lg transition-transform duration-200 will-change-transform hover:scale-105 max-[640px]:h-[282px] max-[640px]:w-[282px] md:h-[360px] md:w-[360px] md:p-8"
              style={{ background: "#1a1a1a" }}
            >
              <div className="flex h-full flex-col items-center justify-center text-center">
                <AboutIcon name="quality" className="mb-4 h-20 w-20 text-[#F3B839] md:h-[130px] md:w-[130px]" />
                <h3
                  className="mb-3 font-rajdhani text-xl font-bold text-white md:text-2xl"
                  style={{ fontFamily: "var(--font-rajdhani)" }}
                >
                  Qualidade
                </h3>
                <p
                  className="text-sm leading-relaxed text-gray-300 md:text-base"
                  style={{ fontFamily: "var(--font-open-sans)" }}
                >
                  Trabalhamos com componentes adequados, conferências precisas e
                  padrões de qualidade definidos para cada serviço.
                </p>
              </div>
            </div>

            {/* Equipe */}
            <div
              className="w-full max-w-[360px] rounded-lg border border-rp-gold/20 p-6 shadow-lg transition-transform duration-200 will-change-transform hover:scale-105 max-[640px]:h-[282px] max-[640px]:w-[282px] md:h-[360px] md:w-[360px] md:p-8"
              style={{ background: "#1a1a1a" }}
            >
              <div className="flex h-full flex-col items-center justify-center text-center">
                <AboutIcon name="team" className="mb-4 h-20 w-20 text-[#F3B839] md:h-[130px] md:w-[130px]" />
                <h3
                  className="mb-3 font-rajdhani text-xl font-bold text-white md:text-2xl"
                  style={{ fontFamily: "var(--font-rajdhani)" }}
                >
                  Equipe
                </h3>
                <p
                  className="text-sm leading-relaxed text-gray-300 md:text-base"
                  style={{ fontFamily: "var(--font-open-sans)" }}
                >
                  Profissionais dedicados à avaliação, usinagem e montagem de
                  cabeçotes, com experiência prática na oficina.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FAIXA DE NÚMEROS AUDITADOS */}
      <section className="bg-linear-to-r from-[#053282] via-[#0B2F6B] to-[#053282] py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <NumerosProva numeros={numerosProva} tom="claro" />
        </div>
      </section>

      {/* 5. SEÇÃO FINAL COM TEXTURA */}
      <section className="relative min-h-[800px] overflow-hidden max-[640px]:min-h-0 max-[640px]:py-16 max-[640px]:overflow-visible">
        {/* Background com textura */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/texturewhite.png"
            alt=""
            fill
            className="object-cover opacity-70"
            sizes="100vw"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-white/30" />
        </div>

        {/* Conteúdo */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
            {/* Coluna esquerda: imagem da estrutura */}
            <div className="relative hidden aspect-4/3 overflow-hidden rounded-lg border border-[#D9E7FF] shadow-xl md:block">
              <Image
                src="/oficina.jpeg"
                alt="Estrutura da Retífica Premium em Sertãozinho-SP"
                fill
                sizes="(max-width: 1024px) 50vw, 560px"
                className="object-cover"
              />
            </div>

            {/* Coluna direita: Texto */}
            <div className="space-y-6">
              <h2
                className="font-rajdhani text-4xl font-bold text-gray-900 md:text-5xl"
                style={{ fontFamily: "var(--font-rajdhani)", lineHeight: 1.2 }}
              >
                Pessoas que entendem de cabeçote —{" "}
                <span className="text-rp-accent">e de confiança.</span>
              </h2>
              <div
                className="space-y-4 text-base leading-relaxed text-gray-700 md:text-lg"
                style={{ fontFamily: "var(--font-open-sans)" }}
              >
                <p>
                  Nossa equipe reúne profissionais com experiência prática em{" "}
                  <span className="font-bold text-rp-accent">
                    usinagem de cabeçotes
                  </span>
                  ,{" "}
                  <span className="font-bold text-rp-accent">
                    conferência dimensional
                  </span>{" "}
                  e{" "}
                  <span className="font-bold text-rp-accent">
                    análise técnica
                  </span>
                  .
                </p>
                <p>
                  Combinamos experiência prática, instrumentos de conferência e
                  conferência por etapas. Cada membro da equipe participa do
                  cuidado com a peça e da explicação do serviço executado.
                </p>
              </div>
              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <TrackedCtaLink
                  href="/servicos"
                  eventLabel="about_story_services"
                  trackingPosition="about_story"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-rp-accent px-8 text-sm font-bold text-white transition-all hover:brightness-110"
                >
                  Conhecer serviços
                </TrackedCtaLink>
                <TrackedCtaLink
                  href="/contato"
                  eventLabel="about_story_contact"
                  trackingPosition="about_story"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-rp-accent px-8 text-sm font-bold text-rp-accent transition-all hover:bg-[#D9E7FF]"
                >
                  Falar com a equipe
                </TrackedCtaLink>
              </div>
            </div>
          </div>
        </div>
      </section>
      <BreadcrumbSchema
        items={[
          { name: "Início", url: "/" },
          { name: "Sobre", url: "/sobre" },
        ]}
      />
    </main>
  );
}
