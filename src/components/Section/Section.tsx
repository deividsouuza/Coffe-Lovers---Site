import type { ReactNode } from 'react';
import type { SectionContent } from '../../types/coffee';
import { OrganicDivider } from '../OrganicDivider/OrganicDivider';
import { SectionTransition } from '../SectionTransition/SectionTransition';
import styles from './Section.module.css';

interface SectionProps {
  content: SectionContent;
  children?: ReactNode;
  headingLevel?: 'h1' | 'h2';
  tone?: 'cream' | 'espresso';
  divider?: boolean;
  transitionFrom?: 'cream' | 'espresso';
}

export function Section({ content, children, headingLevel: Heading = 'h2', tone = 'cream', divider = false, transitionFrom }: SectionProps) {
  const titleId = `${content.id}-titulo`;

  return (
    <section id={content.id} aria-labelledby={titleId} className={styles.section} data-tone={tone} tabIndex={-1}>
      {transitionFrom && <SectionTransition from={transitionFrom} />}
      <div className="container">
        {divider && <OrganicDivider />}
        <header className={styles.intro} data-motion-reveal>
          <p className="eyebrow">{content.eyebrow}</p>
          <Heading id={titleId}>{content.title}</Heading>
          <p className="lead">{content.description}</p>
        </header>
        {children}
      </div>
    </section>
  );
}
