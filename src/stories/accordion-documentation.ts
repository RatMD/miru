import { componentDependenciesMarkdown } from './component-dependencies.ts';

/** Manually authored English copy shared by Storybook and VitePress. */
export const accordionSummary =
    'An accessible set of collapsible sections for organising related content. Open one section at a time or several together, with optional descriptions, badges and header actions.';

export const accordionDependencies = {
    components: [
        {
            name: 'ButtonAction',
            url: '/components/api/button-action',
            storybook: '/docs/components-buttonaction--docs',
        },
        {
            name: 'ScrollArea',
            url: '/components/api/scroll-area',
            storybook: '/docs/utilities-scrollarea--docs',
        },
    ],
    packages: ['@tabler/icons-vue', '@vueuse/core', 'clsx', 'reka-ui', 'tailwind-merge', 'vue'],
    primitives: [
        { name: 'Reka UI Accordion', url: 'https://reka-ui.com/docs/components/accordion' },
    ],
};
export function accordionDependencyMarkdown(storybook = false) {
    return componentDependenciesMarkdown(accordionDependencies, storybook);
}

type Copy = {
    props?: Record<string, string>;
    events?: Record<string, string>;
    slots?: Record<string, string>;
    defaults?: Record<string, string>;
};
export const accordionApiCopy: Record<string, Copy> = {
    Accordion: {
        props: {
            collapsible:
                'Allow the open section to close in single mode; ignored in multiple mode.',
            disabled: 'Prevent interaction with every item.',
            dir: 'Set the reading direction; inherits the surrounding provider when omitted.',
            orientation: 'Set the arrow-key navigation axis. Miru retains its vertical layout.',
            unmountOnHide: 'Remove closed content from the DOM.',
            type: 'Open one item or several; inferred from the value when omitted.',
            modelValue: 'The open item value, or an array of values in multiple mode.',
            defaultValue: 'The initially open item or items in uncontrolled mode.',
            iconMode: 'Choose the toggle icon inherited by all triggers.',
        },
        defaults: {
            asChild: 'false',
            collapsible: 'false',
            disabled: 'false',
            orientation: '"vertical"',
            unmountOnHide: 'true',
            iconMode: '"default"',
            as: '"div"',
        },
        events: { 'update:modelValue': 'Emitted when the open item or items change.' },
        slots: { default: 'Accordion items; exposes the current modelValue.' },
    },
    AccordionItem: {
        props: {
            disabled: 'Prevent interaction with this item.',
            value: 'A unique value identifying this item.',
            unmountOnHide: 'Override whether closed content is removed from the DOM.',
        },
        defaults: { asChild: 'false', as: '"div"', disabled: 'false' },
        slots: { default: 'The item header and content; exposes the open state.' },
    },
    AccordionHeader: {
        props: {
            mutedActions:
                'Give nested ButtonAction components a muted resting appearance unless overridden.',
        },
        defaults: { asChild: 'false', as: '"h3"' },
        slots: {
            default: 'The AccordionTrigger for this item.',
            actions: 'Independent actions beside the trigger.',
        },
    },
    AccordionTrigger: {
        props: {
            badgesPosition: 'Place badges beside or below the title.',
            iconMode: 'Override the toggle icon inherited from Accordion.',
        },
        defaults: { asChild: 'false', as: '"button"', badgesPosition: '"inline"' },
        slots: {
            default: 'The section title.',
            description: 'Supporting text below the title.',
            badges: 'Badges beside or below the title.',
        },
    },
    AccordionContent: {
        props: {
            forceMount: 'Keep content mounted for custom animation control.',
            maxHeight: 'Limit content height using pixels or a CSS length; enables ScrollArea.',
        },
        defaults: { asChild: 'false', as: '"div"', forceMount: 'false' },
        slots: { default: 'The collapsible section content.' },
    },
};
export const accordionCommonProps: Record<string, string> = {
    as: 'The HTML element or Vue component to render.',
    asChild: 'Merge behaviour and attributes into the child element.',
    class: 'Additional CSS classes for this part.',
};
