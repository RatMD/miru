<template>
    <Popover v-model:open="open">
        <InputGroup
            :size="size"
            :data-disabled="disabled"
            class="w-full max-w-60"
            :class="props.wrapperClass">
            <InputGroupAddon class="h-full shrink-0 self-stretch p-0!">
                <PopoverTrigger as-child>
                    <button
                        type="button"
                        data-slot="color-picker-trigger"
                        class="group/color-swatch aspect-square h-full shrink-0 cursor-pointer rounded-l-[max(0px,calc(var(--ui-radius)-3px))] border-r border-border bg-background p-1 transition-colors enabled:hover:border-muted-foreground enabled:hover:bg-ghostly focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        :class="size === 'sm' ? 'rounded-l-[3px]' : undefined"
                        :disabled="disabled || readonly"
                        :aria-label="ariaLabel"
                        :aria-invalid="
                            invalid ||
                            draftInvalid ||
                            $attrs['aria-invalid'] === true ||
                            $attrs['aria-invalid'] === 'true'
                        "
                        :aria-valid="$attrs['aria-valid']">
                        <ColorSwatch
                            data-slot="color-picker-swatch"
                            aria-hidden="true"
                            class="block size-full rounded-[max(0px,calc(var(--ui-radius)-5px))] border border-black/10 transition-[filter] group-[:enabled:hover]/color-swatch:brightness-90 dark:border-white/15"
                            :color="previewColor"
                            :style="{ backgroundColor: previewColor || 'transparent' }" />
                        <span class="sr-only">{{ ariaLabel }}</span>
                    </button>
                </PopoverTrigger>
            </InputGroupAddon>
            <InputGroupInput
                v-bind="$attrs"
                :class="cn('font-mono', props.class)"
                :readonly="readonly"
                :id="id"
                :model-value="draft"
                :disabled="disabled || readonly"
                :aria-invalid="
                    invalid ||
                    draftInvalid ||
                    $attrs['aria-invalid'] === true ||
                    $attrs['aria-invalid'] === 'true'
                "
                :aria-label="ariaLabel"
                :placeholder="placeholder"
                autocomplete="off"
                spellcheck="false"
                @update:model-value="updateDraft"
                @keydown.enter.prevent="commitDraft()"
                @blur="onBlur" />
        </InputGroup>
        <PopoverContent
            align="start"
            class="miru-color-picker w-72 max-w-[calc(100vw-2rem)] border-border bg-popover p-4">
            <ColorPickerPanel
                :color="color"
                :mode="activeMode"
                :modes="availableModes"
                :alpha="alpha"
                :eye-dropper="showEyeDropper && eyeDropperAvailable"
                :disabled="disabled || readonly || picking"
                :swatches="palette"
                :recent="showRecent ? normalizedRecent : []"
                @color="updateColor"
                @mode="setMode"
                @commit="commit"
                @pick="pick"
                @eyedropper="pickFromScreen" />
        </PopoverContent>
    </Popover>
</template>

<script setup lang="ts">
import type { ColorPickerMode, ColorPickerOutputFormat, ColorPickerSwatch } from './types';
import type { Color } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { ColorSwatch } from 'reka-ui';
import { computed, onMounted, onUnmounted, ref, shallowRef, watch } from 'vue';
import { cn } from '../../support/classNames';
import { InputGroup, InputGroupAddon, InputGroupInput } from '../input-group';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { formatColor, normalizeSwatches, readColor } from './color';
import ColorPickerPanel from './ColorPickerPanel.vue';

defineOptions({ inheritAttrs: false });
const props = withDefaults(
    defineProps<{
        id?: string;
        modelValue: string | null;
        ariaLabel: string;
        placeholder?: string;
        disabled?: boolean;
        invalid?: boolean;
        size?: 'sm' | 'default' | 'lg';
        class?: HTMLAttributes['class'];
        wrapperClass?: HTMLAttributes['class'];
        readonly?: boolean;
        /** Enabled editing modes. An empty list falls back to HEX. */
        modes?: readonly ColorPickerMode[];
        /** Controlled editing mode, independent of outputFormat. */
        mode?: ColorPickerMode;
        defaultMode?: ColorPickerMode;
        /** Serialization of completed edits; mode switches never convert the model. */
        outputFormat?: ColorPickerOutputFormat;
        alpha?: boolean;
        /** Show the native screen sampler when the browser supports EyeDropper. */
        showEyeDropper?: boolean;
        swatches?: readonly (string | ColorPickerSwatch)[];
        showRecent?: boolean;
        recentColors?: readonly string[];
        recentLimit?: number;
        /** Opt-in localStorage persistence; use separate keys for separate histories. */
        historyKey?: string;
    }>(),
    {
        disabled: false,
        invalid: false,
        size: 'default',
        modes: () => ['hex', 'rgb', 'hsl', 'hsv'],
        defaultMode: 'rgb',
        outputFormat: 'hex',
        alpha: false,
        showEyeDropper: true,
        swatches: () => [],
        showRecent: false,
        recentLimit: 8,
    },
);
const emit = defineEmits<{
    'update:modelValue': [value: string | null];
    'update:mode': [value: ColorPickerMode];
    'update:recentColors': [value: string[]];
    change: [value: string | null];
    blur: [event: FocusEvent];
}>();
const open = ref(false);
const eyeDropperAvailable = ref(false);
const picking = ref(false);
type EyeDropperConstructor = new () => {
    open(options: { signal: AbortSignal }): Promise<{ sRGBHex: string }>;
};
let eyeDropperConstructor: EyeDropperConstructor | undefined;
let sampling: AbortController | undefined;
onMounted(() => {
    eyeDropperConstructor = (window as unknown as { EyeDropper?: EyeDropperConstructor })
        .EyeDropper;
    eyeDropperAvailable.value = !!eyeDropperConstructor;
});
onUnmounted(() => sampling?.abort());
async function pickFromScreen() {
    if (props.disabled || picking.value || !eyeDropperConstructor) return;
    sampling = new AbortController();
    picking.value = true;
    try {
        const result = await new eyeDropperConstructor().open({ signal: sampling.signal });
        if (!sampling.signal.aborted && !props.disabled) pick(result.sRGBHex);
    } catch {
        /* Cancellation or unavailable browser sampling leaves the value unchanged. */
    } finally {
        picking.value = false;
    }
}
const draft = ref(props.modelValue ?? '');
const initialColor = readColor(props.modelValue) ?? readColor('#000000')!;
const color = shallowRef<Color>(props.alpha ? initialColor : { ...initialColor, alpha: 1 });
const internalMode = ref(props.defaultMode);
const internalRecent = ref<string[]>([]);
let lastEmitted: string | null | undefined;
let changed = false;
let draftEdited = false;
const validModes: ColorPickerMode[] = ['hex', 'rgb', 'hsl', 'hsv'];
const availableModes = computed(() => {
    const modes = [...new Set(props.modes.filter((mode) => validModes.includes(mode)))];
    return modes.length ? modes : (['hex'] as ColorPickerMode[]);
});
const activeMode = computed(() => {
    const mode = props.mode ?? internalMode.value;
    return availableModes.value.includes(mode) ? mode : availableModes.value[0]!;
});
const draftInvalid = computed(() => !!draft.value.trim() && !readColor(draft.value));
const previewColor = computed(() => {
    const value = readColor(draft.value);
    return value ? formatColor(props.alpha ? value : { ...value, alpha: 1 }) : undefined;
});
const limit = computed(() =>
    Number.isFinite(props.recentLimit) ? Math.max(0, Math.floor(props.recentLimit)) : 8,
);
const palette = computed(() => normalizeSwatches(props.swatches, props.alpha));
const normalizedRecent = computed(() =>
    normalizeSwatches(props.recentColors ?? internalRecent.value, props.alpha).slice(
        0,
        limit.value,
    ),
);
function setMode(mode: ColorPickerMode) {
    if (props.disabled || !availableModes.value.includes(mode)) return;
    internalMode.value = mode;
    emit('update:mode', mode);
}
function updateDraft(value: string | number) {
    draft.value = String(value);
    draftEdited = true;
}
function updateColor(value: Color) {
    if (props.disabled) return;
    color.value = props.alpha ? value : { ...value, alpha: 1 };
    const formatted = formatColor(color.value, props.outputFormat);
    draft.value = formatted;
    draftEdited = false;
    lastEmitted = formatted;
    changed = true;
    emit('update:modelValue', formatted);
}
function commitDraft() {
    if (props.disabled || !draftEdited) return;
    if (!draft.value.trim()) {
        if (props.modelValue !== null) {
            lastEmitted = null;
            emit('update:modelValue', null);
            emit('change', null);
        }
        changed = false;
        draftEdited = false;
        return;
    }
    const value = readColor(draft.value);
    if (!value) return;
    updateColor(value);
    commit();
}
function onBlur(event: FocusEvent) {
    commitDraft();
    emit('blur', event);
}
function commit() {
    if (!changed || props.disabled) return;
    changed = false;
    emit('change', formatColor(color.value, props.outputFormat));
    if (!props.showRecent || !limit.value) return;
    const value = formatColor(color.value);
    const recent = [
        value,
        ...normalizedRecent.value.map((item) => item.value).filter((item) => item !== value),
    ].slice(0, limit.value);
    internalRecent.value = recent;
    emit('update:recentColors', recent);
    if (props.historyKey && typeof window !== 'undefined') {
        try {
            window.localStorage.setItem(props.historyKey, JSON.stringify(recent));
        } catch {
            /* Storage may be unavailable. */
        }
    }
}
function pick(value: string) {
    const parsed = readColor(value);
    if (!parsed) return;
    updateColor(parsed);
    commit();
}
function restoreHistory() {
    if (typeof window === 'undefined' || !props.historyKey || props.recentColors !== undefined)
        return;
    try {
        const values: unknown = JSON.parse(window.localStorage.getItem(props.historyKey) ?? '[]');
        internalRecent.value = Array.isArray(values)
            ? normalizeSwatches(
                  values.filter((item): item is string => typeof item === 'string'),
                  props.alpha,
              )
                  .slice(0, limit.value)
                  .map((item) => item.value)
            : [];
    } catch {
        internalRecent.value = [];
    }
    emit('update:recentColors', internalRecent.value);
}
onMounted(restoreHistory);
watch(
    () => props.historyKey,
    () => {
        internalRecent.value = [];
        restoreHistory();
    },
);
watch(
    () => props.modelValue,
    (value) => {
        draft.value = value ?? '';
        draftEdited = false;
        const isEcho = value === lastEmitted;
        lastEmitted = undefined;
        if (isEcho) return;
        const parsed = readColor(value);
        if (parsed) color.value = props.alpha ? parsed : { ...parsed, alpha: 1 };
        changed = false;
    },
);
watch(
    () => props.alpha,
    (alpha) => {
        if (!alpha) color.value = { ...color.value, alpha: 1 };
    },
);
watch(
    () => props.disabled,
    (disabled) => {
        if (disabled) {
            sampling?.abort();
            open.value = false;
        }
    },
);
watch(open, (value) => {
    if (!value) commit();
});
</script>
