import type { Meta, StoryObj } from '@storybook/vue3';

import ShadowButton from './ShadowButton.vue';

const icon = {
    template: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rat"><path d="M17 5c0-1.7-1.3-3-3-3s-3 1.3-3 3c0 .8.3 1.5.8 2H11c-3.9 0-7 3.1-7 7v0c0 2.2 1.8 4 4 4"/><path d="M16.8 3.9c.3-.3.6-.5 1-.7 1.5-.6 3.3.1 3.9 1.6.6 1.5-.1 3.3-1.6 3.9l1.6 2.8c.2.3.2.7.2 1-.2.8-.9 1.2-1.7 1.1 0 0-1.6-.3-2.7-.6H17c-1.7 0-3 1.3-3 3"/><path d="M13.2 18a3 3 0 0 0-2.2-5"/><path d="M13 22H4a2 2 0 0 1 0-4h12"/><path d="M16 9h.01"/></svg>'
};

/**
 * A initial background-less fully rounded shadow button.
 */
const meta = {
    title: 'Components/Buttons/ShadowButton',
    component: ShadowButton,
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
} satisfies Meta<typeof ShadowButton>;

type Story = StoryObj<typeof meta>;
export default meta;

/**
 * The default version of ShadowButton component.
 */
export const Default: Story = {
    args: {
        icon: icon,
        title: 'A11Y Title'
    },
};

/**
 * The smaller version of ShadowButton component.
 */
export const Small: Story = {
    args: {
        icon: icon,
        size: 'sm',
        title: 'A11Y Title'
    },
};

/**
 * The larger version of ShadowButton component.
 */
export const Large: Story = {
    args: {
        icon: icon,
        size: 'lg',
        title: 'A11Y Title'
    },
};

/**
 * Colors
 */
export const Colors: Story = {
    args: {
        icon: icon,
    },
    render: (args: any) => ({
        components: { ShadowButton, icon },
        setup() {
            return { args };
        },
        template: `
            <div class="flex flex-col gap-4">
                <div class="flex gap-4">
                    <ShadowButton v-bind="args" />
                    <ShadowButton v-bind="args" color="primary" />
                    <ShadowButton v-bind="args" color="secondary" />
                    <ShadowButton v-bind="args" color="success" />
                    <ShadowButton v-bind="args" color="warning" />
                    <ShadowButton v-bind="args" color="danger" />
                    <ShadowButton v-bind="args" color="info" />
                </div>
                <div class="flex gap-4">
                    <ShadowButton v-bind="args" active />
                    <ShadowButton v-bind="args" active color="primary" />
                    <ShadowButton v-bind="args" active color="secondary" />
                    <ShadowButton v-bind="args" active color="success" />
                    <ShadowButton v-bind="args" active color="warning" />
                    <ShadowButton v-bind="args" active color="danger" />
                    <ShadowButton v-bind="args" active color="info" />
                </div>
            </div>
        `
    })
};
