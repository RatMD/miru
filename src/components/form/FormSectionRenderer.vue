<template>
    <section class="space-y-6">
        <div
            v-if="!section.hideHeader"
            class="flex items-start justify-between gap-4 border-b pb-4">
            <div>
                <h2 class="text-xl font-semibold">
                    <FormText :text="section.title ?? section.label" />
                </h2>
                <p v-if="section.description" class="text-sm text-muted-foreground">
                    <FormText :text="section.description" />
                </p>
            </div>
            <slot name="actions" :section="section" :locale="locale" />
        </div>

        <slot name="before" :section="section" :locale="locale" />

        <div
            class="grid grid-cols-12 gap-5"
            :class="{ 'md:grid-cols-10': section.gridColumns === 10 }">
            <template
                v-for="(definition, index) in section.fields"
                :key="itemKey(definition, index)">
                <FormHeader v-if="definition.type === 'header'" :definition="definition" />
                <FormSpacer v-else-if="definition.type === 'spacer'" :definition="definition" />
                <FormFieldRenderer
                    v-else
                    :form="form"
                    :definition="definition"
                    :locale="locale"
                    :locale-field-path="localeFieldPath">
                    <template #custom="slotProps">
                        <slot name="custom" v-bind="slotProps" />
                    </template>
                </FormFieldRenderer>
            </template>
        </div>

        <slot name="after" :section="section" :locale="locale" />
    </section>
</template>

<script setup lang="ts">
import type { FormRendererApi, FormSectionDefinition, FormSectionItemDefinition } from './types';
import FormFieldRenderer from './FormFieldRenderer.vue';
import FormHeader from './FormHeader.vue';
import FormSpacer from './FormSpacer.vue';
import FormText from './FormText.vue';

defineProps<{
    form: FormRendererApi;
    section: FormSectionDefinition;
    locale?: string;
    localeFieldPath?: 'nested' | 'locale_suffix';
}>();

function itemKey(definition: FormSectionItemDefinition, index: number): string {
    if (definition.type === 'header') {
        return `header-${definition.id}`;
    }

    return definition.type === 'spacer' ? (definition.id ?? `spacer-${index}`) : definition.name;
}
</script>
