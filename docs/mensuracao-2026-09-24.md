# Mensuração e atribuição — 24/09/2026

## Diagnóstico confirmado

- Banco, 26/08 a 24/09: 48 eventos `whatsapp_click` e 5 `phone_click` de tráfego pago, todos `measurementMode=essencial`, zero com GCLID/GBRAID/WBRAID. Não são conversas nem vendas confirmadas.
- Google Ads 561-450-6150: WhatsApp, clique no telefone e formulário já são ações principais, contagem Uma. Não era necessário promovê-las de secundárias.
- Ambiente Amplify: AW-18268630627 e destinos de formulário/WhatsApp/telefone presentes. A ação WhatsApp tem histórico de 22 conversões, mas zero no recorte recente.
- HTTP → HTTPS → www preserva query string no teste de redirecionamento. Não foi encontrada perda nesse caminho.
- Causa confirmada da falta de envio desses 53 eventos: o Consent Mode básico bloqueava as conversões Google sem publicidade autorizada. Não significa que os cliques sejam atribuíveis individualmente sem consentimento.
- WhatsApp estava com Conversões Otimizadas ativadas sem captar telefone/e-mail do visitante. Desativado apenas esse complemento na ação 7662021030, com salvamento e readback no Google. A ação continua principal.

## Checklist por impacto

| Nível | Ação | Critério de aceite |
|---|---|---|
| Alto | Consent Mode avançado com todos os consentimentos negados inicialmente | Sinal limitado sem cookie/PII; dados completos somente após publicidade autorizada |
| Alto | Evento conversion, destino existente, callback e prazo máximo de 250 ms | Não bloquear contato; não duplicar o sinal da mesma intenção; não fabricar receita |
| Alto | Persistir origem com fallback e limpar na revogação | GCLID, GBRAID e WBRAID separados, UTMs, referência e data de captura preservados entre páginas |
| Alto | Validar ingestão e autorização no Retiflow | Data de atribuição em metadata; sem click IDs sem publicidade autorizada; nenhuma mudança de RLS |
| Médio | Pré-qualificação na mensagem | Veículo/modelo, motor, cidade e situação da peça; manter respostas já fornecidas |
| Médio | Enhanced Conversions do formulário | Suporte com SHA-256 após persistência; ativar somente depois de conferir os termos/configuração da conta |
| Médio | Revisar termos de pesquisa | Manter preço/quanto custa/local; negativas específicas para DIY, emprego e termos não atendidos, sem cortes amplos por conversão zero |
| Baixo | Expandir páginas por cidade | Somente após volume e evidência de demanda útil |

## Implementação

- Google tag via gtag.js, sem instalar um segundo container GTM e duplicar eventos. Default denied antes do config; `ad_personalization` continua denied e `ads_data_redaction` true.
- Ads inicializa também no modo negado; Google Analytics e Clarity continuam opcionais. Cookie próprio de atribuição somente após escolha de medição, com click IDs exclusivamente após publicidade autorizada. O modo negado não recebe transaction_id persistente nem user_data.
- Conversões têm valor enviado zero, porque clique não tem receita conhecida. A conta ainda tem valor padrão histórico R$1: não interpretar valor de microconversões como faturamento ou ROAS comercial.
- Callback significa processamento da tag, não confirmação de recebimento nem atribuição pelo Google. Timeout, bloqueadores e falha de rede continuam possíveis.
- Links em nova aba preservam a navegação nativa. Os que encerram a página têm prazo máximo de 250 ms. O registro próprio continua usando fetch keepalive, idempotência e fila de retry já existente.
- Aviso não vira consentimento por tempo; minimiza após 30 segundos, com acesso para reabrir. Política atualizada e escolhas opcionais negadas inicialmente.
- `rp_attribution`: cookie próprio, Path=/, SameSite=Lax, Secure em HTTPS, máximo 90 dias, tamanho limitado. Nunca armazena telefone/e-mail. Revogação elimina o cookie.
- `attributionCapturedAt` aceito nos contratos do site e Edge; o servidor remove IDs sem modo advertising/analytics_and_advertising.

## Fechamento do ciclo comercial

Já existem `Marketing_Site_Eventos`, `Marketing_Leads`, `Marketing_Client_Attributions` e `Marketing_Offline_Conversions`, além de `marketing-offline-conversions` com Data Manager, idempotência e reconciliação de diagnóstico. Nenhuma migration é necessária para os campos solicitados. A constraint atual da fila aceita somente `client_registered`; aprovação/finalização de O.S. ainda não é importada automaticamente. Essa extensão futura exige ação de conversão própria, transição comercial confirmada e migration específica, evitando tratar cadastro como venda.

O formulário já grava telefone/e-mail, leadCode e atribuição pela rota `/api/contato`. Não inferir telefone a partir de um clique no WhatsApp. Para contatos com medição autorizada, a mensagem agora leva apenas uma referência RP curta, nunca GCLID/UTMs. Retiflow pode vincular o atendimento a um cliente pelo fluxo autenticado `marketing-dashboard`, action `link_client`, com `leadId`, `clientId` e tenant validado.

Futura integração WhatsApp: validar assinatura do provedor, deduplicar pelo ID da mensagem, normalizar o telefone realmente recebido e procurar a referência RP no tenant correto. Recusar vínculos ambíguos; nunca cruzar por horário/cidade como prova de identidade. Usar adaptador server-side autenticado, não expor a chave de ingestão no navegador. Sem referência ou identificador confiável, origem fica desconhecida. Esta publicação não conecta uma API WhatsApp nem presume mensagens recebidas.

Enhanced Conversions: `sendEnhancedLead` normaliza e calcula SHA-256 somente após envio confirmado do formulário, revalida consentimento após hashing e limpa user_data após o evento direcionado ao Ads. `NEXT_PUBLIC_GOOGLE_ADS_ENHANCED_LEADS_ENABLED` permanece desativada até conferência da configuração/termos na conta. Não aceitar termos contratuais automaticamente. PII não entra nos parâmetros normais do GA4, URLs, logs ou telemetria.

## Verificação e limites

- Testes de runtime: denied envia apenas sinal limitado; granted preserva atribuição; navegação interna não perde gclid; clique repetido é deduplicado; oposição interrompe envio.
- Testes de callback/timeout, cookie fallback, hashes e pré-qualificação.
- Integração ampla Retiflow não executada: o ambiente de integração aponta para produção e cria fixtures de usuários. Usar verificação controlada de ingestão, com identificação técnica e cleanup.
- Não importar retroativamente cliques antigos como leads ou vendas. Sem click ID/telefone autorizado e evento comercial confirmado, não há base para atribuição individual.
- Conversões sem cookies dependem da capacidade/modelagem do Google, não são garantia de que cada clique aparecerá no relatório. A conta informa modelagem ativa; conferir novos eventos e diagnóstico após publicação.
- Avaliar contatos únicos por origem, leads válidos e avaliações confirmadas. Sem acesso ao WhatsApp, vendas continuam dependentes de confirmação da empresa.

## Referências oficiais

- https://developers.google.com/tag-platform/security/guides/consent
- https://developers.google.com/tag-platform/security/concepts/consent-mode
- https://developers.google.com/tag-platform/gtagjs/reference/parameters
- https://support.google.com/google-ads/answer/11021502
- https://supabase.com/docs/guides/functions/deploy
