<template>
    <div class="grid max-w-xl gap-5">
        <div role="group" aria-label="Label states" class="flex flex-wrap gap-2">
            <Button
                v-for="state in states"
                :key="state"
                size="sm"
                :variant="previewArgs[state] ? 'primary' : 'outline'"
                :aria-pressed="!!previewArgs[state]"
                @click="toggle(state)">
                {{ state }}
            </Button>
        </div>
        <FormExamples mode="label" :args="previewArgs" :locale="locale" />
    </div>
</template>
<script setup lang="ts">
import { reactive, watch } from 'vue';
import { Button } from '../components/button';
import FormExamples from './FormExamples.vue';
const props = defineProps<{ args: Record<string, unknown>; locale: string }>();
const emit = defineEmits<{ change: [values: Record<string, boolean>] }>();
const previewArgs = reactive({ ...props.args });
watch(
    () => props.args,
    (value) => Object.assign(previewArgs, value),
    { deep: true },
);
const states = ['required', 'showValidation', 'valid', 'invalid'];
function toggle(key: string) {
    const value = !previewArgs[key];
    previewArgs[key] = value;
    emit('change', { [key]: value });
}
</script>
