import { useEffect, useState } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { useDisplayMode } from '../../../shared/hooks/useDisplayMode';
import styles from './PwaUpdatePrompt.module.css';

export function PwaUpdatePrompt(): JSX.Element | null {
  const { isStandalone } = useDisplayMode();
  const [isDismissed, setIsDismissed] = useState(false);
  const { needRefresh, updateServiceWorker } = useRegisterSW({
    onRegisteredSW(_swUrl, registration) {
      if (!registration) return;

      // Periodically check for updates while app is open.
      window.setInterval(() => {
        void registration.update();
      }, 60 * 1000);
    },
  });

  useEffect(() => {
    if (needRefresh) {
      setIsDismissed(false);
    }
  }, [needRefresh]);

  const showPrompt = isStandalone && needRefresh && !isDismissed;

  if (!showPrompt) {
    return null;
  }

  return (
    <aside className={styles.banner}>
      <div className={styles.head}>
        <p className={styles.title}>Доступно обновление приложения</p>
        <button aria-label="Закрыть уведомление обновления" className={styles.close} onClick={() => setIsDismissed(true)} type="button">
          ×
        </button>
      </div>
      <div className={styles.actions}>
        <button
          className={styles.update}
          onClick={() => {
            void updateServiceWorker(true);
          }}
          type="button"
        >
          Обновить
        </button>
      </div>
    </aside>
  );
}
