import { useEffect, useRef, useState } from 'react';

/** Carrega o motor apenas quando a jornada se aproxima, com cleanup seguro. */
export function useJourneyScroll() {
  const journeyRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const root = journeyRef.current;
    if (!root) return;

    let cancelled = false;
    let loading = false;
    let dispose: (() => void) | undefined;
    let observer: IntersectionObserver | undefined;

    const activate = async () => {
      if (loading || cancelled) return;
      loading = true;
      observer?.disconnect();

      try {
        const { createJourneyAnimation } = await import('../animations/createJourneyAnimation');
        if (cancelled) return;
        dispose = createJourneyAnimation(root, index => {
          if (!cancelled) setActiveIndex(index);
        });
      } catch {
        // O percurso e suas âncoras continuam legíveis se o chunk não carregar.
        if (!cancelled) root.dataset.motion = 'static';
      }
    };

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) void activate();
      }, { rootMargin: '900px 0px' });
      observer.observe(root);
    } else {
      void activate();
    }
    root.addEventListener('focusin', activate);

    return () => {
      cancelled = true;
      observer?.disconnect();
      root.removeEventListener('focusin', activate);
      dispose?.();
    };
  }, []);

  return { journeyRef, activeIndex };
}
