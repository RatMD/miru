import type { DataTableBackendAdapter } from '../components/data-table/contracts';
import { resolveDataTableAdapter } from '../components/data-table/normalization';

/** Select Laravel data conventions independently of the transport. */
export function laravelAdapter(): DataTableBackendAdapter {
    return resolveDataTableAdapter('laravel');
}
export { adaptLaravelList, adaptLaravelPagination } from '../components/data-table/normalization';
export type { LaravelListPayload, LaravelPagination } from '../components/data-table/contracts';
