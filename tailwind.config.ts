import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "rp-navy": "#0a1628", // Fundo escuro principal
        "rp-royal": "#1e3a8a", // Azul de destaque/sections
        "rp-accent": "#2563eb", // Azul vivo para palavras destacadas/links
        "rp-gold": "#fbbf24", // Âmbar/dourado de CTA e ícones
        "rp-gray": "#f3f4f6", // Fundo claro
        "rp-dark": "#111827", // Footer
      },
      borderRadius: {
        card: "16px",
        btn: "9999px", // Pill
      },
      boxShadow: {
        card: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
      fontFamily: {
        heading: ["var(--font-poppins)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      letterSpacing: {
        corporate: "0.02em", // Tracking levemente aberto para títulos corporativos
      },
    },
  },
  plugins: [],
};

export default config;
