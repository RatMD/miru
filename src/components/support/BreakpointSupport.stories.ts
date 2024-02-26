import type { Meta, StoryObj } from '@storybook/vue3';

import { ref } from 'vue';
import BreakpointSupport from './BreakpointSupport.vue';

/**
 * Title
 */
const meta = {
    title: 'Support/Breakpoint',
    component: BreakpointSupport,
    tags: ['autodocs'],
    argTypes: {
        min: {
            control: 'text',
        },
        max: {
            control: 'text',
        },
        orientation: {
            control: 'radio',
            options: [null, 'portrait', 'landscape']
        }
    },
    args: {
        
    },
    render: (args: any) => ({
        components: { BreakpointSupport },
        setup() {
            return { args };
        },
        template: `
            <BreakpointSupport v-bind="args">
                {{ args.default }}
            </BreakpointSupport>
        `
    })
} satisfies Meta<typeof BreakpointSupport>;

type Story = StoryObj<typeof meta>;
export default meta;

/**
 * Default Variant
 */
export const Default: Story = {
    args: {

    },
    render: (args: any) => ({
        components: { BreakpointSupport },
        setup() {
            return { args };
        },
        template: `
            <BreakpointSupport max="md" v-slot="{ width, height }">
                Mobile ({{ width }}x{{ height }})
            </BreakpointSupport>
            <BreakpointSupport min="md" max="lg" v-slot="{ width, height }">
                Tablet ({{ width }}x{{ height }})
            </BreakpointSupport>
            <BreakpointSupport min="lg" max="xl" v-slot="{ width, height }">
                Notebook ({{ width }}x{{ height }})
            </BreakpointSupport>
            <BreakpointSupport min="xl" max="xxl" v-slot="{ width, height }">
                Desktop ({{ width }}x{{ height }})
            </BreakpointSupport>
            <BreakpointSupport min="xxl" v-slot="{ width, height }">
                Large Screen ({{ width }}x{{ height }})
            </BreakpointSupport>
        `
    })
};
