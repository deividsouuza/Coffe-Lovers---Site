# COFFE LOVERS

Experiência editorial sobre café, criada para acompanhar a pausa de quem visita
uma cafeteria. Aplicação React + Vite + TypeScript, em português brasileiro,
com seis momentos integrados em uma única página.

Revisão técnica mobile, medições de rede e relatório Lighthouse:
[docs/revisao-mobile.md](docs/revisao-mobile.md).

## Executar

Use Node.js 22.12 ou superior (verificado com Node.js 24.18.0) e npm.

```sh
npm install
npm run dev
```

Abra o endereço exibido pelo Vite, normalmente `http://localhost:5173`.
Se o PowerShell bloquear `npm.ps1`, utilize `npm.cmd` no lugar de `npm`.

## Verificar e gerar produção

```sh
npm run typecheck
npm run build
npm run preview
```

O build executa também a verificação TypeScript e gera `dist/`. O preview serve
esse resultado localmente, normalmente em `http://localhost:4173`.
Para instalações reproduzíveis após o clone, use `npm ci`.

## Estrutura

```text
src/
  animations/             # Jornada sob demanda + leitura dos tokens de movimento
  assets/                 # Fontes WOFF2 locais, licenças e fotografias WebP
  components/
    Section/              # Contêiner semântico compartilhado + CSS Module
    SiteHeader/           # Marca e navegação por âncoras + CSS Module
    SiteFooter/           # Assinatura e identidade no rodapé
    Action/               # Botão ou âncora, com três variantes visuais
    Icon/                 # Ícones SVG decorativos compartilhados
    OrganicDivider/       # Divisória artesanal reutilizável
    SectionTransition/    # Passagem orgânica entre espresso e creme
    PhotoDivider/         # Intervalo fotográfico responsivo
    CoffeeBean/           # Grão editorial compartilhado por Hero e Jornada
  data/
    coffeeContent.ts      # Curiosidades, jornada, perfis e notas aromáticas
    siteContent.ts        # Textos das seções e navegação
    heroContent.ts        # Conteúdo editorial e acessível do Hero
    curiosities.ts        # Descobertas, explicações, fotos e fontes verificadas
    journeyContent.ts     # Seis etapas, fotografias e textos da jornada
    profileContent.ts     # Perfis sensoriais, imagens e mensagens de seleção
    aromaContent.ts       # Seis aromas, descrições, fontes e geometria do mapa
    farewellContent.ts    # Agradecimento, assinatura e imagem de encerramento
  hooks/                  # Menu, header, movimentos e seleção com memória opcional
  sections/
    Hero/
    Curiosidades/
    Jornada/
    Perfis/
    Aromas/
    Encerramento/
  styles/
    global.css            # Base responsiva, foco e movimento reduzido
    tokens.css            # Paleta, tipografia e espaçamento
    fonts.css             # Fontes variáveis locais, com font-display: swap
  types/
    coffee.ts             # Contratos de conteúdo
  App.tsx                 # Composição da experiência
  main.tsx                # Entrada React
index.html                # Idioma e metadados
vite.config.ts
tsconfig*.json
package.json
package-lock.json
public/                   # Favicon SVG e robots.txt
```

## Limites desta etapa

Esta é a fundação técnica com o design system editorial, header responsivo e
Hero cinematográfico, Descubra o café com revelações interativas e Jornada guiada
pela rolagem. Perfis oferece seleção sensorial e afetiva com memória opcional.
Aromas oferece um mapa orgânico com seis referências sensoriais exploráveis.
Encerramento completa a narrativa com uma pausa em creme, fotografia própria,
agradecimento, assinatura no rodapé e retorno ao Hero.
Os links navegam para seções reais. O menu mobile abre e fecha, mantém o foco,
aceita Escape e fecha ao navegar ou mudar para a largura de desktop.

Os perfis são descrições editoriais. As notas aromáticas são vocabulário sensorial
e não indicam, por si só, ingredientes adicionados. As curiosidades têm fontes botânicas
e científicas acessíveis na interface e na documentação.

CSS Modules isolam os estilos dos componentes. Cormorant Garamond e DM Sans
usam arquivos variáveis locais, sem requisições a serviços de fontes em runtime.
A fotografia decorativa tem versões WebP de 640 e 1600 px e carregamento lazy.
A fotografia própria do Hero usa versões WebP de 480, 800 e 1120 px, com prioridade
de carregamento e texto alternativo. GSAP e ScrollTrigger são carregados sob
demanda para o percurso da jornada; as outras interações continuam usando APIs nativas.

## Hero

Composição vertical no mobile e assimétrica no desktop, em fundo espresso.
O conteúdo usa HTML; a fotografia é um asset próprio, sem textos incorporados.
A entrada suave, o vapor e a reação da foto ao scroll respeitam a preferência
de movimento reduzido. O visitante também pode pausar os movimentos pelo botão
da seção. A seta navega para Curiosidades, mantendo foco e destino visíveis.

Implementação, prompt do asset e verificações: [docs/hero.md](docs/hero.md).

## Descubra o café

Quatro curiosidades em uma composição editorial, com fotografias de frutos,
torra, planta e extração. Cada detalhe abre e fecha por toque ou teclado e inclui
explicação complementar e fontes. O contador só avança ao abrir uma descoberta
pela primeira vez. Créditos das fotos estão visíveis nas legendas.

Conteúdo, referências, estrutura e verificações:
[docs/curiosidades.md](docs/curiosidades.md).

## Jornada do café

Seis etapas em rolagem natural, conectadas por uma linha contínua. O grão acompanha
a posição real de leitura, muda de tonalidade e chega à xícara. No desktop, as
fotos têm movimento discreto; no mobile, permanecem estáveis. A navegação permite
ir a qualquer etapa. Movimento reduzido preserva fotos, leitura e navegação.

Mecânica, fontes, assets e verificações: [docs/jornada.md](docs/jornada.md).

## Seu perfil

Três atmosferas com imagens próprias, notas e textos afetivos: Suave e delicado,
Intenso e marcante e Aromático e surpreendente. A escolha é livre e pode mudar
quantas vezes o visitante quiser. A memória é opcional e guarda somente o ID do
perfil no dispositivo; se o armazenamento estiver bloqueado, a escolha ainda funciona.

Comportamento, persistência, assets e verificações: [docs/perfis.md](docs/perfis.md).

## Mapa de aromas

Um grão central conecta seis ilustrações próprias por curvas orgânicas. Toque,
Enter ou Espaço selecionam um aroma; a conexão e o painel acompanham a escolha.
O visitante pode trocar a seleção, tocar novamente para fechar, usar o botão de
fechamento ou Escape. O painel reúne uma descrição curta, referências sensoriais
e um convite afetivo. A explicação científica e as fontes permanecem visíveis.

Conteúdo, componentes e verificações: [docs/aromas.md](docs/aromas.md).

## Uma pausa para sentir

Uma curva orgânica conduz do mapa espresso ao fundo creme com textura sutil.
O encerramento apresenta o agradecimento, uma fotografia editorial própria e
vapor delicado. Foto e vapor fazem um único movimento de 4,5 segundos ao entrar
na tela, sem loop; movimento reduzido preserva a composição estática. O link
Reviver a jornada retorna ao Hero com foco e âncora nativos. O rodapé conclui
com a assinatura COFFE LOVERS.

Implementação, assets, prompt e verificações:
[docs/encerramento.md](docs/encerramento.md).

## Design system

Os contratos e exemplos de uso estão em [docs/design-system.md](docs/design-system.md).
O sistema centraliza paleta, tamanhos fluidos, espaçamento, bordas, sombras sutis
e transições em `src/styles/tokens.css`.

`Section` aceita `tone="cream"` ou `tone="espresso"`, e a propriedade `divider`
inclui uma divisória orgânica. `.container`, `.eyebrow` e `.lead` oferecem os
padrões de largura, rótulo editorial e texto introdutório.

`Action` usa `href` para navegação e `onClick` para uma ação, com variantes
`primary`, `secondary` e `text`. Nunca exiba um controle sem destino ou ação.

## Motion design integrado

Entradas, respostas e atmosferas usam uma escala comum de durações, distâncias
e easing. O Hero apresenta texto, foto e instrução em sequência; um único observer
coordena capítulos e curiosidades na primeira passagem. O grão continua ligado
à rolagem real nos dois sentidos. Perfis e aromas mantêm altura estável ao trocar
conteúdo, e a resposta visual começa sem aguardar uma animação anterior.

As bordas orgânicas conectam Hero, Descubra, Jornada e encerramento. Temas de
perfis mudam com contraste preservado; fotos e detalhes fazem a transição suave.
O vapor final permanece breve. Movimento reduzido interrompe também transições
CSS em andamento. Nenhuma biblioteca de smooth scrolling foi adicionada.

Contratos, arquivos e verificações: [docs/motion-design.md](docs/motion-design.md).

## Carregamento mobile

O Hero é descoberto por preload responsivo e tem prioridade alta. Hero e xícara
da Jornada compartilham candidatos de 480/800 px no mobile; o divisor decorativo
fica em 640 px. Perfis solicita somente as cenas escolhidas e usa miniaturas de
192 px nos seletores. A foto anterior permanece enquanto a próxima carrega.
Todos os assets são locais; imagens não essenciais mantêm lazy loading e dimensões
reservadas. GSAP continua em chunk separado, carregado perto da Jornada.

Build e TypeScript passaram. A revisão cobriu 360, 390, 430, 768, 1024 e 1440 px,
teclado, alvos de pelo menos 44 px, movimento reduzido e axe com regras WCAG 2.1 A
incluídas. Rede lenta, falha/atraso de fotografia, texto a 200% e menu em landscape
foram simulados no Chrome. Resultados Lighthouse e limitações estão no relatório
da revisão; testes em dispositivos físicos e em produção ainda não foram executados.

## Conferência manual

- Confira as seis seções e as âncoras do cabeçalho em uma única rolagem.
- Navegue com Tab: o primeiro link permite pular para o conteúdo; o foco é visível.
- Confira a largura de 360 a 430 px, sem rolagem horizontal.
- Ative a preferência de movimento reduzido: a navegação deixa de usar rolagem suave.
  Transições e deslocamentos dos indicadores também são desativados.
- No mobile, abra o menu e confira Tab/Shift+Tab, Escape, Fechar e navegação.
- Abra o menu e amplie a janela até 1024 px: o diálogo fecha e o foco vai para a marca.
- No Hero, confira Pausar movimentos, Retomar movimentos e a navegação pela seta.
- Em Descubra o café, abra e feche os quatro detalhes com toque, Enter e Espaço.
  Ao reabrir, o contador deve manter a descoberta já registrada.
- Em Jornada, role até a xícara e volte ao cultivo. O grão e o progresso devem
  acompanhar os dois sentidos. Teste também as seis âncoras da seção.
- Em Perfis, alterne entre as três atmosferas com toque ou setas do teclado.
  Ative Lembrar minha escolha neste dispositivo, recarregue e confira a restauração.
  Desative a opção e recarregue: a seleção deve voltar ao estado inicial.
- Em Aromas, explore as seis referências. Confira a ilustração contextual, o
  destaque e o texto do painel. Feche pelo mesmo aroma, botão Fechar ou Escape.
  Ao fechar pelo painel, o foco deve voltar ao aroma selecionado, visível na tela.
- Em Sua pausa, confira o agradecimento, a fotografia, o rodapé e a transição
  do mapa de aromas. Use Reviver a jornada por clique, toque e Enter: o Hero
  deve ficar visível abaixo do cabeçalho, com foco e endereço `#inicio`.

## Verificações da integração de motion

Build e TypeScript passaram. Percurso completo, ida e volta, 11 posições do grão,
trocas rápidas de perfis e aromas e altura dos painéis conferidos em sete larguras
de 360 a 1920 px. Teclado, toque simulado, roda do mouse, retorno ao Hero, memória
opcional e texto a 200% passaram. Movimento reduzido inicial e ativado durante
o uso passou; axe sem violações nas amostras de 360, 390 e 1440 px.
Três ciclos de montagem/desmontagem em StrictMode, incluindo breakpoints e troca
de preferência, terminaram sem ScrollTriggers, alvos observados ou animações.

## Verificações da etapa de Encerramento

TypeScript e build passaram. Oito larguras de 320 a 1920 px verificadas em
Chrome headless, sem overflow ou sobreposição do título com a fotografia.
Textos obrigatórios, assinatura, imagem responsiva, navegação pelo menu e retorno
ao Hero por clique, toque simulado e teclado passaram. Texto ampliado a 200%,
movimento reduzido, término do movimento em 4,5 segundos, ausência de loop e
cancelamento ao mudar a preferência passaram. Análise axe do encerramento e
rodapé sem violações nas amostras de 360, 390 e 1440 px.

## Verificações da etapa de Aromas

TypeScript e build passaram. As seis seleções foram verificadas em oito larguras
de 320 a 1920 px, sem overflow horizontal nem sobreposição de áreas de toque.
Teclado, toque simulado, troca de ilustração, fechamento, foco, âncora seguinte,
movimento reduzido e animações desligadas passaram. Texto ampliado a 200% em
390 px e análise automática axe dos seis estados em 360, 390 e 1440 px passaram.
As verificações de navegador usam Chrome headless; não substituem testes em
aparelhos físicos e com leitores de tela.

## Verificações da etapa de Perfis

TypeScript e build passaram. Os três perfis foram verificados em sete larguras de
360 a 1920 px, com teclado, toque simulado, foco, imagens, notas e memória opcional.
Persistência, remoção da chave, dados inválidos, armazenamento bloqueado, movimento
reduzido e animações desligadas passaram. Texto ampliado a 200% sem overflow e
análise automática axe sem violações nas amostras mobile e desktop.

## Verificações da etapa de Jornada

TypeScript e build passaram. Chrome headless em sete larguras de 360 a 1920 px,
com ida e volta, saltos rápidos, mudança de breakpoint, conteúdo expandido acima
da jornada e chegada à xícara conferidos. A posição visual foi comparada com a
geometria real do percurso. Movimento reduzido, teclado, toque simulado, texto
ampliado a 200% e análise axe passaram. Mount/unmount repetidos, inclusive durante
import pendente, terminaram sem ScrollTriggers remanescentes.

## Verificações da etapa de Curiosidades

TypeScript e build passaram. Sete larguras entre 360 e 1920 px foram verificadas
em Chrome headless, incluindo os quatro painéis abertos, sem overflow horizontal.
As interações passaram por teclado e toque simulado, com contador, foco, fontes,
fotos e âncora para Jornada conferidos. Movimento reduzido e texto ampliado a 200%
também passaram. A análise automática axe não encontrou violações nas amostras.

## Verificações da etapa do Hero

TypeScript e build passaram. Hero verificado em Chrome headless nas larguras
360, 390, 430, 1024, 1440 e 1920 px, sem overflow ou sobreposição de texto e imagem.
Foram conferidos os textos obrigatórios, a âncora, o foco, o carregamento responsivo,
movimento reduzido, paralaxe real, pausa, retomada e pausa fora da viewport.
As análises automáticas axe não encontraram violações nas amostras verificadas.

## Verificações da etapa de design system

TypeScript e build de produção passaram. O build foi verificado em Chrome headless
nas larguras 360, 390, 430, 768, 1024, 1440 e 1920 px, sem overflow horizontal.
Foram conferidos o carregamento das fontes, âncoras abaixo do header, foco do menu,
Escape, fechamento, mudança de breakpoint, skip link e movimento reduzido.
Também foram conferidos a fotografia lazy, a navegação em janela de 640 × 360 px
e o layout sem overflow com texto ampliado para 200% em viewport de 390 px.
A análise automática axe, com regras WCAG A/AA, não encontrou violações nas
amostras mobile, desktop e menu aberto. Isso não substitui uma auditoria manual
com leitores de tela ou testes em aparelhos físicos.

As ferramentas de QA foram instaladas apenas no diretório temporário do sistema,
sem alterar as dependências do projeto.
