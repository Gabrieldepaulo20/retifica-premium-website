# Rastreamento Google Ads

## Cobertura

O layout raiz carrega uma única Google tag em todas as páginas e configura dois
destinos:

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

O site preserva `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`,
`utm_content`, `gclid`, `gbraid` e `wbraid`. O auto-tagging da conta do Google
Ads deve permanecer ativado para que o `gclid` seja anexado aos acessos vindos
dos anúncios.

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

1. Abrir o Tag Assistant no domínio de produção.
2. Confirmar os destinos `G-HD00424MR7` e `AW-18268630627`.
3. Abrir páginas diferentes sem recarregar e verificar `page_view`.
4. Testar WhatsApp, telefone e um envio bem-sucedido do formulário.
5. Conferir os eventos no DebugView do GA4 e o diagnóstico das conversões no
   Google Ads. A interface do Ads pode levar algumas horas para refletir os
   primeiros eventos.

Conversões otimizadas para leads não estão ativadas nesta integração. Elas
exigem aceite dos termos de dados do cliente e um fluxo seguro de dados
primários/offline; não se deve enviar e-mail ou telefone sem essa preparação.
