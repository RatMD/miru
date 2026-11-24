import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { componentDescription } from '../../stories/component-descriptions';
import CompositionDemo from '../../stories/CompositionDemo.vue';
import { Command } from './index';
const meta = {
    title: 'Overlay/Command',
    component: Command,
    parameters: {
        layout: 'padded',
        controls: {
            include: ['dialog', 'narrow', 'disabled', 'loading', 'empty'],
        },
        docs: { description: { component: componentDescription('Command') } },
    },
    args: {
        dialog: true,
        narrow: false,
        disabled: false,
        loading: false,
        empty: false,
    },
    argTypes: {
        dialog: { control: 'boolean' },
        narrow: { control: 'boolean' },
        disabled: { control: 'boolean' },
        loading: { control: 'boolean' },
        empty: { control: 'boolean' },
    },
    render: (args, { globals }) => ({
        components: { CompositionDemo },
        setup: () => ({ args, locale: globals.locale || 'en' }),
        template: '<CompositionDemo mode="command" :args="args" :locale="locale"/>',
    }),
} satisfies Meta;
export default meta;
export const Default: StoryObj = {};
export const Dialog: StoryObj = { args: { dialog: true } };
export const Inline: StoryObj = { args: { dialog: false } };
export const FilterOverflow: StoryObj = {
    args: { narrow: true, dialog: false },
};
export const Loading: StoryObj = { args: { loading: true } };
export const Empty: StoryObj = { args: { empty: true } };
export const Disabled: StoryObj = { args: { disabled: true } };
