"use client";

import { useState } from "react";
import {
  apuradoEm,
  faixasPreco,
  formatarReal,
  naoSei,
  type FaixaPreco,
} from "@/lib/faixas-preco";
import { TrackedWhatsAppLink } from "@/components/site/TrackedLinks";

/**
 * Simulador de faixa de preço.
 *
 * Uma escolha, um resultado, um botão. Sem formulário, sem etapas, sem digitar.
 * A pessoa toca no que o motor precisa e vê a faixa onde caiu metade dos casos
 * reais daquele serviço — e o botão já leva a escolha dentro da mensagem do
 * WhatsApp, para o atendimento começar sabendo do que se trata.
 *
 * "Não sei o que preciso" é a primeira opção de propósito: é como a maioria
 * chega, e forçar alguém a escolher um nome técnico que ele não conhece é a
 * forma mais rápida de perder a conversa.
 *
 * Os números vêm de `faixas-preco.ts`, apurados sobre o histórico real. Nenhum
 * valor foi estimado.
 */

const opcoes: FaixaPreco[] = [naoSei, ...faixasPreco];

export function SimuladorPreco() {
  const [escolhido, setEscolhido] = useState<string>(naoSei.id);
  const opcao = opcoes.find((o) => o.id === escolhido) ?? naoSei;
  const semFaixa = opcao.ate === 0;

  const mensagem = semFaixa
    ? "Olá! Não sei o que meu cabeçote precisa. Vim pela simulação do site e queria uma avaliação."
    : `Olá! Vim pela simulação do site. Meu caso parece ser: ${opcao.rotulo}. Gostaria de um orçamento.`;

  return (
    <div className="mx-auto max-w-3xl">
      <fieldset>
        <legend className="font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-rp-gold">
          O que o seu cabeçote precisa?
        </legend>

        <div className="mt-4 grid gap-2.5">
          {opcoes.map((o) => {
            const ativo = o.id === escolhido;
            return (
              <label
                key={o.id}
                className={`flex cursor-pointer items-start gap-3 rounded-2xl border px-4 py-4 transition ${
                  ativo
                    ? "border-rp-gold bg-rp-gold/10"
                    : "border-white/15 bg-white/[0.03] hover:border-white/30"
                }`}
              >
                <input
                  type="radio"
                  name="servico"
                  value={o.id}
                  checked={ativo}
                  onChange={() => setEscolhido(o.id)}
                  className="sr-only"
                />
                <span
                  aria-hidden="true"
                  className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition ${
                    ativo ? "border-rp-gold" : "border-white/35"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full transition ${
                      ativo ? "bg-rp-gold" : "bg-transparent"
                    }`}
                  />
                </span>
                <span className="min-w-0">
                  <span className="block font-heading text-base font-bold leading-snug text-white">
                    {o.rotulo}
                  </span>
                  <span className="mt-0.5 block text-sm leading-snug text-white/60">
                    {o.quando}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Resultado */}
      <div
        aria-live="polite"
        className="mt-6 rounded-2xl border border-rp-gold/30 bg-[#0B1B31] p-6 text-center"
      >
        {semFaixa ? (
          <>
            <p className="font-heading text-2xl font-bold leading-tight text-white md:text-3xl">
              A gente mede e te diz
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-white/65">
              Avaliar a peça não custa nada. O orçamento sai pelo WhatsApp em até
              2 horas.
            </p>
          </>
        ) : (
          <>
            <p className="font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-white/45">
              Metade dos casos ficou entre
            </p>
            <p className="mt-2 font-heading text-3xl font-bold leading-none tabular-nums text-rp-gold md:text-5xl">
              {formatarReal(opcao.de)}{" "}
              <span className="text-white/35">e</span> {formatarReal(opcao.ate)}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Baseado em <strong className="text-white/85">{opcao.casos} serviços reais</strong>{" "}
              da própria oficina. Um quarto ficou abaixo, um quarto acima — o seu
              depende do que a medição encontrar.
            </p>
          </>
        )}

        <TrackedWhatsAppLink
          eventLabel={`simulador_${opcao.id}_whatsapp`}
          message={mensagem}
          className="mt-6 inline-flex h-13 w-full items-center justify-center rounded-full bg-[#25D366] px-7 font-heading text-base font-bold text-[#04240F] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto md:h-14"
        >
          {semFaixa ? "Quero uma avaliação" : "Confirmar com orçamento real"}
        </TrackedWhatsAppLink>
      </div>

      <p className="mt-4 text-center text-xs leading-relaxed text-white/40">
        Não é tabela de preço. São valores já praticados, apurados em{" "}
        {apuradoEm}, para você ter uma referência antes de conversar.
      </p>
    </div>
  );
}
