import { accordionDependencyMarkdown } from './accordion-documentation';
import { alertDependencyMarkdown } from './alert-documentation';
import { anchorDependencyMarkdown } from './anchor-documentation';
import {
    attachmentDependencyMarkdown,
    attachmentListDependencyMarkdown,
} from './attachment-documentation';
import { avatarDependencyMarkdown, avatarStackDependencyMarkdown } from './avatar-documentation';
import { badgeDependencyMarkdown, badgeCopyDependencyMarkdown } from './badge-documentation';
import { breadcrumbDependencyMarkdown } from './breadcrumb-documentation';
import { buttonDependencyMarkdown } from './button-documentation';
import { cardDependencyMarkdown } from './card-documentation';
import { carouselDependencyMarkdown } from './carousel-documentation';
import { codeDependencyMarkdown } from './code-documentation';
import { componentSummary } from './component-documentation';
import { extensionSummaries, extensionDependencyMarkdown } from './extensions-documentation';
import { formComponentDependencies } from './form-components-documentation';
import { formFieldSummaries, formFieldDependencyMarkdown } from './form-fields-documentation';
import { indicatorDependencyMarkdown } from './indicator-documentation';
import { itemDependencyMarkdown } from './item-documentation';
import { kbdDependencyMarkdown } from './kbd-documentation';
import { markerDependencyMarkdown } from './marker-documentation';
import { overlaySummaries, overlayDependencyMarkdown } from './overlay-documentation';
import { paginationDependencyMarkdown } from './pagination-documentation';
import { progressDependencyMarkdown } from './progress-documentation';
import { separatorDependencyMarkdown } from './separator-documentation';
import { skeletonDependencyMarkdown } from './skeleton-documentation';
import { spinnerDependencyMarkdown } from './spinner-documentation';
import { tabsDependencyMarkdown } from './tabs-documentation';
import { utilitySummaries, utilityDependencyMarkdown } from './utilities-documentation';

/** Concise English summaries for Storybook Autodocs; not part of the library build. */
const descriptions = {
    Indicator: ['', '', [], []],
    Stepper: [
        'Multi-step flows with horizontal or vertical indicators, optional bordered headers, inline content, validation and loading actions. Responsive vertical, compact and scroll layouts support mobile screens.',
        '',
        ['Button', 'ScrollArea'],
        ['reka-ui', '@vueuse/core', '@tabler/icons-vue'],
    ],
    Resizable: [
        'Resizable panels powered by reka-ui Splitter. Compose ResizablePanel and ResizableHandle, configure horizontal or vertical layouts, size constraints, optional grips and collapse buttons. Supports keyboard resizing and optional browser persistence.',
        '',
        [],
        ['reka-ui', '@vueuse/core', '@tabler/icons-vue'],
    ],
    ContextMenu: ['', '', [], []],
    Slider: ['', '', [], []],
    Spinner: ['', '', [], []],
    Code: ['', '', [], []],
    Item: ['', '', [], []],
    Kbd: ['', '', [], []],
    Anchor: ['', '', [], ['@tabler/icons-vue', 'class-variance-authority']],
    Attachment: ['', '', [], []],
    AttachmentList: ['', '', [], []],

    Carousel: ['', '', [], []],

    AspectRatio: [
        'Responsive media sizing through reka-ui AspectRatio. Presets: square (1:1), video (16:9), photo (4:3), portrait (3:4), cinema (21:9). A positive number or a width/height string (16x9, 4:3, 4/3) overrides the preset; invalid ratios fall back to 1. Parent layout controls width.',
        '',
        [],
        ['reka-ui'],
    ],
    Drawer: ['', '', [], []],
    Command: ['', '', [], []],
    FilterBar: [
        'Responsive one-line filter chips. size supports sm, default and lg; removable chips have a separate bordered X action, and the overflow badge shows +N for the filters that do not fit. Available width, including the counter badge, is measured with ResizeObserver; the counter opens all filters in a content-sized popover. Each filter remains individually removable. Shared by DataTable and Command. Pass already-localized labels; remove/select events leave state ownership with the host.',
        '',
        ['Badge', 'Popover'],
        ['@vueuse/core', '@tabler/icons-vue'],
    ],
    ButtonGroup: ['', '', [], []],
    EditorJson: ['', '', [], []],
    EditorMarkdown: ['', '', [], []],

    ComboboxField: ['', '', [], []],
    Overlay: ['', '', [], []],
    OverlayChoice: ['', '', [], []],
    OverlayNotice: ['', '', [], []],
    OverlayDetails: ['', '', [], []],
    CodePanel: ['', '', [], []],
    Editor: ['', '', [], []],
    ButtonAction: ['', '', [], []],
    ButtonShadow: ['', '', [], []],
    Accordion: [
        '',
        '',
        ['ScrollArea', 'ButtonAction'],
        ['reka-ui', '@vueuse/core', '@tabler/icons-vue'],
    ],
    Alert: ['', '', ['ButtonAction'], ['class-variance-authority', '@tabler/icons-vue']],
    ApexChart: [
        'Theme-aware, client-mounted ApexCharts adapter. All upstream options and events can be supplied.',
        '',
        [],
        ['apexcharts', 'vue3-apexcharts'],
    ],
    Avatar: ['', '', [], []],
    AvatarStack: ['', '', [], []],
    Badge: ['', '', [], []],
    BadgeCopy: ['', '', [], []],
    Breadcrumb: ['', '', [], []],
    Card: ['', '', [], []],
    CardChart: ['', '', [], []],
    Collapsible: [
        'Controlled or uncontrolled disclosure using accessible trigger and content parts.',
        '',
        [],
        ['reka-ui'],
    ],
    Copy: [
        'Copies text or multiple MIME representations and shows completion feedback.',
        '',
        ['Tooltip'],
        ['@vueuse/core'],
    ],
    DataTable: [
        'MIRU DataTable with native selection/expansion/actions, Count/MultiCounts, sort-order controls, status/badge/date/address/money cells and boolean toggles. Examples also cover grouped subcolumns, stacked cell content, nested subtables, size: 0 automatic remaining width, embedded Compact styling, row slots, custom card layouts, filters, pagination and bulk actions. Query and reorder callbacks run locally; see Integration for the API and factory reference.',
        '',
        ['OverlayChoice', 'DropdownMenu', 'Sheet', 'Checkbox', 'Select'],
        ['@tanstack/vue-table'],
    ],
    Description: ['', '', [], []],
    Dialog: ['', '', [], []],
    DropdownMenu: [
        'Composable menus with actions, checkboxes, radio groups and nested submenus.',
        '',
        [],
        ['reka-ui'],
    ],
    Field: ['', '', [], []],
    Form: ['', '', [], []],
    InputGroup: ['', '', [], []],
    Label: ['', '', [], []],
    Marker: ['', '', [], []],
    Pagination: ['', '', [], []],
    Popover: ['', '', [], []],
    Progress: ['', '', [], []],
    ScrollArea: [
        'Scrollable content with styled vertical and horizontal scrollbars.',
        '',
        [],
        ['reka-ui'],
    ],
    Separator: ['', '', [], []],
    Sheet: ['', '', [], []],
    Skeleton: ['', '', [], []],
    Tabs: ['', '', [], []],
    Toast: ['', '', [], []],
    Tooltip: ['', '', [], []],
    Button: ['', '', [], []],
    Input: ['', '', [], []],
    InputSearch: ['', '', [], []],
    InputPassword: ['', '', [], []],
    InputPhone: ['', '', [], []],
    InputNumber: ['', '', [], []],
    AutoComplete: ['', '', [], []],
    Editable: ['', '', [], []],
    Rating: ['', '', [], []],
    InputPin: ['', '', [], []],
    Textarea: ['', '', [], []],
    Select: ['', '', [], []],
    Checkbox: ['', '', [], []],
    CheckboxGroup: ['', '', [], []],
    RadioBox: ['', '', [], []],
    RadioGroup: ['', '', [], []],
    Switch: ['', '', [], []],
    Toggle: ['', '', [], []],
    ToggleGroup: ['', '', [], []],
    InputTags: ['', '', [], []],
    ColorPicker: ['', '', [], []],
    Calendar: [
        'A shared single/range calendar. weekStartsOn defaults to 1 (Monday); use 0 for Sunday. Block weekdays (0–6), ISO disabledDates, minValue/maxValue, holidays (ISO date → name), or callback rules isDateDisabled/isDateUnavailable. Supplied holidays are blocked unless disableHolidays=false. availability maps dates to { available, closed, holiday, reason }; missing entries remain selectable. Ranges cannot cross blocked days unless allowNonContiguousRanges=true. The day slot exposes date, disabled, unavailable, available, holiday and reason for custom markers/tooltips. v-model:placeholder reports navigation for loading server availability. BookingAvailability demonstrates server-provided TimeSlots; capacity, holiday-region lookup and warning confirmation remain application concerns. InputDateTime forwards the same rules.',
        'Einzel-/Bereichskalender mit Montag als Standard. weekStartsOn (0–6), disabledWeekdays, disabledDates, minValue/maxValue, holidays, availability und Callback-Regeln steuern gesperrte Tage. Der day-Slot liefert Verfügbarkeitsdaten; v-model:placeholder meldet Navigation zum Laden von Backend-Daten. TimeSlots und Kapazitäten kommen aus der Anwendung. InputDateTime reicht die Regeln durch.',
        ['Button', 'Select'],
        ['reka-ui', '@internationalized/date', '@tabler/icons-vue'],
    ],
    InputDateTime: ['', '', [], []],
    InputFile: ['', '', [], []],
    UploadZone: ['', '', [], []],
} as const;

export type DocumentedComponent = keyof typeof descriptions;

/** List composition and runtime packages without exposing development tooling. */
export function componentDescription(name: DocumentedComponent): string {
    if (name === 'Indicator')
        return componentSummary(name) + '\n\n' + indicatorDependencyMarkdown(true);
    if (extensionSummaries[name])
        return componentSummary(name) + '\n\n' + extensionDependencyMarkdown(name, true);
    if (utilitySummaries[name])
        return componentSummary(name) + '\n\n' + utilityDependencyMarkdown(name, true);
    if (overlaySummaries[name])
        return componentSummary(name) + '\n\n' + overlayDependencyMarkdown(name, true);
    if (formFieldSummaries[name])
        return componentSummary(name) + '\n\n' + formFieldDependencyMarkdown(name, true);
    if (['Field', 'Form', 'InputGroup', 'Label'].includes(name))
        return componentSummary(name) + '\n\n' + formComponentDependencies(name, true);
    if (name === 'Tabs') return componentSummary(name) + '\n\n' + tabsDependencyMarkdown(true);
    if (name === 'Skeleton')
        return componentSummary(name) + '\n\n' + skeletonDependencyMarkdown(true);
    if (name === 'Spinner')
        return componentSummary(name) + '\n\n' + spinnerDependencyMarkdown(true);
    if (name === 'Carousel')
        return componentSummary(name) + '\n\n' + carouselDependencyMarkdown(true);
    if (name === 'Marker') return componentSummary(name) + '\n\n' + markerDependencyMarkdown(true);
    if (name === 'Pagination')
        return componentSummary(name) + '\n\n' + paginationDependencyMarkdown(true);
    if (name === 'Progress')
        return componentSummary(name) + '\n\n' + progressDependencyMarkdown(true);
    if (name === 'Separator')
        return componentSummary(name) + '\n\n' + separatorDependencyMarkdown(true);
    if (name === 'Code' || name === 'CodePanel')
        return componentSummary(name) + '\n\n' + codeDependencyMarkdown(name, true);
    if (name === 'Item') return componentSummary(name) + '\n\n' + itemDependencyMarkdown(true);
    if (name === 'Kbd') return componentSummary(name) + '\n\n' + kbdDependencyMarkdown(true);
    if (name === 'Card' || name === 'CardChart')
        return componentSummary(name) + '\n\n' + cardDependencyMarkdown(name, true);
    if (name === 'Breadcrumb')
        return componentSummary(name) + '\n\n' + breadcrumbDependencyMarkdown(true);
    if (['Button', 'ButtonAction', 'ButtonGroup', 'ButtonShadow'].includes(name))
        return componentSummary(name) + '\n\n' + buttonDependencyMarkdown(name, true);
    if (name === 'Badge') return componentSummary(name) + '\n\n' + badgeDependencyMarkdown(true);
    if (name === 'BadgeCopy')
        return componentSummary(name) + '\n\n' + badgeCopyDependencyMarkdown(true);
    if (name === 'Avatar') return componentSummary(name) + '\n\n' + avatarDependencyMarkdown(true);
    if (name === 'AvatarStack')
        return componentSummary(name) + '\n\n' + avatarStackDependencyMarkdown(true);
    if (name === 'Attachment')
        return componentSummary(name) + '\n\n' + attachmentDependencyMarkdown(true);
    if (name === 'AttachmentList')
        return componentSummary(name) + '\n\n' + attachmentListDependencyMarkdown(true);
    if (name === 'Anchor') return componentSummary(name) + '\n\n' + anchorDependencyMarkdown(true);
    if (name === 'Alert') return componentSummary(name) + '\n\n' + alertDependencyMarkdown(true);
    if (name === 'Accordion')
        return componentSummary(name) + '\n\n' + accordionDependencyMarkdown(true);
    const [en, , components, packages] = descriptions[name];
    const list = (items: readonly string[]): string =>
        [...items]
            .sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }))
            .map((item) => '`' + item + '`')
            .join(', ');
    const dependencies = [
        ...(components.length ? ['- **UI:** ' + list(components)] : []),
        '- **Packages:** ' + list(['vue', ...packages, 'clsx', 'tailwind-merge']),
    ];
    return componentSummary(name) + '\n\n### Details\n\n' + en + '\n\n' + dependencies.join('\n');
}
