<template>
    <SplitterGroup
        v-bind="forwarded"
        :id="resolvedId"
        data-slot="resizable"
        :data-disabled="disabled || undefined"
        :class="cn('min-h-0 min-w-0', props.class)"
        v-slot="slotProps">
        <slot v-bind="slotProps" />
    </SplitterGroup>
</template>
<script setup lang="ts">
import type { ResizablePanelController } from './context';
import type { SplitterGroupProps, SplitterGroupEmits } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { SplitterGroup, useForwardPropsEmits } from 'reka-ui';
import { computed, provide, shallowReactive, useId } from 'vue';
import { cn } from '../../support/classNames';
import { resizableContextKey } from './context';
const props = withDefaults(
    defineProps<SplitterGroupProps & { disabled?: boolean; class?: HTMLAttributes['class'] }>(),
    { direction: 'horizontal', disabled: false },
);
const emit = defineEmits<SplitterGroupEmits>();
const instanceId = useId();
const resolvedId = computed(() => props.id ?? `resizable-${instanceId}`);
const forwarded = useForwardPropsEmits(reactiveOmit(props, 'id', 'class', 'disabled'), emit);
provide(resizableContextKey, {
    id: resolvedId,
    direction: computed(() => props.direction),
    disabled: computed(() => props.disabled),
    panels: shallowReactive(new Map<string, ResizablePanelController>()),
});
</script>
