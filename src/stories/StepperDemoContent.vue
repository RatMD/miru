<template>
    <div class="grid gap-4" data-testid="step-content" :data-step="step">
        <template v-if="step === 1">
            <h3 class="text-base font-semibold">
                {{ de ? 'Sendung erfassen' : 'Shipment details' }}
            </h3>
            <div class="grid gap-2">
                <Label :for="id" required>{{ de ? 'Name' : 'Name' }}</Label>
                <Input
                    :id="id"
                    :model-value="modelValue"
                    :disabled="disabled"
                    :aria-invalid="invalid || undefined"
                    autocomplete="name"
                    :placeholder="de ? 'Name des Empfängers' : 'Recipient name'"
                    @update:model-value="emit('update:modelValue', String($event))" />
            </div>
            <p class="text-sm text-muted-foreground">
                {{
                    de
                        ? 'Die Eingaben bleiben beim Wechsel der Schritte erhalten.'
                        : 'Your entries are preserved when switching steps.'
                }}
            </p>
        </template>
        <template v-else-if="step === 2">
            <h3 class="text-base font-semibold">
                {{ de ? 'Lieferung auswählen' : 'Choose delivery' }}
            </h3>
            <div
                class="grid grid-cols-1 gap-3 sm:grid-cols-2"
                role="group"
                :aria-label="de ? 'Lieferart' : 'Delivery method'">
                <Button
                    v-for="choice in choices"
                    :key="choice.value"
                    variant="outline"
                    :disabled="disabled"
                    :aria-pressed="delivery === choice.value"
                    class="h-auto min-h-24 flex-col gap-3 whitespace-normal p-5"
                    :class="delivery === choice.value ? 'border-primary bg-primary/5' : ''"
                    @click="emit('update:delivery', choice.value)">
                    <component :is="choice.icon" class="size-6" />
                    {{ choice.label }}
                </Button>
            </div>
        </template>
        <template v-else-if="step === 3">
            <h3 class="text-base font-semibold">{{ de ? 'Angaben prüfen' : 'Review details' }}</h3>
            <dl class="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
                <dt class="text-muted-foreground">Name</dt>
                <dd>{{ modelValue || '—' }}</dd>
                <dt class="text-muted-foreground">{{ de ? 'Lieferung' : 'Delivery' }}</dt>
                <dd>
                    {{
                        delivery === 'standard'
                            ? de
                                ? 'Standardlieferung'
                                : 'Standard delivery'
                            : de
                              ? 'Abholung'
                              : 'Collection'
                    }}
                </dd>
            </dl>
        </template>
        <template v-else>
            <h3 class="text-base font-semibold">
                {{ de ? 'Auftrag abschließen' : 'Complete order' }}
            </h3>
            <p class="text-sm text-muted-foreground">
                {{
                    de
                        ? 'Mit Abschließen wird der Auftrag gespeichert.'
                        : 'Complete saves the order.'
                }}
            </p>
        </template>
    </div>
</template>
<script setup lang="ts">
import { IconTruck, IconLogin2 } from '@tabler/icons-vue';
import { computed, useId } from 'vue';
import { Button } from '../components/button';
import { Input } from '../components/input';
import { Label } from '../components/label';
const props = defineProps<{
    step: number;
    modelValue: string;
    delivery: string;
    de: boolean;
    disabled?: boolean;
    invalid?: boolean;
}>();
const emit = defineEmits<{
    'update:modelValue': [value: string];
    'update:delivery': [value: string];
}>();
const id = `stepper-recipient-${useId()}`;
const choices = computed(() => [
    {
        value: 'standard',
        label: props.de ? 'Standardlieferung' : 'Standard delivery',
        icon: IconTruck,
    },
    { value: 'collection', label: props.de ? 'Abholung' : 'Collection', icon: IconLogin2 },
]);
</script>
