"use client";

import type { FormEvent } from "react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  measurementModeForConsent,
  privacySafePageLocation,
  readConsentPreferences,
} from "@/lib/consent";
import { siteConfig } from "@/lib/site";
import {
  buildWhatsAppUrlWithAttribution,
  createMarketingEventId,
  getOrCreateContactIntent,
  getStoredAttribution,
  trackEngagementEvent,
  trackMarketingEvent,
} from "@/lib/trackingEvents";
import {
  classifyMarketingDelivery,
  classifyMarketingNetworkFailure,
  retryMarketingDelivery,
} from "@/lib/marketing-event-delivery";

type ContactFormState = {
  nome: string;
  telefone: string;
  cidade: string;
  email: string;
  assunto: string;
  mensagem: string;
};

type ContactField = keyof ContactFormState;

const baseState: ContactFormState = {
  nome: "",
  telefone: "",
  cidade: "",
  email: "",
  assunto: "",
  mensagem: "",
};

const trackedFields: ContactField[] = ["nome", "telefone", "mensagem"];
const CONTACT_FOREGROUND_MAX_ATTEMPTS = 2;
const CONTACT_FOREGROUND_MAX_WAIT_MS = 2_000;

const subjectLabels: Record<string, string> = {
  orcamento: "Solicitar orçamento",
  duvidas: "Tirar dúvidas",
  b2b: "Parceria para oficina",
  outros: "Outros assuntos",
};

const quickCaseOptions = [
  ["overheating", "Superaqueceu", "O motor superaqueceu e preciso de orientação sobre o cabeçote."],
  ["water_loss", "Baixa água", "O veículo está baixando água e preciso entender o que verificar."],
  ["smoke", "Está fumando", "O motor está fumando e preciso de orientação sobre as possíveis verificações."],
  ["removed_head", "Peça removida", "O cabeçote já foi removido e quero orientação para avaliação e orçamento."],
  ["mechanic", "Mecânico indicou", "Meu mecânico indicou avaliar o cabeçote e quero confirmar o próximo passo."],
] as const;

const b2bLevelLabels: Record<string, string> = {
  essencial: "Essencial - R$ 8 mil a R$ 15 mil/mês",
  crescimento: "Crescimento - R$ 15 mil a R$ 25 mil/mês",
  performance: "Performance - R$ 25 mil a R$ 50 mil/mês",
  diamante: "Diamante - R$ 50 mil+/mês",
};

type SubmitStatus = "idle" | "sending" | "success" | "error";

type ContactApiResponse = {
  message?: string;
  delivery?: {
    emailSent?: boolean;
    retiflowSaved?: boolean;
    retiflowRetryable?: boolean;
    retiflowStatus?: number;
  };
};

type ContactAttempt = {
  response: Response;
  data: ContactApiResponse | null;
};

function classifyContactStorageAttempt(attempt: ContactAttempt) {
  const storageSaved = attempt.data?.delivery?.retiflowSaved === true;
  const status =
    attempt.data?.delivery?.retiflowStatus ?? attempt.response.status;
  return classifyMarketingDelivery({
    status,
    responseOk: storageSaved,
    bodyOk: storageSaved,
    storageSaved,
    retryAfter: attempt.response.headers.get("retry-after"),
  });
}

type ContatoWhatsAppFormProps = {
  defaultSubject?: keyof typeof subjectLabels;
  leadLabel?: string;
};

export function ContatoWhatsAppForm({
  defaultSubject,
  leadLabel = "contact_form",
}: ContatoWhatsAppFormProps = {}) {
  const isB2B = defaultSubject === "b2b";
  const initialState: ContactFormState = {
    ...baseState,
    assunto: defaultSubject ?? "orcamento",
  };
  const [form, setForm] = useState(initialState);
  const [website, setWebsite] = useState("");
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [fallbackUrl, setFallbackUrl] = useState(
    buildWhatsAppUrlWithAttribution(
      siteConfig.whatsapp.number,
      "Olá, vim pelo site da Retífica Premium e gostaria de atendimento."
    )
  );
  const formRef = useRef<HTMLFormElement>(null);
  const formViewedRef = useRef(false);
  const startedAtRef = useRef<number | null>(null);
  const lastFieldRef = useRef<ContactField | null>(null);
  const completedFieldsRef = useRef(new Set<ContactField>());
  const submittedRef = useRef(false);
  const abandonmentTrackedRef = useRef(false);

  const formTimingSeconds = useCallback(() => {
    if (!startedAtRef.current) return 0;
    return Math.max(0, Math.round((Date.now() - startedAtRef.current) / 1000));
  }, []);

  const formProgressParams = useCallback(() => {
    const completed = completedFieldsRef.current.size;

    return {
      form_name: leadLabel,
      fields_completed: completed,
      completion_percent: Math.round((completed / trackedFields.length) * 100),
      form_elapsed_seconds: formTimingSeconds(),
    };
  }, [formTimingSeconds, leadLabel]);

  const trackFormAbandonment = useCallback(
    (reason: "page_exit" | "form_unmounted") => {
      if (
        !startedAtRef.current ||
        submittedRef.current ||
        abandonmentTrackedRef.current
      ) {
        return;
      }

      abandonmentTrackedRef.current = true;
      trackMarketingEvent("form_abandon", {
        event_category: "lead",
        event_label: leadLabel,
        method: "email_form",
        abandon_reason: reason,
        last_field: lastFieldRef.current ?? "unknown",
        transport_type: "beacon",
        ...formProgressParams(),
      });
    },
    [formProgressParams, leadLabel]
  );

  useEffect(() => {
    const formElement = formRef.current;
    if (!formElement) return;

    const trackView = () => {
      if (formViewedRef.current) return;
      formViewedRef.current = true;
      trackMarketingEvent("form_view", {
        event_category: "lead",
        event_label: leadLabel,
        method: "email_form",
        form_name: leadLabel,
      });
    };

    if (!("IntersectionObserver" in window)) {
      trackView();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          trackView();
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(formElement);
    return () => observer.disconnect();
  }, [leadLabel]);

  useEffect(() => {
    const handlePageExit = () => trackFormAbandonment("page_exit");
    window.addEventListener("pagehide", handlePageExit);

    return () => {
      window.removeEventListener("pagehide", handlePageExit);
      trackFormAbandonment("form_unmounted");
    };
  }, [trackFormAbandonment]);

  function handleFormStart() {
    if (startedAtRef.current) return;

    startedAtRef.current = Date.now();
    submittedRef.current = false;
    abandonmentTrackedRef.current = false;
    trackMarketingEvent("form_start", {
      event_category: "lead",
      event_label: leadLabel,
      method: "email_form",
      form_name: leadLabel,
    });
  }

  function updateField(
    field: ContactField,
    value: ContactFormState[ContactField]
  ) {
    setForm((current) => ({ ...current, [field]: value }));
    if (status !== "idle") {
      setStatus("idle");
      setStatusMessage("");
    }
  }

  function handleFieldFocus(field: ContactField) {
    lastFieldRef.current = field;
    handleFormStart();
  }

  function handleFieldComplete(field: ContactField, value: string) {
    lastFieldRef.current = field;
    if (!value.trim() || completedFieldsRef.current.has(field)) return;

    completedFieldsRef.current.add(field);
    trackMarketingEvent("form_field_complete", {
      event_category: "lead",
      event_label: `${leadLabel}_${field}`,
      method: "email_form",
      field_name: field,
      ...formProgressParams(),
    });
  }

  function validationReason(
    element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  ) {
    if (element.validity.valueMissing) return "required";
    if (element.validity.typeMismatch) return "invalid_format";
    if (element.validity.tooShort) return "too_short";
    if (element.validity.patternMismatch) return "pattern_mismatch";
    return "invalid_value";
  }

  function handleInvalid(event: FormEvent<Element>) {
    const element = event.currentTarget as
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement;
    const field = element.name as ContactField;
    lastFieldRef.current = field;
    handleFormStart();
    trackMarketingEvent("form_validation_error", {
      event_category: "lead",
      event_label: `${leadLabel}_${field}`,
      method: "email_form",
      field_name: field,
      validation_reason: validationReason(element),
      ...formProgressParams(),
    });
  }

  function getSelectedB2BLevel() {
    if (typeof window === "undefined") return "";

    const level = new URLSearchParams(window.location.search).get("nivel_b2b");
    if (!level) return "";

    return b2bLevelLabels[level] ?? "";
  }

  function buildLeadMessage(assunto: string, b2bLevel: string) {
    return [
      "Olá, vim pelo site da Retífica Premium e gostaria de atendimento.",
      "",
      `Nome: ${form.nome}`,
      `Telefone/WhatsApp: ${form.telefone}`,
      form.cidade ? `Cidade: ${form.cidade}` : "",
      form.email ? `E-mail: ${form.email}` : "",
      `Assunto: ${assunto}`,
      b2bLevel ? `Nível B2B escolhido: ${b2bLevel}` : "",
      `Mensagem: ${form.mensagem}`,
    ]
      .filter(Boolean)
      .join("\n");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const assunto = subjectLabels[form.assunto] ?? form.assunto;
    const b2bLevel = getSelectedB2BLevel();
    const whatsAppUrl = buildWhatsAppUrlWithAttribution(
      siteConfig.whatsapp.number,
      buildLeadMessage(assunto, b2bLevel)
    );
    const contactIntent = getOrCreateContactIntent();

    setFallbackUrl(whatsAppUrl);
    setStatus("sending");
    setStatusMessage("");
    trackMarketingEvent("form_submit_attempt", {
      event_category: "lead",
      event_label: leadLabel,
      method: "email_form",
      lead_subject: form.assunto,
      ...formProgressParams(),
    });

    try {
      const consent = readConsentPreferences();
      const measurementMode = measurementModeForConsent({
        analytics: consent?.analytics ?? false,
        advertising: consent?.advertising ?? false,
      });
      const requestPayload = {
        ...form,
        eventId: createMarketingEventId(),
        leadCode: contactIntent.leadCode,
        anonymousId: contactIntent.anonymousId,
        sessionId: contactIntent.sessionId,
        b2bLevel,
        pageLocation: privacySafePageLocation(),
        measurementMode,
        attribution: getStoredAttribution(),
        website,
      };
      const postContact = async (storageOnly = false) => {
        const response = await fetch("/api/contato", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            storageOnly ? { ...requestPayload, storageOnly: true } : requestPayload
          ),
        });
        const data = (await response.json().catch(() => null)) as
          | ContactApiResponse
          | null;
        return { response, data };
      };

      let firstAttempt: ContactAttempt | null = null;
      let firstDelivery = classifyMarketingNetworkFailure();
      try {
        firstAttempt = await postContact();
        firstDelivery = classifyContactStorageAttempt(firstAttempt);
      } catch {
        // A repetição usa storageOnly e o mesmo eventId para não duplicar e-mail.
      }
      let data = firstAttempt?.data ?? null;

      if (!firstDelivery.delivered && firstDelivery.retryable) {
        const storageRetry = await retryMarketingDelivery(
          firstDelivery,
          async () => {
            const value = await postContact(true);
            return {
              value,
              delivery: classifyContactStorageAttempt(value),
            };
          },
          {
            maxAttempts: CONTACT_FOREGROUND_MAX_ATTEMPTS,
            maxWaitMs: CONTACT_FOREGROUND_MAX_WAIT_MS,
          }
        );
        if (
          storageRetry.delivery.delivered &&
          storageRetry.value?.data?.delivery?.retiflowSaved === true
        ) {
          const storageData = storageRetry.value.data;
          data = {
            ...(data ?? storageData),
            delivery: {
              ...storageData.delivery,
              emailSent: data?.delivery?.emailSent === true,
              retiflowSaved: true,
            },
          };
        } else if (!data && storageRetry.value) {
          data = storageRetry.value.data;
        }
      }

      if (data?.delivery?.retiflowSaved !== true) {
        if (data?.delivery?.emailSent !== true) {
          throw new Error(
            data?.message ||
              "Não conseguimos registrar o pedido agora. Use o WhatsApp para garantir seu atendimento."
          );
        }

        trackMarketingEvent("form_submit_error", {
          event_category: "lead",
          event_label: leadLabel,
          method: "email_form",
          error_type: "retiflow_unavailable_email_saved",
          lead_subject: form.assunto,
          ...formProgressParams(),
        });
        submittedRef.current = true;
        abandonmentTrackedRef.current = true;
        startedAtRef.current = null;
        lastFieldRef.current = null;
        setStatus("success");
        setStatusMessage(
          data.message ||
            "Seu pedido foi enviado por e-mail, mas ainda não apareceu no painel. Mantivemos seus dados aqui; para garantir atendimento imediato, use o WhatsApp abaixo."
        );
        return;
      }

      trackMarketingEvent("generate_lead", {
        event_category: "lead",
        event_label: `${leadLabel}_email`,
        b2b_level: b2bLevel,
        method: "email_form",
        form_name: leadLabel,
        lead_subject: form.assunto,
        form_elapsed_seconds: formTimingSeconds(),
        transaction_id: contactIntent.leadCode,
      });

      submittedRef.current = true;
      abandonmentTrackedRef.current = true;
      startedAtRef.current = null;
      lastFieldRef.current = null;
      completedFieldsRef.current.clear();
      setForm(initialState);
      setSelectedCase(null);
      setWebsite("");
      setStatus("success");
      setStatusMessage(
        data?.message ||
          "Recebemos seu pedido de retorno. Se o caso for urgente, você também pode abrir o WhatsApp pelo botão abaixo."
      );
    } catch (error) {
      trackMarketingEvent("form_submit_error", {
        event_category: "lead",
        event_label: leadLabel,
        method: "email_form",
        error_type: "delivery_or_network",
        lead_subject: form.assunto,
        ...formProgressParams(),
      });

      setStatus("error");
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "Não conseguimos enviar por e-mail agora."
      );
    }
  }

  const isSending = status === "sending";

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-3.5"
    >
      <div className="grid gap-3.5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="nome"
            className="mb-1.5 block text-xs font-semibold text-white md:text-sm"
            style={{ fontFamily: "var(--font-open-sans)" }}
          >
            Seu nome
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            required
            minLength={2}
            autoComplete="name"
            value={form.nome}
            onChange={(event) => updateField("nome", event.target.value)}
            onFocus={() => handleFieldFocus("nome")}
            onBlur={(event) => handleFieldComplete("nome", event.target.value)}
            onInvalid={handleInvalid}
            className="h-11 w-full rounded-xl border border-white/15 bg-white px-3.5 text-sm text-gray-900 placeholder-gray-500 outline-none transition focus:border-rp-gold focus:ring-2 focus:ring-rp-gold/35 md:h-12 md:text-base"
            placeholder="Como podemos chamar você?"
            style={{ fontFamily: "var(--font-open-sans)" }}
          />
        </div>

        <div>
          <label
            htmlFor="telefone"
            className="mb-1.5 block text-xs font-semibold text-white md:text-sm"
            style={{ fontFamily: "var(--font-open-sans)" }}
          >
            Telefone ou WhatsApp
          </label>
          <input
            type="tel"
            id="telefone"
            name="telefone"
            required
            minLength={8}
            maxLength={20}
            inputMode="tel"
            pattern="[0-9()+\s-]{8,20}"
            autoComplete="tel"
            value={form.telefone}
            onChange={(event) => updateField("telefone", event.target.value)}
            onFocus={() => handleFieldFocus("telefone")}
            onBlur={(event) => handleFieldComplete("telefone", event.target.value)}
            onInvalid={handleInvalid}
            className="h-11 w-full rounded-xl border border-white/15 bg-white px-3.5 text-sm text-gray-900 placeholder-gray-500 outline-none transition focus:border-rp-gold focus:ring-2 focus:ring-rp-gold/35 md:h-12 md:text-base"
            placeholder="(16) 99999-9999"
            style={{ fontFamily: "var(--font-open-sans)" }}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="cidade"
          className="mb-1.5 block text-xs font-semibold text-white md:text-sm"
          style={{ fontFamily: "var(--font-open-sans)" }}
        >
          Cidade <span className="font-normal text-white/60">(opcional)</span>
        </label>
        <input
          type="text"
          id="cidade"
          name="cidade"
          maxLength={100}
          autoComplete="address-level2"
          value={form.cidade}
          onChange={(event) => updateField("cidade", event.target.value)}
          onFocus={() => handleFieldFocus("cidade")}
          className="h-11 w-full rounded-xl border border-white/15 bg-white px-3.5 text-sm text-gray-900 placeholder-gray-500 outline-none transition focus:border-rp-gold focus:ring-2 focus:ring-rp-gold/35 md:h-12 md:text-base"
          placeholder="Ex.: Sertãozinho ou Ribeirão Preto"
        />
        <p className="mt-1.5 text-[11px] leading-relaxed text-white/60">
          Usada para orientar atendimento e logística. Não pedimos sua localização precisa.
        </p>
      </div>

      {!isB2B ? (
        <fieldset>
          <legend className="mb-2 text-xs font-semibold text-white md:text-sm">
            O que mais se parece com seu caso?
          </legend>
          <div className="flex flex-wrap gap-2">
            {quickCaseOptions.map(([value, label, message]) => {
              const selected = selectedCase === value;
              return (
                <button
                  key={value}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => {
                    setSelectedCase(value);
                    updateField("mensagem", message);
                    handleFormStart();
                    trackMarketingEvent("cta_click", {
                      event_category: "engagement",
                      event_label: `contact_case_${value}`,
                      component_id: "contact_case_chip",
                      position: "contact_form",
                      destination_type: "contact",
                    });
                  }}
                  className={`min-h-11 rounded-full border px-4 text-xs font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                    selected
                      ? "border-rp-gold bg-rp-gold text-[#1A1200]"
                      : "border-white/25 bg-white/[0.04] text-white hover:border-white/55"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </fieldset>
      ) : null}

      <div>
        <label
          htmlFor="mensagem"
          className="mb-1.5 block text-xs font-semibold text-white md:text-sm"
          style={{ fontFamily: "var(--font-open-sans)" }}
        >
          {isB2B ? "Conte sobre sua oficina" : "O que você precisa?"}
        </label>
        <textarea
          id="mensagem"
          name="mensagem"
          rows={3}
          required
          minLength={8}
          value={form.mensagem}
          onChange={(event) => updateField("mensagem", event.target.value)}
          onFocus={() => handleFieldFocus("mensagem")}
          onBlur={(event) => handleFieldComplete("mensagem", event.target.value)}
          onInvalid={handleInvalid}
          className="min-h-[88px] w-full resize-y rounded-xl border border-white/15 bg-white px-3.5 py-3 text-sm text-gray-900 placeholder-gray-500 outline-none transition focus:border-rp-gold focus:ring-2 focus:ring-rp-gold/35 md:min-h-[96px] md:text-base"
          placeholder={isB2B
            ? "Cidade, tipo de oficina e frequência de serviços de cabeçote."
            : "Ex.: cabeçote, superaquecimento, fumaça ou perda de potência."}
          style={{ fontFamily: "var(--font-open-sans)" }}
        />
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
      </div>

      {statusMessage ? (
        <div
          role={status === "error" ? "alert" : "status"}
          aria-live="polite"
          className={`rounded-2xl px-4 py-3 text-left text-sm font-semibold ${
            status === "success"
              ? "bg-white/90 text-[#0f5132]"
              : "bg-white/90 text-[#842029]"
          }`}
          style={{ fontFamily: "var(--font-open-sans)" }}
        >
          <p>{statusMessage}</p>
          {status === "error" || status === "success" ? (
            <a
              href={fallbackUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => {
                trackEngagementEvent(
                  "whatsapp_contact_form_submit",
                  "whatsapp_click",
                  status === "success"
                    ? "contact_form_handoff_fallback"
                    : "contact_form_fallback",
                  {
                    link_url: event.currentTarget.href,
                    method: "whatsapp",
                    component_id:
                      status === "success"
                        ? "contact_form_success_whatsapp"
                        : "contact_form_error_whatsapp",
                    position: "contact_form_result",
                    destination_type: "whatsapp",
                    destination_path: "/whatsapp",
                  }
                );
              }}
              className="mt-2 inline-flex rounded-full bg-[#25D366] px-4 py-2 text-xs font-bold text-[#052E16] transition hover:brightness-110"
            >
              Chamar no WhatsApp agora
            </a>
          ) : null}
        </div>
      ) : null}

      <div className="pt-1.5">
        <button
          type="submit"
          disabled={isSending}
          className="min-h-12 w-full rounded-full bg-rp-gold px-6 py-2.5 text-base font-bold text-[#1A1200] shadow-lg transition-all hover:-translate-y-0.5 hover:brightness-105 hover:shadow-xl disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0 md:text-lg"
          style={{ fontFamily: "var(--font-rajdhani)" }}
        >
          {isSending
            ? "Enviando..."
            : isB2B
              ? "Quero falar sobre parceria"
              : "Pedir orçamento"}
        </button>
        <p
          className="mt-2.5 text-center text-[11px] leading-relaxed text-white/85"
          style={{ fontFamily: "var(--font-open-sans)" }}
        >
          Sem compromisso. Usaremos o contato apenas para responder.{" "}
          <Link
            href="/privacidade"
            className="font-bold underline decoration-white/40 underline-offset-2 hover:text-white"
          >
            Saiba como cuidamos dos seus dados.
          </Link>
        </p>
      </div>
    </form>
  );
}
