<template>
    <div class="flex items-center gap-2">
        <Select v-model="selectedActionKey" :disabled="disabled">
            <SelectTrigger
                :aria-label="trans('common.datatable.bulk_actions')"
                size="sm"
                class="min-w-40">
                <SelectValue :placeholder="trans('common.datatable.bulk_actions')" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem
                    v-for="action in actions"
                    :key="action.key"
                    :value="action.key"
                    :disabled="!isAvailable(action)">
                    {{ action.label_key ? trans(action.label_key) : action.label }}
                </SelectItem>
            </SelectContent>
        </Select>

        <Button
            type="button"
            size="sm"
            :disabled="disabled || !selectedAction || !isAvailable(selectedAction)"
            @click="apply">
            {{ trans('common.actions.apply') }}
        </Button>
    </div>
</template>

<script setup lang="ts">
import type { ListActionConfiguration } from './contracts';
import { computed, ref, watch } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { Button } from '../button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select';
const { trans, transChoice, locale } = useI18n();

const props = defineProps<{
    actions: ListActionConfiguration[];
    selectedCount: number;
    disabled?: boolean;
}>();
const emit = defineEmits<{
    (event: 'apply', action: ListActionConfiguration): void;
}>();

const selectedActionKey = ref<string>();
const selectedAction = computed(() =>
    props.actions.find((action) => action.key === selectedActionKey.value),
);

watch(
    () => props.selectedCount,
    (count) => {
        if (count === 0 || (selectedAction.value && !isAvailable(selectedAction.value))) {
            selectedActionKey.value = undefined;
        }
    },
);

function isAvailable(action: ListActionConfiguration): boolean {
    return (
        props.selectedCount >= (action.min_selection ?? 1) &&
        props.selectedCount <= (action.max_selection ?? Number.POSITIVE_INFINITY)
    );
}

function apply(): void {
    if (selectedAction.value) emit('apply', selectedAction.value);
}
</script>
