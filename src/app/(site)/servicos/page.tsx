import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Serviços de Retífica de Cabeçote | Retífica Premium",
  description:
    "Limpeza química, retífica de sedes e válvulas, plaina, usinagem e montagem. Retífica automotiva com precisão e garantia em Sertãozinho-SP.",
  alternates: {
    canonical: "/servicos",
  },
  openGraph: {
    title: "Serviços de Retífica de Cabeçote | Retífica Premium",
    description:
      "Serviços completos de retífica de cabeçotes com usinagem de precisão, revisão de válvulas e montagem técnica.",
    url: "https://retificapremium.com.br/servicos",
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
    title: "Serviços de Retífica de Cabeçote | Retífica Premium",
    description:
      "Serviços completos de retífica de cabeçotes com usinagem de precisão, revisão de válvulas e montagem técnica.",
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
}: {
  image: string;
  alt: string;
  width: number;
  height: number;
  titulo: string;
  descricao: string | string[];
}) {
  const descricoes = Array.isArray(descricao) ? descricao : [descricao];

  return (
    <div className="flex w-full max-w-[382px] min-h-[458px] flex-col items-center justify-between rounded-[15px] border-2 border-[#0E62F6] bg-[#D9E7FF] p-8 shadow-[0_10px_25px_rgba(0,0,0,0.18)] transition-transform duration-200 ease-out hover:scale-[1.03] hover:shadow-[0_15px_35px_rgba(0,0,0,0.25)] max-[640px]:h-[328px] max-[640px]:w-[280px] max-[640px]:max-w-none max-[640px]:min-h-[328px] max-[640px]:p-6 md:h-[458px]">
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
      </div>
    </div>
  );
}

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
              Serviços de
              <br />
              <span className="text-rp-accent">Retífica de Cabeçote</span>
            </h1>

            <p
              className="mx-auto max-w-3xl text-lg text-gray-700 md:text-xl"
              style={{
                fontFamily: "var(--font-open-sans)",
                fontWeight: 400,
                lineHeight: 1.5,
              }}
            >
              Equipamentos de alta precisão, equipe especializada e controle
              técnico do início ao fim. Atendemos Sertãozinho-SP com prazo e
              garantia em cada serviço.
            </p>

            <div className="pt-4">
              <Link
                href="/contato#formulario"
                className="inline-flex h-14 items-center justify-center rounded-full px-10 text-base font-bold text-white shadow-lg transition-all hover:opacity-90"
                style={{
                  background: "linear-gradient(0deg, #F3B839 0%, #F4891F 100%)",
                  fontFamily: "var(--font-rajdhani)",
                }}
              >
                Solicitar orçamento
              </Link>
            </div>
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
              />
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 3 — CTA FINAL */}
      <section className="relative min-h-[922px] overflow-hidden">
        {/* Background com imagem blur */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/fundoquemsomos.png"
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
              Seu motor pronto para
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
              <Link
                href="/contato#formulario"
                className="inline-flex h-14 items-center justify-center rounded-full px-10 text-base font-bold text-white shadow-lg transition-all hover:opacity-90"
                style={{
                  background: "linear-gradient(0deg, #F3B839 0%, #F4891F 100%)",
                  fontFamily: "var(--font-rajdhani)",
                }}
              >
                Falar com especialista
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
