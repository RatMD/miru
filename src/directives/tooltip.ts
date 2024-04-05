import type { Directive, DirectiveBinding, VNode } from "vue";
import type { TooltipStdProps } from '../components/tooltip/TooltipStd.vue';

import { h, render } from "vue";
import TooltipStd from '../components/tooltip/TooltipStd.vue';

let tooltipKey = 0;

/**
 * Tooltip Directive
 * @usage v-tooltip=""
 */
const TooltipDirective: Directive = {
    /**
     * Mount Component
     * @param el 
     * @param bindings 
     */
    mounted(el: HTMLElement, bindings: DirectiveBinding) {
        const props: TooltipStdProps = typeof bindings.value == 'string' ? { label: bindings.value } : bindings.value;
        const modifiers = Object.keys(bindings.modifiers);

        // Check Colors
        const colors: TooltipStdProps['color'][] = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'];
        for (const color of colors) {
            if (modifiers.indexOf(color as string) >= 0) {
                props.color = color;
            }
        }

        // Check Placements
        const placements: TooltipStdProps['placement'][] = [
            'top', 'top-start', 'top-end',
            'left', 'left-start', 'left-end',
            'right', 'right-start', 'right-end',
            'bottom', 'bottom-start', 'bottom-end',            
        ];
        for (const placement of placements) {
            if (modifiers.indexOf(placement as string) >= 0) {
                props.placement = placement;
            }
        }

        // Check Arrow
        if (modifiers.indexOf('arrow') >= 0) {
            props.arrow = true;
        }

        // Check Center
        if (modifiers.indexOf('center') >= 0) {
            props.center = true;
        }

        // Check Delay
        for (const mod of modifiers) {
            if (/^[0-9]+m?s$/.test(mod)) {
                props.delay = parseInt(mod);
            }
        }
        
        // Attach Tooltip
        const tooltip: { value: VNode|null } = { value: null };
        async function onAttach(this: HTMLElement, props: TooltipStdProps, event: PointerEvent) {
            if (!tooltip.value) {
                tooltip.value = h(TooltipStd, { key: tooltipKey++, ...props });
            }
            render(tooltip.value, this.parentElement ? this.parentElement : this);
            tooltip.value.component?.exposed?.show(event);
        }

        // Detach Tooltip
        function onDetach(this: HTMLElement, props: TooltipStdProps, event: PointerEvent) {
            if (tooltip.value) {
                tooltip.value.component?.exposed?.hide(event);
            }
        }

        // Attach Tooltip
        el.addEventListener('pointerenter', onAttach.bind(el, props))
        el.addEventListener('pointerleave', onDetach.bind(el, props))
    },
};

// Export Module
export default TooltipDirective;
export { TooltipDirective };
