# Briefing de mídia — /servicos

Duas peças foram marcadas na página como `SUBSTITUIR POR MÍDIA`. Cada placeholder
mostra na tela o id (`img-01`, `vid-01`), o nome do arquivo e um resumo, para
quem for produzir não precisar abrir este documento.

**Regra que vale para as duas:** a bancada, as máquinas e as mãos precisam ser
da Retífica Premium. Imagem gerada por IA apresentada como se fosse a oficina é
propaganda enganosa e destrói justamente a credibilidade que a página existe para
construir. Use o Veo para plano de contexto e transição; use o celular para o que
é da casa.

---

## img-01 — Medição de empeno

**Onde:** seção "Medição", coluna direita, ao lado da lista de pontos conferidos.
**Componente:** `MidiaPlaceholder id="img-01"`
**Arquivo:** `public/medicao-empeno-cabecote.webp`

| Item | Definição |
| --- | --- |
| Objetivo | Provar que a medição existe de verdade. É a imagem que sustenta a frase "a gente confere antes de dar preço" |
| Cena | Bancada da oficina, cabeçote apoiado, relógio comparador (ou régua de precisão) sobre a face de vedação |
| Instrumentos | Relógio comparador, base magnética, régua de precisão, calibrador de lâminas |
| Ação | Mão do mecânico posicionando o instrumento. Movimento contido, não posado |
| Composição | Peça ocupando dois terços do quadro, na diagonal. Instrumento em primeiro plano nítido |
| Enquadramento | Plano médio fechado, câmera ligeiramente acima da bancada |
| Lente | Sensação de 50 mm. Profundidade rasa, fundo da oficina desfocado |
| Iluminação | Luz lateral dura marcando a superfície usinada, com preenchimento suave do outro lado |
| Cor e textura | Alumínio frio, resíduo de óleo, azul do navy no fundo desfocado. Nada higienizado demais |
| Realismo | Fotografia documental. Sem retoque publicitário |
| Proporção | 4:3 |
| Espaço para texto | Não precisa — o texto fica ao lado, não sobreposto |
| Evitar | Peça nova de catálogo, bancada vazia, luva branca impecável, fundo branco de estúdio |
| Nome do arquivo | `medicao-empeno-cabecote.webp` |

**Como produzir:** celular, 20 minutos na oficina. Não vale gerar no Veo.

---

## vid-01 — Teste de trinca

**Onde:** seção "Teste de trinca", coluna direita. Enquanto o vídeo não existir, o
placeholder ocupa o espaço em 16:9.
**Componente:** `MidiaPlaceholder id="vid-01"` — quando o vídeo estiver no YouTube,
preencher `videos.tecnologiaTesteTrinca.youtubeId` em `src/lib/videos.ts` e o
`VideoEmbed` assume o lugar automaticamente.
**Arquivo:** `public/teste-de-trinca.mp4` (ou só o id do YouTube)

| Item | Definição |
| --- | --- |
| Objetivo narrativo | Mostrar que existe uma etapa que os outros pulam — e que é ela que evita o retrabalho |
| Duração | 45 segundos |
| Proporção | 16:9, 1920×1080 |
| Cena inicial | Cabeçote sujo chegando na bancada |
| Cena final | Peça limpa e liberada, com o laudo ao lado |
| Movimento de câmera | Estático com leve aproximação nos closes. Nada de câmera girando |
| Ritmo | Seis planos de ~8 s. Corte seco entre eles |
| Iluminação | Luz de oficina real, com um ponto dirigido no momento da trinca aparecer |
| Direção de arte | Sem trilha épica, sem transição gráfica. O silêncio da bancada vende mais |
| Som | Som ambiente da oficina. **Precisa funcionar mudo** — 85% assiste sem som |
| Loop | Não. Tem começo e fim |
| Texto no vídeo | Legenda queimada, sans-serif bold, branco sobre faixa escura. Sem texto gerado por IA |
| Poster | Frame do plano 4 (a trinca revelada) — é o quadro que faz clicar |

### Roteiro, plano a plano

| Plano | Tempo | Imagem | Legenda na tela |
| --- | --- | --- | --- |
| 1 | 0–8 s | Cabeçote sujo chegando | **"Essa trinca você não vê a olho nu"** |
| 2 | 8–16 s | Banho químico, peça saindo limpa | "Primeiro a peça é limpa. Sem isso nenhuma medida é confiável" |
| 3 | 16–24 s | Equipamento de teste em operação | "Depois vai para o teste de trinca" |
| 4 | 24–32 s | **Close na trinca revelada** | **"Aqui está. Invisível a olho nu"** |
| 5 | 32–40 s | Reparo ou peça separada | "Com trinca, a gente conserta ou avisa antes — nunca monta por cima" |
| 6 | 40–45 s | Peça pronta + logo | **"É por isso que o problema não volta"** |

**Todos os seis planos são filmagem real.** É o vídeo com maior valor de prova da
página; imagem gerada aqui destruiria o efeito. O plano 4 é o decisivo.

**Se precisar de um plano de contexto gerado** (por exemplo, um carro parado na rua
para abrir a peça), use este prompt no Veo — e só para contexto, nunca para a oficina:

```
8s, 16:9, 1080p. Cinematic documentary shot of a Brazilian countryside street,
a car stopped with the hood open, white steam rising slowly from the engine bay,
late afternoon light. Static camera, shallow depth of field, realistic colors.
No text, no logos, no readable signage, no people looking at camera.
```

Negative prompt: `text, watermark, logo, distorted hands, extra fingers, cartoon,
CGI look, oversaturated, studio white background, stock photo aesthetic`

---

## Pendências de conteúdo que não são mídia

| Pendência | Onde aparece na página |
| --- | --- |
| **Nome e marca do equipamento de teste de trinca** | Bloco marcado `[CONTEÚDO REAL NECESSÁRIO]` na seção de trinca |
| **Garantia com prazo e quilometragem** | Ainda não publicada. 4 dos 6 concorrentes publicam |
| **Faixa de preço** | `faixaPreco` em `PrecoPrazoGarantia.tsx` |
