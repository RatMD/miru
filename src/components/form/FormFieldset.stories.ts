import type { Meta, StoryObj } from '@storybook/vue3';

import FormFieldSet from './FormFieldSet.vue';

/**
 * Title
 */
const meta = {
    title: 'Form/Groups/FormFieldSet',
    component: FormFieldSet,
    tags: ['autodocs'],
    argTypes: {

    },
    args: {

    },
} satisfies Meta<typeof FormFieldSet>;

type Story = StoryObj<typeof meta>;
export default meta;

/**
 * Default Variant
 */
export const Default: Story = {
    args: {
        
    },
};
