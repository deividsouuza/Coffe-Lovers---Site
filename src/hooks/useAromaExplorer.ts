import { useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import type { AromaId } from '../types/coffee';

export function useAromaExplorer() {
  const [activeId, setActiveId] = useState<AromaId | null>(null);
  const buttonRefs = useRef(new Map<AromaId, HTMLButtonElement>());

  function toggleAroma(id: AromaId) {
    setActiveId(current => current === id ? null : id);
  }

  function closeAroma() {
    if (activeId) {
      const button = buttonRefs.current.get(activeId);
      button?.focus({ preventScroll: true });
      // Evita rolagem suave concorrente com a mudança de altura do painel.
      button?.scrollIntoView({ block: 'nearest', behavior: 'instant' });
    }
    setActiveId(null);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === 'Escape' && activeId) {
      event.preventDefault();
      event.stopPropagation();
      closeAroma();
    }
  }

  return { activeId, buttonRefs, toggleAroma, closeAroma, handleKeyDown };
}
