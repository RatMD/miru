<template>
    <div data-slot="checkbox-field" :class="cn('flex items-center gap-2', props.wrapperClass)">
        <CheckboxControl
            :class="props.class"
            :readonly="readonly"
            v-bind="{ ...$attrs, ...forwarded }"
            :id="inputId">
            <template v-if="$slots.indicator" #default="scope">
                <slot name="indicator" v-bind="scope" />
            </template>
        </CheckboxControl>
        <Label
            v-if="label || $slots.default"
            :for="inputId"
            :class="cn(size === 'sm' && 'text-xs', disabled && 'cursor-not-allowed opacity-50')">
            <slot>{{ label }}</slot>
        </Label>
    </div>
</template>
<script setup lang="ts">
import type { InlineVariant } from '../inline-variants';
import type { CheckboxRootEmits, CheckboxRootProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { useForwardPropsEmits } from 'reka-ui';
import { computed, useId } from 'vue';
import { cn } from '../../support/classNames';
import { Label } from '../label';
import CheckboxControl from './CheckboxControl.vue';

defineOptions({ inheritAttrs: false });
const props = defineProps<
    CheckboxRootProps & {
        variant?: InlineVariant;
        label?: string;
        size?: 'sm' | 'default' | 'lg';
        class?: HTMLAttributes['class'];
        wrapperClass?: HTMLAttributes['class'];
        readonly?: boolean;
    }
>();
const emit = defineEmits<CheckboxRootEmits>();
const generatedId = useId();
const inputId = computed(() => props.id || generatedId);
const forwarded = useForwardPropsEmits(
    reactiveOmit(props, 'class', 'wrapperClass', 'readonly', 'label'),
    emit,
);
</script>
