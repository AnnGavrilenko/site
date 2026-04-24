import { useEffect, useState } from 'react';

type DisplayModeState = {
  isStandalone: boolean;
  isMobileDevice: boolean;
};

function detectStandaloneMode(): boolean {
  const mediaStandalone = window.matchMedia('(display-mode: standalone)').matches;
  const iosStandalone = 'standalone' in navigator && Boolean((navigator as Navigator & { standalone?: boolean }).standalone);
  return mediaStandalone || iosStandalone;
}

function detectMobileDevice(): boolean {
  const uaMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  const coarseMobile = window.matchMedia('(max-width: 900px)').matches && window.matchMedia('(pointer: coarse)').matches;
  return uaMobile || coarseMobile;
}

export function useDisplayMode(): DisplayModeState {
  const [state, setState] = useState<DisplayModeState>(() => ({
    isStandalone: detectStandaloneMode(),
    isMobileDevice: detectMobileDevice(),
  }));

  useEffect(() => {
    const mediaDisplay = window.matchMedia('(display-mode: standalone)');
    const mediaViewport = window.matchMedia('(max-width: 900px)');
    const mediaPointer = window.matchMedia('(pointer: coarse)');

    const updateState = (): void => {
      setState({
        isStandalone: detectStandaloneMode(),
        isMobileDevice: detectMobileDevice(),
      });
    };

    mediaDisplay.addEventListener('change', updateState);
    mediaViewport.addEventListener('change', updateState);
    mediaPointer.addEventListener('change', updateState);
    window.addEventListener('resize', updateState);

    return () => {
      mediaDisplay.removeEventListener('change', updateState);
      mediaViewport.removeEventListener('change', updateState);
      mediaPointer.removeEventListener('change', updateState);
      window.removeEventListener('resize', updateState);
    };
  }, []);

  return state;
}
