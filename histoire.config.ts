import { defineConfig } from 'histoire';
import { HstVue } from '@histoire/plugin-vue';

export default defineConfig({
    setupFile: 'histoire.setup.ts',
    storyIgnored: [
        '**/dist/**',
        '**/node_modules/**',
        '**/src/**/_*'
    ],
    plugins: [
        HstVue(),
    ],
    vite: {
        server: {
            port: 6066
        }
    }
});
