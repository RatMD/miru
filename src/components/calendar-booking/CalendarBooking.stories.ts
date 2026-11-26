import type { Meta, StoryObj } from '@storybook/vue3-vite';
import CalendarBookingIntegrationDemo from '../../stories/CalendarBookingIntegrationDemo.vue';
import { ComponentExamplesDocs as ComponentDocs } from '../../stories/ComponentDocs';
import {
    extensionSummaries,
    extensionDependencyMarkdown,
} from '../../stories/extensions-documentation';
import { CalendarBooking } from './index';
const meta: Meta = {
    title: 'Extensions/TimeSlots',
    component: CalendarBooking,
    tags: ['autodocs'],
    parameters: {
        docs: {
            page: ComponentDocs,
            description: {
                component:
                    extensionSummaries.CalendarBooking +
                    '\n\n' +
                    extensionDependencyMarkdown('CalendarBooking', true),
            },
        },
    },
    render: (_args, { globals }) => ({
        components: { CalendarBookingIntegrationDemo },
        setup: () => ({ locale: globals.locale === 'de' ? 'de-DE' : 'en-US' }),
        template: '<CalendarBookingIntegrationDemo :locale="locale" />',
    }),
};
meta.parameters = { ...meta.parameters, controls: { disable: true } };
export default meta;
export const TicketBooking: StoryObj = {};
