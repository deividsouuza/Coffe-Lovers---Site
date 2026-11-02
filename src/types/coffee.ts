export interface ContentItem {
  readonly id: string;
  readonly title: string;
  readonly description: string;
}

export interface SectionContent {
  readonly id: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
}

export interface AromaNote extends ContentItem {
  readonly examples: readonly string[];
}

export interface ContentSource {
  readonly label: string;
  readonly href: string;
}

export interface EditorialImage {
  readonly small: string;
  readonly smallWidth?: number;
  readonly large: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
  readonly caption: string;
  readonly credit: ContentSource;
  readonly license?: ContentSource;
}

export interface CoffeeCuriosity extends ContentItem {
  readonly layout: 'fruit' | 'roast' | 'plant' | 'espresso';
  readonly kicker: string;
  readonly reveal: {
    readonly prompt: string;
    readonly title: string;
    readonly text: string;
  };
  readonly sources: readonly ContentSource[];
  readonly image: EditorialImage;
}

export interface JourneyStage extends ContentItem {
  readonly phase: 'cultivation' | 'harvest' | 'processing' | 'roast' | 'extraction' | 'cup';
  readonly kicker: string;
  readonly thought: string;
  readonly beanColor: string;
  readonly image: EditorialImage;
}

export type CoffeeProfileId = 'suave' | 'intenso' | 'aromatico';

export interface CoffeeProfile extends ContentItem {
  readonly id: CoffeeProfileId;
  readonly hint: string;
  readonly atmosphere: string;
  readonly notes: readonly string[];
  readonly affection: string;
  readonly image: EditorialImage;
}
