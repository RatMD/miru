import type { Meta, StoryObj } from '@storybook/vue3-vite';
import CalendarBookingDemo from '../../stories/CalendarBookingDemo.vue';
import { ComponentDocs } from '../../stories/ComponentDocs';
import { formStory } from '../../stories/form-fixtures';
import {
    utilitySummaries,
    utilityDependencyMarkdown,
    describeUtilityControls,
} from '../../stories/utilities-documentation';
import { Calendar } from './index';

const meta: Meta = {
    title: 'Utilities/Calendar',
    parameters: {
        docs: {
            page: ComponentDocs,
            description: {
                component:
                    utilitySummaries.Calendar +
                    '\n\n' +
                    utilityDependencyMarkdown('Calendar', true),
            },
        },
    },
    component: Calendar as unknown as NonNullable<Meta['component']>,
    args: {
        size: 'default',
        disabled: false,
        weekStartsOn: 1,
        disableHolidays: true,
        disabledWeekdays: [],
    },
    argTypes: {
        weekStartsOn: { control: 'select', options: [0, 1, 2, 3, 4, 5, 6] },
        disabledWeekdays: { control: 'check', options: [0, 1, 2, 3, 4, 5, 6] },
        disableHolidays: { control: 'boolean' },
        allowNonContiguousRanges: { control: 'boolean' },
        range: { control: 'boolean' },
        size: { control: 'select', options: ['sm', 'default', 'lg'] },
        disabled: { control: 'boolean' },
    },
    render: formStory(
        '<Calendar v-if="args.range" range v-bind="args" v-model="range" :locale="locale" /><Calendar v-else v-bind="args" v-model="day" :locale="locale" /><output data-testid="value">{{ args.range ? range : day?.toString() }}</output>',
    ),
};
meta.parameters = { ...meta.parameters, controls: { include: Object.keys(meta.argTypes ?? {}) } };
describeUtilityControls('Calendar', meta.argTypes ?? {}, meta);
export default meta;
export const Default: StoryObj = {};
export const Disabled: StoryObj = { args: { disabled: true } };
export const Small: StoryObj = { args: { size: 'sm' } };
export const Large: StoryObj = { args: { size: 'lg' } };

export const Range: StoryObj = { args: { range: true } };
export const OneMonthRange: StoryObj = { args: { range: true, numberOfMonths: 1 } };

export const SundayStart: StoryObj = { args: { weekStartsOn: 0 } };
export const BlockedDays: StoryObj = {
    args: {
        disabledWeekdays: [0],
        disabledDates: ['2026-11-19'],
        holidays: { '2026-11-20': 'Example holiday' },
        availability: { '2026-11-21': { available: 0 }, '2026-11-23': { closed: true } },
    },
};
export const BlockedRange: StoryObj = {
    ...BlockedDays,
    args: { ...BlockedDays.args, range: true, numberOfMonths: 1 },
};

export const BookingAvailability: StoryObj = {
    render: (args, { globals }) => ({
        components: { CalendarBookingDemo },
        setup: () => ({ args, locale: globals.locale === 'de' ? 'de-DE' : 'en-US' }),
        template: '<CalendarBookingDemo :locale="locale" :week-starts-on="args.weekStartsOn" />',
    }),
};

export const HolidayAllowed: StoryObj = {
    ...BlockedDays,
    args: { ...BlockedDays.args, disableHolidays: false },
};
export const DateBounds: StoryObj = {
    render: formStory(
        '<Calendar v-model="day" :locale="locale" :min-value="range.start" :max-value="range.end" />',
    ),
};
export const CustomRules: StoryObj = {
    render: formStory(
        '<Calendar v-model="day" :locale="locale" :is-date-disabled="date => date.day === 18" :is-date-unavailable="date => date.day === 19" />',
    ),
};
