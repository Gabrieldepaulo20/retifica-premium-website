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
 * A triagem completa continua existindo para quem quer contexto, mas ela tinha
 * 3 inícios em 30 dias. Quem pesquisou "quanto custa" precisa do número antes
 * de qualquer pergunta.
 */
export function FaixaRapida() {
  const [marca, setMarca] = useState("");
  const [diesel, setDiesel] = useState<boolean | null>(null);

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

  function escolherCombustivel(ehDiesel: boolean) {
    setDiesel(ehDiesel);
    trackFunnelEvent("quiz_estimate_state", {
      ...contexto,
      estimate_state: ehDiesel ? "diesel" : "flex",
    });
  }

  function abrirWhatsApp() {
    const partes = [
      "Olá! Vi a faixa de preço no site da Retífica Premium.",
      "",
      `Veículo: ${marca || "não informado"}${diesel ? " · diesel" : ""}`,
    ];
    if (desfecho.faixa) {
      partes.push(`Faixa que apareceu: ${formatarFaixa(desfecho.faixa)}`);
    }
    partes.push("", "Quero entender o que o meu caso precisa.");

    trackFunnelEvent("quiz_whatsapp_click", {
      ...contexto,
      position: "primeira_dobra",
      destination_type: "whatsapp",
      destination_path: "/whatsapp",
      tem_faixa: desfecho.faixa ? "sim" : "nao",
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
        Faixa do seu carro em 2 cliques
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
                Foi o intervalo de metade dos casos, em{" "}
                <strong className="text-white">{desfecho.faixa.amostra} serviços</strong>{" "}
                fechados aqui nos últimos meses.
              </p>
            </>
          ) : (
            <>
              <p className="font-heading text-xl font-bold leading-snug text-white">
                Esse caso a gente avalia antes de falar em valor.
              </p>
              <p className="mt-2.5 text-base leading-relaxed text-white/80">
                {desfecho.semFaixa}
              </p>
            </>
          )}

          <button
            type="button"
            onClick={abrirWhatsApp}
            className="mt-5 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 font-heading text-base font-bold text-[#04240f] transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
          >
            Falar no WhatsApp agora
          </button>

          <p className="mt-3 text-sm leading-relaxed text-white/60">
            O valor final depende da medição. Trinca, empeno e material já
            removido antes mudam o resultado.
          </p>
        </div>
      ) : (
        <p className="mt-4 text-sm leading-relaxed text-white/60">
          Responda os dois campos e o valor aparece aqui, sem pedir seu contato.
        </p>
      )}
    </div>
  );
}
