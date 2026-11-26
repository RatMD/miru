import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { componentControls, controlNames } from '../../stories/component-controls';
import { componentDescription } from '../../stories/component-descriptions';
import { componentStory } from '../../stories/component-fixtures';
import { skeletonApiCopy } from '../../stories/skeleton-documentation';
import { SkeletonDocs } from '../../stories/SkeletonDocs';
import { Skeleton } from './index';
const meta = {
    ...componentControls('Skeleton'),
    title: 'Components/Skeleton',
    component: Skeleton,
    parameters: {
        controls: { include: controlNames('Skeleton') },
        docs: { page: SkeletonDocs, description: { component: componentDescription('Skeleton') } },
    },
} satisfies Meta;
const exampleCopy: Record<string, string> = {
    width: 'The placeholder width in pixels for this example.',
    height: 'The placeholder height in pixels for this example.',
    rounded: 'Use rounded corners for this example.',
};
Object.assign(
    meta.argTypes ?? {},
    Object.fromEntries(
        Object.entries(meta.argTypes ?? {}).map(([name, control]) => [
            name,
            {
                ...control,
                description: skeletonApiCopy.Skeleton.props[name] ?? exampleCopy[name],
                table: {
                    ...control?.table,
                    category: exampleCopy[name] ? 'Example content' : 'Skeleton props',
                },
            },
        ]),
    ),
);
export default meta;
export const Default: StoryObj = {
    render: componentStory(
        '<Skeleton v-bind="controlProps()" :class="args.rounded ? \'rounded-md\' : \'rounded-none\'" :style="{width:args.width + \'px\',height:args.height + \'px\'}" :aria-label="labels.loading" role="status"/>',
        'Skeleton',
    ),
};
