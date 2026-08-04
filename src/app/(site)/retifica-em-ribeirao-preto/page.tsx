import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  BreadcrumbSchema,
  FAQSchema,
  RibeiraoPretoServiceSchema,
} from "@/components/site/StructuredData";
import {
  TrackedCtaLink,
  TrackedPhoneLink,
  TrackedWhatsAppLink,
} from "@/components/site/TrackedLinks";
import { serviceDetailPages, servicePath } from "@/lib/service-pages";
import { absoluteUrl, siteConfig } from "@/lib/site";

const pagePath = "/retifica-em-ribeirao-preto";

const whatsappMessage =
  "Olá, sou de Ribeirão Preto e vim pelo site da Retífica Premium. Gostaria de um orçamento para retífica de cabeçote.";

export const metadata: Metadata = {
  title: "Retífica de Cabeçote em Ribeirão Preto | Sertãozinho-SP",
  description:
    "Retífica de cabeçote para Ribeirão Preto, a 19 km, em Sertãozinho. Diagnóstico técnico, garantia e orçamento pelo WhatsApp.",
  alternates: {
    canonical: pagePath,
  },
  openGraph: {
    title: "Retífica de Cabeçote em Ribeirão Preto | Sertãozinho-SP",
    description:
      "Retífica de cabeçote, plaina e teste de trinca para motoristas, oficinas e frotas de Ribeirão Preto. Oficina a 19 km, em Sertãozinho-SP.",
    url: absoluteUrl(pagePath),
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [
      {
        url: "/oficina.jpeg",
        width: 1200,
        height: 630,
        alt: "Fachada da Retífica Premium em Sertãozinho-SP",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Retífica de Cabeçote em Ribeirão Preto | Sertãozinho-SP",
    description:
      "Retífica de cabeçote, plaina e teste de trinca para Ribeirão Preto. Oficina a 19 km, em Sertãozinho-SP.",
    images: ["/oficina.jpeg"],
  },
};

const steps = [
  {
    title: "Chame no WhatsApp",
    desc: "Conte o sintoma do motor ou envie fotos da peça. Respondemos com orientação técnica e o caminho para o orçamento.",
  },
  {
    title: "Diagnóstico e orçamento",
    desc: "Avaliamos o caso e enviamos orçamento detalhado pelo WhatsApp, sem compromisso e sem orçamento no escuro.",
  },
  {
    title: "Envio da peça",
    desc: "Você traz o cabeçote até a oficina em Sertãozinho, ou combinamos retirada e entrega conforme a rota.",
  },
  {
    title: "Serviço e devolução",
    desc: "Executamos a retífica com medição técnica e devolvemos a peça com garantia por escrito e orientação de montagem.",
  },
];

const reasons = [
  {
    title: "20+ anos de experiência",
    desc: "Retífica de cabeçotes e usinagem automotiva desde 2004, atendendo carro, caminhão, ônibus, trator e motores diesel, gasolina e álcool.",
  },
  {
    title: "Garantia documentada",
    desc: "Garantia real por escrito e laudo técnico do serviço realizado — segurança para motorista e para oficina.",
  },
  {
    title: "A 19 km de Ribeirão Preto",
    desc: "Cerca de 25 minutos de carro entre Ribeirão Preto e a oficina em Sertãozinho. Mais perto do que parece.",
  },
  {
    title: "Atendimento direto",
    desc: "Orçamento e acompanhamento pelo WhatsApp, com retorno rápido e explicação clara do que a peça precisa.",
  },
];

const faq = [
  {
    question: "A Retífica Premium atende Ribeirão Preto?",
    answer:
      "Sim. A oficina fica em Sertãozinho-SP, a cerca de 19 km de Ribeirão Preto, e atende motoristas, oficinas mecânicas e frotas da cidade todos os dias úteis.",
  },
  {
    question: "Como envio meu cabeçote de Ribeirão Preto?",
    answer:
      "Você pode trazer a peça até a oficina em Sertãozinho ou combinar retirada e entrega conforme a rota. O combinado é feito pelo WhatsApp junto com o orçamento.",
  },
  {
    question: "Qual o prazo para quem está em Ribeirão Preto?",
    answer:
      "O prazo é o mesmo do atendimento local: retífica simples de cabeçote leva de 2 a 4 dias úteis e o orçamento sai pelo WhatsApp em até 2 horas úteis após o diagnóstico.",
  },
  {
    question: "Vale a pena sair de Ribeirão Preto para retificar em Sertãozinho?",
    answer:
      "São cerca de 25 minutos de carro. Em troca, você tem diagnóstico antes da troca de peças, garantia por escrito, laudo técnico e mais de 20 anos de especialização em cabeçotes.",
  },
  {
    question: "Vocês atendem oficinas mecânicas de Ribeirão Preto?",
    answer:
      "Sim. Oficinas de Ribeirão Preto podem participar do programa de parceria B2B, com apoio técnico, logística combinada e condições para envio recorrente de cabeçotes.",
  },
];

export default function RetificaRibeiraoPretoPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-[#051B3D] py-16 text-white md:py-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/oficina.jpeg"
            alt=""
            fill
            sizes="100vw"
            className="hidden object-cover opacity-20 md:block"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-linear-to-b from-[#051B3D]/95 via-[#051B3D]/88 to-[#020E1D]" />
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-[1.05fr_0.95fr] md:items-center lg:px-8">
          <div>
            <p className="mb-6 text-sm font-semibold uppercase tracking-wide text-rp-gold">
              Atendimento a Ribeirão Preto
            </p>
            <h1 className="font-heading text-3xl font-extrabold leading-tight md:text-5xl">
              Retífica de cabeçote para Ribeirão Preto
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/82 md:text-lg">
              A Retífica Premium fica em Sertãozinho-SP, a cerca de 19 km de
              Ribeirão Preto, e atende motoristas, oficinas mecânicas e frotas
              da cidade com retífica de cabeçote, plaina, teste de trinca e
              montagem técnica.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
              O diagnóstico vem antes da troca de peças: você envia o sintoma
              pelo WhatsApp, recebe orientação técnica e um orçamento claro
              antes de decidir.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <TrackedWhatsAppLink
                eventLabel="ribeirao_preto_hero_whatsapp"
                message={whatsappMessage}
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#25D366] px-8 text-sm font-bold text-[#052E16] transition-all hover:brightness-110 md:h-14 md:text-base"
              >
                Pedir orçamento no WhatsApp
              </TrackedWhatsAppLink>
              <TrackedPhoneLink
                eventLabel="ribeirao_preto_hero_phone"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/45 px-8 text-sm font-bold text-white transition-all hover:bg-white/10 md:h-14 md:text-base"
              >
                Ligar {siteConfig.phone.display}
              </TrackedPhoneLink>
            </div>
          </div>

          <div className="relative mx-auto aspect-[4/3] w-full max-w-[560px] overflow-hidden rounded-lg border border-white/15 bg-white/8 shadow-2xl">
            <Image
              src="/oficina.jpeg"
              alt="Fachada da Retífica Premium em Sertãozinho-SP, que atende Ribeirão Preto"
              fill
              sizes="(max-width: 768px) 92vw, 560px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#FFFBF2] py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-rp-accent">
              Como funciona
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
              Atendimento para Ribeirão Preto em 4 passos
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-700 md:text-lg">
              Do primeiro contato à devolução da peça, o processo é combinado
              pelo WhatsApp para você não perder viagem.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <article
                key={step.title}
                className="rounded-lg border border-[#D9E7FF] bg-white p-5 shadow-sm"
              >
                <p className="font-heading text-sm font-bold text-rp-accent">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-heading text-xl font-bold text-[#053282]">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-700">
                  {step.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-rp-accent">
              Serviços disponíveis
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
              O que fazemos para quem está em Ribeirão Preto
            </h2>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {serviceDetailPages.map((service) => (
              <Link
                key={service.slug}
                href={servicePath(service.slug)}
                className="group rounded-lg border border-[#E8EEF8] bg-[#F8FBFF] p-5 shadow-sm transition-all hover:border-rp-accent hover:shadow-md"
              >
                <h3 className="font-heading text-xl font-bold text-[#053282] group-hover:text-rp-accent">
                  {service.shortTitle}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-700">
                  {service.metaDescription}
                </p>
                <span className="mt-3 inline-block text-sm font-semibold text-rp-accent">
                  Ver detalhes do serviço →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0B2F6B] py-14 text-white md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-rp-gold">
              Por que vale o trajeto
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold leading-tight md:text-5xl">
              Especialização a 25 minutos de Ribeirão Preto
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/78 md:text-lg">
              Muitas oficinas e motoristas de Ribeirão Preto já enviam
              cabeçotes para Sertãozinho: a distância é curta e o serviço é
              feito por quem trabalha com retífica todos os dias.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {reasons.map((reason) => (
              <article
                key={reason.title}
                className="rounded-lg border border-white/15 bg-white/8 p-5"
              >
                <h3 className="font-heading text-xl font-bold text-rp-gold">
                  {reason.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/80">
                  {reason.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-heading text-3xl font-bold text-gray-900 md:text-5xl">
            Dúvidas de quem está em Ribeirão Preto
          </h2>
          <div className="mt-8 space-y-4">
            {faq.map((item) => (
              <details
                key={item.question}
                className="group rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-3 font-semibold text-gray-900">
                  <span>{item.question}</span>
                  <span
                    className="text-rp-accent transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  >
                    ▼
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-gray-700">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <TrackedWhatsAppLink
              eventLabel="ribeirao_preto_faq_whatsapp"
              message={whatsappMessage}
              className="inline-flex h-12 items-center justify-center rounded-full bg-rp-accent px-8 text-sm font-bold text-white transition-all hover:brightness-110 md:h-14 md:text-base"
            >
              Falar com especialista
            </TrackedWhatsAppLink>
            <TrackedCtaLink
              href="/b2b"
              eventLabel="ribeirao_preto_b2b"
              className="inline-flex h-12 items-center justify-center rounded-full border border-[#053282] px-8 text-sm font-bold text-[#053282] transition-all hover:bg-[#D9E7FF] md:h-14 md:text-base"
            >
              Parceria para oficinas de Ribeirão Preto
            </TrackedCtaLink>
          </div>
        </div>
      </section>

      <FAQSchema items={faq} />
      <RibeiraoPretoServiceSchema />
      <BreadcrumbSchema
        items={[
          { name: "Início", url: "/" },
          { name: "Retífica em Ribeirão Preto", url: pagePath },
        ]}
      />
    </main>
  );
}
