import { useEffect, useState } from 'react';
import type { CoffeeProfileId } from '../types/coffee';

/** Carrega cenas ao escolher; mantém a última foto pronta durante a próxima carga. */
export function useProfileImages(targetId: CoffeeProfileId) {
  const [requested, setRequested] = useState<ReadonlySet<CoffeeProfileId>>(() => new Set([targetId]));
  const [loaded, setLoaded] = useState<ReadonlySet<CoffeeProfileId>>(() => new Set());
  const [fallbackId, setFallbackId] = useState(targetId);
  const [failed, setFailed] = useState<ReadonlySet<CoffeeProfileId>>(() => new Set());

  useEffect(() => {
    setRequested(previous => previous.has(targetId) ? previous : new Set([...previous, targetId]));
    if (loaded.has(targetId)) setFallbackId(targetId);
  }, [targetId, loaded]);

  function handleLoad(id: CoffeeProfileId) {
    setLoaded(previous => previous.has(id) ? previous : new Set([...previous, id]));
    setFailed(previous => { const next = new Set(previous); next.delete(id); return next; });
  }

  return {
    shouldLoad: (id: CoffeeProfileId) => id === targetId || requested.has(id),
    displayedId: loaded.has(targetId) ? targetId : fallbackId,
    failed: failed.has(targetId),
    handleLoad,
    handleError: (id: CoffeeProfileId) => setFailed(previous => new Set([...previous, id])),
  };
}
