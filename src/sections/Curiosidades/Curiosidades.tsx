import { Section } from '../../components/Section/Section';
import { curiosities } from '../../data/coffeeContent';
import { siteContent } from '../../data/siteContent';

export function Curiosidades() {
  return (
    <Section content={siteContent.curiosidades}>
      <ul className="contentList">
        {curiosities.map(({ id, title, description }) => (
          <li key={id}><h3>{title}</h3><p>{description}</p></li>
        ))}
      </ul>
    </Section>
  );
}
