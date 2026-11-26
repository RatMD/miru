<template>
    <Indicator
        data-slot="button-status-icon"
        overlay
        :color="color"
        :visible="visible"
        :pulse="pulse"
        :ping="ping"
        :size="small ? 'sm' : 'default'">
        <slot />
    </Indicator>
</template>
<script setup lang="ts">
import { Indicator } from '../indicator';
withDefaults(
    defineProps<{
        color: string;
        small?: boolean;
        visible?: boolean;
        pulse?: boolean;
        ping?: boolean;
    }>(),
    { visible: true },
);
</script>
