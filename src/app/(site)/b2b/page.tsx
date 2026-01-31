import Image from "next/image";
import Link from "next/link";

const headingStyle = { fontFamily: "var(--font-rajdhani)" };
const bodyStyle = { fontFamily: "var(--font-open-sans)" };

const fidelityItems = [
  {
    image: "/beneficio.png",
    title: "Benefícios Exclusivos",
    description:
      "Vantagens especiais e serviços premium para fidelizar sua oficina.",
  },
  {
    image: "/sistemadepontos.png",
    title: "Sistema de Pontos",
    description: "Acumule pontos a cada serviço e troque por recompensas.",
  },
  {
    image: "/crescimento.png",
    title: "Crescimento Conjunto",
    description: "Parcerias sólidas para ampliar resultados e oportunidades.",
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
    benefits: ["Descontos progressivos", "Suporte técnico"],
  },
  {
    name: "Parceiro Prata",
    levelName: "Prata",
    levelColor: "#A7A7A7",
    percent: "10%",
    percentColor: "#A7A7A7",
    serviceRange: "6-10 serviços/mês",
    benefits: [
      "Descontos progressivos",
      "Suporte técnico",
      "Atendimento prioritário",
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
      "Descontos progressivos",
      "Suporte técnico",
      "Condições especiais",
    ],
  },
];

const steps = [
  {
    number: "1º",
    title: "Cadastro",
    description: "Preencha o formulário e apresente os dados da sua oficina.",
  },
  {
    number: "2º",
    title: "Análise",
    description: "Nossa equipe avalia e aprova seu cadastro em até 48 horas.",
  },
  {
    number: "3º",
    title: "Ativação",
    description: "Receba seu kit de boas-vindas e credenciais de acesso.",
  },
  {
    number: "4º",
    title: "Benefícios",
    description: "Comece a aproveitar todas as vantagens imediatamente.",
  },
];

export default function B2BPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Seção 1 — HERO */}
      <section className="flex min-h-[720px] items-center justify-center bg-[#053282]">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-8 flex justify-center">
            <Image
              src="/mao.png"
              alt="Parceria B2B"
              width={253}
              height={223}
              className="h-auto w-[180px] md:w-[220px]"
              priority={true}
            />
          </div>
          <h1
            className="mb-5 text-4xl font-bold uppercase text-white md:text-5xl lg:text-6xl"
            style={headingStyle}
          >
            Programa de Parceria B2B
          </h1>
          <p
            className="mx-auto mb-8 max-w-2xl text-base text-white/80 md:text-lg"
            style={bodyStyle}
          >
            Junte-se à rede de oficinas parceiras e potencialize seu negócio com
            benefícios exclusivos e atendimento prioritário.
          </p>
          <Link
            href="/contato"
            className="mx-auto flex h-[58px] w-full max-w-[260px] items-center justify-center rounded-full text-sm font-bold uppercase text-white shadow-lg transition-all hover:brightness-110"
            style={{
              background: "linear-gradient(0deg, #F3B839 0%, #F4891F 100%)",
              fontFamily: "var(--font-open-sans)",
            }}
          >
            SEJA UM PARCEIRO
          </Link>
        </div>
      </section>

      {/* Seção 2 — Vantagens do Programa */}
      <section className="min-h-[1150px] bg-[#F5F5FA] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2
              className="mb-3 text-3xl font-bold text-rp-accent md:text-4xl"
              style={headingStyle}
            >
              Vantagens do Programa
            </h2>
            <p className="text-sm text-gray-600 md:text-base" style={bodyStyle}>
              Benefícios pensados para impulsionar sua oficina mecânica.
            </p>
          </div>

          <div className="mt-16 flex justify-center">
            <Image
              src="/carrob2b.png"
              alt="Carro de exposição"
              width={1080}
              height={860}
              className="h-auto w-[90%] max-w-[650px]"
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
              className="mb-3 text-3xl font-bold text-rp-accent md:text-4xl"
              style={headingStyle}
            >
              Programa de Fidelidade
            </h2>
            <p className="text-sm text-gray-600 md:text-base" style={bodyStyle}>
              Um programa estruturado com pontos, suporte e benefícios
              exclusivos.
            </p>
          </div>

          <div className="mx-auto mt-12 rounded-2xl bg-[#161616] px-8 py-12 shadow-lg">
            <div className="grid gap-10 md:grid-cols-3">
              {fidelityItems.map((item) => (
                <div key={item.title} className="text-center">
                  <div className="mb-4 flex justify-center">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={90}
                      height={90}
                      className="h-[90px] w-[90px] object-contain"
                    />
                  </div>
                  <h3
                    className="mb-2 text-base font-semibold text-[#D4A13A]"
                    style={headingStyle}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-300" style={bodyStyle}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Seção 4 — Níveis de Parceria */}
      <section className="min-h-[1670px] bg-[#000617] py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2
              className="mb-3 text-3xl font-bold text-white md:text-4xl"
              style={headingStyle}
            >
              Níveis de Parceria
            </h2>
            <p className="text-sm text-white/70 md:text-base" style={bodyStyle}>
              Quanto mais você utiliza, mais benefícios recebe.
            </p>
          </div>

          <div className="mt-14 space-y-10">
            {partnershipLevels.map((level) => (
              <div
                key={level.name}
                className="partnership-card-animated-border mx-auto w-full max-w-[90%] min-h-[342px] py-10 shadow-lg sm:max-w-3xl md:py-12 lg:max-w-[1216px]"
              >
                <div className="flex flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between md:px-8">
                  <div className="md:w-[420px]">
                    <p
                      className="text-base font-semibold uppercase tracking-wide text-white md:text-lg"
                      style={headingStyle}
                    >
                      Parceiro{" "}
                      <span style={{ color: level.levelColor }}>
                        {level.levelName}
                      </span>
                    </p>
                    <p
                      className="mt-2 text-sm text-white/70 md:text-base"
                      style={bodyStyle}
                    >
                      {level.serviceRange}
                    </p>
                    <p
                      className="mt-4 text-center text-[72px] font-bold md:text-[116.87px]"
                      style={{
                        fontFamily: "var(--font-rajdhani)",
                        fontWeight: 700,
                        lineHeight: "100%",
                        color: level.percentColor,
                      }}
                    >
                      {level.percent}
                    </p>
                    <p
                      className="mt-2 text-center text-sm text-white/60 md:text-base"
                      style={bodyStyle}
                    >
                      de desconto
                    </p>
                  </div>
                  <div className="w-full space-y-4 md:w-[520px]">
                    {level.benefits.map((benefit) => (
                      <div
                        key={benefit}
                        className="flex items-center gap-4 text-base text-white md:text-lg"
                        style={bodyStyle}
                      >
                        <Image
                          src="/check.png"
                          alt="check"
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
      <section className="relative min-h-[1280px] overflow-hidden py-20">
        <Image
          src="/texturewhite.png"
          alt="Textura de fundo"
          fill
          className="object-cover"
          priority={false}
        />
        <div className="absolute inset-0 bg-[#0E62F6]/5" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2
              className="mb-3 text-3xl font-bold text-rp-accent md:text-4xl"
              style={headingStyle}
            >
              Como Funciona?
            </h2>
            <p className="text-sm text-gray-600 md:text-base" style={bodyStyle}>
              Um processo simples para iniciar sua parceria com a Retífica
              Premium.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {steps.map((step) => (
              <div
                key={step.number}
                className="mx-auto w-full max-w-[382px] rounded-2xl border border-[#BFD5FF] bg-white/95 px-6 py-8 shadow-md"
              >
                <p
                  className="mb-4 text-4xl font-bold text-[#0B2D5C]"
                  style={headingStyle}
                >
                  {step.number}
                </p>
                <h3
                  className="mb-2 text-base font-semibold text-[#0B2D5C]"
                  style={headingStyle}
                >
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600" style={bodyStyle}>
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
            className="mb-4 text-3xl font-bold text-rp-accent md:text-4xl"
            style={headingStyle}
          >
            Junte-se a +80 Oficinas Parceiras
          </h2>
          <p
            className="mb-8 text-sm text-gray-600 md:text-base"
            style={bodyStyle}
          >
            Faça parte da maior rede de oficinas parceiras da região e tenha
            acesso a benefícios exclusivos que farão seu negócio crescer.
          </p>
          <Link
            href="/contato"
            className="mx-auto flex h-[58px] w-full max-w-[340px] items-center justify-center rounded-full text-sm font-bold uppercase text-white shadow-lg transition-all hover:brightness-110"
            style={{
              background: "linear-gradient(0deg, #F3B839 0%, #F4891F 100%)",
              fontFamily: "var(--font-open-sans)",
            }}
          >
            QUERO SER PARCEIRO PREMIUM
          </Link>
        </div>
      </section>
    </main>
  );
}
