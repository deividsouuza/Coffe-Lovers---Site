# Movimento cinematográfico da fotografia do cafeeiro

A foto de “O café é uma fruta” mantém seu espaço e o recorte superior arredondado.
O movimento usa a fotografia original inteira: deslocamento horizontal, aproximação
leve e flutuação vertical mínima. Não há camadas recortadas ou geometria 3D.

## Ajustes

Edite os tokens da regra `.story[data-layout='fruit'] .imageFrame` em
`src/sections/Curiosidades/Curiosidades.module.css`. As substituições dentro de
`@media (min-width: 48rem)` controlam somente tablet e desktop.

| Token | Mobile | Tablet/desktop | Efeito |
| --- | --- | --- | --- |
| `--fruit-camera-cycle` | `10` | `10` | Segundos do ciclo completo, incluindo ida e volta. Aumentar deixa mais lento. |
| `--fruit-camera-pan` | `.9` | `1.25` | Amplitude horizontal em porcentagem da largura da imagem, para cada lado. |
| `--fruit-camera-float` | `.12` | `.18` | Flutuação vertical em porcentagem da altura, para cada lado. |
| `--fruit-camera-scale-from` | `1.045` | `1.055` | Escala na extremidade inicial. |
| `--fruit-camera-scale-to` | `1.06` | `1.075` | Escala na outra extremidade. A diferença determina a intensidade do zoom. |

Para uma experiência mais discreta, diminua `pan` e `float` e aproxime as duas
escalas. Para reduzir a velocidade, experimente `cycle: 12`. Mantenha escala
suficiente para cobrir as bordas: ambas devem ser maiores que
`1 + 2 × max(pan, float) / 100`, com margem de segurança. Confira as extremidades
do percurso após aumentar a amplitude.

O motor `src/animations/createFruitPhotoMotion.ts` lê esses mesmos tokens,
incluindo a pose CSS inicial, evitando mudança de recorte ao terminar o import.
A curva `sine.inOut` suaviza as inversões; `repeat: -1` e `yoyo: true` produzem
o retorno contínuo. Cada trecho dura metade do ciclo configurado.

## Integração e acessibilidade

`DiscoveryImage.tsx` ativa o hook `useFruitPhotoMotion` apenas para essa foto.
O motor é importado quando a imagem está carregada, visível e a preferência
permite movimento. A imagem continua responsiva, em WebP e com lazy loading.
Textos, controles e moldura não recebem transforms.

O loop pausa fora da viewport, em aba oculta e pelo botão dentro da fotografia.
Retoma do mesmo ponto, sem reiniciar. Movimento reduzido mantém a foto estática
e remove o controle desnecessário; se ele tinha foco, o foco vai para a imagem.
Mudanças de breakpoint preservam o tempo do percurso. O cleanup remove
observadores e listeners, reverte o tween e descarta imports concluídos após
o unmount. Não há atualização React por frame nem novas dependências.

## Verificações

Build e TypeScript passaram. Em Chrome headless, foram verificadas as larguras
360, 390, 430, 768, 1024 e 1440 px: preenchimento do recorte em todo o ciclo,
inversões contínuas, dimensões preservadas, ausência de overflow horizontal,
pausa por teclado, retorno após rolar e movimento reduzido. As outras três
fotografias da seção mantiveram seus transforms originais. Axe não apontou
violações na seção em 390 e 1440 px. Capturas mobile e desktop foram inspecionadas.
Também foram conferidos montagem e desmontagem em StrictMode, import atrasado,
preservação da pose inicial, pausa em aba oculta e troca de breakpoints sem
reiniciar o percurso. Movimento reduzido inicial não importa o motor da foto.
Essas verificações em navegador não substituem testes em aparelhos físicos.
