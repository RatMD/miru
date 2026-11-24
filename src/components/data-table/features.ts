import type { DataTableColumnMeta } from './types';
import {
    columnOrderingFeature,
    columnSizingFeature,
    columnVisibilityFeature,
    createExpandedRowModel,
    metaHelper,
    rowExpandingFeature,
    rowSelectionFeature,
    tableFeatures,
} from '@tanstack/vue-table';

/**
 * The feature surface shared by MIRU's server-driven data tables.
 */
export const dataTableFeatures = tableFeatures({
    columnOrderingFeature,
    columnSizingFeature,
    columnVisibilityFeature,
    rowExpandingFeature,
    expandedRowModel: createExpandedRowModel(),
    rowSelectionFeature,
    columnMeta: metaHelper<DataTableColumnMeta>(),
});

export type DataTableFeatures = typeof dataTableFeatures;
