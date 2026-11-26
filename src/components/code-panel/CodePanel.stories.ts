import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { codeApiCopy } from '../../stories/code-documentation';
import { CodePanelDocs } from '../../stories/CodePanelDocs';
import { componentControls, controlNames } from '../../stories/component-controls';
import { componentDescription } from '../../stories/component-descriptions';
import { componentStory } from '../../stories/component-fixtures';
import { CodePanel } from './index';
const meta = {
    ...componentControls('CodePanel'),
    title: 'Components/CodePanel',
    component: CodePanel,
    parameters: {
        controls: { include: controlNames('CodePanel') },
        docs: {
            page: CodePanelDocs,
            description: { component: componentDescription('CodePanel') },
        },
    },
} satisfies Meta;
Object.assign(
    meta.argTypes,
    Object.fromEntries(
        Object.entries(meta.argTypes).map(([name, control]) => [
            name,
            {
                ...control,
                description: codeApiCopy.CodePanel.props[name],
                table: { category: 'CodePanel props' },
            },
        ]),
    ),
);
export default meta;
export const Default: StoryObj = {
    render: componentStory('<CodePanel v-bind="controlProps()"/>', 'CodePanel'),
};
export const Condensed: StoryObj = {
    args: { condensed: true },
    render: componentStory('<CodePanel v-bind="controlProps()"/>', 'CodePanel'),
};
export const Html: StoryObj = {
    args: { language: 'html', value: '<section><h2>MIRU</h2><p>Shared UI</p></section>' },
    render: componentStory('<CodePanel v-bind="controlProps()"/>', 'CodePanel'),
};
export const PlainText: StoryObj = {
    args: { language: 'text', value: 'SH-2026-001\n200 OK' },
    render: componentStory('<CodePanel v-bind="controlProps()"/>', 'CodePanel'),
};
export const InvalidJson: StoryObj = {
    args: { value: '{invalid JSON' },
    render: componentStory('<CodePanel v-bind="controlProps()"/>', 'CodePanel'),
};
