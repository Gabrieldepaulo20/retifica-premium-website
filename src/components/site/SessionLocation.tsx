"use client";

import { useState } from "react";
import { CityLocationPicker } from "@/components/site/CityLocationPicker";

export function SessionLocation() {
  const [city, setCity] = useState("");
  return (
    <aside aria-label="Cidade para atendimento" className="border-t border-white/10 bg-[#020E1D] px-4 pb-2 text-white sm:px-6">
      <div className="mx-auto max-w-7xl">
        {city ? <p role="status" className="pt-2 text-xs text-white/80">Cidade informada: {city}</p> : null}
        <CityLocationPicker onConfirm={setCity} allowManual
          label={city ? "Alterar minha cidade" : "Informar minha cidade (opcional)"} />
      </div>
    </aside>
  );
}
