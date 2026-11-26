<template>
    <div class="flex w-full gap-2">
        <Popover
            :open="readonly ? false : open"
            @update:open="
                (value) => {
                    if (!readonly) open = value;
                }
            ">
            <PopoverTrigger as-child>
                <Button
                    v-bind="$attrs"
                    data-slot="input-date-trigger"
                    type="button"
                    variant="outline"
                    :size="size"
                    :disabled="disabled"
                    class="flex-1 justify-start text-left font-normal"
                    :class="
                        cn(
                            inputVariants({ size }),
                            !dateValue ? 'text-muted-foreground' : undefined,
                        )
                    "
                    :aria-label="String($attrs['aria-label'] || placeholder)"
                    :aria-invalid="$attrs['aria-invalid']"
                    :aria-valid="$attrs['aria-valid']">
                    <IconCalendar class="size-4" />
                    {{ formattedValue || placeholder }}
                </Button>
            </PopoverTrigger>
            <PopoverContent class="w-auto p-0" align="start">
                <Calendar
                    v-bind="calendarRules"
                    class="border-0"
                    :model-value="dateValue"
                    :locale="resolvedLocale"
                    :max-value="maximumDate"
                    :future-years="allowFuture ? 10 : 0"
                    @update:model-value="updateValue" />
            </PopoverContent>
        </Popover>
        <Button
            v-if="modelValue && !readonly"
            type="button"
            variant="ghost"
            :size="size"
            icon-only
            :disabled="disabled"
            :aria-label="trans('common.actions.clear')"
            @click="$emit('update:modelValue', null)">
            <IconX class="size-4" />
        </Button>
    </div>
</template>

<script setup lang="ts">
import type { CalendarRulesProps } from '../../calendar';
import type { DateValue } from 'reka-ui';
import { DateFormatter, getLocalTimeZone, parseDate, today } from '@internationalized/date';
import { IconCalendar, IconX } from '@tabler/icons-vue';
import { computed, ref, watch } from 'vue';
import { useI18n } from '../../../composables/useI18n';
import { cn } from '../../../support/classNames';
import { Button } from '../../button';
import { Calendar } from '../../calendar';
import { inputVariants } from '../../input';
import { Popover, PopoverContent, PopoverTrigger } from '../../popover';
defineOptions({ inheritAttrs: false });
const props = withDefaults(
    defineProps<
        CalendarRulesProps & {
            modelValue?: string | null;
            locale?: string;
            placeholder: string;
            allowFuture?: boolean;
            /** Explicit bound overrides the automatic today limit. */
            maxValue?: DateValue;
            disabled?: boolean;
            readonly?: boolean;
            size?: 'default' | 'sm' | 'lg';
        }
    >(),
    {
        modelValue: null,

        allowFuture: false,
        disabled: false,
        size: 'default',
    },
);
const calendarRules = computed<CalendarRulesProps>(() => ({
    weekStartsOn: props.weekStartsOn,
    minValue: props.minValue,
    disabledWeekdays: props.disabledWeekdays,
    disabledDates: props.disabledDates,
    holidays: props.holidays,
    disableHolidays: props.disableHolidays,
    availability: props.availability,
    isDateDisabled: props.isDateDisabled,
    isDateUnavailable: props.isDateUnavailable,
}));
const emit = defineEmits<{ 'update:modelValue': [value: string | null] }>();
const open = ref(false);
watch(
    () => props.disabled,
    (disabled) => {
        if (disabled) {
            open.value = false;
        }
    },
);
const maximumDate = computed(
    () => props.maxValue ?? (props.allowFuture ? undefined : today(getLocalTimeZone())),
);
const dateValue = computed<DateValue | undefined>(() => {
    if (!props.modelValue) return undefined;

    try {
        return parseDate(props.modelValue);
    } catch {
        return undefined;
    }
});
const formattedValue = computed(() => {
    if (!dateValue.value) return '';

    return new DateFormatter(resolvedLocale.value, { dateStyle: 'medium' }).format(
        dateValue.value.toDate(getLocalTimeZone()),
    );
});

function updateValue(value: DateValue | undefined): void {
    if (props.disabled) {
        return;
    }
    emit('update:modelValue', value?.toString() ?? null);
    open.value = false;
}

const { trans, locale: providerLocale } = useI18n(() => props.locale);
const resolvedLocale = computed(() => props.locale || providerLocale.value);
</script>
