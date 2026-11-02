# Cena em vídeo na curiosidade sobre torra

Somente a mídia da curiosidade “Boa parte do aroma do café nasce na torra” foi
substituída por uma filmagem real do misturador e dos grãos em movimento.
A composição editorial, textos, proporção 4:3 e legenda foram preservados.
O conteúdo continua identificando corretamente a bandeja de resfriamento.

## Integração

`src/components/AmbientVideo/AmbientVideo.tsx` é reutilizável: recebe fontes mobile
e desktop, a fotografia de fallback e o atributo `sizes`. Preenche uma moldura
posicionada com dimensões previamente reservadas. A integração é feita por
`DiscoveryImage.tsx`; os dados e créditos estão em `src/data/curiosities.ts`.
`EditorialVideo` define o contrato opcional de vídeo nas curiosidades.

O elemento usa `autoPlay`, `muted`, `loop`, `playsInline`, `preload="metadata"`,
poster e `object-fit: cover`, sem controles nativos. A fotografia responsiva
permanece por baixo e fornece o texto alternativo; o vídeo é decorativo para
leitores de tela. Um botão de pausa/reprodução permite interromper o movimento
contínuo por toque ou teclado. Não há áudio no arquivo, além de `muted` no player.

`useAmbientVideo` só atribui a fonte ao entrar na viewport, com a aba visível.
Escolhe 640 × 480 abaixo de 1024 px e 960 × 720 nas larguras maiores; não troca
um arquivo já escolhido durante o resize. O loop é de 6 segundos, a 24 fps.
Os arquivos pesam aproximadamente 836 kB e 1,66 MB, respectivamente.

## Fallback e ciclo de vida

- Fora da viewport ou em aba oculta, pausa e depois continua do mesmo ponto.
- Movimento reduzido, economia de dados e conexão identificada como 2G mantêm
  a fotografia sem baixar o vídeo. Alterações dessas preferências são observadas.
- Erros de carregamento/decodificação removem a fonte e o controle, preservando
  a foto original. Não há novas tentativas automáticas após erro nessa montagem.
- Bloqueio de autoplay preserva a foto e permite iniciar por toque explícito.
- Ao remover um controle focado por preferência ou erro, o foco vai para a foto.
- No unmount, desconecta o observer, remove listeners, pausa e libera a fonte;
  promessas de `play()` concluídas depois não atualizam o componente.

Não foi adicionada dependência ao projeto. A decodificação é nativa, sem GSAP,
canvas, timers, animação de textos ou atualizações React por frame.

## Mídia e ajustes

Os arquivos ficam em `src/assets/videos/discovery/`. Autora, origem, licença e
adaptações estão no [registro de créditos](../src/assets/videos/discovery/CREDITS.md).
O trecho utiliza os frames 156–309 do original, com junção de dez frames entre
fim e começo; a montagem final tem 144 frames. O áudio foi removido e o MP4
preparado para início progressivo com faststart.

Para trocar a filmagem, substitua os imports `roastVideoSmall` e
`roastVideoLarge` em `src/data/curiosities.ts`, atualize o crédito e mantenha a
proporção 4:3. A velocidade permanece a da captura, sem acelerar a máquina.
A entrada do vídeo usa os tokens existentes `--motion-duration-scene` e
`--ease-out`. A [documentação do elemento video](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/video)
e o [guia de autoplay](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay)
descrevem os atributos e as restrições do navegador.

## Verificações executadas

- TypeScript e build de produção passaram, sem novas dependências.
- Chrome headless em 360, 390, 430, 768, 1024 e 1440 px: reprodução real,
  atributos de mídia, escolha da resolução, proporção, ausência de overflow,
  geometria do texto preservada, pausa por teclado e retomada após rolar.
- Retorno nativo do loop, ausência de áudio, pausa em aba oculta, movimento
  reduzido e preservação do foco ao remover o controle.
- Nenhuma requisição MP4 antes da viewport ou com movimento reduzido,
  economia de dados ou 2G na inicialização.
- Erro de rede e bloqueio de autoplay simulados: fallback e reprodução
  explícita conferidos, sem erros de runtime.
- Axe na seção de curiosidades, em 390 e 1440 px, sem violações nas regras
  WCAG A/AA executadas; capturas mobile e desktop inspecionadas.
- Três ciclos de montagem/desmontagem em StrictMode, doze alternâncias rápidas
  de pausa, mudança de economia de dados durante a reprodução e resolução
  atrasada da promessa de play após o unmount.
- Os 144 frames codificados foram conferidos; a diferença de luminância entre
  último e primeiro frame ficou abaixo do percentil 95 das diferenças entre
  frames consecutivos, complementando a inspeção da junção.

Os testes foram feitos em navegador automatizado, sem aparelhos físicos.
O build mantém o aviso anterior sobre o tamanho do módulo Three.js do Hero,
que não foi modificado nesta etapa.
