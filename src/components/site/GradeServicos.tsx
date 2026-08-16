import Image from "next/image";
import { TrackedServiceLink } from "@/components/site/TrackedLinks";
import { formatarFaixa, faixaParaMarca } from "@/lib/faixas-preco";
import { getServicePageBySlug, serviceCatalog } from "@/lib/service-pages";

/**
 * Grade de serviços logo abaixo do título.
 *
 * Por que existe: numa página chamada "Serviços", os serviços estavam na
 * QUINTA seção. Medido em 30 dias, /servicos teve 27 sessões, os atalhos de
 * sintoma da primeira dobra tiveram 1 clique e o link "ver os 10 serviços"
 * teve ZERO. Pedir para rolar não funciona — 84% do tráfego pago nunca rola,
 * e quem chega a 75% da página converte 0%.
 *
 * A saída não é convencer a rolar: é subir o que estava embaixo. A grade mostra
 * tudo que a retífica faz sem exigir um segundo gesto.
 *
 * Preço só aparece onde existe dado real (retífica completa, 186 O.S.). Nos
 * outros nove seria chute, e chute vira desmentido no atendimento.
 */

/** Imagem do serviço, quando a página de detalhe tem uma. */
function imagemDoServico(id: string) {
  const direto = getServicePageBySlug(id);
  if (direto) return { src: direto.image, alt: direto.imageAlt };
  return null;
}

export function GradeServicos() {
  const faixaCabecote = faixaParaMarca(null).faixa;

  return (
    <section
      id="catalogo"
      className="scroll-mt-20 border-b border-gray-200 bg-[#F8FAFD] pb-14 pt-8 md:pb-20 md:pt-12"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/*
          Cabeçalho deliberadamente curto. A versão anterior tinha rótulo,
          título grande e um parágrafo — 256px antes do primeiro card, o que
          jogava a grade inteira para fora da tela e repetia o erro que a
          reorganização veio corrigir.
        */}
        <div className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 text-center">
          <h2 className="font-heading text-[1.45rem] font-bold leading-tight text-gray-900 md:text-[2rem]">
            Todos os serviços do cabeçote
          </h2>
          <p className="font-heading text-sm font-bold text-rp-accent">
            escolha o seu
          </p>
        </div>

        <ul className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-4">
          {serviceCatalog.map((servico) => {
            const imagem = imagemDoServico(servico.id);
            const temFaixa = servico.id === "retifica-de-cabecote" && faixaCabecote;

            return (
              <li key={servico.id}>
                <TrackedServiceLink
                  href={servico.href}
                  serviceId={servico.id}
                  serviceName={servico.title}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:border-rp-accent hover:shadow-[0_10px_30px_rgba(20,60,120,0.09)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rp-accent"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#EEF3FA]">
                    {imagem ? (
                      <Image
                        src={imagem.src}
                        alt=""
                        fill
                        sizes="(max-width: 1024px) 45vw, 300px"
                        className={
                          servico.id === "retifica-de-cabecote"
                            ? "object-cover transition duration-300 group-hover:scale-[1.03]"
                            : "object-contain p-6"
                        }
                        loading="lazy"
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="flex h-full w-full items-center justify-center font-heading text-3xl font-bold text-rp-accent/25"
                      >
                        {servico.title.slice(0, 1)}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="font-heading text-base font-bold leading-tight text-gray-900 group-hover:text-rp-accent md:text-lg">
                      {servico.title}
                    </h3>
                    <p className="mt-1.5 flex-1 text-sm leading-relaxed text-gray-600">
                      {servico.description}
                    </p>

                    <p className="mt-3 font-heading text-sm font-bold text-rp-accent">
                      {temFaixa && faixaCabecote ? (
                        <>Metade fica entre {formatarFaixa(faixaCabecote)}</>
                      ) : (
                        <>Ver detalhes →</>
                      )}
                    </p>
                  </div>
                </TrackedServiceLink>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
