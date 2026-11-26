<template>
    <div class="grid w-80 max-w-full gap-3">
        <Label :for="id">{{ locale === 'de' ? 'Berufsbezeichnung' : 'Job title' }}</Label>
        <AutoComplete
            v-if="!grouped"
            v-bind="args"
            :id="id"
            v-model="value"
            :options="suggestions"
            :loading="remote ? loading : !!args.loading"
            :ignore-filter="remote"
            :ariaLabel="locale === 'de' ? 'Berufsbezeichnung' : 'Job title'"
            placeholder="Type or choose…" />
        <AutoComplete v-else v-model="value">
            <AutoCompleteAnchor class="w-full">
                <AutoCompleteInput :id="id" aria-label="Job title" />
            </AutoCompleteAnchor>
            <AutoCompleteList>
                <AutoCompleteViewport>
                    <AutoCompleteEmpty>No suggestions</AutoCompleteEmpty>
                    <AutoCompleteGroup heading="Design">
                        <AutoCompleteItem value="Product Designer">
                            Product Designer
                        </AutoCompleteItem>
                        <AutoCompleteItem value="UX Researcher">UX Researcher</AutoCompleteItem>
                    </AutoCompleteGroup>
                    <AutoCompleteSeparator />
                    <AutoCompleteGroup heading="Engineering">
                        <AutoCompleteItem value="Frontend Developer">
                            Frontend Developer
                        </AutoCompleteItem>
                        <AutoCompleteItem value="Backend Developer">
                            Backend Developer
                        </AutoCompleteItem>
                    </AutoCompleteGroup>
                </AutoCompleteViewport>
            </AutoCompleteList>
        </AutoComplete>
        <output
            data-testid="autocomplete-value"
            class="rounded-md border border-border bg-muted/30 p-3 text-xs font-mono">
            {{ value || '—' }}
        </output>
    </div>
</template>
<script setup lang="ts">
import { ref, useId, watch } from 'vue';
import {
    AutoComplete,
    AutoCompleteAnchor,
    AutoCompleteInput,
    AutoCompleteList,
    AutoCompleteViewport,
    AutoCompleteEmpty,
    AutoCompleteGroup,
    AutoCompleteSeparator,
    AutoCompleteItem,
} from '../components/auto-complete';
import { Label } from '../components/label';
const props = defineProps<{
    args: Record<string, unknown>;
    locale: string;
    grouped?: boolean;
    remote?: boolean;
}>();
const id = useId();
const value = ref(String(props.args.modelValue ?? ''));
const options = ['Frontend Developer', 'Backend Developer', 'Product Designer', 'UX Researcher'];
const suggestions = ref<readonly string[]>(options);
const loading = ref(false);
let request = 0;
watch(value, async (next) => {
    if (!props.remote) return;
    const token = ++request;
    loading.value = true;
    await new Promise((resolve) => setTimeout(resolve, 300));
    if (token !== request) return;
    suggestions.value = options.filter((option) =>
        option.toLowerCase().includes(next.toLowerCase()),
    );
    loading.value = false;
});
watch(
    () => props.args.modelValue,
    (next) => {
        value.value = String(next ?? '');
    },
);
</script>
