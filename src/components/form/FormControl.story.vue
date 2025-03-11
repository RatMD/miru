<template>
    <Story title="Form/FormControl" :layout="{ type: 'grid', width: '800px' }">
        <Variant title="Default" :init-state="stateDefault" v-slot="{ state }">
            <div clasS="p-2">
                <FormControl v-bind="state" v-model="state.value" v-slot="{ control }">
                    <InputField v-bind="control" />
                </FormControl>
            </div>
        </Variant>
        
        <Variant title="Label" :init-state="stateLabel" v-slot="{ state }">
            <div clasS="p-2">
                <FormControl v-bind="state" v-model="state.value" v-slot="{ control }">
                    <InputField v-bind="control" />
                </FormControl>
            </div>
        </Variant>

        <Variant title="Description" :init-state="stateDescription" v-slot="{ state }">
            <div clasS="p-2">
                <FormControl v-bind="state" v-model="state.value" v-slot="{ control }">
                    <InputField v-bind="control" />
                </FormControl>
            </div>
        </Variant>

        <Variant title="Disabled" :init-state="stateDisabled" v-slot="{ state }">
            <div clasS="p-2">
                <FormControl v-bind="state" v-model="state.value" v-slot="{ control }">
                    <InputField v-bind="control" />
                </FormControl>
            </div>
        </Variant>
        
        <Variant title="Required" :init-state="stateRequired" v-slot="{ state }">
            <div clasS="p-2">
                <FormControl v-bind="state" v-model="state.value" v-slot="{ control }">
                    <InputField v-bind="control" />
                </FormControl>
            </div>
        </Variant>
        
        <Variant title="Valid" :init-state="stateValid" v-slot="{ state }">
            <div class="flex flex-col gap-4 p-2">
                <FormControl v-bind="state" v-model="state.value" v-slot="{ control }">
                    <InputField placeholder="The validation message replaces the description, unless..." v-bind="control" />
                </FormControl>
                <FormControl v-bind="state" v-model="state.value" v-slot="{ control }" vad>
                    <InputField placeholder="... you add 'vad' on the FormControl component." v-bind="control" />
                </FormControl>
            </div>
        </Variant>
        
        <Variant title="Invalid" :init-state="stateInvalid" v-slot="{ state }">
            <div class="flex flex-col gap-4 p-2">
                <FormControl v-bind="state" v-model="state.value" v-slot="{ control }">
                    <InputField placeholder="The validation message replaces the description, unless..." v-bind="control" />
                </FormControl>
                <FormControl v-bind="state" v-model="state.value" v-slot="{ control }" vad>
                    <InputField placeholder="... you add 'vad' on the FormControl component." v-bind="control" />
                </FormControl>
            </div>
        </Variant>
        
        <Variant title="Icon" :init-state="stateIcon" v-slot="{ state }">
            <div class="flex flex-col gap-4 p-2">
                <FormControl v-bind="state" v-model="state.value" v-slot="{ control }">
                    <InputField placeholder="Some basic placeholder" v-bind="control" />
                </FormControl>
                <FormControl v-bind="state" v-model="state.value" v-slot="{ control }" loading>
                    <InputField placeholder="Some basic placeholder" v-bind="control" />
                </FormControl>
            </div>
        </Variant>
        
        <Variant title="Loading" :init-state="stateLoading" v-slot="{ state }">
            <div class="flex flex-col items-end gap-4 p-2">
                <FormControl class="w-full" v-bind="state" v-model="state.value" v-slot="{ control }">
                    <InputField placeholder="Some basic placeholder" v-bind="control" />
                </FormControl>
                <ButtonStd label="Toggle Loading State" size="sm" @click="state.loading = !state.loading" />
            </div>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import FormControl from './FormControl.vue';
import ButtonStd from '../button/ButtonStd.vue';
import InputField from '../control/InputField.vue';
import CalendarDays from '../lucide/CalendarDays.vue';

/**
 * Default State
 */
function stateDefault() {
    return {
        value: ref()
    }
}

/**
 * Disabled State
 */
function stateLabel() {
    return {
        value: ref(),
        label: 'Form Control Label',
    }
}

/**
 * Disabled State
 */
function stateDescription() {
    return {
        value: ref(),
        label: 'Form Control Label',
        description: 'Form Control Description',
    }
}

/**
 * Disabled State
 */
function stateDisabled() {
    return {
        value: ref(),
        label: 'Form Control Label',
        description: 'Form Control Description',
        disabled: true,
    }
}

/**
 * Required State
 */
function stateRequired() {
    return {
        value: ref(),
        label: 'Form Control Label',
        description: 'Form Control Description',
        required: true,
    }
}

/**
 * Valid State
 */
function stateValid() {
    return {
        value: ref(),
        label: 'Form Control Label',
        description: 'Form Control Description',
        validation: 'valid',
        validationMessage: 'This field is valid.'
    }
}

/**
 * Invalid State
 */
function stateInvalid() {
    return {
        value: ref(),
        label: 'Form Control Label',
        description: 'Form Control Description',
        validation: 'invalid',
        validationMessage: 'This field is invalid.'
    }
}

/**
 * Icon State
 */
function stateIcon() {
    return {
        value: ref(),
        icon: CalendarDays,
        iconProps: { class: 'size-4' },
        label: 'Form Control Label',
        description: 'Providing a custom icon for supported input fields.',
    }
}

/**
 * Loading State
 */
function stateLoading() {
    return {
        value: ref(),
        loading: ref(false),
        label: 'Form Control Label',
        description: 'Providing a custom icon for supported input fields.',
    }
}
</script>

<docs lang="md">
Work in Progress
</docs>
