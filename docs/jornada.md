# Agora caminhe pelo café

Amplitudes e escopo de medição foram aperfeiçoados na
[integração de motion design](motion-design.md). O registro da etapa original segue abaixo.

Uma narrativa contínua liga Cultivo, Colheita, Processamento, Torra, Extração e
Xícara final. As etapas usam fotografias, superfícies de tonalidade variável,
texturas reais e composições alternadas. O grão percorre a linha vertical e
desaparece suavemente na chegada à xícara; a representação é editorial, não uma
simulação botânica ou física da extração.

## Mecânica de rolagem

O percurso usa GSAP 3.15 e ScrollTrigger. A linha liga os centros reais dos seis
marcadores. O motor mede suas posições no documento e acompanha a linha de leitura
da viewport, abaixo do header. O progresso é calculado pela distância efetiva
entre o primeiro e o último ponto, sem tempo decorrido ou índice de scroll fictício.

O mesmo progresso controla a posição e rotação do grão, sua tonalidade, o
preenchimento da linha, a barra de progresso e a chegada à xícara. A etapa ativa
acompanha o marcador mais próximo. No último trecho, o grão perde opacidade e
escala enquanto a xícara ganha presença. Voltar o scroll desfaz a transição.

As entradas de texto, as superfícies de cor e as imagens no desktop usam scrub
direto, sem atraso de suavização. Não há pin, snap, captura de roda do mouse,
interceptação de toque ou extensão artificial da área de scroll.

## Responsividade e acessibilidade

- Desktop: linha central, imagens e narrativa alternadas, paralaxe leve nas fotos.
- Mobile: linha lateral, fluxo vertical natural e fotos sem paralaxe. O grão
  continua acompanhando o percurso, com dimensões menores.
- Movimento reduzido: não há deslocamento ou rotação do grão nem animações das
  imagens e textos. Fotos, linha, xícara, progresso e navegação continuam presentes.
- Seis âncoras permitem ir diretamente às etapas por teclado ou toque. A etapa
  atual usa `aria-current="step"`; a barra tem valor e descrição acessíveis.
- Texto e imagens não dependem do carregamento do motor para aparecer. Se o
  chunk não carregar, o conteúdo e as âncoras permanecem disponíveis.
- Os tamanhos das fotos são reservados e o carregamento é lazy. Os três novos
  assets menores têm aproximadamente 36, 44 e 40 kB; as demais fotos são reutilizadas.

## Medição, carregamento e cleanup

`useJourneyScroll` importa o motor apenas quando a seção se aproxima ou recebe
foco. GSAP e ScrollTrigger ficam em um chunk separado, de cerca de 46 kB gzip
neste build, preservando o carregamento inicial das seções anteriores.

`gsap.matchMedia()` configura desktop, mobile e movimento reduzido. Seus contextos
revertem os tweens e ScrollTriggers ao mudar de condição e ao desmontar a seção.
O hook impede inicialização tardia depois do unmount, inclusive durante o import.

ResizeObserver acompanha a altura do conteúdo principal e do header. Assim,
abrir uma curiosidade acima da jornada, alterar a fonte ou redimensionar a janela
recalcula o percurso. O recálculo usa `ScrollTrigger.refresh(true)`, que aguarda
o fim da rolagem para não interromper a navegação suave por âncora. Todos os
observers, listeners e frames próprios são removidos no cleanup. Nenhuma chamada
global a `killAll()` interfere em animações de outros componentes.

Referências técnicas: [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
e [gsap.matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/).

## Conteúdo e fotografia

Os textos das seis etapas seguem o escopo solicitado. O percurso de cultivo,
colheita, processamento, torra e preparo foi conferido com a
[National Coffee Association](https://www.aboutcoffee.org/origins/lifecycle-of-coffee/).
As legendas diferenciam secagem ao sol, resfriamento após a torra e espresso como
um exemplo de extração, sem universalizar esses processos.

As novas fotos são de cultivo, colheita e secagem. Torra, extração e a xícara
reaproveitam assets locais. Créditos, URLs e licenças estão em
[CREDITS.md](../src/assets/images/journey/CREDITS.md).

## Arquivos da etapa

- `src/sections/Jornada/Jornada.tsx`: seção, navegação, progresso e encerramento.
- `JourneyStep.tsx`, `JourneyImage.tsx`, `JourneyRail.tsx` e `Jornada.module.css`
  no mesmo diretório: etapas editoriais e percurso visual.
- `src/animations/createJourneyAnimation.ts`: motor e ciclo de vida do ScrollTrigger.
- `src/hooks/useJourneyScroll.ts`: carregamento adiado e estado da etapa ativa.
- `src/data/journeyContent.ts`: seis etapas, imagens, créditos e textos da seção.
- `src/components/CoffeeBean/CoffeeBean.tsx`: grão compartilhado com o Hero.
- `src/sections/Hero/CoffeeBean.tsx`: reexportação para preservar o import anterior,
  com a mesma aparência do Hero.
- Tipos compartilhados, textos de Jornada, exports de dados, dependência GSAP,
  lockfile, README e documentação atualizados.

## Verificações

- TypeScript e build de produção passaram.
- Chrome headless em 360, 390, 430, 768, 1024, 1440 e 1920 px.
- Percurso percorrido em ordem crescente e decrescente, com saltos rápidos entre
  início, meio e fim. A posição do grão e o progresso foram comparados com as
  posições reais dos marcadores, sem depender da duração da animação.
- Chegada à xícara e retorno ao cultivo conferidos, incluindo opacidade final.
- Redimensionamentos cruzando o breakpoint e abertura de uma curiosidade acima
  do percurso mantiveram a sincronização.
- Navegação por âncoras, foco, barra acessível, fotos locais e textos conferidos.
- Movimento reduzido, ausência de overflow horizontal e texto a 200% conferidos.
- Análise automática axe com regras WCAG A/AA sem violações nas sete larguras.
- Motor adiado confirmado: o chunk não é solicitado no topo da página.
- Menu mobile e gesto de rolagem por toque simulados em viewport de 390 px.
- Três ciclos de mount/unmount em React StrictMode, mudanças de breakpoint e de
  movimento reduzido terminaram com zero ScrollTriggers após cada desmontagem.
- Desmontagem durante um import ainda pendente também terminou sem instâncias.
- Capturas em movimento e em modo reduzido inspecionadas em mobile e desktop.

As verificações de navegador não equivalem a testes em aparelhos físicos ou a
uma auditoria manual com leitores de tela. A etapa termina na jornada; as seções
de Perfis, Aromas e Encerramento continuam com o conteúdo anterior.
