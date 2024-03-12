import type { Meta, StoryObj } from '@storybook/vue3';

import BaseTooltip from './BaseTooltip.vue';

const icon = {
    template: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rat"><path d="M17 5c0-1.7-1.3-3-3-3s-3 1.3-3 3c0 .8.3 1.5.8 2H11c-3.9 0-7 3.1-7 7v0c0 2.2 1.8 4 4 4"/><path d="M16.8 3.9c.3-.3.6-.5 1-.7 1.5-.6 3.3.1 3.9 1.6.6 1.5-.1 3.3-1.6 3.9l1.6 2.8c.2.3.2.7.2 1-.2.8-.9 1.2-1.7 1.1 0 0-1.6-.3-2.7-.6H17c-1.7 0-3 1.3-3 3"/><path d="M13.2 18a3 3 0 0 0-2.2-5"/><path d="M13 22H4a2 2 0 0 1 0-4h12"/><path d="M16 9h.01"/></svg>'
};

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
        components: { BaseTooltip, icon },
        setup() {
            return { args };
        },
        template: `
            <div class="flex flex-col gap-2">
                <BaseTooltip v-bind="args">
                    <div class="flex flex-row items-center gap-2">
                        <icon :size="16" />
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
