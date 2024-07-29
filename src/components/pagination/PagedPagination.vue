<template>
    <ButtonGroup :align="props.align || 'center'" :gap="props.connected ? 'none' : (props.gap || props.size || 'md')">
        <template v-for="(page, idx) of availablePages" :key="idx">
            <template v-if="page == ''">
                <span class="pager-sep">…</span>
            </template>
            <template v-else>
                <ButtonStd 
                    color="secondary" 
                    size="sm" 
                    :label="page"
                    :disabled="props.disabled || page == props.current" 
                    @click="(ev) => onPage(ev, page)" />
            </template>
        </template>
    </ButtonGroup>
</template>

<script lang="ts">
/**
 * PagedPagination Properties
 */
export interface PagedPaginationProps {
    /**
     * The current navigation page, used for this pagination.
     */
    current: number;

    /**
     * The first available navigation page, used for this pagination.
     */
    first?: number;

    /**
     * The last available navigation page, used for this pagination.
     */
    last: number;

    /**
     * The visible amount of available pages.
     */
    pages: number;
    
    /**
     * The desired alignment for the buttons within the group.
     */
    align?: 'left' | 'center' | 'right';

    /**
     * The desired size of the button, note that `md` is the default value.
     */
    size?: 'sm' | 'md' | 'lg';

    /**
     * The desired gap-size between the single buttons, note that `md` is the default value.
     */
    gap?: 'sm' | 'md' | 'lg';

    /**
     * Whether to connect the single buttons or not.
     */
    connected?: boolean;

    /**
     * The disabled state for this pagination.
     */
    disabled?: boolean;
}

/**
 * PagedPagination Events
 */
 export interface PagedPaginationEmits {
    /**
     * The event triggered when on active button is clicked.
     * @param ev
     * @param event 
     * @param page 
     * @param props 
     */
    (ev: 'page', event: Event, page: number, props: PagedPaginationProps): void;
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'AdvancedPagination'
}
</script>

<script lang="ts" setup>
import { computed } from 'vue';
import ButtonStd from '../button/ButtonStd.vue';
import ButtonGroup from '../button/ButtonGroup.vue';

// Define Component
const props = defineProps<PagedPaginationProps>();
const emits = defineEmits<PagedPaginationEmits>();

// States
const availablePages = computed<(number|'')[]>(() => {
    let cur = props.current;
    let first = Math.min(props.first || 1, cur);
    let last = Math.max(props.last, cur);
    let pages = Math.max(props.pages, 1);
    let result: (number|'')[] = [ first ];

    // Prevent invalid values
    if (last < first || pages <= result.length) {
        return first != last ? [Math.min(first, last), Math.max(first, last)] : [first];
    }

    // Calculate pages
    let [before, after] = [Math.floor(pages/2),  Math.ceil(pages/2)];
    while(cur - before <= first) {
        before--;
        after++;
    }
    while(cur + after >= last) {
        after--;
    }

    // Fill pages
    if (before > 0) {
        if (cur - before > first+1) {
            result.push('');
        }
        result.push(...('0'.repeat(before).split('').map((_, idx) => cur-(idx+1)).reverse()));
    }
    if (cur != first && cur != last) {
        result.push(cur);
    }
    if (after > 0) {
        result.push(...('0'.repeat(after).split('').map((_, idx) => cur+(idx+1))));
        if (cur + after < last-1) {
            result.push('');
        }
    }

    // Return result
    result.push(last);
    return result;
});

/**
 * Event Listener for each single page button.
 * @param event
 * @param page
 */
function onPage(event: Event, page: number) {
    if (props.disabled) {
        return;
    }
    emits('page', event, page, props);
}
</script>

<style scoped>
.pager-sep {
    @apply flex flex-row self-center mx-1.5 text-sm font-semibold;
    @apply text-gray-500 dark:text-gray-600;
}
</style>
