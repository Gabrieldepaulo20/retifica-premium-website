"use client";

import { useEffect, useRef, useState } from "react";
import { trackMarketingEvent } from "@/lib/trackingEvents";

type Props = {
  /** Caminho do MP4 em /public. */
  src: string;
  /** Capa mostrada antes do vídeo carregar. */
  poster: string;
  /** Descrição do que o vídeo mostra. Vai para o alt e para o leitor de tela. */
  descricao: string;
  eventLabel: string;
  className?: string;
};

/**
 * Vídeo curto hospedado no próprio site.
 *
 * Por que não YouTube: o clipe tem 10 segundos e 1 MB. Um embed do YouTube
 * custa mais que o próprio vídeo — carrega player, faz requisição para três
 * domínios de terceiro, grava cookie (o que obriga a passar pelo consentimento
 * antes de aparecer) e termina mostrando vídeos de outros canais numa página
 * cuja única função é converter.
 *
 * Comportamento: começa sem som quando entra na tela, em laço, e para quando
 * sai. Navegador nenhum permite autoplay COM som antes de a pessoa interagir —
 * por isso o som existe no arquivo mas fica atrás de um botão. Quem prefere
 * menos movimento no sistema recebe só a capa.
 */
export function VideoLocal({ src, poster, descricao, eventLabel, className = "" }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [visivel, setVisivel] = useState(false);
  const [comSom, setComSom] = useState(false);
  const jaContou = useRef(false);

  function alternarSom() {
    const elemento = ref.current;
    if (!elemento) return;
    const ligando = elemento.muted;
    elemento.muted = !ligando;
    setComSom(ligando);
    if (ligando) {
      void elemento.play().catch(() => {});
      trackMarketingEvent("video_som_ativado", {
        event_category: "engagement",
        event_label: eventLabel,
        component_id: "video_local",
      });
    }
  }

  useEffect(() => {
    const elemento = ref.current;
    if (!elemento) return;

    const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (semMovimento) return;

    const observador = new IntersectionObserver(
      ([entrada]) => {
        setVisivel(entrada.isIntersecting);
        if (entrada.isIntersecting) {
          // O play pode ser recusado (economia de bateria, por exemplo).
          // A capa continua no lugar, então não há tela preta.
          void elemento.play().catch(() => {});
          if (!jaContou.current) {
            jaContou.current = true;
            trackMarketingEvent("video_play", {
              event_category: "engagement",
              event_label: eventLabel,
              component_id: "video_local",
            });
          }
        } else {
          elemento.pause();
        }
      },
      { threshold: 0.4 }
    );

    observador.observe(elemento);
    return () => observador.disconnect();
  }, [eventLabel]);

  return (
    <div
      className={`relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-[0_20px_50px_rgba(0,0,0,0.35)] ${className}`}
    >
      <video
        ref={ref}
        // `preload="none"` deixa o carregamento para quando o vídeo se aproxima
        // da tela. A capa aparece imediatamente e o MP4 só desce se for visto.
        preload="none"
        poster={poster}
        muted
        loop
        playsInline
        aria-label={descricao}
        className="h-full w-full object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>

      {/*
        O botão fica sempre visível: sem ele, ninguém descobre que há áudio.
        Rótulo em texto, não só ícone — o público não é jovem e ícone de
        alto-falante cortado é ambíguo.
      */}
      <button
        type="button"
        onClick={alternarSom}
        className="absolute bottom-3 right-3 inline-flex min-h-11 items-center gap-2 rounded-full bg-black/65 px-4 font-heading text-sm font-bold text-white backdrop-blur-sm transition hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M11 5 6.5 9H3v6h3.5L11 19V5Z" />
          {comSom ? (
            <path d="M15.5 9.5a3.5 3.5 0 0 1 0 5M18.5 7a7 7 0 0 1 0 10" />
          ) : (
            <path d="m16 9 5 6M21 9l-5 6" />
          )}
        </svg>
        {comSom ? "Desligar som" : "Ouvir com som"}
      </button>

      {!visivel ? <span className="sr-only">{descricao}</span> : null}
    </div>
  );
}
