<template>
    <InputGroupAddon align="inline-end">
        <NumberFieldIncrement v-bind="forwarded" as-child data-slot="increment">
            <InputGroupButton size="icon-xs" :class="props.class">
                <slot><IconPlus class="size-4 shrink-0" /></slot>
            </InputGroupButton>
        </NumberFieldIncrement>
    </InputGroupAddon>
</template>
<script setup lang="ts">
import type { NumberFieldIncrementProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { IconPlus } from '@tabler/icons-vue';
import { reactiveOmit } from '@vueuse/core';
import { NumberFieldIncrement, useForwardProps } from 'reka-ui';
import { InputGroupAddon, InputGroupButton } from '../input-group';
const props = defineProps<NumberFieldIncrementProps & { class?: HTMLAttributes['class'] }>();
const forwarded = useForwardProps(reactiveOmit(props, 'class', 'as', 'asChild'));
</script>
