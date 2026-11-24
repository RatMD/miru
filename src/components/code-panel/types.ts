export type CodeLanguage = 'json' | 'html' | 'text';
export interface CodeSection {
    /** Stable, unique key independent of the translated label. */
    id: string;
    label: string;
    value: unknown;
    language?: CodeLanguage;
}
