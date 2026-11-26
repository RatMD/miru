<template>
    <AutocompletePortal>
        <AutocompleteContent
            data-slot="auto-complete-list"
            v-bind="forwarded"
            :class="
                cn(
                    'z-50 w-[var(--reka-combobox-trigger-width)] min-w-48 max-w-[calc(100vw-2rem)] origin-(--reka-combobox-content-transform-origin) overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-md outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
                    props.class,
                )
            ">
            <slot />
        </AutocompleteContent>
    </AutocompletePortal>
</template>

<script setup lang="ts">
import type { ComboboxContentEmits, ComboboxContentProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { AutocompleteContent, AutocompletePortal, useForwardPropsEmits } from 'reka-ui';
import { cn } from '../../support/classNames';

const props = withDefaults(
    defineProps<ComboboxContentProps & { class?: HTMLAttributes['class'] }>(),
    {
        position: 'popper',
        align: 'start',
        sideOffset: 4,
    },
);
const emits = defineEmits<ComboboxContentEmits>();

const delegatedProps = reactiveOmit(props, 'class');
const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>
