<template>
    <div class="space-y-4" data-slot="color-picker-panel">
        <div class="flex items-center justify-between gap-3">
            <span class="text-sm font-medium">{{ trans('common.color_picker.color') }}</span>
            <Select
                v-if="modes.length > 1"
                :model-value="mode"
                :disabled="disabled"
                @update:model-value="emit('mode', $event as ColorPickerMode)">
                <SelectTrigger size="sm" :aria-label="trans('common.color_picker.mode')">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem v-for="item in modes" :key="item" :value="item">
                        {{ item.toUpperCase() }}
                    </SelectItem>
                </SelectContent>
            </Select>
            <span v-else class="text-xs text-muted-foreground">{{ mode.toUpperCase() }}</span>
        </div>
        <ColorAreaRoot
            :model-value="color"
            color-space="hsb"
            x-channel="saturation"
            y-channel="brightness"
            :disabled="disabled"
            @update:color="emit('color', $event)"
            @change-end="emit('commit')"
            v-slot="{ style }">
            <ColorAreaArea
                data-slot="color-picker-area"
                class="relative h-44 w-full cursor-crosshair rounded-md outline-none"
                :style="style">
                <ColorAreaThumb
                    class="size-4 rounded-full border-2 border-white shadow-[0_0_0_1px_#0006] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
            </ColorAreaArea>
        </ColorAreaRoot>
        <div class="flex items-center gap-3">
            <Button
                v-if="eyeDropper"
                variant="ghost"
                size="xs"
                icon-only
                :disabled="disabled"
                :aria-label="trans('common.color_picker.eyedropper')"
                @click="emit('eyedropper')">
                <IconColorPicker class="size-4" />
            </Button>
            <ColorSliderRoot
                :model-value="color"
                channel="hue"
                color-space="hsb"
                :disabled="disabled"
                class="relative flex h-5 min-w-0 flex-1 touch-none items-center"
                @update:color="emit('color', $event)"
                @change-end="emit('commit')">
                <ColorSliderTrack class="relative h-2.5 w-full grow rounded-full" />
                <ColorSliderThumb
                    class="block size-4 rounded-full border-2 border-white shadow-[0_0_0_1px_#0006] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
            </ColorSliderRoot>
        </div>

        <ColorSliderRoot
            v-if="alpha"
            :model-value="color"
            channel="alpha"
            :disabled="disabled"
            class="relative flex h-5 w-full touch-none items-center"
            @update:color="emit('color', $event)"
            @change-end="emit('commit')">
            <ColorSliderTrack
                class="relative h-2.5 w-full grow rounded-full border border-border" />
            <ColorSliderThumb
                class="block size-4 rounded-full border-2 border-white shadow-[0_0_0_1px_#0006] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
        </ColorSliderRoot>
        <ColorFieldRoot
            :model-value="color"
            :disabled="disabled"
            disable-wheel-change
            @update:color="emit('color', $event)">
            <label :for="id + '-hex'" class="mb-1 block text-xs text-muted-foreground">HEX</label>
            <ColorFieldInput
                :id="id + '-hex'"
                :aria-label="trans('common.color_picker.hex')"
                data-slot="input"
                :class="inputClass"
                @blur="scheduleCommit" />
        </ColorFieldRoot>
        <div
            v-if="channels.length || alpha"
            class="grid gap-2"
            :style="{
                gridTemplateColumns: `repeat(${channels.length + (alpha ? 1 : 0)}, minmax(0, 1fr))`,
            }">
            <ColorFieldRoot
                v-for="channel in channels"
                :key="mode + channel.key"
                :model-value="color"
                :color-space="space"
                :channel="channel.key"
                :disabled="disabled"
                :locale="locale"
                disable-wheel-change
                @update:color="emit('color', $event)">
                <label :for="id + channel.key" class="mb-1 block text-xs text-muted-foreground">
                    {{ channel.label }}
                </label>
                <ColorFieldInput
                    :id="id + channel.key"
                    data-slot="input"
                    :class="inputClass"
                    @blur="scheduleCommit" />
            </ColorFieldRoot>
            <ColorFieldRoot
                v-if="alpha"
                :model-value="color"
                channel="alpha"
                :disabled="disabled"
                :locale="locale"
                disable-wheel-change
                @update:color="emit('color', $event)">
                <label :for="id + '-alpha'" class="mb-1 block text-xs text-muted-foreground">
                    A %
                </label>
                <ColorFieldInput
                    :id="id + '-alpha'"
                    data-slot="input"
                    :class="inputClass"
                    @blur="scheduleCommit" />
            </ColorFieldRoot>
        </div>
        <ColorPickerPalette
            v-if="swatches.length"
            :label="trans('common.color_picker.swatches')"
            :value="hex"
            :swatches="swatches"
            :disabled="disabled"
            @pick="emit('pick', $event)" />
        <ColorPickerPalette
            v-if="recent.length"
            :label="trans('common.color_picker.recent')"
            :value="hex"
            :swatches="recent"
            :disabled="disabled"
            @pick="emit('pick', $event)" />
    </div>
</template>
<script setup lang="ts">
import type { ColorPickerMode, ColorPickerSwatch } from './types';
import type { Color, ColorChannel, ColorSpace } from 'reka-ui';
import { IconColorPicker } from '@tabler/icons-vue';
import {
    ColorAreaRoot,
    ColorAreaArea,
    ColorAreaThumb,
    ColorSliderRoot,
    ColorSliderTrack,
    ColorSliderThumb,
    ColorFieldRoot,
    ColorFieldInput,
} from 'reka-ui';
import { computed, nextTick, useId } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { Button } from '../button';
import { inputVariants } from '../input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../select';
import { formatColor } from './color';
import ColorPickerPalette from './ColorPickerPalette.vue';
const props = defineProps<{
    color: Color;
    mode: ColorPickerMode;
    modes: ColorPickerMode[];
    alpha: boolean;
    eyeDropper: boolean;
    disabled: boolean;
    swatches: ColorPickerSwatch[];
    recent: ColorPickerSwatch[];
}>();
const emit = defineEmits<{
    color: [value: Color];
    mode: [value: ColorPickerMode];
    commit: [];
    eyedropper: [];
    pick: [value: string];
}>();
const { trans, locale } = useI18n();
const id = useId();
const inputClass = inputVariants({ size: 'sm', class: 'font-mono' });
const hex = computed(() => formatColor(props.color));
const space = computed<ColorSpace>(() =>
    props.mode === 'hsv' ? 'hsb' : props.mode === 'hex' ? 'rgb' : props.mode,
);
const channels = computed<{ key: ColorChannel; label: string }[]>(() =>
    props.mode === 'rgb'
        ? [
              { key: 'red', label: 'R' },
              { key: 'green', label: 'G' },
              { key: 'blue', label: 'B' },
          ]
        : props.mode === 'hsl'
          ? [
                { key: 'hue', label: 'H °' },
                { key: 'saturation', label: 'S %' },
                { key: 'lightness', label: 'L %' },
            ]
          : props.mode === 'hsv'
            ? [
                  { key: 'hue', label: 'H °' },
                  { key: 'saturation', label: 'S %' },
                  { key: 'brightness', label: 'V %' },
              ]
            : [],
);
function scheduleCommit() {
    void nextTick(() => emit('commit'));
}
</script>
