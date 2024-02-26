import type { Meta, StoryObj } from '@storybook/vue3';

import FormControl from './FormControl.vue';

/**
 * Title
 */
const meta = {
    title: 'Form/FormControl',
    component: FormControl,
    tags: ['autodocs'],
    argTypes: {
        id: {
            control: 'text'
        },
        name: {
            control: 'text'
        },
        //@ts-ignore    //@todo temporary solution, since storybook does not support props / slots with the same name
        'label ': {
            control: 'text',
            description: 'Primary form control label, shown above the control field itself in most cases.',
            table: {
                category: 'props'
            }
        },
        //@ts-ignore    //@todo temporary solution, since storybook does not support props / slots with the same name
        'description ': {
            control: 'text',
            description: 'Additional form control description text, shown below this control field.',
            table: {
                category: 'props'
            }
        },
        //@ts-ignore    //@todo temporary solution, since storybook does not support props / slots with the same name
        'validation ': {
            control: 'radio',
            description: 'The validation state for this form control.',
            options: [null, 'valid', 'invalid'],
            table: {
                category: 'props'
            }
        },
        validationMessage: {
            control: 'text'
        },
        disabled: {
            control: 'boolean'
        },
        required: {
            control: 'boolean'
        },
        vad: {
            control: 'boolean'
        },
    },
    args: {

    },
} satisfies Meta<typeof FormControl>;

type Story = StoryObj<typeof meta>;
export default meta;

/**
 * Default Variant
 */
export const Default: Story = {
    args: {
        
    },
};
