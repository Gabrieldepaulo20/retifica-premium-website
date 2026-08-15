import { caminhoCidade, cidadesAtendidas } from "@/lib/cidades-atendidas";
import { serviceDetailPages, servicePath } from "@/lib/service-pages";
import { problemDetailPages, problemPath } from "@/lib/problem-pages";
import { regionalCityNames } from "@/lib/regional";

export const siteConfig = {
  name: "Retífica Premium",
  legalName: "Retífica Premium",
  url: "https://www.premiumretifica.com.br",
  domain: "premiumretifica.com.br",
  locale: "pt_BR",
  foundingDate: "2004",
  cnpj: "48.842.592/0001-15",
  email: "retificapremium5@gmail.com",
  phone: {
    display: "(16) 3524-4661",
    href: "tel:+551635244661",
    international: "+55-16-3524-4661",
  },
  whatsapp: {
    display: "(16) 99302-1998",
    number: "5516993021998",
    international: "+55-16-99302-1998",
  },
  instagram: "https://www.instagram.com/retifica_premium/",
  address: {
    streetAddress: "Av. Fioravante Magro, 1059 - Jardim Boa Vista",
    locality: "Sertãozinho",
    region: "SP",
    postalCode: "14177-578",
    country: "BR",
    formatted:
      "Av. Fioravante Magro, 1059 - Jardim Boa Vista, Sertãozinho - SP, 14177-578",
  },
  geo: {
    latitude: "-21.1377",
    longitude: "-47.9897",
  },
  areaServedCities: regionalCityNames,
  services: [
    "Retífica de cabeçote",
    "Retífica de sedes e válvulas",
    "Plaina de cabeçote",
    "Limpeza química de cabeçote",
    "Troca e adaptação de guias",
    "Esmerilhamento de válvulas",
    "Usinagem de roscas",
    "Solda de trincas",
    "Montagem e regulagem final",
    "Diagnóstico técnico de motor",
  ],
  symptoms: [
    "motor fumando",
    "motor baixando óleo",
    "motor superaquecendo",
    "perda de potência",
    "junta queimada",
    "cabeçote trincado",
  ],
} as const;

export const whatsappBudgetText =
  "Olá, vim pelo site da Retífica Premium e gostaria de solicitar um orçamento para retífica de cabeçote ou diagnóstico do motor.";

export const whatsappBudgetUrl = `https://wa.me/${
  siteConfig.whatsapp.number
}?text=${encodeURIComponent(whatsappBudgetText)}`;

export function absoluteUrl(path = "") {
  if (!path || path === "/") return siteConfig.url;
  if (path.startsWith("http")) return path;
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export const siteContentLastModified = "2026-08-10T00:00:00-03:00";
const guideContentLastModified = "2026-07-21T00:00:00-03:00";

export const sitePages = [
  {
    path: "/",
    name: "Página inicial",
    lastModified: siteContentLastModified,
    priority: 1,
    changeFrequency: "weekly",
    images: ["/retificapremium.jpeg", "/cabecote.webp"],
  },
  {
    path: "/servicos",
    name: "Serviços",
    lastModified: siteContentLastModified,
    priority: 0.9,
    changeFrequency: "weekly",
    images: ["/retificademotor.jpg", "/montagemdemotores.jpg"],
  },
  {
    path: "/quanto-custa",
    name: "Estimativa guiada",
    lastModified: siteContentLastModified,
    priority: 0.9,
    changeFrequency: "weekly",
    images: [],
  },
  {
    path: "/retifica-em-ribeirao-preto",
    name: "Retífica em Ribeirão Preto",
    lastModified: siteContentLastModified,
    priority: 0.88,
    changeFrequency: "weekly",
    images: ["/oficina.jpeg", "/retificapremium.jpeg"],
  },
  // Páginas de área de atendimento. A oficina é uma só, em Sertãozinho; estas
  // páginas vendem a logística de busca e entrega, com a distância explícita.
  ...cidadesAtendidas.map((cidade) => ({
    path: caminhoCidade(cidade.slug),
    name: `Retífica em ${cidade.nome}`,
    lastModified: siteContentLastModified,
    priority: 0.72,
    changeFrequency: "weekly" as const,
    images: [] as string[],
  })),
  {
    path: "/sobre",
    name: "Sobre",
    lastModified: siteContentLastModified,
    priority: 0.75,
    changeFrequency: "monthly",
    images: ["/quemsomos.png", "/oficina.jpeg"],
  },
  {
    path: "/b2b",
    name: "Parceria B2B",
    lastModified: siteContentLastModified,
    priority: 0.8,
    changeFrequency: "monthly",
    images: ["/oficina.jpeg", "/retificapremium.jpeg"],
  },
  {
    path: "/contato",
    name: "Contato",
    lastModified: siteContentLastModified,
    priority: 0.85,
    changeFrequency: "weekly",
    images: ["/cabecotefundo.jpg"],
  },
  {
    path: "/privacidade",
    name: "Privacidade e cookies",
    lastModified: siteContentLastModified,
    priority: 0.3,
    changeFrequency: "yearly",
    images: [],
  },
  ...serviceDetailPages.map((page) => ({
    path: servicePath(page.slug),
    name: page.shortTitle,
    lastModified: siteContentLastModified,
    priority: 0.82,
    changeFrequency: "monthly" as const,
    images: [page.image],
  })),
  ...problemDetailPages.map((page) => ({
    path: problemPath(page.slug),
    name: page.shortTitle,
    lastModified: guideContentLastModified,
    priority: 0.8,
    changeFrequency: "monthly" as const,
    images: [page.image],
  })),
] as const;
