<template>
    <div
        data-slot="combobox-input-wrapper"
        :class="cn('relative flex h-9 items-center', props.wrapperClass)">
        <SearchIcon
            class="absolute top-1/2 left-2.5 -translate-y-1/2 size-4 shrink-0 text-muted-foreground"
            v-if="disableIcon === false" />
        <ComboboxInput
            data-slot="combobox-input"
            :class="
                cn(
                    'miru-field flex h-9 w-full rounded-md border border-input bg-transparent py-1 text-center text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
                    props.class,
                )
            "
            v-bind="{ ...forwarded, ...$attrs }">
            <slot />
        </ComboboxInput>
    </div>
</template>

<script setup lang="ts">
import type { ComboboxInputEmits, ComboboxInputProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { IconSearch as SearchIcon } from '@tabler/icons-vue';
import { reactiveOmit } from '@vueuse/core';
import { ComboboxInput, useForwardPropsEmits } from 'reka-ui';
import { cn } from '../../support/classNames';

defineOptions({
    inheritAttrs: false,
});

const props = defineProps<
    ComboboxInputProps & {
        wrapperClass?: HTMLAttributes['class'];
        class?: HTMLAttributes['class'];
        disableIcon?: boolean;
    }
>();

const emits = defineEmits<ComboboxInputEmits>();

const delegatedProps = reactiveOmit(props, 'class', 'wrapperClass', 'disableIcon');

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>
