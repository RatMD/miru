import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { componentControls, controlNames } from '../../stories/component-controls';
import { componentDescription } from '../../stories/component-descriptions';
import { componentStory } from '../../stories/component-fixtures';
import { ApexChart } from './index';
const meta = {
    ...componentControls('ApexChart'),
    title: 'Extensions/ApexCharts',
    component: ApexChart,
    parameters: {
        controls: { include: controlNames('ApexChart') },
        docs: { description: { component: componentDescription('ApexChart') } },
    },
} satisfies Meta;
export default meta;
export const Line: StoryObj = {
    render: componentStory(
        '<ApexChart v-bind="controlProps()" :series="series" :options="chartOptions"/>',
        'ApexChart',
    ),
};
export const Bar: StoryObj = { ...Line, args: { type: 'bar' } };
export const Donut: StoryObj = {
    args: { type: 'donut' },
    argTypes: { type: { control: 'select', options: ['pie', 'donut', 'radialBar'] } },
    render: componentStory(
        '<ApexChart v-bind="controlProps()" :series="[64,24,12]" :options="donutOptions"/>',
        'ApexChart',
    ),
};
