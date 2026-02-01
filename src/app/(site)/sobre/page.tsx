"use client";

import Image from "next/image";
import { StatsCounter } from "@/components/site/StatsCounter";

export default function SobrePage() {
  return (
    <main className="min-h-screen">
      {/* 1. HERO */}
      <section className="relative min-h-[590px] overflow-hidden bg-white">
        {/* Background com textura */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image
            src="/texturewhite.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-85"
          />

          {/* Overlay leve (não “apaga” a textura) */}
          <div className="absolute inset-0 bg-white/20" />
          {/* opcional: dá um “polimento” */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/30" />
        </div>

        {/* Conteúdo */}
        <div className="relative z-10 mx-auto flex min-h-[590px] max-w-7xl items-center justify-center px-4 text-center sm:px-6 lg:px-8">
          <div className="space-y-6">
            <h1
              className="font-rajdhani text-5xl font-bold leading-tight md:text-6xl lg:text-7xl"
              style={{ fontFamily: "var(--font-rajdhani)", lineHeight: 1.2 }}
            >
              <span className="text-rp-accent">Excelência</span> em cada
              cabeçote.
              <br />
              <span className="text-rp-accent">Confiança</span> em cada reparo.
            </h1>

            <p
              className="mx-auto max-w-3xl text-xl text-gray-700 md:text-2xl"
              style={{
                fontFamily: "var(--font-open-sans)",
                fontWeight: 400,
                lineHeight: 1.5,
              }}
            >
              Mais de 20 anos de experiência transformando motores com precisão
              e qualidade incomparáveis.
            </p>
          </div>
        </div>
      </section>

      {/* 2. QUEM SOMOS */}
      <section className="relative overflow-hidden py-20 md:min-h-[650px] md:py-32">
        {/* Background com imagem blur */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/fundoquemsomos.png"
            alt=""
            fill
            className="object-cover opacity-35"
            style={{ filter: "blur(6px)" }}
            priority={false}
          />

          {/* Película escura para destacar o conteúdo */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Vignette suave para dar profundidade */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/45" />
        </div>

        {/* Conteúdo */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
            {/* Coluna esquerda: Textos */}
            <div className="space-y-6 text-white">
              <h2
                className="font-rajdhani text-4xl font-bold md:text-5xl"
                style={{ fontFamily: "var(--font-rajdhani)", lineHeight: 1.2 }}
              >
                Quem <span className="text-rp-accent">somos?</span>
              </h2>
              <div
                className="space-y-4 text-base leading-relaxed md:text-lg"
                style={{ fontFamily: "var(--font-open-sans)" }}
              >
                <p>
                  Fundada em 2004, a Retífica Premium nasceu com a missão de
                  oferecer serviços de excelência em retífica de motores. Ao
                  longo de mais de 20 anos, consolidamos nossa posição como
                  referência no setor, sempre priorizando a qualidade técnica e
                  a satisfação dos nossos clientes.
                </p>
                <p>
                  Utilizamos equipamentos de última geração e contamos com uma
                  equipe altamente qualificada, que combina experiência prática
                  com conhecimento técnico avançado. Investimos continuamente em
                  tecnologia e capacitação, garantindo que cada motor seja
                  tratado com o máximo de cuidado e precisão.
                </p>
                <p>
                  Nossa filosofia é simples: cada motor que passa por nossas
                  mãos recebe atenção individualizada, seguindo os mais
                  rigorosos padrões de qualidade. Somos reconhecidos na região
                  pela nossa pontualidade, transparência e compromisso com a
                  excelência em cada serviço realizado.
                </p>
              </div>
            </div>

            {/* Coluna direita: Mosaico de 3 imagens */}
            <div className="relative mx-auto w-full max-w-[540px] md:h-[720px]">
              {/* Imagem 1 - Topo */}
              <div className="relative h-[300px] w-full max-w-[400px] overflow-hidden rounded-xl border-4 border-white shadow-xl">
                <Image
                  src="/quemsomos.png"
                  alt="Equipe da Retífica Premium"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>

              {/* Imagem 2 - Baixo */}
              <div className="relative mt-6 h-[300px] w-full max-w-[400px] overflow-hidden rounded-xl border-4 border-white shadow-xl">
                <Image
                  src="/quemsomos.png"
                  alt="Equipe da Retífica Premium"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>

              {/* Imagem 3 - Meio sobreposta e mais à direita */}
              <div className="absolute right-[-125px] top-[180px] z-20 h-[300px] w-[400px] overflow-hidden rounded-xl border-4 border-white shadow-xl">
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
      <section className="relative min-h-[1100px] bg-white py-20 md:py-32">
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
                      <div className="absolute left-0 top-0 h-full w-0 rounded-full bg-[#F3B839] transition-[width] duration-[1100ms] ease-out will-change-[width] group-hover:w-full" />
                    </div>
                    {/* Barra pequena */}
                    <div className="h-[3px] w-8 rounded-full bg-white transition-colors duration-300 group-hover:bg-[#F3B839]" />
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
                    className="material-symbols-outlined leading-none text-[#F3B839]"
                    style={{
                      fontSize: 134,
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
                      <div className="absolute left-0 top-0 h-full w-0 rounded-full bg-[#F3B839] transition-[width] duration-[1100ms] ease-out will-change-[width] group-hover:w-full" />
                    </div>
                    {/* Barra pequena */}
                    <div className="h-[3px] w-8 rounded-full bg-white transition-colors duration-300 group-hover:bg-[#F3B839]" />
                  </div>
                  <p
                    className="text-base leading-relaxed text-white md:text-lg"
                    style={{ fontFamily: "var(--font-open-sans)" }}
                  >
                    Ser reconhecida como a melhor retífica de motores do Brasil,
                    referência em qualidade, inovação e atendimento ao cliente.
                  </p>
                </div>
                <div className="shrink-0">
                  <span
                    className="material-symbols-outlined leading-none text-[#F3B839]"
                    style={{
                      fontSize: 134,
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
              className="w-full max-w-[360px] rounded-lg border border-rp-gold/20 p-8 shadow-lg transition-transform duration-200 will-change-transform hover:scale-105 md:h-[360px] md:w-[360px]"
              style={{ background: "#1a1a1a" }}
            >
              <div className="flex h-full flex-col items-center justify-center text-center">
                <span
                  className="material-symbols-outlined mb-4 leading-none text-[#F3B839]"
                  style={{
                    fontSize: 134,
                    lineHeight: 1,
                    fontVariationSettings:
                      '"FILL" 0, "wght" 400, "GRAD" 0, "opsz" 48',
                  }}
                >
                  track_changes
                </span>
                <h3
                  className="mb-3 font-rajdhani text-2xl font-bold text-white"
                  style={{ fontFamily: "var(--font-rajdhani)" }}
                >
                  Precisão
                </h3>
                <p
                  className="text-base leading-relaxed text-gray-300"
                  style={{ fontFamily: "var(--font-open-sans)" }}
                >
                  Trabalhamos com equipamentos de última geração para garantir
                  precisão milimétrica em cada serviço.
                </p>
              </div>
            </div>

            {/* Compromisso */}
            <div
              className="w-full max-w-[360px] rounded-lg border border-rp-gold/20 p-8 shadow-lg transition-transform duration-200 will-change-transform hover:scale-105 md:h-[360px] md:w-[360px]"
              style={{ background: "#1a1a1a" }}
            >
              <div className="flex h-full flex-col items-center justify-center text-center">
                <span
                  className="material-symbols-outlined mb-4 leading-none text-[#F3B839]"
                  style={{
                    fontSize: 134,
                    lineHeight: 1,
                    fontVariationSettings:
                      '"FILL" 0, "wght" 400, "GRAD" 0, "opsz" 48',
                  }}
                >
                  handshake
                </span>
                <h3
                  className="mb-3 font-rajdhani text-2xl font-bold text-white"
                  style={{ fontFamily: "var(--font-rajdhani)" }}
                >
                  Compromisso
                </h3>
                <p
                  className="text-base leading-relaxed text-gray-300"
                  style={{ fontFamily: "var(--font-open-sans)" }}
                >
                  Comprometidos com a satisfação do cliente e a excelência em
                  cada projeto realizado.
                </p>
              </div>
            </div>

            {/* Qualidade */}
            <div
              className="w-full max-w-[360px] rounded-lg border border-rp-gold/20 p-8 shadow-lg transition-transform duration-200 will-change-transform hover:scale-105 md:h-[360px] md:w-[360px]"
              style={{ background: "#1a1a1a" }}
            >
              <div className="flex h-full flex-col items-center justify-center text-center">
                <span
                  className="material-symbols-outlined mb-4 leading-none text-[#F3B839]"
                  style={{
                    fontSize: 134,
                    lineHeight: 1,
                    fontVariationSettings:
                      '"FILL" 0, "wght" 400, "GRAD" 0, "opsz" 48',
                  }}
                >
                  workspace_premium
                </span>
                <h3
                  className="mb-3 font-rajdhani text-2xl font-bold text-white"
                  style={{ fontFamily: "var(--font-rajdhani)" }}
                >
                  Qualidade
                </h3>
                <p
                  className="text-base leading-relaxed text-gray-300"
                  style={{ fontFamily: "var(--font-open-sans)" }}
                >
                  Utilizamos apenas peças originais e seguimos os mais rigorosos
                  padrões de qualidade.
                </p>
              </div>
            </div>

            {/* Equipe */}
            <div
              className="w-full max-w-[360px] rounded-lg border border-rp-gold/20 p-8 shadow-lg transition-transform duration-200 will-change-transform hover:scale-105 md:h-[360px] md:w-[360px]"
              style={{ background: "#1a1a1a" }}
            >
              <div className="flex h-full flex-col items-center justify-center text-center">
                <span
                  className="material-symbols-outlined mb-4 leading-none text-[#F3B839]"
                  style={{
                    fontSize: 134,
                    lineHeight: 1,
                    fontVariationSettings:
                      '"FILL" 0, "wght" 400, "GRAD" 0, "opsz" 48',
                  }}
                >
                  groups
                </span>
                <h3
                  className="mb-3 font-rajdhani text-2xl font-bold text-white"
                  style={{ fontFamily: "var(--font-rajdhani)" }}
                >
                  Equipe
                </h3>
                <p
                  className="text-base leading-relaxed text-gray-300"
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
      <section className="h-[350px] bg-gradient-to-r from-[#053282] via-[#0B2F6B] to-[#053282]">
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
      <section className="relative min-h-[800px] overflow-hidden">
        {/* Background com textura */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/texturewhite.png"
            alt=""
            fill
            className="object-cover opacity-70"
            priority={false}
          />
          <div className="absolute inset-0 bg-white/30" />
        </div>

        {/* Conteúdo */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
            {/* Coluna esquerda: Placeholder para imagem futura */}
            <div className="relative hidden aspect-[4/3] overflow-hidden rounded-lg bg-gray-200 md:block">
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
