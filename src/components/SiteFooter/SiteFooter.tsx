import { farewellContent } from '../../data/farewellContent';
import { siteContent } from '../../data/siteContent';
import styles from './SiteFooter.module.css';

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <p className={styles.signature}>
          <span className={styles.brand}>{siteContent.name}</span>{farewellContent.signatureNote}
        </p>
      </div>
    </footer>
  );
}
