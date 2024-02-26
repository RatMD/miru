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
}
export interface SelectHolidayType {
    /**
     * Select specific holidays (works similar to 'single', but are marked differently).
     */
    type: 'holiday' | 'holidays';
    /**
     * A single date value or multiple as array.
     */
    value: DateTimeValues | DateTimeValues[];
    /**
     * Additional label shown for this day(s).
     */
    label?: string;
}
export interface SelectWeekDayType {
    /**
     * Select whole weekdays in general.
     */
    type: 'weekday' | 'weekdays';
    /**
     * The desired weekdays using their JS number (0 = Sunday, 1 = Monday, ... 6 = Saturday).
     * Requires at least one single value, multiple can be added as array.
     */
    value: WeekDay | WeekDay[];
}
export interface SelectRangeType {
    /**
     * Select a range of days.
     */
    type: 'range';
    /**
     * A range of dates using a start and end date, either passed as array or as start / end object.
     */
    value: [DateTimeValues, DateTimeValues] | {
        start: DateTimeValues;
        end: DateTimeValues;
    };
}
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
declare const _default: import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<CalendarFieldProps>, {
    weekStarts: number;
    locale: string;
    time: boolean;
    hoursStep: number;
    minutesStep: number;
    secondsStep: number;
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: Date) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<CalendarFieldProps>, {
    weekStarts: number;
    locale: string;
    time: boolean;
    hoursStep: number;
    minutesStep: number;
    secondsStep: number;
}>>> & {
    "onUpdate:modelValue"?: (value: Date) => any;
}, {
    time: boolean;
    weekStarts: WeekDay;
    locale: string;
    hoursStep: number;
    minutesStep: number;
    secondsStep: number | false;
}, {}>;
export default _default;
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
type __VLS_WithDefaults<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_Prettify<P[K] & {
        default: D[K];
    }> : P[K];
};
type __VLS_Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
