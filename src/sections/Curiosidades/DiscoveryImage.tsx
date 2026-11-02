import { useId } from 'react';
import type { CoffeeCuriosity } from '../../types/coffee';
import { Icon } from '../../components/Icon/Icon';
import { discoveryContent } from '../../data/curiosities';
import { useFruitPhotoMotion } from '../../hooks/useFruitPhotoMotion';
import styles from './Curiosidades.module.css';

export function DiscoveryImage({ image, layout }: Pick<CoffeeCuriosity, 'image' | 'layout'>) {
  const fruit = layout === 'fruit';
  const photoId = useId();
  const { frameRef, imageRef, paused, showControl, toggle } = useFruitPhotoMotion(fruit);
  const sizes = layout === 'plant'
    ? '(min-width: 768px) 320px, (min-width: 400px) 300px, calc(100vw - 80px)'
    : '(min-width: 1440px) 640px, (min-width: 768px) 50vw, calc(100vw - 40px)';

  return (
    <figure className={styles.figure}>
      <div ref={frameRef} className={styles.imageFrame} data-fruit-camera={fruit ? 'true' : undefined}>
        <img ref={imageRef} id={fruit ? photoId : undefined} tabIndex={fruit ? -1 : undefined}
          src={image.small} srcSet={`${image.small} 560w, ${image.large} 1120w`}
          sizes={sizes} width={image.width} height={image.height}
          alt={image.alt} loading="lazy" decoding="async" />
        {showControl && <button type="button" className={styles.photoControl} onClick={toggle} aria-controls={photoId}>
          <Icon name={paused ? 'play' : 'pause'} />
          {paused ? discoveryContent.photoResume : discoveryContent.photoPause}
        </button>}
      </div>
      <figcaption className={styles.caption}>
        <span>{image.caption}</span>
        <a href={image.credit.href}>Foto: {image.credit.label}</a>
        {image.license && <a href={image.license.href}>{image.license.label}</a>}
      </figcaption>
    </figure>
  );
}
