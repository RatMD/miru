<template>
    <Story title="Form/Control/BalloonSelector" :layout="{ type: 'grid', width: '800px' }">
        <Variant title="Default" :init-state="stateDefault" v-slot="{ state }">
            <BalloonSelector v-bind="state" v-model="state.value" />
        </Variant>

        <Variant title="Unselectable" :init-state="stateUnselectable" v-slot="{ state }">
            <BalloonSelector v-bind="state" v-model="state.value" />
        </Variant>

        <Variant title="Multiple" :init-state="stateMultiple" v-slot="{ state }">
            <BalloonSelector v-bind="state" v-model="state.value" />
        </Variant>

        <Variant title="Sizes" :init-state="stateSizes" v-slot="{ state }">
            <div class="flex flex-col gap-4">
                <BalloonSelector v-bind="state" size="sm" placeholder="40px height" v-model="state.valueSM" />
                <BalloonSelector v-bind="state" placeholder="48px height" v-model="state.valueMD" />
                <BalloonSelector v-bind="state" size="lg" placeholder="56px height" v-model="state.valueLG" />
            </div>
        </Variant>

        <Variant title="Icons" :init-state="stateIcons" v-slot="{ state }">
            <div class="flex flex-col gap-4">
                <div class="flex flex-row gap-4">
                    <BalloonSelector v-bind="state" size="sm" placeholder="40px height" v-model="state.valueSM" />
                    <BalloonSelector v-bind="state" size="sm" placeholder="40px height" v-model="state.valueSM" />
                </div>
                <div class="flex flex-row gap-4">
                    <BalloonSelector v-bind="state" placeholder="48px height" v-model="state.valueMD" />
                    <BalloonSelector v-bind="state" placeholder="48px height" v-model="state.valueMD" />
                </div>
                <div class="flex flex-row gap-4">
                    <BalloonSelector v-bind="state" size="lg" placeholder="56px height" v-model="state.valueLG" />
                    <BalloonSelector v-bind="state" size="lg" placeholder="56px height" v-model="state.valueLG" />
                </div>
            </div>
        </Variant>

        <Variant title="Connected" :init-state="stateConnected" v-slot="{ state }">
            <div class="flex flex-col gap-4">
                <div class="flex flex-row gap-4">
                    <BalloonSelector v-bind="state" size="sm" placeholder="40px height" v-model="state.valueSM" />
                    <BalloonSelector v-bind="state" size="sm" placeholder="40px height" v-model="state.valueSM" />
                </div>
                <div class="flex flex-row gap-4">
                    <BalloonSelector v-bind="state" placeholder="48px height" v-model="state.valueMD" />
                    <BalloonSelector v-bind="state" placeholder="48px height" v-model="state.valueMD" />
                </div>
                <div class="flex flex-row gap-4">
                    <BalloonSelector v-bind="state" size="lg" placeholder="56px height" v-model="state.valueLG" />
                    <BalloonSelector v-bind="state" size="lg" placeholder="56px height" v-model="state.valueLG" />
                </div>
            </div>
        </Variant>

        <Variant title="Condensed" :init-state="stateCondensed" v-slot="{ state }">
            <div class="flex flex-col gap-4">
                <div class="flex flex-row gap-4">
                    <BalloonSelector v-bind="state" size="sm" placeholder="40px height" v-model="state.valueSM" />
                    <BalloonSelector v-bind="state" size="sm" placeholder="40px height" v-model="state.valueSM" />
                </div>
                <div class="flex flex-row gap-4">
                    <BalloonSelector v-bind="state" placeholder="48px height" v-model="state.valueMD" />
                    <BalloonSelector v-bind="state" placeholder="48px height" v-model="state.valueMD" />
                </div>
                <div class="flex flex-row gap-4">
                    <BalloonSelector v-bind="state" size="lg" placeholder="56px height" v-model="state.valueLG" />
                    <BalloonSelector v-bind="state" size="lg" placeholder="56px height" v-model="state.valueLG" />
                </div>
            </div>
        </Variant>

        <Variant title="States" :init-state="stateStates" v-slot="{ state }">
            <div class="flex flex-col flex-1 gap-4">
                <div class="flex flex-row items-center flex-1 gap-4">
                    <div class="basis-36">Default</div>
                    <BalloonSelector v-bind="state" v-model="state.valueNormal" />
                </div>
                <div class="flex flex-row items-center flex-1 gap-4">
                    <div class="basis-36">Selected</div>
                    <BalloonSelector v-bind="state" v-model="state.valueSelected" />
                </div>
                <div class="flex flex-row items-center flex-1 gap-4">
                    <div class="basis-36">Disabled</div>
                    <BalloonSelector v-bind="state" disabled v-model="state.valueDisabled" />
                </div>
                <div class="flex flex-row items-center flex-1 gap-4">
                    <div class="basis-36">Disabled Selected</div>
                    <BalloonSelector v-bind="state" disabled v-model="state.valueDisabledSelected" />
                </div>
                <div class="flex flex-row items-center flex-1 gap-4">
                    <div class="basis-36">Valid</div>
                    <BalloonSelector v-bind="state" validation="valid" v-model="state.valueValid" />
                </div>
                <div class="flex flex-row items-center flex-1 gap-4">
                    <div class="basis-36">Valid Selected</div>
                    <BalloonSelector v-bind="state" validation="valid" v-model="state.valueValidSelected" />
                </div>
                <div class="flex flex-row items-center flex-1 gap-4">
                    <div class="basis-36">Invalid</div>
                    <BalloonSelector v-bind="state" validation="invalid" v-model="state.valueInvalid" />
                </div>
                <div class="flex flex-row items-center flex-1 gap-4">
                    <div class="basis-36">Invalid Selected</div>
                    <BalloonSelector v-bind="state" validation="invalid" v-model="state.valueInvalidSelected" />
                </div>
            </div>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
import { h, ref } from 'vue';
import BalloonSelector from './BalloonSelector.vue';


const AlignLeft = {
    functional: true,
    props: {
        size: Number
    },
    render(ctx: any) {
        return h('svg', {
            xmlns: "http://www.w3.org/2000/svg",
            width: ctx?.props?.size ?? 16,
            height: ctx?.props?.size ?? 16,
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
    render(ctx: any) {
        return h('svg', {
            xmlns: "http://www.w3.org/2000/svg",
            width: ctx?.props?.size ?? 16,
            height: ctx?.props?.size ?? 16,
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
    render(ctx: any) {
        return h('svg', {
            xmlns: "http://www.w3.org/2000/svg",
            width: ctx?.props?.size ?? 16,
            height: ctx?.props?.size ?? 16,
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
