<template>
    <DrawerPortal>
        <DrawerOverlay
            data-slot="drawer-overlay"
            class="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0" />
        <RekaDrawerContent
            v-bind="{ ...$attrs, ...forwarded }"
            data-slot="drawer-content"
            :style="{ '--drawer-max-height': heightLimit }"
            :class="
                cn(
                    'miru-drawer-content fixed z-50 overflow-hidden border-border bg-background text-foreground shadow-lg outline-none ',
                    props.class,
                )
            ">
            <div
                data-slot="drawer-frame"
                :class="
                    cn(
                        'relative mx-auto flex w-full flex-col',
                        dialogSizeClasses[contentSize],
                        contentClass,
                    )
                ">
                <DrawerHandle
                    v-if="showHandle"
                    data-slot="drawer-handle"
                    class="mx-auto my-3 h-1.5 w-12 shrink-0 touch-none cursor-grab rounded-full bg-neutral-300 active:cursor-grabbing dark:bg-neutral-700" />
                <slot name="header" />
                <ScrollArea v-if="scrollable" class="min-h-0 flex-1" data-slot="drawer-scroll-area">
                    <slot />
                </ScrollArea>
                <div v-else class="flex min-h-0 flex-1 flex-col"><slot /></div>
                <slot name="footer" />
                <DrawerClose v-if="showClose" as-child>
                    <Button
                        variant="ghost"
                        size="sm"
                        icon-only
                        class="absolute top-2 right-2"
                        :disabled="closeDisabled"
                        :aria-label="closeLabel || trans('common.actions.close')">
                        <IconX />
                    </Button>
                </DrawerClose>
            </div>
        </RekaDrawerContent>
    </DrawerPortal>
</template>
<script setup lang="ts">
import type { DialogSize } from '../dialog';
import type { DrawerContentProps, DrawerContentEmits } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { IconX } from '@tabler/icons-vue';
import { reactiveOmit } from '@vueuse/core';
import {
    DrawerPortal,
    DrawerOverlay,
    DrawerContent as RekaDrawerContent,
    DrawerHandle,
    DrawerClose,
    useForwardPropsEmits,
} from 'reka-ui';
import { computed } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { cn } from '../../support/classNames';
import { Button } from '../button';
import { dialogSizeClasses } from '../dialog/sizes';
import { ScrollArea } from '../scroll-area';
defineOptions({ inheritAttrs: false });
const props = withDefaults(
    defineProps<
        DrawerContentProps & {
            class?: HTMLAttributes['class'];
            showHandle?: boolean;
            showClose?: boolean;
            closeDisabled?: boolean;
            closeLabel?: string;
            maxHeight?: string | number;
            contentSize?: DialogSize;
            contentClass?: HTMLAttributes['class'];
            scrollable?: boolean;
        }
    >(),
    {
        showHandle: true,
        showClose: true,
        closeDisabled: false,
        initialFocus: true,
        finalFocus: true,
        maxHeight: '90dvh',
        contentSize: '5xl',
        scrollable: true,
    },
);
const emit = defineEmits<DrawerContentEmits>();
const forwarded = useForwardPropsEmits(
    reactiveOmit(
        props,
        'class',
        'showHandle',
        'showClose',
        'closeDisabled',
        'closeLabel',
        'maxHeight',
        'contentSize',
        'contentClass',
        'scrollable',
    ),
    emit,
);
const { trans } = useI18n();
const heightLimit = computed(() =>
    typeof props.maxHeight === 'number' ? props.maxHeight + 'px' : props.maxHeight,
);
</script>
<style scoped>
.miru-drawer-content {
    height: min(100dvh, var(--drawer-max-height));
    max-height: min(100dvh, var(--drawer-max-height));
    transition: transform 220ms ease;
    --drawer-visible-offset: max(
        0px,
        calc(var(--drawer-swipe-movement-y, 0px) + var(--drawer-snap-point-offset, 0px))
    );
}
.miru-drawer-content [data-slot='drawer-frame'] {
    height: calc(100% - var(--drawer-visible-offset));
    transition: height 220ms ease;
}
.miru-drawer-content[data-swipe-direction='down'] {
    inset: auto 0 0;
    border-top-width: 1px;
    border-radius: var(--ui-radius) var(--ui-radius) 0 0;
    transform: translateY(var(--drawer-visible-offset));
}
.miru-drawer-content[data-swipe-direction='up'] {
    inset: 0 0 auto;
    border-bottom-width: 1px;
    border-radius: 0 0 var(--ui-radius) var(--ui-radius);
    transform: translateY(
        min(0px, calc(var(--drawer-swipe-movement-y, 0px) + var(--drawer-snap-point-offset, 0px)))
    );
}
.miru-drawer-content[data-swipe-direction='up'] [data-slot='drawer-frame'] {
    height: 100%;
}
.miru-drawer-content[data-swipe-direction='right'] {
    inset: 5dvh 0 auto auto;
    width: min(24rem, 90vw);
    border-left-width: 1px;
    transform: translateX(
        max(0px, calc(var(--drawer-swipe-movement-x, 0px) + var(--drawer-snap-point-offset, 0px)))
    );
}
.miru-drawer-content[data-swipe-direction='left'] {
    inset: 5dvh auto auto 0;
    width: min(24rem, 90vw);
    border-right-width: 1px;
    transform: translateX(
        min(0px, calc(var(--drawer-swipe-movement-x, 0px) + var(--drawer-snap-point-offset, 0px)))
    );
}
.miru-drawer-content:is([data-swipe-direction='left'], [data-swipe-direction='right'])
    [data-slot='drawer-frame'] {
    height: 100%;
}
.miru-drawer-content[data-swiping],
.miru-drawer-content[data-swiping] [data-slot='drawer-frame'] {
    transition: none;
}
.miru-drawer-content[data-state='closed'][data-swipe-direction='down'] {
    transform: translateY(100%);
}
.miru-drawer-content[data-state='closed'][data-swipe-direction='up'] {
    transform: translateY(-100%);
}
.miru-drawer-content[data-state='closed'][data-swipe-direction='right'] {
    transform: translateX(100%);
}
.miru-drawer-content[data-state='closed'][data-swipe-direction='left'] {
    transform: translateX(-100%);
}
@starting-style {
    .miru-drawer-content[data-state='open'][data-swipe-direction='down'] {
        transform: translateY(100%);
    }
}
@media (prefers-reduced-motion: reduce) {
    .miru-drawer-content,
    .miru-drawer-content [data-slot='drawer-frame'] {
        transition: none;
    }
}
</style>
