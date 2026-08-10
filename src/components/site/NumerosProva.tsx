"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Faixa de números com contagem animada ao entrar na tela.
 *
 * Por que sem biblioteca: o site inteiro tem 3 dependências (next, react,
 * react-dom) e é por isso que carrega rápido. Trazer uma biblioteca de animação
 * para um contador custaria ~35 KB numa página onde 61% do tráfego pago sai em
 * menos de 10 segundos — e "velocidade da página" é componente direto da nota de
 * qualidade do Google, que hoje está abaixo da média em todas as palavras.
 * Quando o zigue-zague com revelação de scroll for construído, aí a biblioteca
 * se paga e este contador migra para ela.
 *
 * Respeita `prefers-reduced-motion`: quem pediu menos movimento vê o número
 * final direto.
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

const DURACAO_MS = 1100;

function useContagemNaTela(alvo: number, ativo: boolean) {
  const [valor, setValor] = useState(0);

  useEffect(() => {
    if (!ativo) return;

    // Quem pediu menos movimento recebe duração zero: o primeiro quadro já
    // pinta o número final, sem animação e sem salto.
    const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duracao = semMovimento ? 0 : DURACAO_MS;

    let frame = 0;
    let inicio: number | null = null;

    const passo = (agora: number) => {
      if (inicio === null) inicio = agora;
      const t = duracao === 0 ? 1 : Math.min(1, (agora - inicio) / duracao);
      // easeOutCubic: rápido no começo, desacelera no fim.
      const eased = 1 - (1 - t) ** 3;
      setValor(Math.round(alvo * eased));
      if (t < 1) frame = requestAnimationFrame(passo);
    };

    frame = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(frame);
  }, [alvo, ativo]);

  return valor;
}

function Item({ numero, ativo, tom }: { numero: NumeroProva; ativo: boolean; tom: "claro" | "escuro" }) {
  const valor = useContagemNaTela(numero.valor, ativo);
  const cor = tom === "claro" ? "text-rp-gold" : "text-[#053282]";
  const corRotulo = tom === "claro" ? "text-white/55" : "text-gray-500";

  return (
    <li className="flex flex-col">
      <p className={`font-heading text-[1.75rem] font-bold leading-none tabular-nums md:text-4xl ${cor}`}>
        {numero.prefixo}
        {valor.toLocaleString("pt-BR")}
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
  const ref = useRef<HTMLUListElement>(null);
  const [ativo, setAtivo] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || ativo) return;
    const obs = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setAtivo(true);
          obs.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ativo]);

  /* Sem caixa: a moldura arredondada empilhava mais uma borda numa tela que já
     tem botões e chips com borda, e o conjunto virava ruído. Números com peso
     tipográfico e uma régua fina separando as colunas leem melhor e não
     competem com o CTA. */
  const divisor = tom === "claro" ? "divide-white/10" : "divide-gray-200";
  const topo = tom === "claro" ? "border-white/10" : "border-gray-200";

  return (
    <ul
      ref={ref}
      className={`grid grid-cols-2 gap-y-6 border-t ${topo} pt-6 sm:grid-cols-4 sm:gap-y-0 sm:divide-x ${divisor} sm:[&>li]:pl-5 sm:[&>li:first-child]:pl-0 ${className}`}
    >
      {numeros.map((n) => (
        <Item key={n.rotulo} numero={n} ativo={ativo} tom={tom} />
      ))}
    </ul>
  );
}
