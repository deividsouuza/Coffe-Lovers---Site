import type { CSSProperties, RefObject } from 'react';
import { CoffeeBean } from '../../components/CoffeeBean/CoffeeBean';
import { aromaContent, aromaMapLayout, aromaNotes } from '../../data/aromaContent';
import type { AromaId } from '../../types/coffee';
import { AromaConnections } from './AromaConnections';
import { AromaIllustration } from './AromaIllustration';
import styles from './Aromas.module.css';

interface AromaMapProps {
  activeId: AromaId | null;
  buttonRefs: RefObject<Map<AromaId, HTMLButtonElement>>;
  onSelect: (id: AromaId) => void;
}

export function AromaMap({ activeId, buttonRefs, onSelect }: AromaMapProps) {
  return (
    <div className={styles.map} role="group" aria-label={aromaContent.mapLabel} aria-describedby="aroma-instrucao">
      <AromaConnections activeId={activeId} />
      <div className={styles.center} aria-hidden="true">
        <span className={styles.centerOrbit} />
        <CoffeeBean />
        <span className={styles.centerCaption}>{aromaContent.centerCaption}</span>
      </div>
      {aromaNotes.map(aroma => (
        <button key={aroma.id} type="button" className={styles.node} data-aroma={aroma.id}
          ref={element => { if (element) buttonRefs.current.set(aroma.id, element); else buttonRefs.current.delete(aroma.id); }}
          style={{ left: `${aromaMapLayout[aroma.id].x}%`, top: `${aromaMapLayout[aroma.id].y}%`, '--aroma-accent': aroma.accent } as CSSProperties}
          aria-label={aroma.title} aria-pressed={activeId === aroma.id} aria-expanded={activeId === aroma.id}
          aria-controls="aroma-informacao" onClick={() => onSelect(aroma.id)}>
          <span className={styles.nodeArt}><AromaIllustration aroma={aroma.id} /></span>
          <span className={styles.nodeTitle}>{aroma.title}</span>
          <span className={styles.nodeAction} aria-hidden="true">{activeId === aroma.id ? 'Em foco' : 'Explorar +'}</span>
        </button>
      ))}
    </div>
  );
}
