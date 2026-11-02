import type { CoffeeCuriosity } from '../../types/coffee';
import styles from './Curiosidades.module.css';

interface DiscoveryRevealProps {
  curiosity: CoffeeCuriosity;
  onDiscover: (id: string) => void;
}

export function DiscoveryReveal({ curiosity, onDiscover }: DiscoveryRevealProps) {
  const panelId = `detalhe-${curiosity.id}`;

  return (
    <details className={styles.reveal} onToggle={event => {
      if (event.currentTarget.open) onDiscover(curiosity.id);
    }}>
      <summary className={styles.summary} aria-controls={panelId}>
        <span className={styles.toggleIcon} aria-hidden="true" />
        <span>
          <span className={styles.openLabel}>{curiosity.reveal.prompt}</span>
          <span className={styles.closeLabel}>Fechar detalhe</span>
          <span className="visuallyHidden"> sobre {curiosity.title}</span>
        </span>
      </summary>
      <div id={panelId} className={styles.revealBody}>
        <h4>{curiosity.reveal.title}</h4>
        <p>{curiosity.reveal.text}</p>
        <p className={styles.sourceLabel}>Para ir à fonte</p>
        <ul className={styles.sources}>
          {curiosity.sources.map(source => (
            <li key={source.href}><a href={source.href}>{source.label}</a></li>
          ))}
        </ul>
      </div>
    </details>
  );
}
