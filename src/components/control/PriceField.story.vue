<template>
    <Story title="Form/Control/PriceField" :layout="{ type: 'grid', width: '800px' }">
        <Variant title="Default" :init-state="stateDefault" v-slot="{ state }">
            <div class="max-w-[400px] mx-auto p-2">
                <PriceField v-bind="state" v-model="state.value" />
            </div>
        </Variant>
        
        <Variant title="Currencies" :init-state="stateCurrencies" v-slot="{ state }">
            <div class="max-w-[400px] mx-auto flex flex-col gap-4 p-2">
                <PriceField v-bind="state" v-model="state.value" placeholder="currency" icon="currency" />
                <PriceField v-bind="state" v-model="state.value" placeholder="bitcoin" icon="bitcoin" />
                <PriceField v-bind="state" v-model="state.value" placeholder="dollar" icon="dollar" />
                <PriceField v-bind="state" v-model="state.value" placeholder="euro" icon="euro" />
                <PriceField v-bind="state" v-model="state.value" placeholder="gem" icon="gem" />
                <PriceField v-bind="state" v-model="state.value" placeholder="yen" icon="yen" />
                <PriceField v-bind="state" v-model="state.value" placeholder="percent" icon="percent" />
                <PriceField v-bind="state" v-model="state.value" placeholder="sterling" icon="sterling" />
                <PriceField v-bind="state" v-model="state.value" placeholder="ruble" icon="ruble" />
                <PriceField v-bind="state" v-model="state.value" placeholder="franc" icon="franc" />
                <PriceField v-bind="state" v-model="state.value" placeholder="Custom Icon" :icon="icon" />
            </div>
        </Variant>
        
        <Variant title="Sizes" :init-state="stateSizes" v-slot="{ state }">
            <div class="max-w-[400px] mx-auto flex flex-col gap-4 p-2">
                <PriceField v-bind="state" size="sm" placeholder="32px height" v-model="state.valueSM" />
                <PriceField v-bind="state" placeholder="40px height" v-model="state.valueMD" />
                <PriceField v-bind="state" size="lg" placeholder="56px height" v-model="state.valueLG" />
            </div>
        </Variant>
        
        <Variant title="States" :init-state="stateStates" v-slot="{ state }">
            <div class="max-w-[600px] mx-auto flex flex-row gap-4 p-2">
                <div class="flex flex-col flex-1 gap-4">
                    <PriceField v-bind="state" placeholder="Default State" v-model="state.placeholderValueNormal" />
                    <PriceField v-bind="state" placeholder="Disabled State" disabled v-model="state.placeholderValueDisabled" />
                    <PriceField v-bind="state" placeholder="Readonly State" readonly v-model="state.placeholderValueReadonly" />
                    <PriceField v-bind="state" placeholder="Valid State" validation="valid" v-model="state.placeholderValueValid" />
                    <PriceField v-bind="state" placeholder="Invalid State" validation="invalid" v-model="state.placeholderValueInvalid" />
                </div>
                <div class="flex flex-col flex-1 gap-4">
                    <PriceField v-bind="state" v-model="state.valueNormal" />
                    <PriceField v-bind="state" v-model="state.valueDisabled" disabled />
                    <PriceField v-bind="state" v-model="state.valueReadonly" readonly />
                    <PriceField v-bind="state" v-model="state.valueValid" validation="valid" />
                    <PriceField v-bind="state" v-model="state.valueInvalid" validation="invalid" />
                </div>
            </div>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
import { h, ref } from 'vue';
import PriceField from './PriceField.vue';

const icon = {
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
            h('path', { d: "M17 5c0-1.7-1.3-3-3-3s-3 1.3-3 3c0 .8.3 1.5.8 2H11c-3.9 0-7 3.1-7 7v0c0 2.2 1.8 4 4 4" }),
            h('path', { d: "M16.8 3.9c.3-.3.6-.5 1-.7 1.5-.6 3.3.1 3.9 1.6.6 1.5-.1 3.3-1.6 3.9l1.6 2.8c.2.3.2.7.2 1-.2.8-.9 1.2-1.7 1.1 0 0-1.6-.3-2.7-.6H17c-1.7 0-3 1.3-3 3" }),
            h('path', { d: "M13.2 18a3 3 0 0 0-2.2-5" }),
            h('path', { d: "M13 22H4a2 2 0 0 1 0-4h12" }),
            h('path', { d: "M16 9h.01" }),
        ]);
    }
};

function stateDefault() {
    return {
        icon: 'currency',
        decimals: 2,
        value: ref(),
    }
}

function stateCurrencies() {
    return {

    }
}

function stateSizes() {
    return {
        placeholder: 'Placeholder',
        valueSM: ref(),
        valueMD: ref(),
        valueLG: ref(),
    }
}

function stateStates() {
    return {
        placeholderValueNormal: ref<string>(''),
        placeholderValueDisabled: ref<string>(''),
        placeholderValueReadonly: ref<string>(''),
        placeholderValueValid: ref<string>(''),
        placeholderValueInvalid: ref<string>(''),
        valueNormal: ref<string>('Default State'),
        valueDisabled: ref<string>('Disabled State'),
        valueReadonly: ref<string>('Readonly State'),
        valueValid: ref<string>('Valid State'),
        valueInvalid: ref<string>('Invalid State'),
    }
}
</script>

<docs lang="md">
Work in Progress
</docs>
