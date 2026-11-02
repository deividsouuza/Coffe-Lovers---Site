import suaveSmall from '../assets/images/profiles/suave-480.webp';
import suaveLarge from '../assets/images/profiles/suave-960.webp';
import suaveThumbnail from '../assets/images/profiles/suave-192.webp';
import intensoSmall from '../assets/images/profiles/intenso-480.webp';
import intensoLarge from '../assets/images/profiles/intenso-960.webp';
import intensoThumbnail from '../assets/images/profiles/intenso-192.webp';
import aromaticoSmall from '../assets/images/profiles/aromatico-480.webp';
import aromaticoLarge from '../assets/images/profiles/aromatico-960.webp';
import aromaticoThumbnail from '../assets/images/profiles/aromatico-192.webp';
import type { CoffeeProfile, CoffeeProfileId } from '../types/coffee';

export const profileContent = {
  legend: 'Escolha a atmosfera do seu momento',
  initialTitle: 'O seu momento, do seu jeito.',
  initialDescription: 'Flores, profundidade ou uma surpresa no aroma? Toque em uma atmosfera para encontrar o que combina com você hoje.',
  initialAffection: 'Não há resposta certa. Há o que faz sentido para a sua pausa.',
  initialCaption: 'Um convite para descobrir como você gosta de sentir o café.',
  resultEyebrow: 'Você se identifica com',
  initialEyebrow: 'Três atmosferas. Muitas formas de sentir.',
  notesLabel: 'Notas que inspiram este perfil',
  notesExplanation: 'As notas são referências sensoriais, não ingredientes adicionados.',
  rememberLabel: 'Lembrar minha escolha neste dispositivo',
  nextLabel: 'Continue pelo mapa de aromas',
  imageError: 'Esta imagem não carregou. Seu perfil continua selecionado e você pode seguir explorando.',
  storageMessages: {
    session: 'Sua escolha fica só nesta visita.',
    waiting: 'Escolha uma atmosfera para guardar neste dispositivo.',
    saved: 'Escolha guardada neste dispositivo.',
    'save-failed': 'Não foi possível guardar. Sua escolha continua ativa nesta visita.',
    'remove-failed': 'O dispositivo não permitiu apagar a escolha salva.',
  },
} as const;

// Perfis editoriais escolhidos pelo visitante; não são resultados de avaliação.
export const coffeeProfiles = [
  {
    id: 'suave', title: 'Suave e delicado', hint: 'Flores, luz e leveza',
    atmosphere: 'Um instante de leveza',
    description: 'Você se identifica com uma experiência delicada: referências florais, textura leve e uma atmosfera clara, como uma manhã tranquila.',
    notes: ['Flores brancas', 'Jasmim', 'Camomila'],
    affection: 'Você encontra beleza nos detalhes: no aroma que chega devagar, na luz sobre a mesa e no primeiro gole sem pressa.',
    image: {
      thumbnail: suaveThumbnail, small: suaveSmall, smallWidth: 480, large: suaveLarge, width: 960, height: 1200,
      alt: 'Xícara clara de café sobre linho creme, ao lado de pequenas flores brancas e luz suave.',
      caption: 'Luz tranquila, flores e espaço para respirar.',
      credit: { label: 'COFFE LOVERS · imagem própria', href: '#perfis' },
    },
  },
  {
    id: 'intenso', title: 'Intenso e marcante', hint: 'Cacau, presença e profundidade',
    atmosphere: 'Uma presença que fica',
    description: 'Você se identifica com sabores de presença: referências a chocolate e cacau, sensação encorpada e uma atmosfera profunda e acolhedora.',
    notes: ['Chocolate amargo', 'Cacau', 'Castanhas'],
    affection: 'Sua pausa tem personalidade. Há conforto no que envolve, no sabor que permanece e em um instante vivido por inteiro.',
    image: {
      thumbnail: intensoThumbnail, small: intensoSmall, smallWidth: 480, large: intensoLarge, width: 960, height: 1200,
      alt: 'Espresso com crema em uma xícara escura, com pedaços de chocolate e grãos de café ao lado.',
      caption: 'Profundidade, calor e um aroma que permanece.',
      credit: { label: 'COFFE LOVERS · imagem própria', href: '#perfis' },
    },
  },
  {
    id: 'aromatico', title: 'Aromático e surpreendente', hint: 'Frutas, flores e descoberta',
    atmosphere: 'A beleza do inesperado',
    description: 'Você se identifica com a descoberta: referências frutadas e florais, nuances que convidam a sentir e uma atmosfera de oliva e caramelo.',
    notes: ['Frutas amarelas', 'Frutas vermelhas', 'Flores'],
    affection: 'Sua curiosidade também faz parte do ritual. Você deixa espaço para uma nova nota, uma lembrança inesperada e um caminho que ainda não conhece.',
    image: {
      thumbnail: aromaticoThumbnail, small: aromaticoSmall, smallWidth: 480, large: aromaticoLarge, width: 960, height: 1200,
      alt: 'Xícara de café em cerâmica caramelo sobre linho oliva, com pêssego, frutas vermelhas e uma flor ao lado.',
      caption: 'Entre frutas, flores e a vontade de descobrir.',
      credit: { label: 'COFFE LOVERS · imagem própria', href: '#perfis' },
    },
  },
] as const satisfies readonly CoffeeProfile[];

export function isCoffeeProfileId(value: string | null): value is CoffeeProfileId {
  return coffeeProfiles.some(profile => profile.id === value);
}
