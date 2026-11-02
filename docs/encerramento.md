# Encerramento · COFFE LOVERS

O encerramento agora compartilha tokens e transição de superfície com a
[integração de motion design](motion-design.md). O registro da etapa original segue abaixo.

A seção `#pausa` conclui a narrativa com o título, mensagem e assinatura pedidos.
Uma curva de espresso entra sobre o creme e cria continuidade com Aromas, sem
alterar o conteúdo ou os controles do mapa. A textura de papel é muito sutil;
a profundidade vem da fotografia própria de uma xícara em luz suave.

No mobile, o título, agradecimento, ação e fotografia seguem uma composição
vertical com espaço para leitura. No desktop, o texto fica à esquerda e a foto
à direita, com deslocamento vertical e recorte assimétrico. A assinatura fica
em um rodapé semântico fora de `main`, com filete fino e identidade tipográfica.

## Arquivos criados

- `src/data/farewellContent.ts`: título, mensagem, assinatura, ação e imagem.
- `src/hooks/useFarewellMotion.ts`: movimento finito na entrada da fotografia.
- `src/sections/Encerramento/FarewellVisual.tsx`: foto responsiva e vapor SVG.
- `src/sections/Encerramento/Encerramento.module.css`: composição e transição.
- `src/components/SiteFooter/SiteFooter.tsx` e `SiteFooter.module.css`: rodapé.
- `src/assets/images/farewell/pausa-480.webp` e `pausa-960.webp`: foto otimizada.
- `src/assets/images/farewell/README.md`: origem, pesos e prompt final da imagem.
- `src/assets/textures/paper-grain.svg`: textura estática própria.
- `docs/encerramento.md`: este registro.

Arquivos modificados: `src/sections/Encerramento/Encerramento.tsx`,
`src/data/siteContent.ts`, `src/App.tsx`, `README.md`, `docs/design-system.md`,
`src/hooks/README.md` e `src/assets/README.md`. Dependências e demais seções
permanecem preservadas; o footer é integrado após `main`.

## Navegação e movimento

Reviver a jornada reutiliza `Action` como âncora real para `#inicio`. O Hero
existente aceita foco com `tabIndex={-1}`. O navegador atualiza o endereço,
move o foco e respeita o `scroll-padding-top` medido pelo header. Não há reset
do perfil ou dos aromas. A navegação funciona por clique, toque e Enter.

Foto e vapor executam um único movimento de 4,5 segundos ao atingir a área
visível, com IntersectionObserver e Web Animations API. A foto reduz a escala
de 1,025 para 1; o vapor varia suavemente a opacidade e sobe poucos pixels.
Ao terminar, a composição volta aos estilos estáticos, sem loop. Sair da tela,
ocultar a aba ou ativar `prefers-reduced-motion` cancela o movimento. O cleanup
desconecta o observer, cancela animações e remove os listeners.

Conteúdo, fotografia e vapor permanecem visíveis sem animação. A preferência
de movimento reduzido impede o início dos efeitos. A textura não se move,
e não há temporizador, scroll preso, formulário ou link comercial.

## Fotografia

Uma imagem própria foi gerada com `image_gen` integrado, usando a skill imagegen,
e otimizada em dois WebPs. Os assets de 21 e 69 kB estão no repositório; o original
permanece no diretório de geração. Prompt final, arquivos e dimensões:
[registro do asset](../src/assets/images/farewell/README.md).

O componente usa `srcSet`, `sizes`, dimensões reservadas, alt descritivo,
`loading="lazy"` e `decoding="async"`. Os textos são HTML; nenhuma captura de
interface é usada como imagem de fundo. SVGs da transição e do vapor são
decorativos e ficam fora da árvore de acessibilidade.

## Verificações

`npm.cmd run build` passou, incluindo `tsc -b`. O preview foi verificado em Chrome
headless com Playwright e axe, disponíveis somente no diretório temporário.

- Oito larguras: 320, 360, 390, 430, 768, 1024, 1440 e 1920 px.
- Título, agradecimento e assinatura exatos; seis seções principais preservadas
  e um único landmark de rodapé.
- Imagem local decodificada, alt, dimensões e seleção responsiva.
- Sem overflow horizontal ou sobreposição de título e fotografia.
- Passagem de Aromas para `#pausa` e retorno ao Hero por clique e teclado.
- Foco visível no controle; Hero com foco, endereço `#inicio` e destino abaixo
  do header. Retorno também verificado com texto a 200% em viewport de 390 px.
- Toque simulado em 390 × 844 px, navegação pelo menu até Sua pausa e retorno.
- Análise axe WCAG A/AA e boas práticas do encerramento e rodapé em 360, 390 e
  1440 px, sem violações nas amostras.
- Movimento reduzido, entrada de foto e vapor, término em 4,5 segundos, ausência
  de repetição e cancelamento ao ativar movimento reduzido durante a animação.
- Retorno ao Hero com animações/transições CSS desligadas.
- Inspeção visual de capturas mobile, desktop e rodapé; nenhum erro de execução
  ou requisição quebrada nos cenários verificados.

São testes de navegador automatizado, sem aparelhos físicos ou auditoria manual
com leitores de tela. Para conferir localmente, execute `npm.cmd run dev`, abra
`#pausa`, aprecie a composição e use Reviver a jornada. Esta etapa está concluída.
