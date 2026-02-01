# Estrutura do Projeto - Retífica Premium

## Rotas (App Router)
- `/` -> `src/app/(site)/page.tsx`
- `/sobre` -> `src/app/(site)/sobre/page.tsx`
- `/servicos` -> `src/app/(site)/servicos/page.tsx`
- `/b2b` -> `src/app/(site)/b2b/page.tsx`
- `/contato` -> `src/app/(site)/contato/page.tsx`
- `/sitemap.xml` -> `src/app/sitemap.ts`
- `/favicon.ico` -> `src/app/favicon.ico`

## Layouts
- `src/app/layout.tsx` (RootLayout): base HTML, fontes, metadata global,
  `MaterialSymbolsLoader` e `Header`.
- `src/app/(site)/layout.tsx`: envolve o conteúdo com `<main>` e
  `ConditionalFooter`. O `Header` é renderizado no RootLayout (não é fixo).

## Componentes globais relevantes
- `src/components/site/Header.tsx` - header no fluxo (não fixo), `bg #020E1D`,
  200px no desktop
- `src/components/site/Footer.tsx`
- `src/components/site/ConditionalFooter.tsx`
- `src/components/site/ContatoScroll.tsx` - scroll para `#contato-form`
- `src/components/site/StatsCounter.tsx`
- `src/components/MaterialSymbolsLoader.tsx`

## SEO / Metadata
- Metadata base em `src/app/layout.tsx`
- Metadata por página em cada `page.tsx` (title, description, openGraph,
  twitter, canonical)
- `metadataBase` centralizado em `layout.tsx`
- `sitemap.ts` com todas as rotas públicas

## Performance de Imagens
- `next/image` com `sizes` nos `fill`
- `priority` somente no hero da Home
- Imagens decorativas com `alt=""` e `aria-hidden`

## Header (Regra de comportamento)
- Não usa `fixed` ou `sticky`
- Some durante o scroll por estar no fluxo
- 200px no desktop, menor no mobile
