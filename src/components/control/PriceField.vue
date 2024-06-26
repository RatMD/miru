<template>
    <div class="field-group" :class="[
        props.icon ? `group-icon` : '',
        props.icon ? `group-icon-${placement}` : ''
    ]">
        <InputField v-bind="props" 
            type="text" 
            @keydown="onKeyDown" 
            @blur="onBlur" 
            inputmode="numeric"
            :tabindex="props.tabindex"
            :disabled="toValue(props.disabled || false) || typeof disabled == 'string'"
            :required="toValue(props.required || false) || typeof required == 'string'"
            :invalid="props.validation == 'invalid' ? true : void 0"
            v-model="value" />
        <LucideCurrencyBitcoin v-if="props.icon == 'bitcoin'" v-bind="iconBinding" class="field-currency-icon" />
        <LucideCurrencyDefault v-else-if="props.icon == 'currency'" v-bind="iconBinding" class="field-currency-icon" />
        <LucideCurrencyDollar v-else-if="props.icon == 'dollar'" v-bind="iconBinding" class="field-currency-icon" />
        <LucideCurrencyEuro v-else-if="props.icon == 'euro'" v-bind="iconBinding" class="field-currency-icon" />
        <LucideCurrencyFranc v-else-if="props.icon == 'franc'" v-bind="iconBinding" class="field-currency-icon" />
        <LucideCurrencyGem v-else-if="props.icon == 'gem'" v-bind="iconBinding" class="field-currency-icon" />
        <LucideCurrencyPercent v-else-if="props.icon == 'percent'" v-bind="iconBinding" class="field-currency-icon" />
        <LucideCurrencyRuble v-else-if="props.icon == 'ruble'" v-bind="iconBinding" class="field-currency-icon" />
        <LucideCurrencySterling v-else-if="props.icon == 'sterling'" v-bind="iconBinding" class="field-currency-icon" />
        <LucideCurrencyYen v-else-if="props.icon == 'yen'" v-bind="iconBinding" class="field-currency-icon" />
        <component v-else-if="props.icon" :is="icon" v-bind="iconBinding" class="field-currency-icon" />
    </div>
</template>

<script lang="ts">
import type { Component } from 'vue';
import type { SharedControlProps } from '../form/FormControl.vue';

/**
 * PriceField Properties
 */
export interface PriceFieldProps extends SharedControlProps<null | number | string> {
    /**
     * An additional icon which is displayed right within the input field, if available.
     */
    icon?: null | Component | 'currency' | 'bitcoin' | 'dollar' | 'euro' | 'gem' | 'yen' | 'percent' | 'sterling' | 'ruble' | 'franc';

    /**
     * Additional properties passed to the icon component, such as `size` or `stroke-width`.
     */
    iconProps?: { [key: string]: any };

    /**
     * Whether to show the additional icon on the left or right side or as replacement to the label itself.
     */
    iconPlacement?: 'left' | 'right';

    /**
     * The placeholder attribute for this price field.
     */
    placeholder?: null | string;

    /**
     * The minimum supported value for this price field.
     */
    min?: number;

    /**
     * The maximum supported value for this price field.
     */
    max?: number;

    /**
     * The supported increase / decrease step for this price field.
     */
    step?: number;

    /**
     * The number of decimals shown / formatted for this price field (default: 2).
     */
    decimals?: number;

    /**
     * The desired size for this price field, note that `md` is the default value.
     */
    size?: 'sm' | 'md' | 'lg';
}

/**
 * PriceField Emits
 */
 export interface PriceFieldEmits {
    /**
     * Update model value handler.
     */
    (event: 'update:modelValue', value: null | number | string): void;
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'PriceField'
}
</script>

<script lang="ts" setup>
import { computed, toValue } from 'vue';
import InputField from '../control/InputField.vue';
import LucideCurrencyBitcoin from '../lucide/CurrencyBitcoin.vue';
import LucideCurrencyDefault from '../lucide/CurrencyDefault.vue';
import LucideCurrencyDollar from '../lucide/CurrencyDollar.vue';
import LucideCurrencyEuro from '../lucide/CurrencyEuro.vue';
import LucideCurrencyFranc from '../lucide/CurrencyFranc.vue';
import LucideCurrencyGem from '../lucide/CurrencyGem.vue';
import LucideCurrencyPercent from '../lucide/CurrencyPercent.vue';
import LucideCurrencySterling from '../lucide/CurrencySterling.vue';
import LucideCurrencyRuble from '../lucide/CurrencyRuble.vue';
import LucideCurrencyYen from '../lucide/CurrencyYen.vue';

// Define Component
const props = withDefaults(defineProps<PriceFieldProps>(), {
    decimals: 2
});
const emits = defineEmits<PriceFieldEmits>();

// States
const value = computed({
    get() {
        return props.modelValue || props.modelValue === 0 ? props.modelValue : null;
    },
    set(value) {
        emits('update:modelValue', value);
    }
});

const placement = computed<'left' | 'right'>(() => {
    if (props.iconPlacement) {
        return props.iconPlacement;
    } else {
        let set: { [key: string]: 'left' | 'right' } = {
            currency: 'right',
            bitcoin: 'left',
            dollar: 'left',
            euro: 'right',
            gem: 'right',
            yen: 'left',
            percent: 'right',
            sterling: 'left',
            ruble: 'left',
            franc: 'left'
        };
        return typeof props.icon == 'string' && set[props.icon] ? set[props.icon] : 'right';
    }
});

const iconBinding = computed<{ [key: string]: any }>(() => {
    const result = {
        size: (props.size || 'sm') == 'lg' ? 24 : 16,
        strokeWidth: (props.size || 'sm') == 'lg' ? 1.5 : 2,
    };
    return Object.assign(result, props.iconProps || {});
});

const numericValue = computed<number>(() => {
    const val = props.decimals === 0 ? parseInt((props.modelValue || '0') as string) : parseFloat((props.modelValue || '0') as string);
    return isNaN(val) ? 0 : val;
});

const reachedMin = computed<boolean>(() => {
    return numericValue.value <= (props.min || -Infinity);
});

const reachedMax = computed<boolean>(() => {
    return numericValue.value >= (props.max || Infinity);
});

/**
 * Format price
 * @param column 
 */
function format(val: string) {
    let price;
    if (val.indexOf('.') >= 0 || val.indexOf(',') >= 0) {
        price = parseFloat(val.replace(',', '.').replace(/[^0-9.]/g, ''));
    } else {
        price = parseFloat(val + '.00');
    }
    value.value = price.toFixed(props.decimals);
}

/**
 * Blur Event Handler
 * @param event 
 */
function onBlur(ev: Event) {
    let target = ev.target;
    if (!(target && target instanceof HTMLInputElement)) {
        return;
    } else {
        format(target.value);
    }
}
/**
 * Handle Keydown Event
 * @param ev 
 */
function onKeyDown(ev: KeyboardEvent) {
    if (ev.key == 'ArrowUp') {
        ev.preventDefault();
        onIncrease();
    }
    if (ev.key == 'ArrowDown') {
        ev.preventDefault();
        onDecrease();
    }
}

/**
 * Decrease Value by step
 */
 function onDecrease() {
    let newValue = numericValue.value;
    if (!reachedMin.value) {
        newValue -= (props.step || 1);
    }
    value.value = newValue.toFixed(props.decimals);
}

/**
 * Increase Value by step
 */
function onIncrease() {
    let newValue = numericValue.value;
    if (!reachedMax.value) {
        newValue += (props.step || 1);
    }
    value.value = newValue.toFixed(props.decimals);
}
</script>

<style scoped>
.field-group {
    @apply w-full relative;
}

:deep(.field-input) {
    @apply text-right;
}

.field-group.group-icon.group-icon-left {
    & .field-currency-icon {
        @apply top-1/2 left-4 absolute -translate-y-1/2;
    }

    & :deep(.field-input) {
        @apply pl-12;
    }
}

.field-group.group-icon.group-icon-right {
    & .field-currency-icon {
        @apply top-1/2 right-4 absolute -translate-y-1/2;
    }

    & :deep(.field-input) {
        @apply pr-12;
    }
}
</style>
