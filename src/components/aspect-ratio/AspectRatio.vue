<template>
    <RekaAspectRatio
        data-slot="aspect-ratio"
        :ratio="resolvedRatio"
        :class="cn('overflow-hidden', props.class)">
        <slot :ratio="resolvedRatio" />
    </RekaAspectRatio>
</template>
<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { AspectRatio as RekaAspectRatio } from 'reka-ui';
import { computed } from 'vue';
import { cn } from '../../support/classNames';
import { aspectRatioPresets } from './presets';
const props = withDefaults(
    defineProps<{
        ratio?: number | string;
        preset?: keyof typeof aspectRatioPresets;
        class?: HTMLAttributes['class'];
    }>(),
    { preset: 'square' },
);
const resolvedRatio = computed(() => {
    const input = props.ratio ?? aspectRatioPresets[props.preset];
    let value: number;
    if (typeof input === 'string') {
        const parts = input.trim().match(/^(\d+(?:\.\d+)?)\s*[x×:/]\s*(\d+(?:\.\d+)?)$/i);
        value = parts ? Number(parts[1]) / Number(parts[2]) : Number(input);
    } else {
        value = input;
    }
    return Number.isFinite(value) && value > 0 ? value : 1;
});
</script>
