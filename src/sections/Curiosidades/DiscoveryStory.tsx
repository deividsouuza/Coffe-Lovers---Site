import type { CoffeeCuriosity } from '../../types/coffee';
import { DiscoveryImage } from './DiscoveryImage';
import { DiscoveryReveal } from './DiscoveryReveal';
import styles from './Curiosidades.module.css';

interface DiscoveryStoryProps {
  curiosity: CoffeeCuriosity;
  discovered: boolean;
  onDiscover: (id: string) => void;
}

export function DiscoveryStory({ curiosity, discovered, onDiscover }: DiscoveryStoryProps) {
  const image = <DiscoveryImage image={curiosity.image} layout={curiosity.layout} />;
  const narrative = (
    <div className={styles.storyBody}>
      <p className="eyebrow">{curiosity.kicker}</p>
      <h3 id={`curiosidade-${curiosity.id}`} className={styles.storyTitle}>{curiosity.title}</h3>
      <p className={styles.description}>{curiosity.description}</p>
      <DiscoveryReveal curiosity={curiosity} onDiscover={onDiscover} />
      <span className={styles.discoveryState} data-discovered={discovered}>
        <span aria-hidden="true" />{discovered ? 'Já descoberto' : 'Um detalhe para descobrir'}
      </span>
    </div>
  );
  const textFirst = curiosity.layout === 'roast' || curiosity.layout === 'espresso';

  return (
    <article className={styles.story} data-layout={curiosity.layout} data-discovery-reveal
      data-tone={curiosity.layout === 'espresso' ? 'espresso' : undefined}
      aria-labelledby={`curiosidade-${curiosity.id}`}>
      {textFirst ? <>{narrative}{image}</> : <>{image}{narrative}</>}
    </article>
  );
}
