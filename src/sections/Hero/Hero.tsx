import { Section } from '../../components/Section/Section';
import { siteContent } from '../../data/siteContent';

export function Hero() {
  return (
    <Section content={siteContent.hero} headingLevel="h1">
      <a className="textLink" href={`#${siteContent.curiosidades.id}`}>Comece sua descoberta</a>
    </Section>
  );
}
