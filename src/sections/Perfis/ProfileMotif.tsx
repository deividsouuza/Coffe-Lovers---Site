import type { CoffeeProfileId } from '../../types/coffee';

export function ProfileMotif({ profile }: { profile: CoffeeProfileId }) {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" stroke="currentColor"
      strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {profile === 'suave' && <>
        <path d="M58 110V57m0 25C27 88 30 65 58 74m0 18c25 7 33-15 0-11" />
        <circle cx="58" cy="45" r="7" />
        <ellipse cx="58" cy="25" rx="8" ry="13" />
        <ellipse cx="39" cy="39" rx="13" ry="8" transform="rotate(25 39 39)" />
        <ellipse cx="76" cy="39" rx="13" ry="8" transform="rotate(-25 76 39)" />
        <ellipse cx="46" cy="61" rx="8" ry="13" transform="rotate(40 46 61)" />
        <ellipse cx="70" cy="61" rx="8" ry="13" transform="rotate(-40 70 61)" />
      </>}
      {profile === 'intenso' && <>
        <path d="m20 50 48-25 34 38-51 29Zm0 0v14l31 41 51-28V63M51 92v13m-17-62 34 40m-18-48 34 39M32 64l49-26M43 77l49-26" />
        <path d="M17 32c8-11 12-9 16-17m59 82 8 8m-84-9 9-5" opacity=".5" />
      </>}
      {profile === 'aromatico' && <>
        <path d="M24 110c2-40 61-48 65-98M45 78c-29-5-28-26-3-17m21-2c24 1 33-17 8-16M81 31c-23-5-23-23-3-18" />
        <circle cx="39" cy="44" r="10" /><circle cx="27" cy="54" r="8" /><circle cx="82" cy="84" r="12" />
        <path d="m82 71 3-8m-11 8 7 2M36 32l-1-8" />
      </>}
    </svg>
  );
}
