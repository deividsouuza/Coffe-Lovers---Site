import { useId } from 'react';
import { coffeeProfiles, profileContent } from '../../data/profileContent';
import type { CoffeeProfileId } from '../../types/coffee';
import styles from './Perfis.module.css';

interface ProfileSelectorProps {
  selectedId: CoffeeProfileId | null;
  onSelect: (id: CoffeeProfileId) => void;
}

export function ProfileSelector({ selectedId, onSelect }: ProfileSelectorProps) {
  const groupId = useId();

  return (
    <fieldset className={styles.selector}>
      <legend className={styles.legend}>{profileContent.legend}</legend>
      <div className={styles.options}>
        {coffeeProfiles.map(profile => (
          <label key={profile.id} className={styles.option} data-option={profile.id}>
            <input className="visuallyHidden" type="radio" name={`coffe-profile-${groupId}`}
              value={profile.id} checked={selectedId === profile.id} onChange={() => onSelect(profile.id)}
              aria-label={profile.title} aria-describedby={`${groupId}-${profile.id}-hint`} aria-controls="perfil-resultado" />
            <span className={styles.optionContent}>
              <span className={styles.optionImage} aria-hidden="true">
                <img src={profile.image.thumbnail} alt="" width="192" height="240" loading="lazy" decoding="async" />
                <span className={styles.optionCheck} />
              </span>
              <span className={styles.optionCopy}>
                <span className={styles.optionTitle}>{profile.title}</span>
                <span className={styles.optionHint} id={`${groupId}-${profile.id}-hint`}>{profile.hint}</span>
                <span className={styles.optionState} aria-hidden="true">
                  <span data-state="idle">Escolher</span>
                  <span data-state="selected">Selecionado</span>
                </span>
              </span>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
