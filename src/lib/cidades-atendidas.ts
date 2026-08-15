/**
 * Cidades atendidas pela Retífica Premium.
 *
 * IMPORTANTE — o que estas páginas são e o que NÃO são.
 *
 * A retífica tem UMA oficina, em Sertãozinho. Estas páginas não são unidades
 * locais e não podem ser escritas como se fossem: página de cidade sem
 * operação na cidade é o que o Google chama de doorway page, é penalizada, e
 * é enganosa com quem procura.
 *
 * O que elas são: páginas de ÁREA DE ATENDIMENTO. O endereço é sempre
 * Sertãozinho, a distância aparece explícita, e o serviço vendido é a
 * ida e volta da peça — buscamos o cabeçote na cidade da pessoa, conferimos,
 * devolvemos. É isso que faz alguém de Pontal ou Jaboticabal confiar em
 * mandar a peça para outra cidade.
 *
 * Cada página precisa de conteúdo que realmente diferencia. Distância e rota
 * mudam de cidade para cidade; o resto do texto não deve ser repetido palavra
 * por palavra entre elas.
 *
 * REGRA: `contexto` só pode afirmar o que a retífica confirmou. Prazo de
 * prazo para buscar a peça, rota e preço por cidade NÃO estão confirmados e
 * não devem ser prometidos aqui.
 */

export type CidadeAtendida = {
  slug: string;
  nome: string;
  /** Distância rodoviária aproximada até a oficina, em km. Verificada. */
  distanciaKm: number;
  /** Referência de rota, para o texto não ficar genérico. */
  rota: string;
  /** O que diferencia o atendimento nesta cidade. */
  contexto: string;
};

export const cidadesAtendidas: CidadeAtendida[] = [
  {
    slug: "pontal",
    nome: "Pontal",
    distanciaKm: 18,
    rota: "pela SP-322, sentido Sertãozinho",
    contexto:
      "Pontal é uma das cidades mais próximas da oficina. Combinamos no WhatsApp o dia de buscar a peça.",
  },
  {
    slug: "barrinha",
    nome: "Barrinha",
    distanciaKm: 22,
    rota: "pela SP-322",
    contexto:
      "Barrinha fica no mesmo eixo de Pontal e Sertãozinho. Combinamos no WhatsApp o dia de buscar a peça.",
  },
  {
    slug: "pitangueiras",
    nome: "Pitangueiras",
    distanciaKm: 33,
    rota: "pela SP-322 e SP-333",
    contexto:
      "Combinamos no WhatsApp o dia de buscar a peça. Oficinas e frotas têm condição própria, tratada caso a caso.",
  },
  {
    slug: "jaboticabal",
    nome: "Jaboticabal",
    distanciaKm: 42,
    rota: "pela SP-326",
    contexto:
      "Jaboticabal é a cidade mais distante desta lista. Combinamos no WhatsApp o dia de buscar a peça.",
  },
];

export function getCidadePorSlug(slug: string) {
  return cidadesAtendidas.find((cidade) => cidade.slug === slug) ?? null;
}

export function caminhoCidade(slug: string) {
  return `/retifica-em/${slug}`;
}
