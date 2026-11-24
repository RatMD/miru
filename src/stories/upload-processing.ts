import type { StoryObj } from '@storybook/vue3-vite';
import UploadProcessingDemo from './UploadProcessingDemo.vue';

/** UploadZone example, intentionally indexed under its parent component. */
export const imageProcessingStory: StoryObj = {
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: 'Optional transformFiles hook: convert images to JPEG with a 1920px bound. Toggle failure to verify feedback and retry. This is an UploadZone usage example, not a separate component.',
            },
        },
    },
    render: (_args, { globals }) => ({
        components: { UploadProcessingDemo },
        setup: () => ({ locale: globals.locale === 'de' ? 'de-DE' : 'en-US' }),
        template: '<UploadProcessingDemo :locale="locale" />',
    }),
};
