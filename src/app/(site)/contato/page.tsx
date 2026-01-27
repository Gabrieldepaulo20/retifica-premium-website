import Image from "next/image";

export default function ContatoPage() {
  return (
    <main className="min-h-screen">
      {/* SEÇÃO 1 — HERO */}
      <section className="relative min-h-[600px] overflow-hidden bg-[#2E5AA7]">
        {/* Background com imagem */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/cabecotefundo.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Overlay escuro para contraste */}
          <div className="absolute inset-0 bg-black/70" />
          {/* Vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        </div>

        {/* Conteúdo centralizado */}
        <div className="relative z-10 mx-auto flex min-h-[600px] max-w-7xl items-center justify-center px-4 text-center sm:px-6 lg:px-8">
          <div className="space-y-4">
            <h1
              className="text-4xl font-bold text-white md:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-rajdhani)", lineHeight: 1.3 }}
            >
              Entre em Contato
            </h1>
            <div
              className="mx-auto max-w-2xl space-y-2 text-lg md:text-xl"
              style={{ fontFamily: "var(--font-open-sans)", lineHeight: 1.6 }}
            >
              <p className="font-semibold text-[#F3B839]">
                Estamos prontos para atender você.
              </p>
              <p className="text-white/90">
                Envie sua mensagem ou visite nossa oficina.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 2 — FORMULÁRIO */}
      <section className="min-h-[1200px] bg-white py-20">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-2xl rounded-3xl bg-[#F8B628] p-10 shadow-xl md:p-12">
            <h2
              className="mb-8 text-center text-2xl font-bold uppercase text-white md:text-3xl"
              style={{ fontFamily: "var(--font-rajdhani)", lineHeight: 1.2 }}
            >
              ENVIE SUA MENSAGEM
            </h2>

            <form action="#" method="post" className="space-y-6">
              {/* Nome */}
              <div>
                <label
                  htmlFor="nome"
                  className="mb-2 block text-sm font-medium text-white"
                  style={{ fontFamily: "var(--font-open-sans)" }}
                >
                  Nome
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  required
                  className="h-12 w-full rounded-xl border border-black/10 bg-[#FFE3A6] px-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                  placeholder="Seu nome completo"
                  style={{ fontFamily: "var(--font-open-sans)" }}
                />
              </div>

              {/* Telefone/WhatsApp */}
              <div>
                <label
                  htmlFor="telefone"
                  className="mb-2 block text-sm font-medium text-white"
                  style={{ fontFamily: "var(--font-open-sans)" }}
                >
                  Telefone/WhatsApp
                </label>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  required
                  className="h-12 w-full rounded-xl border border-black/10 bg-[#FFE3A6] px-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                  placeholder="(11) 99999-9999"
                  style={{ fontFamily: "var(--font-open-sans)" }}
                />
              </div>

              {/* E-mail */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-white"
                  style={{ fontFamily: "var(--font-open-sans)" }}
                >
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="h-12 w-full rounded-xl border border-black/10 bg-[#FFE3A6] px-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                  placeholder="seu@email.com"
                  style={{ fontFamily: "var(--font-open-sans)" }}
                />
              </div>

              {/* Assunto */}
              <div>
                <label
                  htmlFor="assunto"
                  className="mb-2 block text-sm font-medium text-white"
                  style={{ fontFamily: "var(--font-open-sans)" }}
                >
                  Assunto
                </label>
                <select
                  id="assunto"
                  name="assunto"
                  required
                  className="h-12 w-full rounded-xl border border-black/10 bg-[#FFE3A6] px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
                  style={{ fontFamily: "var(--font-open-sans)" }}
                >
                  <option value="">Selecione um assunto</option>
                  <option value="orcamento">Solicitar Orçamento</option>
                  <option value="duvidas">Tirar Dúvidas</option>
                  <option value="orcamento">Outros Assuntos</option>
                </select>
              </div>

              {/* Mensagem */}
              <div>
                <label
                  htmlFor="mensagem"
                  className="mb-2 block text-sm font-medium text-white"
                  style={{ fontFamily: "var(--font-open-sans)" }}
                >
                  Mensagem
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  rows={6}
                  required
                  className="min-h-[180px] w-full rounded-xl border border-black/10 bg-[#FFE3A6] px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                  placeholder="Sua mensagem aqui..."
                  style={{ fontFamily: "var(--font-open-sans)" }}
                />
              </div>

              {/* Botão Enviar */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full rounded-full px-10 py-3 text-lg font-bold text-white shadow-lg transition-all hover:opacity-90"
                  style={{
                    background: "linear-gradient(0deg, #F3B839 0%, #F4891F 100%)",
                    fontFamily: "var(--font-rajdhani)",
                  }}
                >
                  ENVIAR MENSAGEM
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* SEÇÃO 3 — MAPA/LOCALIZAÇÃO */}
      <section className="min-h-[1100px] bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
            {/* Mapa placeholder */}
            <div className="order-2 lg:order-1">
              <div className="h-[400px] rounded-3xl bg-white shadow-xl sm:h-[500px] lg:h-[600px]">
                <div className="flex h-full items-center justify-center">
                  <p
                    className="text-gray-500"
                    style={{ fontFamily: "var(--font-open-sans)" }}
                  >
                    Mapa aqui (Google Maps embed)
                  </p>
                </div>
              </div>
            </div>

            {/* Cards de informações */}
            <div className="order-1 space-y-6 lg:order-2">
              {/* Card Endereço */}
              <div className="rounded-2xl bg-white p-6 shadow-lg">
                <h3
                  className="mb-3 text-xl font-bold text-gray-900"
                  style={{ fontFamily: "var(--font-rajdhani)" }}
                >
                  Endereço
                </h3>
                <p
                  className="text-gray-700"
                  style={{ fontFamily: "var(--font-open-sans)", lineHeight: 1.6 }}
                >
                  Rua das Oficinas, 123
                  <br />
                  São Paulo - SP, 01234-567
                </p>
              </div>

              {/* Card Horário */}
              <div className="rounded-2xl bg-white p-6 shadow-lg">
                <h3
                  className="mb-3 text-xl font-bold text-gray-900"
                  style={{ fontFamily: "var(--font-rajdhani)" }}
                >
                  Horário
                </h3>
                <p
                  className="text-gray-700"
                  style={{ fontFamily: "var(--font-open-sans)", lineHeight: 1.6 }}
                >
                  Segunda a Sexta: 8h às 18h
                  <br />
                  Sábado: 9h às 12h
                  <br />
                  Domingo: Fechado
                </p>
              </div>

              {/* Card Telefone */}
              <div className="rounded-2xl bg-white p-6 shadow-lg">
                <h3
                  className="mb-3 text-xl font-bold text-gray-900"
                  style={{ fontFamily: "var(--font-rajdhani)" }}
                >
                  Telefone
                </h3>
                <p
                  className="text-gray-700"
                  style={{ fontFamily: "var(--font-open-sans)", lineHeight: 1.6 }}
                >
                  (11) 99999-9999
                </p>
              </div>

              {/* Card E-mail */}
              <div className="rounded-2xl bg-white p-6 shadow-lg">
                <h3
                  className="mb-3 text-xl font-bold text-gray-900"
                  style={{ fontFamily: "var(--font-rajdhani)" }}
                >
                  E-mail
                </h3>
                <p
                  className="text-gray-700"
                  style={{ fontFamily: "var(--font-open-sans)", lineHeight: 1.6 }}
                >
                  contato@retificapremium.com.br
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
