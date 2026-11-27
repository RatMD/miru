import { componentDependenciesMarkdown } from './component-dependencies.ts';
import { overlayApiCopy, overlaySummaries } from './overlay-documentation.ts';

/** Manually authored utility documentation shared by both documentation sites. */
export const utilityModules: Record<string, string> = {
    'aspect-ratio': 'AspectRatio',
    backdrop: 'Backdrop',
    breakpoint: 'Breakpoint',
    calendar: 'Calendar',
    collapsible: 'Collapsible',
    copy: 'Copy',
    deferred: 'Deferred',
    'dropdown-menu': 'DropdownMenu',
    'editor-frame': 'EditorFrame',
    resizable: 'Resizable',
    'scroll-area': 'ScrollArea',
};
export const utilityClassComponents = [
    'AspectRatio',
    'Backdrop',
    'Copy',
    'DropdownMenuArrow',
    'DropdownMenuCheckboxItem',
    'DropdownMenuContent',
    'DropdownMenuItem',
    'DropdownMenuLabel',
    'DropdownMenuRadioItem',
    'DropdownMenuSeparator',
    'DropdownMenuShortcut',
    'DropdownMenuSubContent',
    'DropdownMenuSubTrigger',
    'EditorFrame',
    'Resizable',
    'ResizableHandle',
    'ResizablePanel',
    'ScrollArea',
    'ScrollBar',
];
export const utilitySummaries: Record<string, string> = {
    AspectRatio:
        'A responsive frame that keeps media at a chosen width-to-height ratio. Use a named preset, a numeric ratio or a width/height expression.',
    Backdrop:
        'A decorative layer for dimming or blurring the page behind content. Supports a radial fade and optional pointer interaction while the application controls visibility.',
    Breakpoint:
        'A renderless component that selects content for a viewport range or orientation. Accepts named or numeric thresholds, with local overrides and predictable server rendering.',
    Calendar:
        'A calendar for selecting a date or date range, with keyboard navigation and localised labels. Supports date restrictions, holiday data and application-provided availability.',
    Collapsible:
        'A section of content that can be expanded or collapsed from an accessible trigger. Supports controlled visibility and optional retention of hidden content.',
    CollapsibleContent: 'The content shown or hidden by a Collapsible section.',
    CollapsibleTrigger: 'An accessible control that toggles its Collapsible section.',
    Copy: 'A button that copies text or several clipboard formats and shows confirmation in a tooltip. Wrap a label or decorative content to compose its appearance.',
    Deferred:
        'An asynchronous content boundary with delayed loading feedback, error handling and retry. Accepts a component loader or async slot content through Vue Suspense.',
    EditorFrame:
        'A shared text-editing surface with a label, toolbar, counter and local command API. Compose extensions or a custom input surface, as used by EditorJSON and EditorMarkdown.',
    Resizable:
        'A group of panels whose sizes can be adjusted with pointer, touch or keyboard input. Supports nested layouts, collapsible panels and optional browser persistence.',
    ResizablePanel:
        'A resizable region with size constraints, optional collapse and an imperative panel API.',
    ResizableHandle: 'A keyboard-accessible resize handle with optional grip and collapse control.',
    ScrollArea:
        'A constrained scrolling region with styled scrollbars and native scrolling behaviour. Supports vertical, horizontal or combined scrolling and optional content-based height.',
    ScrollBar: 'A styled scrollbar for one axis within a ScrollArea.',
};
for (const [name, summary] of Object.entries(overlaySummaries)) {
    if (name.startsWith('ContextMenu'))
        utilitySummaries[name.replace('ContextMenu', 'DropdownMenu')] = summary
            .replace(/context menu/g, 'dropdown menu')
            .replace('opened by right-click or a touch press', 'opened from a trigger');
}
utilitySummaries.DropdownMenu =
    'An action menu opened from an accessible trigger, with keyboard navigation and managed focus. Supports grouped actions, submenus, checkbox items and radio choices.';
utilitySummaries.DropdownMenuTrigger = 'An accessible trigger that opens the dropdown menu.';
utilitySummaries.DropdownMenuArrow =
    'An optional decorative pointer between the menu and its trigger.';

const ui: Record<string, [string, string]> = {
    Button: ['button', 'components-button'],
    Spinner: ['spinner', 'components-spinner'],
    Select: ['select', 'formfields-select'],
    Label: ['label', 'form-label'],
    Textarea: ['textarea', 'formfields-textarea'],
    Tooltip: ['tooltip', 'overlay-tooltip'],
    TooltipContent: ['tooltip/reference#tooltip-content', 'overlay-tooltip'],
    TooltipProvider: ['tooltip/reference#tooltip-provider', 'overlay-tooltip'],
    TooltipTrigger: ['tooltip/reference#tooltip-trigger', 'overlay-tooltip'],
};
const dependencies: Record<
    string,
    { ui?: string[]; packages: string[]; primitives?: [string, string][] }
> = {
    AspectRatio: {
        packages: ['reka-ui', 'clsx', 'tailwind-merge', 'vue'],
        primitives: [['Aspect Ratio', 'aspect-ratio']],
    },
    Backdrop: { packages: ['clsx', 'tailwind-merge', 'vue'] },
    Breakpoint: { packages: ['@vueuse/core', 'vue'] },
    Calendar: {
        ui: ['Button', 'Select'],
        packages: ['@internationalized/date', '@tabler/icons-vue', 'reka-ui', 'vue'],
        primitives: [
            ['Calendar', 'calendar'],
            ['Range Calendar', 'range-calendar'],
        ],
    },
    Collapsible: { packages: ['reka-ui', 'vue'], primitives: [['Collapsible', 'collapsible']] },
    Copy: {
        ui: ['Tooltip', 'TooltipContent', 'TooltipProvider', 'TooltipTrigger'],
        packages: ['@tabler/icons-vue', '@vueuse/core', 'clsx', 'tailwind-merge', 'vue'],
    },
    Deferred: { ui: ['Button', 'Spinner'], packages: ['vue'] },
    DropdownMenu: {
        packages: ['@tabler/icons-vue', '@vueuse/core', 'clsx', 'reka-ui', 'tailwind-merge', 'vue'],
        primitives: [['Dropdown Menu', 'dropdown-menu']],
    },
    EditorFrame: {
        ui: ['Button', 'Label', 'Textarea', 'Tooltip'],
        packages: ['clsx', 'tailwind-merge', 'vue'],
    },
    Resizable: {
        packages: ['@tabler/icons-vue', '@vueuse/core', 'clsx', 'reka-ui', 'tailwind-merge', 'vue'],
        primitives: [['Splitter', 'splitter']],
    },
    ScrollArea: {
        packages: ['@vueuse/core', 'clsx', 'reka-ui', 'tailwind-merge', 'vue'],
        primitives: [['Scroll Area', 'scroll-area']],
    },
};
export function utilityDependencyMarkdown(name: string, storybook = false): string {
    const config = dependencies[name];
    if (!config) return '';
    return componentDependenciesMarkdown(
        {
            components: config.ui?.map((name) => ({
                name,
                url: '/components/' + ui[name][0],
                storybook: '/docs/' + ui[name][1] + '--docs',
            })),
            packages: config.packages,
            primitives: config.primitives?.map(([name, slug]) => ({
                name: 'Reka UI ' + name,
                url: 'https://reka-ui.com/docs/components/' + slug,
            })),
        },
        storybook,
    );
}

type Copy = Partial<Record<'props' | 'events' | 'slots' | 'exposed', Record<string, string>>>;
const common = {
    class: 'Additional CSS classes for this element.',
    as: 'The HTML element or Vue component to render.',
    asChild: 'Merge behaviour and attributes into a single child element.',
    disabled: 'Prevent interaction with this control.',
    forceMount: 'Keep this content mounted when it would otherwise be removed.',
};
const openProps = {
    defaultOpen: 'The initial expanded state when open is uncontrolled.',
    open: 'The controlled expanded state; bind with v-model:open.',
};
const openEvents = { 'update:open': 'Emitted when visibility changes, with the new open state.' };
export const utilityApiCopy: Record<string, Copy> = {
    AspectRatio: {
        props: {
            ...common,
            ratio: 'A positive ratio or width/height expression such as 16x9, 4:3 or 4/3; overrides preset. Invalid values fall back to 1.',
            preset: 'A named ratio: square (1:1), video (16:9), photo (4:3), portrait (3:4) or cinema (21:9).',
        },
        slots: {
            default: 'The media or other framed content; exposes the resolved numeric ratio.',
        },
    },
    Backdrop: {
        props: {
            ...common,
            visible: 'Show the backdrop; visibility remains application-controlled.',
            position:
                'Position relative to the viewport, or absolutely within a positioned container.',
            blur: 'Disable blur, use a preset (4/12/20/32 px), or supply a pixel value; true uses 12 px.',
            faded: 'Fade tint and blur radially from origin towards the farthest corner.',
            origin: 'The radial centre: pixel coordinates relative to the viewport or container, or CSS position lengths.',
            color: 'The CSS colour used to tint the backdrop.',
            interactive: 'Receive pointer clicks; otherwise the layer is pointer-transparent.',
        },
        events: {
            click: 'Emitted on pointer activation when interactive is enabled; the application handles dismissal.',
        },
    },
    Breakpoint: {
        props: {
            min: 'The inclusive minimum viewport width, as a pixel number or named breakpoint.',
            max: 'The exclusive maximum viewport width, as a pixel number or named breakpoint.',
            orientation: 'Require portrait or landscape orientation; omit to match either.',
            breakpoints:
                'Local named widths, overriding application settings and built-in defaults.',
            ssrWidth: 'An initial viewport width shared by server and client rendering.',
            ssrHeight:
                'An initial viewport height; required with ssrWidth for orientation matching.',
        },
        slots: {
            default:
                'Content for a matching viewport; exposes width, height, orientation and current breakpoint.',
            else: 'Content for a non-matching viewport, with the same viewport state.',
        },
    },
    Calendar: {
        props: {
            range: 'Select a date range instead of a single date.',
            modelValue: 'The selected DateValue, or DateRange in range mode; bind with v-model.',
            placeholder:
                'The date controlling the displayed month; bind with v-model:placeholder for navigation.',
            size: 'The size of day controls and calendar spacing.',
            locale: 'The locale for date labels and formatting.',
            weekStartsOn:
                'The first weekday, using Sunday = 0; defaults to Monday independently of locale.',
            minValue: 'The earliest selectable date.',
            maxValue: 'The latest selectable date.',
            disabled: 'Prevent date selection.',
            disabledWeekdays: 'Weekdays to block, using Sunday = 0.',
            disabledDates: 'ISO dates to block, in YYYY-MM-DD format.',
            holidays: 'Holiday labels keyed by ISO date.',
            disableHolidays: 'Prevent selection of dates listed in holidays.',
            availability: 'Availability keyed by ISO date; omitted dates remain selectable.',
            isDateDisabled: 'Additional callback for dates that cannot be selected.',
            isDateUnavailable: 'Additional callback for unavailable dates.',
            allowNonContiguousRanges: 'Allow a selected range to cross unavailable dates.',
            fixedWeeks: 'Keep a consistent number of calendar weeks visible.',
            hideOutsideDays: 'Hide days outside the displayed month.',
            futureYears:
                'The future-year navigation span; defaults to 0 for a single date and 10 for a range.',
            numberOfMonths: 'The number of months displayed together.',
        },
        events: {
            'update:modelValue': 'Emitted when the selected date or range changes.',
            'update:placeholder': 'Emitted when month navigation changes the placeholder date.',
        },
        slots: {
            day: 'Custom day content, including date, disabled, unavailable, availability, holiday and reason state.',
        },
    },
    Collapsible: {
        props: {
            ...common,
            ...openProps,
            unmountOnHide: 'Remove hidden content from the DOM rather than retaining it.',
        },
        events: openEvents,
        slots: { default: 'The trigger and collapsible content; exposes the open state.' },
    },
    CollapsibleContent: {
        props: common,
        slots: { default: 'The content revealed by the trigger.' },
    },
    CollapsibleTrigger: {
        props: common,
        slots: { default: 'The accessible toggle label or control.' },
    },
    Copy: {
        props: {
            ...common,
            content: 'Text to copy, or a map of MIME types to string content.',
            label: 'Override the accessible button label and copied confirmation text.',
            type: 'The MIME type for string content; defaults to text/plain.',
            wrapper: 'Apply the inline wrapper treatment around the slotted content.',
        },
        slots: { default: 'The copy button content; avoid nesting another interactive control.' },
    },
    Deferred: {
        props: {
            loader: 'A component loader receiving signal and attempt; omit to use async slot children.',
            componentProps: 'Props forwarded to the loaded component.',
            delay: 'Delay before loading feedback appears, in milliseconds.',
            timeout: 'Maximum client-side pending time in milliseconds; 0 disables the timeout.',
        },
        events: {
            pending: 'Emitted when an asynchronous attempt begins.',
            loaded: 'Emitted when the current content resolves successfully.',
            error: 'Emitted when loading fails or times out, with the Error.',
        },
        slots: {
            default: 'Async slot content when loader is omitted; exposes retry and attempt.',
            loading: 'Feedback shown after delay while loading; exposes attempt.',
            error: 'Failure feedback; exposes error, retry and attempt.',
        },
        exposed: {
            retry: 'Abort the current attempt and start a new one.',
            pending: 'Whether the current attempt is waiting for content.',
            error: 'The current loading error, or null.',
        },
    },
    EditorFrame: {
        props: {
            wrapperClass:
                'Additional CSS classes for the outer editor frame, label and counter container.',
            ...common,
            modelValue: 'The editor source string; bind with v-model.',
            id: 'The id of the default textarea.',
            label: 'The visible label for the editing surface.',
            labelFor: 'The id associated with the label when using a custom editing surface.',
            name: 'The native textarea name.',
            toolbarLabel:
                'The accessible toolbar label; uses the translated fallback when omitted.',
            extensions: 'Local extensions supplying uniquely identified toolbar commands.',
            disabled: 'Disable editing and all commands.',
            readonly: 'Prevent editing and mutation commands while allowing non-mutating commands.',
            invalid: 'Show the invalid field treatment.',
            required: 'Mark the default textarea as required and display the label marker.',
            placeholder: 'Placeholder text for the default textarea.',
            rows: 'The initial textarea row count.',
            maxlength:
                'Maximum source length; oversized command updates are rejected without truncation.',
            counter: 'Show the character counter below the editor.',
            counterMode: 'Display a count, a count against the limit, or the remaining allowance.',
            locale: 'The locale used to format counter values.',
        },
        events: {
            'update:modelValue': 'Emitted when an accepted edit or command changes the source.',
            blur: 'Emitted when the default textarea loses focus.',
            command: 'Emitted with the id after an enabled command is invoked.',
        },
        slots: {
            default: 'Replace the editing surface; receives api and inputId.',
            toolbar: 'Replace the command toolbar content; receives api.',
            'toolbar-end': 'Append controls to the toolbar; receives api.',
            counter: 'Replace counter content with the formatted counter state.',
            footer: 'Additional content below the editor and counter; receives api.',
        },
        exposed: {
            value: 'The current controlled source string.',
            disabled: 'Whether editing and commands are disabled.',
            readonly: 'Whether mutation commands and edits are blocked.',
            getTextarea: 'Return the first textarea within the frame, or null.',
            getSelection: 'Read the current value and selection start/end offsets.',
            setValue: 'Request an edit while respecting disabled, readonly and maxlength.',
            setSelection: 'Restore focus and selection after the next Vue update.',
            replaceSelection: 'Replace the selected text and restore the caret after the edit.',
            focus: 'Focus the textarea, if present.',
            execute: 'Invoke a registered command by id, applying the command guards.',
        },
    },
    Resizable: {
        props: {
            ...common,
            id: 'A stable group id; generated when omitted.',
            direction: 'Arrange panels horizontally or vertically.',
            disabled: 'Prevent resizing and collapse controls; panel content remains interactive.',
            keyboardResizeBy: 'The size increment used by keyboard resizing.',
            autoSaveId:
                'A persistence key for saving panel sizes; omit to leave persistence disabled.',
            storage: 'A custom synchronous storage adapter for persisted panel sizes.',
        },
        events: { layout: 'Emitted when the panel sizes change, with the current layout.' },
        slots: { default: 'The panels and resize handles, with the primitive group state.' },
    },
    ResizablePanel: {
        props: {
            ...common,
            id: 'A stable panel id used by targeted collapse controls and persistence.',
            defaultSize: 'The initial panel size in the selected sizeUnit.',
            minSize: 'The minimum expanded panel size.',
            maxSize: 'The maximum panel size.',
            sizeUnit: 'Interpret size values as percentages or pixels.',
            order: 'An explicit panel order for dynamic layouts.',
            collapsible: 'Allow the panel to collapse to collapsedSize.',
            collapsedSize:
                'The size retained when collapsed; 0 fully hides and inerts the content.',
        },
        events: {
            resize: 'Emitted when the panel size changes.',
            collapse: 'Emitted when the panel collapses.',
            expand: 'Emitted when the panel expands.',
        },
        slots: { default: 'The panel content, with the primitive panel state.' },
        exposed: {
            collapse: 'Collapse this panel when collapsible.',
            expand: 'Restore the expanded panel size.',
            resize: 'Request a panel size within its constraints.',
            getSize: 'Return the current panel size.',
            isCollapsed: 'Whether the panel is collapsed.',
            isExpanded: 'Whether the panel is expanded.',
        },
    },
    ResizableHandle: {
        props: {
            ...common,
            id: 'The resize handle id; generated when omitted.',
            hitAreaMargins: 'Extra pointer hit areas for fine and coarse input, in pixels.',
            tabindex: 'The handle’s keyboard tab position.',
            nonce: 'The CSP nonce for styles managed by the primitive.',
            showGrip: 'Display a decorative grip at the handle centre.',
            showToggle: 'Show a separate collapse/expand button for a collapsible target panel.',
            toggleTarget: 'The target panel id; defaults to the preceding panel.',
            ariaLabel: 'The accessible resize handle label.',
            expandLabel: 'The accessible label for the expand button.',
            collapseLabel: 'The accessible label for the collapse button.',
        },
        events: {
            dragging: 'Emitted when pointer dragging starts or stops.',
            toggle: 'Emitted after the target panel is toggled, with its collapsed state.',
        },
        slots: { default: 'Replace the default grip content.' },
    },
    ScrollArea: {
        props: {
            ...common,
            orientation: 'Show vertical, horizontal or both scrollbars.',
            fitContent:
                'Let the viewport height follow content up to the inherited maximum height.',
            viewportClass: 'Additional CSS classes for the scrolling viewport.',
            type: 'Control when scrollbars are visible: auto, always, scroll or hover.',
            dir: 'The reading direction for scrolling and scrollbar layout.',
            scrollHideDelay:
                'The delay before scrollbars hide in scroll or hover mode, in milliseconds.',
        },
        slots: { default: 'The scrollable content.' },
    },
    ScrollBar: { props: { ...common, orientation: 'The scrollbar axis.' } },
};
for (const [name, copy] of Object.entries(overlayApiCopy)) {
    if (name.startsWith('ContextMenu'))
        utilityApiCopy[name.replace('ContextMenu', 'DropdownMenu')] = Object.fromEntries(
            Object.entries(copy).map(([kind, entries]) => [
                kind,
                Object.fromEntries(
                    Object.entries(entries).map(([key, text]) => [
                        key,
                        text.replace(/context menu/g, 'dropdown menu'),
                    ]),
                ),
            ]),
        );
}
utilityApiCopy.DropdownMenuTrigger = {
    props: common,
    slots: { default: 'The accessible button or child control that opens the menu.' },
};
utilityApiCopy.DropdownMenuArrow = {
    props: {
        ...common,
        width: 'The arrow width in pixels.',
        height: 'The arrow height in pixels.',
        rounded: 'Round the arrow’s outer edges.',
    },
};

const rootControlProps: Record<string, string[]> = {
    AspectRatio: ['ratio', 'preset'],
    Backdrop: ['visible', 'position', 'blur', 'faded', 'origin', 'color', 'interactive'],
    Breakpoint: ['min', 'max', 'orientation', 'breakpoints', 'ssrWidth', 'ssrHeight'],
    Calendar: [
        'weekStartsOn',
        'minValue',
        'maxValue',
        'disabledWeekdays',
        'disabledDates',
        'holidays',
        'disableHolidays',
        'availability',
        'isDateDisabled',
        'isDateUnavailable',
        'range',
        'size',
        'placeholder',
        'allowNonContiguousRanges',
        'modelValue',
        'locale',
        'fixedWeeks',
        'futureYears',
        'numberOfMonths',
        'hideOutsideDays',
        'disabled',
    ],
    Collapsible: ['defaultOpen', 'open', 'disabled', 'unmountOnHide', 'asChild', 'as'],
    Copy: ['content', 'label', 'type', 'wrapper'],
    Deferred: ['loader', 'componentProps', 'delay', 'timeout'],
    DropdownMenu: ['defaultOpen', 'open', 'dir', 'modal'],
    EditorFrame: [
        'modelValue',
        'id',
        'label',
        'labelFor',
        'name',
        'toolbarLabel',
        'extensions',
        'disabled',
        'readonly',
        'invalid',
        'required',
        'placeholder',
        'rows',
        'maxlength',
        'counter',
        'counterMode',
        'locale',
    ],
    Resizable: [
        'id',
        'autoSaveId',
        'direction',
        'keyboardResizeBy',
        'storage',
        'asChild',
        'as',
        'disabled',
    ],
    ScrollArea: [
        'type',
        'dir',
        'scrollHideDelay',
        'asChild',
        'as',
        'fitContent',
        'orientation',
        'viewportClass',
    ],
};
export function describeUtilityControls(
    root: string,
    argTypes: Record<string, any>,
    meta: { parameters?: Record<string, any> },
) {
    for (const name of rootControlProps[root] ?? []) {
        argTypes[name] ??= {};
        if (
            [
                'loader',
                'extensions',
                'storage',
                'isDateDisabled',
                'isDateUnavailable',
                'as',
            ].includes(name)
        )
            argTypes[name].control = false;
    }
    const parts = Object.keys(utilityApiCopy).filter((name) => name.startsWith(root));
    for (const [name, control] of Object.entries(argTypes)) {
        const description = parts.map((part) => utilityApiCopy[part].props?.[name]).find(Boolean);
        if (description) argTypes[name] = { ...control, description };
    }
    meta.parameters = {
        ...meta.parameters,
        controls: { ...meta.parameters?.controls, include: Object.keys(argTypes) },
    };
}
