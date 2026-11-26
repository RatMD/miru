<template>
    <div class="grid max-w-md gap-4">
        <Field>
            <FieldLabel :for="id">
                {{ locale === 'de' ? 'Akzentfarbe' : 'Accent color' }}
            </FieldLabel>
            <ColorPicker
                v-bind="args"
                :id="id"
                v-model="color"
                v-model:mode="mode"
                :recent-colors="args.historyKey ? undefined : recent"
                @update:recent-colors="recent = $event"
                :ariaLabel="locale === 'de' ? 'Farbe auswählen' : 'Choose a color'" />
        </Field>
        <div class="rounded-md border border-border bg-muted/30 p-3 text-xs">
            <p>
                v-model:
                <output data-testid="color-value" class="font-mono">{{ color ?? 'null' }}</output>
            </p>
            <p class="mt-1">
                Mode:
                <output data-testid="color-mode">{{ mode }}</output>
            </p>
            <p v-if="args.showRecent" class="mt-1">
                Recent:
                <output data-testid="color-recent" class="font-mono">
                    {{ recent.join(', ') || '—' }}
                </output>
            </p>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { ColorPickerMode } from '../components/color-picker';
import { ref, useId, watch } from 'vue';
import { ColorPicker } from '../components/color-picker';
import { Field, FieldLabel } from '../components/field';
const props = defineProps<{ args: Record<string, unknown>; locale: string }>();
const id = useId();
const color = ref<string | null>((props.args.modelValue as string | null | undefined) ?? '#4f46e5');
const mode = ref<ColorPickerMode>(
    (props.args.mode as ColorPickerMode | undefined) ??
        (props.args.modes as ColorPickerMode[] | undefined)?.[0] ??
        'rgb',
);
const recent = ref<string[]>([]);
watch(
    () => props.args.modelValue,
    (value) => {
        color.value = value as string | null;
    },
);
watch(
    () => props.args.mode,
    (value) => {
        if (value) mode.value = value as ColorPickerMode;
    },
);
</script>
