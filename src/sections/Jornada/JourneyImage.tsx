import type { JourneyStage } from '../../types/coffee';
import styles from './Jornada.module.css';

export function JourneyImage({ image }: Pick<JourneyStage, 'image'>) {
  const compactSources = `${image.small} ${image.smallWidth ?? 560}w${image.medium ? `, ${image.medium} ${image.mediumWidth ?? 800}w` : ''}`;
  return (
    <figure className={styles.figure}>
      <div className={styles.imageFrame}>
        <div className={styles.imageMotion} data-journey-image>
          <picture>
            {image.medium && <source media="(max-width: 767px)" srcSet={compactSources} sizes="calc(100vw - 92px)" />}
            <img src={image.small} srcSet={`${compactSources}, ${image.large} 1120w`}
              sizes="(min-width: 1440px) 500px, (min-width: 1024px) 40vw, calc(100vw - 92px)"
              width={image.width} height={image.height} alt={image.alt} loading="lazy" decoding="async" />
          </picture>
        </div>
      </div>
      <figcaption className={styles.caption}>
        <span>{image.caption}</span>
        <a href={image.credit.href}>Foto: {image.credit.label}</a>
      </figcaption>
    </figure>
  );
}
