"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Pequeno delay para animação de entrada
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Link
      href="https://wa.me/5516993021998?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Ret%C3%ADfica%20Premium%20e%20gostaria%20de%20solicitar%20um%20or%C3%A7amento%20para%20ret%C3%ADfica%20de%20cabe%C3%A7ote."
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-5 right-5 z-[999] transition-all duration-300 animate-bounce-subtle ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
      } hover:scale-110 hover:shadow-2xl active:scale-105`}
      aria-label="Chamar no WhatsApp"
    >
      <div className="relative w-[56px] h-[56px] md:w-[68px] md:h-[68px] rounded-full shadow-lg overflow-hidden ring-2 ring-white/20 hover:ring-white/40 transition-all">
        <Image
          src="/whatsapprodape.png"
          alt="WhatsApp"
          width={68}
          height={68}
          className="w-full h-full object-cover"
          priority
        />
      </div>
    </Link>
  );
}
