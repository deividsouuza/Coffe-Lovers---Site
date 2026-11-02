import type { ComponentProps } from 'react';

type IconName = 'arrow-right' | 'arrow-up' | 'arrow-down' | 'menu' | 'close' | 'pause' | 'play';

interface IconProps extends ComponentProps<'svg'> {
  name: IconName;
}

const paths: Record<IconName, string> = {
  'arrow-right': 'M4 12h16m-6-6 6 6-6 6',
  'arrow-up': 'M12 20V4m-6 6 6-6 6 6',
  'arrow-down': 'M12 4v16m-6-6 6 6 6-6',
  menu: 'M4 8h16M4 16h16',
  close: 'm6 6 12 12M6 18 18 6',
  pause: 'M9 5v14M15 5v14',
  play: 'm8 5 11 7-11 7Z',
};

export function Icon({ name, ...props }: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...props}>
      <path d={paths[name]} />
    </svg>
  );
}
