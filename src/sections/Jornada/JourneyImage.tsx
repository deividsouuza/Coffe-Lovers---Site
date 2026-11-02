import type { JourneyStage } from '../../types/coffee';
import styles from './Jornada.module.css';

export function JourneyImage({ image }: Pick<JourneyStage, 'image'>) {
  return (
    <figure className={styles.figure}>
      <div className={styles.imageFrame}>
        <div className={styles.imageMotion} data-journey-image>
          <img src={image.small} srcSet={`${image.small} ${image.smallWidth ?? 560}w, ${image.large} 1120w`}
            sizes="(min-width: 1440px) 500px, (min-width: 1024px) 40vw, calc(100vw - 92px)"
            width={image.width} height={image.height} alt={image.alt} loading="lazy" decoding="async" />
        </div>
      </div>
      <figcaption className={styles.caption}>
        <span>{image.caption}</span>
        <a href={image.credit.href}>Foto: {image.credit.label}</a>
      </figcaption>
    </figure>
  );
}
