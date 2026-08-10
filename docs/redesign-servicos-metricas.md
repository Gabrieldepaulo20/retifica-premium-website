# Mensuração de `/servicos`

Atualizado em 10/08/2026. Contrato: `site-events-v2`.

## Princípio

**Clique não é contato confirmado e contato não é venda.** `whatsapp_click` e
`phone_click` medem intenção. A leitura comercial só fecha quando o Retiflow
relaciona lead qualificado, orçamento e O.S. aprovada à sessão.

Não criar um nome de evento para cada botão. Os eventos são canônicos e os
detalhes ficam nos parâmetros:

- `component_id`: componente estável;
- `position`: hero, catálogo, conteúdo, fechamento ou flutuante;
- `page_type`: `service_catalog`, `service_detail`, `problem` ou `estimate`;
- `service_id`: slug canônico quando houver serviço;
- `destination_type` e `destination_path`: tipo e pathname relativo do destino,
  sem query, mensagem ou número de telefone;
- `experiment_id` e `variant_id`: teste da primeira dobra;
- `flow_type`, `step_id` e `estimate_state`: estimativa guiada.

## Mapa de cliques

| Intenção | Evento | `component_id` recomendado |
| --- | --- | --- |
| CTA principal do hero | `cta_click` + evento do canal | `hero_whatsapp`, `hero_phone` ou `hero_guided_estimate` |
| Atalho por sintoma | `cta_click` | `symptom_<slug>` |
| Abrir serviço | `service_detail_click` | `service_<slug>` |
| WhatsApp em um serviço | `whatsapp_click` | `service_<slug>_whatsapp` |
| Telefone | `phone_click` | identificador do bloco |
| Direção no mapa | `directions_click` | `location_directions` |
| Resultado da estimativa | `quiz_result_view` | `guided_estimate_result` |
| WhatsApp após estimativa | `quiz_whatsapp_click` e `whatsapp_click` | `guided_estimate_whatsapp` |

Quando um botão é CTA e também abre um canal, os dois sinais podem existir:
`cta_click` explica a variante/posição e `whatsapp_click` ou `phone_click`
explica a intenção de contato. Eles não devem virar duas conversões no Ads.

## Funil

1. `page_view`
2. `engagement_5s`
3. `engagement_10s`
4. `cta_impression`
5. `cta_click` ou `quiz_start`
6. `quiz_step_view` / `quiz_step_complete`
7. `quiz_result_view`
8. `quiz_whatsapp_click`
9. `whatsapp_click`, `phone_click` ou `generate_lead`
10. `qualified_lead`, orçamento e O.S. aprovada no Retiflow

Relatar taxas por sessão/visitante, não quantidade bruta de eventos. Separar
host de produção, origem, dispositivo e variante. Localhost e previews ficam
bloqueados por padrão; em smoke test autorizado são marcados com `environment`.

## Destinos

- Retiflow: jornada consentida, página, componente, posição, variante, origem,
  dispositivo e desfecho comercial quando vinculado;
- GA4: funil e análise por origem/variante;
- Clarity: gravações/mapas com consentimento de análise;
- Google Ads: somente `whatsapp_click`, `phone_click`, `generate_lead` e chamada
  dinâmica configurada. Microeventos não são conversões.

Nome, telefone, texto livre, mensagem de WhatsApp e veículo completo não são
parâmetros do GA4, Ads ou Clarity. A query de `link_url` é removida no helper
central e o endpoint do site repete a sanitização antes de encaminhar eventos.

## Depois de publicar

- registrar a revisão/marco e o horário do deploy;
- executar smoke test site → Retiflow → GA4;
- validar deduplicação por `transaction_id`;
- conferir abandono por etapa e clique por `component_id`;
- manter as conversões atuais e a estratégia de lance durante a validação;
- solicitar nova indexação de `/servicos` apenas depois de confirmar resposta
  200, canonical próprio e sitemap publicado.
