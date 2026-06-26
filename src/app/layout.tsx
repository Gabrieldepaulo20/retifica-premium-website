import type { Metadata, Viewport } from "next";
import { Poppins, Inter, Rajdhani, Open_Sans } from "next/font/google";
import Script from "next/script";
import { MaterialSymbolsLoader } from "@/components/MaterialSymbolsLoader";
import { AnalyticsRuntime } from "@/components/site/AnalyticsRuntime";
import { Header } from "@/components/site/Header";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { absoluteUrl, siteConfig } from "@/lib/site";
import "./globals.css";

const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-HD00424MR7";
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Retífica Premium",
    template: "%s",
  },
  description:
    "Retífica de cabeçote, diagnóstico de motor e usinagem automotiva. Atendimento regional para oficinas, motoristas e frotas.",
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
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="lazyOnload"
          async
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', '${GA_MEASUREMENT_ID}');${
            GOOGLE_ADS_ID ? `\ngtag('config', '${GOOGLE_ADS_ID}');` : ""
          }`}
        </Script>
        {GTM_ID && (
          <Script id="gtm-init" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        )}
      </head>
      <body
        className={`${poppins.variable} ${inter.variable} ${rajdhani.variable} ${openSans.variable} font-body antialiased`}
      >
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="Google Tag Manager"
            />
          </noscript>
        )}
        <AnalyticsRuntime />
        <MaterialSymbolsLoader />
        <Header />
        {children}
        <Script id="ms-clarity" strategy="lazyOnload">
          {`
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "ve74erf449");
  `}
        </Script>
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
