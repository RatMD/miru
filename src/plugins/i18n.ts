import type { App, ComputedRef, InjectionKey, MaybeRefOrGetter, Plugin } from 'vue';
import { computed, inject, toValue } from 'vue';
import { miruOptionsKey } from '../miru';
import { messages } from './i18n/messages';

export type I18nParameters = Record<string, string | number>;
export type I18nTranslator = (
    key: string,
    parameters: I18nParameters,
    locale: string,
) => string | undefined;
export type I18nChoiceTranslator = (
    key: string,
    count: number,
    parameters: I18nParameters,
    locale: string,
) => string | undefined;
export interface I18nDictionary {
    [key: string]: string | I18nDictionary;
}
export type I18nMessages = Record<string, I18nDictionary>;

/** Implement these callbacks with vue-i18n, laravel-vue-i18n or any host translator. */
export interface I18nAdapter {
    /** Host language as a value, ref or getter; underscores are normalized to hyphens. */
    locale?: MaybeRefOrGetter<string | undefined>;
    /** Resolve a key with replacements and the effective UI locale; undefined permits fallback. */
    translate?: I18nTranslator;
    /** Resolve a pluralized key using the count, replacements and effective UI locale. */
    translateChoice?: I18nChoiceTranslator;
}
export interface I18nOptions extends I18nAdapter {
    /** Connect a host translator; direct locale/translate/translateChoice options take precedence. */
    i18n?: I18nAdapter;
    /** Fallback language as a value, ref or getter; defaults to en, the final built-in fallback. */
    fallbackLocale?: MaybeRefOrGetter<string | undefined>;
    /** Dictionaries by locale, as a value, ref or getter; override matching built-in en/de keys. */
    messages?: MaybeRefOrGetter<I18nMessages | undefined>;
}

/** @internal Shared by the app plugin and subtree providers. */
export interface I18nContext {
    locale: ComputedRef<string>;
    fallbackLocale: ComputedRef<string>;
    messages: ComputedRef<I18nMessages | undefined>;
    translate: ComputedRef<I18nTranslator | undefined>;
    translateChoice: ComputedRef<I18nChoiceTranslator | undefined>;
}
export const i18nKey: InjectionKey<I18nContext> = Symbol('MiruI18n');

export function normalizeLocale(locale?: string): string {
    return locale?.replaceAll('_', '-') || 'en';
}

function lookup(dictionary: I18nDictionary | undefined, key: string): string | undefined {
    let value: string | I18nDictionary | undefined = dictionary;
    for (const segment of key.split('.')) {
        value =
            value && typeof value === 'object' && Object.hasOwn(value, segment)
                ? value[segment]
                : undefined;
    }
    return typeof value === 'string' ? value : undefined;
}

/** Pure translation, also usable by directives outside Vue setup. */
export function translateI18n(
    locale: string,
    key: string,
    parameters: I18nParameters = {},
    options: Pick<I18nOptions, 'messages' | 'fallbackLocale'> = {},
): string {
    const active = normalizeLocale(locale).toLowerCase();
    const fallback = normalizeLocale(toValue(options.fallbackLocale)).toLowerCase();
    const custom = Object.fromEntries(
        Object.entries(toValue(options.messages) ?? {}).map(([name, dictionary]) => [
            normalizeLocale(name).toLowerCase(),
            dictionary,
        ]),
    );
    for (const candidate of new Set([
        active,
        active.split('-')[0]!,
        fallback,
        fallback.split('-')[0]!,
        'en',
    ])) {
        const value =
            lookup(custom[candidate], key) ?? lookup((messages as I18nMessages)[candidate], key);
        if (value !== undefined)
            return value.replace(/:([a-z_]+)/gi, (match, name: string) =>
                String(parameters[name] ?? match),
            );
    }
    return key;
}

/** @internal Options remain reactive so changing the app configuration updates consumers. */
export function createI18nContext(options: I18nOptions = {}): I18nContext {
    return {
        locale: computed(() => normalizeLocale(toValue(options.locale ?? options.i18n?.locale))),
        fallbackLocale: computed(() => normalizeLocale(toValue(options.fallbackLocale))),
        messages: computed(() => toValue(options.messages)),
        translate: computed(() => options.translate ?? options.i18n?.translate),
        translateChoice: computed(() => options.translateChoice ?? options.i18n?.translateChoice),
    };
}

/** Install app-local translation settings; use installed Miru configuration when omitted. */
export function installI18n(app: App, options?: I18nOptions): void {
    const config = options ?? app.runWithContext(() => inject(miruOptionsKey, {}));
    app.provide(i18nKey, createI18nContext(config));
}
export function createMiruI18n(options?: I18nOptions): Plugin {
    return {
        install(app) {
            installI18n(app, options);
        },
    };
}
