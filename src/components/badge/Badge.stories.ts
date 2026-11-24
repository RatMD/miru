import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { componentControls, controlNames } from '../../stories/component-controls';
import { componentDescription } from '../../stories/component-descriptions';
import { componentStory } from '../../stories/component-fixtures';
import { Badge } from './index';
const meta = {
    ...componentControls('Badge'),
    title: 'Components/Badge',
    component: Badge,
    parameters: {
        controls: { include: controlNames('Badge') },
        docs: { description: { component: componentDescription('Badge') } },
    },
} satisfies Meta;
export default meta;
export const Default: StoryObj = {
    render: componentStory(
        '<Badge v-bind="controlProps()"><IconCheck v-if="args.showIcon"/>{{ args.label }}</Badge>',
        'Badge',
    ),
};
export const Variants: StoryObj = {
    parameters: { controls: { disable: true } },
    render: componentStory(
        '<div v-for="size in [\'default\',\'lg\']" :key="size" class="flex flex-wrap gap-2"><Badge v-for="variant in colors" :key="variant" :variant="variant" :size="size"><IconCheck/>{{ variant }}</Badge></div>',
        'Badge',
    ),
};
export const Links: StoryObj = {
    parameters: { controls: { disable: true } },
    render: componentStory(
        '<div class="flex flex-wrap gap-2"><Badge as="link" href="#overview" variant="primary"><IconCheck/>{{ labels.first }}</Badge><Badge as-tag="a" href="#activity" variant="outline" size="lg"><IconMail/>{{ labels.second }}</Badge></div>',
        'Badge',
    ),
};
