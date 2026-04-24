import { useEffect } from 'react';
import { useDisplayMode } from '../../../shared/hooks/useDisplayMode';

export function DisplayModeClassManager(): null {
  const { isStandalone } = useDisplayMode();

  useEffect(() => {
    document.body.classList.toggle('app-standalone-mode', isStandalone);
    document.body.classList.toggle('browser-mobile-mode', !isStandalone);
  }, [isStandalone]);

  return null;
}
