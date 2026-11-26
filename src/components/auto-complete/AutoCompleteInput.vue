<template>
    <AutocompleteInput
        data-slot="auto-complete-input"
        v-bind="{ ...forwarded, ...$attrs }"
        :class="cn(inputVariants({ size }), props.class)" />
</template>
<script setup lang="ts">
import type { AutocompleteInputProps, AutocompleteInputEmits } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { AutocompleteInput, useForwardPropsEmits } from 'reka-ui';
import { cn } from '../../support/classNames';
import { inputVariants } from '../input';
defineOptions({ inheritAttrs: false });
const props = withDefaults(
    defineProps<
        AutocompleteInputProps & { size?: 'sm' | 'default' | 'lg'; class?: HTMLAttributes['class'] }
    >(),
    { size: 'default' },
);
const emit = defineEmits<AutocompleteInputEmits>();
const forwarded = useForwardPropsEmits(reactiveOmit(props, 'size', 'class'), emit);
</script>
