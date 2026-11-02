import { Section } from '../../components/Section/Section';
import { coffeeProfiles } from '../../data/coffeeContent';
import { siteContent } from '../../data/siteContent';

export function Perfis() {
  return (
    <Section content={siteContent.perfis}>
      <dl className="descriptionList">
        {coffeeProfiles.map(({ id, title, description }) => (
          <div key={id}><dt>{title}</dt><dd>{description}</dd></div>
        ))}
      </dl>
    </Section>
  );
}
