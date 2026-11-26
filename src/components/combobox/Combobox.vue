<template>
    <ComboboxRoot data-slot="combobox" v-bind="{ ...forwarded, ...(isReadonly ? { open: false, required: false } : {}) }">
        <slot />
    </ComboboxRoot>
</template>

<script setup lang="ts">
import type { ComboboxRootEmits, ComboboxRootProps } from 'reka-ui';
import { reactiveOmit } from '@vueuse/core';
import { ComboboxRoot, useForwardPropsEmits } from 'reka-ui';
import { useReadonlyField } from '../field/readonly';

const props = defineProps<ComboboxRootProps & { readonly?: boolean }>();
const { readonly: isReadonly } = useReadonlyField(() => props.readonly);
const emits = defineEmits<ComboboxRootEmits>();

const forwarded = useForwardPropsEmits(reactiveOmit(props, 'readonly'), emits);
</script>
