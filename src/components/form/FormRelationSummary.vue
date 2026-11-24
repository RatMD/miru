<template>
    <div class="divide-y rounded-md border">
        <p v-if="items.length === 0" class="px-4 py-10 text-center text-sm text-muted-foreground">
            <FormText :text="emptyLabel" />
        </p>
        <template v-else>
            <div
                v-for="item in items"
                :key="item.id"
                class="flex items-center justify-between gap-4 px-4 py-3">
                <slot name="item" :item="item">
                    <div class="min-w-0">
                        <p class="truncate text-sm font-medium">{{ item.label }}</p>
                        <p v-if="item.description" class="truncate text-xs text-muted-foreground">
                            {{ item.description }}
                        </p>
                    </div>
                    <Button v-if="item.href" type="button" variant="ghost" size="sm" as-child>
                        <Link :href="item.href">{{ trans('common.actions.open') }}</Link>
                    </Button>
                </slot>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import type { FormText as FormTextDefinition } from './types';
import { Link } from '@inertiajs/vue3';
import { useI18n } from '../../composables/useI18n';
import { Button } from '../button';
import FormText from './FormText.vue';
import { translated } from './types';
export interface FormRelationSummaryItem {
    id: string;
    label: string;
    description?: string;
    href?: string;
}

withDefaults(
    defineProps<{
        items: FormRelationSummaryItem[];
        emptyLabel?: FormTextDefinition;
    }>(),
    {
        emptyLabel: () => translated('common.states.empty'),
    },
);

const { trans } = useI18n();
</script>
