import coffeeSmall from '../../assets/images/coffee-beans-640.webp';
import coffeeLarge from '../../assets/images/coffee-beans-1600.webp';
import styles from './PhotoDivider.module.css';

/** Respiro fotográfico decorativo, independente do conteúdo das seções. */
export function PhotoDivider() {
  return (
    <div className={styles.frame} aria-hidden="true">
      <picture>
        <source media="(max-width: 767px)" srcSet={coffeeSmall} />
        <img src={coffeeLarge} srcSet={`${coffeeSmall} 640w, ${coffeeLarge} 1600w`}
          sizes="100vw" width="1600" height="640" alt="" loading="lazy" decoding="async" />
      </picture>
    </div>
  );
}
