import { Icon } from '../../components/Icon/Icon';
import { aromaContent, aromaNotes } from '../../data/aromaContent';
import type { AromaNote } from '../../types/coffee';
import { AromaIllustration } from './AromaIllustration';
import styles from './Aromas.module.css';

interface AromaPanelProps {
  aroma: AromaNote | undefined;
  onClose: () => void;
}

export function AromaPanel({ aroma, onClose }: AromaPanelProps) {
  return (
    <div className={styles.panelSlot}>
      {!aroma && <div className={styles.emptyPanel}>
        <p className="eyebrow">{aromaContent.initialEyebrow}</p>
        <h3>{aromaContent.initialTitle}</h3>
        <p>{aromaContent.initialDescription}</p>
        <span className={styles.emptyLine} aria-hidden="true" />
      </div>}
      <div id="aroma-informacao" role="region" aria-labelledby={`aroma-informacao-titulo-${aroma?.id ?? aromaNotes[0].id}`} hidden={!aroma} className={styles.panel}>
        <div className={styles.panelTop}>
          <p className="eyebrow">{aromaContent.panelEyebrow}</p>
          <button type="button" className={styles.closeButton} onClick={onClose} aria-label={aromaContent.closeLabel}>
            <Icon name="close" />
          </button>
        </div>
        <div className={styles.panelContent}>
          {aromaNotes.map(note => {
            const visible = aroma?.id === note.id;
            return (
              <div className={styles.aromaDetail} data-visible={visible} aria-hidden={!visible} inert={!visible} key={note.id}>
                <span className={styles.panelArt}><AromaIllustration aroma={note.id} /></span>
                <h3 id={`aroma-informacao-titulo-${note.id}`}>{note.title}</h3>
                <p className={styles.description}>{note.description}</p>
                <p className={styles.examplesLabel}>{aromaContent.examplesLabel}</p>
                <ul className={styles.examples}>{note.examples.map(example => <li key={example}>{example}</li>)}</ul>
                <p className={styles.invitationLabel}>{aromaContent.invitationLabel}</p>
                <p className={styles.invitation}>{note.invitation}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
