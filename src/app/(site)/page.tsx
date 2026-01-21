"use client";

import { Button } from "@/components/ui";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  // Ajuste este valor para controlar o “corte” (inclinação) da lateral esquerda da foto.
  // Ex.: 25 = menos inclinado, 35 = padrão, 45 = mais inclinado (topo mais estreito)
  const B2B_IMAGE_CUT_PERCENT = 34;

  return (
    <main className="min-h-screen">
      {/* 1. HERO */}
      <section className="relative bg-rp-navy pt-20 pb-20 md:pt-24 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
            {/* Logo placeholder */}
            <div className="mb-8 h-24 w-24 rounded-full bg-gradient-to-br from-rp-gold/20 to-rp-accent/20 p-4">
              <div className="h-full w-full rounded-full border-2 border-rp-gold/50" />
              {/* TODO: Adicionar logo SVG real */}
            </div>

            {/* Título em 2 linhas */}
            <h1 className="mb-6 font-heading text-4xl font-extrabold uppercase leading-tight tracking-tight md:text-5xl lg:text-6xl">
              <span className="text-[#f59e0b]">POTÊNCIA E PRECISÃO</span>
              <br />
              <span className="text-white">PARA O CORAÇÃO DO SEU MOTOR</span>
            </h1>

            {/* Subtexto */}
            <p className="mx-auto mb-2 max-w-2xl text-lg text-gray-300 md:text-xl">
              Especialistas em retífica de motores com mais de 20 anos de
              experiência.
            </p>
            <p className="mb-10 text-base text-gray-400 md:text-lg">
              Precisão, qualidade e confiança em cada serviço realizado.
            </p>

            {/* CTA Button */}
            <Link
              href="/contato"
              className="flex h-[68px] w-full max-w-[354px] items-center justify-center rounded-[62px] text-base font-bold uppercase text-white transition-all hover:brightness-110"
              style={{
                background: "linear-gradient(0deg, #F3B839 0%, #F4891F 100%)",
              }}
            >
              SOLICITAR ORÇAMENTO
            </Link>
          </div>
        </div>
      </section>

      {/* 2. BANNER/MARQUEE */}
      <section className="relative overflow-hidden bg-rp-royal py-4">
        <div className="marquee-infinite flex whitespace-nowrap text-sm font-semibold uppercase text-white md:text-base">
          <div className="flex items-center gap-4 px-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <span key={i} className="flex items-center gap-4">
                RETÍFICA DE ALTA PRECISÃO • ENGENHARIA AUTOMOTIVA • TECNOLOGIA
                EM MOTORES • USINAGEM DE CABEÇOTES • QUALIDADE GARANTIDA
                {i < 2 && <span className="text-rp-gold">•</span>}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 3. DIFERENCIAIS */}
      <section className="relative min-h-[260px] overflow-hidden bg-rp-navy py-20 md:min-h-[340px] md:py-32">
        {/* Imagem de fundo */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/cabecote.webp"
            alt="Cabeçote em retífica"
            fill
            className="object-cover object-center opacity-[0.23]"
            priority={false}
          />
          {/* Overlay escuro */}
          <div className="absolute inset-0 bg-[rgba(2,14,29,0.7)]" />
        </div>

        {/* Conteúdo por cima da imagem */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
            {/* Espaço vazio à esquerda (para manter grid) */}
            <div className="hidden md:block" />

            {/* Direita: Cards */}
            <div className="space-y-8">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-rp-gold">
                  DIFERENCIAIS
                </p>
                <h2 className="mb-4 font-heading text-3xl font-bold text-white md:text-4xl">
                  Por que escolher a Retífica Premium?
                </h2>
                <div className="mb-8 flex gap-2">
                  <div className="h-1 w-12 bg-[#f59e0b]" />
                  <div className="h-1 w-24 bg-rp-accent" />
                </div>
              </div>

              {/* Grid 2x2 de cards */}
              <div className="grid grid-cols-2 gap-4">
                {/* Card 1: Entrega Rápida */}
                <div className="rounded-lg bg-white p-6 text-center shadow-lg">
                  <div className="mb-4 flex justify-center">
                    <Image
                      src="/clockhome.png"
                      alt="Entrega rápida"
                      width={81}
                      height={75}
                      className="h-[75px] w-[81px] object-contain"
                    />
                  </div>

                  <h3 className="mb-2 font-heading text-sm font-bold text-rp-navy">
                    Entrega Rápida
                  </h3>
                  <p className="text-xs text-gray-600">
                    Prazos otimizados sem comprometer a qualidade
                  </p>
                </div>

                {/* Card 2: Garantia Estendida */}
                <div className="rounded-lg bg-white p-6 text-center shadow-lg">
                  <div className="mb-4 flex justify-center">
                    <Image
                      src="/mencionhome.png"
                      alt="Garantia estendida"
                      width={81}
                      height={75}
                      className="h-[75px] w-[81px] object-contain"
                    />
                  </div>
                  <h3 className="mb-2 font-heading text-sm font-bold text-rp-navy">
                    Garantia Estendida
                  </h3>
                  <p className="text-xs text-gray-600">
                    Cobertura ampliada em todos os serviços
                  </p>
                </div>

                {/* Card 3: Equipe Especializada */}
                <div className="rounded-lg bg-white p-6 text-center shadow-lg">
                  <div className="mb-4 flex justify-center">
                    <Image
                      src="/peoplehome.png"
                      alt="Equipe especializada"
                      width={81}
                      height={75}
                      className="h-[75px] w-[81px] object-contain"
                    />
                  </div>
                  <h3 className="mb-2 font-heading text-sm font-bold text-rp-navy">
                    Equipe Especializada
                  </h3>
                  <p className="text-xs text-gray-600">
                    Profissionais certificados e experientes
                  </p>
                </div>

                {/* Card 4: Padrão Premium */}
                <div className="rounded-lg bg-white p-6 text-center shadow-lg">
                  <div className="mb-4 flex justify-center">
                    <Image
                      src="/trophyhome.png"
                      alt="Padrão Premium"
                      width={81}
                      height={75}
                      className="h-[75px] w-[81px] object-contain"
                    />
                  </div>

                  <h3 className="mb-2 font-heading text-sm font-bold text-rp-navy">
                    Padrão Premium
                  </h3>
                  <p className="text-xs text-gray-600">
                    Qualidade superior em cada detalhe
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SERVIÇOS */}
      <section className="bg-[#FFFBF2] pt-20 pb-12 md:pt-32 md:pb-14">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
          {/* Textos */}
          <div className="mb-12 text-center lg:text-left">
            <p
              className="mb-3 uppercase text-gray-600"
              style={{
                fontFamily: "var(--font-rajdhani)",
                fontWeight: 400,
                fontSize: "25.63px",
                lineHeight: "100%",
                letterSpacing: "0%",
              }}
            >
              SERVIÇOS
            </p>

            <h2
              className="mb-5 text-rp-accent"
              style={{
                fontFamily: "var(--font-rajdhani)",
                fontWeight: 700,
                fontSize: "42.41px",
                lineHeight: "100%",
                letterSpacing: "0%",
              }}
            >
              Soluções completas <br className="hidden lg:block" />
              em retífica de motores
            </h2>

            <p
              className="mx-auto max-w-[680px] text-gray-700 lg:mx-0"
              style={{
                fontFamily: "var(--font-open-sans)",
                fontWeight: 400,
                fontSize: "20px",
                lineHeight: "140%",
              }}
            >
              Trabalhamos com retífica de cabeçotes, usinagem de precisão,
              revisão de válvulas e montagem completa de motores. Cada serviço é
              executado com equipamentos modernos e controle rigoroso de
              qualidade.
            </p>
          </div>

          {/* Cards */}
          <div className="mt-25 mb-8 grid grid-cols-1 justify-items-center gap-y-14 md:grid-cols-2 md:gap-x-10 xl:grid-cols-3">
            {[
              {
                img: "/homesection3.png",
                title: "RETÍFICA DE MOTORES",
                desc: "Serviço completo de retífica com equipamentos de última geração e precisão milimétrica.",
              },
              {
                img: "/homesection32.png",
                title: "MONTAGEM DE MOTORES",
                desc: "Montagem profissional com peças originais e testes rigorosos de qualidade.",
              },
              {
                img: "/homesection33.png",
                title: "DIAGNÓSTICO TÉCNICO",
                desc: "Análise detalhada do estado do motor com relatório técnico completo.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="group relative min-h-[382px] w-full max-w-[324px] rounded-[10px] transition-transform duration-200 hover:-translate-y-1"
                style={{
                  background: "#D9E7FF",
                  border: "1px solid #053282",
                  boxShadow: "0px 4px 10px 0px #00000040",
                }}
              >
                {/* Imagem flutuando (fora do card) */}
                <div className="absolute left-1/2 top-[-52px] w-[276px] max-w-[calc(100%+24px)] -translate-x-1/2">
                  <Image
                    src={card.img}
                    alt={card.title}
                    width={276}
                    height={209}
                    className="h-[209px] w-[276px] max-w-full rounded-[10px] object-cover shadow-md transition-transform duration-200 group-hover:scale-[1.02]"
                    priority={false}
                  />
                </div>

                {/* Conteúdo */}
                <div className="flex h-full flex-col items-center px-6 pb-6 pt-[176px] text-center">
                  <h3
                    className="uppercase"
                    style={{
                      fontFamily: "var(--font-rajdhani)",
                      fontWeight: 700,
                      fontSize: "24px",
                      lineHeight: "100%",
                      color: "#053282",
                    }}
                  >
                    {card.title}
                  </h3>

                  <p
                    className="mt-4 max-w-[240px]"
                    style={{
                      fontFamily: "var(--font-open-sans)",
                      fontWeight: 400,
                      fontSize: "15px",
                      lineHeight: "140%",
                      color: "#053282",
                    }}
                  >
                    {card.desc}
                  </p>

                  {/* Botão do card */}
                  <Link
                    href="/servicos"
                    className="mt-auto inline-flex h-[44px] w-[180px] items-center justify-center rounded-[62px] text-white shadow-[0px_4px_10px_rgba(0,0,0,0.25)] transition-all duration-200 hover:brightness-110 hover:shadow-[0px_8px_18px_rgba(0,0,0,0.25)]"
                    style={{
                      background: "#053282",
                      fontFamily: "var(--font-open-sans)",
                      fontWeight: 700,
                      fontSize: "18px",
                      lineHeight: "100%",
                    }}
                  >
                    SAIBA MAIS
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Botão central (perto do fim amarelo) */}
          <div className="mt-2 flex justify-center">
            <Link
              href="/servicos"
              className="flex h-[68.2667px] w-full max-w-[354.061px] items-center justify-center rounded-[62px] text-center text-white transition-all duration-200 hover:brightness-110 hover:shadow-[0px_10px_20px_rgba(0,0,0,0.25)]"
              style={{
                background: "linear-gradient(0deg, #1654A6 0%, #0E62F6 100%)",
                fontFamily: "var(--font-open-sans)",
                fontWeight: 700,
                fontSize: "23px",
                lineHeight: "100%",
              }}
            >
              VER TODOS OS SERVIÇOS
            </Link>
          </div>
        </div>
      </section>

      {/* 5. B2B */}
      <section className="relative overflow-hidden bg-rp-navy py-32 md:py-44">
        <div className="pointer-events-none absolute -top-32 -bottom-32 left-1/2 z-20 hidden w-[140px] -translate-x-1/2 translate-x-[140px] -skew-x-20 md:-top-56 md:-bottom-56 md:block">
          {/* Parte de cima */}
          <div
            className="absolute left-0 top-0 w-full bg-[#F4BC4A]"
            style={{
              height: "calc(50% - 120px)",
              // corte diagonal na parte de baixo (mesmo sentido da sua de baixo perfeita)
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 150px))",
            }}
          />

          {/* Parte de baixo */}
          <div
            className="absolute left-0 bottom-0 w-full bg-[#F4BC4A]"
            style={{
              height: "calc(50% - 120px)",
              // corte diagonal na parte de cima
              clipPath: "polygon(0 80px, 100% 0, 100% 100%, 0 100%)",
            }}
          />
        </div>

        {/* ===== FAIXA FINA AMARELA (SEM corte, inteira) ===== */}
        <div className="pointer-events-none absolute -top-32 -bottom-32 left-1/2 z-30 hidden w-[24px] -translate-x-1/2 translate-x-[300px] -skew-x-20 origin-center bg-[#F4BC4A] md:-top-56 md:-bottom-56 md:block" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-stretch gap-12 md:grid-cols-2 md:gap-0">
            {/* Esquerda: Texto */}
            <div className="relative z-10 flex flex-col justify-center space-y-6 text-white md:pr-10">
              {/* Título pequeno "PARCEIROS B2B" */}
              <p
                className="uppercase text-rp-accent"
                style={{
                  fontFamily: "var(--font-rajdhani)",
                  fontWeight: 400,
                  fontSize: "25.63px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                }}
              >
                PARCEIROS B2B
              </p>

              {/* Headline "Programa B2B para Oficinas Parceiras" */}
              <h2 className="b2b-headline">
                <span className="text-rp-accent">Programa B2B</span> para
                Oficinas Parceiras
              </h2>

              {/* Parágrafo descritivo */}
              <p
                className="text-gray-300"
                style={{
                  fontFamily: "var(--font-open-sans)",
                  fontWeight: 400,
                  fontSize: "24px",
                  lineHeight: "135%",
                  letterSpacing: "0%",
                }}
              >
                Junte-se à nossa rede de oficinas parceiras e potencialize seu
                negócio com{" "}
                <strong
                  style={{
                    fontFamily: "var(--font-open-sans)",
                    fontWeight: 700,
                    fontSize: "24px",
                    lineHeight: "135%",
                    letterSpacing: "0%",
                  }}
                >
                  benefícios exclusivos
                </strong>
                ,{" "}
                <strong
                  style={{
                    fontFamily: "var(--font-open-sans)",
                    fontWeight: 700,
                    fontSize: "24px",
                    lineHeight: "135%",
                    letterSpacing: "0%",
                  }}
                >
                  programa de fidelidade estruturado
                </strong>{" "}
                e{" "}
                <strong
                  style={{
                    fontFamily: "var(--font-open-sans)",
                    fontWeight: 700,
                    fontSize: "24px",
                    lineHeight: "135%",
                    letterSpacing: "0%",
                  }}
                >
                  vantagens
                </strong>{" "}
                que aumentam sua competitividade.
              </p>

              {/* Lista de benefícios */}
              <ul className="space-y-4 pt-2">
                {[
                  "PREÇOS ESPECIAIS E DESCONTOS PROGRESSIVOS",
                  "ECONOMIA NA COMPRA DE PEÇAS E COMPONENTES",
                  "ATENDIMENTO PRIORITÁRIO E PRAZOS REDUZIDOS",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="mt-0 inline-flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full border border-[#F3B839] bg-white text-[#F3B839]"
                      style={{
                        fontSize: "18px",
                      }}
                    >
                      ✓
                    </span>
                    <span
                      className="text-white"
                      style={{
                        fontFamily: "var(--font-open-sans)",
                        fontWeight: 700,
                        fontSize: "20.34px",
                        lineHeight: "100%",
                        letterSpacing: "0%",
                      }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="pt-6">
                <Link
                  href="/b2b"
                  className="inline-flex h-[68px] items-center justify-center rounded-[62px] px-10 text-base font-bold uppercase text-white transition hover:brightness-110"
                  style={{
                    background:
                      "linear-gradient(0deg, #1654A6 0%, #0E62F6 100%)",
                  }}
                >
                  SEJA UM PARCEIRO PREMIUM
                </Link>
              </div>
            </div>

            {/* Direita: Imagem (encostada na direita) */}
            <div className="relative min-h-[420px] overflow-hidden md:-my-56 md:min-h-[860px] md:-mr-[calc(50vw-50%)]">
              {/*
                Recorte em formato de trapézio (direita reta, esquerda inclinada).
                Ajuste o valor em `B2B_IMAGE_CUT_PERCENT` para controlar a inclinação.
              */}
              <div
                className="absolute inset-y-0 right-0 w-full md:w-[720px] lg:w-[1075px] max-w-full"
                style={{
                  clipPath: `polygon(${B2B_IMAGE_CUT_PERCENT}% 0%, 100% 0%, 100% 100%, 0% 100%)`,
                }}
              >
                <Image
                  src="/oficina.jpeg"
                  alt="Oficina parceira Retífica Premium"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                {/* Overlay leve */}
                <div className="absolute inset-0 bg-black/10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. DEPOIMENTOS */}
      <section className="relative overflow-hidden">
        {/* Imagem de fundo */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/homecomment.png"
            alt=""
            fill
            className="object-cover object-center"
            priority={false}
          />
          {/* Overlay escuro + leve blur (efeito "telinha" do Figma) */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-black/75 backdrop-blur-[2px]" />
        </div>

        {/* Conteúdo */}
        <div className="relative z-10 flex min-h-[700px] flex-col justify-between md:min-h-[950px]">
          {/* Título e subtítulo centralizados no topo */}
          <div className="mx-auto max-w-7xl px-4 pt-16 text-center sm:px-6 lg:px-8 md:pt-24">
            <h2 className="mb-2 font-heading text-3xl font-bold text-white md:text-4xl">
              QUEM JÁ CONFIA NA{" "}
              <span className="text-rp-accent">RETÍFICA PREMIUM</span>
            </h2>
            <p className="text-base text-gray-300 md:text-lg">
              Veja o que nossos parceiros e clientes dizem sobre a qualidade,
              rapidez e confiança do nosso trabalho.
            </p>
          </div>

          {/* Faixa azul translúcida centralizada verticalmente (pega de fora a fora) */}
          <div className="flex flex-1 items-center justify-center py-8 md:py-12">
            <div
              className="w-full py-8 md:py-12"
              style={{
                background: "rgba(4, 59, 155, 0.29)",
              }}
            >
              {/* Container para centralizar os cards dentro da faixa */}
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Grid de cards de depoimentos */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="relative rounded-lg bg-white p-6 shadow-lg before:absolute before:bottom-0 before:right-0 before:h-2 before:w-1/3 before:rounded-tl-lg before:bg-rp-accent"
                    >
                      <p className="mb-4 text-sm italic text-gray-700">
                        &quot;Serviço excepcional! Minha frota de caminhões
                        nunca teve motores tão bem cuidados.&quot;
                      </p>
                      <div className="border-t border-gray-200 pt-4">
                        <p className="font-heading text-sm font-bold text-rp-navy">
                          Carlos Silva
                        </p>
                        <p className="text-xs text-gray-500">
                          Proprietário de Frota
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
