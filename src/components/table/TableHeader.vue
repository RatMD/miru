<template>
    <thead
        data-slot="table-header"
        :class="cn('border-b bg-muted/40 [&_tr]:border-0', props.class)">
        <slot />
    </thead>
</template>
<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '../../support/classNames';
const props = defineProps<{ class?: HTMLAttributes['class'] }>();
</script>
