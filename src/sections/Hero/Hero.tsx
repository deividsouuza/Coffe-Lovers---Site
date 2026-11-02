import { Section } from '../../components/Section/Section';
import { Action } from '../../components/Action/Action';
import { siteContent } from '../../data/siteContent';

export function Hero() {
  return (
    <Section content={siteContent.hero} headingLevel="h1">
      <Action href={`#${siteContent.curiosidades.id}`}>Comece sua descoberta</Action>
    </Section>
  );
}
