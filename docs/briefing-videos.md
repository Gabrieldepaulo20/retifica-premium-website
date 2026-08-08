# Briefing de vídeos — Retífica Premium

Documento de produção. Cada slot de `src/lib/videos.ts` tem aqui: duração, formato,
roteiro plano a plano, texto na tela e o que fazer com legenda e capa.

Atualizado em 07/08/2026.

---

## 1. O que a evidência sustenta (e o que não sustenta)

### Duração — evidência boa

Wistia analisou 13 milhões de vídeos no relatório de 2026:

- Vídeos **abaixo de 60 segundos**: ~52% de engajamento médio e mais de 70% de taxa de conclusão.
- A curva de engajamento **cai forte depois de 60s** e despenca depois de 120s.
- Taxa de conclusão fica **abaixo de 50%** passando de 90 segundos.
- Recomendação da própria Wistia: **~30s para oferta, ~60s para explicação, no máximo 90s** para depoimento.

Vídeos curtos sofreram queda de engajamento de ~10% ano a ano em 2024 — a concorrência do
formato curto (Reels, TikTok) elevou a expectativa. Ou seja: 30s hoje precisa ser melhor
do que 30s precisava ser em 2022.

**Decisão para este projeto: nenhum vídeo passa de 60 segundos. O da primeira dobra tem 32.**

### Som desligado — evidência boa

- 85% dos vídeos no Facebook são assistidos **sem som** (dado do próprio Facebook).
- Legenda aumenta o tempo de exibição em ~12% na média (Facebook).
- Verizon Media + Publicis: até 80% dos espectadores têm mais chance de terminar o vídeo com legenda.

**Decisão: legenda queimada no vídeo (não legenda do YouTube). Todo vídeo precisa funcionar mudo.**

### "Vídeo aumenta conversão em 86%" — não use esse número

Esse número circula em todo blog de marketing. A origem é um teste A/B da **EyeView Digital
para a TutorVista**, um caso único, de fornecedor, anterior a 2020. Não é lei, não é
meta-análise, e não vale para retífica de cabeçote.

O que dados mais recentes indicam é uma faixa muito mais larga: de **−10%** (vídeo errado,
página errada) a **+100%** (vídeo certo, lugar certo), com ganho real mais comum na casa de
**20% a 40%**.

Trate como aposta com base razoável, não como certeza. É exatamente por isso que o snapshot
de comparação existe: vamos medir no tráfego da Retífica, não confiar em benchmark alheio.

### Aplicando ao nosso caso concreto

O dado da própria conta pesa mais que qualquer benchmark:

- Scroll mediano do tráfego pago: **14%**. Metade das sessões dura menos de 10 segundos.
- 74% do tráfego pago é **celular**.

Consequência direta de produção: **o vídeo precisa entregar a mensagem inteira nos
primeiros 5 segundos, mudo, numa tela de celular.** Se o vídeo depende de alguém assistir
30 segundos com som para entender, ele não vai funcionar aqui.

---

## 2. Especificação técnica comum

| Item | Valor | Por quê |
| --- | --- | --- |
| Resolução | **1920×1080** (16:9) ou **1080×1080** (1:1) | O player usa `aspect-video` por padrão; o slot da 1ª dobra usa `mobileSquare` |
| Codec / container | H.264, MP4, ~8–12 Mbps | Padrão de upload do YouTube |
| Áudio | AAC 128 kbps. **Opcional** — o vídeo tem que funcionar mudo | 85% assiste sem som |
| Legenda | **Queimada no vídeo**, não CC do YouTube | Autoplay/preview não carrega CC |
| Fonte da legenda | Sans-serif bold, ~52px em 1080p, texto branco sobre faixa escura | Legibilidade em tela pequena |
| Duração | 30–60s. Nunca acima de 60s | Wistia: queda forte após 60s |
| Primeiros 3s | Promessa principal na tela, em texto | Metade das sessões dura menos de 10s |
| Capa (thumbnail) | 1280×720, com texto grande | O player mostra a capa antes do play |
| Onde hospedar | YouTube **não listado** | O componente usa `youtube-nocookie` e só carrega no clique |

### Como o player se comporta

`VideoEmbed` mostra só a capa e um botão de play. O iframe do YouTube só carrega quando a
pessoa clica — isso protege o PageSpeed. Consequência prática: **a capa é tão importante
quanto o vídeo**, porque é o que 100% das pessoas veem e o que decide o clique.

### Proporção por slot

O campo `aspect` em `videos.ts` controla o formato:

- `wide` (padrão) — 16:9
- `mobileSquare` — **quadrado no celular, 16:9 no desktop**
- `square` — 1:1 sempre
- `vertical` — 9:16 sempre

O slot da primeira dobra (`ribeiraoPretoHero`) já está em `mobileSquare`. Motivo: um 16:9
num celular de 375px de largura ocupa 211px de altura; quadrado ocupa 375px — quase o dobro
de área na tela onde está a maior parte do tráfego pago.

---

## 3. Produzir no Gemini/Veo — o que você precisa saber antes

O Veo 3.1 gera **clipes de 8 segundos** (a versão Lite faz 4, 6 ou 8), em 720p, 1080p ou 4K,
em 16:9 ou 9:16. Um vídeo de 32 segundos é, na prática, **4 clipes de 8s emendados**.

Por isso todo roteiro abaixo está dividido em blocos de 8 segundos: cada bloco é um prompt.

### Aviso importante sobre imagem gerada por IA

Não use vídeo gerado por IA para mostrar **a sua oficina, a sua equipe ou a sua máquina**.
Uma bancada que não é a sua, apresentada como se fosse, é publicidade enganosa — e é
justamente o tipo de coisa que derruba a credibilidade quando o cliente chega no lugar real.
O material de pesquisa de 04/08 já levantou esse ponto no contexto de urgência falsa; vale igual aqui.

**Divisão recomendada:**

| Tipo de plano | Como produzir |
| --- | --- |
| Oficina, bancada, equipe, máquinas, peça real | **Celular, filmado por vocês.** Um iPhone recente resolve |
| Mapa, rota, animação de texto, transições, ícones | Veo ou animação simples |
| Plano genérico (carro na estrada, motorista preocupado) | Veo — não afirma ser a sua oficina |

Na prática: filme 4 ou 5 planos da oficina com o celular (leva 20 minutos) e use o Veo para
os planos de contexto e as transições. O resultado é melhor e é honesto.

---

## 4. VÍDEO 1 — `ribeiraoPretoHero`

**O vídeo mais importante do projeto.** Fica na primeira dobra da página que recebe o
tráfego pago de Ribeirão Preto.

| Item | Valor |
| --- | --- |
| Slot | `videos.ribeiraoPretoHero` |
| Onde aparece | 1ª dobra de `/retifica-em-ribeirao-preto`, no lugar da foto da fachada |
| Duração | **32 segundos** (4 blocos de 8s) |
| Formato | **1080×1080 quadrado** — o slot já está em `mobileSquare` |
| Objetivo | Matar a dúvida "vou ter que levar até Sertãozinho?" |
| Sucesso | Aumento da taxa de contato das sessões pagas que caem nessa página |

### Roteiro

**Bloco 1 — 0s a 8s · A DOR**

- Imagem: carro parado com o capô aberto, em rua residencial. Pessoa olhando o motor, sem saber o que fazer. Luz de fim de tarde.
- Texto na tela (aparece em 1s, grande, canto superior): **"Cabeçote com problema em Ribeirão Preto?"**
- Áudio: som ambiente de rua. Sem narração ainda.

**Bloco 2 — 8s a 16s · A PROMESSA (o ponto de virada)**

- Imagem: veículo da retífica chegando, o cabeçote sendo colocado com cuidado no porta-malas/caçamba.
- Texto na tela: **"A gente busca na sua casa ou na sua oficina"** e, abaixo, menor: *"Sem custo de deslocamento"*
- Este é o bloco que carrega o vídeo. Se você só pudesse fazer um, seria este.

**Bloco 3 — 16s a 24s · A PROVA**

- Imagem: **filmagem real da oficina.** Cabeçote na bancada, medição sendo feita, faísca/usinagem, close na superfície acabada.
- Texto na tela: **"Retificamos em Sertãozinho — 20+ anos só em cabeçote"**

**Bloco 4 — 24s a 32s · O FECHAMENTO**

- Imagem: cabeçote limpo e pronto sendo devolvido, aperto de mão.
- Texto na tela, em sequência: **"E devolvemos no mesmo endereço"** → **"Orçamento no WhatsApp em até 2h"**
- Último frame congela por 2s com o logo, o número do WhatsApp e "Garantia por escrito".

### Prompts para o Veo (blocos 1, 2 e 4)

O bloco 3 é filmagem real — não gere.

```
BLOCO 1 (8s, 1:1, 1080p)
Cinematic shot of a worried middle-aged Brazilian man standing beside his
open car hood on a quiet residential street in a Brazilian countryside city,
late afternoon golden light, white steam rising slowly from the engine bay.
Camera slowly pushes in toward his face. Realistic, documentary style,
shallow depth of field. No text, no logos.
```

```
BLOCO 2 (8s, 1:1, 1080p)
A service van pulls up on a Brazilian residential street. A mechanic in a
clean navy blue work uniform carefully lifts a car cylinder head wrapped in
protective material and places it in the van. Confident, competent movement.
Warm afternoon light, realistic documentary style, handheld camera.
No text, no logos, no readable signage.
```

```
BLOCO 4 (8s, 1:1, 1080p)
Close-up of clean, freshly machined automotive cylinder head being handed
from a mechanic in navy uniform to a customer, on a Brazilian street.
Both hands in frame, firm handshake follows. Bright natural light,
realistic documentary style, shallow depth of field. No text, no logos.
```

Nos prompts está escrito "no text, no logos" de propósito: texto gerado por IA sai torto e
em inglês. **Todo texto entra na edição**, depois.

### Capa (thumbnail)

1080×1080. Foto real da oficina ao fundo, escurecida. Por cima, em letra grande:
**"BUSCAMOS EM RIBEIRÃO PRETO"** e, abaixo, menor: *"retificamos e devolvemos"*.
Botão de play no centro (o componente já desenha o dele — deixe o centro livre).

### Como ativar

```ts
// src/lib/videos.ts
ribeiraoPretoHero: {
  aspect: "mobileSquare",
  youtubeId: "COLE_O_ID_AQUI",   // ← só descomentar e preencher
  title: "A gente busca em Ribeirão Preto, retifica e devolve",
},
```

A foto da fachada é substituída automaticamente pelo vídeo. Nada mais precisa mudar.

---

## 5. VÍDEO 2 — `tecnologiaTesteTrinca`

Aparece em dois lugares: no bloco de tecnologia da página de Ribeirão Preto e em
`/servicos/teste-de-trinca`. É o argumento técnico que justifica sair da cidade —
a retífica de bairro não tem isso.

| Item | Valor |
| --- | --- |
| Slot | `videos.tecnologiaTesteTrinca` (também usado em `serviceVideos["teste-de-trinca"]`) |
| Duração | **48 segundos** (6 blocos de 8s) |
| Formato | 1920×1080 (16:9) |
| Objetivo | Provar competência técnica e explicar por que retrabalho acontece |

### Roteiro

| Bloco | Tempo | Imagem | Texto na tela |
| --- | --- | --- | --- |
| 1 | 0–8s | Cabeçote sujo chegando na bancada | **"Essa trinca você não vê a olho nu"** |
| 2 | 8–16s | Banho químico, peça saindo limpa | "Primeiro a peça é limpa. Sem isso, nenhuma medida é confiável" |
| 3 | 16–24s | **Máquina de teste em operação** (filmagem real) | "Depois vai para o teste de trinca" |
| 4 | 24–32s | Close na trinca revelada | **"Aqui está. 3 centímetros, invisível a olho nu"** |
| 5 | 32–40s | Reparo/solda ou peça sendo separada | "Com trinca, a gente conserta ou avisa antes — nunca monta por cima" |
| 6 | 40–48s | Peça pronta + logo | **"É por isso que o problema não volta"** / "Orçamento no WhatsApp em até 2h" |

**Blocos 1 a 5 são filmagem real.** É o vídeo com maior valor de prova — imagem gerada aqui
destruiria justamente a credibilidade que ele existe para construir. Use o celular.

O bloco 4 é o momento decisivo: um close nítido de uma trinca real revelada pelo teste vale
mais que qualquer texto na página.

---

## 6. VÍDEO 3 — `ribeiraoPretoLogistica`

| Item | Valor |
| --- | --- |
| Slot | `videos.ribeiraoPretoLogistica` |
| Onde aparece | Seção "Atendimento para Ribeirão Preto em 4 passos" |
| Duração | **32 segundos** (4 blocos de 8s) |
| Formato | 1920×1080 (16:9) |
| Objetivo | Tornar concreto o "buscamos e entregamos" — quem chegou aqui já rolou a página, está considerando |

### Roteiro

| Bloco | Tempo | Imagem | Texto na tela |
| --- | --- | --- | --- |
| 1 | 0–8s | Animação de mapa: Ribeirão Preto → Sertãozinho, linha traçada | **"19 km. 25 minutos."** |
| 2 | 8–16s | Conversa de WhatsApp na tela do celular (mockup), foto da peça sendo enviada | "Você manda o sintoma. A gente responde em até 2h" |
| 3 | 16–24s | Peça sendo retirada no endereço | **"Buscamos onde você estiver"** |
| 4 | 24–32s | Peça retornando, montada | **"E devolvemos pronta. Você não perde o dia"** |

O bloco 1 é animação — pode ser feita em qualquer editor com um print do Google Maps.
Não precisa de Veo.

O bloco 2 é um mockup de tela; grave a tela do celular com uma conversa real (anonimizada)
ou monte no editor.

---

## 7. Demais slots — ordem de produção

Faça na ordem. Os três primeiros valem mais que todos os outros juntos, porque estão no
caminho do tráfego pago.

| # | Slot | Página | Duração | Formato | Prioridade |
| --- | --- | --- | --- | --- | --- |
| 1 | `ribeiraoPretoHero` | `/retifica-em-ribeirao-preto` | 32s | 1:1 | **Crítica** |
| 2 | `tecnologiaTesteTrinca` | RP + `/servicos/teste-de-trinca` | 48s | 16:9 | **Alta** |
| 3 | `ribeiraoPretoLogistica` | `/retifica-em-ribeirao-preto` | 32s | 16:9 | **Alta** |
| 4 | `serviceVideos["retifica-de-cabecote"]` | `/servicos/retifica-de-cabecote` | 48s | 16:9 | Alta — 30 sessões pagas na quinzena |
| 5 | `problemVideos["junta-do-cabecote-queimada"]` | `/problemas/junta-do-cabecote-queimada` | 40s | 16:9 | Média — 5 sessões pagas, 0 contato |
| 6 | `homeShowcase` | `/` | 48s | 16:9 | Média |
| 7 | `serviceVideos["plaina-de-cabecote"]` | `/servicos/plaina-de-cabecote` | 32s | 16:9 | Média — 5 sessões pagas, 0 contato |
| 8 | `b2bPartnership` | `/b2b` | 60s | 16:9 | Média — não tem tráfego pago ainda |
| 9 | `serviceVideos["banho-quimico"]` | `/servicos/banho-quimico` | 32s | 16:9 | Baixa |
| 10 | `serviceVideos["montagem-de-cabecote"]` | `/servicos/montagem-de-cabecote` | 40s | 16:9 | Baixa |
| 11 | `problemVideos["motor-superaquecendo"]` | `/problemas/motor-superaquecendo` | 40s | 16:9 | Baixa |
| 12 | `problemVideos["motor-fumando"]` | `/problemas/motor-fumando` | 32s | 16:9 | Baixa |
| 13 | `problemVideos["motor-baixando-oleo"]` | `/problemas/motor-baixando-oleo` | 32s | 16:9 | Baixa |

Cada slot tem um campo `brief` em `videos.ts` com o resumo do roteiro — está lá para você
não precisar abrir este documento toda vez.

### Regra comum a todos os vídeos de sintoma (`problemVideos`)

Quem cai numa página de sintoma está com o carro quebrado agora. O roteiro é sempre o mesmo:

1. **0–8s:** nomear o sintoma exatamente como a pessoa buscou ("fumaça branca no escapamento")
2. **8–16s:** o que isso normalmente significa
3. **16–24s:** **o que não fazer** — é o trecho que gera confiança, porque não está vendendo
4. **24–32s:** o que a retífica faz + WhatsApp

Nunca abra vídeo de sintoma com a marca. Abra com o problema da pessoa.

---

## 8. Como saber se o vídeo funcionou

Cada `VideoEmbed` já dispara um evento de clique no play, com rótulo próprio:

| Slot | `eventLabel` |
| --- | --- |
| Hero de RP | `ribeirao_preto_hero_video` |
| Teste de trinca (na página de RP) | `ribeirao_preto_video_teste_trinca` |
| Logística | `ribeirao_preto_video_logistica` |
| Página de serviço | `service_<slug>_video` |
| Página de problema | `problem_<slug>_video` |

O que olhar depois de 14 dias com o vídeo no ar:

1. **Taxa de play** — quantas sessões clicaram no play sobre o total que chegou na página. Abaixo de 10% significa que a **capa** está fraca, não o vídeo.
2. **Taxa de contato de quem deu play vs. quem não deu.** É a métrica que importa. Se quem assiste não converte mais, o vídeo é decoração.
3. **Scroll mediano.** Hoje é 14% no tráfego pago. Se subir, o vídeo está segurando a pessoa.

Rode a comparação com:

```bash
node tmp/comparar-snapshots.mjs
```

---

## Fontes

- Wistia — *How to Choose the Right Marketing Video Length for Any Goal* e relatório 2026 (13M vídeos analisados): <https://wistia.com/learn/marketing/optimal-video-length>
- Wistia — *How to Use Video on Landing Pages*: <https://wistia.com/learn/marketing/how-to-use-video-on-landing-pages>
- Digiday — *85 percent of Facebook video is watched without sound*: <https://digiday.com/media/silent-world-facebook-video/>
- Forbes / Verizon Media — consumo de vídeo com som desligado e preferência por legenda: <https://www.forbes.com/sites/tjmccue/2019/07/31/verizon-media-says-69-percent-of-consumers-watching-video-with-sound-off/>
- 3Play Media — Verizon Media + Publicis Media sobre legendas: <https://www.3playmedia.com/blog/verizon-media-and-publicis-media-find-viewers-want-captions/>
- Foundry CRO — origem e limites do número de "+86%" (EyeView / TutorVista): <https://foundrycro.com/blog/landing-page-video-benchmarks-2026/>
- Google — Veo 3.1, geração de vídeo (clipes de 8s, 16:9 e 9:16): <https://ai.google.dev/gemini-api/docs/veo>

**Sobre a qualidade das fontes:** os dados da Wistia são primeiros dados de plataforma sobre
milhões de vídeos — é a evidência mais forte aqui. Os números do Facebook e da Verizon são de
plataforma/anunciante, direcionalmente confiáveis. O "+86%" é caso único de fornecedor e está
citado apenas para você reconhecer e descartar quando aparecer em algum blog.
