import type { Meta, StoryObj } from '@storybook/vue3';

import { ref } from 'vue';
import FormControl from '../form/FormControl.vue';
import TextareaField from './TextareaField.vue';

/**
 * Title
 */
const meta = {
    title: 'Form/Controls/TextareaField',
    component: TextareaField,
    tags: ['autodocs'],
    argTypes: {
        placeholder: {
            control: 'text',
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
        size: 'md',
        placeholder: 'Textarea Field'
    },
} satisfies Meta<typeof TextareaField>;

type Story = StoryObj<typeof meta>;
export default meta;

/**
 * Default Variant
 */
export const Default: Story = {
    args: {
        
    },
    render: (args: any) => ({
        components: { TextareaField },
        setup() {
            const value = ref();
            return { args, value };
        },
        template: `
            <TextareaField v-bind="args" v-model="value" />
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
        components: { TextareaField },
        setup() {
            const valueSM = ref();
            const valueMD = ref();
            const valueLG = ref();
            return { args, valueSM, valueMD, valueLG };
        },
        template: `
            <div class="flex flex-col gap-4">
                <TextareaField v-bind="args" size="sm" placeholder="40px height" v-model="valueSM" />
                <TextareaField v-bind="args" placeholder="48px height" v-model="valueMD" />
                <TextareaField v-bind="args" size="lg" placeholder="56px height" v-model="valueLG" />
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
        components: { TextareaField },
        setup() {
            const placeholderValueNormal = ref<string>('');
            const placeholderValueDisabled = ref<string>('');
            const placeholderValueReadonly = ref<string>('');
            const placeholderValueValid = ref<string>('');
            const placeholderValueInvalid = ref<string>('');

            const valueNormal = ref<string>('Default State');
            const valueDisabled = ref<string>('Disabled State');
            const valueReadonly = ref<string>('Readonly State');
            const valueValid = ref<string>('Valid State');
            const valueInvalid = ref<string>('Invalid State');
            return { 
                args,
                placeholderValueNormal,
                placeholderValueDisabled,
                placeholderValueReadonly,
                placeholderValueValid,
                placeholderValueInvalid,
                valueNormal,
                valueDisabled,
                valueReadonly,
                valueValid,
                valueInvalid
            };
        },
        template: `
            <div class="flex flex-row gap-4">
                <div class="flex flex-col gap-4 flex-1">
                    <TextareaField v-bind="args" placeholder="Default State" v-model="placeholderValueNormal" />
                    <TextareaField v-bind="args" placeholder="Disabled State" disabled v-model="placeholderValueDisabled" />
                    <TextareaField v-bind="args" placeholder="Readonly State" readonly v-model="placeholderValueReadonly" />
                    <TextareaField v-bind="args" placeholder="Valid State" validation="valid" v-model="placeholderValueValid" />
                    <TextareaField v-bind="args" placeholder="Invalid State" validation="invalid" v-model="placeholderValueInvalid" />
                </div>
                <div class="flex flex-col gap-4 flex-1">
                    <TextareaField v-bind="args" v-model="valueNormal" />
                    <TextareaField v-bind="args" v-model="valueDisabled" disabled />
                    <TextareaField v-bind="args" v-model="valueReadonly" readonly />
                    <TextareaField v-bind="args" v-model="valueValid" validation="valid" />
                    <TextareaField v-bind="args" v-model="valueInvalid" validation="invalid" />
                </div>
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
        components: { FormControl, TextareaField },
        setup() {
            const value = ref<string>('');
            return { args, value };
        },
        template: `
            <FormControl label="FormControl Label" description="FormControl Description">
                <TextareaField v-bind="args" v-model="value" />
            </FormControl>
        `
    })
};
