import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './app/AppRouter';
import { DisplayModeClassManager } from './components/pwa/DisplayModeClassManager/DisplayModeClassManager';
import { InstallAppBanner } from './components/pwa/InstallAppBanner/InstallAppBanner';
import { PwaUpdatePrompt } from './components/pwa/PwaUpdatePrompt/PwaUpdatePrompt';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <DisplayModeClassManager />
      <AppRouter />
      <InstallAppBanner />
      <PwaUpdatePrompt />
    </BrowserRouter>
  </React.StrictMode>,
);
