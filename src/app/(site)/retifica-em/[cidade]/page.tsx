import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BreadcrumbSchema, FAQSchema } from "@/components/site/StructuredData";
import { FaixaRapida } from "@/components/site/FaixaRapida";
import { NumerosProva } from "@/components/site/NumerosProva";
import { TrackedPhoneLink, TrackedWhatsAppLink } from "@/components/site/TrackedLinks";
import {
  caminhoCidade,
  cidadesAtendidas,
  getCidadePorSlug,
} from "@/lib/cidades-atendidas";
import { numerosProva } from "@/lib/prova";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ cidade: string }> };

export function generateStaticParams() {
  return cidadesAtendidas.map((cidade) => ({ cidade: cidade.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cidade: slug } = await params;
  const cidade = getCidadePorSlug(slug);
  if (!cidade) return {};

  const titulo = `Retífica de Cabeçote em ${cidade.nome} — Buscamos e Entregamos`;
  const descricao = `Retífica de cabeçote para ${cidade.nome}. A oficina fica em Sertãozinho-SP, a ${cidade.distanciaKm} km. A gente busca, conferimos, orçamos e devolvemos. Garantia de 3 meses.`;

  return {
    title: titulo,
    description: descricao,
    alternates: { canonical: caminhoCidade(cidade.slug) },
    openGraph: {
      title: `${titulo} | ${siteConfig.name}`,
      description: descricao,
      url: `https://www.premiumretifica.com.br${caminhoCidade(cidade.slug)}`,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
    },
  };
}

export default async function CidadePage({ params }: Props) {
  const { cidade: slug } = await params;
  const cidade = getCidadePorSlug(slug);
  if (!cidade) notFound();

  const mensagem = `Olá! Sou de ${cidade.nome} e quero saber sobre a retífica do meu cabeçote.`;

  const faq = [
    {
      question: `Vocês têm oficina em ${cidade.nome}?`,
      answer: `Não. A oficina fica em Sertãozinho-SP, a aproximadamente ${cidade.distanciaKm} km de ${cidade.nome}. O que fazemos é buscar o cabeçote em ${cidade.nome}, ver o que ela tem, passar o preço e devolver a peça pronta. Você não precisa se deslocar.`,
    },
    {
      question: "Buscar e entregar custa alguma coisa?",
      answer: `Não. Buscar e entregar em ${cidade.nome}. ${cidade.contexto}`,
    },
    {
      question: "Como sei o preço antes de mandar a peça?",
      answer:
        "A faixa de preço desta página vem de serviços reais já fechados e serve para você ter uma ideia. O preço do seu caso sai depois que a gente vê a peça. Trinca, peça torta e serviço que já foi feito antes mudam o valor.",
    },
    {
      question: "Qual a garantia?",
      answer:
        "Três meses sobre o serviço executado, com um papel mostrando o que a peça tinha e o que foi feito nela.",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-rp-navy pb-14 pt-10 text-white md:pb-20 md:pt-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(251,191,36,0.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(251,191,36,0.055) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.24em] text-rp-gold">
            Atendemos {cidade.nome} · oficina em Sertãozinho-SP
          </p>

          <h1 className="mt-3 max-w-3xl font-heading text-[2.15rem] font-bold leading-[1.04] tracking-[-0.015em] md:text-[3.35rem]">
            Retífica de cabeçote em {cidade.nome}: a gente busca e devolve
          </h1>

          {/*
            A honestidade aqui é o ativo. Não existe oficina na cidade, e dizer
            isso na primeira linha é o que faz a proposta funcionar: o cliente
            entende que não precisa se deslocar, e não descobre depois que foi
            enganado.
          */}
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85 md:text-xl">
            Nossa oficina fica em Sertãozinho, a {cidade.distanciaKm} km de{" "}
            {cidade.nome} {cidade.rota}. Você não precisa levar nada: buscamos o
            cabeçote, conferimos na oficina, falamos o preço e devolvemos a peça
            pronta.
          </p>

          <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
            <TrackedWhatsAppLink
              eventLabel={`cidade_${cidade.slug}_whatsapp`}
              message={mensagem}
              className="inline-flex h-13 items-center justify-center rounded-full bg-[#25D366] px-7 font-heading text-base font-bold text-[#04240F] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:h-14"
            >
              Chamar no WhatsApp
            </TrackedWhatsAppLink>
            <TrackedPhoneLink
              eventLabel={`cidade_${cidade.slug}_phone`}
              className="inline-flex h-13 items-center justify-center rounded-full border border-white/35 px-7 font-heading text-base font-bold text-white transition hover:border-rp-gold hover:text-rp-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:h-14"
            >
              Ligar {siteConfig.phone.display}
            </TrackedPhoneLink>
          </div>

          <div className="mt-8">
            <FaixaRapida />
          </div>

          <NumerosProva numeros={numerosProva} tom="claro" className="mt-9" />
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-rp-accent">
            Como funciona para quem é de {cidade.nome}
          </p>
          <h2 className="mt-2 max-w-2xl font-heading text-[1.8rem] font-bold leading-tight text-gray-900 md:text-[2.35rem]">
            Você não sai do lugar
          </h2>

          <ol className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-gray-200 bg-gray-200 sm:grid-cols-2">
            {[
              {
                titulo: "Você chama no WhatsApp",
                texto: `Conta o que está acontecendo e onde o cabeçote está em ${cidade.nome}. Se ainda estiver no carro, a gente explica o que fazer.`,
              },
              {
                titulo: "A gente busca",
                texto: cidade.contexto,
              },
              {
                titulo: "Vemos o que a peça tem",
                texto:
                  "Conferimos se está torto, se tem trinca e como estão válvulas, guias e roscas. Só depois disso a gente fala preço — não damos número por telefone sem ver a peça.",
              },
              {
                titulo: "Devolvemos pronto",
                texto: `A peça volta para ${cidade.nome} com um papel mostrando o que a peça tinha e o que foi feito nela, e três meses de garantia.`,
              },
            ].map((passo, indice) => (
              <li key={passo.titulo} className="bg-white p-6">
                <span className="font-heading text-sm font-bold text-rp-gold">
                  {String(indice + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-heading text-lg font-bold text-gray-900">
                  {passo.titulo}
                </h3>
                <p className="mt-2 leading-relaxed text-gray-700">{passo.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-[#FFFBF2] py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-[1.8rem] font-bold leading-tight text-gray-900 md:text-[2.35rem]">
            Dúvidas de quem é de {cidade.nome}
          </h2>
          <div className="mt-7 divide-y divide-[#E5DCC6] border-y border-[#E5DCC6]">
            {faq.map((item) => (
              <details key={item.question} className="group py-4">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-heading text-lg font-semibold text-gray-900 hover:text-rp-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rp-accent">
                  <span>{item.question}</span>
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-px w-4 shrink-0 bg-rp-accent transition-transform group-open:rotate-90 motion-reduce:transition-none"
                  />
                </summary>
                <p className="mt-3 pr-8 leading-relaxed text-gray-700">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <FAQSchema items={faq} />
      <BreadcrumbSchema
        items={[
          { name: "Início", url: "/" },
          { name: `Retífica em ${cidade.nome}`, url: caminhoCidade(cidade.slug) },
        ]}
      />
    </main>
  );
}
