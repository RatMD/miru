<template>
    <textarea
        v-model="modelValue"
        data-slot="textarea"
        :data-size="size ?? 'default'"
        :class="
            cn(
                'miru-field flex field-sizing-content min-h-16 w-full rounded-md border border-input bg-background text-base text-foreground shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger aria-invalid:ring-danger/20 dark:aria-invalid:ring-danger/40',
                size === 'sm'
                    ? 'rounded px-3 py-1.5 md:text-xs'
                    : size === 'lg'
                      ? 'px-4 py-3'
                      : 'px-3 py-2 md:text-sm',
                props.class,
            )
        " />
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { useVModel } from '@vueuse/core';
import { cn } from '../../support/classNames';

const props = defineProps<{
    class?: HTMLAttributes['class'];
    defaultValue?: string | number;
    modelValue?: string | number;
    size?: 'sm' | 'default' | 'lg';
}>();

const emits = defineEmits<{
    (e: 'update:modelValue', payload: string | number): void;
}>();

const modelValue = useVModel(props, 'modelValue', emits, {
    passive: true,
    defaultValue: props.defaultValue,
});
</script>
