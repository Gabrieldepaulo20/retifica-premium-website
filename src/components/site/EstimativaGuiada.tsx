"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  buildEstimateResult,
  buildWhatsAppEstimateMessage,
  contactPreferenceLabels,
  diagnosisOptions,
  fuelLabels,
  initialQuizAnswers,
  profileLabels,
  situationLabels,
  symptomOptions,
  urgencyLabels,
  type ContactPreference,
  type CustomerProfile,
  type FuelType,
  type QuizAnswers,
  type QuizFlow,
  type Urgency,
  type VehicleSituation,
} from "@/lib/estimativa-guiada";
import { siteConfig } from "@/lib/site";
import {
  buildWhatsAppUrlWithAttribution,
  trackFunnelEvent,
} from "@/lib/trackingEvents";

const STORAGE_KEY = "retifica_premium_guided_estimate_v1";
const STORAGE_TTL_MS = 24 * 60 * 60 * 1000;
const TOTAL_STEPS = 7;

const vehicleCatalog: Record<string, string[]> = {
  Chevrolet: ["Celta", "Classic", "Cobalt", "Onix", "S10", "Spin"],
  Fiat: ["Argo", "Doblo", "Fiorino", "Palio", "Strada", "Toro", "Uno"],
  Ford: ["EcoSport", "Fiesta", "Focus", "Ka", "Ranger"],
  Honda: ["Civic", "City", "Fit", "HR-V"],
  Hyundai: ["Creta", "HB20", "i30", "Tucson"],
  Renault: ["Clio", "Duster", "Kangoo", "Logan", "Sandero"],
  Toyota: ["Corolla", "Etios", "Hilux", "Yaris"],
  Volkswagen: ["Amarok", "Fox", "Gol", "Kombi", "Polo", "Saveiro", "T-Cross", "Voyage"],
};

type PersistedQuiz = {
  savedAt: number;
  step: number;
  started: boolean;
  attendanceCode: string;
  answers: QuizAnswers;
};

type OptionProps = {
  selected: boolean;
  label: string;
  description?: string;
  multiple?: boolean;
  onClick: () => void;
};

function Option({ selected, label, description, multiple, onClick }: OptionProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`group flex min-h-14 w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rp-gold ${
        selected
          ? "border-rp-gold bg-rp-gold/12 text-white"
          : "border-white/18 bg-white/[0.045] text-white/88 hover:border-white/38 hover:bg-white/[0.075]"
      }`}
    >
      <span
        aria-hidden="true"
        className={`flex h-5 w-5 shrink-0 items-center justify-center border ${
          multiple ? "rounded" : "rounded-full"
        } ${selected ? "border-rp-gold bg-rp-gold text-[#1A1200]" : "border-white/35"}`}
      >
        {selected ? <span className="text-xs font-black">✓</span> : null}
      </span>
      <span>
        <span className="block font-heading text-base font-bold leading-tight">{label}</span>
        {description ? (
          <span className="mt-0.5 block text-sm leading-snug text-white/60">{description}</span>
        ) : null}
      </span>
    </button>
  );
}

function Field({
  label,
  optional,
  children,
}: {
  label: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-heading text-sm font-bold text-white/85">
        {label} {optional ? <span className="font-normal text-white/45">(opcional)</span> : null}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "min-h-12 w-full rounded-xl border border-white/20 bg-[#081b34] px-3.5 text-base text-white outline-none placeholder:text-white/35 focus:border-rp-gold focus:ring-1 focus:ring-rp-gold";

function createAttendanceCode() {
  const now = new Date();
  const suffix =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().replaceAll("-", "").slice(0, 4).toUpperCase()
      : Math.random().toString(36).slice(2, 6).toUpperCase();
  return `RP-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${suffix}`;
}

function experimentContext() {
  if (typeof window === "undefined") {
    return { experiment_id: "services-hero-v1", variant_id: "organic" };
  }
  const params = new URLSearchParams(window.location.search);
  return {
    experiment_id: params.get("experiment_id") || params.get("exp") || "services-hero-v1",
    variant_id: params.get("variant_id") || params.get("variant") || "organic",
  };
}

export function EstimativaGuiada() {
  const [answers, setAnswers] = useState<QuizAnswers>(initialQuizAnswers);
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(1);
  const [attendanceCode, setAttendanceCode] = useState("");
  const [error, setError] = useState("");
  const [online, setOnline] = useState(true);
  const [restored, setRestored] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const result = useMemo(() => buildEstimateResult(answers), [answers]);
  const models = answers.vehicle.make ? vehicleCatalog[answers.vehicle.make] ?? [] : [];

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    const initializationTimer = window.setTimeout(() => {
      setOnline(navigator.onLine);
      try {
        const raw = window.sessionStorage.getItem(STORAGE_KEY);
        if (raw) {
          const saved = JSON.parse(raw) as PersistedQuiz;
          if (Date.now() - saved.savedAt < STORAGE_TTL_MS) {
            setAnswers(saved.answers);
            setStep(Math.min(TOTAL_STEPS, Math.max(1, saved.step)));
            setStarted(saved.started);
            setAttendanceCode(saved.attendanceCode || createAttendanceCode());
            setRestored(saved.started);
          } else {
            window.sessionStorage.removeItem(STORAGE_KEY);
          }
        }
      } catch {
        // A triagem continua em memória se o navegador bloquear o armazenamento.
      }
    }, 0);

    return () => {
      window.clearTimeout(initializationTimer);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    if (!started) return;
    try {
      const persisted: PersistedQuiz = {
        savedAt: Date.now(),
        step,
        started,
        attendanceCode,
        answers,
      };
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(persisted));
    } catch {
      // O estado em memória é suficiente para concluir o fluxo atual.
    }
  }, [answers, attendanceCode, started, step]);

  useEffect(() => {
    if (!started) return;
    headingRef.current?.focus();
    trackFunnelEvent("quiz_step_view", {
      ...experimentContext(),
      component_id: "guided_estimate",
      page_type: "estimate",
      flow_type: answers.flow ?? "unknown",
      step_id: `step_${step}`,
    });
    if (step === 7) {
      trackFunnelEvent("quiz_result_view", {
        ...experimentContext(),
        component_id: "guided_estimate_result",
        page_type: "estimate",
        flow_type: answers.flow ?? "unknown",
        step_id: "step_7",
        estimate_state: result.state,
      });
      trackFunnelEvent("quiz_estimate_state", {
        ...experimentContext(),
        component_id: "guided_estimate_result",
        page_type: "estimate",
        estimate_state: result.state,
      });
    }
  }, [answers.flow, result.state, started, step]);

  function update(next: Partial<QuizAnswers>) {
    setAnswers((current) => ({ ...current, ...next }));
  }

  function updateVehicle(next: Partial<QuizAnswers["vehicle"]>) {
    setAnswers((current) => ({
      ...current,
      vehicle: { ...current.vehicle, ...next },
    }));
  }

  function selectFlow(flow: QuizFlow) {
    const code = attendanceCode || createAttendanceCode();
    setAttendanceCode(code);
    setAnswers((current) => ({ ...current, flow }));
    setStarted(true);
    setStep(1);
    trackFunnelEvent("quiz_start", {
      ...experimentContext(),
      component_id: "guided_estimate_entry",
      position: "estimate_hero",
      page_type: "estimate",
      flow_type: flow,
    });
    trackFunnelEvent("quiz_flow_selected", {
      ...experimentContext(),
      component_id: "guided_estimate_entry",
      page_type: "estimate",
      flow_type: flow,
    });
  }

  function validateCurrentStep() {
    if (step === 1 && !answers.profile) return "Escolha como você está buscando atendimento.";
    if (step === 2 && !answers.vehicle.unknown && !answers.vehicle.make.trim()) {
      return "Informe ao menos a marca ou marque que não sabe informar.";
    }
    if (step === 3 && !answers.situation) return "Escolha como o veículo ou a peça está agora.";
    if (step === 4 && answers.symptoms.length === 0) return "Escolha ao menos um sinal ou marque “Não sei”.";
    if (step === 5 && !answers.knownDiagnosis) return "Informe se alguém já indicou um serviço ou diagnóstico.";
    if (step === 6 && !answers.city.trim()) return "Informe sua cidade para orientarmos o atendimento.";
    if (step === 6 && !answers.urgency) return "Escolha para quando você precisa.";
    if (step === 6 && !answers.contactPreference) return "Escolha como prefere continuar o atendimento.";
    return "";
  }

  function next() {
    const validationError = validateCurrentStep();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    trackFunnelEvent("quiz_step_complete", {
      ...experimentContext(),
      component_id: "guided_estimate",
      page_type: "estimate",
      flow_type: answers.flow ?? "unknown",
      step_id: `step_${step}`,
    });
    setStep((current) => Math.min(TOTAL_STEPS, current + 1));
  }

  function back() {
    setError("");
    trackFunnelEvent("quiz_back", {
      ...experimentContext(),
      component_id: "guided_estimate",
      page_type: "estimate",
      step_id: `step_${step}`,
    });
    if (step === 1) {
      setStarted(false);
      return;
    }
    setStep((current) => Math.max(1, current - 1));
  }

  function toggleSymptom(value: string) {
    setAnswers((current) => {
      const next = value === "unknown"
        ? ["unknown"]
        : current.symptoms
            .filter((item) => item !== "unknown")
            .includes(value)
          ? current.symptoms.filter((item) => item !== value)
          : [...current.symptoms.filter((item) => item !== "unknown"), value];
      return { ...current, symptoms: next };
    });
    if (value === "unknown") {
      trackFunnelEvent("quiz_unknown_selected", {
        ...experimentContext(),
        component_id: "symptoms",
        page_type: "estimate",
        step_id: "step_4",
      });
    }
  }

  function resetQuiz() {
    setAnswers(initialQuizAnswers);
    setStarted(false);
    setStep(1);
    setAttendanceCode("");
    setRestored(false);
    setError("");
    try {
      window.sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Nada a limpar quando o storage está indisponível.
    }
  }

  function openWhatsApp() {
    const message = buildWhatsAppEstimateMessage(answers, result, attendanceCode);
    trackFunnelEvent("quiz_whatsapp_prepared", {
      ...experimentContext(),
      component_id: "guided_estimate_result",
      position: "result_primary",
      page_type: "estimate",
      flow_type: answers.flow ?? "unknown",
      estimate_state: result.state,
    });
    trackFunnelEvent("quiz_whatsapp_click", {
      ...experimentContext(),
      component_id: "guided_estimate_result",
      position: "result_primary",
      page_type: "estimate",
      flow_type: answers.flow ?? "unknown",
      estimate_state: result.state,
    });
    const url = buildWhatsAppUrlWithAttribution(
      siteConfig.whatsapp.number,
      message,
      { includeContactCode: false }
    );
    window.open(url, "_blank", "noopener,noreferrer");
  }

  if (!started) {
    return (
      <div className="rounded-3xl border border-white/14 bg-[#06172e]/95 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:p-7">
        <div className="grid gap-3 sm:grid-cols-2">
          <Option
            selected={false}
            label="Sei qual é meu veículo"
            description="Comece pelos dados que você já conhece."
            onClick={() => selectFlow("vehicle_known")}
          />
          <Option
            selected={false}
            label="Não sei exatamente o problema"
            description="Conte só os sinais. Não precisa saber o nome do serviço."
            onClick={() => selectFlow("problem_unknown")}
          />
        </div>
        <p className="mt-4 text-sm leading-relaxed text-white/55">
          O resultado aparece sem pedir nome ou telefone. Não é diagnóstico e ainda não mostra preço: a base comercial está em auditoria.
        </p>
      </div>
    );
  }

  const stepTitles = [
    "Quem está solicitando?",
    "Qual é o veículo?",
    "Como o veículo ou a peça está agora?",
    "Quais sinais você percebeu?",
    "O que já foi indicado?",
    "Onde e para quando você precisa?",
    "Sua triagem está pronta",
  ];

  return (
    <div className="rounded-3xl border border-white/14 bg-[#06172e]/95 shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
      <div className="border-b border-white/10 px-5 py-4 sm:px-7">
        <div className="flex items-center justify-between gap-4 text-xs font-bold uppercase tracking-[0.16em] text-white/55">
          <span>Etapa {step} de {TOTAL_STEPS}</span>
          <span>{Math.round((step / TOTAL_STEPS) * 100)}%</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
          <div
            className="h-full rounded-full bg-rp-gold transition-[width] duration-300 motion-reduce:transition-none"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      <div className="p-5 sm:p-7">
        {!online ? (
          <div className="mb-5 rounded-xl border border-rp-gold/35 bg-rp-gold/10 px-4 py-3 text-sm leading-relaxed text-rp-gold">
            Você está sem internet. Suas respostas continuam neste aparelho; tente abrir o WhatsApp novamente quando a conexão voltar.
          </div>
        ) : null}
        {restored ? (
          <button
            type="button"
            onClick={() => setRestored(false)}
            className="mb-5 w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-left text-sm text-white/70"
          >
            Retomamos suas respostas anteriores. <span className="font-bold text-white">Continuar</span>
          </button>
        ) : null}

        <h2
          ref={headingRef}
          tabIndex={-1}
          className="font-heading text-2xl font-bold leading-tight text-white outline-none sm:text-3xl"
        >
          {stepTitles[step - 1]}
        </h2>

        <div className="mt-6">
          {step === 1 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {(Object.entries(profileLabels) as [CustomerProfile, string][]).map(([value, label]) => (
                <Option key={value} selected={answers.profile === value} label={label} onClick={() => update({ profile: value })} />
              ))}
            </div>
          ) : null}

          {step === 2 ? (
            <div>
              <button
                type="button"
                aria-pressed={answers.vehicle.unknown}
                onClick={() => {
                  updateVehicle({ unknown: !answers.vehicle.unknown });
                  trackFunnelEvent("quiz_unknown_selected", {
                    ...experimentContext(), component_id: "vehicle", page_type: "estimate", step_id: "step_2",
                  });
                }}
                className={`mb-5 min-h-11 rounded-full border px-4 text-sm font-bold ${answers.vehicle.unknown ? "border-rp-gold bg-rp-gold text-[#1A1200]" : "border-white/25 text-white"}`}
              >
                Não sei informar
              </button>
              {!answers.vehicle.unknown ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Marca">
                    <input className={inputClass} list="vehicle-makes" value={answers.vehicle.make} onChange={(event) => updateVehicle({ make: event.target.value, model: "" })} placeholder="Ex.: Fiat" autoComplete="off" />
                  </Field>
                  <datalist id="vehicle-makes">{Object.keys(vehicleCatalog).map((make) => <option key={make} value={make} />)}</datalist>
                  <Field label="Modelo">
                    <input className={inputClass} list="vehicle-models" value={answers.vehicle.model} onChange={(event) => updateVehicle({ model: event.target.value })} placeholder="Ex.: Strada" autoComplete="off" />
                  </Field>
                  <datalist id="vehicle-models">{models.map((model) => <option key={model} value={model} />)}</datalist>
                  <Field label="Ano" optional><input className={inputClass} inputMode="numeric" value={answers.vehicle.year} onChange={(event) => updateVehicle({ year: event.target.value.slice(0, 4) })} placeholder="Ex.: 2018" /></Field>
                  <Field label="Motorização" optional><input className={inputClass} value={answers.vehicle.engine} onChange={(event) => updateVehicle({ engine: event.target.value })} placeholder="Ex.: 1.6 16V" /></Field>
                  <Field label="Combustível" optional>
                    <select className={inputClass} value={answers.vehicle.fuel ?? ""} onChange={(event) => updateVehicle({ fuel: (event.target.value || null) as FuelType | null })}>
                      <option value="">Selecione</option>
                      {(Object.entries(fuelLabels) as [FuelType, string][]).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                    </select>
                  </Field>
                  <Field label="Código do motor" optional><input className={inputClass} value={answers.vehicle.engineCode} onChange={(event) => updateVehicle({ engineCode: event.target.value })} placeholder="Se estiver disponível" /></Field>
                </div>
              ) : (
                <p className="rounded-xl border border-white/12 bg-white/[0.04] p-4 text-sm leading-relaxed text-white/65">
                  Tudo bem. A falta desses dados reduz a precisão, mas não impede a triagem.
                </p>
              )}
            </div>
          ) : null}

          {step === 3 ? (
            <div className="space-y-3">
              {(Object.entries(situationLabels) as [VehicleSituation, string][]).map(([value, label]) => (
                <Option key={value} selected={answers.situation === value} label={label} onClick={() => update({ situation: value })} />
              ))}
              {answers.situation === "mechanic_assessed" ? (
                <Field label="O que o mecânico informou?" optional>
                  <textarea className={`${inputClass} min-h-24 py-3`} maxLength={300} value={answers.mechanicAssessment} onChange={(event) => update({ mechanicAssessment: event.target.value })} placeholder="Resuma em até 300 caracteres" />
                </Field>
              ) : null}
            </div>
          ) : null}

          {step === 4 ? (
            <div>
              <p className="mb-4 text-sm leading-relaxed text-white/60">Pode marcar mais de uma opção. Isso orienta verificações, não confirma um diagnóstico.</p>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {symptomOptions.map(([value, label]) => (
                  <Option key={value} multiple selected={answers.symptoms.includes(value)} label={label} onClick={() => toggleSymptom(value)} />
                ))}
              </div>
              {answers.symptoms.includes("other") ? (
                <div className="mt-4"><Field label="Outro sinal" optional><input className={inputClass} value={answers.otherSymptom} onChange={(event) => update({ otherSymptom: event.target.value })} maxLength={120} /></Field></div>
              ) : null}
              {answers.situation === "running" && answers.symptoms.some((item) => ["overheating", "oil_water_mix", "reservoir_pressure", "returned_problem"].includes(item)) ? (
                <div className="mt-5 rounded-xl border border-amber-400/50 bg-amber-300/10 p-4 text-sm leading-relaxed text-amber-100" role="alert">
                  <strong className="block font-heading text-base">Orientação de segurança</strong>
                  Há sinais que podem piorar se o veículo continuar em uso. Sem confirmar a causa, recomendamos evitar rodar e pedir orientação ao mecânico ou à Retífica Premium.
                </div>
              ) : null}
            </div>
          ) : null}

          {step === 5 ? (
            <div>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {diagnosisOptions.map(([value, label]) => (
                  <Option key={value} selected={answers.knownDiagnosis === value} label={label} onClick={() => update({ knownDiagnosis: value })} />
                ))}
              </div>
              {answers.knownDiagnosis && answers.knownDiagnosis !== "none" ? (
                <div className="mt-5 grid gap-4">
                  <Field label="Diagnóstico recebido" optional><textarea className={`${inputClass} min-h-24 py-3`} maxLength={300} value={answers.diagnosisText} onChange={(event) => update({ diagnosisText: event.target.value })} placeholder="Até 300 caracteres" /></Field>
                  <Field label="Serviço desejado, se souber" optional><input className={inputClass} value={answers.desiredService} onChange={(event) => update({ desiredService: event.target.value })} /></Field>
                </div>
              ) : null}
              <fieldset className="mt-5">
                <legend className="mb-2 font-heading text-sm font-bold text-white/85">Tenho fotos ou orçamento anterior</legend>
                <div className="grid grid-cols-2 gap-3">
                  <Option selected={answers.hasFiles === true} label="Sim" onClick={() => { update({ hasFiles: true }); trackFunnelEvent("quiz_file_intent", { ...experimentContext(), component_id: "files", page_type: "estimate", step_id: "step_5" }); }} />
                  <Option selected={answers.hasFiles === false} label="Não" onClick={() => update({ hasFiles: false })} />
                </div>
                {answers.hasFiles ? <p className="mt-2 text-sm text-white/55">Na fase atual, você envia os arquivos diretamente depois que o WhatsApp abrir.</p> : null}
              </fieldset>
            </div>
          ) : null}

          {step === 6 ? (
            <div className="grid gap-5">
              <Field label="Cidade"><input className={inputClass} value={answers.city} onChange={(event) => update({ city: event.target.value })} placeholder="Ex.: Sertãozinho" /></Field>
              <fieldset><legend className="mb-2 font-heading text-sm font-bold text-white/85">Para quando você precisa?</legend><div className="grid gap-2.5 sm:grid-cols-2">{(Object.entries(urgencyLabels) as [Urgency, string][]).map(([value, label]) => <Option key={value} selected={answers.urgency === value} label={label} onClick={() => update({ urgency: value })} />)}</div></fieldset>
              <fieldset><legend className="mb-2 font-heading text-sm font-bold text-white/85">Como prefere continuar?</legend><div className="grid gap-2.5 sm:grid-cols-3">{(Object.entries(contactPreferenceLabels) as [ContactPreference, string][]).map(([value, label]) => <Option key={value} selected={answers.contactPreference === value} label={label} onClick={() => update({ contactPreference: value })} />)}</div></fieldset>
              {answers.profile === "workshop" || answers.profile === "fleet" ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Quantidade aproximada de peças" optional><input className={inputClass} inputMode="numeric" value={answers.approximateQuantity} onChange={(event) => update({ approximateQuantity: event.target.value })} /></Field>
                  <Field label="A peça já está disponível?" optional><input className={inputClass} value={answers.partAvailability} onChange={(event) => update({ partAvailability: event.target.value })} placeholder="Ex.: já removida" /></Field>
                </div>
              ) : null}
            </div>
          ) : null}

          {step === 7 ? (
            <div>
              {result.safetyWarning ? (
                <div className="mb-5 rounded-xl border border-amber-400/50 bg-amber-300/10 p-4 text-sm leading-relaxed text-amber-100" role="alert">
                  Há sinais que podem piorar se o veículo continuar em uso. Evite rodar até receber orientação profissional.
                </div>
              ) : null}
              <div className="rounded-2xl border border-rp-gold/35 bg-rp-gold/[0.08] p-5">
                <p className="font-heading text-xs font-bold uppercase tracking-[0.18em] text-rp-gold">Avaliação necessária</p>
                <p className="mt-2 text-base leading-relaxed text-white/80">Não há base segura para mostrar um valor sem correr o risco de informar errado. Pelo que você contou, estas são as verificações recomendadas.</p>
              </div>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {[
                  ["O que entendemos", result.understood],
                  ["O que pode estar relacionado", result.related],
                  ["O que provavelmente precisa ser verificado", result.checks],
                  ["O que ainda falta confirmar", result.pending],
                  ["Serviços possivelmente relacionados", result.services],
                  ["O que está incluído", result.inclusions],
                  ["O que está excluído", result.exclusions],
                  ["Por que o valor pode mudar", result.valueFactors],
                ].map(([title, items]) => (
                  <section key={title as string} className="border-t border-white/12 pt-4">
                    <h3 className="font-heading text-lg font-bold text-white">{title as string}</h3>
                    <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-white/65">
                      {(items as string[]).map((item) => <li key={item} className="flex gap-2"><span className="text-rp-gold" aria-hidden="true">—</span><span>{item}</span></li>)}
                    </ul>
                  </section>
                ))}
              </div>
              <section className="mt-6 border-t border-white/12 pt-5">
                <h3 className="font-heading text-lg font-bold text-white">Faixa preliminar</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">Ainda não exibida. As faixas históricas estão sendo reclassificadas por item de serviço e precisam de aprovação comercial antes de voltarem ao site.</p>
              </section>
              <section className="mt-6 rounded-2xl bg-white/[0.055] p-5">
                <h3 className="font-heading text-lg font-bold text-white">Próximo passo recomendado</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{result.nextStep}</p>
                <p className="mt-3 font-mono text-xs text-rp-gold">{attendanceCode}</p>
              </section>
              <button type="button" onClick={openWhatsApp} className="mt-5 inline-flex min-h-14 w-full items-center justify-center rounded-full bg-[#25D366] px-6 text-center font-heading text-base font-bold text-[#04240F] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                Enviar resumo pelo WhatsApp
              </button>
            </div>
          ) : null}
        </div>

        {error ? <p className="mt-5 rounded-xl border border-red-300/40 bg-red-300/10 px-4 py-3 text-sm text-red-100" role="alert">{error}</p> : null}

        <div className="mt-7 flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-between">
          <button type="button" onClick={back} className="min-h-12 rounded-full border border-white/22 px-6 font-heading text-sm font-bold text-white hover:bg-white/8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            {step === 1 ? "Trocar início" : "Voltar"}
          </button>
          {step < 7 ? <button type="button" onClick={next} className="min-h-12 rounded-full bg-rp-gold px-7 font-heading text-sm font-bold text-[#1A1200] hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Continuar</button> : <button type="button" onClick={resetQuiz} className="min-h-12 rounded-full border border-white/22 px-6 font-heading text-sm font-bold text-white hover:bg-white/8">Fazer nova triagem</button>}
        </div>
      </div>
    </div>
  );
}
