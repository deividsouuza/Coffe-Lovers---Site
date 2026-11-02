import { Icon } from '../../components/Icon/Icon';
import { heroContent } from '../../data/heroContent';
import { siteContent } from '../../data/siteContent';
import { useHeroMotion } from '../../hooks/useHeroMotion';
import { HeroVisual } from './HeroVisual';
import styles from './Hero.module.css';

export function Hero() {
  const { heroRef, hasReducedMotion, isPaused, motionEnabled, toggleMotion } = useHeroMotion();

  return (
    <section ref={heroRef} id={siteContent.hero.id} className={styles.hero} data-tone="espresso"
      data-motion={motionEnabled ? 'running' : 'paused'} aria-labelledby="inicio-titulo" tabIndex={-1}>
      <div className={`container ${styles.layout}`}>
        <div className={styles.intro}>
          <p className={`eyebrow ${styles.eyebrow}`}>{siteContent.hero.eyebrow}</p>
          <h1 id="inicio-titulo" className={styles.title}>
            {heroContent.titleLines.map((line, index) => (
              <span key={line} className={index === 2 ? styles.titleName : undefined}>{line}{index < 2 ? ' ' : ''}</span>
            ))}
          </h1>
          <p className={styles.subtitle}>{siteContent.hero.description}</p>
        </div>
        <HeroVisual />
        <div className={styles.footer}>
          <a className={styles.scrollLink} href={`#${siteContent.curiosidades.id}`}>
            <span className={styles.scrollCircle}><Icon name="arrow-down" /></span>
            <span>{heroContent.instruction}</span>
          </a>
          <div className={styles.footerAside}>
            <span className={styles.beanCaption}>{heroContent.beanCaption}</span>
            {!hasReducedMotion && (
              <button className={styles.motionButton} type="button" onClick={toggleMotion} aria-controls="hero-atmosfera">
                <Icon name={isPaused ? 'play' : 'pause'} />
                {isPaused ? heroContent.resumeMotion : heroContent.pauseMotion}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
