<template>
    <InputGroupAddon align="inline-start">
        <NumberFieldDecrement v-bind="forwarded" as-child data-slot="decrement">
            <InputGroupButton size="icon-xs" :class="props.class">
                <slot><IconMinus class="size-4 shrink-0" /></slot>
            </InputGroupButton>
        </NumberFieldDecrement>
    </InputGroupAddon>
</template>
<script setup lang="ts">
import type { NumberFieldDecrementProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { IconMinus } from '@tabler/icons-vue';
import { reactiveOmit } from '@vueuse/core';
import { NumberFieldDecrement, useForwardProps } from 'reka-ui';
import { InputGroupAddon, InputGroupButton } from '../input-group';
const props = defineProps<NumberFieldDecrementProps & { class?: HTMLAttributes['class'] }>();
const forwarded = useForwardProps(reactiveOmit(props, 'class', 'as', 'asChild'));
</script>
