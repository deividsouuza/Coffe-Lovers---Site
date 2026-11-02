import { useEffect, useRef } from 'react';

/** Mantém as âncoras visíveis mesmo quando zoom ou fontes mudam o header. */
export function useHeaderOffset() {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const updateOffset = () => {
      document.documentElement.style.setProperty('--header-offset', `${header.getBoundingClientRect().height}px`);
    };
    const observer = new ResizeObserver(updateOffset);
    observer.observe(header);
    updateOffset();

    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty('--header-offset');
    };
  }, []);

  return headerRef;
}
