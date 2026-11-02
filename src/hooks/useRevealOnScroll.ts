import { useEffect, useRef } from 'react';
import { readMotionSettings } from '../animations/motionSettings';

/** Revela uma vez, sem ocultar conteúdo antes do observer ou do JavaScript. */
export function useRevealOnScroll() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !('IntersectionObserver' in window)) return;

    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const elements = root.querySelectorAll<HTMLElement>('[data-motion-reveal]');
    const seen = new WeakSet<Element>();
    const animations = new Map<Element, Animation>();
    const observer = new IntersectionObserver(entries => {
      const motion = readMotionSettings();
      let stagger = 0;
      for (const entry of entries) {
        if (!entry.isIntersecting) {
          animations.get(entry.target)?.cancel();
          animations.delete(entry.target);
          if (seen.has(entry.target)) observer.unobserve(entry.target);
          continue;
        }
        if (seen.has(entry.target)) continue;
        seen.add(entry.target);
        if (preference.matches || document.hidden || entry.target.contains(document.activeElement)) {
          observer.unobserve(entry.target);
          continue;
        }

        const animation = entry.target.animate(
          [{ opacity: .6, transform: `translateY(${motion.distance}px)` }, { opacity: 1, transform: 'translateY(0)' }],
          { duration: motion.reveal, delay: Math.min(stagger++, 2) * motion.stagger, easing: motion.easing },
        );
        animations.set(entry.target, animation);
        animation.onfinish = () => { animations.delete(entry.target); observer.unobserve(entry.target); };
      }
    }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });

    const updatePreference = () => {
      observer.disconnect();
      animations.forEach(animation => animation.cancel());
      animations.clear();
      if (!preference.matches) elements.forEach(element => { if (!seen.has(element)) observer.observe(element); });
    };

    const handleFocus = (event: FocusEvent) => {
      animations.forEach((animation, element) => {
        if (event.target instanceof Node && element.contains(event.target)) {
          animation.cancel();
          animations.delete(element);
          observer.unobserve(element);
        }
      });
    };
    const handleVisibility = () => {
      if (!document.hidden) return;
      animations.forEach((animation, element) => { animation.cancel(); observer.unobserve(element); });
      animations.clear();
    };

    updatePreference();
    preference.addEventListener('change', updatePreference);
    root.addEventListener('focusin', handleFocus);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      observer.disconnect();
      animations.forEach(animation => animation.cancel());
      preference.removeEventListener('change', updatePreference);
      root.removeEventListener('focusin', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return rootRef;
}
