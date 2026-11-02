import { useState } from 'react';
import { isCoffeeProfileId } from '../data/profileContent';
import type { CoffeeProfileId } from '../types/coffee';

export const PROFILE_STORAGE_KEY = 'coffe-lovers:profile:v1';
export type ProfileStorageStatus = 'session' | 'waiting' | 'saved' | 'save-failed' | 'remove-failed';

function readPreference() {
  try {
    const stored = window.localStorage.getItem(PROFILE_STORAGE_KEY);
    if (isCoffeeProfileId(stored)) return { selectedId: stored, remember: true, status: 'saved' as const };
  } catch {
    // Armazenamento bloqueado não impede a seleção em memória.
  }
  return { selectedId: null, remember: false, status: 'session' as const };
}

export function useCoffeeProfile() {
  const [preference, setPreference] = useState<{
    selectedId: CoffeeProfileId | null;
    remember: boolean;
    status: ProfileStorageStatus;
  }>(readPreference);

  function selectProfile(id: CoffeeProfileId) {
    let status: ProfileStorageStatus = preference.remember ? 'saved' : 'session';
    if (preference.remember) {
      try { window.localStorage.setItem(PROFILE_STORAGE_KEY, id); }
      catch { status = 'save-failed'; }
    }
    setPreference(previous => ({ ...previous, selectedId: id, status }));
  }

  function setRemember(remember: boolean) {
    let status: ProfileStorageStatus = remember ? 'waiting' : 'session';
    try {
      if (!remember) window.localStorage.removeItem(PROFILE_STORAGE_KEY);
      else if (preference.selectedId) {
        window.localStorage.setItem(PROFILE_STORAGE_KEY, preference.selectedId);
        status = 'saved';
      }
    } catch {
      status = remember ? 'save-failed' : 'remove-failed';
    }
    setPreference(previous => ({ ...previous, remember, status }));
  }

  return { ...preference, selectProfile, setRemember };
}
