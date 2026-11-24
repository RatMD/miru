<template>
    <div class="grid max-w-xl gap-6">
        <template v-if="mode === 'label'">
            <Label
                for="label-example"
                :class="String(args.class || '')"
                :required="!!args.required"
                :show-validation="!!args.showValidation"
                :valid="args.valid as boolean | undefined"
                :invalid="args.invalid as boolean | undefined">
                {{ args.label === 'Display name' ? copy.name : args.label || copy.name }}
            </Label>
            <Input
                id="label-example"
                v-model="text"
                :required="!!args.required"
                :aria-invalid="args.invalid as boolean | undefined" />
            <div class="grid gap-4">
                <Label required>{{ copy.required }}</Label>
                <Label valid :show-validation="!!args.showValidation">{{ copy.checked }}</Label>
                <Label invalid :show-validation="!!args.showValidation">{{ copy.failed }}</Label>
                <Label :show-validation="!!args.showValidation">{{ copy.untouched }}</Label>
            </div>
        </template>
        <template v-else-if="mode === 'field'">
            <Field v-bind="fieldProps">
                <FieldLabel for="field-example">{{ copy.name }}</FieldLabel>
                <Input
                    id="field-example"
                    v-model="text"
                    :aria-invalid="args.invalid as boolean | undefined" />
                <FieldDescription>{{ copy.fieldHint }}</FieldDescription>
            </Field>
            <Field valid :show-validation="!!args.showValidation">
                <FieldLabel for="valid-example">{{ copy.checked }}</FieldLabel>
                <Input id="valid-example" model-value="MIRU" aria-invalid="false" />
            </Field>
            <Field invalid :show-validation="!!args.showValidation">
                <FieldLabel for="invalid-example" required>{{ copy.failed }}</FieldLabel>
                <Input
                    id="invalid-example"
                    aria-invalid="true"
                    aria-describedby="invalid-example-error"
                    required />
                <FieldError id="invalid-example-error" :errors="[copy.invalidName]" />
            </Field>
        </template>
        <template v-else>
            <Label>{{ copy.prefix }}</Label>
            <InputGroup v-bind="groupProps">
                <InputGroupAddon><IconMail class="size-4" /></InputGroupAddon>
                <InputGroupInput
                    v-model="email"
                    type="email"
                    :aria-label="copy.email"
                    placeholder="alex@example.com" />
                <InputGroupAddon align="inline-end">
                    <InputGroupButton size="icon-xs" :aria-label="copy.clear" @click="email = ''">
                        <IconX class="size-4" />
                    </InputGroupButton>
                </InputGroupAddon>
            </InputGroup>
            <InputGroup v-bind="groupProps">
                <InputGroupAddon>
                    <IconWorld class="size-4" />
                    <InputGroupText>https://</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput
                    v-model="text"
                    :aria-label="copy.website"
                    placeholder="example.com" />
                <InputGroupAddon align="inline-end">
                    <IconExternalLink class="size-4" />
                </InputGroupAddon>
            </InputGroup>
            <Label>{{ copy.suffix }}</Label>
            <InputGroup v-bind="groupProps">
                <InputGroupAddon><IconCurrencyEuro class="size-4" /></InputGroupAddon>
                <InputGroupInput v-model="amount" inputmode="decimal" :aria-label="copy.amount" />
                <InputGroupAddon align="inline-end">
                    <InputGroupText>EUR</InputGroupText>
                    <IconCheck class="size-4 text-success" />
                </InputGroupAddon>
            </InputGroup>
            <InputGroup v-bind="groupProps">
                <InputGroupAddon><IconKey class="size-4" /></InputGroupAddon>
                <InputGroupInput
                    v-model="password"
                    :type="visible ? 'text' : 'password'"
                    :aria-label="copy.password" />
                <InputGroupAddon align="inline-end">
                    <InputGroupButton
                        size="icon-xs"
                        :aria-label="copy.password"
                        :aria-pressed="visible"
                        @click="visible = !visible">
                        <IconEye class="size-4" />
                    </InputGroupButton>
                </InputGroupAddon>
            </InputGroup>
            <Label>{{ copy.toolbar }}</Label>
            <InputGroup v-bind="groupProps">
                <InputGroupTextarea
                    v-model="notes"
                    :aria-label="copy.notes"
                    :placeholder="copy.details" />
                <InputGroupAddon align="block-end">
                    <IconInfoCircle class="size-4" />
                    <InputGroupText>{{ copy.count }}: {{ notes.length }}</InputGroupText>
                    <InputGroupButton
                        variant="primary"
                        class="ml-auto"
                        @click="feedback = copy.send">
                        <IconSend class="size-4" />
                        {{ copy.send }}
                    </InputGroupButton>
                </InputGroupAddon>
            </InputGroup>
            <output role="status">{{ feedback }}</output>
        </template>
    </div>
</template>
<script setup lang="ts">
import type { FieldVariants, InputGroupVariants } from '../index';
import {
    IconMail,
    IconWorld,
    IconExternalLink,
    IconCurrencyEuro,
    IconCheck,
    IconX,
    IconKey,
    IconEye,
    IconInfoCircle,
    IconSend,
} from '@tabler/icons-vue';
import { computed, ref } from 'vue';
import {
    Label,
    Field,
    FieldLabel,
    FieldDescription,
    FieldError,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
    InputGroupButton,
    InputGroupTextarea,
} from '../index';
import { formShowcaseCopy } from './form-showcase-copy';
const props = withDefaults(
    defineProps<{
        mode: 'label' | 'field' | 'groups';
        locale: string;
        args?: Record<string, unknown>;
    }>(),
    { args: () => ({}) },
);
const copy = computed(() => formShowcaseCopy[props.locale === 'de' ? 'de' : 'en']);
const fieldProps = computed(() => ({
    showValidation: !!props.args.showValidation,
    orientation: props.args.orientation as FieldVariants['orientation'],
    valid: props.args.valid as boolean | undefined,
    invalid: props.args.invalid as boolean | undefined,
}));
const groupProps = computed(() => ({
    size: props.args.size as 'sm' | 'default' | 'lg' | undefined,
    class: String(props.args.class || ''),
}));
const text = ref(''),
    email = ref(''),
    amount = ref('25.00'),
    password = ref('MIRU'),
    notes = ref(''),
    visible = ref(false),
    feedback = ref('');
</script>
