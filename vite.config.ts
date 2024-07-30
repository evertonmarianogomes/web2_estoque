import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/ts/index.tsx'],
            refresh: true,
        }),
        react()
    ],

    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.jsx', '.json'],
        alias: {
            '@ziggy-js': 'vendor/tightenco/ziggy'
        }
    },
    optimizeDeps: {
        exclude: ['js-big-decimal']
    }
});
