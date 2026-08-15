export type QuizFlow = "vehicle_known" | "problem_unknown";
export type CustomerProfile = "owner" | "workshop" | "company" | "fleet";
export type VehicleSituation =
  | "running"
  | "stopped"
  | "engine_disassembled"
  | "head_removed"
  | "mechanic_assessed";
export type FuelType =
  | "gasoline"
  | "flex"
  | "diesel"
  | "gnv"
  | "other"
  | "unknown";
export type Urgency = "urgent" | "this_week" | "researching" | "no_deadline";
/**
 * A Retífica Premium trabalha o CABEÇOTE, não o motor completo. Quem chega
 * querendo bloco, virabrequim ou motor inteiro não é atendível — e hoje esse
 * lead consome mídia e atendimento até alguém descobrir isso no WhatsApp.
 * Perguntar antes é mais honesto com os dois lados.
 */
export type ServiceScope = "head_only" | "full_engine" | "unknown";
export type ContactPreference = "whatsapp" | "phone" | "take_part";
export type QuizStepId =
  | "requester"
  | "vehicle"
  | "situation"
  | "symptoms"
  | "known_information"
  | "contact"
  | "result";

export const quizStepOrders: Record<QuizFlow, readonly QuizStepId[]> = {
  vehicle_known: [
    "requester",
    "vehicle",
    "situation",
    "symptoms",
    "known_information",
    "contact",
    "result",
  ],
  problem_unknown: [
    "symptoms",
    "situation",
    "known_information",
    "requester",
    "vehicle",
    "contact",
    "result",
  ],
};

export const quizStepTitles: Record<QuizStepId, string> = {
  requester: "Quem está solicitando?",
  vehicle: "Qual é o veículo?",
  situation: "Como o veículo ou a peça está agora?",
  symptoms: "Quais sinais você percebeu?",
  known_information: "O que já foi indicado?",
  contact: "Onde e para quando você precisa?",
  result: "Pronto, é isso que a gente viu",
};

export type QuizAnswers = {
  flow: QuizFlow | null;
  profile: CustomerProfile | null;
  vehicle: {
    make: string;
    model: string;
    year: string;
    engine: string;
    fuel: FuelType | null;
    engineCode: string;
    unknown: boolean;
  };
  situation: VehicleSituation | null;
  mechanicAssessment: string;
  symptoms: string[];
  otherSymptom: string;
  knownDiagnosis: string | null;
  diagnosisText: string;
  desiredService: string;
  hasFiles: boolean | null;
  city: string;
  urgency: Urgency | null;
  scope: ServiceScope | null;
  contactPreference: ContactPreference | null;
  approximateQuantity: string;
  partAvailability: string;
  serviceContextId: string;
  serviceContextLabel: string;
};

export type EstimateResult = {
  state: "evaluation_required";
  understood: string[];
  related: string[];
  checks: string[];
  pending: string[];
  services: string[];
  inclusions: string[];
  exclusions: string[];
  valueFactors: string[];
  nextStep: string;
  safetyWarning: boolean;
  outOfScope: boolean;
};

export const initialQuizAnswers: QuizAnswers = {
  flow: null,
  profile: null,
  vehicle: {
    make: "",
    model: "",
    year: "",
    engine: "",
    fuel: null,
    engineCode: "",
    unknown: false,
  },
  situation: null,
  mechanicAssessment: "",
  symptoms: [],
  otherSymptom: "",
  knownDiagnosis: null,
  diagnosisText: "",
  desiredService: "",
  hasFiles: null,
  city: "",
  urgency: null,
  scope: null,
  contactPreference: null,
  approximateQuantity: "",
  partAvailability: "",
  serviceContextId: "",
  serviceContextLabel: "",
};

export const profileLabels: Record<CustomerProfile, string> = {
  owner: "Proprietário do veículo",
  workshop: "Mecânico ou oficina",
  company: "Empresa",
  fleet: "Frotista",
};

export const situationLabels: Record<VehicleSituation, string> = {
  running: "Veículo funcionando",
  stopped: "Veículo parado",
  engine_disassembled: "Motor desmontado",
  head_removed: "Cabeçote já removido",
  mechanic_assessed: "Cabeçote já avaliado por mecânico",
};

export const fuelLabels: Record<FuelType, string> = {
  gasoline: "Gasolina",
  flex: "Etanol/flex",
  diesel: "Diesel",
  gnv: "GNV",
  other: "Outro",
  unknown: "Não sei",
};

export const urgencyLabels: Record<Urgency, string> = {
  urgent: "Urgente",
  this_week: "Nesta semana",
  researching: "Estou pesquisando",
  no_deadline: "Sem prazo",
};

export const scopeLabels: Record<ServiceScope, string> = {
  head_only: "Só o cabeçote",
  full_engine: "Motor completo",
  unknown: "Não sei ainda",
};

export const contactPreferenceLabels: Record<ContactPreference, string> = {
  whatsapp: "WhatsApp",
  phone: "Telefone",
  take_part: "Levar a peça",
};

export const symptomOptions = [
  ["overheating", "Superaquecimento"],
  ["water_loss", "Baixa de água"],
  ["oil_water_mix", "Óleo e água misturados"],
  ["white_smoke", "Fumaça branca"],
  ["blue_smoke", "Fumaça azul"],
  ["power_loss", "Perda de potência"],
  ["misfires", "Falhas"],
  ["reservoir_pressure", "Pressão no reservatório"],
  ["head_gasket", "Suspeita de junta queimada"],
  ["noise", "Barulho"],
  ["returned_problem", "Problema voltou após reparo"],
  ["other", "Outro"],
  ["unknown", "Não sei"],
] as const;

export const diagnosisOptions = [
  ["none", "Não"],
  ["complete_rebuild", "Retífica completa"],
  ["surfacing", "Plaina"],
  ["head_gasket", "Junta queimada"],
  ["crack_weld", "Trinca ou solda"],
  ["valves_guides", "Sedes, válvulas ou guias"],
  ["assembly", "Montagem"],
  ["base_troca", "Quero cabeçote à base de troca"],
  ["other", "Outro"],
] as const;

const serviceContexts: Record<string, string> = {
  "retifica-de-cabecote": "Retífica de cabeçote",
  "retifica-de-sedes-e-valvulas": "Retífica de sedes e válvulas",
  "plaina-de-cabecote": "Plaina de cabeçote",
  "banho-quimico": "Limpeza química",
  "limpeza-quimica": "Limpeza química",
  "troca-e-adaptacao-de-guias": "Troca e adaptação de guias",
  "esmerilhamento-de-valvulas": "Esmerilhamento de válvulas",
  "usinagem-de-roscas": "Usinagem de roscas",
  "teste-de-trinca": "Inspeção e teste de trinca",
  "solda-de-trincas": "Solda de trincas",
  "montagem-de-cabecote": "Montagem e regulagem final",
  "montagem-e-regulagem-final": "Montagem e regulagem final",
  "diagnostico-tecnico-de-motor": "Diagnóstico técnico de motor",
};

const canonicalServiceContextIds: Record<string, string> = {
  "banho-quimico": "limpeza-quimica",
  "teste-de-trinca": "solda-de-trincas",
  "montagem-de-cabecote": "montagem-e-regulagem-final",
};

export function getServiceContext(value: string | null) {
  if (!value) return null;
  const requestedId = value.trim().toLowerCase();
  const label = serviceContexts[requestedId];
  const id = canonicalServiceContextIds[requestedId] ?? requestedId;
  return label ? { id, label } : null;
}

const symptomLabel = new Map<string, string>(symptomOptions);
const diagnosisLabel = new Map<string, string>(diagnosisOptions);
const seriousSymptoms = new Set([
  "overheating",
  "oil_water_mix",
  "reservoir_pressure",
  "returned_problem",
]);

type SymptomRule = {
  related: string[];
  checks: string[];
  services: string[];
};

const symptomRules: Record<string, SymptomRule> = {
  overheating: {
    related: [
      "alteração de vedação, empeno ou uma causa no sistema de arrefecimento",
    ],
    checks: [
      "medir face e altura do cabeçote",
      "verificar estanqueidade e separar causas externas ao cabeçote",
    ],
    services: ["Retífica de cabeçote", "Plaina de cabeçote", "Limpeza química"],
  },
  water_loss: {
    related: [
      "vazamento externo, vedação da junta ou passagem interna que precisa ser localizada",
    ],
    checks: ["testar estanqueidade e conferir galerias de água e face de vedação"],
    services: ["Retífica de cabeçote", "Inspeção e teste de trinca"],
  },
  oil_water_mix: {
    related: [
      "comunicação entre passagens, vedação da junta ou outra origem no motor",
    ],
    checks: [
      "limpar a peça, testar trincas e conferir canais de óleo e água",
      "separar outras fontes possíveis de contaminação",
    ],
    services: ["Limpeza química", "Inspeção e teste de trinca", "Retífica de cabeçote"],
  },
  white_smoke: {
    related: [
      "entrada de líquido na combustão, condição de funcionamento ou outra causa ainda não confirmada",
    ],
    checks: ["verificar vedação, estanqueidade e sinais de passagem de líquido"],
    services: ["Retífica de cabeçote", "Inspeção e teste de trinca"],
  },
  blue_smoke: {
    related: [
      "folga em guias, retentores, sedes ou válvulas",
      "consumo de óleo na parte inferior do motor, que precisa ser separado do cabeçote",
    ],
    checks: ["conferir folga das guias, vedação das válvulas e origem do consumo de óleo"],
    services: ["Troca e adaptação de guias", "Retífica de sedes e válvulas"],
  },
  power_loss: {
    related: [
      "perda de vedação ou compressão, sincronismo ou outra causa fora do cabeçote",
    ],
    checks: ["testar vedação de sedes e válvulas e confirmar a origem da perda de desempenho"],
    services: ["Retífica de sedes e válvulas", "Esmerilhamento de válvulas"],
  },
  misfires: {
    related: [
      "vedação de válvulas, compressão, ignição ou alimentação",
    ],
    checks: ["comparar compressão e vedação antes de indicar usinagem"],
    services: ["Retífica de sedes e válvulas", "Diagnóstico técnico de motor"],
  },
  reservoir_pressure: {
    related: [
      "gases no sistema, superaquecimento ou falha de circulação ainda não localizada",
    ],
    checks: ["testar estanqueidade, face e passagens do cabeçote junto ao sistema de arrefecimento"],
    services: ["Inspeção e teste de trinca", "Plaina de cabeçote", "Retífica de cabeçote"],
  },
  head_gasket: {
    related: [
      "vedação da junta, empeno ou a causa que levou ao superaquecimento",
    ],
    checks: ["medir face e altura e investigar por que a vedação foi comprometida"],
    services: ["Retífica de cabeçote", "Plaina de cabeçote"],
  },
  noise: {
    related: [
      "folgas, regulagem, montagem ou outra origem que deve ser identificada antes de usinar",
    ],
    checks: ["conferir componentes, folgas e regulagem do conjunto"],
    services: ["Montagem e regulagem final", "Diagnóstico técnico de motor"],
  },
  returned_problem: {
    related: [
      "limite dimensional, causa original não eliminada, montagem ou componente associado",
    ],
    checks: [
      "revisar o serviço anterior, repetir conferências e conferir o sistema que causou a falha",
    ],
    services: ["Diagnóstico técnico de motor", "Retífica de cabeçote", "Inspeção e teste de trinca"],
  },
  other: {
    related: ["mais de uma causa possível, conforme o relato e o estado da peça"],
    checks: ["interpretar o relato e definir a conferência inicial mais segura"],
    services: ["Diagnóstico técnico de motor"],
  },
  unknown: {
    related: ["uma condição que precisa de uma olhada na peça antes de falar em serviço"],
    checks: ["começar por identificação, inspeção visual e conferências básicas"],
    services: ["Diagnóstico técnico de motor"],
  },
};

function addUnique(target: string[], ...values: string[]) {
  for (const value of values) {
    if (value && !target.includes(value)) target.push(value);
  }
}

export function buildEstimateResult(answers: QuizAnswers): EstimateResult {
  const related: string[] = [];
  const checks: string[] = [];
  const services: string[] = [];
  const pending: string[] = [];

  for (const symptom of answers.symptoms) {
    const rule = symptomRules[symptom];
    if (!rule) continue;
    addUnique(related, ...rule.related);
    addUnique(checks, ...rule.checks);
    addUnique(services, ...rule.services);
  }

  const knownServiceMap: Record<string, string[]> = {
    complete_rebuild: ["Retífica de cabeçote"],
    surfacing: ["Plaina de cabeçote"],
    head_gasket: ["Retífica de cabeçote", "Plaina de cabeçote"],
    crack_weld: ["Solda de trincas"],
    valves_guides: ["Retífica de sedes e válvulas", "Troca e adaptação de guias"],
    assembly: ["Montagem e regulagem final"],
  };
  addUnique(services, ...(knownServiceMap[answers.knownDiagnosis ?? ""] ?? []));
  if (answers.serviceContextLabel) addUnique(services, answers.serviceContextLabel);

  if (services.length === 0) {
    addUnique(services, "Diagnóstico técnico de motor", "Retífica de cabeçote");
  }
  if (checks.length === 0) {
    addUnique(checks, "limpar a peça e medir empeno, vedação, guias, sedes, válvulas e trincas");
  }
  if (related.length === 0) {
    addUnique(related, "mais de uma causa possível; o sintoma sozinho não confirma o serviço");
  }

  if (answers.vehicle.unknown) addUnique(pending, "identificar veículo, motor ou família compatível");
  if (!answers.vehicle.engine.trim()) addUnique(pending, "confirmar a motorização");
  if (!answers.vehicle.engineCode.trim()) addUnique(pending, "confirmar o código do motor, se estiver disponível");
  if (answers.situation !== "head_removed" && answers.situation !== "engine_disassembled") {
    addUnique(pending, "inspecionar o cabeçote após a remoção");
  }
  addUnique(pending, "medir a peça e separar serviços, peças e materiais necessários");

  const vehicleDescription = answers.vehicle.unknown
    ? "Veículo e motor ainda não informados"
    : [answers.vehicle.make, answers.vehicle.model, answers.vehicle.year]
        .filter(Boolean)
        .join(" ") || "Veículo parcialmente informado";
  const symptoms = answers.symptoms
    .map((item) => symptomLabel.get(item) ?? item)
    .filter(Boolean);

  return {
    state: "evaluation_required",
    understood: [
      `${profileLabels[answers.profile ?? "owner"]}: ${vehicleDescription}.`,
      `Situação atual: ${answers.situation ? situationLabels[answers.situation] : "não informada"}.`,
      `Sinais relatados: ${symptoms.length ? symptoms.join(", ") : "não informados"}.`,
      ...(answers.serviceContextLabel
        ? [`Contexto de entrada: ${answers.serviceContextLabel}.`]
        : []),
      ...(answers.mechanicAssessment.trim()
        ? ["A orientação recebida do mecânico foi registrada no resumo."]
        : []),
    ],
    related,
    checks,
    pending,
    services,
    inclusions: [
      "resumo do que você contou e do que costuma estar por trás",
      "resumo do caso para continuar no canal escolhido",
    ],
    exclusions: [
      "diagnóstico mecânico confirmado sem inspecionar a peça",
      "peças, materiais, frete e serviços que ainda não foram medidos",
    ],
    valueFactors: [
      "modelo e família do motor",
      "empeno, trinca e material removido anteriormente",
      "estado de sedes, válvulas, guias, roscas e componentes",
      "peças, solda, montagem, urgência e logística necessárias",
    ],
    nextStep: answers.scope === "full_engine"
      ? "A Retífica Premium trabalha o cabeçote, não o motor completo. Se o seu caso incluir bloco, virabrequim ou motor inteiro, a parte do cabeçote a gente resolve — e vale falar com a equipe para entender o que dá para separar antes de procurar uma retífica de motores."
      : answers.contactPreference === "phone"
        ? "Ligue para a Retífica Premium e informe o código das perguntas. Deixe esta tela aberta para consultar."
        : answers.contactPreference === "take_part"
          ? "Abra a rota da Retífica Premium e leve o código das perguntas junto com a peça ou as informações que tiver."
          : "Envie este resumo pelo WhatsApp. A equipe confirma o que precisa ser avaliado e orienta como levar ou enviar a peça.",
    safetyWarning:
      answers.situation === "running" &&
      answers.symptoms.some((item) => seriousSymptoms.has(item)),
    outOfScope: answers.scope === "full_engine",
  };
}

export type IntentLevel = "high" | "conferium" | "low";

export type IntentAssessment = {
  level: IntentLevel;
  score: number;
  signals: string[];
};

/**
 * Classifica a intenção a partir do que a pessoa já respondeu.
 *
 * Não é filtro nem barreira: ninguém é impedido de continuar. Serve para
 * medir separadamente "quem clicou" de "quem tinha um serviço real para
 * pedir", que é a distinção que hoje não existe no funil — todo clique de
 * WhatsApp conta igual, seja de quem está com o carro parado ou de quem só
 * queria saber o preço médio.
 *
 * Os pesos vêm do que caracteriza um serviço concreto na retífica:
 * peça fora ou veículo parado, prazo definido e veículo identificado.
 */
export function assessIntent(answers: QuizAnswers): IntentAssessment {
  const signals: string[] = [];
  let score = 0;

  // Motor completo não é serviço da casa. Por mais forte que seja a intenção,
  // esse lead não vira O.S. — e contá-lo como qualificado distorce o funil.
  if (answers.scope === "full_engine") {
    return {
      level: "low",
      score: 0,
      signals: ["fora de escopo: motor completo"],
    };
  }
  if (answers.scope === "head_only") {
    score += 2;
    signals.push("escopo confirmado: cabeçote");
  }

  // Peça fora ou veículo parado é o sinal mais forte: já existe serviço.
  if (
    answers.situation === "head_removed" ||
    answers.situation === "engine_disassembled"
  ) {
    score += 3;
    signals.push("peça já removida");
  } else if (answers.situation === "mechanic_assessed") {
    score += 3;
    signals.push("já avaliado por mecânico");
  } else if (answers.situation === "stopped") {
    score += 2;
    signals.push("veículo parado");
  }

  if (answers.urgency === "urgent") {
    score += 3;
    signals.push("urgente");
  } else if (answers.urgency === "this_week") {
    score += 2;
    signals.push("prazo nesta semana");
  } else if (answers.urgency === "researching" || answers.urgency === "no_deadline") {
    score -= 1;
    signals.push("ainda pesquisando");
  }

  if (!answers.vehicle.unknown && answers.vehicle.make.trim() && answers.vehicle.model.trim()) {
    score += 2;
    signals.push("veículo identificado");
  }

  if (answers.knownDiagnosis && answers.knownDiagnosis !== "none") {
    score += 2;
    signals.push("diagnóstico já recebido");
  }

  const sintomasReais = answers.symptoms.filter(
    (item) => item !== "unknown" && item !== "other"
  );
  if (sintomasReais.length >= 2) {
    score += 2;
    signals.push("mais de um sintoma");
  } else if (sintomasReais.length === 1) {
    score += 1;
    signals.push("sintoma identificado");
  }

  if (answers.profile === "workshop" || answers.profile === "fleet" || answers.profile === "company") {
    score += 2;
    signals.push("oficina, empresa ou frota");
  }

  if (answers.city.trim()) {
    score += 1;
    signals.push("cidade informada");
  }

  if (answers.hasFiles === true) {
    score += 1;
    signals.push("tem fotos ou documentos");
  }

  const level: IntentLevel = score >= 8 ? "high" : score >= 4 ? "conferium" : "low";
  return { level, score, signals };
}

/**
 * Referência curta mostrada ao cliente.
 *
 * O código completo (`RP-20260814-0ADB093E`) parecia protocolo de sistema e
 * dava vontade de apagar antes de enviar. Quatro caracteres dentro de uma frase
 * normal cumprem a mesma função: o atendimento acha o lead por
 * `lead_code LIKE '%7A3C'`, e o cliente lê como referência, não como código.
 */
export function shortRef(leadCode: string) {
  const limpo = leadCode.replace(/[^A-Z0-9]/gi, "").toUpperCase();
  return limpo.slice(-4) || "----";
}

export function buildWhatsAppEstimateMessage(
  answers: QuizAnswers,
  result: EstimateResult,
  attendanceCode: string
) {
  const vehicle = answers.vehicle.unknown
    ? "não informado"
    : [answers.vehicle.make, answers.vehicle.model, answers.vehicle.year]
        .filter(Boolean)
        .join("/") || "não informado";
  const engine = [
    answers.vehicle.engine,
    answers.vehicle.fuel ? fuelLabels[answers.vehicle.fuel] : "",
  ]
    .filter(Boolean)
    .join(" · ") || "não informado";
  const symptomValues = answers.symptoms
    .map((item) => symptomLabel.get(item) ?? item)
    .filter((item) => item !== "Outro");
  if (answers.otherSymptom.trim()) symptomValues.push(answers.otherSymptom.trim());
  const symptoms = symptomValues.join(", ") || "não informado";
  const diagnosisLabelValue = answers.knownDiagnosis
    ? diagnosisLabel.get(answers.knownDiagnosis) ?? answers.knownDiagnosis
    : "não informado";
  const diagnosisDetails = [answers.diagnosisText.trim(), answers.desiredService.trim()]
    .filter(Boolean)
    .join(" · ");
  const diagnosis = diagnosisDetails
    ? `${diagnosisLabelValue} — ${diagnosisDetails}`
    : diagnosisLabelValue;
  const businessDetails = [
    answers.approximateQuantity
      ? `quantidade: ${answers.approximateQuantity}`
      : "",
    answers.partAvailability
      ? `peça: ${answers.partAvailability}`
      : "",
  ]
    .filter(Boolean)
    .join(" · ");

  return [
    `Olá! Fiz as perguntas no site da Retífica Premium (ref. ${shortRef(attendanceCode)}).`,
    "",
    `Atendimento: ${answers.profile ? profileLabels[answers.profile] : "não informado"}`,
    `Veículo: ${vehicle}`,
    `Motor/combustível: ${engine}`,
    `Situação atual: ${answers.situation ? situationLabels[answers.situation] : "não informada"}`,
    ...(answers.mechanicAssessment.trim()
      ? [`Avaliação do mecânico: ${answers.mechanicAssessment.trim()}`]
      : []),
    `Sintomas: ${symptoms}`,
    ...(answers.serviceContextLabel
      ? [`Contexto de entrada: ${answers.serviceContextLabel}`]
      : []),
    `Diagnóstico/serviço informado: ${diagnosis}`,
    `Escopo: ${answers.scope ? scopeLabels[answers.scope] : "não informado"}`,
    `Cidade e prioridade: ${answers.city || "não informada"} · ${answers.urgency ? urgencyLabels[answers.urgency] : "não informada"}`,
    `Preferência de contato: ${answers.contactPreference ? contactPreferenceLabels[answers.contactPreference] : "não informada"}`,
    ...(businessDetails ? [`Volume/disponibilidade: ${businessDetails}`] : []),
    "",
    "Resultado: resumo pronto",
    `Possíveis verificações: ${result.checks.join("; ")}`,
    `Serviços relacionados: ${result.services.join("; ")}`,
    `Tenho fotos/documentos para enviar: ${answers.hasFiles === null ? "não informado" : answers.hasFiles ? "sim" : "não"}`,
  ].join("\n");
}
