import { Action } from '../../components/Action/Action';
import { farewellContent } from '../../data/farewellContent';
import { siteContent } from '../../data/siteContent';
import { FarewellVisual } from './FarewellVisual';
import styles from './Encerramento.module.css';

export function Encerramento() {
  return (
    <section id={siteContent.encerramento.id} className={styles.section} aria-labelledby="pausa-titulo" tabIndex={-1}>
      <svg className={styles.transition} viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path d="M0 0h1440v25c-240 38-340 64-640 37S240 7 0 55Z" fill="currentColor" />
      </svg>
      <div className={`container ${styles.layout}`}>
        <div className={styles.intro}>
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
