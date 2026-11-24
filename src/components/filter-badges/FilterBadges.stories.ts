import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { componentDescription } from '../../stories/component-descriptions';
import CompositionDemo from '../../stories/CompositionDemo.vue';
import { FilterBadges } from './index';
const meta = {
    title: 'Components/FilterBadges',
    component: FilterBadges,
    parameters: {
        layout: 'padded',
        controls: { include: ['size', 'narrow', 'disabled'] },
        docs: {
            description: { component: componentDescription('FilterBadges') },
        },
    },
    args: { size: 'default', narrow: false, disabled: false },
    argTypes: {
        size: { control: 'select', options: ['sm', 'default', 'lg'] },
        narrow: { control: 'boolean' },
        disabled: { control: 'boolean' },
    },
    render: (args, { globals }) => ({
        components: { CompositionDemo },
        setup: () => ({ args, locale: globals.locale || 'en' }),
        template: '<CompositionDemo mode="badges" :args="args" :locale="locale"/>',
    }),
} satisfies Meta;
export default meta;
export const Default: StoryObj = {};
export const Overflow: StoryObj = { args: { narrow: true } };
export const Disabled: StoryObj = { args: { narrow: true, disabled: true } };

export const Small: StoryObj = { args: { size: 'sm' } };
export const Large: StoryObj = { args: { size: 'lg' } };

export const SmallOverflow: StoryObj = { args: { narrow: true, size: 'sm' } };
export const LargeOverflow: StoryObj = { args: { narrow: true, size: 'lg' } };
