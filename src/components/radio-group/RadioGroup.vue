<template>
    <RadioGroupRoot
        v-slot="slotProps"
        data-slot="radio-group"
        :data-variant="variant"
        :class="
            cn(
                'flex gap-3',
                orientation === 'horizontal' ? 'flex-row flex-wrap' : 'flex-col',
                props.class,
            )
        "
        v-bind="forwarded">
        <slot v-bind="slotProps">
            <RadioBox
                v-for="option in options"
                :key="option.value"
                :value="option.value"
                :label="option.label"
                :variant="option.variant"
                :disabled="disabled || option.disabled"
                :aria-invalid="$attrs['aria-invalid']" />
        </slot>
    </RadioGroupRoot>
</template>

<script setup lang="ts">
import type { InlineVariant } from '../inline-variants';
import type { RadioGroupRootEmits, RadioGroupRootProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { RadioGroupRoot, useForwardPropsEmits } from 'reka-ui';
import { computed, provide } from 'vue';
import { cn } from '../../support/classNames';
import { RadioBox } from '../radiobox';
import { radioGroupSizeKey, radioGroupVariantKey } from '.';

const props = withDefaults(
    defineProps<
        RadioGroupRootProps & {
            class?: HTMLAttributes['class'];
            variant?: InlineVariant;
            size?: 'sm' | 'default' | 'lg';
            options?: {
                value: string;
                label: string;
                disabled?: boolean;
                variant?: InlineVariant;
            }[];
        }
    >(),
    { variant: 'default', size: 'default', orientation: 'vertical', options: () => [] },
);
provide(
    radioGroupSizeKey,
    computed(() => props.size),
);
provide(
    radioGroupVariantKey,
    computed(() => props.variant),
);
const emits = defineEmits<RadioGroupRootEmits>();

const delegatedProps = reactiveOmit(props, 'class', 'size', 'options', 'variant');

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>
