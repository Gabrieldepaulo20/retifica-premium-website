# Design Tokens - Retífica Premium

## 🎨 Cores

| Token | Valor HEX | Uso |
|-------|-----------|-----|
| `rp-navy` | `#0a1628` | Fundo escuro principal |
| `rp-royal` | `#1e3a8a` | Azul de destaque/sections |
| `rp-accent` | `#2563eb` | Azul vivo para palavras destacadas/links |
| `rp-gold` | `#fbbf24` | Âmbar/dourado de CTA e ícones |
| `rp-gray` | `#f3f4f6` | Fundo claro |
| `rp-dark` | `#111827` | Footer |
| `white` | `#ffffff` | Branco |

**Uso no Tailwind:**
```tsx
<div className="bg-rp-navy text-white">...</div>
<span className="text-rp-accent">...</span>
<button className="bg-rp-gold">...</button>
```

## 📐 Raio de Bordas

| Token | Valor | Uso |
|-------|-------|-----|
| `rounded-card` | `16px` | Cards, seções |
| `rounded-btn` | `9999px` (pill) | Botões |

**Uso no Tailwind:**
```tsx
<div className="rounded-card">...</div>
<button className="rounded-btn">...</button>
```

## 🌫️ Sombras

| Token | Classe | Descrição |
|-------|--------|-----------|
| `shadow-card` | `shadow-card` | Sombra padrão para cards |

**Uso no Tailwind:**
```tsx
<div className="shadow-card">...</div>
```

## 📝 Tipografia

### Fontes (Google Fonts via `next/font`)

- **Headings**: Poppins (400, 500, 600, 700)
- **Body**: Inter (400, 500, 600)

### Classes Tailwind

| Classe | Fonte | Uso |
|--------|-------|-----|
| `font-heading` | Poppins | Títulos (h1, h2, h3, etc.) |
| `font-body` | Inter | Texto corpo |
| `tracking-corporate` | `0.02em` | Tracking para títulos corporativos |

**Uso:**
```tsx
<h1 className="font-heading font-bold tracking-corporate">Título</h1>
<p className="font-body">Texto corpo</p>
```

## 🎯 Componentes Helper

### `<Container />`
Wrapper responsivo com padding e max-width.

```tsx
<Container size="xl">
  {/* Conteúdo */}
</Container>
```

**Props:**
- `size`: `"sm" | "md" | "lg" | "xl" | "full"` (padrão: `"xl"`)
- `className`: Classes adicionais

### `<Section />`
Wrapper para seções com background e overlay opcionais.

```tsx
<Section background="navy" withOverlay>
  {/* Conteúdo */}
</Section>
```

**Props:**
- `background`: `"white" | "gray" | "navy" | "royal" | "dark" | "hero-light"` (padrão: `"white"`)
- `withOverlay`: Adiciona overlay escuro sobre background-image
- `id`: ID para navegação

### `<SectionTitle />`
Título de seção com subtítulo opcional e destaque.

```tsx
<SectionTitle 
  variant="large" 
  align="center"
  highlight="Premium"
>
  Retífica Premium
</SectionTitle>
```

**Props:**
- `variant`: `"default" | "large" | "small"` (padrão: `"default"`)
- `align`: `"left" | "center" | "right"` (padrão: `"center"`)
- `subtitle`: Subtítulo opcional
- `highlight`: Texto a ser destacado em `rp-accent`

### `<Button />`
Botão reutilizável com variantes e tamanhos.

```tsx
<Button variant="primary" size="lg" href="/contato">
  Solicitar Orçamento
</Button>
```

**Props:**
- `variant`: `"primary" | "secondary" | "outline" | "ghost"` (padrão: `"primary"`)
- `size`: `"sm" | "md" | "lg"` (padrão: `"md"`)
- `href`: Link opcional (usa Next.js Link)
- `onClick`: Handler de clique opcional

### `<Card />`
Card com padding, borda e sombra configuraveis.

```tsx
<Card variant="shadow" padding="lg">
  {/* Conteúdo */}
</Card>
```

**Props:**
- `variant`: `"default" | "bordered" | "shadow"` (padrão: `"shadow"`)
- `padding`: `"sm" | "md" | "lg"` (padrão: `"md"`)

## 🎨 Padrões Visuais

### Fundo Hero Claro
Classe CSS: `bg-hero-light` - Adiciona listras diagonais suaves

```tsx
<Section background="hero-light">
  {/* Conteúdo */}
</Section>
```

### Seção Escura com Overlay
Usar `withOverlay` prop em `<Section />` para overlay sobre background-image

```tsx
<Section background="navy" withOverlay>
  {/* Background image com overlay escuro */}
</Section>
```

## 📁 Estrutura de Arquivos

```
src/
├── app/
│   ├── (site)/              # Grupo de rotas com layout comum
│   │   ├── layout.tsx       # Layout com Header + Footer
│   │   ├── page.tsx         # Home
│   │   ├── sobre/page.tsx
│   │   ├── servicos/page.tsx
│   │   ├── b2b/page.tsx
│   │   └── contato/page.tsx
│   ├── layout.tsx           # Layout raiz (metadata, fontes)
│   └── globals.css          # Estilos globais + tokens CSS
│
├── components/
│   ├── site/
│   │   ├── Header.tsx       # Header fixo com navegação
│   │   └── Footer.tsx       # Footer com contato
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Container.tsx
│       ├── Section.tsx
│       └── SectionTitle.tsx
│
└── lib/
    └── nav.ts               # Itens do menu de navegação
```

## ✅ Status da ETAPA 1

- ✅ `tailwind.config.ts` configurado com tokens
- ✅ Fontes Poppins + Inter configuradas
- ✅ Header e Footer criados (neutros, prontos para estilo)
- ✅ Helpers criados: Container, Section, SectionTitle, Button, Card
- ✅ Estrutura `app/(site)/` criada
- ✅ `lib/nav.ts` com itens do menu

## 🚀 Próximos Passos (ETAPA 2)

Aguardando prints do Figma para replicar seções com máxima fidelidade.
