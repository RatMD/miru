import type { DataTableBackendAdapter } from '../components/data-table/contracts';
import type { LucidQueryOptions } from '../components/data-table/normalization';
import { resolveDataTableAdapter } from '../components/data-table/normalization';

/** Select Adonis/Lucid data conventions independently of the transport. */
export function adonisAdapter(options: LucidQueryOptions = {}): DataTableBackendAdapter {
    return resolveDataTableAdapter('lucid', options);
}
export {
    adaptLucidList,
    adaptLucidPagination,
    serializeLucidQuery,
} from '../components/data-table/normalization';
export type { LucidQueryOptions } from '../components/data-table/normalization';
export type {
    LucidListPayload,
    LucidListState,
    LucidPagination,
} from '../components/data-table/contracts';
