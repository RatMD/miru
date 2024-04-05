<template>
    <div class="avatar-group" :style="styles">
        <template v-for="avatar of avatars">
            <component :is="avatar" :size="props.size || 48" rounded="full" />
        </template>
        <template v-if="count > (props.limit || Infinity)">
            <AvatarStd :name="label" :size="props.size || 48" rounded="full" class="avatar-limit">
                <span class="text-sm font-normal">+</span>
                <span class="tabular-nums" :class="[
                    (props.size || 48) > 48 ? 'text-base font-semibold' : 'text-xs font-normal'
                ]">{{ label.slice(1) }}</span>
            </AvatarStd>
        </template>
    </div>
</template>

<script lang="ts">
/**
 * AvatarGroup Props
 */
export interface AvatarGroupProps {
    /**
     * The desired size of the avatar, use 48px as default.
     */
    size?: number;

    /**
     * The number of avatar to be shown.
     */
    limit?: number;
}

/**
 * AvatarGroup Slots
 */
export interface AvatarGroupSlots {
    /**
     * The desired ButtonStd components.
     */
    default(props: AvatarGroupProps): InstanceType<typeof AvatarStd>[];
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'AvatarGroup'
}
</script>

<script lang="ts" setup>
import AvatarStd from './AvatarStd.vue';
import { computed } from 'vue';

// Define Component
const props = defineProps<AvatarGroupProps>();
const slots = defineSlots<AvatarGroupSlots>();

// Applied Stylings
const styles = computed<{ [key: string]: string }>(() => {
    const temp: { [key: string]: string } = {};
    temp['--avatar-size'] = `${props.size || 48}px`;
    return temp;
});

// Return avatar slice.
const avatars = computed(() => {
    const temp = slots.default(props);
    return props.limit && temp.length > props.limit ? temp.slice(0, props.limit-1) : temp;
});

// Return avatar slice number.
const count = computed<number>(() => {
    return slots.default(props).length;
});

// Return avatar count label.
const label = computed<string>(() => {
    if ((props.size || 48) < 36) {
        return '+';
    } else {
        return '+' + (count.value - (props.limit || 0));
    }
});
</script>

<style scoped>
.avatar-group {
    @apply flex flex-row;

    & :deep(.avatar) {
        &:not(:last-child) {
            mask-image: radial-gradient(
                circle var(--avatar-size) at calc(100% + calc(var(--avatar-size) / 8)) calc(100% - var(--avatar-size) / 2),
                transparent calc(var(--avatar-size) / 2),
                purple 0
            );
        }

        &:not(:first-child) {
            margin-left: calc(var(--avatar-size) / -4);
        }
    }
}
</style>
