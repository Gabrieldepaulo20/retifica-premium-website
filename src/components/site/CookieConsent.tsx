"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  clearDisallowedTrackingStorage,
  clearTrackingStorage,
  createConsentPreferences,
  dispatchConsentChanged,
  readConsentPreferences,
  saveConsentPreferences,
  type ConsentPreferences,
  updateClarityConsent,
  updateGoogleConsent,
} from "@/lib/consent";

type CookieConsentProps = {
  googleAdsId?: string;
  gtmId?: string;
  clarityId: string;
};

type RuntimeWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  clarity?: ((...args: unknown[]) => void) & { q?: unknown[][] };
  __retificaGtmInitialized?: boolean;
  __retificaClarityInitialized?: boolean;
};

function appendScript(id: string, src: string) {
  if (document.getElementById(id)) return;

  const script = document.createElement("script");
  script.id = id;
  script.src = src;
  script.async = true;
  document.head.appendChild(script);
}

function initializeGoogleTags(
  preferences: ConsentPreferences,
  ids: Pick<CookieConsentProps, "googleAdsId" | "gtmId">
) {
  if (!preferences.analytics && !preferences.advertising) return;

  const runtimeWindow = window as RuntimeWindow;
  runtimeWindow.dataLayer = runtimeWindow.dataLayer || [];
  runtimeWindow.gtag =
    runtimeWindow.gtag ||
    function gtag(...args: unknown[]) {
      runtimeWindow.dataLayer?.push(args);
    };

  if (preferences.advertising && ids.googleAdsId) {
    runtimeWindow.gtag("config", ids.googleAdsId);
  }

  if (ids.gtmId && !runtimeWindow.__retificaGtmInitialized) {
    runtimeWindow.dataLayer.push({
      "gtm.start": Date.now(),
      event: "gtm.js",
    });
    appendScript(
      "retifica-google-tag-manager",
      `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(ids.gtmId)}`
    );
    runtimeWindow.__retificaGtmInitialized = true;
  }
}

function initializeClarity(preferences: ConsentPreferences, clarityId: string) {
  if (!preferences.analytics) return;

  const runtimeWindow = window as RuntimeWindow;
  runtimeWindow.clarity =
    runtimeWindow.clarity ||
    Object.assign(
      (...args: unknown[]) => {
        runtimeWindow.clarity!.q = runtimeWindow.clarity!.q || [];
        runtimeWindow.clarity!.q.push(args);
      },
      { q: [] as unknown[][] }
    );

  updateClarityConsent(preferences);

  if (runtimeWindow.__retificaClarityInitialized) return;
  appendScript(
    "retifica-ms-clarity",
    `https://www.clarity.ms/tag/${encodeURIComponent(clarityId)}`
  );
  runtimeWindow.__retificaClarityInitialized = true;
}

function ChoiceRow({
  title,
  description,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.055] p-3.5 transition-colors hover:bg-white/[0.08]">
      <span>
        <span className="block font-heading text-base font-bold text-white">
          {title}
        </span>
        <span className="mt-0.5 block text-xs leading-relaxed text-white/65">
          {description}
        </span>
      </span>
      <span className="relative mt-0.5 inline-flex shrink-0">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          disabled={disabled}
          onChange={(event) => onChange?.(event.target.checked)}
        />
        <span className="h-6 w-11 rounded-full bg-white/20 transition-colors peer-checked:bg-[#f3b839] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-white peer-disabled:opacity-70" />
        <span className="pointer-events-none absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-5" />
      </span>
    </label>
  );
}

export function CookieConsent({
  googleAdsId,
  gtmId,
  clarityId,
}: CookieConsentProps) {
  const [preferences, setPreferences] = useState<
    ConsentPreferences | null | undefined
  >(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [advertising, setAdvertising] = useState(false);

  useEffect(() => {
    const initializationTimer = window.setTimeout(() => {
      const stored = readConsentPreferences();
      setPreferences(stored);
      setAnalytics(stored?.analytics ?? false);
      setAdvertising(stored?.advertising ?? false);
      setIsOpen(!stored);

      if (!stored) {
        clearTrackingStorage();
        updateGoogleConsent(null);
        return;
      }

      updateGoogleConsent(stored);
      clearDisallowedTrackingStorage(stored);
      initializeGoogleTags(stored, {
        googleAdsId,
        gtmId,
      });
      initializeClarity(stored, clarityId);
    }, 0);

    return () => window.clearTimeout(initializationTimer);
  }, [clarityId, googleAdsId, gtmId]);

  function applyChoices(nextAnalytics: boolean, nextAdvertising: boolean) {
    const next = createConsentPreferences({
      analytics: nextAnalytics,
      advertising: nextAdvertising,
    });

    saveConsentPreferences(next);
    updateGoogleConsent(next);
    updateClarityConsent(next);
    clearDisallowedTrackingStorage(next);
    initializeGoogleTags(next, {
      googleAdsId,
      gtmId,
    });
    initializeClarity(next, clarityId);
    dispatchConsentChanged(next);

    setPreferences(next);
    setAnalytics(next.analytics);
    setAdvertising(next.advertising);
    setIsCustomizing(false);
    setIsOpen(false);
  }

  function reopenPreferences() {
    setAnalytics(preferences?.analytics ?? false);
    setAdvertising(preferences?.advertising ?? false);
    setIsCustomizing(true);
    setIsOpen(true);
  }

  if (preferences === undefined) return null;

  return (
    <>
      {isOpen ? (
        <section
          className="fixed inset-x-3 bottom-3 z-[1100] mx-auto max-w-5xl overflow-hidden rounded-2xl border border-white/15 bg-[#06172e]/[0.985] text-white shadow-[0_24px_80px_rgba(2,14,29,0.48)] backdrop-blur-xl sm:inset-x-5 sm:bottom-5"
          role="region"
          aria-label="Preferências de privacidade"
        >
          <div className="h-1 bg-gradient-to-r from-[#f3b839] via-[#f4891f] to-[#2563eb]" />
          <div className="p-4 sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <div className="mb-2 flex items-center gap-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#f3b839]/35 bg-[#f3b839]/10 text-[#f3b839]">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      aria-hidden="true"
                    >
                      <path d="M12 3 5.5 5.5v5.3c0 4.4 2.7 8.3 6.5 10.2 3.8-1.9 6.5-5.8 6.5-10.2V5.5L12 3Z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#f3b839]">
                    Controle dos seus dados
                  </span>
                </div>
                <h2 className="font-heading text-xl font-bold leading-tight sm:text-2xl">
                  Você escolhe como podemos aprender com sua visita
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-white/72">
                  Registramos uma sessão técnica mínima, com página acessada,
                  origem geral e tempo ativo, sem identificação direta.
                  Com sua autorização, ampliamos a análise da experiência e dos anúncios.
                </p>
                <Link
                  href="/privacidade"
                  className="mt-2 inline-flex text-xs font-bold text-white/75 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3b839]"
                >
                  Ver política de privacidade e cookies
                </Link>
              </div>

              {!isCustomizing ? (
                <div className="grid shrink-0 grid-cols-1 gap-2 sm:grid-cols-3 lg:w-auto">
                  <button
                    type="button"
                    onClick={() => applyChoices(false, false)}
                    className="min-h-11 rounded-full border border-white/20 px-4 text-sm font-bold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Recusar opcionais
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsCustomizing(true)}
                    className="min-h-11 rounded-full border border-white/20 px-4 text-sm font-bold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Configurar
                  </button>
                  <button
                    type="button"
                    onClick={() => applyChoices(true, true)}
                    className="min-h-11 rounded-full bg-gradient-to-b from-[#f7c64f] to-[#f39a24] px-5 text-sm font-extrabold text-[#07172e] shadow-[0_8px_24px_rgba(243,184,57,0.2)] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transform-none"
                  >
                    Aceitar e continuar
                  </button>
                </div>
              ) : null}
            </div>

            {isCustomizing ? (
              <div className="mt-4 border-t border-white/10 pt-4">
                <div className="grid gap-2.5 md:grid-cols-3">
                  <ChoiceRow
                    title="Medição básica da sessão"
                    description="Registra páginas, origem geral e tempo sem cookie persistente, URL de consulta ou identificador de anúncio."
                    checked
                    disabled
                  />
                  <ChoiceRow
                    title="Análise avançada da experiência"
                    description="Autoriza armazenamento do Google Analytics e Microsoft Clarity para melhorar páginas e formulários."
                    checked={analytics}
                    onChange={setAnalytics}
                  />
                  <ChoiceRow
                    title="Anúncios e conversões"
                    description="Origem, campanha e identificadores de clique para medir o Google Ads."
                    checked={advertising}
                    onChange={setAdvertising}
                  />
                </div>
                <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                  {preferences ? (
                    <button
                      type="button"
                      onClick={() => {
                        setIsCustomizing(false);
                        setIsOpen(false);
                      }}
                      className="min-h-11 rounded-full border border-white/20 px-5 text-sm font-bold text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      Cancelar
                    </button>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => applyChoices(analytics, advertising)}
                    className="min-h-11 rounded-full bg-[#f3b839] px-6 text-sm font-extrabold text-[#07172e] hover:bg-[#ffc94d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Salvar minhas escolhas
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </section>
      ) : (
        <button
          type="button"
          onClick={reopenPreferences}
          className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-3 z-[998] inline-flex min-h-10 items-center gap-2 rounded-full border border-[#053282]/15 bg-white/95 px-3.5 text-xs font-bold text-[#053282] shadow-lg backdrop-blur-sm transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#053282] motion-reduce:transform-none sm:left-5"
          aria-label="Reabrir preferências de privacidade"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <path d="M12 3 5.5 5.5v5.3c0 4.4 2.7 8.3 6.5 10.2 3.8-1.9 6.5-5.8 6.5-10.2V5.5L12 3Z" />
            <path d="M9.5 12h5" />
          </svg>
          Privacidade
        </button>
      )}
    </>
  );
}
