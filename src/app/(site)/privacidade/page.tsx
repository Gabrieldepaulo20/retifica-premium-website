import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacidade e Cookies",
  description:
    "Entenda quais dados a Retífica Premium utiliza no site, para quais finalidades e como alterar suas preferências.",
  alternates: {
    canonical: "/privacidade",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const categories = [
  {
    number: "01",
    title: "Funcionamento essencial",
    status: "Sempre ativa",
    description:
      "Guarda sua escolha de privacidade e, se você usar a estimativa, permite restaurar as respostas neste aparelho. Não mede marketing.",
  },
  {
    number: "02",
    title: "Análise avançada da experiência",
    status: "Você escolhe",
    description:
      "Autoriza Google Analytics 4 e Clarity a analisar páginas e estimar região; o Retiflow registra a jornada e a cidade que você informar. Não acessa o GPS.",
  },
  {
    number: "03",
    title: "Anúncios e conversões",
    status: "Você escolhe",
    description:
      "Permite que Google Ads e Retiflow registrem origem, campanha e identificadores de clique, como GCLID, quando existirem, para relacionar contatos aos anúncios.",
  },
] as const;

export default function PrivacidadePage() {
  return (
    <main className="min-h-screen bg-[#f5f7fb] text-[#0b1f3a]">
      <section className="relative overflow-hidden bg-[#06172e] px-4 pb-16 pt-20 text-white sm:px-6 md:pb-20 md:pt-24 lg:px-8">
        <div
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.07) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
          aria-hidden="true"
        />
        <div className="absolute -right-24 top-8 h-64 w-64 rounded-full bg-[#053282]/70 blur-3xl" />
        <div className="relative mx-auto max-w-5xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-[#f3b839]" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#f3b839]">
              Transparência
            </span>
          </div>
          <h1 className="mt-5 max-w-3xl font-heading text-4xl font-bold leading-[1.04] sm:text-5xl md:text-6xl">
            Seus dados, sob o seu controle.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/72 sm:text-lg">
            Aqui explicamos de forma direta o que o site mede, por que essas
            informações são úteis e como você pode aceitar, recusar ou mudar de
            ideia quando quiser.
          </p>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
            Última atualização: 10 de agosto de 2026
          </p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-4 md:grid-cols-3">
            {categories.map((category) => (
              <article
                key={category.number}
                className="relative overflow-hidden rounded-2xl border border-[#053282]/10 bg-white p-5 shadow-[0_12px_40px_rgba(6,23,46,0.06)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="font-heading text-3xl font-bold text-[#053282]/18">
                    {category.number}
                  </span>
                  <span className="rounded-full bg-[#f3b839]/15 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#7a5310]">
                    {category.status}
                  </span>
                </div>
                <h2 className="mt-5 font-heading text-xl font-bold text-[#06172e]">
                  {category.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#42526d]">
                  {category.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.35fr_.65fr]">
            <div className="space-y-8 rounded-2xl border border-[#053282]/10 bg-white p-6 shadow-[0_12px_40px_rgba(6,23,46,0.05)] sm:p-8">
              <section>
                <h2 className="font-heading text-2xl font-bold text-[#06172e]">
                  Quais informações podemos utilizar
                </h2>
                <p className="mt-3 text-sm leading-7 text-[#42526d]">
                  Antes da sua decisão, o site usa apenas o armazenamento
                  necessário para guardar a preferência de privacidade e
                  restaurar uma pergunta do site iniciada neste aparelho.
                </p>
                <p className="mt-3 text-sm leading-7 text-[#42526d]">
                  <strong className="text-[#06172e]">
                    Contagem essencial, sem depender da sua escolha.
                  </strong>{" "}
                  Mesmo antes de você decidir, registramos uma contagem mínima
                  para saber se o site funciona e se o investimento em anúncio se
                  justifica: que a página foi aberta e se alguém tocou em falar no
                  WhatsApp, ligar ou enviar o formulário. Fazemos isso com base no
                  legítimo interesse previsto no art. 7º, IX da LGPD.
                </p>
                <p className="mt-3 text-sm leading-7 text-[#42526d]">
                  Nessa contagem essencial também registramos{" "}
                  <strong className="text-[#06172e]">
                    quanto tempo a página ficou ativa
                  </strong>{" "}
                  — um único total por visita, não um histórico do que você fez —
                  e uma{" "}
                  <strong className="text-[#06172e]">
                    estimativa de cidade e estado
                  </strong>
                  , calculada a partir do seu acesso à internet, nunca por GPS.
                  Temos uma oficina só, e é isso que nos diz de onde vem a procura
                  e se vale buscar a peça na sua região. Nos relatórios, cidades
                  com menos de três visitas ficam ocultas, para que ninguém seja
                  identificado por eliminação.
                </p>
                <p className="mt-3 text-sm leading-7 text-[#42526d]">
                  Nessa contagem <strong className="text-[#06172e]">não</strong>{" "}
                  usamos cookie nem identificador guardado no seu aparelho. O
                  código de sessão existe apenas na memória da aba e desaparece
                  quando você fecha o site. Não registramos seu nome, telefone,
                  e-mail, endereço, identificador de clique de anúncio nem rolagem
                  de página, e não juntamos a contagem com dados de atendimento.
                  Ela não é usada para publicidade.
                </p>
                <p className="mt-3 text-sm leading-7 text-[#42526d]">
                  Você pode se opor a essa contagem essencial a qualquer momento,
                  escrevendo para o contato indicado no fim desta página. Também
                  pode revisar suas escolhas pelo link “Privacidade e cookies” no
                  rodapé.
                </p>
                <p className="mt-3 text-sm leading-7 text-[#42526d]">
                  Conforme suas escolhas opcionais, podemos registrar página,
                  origem, dispositivo, campanha, tempo ativo, rolagem e
                  identificadores técnicos de clique. A atribuição local expira em
                  até 90 dias e a preferência de privacidade em até 180 dias. Com
                  análise autorizada, cidade, estado e país podem aparecer de
                  forma aproximada e agregada nos relatórios dos provedores. Essa
                  estimativa não corresponde ao GPS e não identifica com precisão
                  onde a pessoa está.
                </p>
                <p className="mt-3 text-sm leading-7 text-[#42526d]">
                  No primeiro acesso, o banner oferece as opções de aceitar, rejeitar
                  ou personalizar. Não existe aceite automático por tempo ou por
                  continuar navegando. Na personalização, os controles opcionais
                  começam desligados. O banner de cookies não concede permissão de
                  localização do navegador; se um recurso desse tipo for oferecido no
                  futuro, ele deverá pedir uma confirmação própria no momento do uso.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-2xl font-bold text-[#06172e]">
                  Quando você pede atendimento
                </h2>
                <p className="mt-3 text-sm leading-7 text-[#42526d]">
                  Nome, telefone, e-mail, assunto e mensagem enviados
                  voluntariamente no formulário são usados para responder ao
                  seu pedido e registrar o atendimento no Retiflow. Esses dados
                  de contato não são enviados ao Google como conversões
                  otimizadas nesta versão do site. A URL completa do WhatsApp não é
                  enviada aos provedores de conferência; registramos somente o destino
                  genérico, para impedir que nome, telefone, relato ou dados do
                  veículo escapem pela mensagem preenchida.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-2xl font-bold text-[#06172e]">
                  Com quem os dados podem ser processados
                </h2>
                <p className="mt-3 text-sm leading-7 text-[#42526d]">
                  Quando a análise é autorizada, o Retiflow pode receber eventos
                  da jornada sem nome, telefone, e-mail ou relato livre. Esses
                  eventos podem incluir a cidade que você informar voluntariamente
                  no quiz. Se apenas anúncios forem autorizados, o Retiflow recebe
                  somente as intenções de contato necessárias para atribuição.
                  Dependendo das categorias escolhidas, também usamos Google
                  Analytics 4, serviços do Google para anúncios e Microsoft
                  Clarity. Não ativamos personalização de anúncios.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-2xl font-bold text-[#06172e]">
                  Por quanto tempo mantemos os registros
                </h2>
                <p className="mt-3 text-sm leading-7 text-[#42526d]">
                  A preferência de privacidade fica neste navegador por até 180
                  dias, e os identificadores locais de atribuição, por até 90
                  dias. Se o servidor estiver temporariamente indisponível, uma
                  fila limitada de eventos de jornada pode permanecer neste
                  navegador por até 24 horas para nova tentativa; ela é apagada
                  ao revogar a categoria correspondente. Para os eventos de
                  jornada enviados ao servidor, a política operacional desta
                  versão é revisar e remover os registros manualmente em até 12
                  meses. Ainda não existe uma rotina automática de expurgo; até
                  sua implantação, esse prazo depende da revisão operacional da
                  Retífica Premium.
                </p>
                <p className="mt-3 text-sm leading-7 text-[#42526d]">
                  Dados de contato, orçamento e ordem de serviço seguem os
                  períodos necessários ao atendimento, às obrigações legais e
                  ao histórico comercial aplicável. Solicitações de exclusão
                  são avaliadas conforme o tipo de registro e a obrigação de
                  conservação existente.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-2xl font-bold text-[#06172e]">
                  Seus direitos e suas escolhas
                </h2>
                <p className="mt-3 text-sm leading-7 text-[#42526d]">
                  Você pode solicitar confirmação, acesso, correção ou exclusão
                  de dados aplicável ao seu caso. Também pode mudar as
                  categorias opcionais a qualquer momento pelo link
                  <strong> Privacidade e cookies</strong> no rodapé. Ao revogar uma
                  categoria opcional, interrompemos os novos eventos e limpamos do
                  navegador os dados correspondentes que conseguirmos identificar.
                </p>
              </section>
            </div>

            <aside className="h-fit rounded-2xl bg-[#06172e] p-6 text-white shadow-[0_18px_50px_rgba(6,23,46,0.18)] sm:p-7">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#f3b839]">
                Fale com a Retífica Premium
              </span>
              <h2 className="mt-3 font-heading text-2xl font-bold">
                Dúvida sobre seus dados?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/68">
                Entre em contato informando sua solicitação e, quando possível,
                o telefone ou e-mail usado no atendimento.
              </p>
              <a
                href={`mailto:${siteConfig.email}?subject=Privacidade%20e%20dados`}
                className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[#f3b839] px-5 text-center text-sm font-extrabold text-[#06172e] transition-colors hover:bg-[#ffc94d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {siteConfig.email}
              </a>
              <div className="mt-6 border-t border-white/10 pt-5 text-xs leading-relaxed text-white/55">
                <p>{siteConfig.legalName}</p>
                <p className="mt-1">CNPJ {siteConfig.cnpj}</p>
                <p className="mt-1">{siteConfig.address.formatted}</p>
              </div>
            </aside>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#053282]/20 bg-white px-6 text-sm font-bold text-[#053282] transition-colors hover:bg-[#053282] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#053282]"
            >
              Voltar para o site
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
