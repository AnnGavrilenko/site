import { useEffect, useMemo, useState } from 'react';
import { useDisplayMode } from '../../../shared/hooks/useDisplayMode';
import type { BeforeInstallPromptEvent } from '../../../shared/types/pwa';
import styles from './InstallAppBanner.module.css';

const SESSION_DISMISSED_KEY = 'install-banner-dismissed';
const SESSION_INSTALLED_KEY = 'install-banner-installed';

export function InstallAppBanner(): JSX.Element | null {
  const { isStandalone, isMobileDevice } = useDisplayMode();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isSessionDismissed, setIsSessionDismissed] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    setIsSessionDismissed(sessionStorage.getItem(SESSION_DISMISSED_KEY) === '1');
    setIsInstalled(sessionStorage.getItem(SESSION_INSTALLED_KEY) === '1');
  }, []);

  useEffect(() => {
    const onBeforeInstallPrompt = (event: Event): void => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
    };

    const onAppInstalled = (): void => {
      sessionStorage.setItem(SESSION_INSTALLED_KEY, '1');
      setDeferredPrompt(null);
      setIsInstalled(true);
      setIsSessionDismissed(true);
    };

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    window.addEventListener('appinstalled', onAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
      window.removeEventListener('appinstalled', onAppInstalled);
    };
  }, []);

  const closeBanner = (): void => {
    sessionStorage.setItem(SESSION_DISMISSED_KEY, '1');
    setIsSessionDismissed(true);
  };

  const handleInstall = async (): Promise<void> => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    closeBanner();
    setDeferredPrompt(null);
  };

  const shouldShow = useMemo(() => {
    return isMobileDevice && !isStandalone && !isInstalled && !isSessionDismissed;
  }, [isMobileDevice, isStandalone, isInstalled, isSessionDismissed]);

  if (!shouldShow) {
    return null;
  }

  return (
    <aside className={styles.banner}>
      <div className={styles.head}>
        <div>
          <p className={styles.title}>Скачать приложение</p>
          <p className={styles.text}>Откройте магазин Насенне как приложение на телефоне.</p>
        </div>
        <button aria-label="Закрыть баннер установки" className={styles.close} onClick={closeBanner} type="button">
          ×
        </button>
      </div>

      {deferredPrompt ? (
        <div className={styles.actions}>
          <button className={styles.installButton} onClick={handleInstall} type="button">
            Установить
          </button>
        </div>
      ) : (
        <p className={styles.hint}>Если кнопка установки еще недоступна, откройте меню Chrome и выберите «Установить приложение».</p>
      )}
    </aside>
  );
}
