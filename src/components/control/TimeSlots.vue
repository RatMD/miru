<template>
    <div class="field-time-slots">
        <template v-if="props.slots">
            <template v-for="(slot, idx) of generator()" :key="idx">
                <button 
                    type="button" 
                    class="time-slot-option" 
                    :class="[slot.selected ? 'is-selected' : '']"
                    :disabled="toValue(props.disabled) || slot.disabled || slot.amount == 0"
                    @click="onSelect(slot.value)">
                    <span>{{ slot.label }}</span>
                    <BadgeStd :label="slot.amount" size="sm" :color="slot.selected ? 'primary' : null" />
                </button>
            </template>
        </template>
    </div>
</template>

<script lang="ts">
import type { MaybeRef } from 'vue';
import type { SharedControlProps } from '../form/FormControl.vue';

export interface TimeSlotOption {
    /**
     * Parsable Date string or Date object.
     */
    date: string | Date;

    /**
     * The available time slots.
     */
    slots: number | {
        /**
         * Start Time (09:00)
         */
        start: string;

        /**
         * End Time (optional, could be 09:30 for a 30 min slot)
         */
        end?: string;

        /**
         * Amount of available / bookable slots.
         */
        amount: number;
    }[];

    /**
     * Allows to disable date/time strings.
     */
    disabled?: boolean;
}

/**
 * TimeSlots Properties
 */
export interface TimeSlotsProps extends SharedControlProps<null | string> {
    /**
     * The available slots to book.
     */
    slots?: TimeSlotOption[];

    /**
     * The desired size for this time-slots field, note that `md` is the default value.
     */
    size?: 'sm' | 'md' | 'lg';
}

/**
 * TimeSlots Emits
 */
export interface TimeSlotsEmits {
    /**
     * Update model value handler.
     */
    (event: 'update:modelValue', value: string | null): void;
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'TimeSlots'
}
</script>

<script lang="ts" setup>
import { computed, toValue } from 'vue';
import BadgeStd from '../badge/BadgeStd.vue';

// Define Component
const props = defineProps<TimeSlotsProps>();
const emits = defineEmits<TimeSlotsEmits>();

// States
const value = computed({
    get() {
        return props.modelValue || null;
    },
    set(value: null | string) {
        emits('update:modelValue', value);
    }
});

/**
 * Loop through the available slots
 * @returns
 */
function* generator(): Generator<{ label: string, value: string, amount: number, selected: boolean, disabled: boolean }> {
    if (!(props.slots && props.slots.length > 0)) {
        return;
    }

    for (const slot of props.slots) {
        if (typeof slot.slots == 'number') {
            const val = formatDate(slot.date);
            yield {
                label: val,
                value: val,
                amount: slot.slots,
                selected: value.value == val,
                disabled: typeof slot.disabled == 'boolean' ? slot.disabled : false
            }
        } else {
            for (const sub of slot.slots) {
                const val = formatDate(slot.date) + ` (${sub.start}${sub.end ? ` - ${sub.end}` : ''})`;
                yield {
                    label: val,
                    value: val,
                    amount: sub.amount,
                    selected: value.value == val,
                    disabled: typeof slot.disabled == 'boolean' ? slot.disabled : false
                }
            }
        }
    }
}

/**
 * Format Date String
 * @param date
 */
function formatDate(date: string | Date) {
    if (typeof date == 'string') {
        return date;
    } else {
        return [
            date.getFullYear().toString(),
            ('00' + (date.getMonth()+1)).slice(-2),
            ('00' + date.getDate()).slice(-2)
        ].join('-');
    }
}

/**
 * Select the desired value.
 * @param val
 */
function onSelect(val: string) {
    value.value = val;
}
</script>

<style scoped>
.field-time-slots {
    @apply w-full h-auto p-2 flex flex-col gap-1.5 border border-solid rounded-md overflow-x-auto outline-none shadow-none;
    @apply duration-200 ease-in-out;
    @apply bg-transparent border-gray-400 dark:border-gray-700;
    max-height: 300px;
}

.time-slot-option {
    @apply w-full px-3 py-1.5 basis-full shrink-0 grow-0 flex flex-row items-center justify-between gap-3 rounded-md;
    @apply duration-200 ease-in-out transition-colors;

    &:disabled {
        @apply cursor-not-allowed;
        @apply bg-gray-100 text-gray-500;
    }

    &:not(:disabled):hover {
        @apply bg-gray-200/50;
    }

    &:not(:disabled).is-selected {
        @apply bg-primary-600 text-primary-50;
    }

    & .option.label {
        @apply ml-auto;
    }

    &:deep(.badge) {
        @apply tabular-nums;
    }
}
</style>
