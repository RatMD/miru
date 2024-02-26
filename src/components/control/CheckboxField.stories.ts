import type { Meta, StoryObj } from '@storybook/vue3';

import { ref } from 'vue';
import FormControl from '../form/FormControl.vue';
import CheckboxField from './CheckboxField.vue';

/**
 * Title
 */
const meta = {
    title: 'Form/Controls/CheckboxField',
    component: CheckboxField,
    tags: ['autodocs'],
    argTypes: {
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
        label: "Checkbox Field"
    },
} satisfies Meta<typeof CheckboxField>;

type Story = StoryObj<typeof meta>;
export default meta;

/**
 * Default Variant
 */
export const Default: Story = {
    args: {
        
    },
    render: (args: any) => ({
        components: { CheckboxField },
        setup() {
            const value = ref();
            return { args, value };
        },
        template: `
            <CheckboxField v-bind="args" v-model="value" />
        `
    })
};


/**
 * Default Variant
 */
export const Sizes: Story = {
    args: {
        
    },
    render: (args: any) => ({
        components: { CheckboxField },
        setup() {
            const valueSM = ref();
            const valueMD = ref();
            const valueLG = ref();
            return { args, valueSM, valueMD, valueLG };
        },
        template: `
            <div class="flex flex-col gap-4">
                <CheckboxField v-bind="args" size="sm" v-model="valueSM" />
                <CheckboxField v-bind="args" v-model="valueMD" />
                <CheckboxField v-bind="args" size="lg" v-model="valueLG" />
            </div>
        `
    })
};

/**
 * Default Variant
 */
export const States: Story = {
    args: {
        
    },
    render: (args: any) => ({
        components: { CheckboxField },
        setup() {
            const valueNormal = ref();
            const valueChecked = ref(true);
            const valueDisabled = ref();
            const valueBoth = ref(true);
            const valueValid = ref();
            const valueInvalid = ref();
            return { 
                args,
                valueNormal,
                valueChecked,
                valueDisabled,
                valueBoth,
                valueValid,
                valueInvalid
            };
        },
        template: `
            <div class="flex flex-col gap-4">
                <CheckboxField v-bind="args" v-model="valueNormal" label="Default" />
                <CheckboxField v-bind="args" v-model="valueChecked" label="Checked" />
                <CheckboxField v-bind="args" v-model="valueDisabled" label="Disabled" disabled />
                <CheckboxField v-bind="args" v-model="valueBoth" label="Disabled & Checked" disabled />
                <CheckboxField v-bind="args" v-model="valueValid" validation="valid" />
                <CheckboxField v-bind="args" v-model="valueInvalid" validation="invalid" />
            </div>
        `
    })
};

/**
 * FormControl
 */
export const FormControlVariant: Story = {
    name: 'Form Control',
    args: {
        
    },
    render: (args: any) => ({
        components: { FormControl, CheckboxField },
        setup() {
            const value = ref<string>('');
            return { args, value };
        },
        template: `
            <FormControl label="FormControl Label" description="FormControl Description">
                <CheckboxField v-bind="args" v-model="value" />
            </FormControl>
        `
    })
};
