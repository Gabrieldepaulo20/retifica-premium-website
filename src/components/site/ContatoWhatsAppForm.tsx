"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { siteConfig } from "@/lib/site";
import { trackEngagementEvent } from "@/lib/trackingEvents";

type ContactFormState = {
  nome: string;
  telefone: string;
  email: string;
  assunto: string;
  mensagem: string;
};

const initialState: ContactFormState = {
  nome: "",
  telefone: "",
  email: "",
  assunto: "",
  mensagem: "",
};

const subjectLabels: Record<string, string> = {
  orcamento: "Solicitar orçamento",
  duvidas: "Tirar dúvidas",
  b2b: "Parceria para oficina",
  outros: "Outros assuntos",
};

export function ContatoWhatsAppForm() {
  const [form, setForm] = useState(initialState);

  function updateField(
    field: keyof ContactFormState,
    value: ContactFormState[keyof ContactFormState]
  ) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const assunto = subjectLabels[form.assunto] ?? form.assunto;
    const text = [
      "Olá, vim pelo site da Retífica Premium e gostaria de atendimento.",
      "",
      `Nome: ${form.nome}`,
      `Telefone/WhatsApp: ${form.telefone}`,
      form.email ? `E-mail: ${form.email}` : "",
      `Assunto: ${assunto}`,
      `Mensagem: ${form.mensagem}`,
    ]
      .filter(Boolean)
      .join("\n");

    trackEngagementEvent(
      "whatsapp_contact_form_submit",
      "whatsapp_click",
      "contact_form"
    );

    window.open(
      `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(
        text
      )}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-[640px]:space-y-3 md:space-y-5">
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
          E-mail
        </label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          value={form.email}
          onChange={(event) => updateField("email", event.target.value)}
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
          className="min-h-[120px] w-full rounded-xl border border-black/10 bg-[#FFE3A6] px-3 py-2.5 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 max-[640px]:min-h-[100px] max-[640px]:px-3 md:min-h-[170px] md:px-4 md:py-3 md:text-base"
          placeholder="Conte o sintoma: motor fumando, baixando óleo, superaquecendo, perda de potência..."
          style={{ fontFamily: "var(--font-open-sans)" }}
        />
      </div>

      <div className="pt-3 max-[640px]:pt-2 md:pt-4">
        <button
          type="submit"
          className="w-full rounded-full px-8 py-2.5 text-base font-bold text-white shadow-lg transition-all hover:opacity-90 max-[640px]:px-6 max-[640px]:py-2 max-[640px]:text-sm md:px-10 md:py-3 md:text-lg"
          style={{
            background: "linear-gradient(0deg, #F3B839 0%, #F4891F 100%)",
            fontFamily: "var(--font-rajdhani)",
          }}
        >
          Enviar pelo WhatsApp
        </button>
      </div>
    </form>
  );
}
