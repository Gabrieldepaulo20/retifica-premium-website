"use client";

import { navItems } from "@/lib/nav";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Travar scroll do body quando menu mobile estiver aberto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[9999] h-[225px] bg-[#020E1D]"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        height: "225px",
        backgroundColor: "#020E1D",
      }}
      role="banner"
    >
      <nav
        className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8"
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
            width={120}
            height={32}
            className="h-auto w-auto"
            priority={true}
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const isB2B = item.href === "/b2b";
            if (isActive && isB2B) {
              return (
                <span
                  key={item.href}
                  className={cn(
                    "relative text-sm font-medium text-rp-gold",
                    "cursor-default"
                  )}
                  aria-current="page"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-rp-gold" />
                </span>
              );
            }
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
          className="md:hidden"
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
          >
            {mobileMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="absolute left-0 right-0 top-[225px] border-t border-[#1E3B73] bg-[#020E1D] shadow-lg md:hidden"
        >
          <div className="px-4 py-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const isB2B = item.href === "/b2b";
              if (isActive && isB2B) {
                return (
                  <span
                    key={item.href}
                    className="block cursor-default py-3 text-base font-medium text-rp-gold"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block py-3 text-base font-medium text-white transition-colors",
                    isActive ? "text-rp-gold" : "hover:text-rp-gold"
                  )}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
