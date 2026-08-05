# Rastreamento Google Ads

## Consentimento e cobertura

O script base do Google Analytics 4 é carregado desde a entrada no site, mas o
Google Consent Mode v2 inicia `analytics_storage`, `ad_storage`, `ad_user_data`
e `ad_personalization` como `denied`. Se não houver interação com o banner em
cinco segundos, o site registra aceitação automática e atualiza análise e
publicidade para `granted`.

Antes da escolha do visitante, Google Ads, GTM, Clarity e a atribuição local
opcional não são carregados nem armazenados.

O visitante pode aceitar ou recusar separadamente:

- **Análise avançada da experiência:** Microsoft Clarity, pageviews e métricas
  detalhadas de navegação e formulário no Retiflow, além de cidade e região
  aproximadas disponibilizadas pelo Google Analytics.
- **Anúncios e conversões:** Google Ads, origem/campanha, identificadores de
  clique e conversões de WhatsApp, telefone e formulário.

Ao abrir `Configurar` no primeiro acesso, as opções facultativas começam
marcadas e o visitante pode desligar o que não deseja antes de salvar. O botão
`Privacidade`, no canto inferior esquerdo, permite alterar ou revogar a escolha.
A personalização de anúncios permanece desativada mesmo quando a medição de
anúncios é aceita.

Após a autorização correspondente, o site carrega uma única Google tag e
configura dois destinos:

- GA4 `G-HD00424MR7`.
- Google Ads `AW-18268630627`.

O GA4 recebe os eventos de comportamento e diagnóstico do funil. O Google Ads
recebe somente as ações que representam intenção real de contato:

| Evento do site | Conversão no Google Ads | Contagem |
| --- | --- | --- |
| `generate_lead` após formulário entregue | Lead - Envio de formulario | Uma por clique |
| `whatsapp_click` | Lead - Clique no WhatsApp | Uma por clique |
| `phone_click` | Lead - Clique no telefone | Uma por clique |

Pageviews, scroll, início do formulário, erros de validação, abandono e cliques
de navegação continuam disponíveis no GA4 sem inflar as conversões de lead.

## Deduplicação

Cada intenção de contato recebe um código anônimo no navegador, com validade de
30 minutos. Esse código é enviado como `transaction_id` para o Google Ads. Assim,
cliques repetidos na mesma ação durante a mesma intenção não viram várias
conversões.

O código não contém nome, e-mail, telefone ou outro dado pessoal.

## Atribuição

Com pelo menos uma categoria opcional autorizada, o site preserva por até 90
dias `utm_source`, `utm_medium`, `utm_campaign`, `utm_term` e `utm_content`.
`gclid`, `gbraid` e `wbraid` só são mantidos com autorização de anúncios. O
auto-tagging da conta do Google Ads deve permanecer ativado para que o `gclid`
seja anexado aos acessos vindos dos anúncios.

## Variáveis públicas

Os IDs abaixo são públicos porque também aparecem no JavaScript entregue ao
navegador:

```dotenv
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-HD00424MR7
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-18268630627
NEXT_PUBLIC_GOOGLE_ADS_FORM_SEND_TO=AW-18268630627/eRwrCNHCrsUcEOPclIdE
NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_SEND_TO=AW-18268630627/_YlRCKbTxMUcEOPclIdE
NEXT_PUBLIC_GOOGLE_ADS_PHONE_SEND_TO=AW-18268630627/qlmYCMS9ldYcEOPclIdE
```

Tokens OAuth, developer token e demais credenciais da API do Google Ads não
pertencem ao site e nunca devem ser versionados.

## Validação em produção

1. Em uma janela limpa, confirmar que o GA4 carrega e que Ads, GTM e Clarity
   permanecem bloqueados antes da escolha.
2. Recusar opcionais e confirmar que o GA4 continua medindo, sem scripts nem
   conversões de Ads e sem Clarity.
3. Aceitar apenas análise avançada e confirmar GA4/Clarity, sem conversões de
   Ads.
4. Aceitar anúncios e confirmar os destinos `G-HD00424MR7` e
   `AW-18268630627` no Tag Assistant.
5. Abrir páginas diferentes sem recarregar e verificar `page_view`.
6. Testar WhatsApp, telefone e um envio bem-sucedido do formulário.
7. Revogar as categorias opcionais e confirmar a atualização para `denied` e a
   remoção dos dados locais correspondentes.
8. Conferir os eventos no DebugView do GA4 e o diagnóstico das conversões no
   Google Ads. A interface do Ads pode levar algumas horas para refletir os
   primeiros eventos.

Conversões otimizadas para leads não estão ativadas nesta integração. Elas
exigem aceite dos termos de dados do cliente e um fluxo seguro de dados
primários/offline; não se deve enviar e-mail ou telefone sem essa preparação.
