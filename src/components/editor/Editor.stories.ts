import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import { componentDescription } from '../../stories/component-descriptions';
import { Editor } from './index';
const meta = {
    title: 'FormFields/EditorTinyMCE',
    component: Editor,
    args: {
        toolbar: 'undo redo | blocks | bold italic underline | bullist numlist | removeformat',
        height: 380,
        disabled: false,
        readonly: false,
        placeholder: '',
    },
    argTypes: {
        height: { control: { type: 'number', min: 160, max: 800 } },
        disabled: { control: 'boolean' },
        readonly: { control: 'boolean' },
        placeholder: { control: 'text' },
        toolbar: { control: 'text' },
        class: { control: false },
        modelValue: { control: false },
    },
    parameters: {
        controls: { include: ['height', 'disabled', 'readonly', 'placeholder', 'toolbar'] },
        docs: { description: { component: componentDescription('Editor') } },
    },
} satisfies Meta<typeof Editor>;
export default meta;
export const Default: StoryObj<typeof meta> = {
    render: (args, { globals }) => ({
        components: { Editor },
        setup: () => ({
            args,
            locale: globals.locale,
            label: globals.locale === 'de' ? 'Inhalt' : 'Content',
            value: ref(
                globals.locale === 'de'
                    ? '<p>Bearbeite diesen <strong>Inhalt</strong>.</p>'
                    : '<p>Edit this <strong>content</strong>.</p>',
            ),
        }),
        template:
            '<div style="width:min(44rem,calc(100vw - 4rem))"><Editor v-bind="args" v-model="value" :locale="locale" :label="label"/><output class="mt-3 block break-all text-xs text-muted-foreground">{{ value }}</output></div>',
    }),
};
export const Readonly: StoryObj<typeof meta> = { ...Default, args: { readonly: true } };
export const Disabled: StoryObj<typeof meta> = { ...Default, args: { disabled: true } };
export const CompactToolbar: StoryObj<typeof meta> = {
    ...Default,
    args: { height: 220, toolbar: 'bold italic | bullist numlist' },
};
