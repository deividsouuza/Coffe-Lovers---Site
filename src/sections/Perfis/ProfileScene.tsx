import { coffeeProfiles, profileContent } from '../../data/profileContent';
import type { CoffeeProfileId } from '../../types/coffee';
import { ProfileMotif } from './ProfileMotif';
import { useProfileImages } from '../../hooks/useProfileImages';
import styles from './Perfis.module.css';

export function ProfileScene({ selectedId }: { selectedId: CoffeeProfileId | null }) {
  const visible = coffeeProfiles.find(profile => profile.id === selectedId) ?? coffeeProfiles[0];
  const { shouldLoad, displayedId, failed, handleLoad, handleError } = useProfileImages(visible.id);

  return (
    <figure className={styles.scene}>
      <div className={styles.sceneFrame}>
        {coffeeProfiles.filter(profile => shouldLoad(profile.id)).map(profile => (
          <img key={profile.id} className={styles.sceneImage} data-visible={profile.id === displayedId}
            aria-hidden={profile.id !== displayedId} src={profile.image.small}
            srcSet={`${profile.image.small} 480w, ${profile.image.large} 960w`}
            sizes="(min-width: 1440px) 400px, (min-width: 1024px) 32vw, (min-width: 768px) 45vw, calc(100vw - 40px)"
            width="960" height="1200" alt={profile.id === displayedId ? profile.image.alt : ''} loading="lazy" decoding="async"
            onLoad={() => handleLoad(profile.id)} onError={() => handleError(profile.id)} />
        ))}
        {failed && <p className={styles.imageStatus} role="status">{profileContent.imageError}</p>}
      </div>
      <span className={styles.motif} key={visible.id}><ProfileMotif profile={visible.id} /></span>
      <figcaption className={styles.caption}>
        <span className={styles.captionStack}>
          <span className={styles.captionText} data-visible={!selectedId} aria-hidden={Boolean(selectedId)} inert={Boolean(selectedId)}>
            {profileContent.initialCaption}
          </span>
          {coffeeProfiles.map(profile => (
            <span className={styles.captionText} key={profile.id} data-visible={selectedId === profile.id}
              aria-hidden={selectedId !== profile.id} inert={selectedId !== profile.id}>{profile.image.caption}</span>
          ))}
        </span>
        <span>Imagens próprias · COFFE LOVERS</span>
      </figcaption>
    </figure>
  );
}
