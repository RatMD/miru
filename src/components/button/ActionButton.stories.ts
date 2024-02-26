import type { Meta, StoryObj } from '@storybook/vue3';

import { Check, Trash } from 'lucide-vue-next';
import ActionButton from './ActionButton.vue';

/**
 * The ActionButton component is usually used within another component, that offers less space for
 * huge (labeled) actions, such as within a table or a next to the title of a panel. However,
 * ActionButton's have the characteristic of not supporting a direct label, instead speaking icons
 * and (at least on desktop devices) delayed tooltips are used.
 * 
 * 
 */
const meta = {
    title: 'Components/Buttons/ActionButton',
    component: ActionButton,
    tags: ['autodocs'],
    argTypes: {
        color: { control: 'select', options: [null, 'primary', 'secondary', 'danger', 'warning', 'success', 'info'] },
        icon: { control: 'object' },
        iconProps: { control: 'object' },
        size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
        type: { control: 'inline-radio', options: ['button', 'submit', 'reset'] },
        title: { control: 'text' },
        active: { control: 'boolean' },
        disabled: { control: 'boolean' },
        loading: { control: 'boolean' },
    },
    args: {
        
    },
} satisfies Meta<typeof ActionButton>;

type Story = StoryObj<typeof meta>;
export default meta;

/**
 * Shared Color Renderer
 * @param args 
 * @returns 
 */
const sharedColorRenderer = (args: any) => ({
    components: { ActionButton, Check },
    setup() {
        return { args };
    },
    template: `
        <div class="flex flex-col gap-2">
            <div class="flex gap-2">
                <ActionButton v-bind="args" size="sm" />
                <ActionButton v-bind="args" size="sm" disabled />
                <ActionButton v-bind="args" size="sm" loading />
            </div>
            <div class="flex gap-2">
                <ActionButton v-bind="args" />
                <ActionButton v-bind="args" disabled />
                <ActionButton v-bind="args" loading />
            </div>
            <div class="flex gap-2">
                <ActionButton v-bind="args" size="lg" />
                <ActionButton v-bind="args" size="lg" disabled />
                <ActionButton v-bind="args" size="lg" loading />
            </div>
        </div>
    `
});

/**
 * Default Variant
 */
export const Default: Story = {
    args: {
        icon: Trash
    },
};

/**
 * The black/white colored default button set.
 */
export const DefaultSet: Story = {
    args: {
        icon: Check,
    },
    render: sharedColorRenderer
};

/**
 * The indigo-coloured primary button set.
 */
export const PrimarySet: Story = {
    args: {
        color: 'primary',
        icon: Check,
    },
    render: sharedColorRenderer
};

/**
 * The bordered secondary button set.
 */
export const SecondarySet: Story = {
    args: {
        color: 'secondary',
        icon: Check,
    },
    render: sharedColorRenderer
};

/**
 * The red-coloured danger button set.
 */
export const DangerSet: Story = {
    args: {
        color: 'danger',
        icon: Check,
    },
    render: sharedColorRenderer
};

/**
 * The amber-coloured warning button set.
 */
export const WarningSet: Story = {
    args: {
        color: 'warning',
        icon: Check,
    },
    render: sharedColorRenderer
};

/**
 * The emerald-coloured success button set.
 */
export const SuccessSet: Story = {
    args: {
        color: 'success',
        icon: Check,
    },
    render: sharedColorRenderer
};

/**
 * The sky-coloured info button set.
 */
export const InfoSet: Story = {
    args: {
        color: 'info',
        icon: Check,
    },
    render: sharedColorRenderer
};
