/**
 * Placeholder de mídia.
 *
 * Ocupa a proporção final do arquivo definitivo para não haver deslocamento de
 * layout quando a foto ou o vídeo real entrar. Mostra o resumo do briefing na
 * própria tela para que quem for produzir a mídia saiba o que precisa ser feito
 * sem abrir a documentação.
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
  /** Proporção final. Classe de aspecto do Tailwind. */
  proporcao?: string;
  /** `escuro` sobre fundo navy, `claro` sobre fundo branco. */
  tom?: "escuro" | "claro";
  className?: string;
};

export function MidiaPlaceholder({
  id,
  arquivo,
  resumo,
  proporcao = "aspect-[4/3]",
  tom = "escuro",
  className = "",
}: Props) {
  const escuro = tom === "escuro";

  return (
    <div
      role="img"
      aria-label={`Espaço reservado para mídia: ${resumo}`}
      className={`relative flex ${proporcao} w-full flex-col justify-between overflow-hidden rounded-2xl border border-dashed p-5 ${
        escuro
          ? "border-rp-gold/35 bg-white/[0.04] text-white"
          : "border-rp-accent/35 bg-[#F5F8FD] text-gray-800"
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
          Substituir por mídia
        </span>
        <span
          className={`font-heading text-xs font-bold uppercase tracking-[0.14em] ${
            escuro ? "text-white/55" : "text-gray-400"
          }`}
        >
          {id}
        </span>
      </div>

      <div className="relative">
        <p className={`text-sm leading-snug ${escuro ? "text-white/72" : "text-gray-600"}`}>
          {resumo}
        </p>
        <p
          className={`mt-2 font-mono text-xs ${
            escuro ? "text-white/55" : "text-gray-400"
          }`}
        >
          {arquivo}
        </p>
      </div>
    </div>
  );
}
