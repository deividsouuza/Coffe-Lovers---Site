import { useEffect, useRef, useState } from 'react';
import type { CoffeeScene } from '../three/createCoffeeScene';

export function useCoffeeScene(enabled: boolean, animate: boolean) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const animateRef = useRef(animate);
  const syncRef = useRef<(() => void) | null>(null);
  useEffect(() => { animateRef.current = animate; syncRef.current?.(); },[animate]);

  useEffect(() => {
    const host = sceneRef.current;
    setReady(false);
    if (!enabled || !host || !('IntersectionObserver' in window) || !('ResizeObserver' in window)) return;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (connection?.saveData) return;
    // Cada montagem possui seu canvas/contexto, inclusive no replay do StrictMode.
    const canvas = document.createElement('canvas');
    canvas.setAttribute('aria-hidden','true');
    canvas.style.cssText = 'display:block;width:100%;height:100%';
    host.append(canvas);
    let cancelled = false, started = false, inView = false, lost = false;
    let engine: CoffeeScene | undefined;
    let context: WebGL2RenderingContext | null = null;
    const sync = () => engine?.setRunning(animateRef.current && inView && !document.hidden);
    syncRef.current = sync;
    const release = () => {
      engine?.dispose(); engine = undefined;
      if (context && !context.isContextLost()) context.getExtension('WEBGL_lose_context')?.loseContext();
    };
    const fail = () => { if (lost) return; lost = true; release(); if (!cancelled) setReady(false); };
    const measure = () => { const bounds = host.getBoundingClientRect(); engine?.resize(bounds.width,bounds.height); };
    const start = async () => {
      if (started || cancelled || lost) return;
      started = true;
      try {
        context = canvas.getContext('webgl2',{ antialias: true, alpha: false, powerPreference: 'low-power' });
        if (!context) return;
        const { createCoffeeScene } = await import('../three/createCoffeeScene');
        if (cancelled || lost) { if (!context.isContextLost()) context.getExtension('WEBGL_lose_context')?.loseContext(); return; }
        // Se a pessoa já rolou adiante, a criação GPU espera o retorno ao Hero.
        if (!inView) { started = false; return; }
        engine = createCoffeeScene(canvas,context,fail);
        measure(); sync(); setReady(true);
      } catch { fail(); }
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) void start();
      sync();
    });
    const resize = new ResizeObserver(() => { try { measure(); } catch { fail(); } });
    const contextLost = (event: Event) => { event.preventDefault(); fail(); };
    canvas.addEventListener('webglcontextlost',contextLost);
    observer.observe(host); resize.observe(host);
    document.addEventListener('visibilitychange',sync);
    return () => {
      cancelled = true; observer.disconnect(); resize.disconnect();
      document.removeEventListener('visibilitychange',sync);
      canvas.removeEventListener('webglcontextlost',contextLost);
      syncRef.current = null; release(); canvas.remove();
    };
  },[enabled]);
  return { sceneRef, ready: enabled && ready };
}
