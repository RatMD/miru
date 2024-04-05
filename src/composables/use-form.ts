
import type { ComputedRef, MaybeRef, Ref, UnwrapNestedRefs } from 'vue';
import type * as zod from 'zod';
import type { ZodTypeAny, SafeParseReturnType } from 'zod';

import { computed, toRaw, reactive, ref, unref } from 'vue';
import { z } from 'zod';
import equals from '../utils/equals';
import request, { type Payload, type Response } from '../utils/request';

export type FormMethods = 'GET' | 'PATCH' | 'POST' | 'PUT';

export type Validator<T> = (z: typeof zod, values: T) => ValidationRules<T>;

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
    method: ComputedRef<FormMethods>;

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
     * Set Form Validator handler.
     * @param validator 
     * @returns
     */
    setValidator(validatorFunc: Validator<T>): void;

    /**
     * Unset Form Validator handler.
     * @returns
     */
    unsetValidator(): void;

    /**
     * Touch form to trigger validation handling.
     * @returns
     */
    touch(): void;

    /**
     * Untouch form to reset validation handling.
     * @returns
     */
    untouch(): void;

    /**
     * Check if a specific field is dirty.
     * @param key 
     */
    isDirty(key: keyof T): boolean;

    /**
     * Validate a specific field.
     * @param key
     * @param force
     * @returns 
     */
    isValid(key: keyof T, force?: boolean): boolean;

    /**
     * Validate a specific field.
     * @param key
     * @param force
     * @returns 
     */
    isInvalid(key: keyof T, force?: boolean): boolean;

    /**
     * Validate Form Values
     * @param keys Limit validation to the passed set of keys.
     * @returns 
     */
    validate(keys?: Array<keyof T>): ValidationResult<T>;

    /**
     * Submit Form handler.
     * @param newValues 
     * @returns 
     */
    submit(): Promise<Response<any, any>|false>;

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
    rules?: Validator<T>
): FormHandler<T> {
    const validator = ref<Validator<T>|undefined>(rules ?? void 0);

    /**
     * Set Form Details
     */
    const form = computed<HTMLFormElement|null>(() => {
        const temp = unref(element);
        return temp instanceof HTMLElement && temp?.localName == 'form' ? temp : null;
    });
    const action = computed<string|null>(
        () => form.value ? form.value.getAttribute('action') : null
    );
    const method = computed<FormMethods>(
        () => ((form.value ? (form.value.getAttribute('method') || 'POST') : 'POST') as any).toUpperCase()
    );

    /**
     * Set Form Values
     */
    const originals = Object.freeze(JSON.parse(JSON.stringify(initial)));
    const keys = Object.freeze(Object.keys(initial)) as Array<keyof T>;
    const values = reactive<T>(initial);
    
    const dirtyKeys = computed<(keyof T)[]>(() => {
        const dirty: Array<keyof T> = [];
        for (const key of keys) {
            if (isDirty(key)) {
                dirty.push(key);
            }
        }
        return dirty;
    });

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
     * Set Form Validator handler.
     * @param validator 
     * @returns
     */
    function setValidator(validatorFunc: Validator<T>) {
        validator.value = validatorFunc;
    }

    /**
     * Unset Form Validator handler.
     * @returns
     */
    function unsetValidator() {
        validator.value = void 0;
    }

    /**
     * Touch form to trigger validation handling.
     * @returns
     */
    function touch() {
        touched.value = true;
    }

    /**
     * Untouch form to reset validation handling.
     * @returns
     */
    function untouch() {
        touched.value = false;
    }

    /**
     * Check if a specific field is dirty.
     * @param key 
     */
    function isDirty(key: keyof T) {
        const original = originals[key];
        const value = toRaw((values as any)[key]);
        return !equals(original, value);
    }

    /**
     * Validate a specific field.
     * @param key
     * @param force
     * @returns 
     */
    function isValid(key: keyof T, force?: boolean): boolean {
        if (!validator.value) {
            return true;
        }

        // Always true when not touched & not changed (& not forced)
        if (!touched.value && !(typeof force == 'boolean' && force === true)) {
            if (!dirtyKeys.value.includes(key)) {
                return true;
            }
        }

        // Receive validation rules
        const ruleSet = validator.value(z as typeof zod, payload.value);
        return ruleSet[key].safeParse((values as any)[key]).success;
    }

    /**
     * Validate a specific field.
     * @param key
     * @param force
     * @returns 
     */
    function isInvalid(key: keyof T, force?: boolean): boolean {
        return !isValid(key, force);
    }   

    /**
     * Validate Form Values
     * @param keys Limit validation to the passed set of keys.
     * @returns 
     */
    function validate(keys?: Array<keyof T>): ValidationResult<T> {
        if (!validator.value) {
            return {
                valid: true,
                errors: {} as any,
                results: {} as any
            };
        }
        const ruleSet = validator.value(z as typeof zod, payload.value);

        let valid = true;
        const results: { [Property in keyof T]: SafeParseReturnType<any, any> } = {} as any;
        const errors: { [Property in keyof T]: string[] } = {} as any;

        for (const [key, rule] of Object.entries(ruleSet)) {
            if (typeof keys != 'undefined') {
                if (keys.indexOf(key as any) < 0) {
                    continue;
                }
            }

            const result = (rule as ZodTypeAny).safeParse((values as any)[key]);
            
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
     * 
     * @param newValues 
     * @returns 
     */
    async function submit(): Promise<Response<any, any>|false> {
        if (!action.value || !method.value) {
            return false;
        }
        if (loading.value) {
            return false;
        }
        touched.value = true;

        // Validate Data
        const result = validate();
        if (!result.valid) {
            return {
                status: 'error',
                message: 'invalid',
                details: result.results
            };
        }
        loading.value = true;

        // Submit Data
        try {
            const response = await request(action.value, payload.value as Payload);
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

        // Handler
        setValidator,
        unsetValidator,
        touch,
        untouch,

        // Actions
        isDirty,
        isValid,
        isInvalid,
        validate,
        submit,
        update,
        reset
    }
}
