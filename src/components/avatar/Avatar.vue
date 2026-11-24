<template>
    <AvatarRoot
        data-slot="avatar"
        :data-shape="shape ?? 'round'"
        :data-tone="tone ?? 'default'"
        :class="cn(avatarVariants({ size, shape, tone }), props.class)"
        :style="avatarMaskStyle(shape)">
        <slot />
    </AvatarRoot>
</template>

<script setup lang="ts">
import type { AvatarVariants } from './variants';
import type { HTMLAttributes } from 'vue';
import { AvatarRoot } from 'reka-ui';
import { cn } from '../../support/classNames';
import { avatarMaskStyle } from './shapes';
import { avatarVariants } from './variants';

const props = defineProps<{
    class?: HTMLAttributes['class'];
    size?: AvatarVariants['size'];
    shape?: AvatarVariants['shape'];
    tone?: AvatarVariants['tone'];
}>();
</script>
