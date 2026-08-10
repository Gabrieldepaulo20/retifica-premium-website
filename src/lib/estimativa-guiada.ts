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
export type ContactPreference = "whatsapp" | "phone" | "take_part";

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
  contactPreference: ContactPreference | null;
  approximateQuantity: string;
  partAvailability: string;
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
  contactPreference: null,
  approximateQuantity: "",
  partAvailability: "",
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
  ["other", "Outro"],
] as const;

const symptomLabel = new Map<string, string>(symptomOptions);
const diagnosisLabel = new Map<string, string>(diagnosisOptions);
const seriousSymptoms = new Set([
  "overheating",
  "oil_water_mix",
  "reservoir_pressure",
  "returned_problem",
]);

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

  if (answers.symptoms.some((item) => seriousSymptoms.has(item))) {
    addUnique(
      related,
      "vedação da junta, empeno ou passagem interna no cabeçote",
      "trinca que só aparece após limpeza e teste"
    );
    addUnique(
      checks,
      "medir a face de vedação",
      "fazer o teste de trinca e conferir os canais de água e óleo"
    );
    addUnique(services, "Retífica de cabeçote", "Plaina de cabeçote", "Solda de trincas");
  }

  if (answers.symptoms.includes("blue_smoke")) {
    addUnique(
      related,
      "folga em guias, retentores, sedes ou válvulas",
      "desgaste na parte inferior do motor, que precisa ser separado do cabeçote"
    );
    addUnique(checks, "conferir folga das guias, vedação das válvulas e origem do consumo de óleo");
    addUnique(services, "Troca e adaptação de guias", "Retífica de sedes e válvulas");
  }

  if (answers.symptoms.some((item) => ["power_loss", "misfires"].includes(item))) {
    addUnique(related, "perda de vedação ou compressão no conjunto de válvulas");
    addUnique(checks, "testar vedação de sedes e válvulas");
    addUnique(services, "Retífica de sedes e válvulas", "Esmerilhamento de válvulas");
  }

  if (answers.symptoms.includes("noise")) {
    addUnique(related, "folgas ou montagem que exigem inspeção antes de usinar");
    addUnique(checks, "conferir componentes, folgas e regulagem do conjunto");
    addUnique(services, "Montagem e regulagem final");
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

  if (services.length === 0) {
    addUnique(services, "Diagnóstico técnico de motor", "Retífica de cabeçote");
  }
  if (checks.length === 0) {
    addUnique(checks, "limpar a peça e medir empeno, vedação, guias, sedes, válvulas e trincas");
  }
  if (related.length === 0) {
    addUnique(related, "mais de uma causa possível; o sintoma sozinho não confirma o serviço");
  }

  if (answers.vehicle.unknown) pending.push("identificar veículo, motor ou família compatível");
  if (!answers.vehicle.engine.trim()) pending.push("confirmar a motorização");
  if (!answers.vehicle.engineCode.trim()) pending.push("confirmar o código do motor, se estiver disponível");
  if (answers.situation !== "head_removed" && answers.situation !== "engine_disassembled") {
    pending.push("inspecionar o cabeçote após a remoção");
  }
  pending.push("medir a peça e separar serviços, peças e materiais necessários");

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
    ],
    related,
    checks,
    pending,
    services,
    inclusions: [
      "triagem explicativa com os pontos que merecem verificação",
      "resumo pronto para continuar o atendimento no WhatsApp",
    ],
    exclusions: [
      "diagnóstico mecânico confirmado sem inspecionar a peça",
      "peças, materiais, frete e serviços que ainda não foram medidos",
      "preço público antes da auditoria e aprovação da base comercial",
    ],
    valueFactors: [
      "modelo e família do motor",
      "empeno, trinca e material removido anteriormente",
      "estado de sedes, válvulas, guias, roscas e componentes",
      "peças, solda, montagem, urgência e logística necessárias",
    ],
    nextStep:
      "Envie este resumo pelo WhatsApp. A equipe confirma o que precisa ser avaliado e orienta como levar ou enviar a peça.",
    safetyWarning:
      answers.situation === "running" &&
      answers.symptoms.some((item) => seriousSymptoms.has(item)),
  };
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
    "Olá! Fiz a estimativa guiada no site da Retífica Premium.",
    "",
    `Atendimento: ${answers.profile ? profileLabels[answers.profile] : "não informado"}`,
    `Veículo: ${vehicle}`,
    `Motor/combustível: ${engine}`,
    `Situação atual: ${answers.situation ? situationLabels[answers.situation] : "não informada"}`,
    `Sintomas: ${symptoms}`,
    `Diagnóstico/serviço informado: ${diagnosis}`,
    `Cidade e prioridade: ${answers.city || "não informada"} · ${answers.urgency ? urgencyLabels[answers.urgency] : "não informada"}`,
    `Preferência de contato: ${answers.contactPreference ? contactPreferenceLabels[answers.contactPreference] : "não informada"}`,
    ...(businessDetails ? [`Volume/disponibilidade: ${businessDetails}`] : []),
    "",
    "Resultado preliminar: avaliação necessária",
    `Possíveis verificações: ${result.checks.join("; ")}`,
    "Faixa apresentada: avaliação necessária",
    `Tenho fotos/documentos para enviar: ${answers.hasFiles === null ? "não informado" : answers.hasFiles ? "sim" : "não"}`,
    "",
    `Código do atendimento: ${attendanceCode}`,
  ].join("\n");
}
