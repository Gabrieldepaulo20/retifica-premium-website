import Image from "next/image";
import type { Metadata } from "next";
import {
  BreadcrumbSchema,
  FAQSchema,
  RegionalServiceAreaSchema,
  ServiceSchema,
} from "@/components/site/StructuredData";
import {
  TrackedCtaLink,
  TrackedPhoneLink,
  TrackedServiceLink,
  TrackedWhatsAppLink,
} from "@/components/site/TrackedLinks";
import { VideoEmbed } from "@/components/site/VideoEmbed";
import { problemPath } from "@/lib/problem-pages";
import { primaryRegionalCities } from "@/lib/regional";
import { servicePath } from "@/lib/service-pages";
import { siteConfig, whatsappBudgetUrl } from "@/lib/site";
import { videos } from "@/lib/videos";

export const metadata: Metadata = {
  title:
    "Serviços de Retífica de Cabeçote e Motor | Retífica Premium",
  description:
    "Retífica de cabeçote, plaina, sedes, válvulas, guias e diagnóstico para motor fumando, baixando óleo ou superaquecendo em Sertãozinho-SP.",
  alternates: {
    canonical: "/servicos",
  },
  openGraph: {
    title:
      "Serviços de Retífica de Cabeçote e Diagnóstico de Motor | Retífica Premium",
    description:
      "Retífica de cabeçote, plaina, sedes, válvulas, guias e diagnóstico para motor fumando, baixando óleo ou superaquecendo.",
    url: "https://www.premiumretifica.com.br/servicos",
    siteName: "Retífica Premium",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/retificapremium.jpeg",
        width: 1200,
        height: 630,
        alt: "Serviços de Retífica de Cabeçote - Retífica Premium",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Serviços de Retífica de Cabeçote e Diagnóstico de Motor | Retífica Premium",
    description:
      "Retífica de cabeçote, plaina, sedes, válvulas, guias e diagnóstico para motor fumando, baixando óleo ou superaquecendo.",
    images: ["/retificapremium.jpeg"],
  },
};

const trustIconStroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const whyPremium = [
  {
    title: "Diagnóstico antes do orçamento",
    desc: "Avaliamos o sintoma e a causa real. Você não paga por troca de peça que o motor não precisa.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8" {...trustIconStroke}>
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" />
      </svg>
    ),
  },
  {
    title: "Garantia documentada",
    desc: "Cada serviço sai com laudo técnico e garantia por escrito conforme o que foi feito na peça.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8" {...trustIconStroke}>
        <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Usinagem de precisão",
    desc: "Medição de empeno, vedação, sedes e guias dentro da tolerância de fábrica, com equipamento adequado.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8" {...trustIconStroke}>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1" />
      </svg>
    ),
  },
  {
    title: "20+ anos de experiência",
    desc: "Equipe especializada desde 2004, com mais de 5.000 motores retificados para motoristas e oficinas.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8" {...trustIconStroke}>
        <path d="M7 4h10v3a5 5 0 01-10 0V4z" />
        <path d="M7 5H4v2a3 3 0 003 3M17 5h3v2a3 3 0 01-3 3M9 14h6M8 20h8M10 14v3a2 2 0 002 2 2 2 0 002-2v-3" />
      </svg>
    ),
  },
];

// Componente de Card de Serviço conforme design Figma
function ServiceCard({
  image,
  alt,
  width,
  height,
  titulo,
  descricao,
  href,
}: {
  image: string;
  alt: string;
  width: number;
  height: number;
  titulo: string;
  descricao: string | string[];
  href?: string;
}) {
  const descricoes = Array.isArray(descricao) ? descricao : [descricao];

  return (
    <div className="flex w-full max-w-[382px] min-h-[458px] flex-col items-center justify-between rounded-[15px] border-2 border-[#0E62F6] bg-[#D9E7FF] p-8 shadow-[0_10px_25px_rgba(0,0,0,0.18)] transition-transform duration-200 ease-out hover:scale-[1.03] hover:shadow-[0_15px_35px_rgba(0,0,0,0.25)] max-[640px]:h-auto max-[640px]:w-[280px] max-[640px]:max-w-none max-[640px]:min-h-[390px] max-[640px]:p-6 md:h-[458px]">
      <div className="flex justify-center">
        <div className="flex h-[120px] w-[120px] items-center justify-center rounded-full bg-white shadow-[0_6px_16px_rgba(5,50,130,0.12)] ring-1 ring-[#0E62F6]/15 max-[640px]:h-[100px] max-[640px]:w-[100px]">
          <Image
            src={image}
            alt={alt}
            width={width}
            height={height}
            className="h-auto max-h-[66px] w-auto max-w-[74px] object-contain max-[640px]:max-h-[56px] max-[640px]:max-w-[62px]"
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center">
        <h3
          className="mb-4 text-center text-xl font-bold text-gray-900 max-[640px]:text-[18px]"
          style={{ fontFamily: "var(--font-rajdhani)" }}
        >
          {titulo}
        </h3>
        <div className="text-center text-sm leading-relaxed text-gray-700 max-[640px]:text-[13px]">
          {descricoes.map((desc, index) => (
            <p
              key={index}
              className={index > 0 ? "mt-2" : ""}
              style={{ fontFamily: "var(--font-open-sans)" }}
            >
              {desc}
            </p>
          ))}
        </div>
        {href && (
          <TrackedServiceLink
            href={href}
            serviceName={titulo}
            className="mt-4 inline-flex h-10 items-center justify-center rounded-full border border-[#0E62F6] bg-white px-5 text-xs font-bold uppercase text-[#053282] transition-all hover:bg-[#0E62F6] hover:text-white"
            style={{ fontFamily: "var(--font-rajdhani)" }}
          >
            Ver detalhes
          </TrackedServiceLink>
        )}
      </div>
    </div>
  );
}

const symptomCards = [
  {
    slug: "motor-fumando",
    title: "Motor fumando",
    description:
      "Fumaça azul, branca ou excesso de fumaça pode indicar desgaste, vedação comprometida, junta queimada ou entrada de óleo na câmara.",
    href: problemPath("motor-fumando"),
  },
  {
    slug: "motor-baixando-oleo",
    title: "Motor baixando óleo",
    description:
      "Consumo frequente de óleo pede avaliação de folgas, guias, retentores, anéis, cabeçote e possíveis vazamentos.",
    href: problemPath("motor-baixando-oleo"),
  },
  {
    slug: "motor-superaquecendo",
    title: "Motor superaquecendo",
    description:
      "Superaquecimento recorrente pode empenar o cabeçote, queimar junta e comprometer a vedação entre bloco e cabeçote.",
    href: problemPath("motor-superaquecendo"),
  },
  {
    slug: "perda-de-potencia",
    title: "Perda de potência",
    description:
      "Falhas de compressão, válvulas sem vedação e desgaste em componentes podem deixar o motor fraco ou irregular.",
    href: servicePath("retifica-de-motor"),
  },
  {
    slug: "junta-do-cabecote-queimada",
    title: "Junta queimada",
    description:
      "Mistura de óleo e água, pressão no arrefecimento ou aquecimento anormal exigem diagnóstico antes de montar novamente.",
    href: problemPath("junta-do-cabecote-queimada"),
  },
  {
    slug: "cabecote-trincado",
    title: "Cabeçote trincado",
    description:
      "Trincas precisam de inspeção e reparo técnico para evitar vazamento, perda de compressão e retorno do problema.",
    href: servicePath("teste-de-trinca"),
  },
] as const;

const processSteps = [
  {
    title: "Diagnóstico inicial",
    description:
      "Entendemos o sintoma, o histórico do veículo e o tipo de uso para orientar a desmontagem e os testes certos.",
  },
  {
    title: "Medição e inspeção",
    description:
      "Conferimos empeno, vedação, trincas, folgas, guias, sedes, válvulas e roscas antes de definir o reparo.",
  },
  {
    title: "Usinagem e montagem",
    description:
      "Executamos plaina, sedes, válvulas, guias, roscas, soldas e montagem final conforme a necessidade real da peça.",
  },
  {
    title: "Entrega orientada",
    description:
      "Explicamos o serviço realizado, cuidados de montagem e pontos de atenção para reduzir retrabalho.",
  },
] as const;

const serviceFaqItems = [
  {
    question: "Motor fumando sempre precisa de retífica?",
    answer:
      "Nem sempre. A fumaça pode vir de desgaste interno, vedação ruim, junta queimada, guias, retentores ou outros componentes. O correto é diagnosticar antes de definir retífica.",
  },
  {
    question: "Motor baixando óleo pode ser problema no cabeçote?",
    answer:
      "Pode ser, especialmente quando há desgaste em guias, retentores ou vedação. Também pode envolver anéis, vazamentos e outros pontos do motor.",
  },
  {
    question: "Superaquecimento pode empenar o cabeçote?",
    answer:
      "Sim. Superaquecimento recorrente pode empenar o cabeçote, afetar junta e vedação. Por isso a peça precisa ser medida e avaliada antes da montagem.",
  },
  {
    question: "Vocês atendem oficinas mecânicas?",
    answer:
      "Sim. A Retífica Premium tem atendimento para oficinas com suporte técnico, prazos combinados e programa de parceria B2B.",
  },
] as const;

export default function ServicosPage() {
  const servicos = [
    {
      id: 1,
      titulo: "Limpeza Química de Cabeçotes",
      alt: "Ícone de limpeza química de cabeçote",
      descricao: [
        "Remoção completa de sujeira, graxa, ferrugem e resíduos de combustão.",
        "Restaura a eficiência térmica e prepara o cabeçote para a usinagem.",
      ],
      image: "/cabecoteservicos.png",
      width: 106,
      height: 106,
      href: servicePath("banho-quimico"),
    },
    {
      id: 2,
      titulo: "Retífica de Sedes e Válvulas",
      alt: "Ícone de retífica de sedes e válvulas",
      descricao: [
        "Restauração precisa de sedes e válvulas, garantindo vedação perfeita e compressão ideal.",
        "Reduz perda de potência e melhora o desempenho do motor.",
      ],
      image: "/valvulas.png",
      width: 110,
      height: 110,
      href: servicePath("retifica-de-cabecote"),
    },
    {
      id: 3,
      titulo: "Troca e Adaptação de Guias",
      alt: "Ícone de troca e adaptação de guias",
      descricao: [
        "Substituição e ajuste técnico das guias conforme as medidas originais.",
        "Garante movimento suave das válvulas e redução de atrito.",
      ],
      image: "/adaptacaodeguias.png",
      width: 127,
      height: 95,
      href: servicePath("retifica-de-cabecote"),
    },
    {
      id: 4,
      titulo: "Esmerilhamento de Válvulas",
      alt: "Ícone de esmerilhamento de válvulas",
      descricao: [
        "Polimento e acabamento para vedação perfeita entre válvula e sede.",
        "Mais eficiência e menor consumo de combustível.",
      ],
      image: "/esmirilhamentodevalvulas.png",
      width: 103,
      height: 76,
      href: servicePath("retifica-de-cabecote"),
    },
    {
      id: 5,
      titulo: "Usinagem de Roscas",
      alt: "Ícone de usinagem de roscas",
      descricao: [
        "Correção e recuperação de roscas danificadas com tolerância de fábrica.",
        "Evita vazamentos e garante fixação segura dos componentes.",
      ],
      image: "/usinagemderoscas.png",
      width: 90,
      height: 90,
      href: servicePath("retifica-de-cabecote"),
    },
    {
      id: 6,
      titulo: "Plaina de Cabeçotes",
      alt: "Ícone de plaina de cabeçotes",
      descricao: [
        "Nivelamento exato da superfície para contato perfeito com o bloco do motor.",
        "Evita vazamentos e mantém a compressão ideal.",
      ],
      image: "/plainadecabecotes.png",
      width: 118,
      height: 109,
      href: servicePath("plaina-de-cabecote"),
    },
    {
      id: 7,
      titulo: "Solda de Trincas e Reparos Estruturais",
      alt: "Ícone de solda de trincas e reparos estruturais",
      descricao: [
        "Correção de fissuras e danos sem comprometer o cabeçote.",
        "Recuperação completa com acabamento reforçado e seguro.",
      ],
      image: "/soldadetrincas.png",
      width: 113,
      height: 113,
      href: servicePath("teste-de-trinca"),
    },
    {
      id: 8,
      titulo: "Mandrilhamento de Sedes e Guias",
      alt: "Ícone de mandrilhamento de sedes e guias",
      descricao: [
        "Usinagem interna de precisão para restauração das medidas e centralização perfeita.",
        "Aumenta a durabilidade e melhora o alinhamento do conjunto.",
      ],
      image: "/sedeseguias.png",
      width: 139,
      height: 129,
      href: servicePath("retifica-de-cabecote"),
    },
    {
      id: 9,
      titulo: "Montagem e Regulagem Final",
      alt: "Ícone de montagem e regulagem final",
      descricao: [
        "Montagem técnica e ajustes calibrados conforme as especificações do fabricante.",
        "Motor testado, ajustado e pronto para rodar com desempenho máximo.",
      ],
      image: "/montagemeregulagemfinal.png",
      width: 148,
      height: 148,
      href: servicePath("montagem-de-cabecote"),
    },
  ];

  return (
    <main className="min-h-screen">
      {/* SEÇÃO 1 — HERO */}
      <section className="relative overflow-hidden bg-rp-navy">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/cabecote.webp"
            alt=""
            fill
            sizes="100vw"
            className="hidden object-cover object-center opacity-25 md:block"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[rgba(2,14,29,0.82)]" />
          <div className="absolute inset-0 bg-linear-to-b from-rp-navy via-rp-navy/70 to-rp-navy" />
        </div>

        {/* Conteúdo */}
        <div className="relative z-10 mx-auto flex min-h-[520px] max-w-4xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 md:py-28 lg:px-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-rp-gold md:text-sm">
            Retífica especializada • Sertãozinho-SP e região
          </p>
          <h1
            className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-rajdhani)", lineHeight: 1.15 }}
          >
            Serviços de{" "}
            <span className="text-rp-accent">Retífica de Cabeçote e Motor</span>
          </h1>

          <p
            className="mx-auto mt-5 max-w-2xl text-base text-gray-300 md:text-lg"
            style={{ fontFamily: "var(--font-open-sans)", lineHeight: 1.6 }}
          >
            Equipamentos de precisão, equipe especializada e diagnóstico antes do
            orçamento — para recuperar vedação, compressão e confiança do seu
            motor, sem troca desnecessária de peças.
          </p>

          {/* Chips de confiança */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
            {[
              "Garantia documentada",
              "+5.000 motores retificados",
              "Desde 2004",
              "Carro, caminhão, ônibus e trator",
            ].map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white/85 md:text-sm"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 text-rp-gold"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12.5l4 4 10-10" />
                </svg>
                {chip}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <TrackedWhatsAppLink
              href={whatsappBudgetUrl}
              eventLabel="services_hero_whatsapp"
              clarityEventName="whatsapp_service_cta_click"
              className="inline-flex h-14 items-center justify-center rounded-full px-10 text-base font-bold text-white shadow-lg transition-all hover:opacity-90"
              style={{
                background: "linear-gradient(0deg, #F3B839 0%, #F4891F 100%)",
                fontFamily: "var(--font-rajdhani)",
              }}
            >
              Solicitar orçamento
            </TrackedWhatsAppLink>
            <TrackedPhoneLink
              href={siteConfig.phone.href}
              eventLabel="services_hero_phone"
              className="inline-flex h-14 items-center justify-center rounded-full border border-white/40 bg-white/5 px-8 text-base font-bold text-white transition-all hover:bg-white/10"
              style={{ fontFamily: "var(--font-rajdhani)" }}
            >
              Ligar {siteConfig.phone.display}
            </TrackedPhoneLink>
          </div>
        </div>
      </section>

      {/* SEÇÃO 2 — SINTOMAS */}
      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-rp-accent">
              Diagnóstico técnico
            </p>
            <h2
              className="text-3xl font-bold text-gray-900 md:text-5xl"
              style={{ fontFamily: "var(--font-rajdhani)", lineHeight: 1.15 }}
            >
              Sinais de que o motor precisa de avaliação
            </h2>
            <p
              className="mt-4 text-base leading-relaxed text-gray-700 md:text-lg"
              style={{ fontFamily: "var(--font-open-sans)" }}
            >
              Antes de indicar retífica, avaliamos o sintoma e a causa provável.
              Isso evita troca desnecessária de peças e ajuda a escolher o
              serviço correto para o cabeçote ou motor.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {symptomCards.map((symptom) => (
              <article
                key={symptom.title}
                className="rounded-lg border border-[#D9E7FF] bg-[#F8FBFF] p-5 shadow-sm"
              >
                <h3
                  className="text-xl font-bold text-[#053282]"
                  style={{ fontFamily: "var(--font-rajdhani)" }}
                >
                  {symptom.title}
                </h3>
                <p
                  className="mt-2 text-sm leading-relaxed text-gray-700"
                  style={{ fontFamily: "var(--font-open-sans)" }}
                >
                  {symptom.description}
                </p>
                <TrackedCtaLink
                  href={symptom.href}
                  eventLabel={`services_${symptom.slug}_guide`}
                  className="mt-4 inline-flex text-sm font-bold text-[#053282] underline decoration-[#F3B839] decoration-2 underline-offset-4 transition hover:text-rp-accent"
                >
                  Entender este sintoma →
                </TrackedCtaLink>
              </article>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <TrackedWhatsAppLink
              href={whatsappBudgetUrl}
              eventLabel="services_symptoms_whatsapp"
              clarityEventName="whatsapp_service_cta_click"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#25D366] px-8 text-sm font-bold text-[#052E16] transition-all hover:brightness-110 md:h-14 md:text-base"
            >
              Enviar sintoma pelo WhatsApp
            </TrackedWhatsAppLink>
            <TrackedCtaLink
              href="/contato"
              eventLabel="services_symptoms_contact"
              className="inline-flex h-12 items-center justify-center rounded-full border border-[#053282] px-8 text-sm font-bold text-[#053282] transition-all hover:bg-[#D9E7FF] md:h-14 md:text-base"
            >
              Ver endereço e horários
            </TrackedCtaLink>
          </div>
        </div>
      </section>

      {/* SEÇÃO 2 — NOSSOS PRINCIPAIS SERVIÇOS */}
      <section className="relative bg-[#0B2F6B] py-12 md:py-14 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Título */}
          <div className="mb-6 text-center">
            <h2
              className="mb-3 text-4xl font-bold text-white md:text-5xl"
              style={{ fontFamily: "var(--font-rajdhani)", lineHeight: 1.2 }}
            >
              Nossos Principais Serviços
            </h2>
            <div
              className="mx-auto max-w-3xl text-base text-white/90 md:text-lg"
              style={{ fontFamily: "var(--font-open-sans)" }}
            >
              <p className="mb-2 font-bold">
                A excelência está nos detalhes.
              </p>
              <p>
                Cada cabeçote passa por processos que seguem padrões de fábrica,
                garantindo vedação, desempenho e durabilidade.
              </p>
            </div>
          </div>

          {/* Grid de cards */}
          <div className="grid grid-cols-1 place-items-center gap-6 max-[640px]:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {servicos.map((servico) => (
              <ServiceCard
                key={servico.id}
                image={servico.image}
                alt={servico.alt}
                width={servico.width}
                height={servico.height}
                titulo={servico.titulo}
                descricao={servico.descricao}
                href={servico.href}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO — POR QUE A RETÍFICA PREMIUM */}
      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-rp-accent">
              Por que confiar o seu motor à Retífica Premium
            </p>
            <h2
              className="text-3xl font-bold text-gray-900 md:text-5xl"
              style={{ fontFamily: "var(--font-rajdhani)", lineHeight: 1.15 }}
            >
              Serviço técnico que você acompanha — sem surpresa no orçamento
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyPremium.map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-center rounded-2xl border border-[#0E62F6]/12 bg-[#F8FBFF] p-7 text-center shadow-[0_10px_30px_rgba(5,50,130,0.06)] transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0E62F6]/10 text-[#0E62F6] ring-1 ring-[#0E62F6]/20">
                  {item.icon}
                </div>
                <h3
                  className="text-lg font-bold text-[#053282]"
                  style={{ fontFamily: "var(--font-rajdhani)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="mt-2 text-sm leading-relaxed text-gray-600"
                  style={{ fontFamily: "var(--font-open-sans)" }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 3 — COMO TRABALHAMOS */}
      <section className="bg-[#FFFBF2] py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-rp-accent">
                Processo da retífica
              </p>
              <h2
                className="text-3xl font-bold text-gray-900 md:text-5xl"
                style={{ fontFamily: "var(--font-rajdhani)", lineHeight: 1.15 }}
              >
                Do diagnóstico à entrega com orientação técnica
              </h2>
              <p
                className="mt-4 text-base leading-relaxed text-gray-700 md:text-lg"
                style={{ fontFamily: "var(--font-open-sans)" }}
              >
                O objetivo é recuperar o conjunto com precisão e evitar retorno
                do mesmo problema. Por isso cada serviço começa com inspeção e
                medição antes da usinagem.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {processSteps.map((step, index) => (
                <article
                  key={step.title}
                  className="rounded-lg border border-[#F3B839]/40 bg-white p-5 shadow-sm"
                >
                  <p
                    className="text-sm font-bold text-[#F4891F]"
                    style={{ fontFamily: "var(--font-rajdhani)" }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3
                    className="mt-1 text-xl font-bold text-[#053282]"
                    style={{ fontFamily: "var(--font-rajdhani)" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="mt-2 text-sm leading-relaxed text-gray-700"
                    style={{ fontFamily: "var(--font-open-sans)" }}
                  >
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VÍDEO — processo (aparece quando houver youtubeId em lib/videos.ts) */}
      {videos.servicesProcess.youtubeId && (
        <section className="bg-[#0B2F6B] py-16 md:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-8 max-w-2xl text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-rp-gold">
                Veja o processo
              </p>
              <h2
                className="text-3xl font-bold text-white md:text-4xl"
                style={{ fontFamily: "var(--font-rajdhani)", lineHeight: 1.15 }}
              >
                Do diagnóstico à entrega, na prática
              </h2>
            </div>
            <VideoEmbed slot={videos.servicesProcess} eventLabel="services_video" />
          </div>
        </section>
      )}

      {/* SEÇÃO — ATENDIMENTO REGIONAL (faixa enxuta) */}
      <section
        id="regiao"
        className="scroll-mt-24 bg-[#0B2F6B] py-14 text-white md:py-16"
      >
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-rp-gold">
            Atendimento regional
          </p>
          <h2
            className="text-3xl font-bold md:text-4xl"
            style={{ fontFamily: "var(--font-rajdhani)", lineHeight: 1.15 }}
          >
            Retífica para Ribeirão Preto, Sertãozinho e cidades próximas
          </h2>
          <p
            className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg"
            style={{ fontFamily: "var(--font-open-sans)" }}
          >
            Ficamos em Sertãozinho e atendemos motoristas, oficinas e frotas num
            raio de até cerca de 60 km. Leve a peça ou mande o sintoma pelo
            WhatsApp — orientamos antes de você se deslocar.
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
            <span className="rounded-full border border-rp-gold/30 bg-rp-gold/10 px-4 py-2 text-sm font-semibold text-rp-gold">
              + cidades em até 60 km
            </span>
          </div>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <TrackedWhatsAppLink
              href={whatsappBudgetUrl}
              eventLabel="services_region_whatsapp"
              clarityEventName="whatsapp_service_cta_click"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#25D366] px-8 text-sm font-bold text-[#052E16] transition-all hover:brightness-110 md:h-14 md:text-base"
            >
              Pedir orçamento no WhatsApp
            </TrackedWhatsAppLink>
            <TrackedPhoneLink
              eventLabel="services_region_phone"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/40 px-8 text-sm font-bold text-white transition-all hover:bg-white/10 md:h-14 md:text-base"
            >
              Ligar {siteConfig.phone.display}
            </TrackedPhoneLink>
          </div>
        </div>
      </section>

      {/* SEÇÃO 3 — CTA FINAL */}
      <section className="relative overflow-hidden">
        {/* Background com imagem blur */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/fundoquemsomos.webp"
            alt=""
            fill
            className="object-cover"
            style={{ filter: "blur(6px)" }}
            sizes="100vw"
            aria-hidden="true"
          />
          {/* Overlay escuro */}
          <div className="absolute inset-0 bg-black/65" />
          {/* Vignette */}
          <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/50" />
        </div>

        {/* Conteúdo */}
        <div className="relative z-10 mx-auto flex min-h-[480px] max-w-7xl items-center justify-center px-4 py-24 text-center sm:px-6 md:py-32 lg:px-8">
          <div className="space-y-8">
            {/* Imagem da ferramenta */}
            <div className="mb-6 flex justify-center">
              <Image
                src="/ferramenta.png"
                alt="Ferramenta de usinagem"
                width={479}
                height={98}
                className="object-contain"
              />
            </div>

            {/* Título */}
            <h2
              className="text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl"
              style={{ fontFamily: "var(--font-rajdhani)", lineHeight: 1.2 }}
            >
              Seu motor pronto para{" "}
              <br />
              rodar com <span className="text-rp-accent">força total.</span>
            </h2>

            {/* Descrição */}
            <p
              className="mx-auto max-w-2xl text-base text-white/90 md:text-lg"
              style={{
                fontFamily: "var(--font-open-sans)",
                lineHeight: 1.6,
              }}
            >
              Fale com um especialista e entenda o melhor caminho para devolver
              potência, eficiência e confiança ao seu motor.
            </p>

            {/* Botão CTA */}
            <div className="pt-4">
              <TrackedWhatsAppLink
                href={whatsappBudgetUrl}
                eventLabel="services_final_whatsapp"
                clarityEventName="whatsapp_service_cta_click"
                className="inline-flex h-14 items-center justify-center rounded-full px-10 text-base font-bold text-white shadow-lg transition-all hover:opacity-90"
                style={{
                  background: "linear-gradient(0deg, #F3B839 0%, #F4891F 100%)",
                  fontFamily: "var(--font-rajdhani)",
                }}
              >
                Falar com especialista no WhatsApp
              </TrackedWhatsAppLink>
            </div>
          </div>
        </div>
      </section>
      <ServiceSchema />
      <RegionalServiceAreaSchema />
      <FAQSchema items={[...serviceFaqItems]} />
      <BreadcrumbSchema
        items={[
          { name: "Início", url: "/" },
          { name: "Serviços", url: "/servicos" },
        ]}
      />
    </main>
  );
}
