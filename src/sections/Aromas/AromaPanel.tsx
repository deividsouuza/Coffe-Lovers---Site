import { Icon } from '../../components/Icon/Icon';
import { aromaContent } from '../../data/aromaContent';
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
      <div id="aroma-informacao" role="region" aria-labelledby="aroma-informacao-titulo" hidden={!aroma} className={styles.panel}>
        <div className={styles.panelTop}>
          <p className="eyebrow">{aromaContent.panelEyebrow}</p>
          <button type="button" className={styles.closeButton} onClick={onClose} aria-label={aromaContent.closeLabel}>
            <Icon name="close" />
          </button>
        </div>
        <div key={aroma?.id ?? 'empty'} className={styles.panelContent}>
          {aroma && <span className={styles.panelArt}><AromaIllustration aroma={aroma.id} /></span>}
          <h3 id="aroma-informacao-titulo">{aroma?.title ?? 'Seu próximo aroma'}</h3>
          <p className={styles.description}>{aroma?.description}</p>
          {aroma && <>
            <p className={styles.examplesLabel}>{aromaContent.examplesLabel}</p>
            <ul className={styles.examples}>{aroma.examples.map(example => <li key={example}>{example}</li>)}</ul>
            <p className={styles.invitationLabel}>{aromaContent.invitationLabel}</p>
            <p className={styles.invitation}>{aroma.invitation}</p>
          </>}
        </div>
      </div>
    </div>
  );
}
