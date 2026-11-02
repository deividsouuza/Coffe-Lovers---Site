# Descubra o café

Seção editorial com quatro descobertas independentes. O título solicitado é
mantido integralmente. As composições alternam retrato dos frutos, texto com foto
horizontal de torra, recorte circular da planta e faixa espresso com a extração.
Não há quatro cartões com o mesmo formato.

## Conteúdo e verificação factual

Cada curiosidade tem explicação complementar e fontes acessíveis no detalhe.
Os textos são paráfrases em português, sem reproduzir trechos dos artigos.

| Tema | Precisão adotada | Fontes |
| --- | --- | --- |
| Fruto e semente | O título coloquial “O café é uma fruta” é explicado imediatamente: o grão usado na bebida é a semente do fruto do cafeeiro. | [Kew](https://www.kew.org/plants/arabica-coffee), [NC State Extension](https://plants.ces.ncsu.edu/plants/coffea-arabica/) |
| Aroma e torra | O aquecimento produz muitos compostos aromáticos; a formação e a concentração variam com o grau de torra. A explicação menciona Maillard e caramelização. | [Obando e Figueroa, 2024](https://pmc.ncbi.nlm.nih.gov/articles/PMC11477549/) |
| Cafeína e ecologia | Participa da defesa contra certos insetos e também aparece no néctar; os efeitos sobre abelhas dependem da concentração. A defesa não implica proteção contra todos os insetos. | [Kew, 2016](https://www.kew.org/read-and-watch/hidden-poison-rhododendron-nectar), [Ceja-Navarro et al., 2015](https://www.nature.com/articles/ncomms8618) |
| Espresso | É um método que faz água quente atravessar café moído e compactado sob pressão. Não identifica uma espécie de cafeeiro nem exige um grau único de torra. | [Specialty Coffee Association](https://sca.coffee/sca-news/25-magazine/issue-3/defining-ever-changing-espresso-25-magazine-issue-3-zyx36) |

As referências estão junto aos dados em `src/data/curiosities.ts`. Kew explica
o experimento sobre memória de abelhas e identifica a pesquisa original de
Wright e colaboradores, publicada em Science em 2013. O estudo de Ceja-Navarro
mostra um caso de adaptação da broca-do-café à cafeína, sustentando a ressalva
de que a defesa natural não elimina toda herbivoria.

## Interações e navegação

- Cada `<details>` abre e fecha independentemente; o `<summary>` funciona com
  toque, Enter e Espaço, com indicação de mais/menos e foco visível.
- O rótulo muda para Fechar detalhe quando aberto. Painéis fechados e seus
  links ficam fora da navegação por teclado pelo comportamento nativo.
- O contador avança apenas na primeira abertura de cada explicação. Reabrir não
  duplica descobertas; fechar não apaga o que foi descoberto. Não há persistência
  após recarregar a página.
- Pontos preenchidos, texto de estado e `role="status"` comunicam a progressão.
- A ordem do HTML acompanha a composição: texto antes da foto em Torra e
  Espresso; foto antes do texto em Frutos e Planta, inclusive no mobile.
- A ação final é uma âncora real para Jornada; as outras seções foram preservadas.

## Movimento e imagens

`useRevealOnScroll` anima cada artigo uma vez por IntersectionObserver e Web
Animations API. O conteúdo não depende de opacidade inicial ou classe de
JavaScript para ficar visível. Ao receber foco, o artigo não inicia a revelação.
Movimento reduzido cancela as animações ativas; listeners e observer têm cleanup.

As quatro fotografias são reais e usam versões WebP de 560 e 1120 px, lazy
loading, dimensões reservadas e textos alternativos descritivos. As versões menores
têm aproximadamente 30–58 kB. Não foram adicionadas dependências ao projeto.
Autores, URLs, licenças e adaptações estão em
[CREDITS.md](../src/assets/images/discovery/CREDITS.md).

## Arquivos da etapa

- `src/sections/Curiosidades/Curiosidades.tsx`: integração, contador e continuidade.
- `DiscoveryStory.tsx`, `DiscoveryImage.tsx`, `DiscoveryReveal.tsx` e
  `Curiosidades.module.css` no mesmo diretório: composição e detalhes reutilizáveis.
- `src/data/curiosities.ts`: conteúdo, fotografias, fontes e créditos.
- `src/data/coffeeContent.ts`: preserva a exportação anterior de `curiosities`.
- `src/data/siteContent.ts`: novo título e introdução apenas de Curiosidades.
- `src/types/coffee.ts`: contratos de curiosidades e fontes.
- `src/hooks/useRevealOnScroll.ts`: revelações acessíveis e sem biblioteca adicional.
- `src/assets/images/discovery/`: oito arquivos WebP e créditos das quatro fotos.
- README, documentação de assets e documentação de hooks atualizados.

## Verificações

- TypeScript e build de produção passaram.
- Chrome headless em 360, 390, 430, 768, 1024, 1440 e 1920 px.
- Todas as curiosidades abrem e fecham por Enter, Espaço e clique, sem perder
  o foco do acionador ao fechar. Também passaram por simulação de toque mobile.
- Contador, reabertura sem duplicação, abertura simultânea das quatro explicações,
  estados de descoberta e links de fontes conferidos.
- Fotos carregadas localmente com alt, lazy loading e seleção responsiva.
- Sem overflow horizontal com painéis abertos ou fechados; texto ampliado a 200%
  também conferido em 390 px.
- Análise axe com regras WCAG A/AA sem violações nas sete larguras, com os painéis
  abertos. A preferência de movimento reduzido cancela a revelação ativa.
- Destino e foco da ação para Jornada conferidos; sem erros de runtime ou assets.
- Capturas de mobile e desktop inspecionadas. Testes em navegador não equivalem
  a testes em aparelhos físicos ou auditoria manual com leitores de tela.
