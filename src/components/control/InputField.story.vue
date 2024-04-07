<template>
    <Story title="Form/Control/InputField" :layout="{ type: 'grid', width: '800px' }">
        <Variant title="Default" :init-state="stateDefault" v-slot="{ state }">
            <div class="p-2">
                <InputField v-bind="state" v-model="state.value" />
            </div>
        </Variant>
        
        <Variant title="Sizes" :init-state="stateSizes" v-slot="{ state }">
            <div class="flex flex-col gap-4 p-2">
                <InputField v-bind="state" size="sm" placeholder="32px height" v-model="state.valueSM" />
                <InputField v-bind="state" placeholder="40px height" v-model="state.valueMD" />
                <InputField v-bind="state" size="lg" placeholder="56px height" v-model="state.valueLG" />
            </div>
        </Variant>
        
        <Variant title="States" :init-state="stateStates" v-slot="{ state }">
            <div class="flex flex-row gap-4 p-2">
                <div class="flex flex-col flex-1 gap-4">
                    <InputField v-bind="state" placeholder="Default State" v-model="state.placeholderValueNormal" />
                    <InputField v-bind="state" placeholder="Disabled State" disabled v-model="state.placeholderValueDisabled" />
                    <InputField v-bind="state" placeholder="Readonly State" readonly v-model="state.placeholderValueReadonly" />
                    <InputField v-bind="state" placeholder="Valid State" validation="valid" v-model="state.placeholderValueValid" />
                    <InputField v-bind="state" placeholder="Invalid State" validation="invalid" v-model="state.placeholderValueInvalid" />
                </div>
                <div class="flex flex-col flex-1 gap-4">
                    <InputField v-bind="state" v-model="state.valueNormal" />
                    <InputField v-bind="state" v-model="state.valueDisabled" disabled />
                    <InputField v-bind="state" v-model="state.valueReadonly" readonly />
                    <InputField v-bind="state" v-model="state.valueValid" validation="valid" />
                    <InputField v-bind="state" v-model="state.valueInvalid" validation="invalid" />
                </div>
            </div>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import InputField from './InputField.vue';

function stateDefault() {
    return {
        placeholder: 'Placeholder',
        value: ref(),
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
    
<details>
  <summary class="cursor-pointer">Unsupported Types</summary>
  - <code class="font-semibold">button</code> – Use the [**ButtonStd**](/docs/components-buttons-button--docs) component instead.
  - <code class="font-semibold">checkbox</code> – Use the [**CheckboxField**](/docs/form-controls-checkboxfield--docs), [**SwitchField**](/docs/form-controls-switchfield--docs) or [**SelectableList**](/docs/form-controls-selectablelist--docs) component instead.
  - <code class="font-semibold">color</code> – Use the [**ColorPicker**](/docs/form-controls-colorpicker--docs) component instead.
  - <code class="font-semibold">hidden</code> – Use the native `<input type="hidden" />` element instead.
  - <code class="font-semibold">image</code> – You're joking, right?
  - <code class="font-semibold">radio</code> – Use the [**RadioField**](/docs/form-controls-radiofield--docs), [**BalloonSelector**](/docs/form-controls-balloonselector--docs) or [**SelectableList**](/docs/form-controls-selectablelist--docs) component instead.
  - <code class="font-semibold">range</code> – Use the [**RangeSlider**](/docs/form-controls-rangeslider--docs) component instead.
  - <code class="font-semibold">reset</code> – Use the [**ButtonStd**](/docs/components-buttons-button--docs) with `type="reset"` component instead.
  - <code class="font-semibold">submit</code> – Use the [**ButtonStd**](/docs/components-buttons-button--docs) with `type="submit"` component instead.
</details>

<details>
  <summary class="cursor-pointer">Semi-Supported Types</summary>
  - <code class="font-semibold">date</code> – Use the [**DateTimePicker**](/docs/form-controls-datetimepicker--docs) or [**CalendarField**](/docs/form-controls-calendarfield--docs) component instead.
  - <code class="font-semibold">datetime-local</code> – Use the [**DateTimePicker**](/docs/form-controls-datetimepicker--docs) or [**CalendarField**](/docs/form-controls-calendarfield--docs) component instead.
  - <code class="font-semibold">month</code> – Use the [**DateTimePicker**](/docs/form-controls-datetimepicker--docs) component instead.
  - <code class="font-semibold">number</code> – Use the [**NumberField**](/docs/form-controls-numberfield--docs) or [**PriceField**](/docs/form-controls-pricefield--docs) component instead.
  - <code class="font-semibold">password</code> – Use the [**PasswordField**](/docs/form-controls-passwordfield--docs) component instead.
  - <code class="font-semibold">time</code> – Use the [**DateTimePicker**](/docs/form-controls-datetimepicker--docs) or [**TimeFrameField**](/docs/form-controls-timeframefield--docs) component instead.
  - <code class="font-semibold">week</code> – Use the [**DateTimePicker**](/docs/form-controls-datetimepicker--docs) component instead.
</details>

<details>
  <summary class="cursor-pointer">Supported Types</summary>
  - <code class="font-semibold">email</code>
  - <code class="font-semibold">file</code>
  - <code class="font-semibold">search</code>
  - <code class="font-semibold">tel</code>
  - <code class="font-semibold">text</code>
  - <code class="font-semibold">url</code>
</details>
</docs>
