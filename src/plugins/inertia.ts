import type { PageToast } from '../composables/useToast';
import type { MiruInstallation } from '../miru';
import type { MiruOptions } from '../miru';
import { usePage } from '@inertiajs/vue3';
import { createMiru } from '../miru';

interface UiPageProps {
    [key: string]: unknown;
    app?: { locale?: string; toasts?: PageToast[] };
}

/** Bridge the existing MIRU page envelope without adding navigation listeners. */
export function createInertiaMiru(options: MiruOptions = {}): MiruInstallation {
    const page = usePage<UiPageProps>();
    return createMiru({
        ...options,
        locale: options.locale ?? options.i18n?.locale ?? (() => page.props?.app?.locale),
        pageToasts: options.pageToasts ?? (() => page.props?.app?.toasts),
    });
}
