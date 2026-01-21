import Image from "next/image";
import Link from "next/link";

export default function ServicosPage() {
  const servicos = [
    {
      id: 1,
      titulo: "Limpeza Química de Cabeçotes",
      descricao: "Remoção completa de resíduos e carbonização através de processos químicos especializados.",
      icon: (
        <svg
          className="h-12 w-12 text-rp-accent"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
      ),
    },
    {
      id: 2,
      titulo: "Retífica de Sedes e Válvulas",
      descricao: "Recuperação precisa de sedes e válvulas com equipamentos de última geração.",
      icon: (
        <svg
          className="h-12 w-12 text-rp-accent"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      id: 3,
      titulo: "Troca e Adaptação de Guias",
      descricao: "Substituição e adaptação profissional de guias de válvulas.",
      icon: (
        <svg
          className="h-12 w-12 text-rp-accent"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          />
        </svg>
      ),
    },
    {
      id: 4,
      titulo: "Esmerilhamento de Válvulas",
      descricao: "Ajuste fino e polimento de válvulas para perfeita vedação.",
      icon: (
        <svg
          className="h-12 w-12 text-rp-accent"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      ),
    },
    {
      id: 5,
      titulo: "Usinagem de Roscas",
      descricao: "Recuperação e criação de roscas com precisão milimétrica.",
      icon: (
        <svg
          className="h-12 w-12 text-rp-accent"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
    {
      id: 6,
      titulo: "Plaina de Cabeçotes",
      descricao: "Retificação plana de superfícies para perfeito alinhamento.",
      icon: (
        <svg
          className="h-12 w-12 text-rp-accent"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      id: 7,
      titulo: "Solda de Trincas e Reparos Estruturais",
      descricao: "Soldagem especializada para reparo de trincas e danos estruturais.",
      icon: (
        <svg
          className="h-12 w-12 text-rp-accent"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
      ),
    },
    {
      id: 8,
      titulo: "Mandrilhamento de Sedes e Guias",
      descricao: "Usinagem precisa de sedes e guias para ajuste perfeito.",
      icon: (
        <svg
          className="h-12 w-12 text-rp-accent"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      ),
    },
    {
      id: 9,
      titulo: "Montagem Final",
      descricao: "Montagem completa e regulagem final com testes de qualidade.",
      icon: (
        <svg
          className="h-12 w-12 text-rp-accent"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
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
      <section className="relative min-h-[2237px] bg-[#0B2F6B] py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Título */}
          <div className="mb-12 text-center">
            <h2
              className="mb-6 text-4xl font-bold text-white md:text-5xl"
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
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {servicos.map((servico) => (
              <div
                key={servico.id}
                className="rounded-xl bg-[#E8F0F8] p-8 shadow-lg transition-shadow hover:shadow-xl"
              >
                <div className="mb-6 flex justify-center">{servico.icon}</div>
                <h3
                  className="mb-4 text-center text-xl font-bold text-gray-900"
                  style={{ fontFamily: "var(--font-rajdhani)" }}
                >
                  {servico.titulo}
                </h3>
                <p
                  className="text-center text-sm leading-relaxed text-gray-700"
                  style={{ fontFamily: "var(--font-open-sans)" }}
                >
                  {servico.descricao}
                </p>
              </div>
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
            {/* Ícone de chave inglesa */}
            <div className="flex justify-center">
              <svg
                className="h-20 w-20 text-[#F3B839] md:h-24 md:w-24"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
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
