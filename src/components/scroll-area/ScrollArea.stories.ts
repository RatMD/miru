import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { componentControls, controlNames } from '../../stories/component-controls';
import { componentStory } from '../../stories/component-fixtures';
import { ComponentDocs } from '../../stories/ComponentDocs';
import {
    utilitySummaries,
    utilityDependencyMarkdown,
    describeUtilityControls,
} from '../../stories/utilities-documentation';
import { ScrollArea } from './index';
const meta = {
    ...componentControls('ScrollArea'),
    title: 'Utilities/ScrollArea',
    component: ScrollArea,
    parameters: {
        controls: { include: controlNames('ScrollArea') },
        docs: {
            page: ComponentDocs,
            description: {
                component:
                    utilitySummaries.ScrollArea +
                    '\n\n' +
                    utilityDependencyMarkdown('ScrollArea', true),
            },
        },
    },
} satisfies Meta;
describeUtilityControls('ScrollArea', meta.argTypes ?? {}, meta);
export default meta;
export const Default: StoryObj = {
    render: componentStory(
        '<ScrollArea v-bind="controlProps()" :style="{height:args.height + \'px\'}" class="rounded border"><div class="p-4" :class="args.orientation === \'vertical\' ? \'\' : \'min-w-[60rem]\'"><p v-for="n in 30" :key="n" class="border-b py-2">{{ labels.count }} {{ n }}</p></div></ScrollArea>',
        'ScrollArea',
    ),
};
