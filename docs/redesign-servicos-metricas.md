# Mensuração de /servicos

Todos os eventos usam os componentes de rastreamento que já existiam
(`TrackedWhatsAppLink`, `TrackedPhoneLink`, `TrackedServiceLink`,
`TrackedCtaLink`). Nenhuma medição anterior foi quebrada e nenhum evento é
disparado duas vezes.

Atualizado em 10/08/2026.

---

## Princípio

**Clique não é venda.** Cada evento abaixo mede *intenção de contato* — a pessoa
abriu a conversa. Quantos viraram cliente só é possível saber vinculando o lead
à ordem de serviço no Retiflow, o que hoje não está sendo feito
(`Marketing_Client_Attributions` está vazia). Enquanto isso não existir, não
trate nenhum número desta página como receita.

---

## Eventos por seção

### Primeira tela

| Evento | O que mede |
| --- | --- |
| `servicos_hero_whatsapp` | CTA principal — pessoa decidida |
| `servicos_hero_phone` | Prefere ligar. Historicamente converte melhor em anúncio |
| `servicos_hero_atalho_fumaca` | Atalho: soltando fumaça |
| `servicos_hero_atalho_oleo` | Atalho: bebendo óleo |
| `servicos_hero_atalho_aquecendo` | Atalho: esquentando |
| `servicos_hero_atalho_agua_oleo` | Atalho: água com óleo |
| `servicos_hero_atalho_trinca` | Atalho: cabeçote trincado |
| `servicos_hero_atalho_outro` | Atalho: outro problema |

**O que os atalhos respondem:** qual sintoma traz mais gente. É a informação que
hoje não existe em lugar nenhum e que orienta tanto a campanha quanto o conteúdo
das páginas de problema.

### Sintomas

| Evento | O que mede |
| --- | --- |
| `servicos_sintoma_motor_fumando_whatsapp` | Contato direto pelo sintoma |
| `servicos_sintoma_baixando_oleo_whatsapp` | idem |
| `servicos_sintoma_superaquecendo_whatsapp` | idem |
| `servicos_sintoma_junta_queimada_whatsapp` | idem |
| `servicos_sintoma_trincado_whatsapp` | idem |
| `servicos_sintoma_outro_whatsapp` | Sintoma fora da lista — vale ler o que chega |

Os títulos de sintoma também são links para `/problemas/[slug]`. A navegação
entre páginas é medida pelo GA4; o que interessa cruzar é **quem foi para a
página de problema e voltou para converter**.

### Preço, prazo e garantia

| Evento | O que mede |
| --- | --- |
| `servicos_ppg_whatsapp` | Converteu depois de ver preço/prazo/garantia |
| `servicos_ppg_phone` | idem, por telefone |

**Hipótese a testar:** 13,9% das impressões da campanha são busca por preço e
convertiam zero. Se este evento crescer, a hipótese se confirma.

### Teste de trinca

| Evento | O que mede |
| --- | --- |
| `servicos_trinca_whatsapp` | Contato motivado pelo diferencial técnico |
| `servicos_trinca_video` | Play no vídeo, quando existir |

### Cards de serviço

Um par de eventos por serviço, cinco serviços:

| Evento | O que mede |
| --- | --- |
| `servicos_card_retifica-de-cabecote_whatsapp` | Orçamento direto do card |
| `servicos_card_plaina-de-cabecote_whatsapp` | idem |
| `servicos_card_banho-quimico_whatsapp` | idem |
| `servicos_card_teste-de-trinca_whatsapp` | idem |
| `servicos_card_montagem-de-cabecote_whatsapp` | idem |
| `servicos_card_<slug>_video` | Play no vídeo do card, quando existir |

O botão "Ver serviço completo" usa `TrackedServiceLink`, que já registra o nome
do serviço — é assim que se mede **qual serviço puxa navegação** para a página
de detalhe.

### Oficinas, fechamento

| Evento | O que mede |
| --- | --- |
| `servicos_b2b_cta` | Interesse B2B — vai para `/b2b` |
| `servicos_b2b_whatsapp` | Contato B2B direto |
| `servicos_final_whatsapp` | Converteu depois de ler a página inteira |
| `servicos_final_phone` | idem, por telefone |

---

## Total: 26 eventos distintos

O que dá para responder com eles, e não dava antes:

1. **Qual sintoma traz mais gente** — os seis atalhos
2. **Em que altura da página a pessoa decide** — hero, preço, trinca, card ou fim
3. **Qual serviço puxa mais orçamento** — cinco eventos de card
4. **Se responder preço aumenta contato** — `servicos_ppg_*`
5. **Se o teste de trinca converte sozinho** — `servicos_trinca_whatsapp`
6. **WhatsApp × telefone**, por posição na página

---

## Como acompanhar

O snapshot já existente cobre a página:

```bash
node ~/Documents/RetificaPremium/retiflow/tmp/snapshot-crescimento.mjs 14
node ~/Documents/RetificaPremium/retiflow/tmp/comparar-snapshots.mjs
```

Registre a publicação em `tmp/marcos.json` — sem isso a comparação não vai saber
separar o efeito da página do efeito das mudanças de campanha.

---

## Depois de publicar

- **Reindexar `/servicos` no Search Console.** A estrutura mudou por completo.
- **Conferir no GA4** se os 26 eventos aparecem em até 24h.
- **Não configurar como conversão no Google Ads** ainda. Os eventos de sintoma e
  de card são de navegação e de intenção, não de lead confirmado. Misturar isso
  com as conversões atuais estraga a otimização que acabou de ser limpa.
- Só considerar promover um deles a conversão depois de ver volume real.
