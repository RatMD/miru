<template>
    <span class="whitespace-nowrap tabular-nums">{{ formatted }}</span>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from '../../../composables/useI18n';
const props = withDefaults(defineProps<{ value: unknown; currency?: string }>(), {
    currency: 'EUR',
});
const { locale } = useI18n();
const formatted = computed(() => {
    const amount = typeof props.value === 'number' ? props.value : Number(props.value ?? 0);
    if (!Number.isFinite(amount)) return '—';
    try {
        return new Intl.NumberFormat(locale.value, {
            style: 'currency',
            currency: props.currency,
        }).format(amount);
    } catch {
        return '—';
    }
});
</script>
