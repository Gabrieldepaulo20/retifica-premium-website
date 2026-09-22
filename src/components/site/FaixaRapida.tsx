"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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

/** Referência rápida; a triagem detalhada e o contato continuam opcionais. */
type OndeEsta = "desmontado" | "no_carro" | "oficina";

const SITUACOES: { valor: OndeEsta; rotulo: string; noWhats: string }[] = [
  {
    valor: "desmontado",
    rotulo: "Já desmontado",
    noWhats: "O cabeçote já está desmontado. Quero combinar a entrega ou consultar a possibilidade de coleta.",
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
  const [tipoVeiculo, setTipoVeiculo] = useState<"passeio" | "diesel_utilitario" | "nao_sei" | null>(null);
  const diesel = tipoVeiculo === "diesel_utilitario";
  const resultadoMedidoRef = useRef("");
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

  const pronto = marca !== "" && tipoVeiculo !== null;
  const faixa = tipoVeiculo === "passeio" ? desfecho.faixa : null;

  const contexto = {
    component_id: "faixa_rapida",
    page_type: "estimate",
    segmento: desfecho.segmento,
  };

  useEffect(() => {
    if (!pronto) return;
    const key = `${marca}:${tipoVeiculo}`;
    if (resultadoMedidoRef.current === key) return;
    resultadoMedidoRef.current = key;
    trackFunnelEvent("quiz_result_view", {
      component_id: "faixa_rapida",
      page_type: "estimate",
      estimate_state: faixa ? "com_faixa" : "sem_faixa",
    });
  }, [pronto, marca, tipoVeiculo, faixa]);

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

  function escolherTipo(valor: "passeio" | "diesel_utilitario" | "nao_sei") {
    setTipoVeiculo(valor);
    trackFunnelEvent("quiz_option_selected", {
      ...contexto,
      field_name: "tipo_veiculo",
      option_id: valor,
      interaction_action: "select",
    });
  }

  function abrirWhatsApp() {
    const situacao = SITUACOES.find((item) => item.valor === ondeEsta);
    const partes = [
      "Olá! Vim pelo site da Retífica Premium e quero avaliar meu cabeçote.",
      "",
      `Veículo: ${marca || "não informado"}${diesel ? " · diesel ou utilitário" : ""}`,
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
      tem_faixa: pronto && faixa ? "sim" : "nao",
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
        Referência para retífica completa do cabeçote
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
            Tipo de veículo
          </legend>
          <div className="grid grid-cols-3 gap-2">
            {[
              { rotulo: "Passeio", valor: "passeio" as const },
              { rotulo: "Diesel / utilitário", valor: "diesel_utilitario" as const },
              { rotulo: "Não sei", valor: "nao_sei" as const },
            ].map((opcao) => (
              <button
                key={opcao.rotulo}
                type="button"
                onClick={() => escolherTipo(opcao.valor)}
                aria-pressed={tipoVeiculo === opcao.valor}
                className={`min-h-12 rounded-xl border px-2 py-2 font-heading text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rp-gold ${
                  tipoVeiculo === opcao.valor
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
        <div aria-live="polite" aria-atomic="true" className="mt-5 border-t border-white/12 pt-5">
          {faixa ? (
            <>
              <p className="font-heading text-[1.9rem] font-bold leading-none text-rp-gold md:text-[2.4rem]">
                {formatarFaixa(faixa)}
              </p>
              <p className="mt-2.5 text-base leading-relaxed text-white/80">
                Referência atualizada a partir do histórico de{" "}
                <strong className="text-white">{faixa.amostra} serviços</strong>.{" "}
                Não é preço fechado nem inclui a desmontagem do carro. Plaina
                ou teste avulso precisam de orientação específica.
              </p>
            </>
          ) : (
            <>
              <p className="font-heading text-xl font-bold leading-snug text-white">
                Esse caso a gente prefere ver antes de falar preço.
              </p>
              <p className="mt-2.5 text-base leading-relaxed text-white/80">
                {tipoVeiculo === "nao_sei"
                  ? "Tudo bem não saber. Informe o modelo e o ano no WhatsApp para receber orientação, sem uma faixa que pode não corresponder ao seu veículo."
                  : desfecho.semFaixa}
              </p>
            </>
          )}



          <p className="mt-4 rounded-xl border border-white/12 bg-white/[0.045] p-3 text-sm leading-relaxed text-white/80">
            O valor do <strong className="text-white">seu</strong> cabeçote sai
            depois da inspeção e das medições da peça. Trinca, empeno e serviço
            feito antes mudam o número. A avaliação é o primeiro passo.
          </p>

          <button
            type="button"
            onClick={abrirWhatsApp}
            className="mt-4 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 font-heading text-base font-bold text-[#04240f] transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
          >
            Combinar a avaliação no WhatsApp
          </button>
          <details className="mt-4">
            <summary className="min-h-11 cursor-pointer py-3 text-sm text-white/85">Adiantar a situação da peça (opcional)</summary>
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
                  aria-pressed={ondeEsta === item.valor}
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
          </details>
        </div>
      ) : (
        <p className="mt-4 text-sm leading-relaxed text-white/60">
          Selecione a marca e o tipo para consultar a referência disponível. Não pedimos seu contato.
        </p>
      )}
      {!pronto && (
        <button type="button" onClick={abrirWhatsApp}
          className="mt-4 min-h-12 w-full rounded-xl border border-white/35 px-4 py-3 font-heading text-base font-bold text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rp-gold">
          Prefiro falar sobre a avaliação no WhatsApp
        </button>
      )}
      <p className="mt-3 text-sm leading-relaxed text-white/70">
        Atendimento em Sertãozinho para Ribeirão Preto e região. Confirme prazo,
        custo da avaliação e condições de entrega ou coleta antes de enviar a peça.
      </p>
    </div>
  );
}
