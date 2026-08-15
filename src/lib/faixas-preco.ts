/**
 * Faixas de valor reais, extraídas das ordens de serviço da Retífica Premium.
 *
 * Origem: `RetificaPremium.Notas_de_Servico` no Supabase, via
 * `retiflow/tmp/faixas-por-motor.mjs`. Recorte aplicado:
 *   • só O.S. concluídas (status Entregue ou Finalizado)
 *   • fora as 10 O.S. de teste da implantação do sistema
 *   • fora 11 outliers acima do P99 (R$ 3.200)
 *   • serviço de bloco excluído — a casa trabalha cabeçote
 *
 * Os valores publicados são P25 e P75 **com margem de 10%**, arredondados para
 * a dezena. A margem é decisão comercial: cobre variação de peça e reajuste sem
 * obrigar a retífica a desdizer o site.
 *
 * O campo `defeito` só passou a ser preenchido em junho de 2026, então as O.S.
 * classificadas são praticamente todo o serviço dos últimos três meses. Para
 * preço isso é a amostra certa — números velhos seriam piores.
 *
 * NUNCA calcular faixa por IA. O número sai daqui ou não sai.
 */

export type FaixaPreco = {
  /** Limite inferior já com a margem de 10%, arredondado. */
  min: number;
  /** Limite superior já com a margem de 10%, arredondado. */
  max: number;
  /** Quantas O.S. sustentam a faixa. Abaixo de 20 não publicamos. */
  amostra: number;
};

const N_MINIMO_PUBLICAVEL = 20;

/** Marcas com amostra suficiente para faixa própria. */
const faixasPorMarca: Record<string, FaixaPreco> = {
  Ford: { min: 870, max: 1410, amostra: 46 },
  Chevrolet: { min: 630, max: 770, amostra: 42 },
  Fiat: { min: 790, max: 1080, amostra: 36 },
};

/** Usada quando a marca não tem amostra própria. Recorte de consumidor final. */
const faixaGeral: FaixaPreco = { min: 790, max: 1310, amostra: 43 };

/** Cabeçote à base de troca é outro modelo comercial e tem faixa própria. */
export const faixaBaseTroca: FaixaPreco = { min: 1760, max: 2150, amostra: 30 };

export type ResultadoFaixa = {
  faixa: FaixaPreco;
  /** True quando a faixa é específica da marca, não a geral. */
  especifica: boolean;
  marca: string | null;
};

/**
 * Devolve a faixa para retífica completa de cabeçote.
 * Cai na faixa geral sempre que a marca não tiver amostra própria — nunca
 * inventa um número intermediário.
 */
export function faixaParaMarca(marca: string | null | undefined): ResultadoFaixa {
  const chave = (marca ?? "").trim();
  const especifica = faixasPorMarca[chave];
  if (especifica && especifica.amostra >= N_MINIMO_PUBLICAVEL) {
    return { faixa: especifica, especifica: true, marca: chave };
  }
  return { faixa: faixaGeral, especifica: false, marca: chave || null };
}

/**
 * Segmentos do fluxo. Cada um leva a um desfecho diferente na tela e vira
 * dimensão nos eventos, para o funil poder ser lido por segmento em vez de
 * virar uma média que não descreve ninguém.
 */
export type Segmento =
  | "fora_escopo"       // motor completo — não é serviço da casa
  | "b2b"               // oficina, empresa ou frota — condição própria
  | "diesel_utilitario" // sem amostra publicável
  | "base_troca"        // outro modelo comercial, faixa própria
  | "popular_marca"     // faixa da marca
  | "popular_geral";    // faixa de consumidor final

export type DesfechoSegmento = {
  segmento: Segmento;
  faixa: FaixaPreco | null;
  titulo: string;
  /** Texto exibido quando não há faixa. Melhor sem número que com número errado. */
  semFaixa: string | null;
};

/**
 * Modelos e motorizações que a faixa de carro popular não descreve.
 *
 * Medido: 47 O.S. de diesel/utilitário, mas só 8 com retífica completa
 * identificada, variando de R$ 1.160 a R$ 4.280. Amostra insuficiente e
 * dispersão alta demais — esse cliente recebe avaliação, não faixa.
 */
const MODELOS_PESADOS = /S10|HILUX|RANGER|AMAROK|MASTER|SPRINTER|DAILY|F-1000|FRONTIER|L200|TRITON|DUCATO|BOXER|JUMPER|TORO/i;

function ehPesado(marca: string, modelo: string, motorizacao: string, combustivel: string | null) {
  if (combustivel === "diesel") return true;
  if (/diesel/i.test(motorizacao)) return true;
  if (MODELOS_PESADOS.test(modelo)) return true;
  void marca;
  return false;
}

export function segmentarCliente(dados: {
  escopoMotorCompleto: boolean;
  perfilB2B: boolean;
  marca: string;
  modelo: string;
  motorizacao: string;
  combustivel: string | null;
  querBaseTroca: boolean;
}): DesfechoSegmento {
  if (dados.escopoMotorCompleto) {
    return {
      segmento: "fora_escopo",
      faixa: null,
      titulo: "Motor completo",
      semFaixa:
        "A Retífica Premium trabalha o cabeçote. Bloco, virabrequim e motor inteiro são de outra especialidade — não faria sentido dar um valor aqui.",
    };
  }

  if (dados.perfilB2B) {
    return {
      segmento: "b2b",
      faixa: null,
      titulo: "Oficina, empresa ou frota",
      semFaixa:
        "Para oficina, empresa e frota existe condição própria, que depende de volume e recorrência. A equipe passa a tabela no atendimento.",
    };
  }

  if (ehPesado(dados.marca, dados.modelo, dados.motorizacao, dados.combustivel)) {
    return {
      segmento: "diesel_utilitario",
      faixa: null,
      titulo: "Motor diesel ou utilitário",
      semFaixa:
        "Diesel e utilitário variam muito mais de caso para caso do que carro de passeio. Preferimos avaliar a peça a chutar um número que não se sustente.",
    };
  }

  if (dados.querBaseTroca) {
    return {
      segmento: "base_troca",
      faixa: faixaBaseTroca,
      titulo: "Cabeçote à base de troca",
      semFaixa: null,
    };
  }

  const resultado = faixaParaMarca(dados.marca);
  return {
    segmento: resultado.especifica ? "popular_marca" : "popular_geral",
    faixa: resultado.faixa,
    titulo: resultado.especifica
      ? `Retífica completa de cabeçote · ${dados.marca}`
      : "Retífica completa de cabeçote",
    semFaixa: null,
  };
}

export function formatarReal(valor: number) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function formatarFaixa(faixa: FaixaPreco) {
  return `${formatarReal(faixa.min)} a ${formatarReal(faixa.max)}`;
}

/**
 * Catálogo de veículos para os campos em cascata.
 *
 * Substituiu o texto livre: a base interna tinha 339 "modelos" distintos
 * misturando família de motor com modelo de carro, e o dado ficava inutilizável
 * para segmentar preço. Lista fixa gera dado limpo dos dois lados.
 *
 * As motorizações são as comuns de cada modelo no mercado brasileiro; o cliente
 * sempre pode marcar "não sei".
 */
export const catalogoVeiculos: Record<string, Record<string, string[]>> = {
  Chevrolet: {
    Celta: ["1.0", "1.4"],
    Classic: ["1.0"],
    Cobalt: ["1.4", "1.8"],
    Corsa: ["1.0", "1.4", "1.6"],
    Montana: ["1.4", "1.8"],
    Onix: ["1.0", "1.4"],
    Prisma: ["1.0", "1.4"],
    S10: ["2.4", "2.8 diesel"],
    Spin: ["1.8"],
    Astra: ["2.0"],
    Vectra: ["2.0", "2.4"],
  },
  Fiat: {
    Argo: ["1.0", "1.3"],
    Doblo: ["1.4", "1.8"],
    Fiorino: ["1.0", "1.4"],
    Idea: ["1.4", "1.8"],
    Mobi: ["1.0"],
    Palio: ["1.0", "1.4", "1.6"],
    Punto: ["1.4", "1.6", "1.8"],
    Siena: ["1.0", "1.4", "1.6"],
    Strada: ["1.4", "1.8"],
    Toro: ["1.8", "2.0 diesel"],
    Uno: ["1.0", "1.4"],
  },
  Ford: {
    Courier: ["1.6"],
    EcoSport: ["1.6", "2.0"],
    Fiesta: ["1.0", "1.6"],
    Focus: ["1.6", "2.0"],
    Ka: ["1.0", "1.5", "1.6"],
    Ranger: ["2.2 diesel", "3.2 diesel"],
    "F-1000": ["3.9 diesel"],
  },
  Honda: {
    City: ["1.5"],
    Civic: ["1.7", "1.8", "2.0"],
    Fit: ["1.4", "1.5"],
    "HR-V": ["1.5", "1.8"],
  },
  Hyundai: {
    Creta: ["1.6", "2.0"],
    HB20: ["1.0", "1.6"],
    i30: ["2.0"],
    Tucson: ["2.0"],
  },
  Peugeot: {
    "206": ["1.0", "1.4", "1.6"],
    "207": ["1.4", "1.6"],
    "208": ["1.2", "1.6"],
    Partner: ["1.6"],
  },
  Renault: {
    Clio: ["1.0", "1.6"],
    Duster: ["1.6", "2.0"],
    Kangoo: ["1.6"],
    Logan: ["1.0", "1.6"],
    Master: ["2.3 diesel"],
    Sandero: ["1.0", "1.6"],
    Scénic: ["1.6", "2.0"],
  },
  Toyota: {
    Corolla: ["1.8", "2.0"],
    Etios: ["1.3", "1.5"],
    Hilux: ["2.8 diesel", "3.0 diesel"],
    Yaris: ["1.3", "1.5"],
  },
  Volkswagen: {
    Amarok: ["2.0 diesel"],
    Fox: ["1.0", "1.6"],
    Gol: ["1.0", "1.6", "1.8"],
    Kombi: ["1.4"],
    Parati: ["1.6", "1.8"],
    Polo: ["1.0", "1.6"],
    Saveiro: ["1.6", "1.8"],
    "T-Cross": ["1.0", "1.4"],
    Voyage: ["1.0", "1.6"],
  },
  Citroën: {
    "C3": ["1.4", "1.6"],
    "C4": ["1.6", "2.0"],
    Berlingo: ["1.6"],
    Xsara: ["1.6", "2.0"],
  },
};

export const marcasDisponiveis = Object.keys(catalogoVeiculos).sort();

export function modelosDaMarca(marca: string) {
  return Object.keys(catalogoVeiculos[marca] ?? {}).sort();
}

export function motorizacoesDoModelo(marca: string, modelo: string) {
  return catalogoVeiculos[marca]?.[modelo] ?? [];
}
