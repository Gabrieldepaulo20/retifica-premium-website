"use client";

import { useEffect, useId, useRef, useState } from "react";
import { requestCity, type LocationPrecision, type Municipality } from "@/lib/city-location";
import { confirmSessionCity } from "@/lib/trackingEvents";

export function CityLocationPicker({ onConfirm, allowManual = false, label = "Usar minha localização (opcional)" }: {
  onConfirm: (city: string) => void;
  allowManual?: boolean;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [method, setMethod] = useState<LocationPrecision>("approximate");
  const [manualCity, setManualCity] = useState("");
  const active = useRef<AbortController | null>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  useEffect(() => () => { active.current?.abort(); active.current = null; }, []);

  function confirm(city: string, source: "manual" | LocationPrecision) {
    if (!confirmSessionCity(city, source)) {
      setMessage("Informe apenas o nome da cidade, sem endereço ou telefone.");
      return;
    }
    onConfirm(city.trim());
    close();
  }

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
    setMethod(mode);
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
        : "Não conseguimos identificar sua cidade com segurança. Você pode digitá-la manualmente.");
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
        {label}
      </button>
      {open ? (
        <fieldset id={panelId} className="mt-2 rounded-xl border border-white/20 bg-black/15 p-4"
          onKeyDown={(event) => { if (event.key === "Escape") { event.preventDefault(); close(); } }}>
          <legend className="px-1 text-sm font-semibold">Como prefere informar sua localização?</legend>
          <p className="mb-3 text-xs leading-relaxed text-white/80">
            Usamos a posição apenas neste aparelho para sugerir sua cidade. Não guardamos nem enviamos coordenadas.
            A opção exata pede maior precisão, conforme o navegador permitir. A identificação automática está disponível em SP.
            Ao confirmar, você compartilha somente a cidade com a Retífica Premium, junto das páginas desta visita,
            para orientar o atendimento e entender a procura na região. É opcional.
          </p>
          <div className="flex flex-wrap gap-2">
            <button type="button" className={buttonClass} disabled={busy} onClick={() => void locate("approximate")}>Localização aproximada</button>
            <button type="button" className={buttonClass} disabled={busy} onClick={() => void locate("precise")}>Localização exata</button>
            <button type="button" className={buttonClass} onClick={close}>Cancelar</button>
          </div>
          <p role="status" aria-live="polite" className="mt-3 text-sm leading-relaxed">{message}</p>
          {allowManual ? (
            <div className="mt-3">
              <label htmlFor={`${panelId}-city`} className="mb-1 block text-sm">Ou digite sua cidade</label>
              <div className="flex flex-wrap gap-2">
                <input id={`${panelId}-city`} type="text" maxLength={60} autoComplete="address-level2"
                  className="min-h-11 min-w-0 flex-1 rounded-xl border border-white/35 bg-white px-3 text-sm text-slate-950 focus-visible:outline-2 focus-visible:outline-rp-gold"
                  value={manualCity} onChange={(event) => setManualCity(event.target.value)} placeholder="Ex.: Ribeirão Preto" />
                <button type="button" className={buttonClass} disabled={busy || manualCity.trim().length < 2}
                  onClick={() => confirm(manualCity, "manual")}>Confirmar cidade</button>
              </div>
            </div>
          ) : null}
          {suggestion ? (
            <button type="button" className="mt-3 min-h-11 rounded-xl bg-rp-gold px-4 py-2 text-sm font-bold text-[#1A1200] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              onClick={() => confirm(suggestion, method)}>
              Usar {suggestion}
            </button>
          ) : null}
        </fieldset>
      ) : null}
    </div>
  );
}
