import { type MaybeRef } from "vue";
export type ValidationFlag<Type> = {
    [Property in keyof Type]: string | null;
};
/**
 * Use Form Handler
 * @param HTMLFormElement
 * @param initialValues
 * @returns
 */
export declare function useForm<T extends object>(form: MaybeRef<HTMLFormElement>, initialValues: T): {
    action: import("vue").ComputedRef<string>;
    dirty: import("vue").Ref<boolean>;
    loading: import("vue").Ref<boolean>;
    original: any;
    keys: string[];
    values: import("vue").UnwrapNestedRefs<T>;
};
