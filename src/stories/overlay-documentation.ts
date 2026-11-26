import { componentDependenciesMarkdown } from './component-dependencies.ts';

/** Handwritten copy shared by Storybook and the documentation website. */
export const overlayModules: Record<string, string> = {
    command: 'Command',
    'context-menu': 'ContextMenu',
    description: 'Description',
    dialog: 'Dialog',
    drawer: 'Drawer',
    overlay: 'Overlay',
    'overlay-choice': 'OverlayChoice',
    'overlay-details': 'OverlayDetails',
    'overlay-notice': 'OverlayNotice',
    popover: 'Popover',
    sheet: 'Sheet',
    toast: 'Toast',
    tooltip: 'Tooltip',
};

export const overlaySummaries: Record<string, string> = {
    Command:
        'A searchable command list with grouped results, type filters and keyboard navigation. Use it inline or inside CommandDialog for a focused command palette.',
    CommandDialog:
        'A command palette presented in a dialog, with search, filters and optional closing after selection.',
    ContextMenu:
        'A contextual action menu opened by right-click or a touch press. Supports grouped actions, nested menus, checkbox items and radio choices with keyboard navigation.',
    ContextMenuCheckboxItem: 'A menu item with a checked or indeterminate state.',
    ContextMenuContent:
        'The floating context menu surface, with collision handling and focus management.',
    ContextMenuGroup: 'A group of related context menu items.',
    ContextMenuItem: 'A context menu action with optional danger styling.',
    ContextMenuLabel: 'A non-interactive heading for context menu items.',
    ContextMenuRadioGroup: 'A group of context menu options sharing one selected value.',
    ContextMenuRadioItem: 'One selectable option within a context menu radio group.',
    ContextMenuSeparator: 'A visual divider between context menu sections.',
    ContextMenuShortcut: 'A text label displaying the shortcut associated with a menu action.',
    ContextMenuSub: 'The open state and context for a nested menu.',
    ContextMenuSubContent: 'The floating content of a nested context menu.',
    ContextMenuSubTrigger: 'A menu item that opens a nested context menu.',
    ContextMenuTrigger: 'The target that opens a context menu on right-click or a touch press.',
    ContextMenuPortal:
        'A portal that renders context menu content outside its original DOM location.',
    Description:
        'An information trigger that reveals supporting text in a popover on larger screens and a drawer on smaller screens. Accepts a short description, further details and custom content.',
    Dialog: 'A dialog for focused tasks, with managed focus, accessible headings and configurable content widths. Compose its content, description and footer around the task.',
    DialogContent: 'The centred dialog surface, including its backdrop and optional close button.',
    DialogDescription: 'Supporting text associated with the dialog for assistive technology.',
    DialogTitle: 'The accessible heading of a dialog.',
    DialogFooter: 'A layout for dialog actions, with an optional top border.',
    Drawer: 'A panel that opens from a screen edge, with swipe dismissal and optional snap positions. Supports managed focus, scrollable content and separate header and footer areas.',
    DrawerContent:
        'The drawer surface, with a backdrop, optional handle and close button, and configurable scrolling.',
    DrawerHeader: 'A layout for the drawer heading and supporting text.',
    DrawerFooter: 'A layout for drawer actions below the main content.',
    DrawerTitle: 'The accessible heading of a drawer.',
    DrawerDescription: 'Supporting text associated with the drawer for assistive technology.',
    Overlay:
        'A responsive overlay that uses a dialog on larger screens and a drawer on smaller screens. Provides a shared heading, scrollable body and optional footer with consistent dismissal behaviour.',
    OverlayTrigger:
        'A trigger that follows the surrounding Overlay’s dialog or drawer presentation.',
    OverlayChoice:
        'A responsive confirmation overlay with primary and secondary actions, pending feedback and optional error text. Keeps confirmations open by default so the application can finish its work or show an error.',
    OverlayDetails:
        'A responsive overlay for inspecting code or structured data in labelled sections. Uses tabs for multiple sections, with formatting, line numbers and loading or error feedback.',
    OverlayNotice:
        'A responsive notice overlay with an icon, supporting content and a configurable close action. Blocks dismissal during pending work and supports additional application actions.',
    Popover:
        'A floating surface for contextual content beside a trigger. Supports controlled visibility, flexible positioning and an optional tooltip on the trigger.',
    PopoverAnchor: 'An explicit positioning reference for popover content.',
    PopoverArrow: 'An optional arrow connecting a popover to its positioning reference.',
    PopoverContent:
        'The floating popover surface, with positioning, collision handling and focus management.',
    PopoverTrigger: 'A button or composed child that toggles a popover, with an optional tooltip.',
    Sheet: 'A panel that slides in from a chosen screen edge using dialog focus and dismissal behaviour. Compose its heading, description, body and actions for supplementary tasks.',
    SheetClose: 'A button or composed child that closes a sheet.',
    SheetContent:
        'The sheet surface, including its backdrop, screen edge and optional close button.',
    SheetDescription: 'Supporting text associated with the sheet for assistive technology.',
    SheetFooter: 'A layout for sheet actions below the main content.',
    SheetHeader: 'A layout for the sheet heading and supporting text.',
    SheetTitle: 'The accessible heading of a sheet.',
    SheetTrigger: 'A button or composed child that opens a sheet.',
    Toast: 'A notification host built on Reka UI for brief messages, status feedback and application actions. Supports queued notifications, promise feedback and replaceable status icons with Miru styling.',
    Toaster: 'An alias of Toast, with the same notification host props and icon slots.',
    Tooltip:
        'A short hint shown when its trigger is hovered or receives keyboard focus. Supports shared timing, configurable positioning and theme colours.',
    TooltipContent:
        'The tooltip text surface, with theme colours, positioning and an optional arrow.',
    TooltipProvider: 'Shared timing and interaction settings for a group of tooltips.',
    TooltipTrigger: 'The focusable target that reveals a tooltip on hover or keyboard focus.',
};

const uiLinks: Record<string, [string, string]> = {
    Alert: ['alert', 'components-alert'],
    AlertDescription: ['alert-description', 'components-alert'],
    Badge: ['badge', 'components-badge'],
    Button: ['button', 'components-button'],
    CodePanel: ['code-panel', 'components-codepanel'],
    Command: ['command', 'overlay-command'],
    Dialog: ['dialog', 'overlay-dialog'],
    DialogContent: ['dialog-content', 'overlay-dialog'],
    DialogDescription: ['dialog-description', 'overlay-dialog'],
    DialogTitle: ['dialog-title', 'overlay-dialog'],
    Drawer: ['drawer', 'overlay-drawer'],
    DrawerContent: ['drawer-content', 'overlay-drawer'],
    DrawerDescription: ['drawer-description', 'overlay-drawer'],
    DrawerHeader: ['drawer-header', 'overlay-drawer'],
    DrawerTitle: ['drawer-title', 'overlay-drawer'],
    FilterBar: ['filter-bar', 'extensions-filterbar'],
    Overlay: ['overlay', 'overlay-overlay'],
    Popover: ['popover', 'overlay-popover'],
    PopoverArrow: ['popover-arrow', 'overlay-popover'],
    PopoverContent: ['popover-content', 'overlay-popover'],
    PopoverTrigger: ['popover-trigger', 'overlay-popover'],
    ScrollArea: ['scroll-area', 'utilities-scrollarea'],
    Tabs: ['tabs', 'components-tabs'],
    Tooltip: ['tooltip', 'overlay-tooltip'],
    TooltipContent: ['tooltip-content', 'overlay-tooltip'],
    TooltipProvider: ['tooltip-provider', 'overlay-tooltip'],
    TooltipTrigger: ['tooltip-trigger', 'overlay-tooltip'],
};
type Dependencies = { ui?: string[]; packages?: string[]; primitives?: string[]; plain?: boolean };
const dependencies: Record<string, Dependencies> = {
    command: {
        ui: ['Badge', 'FilterBar', 'ScrollArea'],
        packages: ['@tabler/icons-vue', 'reka-ui'],
        primitives: ['Listbox'],
    },
    'context-menu': {
        packages: ['@tabler/icons-vue', '@vueuse/core', 'reka-ui'],
        primitives: ['Context Menu'],
    },
    description: {
        ui: [
            'Button',
            'Drawer',
            'DrawerContent',
            'DrawerDescription',
            'DrawerHeader',
            'DrawerTitle',
            'Popover',
            'PopoverArrow',
            'PopoverContent',
            'PopoverTrigger',
        ],
        packages: ['@tabler/icons-vue', '@vueuse/core'],
        plain: true,
    },
    dialog: { packages: ['@tabler/icons-vue', '@vueuse/core', 'reka-ui'], primitives: ['Dialog'] },
    drawer: {
        ui: ['Button', 'ScrollArea'],
        packages: ['@tabler/icons-vue', '@vueuse/core', 'reka-ui'],
        primitives: ['Drawer'],
    },
    overlay: {
        ui: [
            'Dialog',
            'DialogContent',
            'DialogDescription',
            'DialogTitle',
            'Drawer',
            'DrawerContent',
            'DrawerDescription',
            'DrawerTitle',
            'ScrollArea',
        ],
        packages: ['@vueuse/core', 'reka-ui'],
        primitives: ['Dialog', 'Drawer'],
    },
    'overlay-choice': {
        ui: ['Alert', 'AlertDescription', 'Button', 'Overlay'],
        packages: ['@tabler/icons-vue'],
        plain: true,
    },
    'overlay-details': {
        ui: ['Alert', 'AlertDescription', 'Button', 'CodePanel', 'Overlay', 'Tabs'],
        packages: ['@tabler/icons-vue'],
        plain: true,
    },
    'overlay-notice': { ui: ['Button', 'Overlay'], packages: ['@tabler/icons-vue'], plain: true },
    popover: {
        ui: ['Tooltip', 'TooltipContent', 'TooltipProvider', 'TooltipTrigger'],
        packages: ['@vueuse/core', 'reka-ui'],
        primitives: ['Popover'],
    },
    sheet: { packages: ['@tabler/icons-vue', '@vueuse/core', 'reka-ui'], primitives: ['Dialog'] },
    toast: { packages: ['@tabler/icons-vue', '@vueuse/core', 'reka-ui'], primitives: ['Toast'] },
    tooltip: { packages: ['@vueuse/core', 'reka-ui'], primitives: ['Tooltip'] },
};

export function overlayModule(name: string): string | undefined {
    if (name === 'Toaster') return 'toast';
    // Match longer names first so OverlayChoice is not treated as Overlay.
    return Object.keys(overlayModules)
        .sort((a, b) => overlayModules[b].length - overlayModules[a].length)
        .find((module) => name.startsWith(overlayModules[module]));
}
export function overlayDependencyMarkdown(name: string, storybook = false): string {
    const config: Dependencies =
        name === 'CommandDialog'
            ? {
                  ui: ['Command', 'Dialog', 'DialogContent', 'DialogDescription', 'DialogTitle'],
                  plain: true,
              }
            : (dependencies[overlayModule(name) ?? ''] ?? {});
    return componentDependenciesMarkdown(
        {
            components: (config.ui ?? []).map((name) => ({
                name,
                url: '/components/api/' + uiLinks[name][0],
                storybook: '/docs/' + uiLinks[name][1] + '--docs',
            })),
            packages: [
                ...(config.packages ?? []),
                ...(config.plain ? [] : ['clsx', 'tailwind-merge']),
                'vue',
            ],
            primitives: (config.primitives ?? []).map((name) => ({
                name: 'Reka UI ' + name,
                url:
                    'https://reka-ui.com/docs/components/' +
                    name.toLowerCase().replaceAll(' ', '-'),
            })),
        },
        storybook,
    );
}

type Copy = {
    props: Record<string, string>;
    events: Record<string, string>;
    slots: Record<string, string>;
};
export const overlayClassComponents = [
    'Command',
    'ContextMenuCheckboxItem',
    'ContextMenuContent',
    'ContextMenuItem',
    'ContextMenuLabel',
    'ContextMenuRadioItem',
    'ContextMenuSeparator',
    'ContextMenuShortcut',
    'ContextMenuSubContent',
    'ContextMenuSubTrigger',
    'DialogContent',
    'DialogDescription',
    'DialogTitle',
    'DialogFooter',
    'DrawerContent',
    'DrawerDescription',
    'DrawerFooter',
    'DrawerHeader',
    'DrawerTitle',
    'Overlay',
    'PopoverArrow',
    'PopoverContent',
    'SheetContent',
    'SheetDescription',
    'SheetFooter',
    'SheetHeader',
    'SheetTitle',
    'Toast',
    'Toaster',
    'TooltipContent',
];
const commonProps: Record<string, string> = {
    class: 'Additional CSS classes for the component surface.',
    style: 'Additional inline styles for the notification host.',
    as: 'The HTML element or Vue component to render.',
    asChild: 'Merge the component’s behaviour and attributes into its child.',
    open: 'The controlled visibility; bind with v-model:open to manage it.',
    defaultOpen: 'The initial visibility when no open binding is supplied.',
    modal: 'Use modal focus and interaction behaviour while open.',
    disabled: 'Prevent interaction with this component.',
    dir: 'Set the reading direction; inherits the surrounding provider when omitted.',
    unmountOnHide: 'Remove hidden content from the DOM when it is not mounted for display.',
    forceMount: 'Keep the primitive mounted for custom presence or animation handling.',
    loop: 'Wrap keyboard navigation between the first and last items.',
    memoDependencies: 'Values that invalidate the content’s rendering optimisation.',
    side: 'The preferred side of the positioning reference.',
    sideOffset: 'The distance from the positioning reference, in pixels.',
    sideFlip: 'Allow the content to switch sides when space is limited.',
    align: 'Align the content with the start, centre or end of its reference.',
    alignOffset: 'The offset along the alignment axis, in pixels.',
    alignFlip: 'Allow alignment to change when space is limited.',
    avoidCollisions: 'Adjust positioning to keep the content within its collision boundaries.',
    collisionBoundary: 'The element or elements that constrain collision handling.',
    collisionPadding: 'The minimum distance from collision boundaries, in pixels.',
    arrowPadding: 'The minimum distance between an arrow and the content corners, in pixels.',
    hideShiftedArrow: 'Hide an arrow when it has shifted away from the reference centre.',
    sticky: 'Control how the content stays attached to its reference near a boundary.',
    hideWhenDetached: 'Hide the content when its positioning reference is no longer visible.',
    positionStrategy: 'Use fixed or absolute positioning for the floating content.',
    updatePositionStrategy: 'Choose optimised positioning updates or continuous updates.',
    disableUpdateOnLayoutShift: 'Skip automatic position updates caused by layout shifts.',
    prioritizePosition: 'Prefer the requested position when resolving collisions.',
    reference: 'The element or virtual reference used to position the content.',
    disableOutsidePointerEvents: 'Prevent pointer interaction with elements outside the content.',
    title: 'The accessible heading displayed for the overlay.',
    description:
        'Supporting text below the heading; a description slot takes precedence when available.',
    size: 'The maximum content width, from sm to 7xl or full.',
    closeLabel: 'The accessible label for the built-in close button.',
    showClose: 'Show the built-in close button.',
    closeDisabled: 'Disable the built-in close button; other dismissal routes remain separate.',
    loading: 'Block dismissal while application work is pending.',
    dismissible:
        'Allow dismissal through Escape, outside interaction and the built-in close control.',
    widthClass: 'Additional width classes for the desktop dialog.',
    variant: 'Choose the default or danger presentation.',
    icon: 'The heading icon component; null hides the icon.',
    value: 'The value associated with this menu option.',
    textValue: 'The text used for keyboard typeahead when the visible content is more complex.',
    inset: 'Indent the content to align with items that include an indicator or icon.',
};
const commonEvents: Record<string, string> = {
    'update:open': 'Emitted when visibility changes, with the requested open state.',
    'update:modelValue': 'Emitted when the selected or checked value changes.',
    select: 'Emitted when the item is selected; prevent default to keep the menu open.',
    openAutoFocus: 'Emitted before focus moves into the content; can be prevented.',
    closeAutoFocus: 'Emitted before focus returns after closing; can be prevented.',
    escapeKeyDown: 'Emitted when Escape is pressed in the content; can be prevented.',
    pointerDownOutside: 'Emitted on a pointer press outside the content; can be prevented.',
    focusOutside: 'Emitted when focus moves outside the content; can be prevented.',
    interactOutside:
        'Emitted on focus or pointer interaction outside the content; can be prevented.',
    entryFocus: 'Emitted before keyboard focus enters the submenu; can be prevented.',
};
function copy(
    props: Record<string, string> = {},
    slots: Record<string, string> = {},
    events: Record<string, string> = {},
): Copy {
    return { props: { ...commonProps, ...props }, slots, events: { ...commonEvents, ...events } };
}
const contentSlot = { default: 'The visible content of this part.' };
const triggerSlot = {
    default: 'The trigger label, or a single trigger element when using asChild.',
};
const commandProps = {
    items: 'The commands to search and display, each with a stable value and visible label.',
    filterOptions: 'The available type filters, each with a value and label.',
    placeholder: 'The search input placeholder; uses the translated fallback when omitted.',
    loading: 'Show loading feedback and disable search, filters and command selection.',
    query: 'The search text; bind with v-model:query to manage it.',
    filters: 'The selected command type values; an empty array includes all types.',
};
const commandEvents = {
    select: 'Emitted when an enabled command is chosen, with its complete item record.',
    'update:query': 'Emitted when the search text changes.',
    'update:filters': 'Emitted when the selected type filters change.',
};
const commandSlots = {
    item: 'Custom command content; receives the item record.',
    footer: 'Additional content below the command list.',
};
const toastProps = {
    id: 'The notification host id used to route messages to a specific host.',
    theme: 'The notification theme: light, dark or system.',
    position: 'The screen corner or edge centre used for notifications.',
    closeButtonPosition: 'The corner used for notification close buttons.',
    hotkey: 'The key combination used to focus the notification region.',
    richColors: 'Use semantic background and border colours for status notifications.',
    expand: 'Expand the notification stack; inline mode always expands it.',
    duration: 'The default notification lifetime in milliseconds; use Infinity to retain messages.',
    gap: 'The space between stacked notifications, in pixels.',
    visibleToasts: 'The maximum visible notifications in the floating stack; inline mode uses 100.',
    closeButton: 'Show notification close buttons; Miru enables them when omitted.',
    toastOptions: 'Shared notification options and class overrides, merged with Miru defaults.',
    offset: 'The notification region’s distance from the viewport edges.',
    mobileOffset: 'The notification region’s viewport offsets on smaller screens.',
    dir: 'The notification reading direction: ltr, rtl or auto.',
    swipeDirection: 'The direction in which notifications can be swiped away.',
    swipeThreshold: 'The swipe distance in pixels required to dismiss a notification.',
    disableSwipe: 'Prevent notifications from being dismissed by swiping.',
    icons: 'Custom status and close icon components; named icon slots can replace them.',
    containerAriaLabel:
        'The accessible notification-region label; uses the translated fallback when omitted.',
    appearance: 'The Miru notification surface: flat, frost or graphite.',
    inline: 'Render notifications within the page flow rather than in a fixed viewport stack.',
};
const toastSlots = {
    'success-icon': 'Replace the success notification icon.',
    'info-icon': 'Replace the information notification icon.',
    'warning-icon': 'Replace the warning notification icon.',
    'error-icon': 'Replace the error notification icon.',
    'loading-icon': 'Replace the pending notification icon.',
    'close-icon': 'Replace the notification close icon.',
};
const tooltipProps = {
    delayDuration: 'The hover delay before showing a tooltip, in milliseconds.',
    skipDelayDuration: 'The interval in which another tooltip can open without the normal delay.',
    disableHoverableContent:
        'Close the tooltip when the pointer leaves its trigger instead of allowing hover over the content.',
    disableClosingTrigger: 'Keep the tooltip from closing when its trigger is clicked.',
    ignoreNonKeyboardFocus:
        'Show focus-triggered hints only when focus comes from keyboard interaction.',
};

export const overlayApiCopy: Record<string, Copy> = {
    Command: copy(
        {
            ...commandProps,
            label: 'The accessible name for the command list and search input.',
            emptyLabel: 'The message shown when no commands match.',
            autoFocus: 'Focus the search input when the command list is mounted.',
        },
        commandSlots,
        commandEvents,
    ),
    CommandDialog: copy(
        {
            ...commandProps,
            title: 'The accessible dialog title, visually hidden in the palette.',
            description: 'The accessible dialog description, visually hidden in the palette.',
            closeOnSelect: 'Close the dialog after a command is selected.',
        },
        {
            ...commandSlots,
            trigger:
                'The control that opens the palette; use DialogTrigger or manage open in the application.',
        },
        commandEvents,
    ),
    ContextMenu: copy(
        { pressOpenDelay: 'The touch-press delay before opening the menu, in milliseconds.' },
        { default: 'The context-menu trigger and menu content.' },
    ),
    ContextMenuCheckboxItem: copy(
        { modelValue: 'The checked or indeterminate state of this menu option.' },
        { ...contentSlot, 'indicator-icon': 'Replace the checked-state indicator icon.' },
    ),
    ContextMenuContent: copy(
        {},
        { default: 'The menu items, groups, separators and nested menus.' },
    ),
    ContextMenuGroup: copy({}, { default: 'The related menu items in this group.' }),
    ContextMenuItem: copy(
        { variant: 'Use default styling or danger styling for a destructive action.' },
        contentSlot,
    ),
    ContextMenuLabel: copy({}, { default: 'The non-interactive menu heading.' }),
    ContextMenuRadioGroup: copy(
        { modelValue: 'The value selected by this group’s radio items.' },
        { default: 'The radio menu items sharing this selection.' },
    ),
    ContextMenuRadioItem: copy(
        {},
        { ...contentSlot, 'indicator-icon': 'Replace the selected-state indicator icon.' },
    ),
    ContextMenuSeparator: copy(),
    ContextMenuShortcut: copy(
        {},
        { default: 'The shortcut label; displaying it does not register a keyboard shortcut.' },
    ),
    ContextMenuSub: copy({}, { default: 'The submenu trigger and submenu content.' }),
    ContextMenuSubContent: copy({}, { default: 'The nested menu items and groups.' }),
    ContextMenuSubTrigger: copy(
        {
            graceDuration:
                'The pointer grace period while moving towards the submenu, in milliseconds.',
        },
        { default: 'The submenu trigger label and optional icon.' },
    ),
    ContextMenuTrigger: copy({}, triggerSlot),
    ContextMenuPortal: copy(
        {
            to: 'The selector or element that receives the portalled content.',
            disabled: 'Render content in place instead of moving it into a portal.',
            defer: 'Resolve the portal target after the current render cycle.',
        },
        contentSlot,
    ),
    Description: copy(
        {
            title: 'The accessible trigger label and the heading shown in drawer mode.',
            description: 'The main supporting text.',
            details: 'Optional further explanation below the main description.',
            breakpoint: 'The media query that switches from a drawer to a popover.',
            alignOffset:
                'The desktop alignment offset in pixels; defaults to 0 for centre or -8 otherwise.',
            arrowPadding:
                'The minimum desktop arrow clearance from the popover corners, in pixels.',
            side: 'The preferred side of the desktop popover.',
            align: 'The desktop popover alignment relative to its trigger.',
        },
        {
            trigger: 'A custom trigger element; replaces the default information button.',
            default: 'Additional supporting content after the description and details.',
        },
    ),
    Dialog: copy({}, { default: 'The trigger and composed dialog content.' }),
    DialogContent: copy({}, { default: 'The dialog heading, description, body and actions.' }),
    DialogDescription: copy({}, { default: 'The text describing the dialog’s purpose.' }),
    DialogTitle: copy({}, { default: 'The text naming the dialog.' }),
    DialogFooter: copy(
        { border: 'Add a top border and spacing above the footer actions.' },
        { default: 'The dialog actions or other footer content.' },
    ),
    Drawer: copy(
        {
            modal: 'Use a modal drawer (true), trap focus while allowing outside pointer events (trap-focus), or use non-modal behaviour (false).',
            swipeDirection: 'The swipe direction used to dismiss the drawer.',
            snapPoints:
                'The snap positions: fractions from 0 to 1, pixel values greater than 1, or px/rem strings.',
            snapPoint: 'The active snap position; bind with v-model:snapPoint to manage it.',
            defaultSnapPoint:
                'The initial snap position; falls back to the first resolved snap point.',
            snapToSequentialPoints:
                'Move through adjacent snap positions instead of snapping to the nearest one.',
        },
        { default: 'The trigger and composed drawer content.' },
        {
            'update:open':
                'Emitted with the requested visibility and change details; call details.cancel() to reject the change.',
            'update:openComplete':
                'Emitted after the drawer finishes its opening or closing transition.',
            'update:snapPoint': 'Emitted when the active snap position changes.',
        },
    ),
    DrawerContent: copy(
        {
            initialFocus:
                'Focus content automatically, suppress initial focus, or focus a supplied element.',
            finalFocus:
                'Restore focus automatically, suppress restoration, or focus a supplied element.',
            showHandle: 'Show the draggable drawer handle.',
            maxHeight: 'The drawer height limit as a CSS length or a number of pixels.',
            contentSize: 'The maximum width of the inner drawer frame.',
            contentClass: 'Additional CSS classes for the inner drawer frame.',
            scrollable:
                'Wrap the main content in ScrollArea while leaving the header and footer outside it.',
        },
        {
            header: 'Content above the scrolling body.',
            default: 'The drawer’s main body.',
            footer: 'Content below the scrolling body.',
        },
    ),
    DrawerHeader: copy({}, { default: 'The drawer heading and supporting text.' }),
    DrawerFooter: copy({}, { default: 'The drawer actions or other footer content.' }),
    DrawerTitle: copy({}, { default: 'The text naming the drawer.' }),
    DrawerDescription: copy({}, { default: 'The text describing the drawer’s purpose.' }),
    Overlay: copy(
        {
            drawerSnapPoints: 'The snap positions forwarded to the mobile drawer.',
            drawerMaxHeight:
                'The mobile drawer height limit as a CSS length or a number of pixels.',
            wide: 'Use a 6xl desktop dialog; takes precedence over size.',
            size: 'The desktop dialog width; defaults to 2xl, or 5xl for the mobile drawer’s inner frame.',
            flush: 'Remove the body viewport’s default horizontal and bottom padding.',
            fixedFrame: 'Give the desktop dialog a fixed height of 90dvh.',
            bodyClass: 'Additional CSS classes for the body’s scroll viewport.',
            class: 'Additional CSS classes for the active dialog or drawer surface.',
        },
        {
            trigger:
                'The opening control; use OverlayTrigger to follow the responsive presentation.',
            description: 'Custom supporting content below the title.',
            default: 'The scrolling body; receives desktop and a guarded close callback.',
            footer: 'The fixed action area; receives desktop and a guarded close callback.',
        },
    ),
    OverlayTrigger: copy({}, triggerSlot),
    OverlayChoice: copy(
        {
            loading: 'Show a pending confirmation and block both actions and dismissal.',
            primary:
                'Overrides for the confirmation action: label, variant, size, icon and disabled.',
            secondary: 'Overrides for the cancel action: label, variant, size, icon and disabled.',
            triggerLabel:
                'The action label used to choose a fallback confirmation icon; does not render a trigger.',
            disabled: 'Disable confirmation while leaving cancellation available.',
            error: 'The error message displayed in an Alert; also enables danger presentation.',
            closeOnConfirm:
                'Close immediately after confirmation; otherwise the application controls closing.',
        },
        {
            trigger: 'The control that opens the confirmation overlay.',
            description: 'Custom supporting content below the title.',
            default: 'Additional content before any error message.',
            'confirm-icon': 'Replace the confirmation button icon.',
        },
        {
            confirm: 'Emitted when the enabled confirmation action is pressed.',
            cancel: 'Emitted when the cancel action closes the overlay; other dismissal routes do not emit it.',
        },
    ),
    OverlayDetails: copy(
        {
            loading:
                'Show a loading message instead of code and block dismissal while work is pending.',
            sections:
                'The code sections, each with a unique id, label, value and optional language.',
            activeTab: 'The selected section id; falls back to the first available section.',
            format: 'Format the displayed code through CodePanel.',
            lineNumbers: 'Show line numbers in CodePanel.',
            maxHeight: 'The code viewport height limit as a CSS length or a number of pixels.',
            error: 'An error message displayed instead of the code sections.',
        },
        {
            trigger: 'The control that opens the details overlay.',
            description: 'Custom supporting content below the title.',
        },
        {
            close: 'Emitted when the footer close action is pressed; other dismissal routes do not emit it.',
            'update:activeTab':
                'Emitted when the selected section changes or its id is no longer available.',
        },
    ),
    OverlayNotice: copy(
        { closeButton: 'Overrides for the close action: label, variant, size, icon and disabled.' },
        {
            trigger: 'The control that opens the notice.',
            description: 'Custom supporting content below the title.',
            default: 'Additional notice content.',
            actions: 'Extra actions displayed before the standard close button.',
        },
        {
            close: 'Emitted when the standard close action is pressed; other dismissal routes do not emit it.',
        },
    ),
    Popover: copy({}, { default: 'The trigger and content; receives open and a close callback.' }),
    PopoverAnchor: copy({}, contentSlot),
    PopoverArrow: copy({
        width: 'The arrow width in pixels.',
        height: 'The arrow height in pixels.',
        rounded: 'Use the rounded arrow shape.',
    }),
    PopoverContent: copy({}, { default: 'The contextual content and optional PopoverArrow.' }),
    PopoverTrigger: copy(
        {
            tooltip: 'An optional hint hidden while the popover is open.',
            tooltipSide: 'The preferred side of the trigger tooltip.',
            tooltipAlign: 'The alignment of the trigger tooltip.',
            tooltipDelayDuration: 'The trigger tooltip’s hover delay, in milliseconds.',
        },
        triggerSlot,
    ),
    Sheet: copy(
        {},
        { default: 'The trigger and sheet content; receives open and a close callback.' },
    ),
    SheetClose: copy(
        {},
        { default: 'The close label, or a single close control when using asChild.' },
    ),
    SheetContent: copy(
        { side: 'The screen edge from which the sheet enters.' },
        { default: 'The sheet heading, description, body and actions.' },
    ),
    SheetDescription: copy({}, { default: 'The text describing the sheet’s purpose.' }),
    SheetFooter: copy({}, { default: 'The sheet actions or other footer content.' }),
    SheetHeader: copy({}, { default: 'The sheet heading and supporting text.' }),
    SheetTitle: copy({}, { default: 'The text naming the sheet.' }),
    SheetTrigger: copy({}, triggerSlot),
    Toast: copy(toastProps, toastSlots),
    Toaster: copy(toastProps, toastSlots),
    Tooltip: copy(tooltipProps, {
        default: 'The trigger and tooltip content; receives the current open state.',
    }),
    TooltipContent: copy(
        {
            ariaLabel: 'An accessible text alternative when the visible content needs one.',
            showArrow: 'Show the decorative pointer towards the trigger.',
            variant: 'The tooltip colour or appearance, using the supported theme variants.',
        },
        { default: 'The brief hint shown for the trigger.' },
    ),
    TooltipProvider: copy(
        { ...tooltipProps, content: 'Shared default content props for descendant tooltips.' },
        { default: 'The tooltips sharing these interaction settings.' },
    ),
    TooltipTrigger: copy({}, triggerSlot),
};

export const overlayNotes: Record<string, { title: string; text: string }[]> = {
    command: [
        {
            title: 'Commands and filtering',
            text: 'Each CommandItem needs a unique `value` and a `label`. Optional fields are `description`, `group`, `type`, `keywords`, `icon`, `shortcut` and `disabled`. Search matches every word against the label, description and keywords; selected filters match `item.type`. Handle `select` in the application to run an action or navigate. Shortcut labels are display text and do not register shortcuts.\n\nUse [CommandDialog](/components/api/command-dialog) for a palette, with `v-model:open`, `v-model:query` and `v-model:filters`. Supply its required title and description for assistive technology. `closeOnSelect` defaults to true.',
        },
    ],
    'context-menu': [
        {
            title: 'Menu interaction',
            text: 'Compose ContextMenuTrigger and ContextMenuContent within ContextMenu. Keep the trigger focusable when keyboard users need to open the menu. Use `asChild` with an existing control to preserve its element.\n\nBind `v-model` on checkbox items or radio groups to retain selection. Prevent an item’s `select` event to keep the menu open. ContextMenuContent already portals its content; use ContextMenuPortal when composing parts that need an explicit portal. ContextMenuShortcut only displays a label.',
        },
    ],
    description: [
        {
            title: 'Responsive presentation',
            text: 'The default breakpoint is `(min-width: 768px)`: matching screens use a Popover and smaller screens use a Drawer. Changing presentation closes the current view. Positioning props apply to the popover. The title labels the information trigger and appears as a heading in drawer mode; use the default slot for extra content.',
        },
    ],
    dialog: [
        {
            title: 'Composition and dismissal',
            text: 'Place DialogTitle and DialogDescription inside DialogContent and provide the required `closeLabel`. DialogTrigger and DialogClose are re-exported from Reka UI for opening and closing controls. Bind `v-model:open` to manage visibility or use `defaultOpen` for initial local state.\n\n`showClose` and `closeDisabled` affect the built-in close button. To block Escape or outside dismissal, prevent the corresponding content events. Use [Overlay](/components/api/overlay) when a shared `loading` or `dismissible` policy and responsive presentation are needed.',
        },
    ],
    drawer: [
        {
            title: 'Snap positions and scrolling',
            text: 'A downward drawer uses `[0.5, 0.9]` snap positions when `snapPoints` is omitted; other directions have no automatic snap points. Positions accept viewport fractions from 0 to 1, pixel values greater than 1, or px/rem strings. The initial position is `defaultSnapPoint` or the first resolved point.\n\nDrawerContent keeps its header and footer outside the default ScrollArea. Set `scrollable=false` when the body provides its own scrolling. DrawerTrigger, DrawerClose and DrawerHandle are re-exported from Reka UI. Handle `update:open` and call the supplied `details.cancel()` to reject a visibility change.',
        },
    ],
    overlay: [
        {
            title: 'Responsive layout and closing',
            text: 'Overlay uses a dialog from 768px and a drawer below that width. Use OverlayTrigger inside its trigger slot so opening follows the current presentation. The body scrolls separately from the header and footer; `flush`, `fixedFrame` and `bodyClass` adjust that layout.\n\n`loading` blocks component-requested closing. `dismissible=false` also blocks Escape, outside interaction and the slot’s `close()` callback. The application can still close the overlay by updating its bound `open` value.',
        },
    ],
    'overlay-choice': [
        {
            title: 'Confirmation state',
            text: 'Handle `confirm` in the application, set `loading` while work runs and update `open` after success. `closeOnConfirm` defaults to false so errors can remain visible. The `error` prop displays an Alert and switches the heading to danger styling.\n\nThe `primary` and `secondary` action objects accept `label`, `variant`, `size`, `icon` and `disabled`; use `icon: null` to hide a fallback icon. `disabled` blocks confirmation, while `loading` blocks both actions. The cancel button emits `cancel`; Escape and outside dismissal only update `open`.',
        },
    ],
    'overlay-details': [
        {
            title: 'Code sections',
            text: 'The public export is `OverlayDetails`. Supply CodeSection records with a stable `id`, `label`, `value` and optional `language`; omitted languages use JSON. Multiple sections show tabs, and `v-model:activeTab` controls the selected section. Empty sections show an empty-state message; loading and error states replace the code view. The footer close button emits `close`, while other dismissal routes only update `open`.',
        },
    ],
    'overlay-notice': [
        {
            title: 'Notice actions',
            text: 'Use `closeButton` to customise the standard action, or add controls through the actions slot. The action object accepts `label`, `variant`, `size`, `icon` and `disabled`; `icon: null` hides its icon. The standard close action emits `close`; Escape and outside dismissal only update `open`. `loading` blocks dismissal, while `dismissible=false` still allows the explicit footer close action.',
        },
    ],
    popover: [
        {
            title: 'Positioning and trigger hints',
            text: 'Configure `side`, `align` and offsets on PopoverContent. Add PopoverArrow for a pointer, or PopoverAnchor for a positioning reference separate from the trigger. The content is portalled automatically.\n\nUse the optional `tooltip` prop on PopoverTrigger for a hint on the same control. It is hidden while the popover is open; `tooltipSide`, `tooltipAlign` and `tooltipDelayDuration` configure its placement and timing. Use `asChild` with an existing button.',
        },
    ],
    sheet: [
        {
            title: 'Sheet composition',
            text: 'Sheet uses Reka UI Dialog primitives, with an edge transition controlled by SheetContent’s `side`. Include SheetTitle and SheetDescription for an accessible heading and explanation. Use SheetTrigger and SheetClose for controls, and bind `v-model:open` when the application owns visibility. Hiding or disabling the close button does not block Escape or outside dismissal; prevent the relevant content events when needed.',
        },
    ],
    toast: [
        {
            title: 'Notification host',
            text: 'Mount one Toast host in a persistent application layout, then create messages through the exported `toast` API or [useToast](/docs/composables/useToast). `Toaster` is an alias of the same component. Each named host uses its own Reka UI toast manager; match the host `id` with the `toasterId` notification option.\n\n`appearance` selects flat, frost or graphite surfaces; `richColors` adds semantic status colours. `inline` renders an expanded stack in the page flow and uses a visible limit of 100. Set shared notification options through `toastOptions`, replace status and close icon slots, or configure swipe dismissal with `swipeDirection`, `swipeThreshold` and `disableSwipe`.',
        },
    ],
    tooltip: [
        {
            title: 'Shared timing and composition',
            text: 'Wrap related tooltips in TooltipProvider to share delays; Miru’s provider defaults to 300ms. Compose TooltipTrigger and TooltipContent inside each Tooltip. Put content positioning, `variant` and `showArrow` on TooltipContent; keep the trigger focusable and give icon-only buttons their own accessible label.\n\nUse Tooltip for brief explanatory text. Use [Popover](/components/api/popover) for content with interactive controls. For a tooltip on a popover’s own trigger, prefer PopoverTrigger’s integrated `tooltip` prop.',
        },
    ],
};

/** Controls may configure a composed part or example content rather than the story's root. */
export function describeOverlayControls(
    component: string,
    argTypes: Record<string, unknown> | undefined,
): void {
    for (const [name, control] of Object.entries(argTypes ?? {})) {
        if (!argTypes || !control || typeof control !== 'object') continue;
        const table =
            'table' in control && control.table && typeof control.table === 'object'
                ? control.table
                : {};
        let owner = component;
        let description: string | undefined;
        const exampleCopy: Record<string, Record<string, string>> = {
            Command: {
                dialog: 'Present this example in CommandDialog.',
                narrow: 'Use a narrow preview container.',
                empty: 'Supply an empty command list.',
            },
            Dialog: {
                title: 'The example dialog heading rendered in DialogTitle.',
                description: 'The example supporting text rendered in DialogDescription.',
            },
            Sheet: {
                title: 'The example sheet heading rendered in SheetTitle.',
                description: 'The example supporting text rendered in SheetDescription.',
            },
            Drawer: {
                longContent: 'Show extra body content to demonstrate scrolling.',
                startHeight: 'The initial downward snap fraction used by this example.',
            },
        };
        description = exampleCopy[component]?.[name];
        let category = description ? 'Example content' : component + ' props';
        if (component === 'Dialog' && name === 'size') owner = 'DialogContent';
        if (component === 'Dialog' && name === 'footerBorder') {
            owner = 'DialogFooter';
            description = overlayApiCopy.DialogFooter.props.border;
        }
        if (
            component === 'Drawer' &&
            ['showHandle', 'maxHeight', 'contentSize', 'scrollable'].includes(name)
        )
            owner = 'DrawerContent';
        if (component === 'Popover' && ['side', 'align', 'sideOffset'].includes(name))
            owner = 'PopoverContent';
        if (component === 'Sheet' && name === 'side') owner = 'SheetContent';
        if (component === 'Tooltip' && ['side', 'align', 'sideOffset', 'variant'].includes(name))
            owner = 'TooltipContent';
        if (owner !== component) category = owner + ' props';
        if (component === 'OverlayDetails' && name === 'class') {
            description = 'Additional CSS classes forwarded to the overlay surface.';
            category = 'Overlay attributes';
        }
        argTypes[name] = {
            ...control,
            description: description ?? overlayApiCopy[owner]?.props[name],
            table: { ...table, category },
        };
    }
}

