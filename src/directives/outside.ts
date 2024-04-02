import { type Directive, type DirectiveBinding } from "vue";

const listener = { 
    value: null,
    callbacks: new Map
} as {
    value: null | ((event: Event) => void);
    callbacks: Map<HTMLElement, () => void>;
};

/**
 * Create Document Listener
 */
function createDocumentListener() {
    listener.value = (event) => {
        let target = event.target as HTMLElement;
        for (const [el, cb] of listener.callbacks.entries()) {
            if (el && el.parentElement && el != target && !el.contains(target)) {
                cb();
            }
        }
    };
    document.addEventListener('click', listener.value);
}

/**
 * Handle Clicks outside of the target element.
 * @usage v-click-outside="[function]"
 */
const OutsideDirective: Directive = {
    /**
     * Component mounted
     * @param el 
     * @param bindings 
     */
    mounted(el: HTMLElement, bindings: DirectiveBinding) {
        if (listener.value == null) {
            createDocumentListener();
        }
        setTimeout(() => {
            listener.callbacks.set(el, bindings.value);
        }, 15);
    },

    /**
     * Component unmounted
     * @param el 
     * @param bindings 
     */
    unmounted(el: HTMLElement, bindings: DirectiveBinding) {
        listener.callbacks.delete(el);
    }
};

// Export Module
export default OutsideDirective;
export { OutsideDirective };
