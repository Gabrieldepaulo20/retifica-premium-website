import type { NumeroProva } from "@/components/site/NumerosProva";

/**
 * Números de prova social.
 *
 * TODOS conferidos contra o banco do Retiflow em 09/08/2026 — nenhum é
 * arredondamento otimista. Se algum mudar, atualize aqui e a fonte junto.
 *
 * | número                  | fonte                                                  |
 * | ----------------------- | ------------------------------------------------------ |
 * | 1.200+ serviços         | 1.227 O.S. registradas entre 21/08/2025 e 07/08/2026   |
 * | 180+ clientes           | 182 clientes cadastrados                               |
 * | 22 anos                 | fundação em 2004 (siteConfig.foundingDate)             |
 * | 2h para o orçamento     | compromisso operacional publicado no site              |
 * | 6 meses de garantia     | confirmado pela proprietária em 10/08/2026             |
 *
 * Atenção ao redigir: são "serviços", não "cabeçotes". A base inclui plaina de
 * bloco, cabeçote a base de troca e outros. Dizer "1.200 cabeçotes retificados"
 * seria exagero — e exagero em número é o tipo de coisa que derruba a confiança
 * quando alguém confere.
 */
export const numerosProva: NumeroProva[] = [
  { valor: 1200, prefixo: "+", rotulo: "serviços nos últimos 12 meses" },
  { valor: 180, prefixo: "+", rotulo: "clientes e oficinas atendidos" },
  { valor: 22, rotulo: "anos de oficina" },
  { valor: 6, sufixo: " meses", rotulo: "de garantia no serviço" },
];
