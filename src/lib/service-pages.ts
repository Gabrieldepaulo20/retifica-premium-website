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
    metaTitle:
      "Retífica de Cabeçote em Sertãozinho e Ribeirão Preto",
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
    metaTitle:
      "Plaina de Cabeçote em Sertãozinho-SP | Correção de Empeno",
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
    metaTitle:
      "Banho Químico de Cabeçote em Sertãozinho-SP",
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
    metaTitle:
      "Cabeçote Trincado Tem Conserto? Teste de Trinca",
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
    metaTitle:
      "Montagem de Cabeçote e Regulagem em Sertãozinho-SP",
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
] as const satisfies readonly ServiceDetailPage[];

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
