<template>
    <section class="space-y-5">
        <div v-if="!hideAdd || $slots.header" class="flex items-center justify-between gap-3">
            <slot name="header" />
            <Button
                v-if="!hideAdd"
                type="button"
                size="sm"
                variant="outline"
                :disabled="disabled || !canAdd"
                @click="$emit('add')">
                <IconPlus class="size-4" />
                <FormText :text="addLabel" />
            </Button>
        </div>

        <div v-if="items.length === 0" class="py-10 text-center text-sm text-muted-foreground">
            <FormText :text="emptyLabel" />
        </div>

        <Accordion v-if="accordion" v-model="openItems" type="multiple">
            <AccordionItem
                v-for="(item, index) in items"
                :key="itemKey(item, index)"
                :value="String(itemKey(item, index))">
                <AccordionHeader>
                    <AccordionTrigger>
                        <slot name="title" :item="item" :index="index">
                            <FormText :text="itemLabel(index)" />
                        </slot>
                    </AccordionTrigger>
                    <template #actions>
                        <slot name="item-actions" :item="item" :index="index" />
                        <Button
                            type="button"
                            size="sm"
                            icon-only
                            variant="ghost"
                            class="text-danger"
                            :disabled="disabled"
                            :aria-label="resolveText(removeLabel)"
                            @click="$emit('remove', index)">
                            <IconTrash class="size-4" />
                        </Button>
                    </template>
                </AccordionHeader>
                <AccordionContent>
                    <slot name="item" :item="item" :index="index" />
                </AccordionContent>
            </AccordionItem>
        </Accordion>

        <template v-else>
            <div
                v-for="(item, index) in items"
                :key="itemKey(item, index)"
                class="space-y-5 border-b pb-8 last:border-b-0">
                <div class="flex items-center justify-between gap-3">
                    <div class="min-w-0 font-semibold">
                        <slot name="title" :item="item" :index="index">
                            <FormText :text="itemLabel(index)" />
                        </slot>
                    </div>
                    <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        class="text-danger"
                        :disabled="disabled"
                        @click="$emit('remove', index)">
                        <IconTrash class="size-4" />
                        <FormText :text="removeLabel" />
                    </Button>
                </div>
                <slot name="item" :item="item" :index="index" />
            </div>
        </template>
    </section>
</template>

<script setup lang="ts" generic="TItem">
import type { FormText as FormTextDefinition } from './types';
import { IconPlus, IconTrash } from '@tabler/icons-vue';
import { nextTick, ref, watch } from 'vue';
import { useI18n } from '../../composables/useI18n';
import {
    AccordionContent,
    AccordionHeader,
    AccordionItem,
    Accordion,
    AccordionTrigger,
} from '../accordion';
import { Button } from '../button';
import FormText from './FormText.vue';
import { translated } from './types';

const props = withDefaults(
    defineProps<{
        items: TItem[];
        addLabel?: FormTextDefinition;
        removeLabel?: FormTextDefinition;
        emptyLabel?: FormTextDefinition;
        itemLabel?: (index: number) => FormTextDefinition;
        itemKey?: (item: TItem, index: number) => string | number;
        canAdd?: boolean;
        disabled?: boolean;
        accordion?: boolean;
        hideAdd?: boolean;
    }>(),
    {
        addLabel: () => translated('common.actions.add'),
        removeLabel: () => translated('common.actions.delete'),
        emptyLabel: () => translated('common.states.empty'),
        itemLabel: (index: number) => translated('common.form.item_number', { number: index + 1 }),
        itemKey: (_item: TItem, index: number) => index,
        canAdd: true,
        disabled: false,
        accordion: false,
    },
);

defineEmits<{
    add: [];
    remove: [index: number];
}>();

const openItems = ref<string[]>([]);

watch(
    () => props.items.length,
    async (length, previousLength) => {
        if (!props.accordion || length <= previousLength || length === 0) return;

        await nextTick();
        const index = length - 1;
        openItems.value = [
            ...new Set([...openItems.value, String(props.itemKey(props.items[index]!, index))]),
        ];
    },
);

function resolveText(value: FormTextDefinition): string {
    return 'translation' in value ? trans(value.translation) : value.value;
}

const { trans } = useI18n();
</script>
