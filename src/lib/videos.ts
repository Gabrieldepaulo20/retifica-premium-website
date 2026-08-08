// Slots de vídeo do site.
//
// Como usar: quando o vídeo estiver pronto no YouTube, preencha `youtubeId`
// (o trecho após "v=" na URL) no slot correspondente. A seção/área aparece
// automaticamente — enquanto `youtubeId` estiver vazio, nada é renderizado
// (zero impacto visual e de performance).
//
// `poster` é opcional: se vazio, usa a capa do próprio YouTube. Para uma capa
// própria, coloque a imagem em /public e referencie aqui (ex.: "/video-oficina.jpg").
//
// `brief` descreve o que o vídeo precisa mostrar e quanto deve durar. Serve de
// roteiro na hora de gerar/gravar — não aparece no site.

export type VideoSlot = {
  /** ID do vídeo no YouTube (ex.: em https://youtu.be/ABC123 → "ABC123"). */
  youtubeId?: string;
  /** Título acessível / objetivo do vídeo. */
  title: string;
  /** Capa opcional (caminho em /public). Sem isso, usa a thumb do YouTube. */
  poster?: string;
  /** Roteiro resumido: o que mostrar e duração alvo. Não vai para o site. */
  brief?: string;
  /**
   * Proporção do container. Padrão `wide` (16:9).
   * Use `mobileSquare` no vídeo da primeira dobra — quadrado no celular
   * (onde está 74% do tráfego pago) e 16:9 no desktop.
   */
  aspect?: "wide" | "square" | "vertical" | "mobileSquare";
};

type VideoKey =
  | "homeShowcase"
  | "servicesProcess"
  | "b2bPartnership"
  | "ribeiraoPretoHero"
  | "ribeiraoPretoLogistica"
  | "tecnologiaTesteTrinca";

export const videos: Record<VideoKey, VideoSlot> = {
  /** HOME — vídeo institucional curto: estrutura, equipe e padrão de qualidade. Objetivo: confiança. */
  homeShowcase: {
    title: "Conheça a Retífica Premium — estrutura, equipe e processo",
    brief:
      "45–60s. Fachada, bancada, máquinas em operação, equipe trabalhando. "
      + "Fecha com o cabeçote pronto e a frase de garantia por escrito.",
    // youtubeId: "",
    // poster: "/video-oficina.jpg",
  },

  /** SERVIÇOS — vídeo do processo: do diagnóstico à entrega do cabeçote. Objetivo: autoridade técnica. */
  servicesProcess: {
    title: "Retífica de cabeçote: do diagnóstico à entrega",
    brief:
      "60–90s. Sequência: chegada da peça → limpeza química → medição de empeno → "
      + "plaina → sedes e válvulas → montagem → entrega com laudo.",
    // youtubeId: "",
  },

  /** B2B — vídeo da parceria: como funciona, benefícios e atendimento. Objetivo: conversão de oficinas. */
  b2bPartnership: {
    title: "Programa B2B para oficinas — como funciona a parceria",
    brief:
      "60–90s. Falado para dono de oficina: prazo, logística de busca e entrega, "
      + "laudo técnico que a oficina repassa ao cliente final, condições por volume.",
    // youtubeId: "",
  },

  /**
   * RIBEIRÃO PRETO — o vídeo mais importante da conversão paga.
   * Fica na primeira dobra da página de conquista. Precisa matar a dúvida
   * "vou ter que levar até Sertãozinho?" nos primeiros 5 segundos.
   */
  ribeiraoPretoHero: {
    aspect: "mobileSquare",
    title: "A gente busca em Ribeirão Preto, retifica e devolve",
    brief:
      "30–40s, vertical ou quadrado, legendado (75% assiste sem som). "
      + "Roteiro: 0–5s alguém em Ribeirão Preto com o carro parado → "
      + "5–15s a peça sendo buscada → 15–25s usinagem na bancada → "
      + "25–35s peça devolvida e apertada. Encerrar com 'Orçamento no WhatsApp em 2h'.",
    // youtubeId: "",
  },

  /** RIBEIRÃO PRETO — logística: mostra concretamente a busca e a entrega. Objetivo: eliminar objeção de deslocamento. */
  ribeiraoPretoLogistica: {
    title: "Como funciona a busca e a entrega em Ribeirão Preto",
    brief:
      "30–45s. Mapa Ribeirão Preto → Sertãozinho (19 km / 25 min), veículo saindo, "
      + "peça sendo embalada e devolvida. Texto na tela: 'Você não perde o dia'.",
    // youtubeId: "",
  },

  /**
   * TECNOLOGIA — teste de trinca. É o diferencial técnico que a concorrência
   * de bairro não tem, e o argumento mais forte para justificar o trajeto.
   */
  tecnologiaTesteTrinca: {
    title: "Teste de trinca: como encontramos o que não se vê a olho nu",
    brief:
      "40–60s. Máquina de teste em operação, close no cabeçote, revelação da trinca. "
      + "Explicar em uma frase por que montar sem esse teste gera retrabalho.",
    // youtubeId: "",
  },
};

/**
 * Slots por página de serviço (`/servicos/[slug]`).
 * A chave é o `slug` de `service-pages.ts`. Slug sem entrada aqui simplesmente
 * não renderiza vídeo.
 */
export const serviceVideos: Record<string, VideoSlot> = {
  "teste-de-trinca": videos.tecnologiaTesteTrinca,
  "retifica-de-cabecote": {
    title: "Retífica de cabeçote na prática",
    brief: "40–60s. Medição de empeno, usinagem e conferência final da superfície de vedação.",
    // youtubeId: "",
  },
  "plaina-de-cabecote": {
    title: "Plaina de cabeçote: corrigindo o empeno",
    brief: "30–45s. Cabeçote empenado no relógio comparador, passada da plaina, superfície corrigida.",
    // youtubeId: "",
  },
  "banho-quimico": {
    title: "Banho químico: por que a limpeza vem antes de tudo",
    brief: "30–40s. Peça suja entrando, peça limpa saindo. Explicar que sem limpeza não há medição confiável.",
    // youtubeId: "",
  },
  "montagem-de-cabecote": {
    title: "Montagem e regulagem final do cabeçote",
    brief: "40–60s. Montagem das válvulas, regulagem, torque e conferência.",
    // youtubeId: "",
  },
};

/**
 * Slots por página de problema (`/problemas/[slug]`).
 * Vídeo de sintoma: fala com quem está com o carro quebrado agora.
 */
export const problemVideos: Record<string, VideoSlot> = {
  "junta-do-cabecote-queimada": {
    title: "Junta do cabeçote queimada: o que fazer agora",
    brief:
      "40–60s. Mostrar os sinais (fumaça branca, água no óleo, superaquecimento) e "
      + "dizer o que NÃO fazer (continuar rodando). Fechar com WhatsApp.",
    // youtubeId: "",
  },
  // Nota: não existe página /problemas/cabecote-trincado. O conteúdo de trinca
  // vive em /servicos/teste-de-trinca — o vídeo dele está em `serviceVideos`.
  "motor-superaquecendo": {
    title: "Motor superaquecendo: quando o problema é o cabeçote",
    brief: "40–60s. Diferenciar causa simples (radiador/válvula termostática) de empeno/trinca.",
    // youtubeId: "",
  },
  "motor-fumando": {
    title: "Fumaça branca no escapamento: o que significa",
    brief: "30–45s. Fumaça branca contínua x condensação normal. Quando é junta/cabeçote.",
    // youtubeId: "",
  },
  "motor-baixando-oleo": {
    title: "Motor baixando óleo sem vazamento aparente",
    brief: "30–45s. Guias e retentores de válvula, consumo interno, o que a inspeção revela.",
    // youtubeId: "",
  },
};
