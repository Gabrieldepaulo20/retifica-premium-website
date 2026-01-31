import type { Metadata, Viewport } from "next";
import { Poppins, Inter, Rajdhani, Open_Sans } from "next/font/google";
import { MaterialSymbolsLoader } from "@/components/MaterialSymbolsLoader";
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
  title: "Retífica Premium | Especializada em Cabeçotes Automotivos",
  description:
    "Retífica de cabeçotes com mais de 20 anos de experiência. Equipamentos modernos, equipe especializada e garantia de qualidade em Sertãozinho/SP.",
  keywords: [
    "retífica cabeçotes",
    "retífica motor",
    "usinagem cabeçote",
    "Sertãozinho",
    "retífica automotiva",
    "reparo cabeçote",
    "usinagem motor",
    "retífica SP",
  ],
  authors: [{ name: "Retífica Premium" }],
  creator: "Retífica Premium",
  publisher: "Retífica Premium",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://retificapremium.com.br"), // Ajuste com seu domínio
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Retífica Premium | Especializada em Cabeçotes Automotivos",
    description:
      "Retífica de cabeçotes com mais de 20 anos de experiência. Equipamentos modernos, equipe especializada e garantia de qualidade em Sertãozinho/SP.",
    url: "https://retificapremium.com.br", // Ajuste com seu domínio
    siteName: "Retífica Premium",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg", // Você precisará criar esta imagem
        width: 1200,
        height: 630,
        alt: "Retífica Premium - Especializada em Cabeçotes Automotivos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Retífica Premium | Especializada em Cabeçotes Automotivos",
    description:
      "Retífica de cabeçotes com mais de 20 anos de experiência. Equipamentos modernos, equipe especializada e garantia de qualidade em Sertãozinho/SP.",
    images: ["/og-image.jpg"], // Você precisará criar esta imagem
    creator: "@retificapremium", // Ajuste com seu handle do Twitter
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
  verification: {
    // Adicione aqui códigos de verificação quando tiver
    // google: "seu-codigo-google",
    // yandex: "seu-codigo-yandex",
    // bing: "seu-codigo-bing",
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
      <body
        className={`${poppins.variable} ${inter.variable} ${rajdhani.variable} ${openSans.variable} font-body antialiased`}
      >
        <MaterialSymbolsLoader />
        {children}
      </body>
    </html>
  );
}
