import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { journeyStages } from '../data/journeyContent';

gsap.registerPlugin(ScrollTrigger);

const clamp = (value: number) => Math.min(1, Math.max(0, value));

/** Motor escopado à seção: rolagem natural, sem pin, snap ou smooth scrolling. */
export function createJourneyAnimation(root: HTMLElement, onActive: (index: number) => void) {
  const track = root.querySelector<HTMLElement>('[data-journey-track]');
  const bean = root.querySelector<HTMLElement>('[data-journey-bean]');
  const fill = root.querySelector<HTMLElement>('[data-journey-fill]');
  const cup = root.querySelector<SVGElement>('[data-journey-cup]');
  const progressBar = root.querySelector<HTMLElement>('[data-journey-progress]');
  const progressFill = root.querySelector<HTMLElement>('[data-journey-progress-fill]');
  const points = [...root.querySelectorAll<HTMLElement>('[data-journey-point]')];
  const steps = [...root.querySelectorAll<HTMLElement>('[data-phase]')];
  if (!track || !bean || !fill || !cup || !progressBar || !progressFill || points.length !== journeyStages.length) {
    throw new Error('A estrutura da jornada está incompleta.');
  }

  let disposed = false;
  let refreshFrame = 0;
  const media = gsap.matchMedia();

  media.add({ desktop: '(min-width: 64rem)', reduced: '(prefers-reduced-motion: reduce)', all: 'all' }, context => {
    const desktop = Boolean(context.conditions?.desktop);
    const reduced = Boolean(context.conditions?.reduced);
    root.dataset.motion = reduced ? 'reduced' : 'full';
    let offsets: number[] = [];
    let trackTop = 0;
    let distance = 1;
    let lastActive = -1;
    let lastPercent = -1;

    const focusLine = () => {
      const headerHeight = document.querySelector('body > #root > header')?.getBoundingClientRect().height ?? 0;
      return headerHeight + Math.max(0, window.innerHeight - headerHeight) * 0.42;
    };

    const measure = () => {
      const trackRect = track.getBoundingClientRect();
      trackTop = trackRect.top + window.scrollY;
      offsets = points.map(point => {
        const rect = point.getBoundingClientRect();
        return rect.top + rect.height / 2 - trackRect.top;
      });
      distance = Math.max(1, offsets[offsets.length - 1] - offsets[0]);
      track.style.setProperty('--rail-start', `${offsets[0]}px`);
      track.style.setProperty('--rail-distance', `${distance}px`);
    };

    const render = (progress: number) => {
      const fraction = clamp(progress);
      const y = fraction * distance;
      const position = offsets[0] + y;
      let current = 0;
      while (current < offsets.length - 1 && position >= (offsets[current] + offsets[current + 1]) / 2) current++;
      let segment = 0;
      while (segment < offsets.length - 2 && position > offsets[segment + 1]) segment++;
      const segmentProgress = clamp((position - offsets[segment]) / Math.max(1, offsets[segment + 1] - offsets[segment]));
      const lastSegmentStart = offsets[offsets.length - 2];
      const arrival = clamp(((position - lastSegmentStart) / Math.max(1, offsets[offsets.length - 1] - lastSegmentStart) - 0.45) / 0.55);

      if (!reduced) {
        bean.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) rotate(${(-24 + fraction * 180).toFixed(2)}deg) scale(${1 - arrival * 0.35})`;
        bean.style.opacity = String(1 - arrival);
        bean.style.setProperty('--bean-fill', gsap.utils.interpolate(journeyStages[segment].beanColor, journeyStages[segment + 1].beanColor, segmentProgress));
        cup.style.opacity = String(0.15 + arrival * 0.85);
        cup.style.transform = `translate(-50%, -50%) scale(${0.8 + arrival * 0.2})`;
      }
      fill.style.transform = `scaleY(${fraction})`;
      progressFill.style.transform = `scaleX(${fraction})`;
      const percent = Math.round(fraction * 100);
      if (percent !== lastPercent || current !== lastActive) {
        progressBar.setAttribute('aria-valuenow', String(percent));
        progressBar.setAttribute('aria-valuetext', `${percent}% · ${journeyStages[current].title}`);
        lastPercent = percent;
      }
      if (current !== lastActive) {
        root.dataset.currentStage = journeyStages[current].id;
        onActive(current);
        lastActive = current;
      }
    };

    measure();
    const main = ScrollTrigger.create({
      id: 'coffe-lovers-journey',
      trigger: track,
      start: () => trackTop + offsets[0] - focusLine(),
      end: () => trackTop + offsets[offsets.length - 1] - focusLine(),
      invalidateOnRefresh: true,
      onRefreshInit: measure,
      onRefresh: self => render(self.progress),
      onUpdate: self => render(self.progress),
    });

    if (!reduced) {
      steps.forEach((step, index) => {
        const image = step.querySelector('[data-journey-image]');
        const copy = step.querySelector('[data-journey-copy]');
        const wash = step.querySelector('[data-journey-wash]');
        const trigger = { trigger: step, start: 'top 90%', end: 'center 42%', scrub: true, invalidateOnRefresh: true };
        gsap.fromTo(copy, { y: desktop ? 16 : 6, opacity: 0.9 }, { y: 0, opacity: 1, ease: 'none', scrollTrigger: { ...trigger, id: `journey-copy-${index}` } });
        gsap.fromTo(wash, { opacity: 0.25 }, { opacity: 0.8, ease: 'none', scrollTrigger: { ...trigger, id: `journey-wash-${index}` } });
        if (desktop) {
          gsap.fromTo(image, { y: 16, scale: 1.025, opacity: 0.82 }, {
            y: -12, scale: 1, opacity: 1, ease: 'none',
            scrollTrigger: { trigger: step, start: 'top bottom', end: 'bottom top', scrub: true, id: `journey-image-${index}`, invalidateOnRefresh: true },
          });
        }
      });
    }

    root.dataset.journeyReady = 'true';
    render(main.progress);

    return () => {
      bean.removeAttribute('style');
      fill.removeAttribute('style');
      cup.removeAttribute('style');
      progressFill.removeAttribute('style');
      track.style.removeProperty('--rail-start');
      track.style.removeProperty('--rail-distance');
      delete root.dataset.journeyReady;
      delete root.dataset.motion;
      delete root.dataset.currentStage;
    };
  }, root);

  const scheduleRefresh = () => {
    if (disposed || refreshFrame) return;
    refreshFrame = requestAnimationFrame(() => {
      refreshFrame = 0;
      // O modo seguro aguarda o fim da rolagem antes de reposicionar medidas.
      if (!disposed) ScrollTrigger.refresh(true);
    });
  };
  // Mudanças nas seções anteriores também alteram a posição da jornada.
  const resizeObserver = new ResizeObserver(scheduleRefresh);
  resizeObserver.observe(root.closest('main') ?? root);
  const header = document.querySelector('body > #root > header');
  if (header) resizeObserver.observe(header);
  void document.fonts.ready.then(scheduleRefresh);
  scheduleRefresh();

  return () => {
    disposed = true;
    cancelAnimationFrame(refreshFrame);
    resizeObserver.disconnect();
    media.revert();
  };
}
