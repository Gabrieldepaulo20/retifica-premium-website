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
import { VideoEmbed } from "@/components/site/VideoEmbed";
import { serviceDetailPages, servicePath } from "@/lib/service-pages";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { videos } from "@/lib/videos";

const pagePath = "/retifica-em-ribeirao-preto";

const whatsappMessage =
  "Olá, sou de Ribeirão Preto e vim pelo site da Retífica Premium. Gostaria de um orçamento para retífica de cabeçote.";

export const metadata: Metadata = {
  title: "Retífica de Cabeçote em Ribeirão Preto — Buscamos e Entregamos",
  description:
    "Retífica de cabeçote para Ribeirão Preto: buscamos a peça, retificamos em Sertãozinho e devolvemos. Orçamento no WhatsApp em até 2 horas, com garantia por escrito.",
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

/** Selos da primeira dobra. O tráfego pago rola 14% da página — o que estiver
 *  abaixo da dobra, na prática, não existe. Estas três promessas ficam visíveis
 *  sem rolar a tela. */
const heroBadges = [
  {
    icon: "🚚",
    title: "Buscamos e entregamos",
    desc: "Em Ribeirão Preto, sem custo de deslocamento para você",
  },
  {
    icon: "⏱",
    title: "Orçamento em até 2h",
    desc: "Pelo WhatsApp, em horário comercial",
  },
  {
    icon: "🛡",
    title: "Garantia por escrito",
    desc: "Com laudo técnico. Desde 2004",
  },
];

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
    title: "Buscamos a peça",
    desc: "Combinamos a retirada em Ribeirão Preto e buscamos o cabeçote no endereço que você indicar. Você não precisa vir até Sertãozinho.",
  },
  {
    title: "Serviço e devolução",
    desc: "Executamos a retífica com medição técnica e devolvemos a peça no mesmo endereço, com garantia por escrito e orientação de montagem.",
  },
];

/** Bloco de conquista: fala com quem chegou buscando outra retífica de Ribeirão
 *  Preto. Sem citar nome de concorrente — política do Google e bom senso. */
const vantagens = [
  {
    title: "Você não perde o dia",
    desc: "Buscamos e devolvemos o cabeçote em Ribeirão Preto. Enquanto a retífica do bairro te obriga a levar, esperar e voltar, aqui a peça vai e volta com a gente.",
  },
  {
    title: "Só cabeçote, desde 2004",
    desc: "Não somos uma retífica genérica que também faz cabeçote. É o que fazemos todos os dias, o dia inteiro, há mais de 20 anos.",
  },
  {
    title: "Teste de trinca com equipamento próprio",
    desc: "Trinca fina não aparece a olho nu. Testamos toda peça antes de liberar — é o que evita você montar o motor e o problema voltar em duas semanas.",
  },
  {
    title: "Diagnóstico antes do orçamento",
    desc: "Medimos empeno, sedes, guias e vedação antes de dizer preço. Você não recebe orçamento no escuro nem paga por serviço que a peça não precisava.",
  },
  {
    title: "Laudo técnico por escrito",
    desc: "Você recebe o que foi medido, o que foi feito e a garantia documentada. Se for oficina, é o documento que você repassa ao seu cliente.",
  },
  {
    title: "19 km. 25 minutos.",
    desc: "É mais perto do que a maioria imagina — e, como buscamos a peça, na prática a distância nem entra na conta.",
  },
];

/** Diferencial técnico. É o argumento mais forte para justificar sair de
 *  Ribeirão Preto: equipamento que a retífica de bairro não tem. */
const tecnologia = [
  {
    title: "Teste de trinca",
    desc: "Equipamento próprio para revelar trincas invisíveis a olho nu, inclusive nas regiões críticas entre válvulas e câmara. Peça com trinca não tratada volta para a bancada em semanas.",
    href: "/servicos/teste-de-trinca",
    cta: "Como funciona o teste",
  },
  {
    title: "Medição de empeno",
    desc: "Conferência da superfície de vedação com instrumento, não no olho. É o que define se a peça precisa de plaina e quanto pode ser retirado com segurança.",
    href: "/servicos/plaina-de-cabecote",
    cta: "Ver plaina de cabeçote",
  },
  {
    title: "Banho químico",
    desc: "Limpeza química antes de qualquer medição. Sem a peça limpa, nenhuma medida é confiável — e é aqui que muita retífica pula etapa.",
    href: "/servicos/banho-quimico",
    cta: "Ver limpeza química",
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
    question: "Preciso levar o cabeçote até Sertãozinho?",
    answer:
      "Não. Buscamos o cabeçote em Ribeirão Preto no endereço que você indicar e devolvemos no mesmo lugar depois do serviço. A retirada é combinada pelo WhatsApp junto com o orçamento. Se preferir trazer pessoalmente, também atendemos na oficina.",
  },
  {
    question: "A busca e a entrega têm custo?",
    answer:
      "A retirada e a devolução em Ribeirão Preto estão incluídas no serviço. Como a rota já é feita, não repassamos custo de deslocamento — isso é combinado no orçamento, sem surpresa depois.",
  },
  {
    question: "Vocês fazem teste de trinca?",
    answer:
      "Sim, com equipamento próprio. Trincas finas não aparecem a olho nu e são a principal causa de retrabalho: o motor é montado, roda algumas semanas e o problema volta. Por isso a peça é testada antes de ser liberada.",
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
          <div className="flex flex-col">
            <p className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-rp-gold/40 bg-rp-gold/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-rp-gold sm:text-sm">
              Atendemos Ribeirão Preto · 19 km · buscamos e entregamos
            </p>
            <h1 className="font-heading text-3xl font-extrabold leading-tight md:text-5xl">
              Retífica de cabeçote em Ribeirão Preto —{" "}
              <span className="text-rp-gold">a gente busca, retifica e devolve</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
              Você não precisa levar nada. Buscamos o cabeçote em Ribeirão
              Preto, fazemos o serviço na nossa oficina em Sertãozinho e
              devolvemos no mesmo endereço, com garantia por escrito.
              Orçamento pelo WhatsApp em até 2 horas.
            </p>

            {/* Selos: as três objeções de quem busca "retífica em Ribeirão Preto",
                respondidas antes de qualquer rolagem.
                No celular ficam DEPOIS dos botões (order-2): 74% do tráfego pago
                é mobile e o WhatsApp não pode sair da primeira dobra. */}
            <ul className="order-2 mt-6 grid gap-2 sm:order-none sm:mt-7 sm:gap-2.5 sm:grid-cols-3">
              {heroBadges.map((badge) => (
                <li
                  key={badge.title}
                  className="rounded-xl border border-white/15 bg-white/8 px-4 py-3 backdrop-blur-sm"
                >
                  <p className="font-heading text-sm font-bold text-white">
                    <span aria-hidden="true" className="mr-1.5">
                      {badge.icon}
                    </span>
                    {badge.title}
                  </p>
                  <p className="mt-0.5 text-xs leading-snug text-white/70">
                    {badge.desc}
                  </p>
                </li>
              ))}
            </ul>

            <div className="order-1 mt-7 flex flex-col gap-3 sm:order-none sm:mt-8 sm:flex-row">
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

          {/* Assim que `videos.ribeiraoPretoHero.youtubeId` for preenchido, o vídeo
              substitui a foto automaticamente. Sem vídeo, mantém a fachada. */}
          {videos.ribeiraoPretoHero.youtubeId ? (
            <div className="mx-auto w-full max-w-[560px]">
              <VideoEmbed
                slot={videos.ribeiraoPretoHero}
                eventLabel="ribeirao_preto_hero_video"
              />
            </div>
          ) : (
            <div className="relative mx-auto aspect-[4/3] w-full max-w-[560px] overflow-hidden rounded-lg border border-white/15 bg-white/8 shadow-2xl">
              <Image
                src="/oficina.jpeg"
                alt="Fachada da Retífica Premium em Sertãozinho-SP, que atende Ribeirão Preto"
                fill
                sizes="(max-width: 768px) 92vw, 560px"
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>
      </section>

      {/* BLOCO DE CONQUISTA — primeira seção depois da dobra.
          Fica aqui de propósito: é o argumento para quem chegou comparando com
          outra retífica e precisa decidir em segundos. */}
      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-rp-accent">
              Comparando retíficas?
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
              Por que sair de Ribeirão Preto compensa
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-700 md:text-lg">
              A retífica mais perto de você é a que fica no seu bairro. A
              questão não é distância — é o que você recebe de volta.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {vantagens.map((item) => (
              <article
                key={item.title}
                className="rounded-xl border border-[#E8EEF8] bg-[#F8FBFF] p-5 shadow-sm"
              >
                <h3 className="font-heading text-lg font-bold text-[#053282]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-700">
                  {item.desc}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <TrackedWhatsAppLink
              eventLabel="ribeirao_preto_vantagens_whatsapp"
              message={whatsappMessage}
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#25D366] px-8 text-sm font-bold text-[#052E16] transition-all hover:brightness-110 md:h-14 md:text-base"
            >
              Pedir orçamento no WhatsApp
            </TrackedWhatsAppLink>
            <TrackedPhoneLink
              eventLabel="ribeirao_preto_vantagens_phone"
              className="inline-flex h-12 items-center justify-center rounded-full border border-[#053282] px-8 text-sm font-bold text-[#053282] transition-all hover:bg-[#D9E7FF] md:h-14 md:text-base"
            >
              Ligar {siteConfig.phone.display}
            </TrackedPhoneLink>
          </div>
        </div>
      </section>

      {/* TECNOLOGIA — o diferencial que a retífica de bairro não tem.
          O vídeo do teste de trinca entra aqui quando estiver pronto. */}
      <section className="bg-[#051B3D] py-14 text-white md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-rp-gold">
              Tecnologia e processo
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold leading-tight md:text-5xl">
              O que a gente mede antes de liberar a peça
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/78 md:text-lg">
              Retrabalho não acontece por azar. Acontece quando alguém monta o
              motor sem ter testado o que não dá para ver.
            </p>
          </div>

          {videos.tecnologiaTesteTrinca.youtubeId ? (
            <div className="mx-auto mt-10 max-w-3xl">
              <VideoEmbed
                slot={videos.tecnologiaTesteTrinca}
                eventLabel="ribeirao_preto_video_teste_trinca"
              />
            </div>
          ) : null}

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {tecnologia.map((item) => (
              <article
                key={item.title}
                className="flex flex-col rounded-xl border border-white/15 bg-white/8 p-5"
              >
                <h3 className="font-heading text-xl font-bold text-rp-gold">
                  {item.title}
                </h3>
                <p className="mt-2 grow text-sm leading-relaxed text-white/80">
                  {item.desc}
                </p>
                <Link
                  href={item.href}
                  className="mt-4 inline-block text-sm font-semibold text-white underline decoration-rp-gold underline-offset-4 hover:text-rp-gold"
                >
                  {item.cta} →
                </Link>
              </article>
            ))}
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

          {videos.ribeiraoPretoLogistica.youtubeId ? (
            <div className="mx-auto mt-10 max-w-3xl">
              <VideoEmbed
                slot={videos.ribeiraoPretoLogistica}
                eventLabel="ribeirao_preto_video_logistica"
              />
            </div>
          ) : null}
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
