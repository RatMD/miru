import type { Meta, StoryObj } from '@storybook/vue3';

import { Info } from 'lucide-vue-next';
import SlimBadge from './SlimBadge.vue';

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
        icon: Info
    },
    render: (args: any) => ({
        components: { SlimBadge, Info },
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
