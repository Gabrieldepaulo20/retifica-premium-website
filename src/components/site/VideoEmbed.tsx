"use client";

import { useState } from "react";
import type { VideoSlot } from "@/lib/videos";
import { trackMarketingEvent } from "@/lib/trackingEvents";

type VideoEmbedProps = {
  slot: VideoSlot;
  eventLabel?: string;
  className?: string;
};

/**
 * Facade de vídeo do YouTube: mostra só a capa + botão de play.
 * O iframe pesado só carrega no clique (melhor LCP/INP e PageSpeed).
 * Renderiza null enquanto o slot não tiver `youtubeId`.
 */
export function VideoEmbed({ slot, eventLabel, className = "" }: VideoEmbedProps) {
  const [active, setActive] = useState(false);

  if (!slot.youtubeId) return null;

  const id = slot.youtubeId;
  const poster = slot.poster ?? `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;

  return (
    <div
      className={`relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-[0_20px_50px_rgba(0,0,0,0.35)] ${className}`}
    >
      {active ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={slot.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      ) : (
        <button
          type="button"
          onClick={() => {
            setActive(true);
            if (eventLabel) {
              trackMarketingEvent("cta_click", {
                event_category: "engagement",
                event_label: eventLabel,
              });
            }
          }}
          className="group absolute inset-0 h-full w-full"
          aria-label={`Reproduzir vídeo: ${slot.title}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={poster}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <span className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/20" />
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-rp-gold shadow-lg transition-transform group-hover:scale-110 md:h-20 md:w-20">
            <svg
              viewBox="0 0 24 24"
              className="ml-1 h-7 w-7 text-rp-navy md:h-9 md:w-9"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
