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
    title: "Medição básica da sessão",
    status: "Sempre ativa",
    description:
      "Registra uma sessão temporária com as páginas acessadas, origem geral, tempo ativo e ações, sem cookie persistente, URL de consulta ou identificação direta.",
  },
  {
    number: "02",
    title: "Análise avançada da experiência",
    status: "Você escolhe",
    description:
      "Autoriza Google Analytics 4 e Microsoft Clarity a estimar cidade e região pelo IP, encontrar dificuldades de navegação e melhorar páginas e formulários.",
  },
  {
    number: "03",
    title: "Anúncios e conversões",
    status: "Você escolhe",
    description:
      "Registra a origem, a campanha e identificadores de clique, como GCLID, quando existirem. Isso permite relacionar contatos aos anúncios e entender quais campanhas trazem resultados.",
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
            Última atualização: 5 de agosto de 2026
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
                  A medição básica da sessão registra a URL sem parâmetros de
                  consulta, a página de entrada, as páginas seguintes, origem
                  geral, dispositivo, data, hora, tempo ativo e ações realizadas.
                  O identificador aleatório existe somente durante a sessão da
                  página e não identifica diretamente a pessoa. Conforme suas
                  escolhas opcionais, também podemos registrar campanha, mídia,
                  termo e identificadores técnicos de clique. A atribuição local
                  expira em até 90 dias e a preferência de privacidade em até 180 dias.
                  A cidade, o estado e o país podem ser estimados pelo endereço IP;
                  essa localização é aproximada e não corresponde ao GPS da pessoa.
                </p>
                <p className="mt-3 text-sm leading-7 text-[#42526d]">
                  No primeiro acesso, o banner oferece as opções
                  <strong> Configurar</strong> e <strong>Aceitar</strong>. Se não
                  houver interação em cinco segundos, as categorias de análise
                  avançada e publicidade são registradas automaticamente como
                  autorizadas. Em <strong>Configurar</strong>, os controles começam
                  ligados e você pode desativar cada categoria antes de salvar.
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
                  otimizadas nesta versão do site.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-2xl font-bold text-[#06172e]">
                  Com quem os dados podem ser processados
                </h2>
                <p className="mt-3 text-sm leading-7 text-[#42526d]">
                  O Retiflow recebe a medição básica da sessão. Dependendo das
                  categorias autorizadas, também usamos Google Analytics 4,
                  serviços do Google para anúncios e Microsoft Clarity. Não
                  ativamos personalização de anúncios no consentimento atual.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-2xl font-bold text-[#06172e]">
                  Seus direitos e suas escolhas
                </h2>
                <p className="mt-3 text-sm leading-7 text-[#42526d]">
                  Você pode solicitar confirmação, acesso, correção ou exclusão
                  de dados aplicável ao seu caso. Também pode mudar as
                  categorias opcionais a qualquer momento pelo botão
                  <strong> Privacidade</strong>, no canto inferior esquerdo do
                  site. A medição básica da sessão permanece ativa com fundamento
                  no legítimo interesse de medir o funcionamento e a audiência;
                  ao revogar uma categoria opcional, limpamos do navegador os
                  dados correspondentes que conseguirmos identificar. Você pode
                  se opor ao tratamento básico pelo contato indicado nesta página.
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
