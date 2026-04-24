import { useEffect, useMemo, useState } from 'react';
import styles from './InstallPwaPrompt.module.css';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
}

function isStandaloneMode(): boolean {
  const isMediaStandalone = window.matchMedia('(display-mode: standalone)').matches;
  const isIosStandalone = 'standalone' in navigator && Boolean((navigator as Navigator & { standalone?: boolean }).standalone);
  return isMediaStandalone || isIosStandalone;
}

export function InstallPwaPrompt(): JSX.Element | null {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);

  useEffect(() => {
    setIsInstalled(isStandaloneMode());

    const onBeforeInstallPrompt = (event: Event): void => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
      setIsDismissed(false);
    };

    const onAppInstalled = (): void => {
      setDeferredPrompt(null);
      setIsInstalled(true);
      setIsDismissed(true);
    };

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    window.addEventListener('appinstalled', onAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
      window.removeEventListener('appinstalled', onAppInstalled);
    };
  }, []);

  const canShowPrompt = useMemo(() => {
    return Boolean(deferredPrompt) && !isInstalled && !isDismissed;
  }, [deferredPrompt, isInstalled, isDismissed]);

  const handleInstall = async (): Promise<void> => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;

    setDeferredPrompt(null);
    setIsDismissed(choice.outcome !== 'accepted');
  };

  if (!canShowPrompt) {
    return null;
  }

  return (
    <div className={styles.container}>
      <button type="button" className={styles.button} onClick={handleInstall}>
        Установить приложение
      </button>
    </div>
  );
}
