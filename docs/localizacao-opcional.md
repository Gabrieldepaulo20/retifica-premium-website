# Localização opcional — 24/09/2026

Nos campos de cidade do contato e da estimativa guiada, `CityLocationPicker` oferece localização aproximada, exata e cancelar. Não há pedido ao carregar a página. Cookies/publicidade e autorização de localização são independentes.

Apenas após escolha explícita usamos `getCurrentPosition`. `enableHighAccuracy` é uma preferência, não garantia de precisão nem controle sobre a janela nativa. No modo aproximado, o site arredonda coordenadas para duas casas decimais (~1 km) antes da consulta. O modo exato solicita maior precisão, mas usa a posição somente para sugerir cidade. Não mostra nem armazena coordenadas, não as envia por rede nem gera eventos de marketing de localização.

A cidade só preenche o campo depois do botão de confirmação. Cancelamento, recusa, falha, timeout e ausência de cobertura mantêm entrada manual e contato disponíveis. Callbacks atrasados são descartados após cancelamento/desmontagem. Há limite independente de 15 segundos para não prender a interface na permissão.

## Dados públicos

`public/data/municipios-sp.json`: 645 municípios de SP, com nomes e polígonos públicos do IBGE; baixado em 24/09/2026. Arquivo estático de aproximadamente 272 KB sem compressão, solicitado apenas depois da autorização e obtenção da posição. Nenhuma chamada ao IBGE durante o uso pelo visitante. Cobertura automática limitada a SP; outras cidades são digitadas normalmente. Malha simplificada pode diferir em divisas, por isso a confirmação é obrigatória.

Fontes:
- https://servicodados.ibge.gov.br/api/v3/malhas/estados/35?formato=application/vnd.geo%2Bjson&qualidade=minima&intrarregiao=municipio
- https://servicodados.ibge.gov.br/api/v1/localidades/estados/35/municipios
- https://servicodados.ibge.gov.br/api/docs/malhas?versao=3
- https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition

Conversão do dado: associar `properties.codarea` ao `id` dos nomes; normalizar Polygon para lista de polígonos; manter anéis internos e calcular limites por município. Não é estimativa por sede mais próxima.

Não há mudanças em banco, contratos de eventos, Google Ads ou permissão de cookies. Retiflow recebe somente o campo de cidade já existente, conforme o fluxo de contato e a política atual.


## Integração por sessão — atualização

O seletor também está disponível abaixo do cabeçalho em todas as páginas. A confirmação explícita (manual, aproximada ou exata) envia `custom/location_confirmed` com `visitorCity`, `method=city_manual|city_approximate|city_precise`, página, horário e a sessão atual. Não é lead, não dispara Ads/GA4 e não é uma consulta contínua de localização. O texto antes da confirmação descreve a associação à visita. Opt-out continua bloqueando envio.

A confirmação tem autorização própria e passa pelos contratos mesmo no modo de cookies publicidade-apenas, sem autorizar outros microeventos. Os demais eventos preservam suas regras atuais. Não são adicionados cookies/IDs para tentar identificar quem recusou medição; sem cookies usa-se a sessão efêmera existente. Navegação com recarga/fechamento pode iniciar outra sessão, e não inferimos que seja a mesma pessoa.

No Retiflow, a coluna Cidade informada agrega somente eventos da mesma sessão, usa o horário mais recente independentemente da ordem de chegada e mostra Não informada quando ausente. Os detalhes mostram a página/horário do registro da cidade. Páginas de entrada, caminho e ações continuam vindo de eventos reais. Nenhuma migration ou alteração de RLS/Auth.
