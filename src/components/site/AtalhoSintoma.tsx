import { TrackedWhatsAppLink } from "@/components/site/TrackedLinks";

/**
 * Atalho de sintoma — o caminho curto para o orçamento.
 *
 * Inspirado no padrão que as remanufaturadoras internacionais usam e que
 * nenhuma retífica brasileira pesquisada tem: um caminho direto e nomeado para
 * o preço. A Jasper (EUA, desde 1942) coloca "Find A Price" como um dos quatro
 * atalhos da primeira tela; a Ivor Searle (Reino Unido) abre com a garantia e
 * um seletor de motor.
 *
 * Aqui a adaptação é: a pessoa não escolhe uma peça de catálogo, escolhe o
 * sintoma. Um toque abre o WhatsApp já com a conversa começada e o contexto
 * dentro da mensagem — sem formulário, sem página intermediária, sem escrever.
 *
 * Fica dentro da primeira dobra porque 61% do tráfego pago sai em menos de 10
 * segundos.
 */

export const sintomasAtalho = [
  {
    chip: "Soltando fumaça",
    zap: "Olá! Meu motor está soltando fumaça pelo escapamento. Vim pelo site e queria um orçamento.",
    rotulo: "fumaca",
  },
  {
    chip: "Bebendo óleo",
    zap: "Olá! Meu motor está consumindo óleo. Vim pelo site e queria um orçamento.",
    rotulo: "oleo",
  },
  {
    chip: "Esquentando",
    zap: "Olá! Meu motor está superaquecendo. Vim pelo site e queria um orçamento.",
    rotulo: "aquecendo",
  },
  {
    chip: "Água com óleo",
    zap: "Olá! O motor está misturando água com óleo. Vim pelo site e queria um orçamento.",
    rotulo: "agua_oleo",
  },
  {
    chip: "Cabeçote trincado",
    zap: "Olá! Me disseram que meu cabeçote pode estar trincado. Vim pelo site e queria uma avaliação.",
    rotulo: "trinca",
  },
  {
    chip: "Outro problema",
    zap: "Olá! Meu motor está com um problema. Posso descrever para vocês?",
    rotulo: "outro",
  },
];

export function AtalhoSintoma({ contexto }: { contexto: string }) {
  return (
    <div>
      <p className="font-heading text-[11px] font-bold uppercase tracking-[0.18em] text-white/45">
        Ou toque no que está acontecendo
      </p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {sintomasAtalho.map((s) => (
          <li key={s.rotulo}>
            <TrackedWhatsAppLink
              eventLabel={`${contexto}_atalho_${s.rotulo}`}
              message={s.zap}
              className="inline-flex min-h-11 items-center rounded-full border border-white/20 bg-white/[0.04] px-4 text-sm font-semibold text-white/85 transition hover:border-[#25D366] hover:bg-[#25D366]/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
            >
              {s.chip}
            </TrackedWhatsAppLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
