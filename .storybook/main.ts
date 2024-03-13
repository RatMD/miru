import type { StorybookConfig } from "@storybook/vue3-vite";

const config: StorybookConfig = {
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions"
    ],
    core:  {
        disableTelemetry: true
    },
    docs: {
        autodocs: "tag",
    },
    framework: {
        name: "@storybook/vue3-vite",
        options: {},
    },
    stories: [
        "../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)"
    ],
};
export default config;
