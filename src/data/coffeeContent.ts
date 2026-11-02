import type { AromaNote, ContentItem } from '../types/coffee';

// Mantém o ponto de importação anterior para consumidores do conteúdo.
export { curiosities } from './curiosities';

export const journeyStages = [
  { id: 'cultivo', title: 'Cultivo', description: 'O começo da jornada, junto à planta e à terra.' },
  { id: 'colheita', title: 'Colheita', description: 'O encontro com os frutos do cafeeiro.' },
  { id: 'processamento', title: 'Processamento', description: 'O cuidado com o café depois da colheita.' },
  { id: 'torra', title: 'Torra', description: 'Um momento de transformação dos grãos.' },
  { id: 'extracao', title: 'Extração', description: 'O encontro entre a água e o café preparado.' },
  { id: 'xicara', title: 'Na xícara', description: 'A sua pausa passa a fazer parte da história.' },
] as const satisfies readonly ContentItem[];

// Estilos editoriais, sem classificação científica ou resultado de quiz.
export const coffeeProfiles = [
  { id: 'classico', title: 'O clássico', description: 'Encontra conforto nos rituais que já fazem parte do seu dia.' },
  { id: 'explorador', title: 'O explorador', description: 'Gosta de conhecer novos preparos e descobrir outras possibilidades.' },
  { id: 'contemplativo', title: 'O contemplativo', description: 'Aprecia os detalhes e reserva tempo para sentir cada gole.' },
] as const satisfies readonly ContentItem[];

// Referências de vocabulário sensorial; não representam ingredientes adicionados.
export const aromaNotes = [
  { id: 'achocolatados', title: 'Achocolatados', description: 'Lembranças de cacau e chocolate.', examples: ['Cacau', 'Chocolate'] },
  { id: 'caramelizados', title: 'Caramelizados', description: 'Lembranças de açúcar e caramelo.', examples: ['Açúcar mascavo', 'Caramelo'] },
  { id: 'frutados', title: 'Frutados', description: 'Lembranças de frutas em diferentes expressões.', examples: ['Frutas cítricas', 'Frutas vermelhas'] },
  { id: 'florais', title: 'Florais', description: 'Lembranças delicadas de flores.', examples: ['Jasmim', 'Rosa'] },
  { id: 'castanhas', title: 'Castanhas', description: 'Lembranças de nozes e castanhas.', examples: ['Amêndoa', 'Avelã'] },
] as const satisfies readonly AromaNote[];
