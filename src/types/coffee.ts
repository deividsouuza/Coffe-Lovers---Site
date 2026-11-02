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
