import type { ListFilterConfiguration, ListFilterRange } from './contracts';

export function isFilterRange(value: unknown): value is ListFilterRange {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/** Empty selections/ranges must neither count as active nor produce misleading badges. */
export function hasFilterValue(value: unknown): boolean {
    if (Array.isArray(value)) return value.some(hasFilterValue);
    if (isFilterRange(value)) return hasFilterValue(value.from) || hasFilterValue(value.to);
    return value !== null && value !== undefined && value !== '';
}

/** Clone every editable value so cancelling a filter sheet never mutates the supplied list. */
export function filterDraft(configuration: ListFilterConfiguration, value: unknown): unknown {
    if (configuration.type === 'multiselect') return Array.isArray(value) ? value.map(String) : [];
    if (configuration.type === 'date-range' || configuration.type === 'number-range') {
        return isFilterRange(value)
            ? { from: value.from ?? '', to: value.to ?? '' }
            : { from: '', to: '' };
    }
    return value === null || value === undefined || value === '' ? '__all__' : String(value);
}

export function appliedFilterValue(value: unknown): unknown {
    if (value === '__all__' || !hasFilterValue(value)) return undefined;
    if (Array.isArray(value)) return [...value];
    if (isFilterRange(value))
        return {
            from: hasFilterValue(value.from) ? value.from : undefined,
            to: hasFilterValue(value.to) ? value.to : undefined,
        };
    return value;
}

/** Use option labels for all selected values, retaining unknown server values rather than dropping them. */
export function filterValueLabel(
    configuration: ListFilterConfiguration,
    value: unknown,
    translate: (key: string) => string,
): string {
    const label = (item: unknown): string => {
        const option = configuration.options.find((candidate) => candidate.value === String(item));
        return option?.label_key ? translate(option.label_key) : (option?.label ?? String(item));
    };
    if (Array.isArray(value)) return value.map(label).join(', ');
    if (isFilterRange(value))
        return [value.from ?? '…', value.to ?? '…']
            .map((part) => (part === '' ? '…' : String(part)))
            .join(' – ');
    return label(value);
}

/** Validate submitted range boundaries without changing units or converting calendar dates to UTC. */
export function filterRangeInvalid(
    configuration: ListFilterConfiguration,
    value: unknown,
): boolean {
    if (configuration.type !== 'date-range' && configuration.type !== 'number-range') return false;
    if (!isFilterRange(value)) return false;
    const present = (item: unknown): item is string | number =>
        typeof item === 'number' || (typeof item === 'string' && item !== '');
    const boundary = (item: string | number): number =>
        configuration.type === 'number-range'
            ? Number(item)
            : Date.parse(String(item) + 'T00:00:00Z');
    const valid = (item: string | number): boolean => {
        if (configuration.type === 'date-range') {
            if (!/^\d{4}-\d{2}-\d{2}$/.test(String(item))) return false;
            const parsed = new Date(boundary(item));
            return (
                !Number.isNaN(parsed.getTime()) &&
                parsed.toISOString().slice(0, 10) === String(item)
            );
        }
        return String(item).trim() !== '' && Number.isFinite(Number(item));
    };
    const entries = [value.from, value.to].filter(present);
    if (entries.some((item) => !valid(item))) return true;
    if (
        entries.some(
            (item) =>
                (present(configuration.min) && boundary(item) < boundary(configuration.min)) ||
                (present(configuration.max) && boundary(item) > boundary(configuration.max)),
        )
    )
        return true;
    return present(value.from) && present(value.to) && boundary(value.from) > boundary(value.to);
}
