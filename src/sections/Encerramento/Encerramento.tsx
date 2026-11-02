import { Action } from '../../components/Action/Action';
import { farewellContent } from '../../data/farewellContent';
import { siteContent } from '../../data/siteContent';
import { FarewellVisual } from './FarewellVisual';
import { SectionTransition } from '../../components/SectionTransition/SectionTransition';
import styles from './Encerramento.module.css';

export function Encerramento() {
  return (
    <section id={siteContent.encerramento.id} className={styles.section} aria-labelledby="pausa-titulo" tabIndex={-1}>
      <SectionTransition from="espresso" className={styles.transition} />
      <div className={`container ${styles.layout}`}>
        <div className={styles.intro} data-motion-reveal>
          <p className="eyebrow">{siteContent.encerramento.eyebrow}</p>
          <h2 id="pausa-titulo" className={styles.title}>{siteContent.encerramento.title}</h2>
          <p className={styles.message}>{siteContent.encerramento.description}</p>
          <Action className={styles.revive} variant="text" icon="arrow-up" href={`#${siteContent.hero.id}`}>
            {farewellContent.reviveLabel}
          </Action>
        </div>
        <FarewellVisual />
      </div>
    </section>
  );
}
