import type { DateValue } from 'reka-ui';
import { getDayOfWeek } from '@internationalized/date';

/** Identify Sundays independently of the displayed locale's first weekday. */
export function isSunday(date: DateValue | undefined): boolean {
    return date !== undefined && getDayOfWeek(date, 'en-US') === 0;
}

export function calendarMonths(locale: string): { value: string; label: string }[] {
    const formatter = new Intl.DateTimeFormat(locale, { month: 'long', timeZone: 'UTC' });
    return Array.from({ length: 12 }, (_, index) => ({
        value: String(index + 1),
        label: formatter.format(new Date(Date.UTC(2020, index, 1))),
    }));
}

export function calendarYears(visibleYear: number, lastYear: number): number[] {
    const firstYear = Math.min(1900, visibleYear);
    return Array.from(
        { length: Math.max(lastYear, visibleYear) - firstYear + 1 },
        (_, index) => Math.max(lastYear, visibleYear) - index,
    );
}
