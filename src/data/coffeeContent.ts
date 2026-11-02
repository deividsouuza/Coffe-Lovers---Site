import type { AromaNote } from '../types/coffee';

// Mantém o ponto de importação anterior para consumidores do conteúdo.
export { curiosities } from './curiosities';

export { journeyStages } from './journeyContent';

export { coffeeProfiles } from './profileContent';

// Referências de vocabulário sensorial; não representam ingredientes adicionados.
export const aromaNotes = [
  { id: 'achocolatados', title: 'Achocolatados', description: 'Lembranças de cacau e chocolate.', examples: ['Cacau', 'Chocolate'] },
  { id: 'caramelizados', title: 'Caramelizados', description: 'Lembranças de açúcar e caramelo.', examples: ['Açúcar mascavo', 'Caramelo'] },
  { id: 'frutados', title: 'Frutados', description: 'Lembranças de frutas em diferentes expressões.', examples: ['Frutas cítricas', 'Frutas vermelhas'] },
  { id: 'florais', title: 'Florais', description: 'Lembranças delicadas de flores.', examples: ['Jasmim', 'Rosa'] },
  { id: 'castanhas', title: 'Castanhas', description: 'Lembranças de nozes e castanhas.', examples: ['Amêndoa', 'Avelã'] },
] as const satisfies readonly AromaNote[];
