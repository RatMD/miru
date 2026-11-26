<template>
    <AvatarImage
        data-slot="avatar-image"
        v-bind="props"
        class="aspect-square size-full"
        @loading-status-change="emit('loadingStatusChange', $event)">
        <slot />
    </AvatarImage>
</template>

<script setup lang="ts">
import type { AvatarImageEmits, AvatarImageProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { AvatarImage } from 'reka-ui';

const props = defineProps<AvatarImageProps & { class?: HTMLAttributes['class'] }>();
const emit = defineEmits<AvatarImageEmits>();
</script>
