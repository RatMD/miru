<template>
    <AvatarFallback
        data-slot="avatar-fallback"
        v-bind="delegatedProps"
        :class="
            cn(
                'flex size-full items-center justify-center rounded-[inherit] bg-inherit text-inherit',
                props.class,
            )
        ">
        <slot />
    </AvatarFallback>
</template>

<script setup lang="ts">
import type { AvatarFallbackProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { AvatarFallback } from 'reka-ui';
import { cn } from '../../support/classNames';

const props = defineProps<AvatarFallbackProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = reactiveOmit(props, 'class');
</script>
