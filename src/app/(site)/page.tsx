import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  LocalBusinessSchema,
  ServiceSchema,
  FAQSchema,
} from "@/components/site/StructuredData";

export const metadata: Metadata = {
  title: "Retífica de Cabeçote em Sertãozinho e Região | Retífica Premium",
  description:
    "Retífica de cabeçote e usinagem automotiva em Sertãozinho, Ribeirão Preto e região. Orçamento rápido, garantia e prazo confiável. Atende carro, caminhão, diesel e gasolina.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Retífica de Cabeçote em Ribeirão Preto e Região | Retífica Premium",
    description:
      "Retífica de cabeçote e usinagem automotiva. Orçamento rápido, garantia e prazo confiável para carro, caminhão e motores diesel.",
    url: "https://retificapremium.com.br",
    siteName: "Retífica Premium",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Retífica Premium - Retífica de Cabeçote em Sertãozinho-SP",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Retífica de Cabeçote em Sertãozinho e Região | Retífica Premium",
    description:
      "Retífica de cabeçote e usinagem automotiva. Orçamento rápido, garantia e prazo confiável para carro, caminhão e motores diesel.",
    images: ["/og-image.jpg"],
  },
};

export default function HomePage() {
  // Ajuste este valor para controlar o “corte” (inclinação) da lateral esquerda da foto.
  // Ex.: 25 = menos inclinado, 35 = padrão, 45 = mais inclinado (topo mais estreito)
  const B2B_IMAGE_CUT_PERCENT = 34;

  return (
    <main className="min-h-screen">
      {/* 1. HERO — altura por viewport para que a faixa azul fique acima da dobra */}
      <section className="relative z-10 flex min-h-[calc(100svh-8.5rem)] flex-col bg-rp-navy pt-[clamp(0.5rem,2.5vh,3rem)] pb-[clamp(1rem,2vh,1.5rem)] md:pt-12 md:pb-4 lg:pt-14 lg:pb-5">
        <div className="mx-auto flex max-w-7xl flex-1 flex-col px-4 sm:px-6 lg:px-8">
          <div className="relative z-30 flex min-h-0 flex-1 flex-col items-center justify-start pb-10 text-center md:pb-12 lg:pb-14">
            {/* Bloco Superior: Logo + H1 + Textos */}
            <div className="flex flex-col items-center gap-3 md:gap-4 lg:gap-5 pt-3 md:pt-5 lg:pt-6">
              {/* Logo */}
              <div className="h-[120px] w-[165px] md:h-[155px] md:w-[210px]">
                <Image
                  src="/logo.png"
                  alt="Retífica Premium"
                  width={240}
                  height={180}
                  className="h-full w-full object-contain"
                  priority
                />
              </div>

              {/* Título em 2 linhas */}
              <h1 className="font-heading text-[32px] font-extrabold uppercase leading-[1.05] tracking-tight md:text-5xl md:leading-[1.08] lg:text-6xl lg:leading-[1.1]">
                <span className="text-[#f59e0b]">RETÍFICA DE CABEÇOTE</span>
                <br />
                <span className="text-white text-[28px] md:text-[42px] lg:text-5xl">
                  EM SERTÃOZINHO
                </span>
              </h1>

              {/* Subtexto */}
              <div className="flex flex-col gap-2 md:gap-2.5">
                <p className="mx-auto max-w-2xl text-[15px] leading-snug text-gray-300 md:text-lg md:leading-relaxed">
                  Usinagem de precisão, revisão de válvulas e montagem técnica
                  para carro, caminhão, ônibus e trator. Motor diesel, gasolina
                  ou álcool.
                </p>
                <p className="mx-auto max-w-2xl text-[13.5px] leading-snug text-gray-400 md:text-base md:leading-relaxed">
                  Diagnóstico técnico e orçamento rápido pelo WhatsApp para você
                  decidir com segurança.
                </p>
              </div>
              {/* Bloco Inferior: CTA */}
              <div className="mt-6 md:mt-8 relative z-40">
                <Link
                  href="https://wa.me/5516993021998?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Ret%C3%ADfica%20Premium%20e%20gostaria%20de%20solicitar%20um%20or%C3%A7amento%20para%20ret%C3%ADfica%20de%20cabe%C3%A7ote."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-40 inline-flex h-[60px] w-auto items-center justify-center rounded-[62px] px-8 md:px-12 text-[13px] md:text-base font-bold uppercase text-white whitespace-nowrap transition-all hover:brightness-110 md:h-[68px]"
                  style={{
                    background:
                      "linear-gradient(0deg, #F3B839 0%, #F4891F 100%)",
                  }}
                >
                  Solicitar orçamento pelo WhatsApp
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BANNER/MARQUEE — sobe para aparecer na primeira dobra */}
      <section className="pointer-events-none relative z-20 -mt-28 overflow-hidden bg-rp-royal py-4 md:-mt-32 lg:-mt-36 xl:-mt-40">
        <div className="marquee-infinite flex whitespace-nowrap text-sm font-semibold uppercase text-white md:text-base">
          <div className="flex items-center gap-4 px-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <span key={i} className="flex items-center gap-4">
                USINAGEM DE PRECISÃO • RETÍFICA DE CABEÇOTES • DIAGNÓSTICO
                TÉCNICO • ORÇAMENTO RÁPIDO • GARANTIA DOCUMENTADA
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
            alt="Cabeçote em processo de retífica"
            fill
            sizes="100vw"
            className="object-cover object-center opacity-[0.23]"
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
                  Por que a Retífica Premium é a escolha certa para seu motor?
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
                    Prazos combinados e acompanhamento do serviço
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
                    Garantia real e documentação clara
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
                    Técnicos experientes em retífica de cabeçotes
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
                    Controle de qualidade em cada entrega
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
              em retífica automotiva
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
              revisão de válvulas e montagem técnica. Tudo com equipamentos
              modernos, controle rigoroso e garantia no resultado final.
            </p>
          </div>

          {/* Cards */}
          <div className="mt-25 mb-8 grid grid-cols-1 justify-items-center gap-y-14 md:grid-cols-2 md:gap-x-10 xl:grid-cols-3">
            {[
              {
                img: "/retificademotor.jpg",
                alt: "Bancada de retífica de motores em usinagem",
                title: "Retífica de Motores",
                desc: "Retífica completa com medidas exatas e controle de folgas para máximo desempenho.",
              },
              {
                img: "/montagemdemotores.jpg",
                alt: "Montagem técnica de motor em bancada",
                title: "Montagem de Motores",
                desc: "Montagem técnica com peças revisadas e testes de funcionamento antes da entrega.",
              },
              {
                img: "/diagnosticotecnico.png",
                alt: "Diagnóstico técnico de motor automotivo",
                title: "Diagnóstico Técnico",
                desc: "Avaliação detalhada do motor com laudo e orientação das melhores soluções.",
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
                  <div className="relative h-[209px] w-[276px] overflow-hidden rounded-[10px] shadow-md transition-transform duration-200 group-hover:scale-[1.02]">
                    <Image
                      src={card.img}
                      alt={card.alt}
                      width={276}
                      height={209}
                      sizes="(max-width: 768px) 90vw, 276px"
                      quality={75}
                      className="h-full w-full object-cover object-center"
                      loading="lazy"
                    />
                    {/* Overlay com gradiente azul */}
                    <div className="pointer-events-none absolute inset-0 rounded-[10px] bg-linear-to-b from-[#053282]/15 to-[#053282]/30" />
                  </div>
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
                    Ver detalhes
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
              Ver todos os serviços
            </Link>
          </div>
        </div>
      </section>

      {/* 5. B2B */}
      <section className="relative overflow-hidden bg-rp-navy py-32 md:py-44">
        <div className="pointer-events-none absolute -top-32 -bottom-32 left-1/2 z-20 hidden w-[140px] translate-x-[calc(-50%+140px)] -skew-x-20 md:-top-56 md:-bottom-56 md:block">
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
        <div className="pointer-events-none absolute -top-32 -bottom-32 left-1/2 z-30 hidden w-[24px] translate-x-[calc(-50%+300px)] -skew-x-20 origin-center bg-[#F4BC4A] md:-top-56 md:-bottom-56 md:block" />
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
                Se você é dono ou gestor de oficina mecânica, tenha{" "}
                <strong
                  style={{
                    fontFamily: "var(--font-open-sans)",
                    fontWeight: 700,
                    fontSize: "24px",
                    lineHeight: "135%",
                    letterSpacing: "0%",
                  }}
                >
                  preços exclusivos
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
                  atendimento prioritário
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
                  suporte técnico dedicado
                </strong>{" "}
                para ganhar margem, prazo e confiança com seus clientes.
              </p>

              {/* Lista de benefícios */}
              <ul className="space-y-4 pt-2">
                {[
                  "Preços especiais e descontos progressivos",
                  "Economia na compra de peças e componentes",
                  "Atendimento prioritário e prazos reduzidos",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span
                      className="inline-flex h-[34px] w-[34px] shrink-0 items-center justify-center text-[#F3B839]"
                      aria-hidden="true"
                    >
                      <span
                        className="material-symbols-outlined leading-none"
                        style={{ fontSize: "34px" }}
                      >
                        check_circle
                      </span>
                    </span>
                    <span
                      className="text-white"
                      style={{
                        fontFamily: "var(--font-open-sans)",
                        fontWeight: 700,
                        fontSize: "20.34px",
                        lineHeight: "1",
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
                  href="/contato#formulario"
                  className="inline-flex h-[68px] items-center justify-center rounded-[62px] px-10 text-base font-bold uppercase text-white transition hover:brightness-110"
                  style={{
                    background:
                      "linear-gradient(0deg, #1654A6 0%, #0E62F6 100%)",
                  }}
                >
                  Quero ser parceiro
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

      {/* 6. DEPOIMENTOS — carrossel infinito + cards premium */}
      <section className="relative overflow-hidden">
        {/* Imagem de fundo */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/homecomment.png"
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
            <h2 className="mb-2 font-heading text-3xl font-bold text-white md:text-4xl">
              Quem já confia na{" "}
              <span className="text-rp-accent">Retífica Premium</span>
            </h2>
            <p className="text-base text-gray-300 md:text-lg">
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
                className="testimonials-carousel-track flex w-max flex-nowrap gap-10"
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
                      className="flex h-[340px] w-[300px] shrink-0 flex-col rounded-2xl border-2 border-[#F8B628] bg-white px-6 py-8 shadow-[0_20px_60px_rgba(0,0,0,0.25)] md:h-[380px] md:w-[380px] md:px-10 md:py-10"
                    >
                      <div className="flex flex-1 flex-col items-center justify-center text-center">
                        <p
                          className="mx-auto max-w-[26ch] leading-tight text-slate-700 text-[17px] md:text-[22px]"
                          style={{
                            fontFamily: "var(--font-open-sans)",
                          }}
                        >
                          &quot;{item.quote}&quot;
                        </p>
                      </div>
                      <div className="mt-auto flex h-[96px] items-center justify-center">
                        {item.logoType === "text" && (
                          <>
                            <p
                              className="text-center text-[24px] font-bold leading-tight md:text-[28px]"
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
                              className="mt-1 text-center text-[16px] font-bold leading-tight md:text-[18px]"
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
                            <div className="flex h-[90px] w-[220px] items-center justify-center">
                              <Image
                                src="/sert-pecas.jpg"
                                alt={item.alt}
                                width={220}
                                height={90}
                                className="h-[90px] w-[220px] object-contain"
                              />
                            </div>
                          )}
                        {item.logoType === "image" &&
                          item.src === "/Diego.png" && (
                            <div className="flex h-[96px] w-[220px] items-center justify-center">
                              <Image
                                src="/Diego.png"
                                alt={item.alt}
                                width={220}
                                height={80}
                                className="h-[80px] w-auto object-contain -translate-y-2 drop-shadow-sm"
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
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center font-heading text-3xl font-bold text-gray-900 md:text-4xl">
            Dúvidas Frequentes sobre Retífica de Cabeçote
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "Quanto custa retífica de cabeçote?",
                a: "O valor varia conforme o modelo do veículo e o estado do cabeçote. Fazemos diagnóstico técnico e enviamos orçamento detalhado pelo WhatsApp em até 2 horas úteis.",
              },
              {
                q: "Quanto tempo demora a retífica?",
                a: "Retífica simples de cabeçote leva de 2 a 4 dias úteis. Montagem completa de motor pode levar de 5 a 10 dias. Informamos o prazo exato após diagnóstico técnico.",
              },
              {
                q: "Retífica de cabeçote tem garantia?",
                a: "Sim. Oferecemos garantia documentada conforme o tipo de serviço realizado. Tudo é registrado e entregue junto com o laudo técnico.",
              },
              {
                q: "Quando o motor precisa de retífica?",
                a: "Principais sinais: superaquecimento constante, perda de potência, consumo alto de óleo, fumaça branca ou azul, junta queimada, cabeçote trincado, motor batendo ou falhando.",
              },
              {
                q: "Atendem caminhão e motor diesel?",
                a: "Sim. Atendemos carro (passeio e utilitário), caminhão, ônibus, van, trator e motores diesel, gasolina e álcool.",
              },
              {
                q: "Vocês atendem oficinas?",
                a: "Sim. Temos programa B2B com descontos progressivos de 5% a 15%, atendimento prioritário e suporte técnico para oficinas parceiras em Ribeirão Preto e região.",
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
                className="group rounded-lg border border-gray-200 bg-gray-50 p-6 transition-all hover:border-rp-accent"
              >
                <summary className="cursor-pointer font-semibold text-gray-900 list-none flex items-start justify-between">
                  <span className="flex-1">{item.q}</span>
                  <span className="ml-4 text-rp-accent group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-gray-700 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/contato"
              className="inline-flex h-14 items-center justify-center rounded-full bg-rp-accent px-10 text-base font-bold text-white transition-all hover:brightness-110"
            >
              Chamar no WhatsApp agora
            </Link>
          </div>
        </div>
      </section>

      {/* 8. REGIÃO ATENDIDA — SEO LOCAL */}
      <section className="bg-rp-navy py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 font-heading text-3xl font-bold text-white md:text-4xl">
            Atendemos Ribeirão Preto, Sertãozinho e Toda a Região
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-gray-300">
            A Retífica Premium atende clientes e oficinas mecânicas em{" "}
            <strong>Ribeirão Preto</strong>, <strong>Sertãozinho</strong>,{" "}
            <strong>Cravinhos</strong>, <strong>Jaboticabal</strong>,{" "}
            <strong>Batatais</strong>, <strong>Brodowski</strong>,{" "}
            <strong>Guariba</strong>, <strong>Pontal</strong>,{" "}
            <strong>Serrana</strong> e <strong>Monte Alto</strong>.
          </p>
          <p className="mb-8 text-base text-gray-400">
            Se você está em outra cidade da região e precisa de retífica de
            cabeçote, usinagem ou diagnóstico técnico, entre em contato pelo
            WhatsApp para confirmar atendimento.
          </p>
          <Link
            href="https://wa.me/5516993021998?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Ret%C3%ADfica%20Premium%20e%20gostaria%20de%20solicitar%20um%20or%C3%A7amento%20para%20ret%C3%ADfica%20de%20cabe%C3%A7ote."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 items-center justify-center rounded-full bg-[#25D366] px-10 text-base font-bold text-white transition-all hover:brightness-110"
          >
            <svg
              className="mr-2 h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Chamar no WhatsApp
          </Link>
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
              "O valor varia conforme o modelo do veículo e o estado do cabeçote. Fazemos diagnóstico técnico e enviamos orçamento detalhado pelo WhatsApp em até 2 horas úteis.",
          },
          {
            question: "Quanto tempo demora a retífica?",
            answer:
              "Retífica simples de cabeçote leva de 2 a 4 dias úteis. Montagem completa de motor pode levar de 5 a 10 dias. Informamos o prazo exato após diagnóstico técnico.",
          },
          {
            question: "Retífica de cabeçote tem garantia?",
            answer:
              "Sim. Oferecemos garantia documentada conforme o tipo de serviço realizado. Tudo é registrado e entregue junto com o laudo técnico.",
          },
          {
            question: "Quando o motor precisa de retífica?",
            answer:
              "Principais sinais: superaquecimento constante, perda de potência, consumo alto de óleo, fumaça branca ou azul, junta queimada, cabeçote trincado, motor batendo ou falhando.",
          },
          {
            question: "Atendem caminhão e motor diesel?",
            answer:
              "Sim. Atendemos carro (passeio e utilitário), caminhão, ônibus, van, trator e motores diesel, gasolina e álcool.",
          },
          {
            question: "Vocês atendem oficinas?",
            answer:
              "Sim. Temos programa B2B com descontos progressivos de 5% a 15%, atendimento prioritário e suporte técnico para oficinas parceiras em Ribeirão Preto e região.",
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
