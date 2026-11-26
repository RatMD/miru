<template>
    <SelectRoot
        v-slot="slotProps"
        data-slot="select"
        v-bind="{ ...forwarded, ...(isReadonly ? { open: false, required: false } : {}) }">
        <slot v-bind="slotProps" />
    </SelectRoot>
</template>

<script setup lang="ts">
import type { SelectShape, SelectSize } from './context';
import type { SelectRootEmits, SelectRootProps } from 'reka-ui';
import { reactiveOmit } from '@vueuse/core';
import { SelectRoot, useForwardPropsEmits } from 'reka-ui';
import { computed, provide, ref } from 'vue';
import { useReadonlyField } from '../field/readonly';
import { selectShapeKey, selectSizeKey, selectTriggerSizeKey } from './context';

const props = withDefaults(
    defineProps<SelectRootProps & { readonly?: boolean; size?: SelectSize; shape?: SelectShape }>(),
    { size: 'default', shape: 'default' },
);
const { readonly: isReadonly } = useReadonlyField(() => props.readonly);
const emits = defineEmits<SelectRootEmits>();

const triggerSize = ref<SelectSize>();
provide(
    selectShapeKey,
    computed(() => props.shape),
);
provide(selectTriggerSizeKey, triggerSize);
provide(
    selectSizeKey,
    computed(() => triggerSize.value ?? props.size),
);

const forwarded = useForwardPropsEmits(reactiveOmit(props, 'readonly', 'size', 'shape'), emits);
</script>
