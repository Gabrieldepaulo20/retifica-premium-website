"use client";

import { useEffect } from "react";

export function ContatoScroll() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#formulario" || hash === "#contato-form") {
      const formElement = document.getElementById("formulario") || document.getElementById("contato-form");
      if (formElement) {
        const timer = window.setTimeout(() => {
          const elementPosition = formElement.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - 120;
          const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
          ).matches;

          window.scrollTo({
            top: offsetPosition,
            behavior: reduceMotion ? "auto" : "smooth",
          });
        }, 100);

        return () => window.clearTimeout(timer);
      }
    }
  }, []);

  return null;
}
