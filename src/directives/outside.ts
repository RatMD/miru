import { type Directive, type DirectiveBinding } from "vue";

export interface CallbackItem {
    cb: () => void;
    once: boolean;
}

const listener = { 
    value: null,
    callbacks: new Map
} as {
    value: null | ((event: Event) => void);
    callbacks: Map<HTMLElement, CallbackItem>;
};

/**
 * Create Document Listener
 */
function createDocumentListener() {
    listener.value = (event) => {
        let target = event.target as HTMLElement;
        for (const [el, item] of listener.callbacks.entries()) {
            if (el && el.parentElement && el != target && !el.contains(target)) {
                item.cb();
            }
            if (item.once) {
                listener.callbacks.delete(el);
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
        const modifiers = Object.keys(bindings.modifiers);

        // Parse Modifiers
        let once = false;
        for (const mod of modifiers) {
            if (mod === 'once') {
                once = true;
            }
        }

        // Set Listener
        setTimeout(() => {
            listener.callbacks.set(el, { cb: bindings.value, once });
        }, 10);
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
