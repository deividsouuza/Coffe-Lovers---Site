import { Section } from '../../components/Section/Section';
import { journeyStages } from '../../data/coffeeContent';
import { siteContent } from '../../data/siteContent';

export function Jornada() {
  return (
    <Section content={siteContent.jornada}>
      <ol className="contentList">
        {journeyStages.map(({ id, title, description }) => (
          <li key={id}><h3>{title}</h3><p>{description}</p></li>
        ))}
      </ol>
    </Section>
  );
}
