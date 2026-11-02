import { useEffect, useRef, useState } from 'react';

/** Efeito ligado ao scroll, sem loop de renderização React ou rAF contínuo. */
export function useHeroMotion() {
  const heroRef = useRef<HTMLElement>(null);
  const [hasReducedMotion, setHasReducedMotion] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const motionEnabled = !hasReducedMotion && !isPaused;

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setHasReducedMotion(preference.matches);
    updatePreference();
    preference.addEventListener('change', updatePreference);
    return () => preference.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    if (!motionEnabled) {
      hero.style.removeProperty('--hero-progress');
      return;
    }

    let inView = false;
    let frame = 0;

    const update = () => {
      frame = 0;
      if (!inView || document.hidden) return;
      const rect = hero.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / Math.max(rect.height, 1)));
      hero.style.setProperty('--hero-progress', progress.toFixed(4));
    };
    const scheduleUpdate = () => {
      if (!frame && inView && !document.hidden) frame = requestAnimationFrame(update);
    };
    const updateVisibility = () => {
      hero.dataset.inView = String(inView && !document.hidden);
      scheduleUpdate();
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      updateVisibility();
    });

    observer.observe(hero);
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });
    document.addEventListener('visibilitychange', updateVisibility);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      document.removeEventListener('visibilitychange', updateVisibility);
      hero.style.removeProperty('--hero-progress');
      delete hero.dataset.inView;
    };
  }, [motionEnabled]);

  return { heroRef, hasReducedMotion, isPaused, motionEnabled, toggleMotion: () => setIsPaused(value => !value) };
}
