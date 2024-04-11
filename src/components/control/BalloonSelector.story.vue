<template>
    <Story title="Form/Control/BalloonSelector" :layout="{ type: 'grid', width: '800px' }">
        <Variant title="Default" :init-state="stateDefault" v-slot="{ state }">
            <div class="p-2">
                <BalloonSelector v-bind="state" v-model="state.value" />
            </div>
        </Variant>

        <Variant title="Unselectable" :init-state="stateUnselectable" v-slot="{ state }">
            <div class="p-2">
                <BalloonSelector v-bind="state" v-model="state.value" />
            </div>
        </Variant>

        <Variant title="Multiple" :init-state="stateMultiple" v-slot="{ state }">
            <div class="p-2">
                <BalloonSelector v-bind="state" v-model="state.value" />
            </div>
        </Variant>

        <Variant title="Sizes" :init-state="stateSizes" v-slot="{ state }">
            <div class="flex flex-col gap-4 p-2">
                <div class="flex flex-row items-center gap-2">
                    <BalloonSelector v-bind="state" size="sm" v-model="state.valueSM" />
                    <BadgeStd label="32px" size="sm" class="ml-auto" />
                </div>
                <div class="flex flex-row items-center gap-2">
                    <BalloonSelector v-bind="state" v-model="state.valueMD" />
                    <BadgeStd label="default" size="sm" color="primary" class="ml-auto" />
                    <BadgeStd label="40px" size="sm" />
                </div>
                <div class="flex flex-row items-center gap-2">
                    <BalloonSelector v-bind="state" size="lg" v-model="state.valueLG" />
                    <BadgeStd label="56px" size="sm" class="ml-auto" />
                </div>
            </div>
        </Variant>

        <Variant title="Icons" :init-state="stateIcons" v-slot="{ state }">
            <div class="flex flex-col gap-4 p-2">
                <div class="flex flex-row gap-4">
                    <BalloonSelector v-bind="state" size="sm" v-model="state.valueSM" />
                </div>
                <div class="flex flex-row gap-4">
                    <BalloonSelector v-bind="state" v-model="state.valueMD" />
                </div>
                <div class="flex flex-row gap-4">
                    <BalloonSelector v-bind="state" size="lg" v-model="state.valueLG" />
                </div>
            </div>
        </Variant>

        <Variant title="Connected" :init-state="stateConnected" v-slot="{ state }">
            <div class="flex flex-col gap-4 p-2">
                <div class="flex flex-row gap-4">
                    <BalloonSelector v-bind="state" size="sm" v-model="state.valueSM" />
                </div>
                <div class="flex flex-row gap-4">
                    <BalloonSelector v-bind="state" v-model="state.valueMD" />
                </div>
                <div class="flex flex-row gap-4">
                    <BalloonSelector v-bind="state" size="lg" v-model="state.valueLG" />
                </div>
            </div>
        </Variant>

        <Variant title="Condensed" :init-state="stateCondensed" v-slot="{ state }">
            <div class="flex flex-col gap-4 p-2">
                <div class="flex flex-row gap-4">
                    <BalloonSelector v-bind="state" size="sm" v-model="state.valueSM" />
                </div>
                <div class="flex flex-row gap-4">
                    <BalloonSelector v-bind="state" v-model="state.valueMD" />
                </div>
                <div class="flex flex-row gap-4">
                    <BalloonSelector v-bind="state" size="lg" v-model="state.valueLG" />
                </div>
            </div>
        </Variant>

        <Variant title="Control States" :init-state="stateStates" v-slot="{ state }">
            <div class="flex flex-col items-center flex-1 gap-6">
                <FormControl label="Default" v-bind="state" v-model="state.value" v-slot="{ control }">
                    <BalloonSelector :options="state.options" v-bind="control" />
                </FormControl>
                <FormControl label="Selected" v-bind="state" v-model="state.valueSelected" v-slot="{ control }">
                    <BalloonSelector :options="state.options" v-bind="control" />
                </FormControl>
                <FormControl label="Disabled" v-bind="state" v-model="state.valueDisabled" v-slot="{ control }" disabled>
                    <BalloonSelector :options="state.options" v-bind="control" />
                </FormControl>
                <FormControl label="Disabled Selected" v-bind="state" v-model="state.valueDisabledSelected" v-slot="{ control }" disabled>
                    <BalloonSelector :options="state.options" v-bind="control" />
                </FormControl>
                <FormControl label="Valid" v-bind="state" v-model="state.valueValid" v-slot="{ control }" validation="valid" validation-message="This field is valid.">
                    <BalloonSelector :options="state.options" v-bind="control" />
                </FormControl>
                <FormControl label="Valid Selected" v-bind="state" v-model="state.valueValidSelected" v-slot="{ control }" validation="valid" validation-message="This field is valid.">
                    <BalloonSelector :options="state.options" v-bind="control" />
                </FormControl>
                <FormControl label="Invalid" v-bind="state" v-model="state.valueInvalid" v-slot="{ control }" validation="invalid" validation-message="This field is invalid.">
                    <BalloonSelector :options="state.options" v-bind="control" />
                </FormControl>
                <FormControl label="Invalid Selected" v-bind="state" v-model="state.valueInvalidSelected" v-slot="{ control }" validation="invalid" validation-message="This field is invalid.">
                    <BalloonSelector :options="state.options" v-bind="control" />
                </FormControl>
            </div>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
import { h, ref } from 'vue';
import BalloonSelector from './BalloonSelector.vue';
import BadgeStd from '../badge/BadgeStd.vue';
import FormControl from '../form/FormControl.vue';


const AlignLeft = {
    functional: true,
    props: {
        size: Number
    },
    render(props: any) {
        return h('svg', {
            xmlns: "http://www.w3.org/2000/svg",
            width: props?.size ?? 16,
            height: props?.size ?? 16,
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            class: "lucide lucide-align-left",
        }, [
            h('line', { x1: "21", x2: "3", y1: "6", y2: "6" }),
            h('line', { x1: "15", x2: "3", y1: "12", y2: "12" }),
            h('line', { x1: "17", x2: "3", y1: "18", y2: "18" }),
        ]);
    }
};

const AlignCenter = {
    functional: true,
    props: {
        size: Number
    },
    render(props: any) {
        return h('svg', {
            xmlns: "http://www.w3.org/2000/svg",
            width: props?.size ?? 16,
            height: props?.size ?? 16,
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            class: "lucide lucide-align-center",
        }, [
            h('line', { x1: "21", x2: "3", y1: "6", y2: "6"}),
            h('line', { x1: "17", x2: "7", y1: "12", y2: "12"}),
            h('line', { x1: "19", x2: "5", y1: "18", y2: "18"}),
        ]);
    }
};

const AlignRight = {
    functional: true,
    props: {
        size: Number
    },
    render(props: any) {
        return h('svg', {
            xmlns: "http://www.w3.org/2000/svg",
            width: props?.size ?? 16,
            height: props?.size ?? 16,
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            class: "lucide lucide-rat",
        }, [
            h('line', { x1: "21", x2: "3", y1: "6", y2: "6" }),
            h('line', { x1: "21", x2: "9", y1: "12", y2: "12" }),
            h('line', { x1: "21", x2: "7", y1: "18", y2: "18" }),
        ]);
    }
};

const options = [
    ['a', 'Option A'],
    ['b', 'Option B'],
    ['c', 'Option C'],
    {
        value: 'd',
        label: 'Disabled',
        disabled: true
    }
];

function stateDefault() {
    return {
        options,
        value: ref<string>()
    }
}

function stateUnselectable() {
    return {
        unselect: true,
        options,
        value: ref<string>()
    }
}

function stateMultiple() {
    return {
        multiple: true,
        options,
        value: ref<string>()
    }
}

function stateSizes() {
    return {
        options,
        valueSM: ref<string>(),
        valueMD: ref<string>(),
        valueLG: ref<string>()
    }
}

function stateIcons() {
    return {
        options: [
            {
                value: 'align-left',
                label: 'Align Left',
                icon: AlignLeft
            },
            {
                value: 'align-center',
                label: 'Align Center',
                icon: AlignCenter
            },
            {
                value: 'align-right',
                label: 'Align Right',
                icon: AlignRight
            }
        ],
        valueSM: ref<string>(),
        valueMD: ref<string>(),
        valueLG: ref<string>()
    }
}

function stateConnected() {
    return {
        connected: true,
        options: [
            {
                value: 'align-left',
                label: 'Align Left',
                icon: AlignLeft,
                placement: 'icon'
            },
            {
                value: 'align-center',
                label: 'Align Center',
                icon: AlignCenter,
                placement: 'icon'
            },
            {
                value: 'align-right',
                label: 'Align Right',
                icon: AlignRight,
                placement: 'icon'
            }
        ],
        valueSM: ref<string>(),
        valueMD: ref<string>(),
        valueLG: ref<string>()
    }
}

function stateCondensed() {
    return {
        connected: true,
        condensed: true,
        options: [
            {
                value: 'align-left',
                label: 'Align Left',
                icon: AlignLeft,
                placement: 'icon'
            },
            {
                value: 'align-center',
                label: 'Align Center',
                icon: AlignCenter,
                placement: 'icon'
            },
            {
                value: 'align-right',
                label: 'Align Right',
                icon: AlignRight,
                placement: 'icon'
            }
        ],
        valueSM: ref<string>(),
        valueMD: ref<string>(),
        valueLG: ref<string>()
    }
}

function stateStates() {
    return {
        options,
        description: 'FormControl description',
        valueNormal: ref<string>(),
        valueSelected: ref<string>('a'),
        valueDisabled: ref<string>(),
        valueDisabledSelected: ref<string>('a'),
        valueValid: ref<string>(),
        valueValidSelected: ref<string>('a'),
        valueInvalid: ref<string>(),
        valueInvalidSelected: ref<string>('a'),
    }
}
</script>

<docs lang="md">
The **BalloonSelector** form control field works similar to the **SelectableList**
component, but presents the specified options in a different way (also depending on the viewport 
size, of course). However, compared to the **SelectableList**, it is not recommended using this 
form control field for (many) long-labeled options.
</docs>
