import { profileContent } from '../../data/profileContent';
import type { ProfileStorageStatus } from '../../hooks/useCoffeeProfile';
import styles from './Perfis.module.css';

interface ProfileMemoryProps {
  remember: boolean;
  status: ProfileStorageStatus;
  onChange: (remember: boolean) => void;
}

export function ProfileMemory({ remember, status, onChange }: ProfileMemoryProps) {
  return (
    <div className={styles.memory}>
      <label className={styles.memoryLabel}>
        <input type="checkbox" checked={remember} onChange={event => onChange(event.target.checked)} aria-describedby="perfil-memoria-status" />
        {profileContent.rememberLabel}
      </label>
      <p id="perfil-memoria-status" className={styles.memoryStatus} role="status">{profileContent.storageMessages[status]}</p>
    </div>
  );
}
