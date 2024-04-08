<template>
    <Story title="Form/Control/TimeSlots" :layout="{ type: 'grid', width: '800px' }">
        <Variant title="Default" :init-state="stateDefault" v-slot="{ state }">
            <div class="max-w-[200px] mx-auto p-2">
                <TimeSlots :slots="prepareDefaultSlots()" v-bind="state" v-model="state.value" />
            </div>
        </Variant>

        <Variant title="Time-Slots" :init-state="stateDefault" v-slot="{ state }">
            <div class="max-w-[250px] mx-auto p-2">
                <TimeSlots :slots="timeSlots" v-bind="state" v-model="state.value" />
            </div>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import TimeSlots, { type TimeSlotOption } from './TimeSlots.vue';

// Default Slots
const defaultSlots = computed<TimeSlotOption[]>(() => {
    const datetime = new Date();
    const defaultSlots: TimeSlotOption[] = [];
    
    defaultSlots.push({
        date: new Date(datetime.getTime()),
        slots: 4
    });
    
    datetime.setDate(datetime.getDate()+1);
    defaultSlots.push({
        date: new Date(datetime.getTime()),
        slots: 1
    });
    
    datetime.setDate(datetime.getDate()+1);
    defaultSlots.push({
        date: new Date(datetime.getTime()),
        slots: 0
    });
    
    datetime.setDate(datetime.getDate()+1);
    defaultSlots.push({
        date: new Date(datetime.getTime()),
        slots: 2
    });
    return defaultSlots;
});

// Default Slots
const timeSlots = computed<TimeSlotOption[]>(() => {
    const datetime = new Date();
    const defaultSlots: TimeSlotOption[] = [];
    
    defaultSlots.push({
        date: new Date(datetime.getTime()),
        slots: [
            {
                start: '09:00',
                amount: 3
            },
            {
                start: '10:00',
                amount: 3
            },
            {
                start: '11:00',
                amount: 2
            },
            {
                start: '12:00',
                amount: 1
            }
        ]
    });
    
    datetime.setDate(datetime.getDate()+1);
    defaultSlots.push({
        date: new Date(datetime.getTime()),
        slots: [
            {
                start: '09:00',
                amount: 0
            },
            {
                start: '10:00',
                amount: 0
            },
            {
                start: '11:00',
                amount: 2
            },
            {
                start: '12:00',
                amount: 1
            }
        ]
    });
    return defaultSlots;
});

// Prepare Default Slots
function prepareDefaultSlots() {
    const datetime = new Date();
    const defaultSlots: TimeSlotOption[] = [];
    
    defaultSlots.push({
        date: new Date(datetime.getTime()),
        slots: 4
    });
    
    datetime.setDate(datetime.getDate()+1);
    defaultSlots.push({
        date: new Date(datetime.getTime()),
        slots: 1
    });
    
    datetime.setDate(datetime.getDate()+1);
    defaultSlots.push({
        date: new Date(datetime.getTime()),
        slots: 0
    });
    
    datetime.setDate(datetime.getDate()+1);
    defaultSlots.push({
        date: new Date(datetime.getTime()),
        slots: 2
    });
    return defaultSlots;
}

/**
 * States for the default variant
 * @returns
 */
function stateDefault() {
    return {
        value: ref()
    };
}
</script>

<docs lang="md">
</docs>
