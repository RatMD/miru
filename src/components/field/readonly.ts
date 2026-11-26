import type { InjectionKey, ComputedRef } from 'vue';
import { computed, inject, provide } from 'vue';

const readonlyFieldKey: InjectionKey<ComputedRef<boolean>> = Symbol('MiruReadonlyField');

/** Lock custom controls while retaining focus and their enabled native form inputs. */
export function useReadonlyField(value: () => boolean | undefined) {
    const inherited = inject(readonlyFieldKey, undefined);
    const readonly = computed(() => !!value() || !!inherited?.value);
    provide(readonlyFieldKey, readonly);
    function guard(event: Event) {
        if (!readonly.value) return;
        if (event instanceof KeyboardEvent) {
            if (['Tab', 'Escape', 'Shift', 'Control', 'Alt', 'Meta'].includes(event.key)) return;
            if ((event.ctrlKey || event.metaKey) && ['a', 'c'].includes(event.key.toLowerCase()))
                return;
            if (
                event.target instanceof HTMLInputElement &&
                ['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)
            )
                return;
        }
        event.preventDefault();
        event.stopImmediatePropagation();
    }
    return { readonly, guard };
}
