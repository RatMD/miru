import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { componentDescription } from '../../stories/component-descriptions';
import EditorExamples from '../../stories/EditorExamples.vue';
import { describeFormFieldControls } from '../../stories/form-fields-api-copy';
import { FormFieldDocs } from '../../stories/FormFieldDocs';
import { EditorMarkdown } from './index';
const meta = {
    title: 'FormFields/EditorMarkdown',
    component: EditorMarkdown,
    parameters: {
        layout: 'padded',
        docs: {
            page: FormFieldDocs,
            description: { component: componentDescription('EditorMarkdown') },
        },
    },
    args: {
        counter: false,
        counterMode: 'limit',
        disabled: false,
        readonly: false,
        syntax: 'standard',
        rows: 12,
        maxlength: 65000,
        toolbar: ['heading', 'bold', 'list', 'ordered', 'divider'],
    },
    argTypes: {
        counter: { control: 'boolean' },
        counterMode: { control: 'select', options: ['limit', 'count', 'remaining'] },
        locale: { control: 'select', options: [undefined, 'en', 'de'] },
        disabled: { control: 'boolean' },
        readonly: { control: 'boolean' },
        syntax: { control: 'select', options: ['standard', 'kleinanzeigen'] },
        maxlength: { control: { type: 'number', min: 0 } },
        rows: { control: 'number' },
        toolbar: { control: 'check', options: ['heading', 'bold', 'list', 'ordered', 'divider'] },
        syntaxOptions: { control: 'object' },
    },
    render: (args) => ({
        components: { EditorExamples },
        setup: () => ({ args }),
        template: '<EditorExamples kind="markdown" :args="args"/>',
    }),
} satisfies Meta;
describeFormFieldControls('EditorMarkdown', meta.argTypes);
export default meta;
export const Default: StoryObj = {};
export const Kleinanzeigen: StoryObj = { args: { syntax: 'kleinanzeigen' } };
export const CustomSyntax: StoryObj = {
    args: {
        syntaxOptions: { heading: '## ', bold: '__', bullet: '• ', divider: '====' },
        toolbar: ['heading', 'bold', 'list', 'divider'],
    },
};
export const Readonly: StoryObj = { args: { readonly: true } };

export const WithCounter: StoryObj = { args: { counter: true } };
export const RemainingCharacters: StoryObj = { args: { counter: true, counterMode: 'remaining' } };
