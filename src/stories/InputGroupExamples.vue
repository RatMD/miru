<template>
    <div class="grid max-w-xl gap-6">
        <Field v-if="example === 'email'" :aria-invalid="invalid">
            <FieldLabel :for="id + '-email'">{{ copy.email }}</FieldLabel>
            <InputGroup v-bind="groupProps">
                <InputGroupAddon><IconMail class="size-4" /></InputGroupAddon>
                <InputGroupInput
                    :id="id + '-email'"
                    v-model="email"
                    type="email"
                    :aria-invalid="invalid"
                    :aria-describedby="invalid ? id + '-error' : undefined"
                    placeholder="alex@example.com" />
                <InputGroupAddon align="inline-end">
                    <InputGroupButton size="icon-xs" :aria-label="copy.clear" @click="email = ''">
                        <IconX class="size-4" />
                    </InputGroupButton>
                </InputGroupAddon>
            </InputGroup>
            <FieldError v-if="invalid" :id="id + '-error'" :errors="[copy.invalidEmail]" />
        </Field>
        <template v-else-if="example === 'prefix'">
            <Field>
                <FieldLabel :for="id + '-url'">{{ copy.website }}</FieldLabel>
                <InputGroup v-bind="groupProps">
                    <InputGroupAddon>
                        <IconWorld class="size-4" />
                        <InputGroupText>https://</InputGroupText>
                    </InputGroupAddon>
                    <InputGroupInput
                        :id="id + '-url'"
                        v-model="website"
                        placeholder="example.com" />
                    <InputGroupAddon align="inline-end">
                        <InputGroupText>.com</InputGroupText>
                    </InputGroupAddon>
                </InputGroup>
            </Field>
            <Field>
                <FieldLabel :for="id + '-amount'">{{ copy.amount }}</FieldLabel>
                <InputGroup v-bind="groupProps">
                    <InputGroupAddon><IconCurrencyEuro class="size-4" /></InputGroupAddon>
                    <InputGroupInput :id="id + '-amount'" v-model="amount" inputmode="decimal" />
                    <InputGroupAddon align="inline-end">
                        <InputGroupText>EUR</InputGroupText>
                    </InputGroupAddon>
                </InputGroup>
            </Field>
        </template>
        <Field v-else-if="example === 'password'">
            <FieldLabel :for="id + '-password'">{{ copy.password }}</FieldLabel>
            <InputGroup v-bind="groupProps">
                <InputGroupAddon><IconKey class="size-4" /></InputGroupAddon>
                <InputGroupInput
                    :id="id + '-password'"
                    v-model="password"
                    :type="visible ? 'text' : 'password'" />
                <InputGroupAddon align="inline-end">
                    <InputGroupButton
                        size="icon-xs"
                        :aria-label="copy.password"
                        :aria-pressed="visible"
                        @click="visible = !visible">
                        <component :is="visible ? IconEyeOff : IconEye" class="size-4" />
                    </InputGroupButton>
                </InputGroupAddon>
            </InputGroup>
        </Field>
        <Field v-else-if="example === 'textarea'">
            <FieldLabel :for="id + '-notes'">{{ copy.notes }}</FieldLabel>
            <InputGroup v-bind="groupProps">
                <InputGroupAddon align="block-start">
                    <IconInfoCircle class="size-4" />
                    <InputGroupText>{{ copy.details }}</InputGroupText>
                </InputGroupAddon>
                <InputGroupTextarea
                    :id="id + '-notes'"
                    v-model="notes"
                    :maxlength="250"
                    :placeholder="copy.details" />
                <InputGroupAddon align="block-end">
                    <InputGroupText>{{ notes.length }} / 250</InputGroupText>
                    <InputGroupButton
                        variant="primary"
                        class="ml-auto"
                        :disabled="!notes.trim()"
                        @click="feedback = copy.send + ' ✓'">
                        <IconSend class="size-4" />
                        {{ copy.send }}
                    </InputGroupButton>
                </InputGroupAddon>
            </InputGroup>
            <output role="status" class="text-sm text-success">{{ feedback }}</output>
        </Field>
        <Field v-for="size in example === 'sizes' ? sizes : []" :key="size">
            <FieldLabel :for="id + size">{{ size }}</FieldLabel>
            <InputGroup :size="size">
                <InputGroupAddon><IconMail class="size-4" /></InputGroupAddon>
                <InputGroupInput :id="id + size" :placeholder="copy.email" />
                <InputGroupAddon align="inline-end">
                    <InputGroupButton size="icon-xs" :aria-label="copy.send">
                        <IconSend class="size-4" />
                    </InputGroupButton>
                </InputGroupAddon>
            </InputGroup>
        </Field>
        <Field v-if="example === 'disabled'" data-disabled="true">
            <FieldLabel :for="id + '-disabled'">{{ copy.email }}</FieldLabel>
            <InputGroup v-bind="groupProps" class="opacity-50">
                <InputGroupAddon><IconMail class="size-4" /></InputGroupAddon>
                <InputGroupInput :id="id + '-disabled'" model-value="alex@example.com" disabled />
                <InputGroupAddon align="inline-end">
                    <InputGroupButton size="icon-xs" disabled :aria-label="copy.clear">
                        <IconX class="size-4" />
                    </InputGroupButton>
                </InputGroupAddon>
            </InputGroup>
        </Field>
    </div>
</template>
<script setup lang="ts">
import {
    IconMail,
    IconX,
    IconWorld,
    IconCurrencyEuro,
    IconKey,
    IconEye,
    IconEyeOff,
    IconSend,
    IconInfoCircle,
} from '@tabler/icons-vue';
import { computed, ref, useId } from 'vue';
import { Field, FieldLabel, FieldError } from '../components/field';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupTextarea,
    InputGroupText,
    InputGroupButton,
} from '../components/input-group';
import { formShowcaseCopy } from './form-showcase-copy';
const props = withDefaults(
    defineProps<{
        locale?: string;
        args?: Record<string, unknown>;
        example?: 'email' | 'prefix' | 'password' | 'textarea' | 'sizes' | 'disabled';
        invalid?: boolean;
    }>(),
    { locale: 'en', args: () => ({}), example: 'email' },
);
const id = useId();
const copy = computed(() => formShowcaseCopy[props.locale === 'de' ? 'de' : 'en']);
const groupProps = computed(() => ({
    size: props.args.size as 'sm' | 'default' | 'lg' | undefined,
    class: String(props.args.class || ''),
}));
const sizes = ['sm', 'default', 'lg'] as const;
const email = ref('alex@example.com'),
    website = ref('miru'),
    amount = ref('25.00'),
    password = ref('MIRU'),
    visible = ref(false),
    notes = ref(''),
    feedback = ref('');
</script>
