import type { FormLocalizationConfig, FormLocaleOption } from './types';
import { translated } from './types';

export function localizedFieldName(locale: string, name: string): string {
    return `translations.${locale}.${name}`;
}

export function createFormLocalization(
    locales: readonly string[],
    baseLocale: string,
    initialLocale = baseLocale,
    fieldPath: FormLocalizationConfig['fieldPath'] = 'nested',
): FormLocalizationConfig {
    const options: FormLocaleOption[] = locales.map((locale) => ({
        value: locale,
        label: translated(`common.locales.${locale}`),
    }));

    return { locales: options, baseLocale, initialLocale, fieldPath };
}
