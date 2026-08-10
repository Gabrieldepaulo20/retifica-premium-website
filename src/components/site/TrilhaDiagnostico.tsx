"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Régua de cota — o elemento assinatura de /servicos.
 *
 * Uma linha âmbar contínua na lateral da página, com um traço horizontal em
 * cada seção, como cota de desenho técnico. Ela se preenche conforme a pessoa
 * rola: dá a sensação de percorrer um laudo em vez de um catálogo, e é o que
 * sustenta a curiosidade de continuar descendo.
 *
 * Vem do instrumento de medição, não de decoração — que é a diferença entre
 * este elemento e a barra de progresso genérica que qualquer site tem.
 *
 * Custo: uma linha em CSS e um IntersectionObserver. Sem biblioteca. Some
 * abaixo de `lg` porque no celular rouba largura útil de uma tela onde 61% das
 * pessoas saem em menos de 10 segundos.
 */

export type EstacaoTrilha = {
  /** Id da seção correspondente no DOM. */
  id: string;
  /** Rótulo curto que aparece ao lado do traço. */
  rotulo: string;
};

export function TrilhaDiagnostico({ estacoes }: { estacoes: EstacaoTrilha[] }) {
  const [ativa, setAtiva] = useState(0);
  const [progresso, setProgresso] = useState(0);
  const raf = useRef(0);

  useEffect(() => {
    const alvos = estacoes
      .map((e) => document.getElementById(e.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!alvos.length) return;

    const obs = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting) continue;
          const i = alvos.indexOf(entrada.target as HTMLElement);
          if (i >= 0) setAtiva(i);
        }
      },
      // A estação troca quando a seção cruza o terço superior da tela.
      { rootMargin: "-32% 0px -60% 0px", threshold: 0 },
    );
    alvos.forEach((el) => obs.observe(el));

    const aoRolar = () => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        setProgresso(total > 0 ? Math.min(1, window.scrollY / total) : 0);
      });
    };
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });

    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", aoRolar);
      cancelAnimationFrame(raf.current);
    };
  }, [estacoes]);

  return (
    <nav
      aria-label="Etapas do diagnóstico"
      className="pointer-events-none fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
    >
      {/* Trilho */}
      <div className="relative w-44 pl-5">
        <span
          aria-hidden="true"
          className="absolute left-0 top-0 h-full w-px bg-white/12"
        />
        <span
          aria-hidden="true"
          className="absolute left-0 top-0 w-px origin-top bg-rp-gold/70 transition-transform duration-150 ease-out"
          style={{ height: "100%", transform: `scaleY(${progresso})` }}
        />

        <ol className="space-y-3.5">
          {estacoes.map((estacao, i) => {
            const atual = i === ativa;
            return (
              <li key={estacao.id} className="relative">
                <a
                  href={`#${estacao.id}`}
                  className="pointer-events-auto group flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rp-gold"
                  aria-current={atual ? "step" : undefined}
                >
                  <span
                    aria-hidden="true"
                    className={`h-px transition-all duration-300 ${
                      atual ? "w-4 bg-rp-gold" : "w-2 bg-white/25 group-hover:w-3 group-hover:bg-white/50"
                    }`}
                  />
                  <span
                    className={`font-heading text-[10px] font-bold uppercase tracking-[0.16em] transition-colors duration-300 ${
                      atual ? "text-rp-gold" : "text-white/35 group-hover:text-white/70"
                    }`}
                  >
                    {estacao.rotulo}
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
