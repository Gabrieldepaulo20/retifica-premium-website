/**
 * O que a gente confere — o elemento assinatura da página de serviço.
 *
 * Por que existe: o diferencial real da Retífica Premium é medir antes de dar
 * preço. Toda concorrente pesquisada abre com foto de oficina e texto
 * institucional; poucas mostram o que de fato conferem. Este cartão organiza,
 * em um só objeto, os pontos que antecedem o contato: o que é conferido, quando o
 * prazo é definido e qual é o limite da garantia informada.
 *
 * No lugar da foto genérica que ocupava esta metade do hero.
 *
 * Sem tolerância em número de propósito: tolerância varia por motor e publicar
 * um valor fixo seria inventar precisão que a peça não tem.
 */

type Props = {
  /** Nome curto do serviço, ex.: "Retífica de cabeçote". */
  servico: string;
  /** Pontos conferidos. Vem de `medicoesPorServico`. */
  medicoes: string[];
};

const linhas = [
  { rotulo: "Definição", valor: "depois de limpar e medir" },
  { rotulo: "Prazo", valor: "confirmado antes da aprovação" },
  { rotulo: "Garantia", valor: "3 meses no serviço executado" },
];

export function FichaMedicao({ servico, medicoes }: Props) {
  if (!medicoes?.length) return null;

  return (
    <figure className="ficha relative mx-auto w-full max-w-[460px] overflow-hidden rounded-2xl border border-rp-gold/25 bg-[#0B1B31]/85 shadow-[0_24px_60px_rgba(2,14,29,0.55)] backdrop-blur-sm">
      {/* Cabeçalho da ficha */}
      <figcaption className="flex items-baseline justify-between gap-3 border-b border-rp-gold/20 px-5 py-3.5">
        <span className="font-heading text-[11px] font-bold uppercase tracking-[0.22em] text-rp-gold">
          O que a gente confere
        </span>
        <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
          Retífica Premium
        </span>
      </figcaption>

      <div className="px-5 py-4">
        <div className="flex items-baseline justify-between gap-4 pb-3">
          <span className="font-heading text-[11px] font-bold uppercase tracking-[0.18em] text-white/45">
            Peça
          </span>
          <span className="text-right font-heading text-base font-bold text-white">
            {servico}
          </span>
        </div>

        {/* O que é conferido. A régua à esquerda é o traço de cota do desenho
            técnico — desenha na entrada, uma vez, em CSS puro. */}
        <p className="ficha-rotulo font-heading text-[11px] font-bold uppercase tracking-[0.18em] text-rp-gold/85">
          O que conferimos nesta peça
        </p>
        <ul className="ficha-lista relative mt-2.5 space-y-2 pl-4">
          {medicoes.map((item) => (
            <li
              key={item}
              className="relative text-sm leading-snug text-white/88 before:absolute before:-left-4 before:top-[0.6em] before:h-px before:w-2.5 before:bg-rp-gold/55"
            >
              {item}
            </li>
          ))}
        </ul>

        <dl className="mt-5 space-y-0 border-t border-white/10 pt-1">
          {linhas.map((linha) => (
            <div
              key={linha.rotulo}
              className="flex items-baseline justify-between gap-4 border-b border-white/8 py-2.5 last:border-b-0"
            >
              <dt className="font-heading text-[11px] font-bold uppercase tracking-[0.18em] text-white/45">
                {linha.rotulo}
              </dt>
              <dd className="text-right text-sm font-semibold text-white/92">
                {linha.valor}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Carimbo. É a frase que resume o negócio inteiro. */}
      <p className="border-t border-rp-gold/20 bg-rp-gold/8 px-5 py-3 text-center font-heading text-[12px] font-bold uppercase tracking-[0.2em] text-rp-gold">
        Medido antes do orçamento
      </p>
    </figure>
  );
}
