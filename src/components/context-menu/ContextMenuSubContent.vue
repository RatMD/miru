<template>
    <ContextMenuPortal>
        <ContextMenuSubContent
            data-slot="context-menu-sub-content"
            v-bind="{ ...$attrs, ...forwarded }"
            :class="
                cn(
                    'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[min(8rem,var(--reka-context-menu-content-available-width))] max-w-(--reka-context-menu-content-available-width) -mt-1 origin-(--reka-context-menu-content-transform-origin) max-h-(--reka-context-menu-content-available-height) overflow-x-hidden overflow-y-auto rounded-md border py-1 shadow-lg',
                    props.class,
                )
            ">
            <slot />
        </ContextMenuSubContent>
    </ContextMenuPortal>
</template>
<script setup lang="ts">
import type { ContextMenuSubContentEmits, ContextMenuSubContentProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { ContextMenuPortal, ContextMenuSubContent, useForwardPropsEmits } from 'reka-ui';
import { cn } from '../../support/classNames';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
    defineProps<ContextMenuSubContentProps & { class?: HTMLAttributes['class'] }>(),
    { collisionPadding: 8 },
);
const emits = defineEmits<ContextMenuSubContentEmits>();

const delegatedProps = reactiveOmit(props, 'class');

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>
