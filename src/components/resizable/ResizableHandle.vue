<template>
    <div
        ref="host"
        data-slot="resizable-handle-wrapper"
        :data-orientation="group.direction.value"
        :class="
            cn(
                'miru-resizable-handle relative shrink-0',
                horizontal ? 'h-full w-px' : 'h-px w-full',
            )
        ">
        <SplitterResizeHandle
            v-bind="{ ...forwarded, ...$attrs }"
            :id="resolvedId"
            data-slot="resizable-handle"
            :disabled="resolvedDisabled"
            :tabindex="resolvedDisabled ? -1 : tabindex"
            :aria-label="ariaLabel || trans('common.resizable.resize')"
            :class="
                cn(
                    'absolute inset-0 z-10 bg-border outline-none transition-colors hover:bg-primary focus-visible:bg-primary focus-visible:ring-2 focus-visible:ring-ring data-[state=drag]:bg-primary data-[disabled]:cursor-default data-[disabled]:opacity-50',
                    props.class,
                )
            "
            @dragging="emit('dragging', $event)">
            <slot>
                <span
                    v-if="showGrip"
                    data-slot="resizable-grip"
                    aria-hidden="true"
                    :style="gripPosition"
                    :class="
                        cn(
                            'pointer-events-none absolute flex items-center justify-center rounded-sm border border-border bg-background text-muted-foreground shadow-xs',
                            horizontal ? 'h-7 w-3' : 'h-3 w-7',
                        )
                    ">
                    <component
                        :is="horizontal ? IconGripVertical : IconGripHorizontal"
                        class="size-3 shrink-0" />
                </span>
            </slot>
        </SplitterResizeHandle>
        <button
            v-if="showToggle && target"
            type="button"
            data-slot="resizable-toggle"
            :aria-label="
                target.collapsed.value
                    ? expandLabel || trans('common.resizable.expand')
                    : collapseLabel || trans('common.resizable.collapse')
            "
            :title="
                target.collapsed.value
                    ? expandLabel || trans('common.resizable.expand')
                    : collapseLabel || trans('common.resizable.collapse')
            "
            :aria-expanded="!target.collapsed.value"
            :aria-controls="targetId"
            :disabled="resolvedDisabled"
            class="absolute z-20 flex size-6 cursor-pointer items-center justify-center rounded border border-border bg-background text-muted-foreground shadow-xs outline-none hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            :style="togglePosition"
            @pointerdown.stop
            @mousedown.stop
            @touchstart.stop
            @keydown.stop
            @click.stop="toggle">
            <component :is="toggleIcon" class="size-3.5" aria-hidden="true" />
        </button>
    </div>
</template>
<script setup lang="ts">
import type { SplitterResizeHandleProps } from 'reka-ui';
import type { CSSProperties, HTMLAttributes } from 'vue';
import {
    IconGripVertical,
    IconGripHorizontal,
    IconChevronLeft,
    IconChevronRight,
    IconChevronUp,
    IconChevronDown,
} from '@tabler/icons-vue';
import { reactiveOmit } from '@vueuse/core';
import { SplitterResizeHandle, useForwardProps } from 'reka-ui';
import { computed, inject, nextTick, onMounted, onUpdated, ref, useId } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { cn } from '../../support/classNames';
import { resizableContextKey } from './context';
defineOptions({ inheritAttrs: false });
const props = withDefaults(
    defineProps<
        SplitterResizeHandleProps & {
            showGrip?: boolean;
            showToggle?: boolean;
            toggleTarget?: string;
            ariaLabel?: string;
            expandLabel?: string;
            collapseLabel?: string;
            class?: HTMLAttributes['class'];
        }
    >(),
    {
        showGrip: false,
        showToggle: false,
        disabled: undefined,
        tabindex: 0,
        hitAreaMargins: () => ({ fine: 8, coarse: 18 }),
    },
);
const emit = defineEmits<{ dragging: [value: boolean]; toggle: [collapsed: boolean] }>();
const group = inject(resizableContextKey);
if (!group) throw new Error('ResizableHandle must be inside Resizable.');
const { trans } = useI18n();
const host = ref<HTMLElement>();
const previousId = ref<string>();
const instanceId = useId();
const resolvedId = computed(() => props.id ?? `${group.id.value}-handle-${instanceId}`);
const resolvedDisabled = computed(() => !!props.disabled || group.disabled.value);
const horizontal = computed(() => group.direction.value === 'horizontal');
const targetId = computed(() => props.toggleTarget ?? previousId.value);
const target = computed(() => {
    const panel = targetId.value ? group.panels.get(targetId.value) : undefined;
    return panel?.collapsible.value ? panel : undefined;
});
const forwarded = useForwardProps(
    reactiveOmit(
        props,
        'id',
        'class',
        'disabled',
        'tabindex',
        'showGrip',
        'showToggle',
        'toggleTarget',
        'ariaLabel',
        'expandLabel',
        'collapseLabel',
    ),
);
const toggleIcon = computed(() => {
    const after = props.toggleTarget !== undefined && props.toggleTarget !== previousId.value;
    const reverse = !!target.value?.collapsed.value !== after;
    return horizontal.value
        ? reverse
            ? IconChevronRight
            : IconChevronLeft
        : reverse
          ? IconChevronDown
          : IconChevronUp;
});
const collapsedOffset = (distance: number) => {
    if (!target.value?.collapsed.value) return '50%';
    const after = props.toggleTarget !== undefined && props.toggleTarget !== previousId.value;
    return `calc(50% + ${after ? -distance : distance}px)`;
};
const gripPosition = computed<CSSProperties>(() => ({
    left: horizontal.value ? collapsedOffset(6) : showBoth.value ? 'calc(50% - 15px)' : '50%',
    top:
        horizontal.value && showBoth.value
            ? 'calc(50% - 15px)'
            : horizontal.value
              ? '50%'
              : collapsedOffset(6),
    transform: 'translate(-50%, -50%)',
}));
const togglePosition = computed<CSSProperties>(() => ({
    left:
        !horizontal.value && props.showGrip
            ? 'calc(50% + 15px)'
            : horizontal.value
              ? collapsedOffset(12)
              : '50%',
    top:
        horizontal.value && props.showGrip
            ? 'calc(50% + 15px)'
            : horizontal.value
              ? '50%'
              : collapsedOffset(12),
    transform: 'translate(-50%, -50%)',
}));
const showBoth = computed(() => props.showToggle && !!target.value);
function findPreviousPanel() {
    let previous = host.value?.previousElementSibling as HTMLElement | null | undefined;
    while (previous) {
        if (previous.dataset.resizableId) {
            previousId.value = previous.dataset.resizableId;
            return;
        }
        previous = previous.previousElementSibling as HTMLElement | null;
    }
    previousId.value = undefined;
}
onMounted(findPreviousPanel);
onUpdated(findPreviousPanel);
async function toggle() {
    if (resolvedDisabled.value || !target.value) return;
    const panel = target.value;
    if (panel.collapsed.value) panel.expand();
    else panel.collapse();
    await nextTick();
    emit('toggle', panel.collapsed.value);
}
</script>
