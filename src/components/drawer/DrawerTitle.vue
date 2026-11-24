<template>
    <RekaDrawerTitle data-slot="drawer-title" :class="cn('text-base font-semibold', props.class)">
        <slot />
    </RekaDrawerTitle>
</template>
<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { DrawerTitle as RekaDrawerTitle } from 'reka-ui';
import { cn } from '../../support/classNames';
const props = defineProps<{ class?: HTMLAttributes['class'] }>();
</script>
