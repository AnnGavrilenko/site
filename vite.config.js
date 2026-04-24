import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
export default defineConfig({
    base: '/site/',
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            injectRegister: 'auto',
            includeAssets: ['pwa/logo.jpg', 'pwa/icon.jpg'],
            manifest: {
                name: 'Насенне',
                short_name: 'Насенне',
                description: 'Интернет-магазин Насенне',
                theme_color: '#2f8f30',
                background_color: '#f5f5f0',
                display: 'standalone',
                start_url: '/site/',
                scope: '/site/',
                icons: [
                    {
                        src: '/site/pwa/logo.jpg',
                        type: 'image/jpeg',
                        purpose: 'any',
                    },
                    {
                        src: '/site/pwa/icon.jpg',
                        type: 'image/jpeg',
                        purpose: 'any maskable',
                    },
                ],
            },
            workbox: {
                cleanupOutdatedCaches: true,
                navigateFallback: '/site/index.html',
                runtimeCaching: [
                    {
                        urlPattern: function (_a) {
                            var request = _a.request;
                            return request.destination === 'document';
                        },
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
                        urlPattern: function (_a) {
                            var request = _a.request;
                            return ['style', 'script', 'worker'].includes(request.destination);
                        },
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
                        urlPattern: function (_a) {
                            var request = _a.request;
                            return request.destination === 'image' || request.destination === 'font';
                        },
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
});
