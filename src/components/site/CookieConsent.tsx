"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

/** Evento que reabre as preferências de privacidade a partir do rodapé. */
export const ABRIR_PREFERENCIAS_EVENTO = "retifica:abrir-preferencias";
import {
  CONSENT_BANNER_VISIBILITY_EVENT,
  canSendTrackingRequests,
  clearDisallowedTrackingStorage,
  clearTrackingStorage,
  createConsentPreferences,
  dispatchConsentChanged,
  dispatchConsentRuntimeReady,
  readConsentPreferences,
  saveConsentPreferences,
  type ConsentPreferences,
  updateClarityConsent,
  updateGoogleConsent,
} from "@/lib/consent";

type CookieConsentProps = {
  gaMeasurementId: string;
  googleAdsId?: string;
  clarityId: string;
};

type RuntimeWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  clarity?: ((...args: unknown[]) => void) & { q?: unknown[][] };
  __retificaGoogleTagInitialized?: boolean;
  __retificaGaConfigured?: boolean;
  __retificaAdsConfigured?: boolean;
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
  ids: Pick<CookieConsentProps, "gaMeasurementId" | "googleAdsId">
) {
  if (
    (!preferences.analytics && !preferences.advertising) ||
    !canSendTrackingRequests()
  ) {
    return;
  }

  const runtimeWindow = window as RuntimeWindow;
  runtimeWindow.dataLayer = runtimeWindow.dataLayer || [];
  runtimeWindow.gtag =
    runtimeWindow.gtag ||
    function gtag(...args: unknown[]) {
      runtimeWindow.dataLayer?.push(args);
    };

  const bootstrapId = preferences.analytics
    ? ids.gaMeasurementId
    : ids.googleAdsId;

  if (bootstrapId && !runtimeWindow.__retificaGoogleTagInitialized) {
    runtimeWindow.gtag("js", new Date());
    appendScript(
      "retifica-google-tag",
      `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(bootstrapId)}`
    );
    runtimeWindow.__retificaGoogleTagInitialized = true;
  }

  if (
    preferences.analytics &&
    ids.gaMeasurementId &&
    !runtimeWindow.__retificaGaConfigured
  ) {
    runtimeWindow.gtag("config", ids.gaMeasurementId, {
      send_page_view: false,
    });
    runtimeWindow.__retificaGaConfigured = true;
  }

  if (
    preferences.advertising &&
    ids.googleAdsId &&
    !runtimeWindow.__retificaAdsConfigured
  ) {
    runtimeWindow.gtag("config", ids.googleAdsId);
    runtimeWindow.__retificaAdsConfigured = true;
  }

}

function initializeClarity(preferences: ConsentPreferences, clarityId: string) {
  if (!preferences.analytics || !canSendTrackingRequests()) return;

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
  gaMeasurementId,
  googleAdsId,
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
        dispatchConsentRuntimeReady();
        return;
      }

      updateGoogleConsent(stored);
      clearDisallowedTrackingStorage(stored);
      initializeGoogleTags(stored, {
        gaMeasurementId,
        googleAdsId,
      });
      initializeClarity(stored, clarityId);
      dispatchConsentRuntimeReady();
    }, 0);

    return () => window.clearTimeout(initializationTimer);
  }, [clarityId, gaMeasurementId, googleAdsId]);

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
        gaMeasurementId,
        googleAdsId,
      });
      initializeClarity(next, clarityId);
      dispatchConsentChanged(next);

      setPreferences(next);
      setAnalytics(next.analytics);
      setAdvertising(next.advertising);
      setIsCustomizing(false);
      setIsOpen(false);
    },
    [clarityId, gaMeasurementId, googleAdsId]
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
          <div className="h-0.5 bg-rp-gold" />
          <div className="px-4 pb-[max(0.375rem,env(safe-area-inset-bottom))] pt-2 sm:p-5">
            <div className="flex flex-col gap-1.5 lg:flex-row lg:items-center lg:justify-between lg:gap-3">
              <div className="max-w-2xl">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-heading text-base font-bold leading-tight sm:text-lg">
                    Privacidade no site
                  </h2>
                  <div className="flex shrink-0 items-center gap-3 text-xs font-bold">
                    <Link
                      href="/privacidade"
                      className="min-h-8 content-center text-white/65 underline decoration-white/25 underline-offset-4 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      Política
                    </Link>
                    {!isCustomizing ? (
                      <button
                        type="button"
                        onClick={openConfiguration}
                        className="min-h-8 text-white/80 underline decoration-white/30 underline-offset-4 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                        Personalizar
                      </button>
                    ) : null}
                  </div>
                </div>
                <p className="mt-0.5 text-[11px] leading-tight text-white/72 sm:text-sm sm:leading-relaxed">
                  Google, Clarity e Retiflow: desligados até sua escolha.
                </p>
              </div>

              {!isCustomizing ? (
                <div className="grid shrink-0 grid-cols-2 gap-1.5 lg:w-auto lg:gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      hasInteractedRef.current = true;
                      applyChoices(false, false);
                    }}
                    className="min-h-10 whitespace-nowrap rounded-full border border-white/20 px-3 text-xs font-bold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:min-h-11 sm:px-4 sm:text-sm"
                  >
                    Rejeitar opcionais
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
                    description="Guarda sua escolha de privacidade e as respostas da perguntas do site neste aparelho. Não mede marketing."
                    checked
                    disabled
                  />
                  <ChoiceRow
                    title="Análise avançada da experiência"
                    description="Google Analytics e Clarity analisam páginas e estimam região; o Retiflow registra a jornada e a cidade que você informar. Sem GPS."
                    checked={analytics}
                    onChange={setAnalytics}
                  />
                  <ChoiceRow
                    title="Anúncios e conversões"
                    description="Google Ads e Retiflow registram origem, campanha e identificadores de clique para medir contatos."
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
