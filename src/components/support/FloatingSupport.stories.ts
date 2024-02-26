import type { Meta, StoryObj } from '@storybook/vue3';

import { ref } from 'vue';
import FloatingSupport from './FloatingSupport.vue';

/**
 * Title
 */
const meta = {
    title: 'Support/Floating',
    component: FloatingSupport,
    tags: ['autodocs'],
    argTypes: {

    },
    args: {
        
    },
    render: (args: any) => ({
        components: { FloatingSupport },
        setup() {
            const visible = ref<boolean>(false);
            return { args, visible };
        },
        template: `
        `
    })
} satisfies Meta<typeof FloatingSupport>;

type Story = StoryObj<typeof meta>;
export default meta;

/**
 * Default Variant
 */
export const Default: Story = {
    args: {
    },
};
