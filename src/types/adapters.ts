import type { PageToast } from '../composables/useToast';
import type { I18nOptions } from '../plugins/i18n';
import type { Component, MaybeRefOrGetter } from 'vue';

export type FormMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';
export type FormPayload = Record<string, unknown> | FormData;
export type FormServerErrors = Record<string, string | readonly string[]>;

export interface FormAdapterContext {
    method: FormMethod;
    url: string;
    values: Record<string, unknown>;
    payload: FormPayload;
    /** Per-request adapter options; defined by the selected adapter. */
    options?: unknown;
    cancelledMessage: string;
    unprocessedMessage: string;
}

export type FormAdapterResult<TResult = unknown> =
    | { status: 'success'; result: TResult; message?: string }
    | {
          status: 'error';
          message?: string;
          source: 'server' | 'transport';
          errors?: FormServerErrors;
      };

/** Adapters are stateless; loading and field state belong to each useForm controller. */
export interface FormAdapter {
    submit(context: FormAdapterContext): Promise<FormAdapterResult>;
}

export type FormAdapterSelection = 'ajax' | 'inertia' | FormAdapter;

/** Optional adapters can augment their legacy option types without coupling core declarations. */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface FormAdapterOptions {}

/** Legacy option alias; importing the optional adapter supplies its full Inertia types. */
export type InertiaFormOptions = FormAdapterOptions extends { inertia: infer T }
    ? T
    : Record<string, unknown>;

/** Framework-neutral options used by table navigation and actions. */
export interface NavigationOptions {
    method?: FormMethod;
    data?: Record<string, unknown>;
    preserveScroll?: boolean;
    preserveState?: boolean;
    replace?: boolean;
    only?: string[];
    onStart?: () => void;
    onSuccess?: () => void;
    onError?: (error: unknown) => void;
    onFinish?: () => void;
}

export interface NavigationAdapter {
    /** Optional SPA link component; normal anchors are used otherwise. */
    link?: Component;
    visit(url: string, options?: NavigationOptions): void;
}

/** Transport and reactive host page defaults, independent of backend list conventions. */
export interface MiruAdapter {
    formAdapter?: FormAdapterSelection;
    formAdapters?: Partial<Record<'ajax' | 'inertia', FormAdapter>>;
    navigation?: NavigationAdapter;
    locale?: I18nOptions['locale'];
    pageToasts?: MaybeRefOrGetter<readonly PageToast[] | undefined>;
}
