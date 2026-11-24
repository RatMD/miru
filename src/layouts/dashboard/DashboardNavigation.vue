<template>
    <nav :aria-label="label" class="grid content-start gap-5">
        <section v-for="group in groups" :key="group.id" class="min-w-0" :aria-label="group.label">
            <p
                v-if="group.label && !rail"
                class="mb-2 px-3 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                {{ group.label }}
            </p>
            <ul
                :class="
                    cn(
                        'grid gap-1',
                        group.boxed && 'rounded-xl border border-border bg-muted/40 p-1',
                    )
                ">
                <DashboardNavEntry
                    v-for="item in group.items"
                    :key="item.id"
                    :item="item"
                    :rail="rail"
                    :link-component="linkComponent"
                    @navigate="(entry, event) => emit('navigate', entry, event)" />
            </ul>
        </section>
    </nav>
</template>

<script setup lang="ts">
import type { DashboardNavigationGroup, DashboardNavigationItem } from '../types';
import type { Component } from 'vue';
import { cn } from '../../support/classNames';
import DashboardNavEntry from './DashboardNavEntry.vue';

withDefaults(
    defineProps<{
        groups: readonly DashboardNavigationGroup[];
        label: string;
        rail?: boolean;
        linkComponent?: Component | string;
    }>(),
    { rail: false, linkComponent: 'a' },
);
const emit = defineEmits<{ navigate: [item: DashboardNavigationItem, event: MouseEvent] }>();
</script>
