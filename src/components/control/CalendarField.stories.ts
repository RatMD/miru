import type { Meta, StoryObj } from '@storybook/vue3';

import { ref } from 'vue';
import CalendarField from './CalendarField.vue';

/**
 * The **CalendarField** control field component generates an interactive calendar widget. This can 
 * be further configured to allow a minimum / maximum selectable date, or with an additional list 
 * providing different disabled date statements, or adding an additional time selector or much more.
 * 
 * However, if you're looking for a smaller or simpler Date/Time selector field, take a look at the
 * [**DateTimePicker**](/docs/form-controls-datetimepicker--docs) instead. It does not provide as 
 * many options as this one, but uses native control fields on mobile browsers, supporting a more 
 * intuitive and consistent user interface / experience on mobile devices.
 * 
 * PS.: Neither the **CalendarField** nor the **DateTimePicker** depend on an additional date/time
 * library, instead the browser native [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)
 * object is used for translating and formatting the respective values.
 */
const meta = {
    title: 'Form/Controls/CalendarField',
    component: CalendarField,
    tags: ['autodocs'],
    argTypes: {
        weekStarts: {
            control: {
                type: 'range',
                min: 0,
                max: 6,
                step: 1
            }
        },
        weekNumbers: {
            control: 'boolean'
        },
        minDate: {
            control: 'date',
        },
        maxDate: {
            control: 'date',
        },
        dates: {
            control: 'object',
        },
        time: {
            control: 'boolean',
        },
        minTime: {
            control: 'text',
        },
        maxTime: {
            control: 'text',
        },
        hoursStep: {
            control: {
                type: 'number',
                min: 1,
                max: 12,
                step: 1
            }
        },
        minutesStep: {
            control: {
                type: 'number',
                min: 1,
                max: 60,
                step: 1
            }
        },
        secondsStep: {
            control: {
                type: 'number',
                min: 0,
                max: 60,
                step: 1
            }
        },
        locale: {
            control: 'text',
        },

        // Shared Properties
        id: {
            control: 'text',
            table: {
                category: 'Shared Props',
            },
        },
        name: {
            control: 'text',
            table: {
                category: 'Shared Props',
            },
        },
        modelValue: {
            control: 'text',
            table: {
                category: 'Shared Props',
                disable: true,
            },
        },
        validation: {
            control: 'radio',
            options: ['invalid', 'valid'],
            table: {
                category: 'Shared Props',
            },
        },
        validationMessage: {
            control: 'text',
            table: {
                category: 'Shared Props',
            },
        },
        disabled: {
            control: 'boolean',
            table: {
                category: 'Shared Props',
            },
        },
        readonly: {
            control: 'boolean',
            table: {
                category: 'Shared Props',
            }
        },
        required: {
            control: 'boolean',
            table: {
                category: 'Shared Props',
            }
        },
    },
    args: {
        weekStarts: 0
    },
    render: (args: any) => ({
        components: { CalendarField },
        setup() {
            const value = ref();
            return { args, value };
        },
        template: `
            <CalendarField v-bind="args" v-model="value" />
        `
    })
} satisfies Meta<typeof CalendarField>;

type Story = StoryObj<typeof meta>;
export default meta;

/**
 * Default Variant
 */
export const Default: Story = {
    args: {
        
    },
};

/**
 * The start of the week can be customized with the `weekStarts` property using the JavaScript-familiar 
 * values of `0` for `sunday` (default), `1` for the most-hated weekday (`monday`), ..., `6` for 
 * `saturday`. That should satisfy each orange-furred cat.
 */
export const Monday: Story = {
    args: {
        weekStarts: 1
    },
};

/**
 * Using the `weekNumbers` property should make all ISO-8601 followers and similar week-number 
 * bureaucrats more then just happy.
 */
export const WeekNumbers: Story = {
    args: {
        weekStarts: 1,
        weekNumbers: true
    },
};

/**
 * Using the `locale` property allows you to adapt the desired language. In the example below, we 
 * set the language to Austrian (`de-AT`), which is similar to German except for one single month 
 * name. Check out the MDN page of the used [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat) 
 * object for more details about the available locale strings.
 */
export const Austrian: Story = {
    args: {
        weekStarts: 1,
        locale: 'de-AT'
    },
};

const maxDate = new Date();
maxDate.setDate(maxDate.getDate() + 10);
/**
 * The `minDate` and `maxDate` properties are the most basic way to restrict the selectable days. 
 * Keep in mind, that both values are inclusive, which means that you can still select the current 
 * day when passing `new Date()`, for example. 
 */
export const MinMaxRange: Story = {
    name: 'Min/Max Range',
    args: {
        minDate: new Date,
        maxDate
    },
};

const oldDate = new Date();
oldDate.setDate(oldDate.getDate() - 7);
const prevDate = new Date();
prevDate.setDate(prevDate.getDate() - 1);
const curDate = new Date();
/**
 * The `dates` property supports different date statements:
 * 
 * 1. `single`: Allows selecting one or more single days to be disabled.
 * 2. `holiday`: Similar to `single`, but are shown like weekend with a red color.
 * 3. `weekday`: One ore more weekdays, using 0 for sundays, 1 for mondays, ..., 6 for saturdays.
 * 4. `range`: An array or object with a inclusive start and end date range.
 */
export const DateRanges: Story = {
    args: {
        dates: [
            {
                type: 'holiday',
                value: '2024-01-01',
                label: 'New Year\'s Day'
            },
            {
                type: 'holiday',
                value: '2023-04-07',
                label: 'Good Friday'
            },
            {
                type: 'holiday',
                value: '2023-04-10',
                label: 'Easter Monday'
            },
            {
                type: 'holiday',
                value: '2023-05-01',
                label: 'Early May Bank Holiday'
            },
            {
                type: 'holiday',
                value: '2023-05-08',
                label: 'Bank holiday for the coronation of King Charles III'
            },
            {
                type: 'holiday',
                value: '2023-05-29',
                label: 'Spring Bank Holiday'
            },
            {
                type: 'holiday',
                value: '2023-08-28',
                label: 'Summer Bank Holiday'
            },
            {
                type: 'holiday',
                value: '2023-12-25',
                label: 'Christmas Day'
            },
            {
                type: 'holiday',
                value: '2023-12-26',
                label: 'Boxing Day'
            },
            {
                type: 'weekdays',
                value: [0, 6],
            },
            {
                type: 'range',
                value: [oldDate, prevDate],
            },
            {
                type: 'single',
                value: curDate,
            }
        ]
    },
};

/**
 * With TimeSelector
 */
export const Time: Story = {
    args: {
        time: true,
    },
};
