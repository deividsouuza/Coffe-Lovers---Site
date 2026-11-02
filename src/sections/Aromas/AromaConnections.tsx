import { aromaMapLayout, aromaNotes } from '../../data/aromaContent';
import type { AromaId } from '../../types/coffee';
import styles from './Aromas.module.css';

export function AromaConnections({ activeId }: { activeId: AromaId | null }) {
  const active = aromaNotes.find(aroma => aroma.id === activeId);

  return (
    <svg className={styles.connections} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      {aromaNotes.map(aroma => <path key={aroma.id} d={aromaMapLayout[aroma.id].curve}
        className={styles.connection} vectorEffect="non-scaling-stroke" />)}
      {active && <path key={active.id} d={aromaMapLayout[active.id].curve}
        className={styles.activeConnection} stroke={active.accent} vectorEffect="non-scaling-stroke" />}
    </svg>
  );
}
