import coffeeSmall from '../../assets/images/hero-coffee-480.webp';
import coffeeMedium from '../../assets/images/hero-coffee-800.webp';
import coffeeLarge from '../../assets/images/hero-coffee-1120.webp';
import { heroContent } from '../../data/heroContent';
import { CoffeeBean } from './CoffeeBean';
import styles from './Hero.module.css';

export function HeroVisual() {
  return (
    <figure className={styles.visual}>
      <div className={styles.photoFrame}>
        <div className={styles.photoMotion}>
          <picture>
            <source media="(max-width: 767px)" srcSet={`${coffeeSmall} 480w, ${coffeeMedium} 800w`}
              sizes="(min-width: 640px) 480px, calc(100vw - 40px)" />
            <img className={styles.photo} src={coffeeMedium}
              srcSet={`${coffeeSmall} 480w, ${coffeeMedium} 800w, ${coffeeLarge} 1120w`}
              sizes="(min-width: 1440px) 540px, (min-width: 1024px) 42vw, (min-width: 640px) 480px, calc(100vw - 40px)"
              width="1120" height="1400" alt={heroContent.imageAlt} loading="eager" fetchPriority="high" decoding="async" />
          </picture>
          <svg id="hero-atmosfera" className={styles.steam} viewBox="0 0 160 220" fill="none" aria-hidden="true" focusable="false">
            <path d="M74 214c-42-54 51-69 8-119S65 38 83 8" />
            <path d="M100 218c-15-44 37-55 8-97S84 52 111 24" />
            <path d="M57 216c-24-33 21-51 6-82S34 87 56 57" />
          </svg>
        </div>
      </div>
      <span className={styles.bean} aria-hidden="true"><CoffeeBean /></span>
      <figcaption className={styles.caption}>{heroContent.imageCaption}</figcaption>
    </figure>
  );
}
