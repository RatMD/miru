<template>
    <div
        data-slot="input-pin-group"
        :data-connected="resolvedConnected"
        :class="cn('flex items-center', resolvedConnected ? 'gap-0' : 'gap-2', props.class)">
        <slot />
    </div>
</template>
<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { computed, inject, provide } from 'vue';
import { cn } from '../../support/classNames';
import { inputPinContextKey, inputPinConnectedKey } from './context';
const props = withDefaults(
    defineProps<{ connected?: boolean; class?: HTMLAttributes['class'] }>(),
    { connected: undefined },
);
const context = inject(inputPinContextKey, undefined);
const inherited = inject(inputPinConnectedKey, undefined);
const resolvedConnected = computed(
    () => props.connected ?? inherited?.value ?? context?.value.connected ?? false,
);
provide(inputPinConnectedKey, resolvedConnected);
</script>
