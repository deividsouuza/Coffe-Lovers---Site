import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent, MouseEvent } from 'react';

export function useDialogMenu() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const desktopFocusRef = useRef<HTMLAnchorElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  function openMenu() {
    dialogRef.current?.showModal();
    setIsOpen(true);
  }

  function closeMenu() {
    dialogRef.current?.close();
    setIsOpen(false);
  }

  function handleNavigate(event: MouseEvent<HTMLAnchorElement>) {
    closeMenu();
    // Mantém a navegação nativa e acompanha o destino com o foco.
    document.getElementById(event.currentTarget.hash.slice(1))?.focus({ preventScroll: true });
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== 'Tab') return;

    const controls = event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]');
    const first = controls[0];
    const last = controls[controls.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const desktop = window.matchMedia('(min-width: 64rem)');
    const handleResize = () => {
      if (desktop.matches) {
        dialogRef.current?.close();
        setIsOpen(false);
        desktopFocusRef.current?.focus({ preventScroll: true });
      }
    };
    desktop.addEventListener('change', handleResize);
    handleResize();

    return () => {
      document.body.style.overflow = previousOverflow;
      desktop.removeEventListener('change', handleResize);
    };
  }, [isOpen]);

  return { dialogRef, desktopFocusRef, isOpen, openMenu, closeMenu, handleNavigate, handleKeyDown, handleClose: () => setIsOpen(false) };
}
