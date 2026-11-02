import { Action } from '../../components/Action/Action';
import { OrganicDivider } from '../../components/OrganicDivider/OrganicDivider';
import { aromaContent, aromaNotes } from '../../data/aromaContent';
import { siteContent } from '../../data/siteContent';
import { useAromaExplorer } from '../../hooks/useAromaExplorer';
import { AromaMap } from './AromaMap';
import { AromaPanel } from './AromaPanel';
import styles from './Aromas.module.css';

export function Aromas() {
  const { activeId, buttonRefs, toggleAroma, closeAroma, handleKeyDown } = useAromaExplorer();
  const active = aromaNotes.find(aroma => aroma.id === activeId);

  return (
    <section id={siteContent.aromas.id} className={styles.section} data-tone="espresso" aria-labelledby="aromas-titulo"
      tabIndex={-1} onKeyDown={handleKeyDown}>
      <div className="container">
        <header className={styles.intro}>
          <OrganicDivider />
          <p className="eyebrow">{siteContent.aromas.eyebrow}</p>
          <h2 id="aromas-titulo">{siteContent.aromas.title}</h2>
          <p className="lead">{siteContent.aromas.description}</p>
        </header>
        <p id="aroma-instrucao" className={styles.instruction}>{aromaContent.instruction}</p>
        <div className={styles.experience}>
          <AromaMap activeId={activeId} buttonRefs={buttonRefs} onSelect={toggleAroma} />
          <AromaPanel aroma={active} onClose={closeAroma} />
        </div>
        <p className="visuallyHidden" role="status" aria-atomic="true">
          {active ? `${active.title}. ${active.description}` : 'Nenhum aroma selecionado. Explore as referências ao redor do grão.'}
        </p>
        <aside className={styles.science} aria-labelledby="aroma-ciencia-titulo">
          <h3 id="aroma-ciencia-titulo">{aromaContent.scienceTitle}</h3>
          <p>{aromaContent.scienceText}</p>
          <ul className={styles.sources}>
            {aromaContent.sources.map(source => <li key={source.href}><a href={source.href}>{source.label}</a></li>)}
          </ul>
        </aside>
        <Action href={`#${siteContent.encerramento.id}`} variant="text">{aromaContent.nextLabel}</Action>
      </div>
    </section>
  );
}
