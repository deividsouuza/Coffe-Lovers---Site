import { Section } from '../../components/Section/Section';
import { Action } from '../../components/Action/Action';
import { siteContent } from '../../data/siteContent';

export function Encerramento() {
  return (
    <Section content={siteContent.encerramento} divider>
      <Action variant="secondary" icon="arrow-up" href={`#${siteContent.hero.id}`}>Voltar ao início</Action>
    </Section>
  );
}
