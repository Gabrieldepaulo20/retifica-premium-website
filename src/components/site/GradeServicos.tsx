import Image from "next/image";
import { TrackedServiceLink } from "@/components/site/TrackedLinks";
import { serviceCatalog } from "@/lib/service-pages";

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
 * O card não mostra preço de propósito: o objetivo desta grade é fazer a pessoa
 * entrar no serviço, e número na vitrine faz decidir antes de entrar. O preço
 * mora na página de destino, onde cabe explicar o que muda.
 */

/**
 * Imagem de cada card.
 *
 * Metade dos serviços do catálogo não tem página própria com o mesmo slug
 * (limpeza química vive em /banho-quimico, solda em /teste-de-trinca#solda,
 * o diagnóstico leva para /quanto-custa), então buscar pelo slug deixava
 * cinco cards sem imagem, com uma letra no lugar. O mapa abaixo é explícito.
 *
 * `foto: true` recorta preenchendo o card. Ilustração vetorial fica com
 * respiro, senão estica e borra.
 */
const IMAGENS: Record<string, { src: string; foto?: boolean }> = {
  "retifica-de-cabecote": { src: "/retifica-de-cabecote-usinagem.jpg", foto: true },
  "retifica-de-sedes-e-valvulas": { src: "/retifica-de-sedes-e-valvulas.jpg", foto: true },
  // Foto real de usinagem no lugar da ilustração vetorial: o card fica com o
  // mesmo peso visual dos outros que já usam foto, e mostra o serviço acontecendo.
  "plaina-de-cabecote": { src: "/plaina-de-cabecote-usinagem.webp", foto: true },
  "limpeza-quimica": { src: "/cabecoteservicos.png" },
  "troca-e-adaptacao-de-guias": { src: "/adaptacaodeguias.png" },
  "esmerilhamento-de-valvulas": { src: "/esmirilhamentodevalvulas.png" },
  // Foto real do reparo no lugar da ilustração, como já foi feito na plaina.
  "usinagem-de-roscas": { src: "/usinagem-de-roscas-reparo.webp", foto: true },
  "solda-de-trincas": { src: "/teste-de-trinca-capa.jpg", foto: true },
  "montagem-e-regulagem-final": { src: "/montagemdemotores.jpg", foto: true },
  "diagnostico-tecnico-de-motor": { src: "/diagnosticotecnico.webp", foto: true },
};

export function GradeServicos() {
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
            const imagem = IMAGENS[servico.id];

            return (
              <li key={servico.id}>
                <TrackedServiceLink
                  href={servico.href}
                  serviceId={servico.id}
                  serviceName={servico.title}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:border-rp-accent hover:shadow-[0_10px_30px_rgba(20,60,120,0.09)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rp-accent"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#EEF3FA]">
                    <Image
                      src={imagem.src}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 45vw, 300px"
                      className={
                        imagem.foto
                          ? "object-cover transition duration-300 group-hover:scale-[1.03]"
                          : "object-contain p-6 transition duration-300 group-hover:scale-[1.04]"
                      }
                      loading="lazy"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="font-heading text-base font-bold leading-tight text-gray-900 group-hover:text-rp-accent md:text-lg">
                      {servico.title}
                    </h3>
                    <p className="mt-1.5 flex-1 text-sm leading-relaxed text-gray-600">
                      {servico.description}
                    </p>

                    {/*
                      O card mostrava a faixa de preço da retífica completa. Saiu:
                      preço no card faz a pessoa decidir ali mesmo, e o objetivo
                      aqui é levar para dentro do serviço. O preço continua na
                      página de destino, onde há espaço para explicar o que muda.

                      Formato de botão, não de link em texto: card inteiro é
                      clicável, mas o olho precisa de um alvo para entender isso.
                    */}
                    <span className="mt-3.5 inline-flex min-h-9 w-fit items-center gap-1.5 rounded-full bg-rp-accent/10 px-3.5 font-heading text-sm font-bold text-rp-accent transition group-hover:bg-rp-accent group-hover:text-white">
                      Ver este serviço
                      <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
                    </span>
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
