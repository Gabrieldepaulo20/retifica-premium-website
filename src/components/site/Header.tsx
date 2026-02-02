"use client";

import { navItems } from "@/lib/nav";
import { cn } from "@/lib/utils";
import Image from "next/image";
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
        className="relative mx-auto flex h-auto max-w-7xl flex-col items-center justify-center gap-2 px-4 py-4 max-[640px]:pt-8 max-[640px]:pb-2 sm:px-6 md:h-[200px] md:flex-row md:items-center md:justify-between md:gap-0 md:py-0 lg:px-8"
        role="navigation"
        aria-label="Navegação principal"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center"
          aria-label="Retífica Premium - Página inicial"
        >
          <Image
            src="/logo.png"
            alt="Retífica Premium"
            width={140}
            height={38}
            className="h-[90px] w-[125px] object-contain md:h-auto md:w-auto"
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

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="mt-1 flex h-[35px] w-[45px] items-center justify-center rounded-md border border-white/20 bg-white/5 text-white transition-all hover:border-white/40 hover:bg-white/10 max-[640px]:mt-2 max-[640px]:h-[38px] max-[640px]:w-[48px] md:hidden"
          aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg
            className="h-7 w-7 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {mobileMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu - Push-down (não overlay) */}
      <div
        id="mobile-menu"
        className={cn(
          "border-t border-[#1E3B73] bg-[#020E1D] shadow-lg md:hidden",
          "overflow-hidden transition-all duration-300 ease-out",
          mobileMenuOpen ? "max-h-[260px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="flex flex-nowrap items-center justify-center gap-4 overflow-x-auto px-8 py-3">
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
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "relative inline-flex items-center px-2 py-2 text-[13px] font-semibold uppercase tracking-wide text-white transition-colors whitespace-nowrap",
                  "after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:bg-transparent after:content-[''] after:transition-all after:duration-300",
                  isActive
                    ? "text-rp-gold after:bg-rp-accent"
                    : "hover:text-rp-gold"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
