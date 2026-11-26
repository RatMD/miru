<template>
    <div class="space-y-2">
        <p class="text-xs font-medium text-muted-foreground">{{ label }}</p>
        <ColorSwatchPickerRoot
            :model-value="value"
            :disabled="disabled"
            :aria-label="label"
            class="flex flex-wrap gap-2"
            @update:model-value="pick">
            <ColorSwatchPickerItem
                v-for="swatch in swatches"
                :key="swatch.value"
                :value="swatch.value"
                :aria-label="swatch.label || swatch.value"
                :title="swatch.label || swatch.value"
                class="relative size-6 cursor-pointer rounded-md border border-border p-0.5 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=checked]:ring-2 data-[state=checked]:ring-ring data-[state=checked]:ring-offset-2 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50">
                <ColorSwatchPickerItemSwatch
                    aria-hidden="true"
                    class="block size-full rounded-sm bg-[var(--reka-color-swatch-color)]" />
            </ColorSwatchPickerItem>
        </ColorSwatchPickerRoot>
    </div>
</template>
<script setup lang="ts">
import type { ColorPickerSwatch } from './types';
import { ColorSwatchPickerRoot, ColorSwatchPickerItem, ColorSwatchPickerItemSwatch } from 'reka-ui';
defineProps<{ label: string; value: string; swatches: ColorPickerSwatch[]; disabled: boolean }>();
const emit = defineEmits<{ pick: [value: string] }>();
function pick(value: unknown) {
    if (typeof value === 'string') emit('pick', value);
}
</script>
