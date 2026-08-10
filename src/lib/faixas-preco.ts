/**
 * Faixas de preço por tipo de serviço.
 *
 * TODAS apuradas sobre o histórico real da Retífica Premium no Retiflow em
 * 10/08/2026: 1.227 ordens de serviço registradas entre 21/08/2025 e
 * 07/08/2026, das quais 362 têm o serviço descrito no campo de defeito.
 *
 * Os valores são o intervalo entre o percentil 25 e o percentil 75 — ou seja,
 * a faixa onde caiu **metade** dos casos daquele serviço. Um quarto ficou
 * abaixo e um quarto acima. Não é tabela de preço e não substitui orçamento:
 * o valor final sai da medição da peça.
 *
 * | serviço                    | casos | P25     | mediana | P75     |
 * | -------------------------- | ----- | ------- | ------- | ------- |
 * | Retífica completa          |   201 |    680  |    850  |  1.060  |
 * | Plaina                     |    69 |    150  |    240  |    330  |
 * | Válvulas, sedes e guias    |    46 |    790  |  1.020  |  1.280  |
 * | Base de troca              |    33 |  1.600  |  1.800  |  2.000  |
 * | Trinca e solda             |    29 |    280  |    790  |    990  |
 *
 * "Montagem" ficou de fora: só 3 casos descritos, amostra pequena demais para
 * publicar faixa.
 *
 * Para atualizar: rodar a apuração sobre `Notas_de_Servico` e trocar os números
 * junto com `apuradoEm` e `casos`. Nunca ajustar "no olho".
 */

export const apuradoEm = "10/08/2026";

export type FaixaPreco = {
  id: string;
  /** Como a pessoa reconhece o serviço, não o nome técnico. */
  rotulo: string;
  /** Uma linha explicando quando é esse o caso. */
  quando: string;
  /** Limite inferior da faixa (percentil 25). */
  de: number;
  /** Limite superior da faixa (percentil 75). */
  ate: number;
  /** Quantas O.S. sustentam a faixa. Aparece na tela. */
  casos: number;
  /** Slug do serviço correspondente, quando houver página. */
  servico?: string;
};

export const faixasPreco: FaixaPreco[] = [
  {
    id: "completa",
    rotulo: "Retífica completa do cabeçote",
    quando: "O caso mais comum. Limpeza, medição, plaina, sedes, válvulas e guias conforme a peça precisar.",
    de: 680,
    ate: 1060,
    casos: 201,
    servico: "retifica-de-cabecote",
  },
  {
    id: "valvulas",
    rotulo: "Válvulas, sedes e guias",
    quando: "Quando a face está boa e o problema é vedação ou consumo de óleo.",
    de: 790,
    ate: 1280,
    casos: 46,
    servico: "retifica-de-cabecote",
  },
  {
    id: "plaina",
    rotulo: "Só a plaina",
    quando: "Cabeçote empenado, mas sem desgaste em sedes, guias ou válvulas.",
    de: 150,
    ate: 330,
    casos: 69,
    servico: "plaina-de-cabecote",
  },
  {
    id: "trinca",
    rotulo: "Teste de trinca e solda",
    quando: "O problema voltou depois de trocar a junta, ou já suspeitam de trinca.",
    de: 280,
    ate: 990,
    casos: 29,
    servico: "teste-de-trinca",
  },
  {
    id: "troca",
    rotulo: "Cabeçote base de troca",
    quando: "Quando a peça não tem recuperação segura e sai um cabeçote pronto no lugar.",
    de: 1600,
    ate: 2000,
    casos: 33,
  },
];

export const naoSei: FaixaPreco = {
  id: "nao-sei",
  rotulo: "Não sei o que meu motor precisa",
  quando: "A maioria chega assim. A gente mede a peça e diz — sem custo para você.",
  de: 0,
  ate: 0,
  casos: 0,
};

export function formatarReal(valor: number) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}
