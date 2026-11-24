<template>
    <div
        class="mx-auto flex size-8 items-center justify-center rounded-full border"
        :class="
            count > 0
                ? 'border-muted-foreground/40'
                : 'border-muted-foreground/20 bg-muted-foreground/5 text-muted-foreground'
        ">
        <strong class="text-xs tabular-nums">{{ count }}</strong>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

defineOptions({ inheritAttrs: false });
const props = defineProps<{ value: unknown }>();
const count = computed(() => Number(props.value ?? 0));
</script>
