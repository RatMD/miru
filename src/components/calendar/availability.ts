import type { CalendarRulesProps } from './types';
import type { DateValue } from 'reka-ui';
import { getDayOfWeek } from '@internationalized/date';

/** Resolve reactive calendar props at call time; unknown availability never means fully booked. */
export function calendarDayState(date: DateValue, rules: CalendarRulesProps) {
    const key = date.toString();
    const availability = rules.availability?.[key];
    const holiday = rules.holidays?.[key] ?? availability?.holiday ?? null;
    const disabled = Boolean(
        rules.disabledDates?.includes(key) ||
        rules.disabledWeekdays?.includes(
            getDayOfWeek(date, 'en-US') as NonNullable<CalendarRulesProps['weekStartsOn']>,
        ) ||
        rules.isDateDisabled?.(date),
    );
    const unavailable =
        disabled ||
        Boolean(
            (rules.disableHolidays !== false && holiday !== null) ||
            availability?.closed ||
            (availability?.available !== undefined && availability.available <= 0) ||
            rules.isDateUnavailable?.(date),
        );
    return {
        disabled,
        unavailable,
        holiday,
        available: availability?.available,
        reason: availability?.reason ?? null,
    };
}
