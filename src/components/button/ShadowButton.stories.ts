import type { Meta, StoryObj } from '@storybook/vue3';

import { Search } from 'lucide-vue-next';
import ShadowButton from './ShadowButton.vue';

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
        icon: Search,
        title: 'A11Y Title'
    },
};

/**
 * The smaller version of ShadowButton component.
 */
export const Small: Story = {
    args: {
        icon: Search,
        size: 'sm',
        title: 'A11Y Title'
    },
};

/**
 * The larger version of ShadowButton component.
 */
export const Large: Story = {
    args: {
        icon: Search,
        size: 'lg',
        title: 'A11Y Title'
    },
};

/**
 * Colors
 */
export const Colors: Story = {
    args: {
        icon: Search,
    },
    render: (args: any) => ({
        components: { ShadowButton, Search },
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
