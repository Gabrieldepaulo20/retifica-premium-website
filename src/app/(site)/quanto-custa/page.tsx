import Link from "next/link";
import type { Metadata } from "next";
import { BreadcrumbSchema, FAQSchema } from "@/components/site/StructuredData";
import { TrackedPhoneLink, TrackedWhatsAppLink } from "@/components/site/TrackedLinks";
import { SimuladorPreco } from "@/components/site/SimuladorPreco";
import { faixasPreco, formatarReal } from "@/lib/faixas-preco";
import { servicePath } from "@/lib/service-pages";
import { siteConfig } from "@/lib/site";

/**
 * QUANTO CUSTA — simulação de faixa de preço.
 *
 * Existe porque 13,9% das impressões da campanha são busca por preço
 * ("preço retífica de cabeçote", "quanto custa retificar cabeçote") e essas
 * palavras já colocam o anúncio em primeiro lugar entre 68% e 91% das vezes —
 * convertendo zero, porque não havia preço nenhum no site.
 *
 * Das seis retíficas brasileiras pesquisadas, só uma publica valor, e é um
 * teto alto (R$ 3.399) que ancora o mercado para cima. A mediana real da
 * Retífica Premium é R$ 780. O número trabalha a favor — o que faltava era
 * mostrá-lo.
 *
 * Todos os valores vêm de `faixas-preco.ts`, apurados sobre 1.227 ordens de
 * serviço reais. Nada estimado.
 */

export const metadata: Metadata = {
  title: "Quanto Custa Retificar um Cabeçote",
  description:
    "Faixa de preço real de retífica de cabeçote, plaina, válvulas e teste de trinca, apurada sobre serviços já executados em Sertãozinho-SP. Simule em um toque.",
  alternates: { canonical: "/quanto-custa" },
  openGraph: {
    title: "Quanto Custa Retificar um Cabeçote | Retífica Premium",
    description:
      "Faixa de preço real por tipo de serviço, apurada sobre 1.227 ordens de serviço. Simule e receba o orçamento pelo WhatsApp.",
    url: "https://www.premiumretifica.com.br/quanto-custa",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
};

const faq = [
  {
    question: "Por que o preço varia tanto?",
    answer:
      "Porque cada cabeçote chega num estado. Um precisa só de plaina; outro precisa de sedes, guias, válvulas e solda de trinca. É por isso que a peça é medida antes de sair qualquer valor — o orçamento reflete o que a sua peça precisa, não uma tabela.",
  },
  {
    question: "A avaliação é cobrada?",
    answer:
      "Não. A peça é recebida, limpa e medida, e o orçamento sai pelo WhatsApp em até 2 horas úteis. Você decide depois de saber o valor.",
  },
  {
    question: "Esses valores são garantidos?",
    answer:
      "Não são tabela de preço. São a faixa onde caiu metade dos serviços já executados, apurada sobre o histórico real da oficina. Servem de referência antes da conversa; o valor do seu caso vem do orçamento.",
  },
  {
    question: "Dá para parcelar?",
    answer:
      "As condições de pagamento são combinadas junto com o orçamento. Fale com a gente pelo WhatsApp que explicamos as opções.",
  },
];

export default function QuantoCustaPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* ═══ SIMULAÇÃO ═══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-rp-navy pb-16 pt-12 text-white md:pb-24 md:pt-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(251,191,36,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(251,191,36,0.05) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="font-heading text-[11px] font-bold uppercase tracking-[0.24em] text-rp-gold">
            Retífica de cabeçote · Sertãozinho-SP
          </p>
          <h1 className="mt-4 font-heading text-[2.1rem] font-bold leading-[1.06] tracking-[-0.015em] md:text-[3.2rem]">
            Quanto custa retificar um cabeçote
          </h1>
          <p className="mt-4 text-base leading-relaxed text-white/75 md:text-lg">
            Valores reais de serviços já executados aqui. Toque no seu caso.
          </p>

          <div className="mt-9">
            <SimuladorPreco />
          </div>
        </div>
      </section>

      {/* ═══ TODAS AS FAIXAS ═════════════════════════════════════════════ */}
      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="font-heading text-[11px] font-bold uppercase tracking-[0.22em] text-rp-accent">
            Todas as faixas
          </p>
          <h2 className="mt-2 font-heading text-[1.7rem] font-bold leading-tight text-gray-900 md:text-[2.4rem]">
            Serviço por serviço
          </h2>

          <div className="mt-7 overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 pr-4 font-heading text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500">
                    Serviço
                  </th>
                  <th className="py-3 pr-4 text-right font-heading text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500">
                    Metade dos casos
                  </th>
                  <th className="py-3 text-right font-heading text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500">
                    Base
                  </th>
                </tr>
              </thead>
              <tbody>
                {faixasPreco.map((f) => (
                  <tr key={f.id} className="border-b border-gray-200 last:border-b-0">
                    <td className="py-4 pr-4">
                      {f.servico ? (
                        <Link
                          href={servicePath(f.servico)}
                          className="font-heading text-base font-bold text-gray-900 underline decoration-gray-300 underline-offset-4 transition-colors hover:text-rp-accent"
                        >
                          {f.rotulo}
                        </Link>
                      ) : (
                        <span className="font-heading text-base font-bold text-gray-900">
                          {f.rotulo}
                        </span>
                      )}
                    </td>
                    <td className="whitespace-nowrap py-4 pr-4 text-right font-heading text-base font-bold tabular-nums text-rp-accent">
                      {formatarReal(f.de)} – {formatarReal(f.ate)}
                    </td>
                    <td className="whitespace-nowrap py-4 text-right text-sm tabular-nums text-gray-500">
                      {f.casos} serviços
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══ DÚVIDAS ═════════════════════════════════════════════════════ */}
      <section className="bg-[#FFFBF2] py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-[1.7rem] font-bold leading-tight text-gray-900 md:text-[2.2rem]">
            Sobre o preço
          </h2>
          <div className="mt-6 divide-y divide-[#E5DCC6] border-y border-[#E5DCC6]">
            {faq.map((item) => (
              <details key={item.question} className="group py-4">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-heading text-lg font-semibold text-gray-900 transition-colors hover:text-rp-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rp-accent">
                  <span>{item.question}</span>
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-px w-4 shrink-0 bg-rp-accent transition-transform duration-200 group-open:rotate-90"
                  />
                </summary>
                <p className="mt-3 pr-8 leading-relaxed text-gray-700">{item.answer}</p>
              </details>
            ))}
          </div>

          <div className="mt-9 flex flex-col gap-2.5 sm:flex-row">
            <TrackedWhatsAppLink
              eventLabel="quanto_custa_final_whatsapp"
              message="Olá! Vim pela página de preços do site e gostaria de um orçamento."
              className="inline-flex h-13 items-center justify-center rounded-full bg-[#25D366] px-7 font-heading text-base font-bold text-[#04240F] transition hover:brightness-110 md:h-14"
            >
              Pedir orçamento real
            </TrackedWhatsAppLink>
            <TrackedPhoneLink
              eventLabel="quanto_custa_final_phone"
              className="inline-flex h-13 items-center justify-center rounded-full border border-gray-300 px-7 font-heading text-base font-bold text-gray-800 transition hover:border-rp-accent hover:text-rp-accent md:h-14"
            >
              Ligar {siteConfig.phone.display}
            </TrackedPhoneLink>
          </div>
        </div>
      </section>

      <FAQSchema items={faq} />
      <BreadcrumbSchema
        items={[
          { name: "Início", url: "/" },
          { name: "Quanto custa", url: "/quanto-custa" },
        ]}
      />
    </main>
  );
}
