# SEO técnico — publicação e indexação

Atualizado em 10/08/2026.

## Estado do código

- `robots.txt` libera as páginas públicas, bloqueia `/api/` e `/admin/` e aponta
  para `https://www.premiumretifica.com.br/sitemap.xml`;
- APIs também respondem `X-Robots-Tag: noindex, nofollow, nosnippet` e
  `Cache-Control: no-store`;
- o sitemap lista as 20 URLs canônicas atuais, inclusive `/quanto-custa` e as
  páginas novas de sedes/válvulas, guias e roscas;
- `lastmod` é definido por grupo de conteúdo, sem usar automaticamente a data
  de cada build;
- todas as páginas públicas têm canonical próprio e o domínio sem `www`
  redireciona permanentemente para `www`;
- parâmetros do experimento não criam uma URL indexável diferente: o canonical
  continua apontando para a rota limpa.

O arquivo `robots.txt` não é “enviado” manualmente ao Google; ele é buscado no
domínio. O que se envia no Search Console é o sitemap. Reenviar o mesmo sitemap
só faz sentido **depois** de publicar e validar a resposta de produção.

## Gate antes de pedir indexação

Para cada URL nova ou alterada:

1. resposta `200` em produção;
2. ausência de `noindex`;
3. canonical absoluto para a própria URL em `www`;
4. conteúdo principal renderizado sem depender de clique ou cookie;
5. URL presente no sitemap publicado;
6. links internos a partir de `/servicos` e do rodapé/menu quando aplicável;
7. nenhuma marca de placeholder editorial ou promessa não validada;
8. smoke test mobile e Core Web Vitals sem regressão material.

Não solicitar indexação de uma rota que ainda responde `404` na produção.

## Ordem no Search Console após o deploy

1. abrir `Sitemaps` e reenviar `sitemap.xml`;
2. usar `Inspeção de URL` em `/servicos` e `/quanto-custa`;
3. inspecionar e solicitar indexação das três páginas novas:
   - `/servicos/retifica-de-sedes-e-valvulas`;
   - `/servicos/troca-e-adaptacao-de-guias`;
   - `/servicos/usinagem-de-roscas`;
4. verificar a versão publicada com “Testar URL ativa” antes de solicitar;
5. acompanhar `Indexação > Páginas` por pelo menos duas semanas, separando
   `Rastreada, mas não indexada`, `Descoberta, mas não indexada`, duplicata e
   erro real;
6. não tratar “solicitação enviada” como prova de indexação. A confirmação é a
   URL aparecer como indexada na inspeção e, depois, nas consultas/relatórios.

## Comandos de smoke test

```bash
curl -I https://www.premiumretifica.com.br/robots.txt
curl -I https://www.premiumretifica.com.br/sitemap.xml
curl -I https://www.premiumretifica.com.br/servicos
curl -I https://www.premiumretifica.com.br/quanto-custa
curl -I https://www.premiumretifica.com.br/servicos/retifica-de-sedes-e-valvulas
curl -I https://www.premiumretifica.com.br/servicos/troca-e-adaptacao-de-guias
curl -I https://www.premiumretifica.com.br/servicos/usinagem-de-roscas
```

Esses passos ficam pendentes enquanto as mudanças estão somente locais. Não
alterar configuração do Search Console, Ads ou estratégia de lance antes do
deploy e do smoke test autorizado.
