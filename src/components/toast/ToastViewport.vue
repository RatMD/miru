<template>
    <Teleport to="body" :disabled="host.inline">
        <ToastViewport
            ref="viewport"
            v-bind="{ ...$attrs, ...(host.expand || host.inline ? { 'data-expanded': '' } : {}) }"
            :id="host.id"
            data-slot="toast"
            :data-inline="host.inline"
            :data-position="host.position"
            :data-appearance="host.appearance"
            :data-theme="theme"
            :class="cn('miru-toaster', theme === 'dark' && 'dark', host.class)"
            :style="styles"
            :dir="host.dir"
            :hotkey="host.hotkey"
            :label="host.containerAriaLabel || trans('common.toast.label')">
            <ToastMessage v-for="item in orderedToasts" :key="item.id" :item="item" :host="host">
                <template v-for="(_, name) in $slots" #[name]="scope">
                    <slot :name="name" v-bind="scope ?? {}" />
                </template>
            </ToastMessage>
        </ToastViewport>
    </Teleport>
</template>
<script setup lang="ts">
import type { ToastRecord } from './toast';
import type { ToasterProps, ToastOffset } from './types';
import type { CSSProperties } from 'vue';
import {
    useMutationObserver,
    usePreferredDark,
    useResizeObserver,
} from '@vueuse/core';
import { ToastViewport, useToastManager } from 'reka-ui';
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { useBreakpoint } from '../../composables/useBreakpoint';
import { useI18n } from '../../composables/useI18n';
import { cn } from '../../support/classNames';
import ToastMessage from './ToastMessage.vue';
defineOptions({ inheritAttrs: false });
const props = defineProps<{ host: ToasterProps }>();
const { toasts } = useToastManager<ToastRecord>();
// Mount older items first, so Reka's registration order also handles batched adds correctly.
const orderedToasts = computed(() => [...toasts.value].reverse());
const viewport = ref<{ $el: HTMLElement }>();
const expandedHeight = ref(0);
function measureStack() {
    let height = 0;
    for (const element of viewport.value?.$el.querySelectorAll<HTMLElement>(
        '[data-slot="toast-message"]:not([data-limited])',
    ) ?? []) {
        const style = getComputedStyle(element);
        height = Math.max(
            height,
            (parseFloat(style.getPropertyValue('--reka-toast-offset-y')) || 0) +
                (parseFloat(style.getPropertyValue('--reka-toast-index')) || 0) *
                    (props.host.gap ?? 12) +
                (parseFloat(style.getPropertyValue('--reka-toast-height')) || element.offsetHeight),
        );
    }
    expandedHeight.value = height;
}
watch(
    () => [toasts.value.map((item) => [item.id, item.open, item.updateKey]), props.host.gap],
    () => {
        void nextTick(measureStack);
    },
    { flush: 'post' },
);
useResizeObserver(
    computed(() =>
        toasts.value.length
            ? [
                  ...(viewport.value?.$el.querySelectorAll<HTMLElement>(
                      '[data-slot="toast-content"]',
                  ) ?? []),
              ]
            : [],
    ),
    () => {
        void nextTick(measureStack);
    },
);
const { trans } = useI18n();
const { matches: mobile } = useBreakpoint({ max: 'sm' });
const preferredDark = usePreferredDark();
const html = ref<HTMLElement>();
const inheritedTheme = ref<'light' | 'dark'>();
function readTheme() {
    const root = html.value;
    inheritedTheme.value =
        root?.classList.contains('dark') || root?.dataset.theme === 'dark'
            ? 'dark'
            : root?.classList.contains('light') || root?.dataset.theme === 'light'
              ? 'light'
              : undefined;
}
onMounted(() => {
    html.value = document.documentElement;
    readTheme();
});
useMutationObserver(html, readTheme, {
    attributes: true,
    attributeFilter: ['class', 'data-theme'],
});
const theme = computed(() =>
    props.host.theme && props.host.theme !== 'system'
        ? props.host.theme
        : (inheritedTheme.value ?? (preferredDark.value ? 'dark' : 'light')),
);
function length(value: number | string | undefined) {
    return typeof value === 'number' ? `${value}px` : value;
}
function offsets(value: ToastOffset | undefined) {
    return typeof value === 'object' && value !== null
        ? value
        : { top: value, right: value, bottom: value, left: value };
}
const styles = computed<CSSProperties>(() => {
    const offset = offsets(
        mobile.value ? (props.host.mobileOffset ?? props.host.offset) : props.host.offset,
    );
    const [vertical, horizontal] = (props.host.position || 'bottom-right').split('-');
    return {
        '--toast-gap': `${props.host.gap ?? 12}px`,
        '--toast-expanded-height': `${expandedHeight.value}px`,
        '--toast-sign': vertical === 'top' ? 1 : -1,
        '--toast-limit': props.host.visibleToasts ?? 3,
        '--toast-width': `min(370px, calc(100vw - ${length(offset.left) || '16px'} - ${length(offset.right) || '16px'}))`,
        ...(!props.host.inline
            ? {
                  [vertical]: `max(${length(offset[vertical as 'top' | 'bottom']) || '16px'}, env(safe-area-inset-${vertical}, 0px))`,
                  ...(horizontal === 'center'
                      ? { left: '50%', translate: '-50% 0' }
                      : { [horizontal]: length(offset[horizontal as 'left' | 'right']) || '16px' }),
              }
            : {}),
        ...props.host.style,
    };
});
</script>
