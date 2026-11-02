import type { ReactNode } from 'react';
import type { SectionContent } from '../../types/coffee';
import { OrganicDivider } from '../OrganicDivider/OrganicDivider';
import styles from './Section.module.css';

interface SectionProps {
  content: SectionContent;
  children?: ReactNode;
  headingLevel?: 'h1' | 'h2';
  tone?: 'cream' | 'espresso';
  divider?: boolean;
}

export function Section({ content, children, headingLevel: Heading = 'h2', tone = 'cream', divider = false }: SectionProps) {
  const titleId = `${content.id}-titulo`;

  return (
    <section id={content.id} aria-labelledby={titleId} className={styles.section} data-tone={tone} tabIndex={-1}>
      <div className="container">
        {divider && <OrganicDivider />}
        <header className={styles.intro}>
          <p className="eyebrow">{content.eyebrow}</p>
          <Heading id={titleId}>{content.title}</Heading>
          <p className="lead">{content.description}</p>
        </header>
        {children}
      </div>
    </section>
  );
}
