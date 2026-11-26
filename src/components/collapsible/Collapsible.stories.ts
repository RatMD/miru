import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { componentControls, controlNames } from '../../stories/component-controls';
import { componentStory } from '../../stories/component-fixtures';
import { ComponentDocs } from '../../stories/ComponentDocs';
import {
    utilitySummaries,
    utilityDependencyMarkdown,
    describeUtilityControls,
} from '../../stories/utilities-documentation';
import { Collapsible } from './index';
const meta = {
    ...componentControls('Collapsible'),
    title: 'Utilities/Collapsible',
    component: Collapsible,
    parameters: {
        controls: { include: controlNames('Collapsible') },
        docs: {
            page: ComponentDocs,
            description: {
                component:
                    utilitySummaries.Collapsible +
                    '\n\n' +
                    utilityDependencyMarkdown('Collapsible', true),
            },
        },
    },
} satisfies Meta;
describeUtilityControls('Collapsible', meta.argTypes ?? {}, meta);
export default meta;
export const Default: StoryObj = {
    render: componentStory(
        '<Collapsible v-bind="controlProps()" v-model:open="open"><CollapsibleTrigger as-child><Button variant="outline">{{ labels.more }}</Button></CollapsibleTrigger><CollapsibleContent class="mt-3 rounded border p-4">{{ labels.description }}</CollapsibleContent></Collapsible>',
        'Collapsible',
    ),
};
