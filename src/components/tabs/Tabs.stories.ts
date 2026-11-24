import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { componentControls, controlNames } from '../../stories/component-controls';
import { componentDescription } from '../../stories/component-descriptions';
import { componentStory } from '../../stories/component-fixtures';
import { selectionVariantsPlay } from '../../stories/selection-checks';
import SelectionVariantsDemo from '../../stories/SelectionVariantsDemo.vue';
import { Tabs } from './index';
const meta = {
    ...componentControls('Tabs'),
    title: 'Components/Tabs',
    component: Tabs,
    parameters: {
        controls: { include: controlNames('Tabs') },
        docs: { description: { component: componentDescription('Tabs') } },
    },
} satisfies Meta;
export default meta;
export const Default: StoryObj = {
    render: componentStory(
        '<Tabs v-bind="controlProps()" v-model="active" :tabs="tabs" :aria-label="labels.title"><template #overview>{{ labels.description }}</template><template #activity>{{ labels.details }}</template></Tabs>',
        'Tabs',
    ),
};
export const Vertical: StoryObj = { ...Default, args: { orientation: 'vertical' } };

export const Variants: StoryObj = {
    parameters: { controls: { disable: true }, layout: 'padded' },
    render: () => ({
        components: { SelectionVariantsDemo },
        template: '<SelectionVariantsDemo kind="tabs" />',
    }),
};
export const ItemOverrides: StoryObj = {
    parameters: { controls: { disable: true }, layout: 'padded' },
    render: () => ({
        components: { SelectionVariantsDemo },
        template: '<SelectionVariantsDemo kind="tabs" overrides />',
    }),
};

export const Interaction: StoryObj = { ...Variants, play: selectionVariantsPlay('tabs') };
