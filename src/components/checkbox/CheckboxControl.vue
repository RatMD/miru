<template>
    <CheckboxRoot
        v-slot="slotProps"
        data-slot="checkbox"
        :data-size="size"
        :data-variant="resolvedVariant"
        :style="selectionColors(resolvedVariant)"
        v-bind="forwarded"
        :class="
            cn(
                'peer shrink-0 cursor-pointer rounded-sm border border-input bg-background shadow-xs transition-[color,background-color,border-color,box-shadow] outline-none [&:not(:disabled):not([data-disabled])]:hover:border-muted-foreground [&:not(:disabled):not([data-disabled])]:hover:bg-ghostly',
                size === 'sm' ? 'size-4' : size === 'lg' ? 'size-6' : 'size-5',
                'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
                'disabled:cursor-not-allowed disabled:opacity-50',
                'aria-invalid:border-danger aria-invalid:ring-danger/20',
                'aria-invalid:border-danger! aria-invalid:shadow-[0_0_0_3px_rgb(220_38_38/0.15)]! data-[state=checked]:aria-invalid:bg-danger! data-[state=checked]:aria-invalid:text-danger-foreground! data-[state=checked]:aria-invalid:[&:not(:disabled):not([data-disabled])]:hover:bg-danger-hover! data-[state=indeterminate]:aria-invalid:bg-danger! data-[state=indeterminate]:aria-invalid:text-danger-foreground! data-[state=indeterminate]:aria-invalid:[&:not(:disabled):not([data-disabled])]:hover:bg-danger-hover!',
                'data-[state=checked]:aria-invalid:border-danger data-[state=indeterminate]:aria-invalid:border-danger',
                'data-[state=checked]:border-(--selection-bg) data-[state=checked]:bg-(--selection-bg) data-[state=checked]:text-(--selection-fg) data-[state=checked]:shadow-[0_0_0_3px_rgb(0_0_0/0.1)] data-[state=checked]:[&:not(:disabled):not([data-disabled])]:hover:bg-(--selection-hover) data-[state=indeterminate]:border-(--selection-bg) data-[state=indeterminate]:bg-(--selection-bg) data-[state=indeterminate]:text-(--selection-fg) data-[state=indeterminate]:shadow-[0_0_0_3px_rgb(0_0_0/0.1)] data-[state=indeterminate]:[&:not(:disabled):not([data-disabled])]:hover:bg-(--selection-hover) dark:aria-invalid:ring-danger/40',
                props.class,
            )
        ">
        <CheckboxIndicator
            data-slot="checkbox-indicator"
            class="grid place-content-center text-current transition-none">
            <slot v-bind="slotProps">
                <component
                    :is="slotProps.state === 'indeterminate' ? IconMinus : IconCheck"
                    :class="size === 'sm' ? 'size-3.5' : size === 'lg' ? 'size-5' : 'size-4'"
                    aria-hidden="true" />
            </slot>
        </CheckboxIndicator>
    </CheckboxRoot>
</template>

<script setup lang="ts">
import type { InlineVariant } from '../inline-variants';
import type { CheckboxRootEmits, CheckboxRootProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { IconCheck, IconMinus } from '@tabler/icons-vue';
import { reactiveOmit } from '@vueuse/core';
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from 'reka-ui';
import { computed, inject } from 'vue';
import { cn } from '../../support/classNames';
import { selectionColors } from '../selection-colors';
import { checkboxVariantKey } from './context';

const props = withDefaults(
    defineProps<
        CheckboxRootProps & {
            class?: HTMLAttributes['class'];
            size?: 'sm' | 'default' | 'lg';
            variant?: InlineVariant;
        }
    >(),
    { size: 'default' },
);
const groupVariant = inject(checkboxVariantKey, undefined);
const resolvedVariant = computed(() => props.variant ?? groupVariant?.value ?? 'default');
const emits = defineEmits<CheckboxRootEmits>();

const delegatedProps = reactiveOmit(props, 'class', 'size', 'variant');

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>
