import type { Metadata } from "next";
import { EstimativaGuiada } from "@/components/site/EstimativaGuiada";
import { BreadcrumbSchema, FAQSchema } from "@/components/site/StructuredData";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Quanto Custa Retificar um Cabeçote",
  description:
    "Estimativa guiada para entender o que seu cabeçote pode precisar. Responda sem conhecer o nome do serviço e envie o resumo para a Retífica Premium.",
  alternates: { canonical: "/quanto-custa" },
  openGraph: {
    title: "Descubra o que seu cabeçote pode precisar | Retífica Premium",
    description:
      "Triagem guiada em cerca de 2 minutos, sem exigir conhecimento técnico ou contato antes do resultado.",
    url: "https://www.premiumretifica.com.br/quanto-custa",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
};

const faq = [
  {
    question: "A triagem confirma qual é o defeito?",
    answer:
      "Não. Ela organiza os sinais, mostra o que pode estar relacionado e indica o que precisa ser verificado. O diagnóstico depende da inspeção do veículo e da peça.",
  },
  {
    question: "Por que ainda não aparece uma faixa de preço?",
    answer:
      "As faixas antigas estavam baseadas em descrições livres de ordens de serviço. A Retífica Premium está reclassificando os itens, peças e serviços para só publicar valores comparáveis e aprovados.",
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
            Estimativa guiada · cerca de 2 minutos
          </p>
          <h1 className="mt-3 max-w-3xl font-heading text-[2.15rem] font-bold leading-[1.04] tracking-[-0.015em] md:text-[3.35rem]">
            Descubra o que seu cabeçote pode precisar
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/72 md:text-lg">
            Responda algumas perguntas simples. Você não precisa conhecer o nome do serviço, e o resultado aparece antes de qualquer pedido de contato.
          </p>
          <div className="mt-8">
            <EstimativaGuiada />
          </div>
        </div>
      </section>

      <section className="bg-[#FFFBF2] py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-rp-accent">
            Transparência
          </p>
          <h2 className="mt-2 font-heading text-[1.8rem] font-bold leading-tight text-gray-900 md:text-[2.35rem]">
            O que esta estimativa faz — e o que não faz
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
