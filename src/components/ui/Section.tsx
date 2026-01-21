import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  background?: "white" | "gray" | "navy" | "royal" | "dark" | "hero-light";
  withOverlay?: boolean;
  id?: string;
}

const backgroundClasses = {
  white: "bg-white",
  gray: "bg-rp-gray",
  navy: "bg-rp-navy",
  royal: "bg-rp-royal",
  dark: "bg-rp-dark",
  "hero-light": "bg-white bg-hero-light",
};

export function Section({
  children,
  className,
  background = "white",
  withOverlay = false,
  id,
}: SectionProps) {
  const baseClasses = backgroundClasses[background];

  return (
    <section
      id={id}
      className={cn(
        baseClasses,
        withOverlay && "section-dark-overlay",
        className
      )}
    >
      {children}
    </section>
  );
}
