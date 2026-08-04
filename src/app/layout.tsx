import type { Metadata, Viewport } from "next";
import { Rajdhani } from "next/font/google";
import Script from "next/script";
import { MaterialSymbolsLoader } from "@/components/MaterialSymbolsLoader";
import { AnalyticsRuntime } from "@/components/site/AnalyticsRuntime";
import { CookieConsent } from "@/components/site/CookieConsent";
import { Header } from "@/components/site/Header";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { absoluteUrl, siteConfig } from "@/lib/site";
import "./globals.css";

const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-HD00424MR7";
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID || "ve74erf449";

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:
      "Retífica de Cabeçote | Sertãozinho e Ribeirão Preto",
    template: "%s",
  },
  description:
    "Retífica de cabeçote, diagnóstico de motor e usinagem automotiva em Sertãozinho-SP. Atendimento a Ribeirão Preto e região para oficinas, motoristas e frotas.",
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "Automotive",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/favicon.ico", type: "image/x-icon" }],
    shortcut: [{ url: "/favicon.ico", type: "image/x-icon" }],
    apple: [{ url: "/logopreto.png", type: "image/png" }],
  },
  openGraph: {
    title: "Retífica Premium",
    description:
      "Retífica automotiva com usinagem de precisão, revisão de válvulas, diagnóstico técnico e montagem.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [
      {
        url: "/retificapremium.jpeg",
        width: 1200,
        height: 630,
        alt: "Retífica Premium - Retífica de cabeçote e usinagem automotiva",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Retífica Premium",
    description:
      "Retífica automotiva com usinagem de precisão, revisão de válvulas, diagnóstico técnico e montagem.",
    images: ["/retificapremium.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": "BR-SP",
    "geo.placename": siteConfig.address.locality,
    "geo.position": `${siteConfig.geo.latitude};${siteConfig.geo.longitude}`,
    ICBM: `${siteConfig.geo.latitude}, ${siteConfig.geo.longitude}`,
    "business:contact_data:locality": siteConfig.address.locality,
    "business:contact_data:region": siteConfig.address.region,
    "business:contact_data:country_name": "Brasil",
    "business:contact_data:phone_number": siteConfig.phone.international,
    "business:contact_data:website": absoluteUrl(),
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <Script id="consent-mode-defaults" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  wait_for_update: 500
});
gtag('set', 'ads_data_redaction', true);`}
        </Script>
        <Script
          id="retifica-google-tag"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
          async
        />
        <Script id="ga4-always-on" strategy="afterInteractive">
          {`gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
        </Script>
      </head>
      <body className={`${rajdhani.variable} font-body antialiased`}>
        <AnalyticsRuntime />
        <MaterialSymbolsLoader />
        <Header />
        {children}
        <CookieConsent
          googleAdsId={GOOGLE_ADS_ID}
          gtmId={GTM_ID}
          clarityId={CLARITY_ID}
        />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
