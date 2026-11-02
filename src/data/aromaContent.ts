import type { AromaId, AromaNote } from '../types/coffee';

export const aromaContent = {
  mapLabel: 'Explore o mapa de aromas do café',
  instruction: 'Toque em um aroma. Siga a conexão e descubra a lembrança.',
  centerCaption: 'Universo do café',
  initialEyebrow: 'Seu próximo detalhe',
  initialTitle: 'Um aroma pode acender uma memória.',
  initialDescription: 'Explore as seis referências ao redor do grão. Cada uma abre uma nova forma de descrever o que você percebe.',
  panelEyebrow: 'Uma referência para os sentidos',
  examplesLabel: 'Pode lembrar',
  invitationLabel: 'Na sua próxima pausa',
  closeLabel: 'Fechar informações do aroma',
  scienceTitle: 'O que uma nota conta',
  scienceText: 'Notas aromáticas descrevem percepções sensoriais. Reconhecer chocolate, frutas ou especiarias não significa, por si só, que esses ingredientes foram adicionados ao café. A percepção varia entre cafés e entre pessoas.',
  sources: [
    { label: 'World Coffee Research · léxico sensorial', href: 'https://worldcoffeeresearch.org/resources/sensory-lexicon' },
    { label: 'Specialty Coffee Association · como explorar os sabores', href: 'https://sca.coffee/sca-news/how-to-use-the-flavor-wheel-in-eight-steps-ab2hy' },
  ],
  nextLabel: 'Uma pausa para sentir',
} as const;

// Paráfrases curtas das famílias sensoriais; não são ingredientes ou receitas.
export const aromaNotes = [
  {
    id: 'chocolate', title: 'Chocolate', accent: '#c69a73',
    description: 'Uma lembrança aromática de cacau e chocolate, com nuances que podem remeter ao chocolate mais escuro.',
    examples: ['Cacau', 'Chocolate amargo'],
    invitation: 'Aproxime a xícara e procure uma lembrança familiar de cacau antes do primeiro gole.',
  },
  {
    id: 'caramelo', title: 'Caramelo', accent: '#ddb27c',
    description: 'Aromas que lembram açúcar caramelizado, com impressões doces e tostadas.',
    examples: ['Açúcar caramelizado', 'Caramelo'],
    invitation: 'Deixe o aroma chegar devagar. Ele lembra uma calda dourada ou o açúcar aquecido?',
  },
  {
    id: 'castanhas', title: 'Castanhas', accent: '#b9bea0',
    description: 'Percepções que remetem a amêndoas e avelãs, às vezes com um caráter levemente tostado.',
    examples: ['Amêndoa', 'Avelã'],
    invitation: 'Pense no aroma de uma castanha recém-partida e compare essa memória com a sua xícara.',
  },
  {
    id: 'citricos', title: 'Frutas cítricas', accent: '#e3c07d',
    description: 'Aromas que evocam laranja, limão e suas cascas, dentro da família das frutas cítricas.',
    examples: ['Laranja', 'Limão', 'Toranja'],
    invitation: 'Imagine o perfume de uma casca de laranja. Há alguma lembrança parecida no aroma do café?',
  },
  {
    id: 'flores', title: 'Flores', accent: '#e6d3bf',
    description: 'Lembranças delicadas de flores, como jasmim e rosa, que podem aparecer de forma sutil.',
    examples: ['Jasmim', 'Rosa'],
    invitation: 'Reserve um instante para os detalhes mais leves. Que lembrança floral vem à sua memória?',
  },
  {
    id: 'especiarias', title: 'Especiarias', accent: '#d3a28d',
    description: 'Aromas que remetem a canela, cravo e noz-moscada, descritos como especiados.',
    examples: ['Canela', 'Cravo', 'Noz-moscada'],
    invitation: 'Procure uma lembrança de especiarias no perfume da bebida, sem precisar encontrar todas as notas.',
  },
] as const satisfies readonly AromaNote[];

interface AromaMapNode {
  readonly x: number;
  readonly y: number;
  readonly curve: string;
}

// Coordenadas percentuais compartilhadas pelos botões e pelas curvas do SVG.
export const aromaMapLayout: Readonly<Record<AromaId, AromaMapNode>> = {
  chocolate: { x: 24, y: 18, curve: 'M50 50C40 49 29 38 24 18' },
  caramelo: { x: 76, y: 17, curve: 'M50 50C63 43 67 28 76 17' },
  castanhas: { x: 14, y: 52, curve: 'M50 50C35 62 29 43 14 52' },
  citricos: { x: 86, y: 51, curve: 'M50 50C64 60 72 43 86 51' },
  flores: { x: 26, y: 83, curve: 'M50 50C38 57 21 68 26 83' },
  especiarias: { x: 76, y: 84, curve: 'M50 50C64 58 65 72 76 84' },
};
