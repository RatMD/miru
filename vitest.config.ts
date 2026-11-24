import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.ts';

export default mergeConfig(
    viteConfig,
    defineConfig({
        // Component tests use Vite's app transforms, never the package library build.
        build: { lib: false },
        test: {
            coverage: {
                provider: 'v8',
                reporter: ['text', 'html', 'lcov'],
                include: [
                    'src/components/**/*.vue',
                    'src/components/**/*.ts',
                    'src/composables/**/*.ts',
                    'src/support/**/*.ts',
                ],
                exclude: ['**/*.stories.ts', '**/index.ts', 'src/support/messages.ts'],
            },
            projects: [
                {
                    extends: true,
                    test: {
                        name: 'node',
                        environment: 'node',
                        include: ['tests/**/*.test.mjs'],
                        maxWorkers: 2,
                        testTimeout: 30000,
                        hookTimeout: 30000,
                    },
                },
                {
                    extends: true,
                    plugins: [
                        storybookTest({
                            configDir: fileURLToPath(new URL('./.storybook', import.meta.url)),
                            storybookScript: 'npm run storybook:dev -- --no-open',
                        }),
                    ],
                    test: {
                        name: 'storybook',
                        maxWorkers: 2,
                        testTimeout: 15000,
                        browser: {
                            enabled: true,
                            headless: true,
                            provider: playwright(),
                            instances: [{ browser: 'chromium' }],
                        },
                    },
                },
            ],
        },
    }),
);
