<template>
    <AutocompleteItem
        data-slot="auto-complete-item"
        v-bind="forwarded"
        :class="
            cn(
                `relative flex cursor-default items-center gap-2 rounded-sm px-4 py-2.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-surface-hover data-[highlighted]:text-surface-hover-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground`,
                props.class,
            )
        ">
        <slot />
    </AutocompleteItem>
</template>

<script setup lang="ts">
import type { ComboboxItemEmits, ComboboxItemProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { AutocompleteItem, useForwardPropsEmits } from 'reka-ui';
import { cn } from '../../support/classNames';

const props = defineProps<ComboboxItemProps & { class?: HTMLAttributes['class'] }>();
const emits = defineEmits<ComboboxItemEmits>();

const delegatedProps = reactiveOmit(props, 'class');

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>
