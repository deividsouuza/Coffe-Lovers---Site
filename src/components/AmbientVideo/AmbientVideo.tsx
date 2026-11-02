import { useId } from 'react';
import type { EditorialImage, EditorialVideo } from '../../types/coffee';
import { useAmbientVideo } from '../../hooks/useAmbientVideo';
import { Icon } from '../Icon/Icon';
import styles from './AmbientVideo.module.css';

interface AmbientVideoProps {
  media: EditorialVideo;
  fallback: EditorialImage;
  sizes: string;
}

/** Preenche uma moldura posicionada, com dimensões reservadas pelo layout. */
export function AmbientVideo({ media, fallback, sizes }: AmbientVideoProps) {
  const id = useId();
  const { hostRef, imageRef, videoRef, paused, available, ready, playing, toggle } = useAmbientVideo(media.small, media.large);
  return (
    <div ref={hostRef} className={styles.media} data-ambient-video data-ready={ready} data-playing={playing}>
      <img ref={imageRef} className={styles.poster} tabIndex={-1} src={fallback.small}
        srcSet={`${fallback.small} 560w, ${fallback.large} ${fallback.width}w`} sizes={sizes}
        width={fallback.width} height={fallback.height} alt={fallback.alt} loading="lazy" decoding="async" />
      <video ref={videoRef} id={id} className={styles.video} autoPlay muted loop playsInline
        preload="metadata" poster={fallback.small} width={fallback.width} height={fallback.height}
        controls={false} disablePictureInPicture aria-hidden="true" tabIndex={-1} />
      {available && <button type="button" className={styles.control} aria-controls={id} onClick={toggle}>
        <Icon name={paused ? 'play' : 'pause'} />
        {paused ? 'Reproduzir vídeo' : 'Pausar vídeo'}
      </button>}
    </div>
  );
}
