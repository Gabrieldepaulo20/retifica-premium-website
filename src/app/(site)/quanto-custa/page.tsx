import type { Metadata } from "next";
import { EstimativaGuiada } from "@/components/site/EstimativaGuiada";
import { FaixaRapida } from "@/components/site/FaixaRapida";
import { BreadcrumbSchema, FAQSchema } from "@/components/site/StructuredData";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Quanto Custa Retificar um Cabeçote",
  description:
    "Veja quanto costuma custar retificar um cabeçote, por marca, com base em serviços reais. Sem precisar informar contato.",
  alternates: { canonical: "/quanto-custa" },
  openGraph: {
    title: "Quanto custa retificar um cabeçote | Retífica Premium",
    description:
      "Escolha a marca do seu carro e veja a faixa de preço, com base em serviços reais já feitos aqui.",
    url: "https://www.premiumretifica.com.br/quanto-custa",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [
      {
        url: "/cabecote.webp",
        width: 1200,
        height: 630,
        alt: "Estimativa guiada para entender o que verificar no cabeçote",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quanto custa retificar um cabeçote | Retífica Premium",
    description:
      "Escolha a marca do seu carro e veja a faixa de preço, com base em serviços reais já feitos aqui.",
    images: ["/cabecote.webp"],
  },
};

/**
 * Fatores que alteram o valor. São qualitativos de propósito: faixas de preço só
 * entram no site depois de auditadas contra O.S. reais.
 */
const fatores = [
  {
    titulo: "Qual é o motor",
    texto:
      "Motor maior dá mais trabalho, e peça de motor raro custa mais e demora mais para chegar.",
  },
  {
    titulo: "Se a peça está torta",
    texto:
      "Cabeçote empena com o calor. Se já foi aplainado antes, sobra menos material — e às vezes não dá para fazer de novo.",
  },
  {
    titulo: "Se tem rachadura",
    texto:
      "Rachadura só aparece no teste. Quando tem, precisa soldar e testar de novo — é o que mais muda o preço de um caso para o outro.",
  },
  {
    titulo: "Como estão as válvulas",
    texto:
      "Válvula, guia, sede e rosca podem estar boas para recuperar ou gastas demais. Recuperar custa menos que trocar.",
  },
  {
    titulo: "Peças e pressa",
    texto:
      "Junta, retentor e parafuso entram conforme o caso. Se você precisa para ontem, isso também pesa.",
  },
] as const;

const faq = [
  {
    question: "As perguntas dizem qual é o problema?",
    answer:
      "Não. Elas organizam o que você percebeu e mostram o que costuma estar por trás disso. Saber mesmo, só olhando a peça.",
  },
  {
    question: "Como vocês fecham o preço?",
    answer:
      "Depende do motor, do que a peça tem e das peças que precisam ser trocadas. As perguntas do site adiantam o contexto, e a equipe fecha o preço depois de ver o cabeçote.",
  },
  {
    question: "Preciso saber qual é o motor do meu carro?",
    answer:
      "Não. Quanto mais você souber, melhor, mas dá para seguir sem isso. A gente descobre depois.",
  },
  {
    question: "Minhas fotos são enviadas automaticamente?",
    answer:
      "Não. Nesta fase, o site apenas registra que você tem fotos ou documentos. Depois de abrir o WhatsApp, você escolhe e envia os arquivos diretamente.",
  },
];

export default function QuantoCustaPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-rp-navy pb-16 pt-10 text-white md:pb-24 md:pt-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(251,191,36,0.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(251,191,36,0.055) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.24em] text-rp-gold">
            Retífica Premium · Sertãozinho e região
          </p>
          <h1 className="mt-3 max-w-3xl font-heading text-[2.15rem] font-bold leading-[1.04] tracking-[-0.015em] md:text-[3.35rem]">
            Quanto custa retificar um cabeçote?
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85 md:text-xl">
            Depende do que a peça tem por dentro, e isso só dá para saber olhando. Quem
            fecha preço por telefone está chutando — o valor muda quando o cabeçote
            chega aqui.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/72 md:text-lg">
            O que dá para fazer agora é te mostrar quanto custou para quem já passou
            por aqui com um carro parecido. Sem nome, sem telefone, sem compromisso.
          </p>
          {/*
            A faixa vem antes das perguntas porque 84% do tráfego pago não rola a
            página e 62% sai em menos de 10 segundos. Quem só quer o número
            recebe aqui; quem quer contexto continua para as perguntas.
          */}
          <div className="mt-8">
            <FaixaRapida />
          </div>

          <div className="mt-10 border-t border-white/10 pt-8">
            <p className="font-heading text-sm font-bold uppercase tracking-[0.16em] text-white/55">
              Quer entender o que está acontecendo?
            </p>
            <p className="mt-2 max-w-2xl text-base leading-relaxed text-white/70">
              São seis perguntas rápidas. No fim você vê o que costuma estar por
              trás do que está acontecendo. Continua sem pedir contato.
            </p>
            <div className="mt-6">
              <EstimativaGuiada />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-rp-accent">
            O que muda o preço
          </p>
          <h2 className="mt-2 max-w-2xl font-heading text-[1.8rem] font-bold leading-tight text-gray-900 md:text-[2.35rem]">
            Cinco coisas mudam o preço
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-700">
            Dois cabeçotes do mesmo carro podem sair por preços diferentes. O que
            muda é isto:
          </p>
          <ol className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-gray-200 bg-gray-200 sm:grid-cols-2">
            {fatores.map((fator, indice) => (
              <li key={fator.titulo} className="bg-white p-6">
                <span className="font-heading text-sm font-bold text-rp-gold">
                  {String(indice + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-heading text-lg font-bold text-gray-900">
                  {fator.titulo}
                </h3>
                <p className="mt-2 leading-relaxed text-gray-700">{fator.texto}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-6">
            <h3 className="font-heading text-lg font-bold text-gray-900">
              O que a gente faz — e o que não faz
            </h3>
            <p className="mt-2 leading-relaxed text-gray-700">
              A Retífica Premium trabalha o <strong>cabeçote</strong>: conferência, plaina,
              trinca, sedes, válvulas, guias, roscas e montagem. <strong>Motor
              completo, bloco e virabrequim são de outra especialidade</strong> — se o
              seu caso for esse, é melhor você saber agora do que depois de uma
              conversa inteira.
            </p>
          </div>
          <p className="mt-8 max-w-2xl leading-relaxed text-gray-700">
            Por isso a gente olha a peça antes de falar preço. As perguntas acima organizam o seu caso para a conversa já começar
            adiantada — e a equipe fecha o preço depois de ver o cabeçote.
          </p>
        </div>
      </section>

      <section className="bg-[#FFFBF2] py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-rp-accent">
            Transparência
          </p>
          <h2 className="mt-2 font-heading text-[1.8rem] font-bold leading-tight text-gray-900 md:text-[2.35rem]">
            O que estas perguntas faz — e o que não faz
          </h2>
          <div className="mt-7 divide-y divide-[#E5DCC6] border-y border-[#E5DCC6]">
            {faq.map((item) => (
              <details key={item.question} className="group py-4">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-heading text-lg font-semibold text-gray-900 hover:text-rp-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rp-accent">
                  <span>{item.question}</span>
                  <span aria-hidden="true" className="mt-1.5 h-px w-4 shrink-0 bg-rp-accent transition-transform group-open:rotate-90 motion-reduce:transition-none" />
                </summary>
                <p className="mt-3 pr-8 leading-relaxed text-gray-700">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <FAQSchema items={faq} />
      <BreadcrumbSchema items={[{ name: "Início", url: "/" }, { name: "Quanto custa", url: "/quanto-custa" }]} />
    </main>
  );
}
