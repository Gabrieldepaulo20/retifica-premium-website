import Image from "next/image";
import Link from "next/link";

const HORARIOS = [
  { dia: "Segunda-feira", horario: "08:00–11:30, 13:00–18:00" },
  { dia: "Terça-feira", horario: "08:00–11:30, 13:00–18:00" },
  { dia: "Quarta-feira", horario: "08:00–11:30, 13:00–18:00" },
  { dia: "Quinta-feira", horario: "08:00–11:30, 13:00–18:00" },
  { dia: "Sexta-feira", horario: "08:00–12:00, 13:00–17:30" },
  { dia: "Sábado", horario: "Fechado" },
  { dia: "Domingo", horario: "Fechado" },
] as const;

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden bg-[#053282] text-white"
      role="contentinfo"
    >
      {/* Textura de fundo com overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-35 mix-blend-overlay"
        style={{
          backgroundImage: "url('/fundorodape.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "420px 420px",
        }}
        aria-hidden
      />

      {/* Conteúdo acima da textura */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-14 lg:px-8">
        {/* Footer Mobile */}
        <div className="md:hidden space-y-8 pb-[90px]">
          <div className="flex flex-col items-center text-center space-y-4">
            <Link
              href="/"
              className="inline-block focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#053282] rounded"
              aria-label="Retífica Premium - Página inicial"
            >
              <Image
                src="/logo.png"
                alt="Retífica Premium"
                width={180}
                height={60}
                className="h-auto w-[180px]"
              />
            </Link>
            <p className="max-w-[260px] text-sm leading-relaxed text-white/85">
              Especialistas em retífica de cabeçotes com mais de 20 anos de
              experiência.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/85">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-white">
              Contato
            </h3>
            <ul className="space-y-2 leading-relaxed">
              <li>
                Av. Fioravante Magro, 1059 - Jardim Boa Vista, Sertãozinho - SP,
                14177-578
              </li>
              <li>
                <a
                  href="tel:+551635244661"
                  className="transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#053282] rounded"
                >
                  (16) 3524-4661
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5516993021998"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#053282] rounded"
                >
                  (16) 99302-1998
                </a>{" "}
                <span className="text-white/60">(WhatsApp)</span>
              </li>
              <li>
                <a
                  href="mailto:retificapremium5@gmail.com"
                  className="break-all transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#053282] rounded"
                >
                  retificapremium5@gmail.com
                </a>
              </li>
              <li className="text-white/70">CNPJ: 48.842.592/0001-15</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-white">
              Funcionamento
            </h3>
            <ul className="space-y-2 text-sm leading-relaxed text-white/80">
              {HORARIOS.map(({ dia, horario }) => (
                <li key={dia} className="flex justify-between gap-3">
                  <span>{dia}</span>
                  <span className="text-right">{horario}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-center gap-6">
            <a
              href="https://wa.me/5516993021998"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#053282] rounded"
              aria-label="WhatsApp"
            >
              <Image
                src="/whatsapprodape.png"
                alt="WhatsApp"
                width={36}
                height={36}
                className="h-9 w-9 object-contain"
              />
              <span className="text-xs text-white/80">WhatsApp</span>
            </a>
            <a
              href="https://www.instagram.com/retifica_premium/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#053282] rounded"
              aria-label="Instagram"
            >
              <Image
                src="/instagram.png"
                alt="Instagram"
                width={36}
                height={36}
                className="h-9 w-9 object-contain"
              />
              <span className="text-xs text-white/80">Instagram</span>
            </a>
          </div>

          <div className="border-t border-white/15 pt-6 text-center text-xs leading-relaxed text-white/70">
            <p>© 2026 Retífica Premium. Todos os direitos reservados.</p>
          </div>
        </div>

        {/* Footer Desktop */}
        <div className="hidden md:block">
          <div className="grid grid-cols-1 gap-10 border-white/10 sm:gap-12 lg:grid-cols-3 lg:gap-14 [&>div]:border-b [&>div]:border-white/10 [&>div]:pb-10 lg:[&>div]:border-b-0 lg:[&>div]:pb-0">
            {/* Coluna A — Brand */}
            <div className="space-y-5">
              <Link
                href="/"
                className="inline-block focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#053282] rounded"
                aria-label="Retífica Premium - Página inicial"
              >
                <Image
                  src="/logo.png"
                  alt="Retífica Premium"
                  width={140}
                  height={38}
                  className="h-auto w-auto"
                />
              </Link>
              <p className="max-w-xs text-sm leading-relaxed text-white/80">
                Especialistas em retífica de cabeçotes com mais de 20 anos de
                experiência.
              </p>
            </div>

            {/* Coluna B — Contato */}
            <div className="space-y-5">
              <h3 className="text-sm font-bold uppercase tracking-widest text-white">
                Contato
              </h3>
              <ul className="space-y-2.5 text-sm leading-relaxed text-white/80">
                <li>
                  Av. Fioravante Magro, 1059 - Jardim Boa Vista, Sertãozinho - SP,
                  14177-578
                </li>
                <li>
                  <a
                    href="tel:+551635244661"
                    className="transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#053282] rounded"
                  >
                    (16) 3524-4661
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/5516993021998"
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#053282] rounded"
                  >
                    (16) 99302-1998
                  </a>{" "}
                  <span className="text-white/60">(WhatsApp)</span>
                </li>
                <li>
                  <a
                    href="mailto:retificapremium5@gmail.com"
                    className="break-all transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#053282] rounded"
                  >
                    retificapremium5@gmail.com
                  </a>
                </li>
                <li className="text-white/70">CNPJ: 48.842.592/0001-15</li>
              </ul>

              {/* Ícones WhatsApp e Instagram */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="https://wa.me/5516993021998"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#053282] rounded"
                  aria-label="WhatsApp"
                >
                  <Image
                    src="/whatsapprodape.png"
                    alt="WhatsApp"
                    width={32}
                    height={32}
                    className="h-8 w-8 object-contain"
                  />
                  <span className="text-xs text-white/70">WhatsApp</span>
                </a>
                <a
                  href="https://www.instagram.com/retifica_premium/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#053282] rounded"
                  aria-label="Instagram"
                >
                  <Image
                    src="/instagram.png"
                    alt="Instagram"
                    width={32}
                    height={32}
                    className="h-8 w-8 object-contain"
                  />
                  <span className="text-xs text-white/70">Instagram</span>
                </a>
              </div>
            </div>

            {/* Coluna C — Funcionamento */}
            <div className="space-y-5">
              <h3 className="text-sm font-bold uppercase tracking-widest text-white">
                Funcionamento
              </h3>
              <ul className="space-y-2 text-sm leading-relaxed text-white/80">
                {HORARIOS.map(({ dia, horario }) => (
                  <li
                    key={dia}
                    className="grid grid-cols-[1fr_auto] gap-4 sm:gap-6"
                  >
                    <span>{dia}:</span>
                    <span className="text-right">{horario}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Linha divisória antes do copyright */}
          <div className="mt-10 border-t border-white/15 md:mt-12" />

          {/* Copyright */}
          <div className="pt-8 text-center text-sm leading-relaxed text-white/70">
            <p>© 2026 Retífica Premium. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
