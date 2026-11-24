<template>
    <DrawerRoot
        v-bind="forwarded"
        :snap-points="resolvedSnapPoints"
        :default-snap-point="defaultSnapPoint ?? resolvedSnapPoints?.[0] ?? null">
        <slot />
    </DrawerRoot>
</template>
<script setup lang="ts">
import type { DrawerRootProps, DrawerRootEmits } from 'reka-ui';
import { DrawerRoot, useForwardPropsEmits } from 'reka-ui';
import { computed } from 'vue';
const props = withDefaults(defineProps<DrawerRootProps>(), {
    swipeDirection: 'down',
    modal: true,
    open: undefined,
    snapPoints: undefined,
});
const resolvedSnapPoints = computed(
    () => props.snapPoints ?? (props.swipeDirection === 'down' ? [0.5, 0.9] : undefined),
);
const emit = defineEmits<DrawerRootEmits>();
const forwarded = useForwardPropsEmits(props, emit);
</script>
