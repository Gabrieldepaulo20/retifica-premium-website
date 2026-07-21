// Slots de vídeo do site.
//
// Como usar: quando o vídeo estiver pronto no YouTube, preencha `youtubeId`
// (o trecho após "v=" na URL) no slot correspondente. A seção/área aparece
// automaticamente — enquanto `youtubeId` estiver vazio, nada é renderizado
// (zero impacto visual e de performance).
//
// `poster` é opcional: se vazio, usa a capa do próprio YouTube. Para uma capa
// própria, coloque a imagem em /public e referencie aqui (ex.: "/video-oficina.jpg").

export type VideoSlot = {
  /** ID do vídeo no YouTube (ex.: em https://youtu.be/ABC123 → "ABC123"). */
  youtubeId?: string;
  /** Título acessível / objetivo do vídeo. */
  title: string;
  /** Capa opcional (caminho em /public). Sem isso, usa a thumb do YouTube. */
  poster?: string;
};

type VideoKey = "homeShowcase" | "servicesProcess" | "b2bPartnership";

export const videos: Record<VideoKey, VideoSlot> = {
  /** HOME — vídeo institucional curto: estrutura, equipe e padrão de qualidade. Objetivo: confiança. */
  homeShowcase: {
    title: "Conheça a Retífica Premium — estrutura, equipe e processo",
    // youtubeId: "",
    // poster: "/video-oficina.jpg",
  },
  /** SERVIÇOS — vídeo do processo: do diagnóstico à entrega do cabeçote. Objetivo: autoridade técnica. */
  servicesProcess: {
    title: "Retífica de cabeçote: do diagnóstico à entrega",
    // youtubeId: "",
  },
  /** B2B — vídeo da parceria: como funciona, benefícios e atendimento. Objetivo: conversão de oficinas. */
  b2bPartnership: {
    title: "Programa B2B para oficinas — como funciona a parceria",
    // youtubeId: "",
  },
};
