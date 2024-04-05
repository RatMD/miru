<template>
    <template v-if="props.type == 'header'">
        <slot name="header">
            <span v-if="typeof props.label == 'string'">{{ props.label }}</span>
            <component :is="props.label" v-bind="props.labelProps" v-else />
        </slot>
    </template>

    <template v-else-if="props.type == 'content' && props.item && props.index">
        <slot name="default" :item="props.item" :index="props.index">
            <template v-if="props.column">
                <template v-if="(props.format || 'text') == 'datetime' && isValidDateValue">
                    <div class="cell-datetime">
                        <LucideCalendarDays :size="16" />
                        <div class="datetime-value">
                            <span class="value-date">{{ formatDate }}</span>
                            <span class="value-time">{{ formatTime }}</span>
                        </div>
                    </div>
                </template>

                <template v-else-if="(props.format || 'text') == 'label'">
                    <span class="cell-label">
                        {{ (props.item as any)[props.column] ?? '' }}
                    </span>
                </template>
    
                <template v-else>
                    <span class="cell-text">
                        {{ (props.item as any)[props.column] ?? '' }}
                    </span>
                </template>
            </template>
        </slot>
    </template>
</template>

<script lang="ts">
import type { Component } from 'vue';

export interface TableColumnProps<T> {
    /**
     * The name of this column, used to extract the content from the single items (if no default 
     * slot has been passed).
     */
    column?: string;

    /**
     * The label that is used as header fallback if no header slot is available.
     */
    label?: string | Component;

    /**
     * Additional set of properties passed to the label component.
     */
    labelProps?: { [key: string]: any };

    /**
     * An additional width for the individual column.
     */
    width?: string | number;

    /**
     * An additional text-alignment for the individual column.
     */
    align?: 'left' | 'right' | 'center' | 'justify';

    /**
     * An additional vertical alignment value for the individual column.
     */
    valign?: 'top' | 'middle' | 'bottom';

    /**
     * Additional column formatting, used when no default content slot is passed.
     */
    format?: 'text' | 'label' | 'actions' | 'datetime';

    /**
     * Whether the sort function should be available or not for this column.
     */
    sortable?: boolean;

    /**
     * The desired render type should be set exclusively by DateTable component.
     */
    type?: 'header' | 'content';

    /**
     * The single item of the passed dataset, should be set exclusively by DateTable component.
     */
    item?: T;

    /**
     * The loop iteration index, should be set exclusively by DateTable component.
     */
    index?: number | string;
}

export interface TableColumnSlots<T> {
    /**
     * The header slot content, used instead of the label fallback property.
     */
    header(): any;

    /**
     * The default content, used on the main table body.
     */
    default(props: { item: any | T, index: number | string }): any;
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'TableColumn'
}
</script>

<script lang="ts" generic="T" setup>
import { computed, ref } from 'vue';
import LucideCalendarDays from '../lucide/CalendarDays.vue';

// Define Component
const props = withDefaults(defineProps<TableColumnProps<T>>(), {
    align: 'left'
});
const slots = defineSlots<TableColumnSlots<T>>();

// States
const isValidDateValue = computed<boolean>(() => {
    if (typeof props.item != 'object' || !props.item || !props.column) {
        return false;
    }

    let temp = (props.item as any)[props.column] || null;
    if (!temp) {
        return false;
    }

    if (temp instanceof Date) {
        return true;
    } else {
        return !isNaN(Date.parse(temp));
    }
});

const formatDate = computed<string|null>(() => {
    if (isValidDateValue.value) {
        let temp = (props.item as any)[props.column as any];
        return (new Intl.DateTimeFormat('en-GB')).format(temp);
    } else {
        return null;
    }
});

const formatTime = computed<string|null>(() => {
    if (isValidDateValue.value) {
        let temp = (props.item as any)[props.column as any];
        return (new Intl.DateTimeFormat('en-GB', { timeStyle: 'short' })).format(temp);
    } else {
        return null;
    }
});
</script>

<style scoped>
:slotted(.cell-label) {
    @apply flex flex-row items-center gap-2 font-semibold;
}

:slotted(.cell-datetime) {
    @apply flex flex-row items-center gap-3;

    & .datetime-value {
        @apply flex flex-col text-xs font-semibold;
        @apply text-zinc-700 dark:text-zinc-300;
    }
}
</style>
