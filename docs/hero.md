# Hero · COFFE LOVERS

## Resultado

O Hero usa fundo espresso, texto HTML e uma fotografia própria de uma xícara
artesanal com vapor. O título, subtítulo e instrução seguem o conteúdo solicitado.
Em telas pequenas, o texto precede a fotografia; no desktop, a grade assimétrica
separa a narrativa da imagem. Um grão em SVG introduz o percurso editorial.

O header e as outras cinco seções foram preservados. A referência visual original
não estava disponível como anexo; a composição segue a direção textual fornecida.

## Organização

- `src/sections/Hero/Hero.tsx`: composição semântica, título e controles.
- `src/sections/Hero/HeroVisual.tsx`: fotografia responsiva e atmosfera.
- `src/sections/Hero/CoffeeBean.tsx`: elemento visual em SVG.
- `src/sections/Hero/Hero.module.css`: composição e animações isoladas.
- `src/data/heroContent.ts`: textos, linhas do título, legenda e texto alternativo.
- `src/hooks/useHeroMotion.ts`: preferência de movimento, pausa e reação ao scroll.

## Movimento e acessibilidade

A entrada revela o texto e a imagem por opacidade e deslocamento curto.
A foto reage à rolagem até 12 px no mobile e 24 px no desktop. O grão acompanha
essa progressão discretamente. O vapor e a seta têm animações lentas.

O botão Pausar movimentos interrompe vapor, indicador e resposta ao scroll.
Retomar movimentos os reativa. A revelação inicial é curta e termina normalmente
para manter o texto visível. Com `prefers-reduced-motion: reduce`, não há revelação
animada, atmosfera ou paralaxe, e o controle de pausa é ocultado.

O hook usa listener passivo, IntersectionObserver e um requestAnimationFrame
somente quando há uma atualização pendente. Não renderiza React a cada scroll.
Fora da viewport ou com a aba oculta, interrompe a atmosfera e evita o trabalho
de atualização. O cleanup remove listeners, cancela o frame e desconecta o observer.

O indicador é uma âncora real para Curiosidades. O foco acompanha o destino,
e a altura medida do header mantém o título da próxima seção visível.

## Asset próprio

Geração pelo modo integrado `image_gen` da skill imagegen, sem CLI de geração.
O original foi gerado como PNG. Os derivados de entrega ficam no repositório:

| Arquivo em `src/assets/images/` | Dimensões | Peso |
| --- | --- | --- |
| `hero-coffee-480.webp` | 480 × 600 | 15.692 bytes |
| `hero-coffee-800.webp` | 800 × 1000 | 43.300 bytes |
| `hero-coffee-1120.webp` | 1120 × 1400 | 79.556 bytes |

A conversão para WebP usou Pillow apenas como ferramenta temporária de otimização.
A aplicação não recebeu novas dependências. `srcSet` e `sizes` selecionam o asset;
a imagem principal usa `fetchPriority="high"`, sem lazy loading, e dimensões
reservadas para evitar deslocamento de layout. Não há hotlink nem texto na imagem.

Prompt final utilizado:

```text
Use case: photorealistic-natural.
Asset type: original cinematic coffee photograph for the right-side media panel of a premium editorial website hero; portrait 4:5 composition.
Scene/backdrop: continuous deep espresso-brown studio backdrop (#2B130D), dark brown tabletop, no horizon line. The edges should fall into real dark brown photographic shadow.
Subject: one small handmade dark brown ceramic espresso cup on a matching saucer, filled with dark coffee and a fine caramel crema, three roasted coffee beans resting naturally near the saucer. Close macro viewpoint slightly above the rim so both coffee surface and cup silhouette are visible. Cup centered in the lower-middle of the frame, handle on right, entirely inside the frame, generous dark breathing space above the cup for very fine naturally backlit steam.
Style/medium: photorealistic editorial still life, tactile imperfect matte ceramic, sharp rich bean texture, shallow depth of field, expensive cinematic macro lens photography, authentic quiet coffee ritual.
Lighting/mood: warm soft directional window-like light from upper left, amber highlights on rim and crema, deep natural shadows, subtle visible wisps of steam, intimate and contemplative. No excessive glowing effects.
Palette: deep espresso #2B130D and roasted brown #5A2E1F, warm caramel #C69A73 highlights.
Constraints: image only, no text, no typography, no logo, no watermark, no hands, no people, no UI, no borders, no graphic decorations, no artificial gradients. This is an asset within a real HTML interface, not a website screenshot.
```

## Verificação

- TypeScript e build de produção concluídos.
- Chrome headless em 360, 390, 430, 1024, 1440 e 1920 px.
- Texto e fotografia sem sobreposição e sem rolagem horizontal.
- Indicador de rolagem visível na primeira viewport desktop de 900 px de altura.
- Título, subtítulo, destino da âncora, foco e preservação das seis seções conferidos.
- Asset responsivo local carregado e preferência de movimento reduzido respeitada.
- Movimento da foto comprovado com scroll real; pausa, retomada e mudança da
  preferência do sistema verificadas.
- Atmosfera pausada quando o Hero sai da viewport.
- Menu mobile, ampliação de texto a 200% e ausência de erros de runtime conferidos.
- Análise automática axe (regras WCAG A/AA) sem violações nas larguras testadas.

As capturas de 360, 390 e 1440 px foram inspecionadas. As verificações em navegador
não representam testes em aparelhos físicos ou uma auditoria com leitor de tela.
