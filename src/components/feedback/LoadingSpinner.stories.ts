import type { Meta, StoryObj } from '@storybook/vue3';

import LoadingSpinner from './LoadingSpinner.vue';

/**
 * Title
 */
const meta = {
    title: 'Components/Feedback/LoadingSpinner',
    component: LoadingSpinner,
    tags: ['autodocs'],
    argTypes: {

    },
    args: {
        
    },
} satisfies Meta<typeof LoadingSpinner>;

type Story = StoryObj<typeof meta>;
export default meta;

/**
 * Default Variant
 */
export const Default: Story = {
    args: {
        
    },
};

/**
 * Default Variant
 */
export const Variants: Story = {
    args: {
        
    },
    render: (args: any) => ({
        components: { LoadingSpinner },
        setup() {
            return { args };
        },
        template: `
            <div class="flex flex-col gap-4">
                <div class="flex gap-4">
                    <LoadingSpinner size="sm" />
                    <LoadingSpinner size="sm" color="primary" />
                    <LoadingSpinner size="sm" color="secondary" />
                    <LoadingSpinner size="sm" color="success" />
                    <LoadingSpinner size="sm" color="warning" />
                    <LoadingSpinner size="sm" color="danger" />
                    <LoadingSpinner size="sm" color="info" />
                </div>
                <div class="flex gap-4">
                    <LoadingSpinner />
                    <LoadingSpinner color="primary" />
                    <LoadingSpinner color="secondary" />
                    <LoadingSpinner color="success" />
                    <LoadingSpinner color="warning" />
                    <LoadingSpinner color="danger" />
                    <LoadingSpinner color="info" />
                </div>
                <div class="flex gap-4">
                    <LoadingSpinner size="lg" />
                    <LoadingSpinner size="lg" color="primary" />
                    <LoadingSpinner size="lg" color="secondary" />
                    <LoadingSpinner size="lg" color="success" />
                    <LoadingSpinner size="lg" color="warning" />
                    <LoadingSpinner size="lg" color="danger" />
                    <LoadingSpinner size="lg" color="info" />
                </div>
            </div>
        `
    })
};
