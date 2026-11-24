import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { componentDescription } from '../../stories/component-descriptions';
import CompositionDemo from '../../stories/CompositionDemo.vue';
import { AspectRatio } from './index';
const meta = {
    title: 'Utilities/AspectRatio',
    component: AspectRatio,
    parameters: {
        layout: 'padded',
        controls: { include: ['preset', 'ratio', 'gallery'] },
        docs: {
            description: { component: componentDescription('AspectRatio') },
        },
    },
    args: { preset: 'square', gallery: false },
    argTypes: {
        preset: {
            control: 'select',
            options: ['square', 'video', 'photo', 'portrait', 'cinema'],
        },
        ratio: {
            control: 'text',
            description:
                'A positive number or width/height expression, e.g. 16x9, 4:3 or 4/3. Overrides preset.',
        },
        gallery: { control: 'boolean' },
    },
    render: (args, { globals }) => ({
        components: { CompositionDemo },
        setup: () => ({ args, locale: globals.locale || 'en' }),
        template: '<CompositionDemo mode="aspect" :args="args" :locale="locale"/>',
    }),
} satisfies Meta;
export default meta;
export const Default: StoryObj = { args: { ratio: '16x9' } };
export const Presets: StoryObj = { args: { gallery: true } };
export const Video: StoryObj = { args: { preset: 'video' } };
export const Custom: StoryObj = { args: { ratio: '4x3' } };
export const Numeric: StoryObj = { args: { ratio: 2.5 } };
