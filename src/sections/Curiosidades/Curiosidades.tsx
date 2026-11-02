import { useState } from 'react';
import { Section } from '../../components/Section/Section';
import { Action } from '../../components/Action/Action';
import { curiosities, discoveryContent } from '../../data/curiosities';
import { siteContent } from '../../data/siteContent';
import { DiscoveryStory } from './DiscoveryStory';
import styles from './Curiosidades.module.css';

export function Curiosidades() {
  const [discovered, setDiscovered] = useState<ReadonlySet<string>>(() => new Set());

  function handleDiscover(id: string) {
    setDiscovered(previous => previous.has(id) ? previous : new Set([...previous, id]));
  }

  return (
    <Section content={siteContent.curiosidades} divider transitionFrom="espresso">
      <div className={styles.discoveryBar}>
        <p>{discoveryContent.instruction}</p>
        <p className={styles.progress} role="status" aria-label={discoveryContent.statusLabel} aria-atomic="true">
          <span className={styles.progressDots} aria-hidden="true">
            {curiosities.map(curiosity => <span key={curiosity.id} data-filled={discovered.has(curiosity.id)} />)}
          </span>
          {discovered.size} de {curiosities.length} {discovered.size === 1 ? 'descoberta revelada' : 'descobertas reveladas'}
        </p>
      </div>
      <div className={styles.stories}>
        {curiosities.map(curiosity => (
          <DiscoveryStory key={curiosity.id} curiosity={curiosity} discovered={discovered.has(curiosity.id)} onDiscover={handleDiscover} />
        ))}
      </div>
      <div className={styles.nextStep}>
        <Action href={`#${siteContent.jornada.id}`} variant="text">{discoveryContent.nextLabel}</Action>
      </div>
    </Section>
  );
}
