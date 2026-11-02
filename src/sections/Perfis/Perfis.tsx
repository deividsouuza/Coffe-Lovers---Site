import { Action } from '../../components/Action/Action';
import { OrganicDivider } from '../../components/OrganicDivider/OrganicDivider';
import { coffeeProfiles, profileContent } from '../../data/profileContent';
import { siteContent } from '../../data/siteContent';
import { useCoffeeProfile } from '../../hooks/useCoffeeProfile';
import { ProfileSelector } from './ProfileSelector';
import { ProfileScene } from './ProfileScene';
import { ProfileDescription } from './ProfileDescription';
import { ProfileMemory } from './ProfileMemory';
import styles from './Perfis.module.css';

export function Perfis() {
  const { selectedId, remember, status, selectProfile, setRemember } = useCoffeeProfile();
  const selected = coffeeProfiles.find(profile => profile.id === selectedId);

  return (
    <section id={siteContent.perfis.id} className={styles.profiles} data-profile={selectedId ?? 'initial'}
      aria-labelledby="perfis-titulo" tabIndex={-1}>
      <div className="container">
        <header className={styles.intro}>
          <OrganicDivider />
          <p className="eyebrow">{siteContent.perfis.eyebrow}</p>
          <h2 id="perfis-titulo">{siteContent.perfis.title}</h2>
          <p className="lead">{siteContent.perfis.description}</p>
        </header>
        <div className={styles.experience}>
          <ProfileSelector selectedId={selectedId} onSelect={selectProfile} />
          <ProfileScene selectedId={selectedId} />
          <ProfileDescription profile={selected} />
        </div>
        <p className="visuallyHidden" role="status" aria-atomic="true">
          {selected ? `Perfil selecionado: ${selected.title}. Notas: ${selected.notes.join(', ')}.` : 'Escolha uma atmosfera para descobrir seu perfil.'}
        </p>
        <footer className={styles.footer}>
          <ProfileMemory remember={remember} status={status} onChange={setRemember} />
          <Action href={`#${siteContent.aromas.id}`} variant="text">{profileContent.nextLabel}</Action>
        </footer>
      </div>
    </section>
  );
}
