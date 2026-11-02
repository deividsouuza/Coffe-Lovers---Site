import type { JourneyStage } from '../../types/coffee';
import { JourneyImage } from './JourneyImage';
import styles from './Jornada.module.css';

interface JourneyStepProps {
  stage: JourneyStage;
  index: number;
  activeIndex: number;
}

export function JourneyStep({ stage, index, activeIndex }: JourneyStepProps) {
  const image = <JourneyImage image={stage.image} />;
  const narrative = (
    <div className={styles.narrative} data-journey-copy>
      <p className="eyebrow">{stage.kicker}</p>
      <h3 id={`jornada-${stage.id}-titulo`} className={styles.stageTitle}>{stage.title}</h3>
      <p className={styles.description}>{stage.description}</p>
      <p className={styles.thought}>{stage.thought}</p>
    </div>
  );

  return (
    <li id={`jornada-${stage.id}`} className={styles.step} data-phase={stage.phase}
      data-current={index === activeIndex} data-passed={index < activeIndex} tabIndex={-1}>
      <span className={styles.sceneWash} data-journey-wash aria-hidden="true" />
      <span className={styles.point} data-journey-point aria-hidden="true">0{index + 1}</span>
      <article className={styles.composition} aria-labelledby={`jornada-${stage.id}-titulo`}>
        {index % 2 === 0 ? <>{image}{narrative}</> : <>{narrative}{image}</>}
      </article>
    </li>
  );
}
