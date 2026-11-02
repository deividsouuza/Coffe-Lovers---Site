# Integração de motion design · COFFE LOVERS

As seis seções compartilham ritmo e intensidade. O movimento apresenta capítulos,
acompanha a transformação do grão e confirma escolhas. A paleta, a tipografia,
fotografias e composições existentes foram preservadas.

## Ritmo

| Papel | Duração | Intensidade |
| --- | --- | --- |
| Feedback de controle | 160–260 ms | Estado imediatamente visível |
| Troca de cena/conexão | 420 ms | Opacidade, sem deslocar o controle |
| Entrada de capítulo/curiosidade | 560 ms | 8 px mobile, 12 px desktop |
| Intervalo entre entradas | 80 ms | Limitado a duas etapas por lote do observer |
| Detalhe sensorial | 260 ms | 4 px, com texto já legível na entrada |
| Atmosfera de encerramento | 4500 ms | Um movimento, sem loop |

`src/styles/tokens.css` centraliza esses valores e a curva `--ease-out`.
`src/animations/motionSettings.ts` lê o contrato para JavaScript, sem duplicar
durações. Animações de scroll usam interpolação linear porque representam
posição real, sem atraso para alcançar a rolagem.

## Responsabilidade por seção

- **Hero:** rótulo, título, subtítulo, foto e instrução entram em sequência.
  O título começa após 80 ms; toda a entrada termina em até 800 ms. Foco dentro
  do Hero interrompe a entrada para apresentar o conteúdo imediatamente.
  Vapor, pausa e reação discreta da foto ao scroll continuam independentes.
- **Curiosidades e capítulos:** `App` integra um único `useRevealOnScroll` a
  `main`. Cada alvo `data-motion-reveal` entra uma vez, com pequenos intervalos
  quando dois itens aparecem juntos. Recuar não esconde conteúdo já apresentado.
  Foco, saída da tela, aba oculta e redução de movimento cancelam a revelação.
- **Jornada:** GSAP continua controlando grão, preenchimento, xícara, fotos e
  tonalidades a partir da geometria atual. Escala e cor do grão permanecem
  contínuas e reversíveis. Não há pin, snap, scroll artificial ou transição CSS
  disputando transform/opacity nesses elementos.
- **Perfis:** escolha e tema mudam imediatamente; fotos fazem crossfade em
  420 ms e descrição/detalhe acompanham em 260 ms. Trocas rápidas substituem o
  estado anterior sem fila. Descrição, legenda e rótulos de seleção reservam
  seu tamanho por conteúdo, inclusive com texto ampliado.
- **Aromas:** conexão ativa em 420 ms, informação em 260 ms e acionador destacado
  imediatamente. Os seis detalhes compartilham a mesma célula de Grid, reservando
  o maior conteúdo. Trocar de aroma não desloca o mapa nem o conteúdo seguinte.
- **Encerramento:** a foto e o vapor mantêm um único movimento de 4,5 segundos;
  agora leem os tokens compartilhados. Reviver a jornada permanece uma âncora
  nativa e não depende de animação.

## Layout, contraste e superfícies

`SectionTransition` reaproveita o desenho orgânico já presente no encerramento
nas passagens Hero → Descubra e Descubra → Jornada. O detalhe é menor nesses
dois limites para preservar o ritmo e o espaço existentes; a curva final mantém
sua proporção original. Não se anima a cor de toda a página atrás do texto.

Os temas dos perfis são aplicados diretamente: interpolar simultaneamente
cores claras/escuras de texto e fundo poderia reduzir o contraste durante a
transição. A continuidade é transmitida pelas fotos e pelos detalhes sensoriais.

Os estados de conteúdo são sobrepostos por CSS Grid. `visibility: hidden`,
`aria-hidden` e `inert` retiram os inativos da leitura e da interação, enquanto
o layout reserva a maior altura sem medir ou animar alturas por frame. Os títulos têm
IDs únicos e o nome acessível da região aponta para o título ativo. O comportamento
de `inert` segue a [referência MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inert).

Abrir/fechar um detalhe continua expandindo/recolhendo seu espaço por ação explícita;
o espaço vazio não é reservado quando o painel de aromas está fechado. O ganho de
estabilidade aplica-se às substituições entre escolhas.

## Desempenho, limpeza e redução de movimento

O ResizeObserver da jornada observa a própria seção, os irmãos anteriores e o
header. Escolhas feitas depois da jornada não modificam sua posição e deixam
de agendar refreshes. Alterações acima dela continuam sendo medidas, com refresh
seguro após a rolagem e contexto GSAP revertido no unmount.

Transform/opacity de GSAP, entradas WAAPI e feedbacks CSS pertencem a elementos
diferentes. A entrada de capítulos não envolve os nós do percurso. Os movimentos
usam transforms/opacity; não há transição de altura nem loop de atualização React
por frame. Roda do mouse e gestos continuam sob controle do navegador.

Com `prefers-reduced-motion`, tempos/distâncias são zerados, CSS animations e
transitions são removidas e WAAPI cancela efeitos em andamento. O grão móvel é
substituído pelo percurso estático, mantendo etapas, fotos, progresso e navegação.
Isso também funciona ao mudar a preferência com a página aberta. A pausa manual
do Hero, foco visível e controles sem dependência de hover foram preservados.

## Arquivos

Novos: `src/animations/motionSettings.ts`,
`src/components/SectionTransition/SectionTransition.tsx`, seu CSS Module e
`docs/motion-design.md`.

Integração: `src/App.tsx`, `src/styles/tokens.css`, `src/styles/global.css`,
`src/components/Section/Section.tsx` e seu CSS Module, `useRevealOnScroll.ts`,
`useFarewellMotion.ts`, `createJourneyAnimation.ts`, `Hero.module.css`,
`Curiosidades.tsx`, `DiscoveryStory.tsx`, `Jornada.tsx`, `Perfis.tsx`,
`ProfileDescription.tsx`, `ProfileScene.tsx`, `ProfileSelector.tsx`,
`Perfis.module.css`, `Aromas.tsx`, `AromaPanel.tsx`, `Aromas.module.css` e
`Encerramento.tsx`. Documentação atualizada em `README.md`, `src/hooks/README.md`
e `docs/design-system.md`. As notas das etapas anteriores remetem a este contrato.
Nenhuma dependência ou imagem foi adicionada.

## Verificações

Build de produção e TypeScript passaram. Playwright/Chrome e axe foram executados
como ferramentas temporárias, sem dependências novas no projeto.

- Percurso completo em 360, 390, 430, 768, 1024, 1440 e 1920 px, descendo e subindo.
- Onze posições por percurso, inclusive retorno e saltos para os extremos:
  progresso comparado com geometria real e posição do grão com tolerância de 3 px.
- Quatro curiosidades abertas, foco, navegação final e retorno ao Hero.
- Todas as escolhas, 21 mudanças rápidas de perfil e 24 de aroma por cenário;
  último estado correto, sem fila ou animações ativas após o intervalo previsto.
- Altura constante dos perfis e painéis durante as trocas; estados inativos sem
  headings expostos aos leitores de tela e nenhum ID duplicado.
- Axe WCAG A/AA e boas práticas na página completa em 360, 390 e 1440 px,
  sem violações nas amostras; ausência de overflow horizontal.
- Movimento reduzido inicial e ativado durante o uso, sem animações remanescentes.
- Toque simulado em 390 × 844 px, gesto real via CDP, escolhas e memória opcional.
- Texto a 200% em 390 px: trocas com alturas estáveis e sem overflow.
- Roda do mouse nos dois sentidos, sem interceptação de scroll.
- Três montagens/desmontagens de App em StrictMode, alternando breakpoint e
  movimento reduzido: zero ScrollTriggers, alvos de observers ou animações após
  unmount. A versão estática mantém apenas o ScrollTrigger de progresso.
- Capturas mobile/desktop para conferir a identidade visual e nenhum erro de
  execução nos cenários principais.

Os testes de navegador não medem FPS em aparelhos físicos nem substituem auditoria
manual com leitores de tela. Para conferir, execute `npm.cmd run dev`, percorra a
página, volte pela jornada e alterne as escolhas rapidamente.
