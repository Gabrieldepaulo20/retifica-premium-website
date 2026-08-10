# Checklist de publicação — conversão, mensuração e busca

Este documento separa o que está pronto no código do que depende de mídia,
credencial ou publicação. Um build local não comprova que Google Ads, GA4,
Search Console ou Retiflow receberam um evento em produção.

## Marco de comparação

Na janela auditada havia 69 sessões pagas limpas. Apenas 47 tinham duração ativa
mensurável; entre essas 47, 23,4% ficaram abaixo de 5 segundos e 44,7% abaixo de
10 segundos. As sessões sem pulso não podem ser tratadas como zero segundo. A
alegação de 61% de abandono global permanece inconclusiva até a cobertura ficar
estável.

O teste deve comparar visitantes, não quantidade de eventos, e preservar:

- contato único;
- lead identificado;
- orçamento criado;
- O.S. aprovada;
- tempo até o primeiro retorno.

## Antes do deploy

- [ ] `npm run lint` sem erros.
- [ ] `npx tsc --noEmit` sem erros.
- [ ] `npm run build` sem erros.
- [ ] QA em 360 × 800, 390 × 844, tablet e desktop.
- [ ] Fluxos controle e tratamento testados com teclado.
- [ ] Nenhum nome, telefone, cidade, relato, placa, motor completo ou mensagem de
  WhatsApp aparece em GA4, Ads ou Clarity.
- [ ] `destination_type`, `destination_path`, `component_id`, página, posição e
  variante aparecem no evento próprio.
- [ ] Google/Ads/Clarity não carregam antes da escolha de privacidade.
- [ ] Localhost e previews não enviam dados às propriedades de produção.
- [ ] WhatsApp do quiz registra o microevento e um único contato canônico.
- [ ] Formulário registra o lead mesmo se a entrega de e-mail falhar.
- [ ] Robô e sitemap respondem sem bloquear as páginas comerciais.

## Mídia que pode entrar depois do código

- Foto real 4:3:
  `public/media/servicos/medicao-empeno-cabecote.webp`.
- Vídeo real 16:9:
  `public/media/videos/teste-de-trinca-retifica-premium-16x9.mp4`.
- Poster do vídeo:
  `public/media/servicos/teste-de-trinca-poster.webp`.
- Ilustração técnica Veo, se usada:
  `public/media/quiz/cabecote-medicao-ilustracao.mp4` e poster equivalente.

Especificações e prompt ficam em `docs/redesign-servicos-midia.md`. O fallback
público não mostra nomes de arquivo nem instruções editoriais.

## Ordem segura de publicação

1. Publicar a Edge Function do Retiflow com o contrato aditivo.
2. Confirmar que empresa comum não acessa atividade recente e Mega Master não
   recebe identificadores persistentes ou metadata bruta.
3. Publicar o frontend do Retiflow.
4. Publicar o site.
5. Fazer smoke test com uma sessão marcada de QA e excluí-la da análise.
6. Confirmar a cadeia site → Retiflow e, após consentimento, site → GA4/Ads.
7. Registrar o hash/horário do marco de lançamento.

## Google Ads e experimento

- Controle: `variant_id=whatsapp_direct`.
- Tratamento: `variant_id=guided_v1`.
- Propagar também `experiment_id=services-hero-v1`.
- Manter a estratégia de lance durante a coleta inicial.
- `quiz_whatsapp_click` é diagnóstico de funil, não conversão primária.
- WhatsApp e telefone são intenção; formulário entregue é `generate_lead` no
  Google somente após gravação confirmada no Retiflow, com `transaction_id`
  deduplicável.
- Orçamento e O.S. só viram conversão primária/offline depois da ligação com o
  Retiflow ser comprovada.

## Search Console e indexação

Não existe envio manual de `robots.txt`: o Google o consulta no domínio. Depois
do deploy:

1. abrir `https://www.premiumretifica.com.br/robots.txt`;
2. abrir `https://www.premiumretifica.com.br/sitemap.xml`;
3. reenviar o sitemap no Search Console apenas se a leitura estiver desatualizada
   ou com erro;
4. inspecionar `/servicos`, `/quanto-custa` e as três novas páginas fortes;
5. solicitar indexação somente depois de confirmar `200`, canonical próprio e
   conteúdo publicado;
6. acompanhar cobertura, descoberta e consultas — pedido de indexação não
   garante inclusão.

## Cidade e privacidade

- A pessoa pode informar cidade voluntariamente no quiz ou formulário.
- Cidade informada no quiz ou formulário vai ao Retiflow para
  atendimento/logística; não usamos GPS.
- Cidade não vai para GA4, Ads ou Clarity como parâmetro personalizado.
- Google/Clarity podem estimar região de forma agregada somente após a escolha
  correspondente.
- GPS preciso não é solicitado e não é incorporado ao aceite de cookies.
