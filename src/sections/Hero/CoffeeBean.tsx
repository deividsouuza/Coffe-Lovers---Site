/** Elemento editorial em SVG, compatível com as divisórias do design system. */
export function CoffeeBean() {
  return (
    <svg width="48" height="64" viewBox="0 0 48 64" fill="none" aria-hidden="true" focusable="false">
      <path d="M35 5C21-1 7 11 5 29 2 47 12 61 25 59c13-2 21-17 19-32C43 16 41 9 35 5Z"
        fill="var(--color-roasted)" stroke="var(--color-caramel)" strokeWidth="1.2" />
      <path d="M32 7c-17 12-1 31-16 49" stroke="var(--color-caramel)" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M19 10c-7 5-11 13-11 22M38 35c0 8-4 16-10 20" stroke="var(--color-caramel)" strokeOpacity=".35" strokeLinecap="round" />
    </svg>
  );
}
