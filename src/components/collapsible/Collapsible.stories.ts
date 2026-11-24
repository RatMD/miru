import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { componentControls, controlNames } from '../../stories/component-controls';
import { componentDescription } from '../../stories/component-descriptions';
import { componentStory } from '../../stories/component-fixtures';
import { Collapsible } from './index';
const meta = {
    ...componentControls('Collapsible'),
    title: 'Utilities/Collapsible',
    component: Collapsible,
    parameters: {
        controls: { include: controlNames('Collapsible') },
        docs: { description: { component: componentDescription('Collapsible') } },
    },
} satisfies Meta;
export default meta;
export const Default: StoryObj = {
    render: componentStory(
        '<Collapsible v-bind="controlProps()" v-model:open="open"><CollapsibleTrigger as-child><Button variant="outline">{{ labels.more }}</Button></CollapsibleTrigger><CollapsibleContent class="mt-3 rounded border p-4">{{ labels.description }}</CollapsibleContent></Collapsible>',
        'Collapsible',
    ),
};
