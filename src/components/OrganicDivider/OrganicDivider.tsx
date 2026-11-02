import styles from './OrganicDivider.module.css';

export function OrganicDivider() {
  return (
    <div className={styles.divider} aria-hidden="true">
      <span />
      <svg width="25" height="30" viewBox="0 0 25 30" fill="none" focusable="false">
        <ellipse cx="12.5" cy="15" rx="7" ry="11" transform="rotate(30 12.5 15)" stroke="currentColor" />
        <path d="M17 6c-10 4 1 13-9 18" stroke="currentColor" />
      </svg>
      <span />
    </div>
  );
}
