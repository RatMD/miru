<template>
    <div class="grid w-96 max-w-full gap-4">
        <Editable
            v-bind="args"
            v-model="value"
            :save="persist"
            aria-label="Project title"
            @saved="saved = $event" />
        <div class="space-y-1 rounded-md border border-border bg-muted/30 p-3 text-xs">
            <p>
                Value:
                <output data-testid="editable-value">{{ value }}</output>
            </p>
            <p>
                Saved:
                <output data-testid="editable-saved">{{ saved || '—' }}</output>
            </p>
        </div>
        <p v-if="asyncSave" class="text-xs text-muted-foreground">
            {{
                locale === 'de'
                    ? '„Rejected“ zeigt einen Speicherfehler.'
                    : 'Enter “Rejected” to try a failed save.'
            }}
        </p>
    </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { Editable } from '../components/editable';
const props = defineProps<{ args: Record<string, unknown>; locale: string; asyncSave?: boolean }>();
const value = ref(String(props.args.modelValue ?? 'MIRU project'));
const saved = ref('');
async function persist(next: string) {
    if (props.asyncSave) {
        await new Promise((resolve) => setTimeout(resolve, 400));
        if (next === 'Rejected') throw new Error('This title is already used.');
    }
    return next.trim();
}
watch(
    () => props.args.modelValue,
    (next) => {
        value.value = String(next ?? '');
    },
);
</script>
