<template>
    <ListboxRoot
        data-slot="command"
        :disabled="disabled || loading"
        highlight-on-hover
        selection-behavior="replace"
        :aria-label="label || trans('common.datatable.search')"
        :class="
            cn(
                'flex w-full min-w-0 flex-col overflow-hidden rounded-md border bg-background text-foreground',
                props.class,
            )
        ">
        <div class="flex h-14 shrink-0 items-center gap-3 border-b px-4">
            <IconSearch class="size-5 shrink-0 text-muted-foreground" />
            <ListboxFilter
                v-model="query"
                :auto-focus="autoFocus"
                :disabled="disabled || loading"
                :aria-label="label || trans('common.datatable.search')"
                :placeholder="placeholder || trans('common.datatable.search_placeholder')"
                class="h-full min-w-0 flex-1 border-0 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
            <IconLoader2 v-if="loading" class="size-4 shrink-0 animate-spin" />
        </div>
        <div
            v-if="filterOptions.length"
            data-slot="command-filters"
            class="flex min-w-0 shrink-0 items-center gap-2 border-b px-4 py-3">
            <Badge
                as="button"
                type="button"
                :disabled="disabled || loading"
                :variant="types.length ? 'outline' : 'primary'"
                class="h-7 shrink-0 rounded-full px-2.5 text-xs"
                :aria-pressed="!types.length"
                @click="types = []">
                {{ trans('common.datatable.all') }}
            </Badge>
            <FilterBadges
                :items="filterItems"
                :disabled="disabled || loading"
                @remove="toggle"
                @select="toggle" />
        </div>
        <ScrollArea fit-content class="max-h-80 min-h-0" viewport-class="overscroll-contain">
            <ListboxContent data-slot="command-list" class="min-h-20 py-1">
                <p
                    v-if="loading"
                    role="status"
                    class="px-4 py-8 text-center text-sm text-muted-foreground">
                    {{ trans('common.states.loading') }}
                </p>
                <p
                    v-else-if="!filtered.length"
                    role="status"
                    class="px-4 py-8 text-center text-sm text-muted-foreground">
                    {{ emptyLabel || trans('common.datatable.no_entries') }}
                </p>
                <template v-else>
                    <ListboxGroup v-for="group in groups" :key="group.label">
                        <ListboxGroupLabel
                            v-if="group.label"
                            class="px-3 pt-3 pb-1 text-xs font-semibold text-muted-foreground">
                            {{ group.label }}
                        </ListboxGroupLabel>
                        <ListboxItem
                            v-for="item in group.items"
                            :key="item.value"
                            :value="item.value"
                            :disabled="item.disabled"
                            class="flex cursor-pointer items-center gap-3 rounded-none px-4 py-2.5 text-sm outline-none data-[highlighted]:bg-muted data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                            @select.prevent="select(item)">
                            <slot name="item" :item="item">
                                <component
                                    :is="item.icon"
                                    v-if="item.icon"
                                    class="size-4 shrink-0 text-muted-foreground" />
                                <div class="min-w-0 flex-1">
                                    <div class="font-medium">{{ item.label }}</div>
                                    <p
                                        v-if="item.description"
                                        class="truncate text-xs text-muted-foreground">
                                        {{ item.description }}
                                    </p>
                                </div>
                                <kbd
                                    v-if="item.shortcut"
                                    class="shrink-0 rounded border px-1.5 text-xs text-muted-foreground">
                                    {{ item.shortcut }}
                                </kbd>
                            </slot>
                        </ListboxItem>
                    </ListboxGroup>
                </template>
            </ListboxContent>
        </ScrollArea>
        <slot name="footer" />
    </ListboxRoot>
</template>
<script setup lang="ts">
import type { CommandFilter, CommandItem } from './types';
import type { HTMLAttributes } from 'vue';
import { IconSearch, IconLoader2 } from '@tabler/icons-vue';
import {
    ListboxRoot,
    ListboxFilter,
    ListboxContent,
    ListboxItem,
    ListboxGroup,
    ListboxGroupLabel,
} from 'reka-ui';
import { computed } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { cn } from '../../support/classNames';
import { Badge } from '../badge';
import { FilterBadges } from '../filter-badges';
import { ScrollArea } from '../scroll-area';
const props = withDefaults(
    defineProps<{
        items: readonly CommandItem[];
        filterOptions?: readonly CommandFilter[];
        placeholder?: string;
        label?: string;
        emptyLabel?: string;
        loading?: boolean;
        disabled?: boolean;
        autoFocus?: boolean;
        class?: HTMLAttributes['class'];
    }>(),
    {
        filterOptions: () => [],
        loading: false,
        disabled: false,
        autoFocus: false,
    },
);
const query = defineModel<string>('query', { default: '' });
const types = defineModel<string[]>('filters', { default: () => [] });
const emit = defineEmits<{ select: [item: CommandItem] }>();
const { trans } = useI18n();
const filtered = computed(() => {
    const terms = query.value.trim().toLocaleLowerCase().split(/\s+/);
    return props.items.filter(
        (item) =>
            (!types.value.length || (!!item.type && types.value.includes(item.type))) &&
            terms.every((term) =>
                [item.label, item.description, ...(item.keywords ?? [])]
                    .filter(Boolean)
                    .join(' ')
                    .toLocaleLowerCase()
                    .includes(term),
            ),
    );
});
const groups = computed(() =>
    [...new Set(filtered.value.map((item) => item.group ?? ''))].map((label) => ({
        label,
        items: filtered.value.filter((item) => (item.group ?? '') === label),
    })),
);
const filterItems = computed(() =>
    [
        ...props.filterOptions.filter((filter) => types.value.includes(filter.value)),
        ...props.filterOptions.filter((filter) => !types.value.includes(filter.value)),
    ].map((filter) => ({
        key: filter.value,
        label: filter.label,
        selected: types.value.includes(filter.value),
        removable: types.value.includes(filter.value),
    })),
);
function toggle(key: string): void {
    if (props.disabled || props.loading) return;
    types.value = types.value.includes(key)
        ? types.value.filter((value) => value !== key)
        : [...types.value, key];
}
function select(item: CommandItem): void {
    if (!props.disabled && !props.loading && !item.disabled) emit('select', item);
}
</script>
