# Revisão técnica mobile · COFFE LOVERS

Revisão realizada em 2 de novembro de 2026, sobre a versão anterior `1b053c8`
e o build com as correções desta etapa. As seis seções, identidade visual,
conteúdo editorial e memória opcional foram preservados.

## Problemas encontrados e correções

| Evidência | Correção |
| --- | --- |
| O Hero só era descoberto após executar o bundle React; Lighthouse sinalizou a descoberta tardia do recurso LCP. | Preload responsivo no HTML, prioridade alta e `loading="eager"`. Os candidatos coincidem com os de `HeroVisual`; uma única imagem é baixada na entrada. |
| Em 390 px/3×, o Hero escolhia 1120 px; a xícara na Jornada podia baixar outro candidato da mesma foto. | Hero e xícara compartilham candidatos de 480/800 px até 767 px, reaproveitando o cache. Desktop conserva 1120 px. |
| O divisor decorativo baixava 1600 px/294 KB em 390 px/2× e 3×. | `picture` usa o WebP de 640 px/67 KB no mobile. A versão maior continua disponível para telas maiores. |
| Os seletores exibiam 64–76 px, mas usavam fotos de 480 px. | Três miniaturas locais de 192 × 240 px, somando 18.856 bytes. |
| As três cenas de Perfis tinham `srcSet` ativo mesmo sem escolha. Em 390 px/2×, miniaturas e cenas somavam 394.818 bytes. | Somente a cena inicial e as escolhidas entram no DOM. A última foto pronta permanece durante a carga seguinte. Requisições atrasadas não substituem a seleção atual; falhas exibem uma mensagem e preservam os controles. |
| Onze links de crédito/licença tinham altura de apenas 24 px. | Alvos ampliados para pelo menos 44 px, mantendo a tipografia e os créditos. |
| Lighthouse encontrou rótulos visuais ausentes no nome acessível da marca e dos aromas. | Nomes derivados do texto HTML. A marca inclui sua legenda; aromas incluem título e ação/estado visíveis. Os testes axe passaram a incluir também WCAG 2.1 A. |
| `/favicon.ico` retornava 404; `/robots.txt` recebia o HTML do fallback SPA. | Favicon SVG próprio declarado no HTML e `public/robots.txt` válido. |

Não foram encontrados cortes, sobreposição de títulos ou overflow horizontal
nas seis larguras solicitadas. Os recortes fotográficos são intencionais, por
`object-fit: cover`; proporções e dimensões reservadas foram mantidas.

## Medição de imagens

Bytes de corpo de resposta observados pelo Resource Timing em contextos novos do
Chrome, viewport de 390 × 844 px. Perfis considera chegada à seção antes de
escolher: a foto inicial e as três miniaturas. Não é o total de bytes da página.

| Recurso/cenário | Antes | Depois |
| --- | ---: | ---: |
| Perfis, densidade 1× | 97.496 | 56.658 |
| Perfis, densidade 2× e 3× | 394.818 | 126.400 |
| Divisor decorativo, 2× e 3× | 294.110 | 66.504 |
| Hero inicial, 3× | 79.556 | 43.300 |

O volume de imagens de Perfis caiu cerca de 68% no cenário 2×. O divisor caiu
cerca de 77%. Testes em 1×, 2× e 3× confirmaram: sem cenas grandes não escolhidas,
três miniaturas de 192 px, divisor mobile de 640 px e um único candidato da foto
compartilhada pelo Hero e pela xícara na Jornada.

Imagens não essenciais já tinham lazy loading, dimensões e WebP; isso foi
preservado. Fontes continuam WOFF2 locais, com `font-display: swap`.

## JavaScript, dependências e scroll

`npm.cmd ls --depth=0` confirmou somente React, React DOM e GSAP como dependências
de runtime; nenhuma biblioteca foi adicionada. O bundle principal final tem
aproximadamente 285,54 KB minificado/89,27 KB gzip. GSAP/ScrollTrigger permanece
em chunk separado de 116,40 KB/45,69 KB gzip, solicitado perto da Jornada.
Os tamanhos gzip são os estimados pelo Vite, não uma configuração de produção.

O hook novo usa eventos `load`/`error` dos elementos React e não cria loops,
timers ou listeners globais. Animações continuam usando transform/opacity,
requestAnimationFrame sob demanda, observers e limpeza já estabelecida.
O percurso foi novamente conferido em 11 posições, nos dois sentidos, com
trocas rápidas de perfis e aromas. Não foi adicionado controle artificial da
rolagem nem transição de altura.

## Responsividade e acessibilidade executadas

- 360, 390, 430, 768, 1024 e 1440 px: todas as seções, imagens, dimensões,
  textos, alvos de pelo menos 44 × 44 px e ausência de overflow horizontal.
- Skip link, menu, foco cíclico, Escape, âncoras e retorno ao Hero.
- Quatro curiosidades por teclado; três perfis por toque/clique e setas;
  seis aromas por Espaço, fechamento e retorno do foco.
- Estados selecionados comunicados por texto, marca de seleção, sublinhado
  e atributos nativos/ARIA, sem depender somente de cor ou hover.
- Axe com WCAG 2 A/AA, 2.1 A/AA, 2.2 AA e boas práticas na página completa em
  todas as larguras; estados dos três perfis e seis aromas também em 390 px.
  Nenhuma violação nas amostras executadas.
- Movimento reduzido, texto a 200% em 390 px e menu em 640 × 360 px.
- Rede emulada via CDP: latência de 150 ms, download de 200 KiB/s, upload de
  80 KiB/s e CPU 4× mais lenta; menu e seleção de aroma funcionaram.
- Carga de fotografia atrasada, conclusão após outra escolha e falha simulada:
  seleção e leitura permanecem funcionais, sem substituir a última escolha.
- Capturas e inspeção visual amostrada em mobile e desktop, preservando a direção
  editorial. Nenhum erro inesperado no navegador nos cenários principais.

## Lighthouse realmente executado

Lighthouse **13.6.0**, Chrome headless **156**, build de produção servido pelo
Vite Preview em localhost. Perfil mobile padrão: 412 × 823 px, densidade 1,75×,
throttling simulado com RTT de 150 ms, throughput de 1638,4 Kbps e CPU 4×.
Ferramentas instaladas somente no diretório temporário do sistema.

| Métrica/categoria | Controle anterior | Build final |
| --- | ---: | ---: |
| Desempenho | 94 | 93 |
| Acessibilidade | 100 | 100 |
| Boas práticas | 96 | 100 |
| SEO | 92 | 100 |
| FCP | 1,6 s | 1,6 s |
| LCP | 2,9 s | 3,1 s |
| TBT | 110 ms | 90 ms |
| CLS | 0,002 | 0,002 |

A comparação de controle utilizou uma cópia temporária de `1b053c8`, com o
mesmo runner, sem alterar o checkout de trabalho. Houve outras execuções
intermediárias, com desempenho 80 e 88; elas estão registradas no JSON, junto
com as configurações e o benchmark do ambiente. A revisão não comprova melhora
global da nota de desempenho nem ganho estatístico em LCP. O ganho medido de
bytes acima refere-se aos recursos efetivamente solicitados.

O relatório final completo está em
[audits/lighthouse-mobile-final.html](audits/lighthouse-mobile-final.html).
Dados resumidos extraídos dos relatórios, todas as execuções, hashes SHA-256,
configurações e medições de rede:
[audits/mobile-review.json](audits/mobile-review.json).

Lighthouse fornece indicadores automatizados; não substitui toda a revisão de
interação, conforme a [documentação oficial](https://developer.chrome.com/docs/lighthouse/overview/).

## Limitações e oportunidades restantes

- **LCP de laboratório ainda em 3,1 s.** O alvo de referência é até 2,5 s, e
  dados de laboratório podem diferir dos de usuários reais. A próxima avaliação
  deve usar o servidor final e dados de campo, conforme a
  [orientação sobre LCP](https://web.dev/articles/optimize-lcp).
- Lighthouse ainda estima **37 KiB de JavaScript não usado na carga inicial**,
  além de apontar CSS bloqueante e reflow de montagem. O bundle reúne React e
  interações da página; não foi feita troca de framework ou reestruturação de
  renderização para perseguir uma nota. Não se mediu FPS em aparelho físico.
- Os testes foram em **Chrome emulado**, sem validação em Android/iPhone físicos,
  Safari/WKWebView, leitores de tela reais ou redes de operadoras. Axe/Lighthouse
  100 não significam auditoria manual completa de acessibilidade.
- CDN, cache, cabeçalhos, domínio e comportamento do servidor de produção não
  foram auditados. Não há métricas CrUX/RUM ou INP de usuários reais nesta revisão.
- Não foi executada auditoria Lighthouse desktop; desktop foi coberto pelos
  testes de layout, teclado, contraste automatizado e interação descritos acima.

## Arquivos e verificação

Alterados: `index.html`, `SiteHeader.tsx`, `PhotoDivider.tsx`, `HeroVisual.tsx`,
`AromaMap.tsx`, CSS Modules de Curiosidades/Jornada/Perfis, `JourneyImage.tsx`,
`journeyContent.ts`, `profileContent.ts`, `ProfileScene.tsx`, `ProfileSelector.tsx`,
`src/types/coffee.ts` e documentação (`README.md`, registros de assets e hooks).

Criados: `public/favicon.svg`, `public/robots.txt`, `useProfileImages.ts`,
`suave-192.webp`, `intenso-192.webp`, `aromatico-192.webp`, este documento e os
dois relatórios em `docs/audits/`. As miniaturas são derivações proporcionais de
fotografias existentes; não houve nova geração de imagens nem mudança de licença.

`npm.cmd run build` passou, incluindo a checagem TypeScript. Para conferir,
execute `npm.cmd run dev` ou `npm.cmd run preview` após o build. Percorra as
seis seções, use teclado/menu e teste novas escolhas com a rede limitada.
