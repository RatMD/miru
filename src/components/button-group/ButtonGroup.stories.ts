import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { componentDescription } from '../../stories/component-descriptions';
import CompositionDemo from '../../stories/CompositionDemo.vue';
import { ButtonGroup } from './index';
const meta = {
    title: 'Components/ButtonGroup',
    component: ButtonGroup,
    parameters: {
        layout: 'padded',
        controls: {
            include: ['orientation', 'size', 'shape', 'disabled', 'iconOnly', 'actionButtons'],
        },
        docs: {
            description: { component: componentDescription('ButtonGroup') },
        },
    },
    args: {
        orientation: 'horizontal',
        size: 'default',
        shape: 'default',
        disabled: false,
        iconOnly: false,
        actionButtons: false,
    },
    argTypes: {
        orientation: { control: 'select', options: ['horizontal', 'vertical'] },
        size: { control: 'select', options: ['xs', 'sm', 'default', 'lg'] },
        shape: { control: 'select', options: ['default', 'round'] },
        disabled: { control: 'boolean' },
        iconOnly: { control: 'boolean' },
        actionButtons: { control: 'boolean' },
    },
    render: (args, { globals }) => ({
        components: { CompositionDemo },
        setup: () => ({ args, locale: globals.locale || 'en' }),
        template: '<CompositionDemo mode="buttons" :args="args" :locale="locale"/>',
    }),
} satisfies Meta;
export default meta;
export const Default: StoryObj = {};
export const Vertical: StoryObj = { args: { orientation: 'vertical' } };
export const IconOnly: StoryObj = { args: { iconOnly: true } };
export const ActionButtons: StoryObj = { args: { actionButtons: true } };
export const Disabled: StoryObj = { args: { disabled: true } };

export const ExtraSmall: StoryObj = { args: { size: 'xs' } };
export const Small: StoryObj = { args: { size: 'sm' } };
export const Large: StoryObj = { args: { size: 'lg' } };
export const Round: StoryObj = { args: { shape: 'round' } };
