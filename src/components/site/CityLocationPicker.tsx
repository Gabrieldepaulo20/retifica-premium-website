"use client";

import { useEffect, useId, useRef, useState } from "react";
import { requestCity, type LocationPrecision, type Municipality } from "@/lib/city-location";

export function CityLocationPicker({ onConfirm }: { onConfirm: (city: string) => void }) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const active = useRef<AbortController | null>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  useEffect(() => () => active.current?.abort(), []);

  function close() {
    active.current?.abort();
    active.current = null;
    setBusy(false);
    setOpen(false);
    setSuggestion(null);
    setMessage("");
    trigger.current?.focus();
  }

  async function locate(mode: LocationPrecision) {
    if (!navigator.geolocation) {
      setMessage("Este navegador não oferece localização. Você pode digitar sua cidade.");
      return;
    }
    active.current?.abort();
    const controller = new AbortController();
    active.current = controller;
    setBusy(true);
    setSuggestion(null);
    setMessage("Aguardando sua autorização e a localização. Você pode cancelar.");
    try {
      const city = await requestCity(mode, controller.signal, navigator.geolocation, async () => {
        // Static public map: no visitor coordinates in the request or URL.
        const response = await fetch("/data/municipios-sp.json", { signal: controller.signal });
        if (!response.ok) throw new Error("map-unavailable");
        return await response.json() as Municipality[];
      });
      if (active.current !== controller || controller.signal.aborted) return;
      setSuggestion(city);
      setMessage(city ? "Confira a cidade sugerida antes de usar."
        : "Não conseguimos identificar sua cidade com segurança. Digite no campo acima.");
    } catch (error) {
      if (active.current !== controller || controller.signal.aborted) return;
      setMessage(error instanceof Error && error.message === "denied"
        ? "Localização não autorizada. Você pode digitar sua cidade e continuar normalmente."
        : "Não foi possível obter a localização. Tente novamente ou digite sua cidade.");
    } finally {
      if (active.current === controller) {
        setBusy(false);
        active.current = null;
      }
    }
  }

  const buttonClass = "min-h-11 rounded-xl border border-white/35 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rp-gold disabled:opacity-50";
  return (
    <div className="mt-2 text-white">
      <button ref={trigger} type="button" aria-expanded={open} aria-controls={panelId}
        className="min-h-11 text-sm font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-rp-gold"
        onClick={() => { if (open) close(); else setOpen(true); }}>
        Usar minha localização (opcional)
      </button>
      {open ? (
        <fieldset id={panelId} className="mt-2 rounded-xl border border-white/20 bg-black/15 p-4"
          onKeyDown={(event) => { if (event.key === "Escape") { event.preventDefault(); close(); } }}>
          <legend className="px-1 text-sm font-semibold">Como prefere informar sua localização?</legend>
          <p className="mb-3 text-xs leading-relaxed text-white/80">
            Usamos a posição apenas neste aparelho para sugerir sua cidade. Não guardamos nem enviamos coordenadas.
            A opção exata pede maior precisão, conforme o navegador permitir. A identificação automática está disponível em SP.
          </p>
          <div className="flex flex-wrap gap-2">
            <button type="button" className={buttonClass} disabled={busy} onClick={() => void locate("approximate")}>Localização aproximada</button>
            <button type="button" className={buttonClass} disabled={busy} onClick={() => void locate("precise")}>Localização exata</button>
            <button type="button" className={buttonClass} onClick={close}>Cancelar</button>
          </div>
          <p role="status" aria-live="polite" className="mt-3 text-sm leading-relaxed">{message}</p>
          {suggestion ? (
            <button type="button" className="mt-3 min-h-11 rounded-xl bg-rp-gold px-4 py-2 text-sm font-bold text-[#1A1200] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              onClick={() => { onConfirm(suggestion); close(); }}>
              Usar {suggestion}
            </button>
          ) : null}
        </fieldset>
      ) : null}
    </div>
  );
}
