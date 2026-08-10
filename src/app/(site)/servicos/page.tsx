import Link from "next/link";
import type { Metadata } from "next";
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
import { MidiaPlaceholder } from "@/components/site/MidiaPlaceholder";
import { NumerosProva } from "@/components/site/NumerosProva";
import { PrecoPrazoGarantia } from "@/components/site/PrecoPrazoGarantia";
import { TrilhaDiagnostico } from "@/components/site/TrilhaDiagnostico";
import { VideoEmbed } from "@/components/site/VideoEmbed";
import { problemPath } from "@/lib/problem-pages";
import { numerosProva } from "@/lib/prova";
import { primaryRegionalCities } from "@/lib/regional";
import { serviceDetailPages, servicePath } from "@/lib/service-pages";
import { siteConfig } from "@/lib/site";
import { videos } from "@/lib/videos";

/**
 * PÁGINA DE SERVIÇOS
 *
 * Não é um catálogo. É a trilha que alguém percorre para descobrir o que a peça
 * dele tem, na mesma ordem em que a bancada trabalha: sintoma → medição →
 * correção → entrega.
 *
 * Por que assim, e não a grade de cards que todo mundo usa: dos seis
 * concorrentes brasileiros analisados em 10/08/2026 (Hermes, Leon Motores,
 * Motor-Vidro, RetMotor, Hype Motores e Retífica MN), NENHUM organiza a página
 * por sintoma. Todos assumem que a pessoa já sabe o nome do serviço. Quem chega
 * com "meu carro está fumando" não é atendido por nenhum deles — e a Retífica
 * Premium já tem cinco páginas de sintoma publicadas para atender exatamente
 * essa pessoa.
 *
 * O diagnóstico completo está em `docs/redesign-servicos-diagnostico.md`.
 * O briefing das mídias está em `docs/redesign-servicos-midia.md`.
 *
 * Comportamento medido que orienta a hierarquia: 74% celular, 61% sai em menos
 * de 10 segundos, 83% não passa da metade da página, e quem passa de 30
 * segundos converte entre 29% e 50%.
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
        alt: "Bancada de retífica de cabeçote da Retífica Premium em Sertãozinho-SP",
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

/** Estações da régua de cota. Precisam bater com os `id` das seções. */
const estacoes = [
  { id: "sintomas", rotulo: "Sintoma" },
  { id: "orcamento", rotulo: "Orçamento" },
  { id: "medicao", rotulo: "Medição" },
  { id: "trinca", rotulo: "Teste de trinca" },
  { id: "servicos", rotulo: "Serviços" },
  { id: "processo", rotulo: "Processo" },
  { id: "oficinas", rotulo: "Oficinas" },
  { id: "regiao", rotulo: "Região" },
  { id: "duvidas", rotulo: "Dúvidas" },
];

/**
 * Sintomas — a porta de entrada de quem não sabe o nome do serviço.
 * Cada um leva para a página de problema já publicada e carrega uma mensagem
 * de WhatsApp própria, para a conversa começar com contexto.
 */
const sintomas = [
  {
    titulo: "Está soltando fumaça",
    pista: "Fumaça azul, branca ou em excesso pelo escapamento",
    href: problemPath("motor-fumando"),
    zap: "Olá! Meu motor está soltando fumaça pelo escapamento. Vim pelo site e gostaria de uma orientação.",
    rotulo: "motor_fumando",
  },
  {
    titulo: "Está bebendo óleo",
    pista: "Precisa completar o óleo com frequência, sem vazamento aparente",
    href: problemPath("motor-baixando-oleo"),
    zap: "Olá! Meu motor está consumindo óleo. Vim pelo site e gostaria de uma orientação.",
    rotulo: "baixando_oleo",
  },
  {
    titulo: "Está esquentando",
    pista: "Ponteiro sobe, ventoinha não dá conta, perde água do reservatório",
    href: problemPath("motor-superaquecendo"),
    zap: "Olá! Meu motor está superaquecendo. Vim pelo site e gostaria de uma orientação.",
    rotulo: "superaquecendo",
  },
  {
    titulo: "Misturou água com óleo",
    pista: "Óleo com aspecto de café com leite, pressão no reservatório",
    href: problemPath("junta-do-cabecote-queimada"),
    zap: "Olá! O motor está misturando água com óleo. Vim pelo site e gostaria de uma orientação.",
    rotulo: "junta_queimada",
  },
  {
    titulo: "Já disseram que trincou",
    pista: "O problema voltou depois de trocar a junta",
    href: servicePath("teste-de-trinca"),
    zap: "Olá! Me disseram que meu cabeçote pode estar trincado. Vim pelo site e gostaria de uma avaliação.",
    rotulo: "trincado",
  },
];

/** O que é conferido antes de sair um preço. Vocabulário de bancada. */
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
      "A verificação que separa um serviço que dura de um retrabalho em duas semanas. Tem seção própria logo abaixo.",
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
    titulo: "Medição e inspeção",
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
      "Depende do estado da peça. Se o cabeçote estiver plano, sem trinca e com sedes e guias em ordem, a troca da junta pode resolver. Se houver empeno ou trinca, trocar só a junta traz o problema de volta. É isso que a medição responde, antes de qualquer orçamento.",
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
      className={`font-heading text-[11px] font-bold uppercase tracking-[0.22em] ${
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
      <TrilhaDiagnostico estacoes={estacoes} />

      {/* ═══ HERO — abre pelo sintoma, não pelo serviço ═══════════════════ */}
      <section className="relative overflow-hidden bg-rp-navy pb-14 pt-12 text-white md:pb-20 md:pt-20">
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

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="font-heading text-[11px] font-bold uppercase tracking-[0.24em] text-rp-gold">
            Retífica de cabeçote · Sertãozinho-SP
          </p>

          <h1 className="mt-4 max-w-3xl font-heading text-[2.1rem] font-bold leading-[1.06] tracking-[-0.015em] md:text-[3.4rem]">
            O que o seu motor está fazendo?
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
            Você não precisa saber o nome do serviço. Diz o sintoma que a gente
            te diz o que costuma ser, o que precisa ser medido e quanto tempo
            leva para você ter um orçamento.
          </p>

          <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
            <TrackedWhatsAppLink
              eventLabel="servicos_hero_whatsapp"
              message={zapGeral}
              className="inline-flex h-13 items-center justify-center rounded-full bg-[#25D366] px-7 font-heading text-base font-bold text-[#04240F] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:h-14"
            >
              Descrever meu problema no WhatsApp
            </TrackedWhatsAppLink>
            <TrackedPhoneLink
              eventLabel="servicos_hero_phone"
              className="inline-flex h-13 items-center justify-center rounded-full border border-white/35 px-7 font-heading text-base font-bold text-white transition hover:border-rp-gold hover:text-rp-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:h-14"
            >
              Ligar {siteConfig.phone.display}
            </TrackedPhoneLink>
          </div>

        </div>
      </section>

      {/* ═══ SINTOMAS ════════════════════════════════════════════════════ */}
      <section id="sintomas" className="scroll-mt-20 bg-rp-navy pb-16 text-white md:pb-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Etapa tom="escuro">Sintoma</Etapa>
          <h2 className="mt-2 max-w-2xl font-heading text-[1.8rem] font-bold leading-tight tracking-[-0.01em] md:text-[2.6rem]">
            Comece por onde dói
          </h2>

          <ul className="mt-8 border-t border-white/12">
            {sintomas.map((sintoma) => (
              <li
                key={sintoma.titulo}
                className="border-b border-white/12 py-5 md:py-6"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <Link
                    href={sintoma.href}
                    className="group min-w-0 flex-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rp-gold"
                  >
                    <p className="font-heading text-xl font-bold leading-snug transition-colors group-hover:text-rp-gold md:text-2xl">
                      {sintoma.titulo}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-white/60 md:text-base">
                      {sintoma.pista}
                    </p>
                    <span className="mt-2 inline-block font-heading text-[11px] font-bold uppercase tracking-[0.16em] text-white/40 transition-colors group-hover:text-rp-gold">
                      Entender esse sintoma →
                    </span>
                  </Link>

                  <TrackedWhatsAppLink
                    eventLabel={`servicos_sintoma_${sintoma.rotulo}_whatsapp`}
                    message={sintoma.zap}
                    className="inline-flex h-11 shrink-0 items-center justify-center rounded-full border border-[#25D366]/45 px-5 font-heading text-sm font-bold text-[#25D366] transition hover:bg-[#25D366] hover:text-[#04240F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
                  >
                    É o meu caso
                  </TrackedWhatsAppLink>
                </div>
              </li>
            ))}
          </ul>

          {/* A prova vem depois dos sintomas, não antes. No hero ela empurrava
              a lista para fora da primeira tela — e a lista é a tese da página. */}
          <NumerosProva numeros={numerosProva} tom="claro" className="mt-8" />

          <p className="mt-6 text-sm text-white/55">
            Não é nenhum desses?{" "}
            <TrackedWhatsAppLink
              eventLabel="servicos_sintoma_outro_whatsapp"
              message="Olá! Meu motor está com um problema diferente dos que aparecem no site. Posso descrever?"
              className="font-semibold text-rp-gold underline underline-offset-4 hover:text-white"
            >
              Descreve para a gente
            </TrackedWhatsAppLink>
            .
          </p>
        </div>
      </section>

      {/* ═══ PREÇO, PRAZO E GARANTIA ═════════════════════════════════════ */}
      <div id="orcamento" className="scroll-mt-20">
        <PrecoPrazoGarantia contexto="servicos" whatsappMessage={zapGeral} fundo="creme" />
      </div>

      {/* ═══ MEDIÇÃO ═════════════════════════════════════════════════════ */}
      <section id="medicao" className="scroll-mt-20 bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <Etapa>Medição</Etapa>
            <h2 className="mt-2 font-heading text-[1.8rem] font-bold leading-tight tracking-[-0.01em] text-gray-900 md:text-[2.6rem]">
              O que a gente confere antes de dar preço
            </h2>
            <p className="mt-3 text-base leading-relaxed text-gray-600">
              Orçamento no escuro é o que faz um serviço custar duas vezes. Cada
              peça passa por estes pontos antes de sair um valor — e o que ela
              precisou vai escrito no laudo.
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
              resumo="Foto real da bancada: relógio comparador apoiado na face do cabeçote, mão do mecânico em quadro, luz lateral marcando a superfície usinada."
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
                A trinca que ninguém vê é a que traz o carro de volta
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/75 md:text-lg">
                Falha de junta muitas vezes é sintoma, não causa. Quando existe
                trinca no cabeçote e ela não é encontrada, o motor é montado, roda
                algumas semanas e o problema volta — agora com a mão de obra paga
                duas vezes.
              </p>
              <p className="mt-4 text-base leading-relaxed text-white/75 md:text-lg">
                Por isso a peça é limpa e testada <strong className="text-white">antes</strong> de
                qualquer decisão sobre reparo, solda ou troca. É a verificação que
                separa um serviço que dura de um retrabalho.
              </p>

              <p className="mt-5 rounded-lg border border-dashed border-rp-gold/40 bg-rp-gold/5 px-4 py-3 font-mono text-[12px] leading-relaxed text-rp-gold/90">
                [CONTEÚDO REAL NECESSÁRIO: nome e marca do equipamento de teste de
                trinca, para citar pelo nome como fazem as retíficas de maior
                autoridade]
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
              Nem toda peça precisa de tudo. O que a sua vai precisar sai da
              medição.
            </p>
          </div>

          <ul className="mt-9 border-t border-gray-200">
            {serviceDetailPages.map((servico) => (
              <li key={servico.slug} className="border-b border-gray-200">
                <TrackedServiceLink
                  href={servicePath(servico.slug)}
                  serviceName={servico.shortTitle}
                  className="group flex flex-col gap-2 py-6 transition-colors hover:bg-[#F8FBFF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rp-accent md:flex-row md:items-baseline md:gap-8"
                >
                  <h3 className="font-heading text-xl font-bold text-gray-900 transition-colors group-hover:text-rp-accent md:w-2/5 md:shrink-0 md:text-2xl">
                    {servico.shortTitle}
                  </h3>
                  <p className="text-base leading-relaxed text-gray-600 md:flex-1">
                    {servico.metaDescription}
                  </p>
                  <span
                    aria-hidden="true"
                    className="font-heading text-sm font-bold text-rp-accent transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </TrackedServiceLink>
              </li>
            ))}
          </ul>
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
              Suporte técnico, prazo combinado antes de começar e laudo por
              escrito que você repassa ao seu cliente. Sem retrabalho voltando
              para a sua bancada.
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
            A oficina fica em Sertãozinho-SP. Para Ribeirão Preto, buscamos o
            cabeçote e devolvemos depois do serviço, sem custo de deslocamento.
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

          <Link
            href="/retifica-em-ribeirao-preto"
            className="mt-6 inline-flex font-heading text-sm font-bold text-rp-accent underline underline-offset-4 transition-colors hover:text-gray-900"
          >
            Como funciona para quem está em Ribeirão Preto →
          </Link>
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
            Sem compromisso e sem orçamento no escuro. Se a peça não precisar de
            retífica, a gente também fala.
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
