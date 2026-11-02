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
