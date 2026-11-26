<template>
    <tbody data-slot="table-body" :class="cn('[&>tr:last-child]:border-b-0', props.class)">
        <slot />
    </tbody>
</template>
<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '../../support/classNames';
const props = defineProps<{ class?: HTMLAttributes['class'] }>();
</script>
