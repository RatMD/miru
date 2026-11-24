import type { Meta, StoryObj } from '@storybook/vue3-vite';
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
            description: {
                component:
                    'Reusable compact Card or full organizer. Views, filters, editing and holiday highlighting are configurable; month is the default independently of switch ordering. Host-specific mapping is documented in Schedule Integration.',
            },
        },
    },
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
