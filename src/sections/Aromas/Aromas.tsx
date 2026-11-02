import { Section } from '../../components/Section/Section';
import { aromaNotes } from '../../data/coffeeContent';
import { siteContent } from '../../data/siteContent';

export function Aromas() {
  return (
    <Section content={siteContent.aromas}>
      <dl className="descriptionList">
        {aromaNotes.map(({ id, title, description, examples }) => (
          <div key={id}>
            <dt>{title}</dt>
            <dd>{description} Referências: {examples.join(', ')}.</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
