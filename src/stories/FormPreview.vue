<template>
    <div class="space-y-3">
        <div class="flex flex-wrap items-center gap-2" role="group" aria-label="Preview width">
            <Button
                v-for="size in sizes"
                :key="size"
                size="sm"
                :variant="mode === size ? 'primary' : 'outline'"
                :aria-pressed="mode === size"
                @click="mode = size">
                {{ size }}
            </Button>
        </div>
        <div
            ref="surface"
            class="overflow-x-auto rounded-xl border border-border bg-muted/30 p-2 sm:p-4">
            <div
                data-slot="form-preview"
                class="relative mx-auto max-h-[800px] overflow-auto rounded-lg border border-border bg-background p-5 [transform:translateZ(0)] sm:p-8"
                :style="{
                    width: mode === 'Desktop' ? '1200px' : mode === 'Mobile' ? '390px' : '100%',
                    maxWidth: mode === 'Mobile' ? '100%' : undefined,
                    zoom: mode === 'Desktop' && width ? Math.min(1, width / 1200) : 1,
                }">
                <slot />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useElementSize } from '@vueuse/core';
import { ref } from 'vue';
import { Button } from '../components/button';
const surface = ref<HTMLElement>();
const { width } = useElementSize(surface);
const sizes = ['Responsive', 'Desktop', 'Mobile'] as const;
const mode = ref<(typeof sizes)[number]>('Desktop');
</script>
