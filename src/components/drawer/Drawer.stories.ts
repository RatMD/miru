import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { componentDescription } from '../../stories/component-descriptions';
import CompositionDemo from '../../stories/CompositionDemo.vue';
import { Drawer } from './index';
const meta = {
    title: 'Overlay/Drawer',
    component: Drawer,
    parameters: {
        layout: 'padded',
        controls: {
            include: [
                'swipeDirection',
                'showHandle',
                'longContent',
                'maxHeight',
                'contentSize',
                'scrollable',
                'startHeight',
            ],
        },
        docs: { description: { component: componentDescription('Drawer') } },
    },
    args: {
        maxHeight: '90dvh',
        contentSize: '5xl',
        scrollable: true,
        startHeight: 0.5,
        swipeDirection: 'down',
        showHandle: true,
        longContent: false,
    },
    argTypes: {
        maxHeight: { control: 'text' },
        contentSize: {
            control: 'select',
            options: ['sm', 'lg', '2xl', '4xl', '5xl', '6xl', 'full'],
        },
        scrollable: { control: 'boolean' },
        startHeight: {
            control: { type: 'number', min: 0.1, max: 0.9, step: 0.05 },
        },
        swipeDirection: {
            control: 'select',
            options: ['down', 'up', 'left', 'right'],
        },
        showHandle: { control: 'boolean' },
        longContent: { control: 'boolean' },
    },
    render: (args, { globals }) => ({
        components: { CompositionDemo },
        setup: () => ({ args, locale: globals.locale || 'en' }),
        template: '<CompositionDemo mode="drawer" :args="args" :locale="locale"/>',
    }),
} satisfies Meta;
export default meta;
export const Default: StoryObj = {};
export const LongContent: StoryObj = { args: { longContent: true } };
export const SnapPoints: StoryObj = { args: { snapPoints: [0.4, 0.9] } };
export const WithoutHandle: StoryObj = { args: { showHandle: false } };

export const Expanded: StoryObj = {
    args: { startHeight: 0.9, longContent: true },
};
export const CustomHeight: StoryObj = {
    args: { maxHeight: '75dvh', startHeight: 0.5, longContent: true },
};
