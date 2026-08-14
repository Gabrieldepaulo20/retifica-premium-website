"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  buildEstimateResult,
  buildWhatsAppEstimateMessage,
  contactPreferenceLabels,
  diagnosisOptions,
  fuelLabels,
  getServiceContext,
  initialQuizAnswers,
  profileLabels,
  quizStepOrders,
  quizStepTitles,
  situationLabels,
  symptomOptions,
  urgencyLabels,
  type ContactPreference,
  type CustomerProfile,
  type FuelType,
  type QuizAnswers,
  type QuizFlow,
  type QuizStepId,
  type Urgency,
  type VehicleSituation,
} from "@/lib/estimativa-guiada";
import { siteConfig } from "@/lib/site";
import {
  SERVICES_HERO_EXPERIMENT_ID,
  normalizeServicesHeroExperimentId,
  normalizeServicesHeroVariant,
} from "@/lib/marketing-experiment";
import {
  buildWhatsAppUrlWithAttribution,
  getOrCreateContactIntent,
  trackEngagementEvent,
  trackFunnelEvent,
} from "@/lib/trackingEvents";

const STORAGE_KEY = "retifica_premium_guided_estimate_v1";
const STORAGE_TTL_MS = 24 * 60 * 60 * 1000;
const LEGACY_STEP_IDS: readonly QuizStepId[] = [
  "requester",
  "vehicle",
  "situation",
  "symptoms",
  "known_information",
  "contact",
  "result",
];

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
  stepId?: QuizStepId;
  started: boolean;
  attendanceCode: string;
  answers: QuizAnswers;
};

type OptionProps = {
  selected: boolean;
  label: string;
  description?: string;
  multiple?: boolean;
  name: string;
  value: string;
  onClick: () => void;
};

function Option({ selected, label, description, multiple, name, value, onClick }: OptionProps) {
  return (
    <label className="block cursor-pointer">
      <input
        type={multiple ? "checkbox" : "radio"}
        name={name}
        value={value}
        checked={selected}
        onChange={onClick}
        className="peer sr-only"
      />
      <span
        className={`group flex min-h-14 w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-rp-gold ${
          selected
            ? "border-rp-gold bg-rp-gold/15 text-white"
            : "border-white/25 bg-white/[0.055] text-white hover:border-white/45 hover:bg-white/[0.085]"
        }`}
      >
        <span
          aria-hidden="true"
          className={`flex h-5 w-5 shrink-0 items-center justify-center border ${
            multiple ? "rounded" : "rounded-full"
          } ${selected ? "border-rp-gold bg-rp-gold text-[#1A1200]" : "border-white/55"}`}
        >
          {selected ? <span className="text-xs font-black">✓</span> : null}
        </span>
        <span>
          <span className="block font-heading text-base font-bold leading-tight">{label}</span>
          {description ? (
            <span className="mt-0.5 block text-sm leading-snug text-white/72">{description}</span>
          ) : null}
        </span>
      </span>
    </label>
  );
}

function FlowButton({
  title,
  description,
  onClick,
}: {
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group min-h-32 rounded-2xl border border-white/25 bg-white/[0.055] p-5 text-left text-white transition hover:border-rp-gold/75 hover:bg-white/[0.085] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rp-gold"
    >
      <span className="block font-heading text-xl font-bold leading-tight group-hover:text-rp-gold">
        {title}
      </span>
      <span className="mt-2 block text-sm leading-relaxed text-white/72">{description}</span>
      <span className="mt-4 inline-flex items-center gap-2 font-heading text-sm font-bold text-rp-gold">
        Começar <span aria-hidden="true">→</span>
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
        {label} {optional ? <span className="font-normal text-white/65">(opcional)</span> : null}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "min-h-12 w-full rounded-xl border border-white/30 bg-[#081b34] px-3.5 text-base text-white outline-none placeholder:text-white/55 focus:border-rp-gold focus:ring-1 focus:ring-rp-gold";

function freshQuizAnswers(): QuizAnswers {
  return {
    ...initialQuizAnswers,
    vehicle: { ...initialQuizAnswers.vehicle },
    symptoms: [],
  };
}

function hydrateQuizAnswers(saved?: Partial<QuizAnswers>): QuizAnswers {
  return {
    ...freshQuizAnswers(),
    ...saved,
    vehicle: {
      ...initialQuizAnswers.vehicle,
      ...(saved?.vehicle ?? {}),
    },
    symptoms: Array.isArray(saved?.symptoms) ? saved.symptoms : [],
  };
}

function withQueryServiceContext(answers: QuizAnswers) {
  if (typeof window === "undefined") return answers;
  const service = getServiceContext(
    new URLSearchParams(window.location.search).get("service")
  );
  return service
    ? {
        ...answers,
        serviceContextId: service.id,
        serviceContextLabel: service.label,
      }
    : answers;
}

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
    return {
      experiment_id: SERVICES_HERO_EXPERIMENT_ID,
      variant_id: "organic" as const,
    };
  }
  const params = new URLSearchParams(window.location.search);
  return {
    experiment_id: normalizeServicesHeroExperimentId(
      params.get("experiment_id") ?? params.get("exp")
    ),
    variant_id: normalizeServicesHeroVariant(
      params.get("variant_id") ?? params.get("variant"),
      "organic"
    ),
  };
}

export function EstimativaGuiada() {
  const [answers, setAnswers] = useState<QuizAnswers>(() => freshQuizAnswers());
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(1);
  const [attendanceCode, setAttendanceCode] = useState("");
  const [error, setError] = useState("");
  const [online, setOnline] = useState(true);
  const [restored, setRestored] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const interactedFieldsRef = useRef(new Set<string>());
  const result = useMemo(() => buildEstimateResult(answers), [answers]);
  const models = answers.vehicle.make ? vehicleCatalog[answers.vehicle.make] ?? [] : [];
  const activeFlow = answers.flow ?? "vehicle_known";
  const stepOrder = quizStepOrders[activeFlow];
  const totalSteps = stepOrder.length;
  const currentStepId = stepOrder[Math.min(totalSteps - 1, Math.max(0, step - 1))];

  const funnelEventContext = useMemo(
    () => ({
      ...experimentContext(),
      service_id: answers.serviceContextId || undefined,
    }),
    [answers.serviceContextId]
  );

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    const initializationTimer = window.setTimeout(() => {
      setOnline(navigator.onLine);
      let nextAnswers = withQueryServiceContext(freshQuizAnswers());
      let nextStep = 1;
      let nextStarted = false;
      let nextAttendanceCode = "";
      try {
        const raw = window.sessionStorage.getItem(STORAGE_KEY);
        if (raw) {
          const saved = JSON.parse(raw) as PersistedQuiz;
          if (Date.now() - saved.savedAt < STORAGE_TTL_MS) {
            nextAnswers = withQueryServiceContext(hydrateQuizAnswers(saved.answers));
            const restoredFlow = nextAnswers.flow ?? "vehicle_known";
            const restoredOrder = quizStepOrders[restoredFlow];
            const legacyStepId = LEGACY_STEP_IDS[Math.max(0, saved.step - 1)];
            const restoredStepId = saved.stepId ?? legacyStepId ?? restoredOrder[0];
            const restoredIndex = restoredOrder.indexOf(restoredStepId);
            nextStep = restoredIndex >= 0 ? restoredIndex + 1 : 1;
            nextStarted = saved.started;
            nextAttendanceCode = saved.attendanceCode || createAttendanceCode();
          } else {
            window.sessionStorage.removeItem(STORAGE_KEY);
          }
        }
      } catch {
        // A triagem continua em memória se o navegador bloquear o armazenamento.
      }

      setAnswers(nextAnswers);
      setStep(nextStep);
      setStarted(nextStarted);
      setAttendanceCode(nextAttendanceCode);
      setRestored(nextStarted);
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
        stepId: currentStepId,
        started,
        attendanceCode,
        answers,
      };
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(persisted));
    } catch {
      // O estado em memória é suficiente para concluir o fluxo atual.
    }
  }, [answers, attendanceCode, currentStepId, started, step]);

  useEffect(() => {
    if (!started) return;
    headingRef.current?.focus();
    trackFunnelEvent("quiz_step_view", {
      ...funnelEventContext,
      component_id: "guided_estimate",
      page_type: "estimate",
      flow_type: answers.flow ?? "unknown",
      step_id: currentStepId,
    });
    if (currentStepId === "result") {
      trackFunnelEvent("quiz_result_view", {
        ...funnelEventContext,
        component_id: "guided_estimate_result",
        page_type: "estimate",
        flow_type: answers.flow ?? "unknown",
        step_id: "result",
        estimate_state: result.state,
        visitor_city: answers.city,
      });
      trackFunnelEvent("quiz_estimate_state", {
        ...funnelEventContext,
        component_id: "guided_estimate_result",
        page_type: "estimate",
        estimate_state: result.state,
        visitor_city: answers.city,
      });
    }
  }, [answers.city, answers.flow, currentStepId, funnelEventContext, result.state, started]);

  function update(next: Partial<QuizAnswers>) {
    setAnswers((current) => ({ ...current, ...next }));
  }

  function updateVehicle(next: Partial<QuizAnswers["vehicle"]>) {
    setAnswers((current) => ({
      ...current,
      vehicle: { ...current.vehicle, ...next },
    }));
  }

  function trackOption(
    stepId: QuizStepId,
    optionId: string,
    interactionAction: "select" | "unselect" = "select"
  ) {
    trackFunnelEvent("quiz_option_selected", {
      ...funnelEventContext,
      component_id: "guided_estimate",
      page_type: "estimate",
      flow_type: answers.flow ?? "unknown",
      step_id: stepId,
      option_id: optionId,
      interaction_action: interactionAction,
    });
  }

  function trackFieldInteraction(stepId: QuizStepId, fieldId: string) {
    const key = `${stepId}:${fieldId}`;
    if (interactedFieldsRef.current.has(key)) return;
    interactedFieldsRef.current.add(key);
    trackFunnelEvent("quiz_field_interaction", {
      ...funnelEventContext,
      component_id: "guided_estimate",
      page_type: "estimate",
      flow_type: answers.flow ?? "unknown",
      step_id: stepId,
      field_id: fieldId,
      interaction_action: "focus",
    });
  }

  function selectFlow(flow: QuizFlow) {
    const code = attendanceCode || getOrCreateContactIntent().leadCode;
    setAttendanceCode(code);
    setAnswers((current) => ({ ...current, flow }));
    setStarted(true);
    setStep(1);
    trackFunnelEvent("quiz_start", {
      ...funnelEventContext,
      component_id: "guided_estimate_entry",
      position: "estimate_hero",
      page_type: "estimate",
      flow_type: flow,
    });
    trackFunnelEvent("quiz_flow_selected", {
      ...funnelEventContext,
      component_id: "guided_estimate_entry",
      page_type: "estimate",
      flow_type: flow,
    });
  }

  function validateCurrentStep() {
    if (currentStepId === "requester" && !answers.profile) {
      return "Escolha como você está buscando atendimento.";
    }
    if (
      currentStepId === "vehicle" &&
      !answers.vehicle.unknown &&
      !answers.vehicle.make.trim()
    ) {
      return "Informe ao menos a marca ou marque que não sabe informar.";
    }
    if (currentStepId === "situation" && !answers.situation) {
      return "Escolha como o veículo ou a peça está agora.";
    }
    if (currentStepId === "symptoms" && answers.symptoms.length === 0) {
      return "Escolha ao menos um sinal ou marque “Não sei”.";
    }
    if (currentStepId === "known_information" && !answers.knownDiagnosis) {
      return "Informe se alguém já indicou um serviço ou diagnóstico.";
    }
    if (currentStepId === "contact" && !answers.city.trim()) {
      return "Informe sua cidade para orientarmos o atendimento.";
    }
    if (currentStepId === "contact" && !answers.urgency) {
      return "Escolha para quando você precisa.";
    }
    if (currentStepId === "contact" && !answers.contactPreference) {
      return "Escolha como prefere continuar o atendimento.";
    }
    return "";
  }

  function next() {
    const validationError = validateCurrentStep();
    if (validationError) {
      setError(validationError);
      trackFunnelEvent("quiz_continue_blocked", {
        ...funnelEventContext,
        component_id: "guided_estimate_continue",
        page_type: "estimate",
        flow_type: answers.flow ?? "unknown",
        step_id: currentStepId,
        validation_reason: `required_${currentStepId}`,
      });
      return;
    }
    setError("");
    trackFunnelEvent("quiz_step_complete", {
      ...funnelEventContext,
      component_id: "guided_estimate",
      page_type: "estimate",
      flow_type: answers.flow ?? "unknown",
      step_id: currentStepId,
      ...(currentStepId === "contact" ? { visitor_city: answers.city } : {}),
    });
    setStep((current) => Math.min(totalSteps, current + 1));
  }

  function back() {
    setError("");
    trackFunnelEvent("quiz_back", {
      ...funnelEventContext,
      component_id: "guided_estimate",
      page_type: "estimate",
      flow_type: answers.flow ?? "unknown",
      step_id: currentStepId,
    });
    if (step === 1) {
      setStarted(false);
      return;
    }
    setStep((current) => Math.max(1, current - 1));
  }

  function toggleSymptom(value: string) {
    const selectingUnknown = value === "unknown" && !answers.symptoms.includes("unknown");
    const selected = answers.symptoms.includes(value);
    trackOption("symptoms", value, selected ? "unselect" : "select");
    setAnswers((current) => {
      const next = value === "unknown"
        ? current.symptoms.includes("unknown")
          ? []
          : ["unknown"]
        : current.symptoms
            .filter((item) => item !== "unknown")
            .includes(value)
          ? current.symptoms.filter((item) => item !== value)
          : [...current.symptoms.filter((item) => item !== "unknown"), value];
      return { ...current, symptoms: next };
    });
    if (selectingUnknown) {
      trackFunnelEvent("quiz_unknown_selected", {
        ...funnelEventContext,
        component_id: "symptoms",
        page_type: "estimate",
        step_id: "symptoms",
      });
    }
  }

  function resetQuiz() {
    trackFunnelEvent("quiz_reset", {
      ...funnelEventContext,
      component_id: "guided_estimate_reset",
      page_type: "estimate",
      flow_type: answers.flow ?? "unknown",
      step_id: "result",
    });
    interactedFieldsRef.current.clear();
    setAnswers(withQueryServiceContext(freshQuizAnswers()));
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

  function openPreferredContact() {
    if (!online) {
      setError("A conexão caiu. Suas respostas estão salvas; tente novamente quando a internet voltar.");
      return;
    }

    setError("");
    const preference = answers.contactPreference ?? "whatsapp";
    const commonParams = {
      ...funnelEventContext,
      component_id: "guided_estimate_result",
      position: "result_primary",
      page_type: "estimate",
      flow_type: answers.flow ?? "unknown",
      step_id: "result",
      estimate_state: result.state,
      visitor_city: answers.city,
      transaction_id: attendanceCode,
    };

    if (preference === "whatsapp") {
      const message = buildWhatsAppEstimateMessage(answers, result, attendanceCode);
      const url = buildWhatsAppUrlWithAttribution(siteConfig.whatsapp.number, message);
      const whatsappParams = {
        ...commonParams,
        destination_type: "whatsapp",
        destination_path: "/whatsapp",
      };
      trackFunnelEvent("quiz_whatsapp_prepared", whatsappParams);
      trackFunnelEvent("quiz_whatsapp_click", whatsappParams);
      trackEngagementEvent(
        "whatsapp_service_cta_click",
        "whatsapp_click",
        "guided_estimate_result",
        {
          ...whatsappParams,
          method: "whatsapp",
        }
      );
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }

    if (preference === "phone") {
      const phoneParams = {
        ...commonParams,
        destination_type: "phone",
        destination_path: "/phone",
      };
      trackFunnelEvent("cta_click", { ...phoneParams, method: "phone" });
      trackEngagementEvent("phone_click", "phone_click", "guided_estimate_result", {
        ...phoneParams,
        method: "phone",
      });
      window.location.href = siteConfig.phone.href;
      return;
    }

    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      siteConfig.address.formatted
    )}`;
    const directionsParams = {
      ...commonParams,
      destination_type: "directions",
      destination_path: "/directions",
    };
    trackFunnelEvent("cta_click", { ...directionsParams, method: "maps" });
    trackEngagementEvent(
      "directions_click",
      "directions_click",
      "guided_estimate_result",
      { ...directionsParams, method: "maps" }
    );
    window.open(mapsUrl, "_blank", "noopener,noreferrer");
  }

  if (!started) {
    return (
      <div className="rounded-3xl border border-white/14 bg-[#06172e]/95 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:p-7">
        {answers.serviceContextLabel ? (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-rp-gold/35 bg-rp-gold/10 px-4 py-3 text-sm leading-relaxed text-white/80">
            <span className="mt-0.5 font-mono text-xs font-bold text-rp-gold" aria-hidden="true">
              REF
            </span>
            <p>
              Vamos considerar o contexto de <strong className="text-white">{answers.serviceContextLabel}</strong>,
              sem assumir que esse é o serviço confirmado.
            </p>
          </div>
        ) : null}
        <div className="grid gap-3 sm:grid-cols-2">
          <FlowButton
            title="Sei qual é meu veículo"
            description="Comece pelo atendimento e pelos dados do veículo; depois conte os sinais."
            onClick={() => selectFlow("vehicle_known")}
          />
          <FlowButton
            title="Não sei exatamente o problema"
            description="Comece pelos sinais que percebeu; os dados técnicos ficam para depois."
            onClick={() => selectFlow("problem_unknown")}
          />
        </div>
        <p className="mt-4 text-sm leading-relaxed text-white/72">
          O resumo aparece sem pedir nome ou telefone. Ele orienta a conversa, mas não substitui a inspeção da peça.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/14 bg-[#06172e]/95 shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
      <div className="border-b border-white/10 px-5 py-4 sm:px-7">
        <div className="flex items-center justify-between gap-4 text-xs font-bold uppercase tracking-[0.16em] text-white/70">
          <span>Etapa {step} de {totalSteps}</span>
          <span>{Math.round((step / totalSteps) * 100)}%</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
          <div
            className="h-full rounded-full bg-rp-gold transition-[width] duration-300 motion-reduce:transition-none"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <div className="p-5 sm:p-7">
        {!online ? (
          <div className="mb-5 rounded-xl border border-rp-gold/35 bg-rp-gold/10 px-4 py-3 text-sm leading-relaxed text-rp-gold">
            Você está sem internet. Suas respostas continuam neste aparelho; tente a ação novamente quando a conexão voltar.
          </div>
        ) : null}
        {restored ? (
          <div role="status" className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-white/20 bg-white/[0.05] px-4 py-3 text-sm text-white/80">
            <span>Retomamos suas respostas anteriores.</span>
            <button type="button" onClick={() => setRestored(false)} className="shrink-0 font-bold text-rp-gold underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rp-gold">
              Ocultar aviso
            </button>
          </div>
        ) : null}

        <h2
          ref={headingRef}
          tabIndex={-1}
          className="font-heading text-2xl font-bold leading-tight text-white outline-none sm:text-3xl"
        >
          {quizStepTitles[currentStepId]}
        </h2>

        <div className="mt-6">
          {currentStepId === "requester" ? (
            <fieldset>
              <legend className="sr-only">Perfil de quem solicita o atendimento</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {(Object.entries(profileLabels) as [CustomerProfile, string][]).map(([value, label]) => (
                  <Option
                    key={value}
                    name="requester-profile"
                    value={value}
                    selected={answers.profile === value}
                    label={label}
                    onClick={() => {
                      update({ profile: value });
                      trackOption("requester", value);
                    }}
                  />
                ))}
              </div>
            </fieldset>
          ) : null}

          {currentStepId === "vehicle" ? (
            <div>
              <label className="mb-5 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-white/30 px-4 text-sm font-bold text-white focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-rp-gold">
                <input
                  type="checkbox"
                  checked={answers.vehicle.unknown}
                  onChange={(event) => {
                    const unknown = event.target.checked;
                    updateVehicle({ unknown });
                    trackOption("vehicle", "vehicle_unknown", unknown ? "select" : "unselect");
                    if (unknown) {
                      trackFunnelEvent("quiz_unknown_selected", {
                        ...funnelEventContext,
                        component_id: "vehicle",
                        page_type: "estimate",
                        step_id: "vehicle",
                      });
                    }
                  }}
                  className="h-4 w-4 accent-[#fbbf24]"
                />
                Não sei informar o veículo
              </label>
              {!answers.vehicle.unknown ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Marca">
                    <input className={inputClass} list="vehicle-makes" value={answers.vehicle.make} onFocus={() => trackFieldInteraction("vehicle", "vehicle_make")} onChange={(event) => updateVehicle({ make: event.target.value, model: "" })} placeholder="Ex.: Fiat" autoComplete="off" />
                  </Field>
                  <datalist id="vehicle-makes">{Object.keys(vehicleCatalog).map((make) => <option key={make} value={make} />)}</datalist>
                  <Field label="Modelo">
                    <input className={inputClass} list="vehicle-models" value={answers.vehicle.model} onFocus={() => trackFieldInteraction("vehicle", "vehicle_model")} onChange={(event) => updateVehicle({ model: event.target.value })} placeholder="Ex.: Strada" autoComplete="off" />
                  </Field>
                  <datalist id="vehicle-models">{models.map((model) => <option key={model} value={model} />)}</datalist>
                  <Field label="Ano" optional><input className={inputClass} inputMode="numeric" value={answers.vehicle.year} onFocus={() => trackFieldInteraction("vehicle", "vehicle_year")} onChange={(event) => updateVehicle({ year: event.target.value.slice(0, 4) })} placeholder="Ex.: 2018" /></Field>
                  <Field label="Motorização" optional><input className={inputClass} value={answers.vehicle.engine} onFocus={() => trackFieldInteraction("vehicle", "vehicle_engine")} onChange={(event) => updateVehicle({ engine: event.target.value })} placeholder="Ex.: 1.6 16V" /></Field>
                  <Field label="Combustível" optional>
                    <select className={inputClass} value={answers.vehicle.fuel ?? ""} onFocus={() => trackFieldInteraction("vehicle", "vehicle_fuel")} onChange={(event) => { const fuel = (event.target.value || null) as FuelType | null; updateVehicle({ fuel }); if (fuel) trackOption("vehicle", `fuel_${fuel}`); }}>
                      <option value="">Selecione</option>
                      {(Object.entries(fuelLabels) as [FuelType, string][]).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                    </select>
                  </Field>
                  <Field label="Código do motor" optional><input className={inputClass} value={answers.vehicle.engineCode} onFocus={() => trackFieldInteraction("vehicle", "vehicle_engine_code")} onChange={(event) => updateVehicle({ engineCode: event.target.value })} placeholder="Se estiver disponível" /></Field>
                </div>
              ) : (
                <p className="rounded-xl border border-white/12 bg-white/[0.04] p-4 text-sm leading-relaxed text-white/65">
                  Tudo bem. A falta desses dados reduz a precisão, mas não impede a triagem.
                </p>
              )}
            </div>
          ) : null}

          {currentStepId === "situation" ? (
            <fieldset className="space-y-3">
              <legend className="sr-only">Situação atual do veículo ou da peça</legend>
              {(Object.entries(situationLabels) as [VehicleSituation, string][]).map(([value, label]) => (
                <Option
                  key={value}
                  name="vehicle-situation"
                  value={value}
                  selected={answers.situation === value}
                  label={label}
                  onClick={() => {
                    update({ situation: value });
                    trackOption("situation", value);
                  }}
                />
              ))}
              {answers.situation === "mechanic_assessed" ? (
                <Field label="O que o mecânico informou?" optional>
                  <textarea className={`${inputClass} min-h-24 py-3`} maxLength={300} value={answers.mechanicAssessment} onFocus={() => trackFieldInteraction("situation", "mechanic_assessment")} onChange={(event) => update({ mechanicAssessment: event.target.value })} placeholder="Resuma em até 300 caracteres" />
                </Field>
              ) : null}
            </fieldset>
          ) : null}

          {currentStepId === "symptoms" ? (
            <div>
              <p className="mb-4 text-sm leading-relaxed text-white/72">Pode marcar mais de uma opção. Isso orienta verificações, não confirma um diagnóstico.</p>
              <fieldset>
                <legend className="sr-only">Sinais percebidos no veículo</legend>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {symptomOptions.map(([value, label]) => (
                    <Option
                      key={value}
                      multiple
                      name="vehicle-symptoms"
                      value={value}
                      selected={answers.symptoms.includes(value)}
                      label={label}
                      onClick={() => toggleSymptom(value)}
                    />
                  ))}
                </div>
              </fieldset>
              {answers.symptoms.includes("other") ? (
                <div className="mt-4"><Field label="Outro sinal" optional><input className={inputClass} value={answers.otherSymptom} onFocus={() => trackFieldInteraction("symptoms", "other_symptom")} onChange={(event) => update({ otherSymptom: event.target.value })} maxLength={120} /></Field></div>
              ) : null}
              {answers.situation === "running" && answers.symptoms.some((item) => ["overheating", "oil_water_mix", "reservoir_pressure", "returned_problem"].includes(item)) ? (
                <div className="mt-5 rounded-xl border border-amber-400/50 bg-amber-300/10 p-4 text-sm leading-relaxed text-amber-100" role="alert">
                  <strong className="block font-heading text-base">Orientação de segurança</strong>
                  Há sinais que podem piorar se o veículo continuar em uso. Sem confirmar a causa, recomendamos evitar rodar e pedir orientação ao mecânico ou à Retífica Premium.
                </div>
              ) : null}
            </div>
          ) : null}

          {currentStepId === "known_information" ? (
            <div>
              <fieldset>
                <legend className="sr-only">Serviço ou diagnóstico já indicado</legend>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {diagnosisOptions.map(([value, label]) => (
                    <Option
                      key={value}
                      name="known-diagnosis"
                      value={value}
                      selected={answers.knownDiagnosis === value}
                      label={label}
                      onClick={() => {
                        update({ knownDiagnosis: value });
                        trackOption("known_information", value);
                      }}
                    />
                  ))}
                </div>
              </fieldset>
              {answers.knownDiagnosis && answers.knownDiagnosis !== "none" ? (
                <div className="mt-5 grid gap-4">
                  <Field label="Diagnóstico recebido" optional><textarea className={`${inputClass} min-h-24 py-3`} maxLength={300} value={answers.diagnosisText} onFocus={() => trackFieldInteraction("known_information", "diagnosis_text")} onChange={(event) => update({ diagnosisText: event.target.value })} placeholder="Até 300 caracteres" /></Field>
                  <Field label="Serviço desejado, se souber" optional><input className={inputClass} value={answers.desiredService} onFocus={() => trackFieldInteraction("known_information", "desired_service")} onChange={(event) => update({ desiredService: event.target.value })} /></Field>
                </div>
              ) : null}
              <fieldset className="mt-5">
                <legend className="mb-2 font-heading text-sm font-bold text-white/85">Tenho fotos ou orçamento anterior</legend>
                <div className="grid grid-cols-2 gap-3">
                  <Option name="has-files" value="yes" selected={answers.hasFiles === true} label="Sim" onClick={() => { update({ hasFiles: true }); trackOption("known_information", "has_files_yes"); trackFunnelEvent("quiz_file_intent", { ...funnelEventContext, component_id: "files", page_type: "estimate", step_id: "known_information" }); }} />
                  <Option name="has-files" value="no" selected={answers.hasFiles === false} label="Não" onClick={() => { update({ hasFiles: false }); trackOption("known_information", "has_files_no"); }} />
                </div>
                {answers.hasFiles ? <p className="mt-2 text-sm text-white/72">Se escolher WhatsApp, você poderá anexar as fotos diretamente na conversa.</p> : null}
              </fieldset>
            </div>
          ) : null}

          {currentStepId === "contact" ? (
            <div className="grid gap-5">
              <div>
                <Field label="Cidade"><input className={inputClass} value={answers.city} onFocus={() => trackFieldInteraction("contact", "city")} onChange={(event) => update({ city: event.target.value })} placeholder="Ex.: Sertãozinho" autoComplete="address-level2" /></Field>
                <p className="mt-1.5 text-xs leading-relaxed text-white/65">
                  Usada para orientar atendimento e logística. Não pedimos GPS e a cidade não é enviada ao Google como parâmetro personalizado.
                </p>
              </div>
              <fieldset><legend className="mb-2 font-heading text-sm font-bold text-white/85">Para quando você precisa?</legend><div className="grid gap-2.5 sm:grid-cols-2">{(Object.entries(urgencyLabels) as [Urgency, string][]).map(([value, label]) => <Option key={value} name="urgency" value={value} selected={answers.urgency === value} label={label} onClick={() => { update({ urgency: value }); trackOption("contact", `urgency_${value}`); }} />)}</div></fieldset>
              <fieldset><legend className="mb-2 font-heading text-sm font-bold text-white/85">Como prefere continuar?</legend><div className="grid gap-2.5 sm:grid-cols-3">{(Object.entries(contactPreferenceLabels) as [ContactPreference, string][]).map(([value, label]) => <Option key={value} name="contact-preference" value={value} selected={answers.contactPreference === value} label={label} onClick={() => { update({ contactPreference: value }); trackOption("contact", `contact_${value}`); }} />)}</div></fieldset>
              {answers.profile === "workshop" || answers.profile === "fleet" ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Quantidade aproximada de peças" optional><input className={inputClass} inputMode="numeric" value={answers.approximateQuantity} onFocus={() => trackFieldInteraction("contact", "approximate_quantity")} onChange={(event) => update({ approximateQuantity: event.target.value })} /></Field>
                  <Field label="A peça já está disponível?" optional><input className={inputClass} value={answers.partAvailability} onFocus={() => trackFieldInteraction("contact", "part_availability")} onChange={(event) => update({ partAvailability: event.target.value })} placeholder="Ex.: já removida" /></Field>
                </div>
              ) : null}
            </div>
          ) : null}

          {currentStepId === "result" ? (
            <div>
              {result.safetyWarning ? (
                <div className="mb-5 rounded-xl border border-amber-400/50 bg-amber-300/10 p-4 text-sm leading-relaxed text-amber-100" role="alert">
                  Há sinais que podem piorar se o veículo continuar em uso. Evite rodar até receber orientação profissional.
                </div>
              ) : null}
              <div className="relative overflow-hidden rounded-2xl border border-rp-gold/45 bg-rp-gold/[0.09] p-5">
                <div className="absolute right-0 top-0 h-16 w-16 border-b border-l border-rp-gold/20" aria-hidden="true" />
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-heading text-xs font-bold uppercase tracking-[0.18em] text-rp-gold">Triagem concluída</p>
                  <p className="font-mono text-xs font-bold text-rp-gold">{attendanceCode}</p>
                </div>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/85">
                  Organizamos o que você contou e os pontos que merecem verificação. Isso ainda não confirma um diagnóstico.
                </p>
                <div className="mt-4 flex flex-wrap gap-2" aria-label="Serviços possivelmente relacionados">
                  {result.services.slice(0, 3).map((service) => (
                    <span key={service} className="rounded-full border border-white/20 bg-white/[0.07] px-3 py-1.5 text-xs font-bold text-white/85">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
              <section className="mt-5 rounded-2xl border border-white/15 bg-white/[0.055] p-5">
                <h3 className="font-heading text-lg font-bold text-white">Próximo passo recomendado</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/78">{result.nextStep}</p>
                {answers.contactPreference === "take_part" ? (
                  <p className="mt-2 text-sm font-semibold text-white/88">{siteConfig.address.formatted}</p>
                ) : null}
                <button
                  type="button"
                  onClick={openPreferredContact}
                  disabled={!online}
                  className={`mt-5 inline-flex min-h-14 w-full items-center justify-center rounded-full px-6 text-center font-heading text-base font-bold transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-50 ${
                    answers.contactPreference === "whatsapp"
                      ? "bg-[#25D366] text-[#04240F]"
                      : "bg-rp-gold text-[#1A1200]"
                  }`}
                >
                  {answers.contactPreference === "phone"
                    ? `Ligar para ${siteConfig.phone.display}`
                    : answers.contactPreference === "take_part"
                      ? "Ver rota para levar a peça"
                      : "Enviar resumo pelo WhatsApp"}
                </button>
                {!online ? (
                  <p className="mt-2 text-center text-sm text-amber-100">A ação será liberada quando a conexão voltar.</p>
                ) : null}
              </section>

              <div className="mt-5 divide-y divide-white/12 border-y border-white/12">
                {[
                  {
                    title: "O que entendemos",
                    groups: [result.understood, result.related],
                  },
                  {
                    title: "Verificações e serviços relacionados",
                    groups: [result.checks, result.services, result.pending],
                  },
                  {
                    title: "Como a avaliação é fechada",
                    groups: [result.inclusions, result.exclusions, result.valueFactors],
                  },
                ].map(({ title, groups }) => (
                  <details key={title} className="group py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-base font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rp-gold">
                      <span>{title}</span>
                      <span className="text-rp-gold transition-transform group-open:rotate-45 motion-reduce:transition-none" aria-hidden="true">+</span>
                    </summary>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      {groups.map((items, groupIndex) => (
                        <ul key={`${title}-${groupIndex}`} className="space-y-2 text-sm leading-relaxed text-white/75">
                          {items.map((item) => (
                            <li key={item} className="flex gap-2">
                              <span className="text-rp-gold" aria-hidden="true">—</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        {error ? <p className="mt-5 rounded-xl border border-red-300/40 bg-red-300/10 px-4 py-3 text-sm text-red-100" role="alert">{error}</p> : null}

        <div className="mt-7 flex flex-col gap-2.5 sm:flex-row-reverse sm:justify-between">
          {currentStepId !== "result" ? <button type="button" onClick={next} className="min-h-12 rounded-full bg-rp-gold px-7 font-heading text-sm font-bold text-[#1A1200] hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Continuar</button> : <button type="button" onClick={resetQuiz} className="min-h-12 rounded-full border border-white/22 px-6 font-heading text-sm font-bold text-white hover:bg-white/8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Fazer nova triagem</button>}
          <button type="button" onClick={back} className="min-h-12 rounded-full border border-white/22 px-6 font-heading text-sm font-bold text-white hover:bg-white/8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            {step === 1 ? "Trocar início" : "Voltar"}
          </button>
        </div>
      </div>
    </div>
  );
}
