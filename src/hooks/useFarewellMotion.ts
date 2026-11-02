import { useEffect, useRef } from 'react';

/** Um único movimento breve; o conteúdo permanece visível sem animação. */
export function useFarewellMotion() {
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || !('IntersectionObserver' in window)) return;

    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const animations = new Set<Animation>();
    let played = false;

    const cancel = () => {
      animations.forEach(animation => animation.cancel());
      animations.clear();
    };
    const animate = (element: Element | null, keyframes: Keyframe[], duration: number) => {
      if (!element) return;
      const animation = element.animate(keyframes, { duration, easing: 'cubic-bezier(0.2, 0.7, 0.3, 1)' });
      animations.add(animation);
      animation.onfinish = () => animations.delete(animation);
    };
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) { cancel(); continue; }
        if (played || preference.matches || document.hidden) continue;
        played = true;
        animate(frame.querySelector('[data-farewell-photo]'), [
          { transform: 'scale(1.025)' }, { transform: 'scale(1)' },
        ], 4500);
        animate(frame.querySelector('[data-farewell-steam]'), [
          { opacity: .025, transform: 'translateY(6px) scaleX(.97)' },
          { opacity: .15, transform: 'translateY(-2px) scaleX(1.03)', offset: .45 },
          { opacity: .07, transform: 'translateY(-8px) scaleX(1)' },
        ], 4500);
      }
    }, { threshold: .15 });

    const updatePreference = () => { if (preference.matches) cancel(); };
    const handleVisibility = () => { if (document.hidden) cancel(); };
    observer.observe(frame);
    preference.addEventListener('change', updatePreference);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      observer.disconnect();
      cancel();
      preference.removeEventListener('change', updatePreference);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return frameRef;
}
