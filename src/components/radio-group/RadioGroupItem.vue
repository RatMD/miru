<template>
    <RadioGroupItem
        :aria-readonly="isReadonly || undefined"
        @click.capture="guardReadonly"
        @keydown.capture="guardReadonly"
        @beforeinput.capture="guardReadonly"
        @paste.capture="guardReadonly"
        data-slot="radio-group-item"
        :data-size="resolvedSize"
        :data-variant="resolvedVariant"
        :style="selectionColors(resolvedVariant)"
        v-bind="forwardedProps"
        :class="
            cn(
                'peer aspect-square shrink-0 cursor-pointer rounded-full border border-input bg-background text-(--selection-fg) shadow-xs transition-[color,background-color,border-color,box-shadow] outline-none [&:not(:disabled):not([data-disabled])]:hover:border-muted-foreground [&:not(:disabled):not([data-disabled])]:hover:bg-ghostly focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger aria-invalid:ring-danger/20 data-[state=checked]:border-(--selection-bg) data-[state=checked]:bg-(--selection-bg) data-[state=checked]:shadow-[0_0_0_3px_rgb(0_0_0/0.1)] data-[state=checked]:[&:not(:disabled):not([data-disabled])]:hover:bg-(--selection-hover) dark:aria-invalid:ring-danger/40',
                resolvedSize === 'sm' ? 'size-4' : resolvedSize === 'lg' ? 'size-6' : 'size-5',
                'data-[state=checked]:aria-invalid:border-danger',
                'aria-invalid:border-danger! aria-invalid:shadow-[0_0_0_3px_rgb(220_38_38/0.15)]! data-[state=checked]:aria-invalid:bg-danger! data-[state=checked]:aria-invalid:text-danger-foreground! data-[state=checked]:aria-invalid:[&:not(:disabled):not([data-disabled])]:hover:bg-danger-hover!',
                props.class,
            )
        ">
        <RadioGroupIndicator
            data-slot="radio-group-indicator"
            class="relative flex items-center justify-center">
            <slot>
                <IconCircle
                    class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fill-current stroke-current"
                    :class="
                        resolvedSize === 'sm'
                            ? 'size-2'
                            : resolvedSize === 'lg'
                              ? 'size-3'
                              : 'size-2.5'
                    " />
            </slot>
        </RadioGroupIndicator>
    </RadioGroupItem>
</template>

<script setup lang="ts">
import type { InlineVariant } from '../inline-variants';
import type { RadioGroupItemProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { IconCircle } from '@tabler/icons-vue';
import { reactiveOmit } from '@vueuse/core';
import { RadioGroupIndicator, RadioGroupItem, useForwardProps } from 'reka-ui';
import { computed, inject } from 'vue';
import { cn } from '../../support/classNames';
import { useReadonlyField } from '../field/readonly';
import { selectionColors } from '../selection-colors';
import { radioGroupSizeKey, radioGroupVariantKey } from '.';

const props = defineProps<
    RadioGroupItemProps & {
        class?: HTMLAttributes['class'];
        readonly?: boolean;
        size?: 'sm' | 'default' | 'lg';
        variant?: InlineVariant;
    }
>();
const groupVariant = inject(radioGroupVariantKey, undefined);
const resolvedVariant = computed(() => props.variant ?? groupVariant?.value ?? 'default');
const groupSize = inject(radioGroupSizeKey, undefined);
const resolvedSize = computed(() => props.size ?? groupSize?.value ?? 'default');

const { readonly: isReadonly, guard: guardReadonly } = useReadonlyField(() => props.readonly);
const delegatedProps = reactiveOmit(props, 'readonly', 'class', 'size', 'variant');

const forwardedProps = useForwardProps(delegatedProps);
</script>
