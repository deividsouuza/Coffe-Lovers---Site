import fruitSmall from '../assets/images/discovery/fruit-560.webp';
import fruitLarge from '../assets/images/discovery/fruit-1120.webp';
import roastSmall from '../assets/images/discovery/roast-560.webp';
import roastLarge from '../assets/images/discovery/roast-1120.webp';
import plantSmall from '../assets/images/discovery/plant-560.webp';
import plantLarge from '../assets/images/discovery/plant-1120.webp';
import espressoSmall from '../assets/images/discovery/espresso-560.webp';
import espressoLarge from '../assets/images/discovery/espresso-1120.webp';
import roastVideoSmall from '../assets/videos/discovery/roast-640.mp4';
import roastVideoLarge from '../assets/videos/discovery/roast-960.mp4';
import type { CoffeeCuriosity } from '../types/coffee';

export const discoveryContent = {
  instruction: 'Toque nos detalhes e descubra o que passa despercebido.',
  statusLabel: 'Seu percurso de descobertas',
  nextLabel: 'Continue pela jornada do café',
  photoPause: 'Pausar foto',
  photoResume: 'Animar foto',
} as const;

// Fontes de cada afirmação ficam junto ao conteúdo, e também são acessíveis na interface.
export const curiosities = [
  {
    id: 'fruta',
    layout: 'fruit',
    kicker: '01 · Antes de ser grão',
    title: 'O café é uma fruta.',
    description: 'O grão que conhecemos é, na verdade, a semente do fruto do cafeeiro.',
    reveal: {
      prompt: 'O que existe por dentro?',
      title: 'O grão está dentro da história.',
      text: 'A polpa e a semente são partes diferentes do fruto. Para preparar a bebida, usamos a semente, que passa por processamento, torra e moagem. O nome “grão” faz parte do nosso vocabulário; na planta, ele é uma semente.',
    },
    sources: [
      { label: 'Royal Botanic Gardens, Kew · o cafeeiro', href: 'https://www.kew.org/plants/arabica-coffee' },
      { label: 'NC State Extension · fruto e semente', href: 'https://plants.ces.ncsu.edu/plants/coffea-arabica/' },
    ],
    image: {
      small: fruitSmall, large: fruitLarge, width: 1120, height: 1400,
      alt: 'Frutos vermelhos de café ainda nos ramos do cafeeiro, entre folhas verdes.',
      caption: 'O começo tem cor, polpa e semente.',
      credit: { label: 'Projeto Café Gato-Mourisco · Pedro Lotti C. Dias', href: 'https://unsplash.com/photos/a-tree-with-berries-khKOybgLbDw' },
    },
  },
  {
    id: 'torra-aroma',
    layout: 'roast',
    kicker: '02 · A transformação',
    title: 'Boa parte do aroma do café nasce na torra.',
    description: 'É nesse processo que surgem muitos compostos aromáticos responsáveis pelas características de uma xícara.',
    reveal: {
      prompt: 'Como o calor vira aroma?',
      title: 'O calor transforma o que já existe no grão.',
      text: 'Durante a torra, reações químicas, como a reação de Maillard e a caramelização, ajudam a formar compostos aromáticos. O grau de torra modifica quais compostos aparecem e em que concentrações. Por isso, mudar a torra também muda a experiência de aroma.',
    },
    sources: [{ label: 'Obando e Figueroa · estudo sobre torra e aroma (2024)', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11477549/' }],
    image: {
      small: roastSmall, large: roastLarge, width: 1120, height: 840,
      alt: 'Grãos recém-torrados sendo movimentados na bandeja de resfriamento de um torrador.',
      caption: 'Depois do calor, o cuidado continua no resfriamento.',
      credit: { label: 'Pete Willis · Unsplash', href: 'https://unsplash.com/photos/brown-seeds-nkIgu4Mh7xc' },
    },
    video: {
      small: roastVideoSmall, large: roastVideoLarge,
      credit: { label: 'Anna Tarazevich · Pexels', href: 'https://www.pexels.com/video/coffee-beans-in-a-cooling-tray-4927236/' },
    },
  },
  {
    id: 'cafeina-planta',
    layout: 'plant',
    kicker: '03 · A inteligência da natureza',
    title: 'A cafeína é uma defesa natural da planta.',
    description: 'Ela participa das interações ecológicas do cafeeiro, inclusive da defesa contra certos insetos.',
    reveal: {
      prompt: 'E o que as abelhas têm a ver?',
      title: 'Defesa e encontro, na mesma planta.',
      text: 'A cafeína também aparece no néctar de flores de café. Em pequenas quantidades, estudos mostraram que ela pode melhorar a memória das abelhas para aromas associados ao alimento. Seu efeito depende da concentração e do organismo envolvido: defesa natural não significa proteção contra todos os insetos.',
    },
    sources: [
      { label: 'Royal Botanic Gardens, Kew · cafeína e insetos', href: 'https://www.kew.org/read-and-watch/hidden-poison-rhododendron-nectar' },
      { label: 'Nature Communications · adaptação da broca-do-café', href: 'https://www.nature.com/articles/ncomms8618' },
    ],
    image: {
      small: plantSmall, large: plantLarge, width: 1120, height: 1400,
      alt: 'Folhas verdes e brilhantes de Coffea arabica, com nervuras visíveis e brotos jovens.',
      caption: 'Muito antes da xícara, uma planta viva.',
      credit: { label: 'David J. Stang · NC State Extension', href: 'https://plants.ces.ncsu.edu/plants/coffea-arabica/' },
      license: { label: 'Imagem adaptada · CC BY-SA 4.0', href: 'https://creativecommons.org/licenses/by-sa/4.0/' },
    },
  },
  {
    id: 'espresso-metodo',
    layout: 'espresso',
    kicker: '04 · O jeito de preparar',
    title: 'Espresso não é um tipo de grão.',
    description: 'É um método de preparo que utiliza pressão para extrair o café.',
    reveal: {
      prompt: 'O que faz dele um espresso?',
      title: 'A diferença está no caminho da água.',
      text: 'No espresso, água quente passa sob pressão por uma camada de café moído e compactado. Moagem, quantidade de café e condução da extração fazem parte do preparo. A palavra descreve o método, não uma espécie de cafeeiro nem um grau obrigatório de torra.',
    },
    sources: [{ label: 'Specialty Coffee Association · o que define um espresso', href: 'https://sca.coffee/sca-news/25-magazine/issue-3/defining-ever-changing-espresso-25-magazine-issue-3-zyx36' }],
    image: {
      small: espressoSmall, large: espressoLarge, width: 1120, height: 1400,
      alt: 'Dois fios de espresso saem do porta-filtro de uma máquina e chegam a uma xícara de vidro.',
      caption: 'O encontro entre água, pressão e café.',
      credit: { label: 'Nick Petty · Unsplash', href: 'https://unsplash.com/photos/a-cup-of-coffee-being-filled-with-liquid-AYHneWFeZeI' },
    },
  },
] as const satisfies readonly CoffeeCuriosity[];
