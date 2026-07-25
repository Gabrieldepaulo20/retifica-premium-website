"use client";

import type { FormEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/site";
import {
  buildWhatsAppUrlWithAttribution,
  createMarketingEventId,
  getOrCreateContactIntent,
  getStoredAttribution,
  trackEngagementEvent,
  trackMarketingEvent,
} from "@/lib/trackingEvents";

type ContactFormState = {
  nome: string;
  telefone: string;
  email: string;
  assunto: string;
  mensagem: string;
};

type ContactField = keyof ContactFormState;

const baseState: ContactFormState = {
  nome: "",
  telefone: "",
  email: "",
  assunto: "",
  mensagem: "",
};

const trackedFields: ContactField[] = [
  "nome",
  "telefone",
  "email",
  "assunto",
  "mensagem",
];

const subjectLabels: Record<string, string> = {
  orcamento: "Solicitar orçamento",
  duvidas: "Tirar dúvidas",
  b2b: "Parceria para oficina",
  outros: "Outros assuntos",
};

const b2bLevelLabels: Record<string, string> = {
  essencial: "Essencial - R$ 8 mil a R$ 15 mil/mês",
  crescimento: "Crescimento - R$ 15 mil a R$ 25 mil/mês",
  performance: "Performance - R$ 25 mil a R$ 50 mil/mês",
  diamante: "Diamante - R$ 50 mil+/mês",
};

type SubmitStatus = "idle" | "sending" | "success" | "error";

type ContatoWhatsAppFormProps = {
  defaultSubject?: keyof typeof subjectLabels;
  leadLabel?: string;
};

export function ContatoWhatsAppForm({
  defaultSubject,
  leadLabel = "contact_form",
}: ContatoWhatsAppFormProps = {}) {
  const initialState: ContactFormState = {
    ...baseState,
    assunto: defaultSubject ?? "",
  };
  const [form, setForm] = useState(initialState);
  const [website, setWebsite] = useState("");
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

    return b2bLevelLabels[level] ?? level;
  }

  function buildLeadMessage(assunto: string, b2bLevel: string) {
    return [
      "Olá, vim pelo site da Retífica Premium e gostaria de atendimento.",
      "",
      `Nome: ${form.nome}`,
      `Telefone/WhatsApp: ${form.telefone}`,
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
      const response = await fetch("/api/contato", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          eventId: createMarketingEventId(),
          leadCode: contactIntent.leadCode,
          anonymousId: contactIntent.anonymousId,
          sessionId: contactIntent.sessionId,
          b2bLevel,
          pageLocation: window.location.href,
          attribution: getStoredAttribution(),
          website,
        }),
      });

      const data = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;

      if (!response.ok) {
        throw new Error(data?.message || "Falha ao enviar o formulário.");
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
      setWebsite("");
      setStatus("success");
      setStatusMessage(
        "Mensagem enviada. A equipe da Retífica Premium recebeu sua solicitação e vai responder em breve."
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
      className="space-y-4 max-[640px]:space-y-3 md:space-y-5"
    >
      <div className="rounded-2xl border border-[#053282]/10 bg-white/80 px-4 py-3 text-[#17325d] shadow-sm">
        <p
          className="text-sm font-bold"
          style={{ fontFamily: "var(--font-open-sans)" }}
        >
          Retorno rápido por WhatsApp ou ligação
        </p>
        <p
          className="mt-1 text-xs leading-relaxed text-[#42526d]"
          style={{ fontFamily: "var(--font-open-sans)" }}
        >
          Conte o que está acontecendo com o motor. Seu pedido vai direto para a equipe de atendimento.
        </p>
      </div>
      <div>
        <label
          htmlFor="nome"
          className="mb-1.5 block text-xs font-medium text-white max-[640px]:mb-1 md:mb-2 md:text-sm"
          style={{ fontFamily: "var(--font-open-sans)" }}
        >
          Nome completo
        </label>
        <input
          type="text"
          id="nome"
          name="nome"
          required
          autoComplete="name"
          value={form.nome}
          onChange={(event) => updateField("nome", event.target.value)}
          onFocus={() => handleFieldFocus("nome")}
          onBlur={(event) => handleFieldComplete("nome", event.target.value)}
          onInvalid={handleInvalid}
          className="h-11 w-full rounded-xl border border-black/10 bg-[#FFE3A6] px-3 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 max-[640px]:h-10 max-[640px]:px-3 md:h-12 md:px-4 md:text-base"
          placeholder="Seu nome completo"
          style={{ fontFamily: "var(--font-open-sans)" }}
        />
      </div>

      <div>
        <label
          htmlFor="telefone"
          className="mb-1.5 block text-xs font-medium text-white max-[640px]:mb-1 md:mb-2 md:text-sm"
          style={{ fontFamily: "var(--font-open-sans)" }}
        >
          Telefone/WhatsApp
        </label>
        <input
          type="tel"
          id="telefone"
          name="telefone"
          required
          autoComplete="tel"
          value={form.telefone}
          onChange={(event) => updateField("telefone", event.target.value)}
          onFocus={() => handleFieldFocus("telefone")}
          onBlur={(event) => handleFieldComplete("telefone", event.target.value)}
          onInvalid={handleInvalid}
          className="h-11 w-full rounded-xl border border-black/10 bg-[#FFE3A6] px-3 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 max-[640px]:h-10 max-[640px]:px-3 md:h-12 md:px-4 md:text-base"
          placeholder="(16) 99999-9999"
          style={{ fontFamily: "var(--font-open-sans)" }}
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-xs font-medium text-white max-[640px]:mb-1 md:mb-2 md:text-sm"
          style={{ fontFamily: "var(--font-open-sans)" }}
        >
          E-mail <span className="font-normal text-white/75">(opcional)</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          value={form.email}
          onChange={(event) => updateField("email", event.target.value)}
          onFocus={() => handleFieldFocus("email")}
          onBlur={(event) => handleFieldComplete("email", event.target.value)}
          onInvalid={handleInvalid}
          className="h-11 w-full rounded-xl border border-black/10 bg-[#FFE3A6] px-3 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 max-[640px]:h-10 max-[640px]:px-3 md:h-12 md:px-4 md:text-base"
          placeholder="seu@email.com"
          style={{ fontFamily: "var(--font-open-sans)" }}
        />
      </div>

      <div>
        <label
          htmlFor="assunto"
          className="mb-1.5 block text-xs font-medium text-white max-[640px]:mb-1 md:mb-2 md:text-sm"
          style={{ fontFamily: "var(--font-open-sans)" }}
        >
          Assunto
        </label>
        <select
          id="assunto"
          name="assunto"
          required
          value={form.assunto}
          onChange={(event) => updateField("assunto", event.target.value)}
          onFocus={() => handleFieldFocus("assunto")}
          onBlur={(event) => handleFieldComplete("assunto", event.target.value)}
          onInvalid={handleInvalid}
          className="h-11 w-full rounded-xl border border-black/10 bg-[#FFE3A6] px-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50 max-[640px]:h-10 max-[640px]:px-3 md:h-12 md:px-4 md:text-base"
          style={{ fontFamily: "var(--font-open-sans)" }}
        >
          <option value="">Selecione um assunto</option>
          <option value="orcamento">Solicitar orçamento</option>
          <option value="duvidas">Tirar dúvidas</option>
          <option value="b2b">Parceria para oficina</option>
          <option value="outros">Outros assuntos</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="mensagem"
          className="mb-1.5 block text-xs font-medium text-white max-[640px]:mb-1 md:mb-2 md:text-sm"
          style={{ fontFamily: "var(--font-open-sans)" }}
        >
          Mensagem
        </label>
        <textarea
          id="mensagem"
          name="mensagem"
          rows={4}
          required
          value={form.mensagem}
          onChange={(event) => updateField("mensagem", event.target.value)}
          onFocus={() => handleFieldFocus("mensagem")}
          onBlur={(event) => handleFieldComplete("mensagem", event.target.value)}
          onInvalid={handleInvalid}
          className="min-h-[120px] w-full rounded-xl border border-black/10 bg-[#FFE3A6] px-3 py-2.5 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 max-[640px]:min-h-[100px] max-[640px]:px-3 md:min-h-[170px] md:px-4 md:py-3 md:text-base"
          placeholder="Conte o sintoma: motor fumando, baixando óleo, superaquecendo, perda de potência..."
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
          {status === "error" ? (
            <a
              href={fallbackUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => {
                trackEngagementEvent(
                  "whatsapp_contact_form_submit",
                  "whatsapp_click",
                  "contact_form_fallback",
                  {
                    link_url: event.currentTarget.href,
                    method: "whatsapp",
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

      <div className="pt-3 max-[640px]:pt-2 md:pt-4">
        <button
          type="submit"
          disabled={isSending}
          className="w-full rounded-full px-8 py-2.5 text-base font-bold text-white shadow-lg transition-all hover:opacity-90 disabled:cursor-wait disabled:opacity-70 max-[640px]:px-6 max-[640px]:py-2 max-[640px]:text-sm md:px-10 md:py-3 md:text-lg"
          style={{
            background: "linear-gradient(0deg, #F3B839 0%, #F4891F 100%)",
            fontFamily: "var(--font-rajdhani)",
          }}
        >
          {isSending ? "Enviando..." : "Quero receber meu orçamento"}
        </button>
        <p
          className="mt-3 text-center text-xs text-white/85"
          style={{ fontFamily: "var(--font-open-sans)" }}
        >
          Sem compromisso. A equipe recebe seus dados por e-mail e responde pelo contato informado.
        </p>
      </div>
    </form>
  );
}
