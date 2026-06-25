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
- `src/app/(site)/b2b/page.tsx`: pagina de parceria para oficinas
- `src/app/(site)/contato/page.tsx`: pagina de contato
- `src/app/sitemap.ts`: geracao do sitemap
- `src/components/site/StructuredData.tsx`: JSON-LD (LocalBusiness, Service, FAQ)

## SEO Atual
- Dominio canonico: `https://www.premiumretifica.com.br`
- `metadataBase` centralizado no layout raiz
- canonical por pagina nas rotas publicas
- sitemap com URLs canonicas em `www`
- `robots.txt` permitindo rastreio publico e declarando sitemap
- Open Graph e Twitter configurados

## Analytics
- GA4 global via `next/script`
- Microsoft Clarity global via `next/script`
- Tracking de cliques nos CTAs principais de WhatsApp e Instagram

## Formulario de Contato
- O formulario de `/contato` envia leads para `/api/contato`.
- O envio de e-mail usa a API do Resend, sem guardar segredo no codigo.
- Variaveis necessarias no ambiente do deploy:
  - `RESEND_API_KEY`: chave da API do Resend.
  - `CONTACT_EMAIL_FROM`: remetente verificado, ex. `Retífica Premium <contato@premiumretifica.com.br>`.
  - `CONTACT_EMAIL_TO`: destino dos leads, ex. `retificapremium5@gmail.com`.
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
curl -I https://www.premiumretifica.com.br/b2b
curl -I https://www.premiumretifica.com.br/contato
curl -I https://www.premiumretifica.com.br/robots.txt
curl -I https://www.premiumretifica.com.br/sitemap.xml
```
