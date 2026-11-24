import type { I18nChoiceTranslator, I18nParameters, I18nTranslator } from '../plugins/i18n';
import type { MaybeRefOrGetter } from 'vue';
import { computed, inject, provide, toValue } from 'vue';
import { createI18nContext, normalizeLocale, translateI18n, i18nKey } from '../plugins/i18n';
export type {
    I18nAdapter,
    I18nOptions,
    I18nTranslator,
    I18nChoiceTranslator,
    I18nMessages,
    I18nParameters,
} from '../plugins/i18n';

/** App-local defaults and nearest-provider overrides, including host i18n adapters. */
export function useI18n(override?: MaybeRefOrGetter<string | undefined>) {
    const context = inject(i18nKey, undefined) ?? createI18nContext();
    const locale = computed(() => normalizeLocale(toValue(override) || context.locale.value));
    function trans(key: string, parameters: I18nParameters = {}): string {
        const activeLocale = locale.value;
        const result = context.translate.value?.(key, parameters, activeLocale);
        return result !== undefined && result !== key
            ? result
            : translateI18n(activeLocale, key, parameters, {
                  messages: context.messages.value,
                  fallbackLocale: context.fallbackLocale.value,
              });
    }
    function transChoice(key: string, count: number, parameters: I18nParameters = {}): string {
        const values = { ...parameters, count };
        const result = context.translateChoice.value?.(key, count, values, locale.value);
        if (result !== undefined && result !== key) return result;
        const parts = trans(key, values).split('|');
        return (parts.length === 1 ? parts[0]! : parts[count === 1 ? 0 : 1]!).trim();
    }
    return { locale, trans, transChoice, t: trans, tc: transChoice };
}

/** Provide reactive overrides without replacing inherited dictionaries or host adapters. */
export function provideI18nLocale(
    value: MaybeRefOrGetter<string | undefined>,
    getTranslator?: () => I18nTranslator | undefined,
    getChoiceTranslator?: () => I18nChoiceTranslator | undefined,
) {
    const inherited = inject(i18nKey, undefined) ?? createI18nContext();
    const locale = computed(() => normalizeLocale(toValue(value) || inherited.locale.value));
    provide(i18nKey, {
        ...inherited,
        locale,
        translate: computed(() => getTranslator?.() ?? inherited.translate.value),
        translateChoice: computed(() => getChoiceTranslator?.() ?? inherited.translateChoice.value),
    });
    return locale;
}
