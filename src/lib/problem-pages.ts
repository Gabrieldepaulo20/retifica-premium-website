export type ProblemDetailPage = {
  slug: string;
  title: string;
  shortTitle: string;
  metaTitle: string;
  metaDescription: string;
  hero: string;
  quickAnswer: string;
  warning: string;
  image: string;
  imageAlt: string;
  causes: Array<{
    title: string;
    description: string;
  }>;
  whatToDo: string[];
  diagnosis: string[];
  whenRectification: string;
  relatedServiceSlug: string;
  relatedGuideSlugs: string[];
  faq: Array<{
    question: string;
    answer: string;
  }>;
};

export const problemDetailPages = [
  {
    slug: "motor-fumando",
    title: "Motor fumando",
    shortTitle: "Motor fumando",
    metaTitle: "Motor Fumando: Cores da Fumaça, Causas e Diagnóstico",
    metaDescription:
      "Motor fumando com fumaça azul, branca ou preta? Veja causas prováveis, sinais de risco e quando cabeçote ou motor precisam de avaliação técnica.",
    hero: "Motor fumando: o que a cor da fumaça pode indicar?",
    quickAnswer:
      "Fumaça azul costuma estar relacionada à queima de óleo; fumaça branca persistente, depois de o motor aquecer, pode envolver líquido de arrefecimento; e fumaça preta geralmente aponta excesso de combustível. A cor ajuda a orientar o diagnóstico, mas não confirma sozinha qual peça está com defeito.",
    warning:
      "Pare em local seguro e procure avaliação se a fumaça vier acompanhada de superaquecimento, luz de óleo, perda forte de potência, ruído metálico ou queda rápida do nível de óleo ou do líquido de arrefecimento.",
    image: "/retificademotor.jpg",
    imageAlt: "Motor em avaliação para identificar a causa de fumaça no escapamento",
    causes: [
      {
        title: "Fumaça azul",
        description:
          "Indica que óleo pode estar entrando na câmara de combustão. Guias e retentores de válvula, anéis, cilindros e, quando houver, o turbo precisam ser avaliados.",
      },
      {
        title: "Fumaça branca persistente",
        description:
          "Vapor leve na partida a frio pode ser condensação. Fumaça densa que continua com o motor quente, especialmente com perda de líquido, pode envolver junta ou cabeçote.",
      },
      {
        title: "Fumaça preta",
        description:
          "Normalmente está ligada a mistura rica, injeção, ignição, sensores ou entrada de ar. É um cenário que nem sempre exige serviço de retífica.",
      },
      {
        title: "Fumaça no cofre do motor",
        description:
          "Quando a fumaça não sai pelo escapamento, pode haver óleo ou outro fluido vazando sobre uma superfície quente. O ponto do vazamento deve ser localizado antes de rodar.",
      },
    ],
    whatToDo: [
      "Observe se a fumaça sai do escapamento ou do cofre e em qual momento ela aparece.",
      "Com o motor frio e em piso plano, confira os níveis conforme o manual do veículo.",
      "Não tente mascarar o sintoma com aditivo ou óleo mais grosso antes do diagnóstico.",
      "Registre a cor, o cheiro, a duração e outros sinais para ajudar a oficina na avaliação.",
    ],
    diagnosis: [
      "histórico de consumo de óleo e líquido de arrefecimento",
      "vazamentos externos e sistema de ventilação do cárter",
      "compressão, vedação de cilindros e condição das velas",
      "guias, retentores, válvulas, junta e superfície do cabeçote",
    ],
    whenRectification:
      "A Retífica Premium atua na retífica de cabeçote: guias, retentores de válvula, vedação e superfície. Quando o diagnóstico confirma desgaste ou empeno nesses pontos, o reparo é com a gente. Se a causa estiver na parte inferior do motor — anéis, cilindros ou bloco —, ou em injeção, ignição e vazamento externo, esse reparo fica fora do que fazemos, e o diagnóstico é o que aponta o caminho certo.",
    relatedServiceSlug: "retifica-de-cabecote",
    relatedGuideSlugs: ["motor-baixando-oleo", "motor-superaquecendo"],
    faq: [
      {
        question: "Motor fumando sempre precisa de retífica?",
        answer:
          "Não. A fumaça pode vir de injeção, ignição, condensação, vazamento externo, retentores, guias, anéis, junta ou outros componentes. A retífica só deve ser indicada após inspeção e medição.",
      },
      {
        question: "Fumaça branca significa junta do cabeçote queimada?",
        answer:
          "Não necessariamente. Vapor curto na partida pode ser normal. Fumaça branca persistente com perda de líquido, superaquecimento ou falha de funcionamento aumenta a suspeita e exige testes.",
      },
      {
        question: "Posso continuar andando com o motor soltando fumaça azul?",
        answer:
          "O risco depende da intensidade e dos outros sintomas, mas continuar rodando pode baixar o nível de óleo e ampliar o desgaste. Confira o nível com segurança e providencie avaliação o quanto antes.",
      },
    ],
  },
  {
    slug: "motor-baixando-oleo",
    title: "Motor baixando óleo",
    shortTitle: "Motor baixando óleo",
    metaTitle: "Motor Baixando Óleo: Causas, Riscos e o Que Fazer",
    metaDescription:
      "Óleo do motor baixando rápido, com ou sem fumaça? Entenda vazamentos, queima de óleo, desgaste interno e quando procurar diagnóstico técnico.",
    hero: "Motor baixando óleo: onde o lubrificante pode estar indo?",
    quickAnswer:
      "O nível pode baixar por vazamento externo, queima de óleo dentro do motor, falha na ventilação do cárter ou desgaste em vedações e componentes internos. Algum consumo pode ser previsto pelo fabricante, mas quedas frequentes ou aceleradas precisam ser comparadas com o manual e investigadas.",
    warning:
      "Se a luz de pressão do óleo acender, pare em local seguro e desligue o motor. Rodar sem lubrificação adequada pode causar dano grave em poucos minutos. Não confunda essa luz com um simples lembrete de troca.",
    image: "/montagemdemotores.jpg",
    imageAlt: "Motor em bancada para diagnóstico de consumo e perda de óleo",
    causes: [
      {
        title: "Vazamento externo",
        description:
          "Juntas, retentores, cárter, filtro, bujão e mangueiras podem deixar marcas no motor, protetor ou piso. Alguns vazamentos só aparecem com o sistema quente e pressurizado.",
      },
      {
        title: "Óleo sendo queimado",
        description:
          "Quando o óleo entra na combustão, pode surgir fumaça azul. Retentores e guias de válvula, anéis e cilindros estão entre os pontos que precisam de teste.",
      },
      {
        title: "Ventilação do cárter",
        description:
          "Falhas na ventilação podem alterar a pressão interna, favorecer vazamentos ou levar óleo para a admissão. É uma verificação importante antes de condenar o motor.",
      },
      {
        title: "Medição incorreta",
        description:
          "Inclinação do carro, motor recém-desligado ou procedimento diferente do manual podem distorcer a leitura. A comparação precisa ser feita sempre do mesmo jeito.",
      },
    ],
    whatToDo: [
      "Consulte no manual o procedimento e a faixa correta da vareta.",
      "Anote quilometragem, data e quantidade adicionada para medir a velocidade da perda.",
      "Procure manchas no piso e sinais de óleo ao redor do motor, sem tocar em partes quentes.",
      "Observe fumaça no escapamento, cheiro de óleo queimado, falhas e perda de potência.",
    ],
    diagnosis: [
      "medição repetida do nível e histórico de reposição",
      "vazamentos em juntas, retentores, cárter, filtro e linhas",
      "ventilação do cárter e presença de óleo na admissão",
      "compressão, cilindros, anéis, guias e retentores de válvula",
    ],
    whenRectification:
      "A Retífica Premium faz a retífica do cabeçote: guias, retentores de válvula e superfície de vedação. Se o teste confirmar desgaste nesses pontos, o reparo é com a gente. Quando a causa está em anéis, cilindros ou outro componente da parte inferior do motor, ou em vazamentos externos e falhas de ventilação, o reparo é de outra natureza — o diagnóstico aponta o caminho certo antes de fechar o serviço.",
    relatedServiceSlug: "retifica-de-cabecote",
    relatedGuideSlugs: ["motor-fumando", "junta-do-cabecote-queimada"],
    faq: [
      {
        question: "Motor pode baixar óleo sem soltar fumaça visível?",
        answer:
          "Sim. Pode existir vazamento externo pequeno, queima discreta, problema na ventilação do cárter ou fumaça difícil de perceber em certas condições. O histórico de reposição ajuda no diagnóstico.",
      },
      {
        question: "Óleo baixando pode ser problema no cabeçote?",
        answer:
          "Pode, principalmente quando guias ou retentores de válvula estão desgastados. Também pode envolver anéis, cilindros, vazamentos e outros componentes, por isso não é possível concluir apenas pela vareta.",
      },
      {
        question: "Usar óleo mais grosso resolve consumo de óleo?",
        answer:
          "Não é uma correção segura por conta própria. A viscosidade precisa seguir a especificação do fabricante. Alterá-la para esconder consumo pode prejudicar lubrificação e atrasar o diagnóstico.",
      },
    ],
  },
  {
    slug: "motor-superaquecendo",
    title: "Motor superaquecendo",
    shortTitle: "Motor superaquecendo",
    metaTitle: "Motor Superaquecendo: Causas e Quando Parar o Carro",
    metaDescription:
      "Temperatura do motor subindo ou luz acesa? Veja causas de superaquecimento, o que fazer com segurança e quando cabeçote e junta precisam de avaliação.",
    hero: "Motor superaquecendo: pare antes que o cabeçote seja danificado",
    quickAnswer:
      "Superaquecimento pode começar por perda de líquido, ventoinha, válvula termostática, bomba d'água, radiador, tampa, ar no sistema ou lubrificação insuficiente. Continuar rodando pode empenar o cabeçote, comprometer a junta e transformar uma falha do arrefecimento em um reparo maior.",
    warning:
      "Se o marcador entrar na zona crítica, surgir alerta de temperatura ou houver vapor, pare em local seguro e desligue o motor. Não abra a tampa do reservatório ou radiador enquanto o sistema estiver quente e pressurizado.",
    image: "/cabecote.webp",
    imageAlt: "Cabeçote em avaliação após episódio de superaquecimento do motor",
    causes: [
      {
        title: "Perda de líquido",
        description:
          "Mangueiras, conexões, radiador, reservatório, bomba e juntas podem vazar. A reposição frequente sem localizar a causa não é uma solução.",
      },
      {
        title: "Ventoinha ou circulação",
        description:
          "Falha de ventoinha, sensor, relé, válvula termostática ou bomba d'água reduz a capacidade de retirar calor, sobretudo no trânsito ou sob carga.",
      },
      {
        title: "Radiador e fluido",
        description:
          "Obstrução, sujeira, tampa inadequada, mistura incorreta ou ar preso no sistema podem comprometer troca térmica e pressão de funcionamento.",
      },
      {
        title: "Junta ou cabeçote",
        description:
          "Falha de vedação pode pressurizar o sistema, misturar fluidos e causar novo aquecimento. O episódio de calor também pode empenar ou trincar a peça.",
      },
    ],
    whatToDo: [
      "Pare com segurança, desligue o motor e aguarde o conjunto esfriar.",
      "Não jogue água fria no motor quente e não abra o sistema pressurizado.",
      "Se houve vapor, perda de líquido ou alerta crítico, prefira remoção por guincho.",
      "Informe à oficina quando aqueceu, quanto tempo rodou e se o nível baixou.",
    ],
    diagnosis: [
      "estanqueidade e pressão do sistema de arrefecimento",
      "ventoinha, sensores, válvula termostática, bomba e radiador",
      "presença de gases, contaminação ou perda interna de líquido",
      "empeno, trincas, superfície e vedação do cabeçote",
    ],
    whenRectification:
      "A retífica pode ser necessária se o calor causou empeno, trinca, perda de vedação ou dano em sedes e válvulas. Se o cabeçote estiver dentro das medidas, o reparo deve se concentrar na causa do arrefecimento. Plainar sem medir ou trocar apenas a junta pode fazer o defeito voltar.",
    relatedServiceSlug: "retifica-de-cabecote",
    relatedGuideSlugs: ["junta-do-cabecote-queimada", "motor-fumando"],
    faq: [
      {
        question: "Posso abrir o reservatório quando o motor ferve?",
        answer:
          "Não enquanto estiver quente. O sistema pode estar pressurizado e liberar líquido ou vapor em alta temperatura. Aguarde esfriar completamente e siga o procedimento do fabricante.",
      },
      {
        question: "Todo superaquecimento queima a junta do cabeçote?",
        answer:
          "Não, mas o risco aumenta com temperatura, duração e repetição do evento. Testes de vedação, pressão e planicidade ajudam a saber se houve dano.",
      },
      {
        question: "Trocar a junta resolve motor superaquecendo?",
        answer:
          "Somente se a junta fizer parte da causa e os demais componentes estiverem corretos. É preciso verificar arrefecimento, superfície do bloco e cabeçote, empeno e condições de montagem.",
      },
    ],
  },
  {
    slug: "junta-do-cabecote-queimada",
    title: "Junta do cabeçote queimada",
    shortTitle: "Junta do cabeçote queimada",
    metaTitle: "Junta do Cabeçote Queimada: Sintomas e Diagnóstico",
    metaDescription:
      "Veja sintomas de junta do cabeçote queimada, testes usados no diagnóstico e quando é preciso plainar ou retificar o cabeçote antes da montagem.",
    hero: "Junta do cabeçote queimada: sintomas não substituem os testes",
    quickAnswer:
      "Superaquecimento, perda de líquido sem vazamento aparente, fumaça branca persistente, falha de compressão e mistura entre óleo e líquido são sinais compatíveis com falha da junta. Nenhum deles, isoladamente, confirma o diagnóstico; outros defeitos podem produzir sintomas parecidos.",
    warning:
      "Não continue rodando se houver superaquecimento, pressão anormal, óleo contaminado ou perda rápida de líquido. A falha de vedação pode ampliar o dano no cabeçote, no bloco e na lubrificação.",
    image: "/cabecotefundo.jpg",
    imageAlt: "Cabeçote desmontado para inspeção de junta, vedação e empeno",
    causes: [
      {
        title: "Superaquecimento anterior",
        description:
          "Temperatura excessiva pode deformar as superfícies e perder a pressão de vedação da junta. A causa inicial do aquecimento também precisa ser corrigida.",
      },
      {
        title: "Superfície fora de medida",
        description:
          "Empeno, acabamento inadequado, corrosão ou trinca impedem a vedação correta, mesmo com uma junta nova.",
      },
      {
        title: "Montagem incorreta",
        description:
          "Sequência, torque, parafusos, limpeza e especificação da junta influenciam diretamente a vedação do conjunto.",
      },
      {
        title: "Falha no arrefecimento",
        description:
          "Radiador, bomba, ventoinha, válvula termostática, tampa e vazamentos devem ser verificados para evitar uma nova queima.",
      },
    ],
    whatToDo: [
      "Pare o veículo se a temperatura subir ou houver alerta no painel.",
      "Não abra o sistema quente e não use vedante para tentar adiar o reparo.",
      "Leve o histórico do superaquecimento e dos níveis de óleo e líquido à oficina.",
      "Peça que bloco, cabeçote e causa do arrefecimento sejam avaliados antes da montagem.",
    ],
    diagnosis: [
      "pressão do sistema e presença de vazamentos internos ou externos",
      "compressão, vedação dos cilindros e gases no arrefecimento",
      "mistura ou contaminação entre óleo e líquido",
      "planicidade, acabamento, trincas e medidas do cabeçote",
    ],
    whenRectification:
      "Trocar somente a junta pode ser insuficiente. O cabeçote deve ser limpo, inspecionado e medido; plaina ou outro reparo só entra quando o estado e as tolerâncias da peça exigem. Também é indispensável corrigir a origem do superaquecimento e seguir a montagem especificada.",
    relatedServiceSlug: "retifica-de-cabecote",
    relatedGuideSlugs: ["motor-superaquecendo", "motor-baixando-oleo"],
    faq: [
      {
        question: "Como ter certeza de que a junta do cabeçote queimou?",
        answer:
          "A confirmação combina sintomas com testes de pressão, vedação, compressão, gases no sistema e inspeção das peças. Apenas olhar fumaça ou tampa do óleo pode levar a diagnóstico errado.",
      },
      {
        question: "Quando a junta queima sempre precisa plainar o cabeçote?",
        answer:
          "Não. A superfície deve ser medida e comparada às tolerâncias aplicáveis. A plaina só é indicada quando há empeno ou acabamento que precisa ser corrigido e ainda existe margem segura.",
      },
      {
        question: "Posso andar com a junta do cabeçote queimada?",
        answer:
          "Não é recomendado. Há risco de superaquecimento, contaminação do óleo, perda de compressão e aumento do dano. O caminho mais seguro é interromper o uso e avaliar o veículo.",
      },
    ],
  },
] as const satisfies readonly ProblemDetailPage[];

export type ProblemDetailPageEntry = (typeof problemDetailPages)[number];

export const problemDetailPagesBySlug: ReadonlyMap<
  string,
  ProblemDetailPageEntry
> = new Map(problemDetailPages.map((page) => [page.slug, page]));

export function getProblemPageBySlug(slug: string) {
  return problemDetailPagesBySlug.get(slug);
}

export function problemPath(slug: string) {
  return `/problemas/${slug}`;
}
