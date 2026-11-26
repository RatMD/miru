import type { NumberValue } from '../support/numberFormat';
import type { ObjectDirective, WatchStopHandle } from 'vue';
import { watch } from 'vue';
import { formatNumber } from '../support/numberFormat';

export type NumberFormatBinding =
    | NumberValue
    | {
          value: NumberValue;
          locale?: string;
          options?: Intl.NumberFormatOptions;
      };

/** Text-only formatter; locale changes also refresh bindings whose numeric value is unchanged. */
export function createNumberFormatDirective(
    locale: () => string = () => 'de-DE',
): ObjectDirective<HTMLElement, NumberFormatBinding> {
    const elements = new WeakMap<
        HTMLElement,
        { value: NumberFormatBinding; stop: WatchStopHandle }
    >();
    const render = (el: HTMLElement, value: NumberFormatBinding): void => {
        const settings = typeof value === 'object' && value !== null ? value : { value };
        el.textContent = formatNumber(
            settings.value,
            settings.locale ?? locale(),
            settings.options,
        );
    };
    return {
        deep: true,
        mounted(el, binding) {
            const state = { value: binding.value, stop: (() => {}) as WatchStopHandle };
            state.stop = watch(locale, () => render(el, state.value));
            elements.set(el, state);
            render(el, binding.value);
        },
        updated(el, binding) {
            const state = elements.get(el);
            if (state) state.value = binding.value;
            render(el, binding.value);
        },
        beforeUnmount(el) {
            elements.get(el)?.stop();
            elements.delete(el);
        },
    };
}

const directiveNumberFormat = createNumberFormatDirective();
export { directiveNumberFormat, directiveNumberFormat as vNumberFormat };
export default directiveNumberFormat;
