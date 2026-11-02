import styles from './SectionTransition.module.css';

/** A borda conecta superfícies; o texto nunca cruza cores intermediárias. */
export function SectionTransition({ from, className = '' }: { from: 'cream' | 'espresso'; className?: string }) {
  return (
    <svg className={`${styles.transition} ${className}`} data-from={from} viewBox="0 0 1440 100"
      preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path d="M0 0h1440v25c-240 38-340 64-640 37S240 7 0 55Z" fill="currentColor" />
    </svg>
  );
}
