import type { Meta, StoryObj } from '@storybook/vue3';

import BaseCard from './BaseCard.vue';

/**
 * Title
 */
const meta = {
    title: 'Components/Cards/BaseCard',
    component: BaseCard,
    tags: ['autodocs'],
    argTypes: {

    },
    args: {
        
    },
} satisfies Meta<typeof BaseCard>;

type Story = StoryObj<typeof meta>;
export default meta;

/**
 * Default Variant
 */
export const Default: Story = {
    args: {
        title: 'Card Title',
        default: 'Cart Content'
    },
};
