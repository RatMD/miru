<template>
    <div class="field-calendar">
        <div class="calendar-header">
            <button type="button" class="header-btn" @click="onPrevMonth()">
                <ChevronLeft :size="16" />
            </button>

            <button type="button" class="header-btn header-label">
                <span>{{ monthName }}, <b>{{ year }}</b></span>
            </button>

            <button type="button" class="header-btn" @click="onNextMonth()">
                <ChevronRight :size="16" />
            </button>
        </div>

        <div class="calendar-body">
            <div class="body-weeks" :class="{ 'has-week-nums': props.weekNumbers }">
                <div class="week week-labels">
                    <div class="week-item spacer" v-if="props.weekNumbers"></div>
                    <div class="week-item weekday-label" v-for="(name, idx) of shortWeekdayNames" :key="idx"><span>{{ name }}</span></div>
                </div>

                <div class="week" v-for="(week, idx) of weeks" :key="idx">
                    <div class="week-item week-num" v-if="props.weekNumbers">{{ week.label }}</div>
                    <div class="week-item week-day" v-for="(day, id2) of week.days" :key="id2">
                        <button type="button" :class="{
                            'week-btn': true,
                            'is-weekend': day.weekday == 0 || day.weekday == 6,
                            'is-today': day.isToday,
                            'is-past': day.isPast,
                            'is-outside': day.type != 'cur',
                            'is-holiday': day.isHoliday,
                        }" :disabled="day.disabled" @click="() => onSelect(day.date)">
                            <span>{{ day.label }}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="calendar-footer" v-if="props.time">
            <div class="time-selector" v-if="props.time">
                <InputField type="text" size="sm" :placeholder="minHours" v-model="hoursValue" />
                <span>:</span>
                <InputField type="text" size="sm" :placeholder="minMinutes" v-model="minutesValue" />
                <span v-if="props.secondsStep">:</span>
                <InputField type="text" size="sm" :placeholder="minSeconds" v-model="secondsValue" v-if="props.secondsStep" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import type { MaybeRef } from 'vue';

export type WeekDay = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type DateTimeValues = string | Date;

export interface SelectSingleType {
    /**
     * Select a single or multiple single dates.
     */
    type: 'single' | 'day';

    /**
     * A single date value or multiple as array.
     */
    value: DateTimeValues | DateTimeValues[];
};

export interface SelectHolidayType {
    /**
     * Select specific holidays (works similar to 'single', but are marked differently).
     */
    type: 'holiday' | 'holidays',

    /**
     * A single date value or multiple as array.
     */
    value: DateTimeValues | DateTimeValues[];

    /**
     * Additional label shown for this day(s).
     */
    label?: string;
};

export interface SelectWeekDayType {
    /**
     * Select whole weekdays in general.
     */
    type: 'weekday' | 'weekdays',

    /**
     * The desired weekdays using their JS number (0 = Sunday, 1 = Monday, ... 6 = Saturday). 
     * Requires at least one single value, multiple can be added as array.
     */
    value: WeekDay | WeekDay[];
};

export interface SelectRangeType {
    /**
     * Select a range of days.
     */
    type: 'range',

    /**
     * A range of dates using a start and end date, either passed as array or as start / end object.
     */
    value: [DateTimeValues, DateTimeValues] | { start: DateTimeValues, end: DateTimeValues };
};

export type SelectDateTypes = SelectSingleType | SelectWeekDayType | SelectHolidayType | SelectRangeType;


export interface CalendarDay {
    /**
     * The full Date javascript object for this day.
     */
    date: Date;

    /**
     * This day is from the current, next or previous shown month.
     */
    type: 'cur' | 'next' | 'prev';

    /**
     * The current day label, usually the day number.
     */
    label: number | string;

    /**
     * The current weekday number (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
     */
    weekday: WeekDay;

    /**
     * State if current day is todays date.
     */
    isToday: boolean;

    /**
     * State if current day is in the past.
     */
    isPast: boolean;
    
    /**
     * State if current day is a holiday.
     */
    isHoliday: boolean;
    
    /**
     * Disabled state of this day.
     */
    disabled: boolean;
}

export interface CalendarWeek {
    /**
     * The current week label, usually the week number.
     */
    label: number | string;

    /**
     * The shown / included week days.
     */
    days: CalendarDay[];
}

/**
 * CalendarField Properties
 */
export interface CalendarFieldProps {
    /**
     * A custom calendar field id, usually passed by the FormControl component. The default value 
     * is an auto-generated UUID.
     */
    id?: null | string;

    /**
     * The name attribute for this calendar field.
     */
    name?: null | string;

    /**
     * The value for this calendar field, must be passed as v-model value.
     */
    modelValue?: string | Date;

    /**
     * The weekday number (0 = Sunday, 1 = Monday, ..., 6 = Saturday) where the week starts.
     */
    weekStarts?: WeekDay;

    /**
     * Whether to show the week numbers on the left side of the calendar widget or not.
     */
    weekNumbers?: boolean;

    /**
     * The minimum allowed / selectable date.
     */
    minDate?: 'now' | string | Date;

    /**
     * The maximum allowed / selectable date.
     */
    maxDate?: 'now' | string | Date;

    /**
     * Additional dates that must be taken into account when creating and selecting within the 
     * calendar.
     */
    dates?: SelectDateTypes[];

    /**
     * Show additional time selector fields on the footer of the calendar widget.
     */
    time?: boolean;

    /**
     * The minimum supported time string using 09:00:00 syntax (seconds can be omitted).
     */
    minTime?: string;

    /**
     * The maximum supported time string using 18:30:00 syntax (seconds can be omitted).
     */
    maxTime?: string;

    /**
     * The steps in which the hours should be increased / decreased, default 1.
     */
    hoursStep?: number;

    /**
     * The steps in which the minuted should be increased / decreased, default 5.
     */
    minutesStep?: number;

    /**
     * The steps in which the seconds should be increased / decreased, default 5, pass `0` or false 
     * to disable the seconds field completely.
     */
    secondsStep?: number | false;

    /**
     * The desired locale, which should be used with the Intl.DateTimeFormat handler.
     */
    locale?: string;

    /**
     * The disabled state for this calendar field.
     */
    disabled?: MaybeRef<boolean>;

    /**
     * The readonly state for this calendar field.
     */
    readonly?: MaybeRef<boolean>;

    /**
     * The required state for this calendar field.
     */
    required?: MaybeRef<boolean>;

    /**
     * The validation state for this calendar field.
     */
    validation?: null | 'invalid' | 'valid';

    /**
     * Additional calendar field validation message, requires the validation property set either to 
     * valid or invalid.
     */
    validationMessage?: null | string;
}

/**
 * CalendarField Emits
 */
export interface CalendarFieldEmits {
    /**
     * Update model value handler.
     */
    (event: 'update:modelValue', value: Date | null): void;
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'CalendarField'
}
</script>

<script lang="ts" setup>
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';
import { computed, ref, watch } from 'vue';
import InputField from './InputField.vue';

// Define Component
const props = withDefaults(defineProps<CalendarFieldProps>(), {
    weekStarts: 0,
    locale: 'en-GB',
    time: false,
    hoursStep: 1,
    minutesStep: 1,
    secondsStep: 5
});
const emits = defineEmits<CalendarFieldEmits>();

// States
const year = ref<number>((new Date()).getFullYear());
const month = ref<number>((new Date).getMonth());

const value = computed({
    get() {
        if (props.modelValue instanceof Date) {
            return props.modelValue;
        } else if (typeof props.modelValue == 'string' && props.modelValue.length > 0) {
            return new Date(props.modelValue);
        } else {
            return null;
        }
    },
    set(value: Date | null) {
        emits('update:modelValue', value);
    }
});
const minHours = computed<string>(() => props.minTime ? (props.minTime.split(':')[0] || '00') : '00');
const minMinutes = computed<string>(() => props.minTime ? (props.minTime.split(':')[1] || '00') : '00');
const minSeconds = computed<string>(() => props.minTime ? (props.minTime.split(':')[2] || '00') : '00');

const hoursValue = ref<string|null>(value.value ? ('00' + value.value.getHours()).slice(-2) : minHours.value);
const minutesValue = ref<string|null>(value.value ? ('00' + value.value.getMinutes()).slice(-2) : minMinutes.value);
const secondsValue = ref<string|null>(value.value ? ('00' + value.value.getSeconds()).slice(-2) : minSeconds.value);

watch([hoursValue, minutesValue, secondsValue], () => {
    let val = value.value;
    if (!val) {
        val = new Date;
    }
    
    let hours = hoursValue.value ? parseInt(hoursValue.value) : null;
    if (hours && !isNaN(hours)) {
        val.setHours(hours);
    }
    
    let minutes = minutesValue.value ? parseInt(minutesValue.value) : null;
    if (minutes && !isNaN(minutes)) {
        val.setMinutes(minutes);
    }
    
    let seconds = secondsValue.value ? parseInt(secondsValue.value) : null;
    if (seconds && !isNaN(seconds)) {
        val.setSeconds(seconds);
    }

    value.value = val;
});

// Minimum/Maximum allowed Date
const minDate = computed<Date|null>(() => props.minDate ? parseDate(props.minDate) : null);
const maxDate = computed<Date|null>(() => props.maxDate ? parseDate(props.maxDate) : null);

// Short Weekday Names
const shortWeekdayNames = computed<string[]>(() => {
    const result = [];
    const format = new Intl.DateTimeFormat(props.locale, { weekday: 'short' });
    const date = new Date();
    while (date.getDay() != props.weekStarts) {
        date.setDate(date.getDate() + 1);
    }
    while(result.length < 7) {
        result.push(format.format(date));
        date.setDate(date.getDate() + 1);
    }
    return result;
});

// Long Weekday Names
const longWeekdayNames = computed<string[]>(() => {
    const result = [];
    const format = new Intl.DateTimeFormat(props.locale, { weekday: 'long' });
    const date = new Date();
    while (date.getDay() != props.weekStarts) {
        date.setDate(date.getDate() + 1);
    }
    while(result.length < 7) {
        result.push(format.format(date));
        date.setDate(date.getDate() + 1);
    }
    return result;
});

// Receive textual month name
const monthName = computed<string>(() => {
    const datetimeFormat = new Intl.DateTimeFormat(props.locale, {
        month: 'long'
    });
    return datetimeFormat.format(new Date(year.value, month.value, 1));
});

// Extract holidays from dates list
const holidays = computed<{ date: Date, format: string }[]>(() => {
    const result: { date: Date, format: string }[] = [];
    for (const select of (props.dates || [])) {
        if (select.type != 'holiday' && select.type != 'holidays') {
            continue;
        }
        if (Array.isArray(select.value)) {
            result.push(...[...select.value].map(val => {
                let date = parseDate(val)
                return { date, format: formatDate(date) };
            }));
        } else {
            let date = parseDate(select.value);
            result.push({ date, format: formatDate(date) });
        }
    }
    return result;
});

// Build current visible calendar weeks
const weeks = computed<CalendarWeek[]>(() => {
    let dates: CalendarDay[] = [];
    let today: Date = new Date();
    let format: string = formatDate(today);

    let week: Date = new Date(year.value, month.value, 1);
    let days: number = (new Date(week.getFullYear(), week.getMonth() + 1, 0)).getDate();

    // Prepend
    if (week.getDay() != props.weekStarts) {
        let prev = new Date(week.getTime());
        do {
            prev.setDate(prev.getDate() - 1);

            let currentFormat = formatDate(prev);
            dates.unshift({
                date: new Date(prev.getTime()),
                type: 'prev',
                label: prev.getDate(),
                weekday: prev.getDay() as WeekDay,
                isToday: currentFormat == format,
                isPast: currentFormat < format,
                isHoliday: holidays.value.find(item => item.format === currentFormat) !== void 0,
                disabled: isDisabled(prev)
            });
        } while (prev.getDay() != props.weekStarts);
    }

    // Build
    for (let i = 0; i < days; i++) {
        let currentFormat = formatDate(week);
        dates.push({
            date: new Date(week.getTime()),
            type: 'cur',
            label: week.getDate(),
            weekday: week.getDay() as WeekDay,
            isToday: currentFormat == format,
            isPast: currentFormat < format,
            isHoliday: holidays.value.find(item => item.format === currentFormat) !== void 0,
            disabled: isDisabled(week)
        });
        week.setDate(week.getDate() + 1);
    }

    // Append
    if (week.getDay() != props.weekStarts) {
        let next = new Date(week.getTime());
        do {
            let currentFormat = formatDate(next);
            dates.push({
                date: new Date(next.getTime()),
                type: 'next',
                label: next.getDate(),
                weekday: next.getDay() as WeekDay,
                isToday: currentFormat == format,
                isPast: currentFormat < format,
                isHoliday: holidays.value.find(item => item.format === currentFormat) !== void 0,
                disabled: isDisabled(next)
            });
            next.setDate(next.getDate() + 1);
        } while (next.getDay() != props.weekStarts);
    }

    // In Weeks
    return dates.reduce((result: CalendarWeek[], curValue: CalendarDay) => {
        if (result.length == 0 || result[result.length-1].days.length == 7) {
            result.push({
                label: getWeekNumber(curValue.date),
                days: []
            });
        }
        result[result.length-1].days.push(curValue);
        return result;
    }, []);
});

/**
 * Get Week number of passed date object
 * @param date 
 * @returns
 */
function getWeekNumber(date: Date): number {
    let copy = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    copy.setUTCDate(copy.getUTCDate() + 4 - (copy.getUTCDay()||7));
    let yearStart = new Date(Date.UTC(copy.getUTCFullYear(),0,1));
    return Math.ceil((((copy.getTime() - yearStart.getTime()) / 86400000) + 1)/7);
}

/**
 * Parse Date
 * @param date 
 * @returns
 */
function parseDate(date: string | Date): Date {
    if (date instanceof Date) {
        return new Date(date.getTime());
    } else {
        return date == 'now' ? new Date() : new Date(date);
    }
}

/**
 * Format Date
 * @param date 
 * @returns
 */
function formatDate(date: Date): string {
    return `${date.getFullYear()}-${('00' + (date.getMonth()+1)).slice(-2)}-${('00' + date.getDate()).slice(-2)}`;
}

/**
 * Check if Date is disabled
 */
function isDisabled(date: Date): boolean {
    let format = formatDate(date);

    if (minDate.value && format < formatDate(minDate.value)) {
        return true;
    } else if (maxDate.value && format > formatDate(maxDate.value)) {
        return true;
    } else {
        let result = false;
        for (const select of (props.dates || [])) {
            if (select.type == 'single' || select.type == 'day') {
                if (Array.isArray(select.value)) {
                    select.value.map(val => {
                        if (formatDate(parseDate(val)) == format) {
                            result = true;
                        }
                    });
                } else if (formatDate(parseDate(select.value)) == format) {
                    result = true;
                }
            }

            if (select.type == 'holiday' || select.type == 'holidays') {
                if (Array.isArray(select.value)) {
                    select.value.map(val => {
                        if (formatDate(parseDate(val)) == format) {
                            result = true;
                        }
                    });
                } else if (formatDate(parseDate(select.value)) == format) {
                    result = true;
                }
            }

            if (select.type == 'weekday' || select.type == 'weekdays') {
                if (Array.isArray(select.value) && select.value.includes(date.getDay() as WeekDay)) {
                    result = true;
                } else if (!Array.isArray(select.value) && select.value == (date.getDay() as WeekDay)) {
                    result = true;
                }
            }

            if (select.type == 'range') {
                let start = formatDate(parseDate(Array.isArray(select.value) ? select.value[0] : select.value.start));
                let end = formatDate(parseDate(Array.isArray(select.value) ? select.value[1] : select.value.end));

                if (format >= start && format <= end) {
                    result = true;
                }
            }
            if (result) {
                break;
            }
        }
        return result;
    }
}

/**
 * Previous Month
 */
function onPrevMonth() {
    if (month.value > 0) {
        month.value--;
    } else {
        month.value = 11;
        year.value--;
    }
}

/**
 * Next Month
 */
function onNextMonth() {
    if (month.value < 11) {
        month.value++;
    } else {
        month.value = 0;
        year.value++;
    }
}

/**
 * On Select Date
 */
function onSelect(date: Date) {
    let val = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    if (props.time) {
        let hours = hoursValue.value ? parseInt(hoursValue.value) : null;
        if (hours && !isNaN(hours)) {
            val.setHours(hours);
        }
        
        let minutes = minutesValue.value ? parseInt(minutesValue.value) : null;
        if (minutes && !isNaN(minutes)) {
            val.setMinutes(minutes);
        }
        
        let seconds = secondsValue.value ? parseInt(secondsValue.value) : null;
        if (seconds && !isNaN(seconds)) {
            val.setSeconds(seconds);
        }
    }
    value.value = val;
}
</script>

<style>
.field-calendar {
    @apply w-full flex flex-col border border-solid rounded-md;
    @apply bg-transparent border-gray-300;
    max-width: 400px;
}

.calendar-header {
    @apply w-full flex flex-row justify-between p-1 relative items-center;

    &::before {
        @apply left-4 right-4 bottom-0 absolute h-px;
        @apply bg-zinc-200;
        content: "";
    }

    & .header-btn {
        @apply w-10 h-10 flex items-center justify-center outline-none shadow-none border-0 rounded-md;
        @apply transition-colors duration-300 ease-in-out;
        @apply text-gray-600 dark:text-gray-500 bg-transparent;

        &:hover {
            @apply bg-gray-200 dark:bg-gray-800;
        }
    }

    & .header-btn.header-label {
        @apply w-auto h-8 px-4;
    }
}

.calendar-body {
    @apply w-full flex flex-col p-2;

    & .body-weeks {
        @apply flex flex-col;
    }

    & .week {
        @apply flex flex-row items-center justify-start;
    }

    & .week.week-labels {
        @apply mb-2;
    }
    
    & .week-item {
        @apply grow-0 shrink-0 text-center tabular-nums;
        flex-basis: calc(100% / 7);
    }
    
    & .has-week-nums .week-item {
        flex-basis: calc((100% / 7) - (20px / 7));
    }

    & .week-item.spacer,
    & .week-item.week-num {
        flex-basis: 20px;
    }

    & .week-item.weekday-label {
        @apply text-xs font-semibold;
        @apply text-gray-500;
    }

    & .week-item.week-num {
        @apply font-semibold;
        @apply text-gray-300;
    }

    & .week-item.week-day {
        @apply h-10 flex items-center justify-center;
    }

    & .week-btn {
        @apply w-8 h-8 flex items-center justify-center relative p-0 border-0 outline-none rounded-full cursor-pointer;
        @apply duration-300 ease-in-out transition-colors;
        @apply text-gray-800 dark:text-gray-200 bg-transparent;

        &:disabled {
            @apply cursor-not-allowed opacity-50 rounded-md;
            @apply bg-gray-200;
        }

        span {
            @apply z-20 pointer-events-none;
        }

        &::before {
            @apply w-10 h-10 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full z-10 scale-0;
            @apply bg-gray-200 dark:bg-gray-800;
            @apply duration-300 ease-in-out transition-transform;
            content: '';
        }

        &:not(:disabled):hover {
            @apply text-gray-900 dark:text-gray-300;

            &::before {
                @apply scale-100;
            }
        }

        &.is-weekend,
        &.is-holiday {
            @apply text-danger-600;
        }

        &.is-today {
            @apply font-semibold text-primary-600;
        }
        
        &.is-past {

        }
        
        &.is-outside {
            @apply text-gray-400 dark:text-gray-500;
        }
    }
}

.calendar-footer {
    @apply flex flex-row relative p-4;

    &::before {
        @apply top-0 left-4 right-4 absolute h-px;
        @apply bg-zinc-200;
        content: "";
    }

    & .time-selector {
        @apply w-full flex flex-row gap-3 items-center justify-center;

        & :deep(.field-input) {
            @apply w-16 h-auto py-1 px-2 text-center;
        }

        & span {
            @apply font-semibold;
        }
    }
}
</style>
