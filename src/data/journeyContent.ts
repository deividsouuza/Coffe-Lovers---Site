import cultivationSmall from '../assets/images/journey/cultivation-560.webp';
import cultivationLarge from '../assets/images/journey/cultivation-1120.webp';
import harvestSmall from '../assets/images/journey/harvest-560.webp';
import harvestLarge from '../assets/images/journey/harvest-1120.webp';
import processingSmall from '../assets/images/journey/processing-560.webp';
import processingLarge from '../assets/images/journey/processing-1120.webp';
import roastSmall from '../assets/images/discovery/roast-560.webp';
import roastLarge from '../assets/images/discovery/roast-1120.webp';
import extractionSmall from '../assets/images/discovery/espresso-560.webp';
import extractionLarge from '../assets/images/discovery/espresso-1120.webp';
import cupSmall from '../assets/images/hero-coffee-480.webp';
import cupLarge from '../assets/images/hero-coffee-1120.webp';
import type { JourneyStage } from '../types/coffee';

export const journeyContent = {
  instruction: 'Siga o grão. Cada movimento seu continua esta história.',
  navigationLabel: 'Etapas da jornada do café',
  progressLabel: 'Progresso da origem até a xícara',
  closingEyebrow: 'A origem encontra o seu momento',
  closingTitle: 'Agora, a história cabe nas suas mãos.',
  closingText: 'Houve terra, tempo e cuidado em cada etapa. A próxima parte é sua: sentir o aroma e apreciar a pausa.',
  nextLabel: 'Encontre seu jeito de viver o café',
  source: { label: 'Conheça o percurso do café · National Coffee Association', href: 'https://www.aboutcoffee.org/origins/lifecycle-of-coffee/' },
} as const;

export const journeyStages = [
  {
    id: 'cultivo', phase: 'cultivation', kicker: '01 · A origem', title: 'Cultivo',
    description: 'O café começa no cafeeiro, em condições adequadas de clima, solo e manejo.',
    thought: 'Antes do primeiro gole, existe o cuidado com a terra.',
    beanColor: '#7d8168',
    image: {
      small: cultivationSmall, large: cultivationLarge, width: 1120, height: 840,
      alt: 'Fileiras de cafeeiros verdes em uma encosta, com árvores e montanhas ao fundo.',
      caption: 'É na paisagem que a história cria raízes.',
      credit: { label: 'Projeto Café Gato-Mourisco', href: 'https://unsplash.com/photos/rows-of-coffee-plants-on-a-hillside-with-mountains-N_1lnzUYuAs' },
    },
  },
  {
    id: 'colheita', phase: 'harvest', kicker: '02 · O encontro com o fruto', title: 'Colheita',
    description: 'Os frutos são recolhidos para iniciar o processamento.',
    thought: 'O que nasceu no ramo começa a ganhar outro caminho.',
    beanColor: '#8e916f',
    image: {
      small: harvestSmall, large: harvestLarge, width: 1120, height: 1400,
      alt: 'Mãos entre ramos carregados de frutos de café em diferentes estágios de maturação.',
      caption: 'A colheita aproxima o fruto das próximas transformações.',
      credit: { label: 'The Manh · Unsplash', href: 'https://unsplash.com/photos/hands-harvesting-ripe-coffee-cherries-from-branches-qlT4S7j_reg' },
    },
  },
  {
    id: 'processamento', phase: 'processing', kicker: '03 · Tempo de transformar', title: 'Processamento',
    description: 'Os frutos passam por técnicas de processamento e secagem para obtenção dos grãos.',
    thought: 'Cada processo escreve uma parte do que será sentido na xícara.',
    beanColor: '#b3ad82',
    image: {
      small: processingSmall, large: processingLarge, width: 1120, height: 700,
      alt: 'Frutos de café espalhados em fileiras durante a secagem em um terreiro.',
      caption: 'Na foto, a secagem ao sol: um dos caminhos do processamento.',
      credit: { label: 'Projeto Café Gato-Mourisco', href: 'https://unsplash.com/photos/coffee-beans-are-drying-in-neat-rows-Ndph9VflFgU' },
    },
  },
  {
    id: 'torra', phase: 'roast', kicker: '04 · O despertar dos aromas', title: 'Torra',
    description: 'O calor transforma os grãos e desenvolve aromas e sabores.',
    thought: 'O verde dá lugar aos tons que reconhecemos no café torrado.',
    beanColor: '#79452e',
    image: {
      small: roastSmall, large: roastLarge, width: 1120, height: 840,
      alt: 'Grãos torrados sendo movimentados na bandeja de resfriamento de um torrador.',
      caption: 'Depois da torra, os grãos são resfriados.',
      credit: { label: 'Pete Willis · Unsplash', href: 'https://unsplash.com/photos/brown-seeds-nkIgu4Mh7xc' },
    },
  },
  {
    id: 'extracao', phase: 'extraction', kicker: '05 · O encontro com a água', title: 'Extração',
    description: 'A água extrai os compostos do café moído durante o preparo.',
    thought: 'Entre o café e a água, o preparo revela novas sensações.',
    beanColor: '#5a2e1f',
    image: {
      small: extractionSmall, large: extractionLarge, width: 1120, height: 1400,
      alt: 'Espresso sendo extraído por um porta-filtro para uma xícara de vidro.',
      caption: 'Aqui, o preparo é espresso. Há outros jeitos de extrair o café.',
      credit: { label: 'Nick Petty · Unsplash', href: 'https://unsplash.com/photos/a-cup-of-coffee-being-filled-with-liquid-AYHneWFeZeI' },
    },
  },
  {
    id: 'xicara', phase: 'cup', kicker: '06 · A sua pausa', title: 'Xícara final',
    description: 'A jornada culmina em uma bebida pronta para ser apreciada.',
    thought: 'Tudo o que veio antes encontra, agora, o seu momento.',
    beanColor: '#5a2e1f',
    image: {
      small: cupSmall, smallWidth: 480, large: cupLarge, width: 1120, height: 1400,
      alt: 'Café pronto em uma xícara artesanal, com crema dourada e vapor suave.',
      caption: 'Da origem até aqui. Um convite para sentir.',
      credit: { label: 'COFFE LOVERS · imagem própria', href: '#inicio' },
    },
  },
] as const satisfies readonly JourneyStage[];
