<template>
    <div
        data-slot="marker-meta"
        :class="cn('ml-auto shrink-0 pt-1 text-right text-xs text-muted-foreground', props.class)">
        <time v-if="dateValue" :datetime="dateValue.toISOString()">
            <slot name="date">{{ formatted }}</slot>
        </time>
        <p v-if="author" data-slot="marker-author" class="mt-1">
            <slot name="author">{{ author }}</slot>
        </p>
    </div>
</template>
<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { computed } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { cn } from '../../support/classNames';
import { dayjs } from '../../support/dayjs';
const props = defineProps<{
    date?: string | number | Date;
    author?: string;
    format?: string;
    class?: HTMLAttributes['class'];
}>();
const { locale } = useI18n();
const dateValue = computed(() => {
    const value = props.date == null ? undefined : dayjs(props.date);
    return value?.isValid() ? value : undefined;
});
const formatted = computed(() =>
    dateValue.value
        ?.locale(locale.value.startsWith('de') ? 'de' : 'en')
        .format(
            props.format ||
                (locale.value.startsWith('de') ? 'DD.MM.YYYY HH:mm' : 'MMM D, YYYY HH:mm'),
        ),
);
</script>
