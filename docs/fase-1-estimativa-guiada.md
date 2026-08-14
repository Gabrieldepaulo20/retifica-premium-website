# Fase 1 — estimativa guiada e mensuração

## O que está ativo no código

- `/quanto-custa` usa a triagem guiada de sete etapas e não publica preço.
- O resultado é determinístico, não confirma diagnóstico e prepara o resumo para o WhatsApp.
- As respostas ficam apenas no `sessionStorage` por até 24 horas para permitir retomada e funcionamento durante uma queda de conexão.
- O catálogo de `/servicos` dá acesso aos dez serviços canônicos.
- Há páginas detalhadas novas para sedes e válvulas, guias e usinagem de roscas.
- Cookies opcionais começam desligados e não existe aceite por tempo ou continuação da navegação.

## Experimento da primeira dobra

O site não sorteia variante nem cria cookie de teste. A divisão deve ser feita no Google Ads e identificada pela URL.

- Controle: `/servicos?experiment_id=services-hero-v1&variant_id=whatsapp_direct`
- Tratamento: `/servicos?experiment_id=services-hero-v1&variant_id=guided_v1`
- Sem parâmetro: usa o controle com WhatsApp direto.

Manter campanha, público, orçamento, título e página iguais. Alterar somente a ação principal.

## Eventos

Eventos implementados nesta fase:

- `engagement_5s` e `engagement_10s` contam tempo com a aba visível.
- `cta_impression` e `cta_click` medem a primeira dobra do experimento.
- `quiz_start`, `quiz_flow_selected`, `quiz_option_selected`, `quiz_field_interaction`, `quiz_step_view`, `quiz_step_complete`, `quiz_continue_blocked`, `quiz_unknown_selected`, `quiz_back`, `quiz_reset`, `quiz_file_intent`, `quiz_result_view`, `quiz_estimate_state`, `quiz_whatsapp_prepared` e `quiz_whatsapp_click` medem o funil.
- Opções categóricas usam apenas IDs estáveis; campos digitáveis registram somente o primeiro foco e nunca copiam marca, modelo, cidade, diagnóstico ou outro texto livre para GA4/Retiflow.

Parâmetros usados quando aplicáveis: `experiment_id`, `variant_id`, `component_id`, `position`, `page_type`, `service_id`, `flow_type`, `step_id` e `estimate_state`.

Nenhum desses eventos recebe nome, telefone, relato livre, veículo completo ou conteúdo de arquivo. GA4, Google Ads, Clarity e os eventos próprios de marketing ficam desligados até uma escolha de consentimento.

## Pendente antes da fase 2

- Auditar ordens por item de serviço, separando peças, produtos, frete e descontos.
- Apresentar e aprovar migration, RLS, Edge Function e tabela privada no Retiflow.
- Configurar `quiz_whatsapp_click` como conversão secundária no Google Ads.
- Só tornar lead qualificado, orçamento e O.S. aprovada conversões primárias depois de validar a ligação site → Retiflow → Google Ads.
- Produzir foto real de medição e vídeo real do teste de trinca; os espaços reservados não devem ser confundidos com prova documental.
