import Image from "next/image";
import type { Metadata } from "next";
import {
  BreadcrumbSchema,
  FAQSchema,
  RibeiraoPretoServiceSchema,
} from "@/components/site/StructuredData";
import {
  TrackedCtaLink,
  TrackedPhoneLink,
  TrackedServiceLink,
  TrackedWhatsAppLink,
} from "@/components/site/TrackedLinks";
import { VideoEmbed } from "@/components/site/VideoEmbed";
import { NumerosProva } from "@/components/site/NumerosProva";
import { PrecoPrazoGarantia } from "@/components/site/PrecoPrazoGarantia";
import { numerosProva } from "@/lib/prova";
import { serviceDetailPages, servicePath } from "@/lib/service-pages";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { videos } from "@/lib/videos";

const pagePath = "/retifica-em-ribeirao-preto";

const whatsappMessage =
  "Olá, sou de Ribeirão Preto e vim pelo site da Retífica Premium. Gostaria de um orçamento para retífica de cabeçote.";

export const metadata: Metadata = {
  title: "Retífica de Cabeçote para Ribeirão Preto | Sertãozinho-SP",
  description:
    "Retífica de cabeçote, plaina e teste de trinca para Ribeirão Preto, com oficina em Sertãozinho-SP. Consulte avaliação, prazo e logística pelo WhatsApp.",
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

/** Selos da primeira dobra: respondem logística, prazo e garantia sem prometer
 * condições que dependem da avaliação ou da rota do dia. */
const heroBadges = [
  {
    icon: "🚚",
    title: "Logística combinada",
    desc: "Consulte disponibilidade, rota e condições para a sua peça",
  },
  {
    icon: "⏱",
    title: "Prazo confirmado antes",
    desc: "Depois de identificar a peça e o escopo necessário",
  },
  {
    icon: "🛡",
    title: "Garantia do serviço",
    desc: "6 meses sobre o serviço executado",
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
    title: "Combinamos a logística",
    desc: "Confirmamos pelo WhatsApp se há retirada ou entrega disponível para o endereço e a data informados.",
  },
  {
    title: "Serviço e orientação",
    desc: "Executamos o que foi aprovado, conferimos a peça e explicamos os cuidados de montagem e a cobertura do serviço.",
  },
];

/** Bloco de conquista: fala com quem chegou buscando outra retífica de Ribeirão
 *  Preto. Sem citar nome de concorrente — política do Google e bom senso. */
const vantagens = [
  {
    title: "Logística antes de sair",
    desc: "Você confirma pelo WhatsApp se há rota disponível ou se é melhor levar a peça diretamente à oficina em Sertãozinho.",
  },
  {
    title: "Foco em cabeçotes desde 2004",
    desc: "A avaliação, a usinagem e a montagem são organizadas em torno das medições próprias desse conjunto.",
  },
  {
    title: "Teste de trinca com equipamento próprio",
    desc: "Algumas fissuras não aparecem na inspeção visual. O teste ajuda a confirmar o estado da peça antes de decidir reparo, solda ou substituição.",
  },
  {
    title: "Diagnóstico antes do orçamento",
    desc: "A medição de empeno, sedes, guias e vedação ajuda a definir quais operações devem entrar no orçamento.",
  },
  {
    title: "Serviço explicado",
    desc: "A equipe informa o que foi verificado, quais operações foram aprovadas e como funciona a garantia do serviço executado.",
  },
  {
    title: "Oficina próxima da região",
    desc: "A distância até Sertãozinho é de aproximadamente 19 km, variando conforme o ponto de saída e a rota.",
  },
];

/** Pontos técnicos que ajudam a entender por que a peça precisa ser avaliada. */
const tecnologia = [
  {
    title: "Teste de trinca",
    desc: "Equipamento próprio para investigar trincas que podem não aparecer a olho nu. Uma falha não identificada pode provocar vazamento e retrabalho após a montagem.",
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
    desc: "A limpeza remove resíduos que podem esconder defeitos ou interferir na leitura da superfície antes das medições.",
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
    title: "Garantia do serviço executado",
    desc: "A cobertura de 6 meses se aplica ao serviço realizado; condições e limites são confirmados no atendimento.",
  },
  {
    title: "A 19 km de Ribeirão Preto",
    desc: "A distância aproximada varia conforme o ponto de saída e a rota. Confirme o melhor caminho antes de sair.",
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
      "Depende da rota e da disponibilidade. Informe o endereço e a situação da peça pelo WhatsApp; a equipe confirma se há retirada ou entrega disponível. Você também pode levar a peça diretamente à oficina.",
  },
  {
    question: "A busca e a entrega têm custo?",
    answer:
      "Disponibilidade, prazo e eventual custo de retirada ou entrega são confirmados antes do serviço, conforme endereço, rota e volume da peça.",
  },
  {
    question: "Vocês fazem teste de trinca?",
    answer:
      "Sim. O teste procura fissuras ou vazamentos que podem não aparecer visualmente e ajuda a orientar a decisão sobre reparo, solda ou substituição.",
  },
  {
    question: "Qual o prazo para quem está em Ribeirão Preto?",
    answer:
      "O prazo depende do conjunto, das medições, das peças necessárias e da logística. A equipe confirma a previsão antes da aprovação do serviço.",
  },
  {
    question: "Vale a pena sair de Ribeirão Preto para retificar em Sertãozinho?",
    answer:
      "A oficina fica em Sertãozinho, a aproximadamente 19 km de Ribeirão Preto. Antes de sair, confirme atendimento e logística; a peça é medida antes da definição do serviço.",
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
              Atendemos Ribeirão Preto · oficina em Sertãozinho-SP
            </p>
            <h1 className="font-heading text-3xl font-extrabold leading-tight md:text-5xl">
              Retífica de cabeçote para Ribeirão Preto —{" "}
              <span className="text-rp-gold">medição antes da decisão</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
              Conte o que aconteceu e onde a peça está. A equipe orienta a
              avaliação, confirma prazo e informa se há logística disponível
              para a sua região antes da aprovação.
            </p>

            {/* Selos: as três objeções de quem busca "retífica em Ribeirão Preto",
                respondidas antes de qualquer rolagem. No celular ficam depois
                dos botões para manter o contato na primeira tela. */}
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

            <NumerosProva numeros={numerosProva} tom="claro" className="order-4 mt-7 sm:order-none" />
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

      {/* Preço, prazo e garantia vêm logo depois da dobra. */}
      <PrecoPrazoGarantia
        contexto="ribeirao_preto"
        whatsappMessage={whatsappMessage}
        fundo="creme"
      />

      {/* BLOCO DE CONQUISTA — o argumento para quem chegou comparando com outra
          retífica e precisa decidir em segundos. */}
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

      {/* TECNOLOGIA — o vídeo real do teste entra aqui quando estiver pronto. */}
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
              Algumas condições só aparecem depois da limpeza, da medição e do
              teste. Conferir antes ajuda a decidir o próximo passo com mais informação.
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
                <TrackedServiceLink
                  href={item.href}
                  serviceName={item.title}
                  trackingPosition="ribeirao_technology"
                  className="mt-4 inline-block text-sm font-semibold text-white underline decoration-rp-gold underline-offset-4 hover:text-rp-gold"
                >
                  {item.cta} →
                </TrackedServiceLink>
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
              Do primeiro contato à conclusão do serviço, o processo e a
              logística disponível são confirmados pelo WhatsApp.
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
              <TrackedServiceLink
                key={service.slug}
                href={servicePath(service.slug)}
                serviceName={service.shortTitle}
                trackingPosition="ribeirao_service_catalog"
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
              </TrackedServiceLink>
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
              Atendimento regional com oficina em Sertãozinho
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/78 md:text-lg">
              A oficina fica a aproximadamente 19 km de Ribeirão Preto. O
              atendimento confirma rota, prazo e condição da peça antes da aprovação.
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
