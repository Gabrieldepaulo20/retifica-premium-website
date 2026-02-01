"use client";

import { useEffect } from "react";

export function ContatoScroll() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#formulario" || hash === "#contato-form") {
      const formElement = document.getElementById("formulario") || document.getElementById("contato-form");
      if (formElement) {
        // Delay para garantir que o DOM está pronto
        setTimeout(() => {
          // Pega a posição do elemento
          const elementPosition = formElement.getBoundingClientRect().top + window.pageYOffset;
          // Offset de 120px para não cortar o topo (ajuste conforme header + respiro)
          const offsetPosition = elementPosition - 120;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }, 100);
      }
    }
  }, []);

  return null;
}
