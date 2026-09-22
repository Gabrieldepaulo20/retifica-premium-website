"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const EstimativaGuiada = dynamic(
  () => import("./EstimativaGuiada").then((module) => module.EstimativaGuiada),
  { loading: () => <p role="status">Carregando perguntas…</p> }
);

/** A triagem detalhada só baixa e monta quando solicitada. */
export function EstimativaOpcional() {
  const [aberta, setAberta] = useState(false);
  return (
    <div>
      <button
        type="button"
        aria-expanded={aberta}
        aria-controls="estimativa-detalhada"
        onClick={() => setAberta((value) => !value)}
        className="min-h-12 rounded-xl border border-white/35 px-5 py-3 text-left font-heading text-base font-bold text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rp-gold"
      >
        {aberta ? "Ocultar perguntas" : "Quero organizar meu caso em 6 perguntas"}
      </button>
      <div id="estimativa-detalhada" hidden={!aberta} className={aberta ? "mt-6" : ""}>
        {aberta ? <EstimativaGuiada /> : null}
      </div>
    </div>
  );
}
