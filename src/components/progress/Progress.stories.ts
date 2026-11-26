import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { componentControls, controlNames } from '../../stories/component-controls';
import { componentDescription } from '../../stories/component-descriptions';
import { componentStory } from '../../stories/component-fixtures';
import { progressApiCopy } from '../../stories/progress-documentation';
import { ProgressDocs } from '../../stories/ProgressDocs';
import { Progress } from './index';
const meta = {
    ...componentControls('Progress'),
    title: 'Components/Progress',
    component: Progress,
    parameters: {
        controls: { include: controlNames('Progress') },
        docs: { page: ProgressDocs, description: { component: componentDescription('Progress') } },
    },
} satisfies Meta;
Object.assign(
    meta.argTypes,
    Object.fromEntries(
        Object.entries(meta.argTypes).map(([name, control]) => [
            name,
            {
                ...control,
                description: progressApiCopy.Progress.props[name],
                table: { category: 'Progress props' },
            },
        ]),
    ),
);
export default meta;
export const Default: StoryObj = {
    render: componentStory(
        '<Progress v-bind="controlProps()" :aria-label="labels.loading"/>',
        'Progress',
    ),
};
export const Variants: StoryObj = {
    parameters: { controls: { disable: true } },
    render: componentStory(
        '<div v-for="variant in progressColors" :key="variant" class="grid gap-2"><span class="text-xs">{{ variant }}</span><Progress :model-value="64" :variant="variant" :aria-label="variant + \' / \' + labels.ready"/><Progress :model-value="64" :variant="variant" animated :aria-label="variant + \' / \' + labels.loading"/></div>',
        'Progress',
    ),
};
