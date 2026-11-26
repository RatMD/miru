<template>
    <tfoot
        data-slot="table-footer"
        :class="cn('border-t bg-muted/40 font-medium [&_tr:last-child]:border-0', props.class)">
        <slot />
    </tfoot>
</template>
<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '../../support/classNames';
const props = defineProps<{ class?: HTMLAttributes['class'] }>();
</script>
