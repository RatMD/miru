<template>
    <div
        v-if="!definition.hidden"
        :class="[
            spanClasses,
            definition.class,
            isLocalized && definition.localizedBackground !== false
                ? 'rounded-md bg-primary/5 px-3 py-2'
                : undefined,
        ]">
        <form.Field :key="fieldName" :name="fieldName">
            <template #default="{ field }">
                <slot
                    v-if="definition.type === 'custom'"
                    name="custom"
                    :definition="definition"
                    :field="field"
                    :locale="locale" />
                <FieldError
                    v-if="definition.type === 'custom' && isInvalid(field)"
                    :errors="field.state.meta.errors" />

                <Field
                    v-else-if="definition.type === 'checkbox'"
                    orientation="horizontal"
                    :invalid="isInvalid(field)"
                    :valid="isValidated(field)">
                    <Checkbox
                        :variant="definition.variant"
                        :id="field.name"
                        :model-value="Boolean(field.state.value)"
                        :disabled="definition.disabled"
                        :aria-invalid="isInvalid(field)"
                        @update:model-value="field.handleChange(Boolean($event))" />
                    <FieldContent>
                        <FieldLabel
                            :for="field.name"
                            :required="definition.required"
                            :show-validation="definition.showValidation">
                            <span class="inline-flex items-center">
                                <FormText :text="definition.label" />
                            </span>
                            <span
                                v-if="isLocalized"
                                class="rounded-full bg-default px-1.5 py-0.5 text-[10px] leading-none font-semibold text-default-foreground">
                                {{ localeCode }}
                            </span>
                        </FieldLabel>
                        <FieldDescription v-if="definition.description && !hasErrorMessage(field)">
                            <FormText :text="definition.description" />
                        </FieldDescription>
                        <FieldError
                            v-if="hasErrorMessage(field)"
                            :errors="field.state.meta.errors" />
                    </FieldContent>
                </Field>

                <Field
                    v-else-if="definition.type === 'switch'"
                    orientation="horizontal"
                    :class="
                        definition.description || hasErrorMessage(field)
                            ? 'items-start justify-start'
                            : 'has-[>[data-slot=field-content]]:items-center justify-start'
                    "
                    :invalid="isInvalid(field)"
                    :valid="isValidated(field)">
                    <Switch
                        :variant="definition.variant"
                        :id="field.name"
                        class="shrink-0 cursor-pointer"
                        :class="
                            definition.description || hasErrorMessage(field) ? 'mt-0.5' : undefined
                        "
                        :model-value="Boolean(field.state.value)"
                        :disabled="definition.disabled"
                        :aria-invalid="isInvalid(field)"
                        @update:model-value="field.handleChange(Boolean($event))" />
                    <FieldContent>
                        <FieldLabel
                            :for="field.name"
                            :required="definition.required"
                            :show-validation="definition.showValidation"
                            :class="definition.disabled ? 'cursor-not-allowed' : 'cursor-pointer'">
                            <span class="inline-flex items-center">
                                <FormText :text="definition.label" />
                            </span>
                            <span
                                v-if="isLocalized"
                                class="rounded-full bg-default px-1.5 py-0.5 text-[10px] leading-none font-semibold text-default-foreground">
                                {{ localeCode }}
                            </span>
                        </FieldLabel>
                        <FieldDescription v-if="definition.description && !hasErrorMessage(field)">
                            <FormText :text="definition.description" />
                        </FieldDescription>
                        <FieldError
                            v-if="hasErrorMessage(field)"
                            :errors="field.state.meta.errors" />
                    </FieldContent>
                </Field>

                <Field
                    v-else-if="definition.type !== 'custom'"
                    :invalid="isInvalid(field)"
                    :valid="isValidated(field)">
                    <FieldLabel
                        :for="field.name"
                        :required="definition.required"
                        :show-validation="definition.showValidation">
                        <span class="inline-flex items-center">
                            <FormText :text="definition.label" />
                        </span>
                        <span
                            v-if="isLocalized"
                            class="rounded-full bg-default px-1.5 py-0.5 text-[10px] leading-none font-semibold text-default-foreground">
                            {{ localeCode }}
                        </span>
                    </FieldLabel>

                    <InputDateTime
                        mode="date"
                        v-if="definition.type === 'date'"
                        :model-value="stringValue(field.state.value) || null"
                        :locale="applicationLocale"
                        :placeholder="placeholder(definition) ?? ''"
                        :allow-future="definition.allowFuture"
                        :disabled="definition.disabled"
                        @update:model-value="field.handleChange($event ?? '')" />

                    <InputGroup v-else-if="definition.type === 'input' && definition.suffix">
                        <InputGroupInput
                            :id="field.name"
                            :name="field.name"
                            :type="definition.inputType ?? 'text'"
                            :autocomplete="definition.autocomplete"
                            :model-value="stringValue(field.state.value)"
                            :placeholder="placeholder(definition)"
                            :required="definition.required"
                            :disabled="definition.disabled"
                            :aria-invalid="isInvalid(field)"
                            :class="[
                                isLocalized ? 'bg-background' : undefined,
                                definition.inputClass,
                            ]"
                            @blur="field.handleBlur"
                            @update:model-value="
                                field.handleChange(normalizeInputValue($event, definition))
                            " />
                        <InputGroupAddon align="inline-end">
                            <InputGroupText><FormText :text="definition.suffix" /></InputGroupText>
                        </InputGroupAddon>
                    </InputGroup>

                    <Input
                        v-else-if="definition.type === 'input'"
                        :id="field.name"
                        :name="field.name"
                        :type="definition.inputType ?? 'text'"
                        :autocomplete="definition.autocomplete"
                        :maxlength="definition.maxLength"
                        :model-value="stringValue(field.state.value)"
                        :placeholder="placeholder(definition)"
                        :required="definition.required"
                        :disabled="definition.disabled"
                        :aria-invalid="isInvalid(field)"
                        :class="[isLocalized ? 'bg-background' : undefined, definition.inputClass]"
                        @blur="field.handleBlur"
                        @update:model-value="
                            field.handleChange(normalizeInputValue($event, definition))
                        " />

                    <InputPassword
                        v-else-if="definition.type === 'password'"
                        :id="field.name"
                        :name="field.name"
                        :autocomplete="definition.autocomplete"
                        :model-value="stringValue(field.state.value)"
                        :placeholder="placeholder(definition)"
                        :required="definition.required"
                        :disabled="definition.disabled"
                        :aria-invalid="isInvalid(field)"
                        :class="[isLocalized ? 'bg-background' : undefined, definition.inputClass]"
                        @blur="field.handleBlur"
                        @update:model-value="field.handleChange(String($event ?? ''))" />

                    <Editor
                        v-else-if="definition.type === 'richtext'"
                        :id="field.name"
                        :name="field.name"
                        :model-value="stringValue(field.state.value)"
                        :label="resolveText(definition.label)"
                        :locale="applicationLocale"
                        :disabled="definition.disabled"
                        :aria-invalid="isInvalid(field)"
                        :class="definition.inputClass"
                        @blur="field.handleBlur"
                        @update:model-value="field.handleChange($event)" />
                    <EditorJson
                        :counter="definition.counter"
                        :counter-mode="definition.counterMode"
                        :maxlength="definition.maxLength"
                        :locale="applicationLocale"
                        v-else-if="definition.type === 'json'"
                        :id="field.name"
                        :name="field.name"
                        :model-value="stringValue(field.state.value)"
                        :rows="definition.rows"
                        :required="definition.required"
                        :disabled="definition.disabled"
                        :aria-invalid="isInvalid(field)"
                        :class="definition.inputClass"
                        @blur="field.handleBlur"
                        @update:model-value="field.handleChange($event)" />
                    <EditorMarkdown
                        :counter="definition.counter"
                        :counter-mode="definition.counterMode"
                        :locale="applicationLocale"
                        v-else-if="definition.type === 'markdown'"
                        :id="field.name"
                        :name="field.name"
                        :model-value="stringValue(field.state.value)"
                        :rows="definition.rows"
                        :maxlength="definition.maxLength"
                        :syntax="definition.markdownSyntax"
                        :syntax-options="definition.markdownOptions"
                        :toolbar="definition.markdownToolbar"
                        :required="definition.required"
                        :disabled="definition.disabled"
                        :aria-invalid="isInvalid(field)"
                        :class="definition.inputClass"
                        @blur="field.handleBlur"
                        @update:model-value="field.handleChange($event)" />
                    <Textarea
                        v-else-if="definition.type === 'textarea'"
                        :id="field.name"
                        :name="field.name"
                        :rows="definition.rows"
                        :maxlength="
                            definition.type === 'textarea' ? definition.maxLength : undefined
                        "
                        :model-value="stringValue(field.state.value)"
                        :placeholder="placeholder(definition)"
                        :required="definition.required"
                        :disabled="definition.disabled"
                        :aria-invalid="isInvalid(field)"
                        :class="[isLocalized ? 'bg-background' : undefined, definition.inputClass]"
                        @blur="field.handleBlur"
                        @update:model-value="field.handleChange($event)" />

                    <CategoryHierarchySelect
                        v-else-if="definition.type === 'category'"
                        :id="field.name"
                        :model-value="stringValue(field.state.value)"
                        :options="definition.options"
                        :allow-none="definition.allowNone"
                        :none-label="
                            definition.noneLabel ? resolveText(definition.noneLabel) : undefined
                        "
                        :searchable="definition.searchable"
                        :disabled="definition.disabled"
                        :invalid="isInvalid(field)"
                        :aria-label="resolveText(definition.label)"
                        :trigger-class="definition.inputClass"
                        size="default"
                        @blur="field.handleBlur"
                        @update:model-value="field.handleChange($event || null)" />

                    <ComboboxField
                        v-else-if="definition.type === 'combobox'"
                        :id="field.name"
                        :name="field.name"
                        :model-value="field.state.value == null ? null : String(field.state.value)"
                        :options="
                            definition.options.map((option) => ({
                                value: option.value,
                                label: resolveText(option.label),
                                disabled: option.disabled,
                            }))
                        "
                        :clearable="definition.clearable"
                        :placeholder="placeholder(definition)"
                        :label="resolveText(definition.label)"
                        :disabled="definition.disabled"
                        :required="definition.required"
                        :invalid="isInvalid(field)"
                        :class="definition.inputClass"
                        @blur="field.handleBlur"
                        @update:model-value="field.handleChange($event)" />
                    <CategoryHierarchySelect
                        v-else-if="definition.type === 'select' && definition.searchable"
                        :id="field.name"
                        :model-value="selectValue(field.state.value, definition)"
                        :options="
                            definition.options.map((option) => ({
                                value: option.value,
                                label: resolveText(option.label),
                                disabled: option.disabled,
                            }))
                        "
                        :allow-none="definition.clearable"
                        :none-label="
                            definition.clearLabel
                                ? resolveText(definition.clearLabel)
                                : trans('common.states.none')
                        "
                        :empty-value="definition.clearValue ?? '__none__'"
                        :placeholder="resolveText(definition.label)"
                        :aria-label="resolveText(definition.label)"
                        :disabled="definition.disabled"
                        :invalid="isInvalid(field)"
                        searchable
                        size="default"
                        @blur="field.handleBlur"
                        @update:model-value="
                            field.handleChange(normalizeSelectValue($event, definition))
                        " />
                    <Select
                        v-else-if="definition.type === 'select'"
                        :model-value="selectValue(field.state.value, definition)"
                        :disabled="definition.disabled"
                        @update:model-value="
                            field.handleChange(normalizeSelectValue($event, definition))
                        ">
                        <SelectTrigger
                            :id="field.name"
                            :aria-invalid="isInvalid(field)"
                            :aria-required="definition.required"
                            :class="[
                                isLocalized ? 'bg-background' : undefined,
                                definition.inputClass,
                            ]">
                            <span
                                v-if="selectedOption(field.state.value, definition)?.color"
                                class="size-2.5 shrink-0 rounded-full"
                                :style="{
                                    backgroundColor: selectedOption(field.state.value, definition)
                                        ?.color,
                                }"
                                aria-hidden="true" />
                            <SelectValue
                                class="min-w-0 flex-1 text-left"
                                :placeholder="placeholder(definition)" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem
                                v-if="definition.clearable"
                                :value="definition.clearValue ?? '__none__'">
                                <FormText
                                    :text="
                                        definition.clearLabel ?? translated('common.states.none')
                                    " />
                            </SelectItem>
                            <SelectGroup
                                v-for="group in groupedOptions(definition)"
                                :key="group.key">
                                <SelectLabel v-if="group.label">
                                    <FormText :text="group.label" />
                                </SelectLabel>
                                <SelectItem
                                    v-for="option in group.options"
                                    :key="option.value"
                                    :value="option.value"
                                    :disabled="option.disabled">
                                    <span
                                        v-if="option.color"
                                        class="mr-2 inline-block size-2.5 rounded-full"
                                        :style="{ backgroundColor: option.color }"
                                        aria-hidden="true" />
                                    <FormText :text="option.label" />
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <div v-else-if="definition.type === 'checkbox-group'" class="grid gap-3">
                        <label
                            v-for="option in definition.options"
                            :key="option.value"
                            class="flex items-center gap-2 text-sm">
                            <Checkbox
                                :variant="definition.variant"
                                :model-value="
                                    selectedValues(field.state.value).includes(option.value)
                                "
                                :disabled="definition.disabled || option.disabled"
                                @update:model-value="
                                    toggleCheckboxValue(field, option.value, Boolean($event))
                                " />
                            <FormText :text="option.label" />
                        </label>
                    </div>

                    <RadioGroup
                        :variant="definition.variant"
                        v-else-if="definition.type === 'radio'"
                        :model-value="stringValue(field.state.value)"
                        :disabled="definition.disabled"
                        @update:model-value="field.handleChange(String($event))">
                        <label
                            v-for="option in definition.options"
                            :key="option.value"
                            class="flex items-center gap-2 text-sm">
                            <RadioGroupItem :value="option.value" :disabled="option.disabled" />
                            <FormText :text="option.label" />
                        </label>
                    </RadioGroup>

                    <p
                        v-if="
                            (definition.type === 'input' || definition.type === 'textarea') &&
                            definition.counter
                        "
                        class="text-right text-xs text-muted-foreground"
                        aria-live="polite">
                        {{
                            trans('common.form.character_count', {
                                count: Array.from(stringValue(field.state.value)).length,
                                max: definition.maxLength ?? 0,
                            })
                        }}
                    </p>
                    <FieldDescription v-if="definition.description && !hasErrorMessage(field)">
                        <FormText :text="definition.description" />
                    </FieldDescription>
                    <FieldError v-if="hasErrorMessage(field)" :errors="field.state.meta.errors" />
                </Field>
            </template>
        </form.Field>
    </div>
</template>

<script setup lang="ts">
import type {
    FormFieldDefinition,
    FormOption,
    FormRendererApi,
    FormText as FormTextDefinition,
    SelectFieldDefinition,
} from './types';
import type { AnyFieldApi } from '@tanstack/vue-form';
import { computed } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { Checkbox } from '../checkbox';
import { ComboboxField } from '../combobox';
import { Editor } from '../editor';
import { EditorJson } from '../editor-json';
import { EditorMarkdown } from '../editor-markdown';
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel } from '../field';
import { Input } from '../input';
import { InputDateTime } from '../input-date-time';
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '../input-group';
import { InputPassword } from '../input-password';
import { RadioGroup, RadioGroupItem } from '../radio-group';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '../select';
import { Switch } from '../switch';
import { Textarea } from '../textarea';
import CategoryHierarchySelect from './FormHierarchySelect.vue';
import FormText from './FormText.vue';
import { formSpanClasses } from './layout';
import { translated } from './types';
const props = defineProps<{
    form: FormRendererApi;
    definition: FormFieldDefinition;
    locale?: string;
    localeFieldPath?: 'nested' | 'locale_suffix';
}>();

const spanClasses = computed(() => formSpanClasses(props.definition.span));
const isLocalized = computed(() => Boolean(props.definition.localized && props.locale));
const localeCode = computed(() => props.locale?.toUpperCase() ?? '');
const fieldName = computed(() =>
    props.definition.localized && props.locale
        ? props.localeFieldPath === 'locale_suffix'
            ? `${props.definition.name}_${props.locale}`
            : `translations.${props.locale}.${props.definition.name}`
        : props.definition.name,
);

function isInvalid(field: AnyFieldApi): boolean {
    return field.state.meta.isTouched && !field.state.meta.isValid;
}

function hasErrorMessage(field: AnyFieldApi): boolean {
    if (!isInvalid(field)) return false;

    return field.state.meta.errors.some((error) => {
        if (typeof error === 'string') return error.trim() !== '';

        if (typeof error !== 'object' || error === null || !('message' in error)) {
            return false;
        }

        return typeof error.message === 'string' && error.message.trim() !== '';
    });
}

function isValidated(field: AnyFieldApi): boolean {
    return (
        field.state.meta.isTouched &&
        !field.state.meta.isValidating &&
        field.state.meta.isValid &&
        !hasErrorMessage(field)
    );
}

function stringValue(value: unknown): string {
    return value === null || value === undefined ? '' : String(value);
}

function selectedValues(value: unknown): string[] {
    return Array.isArray(value) ? value.map(String) : [];
}

function normalizeInputValue(
    value: string | number,
    definition: FormFieldDefinition,
): string | number | null {
    if (definition.type !== 'input' || definition.inputType !== 'number') {
        return value;
    }

    return value === '' ? null : Number(value);
}

function toggleCheckboxValue(field: AnyFieldApi, value: string, selected: boolean): void {
    const values = selectedValues(field.state.value);
    field.handleChange(
        selected ? [...new Set([...values, value])] : values.filter((current) => current !== value),
    );
}

function selectValue(value: unknown, definition: SelectFieldDefinition): string | undefined {
    if (value === null || value === undefined || value === '') {
        return definition.clearable ? (definition.clearValue ?? '__none__') : undefined;
    }

    return String(value);
}

function selectedOption(value: unknown, definition: SelectFieldDefinition): FormOption | undefined {
    return definition.options.find((option) => option.value === String(value ?? ''));
}

function groupedOptions(
    definition: SelectFieldDefinition,
): Array<{ key: string; label?: FormTextDefinition; options: FormOption[] }> {
    const groups = new Map<
        string,
        { key: string; label?: FormTextDefinition; options: FormOption[] }
    >();

    for (const option of definition.options) {
        const key = option.group ? resolveText(option.group) : '__ungrouped';
        const group = groups.get(key) ?? { key, label: option.group, options: [] };
        group.options.push(option);
        groups.set(key, group);
    }

    return [...groups.values()];
}

function normalizeSelectValue(value: unknown, definition: SelectFieldDefinition): string | null {
    const normalized = String(value);
    return definition.clearable && normalized === (definition.clearValue ?? '__none__')
        ? null
        : normalized;
}

function placeholder(definition: FormFieldDefinition): string | undefined {
    if (definition.placeholder) {
        return resolveText(definition.placeholder);
    }

    if (
        definition.type === 'input' ||
        definition.type === 'date' ||
        definition.type === 'password' ||
        definition.type === 'textarea' ||
        definition.type === 'markdown' ||
        definition.type === 'json'
    ) {
        return resolveText(definition.label);
    }

    return undefined;
}

function resolveText(text: FormTextDefinition): string {
    return 'translation' in text
        ? trans(text.translation, stringReplacements(text.replacements))
        : text.value;
}

function stringReplacements(
    replacements?: Record<string, string | number>,
): Record<string, string> | undefined {
    return replacements === undefined
        ? undefined
        : Object.fromEntries(
              Object.entries(replacements).map(([key, value]) => [key, String(value)]),
          );
}

const { trans, locale: applicationLocale } = useI18n();
</script>
