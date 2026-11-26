<template>
    <div v-if="formatted" class="flex flex-col whitespace-nowrap text-xs" :class="alignment">
        <span v-if="formatted.date" class="font-medium">{{ formatted.date }}</span>
        <span v-if="formatted.time" class="text-muted-foreground">{{ formatted.time }}</span>
    </div>
    <span v-else class="text-muted-foreground">—</span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from '../../../composables/useI18n';
const { locale } = useI18n();

const props = withDefaults(
    defineProps<{
        value: unknown;
        display?: 'date' | 'time' | 'date-time';
        align?: 'left' | 'center' | 'right';
    }>(),
    {
        display: 'date-time',
        align: 'right',
    },
);
const alignment = computed(() => {
    if (props.align === 'center') return 'items-center';
    if (props.align === 'left') return 'items-start';
    return 'items-end';
});
const formatted = computed(() => {
    if (props.value == null || props.value === '') return null;
    if (
        !(props.value instanceof Date) &&
        typeof props.value !== 'string' &&
        typeof props.value !== 'number'
    )
        return null;
    const date = new Date(props.value);
    if (Number.isNaN(date.getTime())) return null;
    const activeLocale = locale.value;

    return {
        date:
            props.display !== 'time'
                ? new Intl.DateTimeFormat(activeLocale, { dateStyle: 'medium' }).format(date)
                : null,
        time:
            props.display !== 'date'
                ? new Intl.DateTimeFormat(activeLocale, {
                      hour: '2-digit',
                      minute: '2-digit',
                      hourCycle: 'h23',
                  }).format(date)
                : null,
    };
});
</script>
