<template>
    <Story title="Form/Control/CalendarField" :layout="{ type: 'grid', width: '400px' }">
        <Variant title="Default" :init-state="stateDefault" v-slot="{ state }">
            <CalendarField v-bind="state" v-model="state.value" />
        </Variant>

        <Variant title="Monday" :init-state="stateMonday" v-slot="{ state }">
            <CalendarField v-bind="state" v-model="state.value" />
        </Variant>

        <Variant title="Week Numbers" :init-state="stateNumbers" v-slot="{ state }">
            <CalendarField v-bind="state" v-model="state.value" />
        </Variant>

        <Variant title="Austrian" :init-state="stateAustrian" v-slot="{ state }">
            <CalendarField v-bind="state" v-model="state.value" />
        </Variant>

        <Variant title="Min/Max Range" :init-state="stateRange" v-slot="{ state }">
            <CalendarField v-bind="state" v-model="state.value" />
        </Variant>

        <Variant title="Date Ranges" :init-state="stateRanges" v-slot="{ state }">
            <CalendarField v-bind="state" v-model="state.value" />
        </Variant>

        <Variant title="Time" :init-state="stateTime" v-slot="{ state }">
            <CalendarField v-bind="state" v-model="state.value" />
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import CalendarField from './CalendarField.vue';

function stateDefault() {
    return {
        value: ref()
    }
}

function stateMonday() {
    return {
        weekStarts: 1,
        value: ref()
    }
}

function stateNumbers() {
    return {
        weekStarts: 1,
        weekNumbers: true,
        value: ref()
    }
}

function stateAustrian() {
    return {
        weekStarts: 1,
        locale: 'de-AT',
        value: ref()
    }
}

function stateRange() {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 10);

    return {
        minDate: new Date,
        maxDate,
        value: ref()
    }
}

function stateRanges() {
    const oldDate = new Date();
    oldDate.setDate(oldDate.getDate() - 7);
    const prevDate = new Date();
    prevDate.setDate(prevDate.getDate() - 1);
    const curDate = new Date();

    return {
        dates: [
            {
                type: 'holiday',
                value: '2024-01-01',
                label: 'New Year\'s Day'
            },
            {
                type: 'holiday',
                value: '2023-04-07',
                label: 'Good Friday'
            },
            {
                type: 'holiday',
                value: '2023-04-10',
                label: 'Easter Monday'
            },
            {
                type: 'holiday',
                value: '2023-05-01',
                label: 'Early May Bank Holiday'
            },
            {
                type: 'holiday',
                value: '2023-05-08',
                label: 'Bank holiday for the coronation of King Charles III'
            },
            {
                type: 'holiday',
                value: '2023-05-29',
                label: 'Spring Bank Holiday'
            },
            {
                type: 'holiday',
                value: '2023-08-28',
                label: 'Summer Bank Holiday'
            },
            {
                type: 'holiday',
                value: '2023-12-25',
                label: 'Christmas Day'
            },
            {
                type: 'holiday',
                value: '2023-12-26',
                label: 'Boxing Day'
            },
            {
                type: 'weekdays',
                value: [0, 6],
            },
            {
                type: 'range',
                value: [oldDate, prevDate],
            },
            {
                type: 'single',
                value: curDate,
            }
        ],
        value: ref()
    }
}

function stateTime() {
    return {
        time: true,
        value: ref()
    }
}
</script>

<docs lang="md">
The **CalendarField** control field component generates an interactive calendar widget. This can 
be further configured to allow a minimum / maximum selectable date, or with an additional list 
providing different disabled date statements, or adding an additional time selector or much more.

However, if you're looking for a smaller or simpler Date/Time selector field, take a look at the
**DateTimePicker** instead. It does not provide as many options as this one, but uses native control 
fields on mobile browsers, supporting a more intuitive and consistent user interface / experience 
on mobile devices.

PS.: Neither the **CalendarField** nor the **DateTimePicker** depend on an additional date/time
library, instead the browser native [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)
object is used for translating and formatting the respective values.
</docs>
