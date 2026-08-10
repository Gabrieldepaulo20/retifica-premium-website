# Redesenho de /servicos — diagnóstico, pesquisa e direção

Consulta feita em 10/08/2026. Este documento é o raciocínio por trás da página;
o briefing de mídia está em `docs/redesign-servicos-midia.md`.

---

## 0. Escopo e o que foi preservado

**Alvo:** `/servicos` — a página índice. Não as páginas de detalhe `/servicos/[slug]`.

**Preservado sem alteração:** telefone, WhatsApp, URLs, textos de sintoma e de FAQ já
validados, `problem-pages.ts`, `service-pages.ts`, componentes de rastreamento e o
`FloatingWhatsApp`. Nenhuma outra rota foi tocada.

**Alterações locais não commitadas que ficaram intactas:** o rascunho de redesenho de
`/servicos/[slug]` com `FichaMedicao`, mais o trecho de `globals.css` e o
`medicoesPorServico` em `service-pages.ts` que ele usa. Não entraram nesta tarefa e
não foram revertidos.

---

## 1. Público — o que a pesquisa mostrou

### Quem chega nesta página

| Público | Estado emocional | O que precisa decidir |
| --- | --- | --- |
| **Motorista com o carro parado** (primário) | Assustado, sem vocabulário técnico | "Isso tem conserto e quanto vai me custar?" |
| **Motorista pesquisando preço** | Desconfiado, comparando | "Por que um cobra 800 e outro 2.500?" |
| **Mecânico / oficina** | Técnico, avaliando parceiro | "Esse cara devolve no prazo e sem retrabalho?" |
| **Frotista / transportador** | Custo de parada | "Quanto tempo meu veículo fica fora?" |

### A dúvida central do mercado

A pergunta que o brasileiro faz antes de tudo é **"preciso retificar ou dá para só
trocar a junta?"**. O conteúdo de referência do setor é consistente: nem toda junta
queimada exige retífica, e retificar sem diagnóstico é gasto desnecessário — mas
trocar só a junta sobre um cabeçote empenado ou trincado traz o problema de volta.

Faixa de custo que circula no mercado: **R$ 150 a R$ 400** só a troca da junta, e
**R$ 1.000 a R$ 2.500** quando há dano associado. A mediana real da Retífica Premium
(R$ 780, base de 1.227 O.S.) fica confortavelmente abaixo do teto — é argumento que
hoje não aparece em lugar nenhum do site.

### O medo que decide a compra

Não é preço. É **retrabalho**: pagar, montar o motor e o problema voltar em duas
semanas. As fontes técnicas do setor apontam a mesma causa para isso: **falha de junta
pode ser sintoma de trinca no cabeçote, e sem teste de trinca o diagnóstico sai
errado**.

Isso é decisivo para a página: o teste de trinca não é "mais um serviço da lista". É a
resposta ao maior medo do cliente. Ele merece tratamento de destaque — o que também é
exatamente o que você pediu.

### Dados reais da própria conta (valem mais que benchmark)

Dos 170 termos de pesquisa medidos nos 14 primeiros dias de campanha:

- **25,7%** das impressões são busca por **nome de concorrente**
- **13,9%** são busca por **preço** — e convertem zero, porque a palavra "preço" não existia nas páginas
- **13,9%** são **informacionais** ("o que acontece quando queima", "pode andar com") — 0 clique
- Termos de **sintoma** aparecem em volume: junta queimada, motor misturando água e óleo, carro superaquecendo

E o comportamento: **74% celular, 61% sai em menos de 10 segundos, 83% não passa da
metade da página**. Quem passa de 30 segundos converte entre 29% e 50%.

---

## 2. Concorrentes analisados

### Critério de escolha

Não usei "é uma das maiores" como critério — isso não é verificável a partir de uma
busca. Selecionei por: **aparecer na primeira página do Google para "retífica de
motores São Paulo" e variações de cabeçote**, ter site próprio em operação, e cobrir
faixas diferentes de porte e proposta. É uma amostra de *visibilidade orgânica e
presença digital*, não de faturamento ou tamanho real.

### Comparativo

| # | Empresa | URL | Região | Proposta central | Provas | Sintomas? | Vídeo? | Preço? |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Hermes Retífica | hermesretificademotores.com.br | São Paulo | Padrão de fábrica | Desde 1999 · **garantia 24 meses ou 100.000 km** · atendimento 24/7 | Não | Não | **Sim — "a partir de R$ 3.399"** |
| 2 | Leon Motores | leonmotores.com.br | São Paulo | Especialista diesel | 55 anos · **12 logos de marcas autorizadas** (Bosch, Cummins, MWM, ZF) | Não | Não | Não |
| 3 | Motor-Vidro | retifica.com.br | São Paulo | Escala e credencial | 42 anos · 100 profissionais · **CREA, IQA, INMETRO, NBR 13.032** · cita magnaflux e dinamômetro | Não | Não | Não |
| 4 | RetMotor | retmotors.com.br | São Paulo e região | Experiência e agilidade | 20 anos · "garantia total" · bandeiras de cartão | Não | Não | Não |
| 5 | Hype Motores | retificahypermotores.com.br | São Paulo | Usinagem completa | **Garantia 2 anos ou 100.000 km** · 16 logos de montadoras | Não | Não | Não |
| 6 | Retífica MN | retificamn.com.br | São Paulo | **Usinagem não terceirizada** | 15+ anos · **garantia 9 meses ou 30.000 km** · guincho grátis · 12x no cartão | Não | Não | Não |

### O que aparece em comum nos melhores

1. **Garantia com número é a prova principal.** Quatro dos seis publicam prazo e
   quilometragem. É o que substitui depoimento nesse mercado.
2. **Anos de mercado no topo.** Todos, sem exceção.
3. **Logos de marca** como atalho de credibilidade (Leon, Hype).
4. **WhatsApp em toda a página.**
5. **Múltiplos canais de contato** — telefone além do WhatsApp.

### O que nenhum dos seis faz

- **Nenhum organiza a página por sintoma.** Todos assumem que a pessoa já sabe o nome
  do serviço que precisa. Quem chega com "meu carro está fumando" não é atendido.
- **Nenhum tem vídeo.**
- **Nenhum explica o processo técnico** de forma que gere confiança.
- **Quase nenhum nomeia equipamento ou teste.** Só a Motor-Vidro, e de passagem.
- **Nenhum publica faixa de preço** exceto a Hermes, com um valor alto (R$ 3.399) que
  ancora o mercado para cima.

### O que a Retífica Premium pode fazer melhor, hoje

| Lacuna do mercado | Ativo que a Retífica Premium já tem |
| --- | --- |
| Ninguém atende quem não sabe o nome do serviço | **5 páginas de sintoma** já publicadas em `/problemas/*` |
| Ninguém explica o teste de trinca | Serviço próprio, com página dedicada |
| Ninguém tem vídeo | 13 slots já estruturados, prontos para receber |
| Preço ancorado alto pela concorrência | Mediana real de R$ 780 |
| Ninguém oferece logística | **Busca e entrega sem custo** — nenhum dos seis oferece |

---

## 3. Lacunas e hipóteses de conversão

Priorizadas por impacto esperado sobre a taxa de contato.

| # | Hipótese | Base | Como medir |
| --- | --- | --- | --- |
| H1 | Entrada por sintoma converte mais que entrada por nome de serviço | 0 de 6 concorrentes fazem; termos de sintoma têm volume real na conta | Evento `sintoma_click` → taxa de contato da sessão |
| H2 | Dar destaque ao teste de trinca aumenta contato | É a resposta ao maior medo (retrabalho); confirmado pelas fontes do setor | Contato de quem viu a seção vs. quem não viu |
| H3 | Responder preço na página aumenta contato de quem busca preço | 13,9% das impressões são preço e convertem 0 | Contato de sessões com `utm_term` de preço |
| H4 | CTA contextual por sintoma converte melhor que CTA genérico | Mensagem pré-preenchida reduz atrito de escrever | Comparar `eventLabel` por origem do CTA |
| H5 | Prova numérica real supera adjetivo | Concorrência inteira usa garantia com número | Rolagem até a seção e contato subsequente |

---

## 4. Estratégia de conversão

- **Ação principal:** clique no WhatsApp com mensagem pré-preenchida e contexto.
- **Ações secundárias:** ligar, abrir a página de sintoma, abrir a página do serviço, ir para B2B.
- **Problema que a página resolve:** "meu motor deu problema e eu não sei o que preciso, nem em quem confiar."
- **Hierarquia:** sintoma → o que pode ser → o que a gente mede → o que corrige → prova → contato.

### Objeções e onde cada uma é respondida

| Objeção | Resposta na página |
| --- | --- |
| "Não sei o que eu preciso" | Trilha de sintomas logo abaixo do hero |
| "Será que tem conserto?" | Seção de teste de trinca: o que dá para recuperar e o que não dá |
| "Vai voltar a dar problema?" | Teste de trinca + medição antes do orçamento |
| "Quanto custa?" | Bloco de preço, prazo e garantia |
| "Quanto tempo fica parado?" | Mesmo bloco — prazo confirmado no orçamento |
| "Por que sair da minha cidade?" | Busca e entrega, com link para a página regional |
| "Vocês são sérios?" | Números reais + processo explicado + laudo por escrito |

---

## 5. Direção criativa

### Conceito

**"O diagnóstico antes do orçamento."** A página não é um catálogo. É a trilha que
alguém percorre para descobrir o que a peça dele tem — na mesma ordem em que a bancada
trabalha.

### Por que isso não é template

Uma página de serviços genérica é uma grade de cards com ícone, título e "saiba mais".
Todos os seis concorrentes são exatamente isso. Aqui a estrutura é uma **sequência de
diagnóstico**, com a régua de cota como fio condutor, e os serviços aparecem *como
consequência do sintoma*, não como itens de menu. O elemento assinatura vem do
instrumento de medição, não de decoração.

### Paleta

| Token | Hex | Uso |
| --- | --- | --- |
| `--rp-navy` | `#020e1d` | Fundo das seções de diagnóstico |
| Aço | `#0B1B31` | Superfície de cartão sobre o navy |
| `--rp-gold` | `#fbbf24` | Cota, dado, rótulo técnico. O único acento quente |
| `--rp-accent` | `#2563eb` | Link e rótulo de etapa em fundo claro |
| WhatsApp | `#25D366` | Exclusivo do CTA principal. Nenhum outro verde na página |
| Creme | `#FFFBF2` | Faixa clara de respiro entre seções escuras |

### Tipografia

**Rajdhani** (já carregada, custo zero) para títulos, rótulos e números — condensada,
angular, instrumental. Corpo em fonte de sistema. Números tabulares em toda medida.

Escala: rótulo 11px/0.22em caixa alta · corpo 16px · h2 30→42px · h1 34→54px.
Espaçamento em múltiplos de 4, seções em 56/80px.

### Elemento assinatura — a régua de cota

Uma linha âmbar contínua percorre a lateral esquerda da página. Cada seção é uma
**estação** marcada por um traço horizontal, como cota de desenho técnico. Conforme a
pessoa rola, a linha se preenche — dá a sensação de percorrer um laudo, e é o que
sustenta a curiosidade de continuar rolando.

Custo: uma linha em CSS mais um `IntersectionObserver` de ~25 linhas. Sem biblioteca.

### A escolha ousada

**A primeira dobra não fala de serviço. Fala do sintoma.** O h1 não é "Serviços de
retífica" — é a pergunta que a pessoa tem na cabeça. Serviço só aparece depois que ela
se reconhece. É contraintuitivo para uma página chamada "Serviços" e é justamente por
isso que se diferencia dos seis concorrentes.

---

## 6. Estrutura final

| # | Seção | Função na jornada | Fundo |
| --- | --- | --- | --- |
| 1 | **Hero — o que o motor está fazendo?** | Reconhecimento imediato + CTA | navy |
| 2 | **Trilha de sintomas** | "Não sei o que preciso" → caminho | navy |
| 3 | **Preço, prazo e garantia** | Derruba a objeção comercial cedo | creme |
| 4 | **O que a gente mede** | Diferencial: diagnóstico antes do orçamento | branco |
| 5 | **Teste de trinca em destaque** | Responde ao medo de retrabalho | navy |
| 6 | **Os serviços** | Catálogo, só depois do contexto | branco |
| 7 | **Como funciona** | Processo real, 4 etapas | creme |
| 8 | **Para oficinas** | Público secundário | navy |
| 9 | **Onde atendemos** | Busca local + busca e entrega | branco |
| 10 | **Dúvidas** | FAQ por intenção de busca | branco |
| 11 | **CTA final** | Fechamento contextual | navy |

Removido do desenho anterior: a faixa de ícones de confiança genéricos (`whyPremium`),
que ocupava altura sem responder objeção nenhuma e repetia o que o bloco de preço,
prazo e garantia já diz melhor.

---

## 7. Pendências de conteúdo real

Nada abaixo foi inventado. Cada item precisa de confirmação antes de publicar.

| Pendência | Por que importa | Marcador no código |
| --- | --- | --- |
| **Garantia com prazo e km** | 4 dos 6 concorrentes publicam. Hoje o site só diz "por escrito" | `[CONTEÚDO REAL NECESSÁRIO: prazo e km da garantia]` |
| **Nome/marca do equipamento de teste de trinca** | É o diferencial técnico da página | `[CONTEÚDO REAL NECESSÁRIO: equipamento de teste de trinca]` |
| **Faixa de preço** | Mediana real R$ 780; publicar é decisão comercial | `faixaPreco` em `PrecoPrazoGarantia.tsx` |
| **Fotos reais da bancada e do teste** | Placeholders marcados na página | `SUBSTITUIR POR MÍDIA` |
| **Certificações**, se houver | Motor-Vidro usa CREA/IQA/INMETRO como prova | não incluído até confirmar |

---

## 8. Riscos e próximos testes

**Riscos**

- A página passa a competir com `/problemas/*` por palavra-chave de sintoma. Mitigação:
  os blocos de sintoma **linkam** para as páginas de problema, não duplicam o conteúdo.
- Se `/servicos` virar destino de anúncio, é preciso repetir o teste de correspondência
  palavra→página. Hoje ela recebe 1 sessão paga por quinzena.
- A seção de teste de trinca depende de mídia real para ter o efeito pretendido. Sem
  foto, ela vira texto.

**Testes A/B recomendados, na ordem**

1. Hero por sintoma × hero por serviço
2. Faixa de preço visível × ausente
3. Teste de trinca acima × abaixo do catálogo de serviços
4. CTA contextual por sintoma × CTA único
