import type { ObjectDirective } from 'vue';
export interface ResizeSize {
    width: number;
    height: number;
}
export type ResizeCallback = (element: ResizeSize, viewport: ResizeSize) => void;
const states = new WeakMap<HTMLElement, { callback: ResizeCallback; handler: () => void }>();
/** Preserve MIRU's viewport-resize contract; this is not a ResizeObserver. */
const directiveResize: ObjectDirective<HTMLElement, ResizeCallback> = {
    mounted(el, binding) {
        const state = { callback: binding.value, handler: () => {} };
        state.handler = () =>
            state.callback(
                { width: el.offsetWidth, height: el.offsetHeight },
                {
                    width: el.ownerDocument.documentElement.clientWidth,
                    height: el.ownerDocument.documentElement.clientHeight,
                },
            );
        states.set(el, state);
        el.ownerDocument.defaultView?.addEventListener('resize', state.handler);
        if (binding.modifiers.immediate) state.handler();
    },
    updated(el, binding) {
        const state = states.get(el);
        if (!state) return;
        state.callback = binding.value;
        if (binding.value !== binding.oldValue && binding.modifiers.immediate) state.handler();
    },
    unmounted(el) {
        const state = states.get(el);
        if (state) el.ownerDocument.defaultView?.removeEventListener('resize', state.handler);
        states.delete(el);
    },
};
export { directiveResize, directiveResize as vResize };
export default directiveResize;
