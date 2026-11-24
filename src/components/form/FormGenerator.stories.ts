import type { Meta, StoryObj } from '@storybook/vue3-vite';
import FormShowcase from '../../stories/FormShowcase.vue';
import { FormLayout } from './index';
const meta = {
    title: 'Form/Generator',
    component: FormLayout,
    parameters: {
        layout: 'padded',
        controls: { disable: true },
        docs: {
            description: {
                component:
                    'The existing FormLayout/FormSectionRenderer generator, including native field types, localized values, headers, spacers, a 10/12-column grid and specialized inputs through custom slots. All examples validate locally; no request is sent.',
            },
        },
    },
} satisfies Meta;
export default meta;
export const AllFields: StoryObj = {
    render: (_, { globals }) => ({
        components: { FormShowcase },
        setup: () => ({ locale: globals.locale || 'en' }),
        template: '<FormShowcase :locale="locale" generator/>',
    }),
};
