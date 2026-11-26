<template>
    <section data-slot="form-layout" class="miru-form">
        <FormLayout
            v-model="activeSectionId"
            :tabs="layoutTabs"
            :navigation-label="resolveText(sectionSelectorLabel)"
            :actions-label="resolveText(actionsLabel)"
            :primary-label="resolveText(loading ? loadingLabel : saveLabel)"
            :primary-variant="primaryVariant"
            :additional-actions="layoutActions"
            :loading="loading"
            :show-actions="!activeSection?.standalone"
            @submit="emit('submit')"
            @action="emit('action', $event)">
            <template #header>
                <slot
                    name="header"
                    :title="title"
                    :description="description"
                    :cancel-href="cancelHref">
                    <header
                        class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div class="flex flex-row flex-wrap items-center gap-4">
                            <h1 class="flex min-w-0 items-start gap-1 text-2xl font-semibold">
                                <span class="min-w-0">{{ title }}</span>
                                <Description
                                    v-if="description"
                                    :title="title"
                                    :description="description" />
                            </h1>

                            <div
                                data-slot="form-header-controls"
                                class="flex shrink-0 items-center gap-3">
                                <Button
                                    variant="ghostly"
                                    shape="round"
                                    size="sm"
                                    class="size-8 p-0 md:w-auto md:px-3"
                                    as-child>
                                    <Link :href="cancelHref" :aria-label="resolveText(cancelLabel)">
                                        <IconArrowLeft class="size-4" />
                                        <span class="hidden md:inline">
                                            <FormText :text="cancelLabel" />
                                        </span>
                                    </Link>
                                </Button>

                                <FormLocaleSwitcher
                                    v-if="localization"
                                    v-model="activeLocale"
                                    :locales="localization.locales"
                                    :base-locale="localization.baseLocale" />
                            </div>
                        </div>
                    </header>
                </slot>
            </template>
            <template #before-content>
                <FieldError v-if="formError" class="mb-6" :errors="[formError]" />
            </template>
            <template #tab-action="{ tab }">
                <FormErrorBadge
                    :section-label="tab.label"
                    :errors="
                        sectionErrors(sections.find((section) => section.id === tab.value)!)
                    " />
            </template>
            <template #default="{ tab }">
                <FormSectionRenderer
                    v-for="section in sections.filter((item) => item.id === tab?.value)"
                    :key="section.id"
                    :form="form"
                    :section="section"
                    :locale="activeLocale"
                    :locale-field-path="localization?.fieldPath">
                    <template #before="slotProps">
                        <slot :name="`section-${section.id}-before`" v-bind="slotProps" />
                    </template>
                    <template #actions="slotProps">
                        <slot :name="`section-${section.id}-actions`" v-bind="slotProps" />
                    </template>
                    <template #custom="slotProps">
                        <slot :name="`field-${slotProps.definition.slot}`" v-bind="slotProps" />
                    </template>
                    <template #after="slotProps">
                        <slot :name="`section-${section.id}-after`" v-bind="slotProps" />
                    </template>
                </FormSectionRenderer>
            </template>
            <template #primary-action>
                <Button
                    :variant="primaryVariant"
                    type="submit"
                    class="w-full"
                    :disabled="loading"
                    :loading="loading">
                    <IconDeviceFloppy class="size-4" />
                    <FormText :text="loading ? loadingLabel : saveLabel" />
                </Button>
            </template>
            <template #secondary-action="{ surface }">
                <Button variant="outline" class="w-full" as-child>
                    <Link :href="cancelHref">
                        <IconArrowLeft v-if="surface === 'desktop'" class="size-4" />
                        <span class="truncate"><FormText :text="cancelLabel" /></span>
                    </Link>
                </Button>
            </template>
            <template v-if="$slots.actions" #desktop-actions="slotProps">
                <slot name="actions" v-bind="slotProps" />
            </template>
            <template
                v-if="
                    $slots['additional-actions'] ||
                    $slots['actions-before'] ||
                    $slots['actions-after']
                "
                #additional-actions="slotProps">
                <slot name="additional-actions" v-bind="slotProps">
                    <slot name="actions-before" :loading="loading" />
                    <slot name="actions-after" :loading="loading" />
                </slot>
            </template>
            <template v-if="$slots['mobile-actions']" #mobile-additional-actions="slotProps">
                <slot name="mobile-actions" v-bind="slotProps" />
            </template>
            <template v-if="$slots['floating-app-bar']" #floating-app-bar="slotProps">
                <slot name="floating-app-bar" v-bind="slotProps" />
            </template>
        </FormLayout>
    </section>
</template>

<script setup lang="ts">
import type { ButtonVariants } from '../button';
import type {
    FormLocalizationConfig,
    FormActionDefinition,
    FormRendererApi,
    FormSectionDefinition,
    FormText as FormTextDefinition,
} from './types';
import type { AnyFormApi } from '@tanstack/vue-form';
import type { Ref } from 'vue';
import { IconArrowLeft, IconDeviceFloppy } from '@tabler/icons-vue';
import { computed, ref, watch } from 'vue';
import { useI18n } from '../../composables/useI18n';
import Link from '../anchor/NavigationLink.vue';
import { Button } from '../button';
import { Description } from '../description';
import { FieldError } from '../field';
import FormErrorBadge from './FormErrorBadge.vue';
import FormLayout from './FormLayout.vue';
import FormLocaleSwitcher from './FormLocaleSwitcher.vue';
import FormSectionRenderer from './FormSectionRenderer.vue';
import FormText from './FormText.vue';
import { translated } from './types';
const props = withDefaults(
    defineProps<{
        title: string;
        description?: string;
        form: FormRendererApi;
        sections: FormSectionDefinition[];
        cancelHref: string;
        loading?: boolean;
        primaryVariant?: NonNullable<ButtonVariants['variant']>;
        additionalActions?: FormActionDefinition[];
        formError?: string;
        initialSection?: string;
        activeSection?: string;
        cancelLabel?: FormTextDefinition;
        saveLabel?: FormTextDefinition;
        loadingLabel?: FormTextDefinition;
        actionsLabel: FormTextDefinition;
        sectionSelectorLabel: FormTextDefinition;
        localization?: FormLocalizationConfig;
    }>(),
    {
        loading: false,
        primaryVariant: 'success',
        additionalActions: () => [],
        formError: undefined,
        initialSection: undefined,
        activeSection: undefined,
        cancelLabel: () => translated('common.actions.cancel'),
        saveLabel: () => translated('common.actions.save'),
        loadingLabel: () => translated('common.states.loading'),
    },
);

const emit = defineEmits<{
    submit: [];
    action: [id: string];
    'update:activeSection': [value: string];
}>();

const activeLocale = ref(
    props.localization?.initialLocale ??
        props.localization?.baseLocale ??
        props.localization?.locales[0]?.value ??
        '',
);
const internalActiveSectionId = ref(props.initialSection ?? props.sections[0]?.id ?? '');
const activeSectionId = computed({
    get: () => props.activeSection ?? internalActiveSectionId.value,
    set: (value: string) => {
        internalActiveSectionId.value = value;
        emit('update:activeSection', value);
    },
});
const activeSection = computed(() =>
    props.sections.find((section) => section.id === activeSectionId.value),
);

const layoutTabs = computed(() =>
    props.sections.map((section) => ({
        value: section.id,
        label:
            resolveText(section.label) +
            (sectionHasLocalizedFields(section) ? ' · ' + activeLocale.value.toUpperCase() : ''),
        icon: section.icon,
        separatorBefore: section.separatorBefore,
        badge: sectionErrorCount(section) || undefined,
    })),
);
const layoutActions = computed(() =>
    props.additionalActions.map((action) => ({
        ...action,
        label: resolveText(action.label),
    })),
);
interface ReactiveFormApi extends FormRendererApi {
    useSelector<TSelected>(
        selector: (state: AnyFormApi['state']) => TSelected,
    ): Readonly<Ref<TSelected>>;
}
const fieldMeta = (props.form as ReactiveFormApi).useSelector((state) => state.fieldMeta);

watch(
    () => props.sections,
    (sections) => {
        if (!sections.some((section) => section.id === activeSectionId.value)) {
            activeSectionId.value = props.initialSection ?? sections[0]?.id ?? '';
        }
    },
);

watch(
    () => props.localization,
    (localization) => {
        if (
            localization &&
            !localization.locales.some((locale) => locale.value === activeLocale.value)
        ) {
            activeLocale.value = localization.initialLocale ?? localization.baseLocale;
        }
    },
);

function resolveText(text: FormTextDefinition): string {
    return 'translation' in text
        ? trans(text.translation, stringReplacements(text.replacements))
        : text.value;
}

function sectionErrorCount(section: FormSectionDefinition): number {
    return sectionErrors(section).length;
}

function sectionErrors(section: FormSectionDefinition): { field: string; messages: string[] }[] {
    return Object.entries(fieldMeta.value).flatMap(([fieldName, metadata]) => {
        if (!fieldBelongsToSection(fieldName, section) || !metadata?.errors?.length) {
            return [];
        }
        const messages = metadata.errors.flatMap((error: unknown) => {
            if (typeof error === 'string' && error) return [error];
            if (
                error &&
                typeof error === 'object' &&
                'message' in error &&
                typeof error.message === 'string' &&
                error.message
            ) {
                return [error.message];
            }
            return [];
        });
        return [
            {
                field: fieldName,
                messages: messages.length
                    ? [...new Set(messages)]
                    : [trans('common.form.validation_error_unknown')],
            },
        ];
    });
}

function sectionHasLocalizedFields(section: FormSectionDefinition): boolean {
    return (
        Boolean(props.localization) &&
        section.fields.some(
            (definition) => 'localized' in definition && definition.localized === true,
        )
    );
}

function fieldBelongsToSection(fieldName: string, section: FormSectionDefinition): boolean {
    return section.fields.some((definition) => {
        if (!('name' in definition)) {
            return false;
        }

        if (definition.localized && props.localization) {
            return props.localization.locales.some((locale) => {
                const localizedName =
                    props.localization?.fieldPath === 'locale_suffix'
                        ? `${definition.name}_${locale.value}`
                        : `translations.${locale.value}.${definition.name}`;

                return fieldPathMatches(fieldName, localizedName);
            });
        }

        return fieldPathMatches(fieldName, definition.name);
    });
}

function fieldPathMatches(fieldName: string, sectionFieldName: string): boolean {
    return (
        fieldName === sectionFieldName ||
        fieldName.startsWith(`${sectionFieldName}.`) ||
        fieldName.startsWith(`${sectionFieldName}[`)
    );
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

const { trans } = useI18n();
</script>
