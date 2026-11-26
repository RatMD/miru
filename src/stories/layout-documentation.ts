import { componentDependenciesMarkdown } from './component-dependencies.ts';

export const layoutSummaries: Record<string, string> = {
    ContextProvider:
        'A context provider for the display locale and application translation functions. Shares those settings with nested Miru components without adding a layout wrapper.',
    PageRoot:
        'A persistent application root that combines ContextProvider with an optional notification host. Mount it once above changing page layouts to share Miru’s application services.',
    FloatingAppBar:
        'An action bar for application navigation and prominent actions, with circular or hexagonal controls. Supports responsive orientation, auxiliary actions and animated transitions.',
    AuthPage:
        'A responsive authentication page with split and card presentations. Compose branding, form content and supporting visuals while the application handles authentication.',
    DashboardPage:
        'An application shell with a collapsible sidebar, responsive navigation and flexible content regions. Supports router adapters, independent mobile navigation and page or content scrolling.',
    FormLayout:
        'A responsive form layout with optional section tabs, content and desktop or mobile actions. Compose fields manually or let Form supply generated sections and validation feedback.',
};
const ui: Record<string, [string, string]> = {
    ContextProvider: ['/components/context-provider', 'utilities-contextprovider'],
    Toast: ['/components/toast', 'overlay-toast'],
    Button: ['/components/button', 'components-button'],
    Drawer: ['/components/drawer', 'overlay-drawer'],
    Tabs: ['/components/tabs', 'components-tabs'],
    Sheet: ['/components/sheet', 'overlay-sheet'],
    Collapsible: ['/components/collapsible', 'utilities-collapsible'],
    CollapsibleContent: [
        '/components/collapsible/reference#collapsible-content',
        'utilities-collapsible',
    ],
    CollapsibleTrigger: [
        '/components/collapsible/reference#collapsible-trigger',
        'utilities-collapsible',
    ],
    Popover: ['/components/popover', 'overlay-popover'],
    PopoverContent: ['/components/popover/reference#popover-content', 'overlay-popover'],
    PopoverTrigger: ['/components/popover/reference#popover-trigger', 'overlay-popover'],
    ButtonAction: ['/components/button-action', 'components-buttonaction'],
    Breadcrumb: ['/components/breadcrumb', 'components-breadcrumbs'],
    BreadcrumbList: ['/components/breadcrumb/reference#breadcrumb-list', 'components-breadcrumbs'],
    BreadcrumbItem: ['/components/breadcrumb/reference#breadcrumb-item', 'components-breadcrumbs'],
    BreadcrumbLink: ['/components/breadcrumb/reference#breadcrumb-link', 'components-breadcrumbs'],
    BreadcrumbPage: ['/components/breadcrumb/reference#breadcrumb-page', 'components-breadcrumbs'],
    BreadcrumbSeparator: [
        '/components/breadcrumb/reference#breadcrumb-separator',
        'components-breadcrumbs',
    ],
    SheetContent: ['/components/sheet/reference#sheet-content', 'overlay-sheet'],
    SheetHeader: ['/components/sheet/reference#sheet-header', 'overlay-sheet'],
    SheetTitle: ['/components/sheet/reference#sheet-title', 'overlay-sheet'],
    SheetDescription: ['/components/sheet/reference#sheet-description', 'overlay-sheet'],
    DrawerContent: ['/components/drawer/reference#drawer-content', 'overlay-drawer'],
    DrawerHeader: ['/components/drawer/reference#drawer-header', 'overlay-drawer'],
    DrawerTitle: ['/components/drawer/reference#drawer-title', 'overlay-drawer'],
    DrawerDescription: ['/components/drawer/reference#drawer-description', 'overlay-drawer'],
};
export function layoutDependencyMarkdown(name: string, storybook = false) {
    const config: Record<string, { ui?: string[]; packages: string[]; primitive?: string }> = {
        ContextProvider: { packages: ['reka-ui', 'vue'], primitive: 'Config Provider' },
        PageRoot: { ui: ['ContextProvider', 'Toast'], packages: ['vue'] },
        FloatingAppBar: { packages: ['@vueuse/core', 'vue'] },
        AuthPage: { packages: ['clsx', 'tailwind-merge', 'vue'] },
        DashboardPage: {
            ui: [
                'Collapsible',
                'CollapsibleContent',
                'CollapsibleTrigger',
                'Popover',
                'PopoverContent',
                'PopoverTrigger',
                'Breadcrumb',
                'BreadcrumbList',
                'BreadcrumbItem',
                'BreadcrumbLink',
                'BreadcrumbPage',
                'BreadcrumbSeparator',
                'ButtonAction',
                'Sheet',
                'SheetContent',
                'SheetHeader',
                'SheetTitle',
                'SheetDescription',
            ],
            packages: ['@tabler/icons-vue', '@vueuse/core', 'clsx', 'tailwind-merge', 'vue'],
        },
        FormLayout: {
            ui: [
                'Button',
                'Drawer',
                'DrawerContent',
                'DrawerHeader',
                'DrawerTitle',
                'DrawerDescription',
                'Tabs',
            ],
            packages: ['@tabler/icons-vue', '@vueuse/core', 'vue'],
        },
    };
    const value = config[name];
    return componentDependenciesMarkdown(
        {
            packages: value.packages,
            components: (value.ui ?? []).map((part) => ({
                name: part,
                url: ui[part][0],
                storybook: '/docs/' + ui[part][1] + '--docs',
            })),
            primitives: value.primitive
                ? [
                      {
                          name: 'Reka UI ' + value.primitive,
                          url: 'https://reka-ui.com/docs/utilities/config-provider',
                      },
                  ]
                : [],
        },
        storybook,
    );
}
type Copy = Partial<Record<'props' | 'events' | 'slots' | 'exposed', Record<string, string>>>;
export const layoutApiCopy: Record<string, Copy> = {
    ContextProvider: {
        props: {
            locale: 'The display locale shared with nested Miru components.',
            translate: 'The application function used to resolve translation keys.',
            translateChoice: 'The application function used to resolve pluralised translations.',
        },
        slots: { default: 'Components that inherit the locale and translation context.' },
    },
    PageRoot: { slots: { default: 'The persistent application content or active page layout.' } },
    FloatingAppBar: {
        props: {
            label: 'The accessible name of the action bar.',
            variant: 'The arrangement of primary and surrounding action positions.',
            fixed: 'Dock the bar to the viewport rather than the surrounding layout.',
            shape: 'Use circular or rounded hexagonal control surfaces.',
            appearance: 'Use a solid or gradient surface.',
            bordered: 'Show borders around control surfaces.',
            gradientTone: 'The semantic palette used by gradient appearance.',
            orientation:
                'Arrange actions horizontally, vertically or according to viewport orientation.',
            animated: 'Animate layout and orientation transitions.',
            transitionKey: 'A key that triggers a transition when action content changes.',
            auxiliaryPosition:
                'Place auxiliary actions beside the main bar or against the screen edge.',
        },
        slots: {
            left: 'Actions before the primary action.',
            primary: 'The prominent central action.',
            right: 'Actions after the primary action.',
            'auxiliary-start': 'Additional controls at the start of the bar.',
            'auxiliary-end': 'Additional controls at the end of the bar.',
        },
    },
    AuthPage: {
        props: {
            title: 'The authentication heading when no header slot is supplied.',
            description: 'Supporting text below the default heading.',
            variant: 'Use a split visual panel or a compact card layout.',
            panelSide: 'Place the form panel on the left or right.',
            image: 'An optional visual-panel image URL.',
            imageAlt: 'Alternative text for the visual-panel image.',
            panelWidth: 'The form panel width as a CSS length.',
            maxWidth: 'The maximum frame width as a CSS length.',
            height: 'The frame height when fullHeight is false.',
            fullHeight: 'Fill the viewport height instead of using the explicit frame height.',
            framed: 'Apply a framed surface around the authentication layout.',
            hideVisualOnMobile: 'Hide the supporting visual panel on smaller screens.',
            class: 'Additional CSS classes for the page surface.',
        },
        slots: {
            brand: 'Application branding above the form.',
            header: 'Replace the heading and supporting text.',
            default: 'The authentication form or other page content.',
            footer: 'Supporting links or application footer content.',
            visual: 'Replace the illustration or image panel.',
            'visual-overlay': 'Content placed over the supporting visual.',
        },
    },
    DashboardPage: {
        props: {
            title: 'The default page heading.',
            description: 'Supporting text below the heading.',
            navigation: 'Grouped navigation items with nested children and active state.',
            breadcrumbs: 'The breadcrumb items for the current page.',
            linkComponent:
                'A router-compatible link component; native anchors are used by default.',
            navigationLabel: 'The accessible name of the navigation region.',
            sidebar: 'Display the sidebar and its mobile navigation controls.',
            collapsible: 'Allow the desktop sidebar to collapse into an icon rail.',
            sidebarWidth: 'The expanded sidebar width.',
            railWidth: 'The collapsed sidebar width.',
            sidebarTone: 'The sidebar surface: surface, muted or dark.',
            surface: 'Use an inset content surface or a flush page.',
            scroll: 'Scroll the content region or the complete page.',
            scrollRegion:
                'Mark the actual scroll container for application integrations such as Inertia.',
            headerSize: 'The header height and spacing treatment.',
            stickyHeader: 'Keep the header visible while the content scrolls.',
            padding: 'The main content padding.',
            contentWidth: 'An optional maximum content width.',
            collapsed: 'The desktop sidebar state; bind with v-model:collapsed.',
            mobileOpen: 'The mobile navigation state; bind with v-model:mobileOpen.',
            class: 'Additional CSS classes for the dashboard surface.',
        },
        events: {
            'update:collapsed': 'Emitted when the desktop sidebar expands or collapses.',
            'update:mobileOpen': 'Emitted when mobile navigation opens or closes.',
            navigate: 'Emitted when a navigation item is activated.',
        },
        slots: {
            brand: 'Application branding; receives collapsed state.',
            navigation: 'Replace navigation; receives collapsed state and closeMobile.',
            'sidebar-footer': 'Content below navigation; receives collapsed state.',
            header: 'Replace the default page heading.',
            actions: 'Actions beside the page heading.',
            toolbar: 'An additional toolbar below the header.',
            banner: 'Page-wide content above the main body.',
            breadcrumbs: 'Replace breadcrumb content.',
            default: 'The current page content.',
            footer: 'Content below the main body.',
            'app-bar': 'An application action bar or layout partial.',
            overlays: 'Application overlays mounted outside the content region.',
        },
    },
    FormLayout: {
        props: {
            tabs: 'Optional section definitions using Miru TabItem values.',
            modelValue: 'The active section id; bind with v-model.',
            navigationLabel: 'The accessible label for section navigation.',
            actionsLabel: 'The heading above desktop actions.',
            primaryLabel: 'Override the translated submit-action label.',
            secondaryLabel: 'Override the translated secondary-action label.',
            primaryVariant: 'The colour treatment of the submit action.',
            additionalActions:
                'Additional application actions with stable ids, labels and optional icons.',
            loading: 'Show pending feedback and disable built-in actions.',
            showActions:
                'Show form actions; disable for standalone sections while keeping navigation.',
        },
        events: {
            secondary: 'Emitted when the secondary action is activated.',
            'update:modelValue': 'Emitted when the active section changes.',
            submit: 'Emitted when the native form is submitted; the application handles persistence.',
            action: 'Emitted with the id of an additional action.',
        },
        slots: {
            default: 'The form content; receives the active tab when navigation is present.',
            header: 'Content above the native form.',
            'tab-action': 'A separate action beside a tab; receives its definition.',
            'before-content': 'Content before the form grid.',
            'desktop-actions': 'Replace desktop actions; receives loading state.',
            'primary-action': 'Replace the submit control; receives surface and loading.',
            'secondary-action': 'Replace the secondary control; receives surface and loading.',
            'additional-actions':
                'Replace additional actions; receives surface, loading and close.',
            'mobile-additional-actions':
                'Replace the mobile action drawer content; receives loading and close.',
            'floating-app-bar':
                'Provide an app bar using the supplied fixed and orientation values.',
        },
    },
};
export function describeLayoutControls(name: string, argTypes: Record<string, any>) {
    for (const [key, description] of Object.entries(layoutApiCopy[name].props ?? {})) {
        argTypes[key] = { ...argTypes[key], description };
    }
}
