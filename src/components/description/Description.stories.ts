import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { componentControls, controlNames } from '../../stories/component-controls';
import { componentDescription } from '../../stories/component-descriptions';
import { componentStory } from '../../stories/component-fixtures';
import { Description } from './index';
const meta = {
    ...componentControls('Description'),
    title: 'Overlay/Description',
    component: Description,
    parameters: {
        controls: { include: controlNames('Description') },
        docs: { description: { component: componentDescription('Description') } },
    },
} satisfies Meta;
export default meta;
export const Default: StoryObj = {
    render: componentStory(
        '<div class="flex justify-center"><Description v-bind="controlProps()" v-model:open="open"><p>{{ labels.details }}</p></Description></div>',
        'Description',
    ),
};
export const CustomTrigger: StoryObj = {
    render: componentStory(
        '<Description v-bind="controlProps()" v-model:open="open"><template #trigger><Button variant="outline">{{ labels.more }}</Button></template><p>{{ labels.details }}</p></Description>',
        'Description',
    ),
};

export const EndAligned: StoryObj = { ...Default, args: { align: 'end' } };
export const CenterAligned: StoryObj = { ...Default, args: { align: 'center' } };
