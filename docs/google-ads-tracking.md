# Mensuração, consentimento e Google Ads

Atualizado em 10/08/2026.

## Regra de carregamento

No primeiro acesso, análise e publicidade começam desligadas. O HTML inicial
declara o Consent Mode como `denied`, mas **não faz requisição de mensuração
para Google Analytics, Google Ads ou Microsoft Clarity**.
Os scripts externos só são
adicionados depois de uma escolha explícita compatível:

- análise: GA4 e Clarity;
- publicidade: Google Ads e medição de chamadas;
- rejeição: nenhum desses provedores é carregado.

Não existe aceite por tempo, rolagem ou continuação da navegação. Uma decisão
salva continua válida por até 180 dias e pode ser revista pelo link
`Privacidade e cookies` no rodapé.

O armazenamento essencial guarda somente a preferência e recursos solicitados
pelo visitante, como a retomada da estimativa. Ele não cria uma sessão de
marketing antes da autorização. Até existir uma base legal documentada para
outro desenho, a cobertura de jornada do Retiflow deve ser publicada como
**sessões consentidas**, nunca como todo o tráfego.

## Categorias e destinos

### Análise avançada

Com análise autorizada:

- GA4 `G-HD00424MR7` recebe eventos de página e funil;
- Clarity recebe gravações e mapas compatíveis com a escolha;
- o Retiflow recebe a jornada pseudonimizada da sessão.

Cidade e região do GA4 são estimativas aproximadas e agregadas do provedor.
Não correspondem a GPS e não servem para localizar uma pessoa. Uma cidade
informada explicitamente pelo visitante pode usar `visitor_city`; esse campo é
reservado ao Retiflow e é descartado do payload enviado ao Google.

### Anúncios e conversões

Com publicidade autorizada:

- origem, campanha e identificadores de clique podem ser preservados;
- Google Ads recebe apenas as conversões configuradas abaixo;
- se análise estiver desligada, eventos de navegação não são enviados ao GA4
  nem ao Retiflow; somente intenções de contato necessárias à atribuição são
  espelhadas.

A personalização de anúncios permanece desativada.

| Evento canônico | Ação do Google Ads | Interpretação |
| --- | --- | --- |
| `generate_lead` | Lead - Envio de formulário | Formulário recebido pelo backend |
| `whatsapp_click` | Lead - Clique no WhatsApp | Intenção; não confirma mensagem enviada |
| `phone_click` | Lead - Clique no telefone | Intenção; não confirma ligação atendida |
| Ligação dinâmica | Lead - Ligação atendida pelo site (30s) | Depende do relatório de chamadas do Google |

`transaction_id` aceita somente o código anônimo `RP-*`. A sessão de medição é
rotacionada após 30 minutos sem eventos, sem transformar o código em um dado
pessoal. Nome, telefone, texto livre, veículo completo e
mensagem de WhatsApp não entram em parâmetros do GA4, Ads ou Clarity. O
sanitizador central remove query e fragmento de `link_url` e `page_location`,
além de descartar sinais de e-mail ou telefone em parâmetros de campanha.

## Contrato de eventos

Os nomes são genéricos e estáveis; seção, posição e variante ficam nos
parâmetros. O contrato atual é `site-events-v2`.

- navegação: `page_view`, `cta_click`, `service_detail_click`, `scroll_depth`;
- contato: `whatsapp_click`, `phone_click`, `directions_click`,
  `instagram_click`;
- formulário: `form_view`, `form_start`, `form_field_complete`,
  `form_submit_attempt`, `form_validation_error`, `form_abandon`,
  `form_submit_error`, `generate_lead`;
- estimativa: eventos `quiz_*`, além de `engagement_5s` e `engagement_10s`.

Parâmetros principais: `component_id`, `position`, `page_type`, `page_path`,
`service_id`, `flow_type`, `step_id`, `estimate_state`, `experiment_id` e
`variant_id`. Cliques também usam `destination_type` e `destination_path`;
o caminho é relativo e não contém query. WhatsApp, telefone e direções são
normalizados para `/whatsapp`, `/phone` e `/directions`, sem número ou mensagem.

O endpoint `/api/marketing/event` repete a validação no servidor: aceita apenas
tipos e metadados conhecidos, reduz referrer à origem e remove query/hash da
localização da página. O formulário persiste o evento canônico `form_submit` no
backend; `generate_lead` só é enviado ao Google depois dessa gravação ser
confirmada, evitando contar uma conversão ausente do painel comercial.

## Ambientes

Por padrão, scripts e eventos externos só são enviados nos hosts
`premiumretifica.com.br` e `www.premiumretifica.com.br`. Localhost e previews
não contaminam GA4, Ads, Clarity ou Retiflow.

Para um smoke test deliberado fora de produção, defina temporariamente:

```dotenv
NEXT_PUBLIC_TRACKING_DEBUG=true
```

O payload continuará marcado com `siteHostname` e `environment`, para ser
excluído dos relatórios. Nunca mantenha esse override em um ambiente de uso
cotidiano.

## Variáveis públicas

```dotenv
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-HD00424MR7
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-18268630627
NEXT_PUBLIC_GOOGLE_ADS_FORM_SEND_TO=AW-18268630627/eRwrCNHCrsUcEOPclIdE
NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_SEND_TO=AW-18268630627/_YlRCKbTxMUcEOPclIdE
NEXT_PUBLIC_GOOGLE_ADS_PHONE_SEND_TO=AW-18268630627/qlmYCMS9ldYcEOPclIdE
NEXT_PUBLIC_GOOGLE_ADS_WEBSITE_CALL_SEND_TO=AW-18268630627/CwNLCK_qqdwcEOPclIdE
```

IDs acima são públicos. OAuth, developer token, chaves privadas e
`service_role` nunca pertencem ao frontend.

## Validação antes da publicação

1. Abrir uma janela limpa e confirmar no painel de rede: zero requests para
   `googletagmanager.com`, `google-analytics.com`, `googleadservices.com` e
   `clarity.ms` antes da escolha.
2. Rejeitar opcionais e navegar: os mesmos provedores devem continuar ausentes.
3. Aceitar apenas análise: GA4/Clarity carregam; Ads e chamada dinâmica não.
4. Aceitar apenas anúncios: Ads carrega; GA4/Clarity e pageviews de jornada não.
5. Aceitar ambos e conferir `page_view`, WhatsApp, telefone e formulário no
   Tag Assistant/DebugView.
6. Confirmar que o clique do WhatsApp usa `destination_path=/whatsapp` e não
   envia `link_url`, número ou `?text=`.
7. Confirmar no Retiflow `siteHostname`, `environment`, `componentId`, página e
   versão do contrato.
8. Revogar as categorias e confirmar consentimento `denied` e remoção de
   `_ga*`, `_cl*`, `_gcl*` e `_gac*` acessíveis no domínio.
9. Só depois do smoke test considerar qualquer mudança de conversão primária
   ou estratégia de lance no Google Ads.

Conversões otimizadas para leads continuam desativadas. Elas exigem termos,
base legal e fluxo seguro de dados primários/offline próprios.
