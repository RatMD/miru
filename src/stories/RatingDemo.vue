<template>
    <div class="grid max-w-xl gap-4">
        <template v-if="colors">
            <div v-for="variant in variants" :key="variant" class="flex items-center gap-4">
                <span class="w-20 text-sm">{{ variant }}</span>
                <Rating
                    v-model="values[variant]"
                    :variant="variant"
                    :ariaLabel="variant"
                    :length="5"
                    show-value />
            </div>
        </template>
        <template v-else>
            <Rating v-bind="args" v-model="value" aria-label="Your rating" />
            <output
                data-testid="rating-value"
                class="rounded-md border border-border bg-muted/30 p-3 text-xs font-mono">
                {{ value }}
            </output>
        </template>
    </div>
</template>
<script setup lang="ts">
import type { RatingVariant } from '../components/rating';
import { reactive, ref, watch } from 'vue';
import { Rating } from '../components/rating';
const props = defineProps<{ args: Record<string, unknown>; colors?: boolean }>();
const value = ref(Number(props.args.modelValue ?? 2.5));
const variants: RatingVariant[] = [
    'default',
    'primary',
    'secondary',
    'accent',
    'info',
    'success',
    'warning',
    'danger',
];
const values = reactive<Record<RatingVariant, number>>(
    Object.fromEntries(variants.map((variant) => [variant, 2.5])) as Record<RatingVariant, number>,
);
watch(
    () => props.args.modelValue,
    (next) => {
        value.value = Number(next ?? 0);
    },
);
</script>
