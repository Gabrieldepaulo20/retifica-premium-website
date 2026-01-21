# Estrutura do Projeto - Retífica Premium

## 📁 Organização de Pastas

```
src/
├── app/                    # Next.js App Router
│   ├── (site)/             # Grupo de rotas com layout comum
│   │   ├── layout.tsx      # Layout do site (Header + Footer)
│   │   ├── page.tsx        # Página inicial (Home) - rota: /
│   │   ├── sobre/page.tsx  # TODO: Criar - rota: /sobre
│   │   ├── servicos/page.tsx # TODO: Criar - rota: /servicos
│   │   ├── b2b/page.tsx    # TODO: Criar - rota: /b2b
│   │   └── contato/page.tsx # TODO: Criar - rota: /contato
│   ├── layout.tsx          # Layout raiz (metadata SEO, fontes, estrutura HTML)
│   ├── globals.css         # Estilos globais
│   └── sitemap.ts          # Sitemap dinâmico
│
├── components/
│   ├── site/               # Componentes específicos do site
│   │   ├── Header.tsx      # Cabeçalho fixo com navegação
│   │   └── Footer.tsx      # Rodapé com contato
│   ├── ui/                 # Componentes de interface reutilizáveis
│   │   ├── Button.tsx      # Botões
│   │   ├── Card.tsx        # Cards
│   │   ├── Container.tsx   # Wrapper responsivo
│   │   ├── Section.tsx     # Seção wrapper
│   │   ├── SectionTitle.tsx # Títulos de seção
│   │   └── index.ts        # Barrel exports
│   └── layout/             # ⚠️ Compatibilidade temporária (re-exporta components/site)
│       └── index.ts        # Re-exports de Header/Footer
│                           # NOTA: Novos imports devem usar components/site/
│
├── sections/               # Seções de página (hero, services, testimonials)
│   └── index.ts            # Barrel exports (quando componentes forem criados)
│
├── lib/                    # Funções utilitárias e helpers
│   ├── nav.ts              # Itens de navegação
│   └── utils.ts            # Funções utilitárias (cn, formatPhone, etc.)
│
└── types/                  # Definições TypeScript
    └── index.ts            # Tipos (ContactInfo, Service, Testimonial, etc.)
```

## 🎯 Próximos Passos

### 1. Componentes de Layout (Site)

**Já criados em `src/components/site/`:**

- ✅ `Header.tsx` - Cabeçalho fixo com navegação
- ✅ `Footer.tsx` - Rodapé com informações de contato

**⚠️ Importante:**

- `src/components/layout/index.ts` existe apenas para compatibilidade temporária
- **Novos imports devem usar `@/components/site/Header` e `@/components/site/Footer`**
- O barrel em `components/layout/` pode ser removido no futuro

### 2. Componentes UI

**Já criados em `src/components/ui/`:**

- ✅ `Button.tsx` - Botões reutilizáveis
- ✅ `Card.tsx` - Cards de conteúdo
- ✅ `Container.tsx` - Wrapper responsivo
- ✅ `Section.tsx` - Seção wrapper com backgrounds
- ✅ `SectionTitle.tsx` - Títulos de seção com destaque

**TODO: Criar quando necessário:**

- `Input.tsx` - Inputs de formulário
- Outros componentes UI conforme necessário

### 3. Seções

Crie em `src/sections/`:

- `Hero.tsx` - Banner principal
- `Services.tsx` - Seção de serviços
- `Testimonials.tsx` - Depoimentos de clientes
- `Contact.tsx` - Formulário de contato

## ⚙️ Configurações Importantes

### Estrutura de Layouts (Next.js App Router)

O projeto usa dois níveis de layout no Next.js App Router:

1. **`app/layout.tsx`** (Layout Raiz):

   - Define a estrutura HTML base (`<html>`, `<body>`)
   - Configura metadata global (SEO, Open Graph, Twitter Cards)
   - Carrega fontes (Poppins + Inter)
   - Aplica estilos globais
   - Aplica-se a todas as rotas

2. **`app/(site)/layout.tsx`** (Layout do Site):
   - Renderiza `<Header />` e `<Footer />` globais
   - Aplica padding-top para compensar header fixo (`pt-16`)
   - Aplica-se apenas às rotas dentro de `(site)`
   - A rota `/` renderiza `app/(site)/page.tsx` (Home)

**Nota:** Não existe `app/page.tsx` para evitar conflito de rotas. A Home está em `app/(site)/page.tsx`.

### Metadata (layout.tsx)

- ✅ Título e descrição configurados
- ✅ Open Graph completo
- ✅ Twitter Cards
- ✅ Idioma pt-BR
- ⚠️ **Ajuste necessário:** Domínio em `metadataBase` e `url`

### SEO

- ✅ `robots.txt` criado em `public/`
- ✅ `sitemap.ts` configurado (gera `/sitemap.xml` automaticamente)
- ⚠️ **Ajuste necessário:** Domínio em `sitemap.ts`

### Imagens Open Graph

Você precisará criar `/public/og-image.jpg` (1200x630px) para:

- Compartilhamentos em redes sociais
- Preview em links

## 🔧 Utilitários Disponíveis

### `lib/utils.ts`

- `cn()` - Combina classes CSS de forma segura
- `formatPhone()` - Formata telefone brasileiro
- `formatCEP()` - Formata CEP brasileiro

## 📝 Tipos TypeScript

### `types/index.ts`

Tipos prontos para usar:

- `ContactInfo` - Informações de contato
- `Service` - Serviços oferecidos
- `Testimonials` - Depoimentos
- `Section` - Seções de página
