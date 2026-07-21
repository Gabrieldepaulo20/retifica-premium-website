/**
 * Dados estruturados (JSON-LD) para SEO
 * LocalBusiness + Service + FAQPage
 */

import { absoluteUrl, siteConfig } from "@/lib/site";
import type { ProblemDetailPage } from "@/lib/problem-pages";
import type { ServiceDetailPage } from "@/lib/service-pages";
import { primaryRegionalCities, regionalCities } from "@/lib/regional";

const baseUrl = siteConfig.url;
const businessId = `${baseUrl}/#automotive-business`;
const servicesUrl = `${baseUrl}/servicos`;

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["AutoRepair", "AutomotiveBusiness"],
    "@id": businessId,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: baseUrl,
    logo: absoluteUrl("/logo.png"),
    image: [absoluteUrl("/retificapremium.jpeg"), absoluteUrl("/oficina.jpeg")],
    description:
      "Retífica de cabeçotes e usinagem automotiva com mais de 20 anos de experiência em Sertãozinho-SP. Atende carro, caminhão, ônibus, trator e motores diesel, gasolina e álcool.",
    foundingDate: siteConfig.foundingDate,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.streetAddress,
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    hasMap: `https://www.google.com/maps?q=${encodeURIComponent(
      siteConfig.address.formatted
    )}`,
    telephone: siteConfig.phone.international,
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "08:00",
        closes: "11:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "13:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Friday",
        opens: "08:00",
        closes: "12:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Friday",
        opens: "13:00",
        closes: "17:30",
      },
    ],
    areaServed: siteConfig.areaServedCities.map((city) => ({
      "@type": "City",
      name: city,
      addressRegion: "SP",
      addressCountry: "BR",
    })),
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.whatsapp.international,
        contactType: "customer service",
        areaServed: "BR",
        availableLanguage: "Portuguese",
      },
    ],
    knowsAbout: [...siteConfig.services, ...siteConfig.symptoms],
    makesOffer: siteConfig.services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service,
        areaServed: "Sertãozinho-SP e região",
      },
      url: servicesUrl,
    })),
    sameAs: [siteConfig.instagram],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${servicesUrl}#service`,
    name: "Serviços de retífica de cabeçote e diagnóstico de motor",
    serviceType: "Retífica de Cabeçote e Usinagem Automotiva",
    description:
      "Limpeza química, retífica de sedes e válvulas, plaina, usinagem, solda de trincas, montagem técnica e diagnóstico de sintomas como motor fumando, baixando óleo ou superaquecendo.",
    url: servicesUrl,
    provider: {
      "@type": "AutoRepair",
      "@id": businessId,
      name: siteConfig.name,
      url: baseUrl,
    },
    areaServed: siteConfig.areaServedCities.map((city) => ({
      "@type": "City",
      name: city,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Serviços automotivos da Retífica Premium",
      itemListElement: siteConfig.services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service,
        },
      })),
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: `${baseUrl}/contato`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQSchema({ items }: { items: FAQItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceDetailSchema({ page }: { page: ServiceDetailPage }) {
  const pageUrl = `${servicesUrl}/${page.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: page.title,
    serviceType: page.title,
    description: page.metaDescription,
    url: pageUrl,
    image: absoluteUrl(page.image),
    provider: {
      "@type": "AutoRepair",
      "@id": businessId,
      name: siteConfig.name,
      telephone: siteConfig.phone.international,
      url: baseUrl,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.address.streetAddress,
        addressLocality: siteConfig.address.locality,
        addressRegion: siteConfig.address.region,
        postalCode: siteConfig.address.postalCode,
        addressCountry: siteConfig.address.country,
      },
    },
    areaServed: siteConfig.areaServedCities.map((city) => ({
      "@type": "City",
      name: city,
      addressRegion: "SP",
      addressCountry: "BR",
    })),
    knowsAbout: page.symptoms,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: absoluteUrl("/contato"),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({
  items,
}: {
  items: Array<{ name: string; url: string }>;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ArticleSchema({ page }: { page: ProblemDetailPage }) {
  const pageUrl = absoluteUrl(`/problemas/${page.slug}`);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${pageUrl}#article`,
    headline: page.metaTitle,
    description: page.metaDescription,
    url: pageUrl,
    mainEntityOfPage: pageUrl,
    image: absoluteUrl(page.image),
    datePublished: "2026-07-21T00:00:00-03:00",
    dateModified: "2026-07-21T00:00:00-03:00",
    inLanguage: "pt-BR",
    author: {
      "@type": "Organization",
      "@id": businessId,
      name: siteConfig.name,
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      "@id": businessId,
      name: siteConfig.name,
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/logo.png"),
      },
    },
    about: [page.title, ...page.causes.map((cause) => cause.title)],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function RibeiraoPretoServiceSchema() {
  const pageUrl = `${baseUrl}/retifica-em-ribeirao-preto`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: "Retífica de motores e cabeçotes para Ribeirão Preto",
    serviceType: "Retífica de Cabeçote e Usinagem Automotiva",
    description:
      "Retífica de cabeçote, retífica de motor, plaina, teste de trinca e montagem técnica para motoristas, oficinas e frotas de Ribeirão Preto-SP, com oficina a cerca de 19 km, em Sertãozinho.",
    url: pageUrl,
    image: absoluteUrl("/oficina.jpeg"),
    provider: {
      "@type": "AutoRepair",
      "@id": businessId,
      name: siteConfig.name,
      telephone: siteConfig.phone.international,
      url: baseUrl,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.address.streetAddress,
        addressLocality: siteConfig.address.locality,
        addressRegion: siteConfig.address.region,
        postalCode: siteConfig.address.postalCode,
        addressCountry: siteConfig.address.country,
      },
    },
    areaServed: {
      "@type": "City",
      name: "Ribeirão Preto",
      addressRegion: "SP",
      addressCountry: "BR",
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: absoluteUrl("/contato"),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function RegionalServiceAreaSchema() {
  const pageUrl = `${servicesUrl}#regiao`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${servicesUrl}#regiao-webpage`,
    name: "Retífica de cabeçote e motor na região de Ribeirão Preto",
    url: pageUrl,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    about: {
      "@type": "AutoRepair",
      "@id": businessId,
      name: siteConfig.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.address.streetAddress,
        addressLocality: siteConfig.address.locality,
        addressRegion: siteConfig.address.region,
        postalCode: siteConfig.address.postalCode,
        addressCountry: siteConfig.address.country,
      },
      areaServed: regionalCities.map((city) => ({
        "@type": "City",
        name: city.name,
        addressRegion: "SP",
        addressCountry: "BR",
      })),
    },
    mainEntity: {
      "@type": "ItemList",
      name: "Cidades atendidas pela Retífica Premium em até 60 km",
      itemListElement: regionalCities.map((city, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `${city.name} - aproximadamente ${city.distanceKm} km de Sertãozinho`,
      })),
    },
    keywords: [
      "retífica Ribeirão Preto",
      "retífica de cabeçote Ribeirão Preto",
      "retífica de motor Ribeirão Preto",
      ...primaryRegionalCities.map((city) => `retífica ${city}`),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
