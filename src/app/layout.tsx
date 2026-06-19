import type { Metadata, Viewport } from "next";
import { Poppins, Inter, Rajdhani, Open_Sans } from "next/font/google";
import Script from "next/script";
import { MaterialSymbolsLoader } from "@/components/MaterialSymbolsLoader";
import { Header } from "@/components/site/Header";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { absoluteUrl, siteConfig } from "@/lib/site";
import "./globals.css";

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
    default:
      "Retífica Premium | Retífica de Cabeçote e Motor em Sertãozinho-SP",
    template: "%s",
  },
  description:
    "Retífica de cabeçote, diagnóstico de motor e usinagem automotiva em Sertãozinho-SP. Atendimento para oficinas, motoristas e frotas da região.",
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
    title: "Retífica Premium | Retífica de Cabeçote em Sertãozinho-SP",
    description:
      "Retífica automotiva com usinagem de precisão, revisão de válvulas, diagnóstico técnico e montagem em Sertãozinho-SP.",
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
    title: "Retífica Premium | Retífica de Cabeçote em Sertãozinho-SP",
    description:
      "Retífica automotiva com usinagem de precisão, revisão de válvulas, diagnóstico técnico e montagem em Sertãozinho-SP.",
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
          src="https://www.googletagmanager.com/gtag/js?id=G-HD00424MR7"
          strategy="lazyOnload"
          async
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-HD00424MR7');`}
        </Script>
      </head>
      <body
        className={`${poppins.variable} ${inter.variable} ${rajdhani.variable} ${openSans.variable} font-body antialiased`}
      >
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
