// Slots de vídeo do site.
//
// Como usar: quando o vídeo estiver pronto no YouTube, preencha `youtubeId`
// (o trecho após "v=" na URL) no slot correspondente. A seção/área aparece
// automaticamente — enquanto `youtubeId` estiver vazio, nada é renderizado
// (zero impacto visual e de performance).
//
// `poster` é opcional: se vazio, o site usa um quadro neutro local. Para uma
// capa real, coloque a imagem em /public e referencie aqui (ex.: "/video-oficina.webp").
// Nunca use a thumb remota do YouTube: ela criaria uma requisição antes do clique.
//
// `brief` descreve o que o vídeo precisa mostrar e quanto deve durar. Serve de
// roteiro na hora de gerar/gravar — não aparece no site.

export type VideoSlot = {
  /**
   * Vídeo hospedado no próprio site (caminho em /public). Quando presente,
   * tem prioridade sobre `youtubeId`. Use para clipes curtos: abaixo de uns
   * 3 MB, o arquivo local é mais leve e mais rápido que o embed do YouTube,
   * e não passa pelo consentimento de cookie.
   */
  arquivoLocal?: string;
  /** Capa do vídeo local, em /public. */
  capaLocal?: string;
  /** ID do vídeo no YouTube (ex.: em https://youtu.be/ABC123 → "ABC123"). */
  youtubeId?: string;
  /** Título acessível / objetivo do vídeo. */
  title: string;
  /** Capa opcional e local (caminho em /public). Sem isso, usa quadro neutro. */
  poster?: string;
  /** Roteiro resumido: o que mostrar e duração alvo. Não vai para o site. */
  brief?: string;
  /** Arquivo final esperado em /public. Serve só como guia de produção. */
  targetFile?: string;
  /** Entrega recomendada para preservar qualidade e desempenho. */
  format?: string;
  /** Prompt Veo permitido apenas para visualização técnica não documental. */
  veoPrompt?: string;
  /** Restrições do prompt técnico. */
  negativePrompt?: string;
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
      "45–60s. Fachada, oficina, máquinas em operação, equipe trabalhando. "
      + "Fecha com o cabeçote pronto e uma explicação curta do que foi conferido.",
    targetFile: "/media/videos/oficina-retifica-premium-16x9.mp4",
    format: "MP4 H.264, 1920x1080, 24–30 fps, até 12 MB, legendado e sem autoplay.",
    // youtubeId: "",
    // poster: "/video-oficina.jpg",
  },

  /** SERVIÇOS — vídeo do processo: do diagnóstico à entrega do cabeçote. Objetivo: autoridade técnica. */
  servicesProcess: {
    title: "Retífica de cabeçote: do diagnóstico à entrega",
    brief:
      "60–90s. Sequência: chegada da peça → limpeza química → conferência de empeno → "
      + "plaina → sedes e válvulas → montagem → explicação do serviço executado.",
    targetFile: "/media/videos/processo-retifica-cabecote-16x9.mp4",
    format: "MP4 H.264, 1920x1080, 24–30 fps, até 15 MB, com poster WebP 1600x900.",
    // youtubeId: "",
  },

  /** B2B — vídeo da parceria: como funciona, benefícios e atendimento. Objetivo: conversão de oficinas. */
  b2bPartnership: {
    title: "Programa B2B para oficinas — como funciona a parceria",
    brief:
      "60–90s. Falado para dono de oficina: perguntas do site, prazo combinado, disponibilidade "
      + "de retirada/entrega sob consulta e explicação do serviço para o mecânico.",
    // youtubeId: "",
  },

  /**
   * RIBEIRÃO PRETO — o vídeo mais importante da conversão paga.
   * Fica na primeira dobra da página de conquista. Precisa matar a dúvida
   * "vou ter que levar até Sertãozinho?" nos primeiros 5 segundos.
   */
  ribeiraoPretoHero: {
    aspect: "mobileSquare",
    title: "Atendimento para Ribeirão Preto: confirme a logística da sua peça",
    brief:
      "30–40s, vertical ou quadrado, legendado (75% assiste sem som). "
      + "Roteiro real: 0–5s identificação da cidade → 5–15s peça recebida → "
      + "15–25s conferência/usinagem → 25–35s peça conferida. Encerrar com "
      + "'Consulte disponibilidade e condições no WhatsApp'.",
    // youtubeId: "",
  },

  /** RIBEIRÃO PRETO — logística: mostra concretamente a busca e a entrega. Objetivo: eliminar objeção de deslocamento. */
  ribeiraoPretoLogistica: {
    title: "Como funciona a busca e a entrega em Ribeirão Preto",
    brief:
      "30–45s. Mostrar a rota real, recebimento e embalagem da peça. Informar que "
      + "retirada e entrega dependem de disponibilidade e confirmação prévia.",
    // youtubeId: "",
  },

  /**
   * TECNOLOGIA — teste de trinca. É o diferencial técnico que a concorrência
   * de bairro não tem, e o argumento mais forte para justificar o trajeto.
   */
  tecnologiaTesteTrinca: {
    // Vídeo real gravado pela retífica em 15/08/2026. 10 s, 1,11 MB, 720p com
    // áudio. Hospedado no próprio site: nesse tamanho o arquivo é mais leve
    // que o embed do YouTube e não depende de consentimento de cookie.
    arquivoLocal: "/teste-de-trinca.mp4",
    capaLocal: "/teste-de-trinca-capa.jpg",
    title: "Teste de trinca: como encontramos o que não se vê a olho nu",
    brief:
      "40–60s. Equipamento real em operação, close no cabeçote e resultado sendo "
      + "interpretado pelo técnico. Explicar que o teste orienta a decisão sem "
      + "transformar sintomas em diagnóstico.",
    targetFile: "/media/videos/teste-de-trinca-retifica-premium-16x9.mp4",
    format: "MP4 H.264, 1920x1080, 24–30 fps, 30–45 s, até 10 MB, legendas gravadas e poster WebP 1600x900.",
    veoPrompt:
      "Create a 6-second seamless technical visualization, 1080x1080, of an aluminum automotive cylinder head floating over a deep navy engineering background. Show thin amber measurement lines and restrained highlights moving progressively across the sealing face, valve seats, valve guides and coolant passages. Precise industrial visualization, realistic metal surface, orthographic-inspired camera, slow controlled motion, no dramatic rotation, no people, no workshop, no company logo, no text, no diagnosis claim. The animation must remain understandable without sound and loop without a visible cut. High contrast but restrained palette: navy, aluminum gray and amber only.",
    negativePrompt:
      "fake workshop, mechanic, hands, logo, text, watermark, fire, smoke, sparks, excessive glow, sci-fi interface, oversaturated colors, rapid camera movement, parallax, shaky camera, deformed engine parts",
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
    brief: "40–60s. Conferência de empeno, usinagem e conferência final da superfície de vedação.",
    targetFile: "/media/videos/retifica-de-cabecote-16x9.mp4",
    format: "MP4 H.264 1920x1080, até 10 MB, legendado, poster WebP 1600x900.",
    // youtubeId: "",
  },
  "plaina-de-cabecote": {
    title: "Plaina de cabeçote: corrigindo o empeno",
    brief: "30–45s. Cabeçote empenado no relógio comparador, passada da plaina, superfície corrigida.",
    targetFile: "/media/videos/plaina-de-cabecote-16x9.mp4",
    format: "MP4 H.264 1920x1080, até 8 MB, legendado, poster WebP 1600x900.",
    // youtubeId: "",
  },
  "banho-quimico": {
    title: "Banho químico: por que a limpeza vem antes de tudo",
    brief: "30–40s. Peça suja entrando, peça limpa saindo. Explicar que sem limpeza não há conferência confiável.",
    targetFile: "/media/videos/limpeza-quimica-cabecote-16x9.mp4",
    format: "MP4 H.264 1920x1080, até 8 MB, legendado, poster WebP 1600x900.",
    // youtubeId: "",
  },
  "montagem-de-cabecote": {
    title: "Montagem e regulagem final do cabeçote",
    brief: "40–60s. Montagem das válvulas, regulagem, torque e conferência.",
    targetFile: "/media/videos/montagem-cabecote-16x9.mp4",
    format: "MP4 H.264 1920x1080, até 10 MB, legendado, poster WebP 1600x900.",
    // youtubeId: "",
  },
  "retifica-de-sedes-e-valvulas": {
    title: "Sedes e válvulas: vedação conferida na oficina",
    brief: "35–50s. Conferência, usinagem controlada, assentamento e teste de vedação. Não prometer vedação absoluta.",
    targetFile: "/media/videos/sedes-e-valvulas-16x9.mp4",
    format: "MP4 H.264 1920x1080, até 9 MB, legendado, poster WebP 1600x900.",
  },
  "troca-e-adaptacao-de-guias": {
    title: "Guias de válvula: folga medida antes da troca",
    brief: "35–50s. Instrumento medindo a folga, remoção/instalação e conferência de alinhamento.",
    targetFile: "/media/videos/guias-de-valvula-16x9.mp4",
    format: "MP4 H.264 1920x1080, até 9 MB, legendado, poster WebP 1600x900.",
  },
  "usinagem-de-roscas": {
    title: "Usinagem de roscas: alinhamento e profundidade sob controle",
    brief: "30–45s. Preparação, alinhamento da ferramenta, reparo e conferência final da rosca.",
    targetFile: "/media/videos/usinagem-de-roscas-16x9.mp4",
    format: "MP4 H.264 1920x1080, até 8 MB, legendado, poster WebP 1600x900.",
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
