import type { SectionContent } from '../types/coffee';
import { heroContent } from './heroContent';
import { farewellContent } from './farewellContent';

export const siteContent = {
  name: 'COFFE LOVERS',
  hero: {
    id: 'inicio',
    eyebrow: heroContent.eyebrow,
    title: heroContent.titleLines.join(' '),
    description: heroContent.subtitle,
  },
  curiosidades: {
    id: 'curiosidades',
    eyebrow: '01 · Descubra o café',
    title: 'VOCÊ NÃO ESTÁ APENAS OLHANDO. ESTÁ DESCOBRINDO.',
    description: 'Entre o fruto e a xícara, há histórias que um olhar apressado não percebe. Aproxime-se. A próxima descoberta está nos detalhes.',
  },
  jornada: {
    id: 'jornada',
    eyebrow: '02 · Sua jornada no café',
    title: 'AGORA CAMINHE PELO CAFÉ.',
    description: 'Da primeira raiz à xícara nas suas mãos. Acompanhe o caminho, as transformações e o cuidado que tornam cada pausa possível.',
  },
  perfis: {
    id: 'perfis',
    eyebrow: '03 · Seu perfil',
    title: 'QUAL TIPO DE COFFE LOVER É VOCÊ?',
    description: 'Escolha pelo que você sente hoje. Seu jeito de apreciar pode mudar a cada pausa — e há beleza em cada descoberta.',
  },
  aromas: {
    id: 'aromas',
    eyebrow: '04 · Mapa de aromas',
    title: 'O CAFÉ ESCONDE MUITO MAIS DO QUE VOCÊ IMAGINA.',
    description: 'Entre um aroma e uma lembrança, existe um universo para explorar. Aproxime os sentidos e descubra outras formas de perceber a sua xícara.',
  },
  encerramento: {
    id: 'pausa',
    eyebrow: '05 · Uma pausa para sentir',
    title: farewellContent.title,
    description: farewellContent.message,
  },
} as const satisfies { name: string } & Record<
  'hero' | 'curiosidades' | 'jornada' | 'perfis' | 'aromas' | 'encerramento',
  SectionContent
>;

export const navigation = [
  { id: siteContent.curiosidades.id, label: 'Descubra' },
  { id: siteContent.jornada.id, label: 'Jornada' },
  { id: siteContent.perfis.id, label: 'Seu perfil' },
  { id: siteContent.aromas.id, label: 'Aromas' },
  { id: siteContent.encerramento.id, label: 'Sua pausa' },
] as const;
