import type { Metadata } from "next";
import Image from "next/image";
import {
  BreadcrumbSchema,
  FAQSchema,
} from "@/components/site/StructuredData";
import { ContatoWhatsAppForm } from "@/components/site/ContatoWhatsAppForm";
import {
  TrackedCtaLink,
  TrackedPhoneLink,
  TrackedWhatsAppLink,
} from "@/components/site/TrackedLinks";
import { VideoEmbed } from "@/components/site/VideoEmbed";
import { siteConfig } from "@/lib/site";
import { videos } from "@/lib/videos";

export const metadata: Metadata = {
  title: "Parceria B2B para Oficinas | Retífica Premium",
  description:
    "Parceria B2B para oficinas: logística de cabeçotes, apoio técnico, materiais comerciais e automação para crescer com a Retífica Premium.",
  alternates: {
    canonical: "/b2b",
  },
  openGraph: {
    title: "Parceria B2B para Oficinas | Retífica Premium",
    description:
      "Uma parceria para oficinas que querem resolver cabeçotes com segurança e transformar volume em estrutura comercial.",
    url: "https://www.premiumretifica.com.br/b2b",
    siteName: "Retífica Premium",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/oficina.jpeg",
        width: 1200,
        height: 630,
        alt: "Oficina parceira da Retífica Premium",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Parceria B2B para Oficinas | Retífica Premium",
    description:
      "Envie cabeçotes com previsibilidade e receba estrutura para vender, organizar e atender melhor.",
    images: ["/oficina.jpeg"],
  },
};

const b2bWhatsAppMessage =
  "Olá, vim pela página de parceria B2B da Retífica Premium. Tenho uma oficina e quero entender como funciona para enviar cabeçotes e receber os benefícios.";
const b2bWhatsAppUrl = `https://wa.me/${
  siteConfig.whatsapp.number
}?text=${encodeURIComponent(b2bWhatsAppMessage)}`;

const heroProofs = [
  "Retirada e entrega combinadas",
  "Garantia por escrito para apresentar ao cliente",
  "Site, sistema e apoio comercial para a oficina parceira",
];

const mechanicPains = [
  {
    label: "Reputação",
    title: "Não passar vergonha com o cliente",
    description:
      "Quando o cabeçote vai para fora, o cliente não quer saber quem executou cada etapa. Ele cobra prazo, explicação e garantia da sua oficina.",
    result: "A parceria precisa proteger o seu nome.",
  },
  {
    label: "Margem",
    title: "Cobrar melhor pelo serviço certo",
    description:
      "Serviço de cabeçote mal explicado vira briga por preço. Com apoio técnico e material certo, fica mais fácil mostrar valor antes do cliente pechinchar.",
    result: "Mais argumento para defender orçamento.",
  },
  {
    label: "Atendimento",
    title: "Não deixar oportunidade morrer no WhatsApp",
    description:
      "Muito dono de oficina perde venda porque o retorno ficou perdido entre áudio, caderno e correria do box. Organização também é dinheiro.",
    result: "Mais controle sobre quem pediu preço.",
  },
];

const valueColumns = {
  common: [
    "Ganho por serviço ou negociação",
    "Pouca prova técnica para mostrar ao cliente",
    "WhatsApp e orçamento continuam desorganizados",
    "A oficina continua invisível para muita busca local",
  ],
  premium: [
    "Apoio para explicar o serviço e entregar com mais segurança",
    "Garantia, orientação e comunicação mais segura",
    "Ferramentas digitais para organizar orçamento e retorno",
    "Presença digital preparada para atrair e converter clientes",
  ],
};

const benefitShowcases = [
  {
    icon: "tool",
    kicker: "Serviço técnico",
    title: "Cabeçote explicado sem enrolação",
    description:
      "Você recebe apoio para explicar plaina, trinca, sede, válvula, junta queimada e superaquecimento de um jeito que o cliente entende e confia.",
    bullets: [
      "Orientação para defender o orçamento sem virar briga por preço.",
      "Garantia e explicação mais clara para apresentar ao cliente.",
      "Material para mostrar o problema e o serviço feito.",
    ],
    videoTitle: "Vídeo futuro: explicação do cabeçote na bancada",
    videoHint:
      "Coloque aqui um vídeo curto mostrando peça, medição, plaina ou teste, com legenda simples para o dono da oficina usar na venda.",
  },
  {
    icon: "route",
    kicker: "Rotina da oficina",
    title: "Cabeçote circulando sem travar o box",
    description:
      "A parceria organiza retirada, entrega e alinhamento de prazo para reduzir deslocamento, interrupção e retrabalho no atendimento.",
    bullets: [
      "Combinado claro de retirada e entrega conforme rota.",
      "Menos tempo perdido levando peça de um lado para outro.",
      "Mais previsibilidade para avisar o cliente final.",
    ],
    videoTitle: "Vídeo futuro: retirada, entrega e fluxo da peça",
    videoHint:
      "Reserve um vídeo com a rotina de coleta, conferência e devolução do cabeçote para mostrar que a operação tem processo.",
  },
  {
    icon: "search",
    kicker: "Posicionamento no Google",
    title: "Sua oficina mais fácil de encontrar",
    description:
      "A oficina parceira ganha uma presença digital mais profissional, com páginas, textos, fotos, chamadas e estrutura para transformar busca local em contato.",
    bullets: [
      "Serviços organizados para quem pesquisa antes de chamar.",
      "Chamadas claras para WhatsApp, ligação e orçamento.",
      "Estrutura para campanhas e melhoria de presença local.",
    ],
    videoTitle: "Vídeo futuro: cliente pesquisando no Google",
    videoHint:
      "Aqui cabe um mini vídeo: alguém pesquisa por mecânica/retífica, encontra a oficina bem posicionada, clica e chama no WhatsApp.",
  },
  {
    icon: "inbox",
    kicker: "Atendimento e orçamento",
    title: "Oportunidade não fica perdida no WhatsApp",
    description:
      "A ideia é tirar orçamento, retorno e serviço da conversa solta. Você passa a enxergar o que entrou, quem respondeu e o que precisa de cobrança.",
    bullets: [
      "Lista de orçamentos e retornos em aberto.",
      "Histórico básico para não depender de memória.",
      "Mais clareza sobre quem pediu preço e pode fechar.",
    ],
    videoTitle: "Vídeo futuro: sistema organizando orçamentos",
    videoHint:
      "Use este espaço para um vídeo do sistema mostrando cards de orçamento, status de retorno e clientes que precisam de resposta.",
  },
  {
    icon: "megaphone",
    kicker: "Venda e confiança",
    title: "Material para cobrar melhor pelo serviço",
    description:
      "Textos, chamadas, fotos e explicações ajudam o cliente a entender por que cabeçote não é só preço. Isso aumenta confiança antes da aprovação.",
    bullets: [
      "Argumentos para explicar valor antes do desconto.",
      "Fotos e textos que passam mais profissionalismo.",
      "Conteúdo para WhatsApp, site e campanha.",
    ],
    videoTitle: "Vídeo futuro: antes e depois da apresentação",
    videoHint:
      "Coloque um vídeo comparando uma explicação fraca com uma apresentação profissional do serviço e da garantia.",
  },
  {
    icon: "growth",
    kicker: "Crescimento real",
    title: "Benefício aumenta conforme a parceria cresce",
    description:
      "Quanto mais recorrente for a parceria, mais estrutura faz sentido: presença digital, sistema, campanhas, automações e acompanhamento.",
    bullets: [
      "Nível definido por volume mensal enviado para a Retífica Premium.",
      "Benefícios avançam junto com previsibilidade e recorrência.",
      "A oficina cresce com processo, não só com comissão.",
    ],
    videoTitle: "Vídeo futuro: evolução da oficina parceira",
    videoHint:
      "Aqui pode entrar um vídeo com a jornada do parceiro: primeiro serviço, recorrência, organização, campanha e mais contatos.",
  },
];

const gawiCapabilities = [
  {
    title: "Automação de processos manuais",
    description:
      "Para tirar tarefas repetitivas do papel, da planilha e das conversas soltas no WhatsApp.",
  },
  {
    title: "Atendente no WhatsApp",
    description:
      "Robôs que respondem 24 horas, coletam dados do cliente e ajudam a organizar oportunidades antes do retorno da oficina.",
  },
  {
    title: "Sistemas personalizados",
    description:
      "Ferramentas sob medida para controlar orçamentos, retornos, serviços e informações que hoje ficam espalhadas.",
  },
  {
    title: "Mais tempo para vender",
    description:
      "Menos trabalho repetitivo e mais clareza para acompanhar quem pediu orçamento, quem precisa de resposta e quem pode fechar.",
  },
];

const processSteps = [
  {
    label: "01",
    title: "Avaliamos a rotina da sua oficina",
    description:
      "Entendemos volume de cabeçotes, cidades atendidas, gargalos no atendimento e como você fecha orçamento hoje.",
  },
  {
    label: "02",
    title: "Combinamos a operação de envio",
    description:
      "Definimos retirada, entrega, comunicação, garantia e o jeito certo de explicar o serviço para o cliente final.",
  },
  {
    label: "03",
    title: "Ativamos sua estrutura comercial",
    description:
      "Entram site, organização de contatos, conteúdo, melhoria do WhatsApp e material de apoio conforme o nível da parceria.",
  },
  {
    label: "04",
    title: "Medimos e melhoramos",
    description:
      "O foco é acompanhar contatos, orçamentos e oportunidades para que a parceria gere venda, não só movimento.",
  },
];

const tiers = [
  {
    name: "Essencial",
    slug: "essencial",
    range: "R$ 8 mil a R$ 15 mil/mês em serviços",
    accent: "#A97142",
    focus: "Operação confiável",
    fit: "Para oficina que já envia cabeçotes, mas ainda está começando a criar rotina com a Retífica Premium.",
    benefits: [
      "Canal direto para cabeçotes e dúvidas técnicas",
      "Retirada e entrega combinadas conforme rota",
      "Garantia por escrito para apoiar a venda",
      "Página simples ou presença digital inicial da oficina",
    ],
  },
  {
    name: "Crescimento",
    slug: "crescimento",
    range: "R$ 15 mil a R$ 25 mil/mês em serviços",
    accent: "#7C8B9A",
    focus: "Presença digital e captação",
    fit: "Para oficina com recorrência e oportunidade de transformar indicação em presença digital mais forte.",
    benefits: [
      "Site da oficina com serviços e chamada para WhatsApp",
      "Apoio em Google, fotos, textos e apresentação comercial",
      "Organização de orçamentos e retornos em sistema",
      "Materiais para explicar cabeçote, plaina, trinca e válvulas",
    ],
  },
  {
    name: "Performance",
    slug: "performance",
    range: "R$ 25 mil a R$ 50 mil/mês em serviços",
    accent: "#D9A321",
    focus: "Gestão de oportunidades",
    fit: "Para oficina que já tem volume relevante e precisa acompanhar contatos, orçamentos e campanhas com mais controle.",
    benefits: [
      "Sistema ajustado ao fluxo real da oficina",
      "Acompanhamento de métricas de contato e conversão",
      "Conteúdo e campanhas preparados para Google Ads",
      "Prioridade no planejamento da rotina B2B",
    ],
  },
  {
    name: "Diamante",
    slug: "diamante",
    range: "R$ 50 mil+/mês em serviços",
    accent: "#49B7D9",
    focus: "Autoridade local",
    fit: "Para parceiro estratégico que quer virar referência regional e operar com acompanhamento mais próximo.",
    benefits: [
      "Estratégia digital contínua para a oficina",
      "Campanhas, páginas e materiais por serviços estratégicos",
      "Apoio para transformar especialidade em diferenciação",
      "Plano de crescimento acompanhado de perto",
    ],
  },
];

const faqItems = [
  {
    question: "A oficina precisa mandar todos os cabeçotes para a Retífica Premium?",
    answer:
      "Não. A parceria começa com uma conversa sobre volume real, rotina e potencial. Quanto mais recorrente e organizada for a parceria, mais benefícios fazem sentido para os dois lados.",
  },
  {
    question: "Tem mensalidade para receber site, sistema e apoio comercial?",
    answer:
      "A proposta B2B é que a oficina parceira receba esses benefícios dentro da relação comercial com a Retífica Premium, sem mensalidade tradicional. Os detalhes são combinados conforme volume e nível da parceria.",
  },
  {
    question: "Isso substitui a comissão ou desconto comum por serviço?",
    answer:
      "A ideia é transformar uma vantagem pontual em estrutura permanente: apoio técnico, presença digital, organização e captação. A conversa é feita caso a caso para a parceria continuar justa.",
  },
  {
    question: "Atende oficinas de Ribeirão Preto, Pontal, Dumont e Cravinhos?",
    answer:
      "A Retífica Premium atende Sertãozinho e região. A viabilidade de retirada, entrega e rotina B2B depende da cidade, volume e frequência de envio.",
  },
];

function CheckIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12.5l4 4 10-10" />
    </svg>
  );
}

function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function BenefitIcon({
  icon,
  className = "h-6 w-6",
}: {
  icon: string;
  className?: string;
}) {
  const commonProps = {
    className,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (icon === "route") {
    return (
      <svg viewBox="0 0 24 24" {...commonProps}>
        <path d="M6 19c-2.2 0-4-1.8-4-4s1.8-4 4-4h12a4 4 0 0 0 0-8h-2" />
        <path d="M8 19h10" />
        <path d="M16 3l-3 3 3 3" />
        <path d="M6 15h.01" />
      </svg>
    );
  }

  if (icon === "search") {
    return (
      <svg viewBox="0 0 24 24" {...commonProps}>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="M15.5 15.5 21 21" />
        <path d="M7.5 10.5h6" />
        <path d="M10.5 7.5v6" />
      </svg>
    );
  }

  if (icon === "inbox") {
    return (
      <svg viewBox="0 0 24 24" {...commonProps}>
        <path d="M4 5h16v14H4z" />
        <path d="M4 14h4l2 3h4l2-3h4" />
        <path d="M8 9h8" />
        <path d="M8 12h5" />
      </svg>
    );
  }

  if (icon === "megaphone") {
    return (
      <svg viewBox="0 0 24 24" {...commonProps}>
        <path d="M4 13h3l10 5V6L7 11H4z" />
        <path d="M7 13l2 7h3" />
        <path d="M19 9.5c1 .6 1.5 1.5 1.5 2.5S20 13.9 19 14.5" />
      </svg>
    );
  }

  if (icon === "growth") {
    return (
      <svg viewBox="0 0 24 24" {...commonProps}>
        <path d="M4 19V5" />
        <path d="M4 19h16" />
        <path d="m7 15 4-4 3 3 5-7" />
        <path d="M16 7h3v3" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" {...commonProps}>
      <path d="M14.7 6.3a4 4 0 0 0-5 5L4 17v3h3l5.7-5.7a4 4 0 0 0 5-5" />
      <path d="m14 7 3 3" />
      <path d="M12 18h8" />
    </svg>
  );
}

function VideoPlaceholder({
  title,
  hint,
}: {
  title: string;
  hint: string;
}) {
  return (
    <div className="relative overflow-hidden border border-white/12 bg-[#0A1424] shadow-[0_26px_80px_rgba(0,0,0,0.25)]">
      <div className="aspect-video bg-[radial-gradient(circle_at_30%_20%,rgba(245,184,46,0.28),transparent_28%),linear-gradient(135deg,rgba(29,95,170,0.22),rgba(7,17,31,0.92))] p-5 md:p-6">
        <div className="flex h-full flex-col justify-between">
          <div className="flex items-center justify-between gap-4">
            <span className="rounded-full border border-white/16 bg-white/8 px-3 py-1 font-body text-xs font-bold uppercase text-white/72">
              Espaço para vídeo
            </span>
            <span className="grid h-11 w-11 place-items-center rounded-full bg-[#F5B82E] text-[#07111F]">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </div>
          <div>
            <p className="max-w-xl font-heading text-xl font-bold leading-tight text-white sm:text-2xl md:text-3xl">
              {title}
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 bg-white/[0.04] p-4">
        <p className="font-body text-sm leading-6 text-white/64">{hint}</p>
        <div className="mt-3 grid grid-cols-8 gap-1">
          {Array.from({ length: 8 }).map((_, index) => (
            <span
              key={`video-progress-${index}`}
              className="h-1.5 rounded-full bg-white/12"
              style={{ opacity: index === 0 ? 1 : 0.35 + index * 0.06 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function B2BPage() {
  return (
    <main className="min-h-screen bg-[#F6F7F4] text-[#0F1B2A]">
      <section className="relative overflow-hidden bg-[#07111F] text-white">
        <div className="absolute inset-0">
          <Image
            src="/oficina.jpeg"
            alt=""
            fill
            sizes="100vw"
            className="hidden object-cover opacity-22 md:block"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,184,46,0.16),transparent_34%),linear-gradient(180deg,rgba(7,17,31,0.94)_0%,rgba(7,17,31,0.98)_78%,#0A1424_100%)]" />
        </div>

        <div className="relative mx-auto flex min-h-[620px] max-w-7xl flex-col items-center justify-center px-4 pb-20 pt-16 text-center sm:px-6 md:min-h-[680px] md:pt-24 lg:px-8">
          <div className="max-w-5xl">
            <p className="font-body text-sm font-bold uppercase text-[#F5B82E]">
              Parceria B2B para oficinas mecânicas
            </p>
            <h1 className="mx-auto mt-5 max-w-5xl font-heading text-[34px] font-bold leading-[1.06] text-white sm:text-[46px] md:text-[58px] lg:text-[68px]">
              Unidos pelo sucesso do seu negócio com{" "}
              <span className="b2b-typewriter-slot text-[#F5B82E]">
                <span className="b2b-typewriter">soluções inteligentes</span>
              </span>{" "}
              para parceiros Retífica Premium.
            </h1>
            <p className="mx-auto mt-6 max-w-3xl font-body text-lg leading-8 text-white/84 md:text-xl">
              Envie cabeçotes para a Retífica Premium e transforme uma relação
              de serviço em uma parceria que ajuda sua oficina a vender melhor,
              atender com mais segurança e organizar oportunidades.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <TrackedWhatsAppLink
                href={b2bWhatsAppUrl}
                eventLabel="b2b_hero_whatsapp"
                message={b2bWhatsAppMessage}
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#F5B82E] px-7 font-body text-sm font-extrabold text-[#07111F] shadow-[0_18px_48px_rgba(245,184,46,0.30)] ring-1 ring-[#FFE08A]/45 transition hover:-translate-y-0.5 hover:bg-[#FFD45A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F5B82E] md:text-base"
              >
                Quero avaliar a parceria
                <ArrowIcon />
              </TrackedWhatsAppLink>
              <TrackedCtaLink
                href="#como-funciona"
                eventLabel="b2b_hero_how_it_works"
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/28 px-7 font-body text-sm font-bold text-white transition hover:bg-white/10 md:text-base"
              >
                Ver como funciona
              </TrackedCtaLink>
            </div>

            <div className="mx-auto mt-9 grid max-w-4xl gap-3 sm:grid-cols-3">
              {heroProofs.map((proof) => (
                <div
                  key={proof}
                  className="flex items-start gap-3 border border-white/12 bg-white/[0.06] p-4 text-left backdrop-blur transition hover:border-[#F5B82E]/45 hover:bg-white/[0.09]"
                >
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F5B82E] text-[#07111F]">
                    <CheckIcon />
                  </span>
                  <span className="font-body text-sm font-semibold leading-5 text-white/88">
                    {proof}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0A1424] py-16 text-white md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(29,95,170,0.24)_0%,transparent_32%),radial-gradient(circle_at_bottom_right,rgba(245,184,46,0.16),transparent_32%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div className="max-w-xl">
              <p className="font-body text-sm font-bold uppercase text-[#F5B82E]">
                Antes de falarmos de Benefícios
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold leading-tight md:text-5xl">
                A parceria só vale se melhorar a rotina da oficina.
              </h2>
              <p className="mt-5 font-body text-lg leading-8 text-white/72">
                O dono de oficina não compra uma promessa bonita. Ele quer
                entregar bem, defender preço, responder cliente rápido e não
                ficar na mão quando o cabeçote vira assunto delicado.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {mechanicPains.map((pain, index) => (
                <article
                  key={pain.title}
                  className="group border border-white/10 bg-white/[0.055] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#F5B82E]/55 hover:bg-white/[0.085]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-body text-xs font-bold uppercase text-[#F5B82E]">
                      {pain.label}
                    </span>
                    <span className="font-heading text-3xl font-bold text-white/14 transition group-hover:text-[#F5B82E]/35">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-8 font-heading text-2xl font-bold leading-tight">
                    {pain.title}
                  </h3>
                  <p className="mt-4 font-body text-sm leading-6 text-white/68">
                    {pain.description}
                  </p>
                  <p className="mt-6 border-t border-white/10 pt-4 font-body text-sm font-bold text-white">
                    {pain.result}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-body text-sm font-bold uppercase text-[#1D5FAA]">
              A troca de valor
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-tight text-[#07111F] md:text-5xl">
              Quando se é parceiro da Retífica Premium, a oficina cresce de
              outro jeito.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <div className="border border-[#D7DDE5] bg-[#F8FAFC] p-6 md:p-8">
              <p className="font-body text-sm font-bold uppercase text-[#6B7787]">
                Negociação comum
              </p>
              <h3 className="mt-3 font-heading text-3xl font-bold text-[#243247]">
                Ajuda no serviço de hoje
              </h3>
              <ul className="mt-6 space-y-4">
                {valueColumns.common.map((item) => (
                  <li key={item} className="flex gap-3 font-body text-[#536171]">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#9AA6B2]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-[#F5B82E]/55 bg-[#07111F] p-6 text-white shadow-[0_24px_60px_rgba(7,17,31,0.20)] md:p-8">
              <p className="font-body text-sm font-bold uppercase text-[#F5B82E]">
                Parceria Premium
              </p>
              <h3 className="mt-3 font-heading text-3xl font-bold">
                Ajuda a oficina a vender amanhã também
              </h3>
              <ul className="mt-6 space-y-4">
                {valueColumns.premium.map((item) => (
                  <li key={item} className="flex gap-3 font-body text-white/84">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F5B82E] text-[#07111F]">
                      <CheckIcon />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#120B2A] py-16 text-white md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(196,181,253,0.28),transparent_30%),linear-gradient(135deg,rgba(7,17,31,0.72)_0%,rgba(18,11,42,0.98)_62%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch lg:px-8">
          <div className="border border-white/12 bg-white/[0.06] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.22)] backdrop-blur md:p-8">
            <p className="font-body text-sm font-bold uppercase text-[#C4B5FD]">
              Tecnologia dentro da parceria
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-tight md:text-5xl">
              Temos parceria com a{" "}
              <span className="gawi-word">GAWI</span>.
            </h2>
            <h3 className="mt-7 font-heading text-2xl font-bold text-white">
              Quem é a GAWI?
            </h3>
            <p className="mt-3 font-body text-lg leading-8 text-white/76">
              A GAWI é especialista em desenvolvimento de automações e sistemas
              personalizados para empresas. Está precisando automatizar
              processos manuais? A GAWI sabe exatamente o que fazer.
            </p>
            <p className="mt-4 font-body text-base font-semibold leading-7 text-white/68">
              Precisa de um atendente no WhatsApp? A GAWI cria robôs para
              atender 24 horas por dia, organizar pedidos e reduzir trabalho
              repetitivo na operação.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {gawiCapabilities.map((capability) => (
              <article
                key={capability.title}
                className="group border border-white/10 bg-[#0B1022]/70 p-6 transition duration-300 hover:-translate-y-1 hover:border-[#C4B5FD]/60 hover:bg-[#151033]"
              >
                <div className="mb-5 h-1.5 w-16 rounded-full bg-[#C4B5FD] transition group-hover:w-24" />
                <h3 className="font-heading text-2xl font-bold leading-tight text-white">
                  {capability.title}
                </h3>
                <p className="mt-3 font-body text-sm leading-6 text-white/68">
                  {capability.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#07111F] py-16 text-white md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="font-body text-sm font-bold uppercase text-[#F5B82E]">
              O que entra na parceria
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-tight md:text-5xl">
              Benefícios que o dono da oficina consegue enxergar.
            </h2>
            <p className="mt-5 font-body text-lg leading-8 text-white/72">
              Em vez de falar só em comissão, a parceria mostra como a oficina
              pode vender melhor, atender com mais controle e parecer mais
              profissional para quem pesquisa antes de fechar.
            </p>
          </div>

          <div className="mt-12 space-y-6 md:space-y-8">
            {benefitShowcases.map((benefit, index) => (
              <article
                key={benefit.title}
                className="group grid gap-5 border border-white/10 bg-white/[0.045] p-5 shadow-[0_22px_70px_rgba(0,0,0,0.18)] transition duration-300 hover:border-[#F5B82E]/45 hover:bg-white/[0.065] md:p-6 lg:grid-cols-[0.86fr_1.14fr] lg:items-center"
              >
                <div className="order-1">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F5B82E] text-[#07111F] shadow-[0_12px_30px_rgba(245,184,46,0.22)]">
                    <BenefitIcon icon={benefit.icon} />
                  </div>
                  <p className="font-body text-xs font-bold uppercase tracking-wide text-[#F5B82E]">
                    {String(index + 1).padStart(2, "0")} / {benefit.kicker}
                  </p>
                  <h3 className="mt-3 font-heading text-3xl font-bold leading-tight md:text-4xl">
                    {benefit.title}
                  </h3>
                  <p className="mt-4 font-body text-base leading-7 text-white/72 md:text-lg md:leading-8">
                    {benefit.description}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {benefit.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-3 font-body text-sm leading-6 text-white/76"
                      >
                        <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F5B82E] text-[#07111F]">
                          <CheckIcon className="h-3.5 w-3.5" />
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="order-2">
                  <VideoPlaceholder
                    title={benefit.videoTitle}
                    hint={benefit.videoHint}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="como-funciona" className="bg-[#F6F7F4] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-body text-sm font-bold uppercase text-[#1D5FAA]">
              Como funciona
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-tight text-[#07111F] md:text-5xl">
              Um processo simples, com responsabilidade dos dois lados.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <article
                key={step.label}
                className="b2b-flow-card relative min-h-[280px] bg-white p-6 shadow-[0_18px_45px_rgba(15,27,42,0.07)]"
                style={{ animationDelay: `${index * 1.15}s` }}
              >
                <span className="font-heading text-5xl font-bold text-[#DCE5EE]">
                  {step.label}
                </span>
                <h3 className="mt-8 font-heading text-2xl font-bold leading-tight text-[#07111F]">
                  {step.title}
                </h3>
                <p className="mt-3 font-body text-sm leading-6 text-[#536171]">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {videos.b2bPartnership.youtubeId && (
        <section className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-8 max-w-2xl text-center">
              <p className="font-body text-sm font-bold uppercase text-[#1D5FAA]">
                Veja por dentro
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold text-[#07111F] md:text-4xl">
                Como a parceria funciona na rotina da oficina
              </h2>
            </div>
            <VideoEmbed slot={videos.b2bPartnership} eventLabel="b2b_video" />
          </div>
        </section>
      )}

      <section className="relative overflow-hidden bg-[#111D2E] py-16 text-white md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(245,184,46,0.10),transparent_28%,rgba(29,95,170,0.14)_82%,transparent)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="font-body text-sm font-bold uppercase text-[#F5B82E]">
                Níveis da parceria
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold leading-tight md:text-5xl">
                A oficina não entra em um plano genérico. Ela evolui conforme a
                parceria fica mais forte.
              </h2>
              <p className="mt-5 font-body text-lg leading-8 text-white/70">
                Primeiro a operação precisa funcionar. Depois entram presença
                digital, sistema, campanhas e acompanhamento. Sem prometer o que
                ainda não faz sentido para o volume da oficina.
              </p>
            </div>

            <div className="border border-white/10 bg-white/[0.045] p-5 md:p-6">
              <p className="font-body text-sm font-bold uppercase text-white/48">
                Como ler os níveis
              </p>
              <p className="mt-3 font-body text-base leading-7 text-white/76">
                Cada etapa aumenta o compromisso dos dois lados: mais volume e
                previsibilidade para a Retífica Premium, mais estrutura comercial
                e operacional para a oficina parceira.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {tiers.map((tier, index) => (
              <article
                key={tier.name}
                className="b2b-tier-card group border border-white/10 bg-[#07111F] p-6 shadow-[0_18px_48px_rgba(0,0,0,0.22)] transition duration-300 hover:-translate-y-1 hover:border-white/22"
                style={{
                  borderTopColor: tier.accent,
                  borderTopWidth: 5,
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-body text-xs font-bold uppercase text-white/45">
                      Etapa 0{index + 1}
                    </p>
                    <h3
                      className="mt-3 font-heading text-3xl font-bold"
                      style={{ color: tier.accent }}
                    >
                      {tier.name}
                    </h3>
                  </div>
                  <span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full font-heading text-xl font-bold text-[#07111F]"
                    style={{ backgroundColor: tier.accent }}
                  >
                    {index + 1}
                  </span>
                </div>

                <p className="mt-5 font-body text-xs font-bold uppercase tracking-wide text-white/45">
                  Volume indicado
                </p>
                <p className="mt-2 font-body text-sm font-bold uppercase tracking-wide text-white/72">
                  {tier.range}
                </p>
                <p className="mt-2 font-heading text-2xl font-bold leading-tight text-white">
                  {tier.focus}
                </p>
                <p className="mt-3 font-body text-sm leading-6 text-white/62">
                  {tier.fit}
                </p>

                <ul className="mt-6 space-y-3">
                  {tier.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex gap-3 font-body text-sm leading-6 text-white/72"
                    >
                      <span
                        className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[#07111F]"
                        style={{ backgroundColor: tier.accent }}
                      >
                        <CheckIcon className="h-3.5 w-3.5" />
                      </span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                <TrackedCtaLink
                  href={`/b2b?nivel_b2b=${tier.slug}#cadastro`}
                  eventLabel={`b2b_tier_${tier.slug}_cta`}
                  className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-full px-5 font-body text-sm font-extrabold text-[#07111F] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
                  style={{
                    backgroundColor: tier.accent,
                    outlineColor: tier.accent,
                  }}
                >
                  Quero esse nível
                </TrackedCtaLink>

                <div
                  className="mt-7 h-1 origin-left rounded-full transition duration-500 group-hover:scale-x-110"
                  style={{ backgroundColor: tier.accent }}
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#07111F] py-16 text-white md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:px-8">
          <div>
            <p className="font-body text-sm font-bold uppercase text-[#F5B82E]">
              Para quem essa parceria é ideal
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-tight md:text-5xl">
              Oficina que quer parar de depender só de indicação e começar a
              criar máquina de atendimento.
            </h2>
            <p className="mt-5 font-body text-lg leading-8 text-white/72">
              Se você atende bem, tem cliente recorrente e já pega serviços de
              motor/cabeçote, a parceria ajuda a transformar esse conhecimento
              em uma apresentação mais forte para quem ainda não te conhece.
            </p>
          </div>

          <div className="bg-[#F5B82E] p-6 text-[#07111F] md:p-8">
            <p className="font-body text-sm font-bold uppercase text-[#07111F]/60">
              O que a oficina passa a medir
            </p>
            <div className="mt-6 grid gap-4">
              {[
                ["Contatos recebidos", "WhatsApp, ligação e formulário"],
                ["Orçamentos em aberto", "Quem precisa de retorno"],
                ["Serviços com cabeçote", "O que está com a Retífica Premium"],
                ["Origem dos clientes", "Google, indicação, campanha ou direto"],
              ].map(([title, desc]) => (
                <div key={title} className="border-b border-[#07111F]/18 pb-4">
                  <p className="font-heading text-2xl font-bold">{title}</p>
                  <p className="mt-1 font-body text-sm font-semibold text-[#07111F]/68">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F6F7F4] py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-body text-sm font-bold uppercase text-[#1D5FAA]">
              Dúvidas de dono para dono
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-tight text-[#07111F] md:text-5xl">
              Antes de virar parceiro, você precisa entender a regra do jogo.
            </h2>
          </div>

          <div className="mt-10 divide-y divide-[#D7DDE5] bg-white px-6 shadow-[0_20px_50px_rgba(15,27,42,0.07)] md:px-8">
            {faqItems.map((item) => (
              <details key={item.question} className="group py-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-5 font-heading text-xl font-bold leading-tight text-[#07111F]">
                  {item.question}
                  <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#EEF2F7] text-[#1D5FAA] transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 font-body text-base leading-7 text-[#536171]">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section
        id="cadastro"
        className="scroll-mt-24 bg-[#07111F] py-16 text-white md:py-24"
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:px-8">
          <div>
            <p className="font-body text-sm font-bold uppercase text-[#F5B82E]">
              Próximo passo
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-tight md:text-5xl">
              Quer saber se sua oficina encaixa nessa parceria?
            </h2>
            <p className="mt-5 max-w-xl font-body text-lg leading-8 text-white/76">
              Mande uma mensagem com o nome da oficina e a cidade. A Retífica
              Premium avalia volume, rota e benefícios possíveis sem compromisso.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <TrackedWhatsAppLink
                href={b2bWhatsAppUrl}
                eventLabel="b2b_final_whatsapp"
                message={b2bWhatsAppMessage}
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 font-body text-sm font-bold text-[#052E16] shadow-[0_16px_40px_rgba(37,211,102,0.20)] transition hover:brightness-110 md:text-base"
              >
                Chamar no WhatsApp
                <ArrowIcon />
              </TrackedWhatsAppLink>
              <TrackedPhoneLink
                eventLabel="b2b_final_phone"
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/28 px-7 font-body text-sm font-bold text-white transition hover:bg-white/10 md:text-base"
              >
                Ligar {siteConfig.phone.display}
              </TrackedPhoneLink>
            </div>

            <ul className="mt-8 grid gap-3 font-body text-sm text-white/72 sm:grid-cols-2">
              {[
                "Sem compromisso na primeira conversa",
                "Foco em oficina com volume real",
                "Benefícios combinados por nível de parceria",
                "Atendimento regional conforme rota",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F5B82E] text-[#07111F]">
                    <CheckIcon className="h-3.5 w-3.5" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-white/12 bg-[#0B1727] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.28)] md:p-8">
            <div className="mb-6">
              <p className="font-body text-sm font-bold uppercase text-[#F5B82E]">
                Formulário rápido
              </p>
              <h3 className="mt-2 font-heading text-3xl font-bold leading-tight text-white">
                Receba uma conversa de parceria
              </h3>
              <p className="mt-2 font-body text-sm font-semibold leading-6 text-white/70">
                Conte sua cidade, tipo de oficina e frequência de serviços de
                cabeçote. Isso ajuda a proposta chegar mais objetiva.
              </p>
            </div>
            <ContatoWhatsAppForm defaultSubject="b2b" leadLabel="b2b_form" />
          </div>
        </div>
      </section>

      <BreadcrumbSchema
        items={[
          { name: "Início", url: "/" },
          { name: "Parceria B2B para Oficinas", url: "/b2b" },
        ]}
      />
      <FAQSchema items={faqItems} />
    </main>
  );
}
