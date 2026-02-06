import Image from "next/image";
import type { Metadata } from "next";
import { ContatoScroll } from "@/components/site/ContatoScroll";

export const metadata: Metadata = {
  title: "Contato | Retífica Premium em Sertãozinho-SP",
  description:
    "Fale com a Retífica Premium para orçamento de retífica de cabeçote, usinagem e montagem. Atendimento rápido por telefone e WhatsApp.",
  alternates: {
    canonical: "/contato",
  },
  openGraph: {
    title: "Contato | Retífica Premium em Sertãozinho-SP",
    description:
      "Fale com a Retífica Premium para orçamento de retífica de cabeçote, usinagem e montagem.",
    url: "https://retificapremium.com.br/contato",
    siteName: "Retífica Premium",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/retificapremium.jpeg",
        width: 1200,
        height: 630,
        alt: "Contato Retífica Premium",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contato | Retífica Premium em Sertãozinho-SP",
    description:
      "Fale com a Retífica Premium para orçamento de retífica de cabeçote, usinagem e montagem.",
    images: ["/retificapremium.jpeg"],
  },
};

export default function ContatoPage() {
  return (
    <main className="min-h-screen bg-white">
      <ContatoScroll />
      {/* PARTE A — HERO/FORMULÁRIO */}
      <section className="bg-white">
        <div className="relative min-h-[700px] overflow-hidden bg-[#2E5AA7]">
          <div className="absolute inset-0 z-0">
            <Image
              src="/cabecotefundo.jpg"
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-[#2E5AA7]/90" />
            <div className="absolute inset-0 bg-linear-to-b from-[#2E5AA7]/75 via-[#1E3B73]/65 to-black/60" />
          </div>

          <div className="relative z-10 mx-auto flex min-h-[700px] max-w-7xl items-center justify-center px-4 text-center sm:px-6 lg:px-8">
            <div className="space-y-4">
              <h1
                className="text-4xl font-bold text-white md:text-5xl lg:text-6xl"
                style={{ fontFamily: "var(--font-rajdhani)", lineHeight: 1.3 }}
              >
                Fale com um especialista
              </h1>
              <div
                className="mx-auto max-w-2xl space-y-2 text-lg md:text-xl"
                style={{ fontFamily: "var(--font-open-sans)", lineHeight: 1.6 }}
              >
                <p className="font-semibold text-[#F3B839]">
                  Orçamento rápido para retífica de cabeçote.
                </p>
                <p className="text-white/90">
                  Fale por WhatsApp, telefone ou envie sua mensagem.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="-mt-[90px] mx-auto max-w-7xl px-4 pb-40 pt-2 sm:px-6 lg:px-8">
          <div id="formulario" className="relative z-10 mx-auto w-full max-w-2xl rounded-3xl bg-[#F8B628] p-5 shadow-xl max-[640px]:p-6 md:p-10">
            <h2
              className="mb-6 text-center text-xl font-bold uppercase text-white max-[640px]:mb-5 md:text-2xl md:mb-8 lg:text-3xl"
              style={{ fontFamily: "var(--font-rajdhani)", lineHeight: 1.2 }}
            >
              Solicite seu orçamento
            </h2>

            <form action="#" method="post" className="space-y-4 max-[640px]:space-y-3 md:space-y-5">
              <div>
                <label
                  htmlFor="nome"
                  className="mb-1.5 block text-xs font-medium text-white max-[640px]:mb-1 md:mb-2 md:text-sm"
                  style={{ fontFamily: "var(--font-open-sans)" }}
                >
                  Nome completo
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  required
                  className="h-11 w-full rounded-xl border border-black/10 bg-[#FFE3A6] px-3 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 max-[640px]:h-10 max-[640px]:px-3 md:h-12 md:px-4 md:text-base"
                  placeholder="Seu nome completo"
                  style={{ fontFamily: "var(--font-open-sans)" }}
                />
              </div>

              <div>
                <label
                  htmlFor="telefone"
                  className="mb-1.5 block text-xs font-medium text-white max-[640px]:mb-1 md:mb-2 md:text-sm"
                  style={{ fontFamily: "var(--font-open-sans)" }}
                >
                  Telefone/WhatsApp
                </label>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  required
                  className="h-11 w-full rounded-xl border border-black/10 bg-[#FFE3A6] px-3 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 max-[640px]:h-10 max-[640px]:px-3 md:h-12 md:px-4 md:text-base"
                  placeholder="(16) 99999-9999"
                  style={{ fontFamily: "var(--font-open-sans)" }}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-xs font-medium text-white max-[640px]:mb-1 md:mb-2 md:text-sm"
                  style={{ fontFamily: "var(--font-open-sans)" }}
                >
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="h-11 w-full rounded-xl border border-black/10 bg-[#FFE3A6] px-3 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 max-[640px]:h-10 max-[640px]:px-3 md:h-12 md:px-4 md:text-base"
                  placeholder="seu@email.com"
                  style={{ fontFamily: "var(--font-open-sans)" }}
                />
              </div>

              <div>
                <label
                  htmlFor="assunto"
                  className="mb-1.5 block text-xs font-medium text-white max-[640px]:mb-1 md:mb-2 md:text-sm"
                  style={{ fontFamily: "var(--font-open-sans)" }}
                >
                  Assunto
                </label>
                <select
                  id="assunto"
                  name="assunto"
                  required
                  className="h-11 w-full rounded-xl border border-black/10 bg-[#FFE3A6] px-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50 max-[640px]:h-10 max-[640px]:px-3 md:h-12 md:px-4 md:text-base"
                  style={{ fontFamily: "var(--font-open-sans)" }}
                >
                  <option value="">Selecione um assunto</option>
                  <option value="orcamento">Solicitar Orçamento</option>
                  <option value="duvidas">Tirar Dúvidas</option>
                  <option value="outros">Outros Assuntos</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="mensagem"
                  className="mb-1.5 block text-xs font-medium text-white max-[640px]:mb-1 md:mb-2 md:text-sm"
                  style={{ fontFamily: "var(--font-open-sans)" }}
                >
                  Mensagem
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  rows={4}
                  required
                  className="min-h-[120px] w-full rounded-xl border border-black/10 bg-[#FFE3A6] px-3 py-2.5 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 max-[640px]:min-h-[100px] max-[640px]:px-3 md:min-h-[170px] md:px-4 md:py-3 md:text-base"
                  placeholder="Sua mensagem aqui..."
                  style={{ fontFamily: "var(--font-open-sans)" }}
                />
              </div>

              <div className="pt-3 max-[640px]:pt-2 md:pt-4">
                <button
                  type="submit"
                  className="w-full rounded-full px-8 py-2.5 text-base font-bold text-white shadow-lg transition-all hover:opacity-90 max-[640px]:px-6 max-[640px]:py-2 max-[640px]:text-sm md:px-10 md:py-3 md:text-lg"
                  style={{
                    background: "linear-gradient(0deg, #F3B839 0%, #F4891F 100%)",
                    fontFamily: "var(--font-rajdhani)",
                  }}
                >
                  Enviar mensagem
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* PARTE B — ONDE ESTAMOS */}
      <section className="relative -mt-[90px] overflow-hidden bg-linear-to-b from-[#2E5AA7] via-[#2A5197] to-[#1F407A] pb-20 pt-28 md:pt-32">
        <div className="absolute inset-0 z-0">
          <Image
            src="/cabecotefundo.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-15"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[#2E5AA7]/85" />
          <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/40" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center text-white">
            <span
              className="material-symbols-outlined inline-block leading-none text-[130px] text-[#F3B839] md:text-[134px]"
              aria-hidden="true"
            >
              location_on
            </span>
            <h2
              className="mt-2 text-3xl font-bold md:text-4xl lg:text-5xl"
              style={{ fontFamily: "var(--font-rajdhani)" }}
            >
              Onde estamos?
            </h2>
            <p
              className="mt-4 text-base text-white/90 md:text-lg"
              style={{ fontFamily: "var(--font-open-sans)", lineHeight: 1.7 }}
            >
              Av. Fioravante Magro, 1059 - Jardim Boa Vista, Sertãozinho - SP,
              14177-578. Visite nossa oficina e conheça nossa estrutura.
            </p>
          </div>

          <div className="mt-12 flex justify-center">
            <div className="w-full max-w-[974px]">
              <div className="h-[380px] w-full overflow-hidden rounded-[60px] shadow-2xl md:h-[520px] md:rounded-[126px] lg:h-[647px]">
                <iframe
                  title="Mapa - Retífica Premium"
                  src="https://www.google.com/maps?q=Av.%20Fioravante%20Magro,%201059%20-%20Jardim%20Boa%20Vista,%20Sert%C3%A3ozinho%20-%20SP,%2014177-578&output=embed"
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  style={{ border: 0 }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
