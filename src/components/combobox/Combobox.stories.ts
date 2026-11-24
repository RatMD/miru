import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import ComboboxFormDemo from '../../stories/ComboboxFormDemo.vue';
import { componentDescription } from '../../stories/component-descriptions';
import { ComboboxField } from './index';
const meta = {
    title: 'FormFields/Combobox',
    component: ComboboxField,
    args: {
        options: [],
        modelValue: null as string | null,
        disabled: false,
        clearable: true,
        invalid: false,
        size: 'default',
    },
    argTypes: {
        disabled: { control: 'boolean' },
        clearable: { control: 'boolean' },
        invalid: { control: 'boolean' },
        size: { control: 'select', options: ['sm', 'default', 'lg'] },
    },
    parameters: {
        controls: { include: ['disabled', 'clearable', 'invalid', 'size'] },
        docs: { description: { component: componentDescription('ComboboxField') } },
    },
} satisfies Meta;
export default meta;
export const Default: StoryObj<typeof meta> = {
    render: (args, { globals }) => ({
        components: { ComboboxField },
        setup: () => ({
            args,
            value: ref<string | null>(args.modelValue ?? null),
            label: globals.locale === 'de' ? 'Projekt suchen' : 'Search projects',
            options: [
                { value: 'workspace', label: 'Workspace' },
                { value: 'default', label: 'MIRU' },
                { value: 'portal', label: 'Example App' },
                {
                    value: 'archived',
                    label: globals.locale === 'de' ? 'Archiviert' : 'Archived',
                    disabled: true,
                },
            ],
        }),
        template:
            '<div class="w-80"><ComboboxField v-bind="args" v-model="value" :options="options" :label="label" :placeholder="label"/><output>{{ value }}</output></div>',
    }),
};
export const Selected: StoryObj<typeof meta> = {
    ...Default,
    args: { options: [], modelValue: 'workspace' },
};
export const Disabled: StoryObj<typeof meta> = { ...Default, args: { disabled: true } };

export const InForm: StoryObj = {
    parameters: { controls: { disable: true } },
    render: (_, { globals }) => ({
        components: { ComboboxFormDemo },
        setup: () => ({ locale: globals.locale || 'en' }),
        template: '<ComboboxFormDemo :locale="locale"/>',
    }),
};
