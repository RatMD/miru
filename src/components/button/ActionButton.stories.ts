import type { Meta, StoryObj } from '@storybook/vue3';

import ActionButton from './ActionButton.vue';

const icon = {
    template: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rat"><path d="M17 5c0-1.7-1.3-3-3-3s-3 1.3-3 3c0 .8.3 1.5.8 2H11c-3.9 0-7 3.1-7 7v0c0 2.2 1.8 4 4 4"/><path d="M16.8 3.9c.3-.3.6-.5 1-.7 1.5-.6 3.3.1 3.9 1.6.6 1.5-.1 3.3-1.6 3.9l1.6 2.8c.2.3.2.7.2 1-.2.8-.9 1.2-1.7 1.1 0 0-1.6-.3-2.7-.6H17c-1.7 0-3 1.3-3 3"/><path d="M13.2 18a3 3 0 0 0-2.2-5"/><path d="M13 22H4a2 2 0 0 1 0-4h12"/><path d="M16 9h.01"/></svg>'
};

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
    components: { ActionButton, icon },
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
        icon: icon
    },
};

/**
 * The black/white colored default button set.
 */
export const DefaultSet: Story = {
    args: {
        icon: icon,
    },
    render: sharedColorRenderer
};

/**
 * The indigo-coloured primary button set.
 */
export const PrimarySet: Story = {
    args: {
        color: 'primary',
        icon: icon,
    },
    render: sharedColorRenderer
};

/**
 * The bordered secondary button set.
 */
export const SecondarySet: Story = {
    args: {
        color: 'secondary',
        icon: icon,
    },
    render: sharedColorRenderer
};

/**
 * The red-coloured danger button set.
 */
export const DangerSet: Story = {
    args: {
        color: 'danger',
        icon: icon,
    },
    render: sharedColorRenderer
};

/**
 * The amber-coloured warning button set.
 */
export const WarningSet: Story = {
    args: {
        color: 'warning',
        icon: icon,
    },
    render: sharedColorRenderer
};

/**
 * The emerald-coloured success button set.
 */
export const SuccessSet: Story = {
    args: {
        color: 'success',
        icon: icon,
    },
    render: sharedColorRenderer
};

/**
 * The sky-coloured info button set.
 */
export const InfoSet: Story = {
    args: {
        color: 'info',
        icon: icon,
    },
    render: sharedColorRenderer
};
