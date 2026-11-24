import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { componentControls, controlNames } from '../../stories/component-controls';
import { componentDescription } from '../../stories/component-descriptions';
import { componentStory } from '../../stories/component-fixtures';
import { BadgeCopy } from './index';
const meta = {
    ...componentControls('BadgeCopy'),
    title: 'Components/BadgeCopy',
    component: BadgeCopy,
    parameters: {
        controls: { include: controlNames('BadgeCopy') },
        docs: { description: { component: componentDescription('BadgeCopy') } },
    },
} satisfies Meta;
export default meta;
export const Default: StoryObj = {
    render: componentStory(
        '<BadgeCopy v-bind="controlProps()"><template v-if="args.showIcon" #icon><IconClipboard/></template></BadgeCopy>',
        'BadgeCopy',
    ),
};
export const Colors: StoryObj = {
    parameters: { controls: { disable: true } },
    render: componentStory(
        '<div class="flex flex-wrap gap-2"><BadgeCopy v-for="variant in colors" :key="variant" :variant="variant" :content="variant"><template #icon><IconClipboard/></template></BadgeCopy></div>',
        'BadgeCopy',
    ),
};
