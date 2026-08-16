import type { NumeroProva } from "@/components/site/NumerosProva";

/**
 * Números de prova social.
 *
 * TODOS conferidos contra o banco do Retiflow em 09/08/2026 — nenhum é
 * arredondamento otimista. Se algum mudar, atualize aqui e a fonte junto.
 *
 * | número                  | fonte                                                  |
 * | ----------------------- | ------------------------------------------------------ |
 * | 1.200+ O.S. registradas | 1.227 O.S. registradas entre 21/08/2025 e 07/08/2026   |
 * | 180+ cadastros          | 182 clientes cadastrados                               |
 * | 22 anos                 | fundação em 2004 (siteConfig.foundingDate)             |
 * | 3 meses de garantia     | confirmado pela proprietária em 10/08/2026             |
 *
 * Atenção ao redigir: a fonte comprova O.S. registradas e cadastros, não
 * conclusão de serviço nem atendimento. A base inclui plaina de bloco,
 * cabeçote a base de troca e outros. Não ampliar o significado desses dados.
 */
export const numerosProva: NumeroProva[] = [
  { valor: 1200, prefixo: "+", rotulo: "O.S. registradas nos últimos 12 meses" },
  { valor: 180, prefixo: "+", rotulo: "clientes cadastrados" },
  { valor: 22, rotulo: "anos de oficina" },
  { valor: 6, sufixo: " meses", rotulo: "de garantia no serviço" },
];
