import type { ComponentProps } from 'react';
import type { AromaId } from '../../types/coffee';

interface AromaIllustrationProps extends ComponentProps<'svg'> {
  aroma: AromaId;
}

/** Desenhos próprios: a mesma linguagem visual no mapa e no detalhe ampliado. */
export function AromaIllustration({ aroma, ...props }: AromaIllustrationProps) {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" stroke="currentColor"
      strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...props}>
      {aroma === 'chocolate' && <>
        <path d="m18 45 45-24 40 39-48 28Z" fill="currentColor" fillOpacity=".12" />
        <path d="m18 45 45-24 40 39-48 28Zm0 0v15l37 43 48-28V60M55 88v15M33 37l39 42M48 29l40 42M30 58l46-25M42 73l47-26" />
        <path d="m8 91 13-7 8 10-13 7Zm82 5 10 5-8 8" opacity=".65" />
      </>}
      {aroma === 'caramelo' && <>
        <ellipse cx="61" cy="88" rx="40" ry="15" fill="currentColor" fillOpacity=".13" />
        <path d="M21 88c0-20 80-20 80 0s-80 20-80 0Zm13 0c8-10 45-11 56-1M53 21l45 13m-42-9c-10 18-17 21-13 32 4 12 23 12 23-1 0-8-8-17-10-31Z" />
        <path d="M55 62v22m11-47 27 8" opacity=".65" />
        <path d="m12 61 16-6 13 10-17 6Zm0 0v12l12 10 17-6V65M24 71v12" />
      </>}
      {aroma === 'castanhas' && <>
        <path d="M34 20C3 40 14 83 43 83c26 0 34-43-9-63Z" fill="currentColor" fillOpacity=".1" />
        <path d="M34 20C3 40 14 83 43 83c26 0 34-43-9-63Zm0 2c-4 18-7 40 8 59M26 36c-9 21-6 30 0 37m17-34c13 22 11 29 7 35" />
        <path d="M72 66c-23 6-19 36 5 38 24 1 35-29 15-40-7-4-13-3-20 2Z" fill="currentColor" fillOpacity=".12" />
        <path d="M72 66c-23 6-19 36 5 38 24 1 35-29 15-40-7-4-13-3-20 2Zm-2 4c-13 19-1 27 9 29M75 65c-6-12 3-15 8-17m-1 17c17-2 24-15 9-21-6 9-8 14-9 21Z" />
      </>}
      {aroma === 'citricos' && <>
        <circle cx="54" cy="70" r="36" fill="currentColor" fillOpacity=".1" />
        <circle cx="54" cy="70" r="36" /><circle cx="54" cy="70" r="29" />
        <path d="M54 43v54M27 70h54M35 51l38 38M35 89l38-38M63 33c-2-12 6-21 12-22M72 31c27 7 37-14 12-20-1 11-5 17-12 20Z" />
        <path d="m45 50-4 7m29 8-7 2m-4 18-2-8M36 78l7-4" opacity=".65" />
      </>}
      {aroma === 'flores' && <>
        <path d="M61 110V68m0 23c-22 4-32-13-9-17m9 27c24 7 34-16 9-18" />
        <ellipse cx="60" cy="29" rx="10" ry="17" fill="currentColor" fillOpacity=".09" />
        <ellipse cx="60" cy="29" rx="10" ry="17" />
        <ellipse cx="38" cy="43" rx="17" ry="10" transform="rotate(24 38 43)" />
        <ellipse cx="82" cy="43" rx="17" ry="10" transform="rotate(-24 82 43)" />
        <ellipse cx="46" cy="65" rx="10" ry="17" transform="rotate(40 46 65)" />
        <ellipse cx="74" cy="65" rx="10" ry="17" transform="rotate(-40 74 65)" />
        <circle cx="60" cy="49" r="9" fill="currentColor" fillOpacity=".16" />
        <path d="m28 20 3-5m64 70 5 2M17 83l4-2" opacity=".5" />
      </>}
      {aroma === 'especiarias' && <>
        <path d="m29 80 47-53c5-6 19 3 14 11L47 94c-8 10-26-5-18-14Z" fill="currentColor" fillOpacity=".1" />
        <path d="m29 80 47-53c5-6 19 3 14 11L47 94c-8 10-26-5-18-14Zm8 6 48-54M31 86c-1-7 12-8 11 0-1 9-14 5-13-1" />
        <path d="m80 69 5 12 13-4-7 13 9 10-14-1-4 14-6-12-13 5 7-13-10-10 14 1Z" fill="currentColor" fillOpacity=".08" />
        <circle cx="81" cy="91" r="4" />
        <path d="M27 45 14 27m2-7c-8 2-8 10-1 12 9 3 12-9 1-12Zm24-5 7 13m-1-19c-6-3-11 3-6 8 6 6 14-2 6-8Z" />
      </>}
    </svg>
  );
}
