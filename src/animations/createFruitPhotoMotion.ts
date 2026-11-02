import { gsap } from 'gsap';

export interface FruitPhotoController {
  setPlaying: (playing: boolean) => void;
  dispose: () => void;
}

export function createFruitPhotoMotion(frame: HTMLElement, image: HTMLImageElement): FruitPhotoController {
  const wide = matchMedia('(min-width: 48rem)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let tween: gsap.core.Tween | undefined;
  let playing = false;
  let elapsed = 0;

  const sync = () => {
    const active = playing && !reduced.matches;
    tween?.paused(!active);
    frame.dataset.cameraPlaying = String(active && Boolean(tween));
  };
  const rebuild = () => {
    if (tween) { elapsed = tween.totalTime(); tween.revert(); tween = undefined; }
    if (!reduced.matches) {
      // Os mesmos tokens definem a pose CSS inicial: nenhum salto ao carregar o motor.
      const style = getComputedStyle(frame);
      const read = (token: string, fallback: number) => {
        const value = Number.parseFloat(style.getPropertyValue(`--fruit-camera-${token}`));
        return Number.isFinite(value) ? value : fallback;
      };
      const pan = read('pan', .9), float = read('float', .12);
      tween = gsap.fromTo(image, {
        x: 0, y: 0,
        xPercent: pan, yPercent: -float,
        scale: read('scale-from', 1.045), transformOrigin: '50% 50%',
      }, {
        id: 'coffe-fruit-camera',
        xPercent: -pan, yPercent: float,
        scale: read('scale-to', 1.06),
        duration: Math.max(.5, read('cycle', 10) / 2),
        ease: 'sine.inOut',
        repeat: -1, yoyo: true, repeatDelay: 0, force3D: true, paused: true,
      });
      tween.totalTime(elapsed, true);
    }
    sync();
  };
  wide.addEventListener('change', rebuild);
  reduced.addEventListener('change', rebuild);
  rebuild();

  return {
    setPlaying(value) { playing = value; sync(); },
    dispose() {
      wide.removeEventListener('change', rebuild);
      reduced.removeEventListener('change', rebuild);
      tween?.revert(); tween = undefined;
      delete frame.dataset.cameraPlaying;
    },
  };
}
