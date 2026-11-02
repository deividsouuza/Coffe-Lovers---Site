import { Action } from '../../components/Action/Action';
import { OrganicDivider } from '../../components/OrganicDivider/OrganicDivider';
import { journeyContent, journeyStages } from '../../data/journeyContent';
import { siteContent } from '../../data/siteContent';
import { useJourneyScroll } from '../../hooks/useJourneyScroll';
import { JourneyStep } from './JourneyStep';
import { JourneyRail } from './JourneyRail';
import styles from './Jornada.module.css';

export function Jornada() {
  const { journeyRef, activeIndex } = useJourneyScroll();

  return (
    <section ref={journeyRef} id={siteContent.jornada.id} className={styles.journey}
      data-tone="espresso" aria-labelledby="jornada-titulo" tabIndex={-1}>
      <header className={`container ${styles.intro}`}>
        <OrganicDivider />
        <p className="eyebrow">{siteContent.jornada.eyebrow}</p>
        <h2 id="jornada-titulo">{siteContent.jornada.title}</h2>
        <p className="lead">{siteContent.jornada.description}</p>
        <p className={styles.instruction}>{journeyContent.instruction}</p>
        <nav aria-label={journeyContent.navigationLabel}>
          <ol className={styles.navigation}>
            {journeyStages.map((stage, index) => (
              <li key={stage.id}>
                <a href={`#jornada-${stage.id}`} aria-current={index === activeIndex ? 'step' : undefined}>
                  <span aria-hidden="true">0{index + 1}</span>{stage.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className={styles.progress} role="progressbar" aria-label={journeyContent.progressLabel}
          aria-valuemin={0} aria-valuemax={100} aria-valuenow={0} data-journey-progress>
          <span data-journey-progress-fill />
        </div>
        <p className={styles.currentStage}>Etapa {activeIndex + 1} de {journeyStages.length} · {journeyStages[activeIndex].title}</p>
      </header>
      <div className={`container ${styles.track}`} data-journey-track>
        <JourneyRail />
        <ol className={styles.path}>
          {journeyStages.map((stage, index) => <JourneyStep key={stage.id} stage={stage} index={index} activeIndex={activeIndex} />)}
        </ol>
      </div>
      <footer className={`container ${styles.closing}`}>
        <p className="eyebrow">{journeyContent.closingEyebrow}</p>
        <h3>{journeyContent.closingTitle}</h3>
        <p className="lead">{journeyContent.closingText}</p>
        <Action href={`#${siteContent.perfis.id}`} variant="secondary">{journeyContent.nextLabel}</Action>
        <a className={styles.source} href={journeyContent.source.href}>{journeyContent.source.label}</a>
      </footer>
    </section>
  );
}
