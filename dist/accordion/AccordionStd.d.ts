import type AccordionTab from "./AccordionTab";
import type { AccordionTabProps } from "./AccordionTab";
/**
 * Accordion Properties
 */
export interface AccordionProps {
    /**
     * A custom accordion id, used for a11y purposes only, also passed to the single accordion tabs.
     * Default value is an auto-generated UUID.
     */
    id?: string;
    /**
     * Whether to allow multiple accordion tabs to be open at the same time or not.
     */
    multiple?: boolean;
    /**
     * Pass shared properties to the individual AccordionTab components.
     */
    pass?: Omit<AccordionTabProps, 'id' | 'label' | 'visible'>;
}
/**
 * Accordion Slots
 */
export interface AccordionSlots {
    /**
     * Primary accordion content slot, must contain AccordionTab components only.
     * @param props
     */
    default(props: AccordionProps): InstanceType<typeof AccordionTab>[];
}
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<__VLS_TypePropsToRuntimeProps<AccordionProps>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToRuntimeProps<AccordionProps>>>, {}, {}>, Readonly<AccordionSlots> & AccordionSlots>;
export default _default;
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
