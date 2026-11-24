import type { DateRange, DateValue } from 'reka-ui';
export type CalendarValue<Range extends boolean = false> = Range extends true
    ? DateRange
    : DateValue;

export type CalendarUpdateValue<Range extends boolean = false> = Range extends true
    ? DateRange
    : DateValue | undefined;

/** JavaScript weekday numbering: Sunday = 0, Monday = 1. */
export type CalendarWeekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;
/** Server-provided availability; omitted dates remain selectable. */
export interface CalendarDayAvailability {
    available?: number;
    closed?: boolean;
    holiday?: string | null;
    reason?: string | null;
}
export interface CalendarRulesProps {
    /** Monday by default, independently of the display locale. */
    weekStartsOn?: CalendarWeekday;
    minValue?: DateValue;
    disabledWeekdays?: readonly CalendarWeekday[];
    /** ISO calendar dates, YYYY-MM-DD. */
    disabledDates?: readonly string[];
    holidays?: Readonly<Record<string, string>>;
    /** Defaults to true when holiday data is supplied. */
    disableHolidays?: boolean;
    availability?: Readonly<Record<string, CalendarDayAvailability>>;
    isDateDisabled?: (date: DateValue) => boolean;
    isDateUnavailable?: (date: DateValue) => boolean;
}
/** Booking slot shape; the backend owns capacity and special-booking rules. */
export interface CalendarTimeSlot {
    value: string;
    label: string;
    used: number;
    capacity: number;
    available: boolean;
    warning: string | null;
    overbooking: boolean;
    retained?: boolean;
}
