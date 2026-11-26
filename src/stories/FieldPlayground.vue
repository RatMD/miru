<template>
    <div class="grid max-w-xl gap-5">
        <div
            role="group"
            :aria-label="locale === 'de' ? 'Feldzustände' : 'Field states'"
            class="flex flex-wrap gap-2">
            <Button
                v-for="state in states"
                :key="state.key"
                size="sm"
                :variant="previewArgs[state.key] ? 'primary' : 'outline'"
                :aria-pressed="!!previewArgs[state.key]"
                @click="toggle(state.key)">
                {{ state.label }}
            </Button>
        </div>
        <FormExamples mode="field" :args="previewArgs" :locale="locale" />
        <div class="rounded-md border border-border bg-muted/30 p-3 text-xs">
            <p class="mb-2 font-medium">
                {{ locale === 'de' ? 'Attribute am Input' : 'Input attributes' }}
            </p>
            <pre data-testid="field-attributes" class="whitespace-pre-wrap font-mono">{{
                attributes
            }}</pre>
            <p class="mt-2 text-muted-foreground">aria-valid → data-valid</p>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { Button } from '../components/button';
import FormExamples from './FormExamples.vue';

const props = defineProps<{ args: Record<string, unknown>; locale: string }>();
const emit = defineEmits<{ change: [values: Record<string, boolean>] }>();
const previewArgs = reactive({ ...props.args });
watch(
    () => props.args,
    (value) => Object.assign(previewArgs, value),
    { deep: true },
);
function toggle(key: string): void {
    const value = !previewArgs[key];
    previewArgs[key] = value;
    emit('change', { [key]: value });
}
const states = [
    { key: 'disabled', label: 'disabled' },
    { key: 'loading', label: 'loading' },
    { key: 'ariaInvalid', label: 'aria-invalid' },
    { key: 'ariaValid', label: 'aria-valid' },
];
const attributes = computed(() =>
    JSON.stringify(
        {
            disabled: !!previewArgs.disabled || !!previewArgs.loading,
            'aria-busy': previewArgs.loading ? true : undefined,
            'aria-invalid': !!previewArgs.ariaInvalid,
            'data-valid': !!previewArgs.ariaValid && !previewArgs.ariaInvalid,
        },
        null,
        2,
    ),
);
</script>
