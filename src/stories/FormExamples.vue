<template>
    <div class="grid max-w-xl gap-6">
        <template v-if="mode === 'label'">
            <div class="space-y-2">
                <Label
                    :for="labelId"
                    :class="String(args.class || '')"
                    :required="!!args.required"
                    :show-validation="!!args.showValidation"
                    :valid="args.valid as boolean | undefined"
                    :invalid="args.invalid as boolean | undefined">
                    {{ args.label === 'Display name' ? copy.name : args.label || copy.name }}
                </Label>
                <Input
                    :id="labelId"
                    v-model="text"
                    :required="!!args.required"
                    :aria-invalid="!!args.invalid" />
            </div>
        </template>
        <template v-else-if="mode === 'field'">
            <Field
                v-bind="fieldProps"
                :data-disabled="args.disabled || args.loading || undefined"
                :aria-busy="args.loading || undefined">
                <FieldLabel :for="fieldId">{{ copy.name }}</FieldLabel>
                <div class="relative min-w-0">
                    <Input
                        :id="fieldId"
                        v-model="text"
                        :disabled="!!args.disabled || !!args.loading"
                        :aria-busy="args.loading || undefined"
                        :aria-invalid="!!args.ariaInvalid"
                        :data-valid="!!args.ariaValid && !args.ariaInvalid"
                        :aria-describedby="
                            args.ariaInvalid ? descriptionId + ' ' + errorId : descriptionId
                        "
                        :class="args.loading ? 'pr-10' : undefined" />
                    <Spinner
                        v-if="args.loading"
                        decorative
                        size="sm"
                        class="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2" />
                </div>
                <FieldDescription :id="descriptionId">
                    {{ copy.fieldHint }}
                </FieldDescription>
                <FieldError v-if="args.ariaInvalid" :id="errorId" :errors="[copy.invalidName]" />
            </Field>
        </template>
    </div>
</template>
<script setup lang="ts">
import type { FieldVariants } from '../index';
import { computed, ref, useId } from 'vue';
import { Label, Field, FieldLabel, FieldDescription, FieldError, Spinner, Input } from '../index';
import { formShowcaseCopy } from './form-showcase-copy';
const props = withDefaults(
    defineProps<{
        mode: 'label' | 'field';
        locale: string;
        args?: Record<string, unknown>;
    }>(),
    { args: () => ({}) },
);
const copy = computed(() => formShowcaseCopy[props.locale === 'de' ? 'de' : 'en']);
const fieldProps = computed(() => ({
    showValidation: !!props.args.showValidation,
    orientation: props.args.orientation as FieldVariants['orientation'],
    ariaValid: props.args.ariaValid as boolean | undefined,
    ariaInvalid: props.args.ariaInvalid as boolean | undefined,
    class: String(props.args.class || ''),
}));
const id = useId();
const labelId = id + '-label-input';
const fieldId = id + '-field-input';
const descriptionId = id + '-description';
const errorId = id + '-error';
const text = ref('');
</script>
