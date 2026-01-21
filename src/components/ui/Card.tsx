import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
  variant?: "default" | "bordered" | "shadow";
}

const paddingClasses = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const variantClasses = {
  default: "bg-white",
  bordered: "bg-white border border-gray-200",
  shadow: "bg-white shadow-card",
};

export function Card({
  children,
  className,
  padding = "md",
  variant = "shadow",
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-card",
        paddingClasses[padding],
        variantClasses[variant],
        className
      )}
    >
      {children}
    </div>
  );
}
