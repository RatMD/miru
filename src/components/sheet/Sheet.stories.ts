import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { componentControls, controlNames } from '../../stories/component-controls';
import { componentDescription } from '../../stories/component-descriptions';
import { componentStory } from '../../stories/component-fixtures';
import { Sheet } from './index';
const meta = {
    ...componentControls('Sheet'),
    title: 'Overlay/Sheet',
    component: Sheet,
    parameters: {
        controls: { include: controlNames('Sheet') },
        docs: { description: { component: componentDescription('Sheet') } },
    },
} satisfies Meta;
export default meta;
export const Default: StoryObj = {
    render: componentStory(
        '<Sheet v-bind="controlProps()" v-model:open="open"><SheetTrigger as-child><Button variant="outline">{{ labels.open }}</Button></SheetTrigger><SheetContent v-bind="controlProps(\'content\')"><SheetHeader><SheetTitle>{{ args.title }}</SheetTitle><SheetDescription>{{ args.description }}</SheetDescription></SheetHeader><div class="p-4">{{ labels.details }}</div><SheetFooter><SheetClose as-child><Button variant="outline">{{ labels.cancel }}</Button></SheetClose></SheetFooter></SheetContent></Sheet>',
        'Sheet',
    ),
};
export const Top: StoryObj = { ...Default, args: { side: 'top' } };
export const Right: StoryObj = { ...Default, args: { side: 'right' } };
export const Bottom: StoryObj = { ...Default, args: { side: 'bottom' } };
export const Left: StoryObj = { ...Default, args: { side: 'left' } };
