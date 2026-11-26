import type { StorybookConfig } from '@storybook/vue3-vite';

const config: StorybookConfig = {
    stories: [
        '../src/**/*.stories.ts',
        '../src/docs/installation-guide.mdx',
        './reference/**/*.mdx',
    ],
    addons: [
        '@storybook/addon-docs',
        '@storybook/addon-a11y',
        '@storybook/addon-themes',
        '@storybook/addon-vitest',
    ],
    framework: { name: '@storybook/vue3-vite', options: { docgen: 'vue-component-meta' } },
    core: { disableTelemetry: true },
    async viteFinal(config) {
        // Keep the library output configuration separate from the Storybook app.
        config.build = { ...config.build, lib: undefined };
        // The preview imports setup(); optimize it up front to avoid a mid-test/dev reload.
        config.optimizeDeps = {
            ...config.optimizeDeps,
            include: [
                ...new Set([
                    ...(config.optimizeDeps?.include ?? []),
                    '@storybook/vue3',
                    'storybook/theming',
                ]),
            ],
        };
        return config;
    },
};

export default config;
