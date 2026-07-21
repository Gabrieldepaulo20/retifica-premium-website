// Navegação principal do site
export const navItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Sobre",
    href: "/sobre",
  },
  {
    label: "Serviços",
    href: "/servicos",
  },
  {
    label: "B2B",
    href: "/b2b",
  },
  {
    label: "Contato",
    href: "/contato",
  },
] as const;

export type NavItem = (typeof navItems)[number];
