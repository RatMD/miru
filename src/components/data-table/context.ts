import type { ListPayload } from './contracts';
import type { ComputedRef, InjectionKey } from 'vue';
export const dataTableListKey: InjectionKey<ComputedRef<ListPayload<unknown>>> =
    Symbol('MiruDataTableList');

/** Keep already-open portalled action menus subject to the current table/row locks. */
export const dataTableInteractionKey: InjectionKey<{
    disabled: ComputedRef<boolean>;
    rowDisabled: (item: unknown) => boolean;
}> = Symbol('MiruDataTableInteraction');
