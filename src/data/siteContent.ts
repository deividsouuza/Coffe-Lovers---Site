import type { SectionContent } from '../types/coffee';
import { heroContent } from './heroContent';

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
    title: 'Um caminho até o seu encontro.',
    description: 'Acompanhe os momentos que conectam o cultivo à pausa que você vive agora.',
  },
  perfis: {
    id: 'perfis',
    eyebrow: '03 · Seu perfil',
    title: 'Como você gosta de viver o café?',
    description: 'Há dias para o conhecido e dias para uma nova descoberta. Qual destes estilos conversa com o seu momento?',
  },
  aromas: {
    id: 'aromas',
    eyebrow: '04 · Mapa de aromas',
    title: 'Dê espaço aos sentidos.',
    description: 'Explore palavras e lembranças que podem ajudar a descrever sua experiência com o café.',
  },
  encerramento: {
    id: 'pausa',
    eyebrow: '05 · Uma pausa para sentir',
    title: 'O melhor desta história é ter você aqui.',
    description: 'Obrigado por compartilhar este instante com a gente. Sinta o aroma, aproveite a companhia e viva a sua pausa, no seu tempo.',
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
