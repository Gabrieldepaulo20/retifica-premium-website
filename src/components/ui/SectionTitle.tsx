import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionTitleProps {
  children: ReactNode;
  subtitle?: ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
  variant?: "default" | "large" | "small";
  highlight?: string; // Texto a ser destacado em rp-accent
}

const variantClasses = {
  default: "text-3xl sm:text-4xl lg:text-5xl",
  large: "text-4xl sm:text-5xl lg:text-6xl",
  small: "text-2xl sm:text-3xl lg:text-4xl",
};

const alignClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export function SectionTitle({
  children,
  subtitle,
  className,
  align = "center",
  variant = "default",
  highlight,
}: SectionTitleProps) {
  let titleContent = children;

  // Se houver highlight, substitui o texto específico
  if (highlight && typeof children === "string") {
    const parts = children.split(highlight);
    titleContent = (
      <>
        {parts[0]}
        <span className="text-rp-accent">{highlight}</span>
        {parts[1]}
      </>
    );
  }

  return (
    <div className={cn("mb-6 sm:mb-8", alignClasses[align], className)}>
      <h2
        className={cn(
          "font-heading font-semibold tracking-corporate",
          variantClasses[variant],
          align === "center" ? "mx-auto" : ""
        )}
      >
        {titleContent}
      </h2>
      {subtitle && (
        <p className={cn("mt-4 text-lg text-gray-600", alignClasses[align])}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
