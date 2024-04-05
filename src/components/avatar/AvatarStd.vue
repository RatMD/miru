<template>
    <div v-if="props.avatar || props.name"
        class="avatar"
        :class="[
            props.mask ? `avatar-mask avatar-mask-${props.mask}` : ``,
            props.avatar ? `avatar-with-image` : `avatar-with-label`,
            !props.mask && props.rounded ? `avatar-rounded-${props.rounded}` : ''
        ]"
        :style="styles">
        <div class="avatar-label" v-if="!props.avatar">
            <slot name="default" v-bind="props">
                <span>{{ props.name }}</span>
            </slot>
        </div>
        
        <template v-else>
            <img :src="url" :title="props?.avatarProps?.title || void 0" :alt="props?.avatarProps?.alt || void 0" v-if="url" />
            <component :is="props.avatar" v-bind="props.avatarProps" v-else />
        </template>
    </div>
</template>

<script lang="ts">
import type { Component } from 'vue';

/**
 * AvatarStd Properties
 */
export interface AvatarStdProps {
    /**
     * The main avatar, either a URL-like string or a component.
     */
    avatar?: string | URL | Component;

    /**
     * Additional properties passed to the avatar component, supports also 'alt' and 'title' if 
     * `avatar` is a string or URL instead of a component..
     */
    avatarProps?: { [key: string]: any };

    /**
     * The fallback name, when no avatar has been passed.
     */
    name?: string;
    
    /**
     * The desires color, used for the fallback name.
     */
    color?: string;

    /**
     * The desired size of the avatar, use 64px as default.
     */
    size?: number;
    
    /**
     * The desires background color.
     */
    backgroundColor?: string;

    /**
     * The desired rounded for this avatar.
     */
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';

    /**
     * Whether to apply one of the desired masks or not.
     */
    mask?: null | 'squircle';
}

/**
 * AvatarStd Slots
 */
export interface AvatarStdSlots {
    /**
     * The default content slot, used when no avatar is passed, replaces props.name.
     */
    default(props: AvatarStdProps): any;
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'AvatarStd'
}
</script>

<script lang="ts" setup>
import { computed } from 'vue';

// Define Component
const props = defineProps<AvatarStdProps>();
const slots = defineSlots<AvatarStdSlots>();

// Receive Avatar URL, if available.
const url = computed<string|null>(() => {
    if (typeof props.avatar == 'string') {
        return props.avatar;
    } else {
        return props.avatar instanceof URL ? props.avatar.toString() : null;
    }
});

// Applied Stylings
const styles = computed<{ [key: string]: string }>(() => {
    const temp: { [key: string]: string } = {};
    if (typeof props.size == 'number') {
        temp['width'] = `${props.size}px`;
        temp['height'] = `${props.size}px`;
    }
    if (typeof props.color == 'string') {
        temp['color'] = props.color;
    }
    if (typeof props.backgroundColor == 'string') {
        temp['backgroundColor'] = props.backgroundColor;
    }
    return temp;
});
</script>

<style scoped>
.avatar {
    @apply w-16 h-16 flex items-center justify-center rounded overflow-hidden;

    &.avatar-with-label {
        @apply text-gray-300 bg-gray-800 dark:text-gray-800 dark:bg-gray-200;
    }

    &.avatar-rounded-none {
        @apply rounded-none;
    }
    &.avatar-rounded-sm {
        @apply rounded-sm;
    }
    &.avatar-rounded-md {
        @apply rounded-md;
    }
    &.avatar-rounded-lg {
        @apply rounded-lg;
    }
    &.avatar-rounded-xl {
        @apply rounded-xl;
    }
    &.avatar-rounded-2xl {
        @apply rounded-2xl;
    }
    &.avatar-rounded-3xl {
        @apply rounded-3xl;
    }
    &.avatar-rounded-full {
        @apply rounded-full;
    }
}

.avatar.avatar-mask {
    mask-size: contain;
    mask-repeat: no-repeat;
    mask-position: center;

    &.avatar-mask-squircle {
        mask-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjAwJyBoZWlnaHQ9JzIwMCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cGF0aCBkPSdNMTAwIDBDMjAgMCAwIDIwIDAgMTAwczIwIDEwMCAxMDAgMTAwIDEwMC0yMCAxMDAtMTAwUzE4MCAwIDEwMCAwWicvPjwvc3ZnPg==");
    }
}

.avatar-label {
    @apply w-full h-full flex items-center justify-center font-semibold text-lg uppercase;
}

.avatar-image {
    @apply w-full h-full object-cover;
}
</style>
