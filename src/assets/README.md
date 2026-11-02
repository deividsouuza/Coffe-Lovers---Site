# Assets

Imagens, fontes e outros arquivos importados pelos componentes ficam aqui.
Organize por tipo (`images/`, `fonts/`) quando os primeiros arquivos forem incluídos.
O Vite gera nomes com hash e processa os imports no build.

## Fontes

- Cormorant Garamond: subconjunto latino variável, pesos 400–600, 37,6 kB.
- DM Sans: subconjunto latino variável, pesos 400–700, 36,9 kB.

Arquivos obtidos no Google Fonts e hospedados localmente. As licenças SIL OFL 1.1
estão preservadas em `fonts/OFL-CormorantGaramond.txt` e `fonts/OFL-DMSans.txt`.
Originais e licenças:

- https://github.com/google/fonts/tree/main/ofl/cormorantgaramond
- https://github.com/google/fonts/tree/main/ofl/dmsans

## Fotografia

Close de grãos de café, usado como intervalo decorativo entre Jornada e Perfis.
Origem: https://images.unsplash.com/photo-1447933601403-0c6688de566e
Termos da plataforma: https://unsplash.com/license

Os derivados WebP usam `fit=crop`, proporção 5:2, larguras de 640 e 1600 px,
qualidade 75 e 80. São servidos pelo próprio site via `srcSet`, sem hotlink no runtime.
O componente reserva a altura e usa `loading="lazy"`, `decoding="async"` e `alt=""`,
pois a imagem é decorativa e não acrescenta informação à narrativa.

## Asset próprio do Hero

`hero-coffee-480.webp`, `hero-coffee-800.webp` e `hero-coffee-1120.webp` são versões
otimizadas do asset gerado para o projeto com a ferramenta integrada image_gen.
A fotografia mostra uma xícara artesanal em close, com luz quente, vapor e grãos.
Não contém textos ou interface. O Hero fornece um texto alternativo descritivo.

Os arquivos têm aproximadamente 16, 43 e 80 kB. Usam `srcSet`, `sizes`, dimensões
reservadas e prioridade alta de carregamento. O original e os parâmetros de
geração estão descritos em [docs/hero.md](../../docs/hero.md), incluindo o prompt final.

## Fotografias de Descubra o café

`images/discovery/` contém quatro fotografias reais em duas resoluções cada:
frutos, grãos após a torra, folhas de Coffea arabica e extração de espresso.
Os arquivos são WebP locais, com lazy loading, tamanhos reservados e alt descritivo.
Os créditos são exibidos nas legendas. A foto das folhas é uma adaptação sob
CC BY-SA 4.0; as demais são fornecidas sob a licença Unsplash.

Autoria, URLs originais, licenças e alterações:
[images/discovery/CREDITS.md](images/discovery/CREDITS.md).

## Jornada do café

`images/journey/` acrescenta fotografias reais de cultivo, colheita e secagem,
em WebP de 560 e 1120 px. Os assets menores têm aproximadamente 36, 44 e 40 kB.
As etapas de torra, extração e xícara reaproveitam imagens locais existentes.
Todas possuem dimensões reservadas, alt e carregamento lazy. Créditos e licenças:
[images/journey/CREDITS.md](images/journey/CREDITS.md).

## Atmosferas de Perfis

`images/profiles/` contém três imagens próprias criadas com imagegen integrado:
suave/floral, intenso/chocolate e aromático/frutas. As versões WebP têm 480 e
960 px; as menores pesam aproximadamente 24–38 kB. As imagens são locais e lazy.
Os thumbnails são decorativos; a cena ativa tem alt, e as inativas são ocultadas
de leitores de tela. Flores, chocolate e frutas ilustram referências de atmosfera,
sem representar ingredientes adicionados à bebida.

Assets, pesos e prompts finais:
[images/profiles/README.md](images/profiles/README.md).

## Ilustrações do mapa de aromas

As seis ilustrações originais ficam em código no componente
`src/sections/Aromas/AromaIllustration.tsx`. Cada desenho é usado no mapa e no
painel ampliado, sem bitmap ou requisição adicional. O grão central reaproveita
`CoffeeBean`, e as conexões são curvas SVG próprias. Os desenhos são decorativos;
nomes, estados e descrições acessíveis estão nos controles HTML e no painel.
O mapa não reproduz a roda gráfica de sabores da SCA/WCR.
