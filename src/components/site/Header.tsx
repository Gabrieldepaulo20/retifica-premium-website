"use client";

import { navItems } from "@/lib/nav";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { siteConfig } from "@/lib/site";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const normalizePath = (path: string) =>
    path === "/" ? "/" : path.replace(/\/$/, "");
  const normalizedPathname = normalizePath(pathname);

  return (
    <header className="w-full bg-[#020E1D]" role="banner">
      <nav
        className="relative mx-auto flex h-auto max-w-7xl flex-row items-center justify-between gap-3 px-4 pb-4 pt-5 sm:px-6 md:h-[132px] md:gap-0 md:py-0 lg:px-8"
        role="navigation"
        aria-label="Navegação principal"
      >
        {/* Logo */}
        <Link
          href="/"
          className="order-2 flex items-center md:order-none"
          aria-label="Retífica Premium - Página inicial"
        >
          <Image
            src="/logo.png"
            alt="Retífica Premium"
            width={729}
            height={551}
            sizes="(max-width: 767px) 125px, 111px"
            className="h-auto w-[112px] object-contain md:h-[84px] md:w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-8">
          {navItems.map((item) => {
            const normalizedItemHref = normalizePath(item.href);
            const isActive =
              normalizedItemHref === "/"
                ? normalizedPathname === "/"
                : normalizedPathname === normalizedItemHref ||
                  normalizedPathname.startsWith(normalizedItemHref + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-sm font-medium text-white transition-colors hover:text-rp-gold",
                  isActive && "text-rp-gold"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-rp-gold" />
                )}
                {!isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-transparent transition-colors hover:bg-rp-gold" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Botão de menu — primeiro na ordem visual do celular.
            Leva a palavra "Menu" junto do ícone de propósito: o desenho de três
            traços é reconhecido pela maioria, mas não por todo mundo, e o
            público desta página inclui gente de mais idade e quem está com
            pressa dentro de uma oficina. A palavra elimina a dúvida e custa
            poucos pixels. */}
        <button
          type="button"
          className="order-1 flex h-12 shrink-0 items-center gap-2 rounded-xl border border-white/25 bg-white/5 px-3.5 text-white transition-all hover:border-white/45 hover:bg-white/10 md:hidden"
          aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg
            className="h-6 w-6 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            {mobileMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
          <span className="font-heading text-base font-bold">
            {mobileMenuOpen ? "Fechar" : "Menu"}
          </span>
        </button>

        {/* Ligar — o outro lado da barra. Serviço de emergência: o telefone
            precisa estar a um toque em qualquer página, não só no rodapé. */}
        <a
          href={siteConfig.phone.href}
          className="order-3 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-rp-gold/40 bg-rp-gold/10 text-rp-gold transition-all hover:bg-rp-gold hover:text-[#1A1200] md:hidden"
          aria-label={`Ligar para ${siteConfig.phone.display}`}
        >
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M6.6 3.5h3l1.5 3.8-2 1.3a12 12 0 0 0 5.3 5.3l1.3-2 3.8 1.5v3a1.6 1.6 0 0 1-1.7 1.6A16.5 16.5 0 0 1 5 5.2 1.6 1.6 0 0 1 6.6 3.5Z" />
          </svg>
        </a>
      </nav>

      {/* Mobile Menu - Push-down (não overlay) */}
      <div
        id="mobile-menu"
        hidden={!mobileMenuOpen}
        className={cn(
          "border-t border-[#1E3B73] bg-[#020E1D] shadow-lg md:hidden",
          "overflow-hidden transition-all duration-300 ease-out",
          mobileMenuOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <ul className="flex flex-col px-4 py-2">
          {navItems.map((item) => {
            const normalizedItemHref = normalizePath(item.href);
            const isActive =
              normalizedItemHref === "/"
                ? normalizedPathname === "/"
                : normalizedPathname === normalizedItemHref ||
                  normalizedPathname.startsWith(normalizedItemHref + "/");
            return (
              <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex min-h-13 items-center border-b border-white/10 font-heading text-lg font-bold text-white transition-colors last:border-b-0",
                  isActive ? "text-rp-gold" : "hover:text-rp-gold"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
