import { Section } from '../../components/Section/Section';
import { siteContent } from '../../data/siteContent';

export function Encerramento() {
  return (
    <Section content={siteContent.encerramento}>
      <a className="textLink" href={`#${siteContent.hero.id}`}>Voltar ao início</a>
    </Section>
  );
}
