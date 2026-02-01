/**
 * Dados estruturados (JSON-LD) para SEO
 * LocalBusiness + Service + FAQPage
 */

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    "name": "Retífica Premium",
    "url": "https://retificapremium.com.br",
    "logo": "https://retificapremium.com.br/logo.png",
    "image": "https://retificapremium.com.br/og-image.jpg",
    "description": "Retífica de cabeçotes e usinagem automotiva com mais de 20 anos de experiência em Sertãozinho-SP. Atende carro, caminhão, ônibus, trator e motores diesel, gasolina e álcool.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. Fioravante Magro, 1059 - Jardim Boa Vista",
      "addressLocality": "Sertãozinho",
      "addressRegion": "SP",
      "postalCode": "14177-578",
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-21.1377",
      "longitude": "-47.9897"
    },
    "telephone": "+55-16-3524-4661",
    "priceRange": "$$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday"],
        "opens": "08:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Friday",
        "opens": "08:00",
        "closes": "17:30"
      }
    ],
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "-21.1377",
        "longitude": "-47.9897"
      },
      "geoRadius": "50000"
    },
    "sameAs": [
      "https://www.instagram.com/retifica_premium/"
    ]
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
    "serviceType": "Retífica de Cabeçote e Usinagem Automotiva",
    "provider": {
      "@type": "AutomotiveBusiness",
      "name": "Retífica Premium",
      "url": "https://retificapremium.com.br"
    },
    "areaServed": {
      "@type": "State",
      "name": "São Paulo"
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock"
    }
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
    "mainEntity": items.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
