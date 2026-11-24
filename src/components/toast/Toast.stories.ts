import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { componentControls, controlNames } from '../../stories/component-controls';
import { componentDescription } from '../../stories/component-descriptions';
import ToastDemo from '../../stories/ToastDemo.vue';
import { Toast } from './index';
const meta = {
    ...componentControls('Toast'),
    title: 'Overlay/Toast',
    component: Toast,
    parameters: {
        controls: { include: controlNames('Toast') },
        docs: { description: { component: componentDescription('Toast') } },
    },
} satisfies Meta;
export default meta;
const render: StoryObj['render'] = (args, { globals }) => ({
    components: { ToastDemo },
    setup: () => ({ args, locale: globals.locale }),
    template: '<ToastDemo v-bind="args" :locale="locale"/>',
});
export const Default: StoryObj = { render };
export const Floating: StoryObj = {
    render,
    args: { inline: false, seed: false, expand: true, visibleToasts: 8 },
};
export const Flat: StoryObj = { render, args: { appearance: 'flat' } };
export const Graphite: StoryObj = { render, args: { appearance: 'graphite' } };
export const RichColors: StoryObj = { render, args: { richColors: true, appearance: 'flat' } };
