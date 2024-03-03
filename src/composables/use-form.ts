
import type { ComputedRef, MaybeRef, Ref, UnwrapNestedRefs } from 'vue';
import type * as zod from 'zod';
import type { ZodTypeAny, SafeParseReturnType } from 'zod';

import { computed, reactive, ref, unref } from 'vue';
import { z } from 'zod';

export type ValidFormMethods = 'GET' | 'PATCH' | 'POST' | 'PUT';

export type ValidationResult<T> = { 
    valid: boolean,
    errors: {
        [Property in keyof T]: string[]
    },
    results: {
        [Property in keyof T]: SafeParseReturnType<any, any>;
    }
};

export type ValidationRules<T> = {
    [Property in keyof T]: ZodTypeAny;
}

export interface FormHandler<T> {
    /**
     * The form element, when useForm is called with an form element, null otherwise.
     */
    form: ComputedRef<HTMLFormElement|null>;

    /**
     * The form action value, when useForm is called with an form element.
     */
    action: ComputedRef<string|null>;

    /**
     * The form method value, when useForm is called with an form element, otherwise 'POST'.
     */
    method: ComputedRef<ValidFormMethods>;

    /**
     * The passed, original initial values.
     */
    originals: T;
    
    /**
     * The passed form keys.
     */
    keys: Array<keyof T>;

    /**
     * The current form values.
     */
    values: UnwrapNestedRefs<T>;
    
    /**
     * The passed form keys.
     */
    dirtyKeys: ComputedRef<Array<keyof T>>;

    /**
     * Check if one or more fields are dirty.
     */
    dirty: Ref<boolean>;

    /**
     * Check if form has been touched (tried to be submitted).
     */
    touched: Ref<boolean>;

    /**
     * Check if form has been submitted, but not finished.
     */
    loading: Ref<boolean>;

    /**
     * The generated form payload using the current values.
     */
    payload: ComputedRef<T>;

    /**
     * The generated FormData payload object using the current values
     */
    formData: ComputedRef<FormData>;

    /**
     * Check if a specific field is dirty.
     * @param key 
     */
    isDirty(key: keyof T): boolean;

    /**
     * Validate Form Values
     * @returns 
     */
    validate(): ValidationResult<T>;

    /**
     * Submit Form handler.
     * @param newValues 
     * @returns 
     */
    submit(): Promise<Response|false>;

    /**
     * Update many form values at once.
     * @param newValues 
     * @return void
     */
    update(data: Partial<T>): void;

    /**
     * Update many values handler.
     * @param data 
     * @returns 
     */
    reset(): void;
}

/**
 * Use Form Handler
 * @returns 
 */
export function useForm<T extends object>(
    element: MaybeRef<HTMLFormElement|undefined>, 
    initial: T,
    rules: (z: typeof zod) => ValidationRules<T>
): FormHandler<T> {
    /**
     * Set Form Details
     */
    const form = computed<HTMLFormElement|null>(() => {
        let temp = unref(element);
        return temp instanceof HTMLElement && temp?.localName == 'form' ? temp : null;
    });
    const action = computed<string|null>(
        () => form.value ? form.value.getAttribute('action') : null
    );
    const method = computed<ValidFormMethods>(
        () => ((form.value ? (form.value.getAttribute('method') || 'POST') : 'POST') as any).toUpperCase()
    );

    /**
     * Set Form Values
     */
    const originals = Object.freeze(JSON.parse(JSON.stringify(initial)));
    const values = reactive<T>(initial);
    
    const keys = Object.freeze(Object.keys(initial)) as Array<keyof T>;
    const dirtyKeys = computed<(keyof T)[]>(() => {
        const dirty: Array<keyof T> = [];
        for (const key of keys) {
            if (isDirty(key)) {
                dirty.push(key);
            }
        }
        return dirty;
    })

    /**
     * State : Check if one or more fields are dirty.
     */
    const dirty = computed<boolean>(() => dirtyKeys.value.length > 0);

    /**
     * State : Check if form has been touched (tried to be submitted).
     */
    const touched = ref<boolean>(false);

    /**
     * State : Check if form has been submitted, but not finished.
     */
    const loading = ref<boolean>(false);

    /**
     * Form : Generate object payload.
     */
    const payload = computed<T>(() => {
        const payload: Partial<T> = {};
        for (const key of keys as Array<keyof T>) {
            payload[key] = (values as any)[key];
        }
        return payload as Required<T>;
    });

    /**
     * Form : Generate FormData payload.
     */
    const formData = computed<FormData>(() => {
        const formData = new FormData;
        for (const key of keys) {
            formData.append(key as string, (values as any)[key]);
        }
        return formData;
    });

    /**
     * Check if a specific field is dirty.
     * @param key 
     */
    function isDirty(key: keyof T) {
        return originals[key] != (values as any)[key];
    }

    /**
     * Validate Form Values
     * @returns 
     */
    function validate(): ValidationResult<T> {
        const ruleSet = rules(z as typeof zod);

        let valid = true;
        let results: { [Property in keyof T]: SafeParseReturnType<any, any> } = {} as any;
        let errors: { [Property in keyof T]: string[] } = {} as any;

        for (const [key, rule] of Object.entries(ruleSet)) {
            let result = (rule as ZodTypeAny).safeParse((values as any)[key]);
            
            if (!result.success) {
                if (valid) {
                    valid = false;
                }
                errors[key as keyof T] = [...result.error.issues].map(issue => issue.message)
            }
            results[key as keyof T] = result;
        }

        return {
            valid,
            errors,
            results
        };
    }

    /**
     * Submit Form handler.
     * @todo Handle Request Handler
     * @param newValues 
     * @returns 
     */
    async function submit(): Promise<Response|false> {
        if (!action.value || !method.value) {
            return false;
        }
        touched.value = true;

        if (!validate()) {
            return false;
        }
        if (loading.value) {
            return false;
        }
        loading.value = true;

        try {
            const response = await request(method.value, payload.value);
            return response;
        } catch (err) {
            return {
                status: 'error',
                message: err instanceof Error ? err.message : (err as any).toString(),
            };
        } finally {
            loading.value = false;
        }
    }

    /**
     * Update many form values at once.
     * @param newValues 
     * @return void
     */
    function update(newValues: Partial<T>) {
        for (const [key, val] of Object.entries(newValues)) {
            (values as any)[key] = val;
        }
    }

    /**
     * Reset Form using initial values.
     * @return void
     */
    function reset() {
        for (const [key, val] of Object.entries(originals)) {
            (values as any)[key] = val;
        }
        touched.value = false;
    }

    // Return
    return {

        // Details
        form,
        action,
        method,

        // Values
        originals,
        values,
        keys,

        // States
        dirtyKeys,
        dirty,
        touched,
        loading,

        // Payloads
        payload,
        formData,

        // Actions
        isDirty,
        validate,
        submit,
        update,
        reset
    }
};
