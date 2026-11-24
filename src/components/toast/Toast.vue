<template>
    <Sonner
        v-bind="forwarded"
        data-slot="toast"
        :data-inline="inline"
        :data-appearance="appearance"
        :class="cn('miru-toaster toaster group', props.class)"
        :style="{
            '--normal-bg': 'var(--ui-background)',
            '--normal-text': 'var(--ui-foreground)',
            '--normal-border': 'var(--ui-border)',
            '--border-radius': 'var(--ui-radius)',
            ...props.style,
        }"
        :expand="inline || expand"
        :visible-toasts="inline ? 100 : visibleToasts"
        :close-button="closeButton ?? true"
        :container-aria-label="containerAriaLabel ?? trans('common.toast.label')"
        :toast-options="options">
        <template #success-icon>
            <slot name="success-icon">
                <div
                    class="flex size-9 items-center justify-center rounded-xl bg-success-100 text-success-600 dark:bg-success-950 dark:text-success-400">
                    <IconCircleCheckFilled class="size-[21px]" />
                </div>
            </slot>
        </template>
        <template #info-icon>
            <slot name="info-icon">
                <div
                    class="flex size-9 items-center justify-center rounded-xl bg-info-100 text-info-600 dark:bg-info-950 dark:text-info-400">
                    <IconInfoCircleFilled class="size-[21px]" />
                </div>
            </slot>
        </template>
        <template #warning-icon>
            <slot name="warning-icon">
                <div
                    class="flex size-9 items-center justify-center rounded-xl bg-warning-100 text-warning-600 dark:bg-warning-950 dark:text-warning-400">
                    <IconAlertTriangleFilled class="size-[21px]" />
                </div>
            </slot>
        </template>
        <template #error-icon>
            <slot name="error-icon">
                <div
                    class="flex size-9 items-center justify-center rounded-xl bg-danger-100 text-danger-600 dark:bg-danger-950 dark:text-danger-400">
                    <IconAlertHexagonFilled class="size-[21px]" />
                </div>
            </slot>
        </template>
        <template #loading-icon>
            <slot name="loading-icon">
                <div
                    class="flex size-9 items-center justify-center rounded-xl bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                    <IconLoader2 class="size-[21px] animate-spin" />
                </div>
            </slot>
        </template>
        <template #close-icon>
            <slot name="close-icon"><IconX class="size-4" /></slot>
        </template>
    </Sonner>
</template>
<script setup lang="ts">
import type { ToastAppearance } from './appearance';
import type { ToasterProps } from 'vue-sonner';
import {
    IconAlertHexagonFilled,
    IconAlertTriangleFilled,
    IconCircleCheckFilled,
    IconInfoCircleFilled,
    IconLoader2,
    IconX,
} from '@tabler/icons-vue';
import { reactiveOmit } from '@vueuse/core';
import { computed } from 'vue';
import { Toaster as Sonner } from 'vue-sonner';
import { useI18n } from '../../composables/useI18n';
import { cn } from '../../support/classNames';
import { toastAppearanceClasses } from './appearance';
import 'vue-sonner/style.css';
const props = withDefaults(
    defineProps<ToasterProps & { appearance?: ToastAppearance; inline?: boolean }>(),
    { appearance: 'frost', inline: false },
);
const { trans } = useI18n();
const forwarded = reactiveOmit(props, 'class', 'style', 'appearance', 'inline', 'toastOptions');
const options = computed(() => {
    const surface = toastAppearanceClasses[props.appearance];
    const classes = {
        toast: cn(
            "relative flex min-h-[76px] w-full max-w-[370px] flex-row items-center gap-0 overflow-hidden rounded-2xl border !p-0 !h-auto has-[[data-button]]:pb-12! before:absolute before:inset-y-0 before:left-0 before:w-1 before:content-[''] before:bg-gray-400 data-[type=info]:before:bg-info-500 data-[type=success]:before:bg-success-500 data-[type=warning]:before:bg-warning-500 data-[type=error]:before:bg-danger-500",
            surface.toast,
        ),
        icon: 'ml-3 flex shrink-0 items-center justify-center',
        content: 'min-w-0 flex-1 py-3.5 pr-11 pl-2',
        title: cn('font-heading text-[13px]/[18px] font-semibold', surface.title),
        description: cn(
            'mt-0.5 whitespace-pre-wrap font-heading text-xs/[17px] font-semibold',
            surface.description,
        ),
        actionButton:
            'absolute right-3 bottom-3 h-7 cursor-pointer rounded-md bg-neutral-950 px-3 text-xs font-medium text-white hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-ring',
        cancelButton:
            'absolute bottom-3 left-3 h-7 cursor-pointer rounded-md border border-border bg-white px-3 text-xs font-medium text-gray-950 hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-ring',
        closeButton: cn(
            'absolute top-2 right-2 z-50 flex size-7 cursor-pointer items-center justify-center rounded-lg border-0! bg-transparent! transition-colors duration-200',
            surface.closeButton,
        ),
    };
    return {
        unstyled: true,
        class: 'group !p-0',
        ...props.toastOptions,
        closeButtonAriaLabel:
            props.toastOptions?.closeButtonAriaLabel ?? trans('common.toast.close'),
        classes: { ...classes, ...props.toastOptions?.classes },
    };
});
</script>
<style>
.miru-toaster [data-sonner-toast]:not(:has(> [data-icon])) [data-content] {
    padding-left: 1rem;
}
.miru-toaster [data-close-button] {
    top: 0.5rem;
    right: 0.5rem;
    left: auto;
    bottom: auto;
    transform: none;
}
.miru-toaster[data-inline='true'] {
    position: relative;
    z-index: auto;
    inset: auto;
    width: min(100%, 370px);
    margin-inline: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    transform: none;
}
.miru-toaster[data-inline='true'] [data-sonner-toast] {
    position: relative;
    z-index: 0;
    inset: auto;
    width: 100%;
    transform: none !important;
    opacity: 1;
    height: auto !important;
}
.miru-toaster[data-inline='true'] [data-sonner-toast][data-removed='true'] {
    opacity: 0;
}
.miru-toaster [data-sonner-toast][data-rich-colors='true'][data-type='success'] {
    background: var(--ui-success-50);
    border-color: var(--ui-success-200);
}
.miru-toaster [data-sonner-toast][data-rich-colors='true'][data-type='info'] {
    background: var(--ui-info-50);
    border-color: var(--ui-info-200);
}
.miru-toaster [data-sonner-toast][data-rich-colors='true'][data-type='warning'] {
    background: var(--ui-warning-50);
    border-color: var(--ui-warning-200);
}
.miru-toaster [data-sonner-toast][data-rich-colors='true'][data-type='error'] {
    background: var(--ui-danger-50);
    border-color: var(--ui-danger-200);
}
</style>
