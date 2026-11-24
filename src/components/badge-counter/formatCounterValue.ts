/** Format ungrouped numeric values, preserving decimal places supplied as a string. */
export function formatCounterValue(
    value: number | string,
    locale: string,
    fractionDigits?: number,
): string {
    const source = String(value).trim();
    // A single comma is accepted as a decimal separator, e.g. "25,00".
    const normalized = typeof value === 'string' ? source.replace(',', '.') : source;
    if (!/^[+-]?\d+(?:\.\d+)?$/.test(normalized) && typeof value === 'string') return source;
    const number = Number(normalized);
    if (!Number.isFinite(number)) return source;
    const suppliedDecimals =
        typeof value === 'string' ? (normalized.split('.')[1]?.length ?? 0) : 0;
    const fixed =
        fractionDigits !== undefined && Number.isFinite(fractionDigits)
            ? Math.max(0, Math.min(20, Math.trunc(fractionDigits)))
            : undefined;
    return new Intl.NumberFormat(locale, {
        useGrouping: true,
        minimumFractionDigits: fixed ?? Math.min(20, suppliedDecimals),
        maximumFractionDigits: fixed ?? 20,
    }).format(number);
}
