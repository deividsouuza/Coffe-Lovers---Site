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

export interface CoffeeCuriosity extends ContentItem {
  readonly layout: 'fruit' | 'roast' | 'plant' | 'espresso';
  readonly kicker: string;
  readonly reveal: {
    readonly prompt: string;
    readonly title: string;
    readonly text: string;
  };
  readonly sources: readonly ContentSource[];
  readonly image: {
    readonly small: string;
    readonly large: string;
    readonly width: number;
    readonly height: number;
    readonly alt: string;
    readonly caption: string;
    readonly credit: ContentSource;
    readonly license?: ContentSource;
  };
}
