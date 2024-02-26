import type { Meta, StoryObj } from '@storybook/vue3';

import { BadgeCent } from 'lucide-vue-next';
import { ref } from 'vue';
import FormControl from '../form/FormControl.vue';
import PriceField from './PriceField.vue';

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
        components: { PriceField, BadgeCent },
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
                <PriceField v-bind="args" v-model="value" placeholder="Custom Icon" :icon="BadgeCent" />
            </div>
        `
    })
};
