<template>
    <li class="min-w-0 list-none">
        <Popover v-if="rail && item.children?.length" v-model:open="popoverOpen">
            <PopoverTrigger as-child>
                <button
                    type="button"
                    :class="entryClass"
                    :aria-label="item.label"
                    :title="item.label"
                    :disabled="item.disabled">
                    <component :is="item.icon || IconLayoutGrid" class="size-5 shrink-0" />
                    <span
                        v-if="item.badge != null"
                        class="absolute top-0 right-0 size-2 rounded-full bg-primary-500" />
                </button>
            </PopoverTrigger>
            <PopoverContent side="right" align="start" class="w-64 p-2">
                <p class="px-3 py-2 text-xs font-semibold text-muted-foreground">
                    {{ item.label }}
                </p>
                <ul class="grid gap-1">
                    <DashboardNavEntry
                        v-for="child in item.children"
                        :key="child.id"
                        :item="child"
                        :link-component="linkComponent"
                        @navigate="navigateChild" />
                </ul>
            </PopoverContent>
        </Popover>
        <Collapsible v-else-if="item.children?.length" v-model:open="open">
            <CollapsibleTrigger :class="entryClass" :disabled="item.disabled">
                <component v-if="item.icon" :is="item.icon" class="size-5 shrink-0" />
                <span class="min-w-0 flex-1 truncate text-left">{{ item.label }}</span>
                <span v-if="item.badge != null" class="rounded-md bg-muted px-1.5 text-xs">
                    {{ item.badge }}
                </span>
                <IconChevronDown
                    class="size-4 shrink-0 transition-transform motion-reduce:transition-none"
                    :class="open && 'rotate-180'" />
            </CollapsibleTrigger>
            <CollapsibleContent>
                <ul class="ms-4 mt-1 grid gap-1 border-s border-border ps-2">
                    <DashboardNavEntry
                        v-for="child in item.children"
                        :key="child.id"
                        :item="child"
                        :link-component="linkComponent"
                        @navigate="(entry, event) => emit('navigate', entry, event)" />
                </ul>
            </CollapsibleContent>
        </Collapsible>
        <component
            v-else
            :is="item.href ? linkComponent : 'button'"
            :href="item.disabled ? undefined : item.href"
            :type="item.href ? undefined : 'button'"
            :disabled="item.href ? undefined : item.disabled"
            :aria-disabled="item.disabled || undefined"
            :aria-current="item.active ? 'page' : undefined"
            :tabindex="item.disabled ? -1 : undefined"
            :aria-label="rail ? item.label : undefined"
            :title="rail ? item.label : undefined"
            :class="entryClass"
            @click="navigate">
            <component v-if="item.icon" :is="item.icon" class="size-5 shrink-0" />
            <IconCircle v-else-if="rail" class="size-4" />
            <span v-if="!rail" class="min-w-0 flex-1 truncate text-left">{{ item.label }}</span>
            <span v-if="item.badge != null && !rail" class="rounded-md bg-muted px-1.5 text-xs">
                {{ item.badge }}
            </span>
            <span
                v-else-if="item.badge != null"
                class="absolute top-0 right-0 size-2 rounded-full bg-primary-500" />
        </component>
    </li>
</template>

<script setup lang="ts">
import type { DashboardNavigationItem } from '../types';
import type { Component } from 'vue';
import { IconChevronDown, IconCircle, IconLayoutGrid } from '@tabler/icons-vue';
import { computed, ref, watch } from 'vue';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../../components/collapsible';
import { Popover, PopoverContent, PopoverTrigger } from '../../components/popover';
import { cn } from '../../support/classNames';

const props = withDefaults(
    defineProps<{
        item: DashboardNavigationItem;
        rail?: boolean;
        linkComponent?: Component | string;
    }>(),
    { rail: false, linkComponent: 'a' },
);
const emit = defineEmits<{ navigate: [item: DashboardNavigationItem, event: MouseEvent] }>();

function containsActive(item: DashboardNavigationItem): boolean {
    return !!item.active || !!item.children?.some(containsActive);
}

const open = ref(containsActive(props.item));
const popoverOpen = ref(false);
watch(
    () => containsActive(props.item),
    (active) => {
        if (active) {
            open.value = true;
        }
    },
);
const entryClass = computed(() =>
    cn(
        'relative flex min-h-11 w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-40 aria-disabled:pointer-events-none aria-disabled:opacity-40',
        props.rail && 'mx-auto size-12 justify-center px-0',
        containsActive(props.item) && 'bg-primary-600/12 text-primary-700 dark:text-primary-300',
    ),
);

function navigateChild(item: DashboardNavigationItem, event: MouseEvent): void {
    popoverOpen.value = false;
    emit('navigate', item, event);
}

function navigate(event: MouseEvent): void {
    if (props.item.disabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
    }
    emit('navigate', props.item, event);
}
</script>
