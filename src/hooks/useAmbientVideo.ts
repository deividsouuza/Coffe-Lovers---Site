import { useEffect, useRef, useState } from 'react';

type Connection = EventTarget & { saveData?: boolean; effectiveType?: string };

export function useAmbientVideo(small: string, large: string) {
  const hostRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const pausedRef = useRef(false);
  const syncRef = useRef<(() => void) | null>(null);
  const [paused, setPaused] = useState(false);
  const [available, setAvailable] = useState(false);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const host = hostRef.current, video = videoRef.current;
    if (!host || !video || !('IntersectionObserver' in window)) return;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & { connection?: Connection }).connection;
    let disposed = false, visible = false, failed = false, pending = false, hasSource = false;
    let request = 0;
    const allowed = () => !preference.matches && !connection?.saveData && !['slow-2g', '2g'].includes(connection?.effectiveType ?? '');
    const shouldPlay = () => !disposed && visible && !document.hidden && !pausedRef.current && allowed() && !failed;
    const unload = () => {
      request++; pending = false; video.pause();
      if (hasSource) { video.removeAttribute('src'); video.load(); hasSource = false; }
      if (host.contains(document.activeElement)) imageRef.current?.focus({ preventScroll: true });
      setAvailable(false); setReady(false); setPlaying(false);
    };
    const fail = () => { if (disposed || failed) return; failed = true; unload(); };
    const sync = () => {
      if (disposed) return;
      if (!allowed() || failed) { unload(); return; }
      if (!hasSource && visible && !document.hidden) {
        // A variante é escolhida uma vez por carregamento: resize não baixa outro vídeo.
        video.muted = true;
        video.src = matchMedia('(min-width: 64rem)').matches ? large : small;
        hasSource = true; setAvailable(true);
      }
      if (!shouldPlay()) { request++; pending = false; video.pause(); return; }
      if (!hasSource || pending || !video.paused) return;
      pending = true;
      const token = ++request;
      void video.play().then(() => {
        if (!shouldPlay()) video.pause();
      }).catch((error: unknown) => {
        if (disposed || token !== request) return;
        if (error instanceof DOMException && error.name === 'NotAllowedError') {
          pausedRef.current = true; setPaused(true); setReady(false);
        } else if (!(error instanceof DOMException && error.name === 'AbortError')) fail();
      }).finally(() => { if (token === request) pending = false; });
    };
    const onPlaying = () => {
      if (!shouldPlay()) { video.pause(); return; }
      setReady(true); setPlaying(true);
    };
    const onPause = () => { if (!disposed) setPlaying(false); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    video.addEventListener('playing', onPlaying);
    video.addEventListener('pause', onPause);
    video.addEventListener('error', fail);
    preference.addEventListener('change', sync);
    connection?.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    syncRef.current = sync;
    sync(); observer.observe(host);
    return () => {
      disposed = true; request++; syncRef.current = null;
      observer.disconnect();
      preference.removeEventListener('change', sync);
      connection?.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
      video.removeEventListener('playing', onPlaying);
      video.removeEventListener('pause', onPause);
      video.removeEventListener('error', fail);
      video.pause(); video.removeAttribute('src'); video.load();
    };
  }, [small, large]);

  const toggle = () => {
    pausedRef.current = !pausedRef.current;
    setPaused(pausedRef.current);
    syncRef.current?.();
  };
  return { hostRef, imageRef, videoRef, paused, available, ready, playing, toggle };
}
