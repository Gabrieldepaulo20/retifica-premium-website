import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  BreadcrumbSchema,
  FAQSchema,
  ServiceDetailSchema,
} from "@/components/site/StructuredData";
import {
  TrackedCtaLink,
  TrackedWhatsAppLink,
} from "@/components/site/TrackedLinks";
import { FichaMedicao } from "@/components/site/FichaMedicao";
import { MidiaPlaceholder } from "@/components/site/MidiaPlaceholder";
import { PrecoPrazoGarantia } from "@/components/site/PrecoPrazoGarantia";
import { VideoEmbed } from "@/components/site/VideoEmbed";
import {
  getServicePageBySlug,
  medicoesPorServico,
  serviceDetailPages,
  servicePath,
} from "@/lib/service-pages";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { serviceVideos } from "@/lib/videos";

/**
 * PÁGINA DE SERVIÇO
 *
 * Esta é a página que mais recebe clique pago: 48 das 49 sessões pagas que
 * caem em /servicos vêm para as páginas de detalhe. Tudo aqui é decidido pelo
 * comportamento observado: o tráfego pago é majoritariamente móvel e a
 * cobertura de duração ainda é parcial. Por isso a primeira tela prioriza uma
 * decisão clara sem transformar a estimativa de abandono em fato global.
 *
 * Três consequências de projeto:
 *
 * 1. A conversão acontece na primeira tela. No celular a ordem é
 *    título → promessa → botões → ficha → números. Os botões vêm antes de
 *    qualquer prova, porque quem já decidiu não deve ter que rolar.
 *
 * 2. A ficha de medição substitui a foto genérica. É o objeto que a empresa
 *    entrega de verdade e responde as três perguntas que antecedem o contato.
 *    Fica logo abaixo dos botões, meio visível — o pedaço cortado é o que
 *    convida a rolar.
 *
 * 3. As seções são rotuladas com o vocabulário do serviço — sintoma, correção,
 *    entrega — porque essa é a ordem real do trabalho. Não é numeração
 *    decorativa: quem lê está tentando entender onde o problema dele se encaixa.
 */

type ServicePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return serviceDetailPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePageBySlug(slug);

  if (!page) {
    return {
      title: "Serviço não encontrado | Retífica Premium",
    };
  }

  const path = servicePath(page.slug);

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: absoluteUrl(path),
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: [
        {
          url: page.image,
          width: 1200,
          height: 630,
          alt: page.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
      images: [page.image],
    },
  };
}

/** Rótulo de seção. Usa o vocabulário da bancada, não numeração decorativa. */
function Etapa({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-heading text-[11px] font-bold uppercase tracking-[0.22em] text-rp-accent">
      {children}
    </p>
  );
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const page = getServicePageBySlug(slug);

  if (!page) notFound();

  const whatsappMessage = `Olá, vim pelo site da Retífica Premium e gostaria de orçamento para ${page.shortTitle}.`;
  const medicoes = medicoesPorServico[page.slug] ?? [];
  const video = serviceVideos[page.slug];

  return (
    <main className="min-h-screen bg-white">
      {/* ── PRIMEIRA TELA ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-rp-navy pb-12 pt-12 text-white md:pb-20 md:pt-20">
        {/* Malha de cotas ao fundo: linhas finas de desenho técnico. Sem imagem,
            sem requisição, sem custo de carregamento. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(251,191,36,0.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(251,191,36,0.055) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-rp-gold/45 to-transparent"
        />

        {/* No celular tudo vira uma coluna só e a ficha se intercala entre os
            botões e o texto — por isso a coluna da esquerda usa `contents`, que
            dissolve o wrapper e deixa os filhos participarem da mesma ordenação
            da ficha. A partir de `md` o wrapper volta a existir como coluna e a
            ficha ocupa a segunda. */}
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col px-4 sm:px-6 md:grid md:grid-cols-[1.02fr_0.98fr] md:items-center md:gap-x-14 lg:px-8">
          <div className="contents md:flex md:flex-col">
            <p className="font-heading text-[11px] font-bold uppercase tracking-[0.24em] text-rp-gold">
              Sertãozinho-SP · atende Ribeirão Preto e região
            </p>

            <h1 className="mt-4 font-heading text-[2.15rem] font-bold leading-[1.06] tracking-[-0.015em] md:text-[3.25rem]">
              {page.hero}
            </h1>

            {/* Botões logo abaixo do título: quem já decidiu não deve precisar
                rolar para achar onde clicar. */}
            <div className="order-[1] mt-6 flex flex-col gap-2.5 md:order-none md:mt-7 md:flex-row">
              <TrackedWhatsAppLink
                eventLabel={`service_${page.slug}_whatsapp`}
                message={whatsappMessage}
                serviceId={page.serviceId}
                className="inline-flex h-13 items-center justify-center rounded-full bg-[#25D366] px-7 font-heading text-base font-bold text-[#04240F] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:h-14"
              >
                Pedir orçamento no WhatsApp
              </TrackedWhatsAppLink>
              <TrackedCtaLink
                href={`/quanto-custa?service=${encodeURIComponent(page.slug)}`}
                eventLabel={`service_${page.slug}_guided_estimate`}
                serviceId={page.serviceId}
                className="inline-flex h-13 items-center justify-center rounded-full border border-white/35 px-7 font-heading text-base font-bold text-white transition hover:border-rp-gold hover:text-rp-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:h-14"
              >
                Fazer triagem deste caso
              </TrackedCtaLink>
            </div>

            <p className="order-[3] mt-7 max-w-xl text-base leading-relaxed text-white/72 md:order-none md:mt-5 md:text-lg">
              {page.intro}
            </p>

            <Link
              href="/servicos"
              className="order-[4] mt-6 inline-flex min-h-6 w-fit items-center font-heading text-[11px] font-bold uppercase tracking-[0.18em] text-white/55 transition-colors hover:text-rp-gold md:order-none"
            >
              ← Todos os serviços
            </Link>
          </div>

          {/* No celular a ficha entra logo depois dos botões — o corte na base
              da tela é o que convida a rolar. */}
          <div className="order-[2] mt-7 md:order-none md:mt-0">
            <FichaMedicao servico={page.shortTitle} medicoes={medicoes} />
          </div>
        </div>
      </section>

      {/* ── PREÇO, PRAZO E GARANTIA ────────────────────────────────────── */}
      <PrecoPrazoGarantia
        contexto={`service_${page.slug}`}
        serviceId={page.serviceId}
        serviceSlug={page.slug}
        whatsappMessage={whatsappMessage}
        fundo="creme"
      />

      {/* ── SINTOMA ────────────────────────────────────────────────────── */}
      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <Etapa>Sintoma</Etapa>
            <h2 className="mt-2 font-heading text-3xl font-bold leading-tight tracking-[-0.01em] text-gray-900 md:text-[2.6rem]">
              Reconhece algum destes?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-gray-600">
              Se o seu caso está aqui, manda uma mensagem descrevendo o que o
              motor está fazendo. A gente já responde com a próxima etapa.
            </p>
          </div>

          <ul className="mt-8 grid gap-x-8 gap-y-0 sm:grid-cols-2">
            {page.symptoms.map((symptom) => (
              <li
                key={symptom}
                className="flex items-baseline gap-3 border-b border-gray-200 py-4 last:border-b-0 sm:[&:nth-last-child(2)]:border-b-0"
              >
                <span
                  aria-hidden="true"
                  className="h-px w-4 shrink-0 translate-y-[-0.3em] bg-rp-accent"
                />
                <span className="font-heading text-lg font-semibold leading-snug text-gray-900 first-letter:uppercase">
                  {symptom}
                </span>
              </li>
            ))}
          </ul>

          <TrackedWhatsAppLink
            eventLabel={`service_${page.slug}_sintoma_whatsapp`}
            message={whatsappMessage}
            serviceId={page.serviceId}
            className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-[#25D366] px-7 font-heading text-base font-bold text-[#04240F] transition hover:brightness-110"
          >
            É o meu caso — quero um orçamento
          </TrackedWhatsAppLink>
        </div>
      </section>

      {/* ── CORREÇÃO ───────────────────────────────────────────────────── */}
      <section
        id={
          page.slug === "retifica-de-sedes-e-valvulas"
            ? "esmerilhamento"
            : page.slug === "teste-de-trinca"
              ? "solda"
              : undefined
        }
        className="scroll-mt-20 bg-[#FFFBF2] py-14 md:py-20"
      >
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <Etapa>Correção</Etapa>
            <h2 className="mt-2 font-heading text-3xl font-bold leading-tight tracking-[-0.01em] text-gray-900 md:text-[2.6rem]">
              O que entra no serviço
            </h2>
            <p className="mt-3 text-base leading-relaxed text-gray-600">
              Nem toda peça precisa de tudo. O que a sua vai precisar sai da
              medição — e vai escrito no orçamento, antes de você aprovar.
            </p>
          </div>

          <ul className="space-y-0">
            {page.includes.map((item) => (
              <li
                key={item}
                className="border-b border-[#E5DCC6] py-4 text-base leading-relaxed text-gray-800 first-letter:uppercase last:border-b-0"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── ENTREGA ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-rp-navy py-14 text-white md:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-rp-gold/35 to-transparent"
        />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="font-heading text-[11px] font-bold uppercase tracking-[0.22em] text-rp-gold">
              Entrega
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold leading-tight tracking-[-0.01em] md:text-[2.6rem]">
              Do recebimento à devolução
            </h2>
          </div>

          {/* Aqui a numeração é honesta: é a ordem real do trabalho, e saber em
              que etapa a peça está é informação que o cliente pede. */}
          <ol className="mt-9 grid gap-x-10 gap-y-0 sm:grid-cols-2">
            {page.process.map((step, index) => (
              <li
                key={step}
                className="flex items-baseline gap-4 border-b border-white/12 py-5 last:border-b-0 sm:[&:nth-last-child(2)]:border-b-0"
              >
                <span className="font-heading text-2xl font-bold tabular-nums leading-none text-rp-gold/70">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-base leading-relaxed text-white/85">
                  {step}
                </span>
              </li>
            ))}
          </ol>

          <div className="mx-auto mt-10 max-w-2xl">
            {video?.youtubeId ? (
              <VideoEmbed slot={video} eventLabel={`service_${page.slug}_video`} />
            ) : (
              <MidiaPlaceholder
                id={`service-${page.slug}`}
                arquivo={`${page.slug}.mp4`}
                resumo={`Vídeo real do processo de ${page.shortTitle.toLowerCase()}.`}
                proporcao="aspect-video"
                tom="escuro"
                title={`${page.shortTitle} na prática`}
                caption="Limpeza, medição, execução e conferência final apresentadas na sequência real do serviço."
              />
            )}
          </div>
        </div>
      </section>

      {/* ── DÚVIDAS ────────────────────────────────────────────────────── */}
      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Etapa>Dúvidas</Etapa>
          <h2 className="mt-2 font-heading text-3xl font-bold leading-tight tracking-[-0.01em] text-gray-900 md:text-[2.6rem]">
            Perguntas que a gente ouve toda semana
          </h2>

          <div className="mt-8 divide-y divide-gray-200 border-y border-gray-200">
            {page.faq.map((item) => (
              <details key={item.question} className="group py-4">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-heading text-lg font-semibold text-gray-900 transition-colors hover:text-rp-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rp-accent">
                  <span>{item.question}</span>
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-px w-4 shrink-0 bg-rp-accent transition-transform duration-200 group-open:rotate-90"
                  />
                </summary>
                <p className="mt-3 pr-8 leading-relaxed text-gray-600">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <TrackedWhatsAppLink
              eventLabel={`service_${page.slug}_faq_whatsapp`}
              message={whatsappMessage}
              serviceId={page.serviceId}
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#25D366] px-7 font-heading text-base font-bold text-[#04240F] transition hover:brightness-110 md:h-14"
            >
              Minha dúvida não está aqui
            </TrackedWhatsAppLink>
            <TrackedCtaLink
              href="/contato"
              eventLabel={`service_${page.slug}_contact`}
              serviceId={page.serviceId}
              className="inline-flex h-12 items-center justify-center rounded-full border border-gray-300 px-7 font-heading text-base font-bold text-gray-800 transition hover:border-rp-accent hover:text-rp-accent md:h-14"
            >
              Ver endereço e horário
            </TrackedCtaLink>
          </div>
        </div>
      </section>

      <FAQSchema items={page.faq} />
      <ServiceDetailSchema page={page} />
      <BreadcrumbSchema
        items={[
          { name: "Início", url: "/" },
          { name: "Serviços", url: "/servicos" },
          { name: page.shortTitle, url: servicePath(page.slug) },
        ]}
      />
    </main>
  );
}
