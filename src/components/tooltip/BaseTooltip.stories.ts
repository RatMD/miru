import type { Meta, StoryObj } from '@storybook/vue3';

import { Info } from 'lucide-vue-next';
import BaseTooltip from './BaseTooltip.vue';

/**
 * The **BaseTooltip** component contains the basic design and layout of the tooltip, but without 
 * applying any behaviors or function. Instead use the [TooltipStd](/docs/components-tooltip-tooltip--docs) 
 * component or the [`v-tooltip`]() directive to integrate a fully functional tooltip.
 */
const meta = {
    title: 'Components/Tooltip/BaseTooltip',
    component: BaseTooltip,
    tags: ['autodocs'],
    argTypes: {
        color: {
            control: 'select',
            options: [null, 'primary', 'secondary', 'success', 'warning', 'danger', 'info']
        },
        label: {
            control: 'text'
        }
    },
    args: {
        label: 'Tooltip'
    },
} satisfies Meta<typeof BaseTooltip>;

type Story = StoryObj<typeof meta>;
export default meta;

/**
 * The default variant of the tooltip is black or white with high-contrast text, depending on the 
 * applied color scheme.
 */
export const Default: Story = {
    args: {
        
    },
};

/**
 * Instead of using the `label` property, the content inside of the tooltip can also passed using 
 * the default slot.
 */
export const Custom: Story = {
    args: {
        
    },
    render: (args: any) => ({
        components: { BaseTooltip, Info },
        setup() {
            return { args };
        },
        template: `
            <div class="flex flex-col gap-2">
                <BaseTooltip v-bind="args">
                    <div class="flex flex-row items-center gap-2">
                        <Info :size="16" />
                        <span>Custom Tooltip Slot</span>
                    </div>
                </BaseTooltip>
            </div>
        `
    })
};

/**
 * Similar to the badges or buttons, the tooltip also supports the default severity color set as 
 * defined in the main tailwind.config.js file.
 */
export const Colors: Story = {
    args: {
        
    },
    render: (args: any) => ({
        components: { BaseTooltip },
        setup() {
            return { args };
        },
        template: `
            <div class="flex flex-col gap-2">
                <BaseTooltip v-bind="args" label="Default Tooltip" />
                <BaseTooltip v-bind="args" label="Primary Tooltip" color="primary" />
                <BaseTooltip v-bind="args" label="Secondary Tooltip" color="secondary" />
                <BaseTooltip v-bind="args" label="Success Tooltip" color="success" />
                <BaseTooltip v-bind="args" label="Warning Tooltip" color="warning" />
                <BaseTooltip v-bind="args" label="Danger Tooltip" color="danger" />
                <BaseTooltip v-bind="args" label="Info Tooltip" color="info" />
            </div>
        `
    })
};
