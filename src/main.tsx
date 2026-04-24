import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { registerSW } from 'virtual:pwa-register';
import { AppRouter } from './app/AppRouter';
import { DisplayModeClassManager } from './components/pwa/DisplayModeClassManager/DisplayModeClassManager';
import { InstallAppBanner } from './components/pwa/InstallAppBanner/InstallAppBanner';
import './styles/global.css';

registerSW({ immediate: true });

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <DisplayModeClassManager />
      <AppRouter />
      <InstallAppBanner />
    </BrowserRouter>
  </React.StrictMode>,
);
