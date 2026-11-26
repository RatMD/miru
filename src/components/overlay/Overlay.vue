<template>
    <component
        :is="desktop ? Dialog : Drawer"
        :open="controlledOpen"
        :snap-points="desktop ? undefined : drawerSnapPoints"
        @update:open="updateOpen">
        <slot name="trigger" />
        <component
            :is="desktop ? DialogContent : DrawerContent"
            v-bind="{
                ...$attrs,
                ...(desktop
                    ? {}
                    : {
                          scrollable: false,
                          maxHeight: drawerMaxHeight,
                          contentSize: size ?? '5xl',
                      }),
            }"
            data-overlay=""
            :data-presentation="desktop ? 'dialog' : 'drawer'"
            :size="desktop ? (wide ? '6xl' : (size ?? '2xl')) : undefined"
            :close-label="trans('common.actions.close')"
            :show-close="dismissible"
            :close-disabled="loading"
            :class="
                cn(
                    'flex flex-col gap-0 overflow-hidden p-0',
                    desktop ? cn('max-h-[90dvh]', widthClass) : 'rounded-t-xl',
                    desktop && fixedFrame && 'h-[90dvh]',
                    props.class,
                )
            "
            @escape-key-down="preventDismiss"
            @pointer-down-outside="preventDismiss"
            @close-auto-focus="restoreFocus">
            <header
                data-slot="overlay-header"
                class="flex shrink-0 items-start gap-3 px-6 pt-6 pr-14 pb-5">
                <span
                    v-if="icon"
                    class="grid size-8 shrink-0 place-items-center rounded-lg"
                    :class="
                        variant === 'danger'
                            ? 'bg-danger-50 text-danger-600 dark:bg-danger-950 dark:text-danger-400'
                            : 'bg-muted text-foreground'
                    ">
                    <component :is="icon" class="size-5" aria-hidden="true" />
                </span>
                <div class="flex min-w-0 flex-1 flex-col gap-3">
                    <component
                        :is="desktop ? DialogTitle : DrawerTitle"
                        class="text-left text-base leading-6 font-semibold"
                        :class="variant === 'danger' && 'text-danger-700 dark:text-danger-400'">
                        {{ title }}
                    </component>
                    <component
                        :is="desktop ? DialogDescription : DrawerDescription"
                        class="text-left text-sm leading-relaxed text-foreground/80">
                        <slot name="description">{{ description }}</slot>
                    </component>
                </div>
            </header>
            <ScrollArea
                v-if="$slots.default"
                data-slot="overlay-body"
                class="min-h-0 flex-1"
                :viewport-class="cn(!flush && 'px-6 pb-6', bodyClass)">
                <slot :desktop="desktop" :close="requestClose" />
            </ScrollArea>
            <footer
                v-if="$slots.footer"
                data-slot="overlay-footer"
                class="mt-auto shrink-0 border-t border-border px-6 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                <slot name="footer" :desktop="desktop" :close="requestClose" />
            </footer>
        </component>
    </component>
</template>
<script setup lang="ts">
import type { DialogSize } from '../dialog';
import type { Component, HTMLAttributes } from 'vue';
import { computed, nextTick, watch, provide } from 'vue';
import { useBreakpoint } from '../../composables/useBreakpoint';
import { useI18n } from '../../composables/useI18n';
import { cn } from '../../support/classNames';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '../dialog';
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle } from '../drawer';
import { ScrollArea } from '../scroll-area';
import { overlayDesktopKey } from './context';
defineOptions({ inheritAttrs: false });
const props = withDefaults(
    defineProps<{
        title: string;
        description?: string;
        icon?: Component | null;
        variant?: 'default' | 'danger';
        loading?: boolean;
        dismissible?: boolean;
        wide?: boolean;
        drawerSnapPoints?: (number | string)[];
        drawerMaxHeight?: string | number;
        widthClass?: string;
        size?: DialogSize;
        flush?: boolean;
        fixedFrame?: boolean;
        class?: HTMLAttributes['class'];
        bodyClass?: HTMLAttributes['class'];
    }>(),
    {
        description: '',
        variant: 'default',
        loading: false,
        dismissible: true,
        flush: false,
        drawerMaxHeight: '90dvh',
    },
);
const open = defineModel<boolean>('open', { default: false });
const { trans } = useI18n();
const { matches: desktop } = useBreakpoint({ min: 'md' });
provide(
    overlayDesktopKey,
    computed(() => desktop.value),
);
const controlledOpen = computed({
    get: () => open.value,
    set: (value) => {
        if (value || (!props.loading && props.dismissible)) open.value = value;
    },
});
let opener: HTMLElement | null = null;
watch(open, (value) => {
    if (value && typeof document !== 'undefined' && document.activeElement instanceof HTMLElement)
        opener = document.activeElement;
});
function updateOpen(value: boolean, details?: { cancel: () => void }): void {
    if (!value && (props.loading || !props.dismissible)) {
        details?.cancel();
        return;
    }
    controlledOpen.value = value;
}
function requestClose(): void {
    controlledOpen.value = false;
}
function preventDismiss(event: Event): void {
    if (props.loading || !props.dismissible) event.preventDefault();
}
function restoreFocus(event: Event): void {
    event.preventDefault();
    void nextTick(() => {
        if (!open.value && opener?.isConnected) opener.focus();
    });
}
</script>
