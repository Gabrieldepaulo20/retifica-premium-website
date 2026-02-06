"use client";

import { useEffect, useRef, useState } from "react";

interface StatsCounterProps {
  endValue: number;
  suffix?: string;
  duration?: number;
  label: string;
}

export function StatsCounter({
  endValue,
  suffix = "",
  duration = 2000,
  label,
}: StatsCounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);

            // Verificar prefers-reduced-motion
            const prefersReducedMotion =
              window.matchMedia("(prefers-reduced-motion: reduce)").matches;

            if (prefersReducedMotion) {
              setCount(endValue);
              return;
            }

            // Animação count-up
            const startTime = Date.now();
            const startValue = 0;

            const animate = () => {
              const elapsed = Date.now() - startTime;
              const progress = Math.min(elapsed / duration, 1);

              // Easing function (ease-out)
              const easeOut = 1 - Math.pow(1 - progress, 3);

              const currentValue = Math.floor(
                startValue + (endValue - startValue) * easeOut
              );
              setCount(currentValue);

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setCount(endValue);
              }
            };

            requestAnimationFrame(animate);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    const observedElement = elementRef.current;

    if (observedElement) {
      observer.observe(observedElement);
    }

    return () => {
      if (observedElement) {
        observer.unobserve(observedElement);
      }
    };
  }, [endValue, duration, hasAnimated]);

  return (
    <div ref={elementRef} className="text-center text-white">
      <div
        className="mb-2 font-rajdhani text-5xl font-bold md:text-6xl"
        style={{ fontFamily: "var(--font-rajdhani)", lineHeight: 1 }}
      >
        {count}
        {suffix}
      </div>
      <p
        className="text-sm md:text-base"
        style={{ fontFamily: "var(--font-open-sans)" }}
      >
        {label}
      </p>
    </div>
  );
}
