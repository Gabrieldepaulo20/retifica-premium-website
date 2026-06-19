/**
 * Dados estruturados (JSON-LD) para SEO
 * LocalBusiness + Service + FAQPage
 */

import { absoluteUrl, siteConfig } from "@/lib/site";

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
