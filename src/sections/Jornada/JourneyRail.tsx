import { CoffeeBean } from '../../components/CoffeeBean/CoffeeBean';
import styles from './Jornada.module.css';

export function JourneyRail() {
  return (
    <div className={styles.rail} data-journey-rail aria-hidden="true">
      <span className={styles.railBase} />
      <span className={styles.railFill} data-journey-fill />
      <span className={styles.travellingBean} data-journey-bean><CoffeeBean /></span>
      <svg className={styles.cupLanding} data-journey-cup width="62" height="62" viewBox="0 0 64 64" fill="none" focusable="false">
        <ellipse cx="28" cy="24" rx="17" ry="6" stroke="currentColor" strokeWidth="1.3" />
        <path d="M11 24v12c0 10 34 10 34 0V24m0 1c17-5 18 16 0 14M6 48c8 7 38 7 47 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M20 22c-4-7 7-8 3-16m8 16c-4-7 7-8 3-16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity=".6" />
        <ellipse cx="28" cy="25" rx="13" ry="3" fill="var(--color-caramel)" opacity=".45" />
      </svg>
    </div>
  );
}
