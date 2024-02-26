import { computed, reactive, ref, toValue, type MaybeRef } from "vue"

export type ValidationFlag<Type> = { 
    [Property in keyof Type]: string | null 
};

/**
 * Use Form Handler
 * @param HTMLFormElement
 * @param initialValues
 * @returns 
 */
export function useForm<T extends object>(form: MaybeRef<HTMLFormElement>, initialValues: T) {
    const action = computed<string|null>(() => toValue(form) ? toValue(form).getAttribute('action') : null);

    // States
    const dirty = ref<boolean>(false);
    const loading = ref<boolean>(false);

    // Data
    const keys = Object.keys(initialValues);
    const values = reactive<T>(initialValues);
    const original = JSON.parse(JSON.stringify(initialValues));
    Object.freeze(original);

    /**
     * Reset FormData
     */
    function reset() {

    }

    // Return Data
    return {
        action,
        dirty,
        loading,
        original,
        keys,
        values
    }
};
