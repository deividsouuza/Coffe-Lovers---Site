import { coffeeProfiles, profileContent } from '../../data/profileContent';
import type { CoffeeProfileId } from '../../types/coffee';
import { ProfileMotif } from './ProfileMotif';
import styles from './Perfis.module.css';

export function ProfileScene({ selectedId }: { selectedId: CoffeeProfileId | null }) {
  const visible = coffeeProfiles.find(profile => profile.id === selectedId) ?? coffeeProfiles[0];

  return (
    <figure className={styles.scene}>
      <div className={styles.sceneFrame}>
        {coffeeProfiles.map(profile => (
          <img key={profile.id} className={styles.sceneImage} data-visible={profile.id === visible.id}
            aria-hidden={profile.id !== visible.id} src={profile.image.small}
            srcSet={`${profile.image.small} 480w, ${profile.image.large} 960w`}
            sizes="(min-width: 1440px) 400px, (min-width: 1024px) 32vw, (min-width: 768px) 45vw, calc(100vw - 40px)"
            width="960" height="1200" alt={profile.id === visible.id ? profile.image.alt : ''} loading="lazy" decoding="async" />
        ))}
      </div>
      <span className={styles.motif} key={visible.id}><ProfileMotif profile={visible.id} /></span>
      <figcaption className={styles.caption}>
        {selectedId ? visible.image.caption : profileContent.initialCaption}
        <span>Imagens próprias · COFFE LOVERS</span>
      </figcaption>
    </figure>
  );
}
