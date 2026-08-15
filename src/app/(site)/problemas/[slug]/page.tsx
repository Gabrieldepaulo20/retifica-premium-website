import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArticleSchema,
  BreadcrumbSchema,
  FAQSchema,
} from "@/components/site/StructuredData";
import {
  TrackedCtaLink,
  TrackedPhoneLink,
  TrackedWhatsAppLink,
} from "@/components/site/TrackedLinks";
import {
  getProblemPageBySlug,
  problemDetailPages,
  problemPath,
} from "@/lib/problem-pages";
import { servicePath } from "@/lib/service-pages";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { VideoEmbed } from "@/components/site/VideoEmbed";
import { NumerosProva } from "@/components/site/NumerosProva";
import { FaixaRapida } from "@/components/site/FaixaRapida";
import { PrecoPrazoGarantia } from "@/components/site/PrecoPrazoGarantia";
import { numerosProva } from "@/lib/prova";
import { problemVideos } from "@/lib/videos";

type ProblemPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return problemDetailPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: ProblemPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getProblemPageBySlug(slug);

  if (!page) {
    return {
      title: "Guia não encontrado | Retífica Premium",
    };
  }

  const path = problemPath(page.slug);

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    authors: [{ name: siteConfig.name, url: absoluteUrl("/sobre") }],
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: absoluteUrl(path),
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "article",
      publishedTime: "2026-07-21T00:00:00-03:00",
      modifiedTime: "2026-07-21T00:00:00-03:00",
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

export default async function ProblemDetailPage({ params }: ProblemPageProps) {
  const { slug } = await params;
  const page = getProblemPageBySlug(slug);

  if (!page) notFound();

  const relatedGuides = page.relatedGuideSlugs
    .map((relatedSlug) => getProblemPageBySlug(relatedSlug))
    .filter((guide) => guide !== undefined);
  const whatsappMessage = `Olá! Meu motor está com ${page.shortTitle.toLowerCase()}. Vim pelo site e gostaria de uma orientação.`;

  return (
    <main className="min-h-screen bg-white">
      <article>
        <section className="relative overflow-hidden bg-[#051B3D] py-16 text-white md:py-24">
          <div className="absolute inset-0 z-0">
            <Image
              src={page.image}
              alt=""
              fill
              sizes="100vw"
              className="hidden object-cover opacity-20 md:block"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-linear-to-b from-[#051B3D]/95 via-[#051B3D]/88 to-[#020E1D]" />
          </div>

          <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-[1.08fr_0.92fr] md:items-center lg:px-8">
            {/* Quem chega aqui está com o carro parado, não procurando leitura.
                A página tinha 11 sessões pagas, ZERO contato e 2 segundos de
                engajamento mediano — o pior ativo da conta. Três causas, todas
                corrigidas abaixo:

                1. O primeiro elemento era um link para /servicos. Mandava
                   embora quem tinha acabado de chegar por anúncio.
                2. A moldura era editorial ("Guia de sintomas", "Conteúdo
                   técnico · Atualizado em"). Quem está com o motor quebrado
                   procura socorro, não artigo — e sai quando vê blog.
                3. O botão vinha depois de dois parágrafos e de uma linha de
                   data. */}
            <div className="flex flex-col">
              <p className="font-heading text-xs font-bold uppercase tracking-[0.22em] text-rp-gold">
                Sintoma · Sertãozinho-SP e Ribeirão Preto
              </p>

              <h1 className="mt-4 font-heading text-[2.1rem] font-bold leading-[1.06] tracking-[-0.015em] md:text-5xl">
                {page.hero}
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
                {page.quickAnswer}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <TrackedWhatsAppLink
                  eventLabel={`problem_${page.slug}_whatsapp`}
                  message={whatsappMessage}
                  className="inline-flex h-13 items-center justify-center rounded-full bg-[#25D366] px-7 font-heading text-base font-bold text-[#04240F] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:h-14"
                >
                  Descrever meu caso no WhatsApp
                </TrackedWhatsAppLink>
                <TrackedPhoneLink
                  eventLabel={`problem_${page.slug}_phone`}
                  className="inline-flex h-13 items-center justify-center rounded-full border border-white/35 px-7 font-heading text-base font-bold text-white transition hover:border-rp-gold hover:text-rp-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:h-14"
                >
                  Ligar {siteConfig.phone.display}
                </TrackedPhoneLink>
              </div>

              <p className="mt-6 inline-flex w-fit items-center gap-2.5 rounded-full border border-rp-gold/50 bg-rp-gold/10 py-2.5 pl-3 pr-5">
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rp-gold text-[#1A1200]"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m5 12.5 4.5 4.5L19 7.5" />
                  </svg>
                </span>
                <span className="font-heading text-base font-bold text-rp-gold">
                  6 meses de garantia no serviço
                </span>
              </p>

              {/*
                A página tinha 352 impressões por quinzena e ZERO contato, com
                2 segundos de engajamento mediano. A primeira dobra já foi
                corrigida em 14/08, mas continuava sem o que faz /servicos
                converter: um número. Quem está com o carro parado quer saber
                quanto custa antes de decidir qualquer coisa.
              */}
              <div className="mt-8">
                <FaixaRapida />
              </div>

              <NumerosProva numeros={numerosProva} tom="claro" className="mt-8" />

              <Link
                href="/servicos"
                className="mt-6 inline-flex w-fit font-heading text-xs font-bold uppercase tracking-[0.18em] text-white/55 transition-colors hover:text-rp-gold"
              >
                ← Ver todos os serviços
              </Link>
            </div>

            <div className="relative mx-auto aspect-[4/3] w-full max-w-[560px] overflow-hidden rounded-lg border border-white/15 bg-white/8 shadow-2xl">
              <Image
                src={page.image}
                alt={page.imageAlt}
                fill
                sizes="(max-width: 768px) 92vw, 560px"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section className="bg-[#FFF3D8] py-10 md:py-12">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-xl border border-[#F3B839]/60 bg-white p-6 shadow-sm md:p-8">
              <p className="text-sm font-bold uppercase tracking-wide text-[#A84B00]">
                Atenção
              </p>
              <p className="mt-2 text-base font-semibold leading-relaxed text-gray-900 md:text-lg">
                {page.warning}
              </p>
            </div>
          </div>
        </section>

        {/* Mesmas três respostas que levaram a página de serviço de 22% para
            35% de conversão. 80% do tráfego pago não passa da metade da
            página, então elas precisam vir cedo. */}
        <PrecoPrazoGarantia
          contexto={`problem_${page.slug}`}
          whatsappMessage={whatsappMessage}
          fundo="branco"
        />

        <section className="bg-white py-14 md:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-rp-accent">
                Causas prováveis
              </p>
              <h2 className="mt-2 font-heading text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
                O que precisa ser investigado
              </h2>
              <p className="mt-4 text-base leading-relaxed text-gray-700 md:text-lg">
                O mesmo sintoma pode ter origens diferentes. Estas são hipóteses
                de diagnóstico, não uma condenação automática do motor.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {page.causes.map((cause) => (
                <section
                  key={cause.title}
                  className="rounded-xl border border-[#D9E7FF] bg-[#F8FBFF] p-6 shadow-sm"
                >
                  <h3 className="font-heading text-2xl font-bold text-[#053282]">
                    {cause.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-gray-700">
                    {cause.description}
                  </p>
                </section>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#FFFBF2] py-14 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-[0.85fr_1.15fr] lg:px-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-rp-accent">
                Primeiros cuidados
              </p>
              <h2 className="mt-2 font-heading text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
                O que fazer antes do diagnóstico
              </h2>
              <p className="mt-4 leading-relaxed text-gray-700 md:text-lg">
                Evite desmontar, completar fluidos sem critério ou esconder o
                sintoma. Informações consistentes ajudam a reduzir tentativa e
                erro.
              </p>
            </div>

            <ol className="grid gap-4 sm:grid-cols-2">
              {page.whatToDo.map((step, index) => (
                <li
                  key={step}
                  className="rounded-xl border border-[#F3B839]/45 bg-white p-5 shadow-sm"
                >
                  <p className="font-heading text-sm font-bold text-[#A84B00]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-2 font-semibold leading-relaxed text-gray-900">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-[#0B2F6B] py-14 text-white md:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-rp-gold">
                Avaliação técnica
              </p>
              <h2 className="mt-2 font-heading text-3xl font-bold leading-tight md:text-5xl">
                Como separar causa e consequência
              </h2>
              <ul className="mt-6 space-y-3">
                {page.diagnosis.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-white/15 bg-white/8 px-5 py-4 font-semibold text-white/88"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-rp-gold/35 bg-white/8 p-6 md:p-8">
              <p className="text-sm font-semibold uppercase tracking-wide text-rp-gold">
                Quando a retífica pode entrar no reparo
              </p>
              <p className="mt-4 text-base leading-relaxed text-white/86 md:text-lg">
                {page.whenRectification}
              </p>
              <TrackedCtaLink
                href={servicePath(page.relatedServiceSlug)}
                eventLabel={`problem_${page.slug}_related_service`}
                className="mt-7 inline-flex h-12 items-center justify-center rounded-full bg-rp-gold px-7 text-sm font-bold text-[#051B3D] transition hover:brightness-105"
              >
                Ver o serviço relacionado
              </TrackedCtaLink>
            </div>
          </div>

          {/* Vídeo do sintoma. Aparece sozinho quando o slug tiver `youtubeId`
              preenchido em `problemVideos` (src/lib/videos.ts). */}
          {problemVideos[page.slug]?.youtubeId ? (
            <div className="mx-auto mt-10 max-w-3xl px-4 sm:px-6 lg:px-8">
              <VideoEmbed
                slot={problemVideos[page.slug]}
                eventLabel={`problem_${page.slug}_video`}
              />
            </div>
          ) : null}
        </section>

        <section className="bg-white py-14 md:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center font-heading text-3xl font-bold text-gray-900 md:text-5xl">
              Dúvidas sobre {page.shortTitle.toLowerCase()}
            </h2>
            <div className="mt-8 space-y-4">
              {page.faq.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-3 font-semibold text-gray-900">
                    <span>{item.question}</span>
                    <span
                      className="text-rp-accent transition-transform group-open:rotate-180"
                      aria-hidden="true"
                    >
                      ▼
                    </span>
                  </summary>
                  <p className="mt-3 leading-relaxed text-gray-700">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <aside className="bg-[#F8FBFF] py-12 md:py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-rp-accent">
                Continue o diagnóstico
              </p>
              <h2 className="mt-2 font-heading text-3xl font-bold text-gray-900">
                Guias relacionados
              </h2>
            </div>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {relatedGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={problemPath(guide.slug)}
                  className="rounded-xl border border-[#D9E7FF] bg-white p-5 shadow-sm transition hover:border-rp-accent hover:shadow-md"
                >
                  <h3 className="font-heading text-xl font-bold text-[#053282]">
                    {guide.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-700">
                    {guide.metaDescription}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </article>

      <FAQSchema items={page.faq} />
      <ArticleSchema page={page} />
      <BreadcrumbSchema
        items={[
          { name: "Início", url: "/" },
          { name: "Serviços", url: "/servicos" },
          { name: page.shortTitle, url: problemPath(page.slug) },
        ]}
      />
    </main>
  );
}
