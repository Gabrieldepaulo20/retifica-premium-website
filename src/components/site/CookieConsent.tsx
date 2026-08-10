"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Evento que reabre as preferências de privacidade a partir do rodapé. */
export const ABRIR_PREFERENCIAS_EVENTO = "retifica:abrir-preferencias";
import {
  CONSENT_BANNER_VISIBILITY_EVENT,
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
    <label
      className={`flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.055] p-3 transition-colors sm:gap-4 sm:p-3.5 ${
        disabled ? "cursor-default" : "cursor-pointer hover:bg-white/[0.08]"
      }`}
    >
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
  const configurationHeadingRef = useRef<HTMLHeadingElement>(null);
  const hasInteractedRef = useRef(false);

  useEffect(() => {
    const initializationTimer = window.setTimeout(() => {
      const stored = readConsentPreferences();
      hasInteractedRef.current = Boolean(stored);
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

  useEffect(() => {
    if (isCustomizing) {
      configurationHeadingRef.current?.focus();
    }
  }, [isCustomizing]);

  const applyChoices = useCallback(
    (
      nextAnalytics: boolean,
      nextAdvertising: boolean,
      decisionMethod: NonNullable<ConsentPreferences["decisionMethod"]> = "explicit"
    ) => {
      const next = createConsentPreferences(
        {
          analytics: nextAnalytics,
          advertising: nextAdvertising,
        },
        decisionMethod
      );

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
    },
    [clarityId, googleAdsId, gtmId]
  );

  function openConfiguration() {
    hasInteractedRef.current = true;
    setAnalytics(preferences?.analytics ?? false);
    setAdvertising(preferences?.advertising ?? false);
    setIsCustomizing(true);
  }

  const reopenPreferences = useCallback(() => {
    hasInteractedRef.current = true;
    setAnalytics(preferences?.analytics ?? false);
    setAdvertising(preferences?.advertising ?? false);
    setIsCustomizing(true);
    setIsOpen(true);
  }, [preferences]);

  /**
   * O botão flutuante de privacidade saiu: no celular ele disputava a base da
   * tela com o WhatsApp e cobria conteúdo. A LGPD exige que dê para rever o
   * consentimento a qualquer momento, então o caminho passou a ser o link
   * "Privacidade e cookies" do rodapé, que dispara este evento.
   */
  useEffect(() => {
    const abrir = () => reopenPreferences();
    window.addEventListener(ABRIR_PREFERENCIAS_EVENTO, abrir);
    return () => window.removeEventListener(ABRIR_PREFERENCIAS_EVENTO, abrir);
  }, [reopenPreferences]);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent(CONSENT_BANNER_VISIBILITY_EVENT, {
        detail: { open: isOpen },
      })
    );
  }, [isOpen]);

  if (preferences === undefined) return null;

  return (
    <>
      {isOpen ? (
        <section
          className="fixed inset-x-2 bottom-2 z-[1100] mx-auto max-h-[min(72dvh,calc(100dvh-1rem))] max-w-5xl overflow-y-auto overscroll-contain rounded-2xl border border-white/15 bg-[#06172e]/[0.985] text-white shadow-[0_24px_80px_rgba(2,14,29,0.48)] backdrop-blur-xl sm:inset-x-5 sm:bottom-5 sm:max-h-[calc(100dvh-2.5rem)]"
          role="region"
          aria-label="Preferências de privacidade"
        >
          <div className="h-1 bg-rp-gold" />
          <div className="px-4 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2.5 sm:p-5">
            <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="font-heading text-base font-bold leading-tight sm:text-lg">
                    Sua escolha de privacidade
                  </h2>
                  {!isCustomizing ? (
                    <button
                      type="button"
                      onClick={openConfiguration}
                      className="min-h-8 shrink-0 text-xs font-bold text-white/80 underline decoration-white/30 underline-offset-4 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      Personalizar
                    </button>
                  ) : null}
                </div>
                <p className="mt-1 text-[13px] leading-relaxed text-white/72 sm:text-sm">
                  Cookies opcionais medem a experiência e os anúncios. Ficam desligados até sua escolha.
                </p>
              </div>

              {!isCustomizing ? (
                <div className="grid shrink-0 grid-cols-2 gap-2 lg:w-auto">
                  <button
                    type="button"
                    onClick={() => {
                      hasInteractedRef.current = true;
                      applyChoices(false, false);
                    }}
                    className="min-h-10 whitespace-nowrap rounded-full border border-white/20 px-3 text-xs font-bold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:min-h-11 sm:px-4 sm:text-sm"
                  >
                    Rejeitar não necessários
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      hasInteractedRef.current = true;
                      applyChoices(true, true);
                    }}
                    className="min-h-10 whitespace-nowrap rounded-full border border-rp-gold bg-rp-gold px-3 text-xs font-extrabold text-[#07172e] transition-colors hover:bg-[#ffd45c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:min-h-11 sm:px-5 sm:text-sm"
                  >
                    Aceitar opcionais
                  </button>
                </div>
              ) : null}
            </div>

            {isCustomizing ? (
              <div
                className="mt-3 border-t border-white/10 pt-3 sm:mt-4 sm:pt-4"
                aria-labelledby="cookie-configuration-title"
              >
                <div className="mb-3 flex items-start justify-between gap-4">
                  <div>
                    <h3
                      ref={configurationHeadingRef}
                      id="cookie-configuration-title"
                      tabIndex={-1}
                      className="font-heading text-base font-bold text-white outline-none sm:text-lg"
                    >
                      Configure os cookies opcionais
                    </h3>
                    <p className="mt-0.5 text-xs leading-relaxed text-white/60">
                      Cookies não necessários continuam desligados por padrão.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setAnalytics(preferences?.analytics ?? false);
                      setAdvertising(preferences?.advertising ?? false);
                      setIsCustomizing(false);
                      if (preferences) setIsOpen(false);
                    }}
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-xl leading-none text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    aria-label={preferences ? "Fechar configurações" : "Voltar"}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="grid gap-2.5 md:grid-cols-3">
                  <ChoiceRow
                    title="Funcionamento essencial"
                    description="Guarda sua escolha de privacidade e as respostas da triagem neste aparelho. Não mede marketing."
                    checked
                    disabled
                  />
                  <ChoiceRow
                    title="Análise avançada da experiência"
                    description="Google Analytics e Microsoft Clarity para medir cidade e região aproximadas, páginas visitadas e uso dos formulários."
                    checked={analytics}
                    onChange={setAnalytics}
                  />
                  <ChoiceRow
                    title="Anúncios e conversões"
                    description="Preserva origem, campanha e identificadores de clique para medir quais anúncios geram contatos."
                    checked={advertising}
                    onChange={setAdvertising}
                  />
                </div>
                <div className="mt-3 grid grid-cols-1 gap-2 sm:mt-4 sm:grid-cols-2 sm:justify-end md:ml-auto md:max-w-xl">
                  <button
                    type="button"
                    onClick={() => applyChoices(false, false)}
                    className="min-h-11 rounded-full border border-white/20 px-5 text-sm font-bold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Usar só os obrigatórios
                  </button>
                  <button
                    type="button"
                    onClick={() => applyChoices(analytics, advertising)}
                    className="min-h-11 rounded-full bg-[#f3b839] px-6 text-sm font-extrabold text-[#07172e] hover:bg-[#ffc94d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Salvar preferências
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}
    </>
  );
}
