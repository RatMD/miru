<template>
    <p data-slot="editor-counter" class="text-xs text-muted-foreground">
        <slot
            :count="count"
            :maximum="maxlength"
            :remaining="remaining"
            :formatted-count="formattedCount"
            :formatted-maximum="formattedMaximum"
            :formatted-remaining="formattedRemaining"
            :text="text">
            {{ text }}
        </slot>
    </p>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from '../../composables/useI18n';

const props = withDefaults(
    defineProps<{
        value: string;
        maxlength?: number;
        mode?: 'limit' | 'count' | 'remaining';
        locale?: string;
    }>(),
    { mode: 'limit' },
);
const { trans, locale } = useI18n(() => props.locale);
// Match the UTF-16 units used by the native textarea maxlength attribute.
const count = computed(() => props.value.length);
const remaining = computed(() =>
    props.maxlength === undefined ? undefined : Math.max(0, props.maxlength - count.value),
);
const formatter = computed(
    () => new Intl.NumberFormat(locale.value, { useGrouping: true, maximumFractionDigits: 0 }),
);
const formattedCount = computed(() => formatter.value.format(count.value));
const formattedMaximum = computed(() =>
    props.maxlength === undefined ? undefined : formatter.value.format(props.maxlength),
);
const formattedRemaining = computed(() =>
    remaining.value === undefined ? undefined : formatter.value.format(remaining.value),
);
const text = computed(() => {
    if (props.mode === 'remaining' && formattedRemaining.value !== undefined)
        return trans('common.editors.characters_remaining', { count: formattedRemaining.value });
    if (props.mode === 'limit' && formattedMaximum.value !== undefined)
        return trans('common.editors.characters', {
            count: formattedCount.value,
            max: formattedMaximum.value,
        });
    return trans('common.editors.characters_count', { count: formattedCount.value });
});
</script>
