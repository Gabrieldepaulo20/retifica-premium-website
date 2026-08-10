# Guia de mídia — serviços e estimativa guiada

Os espaços de mídia já reservam a proporção final para não causar salto de
layout. Enquanto os arquivos não existem, o visitante vê uma visualização
técnica neutra; nomes de arquivos e instruções de produção nunca aparecem no
site público.

## Regra de autenticidade

Oficina, profissionais, máquinas, instrumentos e peças apresentadas como prova
da Retífica Premium precisam ser filmados ou fotografados na própria empresa.
Veo pode gerar apenas ilustração técnica claramente não documental. Não use IA
para inventar estrutura, equipe, resultado, trinca encontrada ou serviço real.

## Foto principal de medição

- Espaço: `/servicos`, seção **Medição**, slot `img-01`.
- Arquivo final: `public/media/servicos/medicao-empeno-cabecote.webp`.
- Formato: WebP, 1600 × 1200 px, proporção 4:3, alvo de até 220 KB.
- Cena: cabeçote real na bancada, instrumento em primeiro plano e mão do técnico
  realizando a medição.
- Composição: peça ocupando cerca de dois terços do quadro, luz lateral marcando
  a superfície, fundo da própria oficina discretamente desfocado.
- Evitar: foto de catálogo, bancada de terceiro, pose olhando para a câmera,
  logotipos de parceiros não autorizados e instrumento apenas decorativo.

Essa foto deve ser documental. Não gerar no Veo.

## Vídeo real do teste de trinca

- Espaço: `/servicos`, seção **Teste de trinca**, slot `vid-01`.
- Arquivo recomendado: `public/media/videos/teste-de-trinca-retifica-premium-16x9.mp4`.
- Poster: `public/media/servicos/teste-de-trinca-poster.webp`.
- Formato: MP4 H.264, 1920 × 1080, 24–30 fps, 30–45 segundos, até 10 MB.
- Poster: WebP 1600 × 900, alvo de até 180 KB.
- Reprodução: somente após interação, sem autoplay, com legendas e compreensão
  completa sem som.

Roteiro seguro:

1. Recebimento e identificação da peça.
2. Limpeza real.
3. Medição da superfície.
4. Equipamento real de teste em operação.
5. Técnico interpretando o resultado, sem dramatização.
6. Próximo passo sendo explicado antes de reparo, solda ou substituição.

Não afirmar no vídeo que todo sintoma é trinca, que o teste elimina qualquer
retrabalho ou que uma peça está liberada sem a conferência real.

Para publicar pelo componente atual, envie o vídeo ao YouTube, preencha
`videos.tecnologiaTesteTrinca.youtubeId` em `src/lib/videos.ts` e configure o
poster. O player permanece descarregado até o clique.

## Vídeos das páginas individuais

Todos os slots e nomes finais estão em `src/lib/videos.ts`. Padrão recomendado:

- enquadramento 16:9 e 1920 × 1080;
- 30–60 segundos;
- H.264, entre 8 e 10 MB;
- poster WebP 1600 × 900;
- cortes estáveis, sem giro de câmera;
- legenda gravada e som ambiente controlado;
- mostrar a medição antes da correção;
- terminar com o que ainda precisa ser confirmado, não com promessa absoluta.

Há slots para retífica, plaina, limpeza química, teste de trinca, montagem,
sedes e válvulas, guias e roscas. Esmerilhamento e solda aparecem dentro das
páginas relacionadas, conforme o catálogo canônico.

## Prompt Veo — ilustração técnica do quiz

Uso permitido: loop curto dentro da estimativa guiada, identificado visualmente
como ilustração técnica. Ele nunca substitui a foto ou o vídeo real da oficina.

```text
Create a 6-second seamless technical visualization, 1080x1080, of an aluminum automotive cylinder head floating over a deep navy engineering background. Show thin amber measurement lines and restrained highlights moving progressively across the sealing face, valve seats, valve guides and coolant passages. Precise industrial visualization, realistic metal surface, orthographic-inspired camera, slow controlled motion, no dramatic rotation, no people, no workshop, no company logo, no text, no diagnosis claim. The animation must remain understandable without sound and loop without a visible cut. High contrast but restrained palette: navy, aluminum gray and amber only.
```

Negative prompt:

```text
fake workshop, mechanic, hands, logo, text, watermark, fire, smoke, sparks, excessive glow, sci-fi interface, oversaturated colors, rapid camera movement, parallax, shaky camera, deformed engine parts
```

Entrega do Veo:

- `public/media/quiz/cabecote-medicao-ilustracao.mp4`;
- 1080 × 1080, 6 segundos, loop sem corte, H.264, alvo de até 3 MB;
- frame estático WebP em
  `public/media/quiz/cabecote-medicao-ilustracao-poster.webp`;
- com `prefers-reduced-motion`, usar somente o poster.

## Checklist antes de substituir um slot

- A peça, máquina e profissional são reais quando apresentados como prova?
- A afirmação da legenda é sustentada pelo que aparece?
- O vídeo funciona sem som e não inicia automaticamente?
- O poster tem dimensões fixas e está comprimido?
- Não há placa, documento, cliente ou dado pessoal visível?
- A mídia foi verificada em 360 × 800, 390 × 844 e desktop?
- LCP, CLS e INP continuam dentro das metas após a substituição?
