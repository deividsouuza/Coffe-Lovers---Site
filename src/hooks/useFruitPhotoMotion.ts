import { useEffect, useRef, useState } from 'react';
import type { FruitPhotoController } from '../animations/createFruitPhotoMotion';

export function useFruitPhotoMotion(enabled: boolean) {
  const frameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true);
  const pausedRef = useRef(paused);
  const syncRef = useRef<(() => void) | null>(null);
  useEffect(() => { pausedRef.current = paused; syncRef.current?.(); }, [paused]);

  useEffect(() => {
    const frame = frameRef.current, image = imageRef.current;
    if (!enabled || !frame || !image || !('IntersectionObserver' in window)) return;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    let disposed = false, visible = false, loading = false, failed = false;
    let controller: FruitPhotoController | undefined;
    const sync = () => controller?.setPlaying(visible && !pausedRef.current && !preference.matches && !document.hidden);
    const start = async () => {
      if (disposed || loading || failed || controller || !visible || preference.matches || !image.complete || !image.naturalWidth) return;
      loading = true;
      try {
        const { createFruitPhotoMotion } = await import('../animations/createFruitPhotoMotion');
        if (disposed || !visible || preference.matches) return;
        controller = createFruitPhotoMotion(frame, image);
        sync();
      } catch { failed = true; }
      finally { loading = false; }
    };
    const updatePreference = () => {
      setReduced(preference.matches);
      if (preference.matches && frame.contains(document.activeElement)) image.focus({ preventScroll: true });
      sync(); void start();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync(); void start();
    }, { threshold: 0 });
    const handleLoad = () => { void start(); };
    const handleVisibility = () => { sync(); if (!document.hidden) void start(); };
    syncRef.current = sync;
    updatePreference(); observer.observe(frame);
    image.addEventListener('load', handleLoad);
    preference.addEventListener('change', updatePreference);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      disposed = true; syncRef.current = null;
      observer.disconnect(); controller?.dispose();
      image.removeEventListener('load', handleLoad);
      preference.removeEventListener('change', updatePreference);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [enabled]);

  return { frameRef, imageRef, paused, showControl: enabled && !reduced, toggle: () => setPaused(value => !value) };
}
