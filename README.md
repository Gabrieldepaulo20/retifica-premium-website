# Retifica Premium Website

Site institucional da Retifica Premium em Next.js (App Router), com foco em SEO local, performance e conversao para atendimento via WhatsApp.

## Stack
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4

## Comandos
```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Rotas Publicas
- `/`
- `/sobre`
- `/servicos`
- `/servicos/[slug]`
- `/retifica-em-ribeirao-preto`
- `/problemas/[slug]`
- `/b2b`
- `/contato`
- `/sitemap.xml`
- `/robots.txt`
- `/favicon.ico`

## Estrutura Principal
- `src/app/layout.tsx`: metadata global, fontes, analytics e layout raiz
- `src/app/(site)/layout.tsx`: wrapper das paginas publicas com footer condicional
- `src/app/(site)/page.tsx`: home
- `src/app/(site)/sobre/page.tsx`: pagina institucional
- `src/app/(site)/servicos/page.tsx`: pagina de servicos
- `src/app/(site)/retifica-em-ribeirao-preto/page.tsx`: landing regional para Ribeirao Preto
- `src/app/(site)/problemas/[slug]/page.tsx`: guias tecnicos de sintomas do motor
- `src/lib/problem-pages.ts`: conteudo e metadados dos guias tecnicos
- `src/app/(site)/b2b/page.tsx`: pagina de parceria para oficinas
- `src/app/(site)/contato/page.tsx`: pagina de contato
- `src/app/sitemap.ts`: geracao do sitemap
- `src/components/site/StructuredData.tsx`: JSON-LD (LocalBusiness, Service, FAQ)

## SEO Atual
- Dominio canonico: `https://www.premiumretifica.com.br`
- `metadataBase` centralizado no layout raiz
- canonical por pagina nas rotas publicas
- sitemap com URLs canonicas em `www`
- redirect permanente de `/regiao-atendida` para a landing regional substituta
- `robots.txt` permitindo rastreio publico e declarando sitemap
- Open Graph e Twitter configurados

## Analytics
- Google tag global via `next/script`, carregada em todas as paginas
- GA4 para pageviews, navegacao interna, scroll, CTAs e funil do formulario
- Google Ads com conversoes de formulario enviado, clique no WhatsApp, clique no telefone e ligacao real pelo site
- `transaction_id` anonimo por intencao de contato para evitar conversoes duplicadas
- Captura de UTM, GCLID, GBRAID e WBRAID para atribuicao
- Microsoft Clarity global via `next/script`
- Tracking interno dos eventos de marketing em `/api/marketing/event`

Os IDs publicos do Google tag ficam nas variaveis
`NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_GOOGLE_ADS_ID`,
`NEXT_PUBLIC_GOOGLE_ADS_FORM_SEND_TO`,
`NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_SEND_TO` e
`NEXT_PUBLIC_GOOGLE_ADS_PHONE_SEND_TO` e
`NEXT_PUBLIC_GOOGLE_ADS_WEBSITE_CALL_SEND_TO`. Credenciais OAuth e chaves privadas
nunca devem ser adicionadas ao site.

## Formulario de Contato
- O formulario de `/contato` envia leads para `/api/contato`.
- O envio de e-mail tenta Resend quando `RESEND_API_KEY` + `CONTACT_EMAIL_FROM` existem.
- Se Resend nao estiver configurado, o envio usa AWS SES com os mesmos nomes de secrets usados no Retiflow:
  - `SES_REGION`.
  - `SES_ACCESS_KEY_ID`.
  - `SES_SECRET_ACCESS_KEY`.
  - `SUPPORT_FROM_EMAIL` ou `CONTACT_EMAIL_FROM`.
  - `SUPPORT_FROM_NAME` ou `CONTACT_EMAIL_FROM_NAME`.
  - `SUPPORT_TO_EMAILS` para multiplos destinatarios separados por virgula.
  - `SUPPORT_TO_EMAIL` ou `CONTACT_EMAIL_TO` como compatibilidade com a configuracao antiga.
  - `SUPPORT_REPLY_TO_EMAIL` ou `CONTACT_EMAIL_REPLY_TO`.
- Em AWS SES sandbox, todos os destinatarios externos precisam estar verificados no SES antes de ativar multiplos e-mails.
- O template visual do e-mail e a regra de envio ficam em `src/lib/contact-email.ts`.
- Nenhum segredo fica no codigo; configure esses valores apenas no ambiente do deploy.
- Se o envio falhar ou as variaveis nao estiverem configuradas, o formulario mostra um fallback para WhatsApp para nao perder o lead.

## Observacoes Operacionais
- O deploy de producao e feito a partir do repositorio Git conectado ao AWS Amplify.
- Antes de subir alteracoes, valide sempre com `npm run lint` e `npm run build`.
- Evite commitar relatorios temporarios, logs locais e artefatos de auditoria.

## Validacao Recomendada
```bash
npm run lint
npm run build
npm run start -- -H 127.0.0.1 -p 3000
```

Em producao, conferir:
```bash
curl -I https://www.premiumretifica.com.br/
curl -I https://www.premiumretifica.com.br/sobre
curl -I https://www.premiumretifica.com.br/servicos
curl -I https://www.premiumretifica.com.br/retifica-em-ribeirao-preto
curl -I https://www.premiumretifica.com.br/problemas/motor-fumando
curl -I https://www.premiumretifica.com.br/regiao-atendida
curl -I https://www.premiumretifica.com.br/b2b
curl -I https://www.premiumretifica.com.br/contato
curl -I https://www.premiumretifica.com.br/robots.txt
curl -I https://www.premiumretifica.com.br/sitemap.xml
```
