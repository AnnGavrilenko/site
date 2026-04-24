import { useEffect, useState } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { useDisplayMode } from '../../../shared/hooks/useDisplayMode';
import styles from './PwaUpdatePrompt.module.css';

const DISMISSED_UPDATE_KEY = 'pwa-update-dismissed-key';
const APPLIED_UPDATE_KEY = 'pwa-update-applied-key';

function fallbackHash(value: string): string {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(16);
}

async function createVersionKey(swUrl: string): Promise<string> {
  const response = await fetch(`${swUrl}?ts=${Date.now()}`, { cache: 'no-store' });
  const swSource = await response.text();

  if ('crypto' in window && 'subtle' in window.crypto) {
    const data = new TextEncoder().encode(swSource);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    const digestBytes = Array.from(new Uint8Array(digest));
    const digestHex = digestBytes.map((byte) => byte.toString(16).padStart(2, '0')).join('');
    return digestHex.slice(0, 20);
  }

  return fallbackHash(swSource);
}

export function PwaUpdatePrompt(): JSX.Element | null {
  const { isStandalone } = useDisplayMode();
  const [swUrl, setSwUrl] = useState<string | null>(null);
  const [updateKey, setUpdateKey] = useState<string | null>(null);
  const [dismissedKey, setDismissedKey] = useState<string | null>(null);
  const [appliedKey, setAppliedKey] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const { needRefresh, updateServiceWorker } = useRegisterSW({
    onRegisteredSW(registeredSwUrl, registration) {
      if (!registration) return;
      setSwUrl(registeredSwUrl);

      // Periodically check for updates while app is open.
      window.setInterval(() => {
        void registration.update();
      }, 60 * 1000);
    },
  });

  useEffect(() => {
    setDismissedKey(localStorage.getItem(DISMISSED_UPDATE_KEY));
    setAppliedKey(localStorage.getItem(APPLIED_UPDATE_KEY));
  }, []);

  useEffect(() => {
    if (!needRefresh) {
      setUpdateKey(null);
      return;
    }

    let cancelled = false;
    const resolvedSwUrl = swUrl ?? `${import.meta.env.BASE_URL}sw.js`;

    void createVersionKey(resolvedSwUrl)
      .then((nextKey) => {
        if (!cancelled) {
          setUpdateKey(nextKey);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setUpdateKey(`fallback:${resolvedSwUrl}`);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [needRefresh, swUrl]);

  const showPrompt =
    isStandalone &&
    needRefresh &&
    !isUpdating &&
    Boolean(updateKey) &&
    updateKey !== dismissedKey &&
    updateKey !== appliedKey;

  if (!showPrompt) {
    return null;
  }

  const closePrompt = (): void => {
    if (!updateKey) return;
    localStorage.setItem(DISMISSED_UPDATE_KEY, updateKey);
    setDismissedKey(updateKey);
  };

  const applyUpdate = async (): Promise<void> => {
    if (!updateKey || isUpdating) return;

    setIsUpdating(true);
    localStorage.setItem(APPLIED_UPDATE_KEY, updateKey);
    setAppliedKey(updateKey);
    await updateServiceWorker(true);
  };

  return (
    <aside className={styles.banner}>
      <div className={styles.head}>
        <p className={styles.title}>Доступно обновление приложения</p>
        <button aria-label="Закрыть уведомление обновления" className={styles.close} onClick={closePrompt} type="button">
          ×
        </button>
      </div>
      <div className={styles.actions}>
        <button className={styles.update} disabled={isUpdating} onClick={() => void applyUpdate()} type="button">
          {isUpdating ? 'Обновление...' : 'Обновить'}
        </button>
      </div>
    </aside>
  );
}
