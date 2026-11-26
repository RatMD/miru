import { componentDependenciesMarkdown } from './component-dependencies.ts';

/** Manually authored text shared by Storybook controls and the VitePress reference. */
export const breadcrumbSummary =
    'A navigation trail showing the path to the current page. Compose links, separators and the current page label, with optional overflow indicators and contextual menus.';
export const breadcrumbDependencies = {
    components: [
        {
            name: 'DropdownMenu',
            url: '/components/api/dropdown-menu',
            storybook: '/docs/overlay-dropdownmenu--docs',
        },
        {
            name: 'DropdownMenuArrow',
            url: '/components/api/dropdown-menu-arrow',
            storybook: '/docs/overlay-dropdownmenu--docs',
        },
        {
            name: 'DropdownMenuContent',
            url: '/components/api/dropdown-menu-content',
            storybook: '/docs/overlay-dropdownmenu--docs',
        },
        {
            name: 'DropdownMenuItem',
            url: '/components/api/dropdown-menu-item',
            storybook: '/docs/overlay-dropdownmenu--docs',
        },
        {
            name: 'DropdownMenuTrigger',
            url: '/components/api/dropdown-menu-trigger',
            storybook: '/docs/overlay-dropdownmenu--docs',
        },
        {
            name: 'ScrollArea',
            url: '/components/api/scroll-area',
            storybook: '/docs/utilities-scrollarea--docs',
        },
    ],
    packages: ['@tabler/icons-vue', 'clsx', 'reka-ui', 'tailwind-merge', 'vue'],
    primitives: [
        { name: 'Reka UI Primitive', url: 'https://reka-ui.com/docs/utilities/primitive' },
    ],
};
export function breadcrumbDependencyMarkdown(storybook = false) {
    return componentDependenciesMarkdown(breadcrumbDependencies, storybook);
}
const classes = { class: 'Additional CSS classes for this part.' };
type Copy = {
    props: Record<string, string>;
    slots?: Record<string, string>;
    events?: Record<string, string>;
    defaults?: Record<string, string>;
};
export const breadcrumbApiCopy: Record<string, Copy> = {
    Breadcrumb: {
        props: classes,
        slots: { default: 'The breadcrumb list and its composed items.' },
    },
    BreadcrumbList: {
        props: classes,
        slots: { default: 'The breadcrumb items and separators, in navigation order.' },
    },
    BreadcrumbItem: {
        props: classes,
        slots: { default: 'A link, current page label or contextual menu.' },
    },
    BreadcrumbLink: {
        props: {
            ...classes,
            as: 'The HTML element or Vue component to render.',
            asChild: 'Merge link behaviour and attributes into the child element.',
        },
        slots: { default: 'The link label, or a router link when asChild is enabled.' },
        defaults: { asChild: 'false' },
    },
    BreadcrumbPage: {
        props: classes,
        slots: { default: 'The current page label, marked with aria-current="page".' },
    },
    BreadcrumbSeparator: {
        props: classes,
        slots: { default: 'Replace the decorative chevron between items.' },
    },
    BreadcrumbEllipsis: {
        props: classes,
        slots: { default: 'Replace the decorative dots indicating omitted navigation items.' },
    },
    BreadcrumbMenu: {
        props: {
            ...classes,
            label: 'The menu trigger text when the default slot is omitted.',
            items: 'The menu entries, each with a unique value, label and optional href or disabled state.',
            modelValue: 'The selected menu entry value.',
            align: 'Align the menu with the start, centre or end of its trigger.',
            sideOffset: 'The gap between the trigger and menu, in pixels.',
            showArrow: 'Show the arrow pointing from the menu to its trigger.',
        },
        events: {
            'update:modelValue': 'Emitted with the selected entry value.',
            select: 'Emitted with the selected entry object.',
        },
        slots: {
            default: 'Replace the menu trigger label.',
            items: 'Append custom entries after the items supplied through the prop.',
        },
    },
};
export const breadcrumbNotes = [
    {
        title: 'Composition and current page',
        text: 'Import `Breadcrumb` in the singular. Place BreadcrumbItem components inside BreadcrumbList and separate them with BreadcrumbSeparator. Use BreadcrumbLink for destinations and BreadcrumbPage for the current page. BreadcrumbLink accepts native link attributes such as `href`, or `asChild` with a router link. The navigation label follows the configured interface language.',
    },
    {
        title: 'Overflow and contextual menus',
        text: 'BreadcrumbEllipsis is a decorative indicator; it does not open a menu or collapse items automatically. BreadcrumbMenu provides an interactive dropdown with a scrollable body. Bind `v-model` on BreadcrumbMenu to track its selected value and handle `select` for the full entry. The other breadcrumb parts expose no component-specific events or model bindings.',
    },
];
