import type { Metadata } from "next";
import { EstimativaGuiada } from "@/components/site/EstimativaGuiada";
import { FaixaRapida } from "@/components/site/FaixaRapida";
import { BreadcrumbSchema, FAQSchema } from "@/components/site/StructuredData";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Quanto Custa Retificar um Cabeçote",
  description:
    "Triagem guiada para entender o que pode influenciar o orçamento do cabeçote. Responda sem conhecer o nome do serviço e envie o resumo para a Retífica Premium.",
  alternates: { canonical: "/quanto-custa" },
  openGraph: {
    title: "Descubra o que seu cabeçote pode precisar | Retífica Premium",
    description:
      "Triagem guiada em cerca de 2 minutos, sem exigir conhecimento técnico ou contato antes do resultado.",
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
    title: "Descubra o que seu cabeçote pode precisar | Retífica Premium",
    description:
      "Triagem guiada em cerca de 2 minutos, sem exigir conhecimento técnico ou contato antes do resultado.",
    images: ["/cabecote.webp"],
  },
};

/**
 * Fatores que alteram o valor. São qualitativos de propósito: faixas de preço só
 * entram no site depois de auditadas contra O.S. reais.
 */
const fatores = [
  {
    titulo: "O motor",
    texto:
      "Família, número de cilindros e disponibilidade de peças mudam o tempo de bancada e o custo do que precisa ser reposto.",
  },
  {
    titulo: "Empeno e material já removido",
    texto:
      "Um cabeçote que já foi plainado antes tem menos material disponível. Isso limita o que ainda pode ser feito e muda o caminho do serviço.",
  },
  {
    titulo: "Trinca",
    texto:
      "Só aparece no teste. Se existir, entram solda e nova verificação — e é o item que mais separa um orçamento do outro.",
  },
  {
    titulo: "Sedes, válvulas, guias e roscas",
    texto:
      "Cada um pode estar dentro do limite ou não. É a diferença entre recuperar e substituir.",
  },
  {
    titulo: "Peças, montagem e prazo",
    texto:
      "Junta, retentores, parafusos e a montagem final entram conforme o caso. Urgência e logística também pesam.",
  },
] as const;

const faq = [
  {
    question: "A triagem confirma qual é o defeito?",
    answer:
      "Não. Ela organiza os sinais, mostra o que pode estar relacionado e indica o que precisa ser verificado. O diagnóstico depende da inspeção do veículo e da peça.",
  },
  {
    question: "Como o orçamento é confirmado?",
    answer:
      "O valor depende do motor, das medições e das peças ou materiais necessários. A triagem adianta o contexto, e a equipe confirma o orçamento depois de identificar o conjunto e o que precisa ser verificado.",
  },
  {
    question: "Preciso saber o código do motor?",
    answer:
      "Não. Quanto mais dados você souber, melhor, mas nenhuma dúvida técnica impede o avanço. A equipe pode ajudar a identificar o conjunto depois.",
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
            Depende do que a peça precisa — e isso só aparece depois de medir. Quem dá
            um número fechado por telefone está chutando, e o valor muda quando o
            cabeçote chega na bancada.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/72 md:text-lg">
            O que dá para fazer agora é reduzir o intervalo: responda algumas perguntas
            simples e você vê o que provavelmente será verificado no seu caso. Sem nome,
            sem telefone, sem compromisso.
          </p>
          {/*
            A faixa vem antes da triagem porque 84% do tráfego pago não rola a
            página e 62% sai em menos de 10 segundos. Quem só quer o número
            recebe aqui; quem quer contexto continua para a triagem.
          */}
          <div className="mt-8">
            <FaixaRapida />
          </div>

          <div className="mt-10 border-t border-white/10 pt-8">
            <p className="font-heading text-sm font-bold uppercase tracking-[0.16em] text-white/55">
              Quer entender o que o seu caso precisa?
            </p>
            <p className="mt-2 max-w-2xl text-base leading-relaxed text-white/70">
              A triagem leva cerca de dois minutos e mostra o que provavelmente
              será verificado no seu cabeçote. Continua sem pedir contato.
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
            Por que não existe preço único
          </p>
          <h2 className="mt-2 max-w-2xl font-heading text-[1.8rem] font-bold leading-tight text-gray-900 md:text-[2.35rem]">
            Cinco coisas mudam o valor do serviço
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-700">
            Dois cabeçotes do mesmo carro podem custar diferente. O que separa um do
            outro é isto:
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
              A Retífica Premium trabalha o <strong>cabeçote</strong>: medição, plaina,
              trinca, sedes, válvulas, guias, roscas e montagem. <strong>Motor
              completo, bloco e virabrequim são de outra especialidade</strong> — se o
              seu caso for esse, é melhor você saber agora do que depois de uma
              conversa inteira.
            </p>
          </div>
          <p className="mt-8 max-w-2xl leading-relaxed text-gray-700">
            Por isso a medição vem antes do preço. A triagem acima organiza o seu caso
            para que a conversa comece com contexto — e a equipe confirma a viabilidade
            e o valor final depois de ver a peça.
          </p>
        </div>
      </section>

      <section className="bg-[#FFFBF2] py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-rp-accent">
            Transparência
          </p>
          <h2 className="mt-2 font-heading text-[1.8rem] font-bold leading-tight text-gray-900 md:text-[2.35rem]">
            O que esta triagem faz — e o que não faz
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
