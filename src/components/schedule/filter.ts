import type { ScheduleEvent } from './types';
/** Apply only host-declared facets. Missing/empty selections never exclude events. */
export function filterScheduleEvents<T>(
    events: readonly ScheduleEvent<T>[],
    options: {
        search?: string;
        values?: Record<string, string>;
        keys?: string[];
        locale?: string;
        searchMode?: 'local' | 'server';
        filterMode?: 'local' | 'server';
    } = {},
): ScheduleEvent<T>[] {
    const query = (options.search || '').trim().toLocaleLowerCase(options.locale);
    return events.filter((event) => {
        if (
            options.searchMode !== 'server' &&
            query &&
            !(event.title + ' ' + (event.description || '') + ' ' + (event.typeLabel || ''))
                .toLocaleLowerCase(options.locale)
                .includes(query)
        )
            return false;
        return (
            options.filterMode === 'server' ||
            (options.keys || Object.keys(options.values || {})).every((key) => {
                const selected = options.values?.[key];
                if (!selected) return true;
                const actual = event.filterValues?.[key];
                return Array.isArray(actual) ? actual.includes(selected) : actual === selected;
            })
        );
    });
}
