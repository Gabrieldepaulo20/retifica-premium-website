"use client";

import { useEffect } from "react";

export function MaterialSymbolsLoader() {
  useEffect(() => {
    let link = document.querySelector(
      'link[data-material-symbols="true"]'
    ) as HTMLLinkElement | null;
    let appendedByComponent = false;

    const timer = window.setTimeout(() => {
      if (link) return;

      link = document.createElement("link");
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap";
      link.dataset.materialSymbols = "true";
      document.head.appendChild(link);
      appendedByComponent = true;
    }, 1200);

    return () => {
      window.clearTimeout(timer);

      if (appendedByComponent && link?.parentNode) {
        link.parentNode.removeChild(link);
      }
    };
  }, []);

  return null;
}
