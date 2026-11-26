import type { EditorFrameExtension } from './types';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { IconLetterCaseUpper, IconBrackets } from '@tabler/icons-vue';
import { expect, userEvent, within } from 'storybook/test';
import { ref } from 'vue';
import { ComponentDocs } from '../../stories/ComponentDocs';
import {
    utilitySummaries,
    utilityDependencyMarkdown,
    describeUtilityControls,
} from '../../stories/utilities-documentation';
import { EditorFrame } from './index';

const meta = {
    title: 'Utilities/EditorFrame',
    component: EditorFrame,
    parameters: {
        layout: 'padded',
        docs: {
            page: ComponentDocs,
            description: {
                component:
                    utilitySummaries.EditorFrame +
                    '\n\n' +
                    utilityDependencyMarkdown('EditorFrame', true),
            },
        },
    },
    args: { label: 'Text editor', counter: true, disabled: false, readonly: false, rows: 8 },
    argTypes: {
        disabled: { control: 'boolean' },
        readonly: { control: 'boolean' },
        counter: { control: 'boolean' },
    },
    render: (args) => ({
        components: { EditorFrame },
        setup() {
            const extensions: EditorFrameExtension[] = [
                {
                    id: 'example',
                    commands: [
                        {
                            id: 'uppercase',
                            label: 'Uppercase',
                            icon: IconLetterCaseUpper,
                            run: (api) => api.setValue(api.value.toUpperCase()),
                        },
                        {
                            id: 'brackets',
                            label: 'Wrap selection',
                            icon: IconBrackets,
                            run: (api) =>
                                api.replaceSelection(
                                    '[' +
                                        api.value.slice(
                                            api.getSelection().start,
                                            api.getSelection().end,
                                        ) +
                                        ']',
                                ),
                        },
                    ],
                },
            ];
            return { args, value: ref('Hello Miru'), extensions };
        },
        template:
            '<div class="mx-auto max-w-3xl"><EditorFrame v-bind="args" v-model="value" :extensions="extensions" /><output data-testid="value">{{ value }}</output></div>',
    }),
} satisfies Meta;
describeUtilityControls('EditorFrame', meta.argTypes ?? {}, meta);
export default meta;
export const Default: StoryObj = {};
export const Readonly: StoryObj = { args: { readonly: true } };
export const Disabled: StoryObj = { args: { disabled: true } };
export const Commands: StoryObj = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await userEvent.click(canvas.getByRole('button', { name: 'Uppercase' }));
        const input = canvas.getByRole('textbox');
        await expect(input).toHaveValue('HELLO MIRU');
        (input as HTMLTextAreaElement).setSelectionRange(0, 5);
        await userEvent.click(canvas.getByRole('button', { name: 'Wrap selection' }));
        await expect(input).toHaveValue('[HELLO] MIRU');
        await expect(input).toHaveFocus();
    },
};
