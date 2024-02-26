import type { Meta, StoryObj } from '@storybook/vue3';

import { ref } from 'vue';
import DeferredSupport from './DeferredSupport.vue';

/**
 * Title
 */
const meta = {
    title: 'Support/Deferred',
    component: DeferredSupport,
    tags: ['autodocs'],
    argTypes: {

    },
    args: {
        
    },
    render: (args: any) => ({
        components: { DeferredSupport },
        setup() {
            const visible = ref<boolean>(false);
            return { args, visible };
        },
        template: `
        `
    })
} satisfies Meta<typeof DeferredSupport>;

type Story = StoryObj<typeof meta>;
export default meta;

/**
 * Default Variant
 */
export const Default: Story = {
    args: {
    },
};
