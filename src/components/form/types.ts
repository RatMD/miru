import type { MarkdownSyntax, MarkdownTool } from '../editor-markdown';
import type { InlineVariant } from '../inline-variants';
import type { SwitchVariant } from '../switch';
import type { CategoryOption } from './hierarchy';
import type { Component, HTMLAttributes } from 'vue';
export type FormColumnSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface ResponsiveFormSpan {
    base?: FormColumnSpan;
    sm?: FormColumnSpan;
    md?: FormColumnSpan;
    lg?: FormColumnSpan;
    xl?: FormColumnSpan;
}

export type FormText =
    { translation: string; replacements?: Record<string, string | number> } | { value: string };

export interface FormOption {
    value: string;
    label: FormText;
    group?: FormText;
    color?: string;
    disabled?: boolean;
}

export interface BaseFormFieldDefinition<TName extends string = string> {
    name: TName;
    label: FormText;
    description?: FormText;
    placeholder?: FormText;
    span?: FormColumnSpan | ResponsiveFormSpan;
    disabled?: boolean;
    required?: boolean;
    /** Show validation icons only after the field has been touched. */
    showValidation?: boolean;
    hidden?: boolean;
    class?: HTMLAttributes['class'];
    inputClass?: HTMLAttributes['class'];
    localized?: boolean;
    localizedBackground?: boolean;
}

export interface FormLocaleOption {
    value: string;
    label: FormText;
}

export interface FormActionDefinition {
    id: string;
    label: FormText;
    icon?: Component;
    variant?:
        | 'default'
        | 'primary'
        | 'secondary'
        | 'accent'
        | 'outline'
        | 'ghost'
        | 'ghostly'
        | 'info'
        | 'success'
        | 'warning'
        | 'danger';
    disabled?: boolean;
}

export interface FormLocalizationConfig {
    locales: FormLocaleOption[];
    baseLocale: string;
    initialLocale?: string;
    fieldPath?: 'nested' | 'locale_suffix';
}

export interface InputFieldDefinition<
    TName extends string = string,
> extends BaseFormFieldDefinition<TName> {
    type: 'input';
    inputType?:
        | 'text'
        | 'email'
        | 'tel'
        | 'date'
        | 'month'
        | 'datetime-local'
        | 'number'
        | 'url'
        | 'color'
        | 'time';
    autocomplete?: string;
    suffix?: FormText;
    maxLength?: number;
    counter?: boolean;
}

export interface DateFieldDefinition<
    TName extends string = string,
> extends BaseFormFieldDefinition<TName> {
    type: 'date';
    allowFuture?: boolean;
}

export interface PasswordFieldDefinition<
    TName extends string = string,
> extends BaseFormFieldDefinition<TName> {
    type: 'password';
    autocomplete?: string;
}

export interface TextareaFieldDefinition<
    TName extends string = string,
> extends BaseFormFieldDefinition<TName> {
    type: 'textarea' | 'richtext' | 'markdown';
    markdownSyntax?: 'standard' | 'kleinanzeigen';
    markdownOptions?: Partial<MarkdownSyntax>;
    counterMode?: 'limit' | 'count' | 'remaining';
    markdownToolbar?: MarkdownTool[];
    rows?: number;
    maxLength?: number;
    counter?: boolean;
}

export interface JsonFieldDefinition<
    TName extends string = string,
> extends BaseFormFieldDefinition<TName> {
    type: 'json';
    rows?: number;
    maxLength?: number;
    counter?: boolean;
    counterMode?: 'limit' | 'count' | 'remaining';
}

export interface SelectFieldDefinition<
    TName extends string = string,
> extends BaseFormFieldDefinition<TName> {
    type: 'select';
    options: FormOption[];
    clearable?: boolean;
    clearLabel?: FormText;
    clearValue?: string;
    searchable?: boolean;
}

export interface ComboboxFieldDefinition<TName extends string = string> extends Omit<
    SelectFieldDefinition<TName>,
    'type'
> {
    type: 'combobox';
}

export interface CheckboxFieldDefinition<
    TName extends string = string,
> extends BaseFormFieldDefinition<TName> {
    type: 'checkbox';
    variant?: InlineVariant;
}

/** Hierarchical single-category assignment; empty selections are stored as null. */
export interface CategoryFieldDefinition<
    TName extends string = string,
> extends BaseFormFieldDefinition<TName> {
    type: 'category';
    options: CategoryOption[];
    allowNone?: boolean;
    noneLabel?: FormText;
    searchable?: boolean;
}

export interface CheckboxGroupFieldDefinition<
    TName extends string = string,
> extends BaseFormFieldDefinition<TName> {
    type: 'checkbox-group';
    variant?: InlineVariant;
    options: FormOption[];
}

export interface RadioFieldDefinition<
    TName extends string = string,
> extends BaseFormFieldDefinition<TName> {
    type: 'radio';
    variant?: InlineVariant;
    options: FormOption[];
}

export interface SwitchFieldDefinition<
    TName extends string = string,
> extends BaseFormFieldDefinition<TName> {
    type: 'switch';
    variant?: SwitchVariant;
}

export interface CustomFieldDefinition<TName extends string = string> extends Omit<
    BaseFormFieldDefinition<TName>,
    'label'
> {
    type: 'custom';
    label?: FormText;
    slot: string;
}

export interface FormSpacerDefinition {
    type: 'spacer';
    id?: string;
    span?: FormColumnSpan | ResponsiveFormSpan;
    class?: HTMLAttributes['class'];
}

export interface FormHeaderDefinition {
    type: 'header';
    id: string;
    title: FormText;
    description?: FormText;
    span?: FormColumnSpan | ResponsiveFormSpan;
    class?: HTMLAttributes['class'];
}

export type FormFieldDefinition<TName extends string = string> =
    | InputFieldDefinition<TName>
    | DateFieldDefinition<TName>
    | PasswordFieldDefinition<TName>
    | TextareaFieldDefinition<TName>
    | JsonFieldDefinition<TName>
    | SelectFieldDefinition<TName>
    | ComboboxFieldDefinition<TName>
    | CategoryFieldDefinition<TName>
    | CheckboxFieldDefinition<TName>
    | CheckboxGroupFieldDefinition<TName>
    | RadioFieldDefinition<TName>
    | SwitchFieldDefinition<TName>
    | CustomFieldDefinition<TName>;

export type FormSectionItemDefinition<TName extends string = string> =
    FormFieldDefinition<TName> | FormSpacerDefinition | FormHeaderDefinition;

export interface FormSectionDefinition<TName extends string = string> {
    id: string;
    label: FormText;
    title?: FormText;
    /** Keep the navigation label while rendering content with its own section headings. */
    hideHeader?: boolean;
    description?: FormText;
    icon?: Component;
    separatorBefore?: boolean;
    standalone?: boolean;
    /** Desktop grid size; ten columns support exact fifths alongside halves. */
    gridColumns?: 10 | 12;
    fields: FormSectionItemDefinition<TName>[];
}

export interface FormRendererApi {
    Field: Component;
}

export type InputField<TName extends string = string> = InputFieldDefinition<TName>;
export type DateField<TName extends string = string> = DateFieldDefinition<TName>;
export type PasswordField<TName extends string = string> = PasswordFieldDefinition<TName>;
export type TextareaField<TName extends string = string> = TextareaFieldDefinition<TName>;
export type JsonField<TName extends string = string> = JsonFieldDefinition<TName>;
export type SelectField<TName extends string = string> = SelectFieldDefinition<TName>;
export type CheckboxField<TName extends string = string> = CheckboxFieldDefinition<TName>;
export type CheckboxGroupField<TName extends string = string> = CheckboxGroupFieldDefinition<TName>;
export type RadioField<TName extends string = string> = RadioFieldDefinition<TName>;
export type SwitchField<TName extends string = string> = SwitchFieldDefinition<TName>;
export type CustomField<TName extends string = string> = CustomFieldDefinition<TName>;
export type FormSpacer = FormSpacerDefinition;
export type FormHeader = FormHeaderDefinition;

export function translated(
    translation: string,
    replacements?: Record<string, string | number>,
): FormText {
    return { translation, replacements };
}

export function literal(value: string): FormText {
    return { value };
}

export function defineFormSections<TName extends string>(
    sections: FormSectionDefinition<TName>[],
): FormSectionDefinition<TName>[] {
    return sections;
}
