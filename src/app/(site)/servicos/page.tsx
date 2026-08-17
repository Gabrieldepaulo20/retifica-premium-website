import Image from "next/image";
import type { Metadata } from "next";
import { Suspense } from "react";
import {
  BreadcrumbSchema,
  FAQSchema,
  RegionalServiceAreaSchema,
  ServiceSchema,
} from "@/components/site/StructuredData";
import {
  TrackedCtaLink,
  TrackedPhoneLink,
  TrackedServiceLink,
  TrackedWhatsAppLink,
} from "@/components/site/TrackedLinks";
import { ExperimentHeroCtas } from "@/components/site/ExperimentHeroCtas";
import { MidiaPlaceholder } from "@/components/site/MidiaPlaceholder";
import { PrecoPrazoGarantia } from "@/components/site/PrecoPrazoGarantia";
import { VideoEmbed } from "@/components/site/VideoEmbed";
import { GradeServicos } from "@/components/site/GradeServicos";
import { VideoLocal } from "@/components/site/VideoLocal";
import { primaryRegionalCities } from "@/lib/regional";
import { serviceDetailPages, servicePath } from "@/lib/service-pages";
import { siteConfig } from "@/lib/site";
import { serviceVideos, videos } from "@/lib/videos";

/**
 * PÁGINA DE SERVIÇOS
 *
 * Não é um catálogo. É a trilha que alguém percorre para descobrir o que a peça
 * dele tem, na mesma ordem em que a oficina trabalha: sintoma → conferência →
 * correção → entrega.
 *
 * Por que assim, e não uma grade genérica: a pesquisa de dez retíficas
 * brasileiras em 10/08/2026 mostrou que os concorrentes priorizam contato, mas
 * raramente ajudam quem ainda não sabe o nome do serviço. A Retífica Premium
 * liga sintomas, perguntas do site e catálogo sem tratar suspeita como diagnóstico.
 *
 * O diagnóstico completo está em `docs/redesign-servicos-diagnostico.md`.
 * O briefing das mídias está em `docs/redesign-servicos-midia.md`.
 *
 * O tráfego pago é majoritariamente móvel. A telemetria de duração ainda tem
 * cobertura parcial, por isso a hierarquia prioriza a primeira tela sem tratar
 * uma taxa de abandono global como fato fechado.
 */

export const metadata: Metadata = {
  title: "Serviços de Retífica de Cabeçote",
  description:
    "Motor fumando, superaquecendo, baixando óleo ou com junta queimada? Retífica de cabeçote, plaina, sedes, válvulas, guias e teste de trinca em Sertãozinho-SP. Orçamento no WhatsApp.",
  alternates: {
    canonical: "/servicos",
  },
  openGraph: {
    title: "Serviços de Retífica de Cabeçote | Retífica Premium",
    description:
      "Motor fumando, superaquecendo, baixando óleo ou com junta queimada? Diagnóstico e usinagem de cabeçote em Sertãozinho-SP, com teste de trinca antes da montagem.",
    url: "https://www.premiumretifica.com.br/servicos",
    siteName: "Retífica Premium",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/retificapremium.jpeg",
        width: 1200,
        height: 630,
        alt: "Oficina de retífica de cabeçote da Retífica Premium em Sertãozinho-SP",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Serviços de Retífica de Cabeçote | Retífica Premium",
    description:
      "Motor fumando, superaquecendo, baixando óleo ou com junta queimada? Diagnóstico e usinagem de cabeçote em Sertãozinho-SP.",
    images: ["/retificapremium.jpeg"],
  },
};

/**
 * Serviços cuja imagem em `service-pages.ts` é fotografia real da oficina.
 * Os demais têm ilustração de marca, que precisa ser contida e não recortada —
 * ícone esticado em moldura de foto ao lado de uma foto de verdade denuncia
 * improviso. Quando a foto real de cada oficina existir, é só acrescentar o
 * slug aqui.
 *
 * Pendência de mídia: 4 dos 5 serviços ainda não têm foto própria.
 */
const servicosEmDestaque = new Set([
  "retifica-de-cabecote",
  "teste-de-trinca",
  "retifica-de-sedes-e-valvulas",
]);

/** O que é conferido antes de sair um preço. Vocabulário de oficina. */
const medicoes = [
  {
    titulo: "Empeno da face",
    texto:
      "A superfície que veda contra o bloco é conferida com instrumento. É o que define se a peça precisa de plaina e quanto ainda pode ser retirado com segurança.",
  },
  {
    titulo: "Sedes e válvulas",
    texto:
      "Assentamento e vedação de cada válvula. Sede batida devolve o motor com perda de compressão mesmo com o resto perfeito.",
  },
  {
    titulo: "Guias",
    texto:
      "Folga de guia é uma das causas mais comuns de consumo de óleo que ninguém encontra no motor montado.",
  },
  {
    titulo: "Trincas",
    texto:
      "A verificação ajuda a encontrar fissuras ou vazamentos que não aparecem apenas olhando a peça. Tem seção própria logo abaixo.",
  },
];

/** Processo real, já validado no conteúdo anterior da página. */
const processo = [
  {
    titulo: "Diagnóstico inicial",
    texto:
      "Entendemos o sintoma, o histórico do veículo e o tipo de uso para orientar a desmontagem e os testes certos.",
  },
  {
    titulo: "Conferência e inspeção",
    texto:
      "Conferimos empeno, vedação, trincas, folgas, guias, sedes, válvulas e roscas antes de definir o reparo.",
  },
  {
    titulo: "Usinagem e montagem",
    texto:
      "Executamos plaina, sedes, válvulas, guias, roscas, soldas e montagem final conforme a necessidade real da peça.",
  },
  {
    titulo: "Entrega orientada",
    texto:
      "Explicamos o serviço realizado, cuidados de montagem e pontos de atenção para reduzir retrabalho.",
  },
];

/** FAQ por intenção de busca. Perguntas mantidas do conteúdo já validado. */
const faq = [
  {
    question: "Motor fumando sempre precisa de retífica?",
    answer:
      "Nem sempre. A fumaça pode vir de desgaste interno, vedação ruim, junta queimada, guias, retentores ou outros componentes. O correto é diagnosticar antes de definir retífica.",
  },
  {
    question: "Preciso retificar ou dá para trocar só a junta?",
    answer:
      "Depende do estado da peça. Se o cabeçote estiver plano, sem trinca e com sedes e guias em ordem, a troca da junta pode resolver. Se houver empeno ou trinca, trocar só a junta traz o problema de volta. É isso que a conferência responde, antes de qualquer orçamento.",
  },
  {
    question: "Motor baixando óleo pode ser problema no cabeçote?",
    answer:
      "Pode ser, especialmente quando há desgaste em guias, retentores ou vedação. Também pode envolver anéis, vazamentos e outros pontos do motor.",
  },
  {
    question: "Superaquecimento pode empenar o cabeçote?",
    answer:
      "Sim. Superaquecimento recorrente pode empenar o cabeçote, afetar junta e vedação. Por isso a peça precisa ser medida e avaliada antes da montagem.",
  },
  {
    question: "Cabeçote trincado tem conserto?",
    answer:
      "Em muitos casos sim, com solda e reparo técnico. Em outros, o reparo não é seguro e a peça precisa ser substituída. A diferença entre um caso e outro só aparece com a peça limpa e testada — por isso o teste de trinca vem antes da decisão.",
  },
  {
    question: "Vocês atendem oficinas mecânicas?",
    answer:
      "Sim. A Retífica Premium tem atendimento para oficinas com suporte técnico, prazos combinados e programa de parceria B2B.",
  },
];

const zapGeral =
  "Olá! Vim pelo site da Retífica Premium e gostaria de um orçamento para o meu cabeçote.";

/** Rótulo de etapa. Vocabulário do serviço, não numeração decorativa. */
function Etapa({ children, tom = "claro" }: { children: React.ReactNode; tom?: "claro" | "escuro" }) {
  return (
    <p
      className={`font-heading text-xs font-bold uppercase tracking-[0.22em] ${
        tom === "escuro" ? "text-rp-gold" : "text-rp-accent"
      }`}
    >
      {children}
    </p>
  );
}

export default function ServicosPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* ═══ HERO — abre pelo sintoma, não pelo serviço ═══════════════════ */}
      <section className="relative overflow-hidden bg-rp-navy pb-8 pt-10 text-white md:pb-12 md:pt-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(251,191,36,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(251,191,36,0.05) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-rp-gold/45 to-transparent"
        />

        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.24em] text-rp-gold">
            Sertãozinho-SP · atende Ribeirão Preto
          </p>

          {/* Título definido pelo dono da retífica. A promessa está no subtexto:
              descobrir o que precisa antes de trocar peça é a objeção real de
              quem já ouviu orçamento inflado em outro lugar. */}
          <h1 className="mx-auto mt-3 max-w-4xl font-heading text-[1.95rem] font-bold leading-[1.08] tracking-[-0.015em] md:text-[3.9rem] md:leading-[1.04] lg:max-w-5xl lg:text-[4.4rem]">
            Serviços de Retífica de Cabeçotes com{" "}
            <span className="text-rp-gold">Precisão, Diagnóstico e Confiança</span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-white/75 md:mt-6 md:text-xl">
            Seu motor apresentou problema? Antes de trocar peças, descubra o que
            realmente precisa ser feito.
          </p>

          {/* A garantia confirmada fica perto do título para ser encontrada
              sem disputar atenção com a ação principal. */}
          <p className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full border border-rp-gold/50 bg-rp-gold/10 py-1.5 pl-2 pr-4 md:mt-6 md:gap-2.5 md:py-2.5 md:pl-3 md:pr-5">
            <span
              aria-hidden="true"
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rp-gold text-[#1A1200] md:h-7 md:w-7"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="m5 12.5 4.5 4.5L19 7.5" />
              </svg>
            </span>
            <span className="font-heading text-sm font-bold text-rp-gold md:text-lg">
              3 meses de garantia no serviço executado
            </span>
          </p>

          <Suspense
            fallback={
              <div className="mx-auto mt-8 h-14 w-full max-w-xl animate-pulse rounded-full bg-white/10 motion-reduce:animate-none" />
            }
          >
            <ExperimentHeroCtas whatsappMessage={zapGeral} />
          </Suspense>

          {/* Os atalhos de sintoma e o link "ver os 10 serviços" saíram daqui.
              Em 30 dias com 27 sessões, os atalhos tiveram 1 clique e o link
              teve ZERO. O espaço da primeira dobra passou para a grade de
              serviços, logo abaixo. */}
        </div>
      </section>

      {/* ═══ CATÁLOGO CEDO — acesso a todos os serviços sem rolagem longa ═ */}
      <GradeServicos />

      {/* ═══ PREÇO, PRAZO E GARANTIA ═════════════════════════════════════ */}
      <div id="orcamento" className="scroll-mt-20">
        <PrecoPrazoGarantia contexto="servicos" whatsappMessage={zapGeral} fundo="creme" />
      </div>

      {/* ═══ MEDIÇÃO ═════════════════════════════════════════════════════ */}
      <section id="medicao" className="scroll-mt-20 bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <Etapa>Conferência</Etapa>
            <h2 className="mt-2 font-heading text-[1.8rem] font-bold leading-tight tracking-[-0.01em] text-gray-900 md:text-[2.6rem]">
              O que a gente confere antes de dar preço
            </h2>
            <p className="mt-3 text-base leading-relaxed text-gray-600">
              Cada peça passa por estes pontos antes de sair um valor.
            </p>
          </div>

          <div className="mt-10 grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-start">
            <ol className="border-t border-gray-200">
              {medicoes.map((item, i) => (
                <li
                  key={item.titulo}
                  className="flex gap-5 border-b border-gray-200 py-5"
                >
                  <span className="font-heading text-sm font-bold tabular-nums text-rp-accent/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-heading text-lg font-bold text-gray-900">
                      {item.titulo}
                    </h3>
                    <p className="mt-1 text-base leading-relaxed text-gray-600">
                      {item.texto}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <MidiaPlaceholder
              id="img-01"
              arquivo="medicao-empeno-cabecote.webp"
              proporcao="aspect-[4/3]"
              tom="claro"
              resumo="Foto real da oficina: relógio comparador apoiado na face do cabeçote, mão do mecânico em quadro, luz lateral marcando a superfície usinada."
              title="A conferência decide o escopo"
              caption="Face, vedação, guias, sedes e sinais de trinca são conferidos antes de definir as operações necessárias."
            />
          </div>
        </div>
      </section>

      {/* ═══ TESTE DE TRINCA — a seção de maior peso ═════════════════════ */}
      <section
        id="trinca"
        className="relative scroll-mt-20 overflow-hidden bg-rp-navy py-16 text-white md:py-24"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-rp-gold/40 to-transparent"
        />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-[0.95fr_1.05fr] md:items-center">
            <div>
              <Etapa tom="escuro">Teste de trinca</Etapa>
              <h2 className="mt-2 font-heading text-[1.8rem] font-bold leading-tight tracking-[-0.01em] md:text-[2.7rem]">
                Decidir só pelo que aparece pode deixar a causa escondida
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/75 md:text-lg">
                Superaquecimento, pressão no reservatório e mistura de água e óleo
                podem ter mais de uma causa. A inspeção da peça ajuda a separar
                empeno, falha de vedação e suspeita de trinca.
              </p>
              <p className="mt-4 text-base leading-relaxed text-white/75 md:text-lg">
                Por isso a peça é limpa e testada <strong className="text-white">antes</strong> de
                qualquer decisão sobre reparo, solda ou troca. O teste orienta a
                decisão; não transforma um sintoma em diagnóstico confirmado.
              </p>

              <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
                <TrackedWhatsAppLink
                  eventLabel="servicos_trinca_whatsapp"
                  message="Olá! Gostaria de saber sobre o teste de trinca no cabeçote. Vim pelo site."
                  className="inline-flex h-12 items-center justify-center rounded-full bg-[#25D366] px-7 font-heading text-base font-bold text-[#04240F] transition hover:brightness-110 md:h-13"
                >
                  Quero testar meu cabeçote
                </TrackedWhatsAppLink>
                <TrackedServiceLink
                  href={servicePath("teste-de-trinca")}
                  serviceId="solda-de-trincas"
                  serviceName="Teste de trinca"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-white/35 px-7 font-heading text-base font-bold text-white transition hover:border-rp-gold hover:text-rp-gold md:h-13"
                >
                  Como funciona o teste
                </TrackedServiceLink>
              </div>
            </div>

            <div>
              {videos.tecnologiaTesteTrinca.youtubeId ? (
                <VideoEmbed
                  slot={videos.tecnologiaTesteTrinca}
                  eventLabel="servicos_trinca_video"
                />
              ) : (
                <MidiaPlaceholder
                  id="vid-01"
                  arquivo="teste-de-trinca.mp4"
                  proporcao="aspect-video"
                  tom="escuro"
                  resumo="Vídeo de 45s: peça entrando limpa, equipamento em operação, close na trinca revelada. O plano da trinca aparecendo é o que vende a seção."
                  title="Inspeção para suspeita de trinca"
                  caption="Peça limpa, equipamento em operação e interpretação do resultado antes de decidir sobre o reparo."
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SERVIÇOS ════════════════════════════════════════════════════ */}
      <section id="servicos" className="scroll-mt-20 bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <Etapa>Correção</Etapa>
            <h2 className="mt-2 font-heading text-[1.8rem] font-bold leading-tight tracking-[-0.01em] text-gray-900 md:text-[2.6rem]">
              O que a gente executa
            </h2>
            <p className="mt-3 text-base leading-relaxed text-gray-600">
              Nem toda peça precisa de tudo. O que a sua precisa sai da conferência.
            </p>
          </div>

          {/* Cards intercalados: mídia de um lado, explicação do outro,
              alternando. Cada um mostra COMO o serviço é executado e leva para
              a página completa. Antes isto era uma lista de links de texto —
              não parecia levar a lugar nenhum. */}
          <div className="mt-10 space-y-14 md:space-y-20">
            {serviceDetailPages.filter((servico) => servicosEmDestaque.has(servico.slug)).map((servico, i) => {
              const video = serviceVideos[servico.slug];
              const invertido = i % 2 === 1;
              const zapServico = `Olá! Vim pelo site e gostaria de um orçamento de ${servico.shortTitle.toLowerCase()}.`;

              return (
                <article
                  key={servico.slug}
                  className="grid items-center gap-7 md:grid-cols-2 md:gap-12"
                >
                  {/* Mídia */}
                  <div className={invertido ? "md:order-2" : undefined}>
                    {video?.arquivoLocal && video.capaLocal ? (
                      <VideoLocal
                        src={video.arquivoLocal}
                        poster={video.capaLocal}
                        descricao={video.title}
                        eventLabel={`servicos_card_${servico.slug}_video`}
                      />
                    ) : video?.youtubeId ? (
                      <VideoEmbed
                        slot={video}
                        eventLabel={`servicos_card_${servico.slug}_video`}
                      />
                    ) : (
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-gray-200 bg-[#F5F8FD]">
                        <Image
                          src={servico.image}
                          alt={servico.imageAlt}
                          fill
                          sizes="(max-width: 768px) 92vw, 520px"
                          className={servico.slug === "retifica-de-cabecote" ? "object-cover" : "object-contain p-10"}
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>

                  {/* Explicação */}
                  <div className={invertido ? "md:order-1" : undefined}>
                    <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-rp-accent">
                      {String(i + 1).padStart(2, "0")} · Serviço
                    </p>
                    <h3 className="mt-2 font-heading text-2xl font-bold leading-tight text-gray-900 md:text-[2rem]">
                      {servico.shortTitle}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-gray-600">
                      {servico.intro}
                    </p>

                    <p className="mt-5 font-heading text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
                      Como a gente executa
                    </p>
                    <ol className="mt-2.5 list-none space-y-2">
                      {servico.process.slice(0, 3).map((passo, p) => (
                        <li key={passo} className="flex gap-3 text-sm leading-relaxed text-gray-700">
                          <span className="font-heading font-bold tabular-nums text-rp-accent/60">
                            {p + 1}
                          </span>
                          <span>{passo}</span>
                        </li>
                      ))}
                    </ol>

                    <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                      <TrackedServiceLink
                        href={servicePath(servico.slug)}
                        serviceId={servico.serviceId}
                        serviceName={servico.shortTitle}
                        className="inline-flex h-12 items-center justify-center rounded-full bg-rp-accent px-6 font-heading text-sm font-bold text-white transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rp-accent"
                      >
                        Ver {servico.shortTitle.toLowerCase()} completo →
                      </TrackedServiceLink>
                      <TrackedWhatsAppLink
                        eventLabel={`servicos_card_${servico.slug}_whatsapp`}
                        message={zapServico}
                        serviceId={servico.serviceId}
                        className="inline-flex h-12 items-center justify-center rounded-full border border-[#25D366] px-6 font-heading text-sm font-bold text-[#0B7A3B] transition hover:bg-[#25D366] hover:text-[#04240F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
                      >
                        Orçamento deste serviço
                      </TrackedWhatsAppLink>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ PROCESSO ════════════════════════════════════════════════════ */}
      <section id="processo" className="scroll-mt-20 bg-[#FFFBF2] py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <Etapa>Processo</Etapa>
            <h2 className="mt-2 font-heading text-[1.8rem] font-bold leading-tight tracking-[-0.01em] text-gray-900 md:text-[2.6rem]">
              Do recebimento à devolução
            </h2>
          </div>

          <ol className="mt-9 grid gap-x-10 gap-y-0 md:grid-cols-2">
            {processo.map((etapa, i) => (
              <li
                key={etapa.titulo}
                className="flex gap-5 border-b border-[#E5DCC6] py-6 last:border-b-0 md:[&:nth-last-child(2)]:border-b-0"
              >
                <span className="font-heading text-2xl font-bold tabular-nums leading-none text-rp-accent/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h3 className="font-heading text-lg font-bold text-gray-900">
                    {etapa.titulo}
                  </h3>
                  <p className="mt-1 text-base leading-relaxed text-gray-700">
                    {etapa.texto}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══ OFICINAS ════════════════════════════════════════════════════ */}
      <section id="oficinas" className="scroll-mt-20 bg-rp-navy py-14 text-white md:py-20">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:items-center lg:px-8">
          <div>
            <Etapa tom="escuro">Para oficinas</Etapa>
            <h2 className="mt-2 font-heading text-[1.6rem] font-bold leading-tight md:text-[2.2rem]">
              Você monta. A gente usina.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-white/72">
              Alinhe escopo, quantidade, disponibilidade da peça e prazo antes de
              começar. A conferência ajuda a reduzir o risco de retrabalho na sua oficina.
            </p>
          </div>
          <div className="flex flex-col gap-2.5 sm:flex-row md:flex-col">
            <TrackedCtaLink
              href="/b2b"
              eventLabel="servicos_b2b_cta"
              className="inline-flex h-12 items-center justify-center rounded-full bg-rp-gold px-7 font-heading text-base font-bold text-[#1A1200] transition hover:brightness-105"
            >
              Ver programa de parceria
            </TrackedCtaLink>
            <TrackedWhatsAppLink
              eventLabel="servicos_b2b_whatsapp"
              message="Olá! Tenho uma oficina e gostaria de saber sobre a parceria com a Retífica Premium."
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/35 px-7 font-heading text-base font-bold text-white transition hover:border-rp-gold hover:text-rp-gold"
            >
              Falar como oficina
            </TrackedWhatsAppLink>
          </div>
        </div>
      </section>

      {/* ═══ REGIÃO ══════════════════════════════════════════════════════ */}
      <section id="regiao" className="scroll-mt-20 bg-white py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Etapa>Onde atendemos</Etapa>
          <h2 className="mt-2 font-heading text-[1.8rem] font-bold leading-tight tracking-[-0.01em] text-gray-900 md:text-[2.4rem]">
            Sertãozinho e a região de Ribeirão Preto
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-gray-600">
            A oficina fica em Sertãozinho-SP. Para outras cidades, confirme pelo
            WhatsApp os dias, a disponibilidade e as condições de retirada ou devolução.
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {primaryRegionalCities.map((cidade) => (
              <li
                key={cidade}
                className="rounded-full border border-gray-200 px-4 py-1.5 text-sm font-medium text-gray-700"
              >
                {cidade}
              </li>
            ))}
          </ul>

          <TrackedCtaLink
            href="/retifica-em-ribeirao-preto"
            eventLabel="servicos_regional_ribeirao"
            trackingPosition="services_region"
            className="mt-6 inline-flex font-heading text-sm font-bold text-rp-accent underline underline-offset-4 transition-colors hover:text-gray-900"
          >
            Como funciona para quem está em Ribeirão Preto →
          </TrackedCtaLink>
        </div>
      </section>

      {/* ═══ DÚVIDAS ═════════════════════════════════════════════════════ */}
      <section id="duvidas" className="scroll-mt-20 bg-white pb-16 md:pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Etapa>Dúvidas</Etapa>
          <h2 className="mt-2 font-heading text-[1.8rem] font-bold leading-tight tracking-[-0.01em] text-gray-900 md:text-[2.6rem]">
            Perguntas que a gente ouve toda semana
          </h2>

          <div className="mt-8 divide-y divide-gray-200 border-y border-gray-200">
            {faq.map((item) => (
              <details key={item.question} className="group py-4">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-heading text-lg font-semibold text-gray-900 transition-colors hover:text-rp-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rp-accent">
                  <span>{item.question}</span>
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-px w-4 shrink-0 bg-rp-accent transition-transform duration-200 group-open:rotate-90"
                  />
                </summary>
                <p className="mt-3 pr-8 leading-relaxed text-gray-600">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA FINAL ═══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-rp-navy py-16 text-white md:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-rp-gold/40 to-transparent"
        />
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-[1.8rem] font-bold leading-tight md:text-[2.6rem]">
            Manda o sintoma. A gente responde o próximo passo.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-white/72 md:text-lg">
            Informe o veículo, o sintoma e sua cidade. A equipe orienta o que
            precisa ser avaliado antes de definir o serviço.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-2.5 sm:flex-row">
            <TrackedWhatsAppLink
              eventLabel="servicos_final_whatsapp"
              message={zapGeral}
              className="inline-flex h-13 items-center justify-center rounded-full bg-[#25D366] px-8 font-heading text-base font-bold text-[#04240F] transition hover:brightness-110 md:h-14"
            >
              Falar no WhatsApp
            </TrackedWhatsAppLink>
            <TrackedPhoneLink
              eventLabel="servicos_final_phone"
              className="inline-flex h-13 items-center justify-center rounded-full border border-white/35 px-8 font-heading text-base font-bold text-white transition hover:border-rp-gold hover:text-rp-gold md:h-14"
            >
              Ligar {siteConfig.phone.display}
            </TrackedPhoneLink>
          </div>
        </div>
      </section>

      <FAQSchema items={faq} />
      <ServiceSchema />
      <RegionalServiceAreaSchema />
      <BreadcrumbSchema
        items={[
          { name: "Início", url: "/" },
          { name: "Serviços", url: "/servicos" },
        ]}
      />
    </main>
  );
}
