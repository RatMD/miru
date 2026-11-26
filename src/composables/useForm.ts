import type { AjaxFormOptions } from '../adapters/ajax';
import type {
    InertiaFormOptions,
    FormAdapterSelection,
    FormMethod,
    FormPayload,
    FormServerErrors,
} from '../types/adapters';
import type {
    AnyFormApi,
    DeepKeys,
    FormValidateOrFn,
    FormAsyncValidateOrFn,
} from '@tanstack/vue-form';
import type { MaybeRefOrGetter, ComputedRef, Ref } from 'vue';
import type { z } from 'zod';
import { useForm as useTanStackForm } from '@tanstack/vue-form';
import { computed, inject, ref, toValue } from 'vue';
import { resolveFormAdapter } from '../components/form/adapter';
import { useI18n } from '../composables/useI18n';
import { miruOptionsKey } from '../miru';

// Available HTTP methods
export type Method = FormMethod;

// Submit definitions
export interface SubmitDefinition {
    method: Method;
    url: string;
}
export type Submit = string | SubmitDefinition;

// Submit modes
export type SubmitMode = 'inertia' | 'json';

// Zod Typings
/** Accept object schemas and object-shaped discriminated unions. */
export type ObjectSchema = z.ZodType<Record<string, unknown>, Record<string, unknown>>;
export type FormValues<TSchema extends ObjectSchema> = z.output<TSchema>;
export type FieldPath<TValues> = Extract<DeepKeys<TValues>, string>;
export type TypedErrors<TValues> = Partial<Record<FieldPath<TValues> | '_form', string>>;

// Error sources
export type ErrorSource = 'client' | 'server' | 'transport';
export interface FormErrorDetails<TValues> {
    source: ErrorSource;
    errors: TypedErrors<TValues>;
}

// Json responses
export interface JsonSuccessResponse<TResult = unknown> {
    status: 'success';
    result: TResult;
    message?: string;
}
export interface JsonErrorResponse<TDetails = unknown> {
    status: 'error';
    message?: string;
    details?: TDetails;
}
export type JsonResponse<TResult = unknown, TDetails = unknown> =
    JsonSuccessResponse<TResult> | JsonErrorResponse<TDetails>;

// Form Result
export type FormResult<TSchema extends ObjectSchema, TResult = unknown> = JsonResponse<
    TResult,
    FormErrorDetails<FormValues<TSchema>>
>;

// Submit Context
export interface SubmitContext<TSchema extends ObjectSchema> {
    method: Method;
    url: string;
    values: FormValues<TSchema>;
    payload: FormPayload;
}

// Options
/** @deprecated Import InertiaFormOptions from the optional adapters/inertia entry point. */
export type InertiaOptions = InertiaFormOptions;
export type HttpResponse<TResult> = TResult | JsonResponse<TResult>;
/** @deprecated Use AjaxFormOptions and requestOptions. */
export type HttpOptions<TResult = unknown> = AjaxFormOptions;
export interface FormOptions<TSchema extends ObjectSchema, TResult = unknown> {
    schema: TSchema;
    submit: MaybeRefOrGetter<Submit>;
    /** @deprecated json selects AJAX; inertia selects the Inertia adapter. */
    mode?: SubmitMode;
    adapter?: FormAdapterSelection;
    requestOptions?: (context: SubmitContext<TSchema>) => AjaxFormOptions;
    /** Custom adapter-specific options; takes precedence over requestOptions/visitOptions. */
    adapterOptions?: (context: SubmitContext<TSchema>) => unknown;
    initialValues: FormValues<TSchema>;
    visitOptions?: (context: SubmitContext<TSchema>) => InertiaOptions;
    httpOptions?: (context: SubmitContext<TSchema>) => HttpOptions<TResult>;
    transformValues?: (values: FormValues<TSchema>) => FormPayload;
    /** Run validated host work (for example label printing) before starting the request. */
    beforeSubmit?: (context: SubmitContext<TSchema>) => void | Promise<void>;
    resetFields?: Array<FieldPath<FormValues<TSchema>>>;
    mapErrors?: (errors: Record<string, string>) => TypedErrors<FormValues<TSchema>>;
    onSuccess?: (context: {
        result: FormResult<TSchema, TResult>;
        values: FormValues<TSchema>;
    }) => void | Promise<void>;
    onError?: (context: {
        result: FormResult<TSchema, TResult>;
        values: FormValues<TSchema>;
    }) => void | Promise<void>;
}

type SyncValidator<TValues> = FormValidateOrFn<TValues> | undefined;
type AsyncValidator<TValues> = FormAsyncValidateOrFn<TValues> | undefined;
/** Public controller type keeps schema values/paths typed without serializing adapter internals. */
export type FormApiFor<TValues> = ReturnType<
    typeof useTanStackForm<
        TValues,
        SyncValidator<TValues>,
        SyncValidator<TValues>,
        AsyncValidator<TValues>,
        SyncValidator<TValues>,
        AsyncValidator<TValues>,
        SyncValidator<TValues>,
        AsyncValidator<TValues>,
        SyncValidator<TValues>,
        AsyncValidator<TValues>,
        AsyncValidator<TValues>,
        unknown
    >
>;
export interface FormController<TSchema extends ObjectSchema, TResult = unknown> {
    form: FormApiFor<FormValues<TSchema>>;
    loading: ComputedRef<boolean>;
    formError: Ref<string | undefined>;
    submit: ComputedRef<SubmitDefinition>;
    onSubmit: (method?: Method, url?: string) => Promise<FormResult<TSchema, TResult> | undefined>;
    submitForm: () => Promise<FormResult<TSchema, TResult> | undefined>;
}

/**
 * @param submit
 * @returns
 */
function parseSubmit(submit: Submit): SubmitDefinition {
    if (typeof submit === 'string') {
        return {
            method: 'post',
            url: submit,
        };
    } else {
        return submit;
    }
}

/**
 * @param value
 * @returns
 */
/**
 * @param error
 * @returns
 */
function errorMessage(error: unknown, fallback: string): string {
    if (error instanceof Error) {
        return error.message;
    }

    if (
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof error.message === 'string'
    ) {
        return error.message;
    }

    return fallback;
}

/**
 * @param errors
 * @returns
 */
function firstErrorMessage(errors: readonly unknown[]): string | undefined {
    for (const error of errors) {
        if (typeof error === 'string') {
            return error;
        }

        if (
            typeof error === 'object' &&
            error !== null &&
            'message' in error &&
            typeof error.message === 'string'
        ) {
            return error.message;
        }
    }

    return undefined;
}

/**
 * @param values
 * @returns
 */
function toFormPayload(values: object): FormPayload {
    return values as Record<string, unknown>;
}

/**
 * @param error
 * @returns
 */
function zodValidationErrors<TValues>(error: z.ZodError): {
    form: string | undefined;
    fields: Partial<Record<FieldPath<TValues>, string>>;
} {
    const fields: Partial<Record<FieldPath<TValues>, string>> = {};
    let form: string | undefined;

    for (const issue of error.issues) {
        if (issue.path.length === 0) {
            form ??= issue.message;
            continue;
        }

        const field = issue.path.reduce<string>((path, segment) => {
            if (typeof segment === 'number') {
                return `${path}[${segment}]`;
            }

            return path === '' ? String(segment) : `${path}.${String(segment)}`;
        }, '') as FieldPath<TValues>;
        fields[field] ??= issue.message;
    }

    return { form, fields };
}

/**
 * Export useForm composable
 * @param config
 * @returns
 */
export function useForm<TSchema extends ObjectSchema, TResult = unknown>(
    config: FormOptions<TSchema, TResult>,
): FormController<TSchema, TResult> {
    const { trans } = useI18n();
    type Values = FormValues<TSchema>;
    type Result = FormResult<TSchema, TResult>;
    type ErrorsForForm = TypedErrors<Values>;

    // States
    const submitting = ref(false);
    const formError = ref<string>();
    const submit = computed<SubmitDefinition>(() => parseSubmit(toValue(config.submit)));

    // Composables
    const miru = inject(miruOptionsKey, {});

    // Values
    let currentSubmit: SubmitDefinition | undefined;
    let currentResult: Result | undefined;
    let currentValues: Values | undefined;
    let validatedValues: Values | undefined;

    // Form
    const form = useTanStackForm({
        defaultValues: config.initialValues,
        validators: {
            onSubmitAsync: async ({ value }) => {
                const result = await config.schema.safeParseAsync(value);
                if (result.success) {
                    validatedValues = result.data;
                    return undefined;
                } else {
                    return zodValidationErrors<Values>(result.error);
                }
            },
        },
        onSubmit: async ({ value }) => {
            // Use the exact result of this validation run, including async Zod transformations.
            const values = validatedValues ?? value;
            currentValues = values;

            const target = currentSubmit ?? submit.value;
            const payload: FormPayload = config.transformValues
                ? config.transformValues(values)
                : toFormPayload(values);
            const context: SubmitContext<TSchema> = {
                method: target.method,
                url: target.url,
                values,
                payload,
            };

            await config.beforeSubmit?.(context);

            const selection =
                config.adapter ??
                (config.mode
                    ? config.mode === 'json'
                        ? 'ajax'
                        : 'inertia'
                    : (miru.formAdapter ?? 'ajax'));
            const adapter = await resolveFormAdapter(selection, miru.formAdapters);
            const response = await adapter.submit({
                ...context,
                options:
                    config.adapterOptions?.(context) ??
                    config.requestOptions?.(context) ??
                    config.httpOptions?.(context) ??
                    config.visitOptions?.(context),
                cancelledMessage: trans('common.form.transport.cancelled'),
                unprocessedMessage: trans('common.form.transport.unprocessed'),
            });
            currentResult =
                response.status === 'success'
                    ? (response as Result)
                    : {
                          status: 'error',
                          message: response.message,
                          details: {
                              source: response.source,
                              errors: normalizeErrors(response.errors ?? {}),
                          },
                      };
        },
        onSubmitInvalid: ({ formApi, value }) => {
            currentValues = value;

            const invalidForm = formApi as unknown as AnyFormApi;
            const errors: Record<string, string> = {};
            const fieldMeta = invalidForm.state.fieldMeta;
            for (const [field, metadata] of Object.entries(fieldMeta)) {
                const message = firstErrorMessage(metadata?.errors ?? []);
                if (message) {
                    errors[field] = message;
                    invalidForm.setFieldMeta(field, (current) => ({
                        ...current,
                        isTouched: true,
                    }));
                }
            }

            currentResult = {
                status: 'error',
                message:
                    Object.keys(errors).length === 0
                        ? firstErrorMessage(invalidForm.state.errors ?? [])
                        : undefined,
                details: {
                    source: 'client',
                    errors: errors as unknown as ErrorsForForm,
                },
            };
        },
    });
    const runtimeForm = form as unknown as AnyFormApi;

    /** Discard the previous schema result so stale field errors cannot skip the next schema run. */
    function clearClientErrors(): void {
        for (const [field, metadata] of Object.entries(runtimeForm.state.fieldMeta)) {
            if (!metadata) continue;
            // Custom editors may create metadata before TanStack mounts the field.
            if (!metadata.errorSourceMap || !metadata.errorMap) {
                runtimeForm.setFieldMeta(field, (current) => ({
                    ...(current ?? metadata),
                    errorMap: (current ?? metadata).errorMap ?? {},
                    errorSourceMap: (current ?? metadata).errorSourceMap ?? {},
                }));
            }
            if (metadata.errorSourceMap?.onSubmit !== 'form') continue;
            runtimeForm.setFieldMeta(field, (current) => ({
                ...(current ?? metadata),
                errorMap: { ...(current ?? metadata).errorMap, onSubmit: undefined },
                errorSourceMap: { ...(current ?? metadata).errorSourceMap, onSubmit: undefined },
            }));
        }
        runtimeForm.setErrorMap({ ...runtimeForm.state.errorMap, onSubmit: undefined });
    }

    /**
     * @param errors
     * @returns
     */
    function normalizeErrors(errors: FormServerErrors): ErrorsForForm {
        const messages: Record<string, string> = {};
        for (const [field, value] of Object.entries(errors)) {
            const message = typeof value === 'string' ? value : value[0];
            if (message) messages[field] = message;
        }
        if (config.mapErrors) return config.mapErrors(messages);
        return Object.fromEntries(
            Object.entries(messages).map(([field, message]) => [
                field.replace(/\.(\d+)(?=\.|$)/g, '[$1]'),
                message,
            ]),
        ) as ErrorsForForm;
    }

    /**
     *
     */
    function clearServerErrors(): void {
        for (const [field, metadata] of Object.entries(runtimeForm.state.fieldMeta)) {
            if (!metadata?.errorMap?.onServer) continue;
            runtimeForm.setFieldMeta(field, (current) => ({
                ...(current ?? metadata),
                errorMap: {
                    ...(current ?? metadata).errorMap,
                    onServer: undefined,
                },
            }));
        }

        formError.value = undefined;
    }

    /**
     * @param errors
     */
    function applyServerErrors(errors: ErrorsForForm): void {
        const runtimeErrors = errors as unknown as Record<string, string | undefined>;
        for (const [field, message] of Object.entries(runtimeErrors)) {
            if (!message) {
                continue;
            }

            if (field === '_form') {
                formError.value = message;
                continue;
            }

            runtimeForm.setFieldMeta(field, (metadata) => ({
                ...metadata,
                isTouched: true,
                errorMap: {
                    ...metadata?.errorMap,
                    onServer: message,
                },
            }));
        }
    }

    /**
     * @param context
     * @returns
     */
    async function onSubmit(method?: Method, url?: string): Promise<Result | undefined> {
        if (submitting.value) {
            return undefined;
        }

        submitting.value = true;
        currentResult = undefined;
        currentValues = undefined;
        validatedValues = undefined;
        try {
            clearServerErrors();
            clearClientErrors();

            const configuredSubmit = submit.value;

            currentSubmit = {
                method: method ?? configuredSubmit.method,
                url: url ?? configuredSubmit.url,
            };

            await form.handleSubmit();

            const result: Result = currentResult ?? {
                status: 'error',
                message: trans('common.form.transport.unprocessed'),
                details: {
                    source: 'transport',
                    errors: {} as ErrorsForForm,
                },
            };

            const values = currentValues ?? form.state.values;

            if (result.status === 'error') {
                if (result.details?.source === 'server') {
                    applyServerErrors(result.details.errors);
                }

                if (result.message) {
                    formError.value = result.message;
                }

                await config.onError?.({
                    result,
                    values,
                });
            } else {
                await config.onSuccess?.({
                    result,
                    values,
                });

                for (const field of config.resetFields ?? []) {
                    runtimeForm.resetField(field);
                }
            }

            return result;
        } catch (error: unknown) {
            const result: Result = {
                status: 'error',
                message: errorMessage(error, trans('common.form.transport.unknown')),
                details: {
                    source: 'transport',
                    errors: {},
                },
            };

            formError.value = result.message;

            await config.onError?.({
                result,
                values: currentValues ?? form.state.values,
            });

            return result;
        } finally {
            currentSubmit = undefined;
            submitting.value = false;
        }
    }

    // Loading State
    const loading = computed(() => {
        return submitting.value;
    });

    // Export
    return {
        form: form as unknown as FormApiFor<Values>,
        loading,
        formError,
        submit,
        onSubmit,
        submitForm: () => onSubmit(),
    };
}
