import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { componentControls, controlNames } from '../../stories/component-controls';
import { componentDescription } from '../../stories/component-descriptions';
import { componentStory } from '../../stories/component-fixtures';
import { ScrollArea } from './index';
const meta = {
    ...componentControls('ScrollArea'),
    title: 'Utilities/ScrollArea',
    component: ScrollArea,
    parameters: {
        controls: { include: controlNames('ScrollArea') },
        docs: { description: { component: componentDescription('ScrollArea') } },
    },
} satisfies Meta;
export default meta;
export const Default: StoryObj = {
    render: componentStory(
        '<ScrollArea v-bind="controlProps()" :style="{height:args.height + \'px\'}" class="rounded border"><div class="p-4" :class="args.orientation === \'vertical\' ? \'\' : \'min-w-[60rem]\'"><p v-for="n in 30" :key="n" class="border-b py-2">{{ labels.count }} {{ n }}</p></div></ScrollArea>',
        'ScrollArea',
    ),
};
