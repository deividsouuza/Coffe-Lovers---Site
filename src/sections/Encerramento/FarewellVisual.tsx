import { farewellContent } from '../../data/farewellContent';
import { useFarewellMotion } from '../../hooks/useFarewellMotion';
import styles from './Encerramento.module.css';

export function FarewellVisual() {
  const frameRef = useFarewellMotion();
  const { image } = farewellContent;

  return (
    <figure className={styles.visual}>
      <div ref={frameRef} className={styles.photoFrame}>
        <img data-farewell-photo className={styles.photo} src={image.small}
          srcSet={`${image.small} 480w, ${image.large} 960w`}
          sizes="(min-width: 1440px) 576px, (min-width: 1024px) 44vw, (min-width: 640px) 512px, calc(100vw - 40px)"
          width={image.width} height={image.height} alt={image.alt} loading="lazy" decoding="async" />
        <svg data-farewell-steam className={styles.steam} viewBox="0 0 160 220" fill="none" aria-hidden="true" focusable="false">
          <path d="M67 214c-27-45 38-64 10-103S56 45 78 12" />
          <path d="M92 211c-17-37 32-56 10-89S80 62 105 30" />
          <path d="M48 213c-17-31 22-42 7-67s-19-39-5-61" />
        </svg>
      </div>
      <figcaption className={styles.caption}>{image.caption}</figcaption>
    </figure>
  );
}
