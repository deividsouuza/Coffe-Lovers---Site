import { profileContent } from '../../data/profileContent';
import type { CoffeeProfile } from '../../types/coffee';
import styles from './Perfis.module.css';

export function ProfileDescription({ profile }: { profile: CoffeeProfile | undefined }) {
  return (
    <div id="perfil-resultado" role="region" aria-labelledby="perfil-resultado-titulo" className={styles.result}>
      <div className={styles.resultContent} key={profile?.id ?? 'initial'}>
        <p className="eyebrow">{profile ? profileContent.resultEyebrow : profileContent.initialEyebrow}</p>
        <h3 id="perfil-resultado-titulo">{profile?.title ?? profileContent.initialTitle}</h3>
        <p className={styles.resultDescription}>{profile?.description ?? profileContent.initialDescription}</p>
        {profile && <>
          <p className={styles.notesLabel}>{profileContent.notesLabel}</p>
          <ul className={styles.notes}>{profile.notes.map(note => <li key={note}>{note}</li>)}</ul>
        </>}
        <p className={styles.affection}>{profile?.affection ?? profileContent.initialAffection}</p>
        {profile && <p className={styles.notesExplanation}>{profileContent.notesExplanation}</p>}
      </div>
    </div>
  );
}
