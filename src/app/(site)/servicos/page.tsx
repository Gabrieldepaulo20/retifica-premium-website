import Image from "next/image";
import Link from "next/link";

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
    <div className="flex w-full max-w-[382px] min-h-[458px] flex-col items-center justify-between rounded-[15px] border-2 border-[#0E62F6] bg-[#D9E7FF] p-8 shadow-[0_10px_25px_rgba(0,0,0,0.18)] transition-transform duration-200 ease-out hover:scale-[1.03] hover:shadow-[0_15px_35px_rgba(0,0,0,0.25)] md:h-[458px]">
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
          className="mb-4 text-center text-xl font-bold text-gray-900"
          style={{ fontFamily: "var(--font-rajdhani)" }}
        >
          {titulo}
        </h3>
        <div className="text-center text-sm leading-relaxed text-gray-700">
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
            priority
            sizes="100vw"
            className="object-cover opacity-85"
          />
          {/* Overlay leve */}
          <div className="absolute inset-0 bg-white/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/30" />
        </div>

        {/* Conteúdo */}
        <div className="relative z-10 mx-auto flex min-h-[720px] max-w-7xl items-center justify-center px-4 text-center sm:px-6 lg:px-8">
          <div className="space-y-8">
            <h1
              className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-rajdhani)", lineHeight: 1.2 }}
            >
              Serviços Especializados em
              <br />
              <span className="text-rp-accent">Retífica de Cabeçotes</span>
            </h1>

            <p
              className="mx-auto max-w-3xl text-lg text-gray-700 md:text-xl"
              style={{
                fontFamily: "var(--font-open-sans)",
                fontWeight: 400,
                lineHeight: 1.5,
              }}
            >
              Na Retífica de Cabeçotes Premium, cada serviço é executado com
              equipamentos de alta precisão, mão de obra especializada e controle
              técnico rigoroso.
            </p>

            <div className="pt-4">
              <Link
                href="/contato"
                className="inline-flex h-14 items-center justify-center rounded-full px-10 text-base font-bold text-white shadow-lg transition-all hover:opacity-90"
                style={{
                  background: "linear-gradient(0deg, #F3B839 0%, #F4891F 100%)",
                  fontFamily: "var(--font-rajdhani)",
                }}
              >
                SOLICITAR ORÇAMENTO
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
                Cada cabeçote é tratado com atenção individual, seguindo padrões
                de fábrica e protocolos de qualidade que fazem da Retífica Premium
                uma referência no setor.
              </p>
            </div>
          </div>

          {/* Grid de cards */}
          <div className="grid grid-cols-1 place-items-center gap-6 md:grid-cols-2 lg:grid-cols-3">
            {servicos.map((servico) => (
              <ServiceCard
                key={servico.id}
                image={servico.image}
                alt={servico.titulo}
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
            priority={false}
          />
          {/* Overlay escuro */}
          <div className="absolute inset-0 bg-black/65" />
          {/* Vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50" />
        </div>

        {/* Conteúdo */}
        <div className="relative z-10 mx-auto flex min-h-[922px] max-w-7xl items-center justify-center px-4 text-center sm:px-6 lg:px-8">
          <div className="space-y-8">
            {/* Imagem da ferramenta */}
            <div className="mb-6 flex justify-center">
              <Image
                src="/ferramenta.png"
                alt="Ferramenta"
                width={479}
                height={98}
                className="object-contain"
                priority={false}
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
              Entre em contato e descubra como nossa retífica pode devolver
              potência, eficiência e confiança ao seu veículo.
            </p>

            {/* Botão CTA */}
            <div className="pt-4">
              <Link
                href="/contato"
                className="inline-flex h-14 items-center justify-center rounded-full px-10 text-base font-bold text-white shadow-lg transition-all hover:opacity-90"
                style={{
                  background: "linear-gradient(0deg, #F3B839 0%, #F4891F 100%)",
                  fontFamily: "var(--font-rajdhani)",
                }}
              >
                SOLICITAR ORÇAMENTO
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
