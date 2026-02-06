import Image from "next/image";
import { StatsCounter } from "@/components/site/StatsCounter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Sobre a Retífica Premium | 20 Anos de Experiência em Retífica de Motores",
  description:
    "Mais de 20 anos de experiência em retífica de cabeçotes e usinagem automotiva. Equipe especializada, equipamentos modernos e compromisso com qualidade em Sertãozinho-SP.",
  alternates: {
    canonical: "/sobre",
  },
  openGraph: {
    title: "Sobre a Retífica Premium | 20 Anos de Experiência",
    description:
      "Mais de 20 anos de experiência em retífica de cabeçotes e usinagem automotiva com equipe especializada.",
    url: "https://retificapremium.com.br/sobre",
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
    title: "Sobre a Retífica Premium | 20 Anos de Experiência",
    description:
      "Mais de 20 anos de experiência em retífica de cabeçotes e usinagem automotiva com equipe especializada.",
    images: ["/retificapremium.jpeg"],
  },
};

export default function SobrePage() {
  return (
    <main className="min-h-screen">
      {/* 1. HERO */}
      <section className="relative min-h-[590px] overflow-hidden bg-white max-[640px]:min-h-[302px] max-[640px]:h-auto max-[640px]:overflow-visible">
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
        <div className="relative z-10 mx-auto flex min-h-[590px] max-w-7xl items-center justify-center px-4 text-center sm:px-6 lg:px-8 max-[640px]:min-h-[300px] max-[640px]:items-center max-[640px]:justify-center max-[640px]:pt-10 max-[640px]:pb-10">
          {/* Desktop / tablet */}
          <div className="space-y-6 max-[640px]:hidden">
            <h1
              className="font-rajdhani text-3xl font-bold leading-tight sm:text-4xl md:text-6xl lg:text-7xl"
              style={{ fontFamily: "var(--font-rajdhani)", lineHeight: 1.2 }}
            >
              Mais de{" "}
              <span className="text-rp-accent">20 Anos de Experiência</span> em
              Retífica Automotiva e Usinagem de Precisão
            </h1>

            <p
              className="mx-auto max-w-3xl text-base text-gray-700 sm:text-lg md:text-2xl"
              style={{
                fontFamily: "var(--font-open-sans)",
                fontWeight: 400,
                lineHeight: 1.5,
              }}
            >
              Desde 2004, a Retífica Premium entrega serviços completos de
              retífica de cabeçotes com garantia, prazo e transparência.
              Atendemos carros, caminhões, ônibus e tratores em Sertãozinho-SP,
              Ribeirão Preto e região.
            </p>
          </div>

          {/* Mobile (<= 640px) — igual ao print */}
          <div className="hidden w-full max-[640px]:block">
            <div className="mx-auto w-full max-w-[340px] text-center">
              <h1
                className="font-rajdhani text-[30px] font-bold leading-[1.12] tracking-tight text-gray-900"
                style={{ fontFamily: "var(--font-rajdhani)" }}
              >
                <span className="text-rp-royal">Excelência</span> em cada
                cabeçote.
                <br />
                <span className="text-rp-royal">Confiança</span> em cada reparo.
              </h1>

              <div className="mt-8 space-y-2">
                <p
                  className="text-[18px] font-bold text-[#0b1f3a]"
                  style={{
                    fontFamily: "var(--font-open-sans)",
                    lineHeight: 1.35,
                  }}
                >
                  Mais de 20 anos de experiência
                </p>
                <p
                  className="text-[16px] text-[#0b1f3a]"
                  style={{
                    fontFamily: "var(--font-open-sans)",
                    lineHeight: 1.45,
                  }}
                >
                  transformando motores com precisão
                </p>
                <p
                  className="text-[16px] text-[#0b1f3a]"
                  style={{
                    fontFamily: "var(--font-open-sans)",
                    lineHeight: 1.45,
                  }}
                >
                  e qualidade incomparáveis.
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
            src="/fundoquemsomos.png"
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
                  oferecer serviços de retífica de motores com excelência
                  técnica e atendimento diferenciado.
                </p>

                <p>
                  <span className="font-bold">
                    Com equipamentos de última geração e uma equipe altamente
                    qualificada,
                  </span>{" "}
                  conquistamos a confiança de milhares de clientes.
                </p>

                <p>
                  Ao longo dos anos, investimos continuamente em tecnologia e
                  capacitação profissional, tornando-nos referência no mercado
                  de retífica de motores.
                </p>

                <p className="font-bold uppercase text-rp-accent">
                  NOSSA FILOSOFIA É SIMPLES: TRATAR CADA MOTOR COM O MESMO
                  CUIDADO E PRECISÃO QUE GOSTARÍAMOS QUE TRATASSEM O NOSSO.
                </p>

                <p>
                  Hoje, orgulhamo-nos de ser uma das retíficas mais respeitadas
                  da região, reconhecida pela qualidade dos serviços,
                  pontualidade nas entregas e transparência no relacionamento
                  com os clientes.
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
                    Restaurar a performance e a confiabilidade dos motores com
                    qualidade técnica, agilidade e atendimento humano.
                  </p>
                </div>
                <div className="shrink-0">
                  <span
                    className="material-symbols-outlined text-[80px] leading-none text-[#F3B839] md:text-[130px]!"
                    style={{
                      lineHeight: 1,
                      fontVariationSettings:
                        '"FILL" 0, "wght" 400, "GRAD" 0, "opsz" 48',
                    }}
                  >
                    target
                  </span>
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
                  <span
                    className="material-symbols-outlined text-[80px] leading-none text-[#F3B839] md:text-[130px]!"
                    style={{
                      lineHeight: 1,
                      fontVariationSettings:
                        '"FILL" 0, "wght" 400, "GRAD" 0, "opsz" 48',
                    }}
                  >
                    visibility
                  </span>
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
                <span
                  className="material-symbols-outlined mb-4 text-[80px] leading-none text-[#F3B839] md:text-[130px]!"
                  style={{
                    lineHeight: 1,
                    fontVariationSettings:
                      '"FILL" 0, "wght" 400, "GRAD" 0, "opsz" 48',
                  }}
                >
                  track_changes
                </span>
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
                  Trabalhamos com equipamentos de última geração para garantir
                  precisão milimétrica em cada serviço.
                </p>
              </div>
            </div>

            {/* Compromisso */}
            <div
              className="w-full max-w-[360px] rounded-lg border border-rp-gold/20 p-6 shadow-lg transition-transform duration-200 will-change-transform hover:scale-105 max-[640px]:h-[282px] max-[640px]:w-[282px] md:h-[360px] md:w-[360px] md:p-8"
              style={{ background: "#1a1a1a" }}
            >
              <div className="flex h-full flex-col items-center justify-center text-center">
                <span
                  className="material-symbols-outlined mb-4 text-[80px] leading-none text-[#F3B839] md:text-[130px]!"
                  style={{
                    lineHeight: 1,
                    fontVariationSettings:
                      '"FILL" 0, "wght" 400, "GRAD" 0, "opsz" 48',
                  }}
                >
                  handshake
                </span>
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
                  Comprometidos com a satisfação do cliente e a excelência em
                  cada projeto realizado.
                </p>
              </div>
            </div>

            {/* Qualidade */}
            <div
              className="w-full max-w-[360px] rounded-lg border border-rp-gold/20 p-6 shadow-lg transition-transform duration-200 will-change-transform hover:scale-105 max-[640px]:h-[282px] max-[640px]:w-[282px] md:h-[360px] md:w-[360px] md:p-8"
              style={{ background: "#1a1a1a" }}
            >
              <div className="flex h-full flex-col items-center justify-center text-center">
                <span
                  className="material-symbols-outlined mb-4 text-[80px] leading-none text-[#F3B839] md:text-[130px]!"
                  style={{
                    lineHeight: 1,
                    fontVariationSettings:
                      '"FILL" 0, "wght" 400, "GRAD" 0, "opsz" 48',
                  }}
                >
                  workspace_premium
                </span>
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
                  Utilizamos apenas peças originais e seguimos os mais rigorosos
                  padrões de qualidade.
                </p>
              </div>
            </div>

            {/* Equipe */}
            <div
              className="w-full max-w-[360px] rounded-lg border border-rp-gold/20 p-6 shadow-lg transition-transform duration-200 will-change-transform hover:scale-105 max-[640px]:h-[282px] max-[640px]:w-[282px] md:h-[360px] md:w-[360px] md:p-8"
              style={{ background: "#1a1a1a" }}
            >
              <div className="flex h-full flex-col items-center justify-center text-center">
                <span
                  className="material-symbols-outlined mb-4 text-[80px] leading-none text-[#F3B839] md:text-[130px]!"
                  style={{
                    lineHeight: 1,
                    fontVariationSettings:
                      '"FILL" 0, "wght" 400, "GRAD" 0, "opsz" 48',
                  }}
                >
                  groups
                </span>
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
                  Profissionais especializados e certificados com anos de
                  experiência no mercado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FAIXA DE MÉTRICAS */}
      <section className="h-[350px] bg-linear-to-r from-[#053282] via-[#0B2F6B] to-[#053282] max-[640px]:h-auto max-[640px]:py-12">
        <div className="mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div className="grid w-full grid-cols-2 gap-8 md:grid-cols-4">
            {/* Métrica 1 */}
            <StatsCounter
              endValue={20}
              suffix="+"
              label="Anos de experiência"
            />

            {/* Métrica 2 */}
            <StatsCounter
              endValue={5000}
              suffix="+"
              label="Motores Retificados"
            />

            {/* Métrica 3 */}
            <StatsCounter endValue={98} suffix="%" label="Satisfação" />

            {/* Métrica 4 */}
            <StatsCounter endValue={15} label="Especialistas" />
          </div>
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
            {/* Coluna esquerda: Placeholder para imagem futura */}
            <div className="relative hidden aspect-4/3 overflow-hidden rounded-lg bg-gray-200 md:block">
              <div className="flex h-full items-center justify-center text-gray-400">
                <span className="text-sm">Imagem: Equipe</span>
              </div>
            </div>

            {/* Coluna direita: Texto */}
            <div className="space-y-6">
              <h2
                className="font-rajdhani text-4xl font-bold text-gray-900 md:text-5xl"
                style={{ fontFamily: "var(--font-rajdhani)", lineHeight: 1.2 }}
              >
                Pessoas que entendem de motores —{" "}
                <span className="text-rp-accent">e de confiança.</span>
              </h2>
              <div
                className="space-y-4 text-base leading-relaxed text-gray-700 md:text-lg"
                style={{ fontFamily: "var(--font-open-sans)" }}
              >
                <p>
                  Nossa equipe é formada por profissionais altamente
                  qualificados, com vasta experiência em{" "}
                  <span className="font-bold text-rp-accent">
                    usinagem automotiva
                  </span>
                  ,{" "}
                  <span className="font-bold text-rp-accent">
                    mecânica de precisão
                  </span>{" "}
                  e{" "}
                  <span className="font-bold text-rp-accent">
                    análise técnica
                  </span>
                  .
                </p>
                <p>
                  Combinamos experiência prática com equipamentos modernos,
                  garantindo resultados que superam as expectativas. Cada membro
                  da nossa equipe compartilha o compromisso com a excelência e o
                  cuidado com cada motor que passa por nossas mãos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
