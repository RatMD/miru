<template>
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
                data-slot="input-time-trigger"
                type="button"
                :disabled="disabled"
                variant="outline"
                :aria-invalid="invalid"
                :aria-label="label || String($attrs['aria-label'] || trans('common.date.time'))"
                :class="
                    cn(
                        inputVariants({ size }),
                        'inline-flex cursor-pointer items-center justify-between gap-3 text-left font-normal disabled:cursor-not-allowed',
                    )
                ">
                <span :class="modelValue ? 'font-mono' : 'text-muted-foreground'">
                    {{ modelValue ? `${hour}:${minute}` : placeholder || '––:––' }}
                </span>
                <IconClock class="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            </Button>
        </PopoverTrigger>
        <PopoverContent
            class="w-40 bg-background p-2 text-foreground"
            align="end"
            @open-auto-focus="focusSelection">
            <div class="grid grid-cols-2 divide-x divide-border">
                <div class="pr-1">
                    <p :id="id + '-hours'" class="sr-only">
                        {{ trans('common.date.hours') }}
                    </p>
                    <div
                        ref="hourColumn"
                        role="listbox"
                        :aria-labelledby="id + '-hours'"
                        class="time-picker-column relative h-56 overflow-y-auto overscroll-contain p-1">
                        <Button
                            v-for="value in hours"
                            :key="value"
                            type="button"
                            role="option"
                            :data-value="value"
                            :aria-selected="value === hour"
                            :variant="value === hour ? 'default' : 'ghost'"
                            :tabindex="value === hour ? 0 : -1"
                            :class="optionClass(value === hour)"
                            @click="select('hours', value)"
                            @keydown="navigate($event, 'hours', value)">
                            {{ value }}
                        </Button>
                    </div>
                </div>
                <div class="pl-1">
                    <p :id="id + '-minutes'" class="sr-only">
                        {{ trans('common.date.minutes') }}
                    </p>
                    <div
                        ref="minuteColumn"
                        role="listbox"
                        :aria-labelledby="id + '-minutes'"
                        class="time-picker-column relative h-56 overflow-y-auto overscroll-contain p-1">
                        <Button
                            v-for="value in minutes"
                            :key="value"
                            type="button"
                            role="option"
                            :data-value="value"
                            :aria-selected="value === minute"
                            :variant="value === minute ? 'default' : 'ghost'"
                            :tabindex="value === minute ? 0 : -1"
                            :class="optionClass(value === minute)"
                            @click="select('minutes', value)"
                            @keydown="navigate($event, 'minutes', value)">
                            {{ value }}
                        </Button>
                    </div>
                </div>
            </div>
        </PopoverContent>
    </Popover>
</template>

<script setup lang="ts">
import { IconClock } from '@tabler/icons-vue';
import { computed, nextTick, ref, useId, watch } from 'vue';
import { useI18n } from '../../../composables/useI18n';
import { cn } from '../../../support/classNames';
import { Button } from '../../button';
import { inputVariants } from '../../input';
import { Popover, PopoverContent, PopoverTrigger } from '../../popover';
defineOptions({ inheritAttrs: false });
const props = withDefaults(
    defineProps<{
        modelValue: string;
        size?: 'sm' | 'default' | 'lg';
        disabled?: boolean;
        readonly?: boolean;
        invalid?: boolean;
        label?: string;
        placeholder?: string;
        locale?: string;
    }>(),
    { size: 'default', disabled: false, invalid: false },
);
const emit = defineEmits<{ 'update:modelValue': [value: string] }>();
const id = useId();
const open = ref(false);
const hourColumn = ref<HTMLDivElement | null>(null);
const minuteColumn = ref<HTMLDivElement | null>(null);
const hours = Array.from({ length: 24 }, (_, value) => String(value).padStart(2, '0'));
const minutes = Array.from({ length: 60 }, (_, value) => String(value).padStart(2, '0'));
const validTime = computed(() =>
    /^([01]\d|2[0-3]):[0-5]\d$/.test(props.modelValue) ? props.modelValue : '00:00',
);
const hour = computed(() => validTime.value.slice(0, 2));
const minute = computed(() => validTime.value.slice(3, 5));
type Unit = 'hours' | 'minutes';

function optionClass(selected: boolean): string {
    return cn(
        'flex h-8 w-full shrink-0 cursor-pointer items-center justify-center rounded-sm font-mono text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring',
        selected
            ? 'bg-default text-default-foreground hover:bg-default-hover'
            : 'hover:bg-neutral-200',
    );
}

function select(unit: Unit, value: string): void {
    if (props.disabled) return;
    emit(
        'update:modelValue',
        unit === 'hours' ? value + ':' + minute.value : hour.value + ':' + value,
    );
}

function selectedButton(unit: Unit, value: string): HTMLButtonElement | null {
    return (
        (unit === 'hours'
            ? hourColumn.value
            : minuteColumn.value
        )?.querySelector<HTMLButtonElement>('[data-value="' + value + '"]') ?? null
    );
}

function center(unit: Unit, value: string): void {
    const column = unit === 'hours' ? hourColumn.value : minuteColumn.value;
    const button = selectedButton(unit, value);
    if (column && button)
        column.scrollTop = button.offsetTop - (column.clientHeight - button.offsetHeight) / 2;
}

async function focusSelection(event: Event): Promise<void> {
    event.preventDefault();
    await nextTick();
    center('hours', hour.value);
    center('minutes', minute.value);
    selectedButton('hours', hour.value)?.focus({ preventScroll: true });
}

async function navigate(event: KeyboardEvent, unit: Unit, value: string): Promise<void> {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        const other: Unit = unit === 'hours' ? 'minutes' : 'hours';
        selectedButton(other, other === 'hours' ? hour.value : minute.value)?.focus();
        return;
    }
    if (!['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const values = unit === 'hours' ? hours : minutes;
    const current = Number(value);
    const index =
        event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? values.length - 1
              : Math.max(
                    0,
                    Math.min(values.length - 1, current + (event.key === 'ArrowDown' ? 1 : -1)),
                );
    const next = values[index]!;
    select(unit, next);
    await nextTick();
    selectedButton(unit, next)?.focus();
}

watch(
    () => props.disabled,
    (value) => {
        if (value) open.value = false;
    },
);

const { trans } = useI18n(() => props.locale);
</script>

<style scoped>
.time-picker-column {
    scrollbar-width: none;
}
.time-picker-column::-webkit-scrollbar {
    display: none;
}
</style>
