import { coffeeProfiles, profileContent } from '../../data/profileContent';
import type { CoffeeProfile } from '../../types/coffee';
import styles from './Perfis.module.css';

export function ProfileDescription({ profile }: { profile: CoffeeProfile | undefined }) {
  const activeId = profile?.id ?? 'initial';
  return (
    <div id="perfil-resultado" role="region" aria-labelledby={`perfil-resultado-titulo-${activeId}`} className={styles.result}>
      {[undefined, ...coffeeProfiles].map(option => {
        const id = option?.id ?? 'initial';
        const visible = id === activeId;
        return (
          <div className={styles.resultContent} key={id} data-visible={visible} aria-hidden={!visible} inert={!visible}>
            <p className="eyebrow">{option ? profileContent.resultEyebrow : profileContent.initialEyebrow}</p>
            <h3 id={`perfil-resultado-titulo-${id}`}>{option?.title ?? profileContent.initialTitle}</h3>
            <p className={styles.resultDescription}>{option?.description ?? profileContent.initialDescription}</p>
            {option && <>
              <p className={styles.notesLabel}>{profileContent.notesLabel}</p>
              <ul className={styles.notes}>{option.notes.map(note => <li key={note}>{note}</li>)}</ul>
            </>}
            <p className={styles.affection}>{option?.affection ?? profileContent.initialAffection}</p>
            {option && <p className={styles.notesExplanation}>{profileContent.notesExplanation}</p>}
          </div>
        );
      })}
    </div>
  );
}
