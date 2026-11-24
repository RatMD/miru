<template>
    <Card>
        <CardHeader>
            <CardTitle>
                <slot name="title">{{ title }}</slot>
            </CardTitle>
            <CardDescription v-if="description || $slots.description">
                <slot name="description">{{ description }}</slot>
            </CardDescription>
        </CardHeader>
        <CardContent :class="contentClass">
            <div v-if="empty" :class="emptyClass">{{ emptyLabel }}</div>
            <slot v-else />
        </CardContent>
    </Card>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../card';

withDefaults(
    defineProps<{
        title?: string;
        description?: string;
        empty: boolean;
        emptyLabel: string;
        contentClass?: HTMLAttributes['class'];
        emptyClass?: HTMLAttributes['class'];
    }>(),
    {
        emptyClass: 'flex h-72 items-center justify-center text-sm text-muted-foreground',
    },
);
</script>
