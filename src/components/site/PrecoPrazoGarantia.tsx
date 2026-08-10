import { TrackedPhoneLink, TrackedWhatsAppLink } from "@/components/site/TrackedLinks";
import { siteConfig } from "@/lib/site";

/**
 * Bloco "preço, prazo e garantia".
 *
 * Existe por um motivo medido: as buscas por preço ("preço retífica de cabeçote",
 * "quanto custa retificar cabeçote") já colocam o anúncio em 1º lugar entre 68% e
 * 91% das vezes — e convertem ZERO. A causa é que as palavras "preço", "valor",
 * "quanto custa", "prazo" e "dias úteis" não apareciam nenhuma vez na página que
 * recebia esses cliques.
 *
 * Este bloco responde as três perguntas que toda pessoa faz antes de mandar
 * mensagem, e coloca essas palavras na página — o que corrige tanto a conversão
 * quanto a correspondência entre a busca e a página, que é o componente da nota
 * de qualidade do Google onde estamos "abaixo da média".
 *
 * SOBRE O PREÇO: hoje o bloco responde sem número. Os dados internos (1.227 O.S.
 * dos últimos 12 meses) mostram mediana de R$ 780 e metade dos casos entre R$ 590
 * e R$ 1.100. Publicar a faixa é decisão comercial da proprietária — quando ela
 * decidir, basta preencher `faixaPreco` abaixo e o parágrafo aparece sozinho.
 *
 * SOBRE O PRAZO: o site prometia "2 a 4 dias úteis". Os dados reais mostram prazo
 * interno mediano de 4,6 dias e 40% de atraso sobre esse prazo. Por isso aqui a
 * promessa é "prazo confirmado no orçamento" — que a operação cumpre sempre e
 * ainda vira diferencial de transparência.
 */

/** Preencha quando a faixa de preço for aprovada, ex.: "R$ 600 a R$ 1.100". */
const faixaPreco: string | null = null;

type Props = {
  /** Usado nos rótulos de evento, para medir qual página converte. */
  contexto: string;
  /** Mensagem que já vai preenchida no WhatsApp. */
  whatsappMessage: string;
  /** Alterna com a seção vizinha para as faixas não se fundirem. */
  fundo?: "creme" | "branco";
};

export function PrecoPrazoGarantia({ contexto, whatsappMessage, fundo = "creme" }: Props) {
  return (
    <section className={`${fundo === "creme" ? "bg-[#FFFBF2]" : "bg-white"} py-12 md:py-16`}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-rp-accent">
            Antes de você perguntar
          </p>
          <h2 className="mt-2 font-heading text-2xl font-bold leading-tight text-gray-900 md:text-4xl">
            Preço, prazo e garantia
          </h2>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <article className="rounded-xl border border-[#E8EEF8] bg-white p-5 shadow-sm">
            <h3 className="font-heading text-lg font-bold text-[#053282]">
              Quanto custa?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-700">
              Depende do motor e do estado real da peça — por isso a gente mede
              antes de dar preço. Você não paga por serviço que o cabeçote não
              precisava, e não recebe orçamento no escuro.
              {faixaPreco ? (
                <>
                  {" "}
                  Para dar uma referência honesta, a maior parte dos cabeçotes
                  que retificamos fica entre <strong>{faixaPreco}</strong>.
                </>
              ) : null}
            </p>
            <p className="mt-3 text-sm font-semibold text-[#053282]">
              Orçamento pelo WhatsApp em até 2 horas, sem compromisso.
            </p>
          </article>

          <article className="rounded-xl border border-[#E8EEF8] bg-white p-5 shadow-sm">
            <h3 className="font-heading text-lg font-bold text-[#053282]">
              Em quanto tempo fica pronto?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-700">
              O prazo é confirmado junto com o orçamento,{" "}
              <strong>antes de você decidir</strong>. Cada cabeçote chega num
              estado diferente: uns precisam só de plaina, outros de sedes,
              guias e teste de trinca.
            </p>
            <p className="mt-3 text-sm font-semibold text-[#053282]">
              Preferimos dar o prazo certo a dar o prazo bonito.
            </p>
          </article>

          <article className="rounded-xl border border-[#E8EEF8] bg-white p-5 shadow-sm">
            <h3 className="font-heading text-lg font-bold text-[#053282]">
              E se der problema depois?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-700">
              Garantia por escrito, com laudo técnico do que foi medido e do que
              foi feito. Se for oficina, é o documento que você repassa ao seu
              cliente.
            </p>
            <p className="mt-3 text-sm font-semibold text-[#053282]">
              Trabalhamos com cabeçote desde 2004.
            </p>
          </article>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <TrackedWhatsAppLink
            eventLabel={`${contexto}_ppg_whatsapp`}
            message={whatsappMessage}
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[#25D366] px-8 text-sm font-bold text-[#052E16] transition-all hover:brightness-110 sm:w-auto md:h-14 md:text-base"
          >
            Pedir meu orçamento agora
          </TrackedWhatsAppLink>
          <TrackedPhoneLink
            eventLabel={`${contexto}_ppg_phone`}
            className="inline-flex h-12 w-full items-center justify-center rounded-full border border-[#053282] px-8 text-sm font-bold text-[#053282] transition-all hover:bg-[#D9E7FF] sm:w-auto md:h-14 md:text-base"
          >
            Ligar {siteConfig.phone.display}
          </TrackedPhoneLink>
        </div>
      </div>
    </section>
  );
}
