<template>
    <SplitterPanel
        ref="panel"
        v-bind="forwarded"
        :id="resolvedId"
        data-slot="resizable-panel"
        :inert="fullyCollapsed || undefined"
        :aria-hidden="fullyCollapsed || undefined"
        :data-resizable-id="resolvedId"
        :class="cn('min-h-0 min-w-0', props.class)"
        v-slot="slotProps">
        <slot v-bind="slotProps" />
    </SplitterPanel>
</template>
<script setup lang="ts">
import type { ResizablePanelApi } from './types';
import type { SplitterPanelProps, SplitterPanelEmits } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { SplitterPanel, useForwardPropsEmits } from 'reka-ui';
import { computed, inject, onBeforeUnmount, ref, useId, watchEffect } from 'vue';
import { cn } from '../../support/classNames';
import { resizableContextKey } from './context';
const props = defineProps<SplitterPanelProps & { class?: HTMLAttributes['class'] }>();
const emit = defineEmits<SplitterPanelEmits>();
const group = inject(resizableContextKey);
if (!group) throw new Error('ResizablePanel must be inside Resizable.');
const instanceId = useId();
const resolvedId = computed(() => props.id ?? `${group.id.value}-panel-${instanceId}`);
const forwarded = useForwardPropsEmits(reactiveOmit(props, 'class', 'id'), emit);
const panel = ref<ResizablePanelApi>();
const collapsed = computed(() => panel.value?.isCollapsed ?? false);
const fullyCollapsed = computed(() => collapsed.value && (props.collapsedSize ?? 0) <= 0);
const expanded = computed(() => panel.value?.isExpanded ?? true);
const collapse = () => panel.value?.collapse();
const expand = () => panel.value?.expand();
watchEffect((onCleanup) => {
    const id = resolvedId.value;
    group.panels.set(id, {
        collapsed,
        collapsible: computed(() => !!props.collapsible),
        collapse,
        expand,
    });
    onCleanup(() => group.panels.delete(id));
});
onBeforeUnmount(() => group.panels.delete(resolvedId.value));
defineExpose({
    collapse,
    expand,
    resize: (size: number) => panel.value?.resize(size),
    getSize: () => panel.value?.getSize() ?? 0,
    isCollapsed: collapsed,
    isExpanded: expanded,
});
</script>
