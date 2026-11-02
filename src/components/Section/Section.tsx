import type { ReactNode } from 'react';
import type { SectionContent } from '../../types/coffee';
import styles from './Section.module.css';

interface SectionProps {
  content: SectionContent;
  children?: ReactNode;
  headingLevel?: 'h1' | 'h2';
}

export function Section({ content, children, headingLevel: Heading = 'h2' }: SectionProps) {
  const titleId = `${content.id}-titulo`;

  return (
    <section id={content.id} aria-labelledby={titleId} className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>{content.eyebrow}</p>
          <Heading id={titleId}>{content.title}</Heading>
          <p>{content.description}</p>
        </header>
        {children}
      </div>
    </section>
  );
}
