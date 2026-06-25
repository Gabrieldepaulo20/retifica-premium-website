import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center bg-[#FFFBF2] px-4 py-20">
      <section className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-bold uppercase tracking-wide text-[#F4891F]">
          Página não encontrada
        </p>
        <h1 className="mt-3 font-heading text-4xl font-bold text-[#053282] md:text-6xl">
          Não encontramos essa página
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-700 md:text-lg">
          A página pode ter mudado de endereço. Acesse os serviços da Retífica
          Premium ou fale com a equipe para orçamento de retífica, cabeçote e
          diagnóstico de motor.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/servicos"
            className="inline-flex h-12 items-center justify-center rounded-full bg-[#053282] px-8 text-sm font-bold text-white transition-all hover:brightness-110 md:h-14 md:text-base"
          >
            Ver serviços
          </Link>
          <Link
            href="/contato"
            className="inline-flex h-12 items-center justify-center rounded-full border border-[#053282] px-8 text-sm font-bold text-[#053282] transition-all hover:bg-[#D9E7FF] md:h-14 md:text-base"
          >
            Falar com a Retífica Premium
          </Link>
        </div>
      </section>
    </main>
  );
}
