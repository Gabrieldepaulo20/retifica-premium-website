"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { trackEngagementEvent } from "@/lib/trackingEvents";
import { whatsappBudgetUrl } from "@/lib/site";

export function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Pequeno delay para animação de entrada
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Link
      href={whatsappBudgetUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        e.stopPropagation();
        trackEngagementEvent(
          "whatsapp_floating_click",
          "whatsapp_click",
          "floating"
        );
      }}
      className={`fixed bottom-[calc(60px+env(safe-area-inset-bottom))] right-4 z-[999] transition-all duration-300 animate-bounce-subtle max-[640px]:bottom-[calc(68px+env(safe-area-inset-bottom))] md:bottom-5 md:right-5 ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
      } hover:scale-110 hover:shadow-2xl active:scale-105`}
      aria-label="Chamar no WhatsApp"
    >
      <div className="relative h-[52px] w-[52px] md:h-[68px] md:w-[68px] rounded-full shadow-lg overflow-hidden ring-2 ring-white/20 hover:ring-white/40 transition-all">
        <Image
          src="/whatsapprodape.png"
          alt="WhatsApp"
          width={68}
          height={68}
          className="w-full h-full object-cover"
        />
      </div>
    </Link>
  );
}
