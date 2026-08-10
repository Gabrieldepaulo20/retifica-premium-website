/**
 * Placeholder de mídia.
 *
 * Ocupa a proporção final do arquivo definitivo para não haver deslocamento de
 * layout quando a foto ou o vídeo real entrar. Enquanto a mídia definitiva não
 * existe, mostra uma visualização técnica pública — nunca nome de arquivo,
 * instrução editorial ou marcador de conteúdo inacabado.
 *
 * Não usa foto de banco de imagens: uma bancada que não é a da Retífica Premium,
 * apresentada como se fosse, é propaganda enganosa — e queima justamente a
 * credibilidade que a página existe para construir.
 *
 * O briefing completo de cada peça está em `docs/redesign-servicos-midia.md`.
 */

type Props = {
  /** Identificador do briefing, ex.: "img-01". Facilita achar e substituir. */
  id: string;
  /** Nome sugerido do arquivo final. */
  arquivo: string;
  /** Resumo do que a imagem/vídeo precisa mostrar. */
  resumo: string;
  /** Título que agrega valor para o visitante; nunca contém instrução editorial. */
  title?: string;
  /** Legenda pública curta. */
  caption?: string;
  /** Proporção final. Classe de aspecto do Tailwind. */
  proporcao?: string;
  /** `escuro` sobre fundo navy, `claro` sobre fundo branco. */
  tom?: "escuro" | "claro";
  className?: string;
};

export function MidiaPlaceholder({
  id,
  title = "Inspeção técnica da peça",
  caption = "Limpeza, medição e conferência antes da definição do serviço.",
  proporcao = "aspect-[4/3]",
  tom = "escuro",
  className = "",
}: Props) {
  const escuro = tom === "escuro";

  return (
    <div
      role="img"
      aria-label={`${title}. ${caption}`}
      data-media-slot={id}
      className={`relative flex ${proporcao} w-full flex-col justify-between overflow-hidden rounded-2xl border p-5 ${
        escuro
          ? "border-rp-gold/25 bg-white/[0.04] text-white"
          : "border-rp-accent/20 bg-[#F5F8FD] text-gray-800"
      } ${className}`}
    >
      {/* Malha de cota, para o espaço vazio não parecer erro de carregamento */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage: escuro
            ? "linear-gradient(to right, rgba(251,191,36,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(251,191,36,0.06) 1px, transparent 1px)"
            : "linear-gradient(to right, rgba(37,99,235,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(37,99,235,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative flex items-center justify-between gap-3">
        <span
          className={`font-heading text-xs font-bold uppercase tracking-[0.2em] ${
            escuro ? "text-rp-gold" : "text-rp-accent"
          }`}
        >
          Verificação técnica
        </span>
        <svg viewBox="0 0 48 48" className={`h-8 w-8 ${escuro ? "text-rp-gold/70" : "text-rp-accent/55"}`} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
          <path d="M8 17h32v17H8zM13 17V12h22v5M15 25h18M18 29h12" />
          <circle cx="14" cy="21" r="1.5" /><circle cx="34" cy="21" r="1.5" />
        </svg>
      </div>

      <div className="relative">
        <p className={`font-heading text-xl font-bold leading-tight ${escuro ? "text-white" : "text-gray-900"}`}>
          {title}
        </p>
        <p className={`mt-2 max-w-md text-sm leading-relaxed ${escuro ? "text-white/65" : "text-gray-600"}`}>
          {caption}
        </p>
      </div>
    </div>
  );
}
