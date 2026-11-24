<template>
    <component :is="desktop ? DialogTrigger : DrawerTrigger" v-bind="props"><slot /></component>
</template>
<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui';
import { DialogTrigger, DrawerTrigger } from 'reka-ui';
import { computed, inject } from 'vue';
import { overlayDesktopKey } from './context';
const props = defineProps<PrimitiveProps>();
const desktop = inject(
    overlayDesktopKey,
    computed(() => true),
);
</script>
