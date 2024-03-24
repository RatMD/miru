<template>
    <div ref="group" class="btn-group" :class="[
        `btn-group-${props.align || 'right'}`,
        `btn-group-${props.size || 'md'}`,
        props.manually ? 'is-manually' : '',
        props.vertical ? 'is-vertical': 'is-horizontal',
    ]">
        <slot v-bind="props"></slot>
    </div>
</template>

<script lang="ts">
import type ButtonStd from '../button/ButtonStd.vue';

/**
 * ButtonGroup Properties
 */
export interface ButtonGroupProps {
    /**
     * The desired alignment for the buttons within the group.
     */
    align?: 'left' | 'center' | 'right';

    /**
     * The desired gap-size between the single buttons, note that `md` is the default value. Has no 
     * effect on the button size itself.
     */
    size?: 'sm' | 'md' | 'lg';

    /**
     * Whether to use manual selection of buttons, to support ungrouped buttons, or not.
     */
    manually?: boolean;

    /**
     * Whether to use a vertical-styled group or a horizontal one for the provided buttons.
     */
    vertical?: boolean;
}

/**
 * ButtonGroup Slots
 */
export interface ButtonGroupSlots {
    /**
     * The desired ButtonStd components.
     */
    default(props: ButtonGroupProps): InstanceType<typeof ButtonStd>|InstanceType<typeof ButtonStd>[];
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'ButtonGroup'
}
</script>

<script lang="ts" setup>
import { nextTick, ref, watch } from 'vue';

// Define Component
const props = defineProps<ButtonGroupProps>();
const slots = defineSlots<ButtonGroupSlots>();

// States
const group = ref<HTMLElement>();

// H
watch(() => slots.default, async () => {
    await nextTick();
    if (!group.value || !props.manually) {
        return;
    }

    let buttons = group.value.querySelectorAll('.btn:not(.btn-ungrouped)') as NodeListOf<HTMLButtonElement>;
    buttons.forEach(btn => btn.classList.remove('btn-group-first', 'btn-group-num', 'btn-group-last'));

    if (buttons.length > 1) {
        buttons[0].classList.add('btn-group-first');
        buttons[buttons.length-1].classList.add('btn-group-last');
    }
    
    if (buttons.length > 2) {
        buttons.forEach((btn, idx) => {
            if (idx === 0 || idx === (buttons.length-1)) {
                return;
            }
            btn.classList.add('btn-group-num');
        });
    }
}, { immediate: true });
</script>

<style scoped>
.btn-group {
    @apply w-full flex gap-2;

    &.btn-group-sm {
        @apply gap-1;
    }
    
    &.btn-group-lg {
        @apply gap-4;
    }

    &.is-horizontal {
        @apply flex-row;

        &.btn-group-left {
            @apply justify-start;
        }
        &.btn-group-center {
            @apply justify-center;
        }
        &.btn-group-right {
            @apply justify-end;
        }
    }

    &.is-vertical {
        @apply flex-col;

        & > :deep(*) {
            @apply text-center justify-center;
        }
    }
}

.btn-group.is-manually {
    & > :deep(.btn-group-num) {
        @apply rounded-none;
    }

    &.is-horizontal {
        & > :deep(.btn-group-first) {
            @apply rounded-r-none;
        }
    
        & > :deep(.btn-group-last) {
            @apply rounded-l-none;
        }
    }

    &.is-vertical {
        & > :deep(.btn-group-first) {
            @apply rounded-b-none;
        }

        & > :deep(.btn-group-last) {
            @apply rounded-t-none;
        }
    }
}

.btn-group:not(.is-manually) {
    & > :deep(*:not(:first-child):not(:last-child)) {
        @apply rounded-none;
    }

    &.is-horizontal {
        & > :deep(*:first-child:not(:last-child)) {
            @apply rounded-r-none;
        }
    
        & > :deep(*:last-child:not(:first-child)) {
            @apply rounded-l-none;
        }
    }

    &.is-vertical {
        & > :deep(*:first-child:not(:last-child)) {
            @apply rounded-b-none;
        }

        & > :deep(*:last-child:not(:first-child)) {
            @apply rounded-t-none;
        }
    }
}
</style>
