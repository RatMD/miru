import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { componentControls, controlNames } from '../../stories/component-controls';
import { componentDescription } from '../../stories/component-descriptions';
import { componentStory } from '../../stories/component-fixtures';
import { BadgeCounter } from './index';
const meta = {
    ...componentControls('BadgeCounter'),
    title: 'Components/BadgeCounter',
    component: BadgeCounter,
    parameters: {
        controls: { include: controlNames('BadgeCounter') },
        docs: { description: { component: componentDescription('BadgeCounter') } },
    },
} satisfies Meta;
export default meta;
export const Default: StoryObj = {
    render: componentStory('<BadgeCounter v-bind="controlProps()"/>', 'BadgeCounter'),
};
export const PositionsAndColors: StoryObj = {
    parameters: { controls: { disable: true } },
    render: componentStory(
        '<div v-for="position in [\'left\',\'right\']" :key="position" class="flex flex-wrap gap-2"><BadgeCounter v-for="variant in colors" :key="variant" :variant="variant" :number-position="position" :value="42" :label="variant"/></div>',
        'BadgeCounter',
    ),
};
