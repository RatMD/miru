import type {
    ScheduleEvent,
    ScheduleRange,
    ScheduleView,
    ScheduleWeek,
    ScheduleWeekOption,
} from './types';
import { parseDate } from '@internationalized/date';
/** Date-only arithmetic deliberately avoids local midnight and daylight-saving transitions. */
export function addDays(date: string, days: number): string {
    return parseDate(date).add({ days }).toString();
}
export function moveDate(date: string, offset: number, view: ScheduleView): string {
    return parseDate(date)
        .add(
            view === 'month' || view === 'agenda'
                ? { months: offset }
                : { days: offset * (view === 'week' ? 7 : 1) },
        )
        .toString();
}
export function dateInZone(value: string | Date, timeZone: string): string {
    const parts = new Intl.DateTimeFormat('en-US', {
        timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).formatToParts(new Date(value));
    const part = (key: string) => parts.find((p) => p.type === key)!.value;
    return part('year') + '-' + part('month') + '-' + part('day');
}
export function weekStart(date: string, firstDay = 1): string {
    const weekday = new Date(date + 'T12:00:00Z').getUTCDay();
    return addDays(date, -((weekday - firstDay + 7) % 7));
}
export function visibleRange(date: string, view: ScheduleView, firstDay = 1): ScheduleRange {
    const anchor = parseDate(date);
    if (view === 'day') return { start: date, end: addDays(date, 1) };
    if (view === 'week') {
        const start = weekStart(date, firstDay);
        return { start, end: addDays(start, 7) };
    }
    const month = anchor.set({ day: 1 });
    if (view === 'agenda')
        return { start: month.toString(), end: month.add({ months: 1 }).toString() };
    const start = weekStart(month.toString(), firstDay);
    const end = weekStart(month.add({ months: 1 }).toString(), firstDay);
    return { start, end: end < month.add({ months: 1 }).toString() ? addDays(end, 7) : end };
}
export function rangeDates(range: ScheduleRange): string[] {
    const dates: string[] = [];
    for (let day = range.start; day < range.end; day = addDays(day, 1)) dates.push(day);
    return dates;
}
/** Return occupied calendar dates without treating an absent end as an infinite interval. */
export function eventDates(event: ScheduleEvent, timeZone: string): ScheduleRange {
    if (event.allDay) {
        parseDate(event.start);
        if (event.end) parseDate(event.end);
        return {
            start: event.start,
            end: event.openEnded ? '9999-12-31' : event.end || addDays(event.start, 1),
        };
    }
    if (
        !/(Z|[+-]\d{2}:\d{2})$/i.test(event.start) ||
        (event.end && !/(Z|[+-]\d{2}:\d{2})$/i.test(event.end))
    )
        throw new Error('Timed Schedule events require an explicit UTC offset.');
    const start = dateInZone(event.start, timeZone);
    const end = event.openEnded
        ? '9999-12-31'
        : event.end && new Date(event.end).getTime() > new Date(event.start).getTime()
          ? addDays(dateInZone(new Date(new Date(event.end).getTime() - 1), timeZone), 1)
          : addDays(start, 1);
    return { start, end };
}
/** Stable, non-overlapping lanes; intervals are clipped to each rendered week. */
export function scheduleWeeks<T>(
    dates: string[],
    events: ScheduleEvent<T>[],
    timeZone: string,
): ScheduleWeek<T>[] {
    const intervals = events.map((event) => ({ event, range: eventDates(event, timeZone) }));
    const weeks: ScheduleWeek<T>[] = [];
    for (let offset = 0; offset < dates.length; offset += 7) {
        const days = dates.slice(offset, offset + 7),
            first = days[0]!,
            end = addDays(days.at(-1)!, 1);
        const segments = intervals
            .filter(
                (i) => i.range.start < end && i.range.end > first && i.range.end > i.range.start,
            )
            .map(({ event, range }) => {
                const start = range.start < first ? first : range.start;
                const last = range.end > end ? end : range.end;
                const column = days.indexOf(start) + 1;
                return {
                    key: first + ':' + event.id,
                    event,
                    column,
                    span: rangeDates({ start, end: last }).length,
                    lane: 0,
                    startsHere: range.start >= first,
                    endsHere: !event.openEnded && range.end <= end,
                };
            })
            .sort(
                (a, b) =>
                    a.column - b.column || b.span - a.span || a.event.id.localeCompare(b.event.id),
            );
        const ends: number[] = [];
        for (const segment of segments) {
            let lane = ends.findIndex((end) => end < segment.column);
            if (lane < 0) lane = ends.length;
            segment.lane = lane;
            ends[lane] = segment.column + segment.span - 1;
        }
        weeks.push({ dates: days, segments, lanes: ends.length });
    }
    return weeks;
}

/** ISO-8601 week number, including the preceding/following week-year at year boundaries. */
export function isoWeekNumber(date: string): number {
    const day = new Date(date + 'T12:00:00Z');
    day.setUTCDate(day.getUTCDate() + 4 - (day.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(day.getUTCFullYear(), 0, 1, 12));
    return Math.ceil(((day.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

/** ISO week-year is independent of the calendar year around New Year. */
export function isoWeekYear(date: string): number {
    const value = new Date(date + 'T12:00:00Z');
    value.setUTCDate(value.getUTCDate() + 4 - (value.getUTCDay() || 7));
    return value.getUTCFullYear();
}
export function scheduleYearWeeks(year: number, firstDay = 1): ScheduleWeekOption[] {
    const start = weekStart(String(year).padStart(4, '0') + '-01-04', firstDay),
        end = weekStart(String(year + 1).padStart(4, '0') + '-01-04', firstDay);
    const weeks: ScheduleWeekOption[] = [];
    for (let day = start; day < end; day = addDays(day, 7))
        weeks.push({ start: day, end: addDays(day, 7), number: isoWeekNumber(addDays(day, 3)) });
    return weeks;
}

/** Choose legible ink for explicit hex strip colors; CSS colors use the theme foreground contract. */
export function scheduleEventInk(color?: string): string {
    const hex = color?.replace('#', '');
    if (!hex || !/^(?:[0-9a-f]{3}|[0-9a-f]{6})$/i.test(hex)) return 'var(--ui-primary-foreground)';
    const full =
        hex.length === 3
            ? hex
                  .split('')
                  .map((c) => c + c)
                  .join('')
            : hex;
    const r = parseInt(full.slice(0, 2), 16),
        g = parseInt(full.slice(2, 4), 16),
        b = parseInt(full.slice(4, 6), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 > 150 ? '#111827' : '#ffffff';
}
