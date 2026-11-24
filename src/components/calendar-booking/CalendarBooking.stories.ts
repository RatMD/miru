import type { Meta, StoryObj } from '@storybook/vue3-vite';
import CalendarBookingIntegrationDemo from '../../stories/CalendarBookingIntegrationDemo.vue';
import { CalendarBooking } from './index';
const meta: Meta = {
    title: 'Extensions/TimeSlots',
    component: CalendarBooking,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Optional booking composition. Backend owns capacity, permissions and persistence. Toggle single/range, one/two months, loading/error; retain a booked slot or confirm a special appointment.',
            },
        },
    },
    render: (_args, { globals }) => ({
        components: { CalendarBookingIntegrationDemo },
        setup: () => ({ locale: globals.locale === 'de' ? 'de-DE' : 'en-US' }),
        template: '<CalendarBookingIntegrationDemo :locale="locale" />',
    }),
};
export default meta;
export const TicketBooking: StoryObj = {};
