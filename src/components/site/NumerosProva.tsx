/**
 * Faixa estática de números. O valor real já nasce no HTML, sem começar em zero,
 * para leitores de tela, renderização sem JavaScript e métricas de layout.
 */

export type NumeroProva = {
  /** Valor final. */
  valor: number;
  /** Prefixo colado no número, ex.: "+". */
  prefixo?: string;
  /** Sufixo colado no número, ex.: "h" ou "anos". */
  sufixo?: string;
  /** Legenda abaixo do número. */
  rotulo: string;
};

type Props = {
  numeros: NumeroProva[];
  /** `escuro` para fundo claro, `claro` para fundo escuro. */
  tom?: "claro" | "escuro";
  className?: string;
};

function Item({ numero, tom }: { numero: NumeroProva; tom: "claro" | "escuro" }) {
  const cor = tom === "claro" ? "text-rp-gold" : "text-[#053282]";
  const corRotulo = tom === "claro" ? "text-white/55" : "text-gray-500";

  return (
    <li className="flex flex-col">
      <p className={`font-heading text-[1.75rem] font-bold leading-none tabular-nums md:text-4xl ${cor}`}>
        {numero.prefixo}
        {numero.valor.toLocaleString("pt-BR")}
        {numero.sufixo}
      </p>
      {/* Altura fixa no rótulo: sem isso, legendas de uma e de duas linhas
          desalinham a base de cada coluna e a faixa inteira parece torta. */}
      <p className={`mt-2 min-h-[2.4rem] text-[15px] leading-snug ${corRotulo}`}>
        {numero.rotulo}
      </p>
    </li>
  );
}

export function NumerosProva({ numeros, tom = "claro", className = "" }: Props) {
  /* Sem caixa: a moldura arredondada empilhava mais uma borda numa tela que já
     tem botões e chips com borda, e o conjunto virava ruído. Números com peso
     tipográfico e uma régua fina separando as colunas leem melhor e não
     competem com o CTA. */
  const divisor = tom === "claro" ? "divide-white/10" : "divide-gray-200";
  const topo = tom === "claro" ? "border-white/10" : "border-gray-200";

  return (
    <ul
      className={`grid grid-cols-2 gap-y-6 border-t ${topo} pt-6 sm:grid-cols-4 sm:gap-y-0 sm:divide-x ${divisor} sm:[&>li]:pl-5 sm:[&>li:first-child]:pl-0 ${className}`}
    >
      {numeros.map((n) => (
        <Item key={n.rotulo} numero={n} tom={tom} />
      ))}
    </ul>
  );
}
