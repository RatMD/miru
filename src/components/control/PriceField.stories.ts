import type { Meta, StoryObj } from '@storybook/vue3';

import { ref } from 'vue';
import FormControl from '../form/FormControl.vue';
import PriceField from './PriceField.vue';

const icon = {
    template: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rat"><path d="M17 5c0-1.7-1.3-3-3-3s-3 1.3-3 3c0 .8.3 1.5.8 2H11c-3.9 0-7 3.1-7 7v0c0 2.2 1.8 4 4 4"/><path d="M16.8 3.9c.3-.3.6-.5 1-.7 1.5-.6 3.3.1 3.9 1.6.6 1.5-.1 3.3-1.6 3.9l1.6 2.8c.2.3.2.7.2 1-.2.8-.9 1.2-1.7 1.1 0 0-1.6-.3-2.7-.6H17c-1.7 0-3 1.3-3 3"/><path d="M13.2 18a3 3 0 0 0-2.2-5"/><path d="M13 22H4a2 2 0 0 1 0-4h12"/><path d="M16 9h.01"/></svg>'
};

/**
 * Title
 */
const meta = {
    title: 'Form/Controls/PriceField',
    component: PriceField,
    tags: ['autodocs'],
    argTypes: {
        min: {
            control: 'number',
        },
        max: {
            control: 'number',
        },
        step: {
            control: 'number',
        },
        decimals: {
            control: {
                type: 'number',
                min: 0
            }
        },
        size: {
            control: 'radio',
            options: ['sm', 'md', 'lg'],
        },

        // Shared Properties
        id: {
            control: 'text',
            table: {
                category: 'Shared Props',
            },
        },
        name: {
            control: 'text',
            table: {
                category: 'Shared Props',
            },
        },
        modelValue: {
            control: 'text',
            table: {
                category: 'Shared Props',
                disable: true,
            },
        },
        validation: {
            control: 'radio',
            options: [null, 'invalid', 'valid'],
            table: {
                category: 'Shared Props',
            },
        },
        disabled: {
            control: 'boolean',
            table: {
                category: 'Shared Props',
            },
        },
        readonly: {
            control: 'boolean',
            table: {
                category: 'Shared Props',
            }
        },
        required: {
            control: 'boolean',
            table: {
                category: 'Shared Props',
            }
        },
    },
    args: {
        icon: 'currency',
        decimals: 2,
        size: 'md'
    },
} satisfies Meta<typeof PriceField>;

type Story = StoryObj<typeof meta>;
export default meta;

/**
 * Default Variant
 */
export const Default: Story = {
    args: {
        
    },
    render: (args: any) => ({
        components: { PriceField },
        setup() {
            const value = ref();
            return { args, value };
        },
        template: `
            <PriceField v-bind="args" v-model="value" />
        `
    })
};

/**
 * Supported Currencies
 */
export const Currencies: Story = {
    args: {
        
    },
    render: (args: any) => ({
        components: { PriceField, icon },
        setup() {
            const value = ref();
            return { args, value };
        },
        template: `
            <div class="flex flex-col gap-4">
                <PriceField v-bind="args" v-model="value" placeholder="currency" icon="currency" />
                <PriceField v-bind="args" v-model="value" placeholder="bitcoin" icon="bitcoin" />
                <PriceField v-bind="args" v-model="value" placeholder="dollar" icon="dollar" />
                <PriceField v-bind="args" v-model="value" placeholder="euro" icon="euro" />
                <PriceField v-bind="args" v-model="value" placeholder="gem" icon="gem" />
                <PriceField v-bind="args" v-model="value" placeholder="yen" icon="yen" />
                <PriceField v-bind="args" v-model="value" placeholder="percent" icon="percent" />
                <PriceField v-bind="args" v-model="value" placeholder="sterling" icon="sterling" />
                <PriceField v-bind="args" v-model="value" placeholder="ruble" icon="ruble" />
                <PriceField v-bind="args" v-model="value" placeholder="franc" icon="franc" />
                <PriceField v-bind="args" v-model="value" placeholder="Custom Icon" :icon="icon" />
            </div>
        `
    })
};
