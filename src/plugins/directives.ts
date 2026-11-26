import type { TinymceOptions } from './tinymce';
import type { App, MaybeRefOrGetter, Plugin } from 'vue';
import { inject, toValue } from 'vue';
import { miruOptionsKey } from '../miru';
import directiveClickOutside from './click-outside';
import { createDayjsDirective } from './dayjs';
import directiveFilesize from './filesize';
import { createI18nContext } from './i18n';
import { createNumberFormatDirective } from './number-format';
import { createPriceDirective } from './price';
import directiveResize from './resize';
import { vTinymce, configureTinymce } from './tinymce';
export { vTinymce, configureTinymce, TinymcePlugin } from './tinymce';
export type { TinymceBinding, TinymceOptions } from './tinymce';
export type { MiruGlobalDirectives } from '../types/directives';

export * from './click-outside';
export * from './resize';
export { default as directiveDayJs, vDayjs, createDayjsDirective } from './dayjs';
export * from './filesize';
export * from './number-format';
export { default as directivePrice, vPrice, formatPrice, createPriceDirective } from './price';
export interface UiDirectiveOptions {
    locale?: MaybeRefOrGetter<string | undefined>;
    currency?: string;
    tinymce?: TinymceOptions;
}
/** Creates app-local formatters. No window/document access occurs until a directive mounts. */
export function createUiDirectives(options: UiDirectiveOptions = {}) {
    const locale = () => (toValue(options.locale) ?? 'de-DE').replaceAll('_', '-');
    return {
        tinymce: vTinymce,
        'click-outside': directiveClickOutside,
        resize: directiveResize,
        filesize: directiveFilesize,
        dayjs: createDayjsDirective(locale),
        price: createPriceDirective(locale, options.currency),
        'number-format': createNumberFormatDirective(locale),
    };
}
export function installUiDirectives(app: App, options: UiDirectiveOptions = {}): void {
    if (options.tinymce) configureTinymce(options.tinymce);
    const directives = createUiDirectives(options);
    app.directive('tinymce', directives.tinymce);
    app.directive('click-outside', directives['click-outside']);
    app.directive('dayjs', directives.dayjs);
    app.directive('filesize', directives.filesize);
    app.directive('file-size', directives.filesize);
    app.directive('price', directives.price);
    app.directive('number-format', directives['number-format']);
    app.directive('resize', directives.resize);
}

/** Standalone Vue plugin; by default reads this app's installed Miru configuration. */
export function createMiruDirectives(options?: UiDirectiveOptions): Plugin {
    return {
        install(app) {
            const config = options ?? app.runWithContext(() => inject(miruOptionsKey, {}));
            const i18n = createI18nContext(config);
            installUiDirectives(app, { ...config, locale: i18n.locale });
        },
    };
}
