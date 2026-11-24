<template>
    <slot
        v-if="state.matches.value"
        :width="state.width.value"
        :height="state.height.value"
        :orientation="state.orientation.value"
        :current="state.current.value" />
    <slot
        v-else
        name="else"
        :width="state.width.value"
        :height="state.height.value"
        :orientation="state.orientation.value"
        :current="state.current.value" />
</template>
<script setup lang="ts">
import type { BreakpointOptions } from '../../composables/useBreakpoint';
import { useBreakpoint } from '../../composables/useBreakpoint';
const props = defineProps<BreakpointOptions>();
const state = useBreakpoint(() => props);
</script>
