import { useEffect, useRef } from 'react';

/** Revela uma vez, sem ocultar conteúdo antes do observer ou do JavaScript. */
export function useRevealOnScroll() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !('IntersectionObserver' in window)) return;

    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const elements = root.querySelectorAll<HTMLElement>('[data-discovery-reveal]');
    const seen = new WeakSet<Element>();
    const animations = new Set<Animation>();
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        seen.add(entry.target);
        if (preference.matches || entry.target.contains(document.activeElement)) continue;

        const animation = entry.target.animate(
          [{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'translateY(0)' }],
          { duration: 600, easing: 'cubic-bezier(0.2, 0.7, 0.3, 1)' },
        );
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      }
    }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });

    const updatePreference = () => {
      observer.disconnect();
      animations.forEach(animation => animation.cancel());
      animations.clear();
      if (!preference.matches) elements.forEach(element => { if (!seen.has(element)) observer.observe(element); });
    };

    updatePreference();
    preference.addEventListener('change', updatePreference);
    return () => {
      observer.disconnect();
      animations.forEach(animation => animation.cancel());
      preference.removeEventListener('change', updatePreference);
    };
  }, []);

  return rootRef;
}
