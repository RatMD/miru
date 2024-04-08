<template>
    <FormFieldGroup>
        <InputField v-bind="props" 
            type="time" 
            :step="props.seconds"
            v-model="valueStart" />
        <InputField v-bind="props" 
            type="time" 
            :step="props.seconds"
            v-model="valueEnd" />
    </FormFieldGroup>
</template>

<script lang="ts">
import type { MaybeRef } from 'vue';

/**
 * TimeFrame Properties
 */
export interface TimeFrameProps {
    /**
     * A custom time-frame field id, usually passed by the FormControl component. The default value is an 
     * auto-generated UUID.
     */
    id?: null | string;

    /**
     * The name attribute for this time-frame field.
     */
    name?: null | string;

    /**
     * The value for this time-frame field, must be passed as v-model value.
     */
    modelValue?: null | string;

    /**
     * The desired time between start and end using the 01:25:00 syntax (last part can be omitted).
     */
    between?: string;

    /**
     * The number of second increments to be used for the time. Select 60 to deactivate the seconds.
     */
    seconds?: number;

    /**
     * The desired size for this time-frame field, note that `md` is the default value.
     */
    size?: 'sm' | 'md' | 'lg';

    /**
     * The validation state for this time-frame field.
     */
    validation?: null | 'invalid' | 'valid';

    /**
     * Additional time-frame field validation message, requires the validation property set either to 
     * valid or invalid.
     */
    validationMessage?: null | string;

    /**
     * The disabled state for this time-frame field.
     */
    disabled?: MaybeRef<boolean>;

    /**
     * The readonly state for this time-frame field.
     */
    readonly?: MaybeRef<boolean>;

    /**
     * The required state for this time-frame field.
     */
    required?: MaybeRef<boolean>;
}

/**
 * TimeFrame Emits
 */
export interface TimeFrameEmits {
    /**
     * Update model value handler.
     */
    (event: 'update:modelValue', value: string | null): void;
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'TimeFrame'
}
</script>

<script lang="ts" setup>
import { computed, nextTick, ref, watch } from 'vue';
import InputField from '../control/InputField.vue';
import FormFieldGroup from '../form/FormFieldGroup.vue';

// Define Component
const props = withDefaults(defineProps<TimeFrameProps>(), {
    seconds: 60
});
const emits = defineEmits<TimeFrameEmits>();

// States
const valueStart = ref<null | string>(null);
const valueEnd = ref<null | string>(null);
const betweenTime = computed<null | { hours: number, minutes: number, seconds: number }>(() => {
    let between = props.between || '';
    if (!between || between.length == 0 || between.indexOf(':') < 0) {
        return null;
    }

    let result = splitTime(between);
    return {
        hours: result[0],
        minutes: result[1],
        seconds: result[2],
    };
});
const internal = ref<boolean>(false);

/**
 * Watch Value Changes
 */
watch([valueStart, valueEnd], async (newValue, oldValue) => {
    if (!props.between || internal.value) {
        return;
    }

    if (newValue[0] && newValue[0] != oldValue[0]) {
        internal.value = true;
        valueEnd.value = addBetween(newValue[0] as string);
        nextTick(() => internal.value = false);
    } else if (newValue[1] && newValue[1] != oldValue[1]) {
        internal.value = true;
        valueStart.value = subBetween(newValue[1] as string);
        nextTick(() => internal.value = false);
    }
});

/**
 * Split []:[]:[] string into numbers array
 * @param value 
 * @returns
 */
function splitTime(value: string): [number, number, number] {
    let split = value.split(':');
    let hours = parseInt(split[0] || '0');
    let minutes = parseInt(split[1] || '0');
    let seconds = parseInt(split[2] || '0');

    return [
        isNaN(hours) ? 0 : hours,
        isNaN(minutes) ? 0 : minutes,
        isNaN(seconds) ? 0 : seconds,
    ];
}

/**
 * Add Time
 * @param value 
 */
function addBetween(value: string) {
    if (!betweenTime.value) {
        return value;
    }

    let temp = splitTime(value);

    // Add Seconds
    temp[2] += betweenTime.value.seconds;
    if (temp[2] > 59) {
        temp[1]++;
        temp[2] = temp[2] % 60;
    }

    // Add minutes
    temp[1] += betweenTime.value.minutes;
    if (temp[1] > 59) {
        temp[0]++;
        temp[1] = temp[1] % 60;
    }

    // Add hours
    temp[0] += betweenTime.value.hours;
    if (temp[0] > 23) {
        temp[0] = temp[0] - 24;
    }

    // Return
    return temp.map(i => `00${i}`.slice(-2)).join(':');
}

/**
 * Subtract time
 * @param value 
 */
function subBetween(value: string) {
    if (!betweenTime.value) {
        return value;
    }
    
    let temp = splitTime(value);

    // Sub seconds
    temp[2] -= betweenTime.value.seconds;
    if (temp[2] < 0) {
        temp[1]--;
        temp[2] = 60 + temp[2];
    }

    // Sub minutes
    temp[1] -= betweenTime.value.minutes;
    if (temp[1] < 0) {
        temp[0]--;
        temp[1] = 60 + temp[1];
    }

    // Add hours
    temp[0] -= betweenTime.value.hours;
    if (temp[0] < 0) {
        temp[0] = 24 + temp[0];
    }

    // Return
    return temp.map(i => `00${i}`.slice(-2)).join(':');
}
</script>

<style scoped>
</style>
