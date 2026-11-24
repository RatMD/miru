<template>
    <Badge
        data-slot="badge-counter"
        :variant="variant"
        :size="size"
        :class="cn('gap-0 p-0', props.class)">
        <span v-if="numberPosition === 'left'" :class="cn(segmentClass, 'tabular-nums')">
            {{ formattedValue }}
        </span>
        <span
            :class="
                cn(
                    segmentClass,
                    numberPosition === 'left'
                        ? 'border-l border-current/25'
                        : 'border-r border-current/25',
                )
            ">
            <slot>{{ label }}</slot>
        </span>
        <span v-if="numberPosition === 'right'" :class="cn(segmentClass, 'tabular-nums')">
            {{ formattedValue }}
        </span>
    </Badge>
</template>

<script setup lang="ts">
import type { BadgeVariants } from '../badge';
import type { HTMLAttributes } from 'vue';
import { computed } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { cn } from '../../support/classNames';
import { Badge } from '../badge';
import { formatCounterValue } from './formatCounterValue';
const { trans, transChoice, locale: uiLocale } = useI18n();

const props = withDefaults(
    defineProps<{
        value: number | string;
        label?: string;
        numberPosition?: 'left' | 'right';
        fractionDigits?: number;
        locale?: string;
        variant?: BadgeVariants['variant'];
        size?: BadgeVariants['size'];
        class?: HTMLAttributes['class'];
    }>(),
    { numberPosition: 'left', variant: 'default', size: 'default' },
);

const formattedValue = computed(() =>
    formatCounterValue(props.value, props.locale ?? uiLocale.value, props.fractionDigits),
);
const segmentClass = computed(() =>
    cn(
        'inline-flex items-center justify-center gap-1 self-stretch',
        props.size === 'lg' ? 'gap-1.5 px-3 py-1 [&_svg]:size-4' : 'px-2 py-0.5 [&_svg]:size-3',
        '[&_svg]:pointer-events-none [&_svg]:shrink-0',
    ),
);
</script>
