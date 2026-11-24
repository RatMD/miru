import type { CodeLanguage } from './types';
export interface FormattedCode {
    text: string;
    failed: boolean;
}

/** Retain object structure, support BigInt, and replace only genuine circular references. */
export function serializeCode(value: unknown): string {
    if (typeof value === 'string') return value;
    if (value === undefined) return 'undefined';
    const ancestors: object[] = [];
    try {
        return (
            JSON.stringify(
                value,
                function (this: object, _key, next: unknown) {
                    if (typeof next === 'bigint') return String(next);
                    if (!next || typeof next !== 'object') return next;
                    while (ancestors.length && ancestors.at(-1) !== this) ancestors.pop();
                    if (ancestors.includes(next)) return '[Circular]';
                    ancestors.push(next);
                    return next;
                },
                2,
            ) ?? String(value)
        );
    } catch {
        return String(value);
    }
}

/** Load browser-safe formatting only for a supported code language. Invalid code remains readable. */
export async function formatCode(
    value: unknown,
    language: CodeLanguage,
    enabled = true,
): Promise<FormattedCode> {
    const raw = serializeCode(value);
    if (!enabled || language === 'text' || !raw.trim()) return { text: raw, failed: false };
    try {
        const prettier = await import('prettier/standalone');
        const plugins =
            language === 'html'
                ? [(await import('prettier/plugins/html')).default]
                : [
                      (await import('prettier/plugins/babel')).default,
                      (await import('prettier/plugins/estree')).default,
                  ];
        const text = await prettier.format(raw, {
            parser: language === 'json' ? 'json-stringify' : 'html',
            plugins,
            tabWidth: 2,
            printWidth: 100,
            embeddedLanguageFormatting: 'off',
        });
        return { text: text.replace(/\n$/, ''), failed: false };
    } catch {
        return { text: raw, failed: true };
    }
}
