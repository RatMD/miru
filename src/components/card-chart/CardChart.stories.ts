import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { cardApiCopy } from '../../stories/card-documentation';
import { CardChartDocs } from '../../stories/CardChartDocs';
import { componentControls, controlNames } from '../../stories/component-controls';
import { componentDescription } from '../../stories/component-descriptions';
import { componentStory } from '../../stories/component-fixtures';
import { CardChart } from './index';
const meta = {
    ...componentControls('CardChart'),
    title: 'Components/CardChart',
    component: CardChart,
    parameters: {
        controls: { include: controlNames('CardChart') },
        docs: {
            page: CardChartDocs,
            description: { component: componentDescription('CardChart') },
        },
    },
} satisfies Meta;
for (const [name, control] of Object.entries(meta.argTypes ?? {})) {
    if (!control) continue;
    meta.argTypes[name] = {
        ...control,
        description: cardApiCopy.CardChart.props[name],
        table: { category: 'CardChart props' },
    };
}
export default meta;
export const Default: StoryObj = {
    render: componentStory(
        '<CardChart v-bind="controlProps()"><ApexChart type="area" :series="series" :options="chartOptions"/></CardChart>',
        'CardChart',
    ),
};
export const Empty: StoryObj = { ...Default, args: { empty: true } };
