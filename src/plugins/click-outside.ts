import type { ObjectDirective } from 'vue';
export type OutsideClickHandler = (event: MouseEvent) => void;
interface State {
    callback: OutsideClickHandler;
    once: boolean;
    fired: boolean;
    listener: (event: MouseEvent) => void;
}
const states = new WeakMap<HTMLElement, State>();
/** Click outside the element, including composed Shadow DOM paths. */
const directiveClickOutside: ObjectDirective<HTMLElement, OutsideClickHandler> = {
    mounted(el, binding) {
        const state: State = {
            callback: binding.value,
            once: !!binding.modifiers.once,
            fired: false,
            listener: () => {},
        };
        state.listener = (event) => {
            if (
                state.fired ||
                event.composedPath().includes(el) ||
                el.contains(event.target as Node)
            )
                return;
            if (state.once) {
                state.fired = true;
                el.ownerDocument.removeEventListener('click', state.listener);
            }
            state.callback(event);
        };
        states.set(el, state);
        el.ownerDocument.addEventListener('click', state.listener);
    },
    updated(el, binding) {
        const state = states.get(el);
        if (!state) return;
        if (binding.value !== binding.oldValue || state.once !== !!binding.modifiers.once) {
            if (state.fired) el.ownerDocument.addEventListener('click', state.listener);
            state.fired = false;
        }
        state.callback = binding.value;
        state.once = !!binding.modifiers.once;
    },
    unmounted(el) {
        const state = states.get(el);
        if (state) el.ownerDocument.removeEventListener('click', state.listener);
        states.delete(el);
    },
};
export { directiveClickOutside, directiveClickOutside as vClickOutside };
export default directiveClickOutside;
