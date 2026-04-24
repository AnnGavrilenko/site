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
            devOptions: {
                enabled: true,
            },
            includeAssets: ['pwa/logo.jpg', 'pwa/icon.jpg'],
            manifest: {
                name: 'Насенне',
                short_name: 'Насенне',
                description: 'Интернет-магазин Насенне',
                theme_color: '#2f8f30',
                background_color: '#f4f4f4',
                display: 'standalone',
                start_url: '/',
                scope: '/',
                icons: [
                    {
                        src: '/pwa/logo.jpg',
                        sizes: '900x900',
                        type: 'image/jpeg',
                        purpose: 'any',
                    },
                    {
                        src: '/pwa/logo.jpg',
                        sizes: '900x900',
                        type: 'image/jpeg',
                        purpose: 'maskable',
                    },
                ],
                screenshots: [
                    {
                        src: '/pwa/icon.jpg',
                        sizes: '600x599',
                        type: 'image/jpeg',
                        form_factor: 'wide',
                    },
                ],
            },
            workbox: {
                navigateFallback: '/index.html',
                cleanupOutdatedCaches: true,
            },
        }),
    ],
});
