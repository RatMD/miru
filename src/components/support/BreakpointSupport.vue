<template>
    <template v-if="visible">
        <slot :width="screen.width" :height="screen.height" :orientation="screen.orientation" />
    </template>
    <slot name="else" :width="screen.width" :height="screen.height" :orientation="screen.orientation" v-else-if="$slots.else" />
</template>

<script lang="ts">
export type BreakpointNames = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export interface BreakpointSupportSlotProps {
    width: number;
    height: number;
    orientation: undefined | 'landscape' | 'portrait';
}

/**
 * BreakpointSupport Properties
 */
export interface BreakpointSupportProps {
    /**
     * The minimum breakpoint required to display the slot content. Can be either a, exact viewport 
     * width or a breakpoint name.
     */
    min?: null | number | BreakpointNames;

    /**
     * The maximum breakpoint allowed to display the slot content. Can be either a, exact viewport 
     * width or a breakpoint name.
     */
    max?: null | number | BreakpointNames;

    /**
     * Additionally, the screen orientation required to display the slot content.
     */
    orientation?: null | 'landscape' | 'portrait';
}

/**
 * BreakpointSupport Slots
 */
export interface BreakpointSupportSlots {
    /**
     * The default breakpoint slot.
     */
    default(props: BreakpointSupportSlotProps): any;

    /**
     * The else breakpoint content slot.
     */
    else(props: BreakpointSupportSlotProps): any;
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'BreakpointSupport'
}
</script>

<script lang="ts" setup>
import { computed } from 'vue';
import { useClient } from '../../composables/use-client';
import {
    BREAKPOINT_XXS,
    BREAKPOINT_XS,
    BREAKPOINT_SM,
    BREAKPOINT_MD,
    BREAKPOINT_LG,
    BREAKPOINT_XL,
    BREAKPOINT_XXL
} from '../../constants/breakpoints';

// Define Component
const props = defineProps<BreakpointSupportProps>();
const slots = defineSlots<BreakpointSupportSlots>();

// Stores
const { screen } = useClient();
const visible = computed<boolean>(() => {
    let min: number = typeof props.min == 'string' ? (breakpoints(props.min) || 0) : (props.min || 0);
    let max: number = typeof props.max == 'string' ? (breakpoints(props.max) || Infinity) : (props.max || Infinity);
    let ori: boolean = typeof props.orientation == 'string' ? (props.orientation == screen.orientation) : true;
    return ori && screen.width >= min && screen.width <= max-1;
});

/**
 * Resolve Breakpoint
 * @param string 
 */
function breakpoints(string: string): number | null {
    switch (string) {
        case 'xxs': return BREAKPOINT_XXS;
        case 'xs': return BREAKPOINT_XS;
        case 'sm': return BREAKPOINT_SM;
        case 'md': return BREAKPOINT_MD;
        case 'lg': return BREAKPOINT_LG;
        case 'xl': return BREAKPOINT_XL;
        case 'xxl': return BREAKPOINT_XXL;
    }
    return null;
}
</script>

<style scoped>
/* Scoped Stylings */
</style>
