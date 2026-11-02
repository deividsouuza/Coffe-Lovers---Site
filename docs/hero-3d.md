# Hero 3D · COFFE LOVERS

A fotografia principal dá lugar a uma cena tridimensional original: xícara
artesanal e pires com volume, iluminação quente, café servido de cima do quadro,
crema em movimento e vapor delicado. A composição editorial e os textos HTML
permanecem preservados. A câmera reage discretamente ao mouse; no celular,
o movimento é automático e os gestos continuam rolando a página normalmente.

## Implementação e arquivos

- `src/three/coffeeObjects.ts`: geometrias próprias da xícara, pires, alça,
  borda, fluxo de café e vapor, com texturas procedurais pequenas.
- `src/three/coffeeSurface.ts`: shader da superfície, crema e ondulações.
- `src/three/createCoffeeScene.ts`: câmera, luzes, renderização, resolução,
  pausa e descarte dos recursos GPU.
- `src/hooks/useCoffeeScene.ts`: carregamento progressivo, observers, estados,
  falhas, visibilidade e integração com o ciclo React.
- `HeroVisual.tsx`, `Hero.tsx`, `Hero.module.css` e `heroContent.ts`: camada
  visual, descrição acessível e controle de movimento existentes.
- `package.json`/lockfile: Three.js 0.187.0 e tipagens de desenvolvimento.
- Documentação atualizada em `README.md`, `docs/hero.md`, `docs/revisao-mobile.md`
  e `src/hooks/README.md`.

Os modelos e efeitos são código próprio. Não há vídeo, modelos GLTF, HDR externo,
texturas remotas, postprocessing ou React Three Fiber. Three.js é a única nova
dependência de runtime; suas tipagens não entram no bundle de produção.

## Carregamento e custo

A fotografia WebP existente mantém prioridade alta e aparece enquanto a cena
carrega. O import do motor começa apenas com a área visível e WebGL2 disponível.
Se o visitante rolar adiante durante o download, a criação da cena GPU espera
o retorno ao Hero, reutilizando o módulo já recebido.
Economia de dados (`navigator.connection.saveData`, quando suportado) e movimento
reduzido evitam inclusive o download do motor 3D.

O chunk sob demanda tem aproximadamente **548,63 KB minificado/136,50 KB gzip**.
O Vite emite um aviso de tamanho acima de 500 KB; o build conclui normalmente.
Esse custo é adicional ao da versão fotográfica e não foi ocultado ou retirado
da medição. O bundle inicial fica em aproximadamente 89,9 KB gzip.

A resolução é limitada a 1,5× em dispositivos com ponteiro de toque ou largura
abaixo de 768 px, e a 2× nos demais. A frequência tem teto de 30 atualizações/s
no modo mobile e 45 nas demais condições; isso é um limite, não uma garantia de
FPS. São usados materiais simples, sombras de contato procedurais, sete sprites
de vapor e nenhuma simulação física pesada.

Pausar movimentos interrompe o requestAnimationFrame da cena e mantém o quadro
atual. Sair da tela ou ocultar a aba também interrompe a renderização. Redimensionar
recalcula a proporção e o enquadramento, inclusive em pausa. Retomar reinicia o
relógio sem acumular o tempo em que a cena ficou parada.

## Alternativa estática e acessibilidade

Falha de import, ausência/perda de WebGL2 ou erro de shader/início da cena mantêm a
fotografia e a navegação. Movimento reduzido usa a fotografia, sem contexto GPU.
Ao mudar a preferência com a página aberta, o canvas é desmontado e pode ser
recriado com contexto novo. Cada setup também recebe canvas novo no StrictMode.

A cena pronta tem um nome acessível em português. A fotografia fica fora da
árvore acessível enquanto o 3D é exibido, evitando descrições duplicadas. O botão
de pausa continua operável por teclado e aponta para a moldura que contém as
duas apresentações. Não há controle essencial dependente de hover. Pointer events
de toque não são bloqueados, e nenhuma rolagem artificial foi adicionada.

O cleanup libera materiais, geometrias e texturas, descarta o renderer, encerra
o contexto, remove o canvas e desconecta observers e listeners. Um import que
termina depois do unmount não inicializa a cena.

## Verificações executadas

Build e TypeScript passaram. QA em Chrome headless com WebGL2/SwiftShader habilitado
para verificar renderização de verdade no ambiente automatizado:

- 360, 390, 430, 768, 1024 e 1440 px, com canvas ajustado à moldura e sem overflow.
- Renderização de novos frames, teto de resolução e enquadramento mobile/desktop.
- Pausa/retomada; nenhum novo draw call durante pausa ou fora da tela.
- Retorno ao Hero e troca de movimento reduzido nas seis larguras, com recriação
  de exatamente um canvas/contexto por cena.
- Axe WCAG A/AA, 2.1 A/AA, 2.2 AA e boas práticas em 390 e 1440 px, sem violações
  nas amostras. Inspeção visual de capturas mobile e desktop.
- Fotografia e navegação preservadas com movimento reduzido inicial, WebGL2
  indisponível, economia de dados, contexto perdido e import bloqueado.
- Falha de link do shader simulada: fotografia preservada e nenhum erro JavaScript
  não tratado.
- Três montagens/desmontagens de App em StrictMode no servidor de desenvolvimento:
  um contexto ativo durante a cena e zero contextos, canvases ou alvos de observers
  após desmontagem. Unmount durante import pendente também passou.
- Gesto de toque iniciado sobre a cena rolou a página normalmente.
- Pausa antes de concluir o import, ocultação simulada da aba e saída da tela
  durante o download passaram; retornar não faz um segundo download do motor.
- Nenhum erro JavaScript ou de shader nos seis cenários normais de resolução.
  Falhas de rede e contexto foram provocadas deliberadamente para testar a alternativa.

Não houve teste em aparelho físico, Safari/iOS ou medição de FPS de GPU móvel.
O software renderizador usado pelo teste não representa o desempenho de um
telefone real. O relatório Lighthouse anterior é histórico e não foi reutilizado
como avaliação deste Hero 3D. Para conferir, execute `npm.cmd run dev`, abra o
início da página e teste Pausar movimentos, rolagem, retorno e movimento reduzido.
