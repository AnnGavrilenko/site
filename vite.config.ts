import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  const rawBase = process.env.VITE_APP_BASE || env.VITE_APP_BASE || '/';
  const appBase = rawBase.startsWith('/')
    ? rawBase.endsWith('/') ? rawBase : `${rawBase}/`
    : `/${rawBase.endsWith('/') ? rawBase : `${rawBase}/`}`;

  return {
    base: appBase,
    plugins: [
      react(),
      VitePWA({
      registerType: 'prompt',
      injectRegister: 'auto',
      includeAssets: ['pwa/logo.jpg', 'pwa/icon.jpg'],
      manifest: {
        name: 'Насенне',
        short_name: 'Насенне',
        description: 'Интернет-магазин Насенне',
        theme_color: '#2f8f30',
        background_color: '#f5f5f0',
        display: 'standalone',
        start_url: appBase,
        scope: appBase,
        icons: [
          {
            src: `${appBase}pwa/logo.jpg`,
            type: 'image/jpeg',
            purpose: 'any',
          },
          {
            src: `${appBase}pwa/icon.jpg`,
            type: 'image/jpeg',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        cleanupOutdatedCaches: true,
        importScripts: [`${appBase}sw-notifications.js`],
        navigateFallback: `${appBase}index.html`,
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'document',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'pages',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24,
              },
            },
          },
          {
            urlPattern: ({ request }) =>
              ['style', 'script', 'worker'].includes(request.destination),
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'assets',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
          {
            urlPattern: ({ request }) =>
              request.destination === 'image' || request.destination === 'font',
            handler: 'CacheFirst',
            options: {
              cacheName: 'media',
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
        ],
      },
      }),
    ],
  };
});
