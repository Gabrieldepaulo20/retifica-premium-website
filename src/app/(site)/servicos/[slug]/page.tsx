import Image from "next/image";
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
  TrackedPhoneLink,
  TrackedWhatsAppLink,
} from "@/components/site/TrackedLinks";
import {
  getServicePageBySlug,
  serviceDetailPages,
  servicePath,
} from "@/lib/service-pages";
import { absoluteUrl, siteConfig } from "@/lib/site";

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

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const page = getServicePageBySlug(slug);

  if (!page) notFound();

  const whatsappMessage = `Olá, vim pelo site da Retífica Premium e gostaria de orçamento para ${page.shortTitle}.`;

  return (
    <main className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-[#051B3D] py-16 text-white md:py-24">
        <div className="absolute inset-0 z-0">
          <Image
            src={page.image}
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-20"
            priority
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-linear-to-b from-[#051B3D]/95 via-[#051B3D]/88 to-[#020E1D]" />
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-[1.05fr_0.95fr] md:items-center lg:px-8">
          <div>
            <Link
              href="/servicos"
              className="mb-6 inline-flex text-sm font-semibold uppercase tracking-wide text-rp-gold transition-colors hover:text-white"
            >
              Voltar para serviços
            </Link>
            <h1 className="font-heading text-3xl font-extrabold leading-tight md:text-5xl">
              {page.hero}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/82 md:text-lg">
              {page.intro}
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
              Atendemos motoristas, oficinas, frotas e empresas em Sertãozinho,{" "}
              <Link
                href="/retifica-em-ribeirao-preto"
                className="font-semibold text-rp-gold underline-offset-4 hover:underline"
              >
                Ribeirão Preto
              </Link>{" "}
              e{" "}
              <Link
                href="/servicos#regiao"
                className="font-semibold text-rp-gold underline-offset-4 hover:underline"
              >
                cidades próximas
              </Link>
              , com orientação técnica para escolher o serviço correto.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <TrackedWhatsAppLink
                eventLabel={`service_${page.slug}_whatsapp`}
                message={whatsappMessage}
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#25D366] px-8 text-sm font-bold text-[#052E16] transition-all hover:brightness-110 md:h-14 md:text-base"
              >
                Pedir orçamento no WhatsApp
              </TrackedWhatsAppLink>
              <TrackedPhoneLink
                eventLabel={`service_${page.slug}_phone`}
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/45 px-8 text-sm font-bold text-white transition-all hover:bg-white/10 md:h-14 md:text-base"
              >
                Ligar {siteConfig.phone.display}
              </TrackedPhoneLink>
            </div>
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

      <section className="bg-[#FFFBF2] py-14 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-rp-accent">
              Quando procurar
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
              Sintomas relacionados a {page.shortTitle.toLowerCase()}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-700 md:text-lg">
              Se algum destes sinais aparece no veículo, vale conversar com uma
              retífica antes de seguir rodando ou remontar o conjunto.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {page.symptoms.map((symptom) => (
              <article
                key={symptom}
                className="rounded-lg border border-[#D9E7FF] bg-white p-4 shadow-sm"
              >
                <h3 className="font-heading text-xl font-bold text-[#053282]">
                  {symptom}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-rp-accent">
              Como trabalhamos
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
              Serviço técnico, sem orçamento no escuro
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {page.includes.map((item) => (
              <article
                key={item}
                className="rounded-lg border border-[#E8EEF8] bg-[#F8FBFF] p-5 shadow-sm"
              >
                <h3 className="font-heading text-xl font-bold text-[#053282]">
                  {item}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0B2F6B] py-14 text-white md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-rp-gold">
              Processo
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold leading-tight md:text-5xl">
              Do diagnóstico à entrega orientada
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/78 md:text-lg">
              O objetivo é resolver a causa provável do problema e orientar a
              montagem correta, especialmente quando a peça vem de oficina
              parceira.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {page.process.map((step, index) => (
              <article
                key={step}
                className="rounded-lg border border-white/15 bg-white/8 p-5"
              >
                <p className="font-heading text-sm font-bold text-rp-gold">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-base font-semibold leading-relaxed text-white">
                  {step}
                </h3>
              </article>
            ))}
          </div>
        </div>
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

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <TrackedWhatsAppLink
              eventLabel={`service_${page.slug}_faq_whatsapp`}
              message={whatsappMessage}
              className="inline-flex h-12 items-center justify-center rounded-full bg-rp-accent px-8 text-sm font-bold text-white transition-all hover:brightness-110 md:h-14 md:text-base"
            >
              Falar com especialista
            </TrackedWhatsAppLink>
            <TrackedCtaLink
              href="/contato"
              eventLabel={`service_${page.slug}_contact`}
              className="inline-flex h-12 items-center justify-center rounded-full border border-[#053282] px-8 text-sm font-bold text-[#053282] transition-all hover:bg-[#D9E7FF] md:h-14 md:text-base"
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
