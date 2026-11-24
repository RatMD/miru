import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { componentControls, controlNames } from '../../stories/component-controls';
import { componentDescription } from '../../stories/component-descriptions';
import { componentStory } from '../../stories/component-fixtures';
import { Copy } from './index';
const meta = {
    ...componentControls('Copy'),
    title: 'Utilities/Copy',
    component: Copy,
    parameters: {
        controls: { include: controlNames('Copy') },
        docs: { description: { component: componentDescription('Copy') } },
    },
} satisfies Meta;
export default meta;
export const Default: StoryObj = {
    render: componentStory(
        '<Copy v-bind="controlProps()"><Badge variant="outline"><IconClipboard/>{{ args.label }}</Badge></Copy>',
        'Copy',
    ),
};
