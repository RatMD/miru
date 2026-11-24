<template>
    <DialogPortal>
        <DialogOverlay />
        <DialogContent
            data-slot="dialog-content"
            :data-size="size"
            v-bind="{ ...$attrs, ...forwarded }"
            :class="
                cn(
                    'fixed top-1/2 left-1/2 z-50 grid w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-lg border-0 bg-background p-6 shadow-lg duration-200 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
                    dialogSizeClasses[size],
                    props.class,
                )
            ">
            <slot />
            <DialogClose
                v-if="showClose !== false"
                data-slot="dialog-close-button"
                :disabled="closeDisabled"
                class="absolute top-3 right-3 cursor-pointer rounded-sm p-1 text-muted-foreground hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none">
                <IconX class="size-4" />
                <span class="sr-only">{{ closeLabel }}</span>
            </DialogClose>
        </DialogContent>
    </DialogPortal>
</template>

<script setup lang="ts">
import type { DialogSize } from './sizes';
import type { DialogContentEmits, DialogContentProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { IconX } from '@tabler/icons-vue';
import { reactiveOmit } from '@vueuse/core';
import { DialogClose, DialogContent, DialogPortal, useForwardPropsEmits } from 'reka-ui';
import { cn } from '../../support/classNames';
import DialogOverlay from './DialogOverlay.vue';
import { dialogSizeClasses } from './sizes';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
    defineProps<
        DialogContentProps & {
            class?: HTMLAttributes['class'];
            closeLabel: string;
            size?: DialogSize;
            showClose?: boolean;
            closeDisabled?: boolean;
        }
    >(),
    { size: 'lg' },
);
const emits = defineEmits<DialogContentEmits>();
const delegated = reactiveOmit(props, 'class', 'closeLabel', 'showClose', 'closeDisabled', 'size');
const forwarded = useForwardPropsEmits(delegated, emits);
</script>
