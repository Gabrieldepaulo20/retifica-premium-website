import Image from "next/image";
import type { Metadata } from "next";
import {
  BreadcrumbSchema,
  FAQSchema,
  ServiceSchema,
} from "@/components/site/StructuredData";
import {
  TrackedCtaLink,
  TrackedPhoneLink,
  TrackedServiceLink,
  TrackedWhatsAppLink,
} from "@/components/site/TrackedLinks";
import { servicePath } from "@/lib/service-pages";
import { siteConfig, whatsappBudgetUrl } from "@/lib/site";

export const metadata: Metadata = {
  title:
    "Serviços de Retífica de Cabeçote, Motor Fumando e Baixando Óleo | Retífica Premium",
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
        <Image
          src={image}
          alt={alt}
          width={width}
          height={height}
          className="object-contain"
        />
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
    title: "Motor fumando",
    description:
      "Fumaça azul, branca ou excesso de fumaça pode indicar desgaste, vedação comprometida, junta queimada ou entrada de óleo na câmara.",
  },
  {
    title: "Motor baixando óleo",
    description:
      "Consumo frequente de óleo pede avaliação de folgas, guias, retentores, anéis, cabeçote e possíveis vazamentos.",
  },
  {
    title: "Motor superaquecendo",
    description:
      "Superaquecimento recorrente pode empenar o cabeçote, queimar junta e comprometer a vedação entre bloco e cabeçote.",
  },
  {
    title: "Perda de potência",
    description:
      "Falhas de compressão, válvulas sem vedação e desgaste em componentes podem deixar o motor fraco ou irregular.",
  },
  {
    title: "Junta queimada",
    description:
      "Mistura de óleo e água, pressão no arrefecimento ou aquecimento anormal exigem diagnóstico antes de montar novamente.",
  },
  {
    title: "Cabeçote trincado",
    description:
      "Trincas precisam de inspeção e reparo técnico para evitar vazamento, perda de compressão e retorno do problema.",
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
      <section className="relative min-h-[720px] overflow-hidden">
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
          {/* Overlay leve */}
          <div className="absolute inset-0 bg-white/20" />
          <div className="absolute inset-0 bg-linear-to-b from-white/30 via-transparent to-white/30" />
        </div>

        {/* Conteúdo */}
        <div className="relative z-10 mx-auto flex min-h-[720px] max-w-7xl items-center justify-center px-4 text-center sm:px-6 lg:px-8">
          <div className="space-y-8">
            <h1
              className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-rajdhani)", lineHeight: 1.2 }}
            >
              Serviços de{" "}
              <br />
              <span className="text-rp-accent">
                Retífica de Cabeçote e Motor
              </span>
            </h1>

            <p
              className="mx-auto max-w-3xl text-lg text-gray-700 md:text-xl"
              style={{
                fontFamily: "var(--font-open-sans)",
                fontWeight: 400,
                lineHeight: 1.5,
              }}
            >
              Equipamentos de precisão, equipe especializada e controle técnico
              para recuperar vedação, compressão e confiabilidade. Avaliamos
              motor fumando, baixando óleo, superaquecendo ou com perda de
              potência.
            </p>

            <div className="flex flex-col items-center justify-center gap-3 pt-4 sm:flex-row">
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
                className="inline-flex h-14 items-center justify-center rounded-full border border-[#0E62F6] bg-white px-8 text-base font-bold text-[#053282] shadow-sm transition-all hover:bg-[#D9E7FF]"
                style={{ fontFamily: "var(--font-rajdhani)" }}
              >
                Ligar {siteConfig.phone.display}
              </TrackedPhoneLink>
            </div>
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
              </article>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <TrackedWhatsAppLink
              href={whatsappBudgetUrl}
              eventLabel="services_symptoms_whatsapp"
              clarityEventName="whatsapp_service_cta_click"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#25D366] px-8 text-sm font-bold text-white transition-all hover:brightness-110 md:h-14 md:text-base"
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

      {/* SEÇÃO 4 — ATENDIMENTO REGIONAL */}
      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-[1fr_auto] md:items-center lg:px-8">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-rp-accent">
              Região atendida
            </p>
            <h2
              className="text-3xl font-bold text-gray-900 md:text-5xl"
              style={{ fontFamily: "var(--font-rajdhani)", lineHeight: 1.15 }}
            >
              Serviços de retífica para Ribeirão Preto e cidades próximas
            </h2>
            <p
              className="mt-4 max-w-3xl text-base leading-relaxed text-gray-700 md:text-lg"
              style={{ fontFamily: "var(--font-open-sans)" }}
            >
              Atendemos motoristas, oficinas e frotas em Sertãozinho, Ribeirão
              Preto, Pontal, Dumont, Cravinhos e outras cidades em um raio
              aproximado de 60 km. A página regional mostra a cobertura sem
              criar conteúdo repetido para cada cidade.
            </p>
          </div>
          <TrackedCtaLink
            href="/regiao-atendida"
            eventLabel="services_region_page"
            className="inline-flex h-12 items-center justify-center rounded-full border border-[#053282] px-8 text-sm font-bold text-[#053282] transition-all hover:bg-[#D9E7FF] md:h-14 md:text-base"
          >
            Ver cidades atendidas
          </TrackedCtaLink>
        </div>
      </section>

      {/* SEÇÃO 3 — CTA FINAL */}
      <section className="relative min-h-[922px] overflow-hidden">
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
        <div className="relative z-10 mx-auto flex min-h-[922px] max-w-7xl items-center justify-center px-4 text-center sm:px-6 lg:px-8">
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
