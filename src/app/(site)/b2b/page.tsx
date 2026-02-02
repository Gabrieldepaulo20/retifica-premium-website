import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Parceria B2B para Oficinas | Retífica Premium",
  description:
    "Programa B2B para oficinas mecânicas com descontos progressivos, atendimento prioritário e suporte técnico em Sertãozinho-SP.",
  keywords: [
    "parceria b2b oficinas",
    "descontos para oficinas mecânicas",
    "programa de fidelidade oficinas",
    "parceria retífica",
    "benefícios oficinas parceiras",
    "atendimento prioritário oficinas",
    "suporte técnico oficinas",
    "rede de oficinas parceiras",
    "Sertãozinho",
    "retífica parceria",
  ],
  alternates: {
    canonical: "/b2b",
  },
  openGraph: {
    title: "Parceria B2B para Oficinas | Retífica Premium",
    description:
      "Descontos progressivos, atendimento prioritário e suporte técnico para oficinas parceiras.",
    url: "https://retificapremium.com.br/b2b",
    siteName: "Retífica Premium",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Parceria B2B para Oficinas - Retífica Premium",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Parceria B2B para Oficinas | Retífica Premium",
    description:
      "Descontos progressivos, atendimento prioritário e suporte técnico para oficinas parceiras.",
    images: ["/og-image.jpg"],
  },
};

const headingStyle = { fontFamily: "var(--font-rajdhani)" };
const bodyStyle = { fontFamily: "var(--font-open-sans)" };

const fidelityItems = [
  {
    image: "/beneficios-exclusivos-parceria-b2b-oficinas.png",
    icon: "workspace_premium",
    title: "Benefícios Exclusivos",
    description:
      "Acesso a vantagens especiais, condições diferenciadas e serviços premium exclusivos para oficinas parceiras.",
  },
  {
    image: "/sistemadepontos.png",
    icon: "loyalty",
    title: "Sistema de Pontos",
    description:
      "Acumule pontos a cada serviço realizado e troque por recompensas, descontos adicionais e benefícios exclusivos.",
  },
  {
    image: "/crescimento.png",
    icon: "trending_up",
    title: "Crescimento Conjunto",
    description:
      "Parcerias estratégicas que geram crescimento mútuo, ampliando resultados e oportunidades de negócio.",
  },
];

const programAdvantages = [
  {
    icon: "paid",
    imageSrc: "/precoespecial.png",
    title: "Preços Especiais",
    description:
      "Descontos exclusivos em todos os serviços de retífica e manutenção para oficinas parceiras.",
  },
  {
    icon: "support_agent",
    imageSrc: "/atendimentoprioritario.png",
    title: "Atendimento Prioritário",
    description:
      "Fila preferencial e prazos reduzidos para garantir agilidade no seu negócio.",
  },
  {
    icon: "inventory_2",
    imageSrc: "/descontoempecas.png",
    title: "Descontos em Peças",
    description:
      "Economia garantida na compra de peças originais e componentes de qualidade.",
  },
  {
    icon: "school",
    imageSrc: "/automacoes.png",
    title: "Treinamentos Exclusivos",
    description: "Benefícios pensados para impulsionar sua oficina mecânica.",
  },
];

const partnershipLevels = [
  {
    name: "Parceiro Bronze",
    levelName: "Bronze",
    levelColor: "#C7643A",
    percent: "5%",
    percentColor: "#C7643A",
    serviceRange: "1-5 serviços/mês",
    benefits: [
      "Descontos progressivos em serviços e peças",
      "Suporte técnico especializado",
      "Desenvolvimento personalizado incluso na parceria",
    ],
  },
  {
    name: "Parceiro Prata",
    levelName: "Prata",
    levelColor: "#A7A7A7",
    percent: "10%",
    percentColor: "#A7A7A7",
    serviceRange: "6-10 serviços/mês",
    benefits: [
      "Descontos progressivos em serviços e peças",
      "Suporte técnico especializado",
      "Desenvolvimento personalizado incluso na parceria",
    ],
  },
  {
    name: "Parceiro Ouro",
    levelName: "Ouro",
    levelColor: "#F8B628",
    percent: "15%",
    percentColor: "#F8B628",
    serviceRange: "acima de 10 serviços/mês",
    benefits: [
      "Descontos progressivos em serviços e peças",
      "Suporte técnico especializado",
      "Condições especiais e negociação personalizada",
      "Desenvolvimento personalizado incluso na parceria",
    ],
  },
];

const steps = [
  {
    number: "1º",
    title: "Cadastro",
    description:
      "Envie seus dados e o perfil da oficina para iniciarmos a parceria.",
  },
  {
    number: "2º",
    title: "Análise",
    description:
      "Nossa equipe avalia seu cadastro e retorna em até 48 horas úteis.",
  },
  {
    number: "3º",
    title: "Ativação",
    description: "Receba orientações e acesso aos benefícios do programa.",
  },
  {
    number: "4º",
    title: "Benefícios",
    description:
      "Comece a usar descontos, prioridade de atendimento e suporte técnico.",
  },
];

export default function B2BPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Seção 1 — HERO */}
      <section className="flex min-h-[720px] items-center justify-center bg-[#053282] pt-20 pb-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-10 flex justify-center">
            <Image
              src="/mao.png"
              alt="Parceria B2B - Retífica Premium para oficinas mecânicas"
              width={253}
              height={223}
              className="h-auto w-[180px] md:w-[220px]"
            />
          </div>
          <h1
            className="mb-6 text-4xl font-bold uppercase text-white md:text-5xl lg:text-6xl"
            style={headingStyle}
          >
            Programa de Parceria B2B
          </h1>
          <p
            className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl"
            style={bodyStyle}
          >
            Potencialize sua oficina mecânica com preços exclusivos, atendimento
            prioritário e suporte técnico especializado. Parceria para serviços
            de retífica de cabeçotes e usinagem com padrão premium.
          </p>
          <Link
            href="/contato#contato-form"
            className="mx-auto flex h-[58px] w-full max-w-[260px] items-center justify-center rounded-full text-sm font-bold uppercase text-white shadow-lg transition-all hover:brightness-110"
            style={{
              background: "linear-gradient(0deg, #F3B839 0%, #F4891F 100%)",
              fontFamily: "var(--font-open-sans)",
            }}
          >
            Quero ser parceiro
          </Link>
        </div>
      </section>

      {/* Seção 2 — Vantagens do Programa */}
      <section className="bg-[#F5F5FA] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2
              className="mb-4 text-3xl font-bold text-rp-accent max-[640px]:text-[24px] max-[640px]:leading-tight md:text-4xl lg:text-5xl"
              style={headingStyle}
            >
              Vantagens do Programa de Parceria
            </h2>
            <p
              className="text-base leading-relaxed text-gray-600 max-[640px]:text-[14px] md:text-lg"
              style={bodyStyle}
            >
              Benefícios pensados para aumentar sua margem, dar previsibilidade
              de prazos e fortalecer a confiança dos seus clientes.
            </p>
          </div>

          <div className="mt-8 flex justify-center max-[640px]:hidden">
            <Image
              src="/carrob2b.png"
              alt="Carro em oficina parceira - Programa B2B Retífica Premium"
              width={1080}
              height={860}
              className="h-auto w-[90%] max-w-[1200px]"
            />
          </div>

          <div className="mt-10 hidden max-[640px]:block">
            <div className="space-y-10">
              {programAdvantages.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col items-center text-center"
                >
                  <div className="mb-4 flex h-[120px] w-[120px] items-center justify-center rounded-full bg-[#F3B839]">
                    <Image
                      src={item.imageSrc}
                      alt={item.title}
                      width={98}
                      height={98}
                      className="h-[72px] w-[72px] object-contain"
                    />
                  </div>
                  <h3
                    className="mb-2 text-lg font-bold text-[#0B2D5C]"
                    style={headingStyle}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="max-w-[260px] text-[14px] leading-relaxed text-gray-600"
                    style={bodyStyle}
                  >
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Seção 3 — Programa de Fidelidade */}
      <section className="bg-white py-20 max-[640px]:bg-[#101010] max-[640px]:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0B1E3D] max-[640px]:h-16 max-[640px]:w-16 max-[640px]:bg-[#F3B839]">
              <svg
                className="h-6 w-6 text-[#D4A13A] max-[640px]:h-8 max-[640px]:w-8 max-[640px]:text-[#0B1E3D]"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2l2.5 5.2 5.7.8-4.1 4 1 5.7L12 15.8 6.9 17.7l1-5.7-4.1-4 5.7-.8L12 2z" />
              </svg>
            </div>
            <h2
              className="mb-4 text-3xl font-bold text-rp-accent max-[640px]:text-[24px] max-[640px]:leading-tight max-[640px]:text-white md:text-4xl lg:text-5xl"
              style={headingStyle}
            >
              Programa de Fidelidade para Oficinas
            </h2>
            <p
              className="text-base leading-relaxed text-gray-600 max-[640px]:text-[14px] max-[640px]:text-white/80 md:text-lg"
              style={bodyStyle}
            >
              Sistema de pontos, suporte técnico dedicado e benefícios claros
              para fidelizar e recompensar oficinas parceiras.
            </p>
          </div>

          <div className="mx-auto mt-12 rounded-2xl bg-[#161616] px-8 py-12 shadow-lg max-[640px]:mt-10 max-[640px]:rounded-none max-[640px]:bg-transparent max-[640px]:px-0 max-[640px]:py-0 max-[640px]:shadow-none">
            <div className="grid gap-10 max-[640px]:gap-12 md:grid-cols-3">
              {fidelityItems.map((item) => (
                <div key={item.title} className="text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="hidden max-[640px]:flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#F3B839]/15">
                      <span className="material-symbols-outlined text-[48px] leading-none text-[#F3B839]">
                        {item.icon}
                      </span>
                    </div>
                    <Image
                      src={item.image}
                      alt={`${item.title} - Programa de Fidelidade Retífica Premium`}
                      width={90}
                      height={90}
                      className="h-[90px] w-[90px] object-contain max-[640px]:hidden"
                    />
                  </div>
                  <h3
                    className="mb-3 text-lg font-semibold text-[#D4A13A] max-[640px]:text-[18px] max-[640px]:text-white md:text-xl"
                    style={headingStyle}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed text-gray-300 max-[640px]:text-[14px] max-[640px]:text-white/75 md:text-base"
                    style={bodyStyle}
                  >
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Seção 4 — Níveis de Parceria */}
      <section className="bg-[#000617] py-24 pb-20 max-[640px]:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2
              className="mb-4 text-4xl font-bold text-white max-[640px]:text-[26px] max-[640px]:leading-tight md:text-5xl lg:text-6xl"
              style={headingStyle}
            >
              Níveis de Parceria e Descontos Progressivos
            </h2>
            <p
              className="text-base leading-relaxed text-white/70 max-[640px]:text-[14px] md:text-lg lg:text-xl"
              style={bodyStyle}
            >
              Quanto mais serviços você realiza, maiores são os descontos e
              benefícios exclusivos para sua oficina mecânica.
            </p>
          </div>

          <div className="mt-14 space-y-10 max-[640px]:space-y-7">
            {partnershipLevels.map((level) => {
              const mobileHeightClass =
                level.percent === "10%"
                  ? "max-[640px]:h-[398px]"
                  : level.percent === "15%"
                  ? "max-[640px]:h-[478px]"
                  : "max-[640px]:h-[400px]";
              return (
                <div
                  key={level.name}
                  className={`mx-auto w-full max-w-[90%] rounded-2xl bg-[#000617] shadow-lg ${mobileHeightClass} max-[640px]:w-[300px] max-[640px]:max-w-none sm:max-w-3xl md:px-16 md:py-12 lg:max-w-[1216px]`}
                  style={{
                    border: `2px solid ${level.levelColor}40`,
                  }}
                >
                  <div className="grid gap-10 px-6 py-6 max-[640px]:gap-6 max-[640px]:px-5 max-[640px]:py-6 md:grid-cols-[420px_1fr] md:items-center md:px-0 md:py-0">
                    <div className="flex flex-col justify-center">
                      <p
                        className="text-lg font-semibold uppercase tracking-wide text-white max-[640px]:text-[16px] md:text-xl"
                        style={headingStyle}
                      >
                        Parceiro{" "}
                        <span style={{ color: level.levelColor }}>
                          {level.levelName}
                        </span>
                      </p>
                      <p
                        className="mt-3 text-base leading-relaxed text-white/70 max-[640px]:text-[13px] md:text-lg"
                        style={bodyStyle}
                      >
                        {level.serviceRange}
                      </p>
                      <p
                        className="mt-4 text-[72px] font-bold leading-none tracking-tight max-[640px]:text-[56px] md:text-[116.87px]"
                        style={{
                          fontFamily: "var(--font-rajdhani)",
                          fontWeight: 700,
                          color: level.percentColor,
                        }}
                      >
                        {level.percent}
                      </p>
                      <p
                        className="mt-3 text-base text-white/60 max-[640px]:text-[13px] md:text-lg"
                        style={bodyStyle}
                      >
                        de desconto
                      </p>
                    </div>
                    <div className="flex flex-col justify-center gap-6">
                      {level.benefits.map((benefit) => (
                        <div
                          key={benefit}
                          className="flex items-center gap-4 text-lg leading-relaxed text-white max-[640px]:text-[14px] md:text-xl"
                          style={bodyStyle}
                        >
                          <Image
                            src="/check.png"
                            alt="Benefício incluído"
                            width={34}
                            height={34}
                            className="h-[34px] w-[34px] shrink-0 max-[640px]:h-[24px] max-[640px]:w-[24px]"
                          />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Seção 5 — Como Funciona */}
      <section className="relative overflow-hidden bg-[#D9E7FF] py-16">
        <Image
          src="/texturewhite.png"
          alt=""
          fill
          className="object-cover opacity-40"
          sizes="100vw"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[#0E62F6]/5" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2
              className="mb-4 text-3xl font-bold text-rp-accent md:text-4xl lg:text-5xl"
              style={headingStyle}
            >
              Como Funciona a Parceria?
            </h2>
            <p
              className="text-base leading-relaxed text-gray-600 md:text-lg"
              style={bodyStyle}
            >
              Um processo simples e rápido para iniciar sua parceria com a
              Retífica Premium e começar a aproveitar todos os benefícios
              imediatamente.
            </p>
          </div>

          <div className="mt-14 grid gap-10 sm:grid-cols-2 place-items-center">
            {steps.map((step) => (
              <div
                key={step.number}
                className="mx-auto flex w-full max-w-[382px] min-h-[280px] flex-col items-center justify-center rounded-2xl border-2 border-[#0E62F6] bg-[#D9E7FF] px-8 py-10 text-center shadow-md"
              >
                <p
                  className="text-[84px] font-bold leading-none text-[#0B2D5C] md:text-[96px]"
                  style={headingStyle}
                >
                  {step.number}
                </p>
                <h3
                  className="mt-3 text-xl font-bold text-[#0B2D5C] md:text-2xl"
                  style={headingStyle}
                >
                  {step.title}
                </h3>
                <p
                  className="mt-3 text-sm leading-relaxed text-[#0B2D5C]/80 md:text-base"
                  style={bodyStyle}
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção 6 — CTA Final */}
      <section className="flex min-h-[550px] items-center bg-[#F5F5FA]">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            className="mb-5 text-3xl font-bold text-rp-accent md:text-4xl lg:text-5xl"
            style={headingStyle}
          >
            Junte-se a Mais de 80 Oficinas Parceiras
          </h2>
          <p
            className="mb-8 text-base leading-relaxed text-gray-600 md:text-lg"
            style={bodyStyle}
          >
            Faça parte da maior rede de oficinas parceiras em Sertãozinho-SP e
            região. Tenha descontos, prioridade de atendimento e suporte técnico
            para entregar mais rápido e com mais margem.
          </p>
          <Link
            href="/contato#formulario"
            className="mx-auto flex h-[68px] w-full max-w-[420px] items-center justify-center rounded-full text-base md:text-lg font-bold uppercase text-white shadow-lg transition-all hover:brightness-110"
            style={{
              background: "linear-gradient(0deg, #F3B839 0%, #F4891F 100%)",
              fontFamily: "var(--font-open-sans)",
            }}
          >
            Quero ser parceiro premium
          </Link>
        </div>
      </section>
    </main>
  );
}
