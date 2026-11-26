import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { componentControls, controlNames } from '../../stories/component-controls';
import { componentStory } from '../../stories/component-fixtures';
import { ComponentDocs } from '../../stories/ComponentDocs';
import {
    utilitySummaries,
    utilityDependencyMarkdown,
    describeUtilityControls,
} from '../../stories/utilities-documentation';
import { Copy } from './index';
const meta = {
    ...componentControls('Copy'),
    title: 'Utilities/Copy',
    component: Copy,
    parameters: {
        controls: { include: controlNames('Copy') },
        docs: {
            page: ComponentDocs,
            description: {
                component: utilitySummaries.Copy + '\n\n' + utilityDependencyMarkdown('Copy', true),
            },
        },
    },
} satisfies Meta;
describeUtilityControls('Copy', meta.argTypes ?? {}, meta);
export default meta;
export const Default: StoryObj = {
    render: componentStory(
        '<Copy v-bind="controlProps()"><Badge variant="outline"><IconClipboard/>{{ args.label }}</Badge></Copy>',
        'Copy',
    ),
};
