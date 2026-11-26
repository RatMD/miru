import type { PageToast } from '../composables/useToast';
import type {
    FormAdapter,
    FormAdapterResult,
    MiruAdapter,
    NavigationAdapter,
} from '../types/adapters';
import type { RequestPayload, VisitOptions } from '@inertiajs/core';
import { Link, router, usePage } from '@inertiajs/vue3';

type InertiaVisitOptions = Omit<
    VisitOptions,
    'method' | 'data' | 'onSuccess' | 'onError' | 'onCancel'
>;

export type InertiaFormOptions = InertiaVisitOptions;

declare module '../types/adapters' {
    interface FormAdapterOptions {
        inertia: InertiaVisitOptions;
    }
}

/** Explicit optional entry point; the host application provides Inertia. */
export function createInertiaFormAdapter(defaults: InertiaFormOptions = {}): FormAdapter {
    return {
        submit(context) {
            return new Promise<FormAdapterResult>((resolve, reject) => {
                let settled = false;
                const settle = (result: FormAdapterResult) => {
                    if (!settled) {
                        settled = true;
                        resolve(result);
                    }
                };
                const options = { ...defaults, ...((context.options ?? {}) as InertiaFormOptions) };
                try {
                    router.visit(context.url, {
                        preserveState: 'errors',
                        ...options,
                        method: context.method,
                        data: context.payload as RequestPayload,
                        onBefore: (visit) => {
                            const result = options.onBefore?.(visit);
                            if (result === false)
                                settle({
                                    status: 'error',
                                    source: 'transport',
                                    message: context.cancelledMessage,
                                });
                            return result;
                        },
                        onSuccess: (page) => {
                            settle({ status: 'success', result: page });
                        },
                        onError: (errors) => {
                            settle({ status: 'error', source: 'server', errors });
                        },
                        onCancel: () => {
                            settle({
                                status: 'error',
                                source: 'transport',
                                message: context.cancelledMessage,
                            });
                        },
                        onNetworkError: (error) => {
                            settle({
                                status: 'error',
                                source: 'transport',
                                message: error.message,
                            });
                            return options.onNetworkError?.(error);
                        },
                        onHttpException: (event) => {
                            settle({
                                status: 'error',
                                source: 'transport',
                                message: context.unprocessedMessage,
                            });
                            return options.onHttpException?.(event);
                        },
                        onFinish: (visit) => {
                            settle({
                                status: 'error',
                                source: 'transport',
                                message: context.unprocessedMessage,
                            });
                            options.onFinish?.(visit);
                        },
                    });
                } catch (error) {
                    reject(error);
                }
            });
        },
    };
}

/** Adapt Inertia navigation without exposing its runtime in Miru's core entry points. */
export function createInertiaNavigationAdapter(): NavigationAdapter {
    return {
        link: Link,
        visit(url, options = {}) {
            router.visit(url, { ...options, data: options.data as RequestPayload });
        },
    };
}

interface UiPageProps {
    [key: string]: unknown;
    app?: { locale?: string; toasts?: PageToast[] };
}

/** Supply Inertia transport, navigation and reactive page defaults to createMiru(). */
export function inertiaAdapter(options: InertiaFormOptions = {}): MiruAdapter {
    const page = usePage<UiPageProps>();
    return {
        formAdapter: 'inertia',
        formAdapters: { inertia: createInertiaFormAdapter(options) },
        navigation: createInertiaNavigationAdapter(),
        locale: () => page.props?.app?.locale,
        pageToasts: () => page.props?.app?.toasts,
    };
}
