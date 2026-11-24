import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { componentControls, controlNames } from '../../stories/component-controls';
import { componentDescription } from '../../stories/component-descriptions';
import { componentStory } from '../../stories/component-fixtures';
import { Skeleton } from './index';
const meta = {
    ...componentControls('Skeleton'),
    title: 'Components/Skeleton',
    component: Skeleton,
    parameters: {
        controls: { include: controlNames('Skeleton') },
        docs: { description: { component: componentDescription('Skeleton') } },
    },
} satisfies Meta;
export default meta;
export const Default: StoryObj = {
    render: componentStory(
        '<Skeleton v-bind="controlProps()" :class="args.rounded ? \'rounded-md\' : \'rounded-none\'" :style="{width:args.width + \'px\',height:args.height + \'px\'}" :aria-label="labels.loading" role="status"/>',
        'Skeleton',
    ),
};
