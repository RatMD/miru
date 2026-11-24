<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <button
                type="button"
                data-slot="breadcrumb-menu"
                :class="
                    cn(
                        'inline-flex cursor-pointer items-center gap-1 rounded-sm outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring',
                        props.class,
                    )
                ">
                <slot>{{ label }}</slot>
                <IconChevronDown aria-hidden="true" class="size-3.5 shrink-0" />
            </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
            side="bottom"
            :align="align"
            :side-offset="sideOffset"
            class="min-w-52 overflow-visible">
            <ScrollArea
                fit-content
                class="max-h-[min(24rem,calc(var(--reka-dropdown-menu-content-available-height)-0.5rem))]">
                <DropdownMenuItem
                    v-for="item in items"
                    :key="item.value"
                    :disabled="item.disabled"
                    :as-child="!!item.href && !item.disabled"
                    :class="cn(item.value === modelValue && 'bg-muted text-muted-foreground')"
                    @select="
                        emit('update:modelValue', item.value);
                        emit('select', item);
                    ">
                    <component
                        :is="item.href && !item.disabled ? 'a' : 'span'"
                        :href="item.href"
                        :aria-current="item.value === modelValue ? 'page' : undefined"
                        class="flex w-full items-center gap-2">
                        <IconCheck
                            aria-hidden="true"
                            :class="
                                cn('size-4 shrink-0', item.value !== modelValue && 'invisible')
                            " />
                        {{ item.label }}
                    </component>
                </DropdownMenuItem>
                <slot name="items" />
            </ScrollArea>
            <DropdownMenuArrow v-if="showArrow" />
        </DropdownMenuContent>
    </DropdownMenu>
</template>
<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { IconCheck, IconChevronDown } from '@tabler/icons-vue';
import { cn } from '../../support/classNames';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuArrow,
} from '../dropdown-menu';
import { ScrollArea } from '../scroll-area';
export interface BreadcrumbMenuItem {
    value: string;
    label: string;
    href?: string;
    disabled?: boolean;
}
const props = withDefaults(
    defineProps<{
        label?: string;
        items?: BreadcrumbMenuItem[];
        modelValue?: string;
        align?: 'start' | 'center' | 'end';
        sideOffset?: number;
        showArrow?: boolean;
        class?: HTMLAttributes['class'];
    }>(),
    { items: () => [], align: 'center', sideOffset: 10, showArrow: true },
);
const emit = defineEmits<{
    'update:modelValue': [value: string];
    select: [item: BreadcrumbMenuItem];
}>();
</script>
