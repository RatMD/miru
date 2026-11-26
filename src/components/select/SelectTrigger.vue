<template>
    <SelectTrigger
        :aria-readonly="isReadonly || undefined"
        @click.capture="guardReadonly"
        @keydown.capture="guardReadonly"
        @pointerdown.capture="guardReadonly"
        data-slot="select-trigger"
        :data-size="resolvedSize"
        :data-shape="resolvedShape"
        v-bind="forwardedProps"
        :class="
            cn(
                `miru-field flex w-fit cursor-pointer items-center justify-between gap-2 border border-input bg-background px-3 py-2 whitespace-nowrap text-foreground shadow-xs transition-[color,box-shadow] outline-none`,
                resolvedShape === 'round'
                    ? 'rounded-full px-4'
                    : resolvedSize === 'sm'
                      ? 'rounded'
                      : 'rounded-md',
                resolvedSize === 'sm' ? 'text-xs' : resolvedSize === 'lg' ? 'text-base' : 'text-sm',
                `focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 data-[state=open]:border-ring data-[state=open]:ring-3 data-[state=open]:ring-ring/50 data-[state=open]:aria-invalid:ring-danger/20 dark:data-[state=open]:aria-invalid:ring-danger/40 data-[state=open]:aria-[valid=true]:ring-success/20`,
                `disabled:cursor-not-allowed disabled:opacity-50`,
                `aria-invalid:border-danger aria-invalid:ring-danger/20`,
                `data-[placeholder]:text-muted-foreground data-[size=default]:h-9 data-[size=lg]:h-10 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 dark:aria-invalid:ring-danger/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground`,
                props.class,
            )
        ">
        <slot />
        <SelectIcon as-child>
            <IconChevronDown class="size-4 opacity-50" />
        </SelectIcon>
    </SelectTrigger>
</template>

<script setup lang="ts">
import type { SelectShape, SelectSize } from './context';
import type { SelectTriggerProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { IconChevronDown } from '@tabler/icons-vue';
import { reactiveOmit } from '@vueuse/core';
import { SelectIcon, SelectTrigger, useForwardProps } from 'reka-ui';
import { computed, inject, watch } from 'vue';
import { cn } from '../../support/classNames';
import { useReadonlyField } from '../field/readonly';
import { selectShapeKey, selectSizeKey, selectTriggerSizeKey } from './context';

const props = defineProps<
    SelectTriggerProps & {
        readonly?: boolean;
        class?: HTMLAttributes['class'];
        size?: SelectSize;
        shape?: SelectShape;
    }
>();

const inheritedSize = inject(selectSizeKey, undefined);
const inheritedShape = inject(selectShapeKey, undefined);
const resolvedShape = computed(() => props.shape ?? inheritedShape?.value ?? 'default');
const triggerSize = inject(selectTriggerSizeKey, undefined);
const resolvedSize = computed(() => props.size ?? inheritedSize?.value ?? 'default');
watch(
    () => props.size,
    (size) => {
        if (triggerSize) triggerSize.value = size;
    },
    { immediate: true, flush: 'sync' },
);

const { readonly: isReadonly, guard: guardReadonly } = useReadonlyField(() => props.readonly);
const delegatedProps = reactiveOmit(props, 'readonly', 'class', 'size', 'shape');
const forwardedProps = useForwardProps(delegatedProps);
</script>
