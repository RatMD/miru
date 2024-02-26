import type { Meta, StoryObj } from '@storybook/vue3';

import FeedbackMessage from './FeedbackMessage.vue';

/**
 * Title
 */
const meta = {
    title: 'Components/Feedback/FeedbackMessage',
    component: FeedbackMessage,
    tags: ['autodocs'],
    argTypes: {

    },
    args: {
        
    },
} satisfies Meta<typeof FeedbackMessage>;

type Story = StoryObj<typeof meta>;
export default meta;

/**
 * Default Variant
 */
export const Default: Story = {
    args: {
        
    },
};
