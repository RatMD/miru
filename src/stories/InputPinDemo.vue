<template>
    <form class="grid max-w-xl gap-4" @submit.prevent="submit">
        <Field>
            <FieldLabel :for="id">
                {{ locale === 'de' ? 'Bestätigungscode' : 'Verification code' }}
            </FieldLabel>
            <InputPin
                v-bind="args"
                :id="id"
                v-model="value"
                :name="form ? 'pin' : undefined"
                :aria-label="locale === 'de' ? 'Bestätigungscode' : 'Verification code'"
                @complete="completed = $event">
                <template v-if="layout !== 'default'">
                    <InputPinGroup :connected="layout === 'mixed' ? true : undefined">
                        <InputPinSlot
                            v-for="index in firstLength"
                            :key="index"
                            :index="index - 1" />
                    </InputPinGroup>
                    <InputPinSeparator />
                    <InputPinGroup :connected="layout === 'mixed' ? false : undefined">
                        <InputPinSlot
                            v-for="index in secondLength"
                            :key="index"
                            :index="firstLength + index - 1" />
                    </InputPinGroup>
                </template>
            </InputPin>
        </Field>
        <div class="flex flex-wrap gap-2">
            <Button
                size="sm"
                variant="outline"
                type="button"
                @click="
                    value = '';
                    completed = '';
                ">
                Clear
            </Button>
            <Button
                size="sm"
                variant="outline"
                type="button"
                @click="
                    value = Array.from({ length: Number(args.maxlength ?? 6) }, (_, index) =>
                        String(index % 10),
                    ).join('')
                ">
                Fill example
            </Button>
            <Button v-if="form" size="sm" type="submit">Submit</Button>
        </div>
        <div class="space-y-1 rounded-md border border-border bg-muted/30 p-3 text-xs">
            <p>
                Value:
                <output data-testid="pin-value" class="font-mono">{{ value || '—' }}</output>
            </p>
            <p>
                Complete:
                <output data-testid="pin-complete" class="font-mono">{{ completed || '—' }}</output>
            </p>
            <p v-if="form">
                FormData:
                <output data-testid="pin-form" class="font-mono">{{ submitted || '—' }}</output>
            </p>
        </div>
    </form>
</template>
<script setup lang="ts">
import { computed, ref, useId, watch } from 'vue';
import { Button } from '../components/button';
import { Field, FieldLabel } from '../components/field';
import { InputPin, InputPinGroup, InputPinSlot, InputPinSeparator } from '../components/input-pin';
const props = withDefaults(
    defineProps<{
        args: Record<string, unknown>;
        locale: string;
        layout?: 'default' | 'grouped' | 'mixed';
        form?: boolean;
    }>(),
    { layout: 'default', form: false },
);
const id = useId();
const value = ref(String(props.args.modelValue ?? ''));
const completed = ref('');
const submitted = ref('');
const firstLength = computed(() => Math.ceil(Number(props.args.maxlength ?? 6) / 2));
const secondLength = computed(() => Math.floor(Number(props.args.maxlength ?? 6) / 2));
watch(
    () => props.args.modelValue,
    (next) => {
        value.value = String(next ?? '');
    },
);
function submit(event: Event) {
    submitted.value = String(new FormData(event.target as HTMLFormElement).get('pin'));
}
</script>
