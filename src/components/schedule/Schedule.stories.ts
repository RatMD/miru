import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ComponentDocs } from '../../stories/ComponentDocs';
import {
    extensionSummaries,
    extensionDependencyMarkdown,
    describeExtensionControls,
} from '../../stories/extensions-documentation';
import ScheduleDemo from '../../stories/ScheduleDemo.vue';
import { Schedule } from './index';
const meta: Meta = {
    title: 'Extensions/Schedule',
    component: Schedule,
    tags: ['autodocs'],
    args: { readonly: false, highlightHolidays: true },
    argTypes: { readonly: { control: 'boolean' }, highlightHolidays: { control: 'boolean' } },
    parameters: {
        layout: 'padded',
        controls: { include: ['readonly', 'highlightHolidays'] },
        docs: {
            page: ComponentDocs,
            description: {
                component:
                    extensionSummaries.Schedule +
                    '\n\n' +
                    extensionDependencyMarkdown('Schedule', true),
            },
        },
    },
};
describeExtensionControls('Schedule', meta.argTypes ?? {});
meta.parameters = {
    ...meta.parameters,
    controls: { ...meta.parameters?.controls, include: Object.keys(meta.argTypes ?? {}) },
};
export default meta;
function example(
    scenario: 'compact' | 'organizer' | 'readonly' | 'marketing' | 'day-details',
    extra: {
        remote?: boolean;
        empty?: boolean;
        detailMode?: 'list' | 'cards' | 'description';
        crowded?: boolean;
    } = {},
): StoryObj {
    return {
        render: (args, { globals }) => ({
            components: { ScheduleDemo },
            setup: () => ({
                args,
                scenario,
                extra,
                locale: globals.locale === 'de' ? 'de-DE' : 'en-US',
            }),
            template:
                '<ScheduleDemo :scenario="scenario" :locale="locale" :read-only="args.readonly" :highlight-holidays="args.highlightHolidays" v-bind="extra" />',
        }),
    };
}
export const CompactCard = example('compact');
export const Organizer = example('organizer');
export const ReadOnly = example('readonly');
export const MarketingRanges = example('marketing');
export const DayDetails = example('day-details');
export const CachedDataSource = example('marketing', { remote: true });
export const Empty = example('organizer', { empty: true });
export const ScrollableDayDetails = example('compact', { crowded: true });
export const CardEventDetails = example('compact', { detailMode: 'cards' });
export const TextEventDetails = example('compact', { detailMode: 'description' });
