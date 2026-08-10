import {
  TrackedCtaLink,
  TrackedPhoneLink,
  TrackedWhatsAppLink,
} from "@/components/site/TrackedLinks";
import { siteConfig } from "@/lib/site";

/**
 * Preço, prazo e garantia — as três perguntas que antecedem o contato.
 *
 * Existe por um motivo medido: as buscas por preço ("preço retífica de
 * cabeçote", "quanto custa retificar cabeçote") já colocam o anúncio em 1º
 * lugar entre 68% e 91% das vezes e convertiam ZERO, porque as palavras
 * "preço", "valor", "quanto custa" e "prazo" não apareciam nenhuma vez na
 * página que recebia esses cliques.
 *
 * Reescrito para caber numa olhada: ícone, uma frase curta, um destaque. Quem
 * chega com o carro parado não lê parágrafo — lê o que salta.
 *
 * O card de preço leva para `/quanto-custa`, onde a pessoa faz uma triagem sem
 * precisar conhecer o nome do serviço. Faixas só voltam após auditoria.
 */

type Props = {
  /** Usado nos rótulos de evento, para medir qual página converte. */
  contexto: string;
  /** Serviço canônico enviado em todos os eventos do bloco. */
  serviceId?: string;
  /** Slug da página usado para pré-selecionar a triagem. */
  serviceSlug?: string;
  /** Mensagem que já vai preenchida no WhatsApp. */
  whatsappMessage: string;
  /** Alterna com a seção vizinha para as faixas não se fundirem. */
  fundo?: "creme" | "branco";
};

const traco = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

type Cartao = {
  titulo: string;
  destaque: string;
  texto: string;
  href?: string;
  cta?: string;
  selo?: boolean;
  icone: React.ReactNode;
};

const cartoes: Cartao[] = [
  {
    titulo: "Quanto custa",
    destaque: "Organize o seu caso primeiro",
    texto: "A triagem leva cerca de 2 minutos e mostra o que vale verificar, sem transformar suspeita em diagnóstico.",
    href: "/quanto-custa",
    cta: "Fazer a triagem",
    icone: (
      <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true" {...traco}>
        <circle cx="16" cy="16" r="11" />
        <path d="M16 10v12M13 13.2c0-1.4 1.3-2.2 3-2.2s3 .8 3 2.2c0 2.9-6 1.9-6 5 0 1.4 1.3 2.2 3 2.2s3-.8 3-2.2" />
      </svg>
    ),
  },
  {
    titulo: "Em quanto tempo",
    destaque: "Prazo antes de aprovar",
    texto: "A equipe confirma o prazo junto com o orçamento, depois de entender o estado e o escopo da peça.",
    icone: (
      <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true" {...traco}>
        <circle cx="16" cy="16" r="11" />
        <path d="M16 9.5V16l4.5 3" />
      </svg>
    ),
  },
  {
    titulo: "E se der problema",
    destaque: "6 meses de garantia",
    texto: "Aplicada ao serviço executado. A cobertura e as condições são confirmadas no atendimento.",
    selo: true,
    icone: (
      <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true" {...traco}>
        <path d="M16 4.5 6.5 8v7.5c0 6.2 3.9 11.7 9.5 14 5.6-2.3 9.5-7.8 9.5-14V8L16 4.5Z" />
        <path d="m11.8 15.8 3 3 5.4-5.6" />
      </svg>
    ),
  },
];

export function PrecoPrazoGarantia({
  contexto,
  serviceId,
  serviceSlug,
  whatsappMessage,
  fundo = "creme",
}: Props) {
  return (
    <section className={`${fundo === "creme" ? "bg-[#FFFBF2]" : "bg-white"} py-14 md:py-20`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="max-w-xl font-heading text-[1.7rem] font-bold leading-tight tracking-[-0.01em] text-gray-900 md:text-[2.4rem]">
          O que você sabe antes de aprovar
        </h2>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {cartoes.map((c) => {
            const conteudo = (
              <>
                <span className="text-rp-accent">{c.icone}</span>
                <h3 className="mt-4 font-heading text-xs font-bold uppercase tracking-[0.16em] text-gray-400">
                  {c.titulo}
                </h3>
                <p className="mt-1 font-heading text-xl font-bold leading-snug text-gray-900">
                  {c.destaque}
                </p>
                <p className="mt-2 text-base leading-relaxed text-gray-600">{c.texto}</p>
                {c.cta ? (
                  <span className="mt-4 inline-flex items-center gap-1.5 font-heading text-sm font-bold text-rp-accent">
                    {c.cta}
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                ) : null}
              </>
            );

            return c.href ? (
              <TrackedCtaLink
                key={c.titulo}
                href={
                  serviceSlug
                    ? `${c.href}?service=${encodeURIComponent(serviceSlug)}`
                    : c.href
                }
                eventLabel={`${contexto}_price_quiz`}
                serviceId={serviceId}
                trackingPosition={`${contexto}_price_card`}
                className="group flex flex-col rounded-2xl border border-rp-accent/25 bg-white p-5 shadow-sm transition hover:border-rp-accent hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rp-accent"
              >
                {conteudo}
              </TrackedCtaLink>
            ) : (
              <div
                key={c.titulo}
                className={`flex flex-col rounded-2xl border bg-white p-5 shadow-sm ${
                  c.selo
                    ? "border-rp-gold/60 ring-1 ring-rp-gold/25"
                    : "border-[#E8EEF8]"
                }`}
              >
                {conteudo}
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
          <TrackedWhatsAppLink
            eventLabel={`${contexto}_ppg_whatsapp`}
            message={whatsappMessage}
            serviceId={serviceId}
            className="inline-flex h-13 items-center justify-center rounded-full bg-[#25D366] px-7 font-heading text-base font-bold text-[#04240F] transition hover:brightness-110 md:h-14"
          >
            Pedir orientação no WhatsApp
          </TrackedWhatsAppLink>
          <TrackedPhoneLink
            eventLabel={`${contexto}_ppg_phone`}
            serviceId={serviceId}
            className="inline-flex h-13 items-center justify-center rounded-full border border-gray-300 px-7 font-heading text-base font-bold text-gray-800 transition hover:border-rp-accent hover:text-rp-accent md:h-14"
          >
            Ligar {siteConfig.phone.display}
          </TrackedPhoneLink>
        </div>
      </div>
    </section>
  );
}
