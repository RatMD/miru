<template>
    <SelectLabel
        data-slot="select-label"
        :data-size="size"
        :class="
            cn(
                'text-xs font-semibold text-muted-foreground',
                size === 'sm' ? 'px-3 py-1.5' : 'px-4 py-2',
                props.class,
            )
        ">
        <slot />
    </SelectLabel>
</template>

<script setup lang="ts">
import type { SelectLabelProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { SelectLabel } from 'reka-ui';
import { computed, inject } from 'vue';
import { cn } from '../../support/classNames';
import { selectSizeKey } from './context';

const props = defineProps<SelectLabelProps & { class?: HTMLAttributes['class'] }>();
const inheritedSize = inject(selectSizeKey, undefined);
const size = computed(() => inheritedSize?.value ?? 'default');
</script>
