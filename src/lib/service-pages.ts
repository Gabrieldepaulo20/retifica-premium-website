export type ServiceDetailPage = {
  slug: string;
  title: string;
  shortTitle: string;
  metaTitle: string;
  metaDescription: string;
  hero: string;
  intro: string;
  image: string;
  imageAlt: string;
  primaryIntent: string;
  symptoms: string[];
  includes: string[];
  process: string[];
  faq: Array<{
    question: string;
    answer: string;
  }>;
};

export const serviceDetailPages = [
  {
    slug: "retifica-de-cabecote",
    title: "Retífica de cabeçote",
    shortTitle: "Retífica de cabeçote",
    metaTitle: "Retífica de Cabeçote em Sertãozinho-SP",
    metaDescription:
      "Retífica de cabeçote com plaina, sedes, válvulas, guias, limpeza química e montagem técnica em Sertãozinho-SP. Atende Ribeirão Preto e região.",
    hero: "Retífica de cabeçote com diagnóstico e usinagem de precisão",
    intro:
      "A retífica de cabeçote exige medição, limpeza, inspeção e usinagem correta antes da montagem. Na Retífica Premium, cada cabeçote é avaliado conforme o sintoma do veículo e o estado real da peça, evitando troca desnecessária e reduzindo risco de retrabalho.",
    image: "/cabecote.webp",
    imageAlt: "Cabeçote em processo de retífica e usinagem de precisão",
    primaryIntent: "alta-intencao",
    symptoms: [
      "motor superaquecendo",
      "junta queimada",
      "perda de compressão",
      "falha de vedação",
      "mistura de óleo e água",
    ],
    includes: [
      "limpeza química para remover resíduos e preparar a peça",
      "conferência de empeno e superfície de vedação",
      "plaina de cabeçote quando a peça exige correção",
      "retífica de sedes, válvulas e guias conforme desgaste",
      "orientação técnica para montagem e cuidados após o serviço",
    ],
    process: [
      "Recebemos a peça e entendemos o histórico do problema.",
      "Fazemos inspeção visual, limpeza e medições técnicas.",
      "Definimos quais operações são necessárias antes da usinagem.",
      "Executamos o serviço e entregamos a peça com orientação clara.",
    ],
    faq: [
      {
        question: "Quando fazer retífica de cabeçote?",
        answer:
          "Quando há empeno, falha de vedação, junta queimada, desgaste de sedes e válvulas, trincas ou sintomas como superaquecimento e perda de compressão.",
      },
      {
        question: "Retífica de cabeçote resolve motor superaquecendo?",
        answer:
          "Depende da causa. Se o superaquecimento empenou o cabeçote ou comprometeu a junta, a retífica pode ser parte da solução. O diagnóstico vem antes da indicação do serviço.",
      },
    ],
  },
  {
    slug: "plaina-de-cabecote",
    title: "Plaina de cabeçote",
    shortTitle: "Plaina de cabeçote",
    metaTitle: "Plaina de Cabeçote em Sertãozinho-SP",
    metaDescription:
      "Serviço de plaina de cabeçote para corrigir empeno, melhorar vedação e preparar a peça para montagem. Sertãozinho-SP, Ribeirão Preto e região.",
    hero: "Plaina de cabeçote para corrigir empeno e vedação",
    intro:
      "A plaina de cabeçote corrige irregularidades na superfície de contato com o bloco. É um serviço técnico que exige medição antes da usinagem, porque remover material sem critério pode comprometer o conjunto.",
    image: "/plainadecabecotes.png",
    imageAlt: "Ícone de plaina de cabeçote",
    primaryIntent: "servico-especifico",
    symptoms: [
      "cabeçote empenado",
      "junta queimada",
      "superaquecimento recorrente",
      "vazamento na junta",
      "baixa vedação entre bloco e cabeçote",
    ],
    includes: [
      "conferência da superfície antes do corte",
      "orientação quando a peça não deve ser plainada",
      "usinagem com foco em vedação e medida correta",
      "preparação da superfície para montagem",
      "avaliação combinada com limpeza, sedes e válvulas quando necessário",
    ],
    process: [
      "Medimos o empeno e avaliamos o estado da peça.",
      "Confirmamos se a plaina é indicada para o caso.",
      "Executamos a usinagem respeitando tolerâncias técnicas.",
      "Entregamos a peça pronta para montagem correta.",
    ],
    faq: [
      {
        question: "Quanto custa para plainar um cabeçote?",
        answer:
          "O valor depende do modelo e do estado da peça. A Retífica Premium avalia o cabeçote e informa o orçamento antes de executar o serviço.",
      },
      {
        question: "Sempre precisa plainar após junta queimada?",
        answer:
          "Não necessariamente. É preciso medir empeno e superfície. Se a peça estiver dentro da tolerância, a plaina pode não ser necessária.",
      },
    ],
  },
  {
    slug: "banho-quimico",
    title: "Banho químico de cabeçote",
    shortTitle: "Banho químico",
    metaTitle: "Banho Químico de Cabeçote em Sertãozinho-SP",
    metaDescription:
      "Banho químico e limpeza técnica de cabeçote para remover carbonização, óleo, ferrugem e resíduos antes da usinagem. Atende Ribeirão Preto e região.",
    hero: "Banho químico e limpeza técnica para cabeçote",
    intro:
      "A limpeza do cabeçote é etapa essencial antes de medir, usinar e montar. O banho químico remove sujeira pesada, carbonização, óleo e resíduos que podem esconder trincas, desgaste ou falhas de vedação.",
    image: "/cabecoteservicos.png",
    imageAlt: "Ícone de limpeza química de cabeçote",
    primaryIntent: "servico-especifico",
    symptoms: [
      "cabeçote com carbonização",
      "resíduos de óleo",
      "ferrugem e borra",
      "peça suja antes da inspeção",
      "preparação para usinagem",
    ],
    includes: [
      "remoção de resíduos acumulados",
      "preparação para inspeção visual e medição",
      "melhora na leitura de trincas, sedes e guias",
      "base limpa para plaina e montagem",
      "orientação sobre próximas etapas da retífica",
    ],
    process: [
      "Identificamos o tipo de sujeira e condição da peça.",
      "Realizamos a limpeza adequada para a etapa de retífica.",
      "Reavaliamos a peça limpa para localizar defeitos.",
      "Seguimos para medição, usinagem ou montagem conforme necessidade.",
    ],
    faq: [
      {
        question: "Banho químico resolve problema no motor?",
        answer:
          "Ele não resolve sozinho um defeito mecânico, mas prepara a peça para diagnóstico e serviço correto. É uma etapa importante para enxergar o real estado do cabeçote.",
      },
      {
        question: "A limpeza química é indicada antes da plaina?",
        answer:
          "Sim, porque a peça limpa permite medição mais confiável e reduz risco de sujeira interferir no acabamento ou na inspeção.",
      },
    ],
  },
  {
    slug: "teste-de-trinca",
    title: "Inspeção de trincas no cabeçote",
    shortTitle: "Trincas no cabeçote",
    metaTitle: "Cabeçote Trincado Tem Conserto?",
    metaDescription:
      "Cabeçote trincado tem conserto em muitos casos. Inspeção de trincas, solda e reparo técnico em Sertãozinho-SP, com avaliação para vazamento e superaquecimento.",
    hero: "Inspeção de trincas e reparo técnico em cabeçote",
    intro:
      "Trincas no cabeçote podem causar vazamento, falha de compressão, mistura de água e óleo ou retorno do superaquecimento. A peça precisa ser limpa e inspecionada antes de decidir por reparo, solda ou substituição.",
    image: "/soldadetrincas.png",
    imageAlt: "Ícone de solda de trincas em cabeçote",
    primaryIntent: "problema",
    symptoms: [
      "cabeçote trincado",
      "vazamento interno",
      "perda de compressão",
      "superaquecimento que volta",
      "mistura de óleo e água",
    ],
    includes: [
      "limpeza da peça antes da avaliação",
      "inspeção de áreas críticas do cabeçote",
      "orientação sobre reparo, solda ou troca",
      "avaliação de segurança para montagem",
      "explicação do risco de retrabalho quando há trinca não tratada",
    ],
    process: [
      "Recebemos a peça com o histórico do sintoma.",
      "Limpamos e avaliamos pontos de maior risco.",
      "Definimos se há condição técnica de reparo.",
      "Orientamos a oficina ou cliente antes da montagem.",
    ],
    faq: [
      {
        question: "Cabeçote trincado tem conserto?",
        answer:
          "Depende do local, tamanho e condição da trinca. Em alguns casos há reparo técnico; em outros, a troca é a opção mais segura.",
      },
      {
        question: "Como saber se o cabeçote está trincado?",
        answer:
          "Sinais comuns incluem superaquecimento recorrente, perda de compressão, vazamento e mistura de óleo e água. A confirmação depende de inspeção técnica.",
      },
    ],
  },
  {
    slug: "montagem-de-cabecote",
    title: "Montagem e regulagem de cabeçote",
    shortTitle: "Montagem de cabeçote",
    metaTitle: "Montagem de Cabeçote em Sertãozinho-SP",
    metaDescription:
      "Montagem e regulagem de cabeçote com conferência de componentes, vedação, válvulas e orientação para instalação correta. Atende Ribeirão Preto e região.",
    hero: "Montagem e regulagem de cabeçote com conferência técnica",
    intro:
      "A montagem correta é o que fecha o serviço de retífica com segurança. Após limpeza, medição e usinagem, a peça precisa de conferência de componentes, regulagem e orientação para voltar ao veículo sem retrabalho.",
    image: "/montagemeregulagemfinal.png",
    imageAlt: "Ícone de montagem e regulagem final de cabeçote",
    primaryIntent: "servico-especifico",
    symptoms: [
      "cabeçote desmontado",
      "serviço de retífica concluído",
      "necessidade de regulagem final",
      "troca de válvulas ou guias",
      "montagem após junta queimada",
    ],
    includes: [
      "conferência de peças antes da montagem",
      "montagem de válvulas e componentes relacionados",
      "regulagem conforme necessidade do conjunto",
      "orientação de cuidados para instalação no veículo",
      "suporte para oficinas que terceirizam retífica",
    ],
    process: [
      "Revisamos o serviço feito na peça.",
      "Conferimos componentes, encaixes e vedação.",
      "Executamos a montagem e regulagem final.",
      "Entregamos com orientação para reduzir risco de retorno.",
    ],
    faq: [
      {
        question: "Vocês entregam o cabeçote montado?",
        answer:
          "Sim, quando o serviço contratado inclui montagem e regulagem final. A indicação depende do estado da peça e dos componentes.",
      },
      {
        question: "Montagem errada pode causar problema no motor?",
        answer:
          "Sim. Falhas de montagem podem gerar vazamento, perda de compressão, ruído, superaquecimento e retrabalho. Por isso a conferência técnica é importante.",
      },
    ],
  },
  {
    slug: "retifica-de-sedes-e-valvulas",
    title: "Retífica de sedes e válvulas",
    shortTitle: "Sedes e válvulas",
    metaTitle: "Retífica de Sedes e Válvulas em Sertãozinho-SP",
    metaDescription:
      "Retífica de sedes, válvulas e esmerilhamento com conferência de vedação e desgaste. Atendimento em Sertãozinho, Ribeirão Preto e região.",
    hero: "Sedes e válvulas conferidas para recuperar vedação e compressão",
    intro:
      "Sedes e válvulas trabalham juntas para vedar a câmara. Desgaste, queima ou assentamento irregular podem causar falhas, perda de potência e baixa compressão. A correção começa medindo cada ponto, não apenas esmerilhando por rotina.",
    image: "/sedeseguias.png",
    imageAlt: "Ilustração técnica de sedes e válvulas de cabeçote",
    primaryIntent: "servico-especifico",
    symptoms: [
      "perda de compressão",
      "motor falhando",
      "perda de potência",
      "válvula queimada",
      "vedação irregular",
    ],
    includes: [
      "conferência de assentamento e contato das válvulas",
      "avaliação de desgaste das sedes",
      "retífica ou correção somente quando necessária",
      "esmerilhamento para acabamento e conferência de vedação",
      "orientação quando válvulas ou sedes precisam ser substituídas",
    ],
    process: [
      "Limpamos e inspecionamos sedes, válvulas e câmaras.",
      "Medimos desgaste, contato e condição de vedação.",
      "Retificamos as superfícies indicadas e fazemos o assentamento.",
      "Conferimos a vedação antes de liberar para montagem.",
    ],
    faq: [
      {
        question: "Esmerilhar válvula é o mesmo que retificar a sede?",
        answer:
          "Não. O esmerilhamento é uma etapa de acabamento e conferência de contato. Quando há desgaste ou deformação, a sede ou a válvula pode precisar de retífica antes.",
      },
      {
        question: "Sede ou válvula ruim causa perda de potência?",
        answer:
          "Pode causar, porque a câmara perde vedação e compressão. A confirmação depende de teste e medição do conjunto.",
      },
    ],
  },
  {
    slug: "troca-e-adaptacao-de-guias",
    title: "Troca e adaptação de guias de válvula",
    shortTitle: "Troca e adaptação de guias",
    metaTitle: "Troca e Adaptação de Guias de Válvula",
    metaDescription:
      "Troca e adaptação de guias de válvula com medição de folga e alinhamento em Sertãozinho-SP. Atende oficinas de Ribeirão Preto e região.",
    hero: "Guias de válvula com folga, medida e alinhamento corretos",
    intro:
      "A guia mantém a válvula alinhada durante o funcionamento. Folga excessiva pode aumentar consumo de óleo e fumaça; uma adaptação incorreta pode travar, desalinha a vedação e cria retrabalho.",
    image: "/adaptacaodeguias.png",
    imageAlt: "Ilustração de troca e adaptação de guias de válvula",
    primaryIntent: "servico-especifico",
    symptoms: [
      "fumaça azul",
      "consumo de óleo",
      "folga lateral de válvula",
      "retentor danificado",
      "desgaste de guia",
    ],
    includes: [
      "medição da folga entre haste e guia",
      "avaliação de alinhamento com sede e válvula",
      "remoção e instalação conforme condição da peça",
      "adaptação quando a aplicação exige solução técnica compatível",
      "conferência final antes do assentamento das válvulas",
    ],
    process: [
      "Conferimos a folga e o estado de cada guia.",
      "Definimos troca, reparo ou adaptação compatível.",
      "Executamos a instalação preservando alinhamento e medida.",
      "Revisamos sedes e válvulas antes da montagem.",
    ],
    faq: [
      {
        question: "Guia gasta faz o motor fumar?",
        answer:
          "Pode contribuir para fumaça azul e consumo de óleo, mas anéis, retentores e outros pontos também precisam ser considerados.",
      },
      {
        question: "Toda guia com folga precisa ser trocada?",
        answer:
          "A decisão depende da medida, do material e da aplicação. A peça é avaliada antes de indicar troca ou adaptação.",
      },
    ],
  },
  {
    slug: "usinagem-de-roscas",
    title: "Usinagem e recuperação de roscas",
    shortTitle: "Usinagem de roscas",
    metaTitle: "Usinagem de Roscas em Cabeçote",
    metaDescription:
      "Recuperação e usinagem de roscas de cabeçote com alinhamento e inspeção técnica em Sertãozinho-SP, Ribeirão Preto e região.",
    hero: "Roscas recuperadas com alinhamento e fixação seguros",
    intro:
      "Rosca espanada ou danificada compromete aperto, vedação e montagem. A recuperação precisa respeitar posição, profundidade e material do cabeçote para não transformar um reparo localizado em dano maior.",
    image: "/usinagemderoscas.png",
    imageAlt: "Ilustração técnica de usinagem e recuperação de roscas",
    primaryIntent: "servico-especifico",
    symptoms: [
      "rosca espanada",
      "parafuso sem aperto",
      "rosca de vela danificada",
      "fixação irregular",
      "vazamento após montagem",
    ],
    includes: [
      "inspeção do dano e do material ao redor",
      "conferência de alinhamento e profundidade",
      "definição do método de recuperação adequado",
      "usinagem e acabamento da fixação",
      "orientação de montagem para evitar reincidência",
    ],
    process: [
      "Avaliamos o dano e a função daquela fixação.",
      "Conferimos eixo, profundidade e material disponível.",
      "Executamos a recuperação indicada para o conjunto.",
      "Testamos encaixe e aperto antes de liberar a peça.",
    ],
    faq: [
      {
        question: "Rosca de vela espanada tem conserto?",
        answer:
          "Muitos casos permitem recuperação, mas o método depende do dano e da espessura de material disponível. A inspeção define a solução segura.",
      },
      {
        question: "Dá para recuperar a rosca sem desmontar?",
        answer:
          "Depende da posição e do risco de resíduos entrarem no motor. A Retífica Premium orienta a forma segura depois de entender o caso.",
      },
    ],
  },
] as const satisfies readonly ServiceDetailPage[];

export const serviceCatalog = [
  { id: "head-rebuild", title: "Retífica de cabeçote", href: "/servicos/retifica-de-cabecote", description: "Inspeção, medição e correções conforme o estado real da peça." },
  { id: "seats-valves", title: "Retífica de sedes e válvulas", href: "/servicos/retifica-de-sedes-e-valvulas", description: "Vedação e assentamento para recuperar compressão." },
  { id: "surfacing", title: "Plaina de cabeçote", href: "/servicos/plaina-de-cabecote", description: "Correção da face após medir empeno e altura disponível." },
  { id: "chemical-cleaning", title: "Limpeza química", href: "/servicos/banho-quimico", description: "Remove resíduos para permitir inspeção e usinagem confiáveis." },
  { id: "valve-guides", title: "Troca e adaptação de guias", href: "/servicos/troca-e-adaptacao-de-guias", description: "Folga e alinhamento conferidos antes da montagem." },
  { id: "valve-lapping", title: "Esmerilhamento de válvulas", href: "/servicos/retifica-de-sedes-e-valvulas#esmerilhamento", description: "Acabamento e conferência de contato após a medição." },
  { id: "thread-machining", title: "Usinagem de roscas", href: "/servicos/usinagem-de-roscas", description: "Recuperação de fixações com eixo e profundidade corretos." },
  { id: "crack-welding", title: "Solda de trincas", href: "/servicos/teste-de-trinca#solda", description: "Reparo somente quando a inspeção indicar condição segura." },
  { id: "final-assembly", title: "Montagem e regulagem final", href: "/servicos/montagem-de-cabecote", description: "Conferência do conjunto antes de voltar ao veículo." },
  { id: "technical-diagnosis", title: "Diagnóstico técnico de motor", href: "/quanto-custa", description: "Triagem por veículo, situação e sintomas sem exigir conhecimento técnico." },
] as const;

type ServiceDetailPageEntry = (typeof serviceDetailPages)[number];

export const serviceDetailPagesBySlug: ReadonlyMap<
  string,
  ServiceDetailPageEntry
> = new Map(
  serviceDetailPages.map((page) => [page.slug, page])
);

export function getServicePageBySlug(slug: string) {
  return serviceDetailPagesBySlug.get(slug);
}

export function servicePath(slug: string) {
  return `/servicos/${slug}`;
}

/**
 * O que é medido em cada serviço, na linguagem da bancada.
 *
 * Alimenta a ficha de medição do topo da página. São os pontos que a peça
 * realmente passa antes de sair um preço — não é lista de venda. Se um serviço
 * não estiver aqui, a ficha simplesmente não aparece.
 *
 * Regra ao editar: nomear o que é conferido, nunca publicar tolerância em
 * número. Número de tolerância varia por motor e publicar um valor fixo seria
 * inventar precisão que a peça não tem.
 */
export const medicoesPorServico: Record<string, string[]> = {
  "retifica-de-cabecote": [
    "Empeno da face de vedação",
    "Sedes e válvulas",
    "Guias de válvula",
    "Trincas na câmara",
  ],
  "plaina-de-cabecote": [
    "Empeno da face",
    "Altura restante da peça",
    "Acabamento da superfície",
    "Vedação após o corte",
  ],
  "banho-quimico": [
    "Resíduo de carbonização",
    "Canais de água e óleo",
    "Superfície para leitura",
    "Estado geral antes da medição",
  ],
  "teste-de-trinca": [
    "Câmara de combustão",
    "Assentos de válvula",
    "Canais de arrefecimento",
    "Face de vedação",
  ],
  "montagem-de-cabecote": [
    "Folga de válvulas",
    "Vedadores e retentores",
    "Torque de montagem",
    "Conferência do conjunto",
  ],
  "retifica-de-sedes-e-valvulas": [
    "Contato entre sede e válvula",
    "Desgaste das sedes",
    "Condição das válvulas",
    "Vedação após assentamento",
  ],
  "troca-e-adaptacao-de-guias": [
    "Folga entre haste e guia",
    "Alinhamento com a sede",
    "Condição do alojamento",
    "Vedação com retentores",
  ],
  "usinagem-de-roscas": [
    "Eixo e profundidade",
    "Material ao redor da rosca",
    "Condição da fixação",
    "Encaixe após recuperação",
  ],
};
