/** CSS centraliza durações e amplitudes, inclusive nos breakpoints. */
export function readMotionSettings() {
  const style = getComputedStyle(document.documentElement);
  const number = (token: string) => Number.parseFloat(style.getPropertyValue(token)) || 0;
  return {
    reveal: number('--motion-duration-reveal'),
    atmosphere: number('--motion-duration-atmosphere'),
    stagger: number('--motion-stagger'),
    distance: number('--motion-distance'),
    easing: style.getPropertyValue('--ease-out').trim(),
  };
}
