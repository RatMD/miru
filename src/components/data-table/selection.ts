/** Resolve stable selection keys independently of row order or pagination. */
export function dataTableRowId<T>(
    item: T,
    index: number,
    rowKey?: string | ((item: T, index: number) => string | number),
): string {
    const value =
        typeof rowKey === 'function'
            ? rowKey(item, index)
            : item !== null && typeof item === 'object'
              ? (item as Record<string, unknown>)[rowKey ?? 'id']
              : undefined;
    if (typeof value === 'string' || typeof value === 'number') return String(value);
    if (rowKey) throw new Error('DataTable rowKey must resolve to a string or number.');
    return String(index);
}
