<template>
    <DropdownMenuSeparator
        data-slot="dropdown-menu-separator"
        v-bind="delegatedProps"
        :class="cn('mx-0 my-1 h-px bg-border', props.class)" />
</template>

<script setup lang="ts">
import type { DropdownMenuSeparatorProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { DropdownMenuSeparator } from 'reka-ui';
import { cn } from '../../support/classNames';

const props = defineProps<
    DropdownMenuSeparatorProps & {
        class?: HTMLAttributes['class'];
    }
>();

const delegatedProps = reactiveOmit(props, 'class');
</script>
