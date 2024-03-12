import type { Meta, StoryObj } from '@storybook/vue3';

import SlimBadge from './SlimBadge.vue';

const icon = {
    template: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rat"><path d="M17 5c0-1.7-1.3-3-3-3s-3 1.3-3 3c0 .8.3 1.5.8 2H11c-3.9 0-7 3.1-7 7v0c0 2.2 1.8 4 4 4"/><path d="M16.8 3.9c.3-.3.6-.5 1-.7 1.5-.6 3.3.1 3.9 1.6.6 1.5-.1 3.3-1.6 3.9l1.6 2.8c.2.3.2.7.2 1-.2.8-.9 1.2-1.7 1.1 0 0-1.6-.3-2.7-.6H17c-1.7 0-3 1.3-3 3"/><path d="M13.2 18a3 3 0 0 0-2.2-5"/><path d="M13 22H4a2 2 0 0 1 0-4h12"/><path d="M16 9h.01"/></svg>'
};

/**
 * Our standard badges offer enough space to elegantly present small snippets of information or 
 * counters without taking too much focus away from the content itself. If you are looking for 
 * overlaying badges used on top of other elements, you will find a suitable one under `OverlayBadge`.
 */
const meta = {
    title: 'Components/Badges/SlimBadge',
    component: SlimBadge,
    tags: ['autodocs'],
    argTypes: {

    },
    args: {
        
    },
} satisfies Meta<typeof SlimBadge>;

type Story = StoryObj<typeof meta>;
export default meta;

/**
 * Default Variant
 */
export const Default: Story = {
    args: {
        label: '42'
    },
};

/**
 * Default Variant
 */
export const Variants: Story = {
    args: {
        label: '42'
    },
    render: (args: any) => ({
        components: { SlimBadge },
        setup() {
            return { args };
        },
        template: `
            <div class="flex flex-col gap-2">
                <div class="flex gap-2">
                    <SlimBadge v-bind="args" :label="null" size="sm" />
                    <SlimBadge v-bind="args" :label="null" size="sm" color="primary" />
                    <SlimBadge v-bind="args" :label="null" size="sm" color="secondary" />
                    <SlimBadge v-bind="args" :label="null" size="sm" color="success" />
                    <SlimBadge v-bind="args" :label="null" size="sm" color="warning" />
                    <SlimBadge v-bind="args" :label="null" size="sm" color="danger" />
                    <SlimBadge v-bind="args" :label="null" size="sm" color="info" />
                </div>
                <div class="flex gap-2">
                    <SlimBadge v-bind="args" />
                    <SlimBadge v-bind="args" color="primary" />
                    <SlimBadge v-bind="args" color="secondary" />
                    <SlimBadge v-bind="args" color="success" />
                    <SlimBadge v-bind="args" color="warning" />
                    <SlimBadge v-bind="args" color="danger" />
                    <SlimBadge v-bind="args" color="info" />
                </div>
                <div class="flex gap-2">
                    <SlimBadge v-bind="args" size="lg" />
                    <SlimBadge v-bind="args" size="lg" color="primary" />
                    <SlimBadge v-bind="args" size="lg" color="secondary" />
                    <SlimBadge v-bind="args" size="lg" color="success" />
                    <SlimBadge v-bind="args" size="lg" color="warning" />
                    <SlimBadge v-bind="args" size="lg" color="danger" />
                    <SlimBadge v-bind="args" size="lg" color="info" />
                </div>
            </div>
        `
    })
};

/**
 * Default IconVariant
 */
export const IconVariants: Story = {
    args: {
        label: '42',
        icon: icon
    },
    render: (args: any) => ({
        components: { SlimBadge, icon },
        setup() {
            return { args };
        },
        template: `
            <div class="flex flex-col gap-2">
                <div class="flex gap-2">
                    <SlimBadge v-bind="args" :label="null" size="sm" />
                    <SlimBadge v-bind="args" :label="null" size="sm" color="primary" />
                    <SlimBadge v-bind="args" :label="null" size="sm" color="secondary" />
                    <SlimBadge v-bind="args" :label="null" size="sm" color="success" />
                    <SlimBadge v-bind="args" :label="null" size="sm" color="warning" />
                    <SlimBadge v-bind="args" :label="null" size="sm" color="danger" />
                    <SlimBadge v-bind="args" :label="null" size="sm" color="info" />
                </div>
                <div class="flex gap-2">
                    <SlimBadge v-bind="args" />
                    <SlimBadge v-bind="args" color="primary" />
                    <SlimBadge v-bind="args" color="secondary" />
                    <SlimBadge v-bind="args" color="success" />
                    <SlimBadge v-bind="args" color="warning" />
                    <SlimBadge v-bind="args" color="danger" />
                    <SlimBadge v-bind="args" color="info" />
                </div>
                <div class="flex gap-2">
                    <SlimBadge v-bind="args" size="lg" />
                    <SlimBadge v-bind="args" size="lg" color="primary" />
                    <SlimBadge v-bind="args" size="lg" color="secondary" />
                    <SlimBadge v-bind="args" size="lg" color="success" />
                    <SlimBadge v-bind="args" size="lg" color="warning" />
                    <SlimBadge v-bind="args" size="lg" color="danger" />
                    <SlimBadge v-bind="args" size="lg" color="info" />
                </div>
            </div>
        `
    })
};
