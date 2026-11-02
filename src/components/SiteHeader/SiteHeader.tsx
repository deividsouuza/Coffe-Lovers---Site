import { navigation, siteContent } from '../../data/siteContent';
import styles from './SiteHeader.module.css';

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <a className={styles.brand} href={`#${siteContent.hero.id}`} aria-label={`${siteContent.name} — início`}>
        {siteContent.name}
      </a>
      <nav aria-label="Navegação principal">
        <ul className={styles.navigation}>
          {navigation.map(({ id, label }) => (
            <li key={id}><a href={`#${id}`}>{label}</a></li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
