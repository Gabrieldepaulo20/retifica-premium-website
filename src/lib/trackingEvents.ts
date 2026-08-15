import {
  canSendTrackingRequests,
  currentTrackingEnvironment,
  currentTrackingHostname,
  hasAdvertisingConsent,
  hasAnalyticsConsent,
  hasMeasurementConsent,
  isConsentRuntimeReady,
  privacySafePageLocation,
} from "@/lib/consent";
import { classifyTrafficAttribution } from "@/lib/traffic-attribution";

export type ClarityEventName =
  | "whatsapp_floating_click"
  | "whatsapp_home_cta_click"
  | "whatsapp_service_cta_click"
  | "whatsapp_contact_cta_click"
  | "whatsapp_contact_form_submit"
  | "whatsapp_footer_click"
  | "instagram_footer_click"
  | "phone_click"
  | "directions_click"
  | "cta_click"
  | "service_detail_click"
  | "form_start"
  | "scroll_depth";

type GaEventName =
  | "page_view"
  | "engagement_5s"
  | "engagement_10s"
  | "cta_impression"
  | "whatsapp_click"
  | "instagram_click"
  | "phone_click"
  | "directions_click"
  | "cta_click"
  | "service_detail_click"
  | "form_view"
  | "form_start"
  | "form_field_complete"
  | "form_submit_attempt"
  | "form_validation_error"
  | "form_abandon"
  | "form_submit_error"
  | "generate_lead"
  | "scroll_depth"
  | "quiz_start"
  | "quiz_flow_selected"
  | "quiz_option_selected"
  | "quiz_field_interaction"
  | "quiz_step_view"
  | "quiz_step_complete"
  | "quiz_continue_blocked"
  | "quiz_unknown_selected"
  | "quiz_back"
  | "quiz_reset"
  | "quiz_file_intent"
  | "quiz_result_view"
  | "quiz_estimate_state"
  | "quiz_qualified_intent"
  | "quiz_out_of_scope"
  | "video_play"
  | "video_som_ativado"
  | "quiz_whatsapp_prepared"
  | "quiz_whatsapp_click";

export type MarketingEventParams = {
  event_category?: "engagement" | "lead" | "navigation";
  event_label?: string;
  link_url?: string;
  method?: string;
  percent_scrolled?: number;
  service_name?: string;
  page_location?: string;
  traffic_source?: string;
  traffic_conferium?: string;
  traffic_campaign?: string;
  traffic_term?: string;
  gclid?: string;
  transaction_id?: string;
  engaged_seconds?: number;
  destination_type?: string;
  destination_path?: string;
  /** Cidade informada de forma explícita; é enviada apenas ao Retiflow. */
  visitor_city?: string;
  [key: string]: string | number | undefined;
};

type GoogleAdsConversionParams = MarketingEventParams & {
  send_to: string;
  value: number;
  currency: "BRL";
  transaction_id: string;
};

export type StoredAttribution = {
  source?: string;
  conferium?: string;
  campaign?: string;
  term?: string;
  content?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  landingPage: string;
  referrer?: string;
  capturedAt: string;
  expiresAt: string;
};

type RuntimeAttribution = StoredAttribution & {
  originType: "paid" | "organic" | "other";
};

export type ContactIntent = {
  eventId: string;
  leadCode: string;
  anonymousId: string;
  sessionId: string;
  createdAt: string;
};

type TrackingWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>;
  clarity?: (command: "event", eventName: ClarityEventName) => void;
  gtag?: (
    command: "event",
    eventName: GaEventName | "conversion",
    params: MarketingEventParams | GoogleAdsConversionParams
  ) => void;
};

const ATTRIBUTION_KEY = "retifica_premium_attribution";
const ANONYMOUS_ID_KEY = "retifica_premium_anonymous_id";
const SESSION_ID_KEY = "retifica_premium_session_id";
const SESSION_ACTIVITY_KEY = "retifica_premium_session_activity";
const SESSION_ATTRIBUTION_KEY = "retifica_premium_session_attribution";
const CONTACT_INTENT_KEY = "retifica_premium_contact_intent";
const LEAD_CODE_KEY = "retifica_premium_lead_code";
const REPORTED_EVENTS_KEY = "retifica_premium_reported_events";
const CONTACT_INTENT_TTL_MS = 30 * 60 * 1000;
/**
 * Janela em que dois contatos da mesma pessoa continuam sendo o mesmo lead.
 * Além dela, quem volta a procurar a retífica é um caso comercial novo.
 */
const LEAD_CODE_TTL_MS = 30 * 24 * 60 * 60 * 1000;
const SESSION_INACTIVITY_TTL_MS = 30 * 60 * 1000;
const ATTRIBUTION_TTL_MS = 90 * 24 * 60 * 60 * 1000;
const EXTERNAL_EVENT_OUTBOX_KEY = "retifica_premium_event_outbox";
const EXTERNAL_EVENT_OUTBOX_MAX = 40;
const EXTERNAL_EVENT_OUTBOX_TTL_MS = 24 * 60 * 60 * 1000;
export const MEASUREMENT_SESSION_ROTATED_EVENT =
  "retifica:measurement-session-rotated";
const pendingEvents = new Set<string>();
let anonymousRuntimeIntent: ContactIntent | null = null;
let runtimeAttribution: RuntimeAttribution | null = null;
let externalEventOutboxFlushInProgress = false;
const GOOGLE_ADS_CONVERSIONS: Partial<Record<GaEventName, string>> = {
  generate_lead: process.env.NEXT_PUBLIC_GOOGLE_ADS_FORM_SEND_TO,
  whatsapp_click: process.env.NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_SEND_TO,
  phone_click: process.env.NEXT_PUBLIC_GOOGLE_ADS_PHONE_SEND_TO,
};
// `generate_lead` continua no GA4/Ads após sucesso, mas não é espelhado aqui:
// o endpoint do formulário já persiste o evento canônico `form_submit` com PII
// autorizada. Espelhar os dois criaria dois leads para a mesma solicitação.
const RETIFLOW_DIRECT_EVENTS = new Set<GaEventName>([
  "page_view",
  "whatsapp_click",
  "instagram_click",
  "phone_click",
  "directions_click",
  "cta_click",
  "service_detail_click",
  "form_view",
  "form_start",
  "form_field_complete",
  "form_submit_attempt",
  "form_validation_error",
  "form_abandon",
  "form_submit_error",
  "scroll_depth",
]);
const ADVERTISING_MEASUREMENT_EVENTS = new Set([
  "whatsapp_click",
  "phone_click",
  "generate_lead",
]);
const GOOGLE_SAFE_STRING_PARAMS = new Set([
  "event_category",
  "event_label",
  "link_url",
  "method",
  "service_name",
  "page_location",
  "traffic_source",
  "traffic_conferium",
  "traffic_campaign",
  "traffic_term",
  "gclid",
  "transaction_id",
  "experiment_id",
  "variant_id",
  "component_id",
  "position",
  "page_type",
  "service_id",
  "flow_type",
  "step_id",
  "option_id",
  "field_id",
  "interaction_action",
  "estimate_state",
  "form_name",
  "last_field",
  "validation_reason",
  "abandon_reason",
  "transport_type",
  "field_name",
  "lead_subject",
  "b2b_level",
  "error_type",
]);
const DESTINATION_TYPES = new Set([
  "whatsapp",
  "phone",
  "estimate",
  "service",
  "contact",
  "directions",
  "video",
  "other",
]);
const GOOGLE_SAFE_NUMBER_PARAMS = new Set([
  "percent_scrolled",
  "engaged_seconds",
  "form_elapsed_seconds",
  "fields_completed",
  "completion_percent",
]);
const GOOGLE_QUERY_DERIVED_PARAMS = new Set([
  "traffic_source",
  "traffic_conferium",
  "traffic_campaign",
  "traffic_term",
  "gclid",
]);

type SessionAttribution = {
  originType: "paid" | "organic" | "other";
};

function storageAvailable() {
  try {
    return typeof window !== "undefined" && "localStorage" in window;
  } catch {
    return false;
  }
}

function sessionStorageAvailable() {
  try {
    return typeof window !== "undefined" && "sessionStorage" in window;
  } catch {
    return false;
  }
}

function randomId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

function compactString(value: unknown, max = 180) {
  if (typeof value !== "string") return undefined;
  const compact = value.replace(/[\u0000-\u001F\u007F]+/g, " ").replace(/\s+/g, " ").trim();
  return compact ? compact.slice(0, max) : undefined;
}

function containsHighConfidencePersonalData(value: string) {
  if (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i.test(value)) return true;

  const digits = value.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 14;
}

function privacySafeLinkUrl(value: unknown) {
  const compact = compactString(value, 800);
  if (!compact || typeof window === "undefined") return undefined;

  try {
    const url = new URL(compact, window.location.origin);
    if (url.protocol === "tel:") return undefined;
    if (url.protocol !== "http:" && url.protocol !== "https:") return undefined;
    if (url.hostname === "wa.me" || url.hostname.endsWith(".whatsapp.com")) {
      return undefined;
    }
    return `${url.origin}${url.pathname}`;
  } catch {
    return undefined;
  }
}

function privacySafeGooglePageLocation(value: unknown) {
  const compact = compactString(value, 800);
  if (!compact || typeof window === "undefined") return undefined;

  try {
    const url = new URL(compact, window.location.origin);
    if (url.protocol !== "http:" && url.protocol !== "https:") return undefined;
    return `${url.origin}${url.pathname}`;
  } catch {
    return undefined;
  }
}

type SafeDestination = {
  type?: string;
  path?: string;
};

function relativeDestinationPath(value: unknown) {
  const compact = compactString(value, 240);
  if (!compact) return undefined;

  try {
    const url = new URL(compact, "https://destination.invalid");
    const path = url.pathname.replace(/\/{2,}/g, "/").slice(0, 180);
    return path.startsWith("/") && /^\/[a-z0-9/_-]*$/i.test(path)
      ? path
      : undefined;
  } catch {
    return undefined;
  }
}

function safeDestination(params: MarketingEventParams): SafeDestination {
  const explicitType = compactString(params.destination_type, 32)?.toLowerCase();
  const type = explicitType && DESTINATION_TYPES.has(explicitType)
    ? explicitType
    : undefined;

  if (type === "whatsapp") return { type, path: "/whatsapp" };
  if (type === "phone") return { type, path: "/phone" };
  if (type === "directions") return { type, path: "/directions" };
  if (type === "estimate" && !params.destination_path) {
    return { type, path: "/quanto-custa" };
  }
  if (type === "contact" && !params.destination_path) {
    return { type, path: "/contato" };
  }

  const explicitPath = relativeDestinationPath(params.destination_path);
  if (explicitPath) return { type, path: explicitPath };

  const link = compactString(params.link_url, 800);
  if (!link || typeof window === "undefined") return { type };

  try {
    const url = new URL(link, window.location.origin);
    if (url.protocol === "tel:") return { type: "phone", path: "/phone" };
    if (url.hostname === "wa.me" || url.hostname.endsWith(".whatsapp.com")) {
      return { type: "whatsapp", path: "/whatsapp" };
    }
    if (url.hostname.endsWith("google.com") && url.pathname.startsWith("/maps")) {
      return { type: "directions", path: "/directions" };
    }
    if (url.hostname === "www.instagram.com" || url.hostname === "instagram.com") {
      return { type: "other", path: relativeDestinationPath(url.pathname) };
    }
    const path = relativeDestinationPath(url.pathname);
    const inferredType = url.origin !== window.location.origin
      ? "other"
      : path === "/quanto-custa"
        ? "estimate"
        : path === "/contato"
          ? "contact"
          : path?.startsWith("/servicos/")
            ? "service"
            : "other";
    return {
      type: type ?? inferredType,
      path,
    };
  } catch {
    return { type };
  }
}

/**
 * Contrato central dos parâmetros enviados ao Google. Campos desconhecidos são
 * descartados e URLs perdem query/hash, impedindo que mensagens de WhatsApp,
 * telefone, nome, relato livre ou dados do veículo escapem por `link_url`.
 */
export function sanitizeGoogleEventParams(params: MarketingEventParams) {
  const safe: MarketingEventParams = {};
  const destination = safeDestination(params);
  if (destination.type) safe.destination_type = destination.type;
  if (destination.path) safe.destination_path = destination.path;

  for (const [key, value] of Object.entries(params)) {
    if (key === "destination_type" || key === "destination_path") continue;
    if (key === "page_location") {
      const pageLocation = privacySafeGooglePageLocation(value);
      if (pageLocation) safe.page_location = pageLocation;
      continue;
    }
    if (key === "link_url") {
      const link = privacySafeLinkUrl(value);
      if (link) safe.link_url = link;
      continue;
    }

    if (GOOGLE_SAFE_STRING_PARAMS.has(key)) {
      const compact = compactString(value, key === "gclid" ? 220 : 180);
      if (
        compact &&
        GOOGLE_QUERY_DERIVED_PARAMS.has(key) &&
        containsHighConfidencePersonalData(compact)
      ) {
        continue;
      }
      if (compact) safe[key] = compact;
      continue;
    }

    if (GOOGLE_SAFE_NUMBER_PARAMS.has(key) && typeof value === "number" && Number.isFinite(value)) {
      safe[key] = value;
    }
  }

  return safe;
}

function explicitCity(value: unknown) {
  const compact = compactString(value, 60);
  if (!compact || !/^[\p{L}\s.'-]+$/u.test(compact)) return undefined;
  return compact;
}

function hasExternalEventConsent(eventType: string) {
  return (
    hasAnalyticsConsent() ||
    (hasAdvertisingConsent() && ADVERTISING_MEASUREMENT_EVENTS.has(eventType))
  );
}

export function createMarketingEventId() {
  return randomId();
}

function getOrCreateBrowserId(
  storage: Storage | null,
  key: string,
  prefix: string,
  preferredValue?: string
) {
  const existing = storage?.getItem(key);
  if (existing) return existing;

  const value = preferredValue || `${prefix}-${randomId()}`;
  storage?.setItem(key, value);
  return value;
}

function getOrCreateSessionId(
  storage: Storage | null,
  preferredValue?: string
) {
  if (!storage) {
    return preferredValue || `session-${randomId()}`;
  }

  const now = Date.now();
  const existingId = storage.getItem(SESSION_ID_KEY);

  try {
    const raw = storage.getItem(SESSION_ACTIVITY_KEY);
    const activity = raw
      ? (JSON.parse(raw) as { sessionId?: string; lastActivityAt?: number })
      : null;
    const inactivity = now - (activity?.lastActivityAt ?? Number.NaN);

    if (
      existingId &&
      activity?.sessionId === existingId &&
      Number.isFinite(inactivity) &&
      inactivity >= 0 &&
      inactivity < SESSION_INACTIVITY_TTL_MS
    ) {
      storage.setItem(
        SESSION_ACTIVITY_KEY,
        JSON.stringify({ sessionId: existingId, lastActivityAt: now })
      );
      return existingId;
    }
  } catch {
    // Um registro corrompido é tratado como sessão expirada.
  }

  const nextId = existingId
    ? `session-${randomId()}`
    : preferredValue || `session-${randomId()}`;
  storage.setItem(SESSION_ID_KEY, nextId);
  storage.setItem(
    SESSION_ACTIVITY_KEY,
    JSON.stringify({ sessionId: nextId, lastActivityAt: now })
  );
  storage.removeItem(CONTACT_INTENT_KEY);
  storage.removeItem(REPORTED_EVENTS_KEY);
  storage.removeItem(SESSION_ATTRIBUTION_KEY);
  storage.removeItem("retifica_premium_active_time_ms");

  if (existingId && typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent(MEASUREMENT_SESSION_ROTATED_EVENT, {
        detail: { previousSessionId: existingId, sessionId: nextId },
      })
    );
  }

  return nextId;
}

function leadCode() {
  const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  const suffix = randomId().replaceAll("-", "").slice(0, 8).toUpperCase();
  return `RP-${date}-${suffix}`;
}

/**
 * Código do lead por PESSOA, não por sessão.
 *
 * Antes o código nascia junto com o `ContactIntent`, que vive em
 * `sessionStorage`. Toda rotação de sessão gerava um código novo para a mesma
 * pessoa: em 13/08 um único visitante produziu três códigos em seis minutos, e
 * 30 pessoas viraram 40 leads no painel (1,33x). Como o código também vai no
 * `transaction_id` da conversão, a inflação vazava para o Google Ads.
 *
 * Guardando em `localStorage` — mesmo lugar do `anonymousId` — o código
 * sobrevive à rotação de sessão e à navegação entre abas. A janela de 30 dias
 * evita que um cliente de meses atrás seja contado como o mesmo lead.
 */
function getOrCreateLeadCode(storage: Storage | null): string {
  if (!storage) return leadCode();

  const now = Date.now();
  try {
    const raw = storage.getItem(LEAD_CODE_KEY);
    if (raw) {
      const saved = JSON.parse(raw) as { code?: string; lastUsedAt?: number };
      const idade = now - (saved.lastUsedAt ?? Number.NaN);
      if (
        saved.code &&
        isSupportedLeadCode(saved.code) &&
        Number.isFinite(idade) &&
        idade >= 0 &&
        idade < LEAD_CODE_TTL_MS
      ) {
        storage.setItem(
          LEAD_CODE_KEY,
          JSON.stringify({ code: saved.code, lastUsedAt: now })
        );
        return saved.code;
      }
    }
  } catch {
    // Registro corrompido vale como ausente: emite um código novo.
  }

  const code = leadCode();
  try {
    storage.setItem(LEAD_CODE_KEY, JSON.stringify({ code, lastUsedAt: now }));
  } catch {
    // Sem persistência o código continua válido para esta navegação.
  }
  return code;
}

function isSupportedLeadCode(value: string) {
  return /^RP-(?:\d{8}-[A-Z0-9]{4,16}|\d{4}-\d{2}-[A-Z0-9]{4,16})$/i.test(
    value
  );
}

function createEphemeralContactIntent(): ContactIntent {
  if (anonymousRuntimeIntent) return anonymousRuntimeIntent;

  anonymousRuntimeIntent = {
    eventId: randomId(),
    leadCode: leadCode(),
    anonymousId: "",
    sessionId: `session-anonymous-${randomId()}`,
    createdAt: new Date().toISOString(),
  };
  return anonymousRuntimeIntent;
}

export function getOrCreateContactIntent(): ContactIntent {
  if (typeof window === "undefined" || !hasMeasurementConsent()) {
    return createEphemeralContactIntent();
  }

  const localStorage = storageAvailable() ? window.localStorage : null;
  const sessionStorage = sessionStorageAvailable()
    ? window.sessionStorage
    : null;
  const sessionId = getOrCreateSessionId(
    sessionStorage,
    anonymousRuntimeIntent?.sessionId
  );

  // Resolvido antes do intent de sessão: o código pertence à pessoa e precisa
  // sobreviver à rotação de sessão que antes o recriava.
  const codigoDaPessoa = getOrCreateLeadCode(localStorage);

  try {
    const raw = sessionStorage?.getItem(CONTACT_INTENT_KEY);
    if (raw) {
      const existing = JSON.parse(raw) as ContactIntent;
      if (
        existing.eventId &&
        existing.leadCode &&
        existing.sessionId === sessionId
      ) {
        // Um intent gravado antes desta correção carrega o código antigo, de
        // sessão. O código da pessoa prevalece.
        if (existing.leadCode !== codigoDaPessoa) {
          const corrigido = { ...existing, leadCode: codigoDaPessoa };
          sessionStorage?.setItem(CONTACT_INTENT_KEY, JSON.stringify(corrigido));
          return corrigido;
        }
        return existing;
      }
    }
  } catch {
    sessionStorage?.removeItem(CONTACT_INTENT_KEY);
  }

  const intent: ContactIntent = {
    eventId: randomId(),
    leadCode: codigoDaPessoa,
    anonymousId: getOrCreateBrowserId(
      localStorage,
      ANONYMOUS_ID_KEY,
      "anon"
    ),
    sessionId,
    createdAt: new Date().toISOString(),
  };

  sessionStorage?.setItem(CONTACT_INTENT_KEY, JSON.stringify(intent));
  return intent;
}

function reportedEventKey(eventType: string, eventId: string) {
  return `${eventType}:${eventId}`;
}

function wasReported(eventType: string, eventId: string) {
  if (!hasMeasurementConsent() || !sessionStorageAvailable()) return false;

  try {
    const raw = window.sessionStorage.getItem(REPORTED_EVENTS_KEY);
    const reported = raw ? (JSON.parse(raw) as string[]) : [];
    return reported.includes(reportedEventKey(eventType, eventId));
  } catch {
    return false;
  }
}

function markAsReported(eventType: string, eventId: string) {
  if (!hasMeasurementConsent() || !sessionStorageAvailable()) return;

  try {
    const raw = window.sessionStorage.getItem(REPORTED_EVENTS_KEY);
    const reported = raw ? (JSON.parse(raw) as string[]) : [];
    const key = reportedEventKey(eventType, eventId);
    if (reported.includes(key)) return;

    window.sessionStorage.setItem(
      REPORTED_EVENTS_KEY,
      JSON.stringify([...reported.slice(-49), key])
    );
  } catch {
    // A indisponibilidade do storage não pode afetar o contato.
  }
}

type ExternalMarketingPayload = {
  eventId: string;
  eventType: string;
  [key: string]: unknown;
};

type QueuedExternalMarketingEvent = {
  queuedAt: number;
  payload: ExternalMarketingPayload;
};

type ExternalMarketingDelivery = {
  delivered: boolean;
  retryable: boolean;
};

function readExternalEventOutbox(): QueuedExternalMarketingEvent[] {
  if (!storageAvailable() || !hasMeasurementConsent()) return [];

  try {
    const raw = window.localStorage.getItem(EXTERNAL_EVENT_OUTBOX_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      window.localStorage.removeItem(EXTERNAL_EVENT_OUTBOX_KEY);
      return [];
    }

    const minimumQueuedAt = Date.now() - EXTERNAL_EVENT_OUTBOX_TTL_MS;
    return parsed
      .filter((item): item is QueuedExternalMarketingEvent => {
        if (!item || typeof item !== "object" || Array.isArray(item)) return false;
        const entry = item as Partial<QueuedExternalMarketingEvent>;
        return (
          typeof entry.queuedAt === "number" &&
          entry.queuedAt >= minimumQueuedAt &&
          Boolean(entry.payload) &&
          typeof entry.payload?.eventId === "string" &&
          typeof entry.payload?.eventType === "string"
        );
      })
      .slice(-EXTERNAL_EVENT_OUTBOX_MAX);
  } catch {
    window.localStorage.removeItem(EXTERNAL_EVENT_OUTBOX_KEY);
    return [];
  }
}

function writeExternalEventOutbox(entries: QueuedExternalMarketingEvent[]) {
  if (!storageAvailable()) return;

  try {
    if (!hasMeasurementConsent() || entries.length === 0) {
      window.localStorage.removeItem(EXTERNAL_EVENT_OUTBOX_KEY);
      return;
    }

    window.localStorage.setItem(
      EXTERNAL_EVENT_OUTBOX_KEY,
      JSON.stringify(entries.slice(-EXTERNAL_EVENT_OUTBOX_MAX))
    );
  } catch {
    // A fila é uma proteção complementar; storage cheio não pode bloquear o site.
  }
}

function queueExternalMarketingEvent(payload: ExternalMarketingPayload) {
  if (!hasExternalEventConsent(payload.eventType)) return;

  const consentSafePayload = consentSafeExternalMarketingPayload(payload);
  const entries = readExternalEventOutbox();
  if (
    entries.some(
      (entry) => entry.payload.eventId === consentSafePayload.eventId
    )
  ) {
    return;
  }

  writeExternalEventOutbox([
    ...entries,
    { queuedAt: Date.now(), payload: consentSafePayload },
  ]);
}

function consentSafeExternalMarketingPayload(
  payload: ExternalMarketingPayload
): ExternalMarketingPayload {
  const safePayload = { ...payload };

  if (!hasAnalyticsConsent()) {
    delete safePayload.city;
    delete safePayload.visitorCity;
    const metadata = safePayload.metadata;
    if (metadata && typeof metadata === "object" && !Array.isArray(metadata)) {
      const safeMetadata = { ...(metadata as Record<string, unknown>) };
      delete safeMetadata.visitorCity;
      safePayload.metadata = safeMetadata;
    }
  }

  if (!hasAdvertisingConsent()) {
    delete safePayload.gclid;
    delete safePayload.gbraid;
    delete safePayload.wbraid;
  }

  return safePayload;
}

async function deliverExternalMarketingEvent(
  payload: ExternalMarketingPayload
): Promise<ExternalMarketingDelivery> {
  try {
    const consentSafePayload = consentSafeExternalMarketingPayload(payload);
    const response = await fetch("/api/marketing/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(consentSafePayload),
      keepalive: true,
    });
    const result = (await response.json().catch(() => null)) as {
      ok?: boolean;
      storageSaved?: boolean;
      storage?: { saved?: boolean };
    } | null;
    const storageSaved =
      result?.storageSaved === true || result?.storage?.saved === true;

    if (response.ok && result?.ok === true && storageSaved) {
      return { delivered: true, retryable: false };
    }

    const retryable =
      response.status === 408 ||
      response.status === 429 ||
      response.status >= 500 ||
      (response.ok && !storageSaved);
    return { delivered: false, retryable };
  } catch {
    return { delivered: false, retryable: true };
  }
}

/**
 * Reenvia o payload técnico consentido sem nome, telefone, e-mail ou relato
 * livre. Ele ainda pode conter cidade voluntária e identificadores de
 * atribuição; por isso a fila é limitada a 40 itens/24h e apagada com o
 * consentimento.
 */
export async function flushExternalMarketingEventOutbox() {
  if (
    externalEventOutboxFlushInProgress ||
    typeof window === "undefined" ||
    !isConsentRuntimeReady() ||
    !canSendTrackingRequests()
  ) {
    return;
  }

  const snapshot = readExternalEventOutbox();
  if (snapshot.length === 0) return;

  externalEventOutboxFlushInProgress = true;
  const snapshotIds = new Set(snapshot.map((entry) => entry.payload.eventId));
  const remaining: QueuedExternalMarketingEvent[] = [];
  let deliveryBlocked = false;

  try {
    for (const entry of snapshot) {
      if (!hasExternalEventConsent(entry.payload.eventType)) continue;
      if (deliveryBlocked) {
        remaining.push(entry);
        continue;
      }

      const delivery = await deliverExternalMarketingEvent(entry.payload);
      if (delivery.delivered) {
        markAsReported(entry.payload.eventType, entry.payload.eventId);
        continue;
      }
      if (delivery.retryable) {
        remaining.push(entry);
        deliveryBlocked = true;
      }
    }
  } finally {
    const addedDuringFlush = readExternalEventOutbox().filter(
      (entry) => !snapshotIds.has(entry.payload.eventId)
    );
    writeExternalEventOutbox([...remaining, ...addedDuringFlush]);
    externalEventOutboxFlushInProgress = false;
  }
}

function storeSessionAttribution(attribution: SessionAttribution, replace = false) {
  if (!sessionStorageAvailable()) return;
  try {
    if (!replace && window.sessionStorage.getItem(SESSION_ATTRIBUTION_KEY)) return;
    window.sessionStorage.setItem(SESSION_ATTRIBUTION_KEY, JSON.stringify(attribution));
  } catch {
    // A origem da sessão também pode ser inferida no backend quando necessário.
  }
}

function getSessionAttribution(): SessionAttribution | null {
  if (!sessionStorageAvailable()) return null;
  try {
    const raw = window.sessionStorage.getItem(SESSION_ATTRIBUTION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<SessionAttribution>;
    return ["paid", "organic", "other"].includes(parsed.originType ?? "")
      ? parsed as SessionAttribution
      : null;
  } catch {
    return null;
  }
}

function deviceType() {
  if (typeof window === "undefined") return "unknown";
  if (window.matchMedia("(max-width: 767px)").matches) return "mobile";
  if (window.matchMedia("(max-width: 1024px)").matches) return "tablet";
  return "desktop";
}

function safeReferrerOrigin() {
  if (typeof document === "undefined" || !document.referrer) return undefined;
  try {
    return new URL(document.referrer).origin;
  } catch {
    return undefined;
  }
}

function captureRuntimeAttribution() {
  if (typeof window === "undefined") return null;

  const params = new URLSearchParams(window.location.search);
  const hasTrackedParam = [
    "utm_source",
    "utm_conferium",
    "gclid",
    "gbraid",
    "wbraid",
  ].some((key) => params.has(key));
  if (runtimeAttribution && !hasTrackedParam) return runtimeAttribution;

  const classified = classifyTrafficAttribution({
    source: params.get("utm_source") || undefined,
    conferium: params.get("utm_conferium") || undefined,
    referrer: safeReferrerOrigin(),
    hasGoogleClickId: Boolean(
      params.get("gclid") || params.get("gbraid") || params.get("wbraid")
    ),
  });
  const capturedAt = new Date();
  runtimeAttribution = {
    source: classified.source,
    conferium: classified.conferium,
    originType: classified.originType,
    landingPage: `${window.location.origin}${window.location.pathname}`,
    referrer: safeReferrerOrigin(),
    capturedAt: capturedAt.toISOString(),
    expiresAt: new Date(capturedAt.getTime() + CONTACT_INTENT_TTL_MS).toISOString(),
  };
  return runtimeAttribution;
}

function effectiveEventAttribution() {
  return getStoredAttribution() ?? captureRuntimeAttribution();
}

export function sendExternalMarketingEvent(
  eventType: string,
  params: MarketingEventParams = {},
  contactIntent?: ContactIntent
) {
  if (
    typeof window === "undefined" ||
    !isConsentRuntimeReady() ||
    !hasExternalEventConsent(eventType) ||
    !canSendTrackingRequests()
  ) {
    return;
  }

  const baseIntent = contactIntent ?? getOrCreateContactIntent();
  // Cada ocorrência precisa de ID próprio para a jornada mostrar todos os
  // cliques. O `leadCode` continua estável e deduplica somente a conversão e o
  // alerta comercial, não a telemetria da sessão.
  const intent = { ...baseIntent, eventId: createMarketingEventId() };
  const pendingKey = reportedEventKey(eventType, intent.eventId);
  if (wasReported(eventType, intent.eventId) || pendingEvents.has(pendingKey)) {
    return;
  }
  pendingEvents.add(pendingKey);

  const attribution = effectiveEventAttribution();
  const analyticsConsented = hasAnalyticsConsent();
  const advertisingConsented = hasAdvertisingConsent();
  const sessionOriginType = getSessionAttribution()?.originType
    ?? runtimeAttribution?.originType;
  const destination = safeDestination(params);
  const suppliedLeadCode = compactString(params.transaction_id, 40);
  const eventLeadCode =
    suppliedLeadCode && isSupportedLeadCode(suppliedLeadCode)
      ? suppliedLeadCode
      : intent.leadCode;
  const payload: ExternalMarketingPayload = {
    eventId: intent.eventId,
    // No quiz, o código exibido no WhatsApp precisa ser o mesmo pesquisável
    // no Retiflow. Fora dele, preservamos o código estável da intenção.
    leadCode: eventLeadCode,
    anonymousId: intent.anonymousId,
    sessionId: intent.sessionId,
    eventType,
    channel:
      eventType === "whatsapp_click"
        ? "site_whatsapp"
        : eventType === "phone_click"
          ? "site_phone"
          : "site",
    occurredAt: new Date().toISOString(),
    pagePath: window.location.pathname,
    pageLocation: privacySafePageLocation(),
    pageTitle: document.title,
    referrer: attribution?.referrer,
    source: attribution?.source,
    conferium: attribution?.conferium,
    campaign: attribution?.campaign,
    term: attribution?.term,
    content: attribution?.content,
    gclid: attribution?.gclid,
    gbraid: attribution?.gbraid,
    wbraid: attribution?.wbraid,
    deviceType: deviceType(),
    metadata: {
      eventLabel: params.event_label,
      method: params.method,
      formName: params.form_name,
      lastField: params.last_field,
      validationReason: params.validation_reason,
      elapsedSeconds: params.form_elapsed_seconds,
      fieldsCompleted: params.fields_completed,
      completionPercent: params.completion_percent,
      engagedSeconds: params.engaged_seconds,
      percentScrolled: params.percent_scrolled,
      experimentId: params.experiment_id,
      variantId: params.variant_id,
      componentId: params.component_id,
      position: params.position,
      pageType: params.page_type,
      serviceId: params.service_id,
      flowType: params.flow_type,
      stepId: params.step_id,
      optionId: params.option_id,
      fieldId: params.field_id,
      interactionAction: params.interaction_action,
      estimateState: params.estimate_state,
      destinationType: destination.type,
      destinationPath: destination.path,
      visitorCity: analyticsConsented
        ? explicitCity(params.visitor_city)
        : undefined,
      sessionOriginType,
      siteHostname: currentTrackingHostname(),
      environment: currentTrackingEnvironment(),
      measurementMode:
        analyticsConsented && advertisingConsented
          ? "analytics_and_advertising"
          : analyticsConsented
            ? "analytics"
            : "advertising",
      eventContractVersion: "site-events-v2",
    },
  };

  void flushExternalMarketingEventOutbox();
  void deliverExternalMarketingEvent(payload)
    .then((delivery) => {
      if (delivery.delivered) {
        markAsReported(eventType, intent.eventId);
        return;
      }
      if (delivery.retryable) {
        queueExternalMarketingEvent(payload);
      }
    })
    .finally(() => pendingEvents.delete(pendingKey));
}

export function captureTrafficAttribution() {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const trackedKeys = [
    "utm_source",
    "utm_conferium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "gclid",
    "gbraid",
    "wbraid",
  ];
  const hasTrackedParam = trackedKeys.some((key) => params.has(key));
  const anonymousAttribution = captureRuntimeAttribution();
  if (!storageAvailable() || !hasMeasurementConsent()) return;

  const existing = getStoredAttribution();
  const classifiedAttribution = classifyTrafficAttribution({
    source: params.get("utm_source") || undefined,
    conferium: params.get("utm_conferium") || undefined,
    referrer: document.referrer || undefined,
    hasGoogleClickId: Boolean(
      params.get("gclid") || params.get("gbraid") || params.get("wbraid")
    ),
  });
  storeSessionAttribution(
    { originType: anonymousAttribution?.originType ?? classifiedAttribution.originType },
    hasTrackedParam
  );

  if (!hasTrackedParam && !classifiedAttribution.aiEngine && existing) return;

  const advertisingConsent = hasAdvertisingConsent();
  const capturedAt = new Date();
  const attribution: StoredAttribution = {
    source: hasTrackedParam
      ? classifiedAttribution.source
      : anonymousAttribution?.source,
    conferium: hasTrackedParam
      ? classifiedAttribution.conferium
      : anonymousAttribution?.conferium,
    campaign: params.get("utm_campaign") || undefined,
    term: params.get("utm_term") || undefined,
    content: params.get("utm_content") || undefined,
    gclid: advertisingConsent ? params.get("gclid") || undefined : undefined,
    gbraid: advertisingConsent ? params.get("gbraid") || undefined : undefined,
    wbraid: advertisingConsent ? params.get("wbraid") || undefined : undefined,
    landingPage: anonymousAttribution?.landingPage ?? privacySafePageLocation(),
    referrer: safeReferrerOrigin() || anonymousAttribution?.referrer,
    capturedAt: capturedAt.toISOString(),
    expiresAt: new Date(capturedAt.getTime() + ATTRIBUTION_TTL_MS).toISOString(),
  };

  window.localStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attribution));
}

export function getStoredAttribution(): StoredAttribution | null {
  if (
    typeof window === "undefined" ||
    !storageAvailable() ||
    !hasMeasurementConsent()
  ) {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(ATTRIBUTION_KEY);
    if (!raw) return null;

    const attribution = JSON.parse(raw) as Partial<StoredAttribution>;
    const expiresAt = new Date(attribution.expiresAt ?? "").getTime();
    if (
      typeof attribution.landingPage !== "string" ||
      typeof attribution.capturedAt !== "string" ||
      !Number.isFinite(expiresAt) ||
      expiresAt <= Date.now()
    ) {
      window.localStorage.removeItem(ATTRIBUTION_KEY);
      return null;
    }

    const stored: StoredAttribution = {
      ...attribution,
      landingPage: attribution.landingPage,
      capturedAt: attribution.capturedAt,
      expiresAt: attribution.expiresAt as string,
    };

    if (!hasAdvertisingConsent()) {
      delete stored.gclid;
      delete stored.gbraid;
      delete stored.wbraid;
    }

    return stored;
  } catch {
    window.localStorage.removeItem(ATTRIBUTION_KEY);
    return null;
  }
}

export function attributionEventParams(): MarketingEventParams {
  const attribution = getStoredAttribution();

  if (!attribution) return {};

  return {
    traffic_source: attribution.source,
    traffic_conferium: attribution.conferium,
    traffic_campaign: attribution.campaign,
    traffic_term: attribution.term,
    gclid: attribution.gclid || attribution.gbraid || attribution.wbraid,
  };
}

export function attributionMessageLines() {
  const attribution = getStoredAttribution();

  if (!attribution) return [];

  return [
    "",
    "Origem do contato:",
    attribution.source ? `Fonte: ${attribution.source}` : "",
    attribution.conferium ? `Mídia: ${attribution.conferium}` : "",
    attribution.campaign ? `Campanha: ${attribution.campaign}` : "",
    attribution.term ? `Termo: ${attribution.term}` : "",
    attribution.content ? `Conteúdo: ${attribution.content}` : "",
    attribution.gclid ? `GCLID: ${attribution.gclid}` : "",
    attribution.gbraid ? `GBRAID: ${attribution.gbraid}` : "",
    attribution.wbraid ? `WBRAID: ${attribution.wbraid}` : "",
    attribution.referrer ? `Referência: ${attribution.referrer}` : "",
    `Página de entrada: ${attribution.landingPage}`,
  ].filter(Boolean);
}

/**
 * Monta a URL do WhatsApp com a mensagem que a pessoa vai enviar.
 *
 * A mensagem sai LIMPA por padrão. Antes ela vinha com um bloco de rastreamento
 * colado embaixo do texto — código do contato, fonte, mídia, campanha, termo,
 * GCLID e página de entrada. Quem abria o WhatsApp via aquilo no campo de
 * digitação e apagava, ou desistia de enviar. É atrito no único ponto da
 * jornada em que a pessoa já decidiu falar com a gente.
 *
 * Nada de conferência se perde com isso: o `leadCode` e a atribuição completa
 * seguem no evento (`trackEngagementEvent` → `attributionEventParams` e
 * `intent.leadCode`), que é o caminho certo para dado de rastreamento. O
 * `transaction_id` da conversão continua usando o mesmo código, então a
 * deduplicação também não muda.
 *
 * `incluirRastreioNaMensagem` existe para quem precisar do comportamento
 * antigo em algum canal específico, mas o padrão é não usar.
 */
export function buildWhatsAppUrlWithAttribution(
  phoneNumber: string,
  baseText: string,
  options: { incluirRastreioNaMensagem?: boolean } = {}
) {
  if (
    typeof window === "undefined"
    || !hasMeasurementConsent()
    || !options.incluirRastreioNaMensagem
  ) {
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(baseText)}`;
  }

  const intent = getOrCreateContactIntent();
  const text = [
    ...baseText.split("\n"),
    "",
    `Código do contato: ${intent.leadCode}`,
    ...attributionMessageLines(),
  ].join("\n");

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
}

export function trackMarketingEvent(
  eventName: GaEventName,
  params: MarketingEventParams = {}
) {
  if (
    typeof window === "undefined" ||
    !isConsentRuntimeReady() ||
    !hasMeasurementConsent()
  ) {
    return;
  }

  const trackingWindow = window as TrackingWindow;
  const eventParams = sanitizeGoogleEventParams({
    ...attributionEventParams(),
    ...params,
    page_location: privacySafePageLocation(),
  });

  if (
    hasAnalyticsConsent() &&
    typeof trackingWindow.gtag === "function"
  ) {
    trackingWindow.gtag("event", eventName, eventParams);
  } else if (
    hasAnalyticsConsent() &&
    Array.isArray(trackingWindow.dataLayer)
  ) {
    trackingWindow.dataLayer.push({
      event: eventName,
      ...eventParams,
    });
  }

  const conversionSendTo = GOOGLE_ADS_CONVERSIONS[eventName];
  if (
    hasAdvertisingConsent() &&
    conversionSendTo &&
    typeof trackingWindow.gtag === "function"
  ) {
    const suppliedTransactionId = compactString(params.transaction_id, 80);
    const transactionId =
      suppliedTransactionId && isSupportedLeadCode(suppliedTransactionId)
        ? suppliedTransactionId
        : getOrCreateContactIntent().leadCode;

    trackingWindow.gtag("event", "conversion", {
      send_to: conversionSendTo,
      value: 1,
      currency: "BRL",
      transaction_id: transactionId,
    });
  }

  if (RETIFLOW_DIRECT_EVENTS.has(eventName)) {
    sendExternalMarketingEvent(eventName, params);
  }
}

export type FunnelEventName = Extract<
  GaEventName,
  | "engagement_5s"
  | "engagement_10s"
  | "cta_impression"
  | "cta_click"
  | "quiz_start"
  | "quiz_flow_selected"
  | "quiz_option_selected"
  | "quiz_field_interaction"
  | "quiz_step_view"
  | "quiz_step_complete"
  | "quiz_continue_blocked"
  | "quiz_unknown_selected"
  | "quiz_back"
  | "quiz_reset"
  | "quiz_file_intent"
  | "quiz_result_view"
  | "quiz_estimate_state"
  | "quiz_qualified_intent"
  | "quiz_out_of_scope"
  | "quiz_whatsapp_prepared"
  | "quiz_whatsapp_click"
>;

/**
 * Evento de funil com nome estável no GA4 e espelho não-PII no Retiflow.
 * O helper respeita a escolha de consentimento e nunca recebe texto livre.
 */
export function trackFunnelEvent(
  eventName: FunnelEventName,
  params: MarketingEventParams = {}
) {
  if (typeof window === "undefined" || !hasMeasurementConsent()) return;

  trackMarketingEvent(eventName, {
    event_category: "engagement",
    event_label: eventName,
    ...params,
  });
  if (!RETIFLOW_DIRECT_EVENTS.has(eventName)) {
    sendExternalMarketingEvent("custom", {
      event_category: "engagement",
      event_label: eventName,
      ...params,
    });
  }
}

export function trackEngagementEvent(
  clarityEventName: ClarityEventName,
  gaEventName: GaEventName,
  gaEventLabel: string,
  params: MarketingEventParams = {}
) {
  if (typeof window === "undefined") return;

  const trackingWindow = window as TrackingWindow;

  if (hasAnalyticsConsent() && typeof trackingWindow.clarity === "function") {
    trackingWindow.clarity("event", clarityEventName);
  }

  trackMarketingEvent(gaEventName, {
    event_category: "engagement",
    event_label: gaEventLabel,
    ...params,
  });
}
