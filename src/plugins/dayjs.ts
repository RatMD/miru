import type { ObjectDirective, WatchStopHandle } from 'vue';
import { watch } from 'vue';
import { dayjs } from '../support/dayjs';
export type DateValue = string | number | Date | null | undefined;
/** Create a formatter with an app-owned locale; the original text is the fallback format. */
export function createDayjsDirective(
    locale: () => string = () => 'de',
): ObjectDirective<HTMLElement, DateValue> {
    type Binding = { value: DateValue; arg?: string };
    const elements = new WeakMap<HTMLElement, { binding: Binding; stop: WatchStopHandle }>();
    function render(el: HTMLElement, binding: Binding): void {
        const date = dayjs(binding.value);
        el.textContent =
            binding.value == null || binding.value === '' || !date.isValid()
                ? ''
                : date
                      .locale(locale().toLowerCase().startsWith('de') ? 'de' : 'en')
                      .format(binding.arg || el.dataset.dayjsFormat || 'DD.MM.YYYY');
    }
    return {
        mounted(el, binding) {
            el.dataset.dayjsFormat ||= el.textContent?.trim() || 'DD.MM.YYYY';
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
const directiveDayJs = createDayjsDirective();
export { directiveDayJs, directiveDayJs as vDayjs };
export default directiveDayJs;
