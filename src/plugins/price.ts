import type { ObjectDirective, WatchStopHandle } from 'vue';
import { watch } from 'vue';
export type PriceValue = number | string | null | undefined;
export function formatPrice(
    value: PriceValue,
    isCents = false,
    locale = 'de-DE',
    currency = 'EUR',
): string {
    if (value == null || value === '' || !Number.isFinite(Number(value))) return '—';
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(Number(value) / (isCents ? 100 : 1));
}
/** Retain the latest binding and refresh unchanged values when the host locale changes. */
export function createPriceDirective(
    locale: () => string = () => 'de-DE',
    currency = 'EUR',
): ObjectDirective<HTMLElement, PriceValue> {
    type Binding = { value: PriceValue; modifiers: Record<string, boolean | undefined> };
    const elements = new WeakMap<HTMLElement, { binding: Binding; stop: WatchStopHandle }>();
    const render = (el: HTMLElement, binding: Binding): void => {
        el.textContent = formatPrice(binding.value, !!binding.modifiers.cents, locale(), currency);
    };
    return {
        mounted(el, binding) {
            const state = { binding, stop: (() => {}) as WatchStopHandle };
            state.stop = watch(locale, () => render(el, state.binding));
            elements.set(el, state);
            render(el, binding);
        },
        updated(el, binding) {
            const state = elements.get(el);
            if (state) state.binding = binding;
            render(el, binding);
        },
        beforeUnmount(el) {
            elements.get(el)?.stop();
            elements.delete(el);
        },
    };
}
const directivePrice = createPriceDirective();
export { formatPrice as format, directivePrice, directivePrice as vPrice };
export default directivePrice;
