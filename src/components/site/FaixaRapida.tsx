"use client";

import { useMemo, useState } from "react";
import {
  formatarFaixa,
  marcasDisponiveis,
  segmentarCliente,
} from "@/lib/faixas-preco";
import { siteConfig } from "@/lib/site";
import {
  buildWhatsAppUrlWithAttribution,
  trackEngagementEvent,
  trackFunnelEvent,
} from "@/lib/trackingEvents";

/**
 * Faixa de preço na primeira dobra, em dois cliques.
 *
 * Medido em 30 dias de tráfego pago: 84% das sessões nunca rolam a página e
 * 62% duram menos de 10 segundos — e são elas que convertem. Quem chega a 75%
 * ou 90% de rolagem converte ZERO. Ou seja, quem decide, decide na primeira
 * dobra; quem rola está procurando o que não achou.
 *
 * O bloco de perguntas continua existindo abaixo, para quem quer contexto,
 * mas teve 3 inícios em 30 dias. Quem pesquisou "quanto custa" precisa do
 * número antes de qualquer pergunta.
 */
type OndeEsta = "desmontado" | "no_carro" | "oficina";

const SITUACOES: { valor: OndeEsta; rotulo: string; noWhats: string }[] = [
  {
    valor: "desmontado",
    rotulo: "Já desmontado",
    noWhats: "O cabeçote já está desmontado, posso levar ou vocês buscam.",
  },
  {
    valor: "no_carro",
    rotulo: "Ainda no carro",
    noWhats:
      "O cabeçote ainda está no carro e eu não sei se o problema é ele. Queria orientação sobre o próximo passo.",
  },
  {
    valor: "oficina",
    rotulo: "Está na oficina",
    noWhats: "A peça está com um mecânico. Posso alinhar com ele a entrega.",
  },
];

export function FaixaRapida() {
  const [marca, setMarca] = useState("");
  const [diesel, setDiesel] = useState<boolean | null>(null);
  /*
    Onde a peça está é o que melhor separa quem vai fechar de quem está
    pesquisando preço. Quem já tem o cabeçote desmontado na mão está a um passo
    da avaliação; quem ainda não abriu o motor está semanas antes disso e nem
    sabe se o problema é o cabeçote. A retífica precisa dessa informação para
    saber o que oferecer, e nós precisamos dela para parar de tratar os dois
    como o mesmo lead.
  */
  const [ondeEsta, setOndeEsta] = useState<OndeEsta | null>(null);

  const desfecho = useMemo(
    () =>
      segmentarCliente({
        escopoMotorCompleto: false,
        perfilB2B: false,
        marca,
        modelo: "",
        motorizacao: "",
        combustivel: diesel ? "diesel" : null,
        querBaseTroca: false,
      }),
    [marca, diesel]
  );

  const pronto = marca !== "" && diesel !== null;

  const contexto = {
    component_id: "faixa_rapida",
    page_type: "estimate",
    segmento: desfecho.segmento,
  };

  function escolherMarca(valor: string) {
    setMarca(valor);
    if (valor) {
      trackFunnelEvent("quiz_option_selected", {
        ...contexto,
        interaction_action: "select",
        field_name: "marca",
      });
    }
  }

  function escolherSituacao(valor: OndeEsta) {
    setOndeEsta(valor);
    trackFunnelEvent("quiz_option_selected", {
      ...contexto,
      interaction_action: "select",
      field_name: "onde_esta",
      option_id: valor,
    });
  }

  function escolherCombustivel(ehDiesel: boolean) {
    setDiesel(ehDiesel);
    trackFunnelEvent("quiz_estimate_state", {
      ...contexto,
      estimate_state: ehDiesel ? "diesel" : "flex",
    });
  }

  function abrirWhatsApp() {
    /*
      A mensagem antiga abria com "Vi o preço no site", repetia a faixa e
      terminava em "Quero saber quanto fica no meu caso". Ou seja: chegava no
      WhatsApp como cobrança de valor fechado — exatamente o que a retífica não
      consegue dar sem ver a peça. A atendente passava a faixa, o cliente perdia
      o interesse, e o contato morria ali. Foi relatado como o padrão dominante
      entre mais de 30 contatos.

      A mensagem agora pede AVALIAÇÃO e já reconhece que o valor final depende
      da inspeção. Isso muda o que a conversa está negociando: deixa de ser
      "quanto custa" e passa a ser "quando eu levo". A faixa continua na tela,
      porque é ela que ganha o clique — só não vai mais na mensagem, para não
      virar âncora de cobrança.
    */
    const situacao = SITUACOES.find((item) => item.valor === ondeEsta);
    const partes = [
      "Olá! Vim pelo site da Retífica Premium e quero avaliar meu cabeçote.",
      "",
      `Veículo: ${marca || "não informado"}${diesel ? " · diesel" : ""}`,
    ];
    if (situacao) partes.push(situacao.noWhats);
    partes.push(
      "",
      "Sei que o valor exato sai depois que vocês virem a peça. Como fazemos para a avaliação?"
    );

    trackFunnelEvent("quiz_whatsapp_click", {
      ...contexto,
      position: "primeira_dobra",
      destination_type: "whatsapp",
      destination_path: "/whatsapp",
      tem_faixa: desfecho.faixa ? "sim" : "nao",
      onde_esta: ondeEsta ?? "nao_informado",
    });
    trackEngagementEvent(
      "whatsapp_service_cta_click",
      "whatsapp_click",
      "faixa_rapida",
      { ...contexto, method: "whatsapp" }
    );

    window.open(
      buildWhatsAppUrlWithAttribution(siteConfig.whatsapp.number, partes.join("\n")),
      "_blank",
      "noopener,noreferrer"
    );
  }

  const seletor =
    "min-h-12 w-full rounded-xl border border-white/30 bg-[#081b34] px-3.5 text-base text-white outline-none focus:border-rp-gold focus:ring-1 focus:ring-rp-gold";

  return (
    <div className="rounded-2xl border border-white/15 bg-[#06172e]/95 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.26)] sm:p-6">
      <p className="font-heading text-sm font-bold uppercase tracking-[0.16em] text-rp-gold">
        Quanto costuma custar no seu carro
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block font-heading text-sm font-bold text-white/85">
            Marca
          </span>
          <select
            className={seletor}
            value={marca}
            onChange={(evento) => escolherMarca(evento.target.value)}
          >
            <option value="">Selecione</option>
            {marcasDisponiveis.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <fieldset className="block">
          <legend className="mb-1.5 block font-heading text-sm font-bold text-white/85">
            É diesel?
          </legend>
          <div className="grid grid-cols-2 gap-2">
            {[
              { rotulo: "Não", valor: false },
              { rotulo: "Sim", valor: true },
            ].map((opcao) => (
              <button
                key={opcao.rotulo}
                type="button"
                onClick={() => escolherCombustivel(opcao.valor)}
                className={`min-h-12 rounded-xl border px-4 font-heading text-base font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rp-gold ${
                  diesel === opcao.valor
                    ? "border-rp-gold bg-rp-gold/15 text-white"
                    : "border-white/25 bg-white/[0.055] text-white hover:border-white/45"
                }`}
              >
                {opcao.rotulo}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      {pronto ? (
        <div className="mt-5 border-t border-white/12 pt-5">
          {desfecho.faixa ? (
            <>
              <p className="font-heading text-[1.9rem] font-bold leading-none text-rp-gold md:text-[2.4rem]">
                {formatarFaixa(desfecho.faixa)}
              </p>
              <p className="mt-2.5 text-base leading-relaxed text-white/80">
                Foi quanto pagou a metade dos clientes, em{" "}
                <strong className="text-white">{desfecho.faixa.amostra} cabeçotes</strong>{" "}
                que a gente fez nos últimos meses.
              </p>
            </>
          ) : (
            <>
              <p className="font-heading text-xl font-bold leading-snug text-white">
                Esse caso a gente prefere ver antes de falar preço.
              </p>
              <p className="mt-2.5 text-base leading-relaxed text-white/80">
                {desfecho.semFaixa}
              </p>
            </>
          )}

          {/*
            A pergunta entra DEPOIS da faixa, não antes: o número é o que ganha
            a atenção, e pedir contexto antes de entregar valor derruba o
            preenchimento. Ela não bloqueia o botão — quem não quiser responder
            segue direto.
          */}
          {/* Sem `border-t` no fieldset: o <legend> assenta sobre a borda por
              padrão do HTML e a linha atravessava o texto. O divisor virou um
              elemento próprio, acima. */}
          <div className="mt-5 border-t border-white/12 pt-4" />
          <fieldset>
            <legend className="mb-2 block font-heading text-sm font-bold text-white/85">
              Onde está o cabeçote agora?
            </legend>
            <div className="grid gap-2 sm:grid-cols-3">
              {SITUACOES.map((item) => (
                <button
                  key={item.valor}
                  type="button"
                  onClick={() => escolherSituacao(item.valor)}
                  className={`min-h-12 rounded-xl border px-3 font-heading text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rp-gold ${
                    ondeEsta === item.valor
                      ? "border-rp-gold bg-rp-gold/15 text-white"
                      : "border-white/25 bg-white/[0.055] text-white hover:border-white/45"
                  }`}
                >
                  {item.rotulo}
                </button>
              ))}
            </div>
          </fieldset>

          {/*
            Expectativa ajustada ANTES do clique, não depois.

            Estava embaixo do botão, em cinza, e ninguém lia. O resultado
            apareceu no atendimento: o cliente chegava no WhatsApp achando que
            ia receber um valor fechado, ouvia "preciso ver a peça" e sumia.
            Dizer isso antes qualifica: quem não aceita avaliação não clica, e
            quem clica já sabe o que vem.
          */}
          <p className="mt-4 rounded-xl border border-white/12 bg-white/[0.045] p-3 text-sm leading-relaxed text-white/80">
            O valor do <strong className="text-white">seu</strong> cabeçote sai
            depois que a gente abre e mede a peça. Trinca, empeno e serviço
            feito antes mudam o número. A avaliação é o primeiro passo.
          </p>

          <button
            type="button"
            onClick={abrirWhatsApp}
            className="mt-4 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 font-heading text-base font-bold text-[#04240f] transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
          >
            Combinar a avaliação no WhatsApp
          </button>
        </div>
      ) : (
        <p className="mt-4 text-sm leading-relaxed text-white/60">
          Responda as duas perguntas e o preço aparece aqui. Não pedimos seu contato.
        </p>
      )}
    </div>
  );
}
