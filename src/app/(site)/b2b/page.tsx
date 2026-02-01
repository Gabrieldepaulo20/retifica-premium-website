import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Programa de Parceria B2B | Retífica Premium - Descontos para Oficinas",
  description:
    "Junte-se à maior rede de oficinas parceiras da região. Descontos progressivos de até 15%, atendimento prioritário, suporte técnico especializado e programa de fidelidade com pontos. Parceria B2B para oficinas mecânicas em Sertãozinho/SP.",
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
  openGraph: {
    title: "Programa de Parceria B2B | Retífica Premium",
    description:
      "Descontos progressivos, atendimento prioritário e programa de fidelidade para oficinas mecânicas parceiras.",
    type: "website",
    locale: "pt_BR",
  },
};

const headingStyle = { fontFamily: "var(--font-rajdhani)" };
const bodyStyle = { fontFamily: "var(--font-open-sans)" };

const fidelityItems = [
  {
    image: "/beneficios-exclusivos-parceria-b2b-oficinas.png",
    title: "Benefícios Exclusivos",
    description:
      "Acesso a vantagens especiais, condições diferenciadas e serviços premium exclusivos para oficinas parceiras.",
  },
  {
    image: "/sistemadepontos.png",
    title: "Sistema de Pontos",
    description:
      "Acumule pontos a cada serviço realizado e troque por recompensas, descontos adicionais e benefícios exclusivos.",
  },
  {
    image: "/crescimento.png",
    title: "Crescimento Conjunto",
    description:
      "Parcerias estratégicas que geram crescimento mútuo, ampliando resultados e oportunidades de negócio.",
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
      "Atendimento prioritário e agendamento preferencial",
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
    ],
  },
];

const steps = [
  {
    number: "1º",
    title: "Cadastro",
    description:
      "Preencha nosso formulário de parceria com os dados da sua oficina mecânica e informações de contato.",
  },
  {
    number: "2º",
    title: "Análise",
    description:
      "Nossa equipe analisa seu cadastro e aprova sua parceria em até 48 horas úteis.",
  },
  {
    number: "3º",
    title: "Ativação",
    description:
      "Receba seu kit de boas-vindas com credenciais de acesso e todas as informações sobre benefícios.",
  },
  {
    number: "4º",
    title: "Benefícios",
    description:
      "Comece a aproveitar descontos, atendimento prioritário e todas as vantagens da parceria imediatamente.",
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
              priority={true}
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
            Potencialize sua oficina mecânica com descontos progressivos de até
            15%, atendimento prioritário e suporte técnico especializado.
            Junte-se à maior rede de oficinas parceiras da região.
          </p>
          <Link
            href="/contato#contato-form"
            className="mx-auto flex h-[58px] w-full max-w-[260px] items-center justify-center rounded-full text-sm font-bold uppercase text-white shadow-lg transition-all hover:brightness-110"
            style={{
              background: "linear-gradient(0deg, #F3B839 0%, #F4891F 100%)",
              fontFamily: "var(--font-open-sans)",
            }}
          >
            Solicitar Parceria Agora
          </Link>
        </div>
      </section>

      {/* Seção 2 — Vantagens do Programa */}
      <section className="bg-[#F5F5FA] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2
              className="mb-4 text-3xl font-bold text-rp-accent md:text-4xl lg:text-5xl"
              style={headingStyle}
            >
              Vantagens do Programa de Parceria
            </h2>
            <p
              className="text-base leading-relaxed text-gray-600 md:text-lg"
              style={bodyStyle}
            >
              Benefícios exclusivos pensados para impulsionar o crescimento da
              sua oficina mecânica e aumentar sua margem de lucro.
            </p>
          </div>

          <div className="mt-8 flex justify-center">
            <Image
              src="/carrob2b.png"
              alt="Carro em exposição - Parceria B2B Retífica Premium para oficinas"
              width={1080}
              height={860}
              className="h-auto w-[90%] max-w-[1200px]"
              priority={false}
            />
          </div>
        </div>
      </section>

      {/* Seção 3 — Programa de Fidelidade */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0B1E3D]">
              <svg
                className="h-6 w-6 text-[#D4A13A]"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2l2.5 5.2 5.7.8-4.1 4 1 5.7L12 15.8 6.9 17.7l1-5.7-4.1-4 5.7-.8L12 2z" />
              </svg>
            </div>
            <h2
              className="mb-4 text-3xl font-bold text-rp-accent md:text-4xl lg:text-5xl"
              style={headingStyle}
            >
              Programa de Fidelidade para Oficinas
            </h2>
            <p
              className="text-base leading-relaxed text-gray-600 md:text-lg"
              style={bodyStyle}
            >
              Um programa estruturado com sistema de pontos, suporte técnico
              dedicado e benefícios exclusivos para fidelizar e recompensar
              oficinas parceiras.
            </p>
          </div>

          <div className="mx-auto mt-12 rounded-2xl bg-[#161616] px-8 py-12 shadow-lg">
            <div className="grid gap-10 md:grid-cols-3">
              {fidelityItems.map((item) => (
                <div key={item.title} className="text-center">
                  <div className="mb-4 flex justify-center">
                    <Image
                      src={item.image}
                      alt={`${item.title} - Programa de Fidelidade Retífica Premium`}
                      width={90}
                      height={90}
                      className="h-[90px] w-[90px] object-contain"
                    />
                  </div>
                  <h3
                    className="mb-3 text-lg font-semibold text-[#D4A13A] md:text-xl"
                    style={headingStyle}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed text-gray-300 md:text-base"
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
      <section className="bg-[#000617] py-24 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2
              className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl"
              style={headingStyle}
            >
              Níveis de Parceria e Descontos Progressivos
            </h2>
            <p
              className="text-base leading-relaxed text-white/70 md:text-lg lg:text-xl"
              style={bodyStyle}
            >
              Quanto mais serviços você realiza, maiores são os descontos e
              benefícios exclusivos para sua oficina mecânica.
            </p>
          </div>

          <div className="mt-14 space-y-10">
            {partnershipLevels.map((level) => (
              <div
                key={level.name}
                className="mx-auto w-full max-w-[90%] rounded-2xl bg-[#051E40] shadow-lg sm:max-w-3xl md:px-16 md:py-12 lg:max-w-[1216px]"
                style={{
                  border: `2px solid ${level.levelColor}40`,
                }}
              >
                <div className="grid gap-10 px-6 py-6 md:grid-cols-[420px_1fr] md:items-center md:px-0 md:py-0">
                  <div className="flex flex-col justify-center">
                    <p
                      className="text-lg font-semibold uppercase tracking-wide text-white md:text-xl"
                      style={headingStyle}
                    >
                      Parceiro{" "}
                      <span style={{ color: level.levelColor }}>
                        {level.levelName}
                      </span>
                    </p>
                    <p
                      className="mt-3 text-base leading-relaxed text-white/70 md:text-lg"
                      style={bodyStyle}
                    >
                      {level.serviceRange}
                    </p>
                    <p
                      className="mt-4 text-[72px] font-bold leading-none tracking-tight md:text-[116.87px]"
                      style={{
                        fontFamily: "var(--font-rajdhani)",
                        fontWeight: 700,
                        color: level.percentColor,
                      }}
                    >
                      {level.percent}
                    </p>
                    <p
                      className="mt-3 text-base text-white/60 md:text-lg"
                      style={bodyStyle}
                    >
                      de desconto
                    </p>
                  </div>
                  <div className="flex flex-col justify-center gap-6">
                    {level.benefits.map((benefit) => (
                      <div
                        key={benefit}
                        className="flex items-center gap-4 text-lg leading-relaxed text-white md:text-xl"
                        style={bodyStyle}
                      >
                        <Image
                          src="/check.png"
                          alt="Benefício incluído"
                          width={34}
                          height={34}
                          className="h-[34px] w-[34px] shrink-0"
                        />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
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
          priority={false}
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
            Faça parte da maior e mais confiável rede de oficinas parceiras da
            região de Sertãozinho/SP. Tenha acesso a descontos exclusivos,
            atendimento prioritário e suporte técnico especializado que farão
            sua oficina crescer e se destacar no mercado.
          </p>
          <Link
            href="/contato#contato-form"
            className="mx-auto flex h-[58px] w-full max-w-[340px] items-center justify-center rounded-full text-sm font-bold uppercase text-white shadow-lg transition-all hover:brightness-110"
            style={{
              background: "linear-gradient(0deg, #F3B839 0%, #F4891F 100%)",
              fontFamily: "var(--font-open-sans)",
            }}
          >
            Quero Ser Parceiro Premium
          </Link>
        </div>
      </section>
    </main>
  );
}
