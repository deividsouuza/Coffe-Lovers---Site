import { navigation, siteContent } from '../../data/siteContent';
import { useDialogMenu } from '../../hooks/useDialogMenu';
import { useHeaderOffset } from '../../hooks/useHeaderOffset';
import { Icon } from '../Icon/Icon';
import styles from './SiteHeader.module.css';

export function SiteHeader() {
  const { dialogRef, desktopFocusRef, isOpen, openMenu, closeMenu, handleNavigate, handleKeyDown, handleClose } = useDialogMenu();
  const headerRef = useHeaderOffset();

  return (
    <header ref={headerRef} className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a ref={desktopFocusRef} className={styles.brand} href={`#${siteContent.hero.id}`} aria-label={`${siteContent.name} — início`}>
          <span>COFFE <span className={styles.brandLast}>LOVERS</span></span>
          <span className={styles.brandCaption}>Histórias em cada xícara</span>
        </a>
        <nav className={styles.desktopNav} aria-label="Navegação principal">
          <ul className={styles.navigation}>
            {navigation.map(({ id, label }) => (
              <li key={id}><a href={`#${id}`}>{label}</a></li>
            ))}
          </ul>
        </nav>
        <button className={styles.menuButton} type="button" onClick={openMenu}
          aria-expanded={isOpen} aria-controls="menu-mobile" aria-haspopup="dialog">
          <span>Menu</span><Icon name="menu" />
        </button>
      </div>
      <dialog ref={dialogRef} id="menu-mobile" className={styles.dialog} data-tone="espresso"
        aria-labelledby="menu-titulo" onClose={handleClose} onKeyDown={handleKeyDown}>
        <div className={styles.dialogInner}>
          <div className={styles.dialogTop}>
            <p className={styles.dialogBrand}>{siteContent.name}</p>
            <button className={styles.closeButton} type="button" onClick={closeMenu} autoFocus>
              <span>Fechar</span><Icon name="close" />
            </button>
          </div>
          <p id="menu-titulo" className={`eyebrow ${styles.menuTitle}`}>Escolha sua próxima descoberta</p>
          <nav aria-label="Navegação mobile">
            <ol className={styles.mobileNavigation}>
              {navigation.map(({ id, label }, index) => (
                <li key={id}>
                  <a href={`#${id}`} onClick={handleNavigate}>
                    <span className={styles.menuIndex} aria-hidden="true">0{index + 1}</span>
                    <span>{label}</span><Icon name="arrow-right" />
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <p className={styles.menuFooter}>Uma pausa. Muitas descobertas.</p>
        </div>
      </dialog>
    </header>
  );
}
