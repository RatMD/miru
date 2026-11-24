<template>
    <input
        v-model="modelValue"
        data-slot="input"
        :class="cn(inputVariants({ size }), props.class)" />
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { useVModel } from '@vueuse/core';
import { cn } from '../../support/classNames';
import { inputVariants } from '.';

const props = defineProps<{
    defaultValue?: string | number;
    modelValue?: string | number;
    size?: 'default' | 'sm' | 'lg';
    class?: HTMLAttributes['class'];
}>();

const emits = defineEmits<{
    (e: 'update:modelValue', payload: string | number): void;
}>();

const modelValue = useVModel(props, 'modelValue', emits, {
    passive: true,
    defaultValue: props.defaultValue,
});
</script>
