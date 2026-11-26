<template>
    <AutocompleteEmpty
        data-slot="auto-complete-empty"
        v-bind="delegatedProps"
        :class="cn('py-6 text-center text-sm', props.class)">
        <slot />
    </AutocompleteEmpty>
</template>

<script setup lang="ts">
import type { ComboboxEmptyProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { AutocompleteEmpty } from 'reka-ui';
import { cn } from '../../support/classNames';

const props = defineProps<ComboboxEmptyProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = reactiveOmit(props, 'class');
</script>
