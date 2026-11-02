import type { CoffeeCuriosity } from '../../types/coffee';
import styles from './Curiosidades.module.css';

export function DiscoveryImage({ image, layout }: Pick<CoffeeCuriosity, 'image' | 'layout'>) {
  const sizes = layout === 'plant'
    ? '(min-width: 768px) 320px, (min-width: 400px) 300px, calc(100vw - 80px)'
    : '(min-width: 1440px) 640px, (min-width: 768px) 50vw, calc(100vw - 40px)';

  return (
    <figure className={styles.figure}>
      <div className={styles.imageFrame}>
        <img src={image.small} srcSet={`${image.small} 560w, ${image.large} 1120w`}
          sizes={sizes} width={image.width} height={image.height}
          alt={image.alt} loading="lazy" decoding="async" />
      </div>
      <figcaption className={styles.caption}>
        <span>{image.caption}</span>
        <a href={image.credit.href}>Foto: {image.credit.label}</a>
        {image.license && <a href={image.license.href}>{image.license.label}</a>}
      </figcaption>
    </figure>
  );
}
