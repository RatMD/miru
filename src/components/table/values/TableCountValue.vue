<template>
    <div
        class="flex size-8 items-center justify-center rounded-full border"
        :class="[
            align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : 'mr-auto',
            count > 0
                ? 'border-muted-foreground/40'
                : 'border-muted-foreground/20 bg-muted-foreground/5 text-muted-foreground',
        ]">
        <strong class="text-xs tabular-nums">{{ count }}</strong>
    </div>
</template>
<script setup lang="ts">
import type { TableAlign } from '../types';
import { computed } from 'vue';
const props = withDefaults(defineProps<{ value: unknown; align?: TableAlign }>(), {
    align: 'center',
});
const count = computed(() => {
    const value = Number(props.value ?? 0);
    return Number.isFinite(value) ? value : 0;
});
</script>
