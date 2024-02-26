import type { Meta, StoryObj } from '@storybook/vue3';

import PlaceholderSkeleton from './PlaceholderSkeleton.vue';

/**
 * Title
 */
const meta = {
    title: 'Components/Feedback/PlaceholderSkeleton',
    component: PlaceholderSkeleton,
    tags: ['autodocs'],
    argTypes: {
        class: { control: 'text' },
        width: { control: 'text' },
        height: { control: 'text' },
        vertical: { control: 'boolean' }
    },
    args: {
        
    },
} satisfies Meta<typeof PlaceholderSkeleton>;

type Story = StoryObj<typeof meta>;
export default meta;

/**
 * Default Variant
 */
export const Default: Story = {
    args: {
        width: '12rem',
        height: '0.75rem'
    },
};

/**
 * Vertical Variant
 */
export const Vertical: Story = {
    args: {
        width: '12rem',
        height: '12rem',
        vertical: true
    },
};

/**
 * Rounded Variant
 */
export const Rounded: Story = {
    args: {
        width: '12rem',
        height: '12rem',
        class: 'rounded-full',
        vertical: true
    },
};
