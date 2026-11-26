import { accordionSummary } from './accordion-documentation.ts';
import { alertSummary } from './alert-documentation.ts';
import { anchorSummary } from './anchor-documentation.ts';
import { attachmentSummary, attachmentListSummary } from './attachment-documentation.ts';
import { avatarSummary, avatarStackSummary } from './avatar-documentation.ts';
import { badgeSummary, badgeCopySummary } from './badge-documentation.ts';
import { breadcrumbSummary, breadcrumbNotes } from './breadcrumb-documentation.ts';
import { buttonSummaries, buttonNotes } from './button-documentation.ts';
import { cardSummaries, cardNotes } from './card-documentation.ts';
import { carouselSummary, carouselNotes } from './carousel-documentation.ts';
import { codeSummaries, codeNotes } from './code-documentation.ts';
import { extensionSummaries } from './extensions-documentation.ts';
import { formComponentSummaries, formComponentNotes } from './form-components-documentation.ts';
import {
    formFieldModules,
    formFieldSummaries,
    formFieldNotes,
} from './form-fields-documentation.ts';
import { indicatorSummary } from './indicator-documentation.ts';
import { itemSummaries, itemNotes } from './item-documentation.ts';
import { kbdSummaries, kbdNotes } from './kbd-documentation.ts';
import { layoutSummaries } from './layout-documentation.ts';
import { markerSummaries, markerNotes } from './marker-documentation.ts';
import { overlayModules, overlaySummaries, overlayNotes } from './overlay-documentation.ts';
import { paginationSummaries, paginationNotes } from './pagination-documentation.ts';
import { primitiveSummaries } from './primitive-summaries.ts';
import { progressSummary, progressNotes } from './progress-documentation.ts';
import { separatorSummary, separatorNotes } from './separator-documentation.ts';
import { skeletonSummary, skeletonNotes } from './skeleton-documentation.ts';
import { spinnerSummary, spinnerNotes } from './spinner-documentation.ts';
import { stepperSummaries } from './stepper-documentation.ts';
import { tableSummary, tableSummaries, tableNotes } from './table-documentation.ts';
import { tabsSummary, tabsNotes } from './tabs-documentation.ts';
import { utilitySummaries } from './utilities-documentation.ts';

export const componentCopy: Record<string, string> = {
    stepper: stepperSummaries.Stepper,
    table: tableSummary,
    indicator: indicatorSummary,
    backdrop: 'Add a dimmed or blurred layer behind content.',
    breakpoint: 'Render a branch for a named breakpoint or viewport range.',
    deferred: 'Show a loading or error state while an async component resolves.',
    'context-menu': 'Open contextual actions from a right-click trigger.',
    item: itemSummaries.Item,
    button: buttonSummaries.Button,
    'button-action': buttonSummaries.ButtonAction,
    'button-group': buttonSummaries.ButtonGroup,
    'button-shadow': buttonSummaries.ButtonShadow,
    accordion: accordionSummary,
    alert: alertSummary,
    anchor: anchorSummary,
    attachment: attachmentSummary,
    badge: badgeSummary,
    'badge-copy': badgeCopySummary,
    avatar: avatarSummary,
    breadcrumb: breadcrumbSummary,
    card: cardSummaries.Card,
    'card-chart': cardSummaries.CardChart,
    carousel: carouselSummary,
    code: codeSummaries.Code,
    'code-panel': codeSummaries.CodePanel,
    'filter-bar': 'Show active filters and let users remove them.',
    kbd: kbdSummaries.Kbd,
    marker: markerSummaries.Marker,
    pagination: paginationSummaries.Pagination,
    progress: progressSummary,
    spinner: spinnerSummary,
    field: formComponentSummaries.Field,
    form: formComponentSummaries.Form,
    'input-group': formComponentSummaries.InputGroup,
    label: formComponentSummaries.Label,
    input: 'Edit a text value with v-model.',
    'input-search': 'A search input with clear and search controls.',
    'input-password': 'A password input with a visibility toggle.',
    'input-phone': 'Edit a phone number with a country calling code.',
    'input-number': 'Edit a number with increment and decrement controls.',
    'input-pin': 'Enter a one-time code in separate slots.',
    textarea: 'Edit multiple lines of text.',
    'input-date-time': 'Pick a date, time, date-time or time range.',
    'input-file': 'Choose local files. Your app handles the upload.',
    'upload-zone': 'Choose or drop files. Your app owns upload requests and saved files.',
    'input-tags': 'Add and remove a list of tags.',
    checkbox: 'Toggle one boolean choice.',
    'checkbox-group': 'Choose several options from a group.',
    radiobox: 'Show a single radio-style option.',
    'radio-group': 'Choose one option from a group.',
    select: 'Choose one value from a list.',
    combobox: 'Search a list and choose a value.',
    switch: 'Turn a setting on or off.',
    toggle: 'Toggle a pressed state.',
    'toggle-group': 'Group related toggle choices.',
    slider: 'Select a number or range on a track.',
    'color-picker': 'Choose a color and edit its value.',
    'editor-json': 'Edit a JSON string with syntax validation.',
    'editor-markdown': 'Edit Markdown with a small formatting toolbar.',
    editor: 'Edit HTML with TinyMCE.',
    'sortable-image-gallery':
        'A compatibility wrapper that presents UploadImage records through AttachmentList.',
    command: 'Search and choose actions from a command list.',
    description: 'Show extra help without crowding the page.',
    dialog: 'Open a modal for a focused task.',
    drawer: 'Open a panel from the edge of the screen.',
    sheet: 'Show related content in a side panel.',
    overlay: 'Show an overlay with shared sizing and actions.',
    'overlay-choice': 'Ask the user to choose an option.',
    'overlay-details': "Show an item's details in an overlay.",
    'overlay-notice': 'Show a notice with a clear action.',
    popover: 'Show contextual content beside a trigger.',
    tooltip: 'Show a short hint on hover or focus.',
    toast: 'Show a temporary notification.',
    tabs: tabsSummary,
    'data-table': 'Search, sort and manage rows using a typed list contract.',
    schedule: 'Show events across calendar views.',
    'calendar-booking': 'Choose a date and an available time slot.',
    'app-bar': 'Dock a compact set of navigation items and actions.',
    apexcharts: 'Render an ApexCharts chart using your own series and options.',
    'aspect-ratio': 'Keep media at a chosen aspect ratio.',
    calendar: 'Pick a single date or a range.',
    collapsible: 'Show or hide a block of content.',
    copy: 'Copy a value to the clipboard.',
    'dropdown-menu': 'Open a menu of actions from a trigger.',
    'scroll-area': 'Scroll content in a constrained area.',
    separator: separatorSummary,
    skeleton: skeletonSummary,
    provider: 'Share Miru locale, direction and UI context.',
    'editor-frame': 'Give a custom editor a consistent border, toolbar and status area.',
};

for (const [module, name] of Object.entries(overlayModules))
    componentCopy[module] = overlaySummaries[name];

for (const [module, name] of Object.entries(formFieldModules))
    componentCopy[module] = formFieldSummaries[name];

const componentSummaries: Record<string, string> = {
    Indicator: indicatorSummary,
    ...utilitySummaries,
    ...stepperSummaries,
    ...extensionSummaries,
    FloatingAppBar: layoutSummaries.FloatingAppBar,
    ...cardSummaries,
    ...codeSummaries,
    ...itemSummaries,
    ...kbdSummaries,
    ...markerSummaries,
    ...paginationSummaries,
    ...tableSummaries,
    ...formComponentSummaries,
    ...formFieldSummaries,
    ...overlaySummaries,
    AttachmentList: attachmentListSummary,
    AvatarStack: avatarStackSummary,
    Form: formComponentSummaries.Form,
    FormSectionRenderer: formComponentSummaries.FormSectionRenderer,
    AuthPage: layoutSummaries.AuthPage,
    DashboardPage: layoutSummaries.DashboardPage,
    FormLayout: layoutSummaries.FormLayout,
    PageRoot: layoutSummaries.PageRoot,
    ContextProvider: layoutSummaries.ContextProvider,
};

export function componentSummary(
    name: string,
    module = name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase(),
    primary = true,
) {
    if (!primary && primitiveSummaries[name]) return primitiveSummaries[name];
    if (componentSummaries[name]) return componentSummaries[name];
    if (primary && componentCopy[module]) return componentCopy[module];
    if (/Trigger$/.test(name)) return 'Open or toggle the related content.';
    if (/Content$/.test(name)) return 'Hold the content of a composed component.';
    if (/Title$/.test(name)) return 'Give the component an accessible title.';
    if (/Description$/.test(name)) return 'Add supporting text to the component.';
    if (/Close$/.test(name)) return 'Close the related panel or overlay.';
    if (/Header$/.test(name)) return 'Group the heading and introductory content.';
    if (/Footer$/.test(name)) return 'Group supporting content and final actions.';
    if (/Separator$/.test(name)) return 'Separate related items into clear groups.';
    if (/Arrow$/.test(name)) return 'Point floating content towards its trigger.';
    if (/Item$/.test(name)) return 'Add one item to the parent component.';
    if (/Label$/.test(name)) return 'Label a control or group of related items.';
    return componentCopy[module] || 'Compose a focused part of a larger interface.';
}

/** Set only verified introduction versions; current package version is not a "since" date. */
export const componentSince: Record<string, string> = {};

/** Focused integration notes shared with website generation. Keep variations in Storybook. */
export const componentNotes: Record<string, { title: string; text: string }[]> = {
    checkbox: [
        {
            title: 'Colours',
            text: 'The `variant` colours are `default`, `primary`, `secondary`, `accent`, `info`, `success`, `warning` and `danger`. Checked and indeterminate states share the selected colour. Inside a CheckboxGroup, an explicit child variant overrides the inherited group colour. Invalid styling remains danger-coloured and disabled controls keep their disabled treatment.',
        },
    ],
    'checkbox-group': [
        {
            title: 'Colours',
            text: 'Set `variant` on the group to colour its choices. An option or child with an explicit variant overrides the inherited colour. Checked and indeterminate states use the same palette; invalid and disabled styling remains distinct. Available variants are `default`, `primary`, `secondary`, `accent`, `info`, `success`, `warning` and `danger`.',
        },
    ],
    'radio-group': [
        {
            title: 'Colours',
            text: 'Set `variant` on RadioGroup for a shared selection colour, or override it on an individual RadioBox or option. Available variants are `default`, `primary`, `secondary`, `accent`, `info`, `success`, `warning` and `danger`. Invalid fields retain danger styling, and disabled controls do not gain interactive hover colours.',
        },
    ],
    radiobox: [
        {
            title: 'Colours',
            text: 'An explicit `variant` overrides the nearest RadioGroup colour. Use `default`, `primary`, `secondary`, `accent`, `info`, `success`, `warning` or `danger`. Invalid and disabled states retain their own feedback.',
        },
    ],
    'input-tags': [
        {
            title: 'Colours',
            text: 'Set `variant` on InputTags to colour its tags; an explicit item variant overrides the group. Available variants are `default`, `primary`, `secondary`, `accent`, `info`, `success`, `warning` and `danger`. Default tags use neutral muted surfaces in both themes. Invalid fields retain danger styling and disabled controls keep their disabled treatment.',
        },
    ],
    ...cardNotes,
    ...codeNotes,
    item: itemNotes,
    kbd: kbdNotes,
    marker: markerNotes,
    pagination: paginationNotes,
    progress: progressNotes,
    separator: separatorNotes,
    skeleton: skeletonNotes,
    spinner: spinnerNotes,
    table: tableNotes,
    tabs: tabsNotes,
    breadcrumb: breadcrumbNotes,
    ...buttonNotes,
    badge: [
        {
            title: 'Colour and appearance',
            text: '`variant` selects the colour, while `appearance="auto"` uses solid semantic colours in light mode and soft tints in dark mode. Choose `solid` or `soft` to keep the same treatment in both themes. The neutral `outline`, `ghost` and `ghostly` variants retain their dedicated styles.',
        },
        {
            title: 'Parts, separators and links',
            text: 'Compose direct BadgePart children with BadgeSeparator between them. Parts inherit the badge size and colour, and the surrounding badge removes its own padding and gaps. Separators are decorative. For one interactive badge, use an outer link or button and keep its parts non-interactive. `href` selects an anchor by default; `as`, `asTag` and `asChild` support explicit elements and router links. `interactive` enables hover styling without adding navigation or click handling. Badge and its parts expose no component-specific events or model bindings; native events follow the rendered element.',
        },
    ],
    'badge-copy': [
        {
            title: 'Clipboard content and visible labels',
            text: 'Pass a string to `content` and optionally set its MIME `type`, or pass an object whose keys are MIME types and whose values are strings. The default slot changes the visible label without changing the copied content; supply it for a MIME map. Copy uses the browser Clipboard API, so clipboard access must be available. The outer element is a button, with translated copy and copied labels unless `label` is supplied.',
        },
        {
            title: 'Icons, sizing and custom classes',
            text: 'Supply an icon component through `icon`, or replace it with the `icon` slot. `iconClass` applies to the icon prop; style slotted icons directly. `iconPosition` moves direct SVG icons to the left or right. `class` styles the outer copy button and `badgeClass` styles the inner badge, whose default width limit is 180px. BadgeCopy exposes no component-specific events or model bindings.',
        },
    ],
    avatar: [
        {
            title: 'Images and fallback content',
            text: 'Compose AvatarImage and AvatarFallback inside Avatar. Give the image a meaningful `alt` attribute, or an empty one when nearby text already identifies the person. The fallback is shown while the image loads or if loading fails; `delayMs` can postpone its appearance. AvatarImage forwards `loadingStatusChange` with `idle`, `loading`, `loaded` or `error`.',
        },
        {
            title: 'Size, shape and colour',
            text: 'Set `size`, `shape` and `tone` on Avatar so the image and fallback share the same appearance. Sizes range from `xs` to `xl`, with `default` between `sm` and `lg`. Shapes are `round`, `square`, `squircle` and `hexagon`; square avatars have rounded corners and hexagons use a rounded mask.',
        },
        {
            title: 'Stack limits and overlap',
            text: 'AvatarStack provides default size and shape values for its children; individual Avatar props take precedence. `max` limits visible avatars without counting the additional overflow indicator. Omit it to show all avatars, or use 0 for an overflow-only group. Numeric overlap is clamped from 0 to 0.75; `sm`, `default` and `lg` use 0.15, 0.25 and 0.4. The `overflow` slot receives the hidden count. Set `label` to name the group; logical spacing supports right-to-left layouts.',
        },
    ],
    attachment: [
        {
            title: 'Attachment data and upload state',
            text: 'Give every AttachmentItem a stable `id`. Supply `name`, `mimeType` and `size`, or a browser `File` as a fallback; `thumbnailUrl` takes precedence over an image `url`. The application owns upload requests, saved files and object-URL creation and cleanup. Set `status` to `idle`, `uploading`, `processing`, `success` or `error`, and provide `progress` from 0 to 100 for uploading or processing feedback.',
        },
        {
            title: 'Metadata and translated fields',
            text: 'Use `editable` for the built-in title and description editor, or provide the `fields` slot and call its `update` callback with a metadata patch. Without `locales`, edits update the item directly; with locales, edits update `item.translations[activeLocale]`. Bind `v-model:item` on Attachment or `v-model` on AttachmentList to retain edits, and optionally bind `v-model:activeLocale` to control the editing language.',
        },
        {
            title: 'Collection layout and movement',
            text: 'AttachmentList uses horizontal cards in `layout="list"` and vertical cards in `grid` and `row`; `orientation` overrides this choice. Enable `sortable` for drag handles and previous/next actions. Drag sorting uses dynamically imported SortableJS; arrow keys on a handle also move items. Reordering, removal and metadata edits emit a new collection array. `showPrimary` only displays a badge: it marks `primaryId`, or the first item when no ID is supplied.',
        },
    ],
    anchor: [
        {
            title: 'Underlines and motion',
            text: 'Use `underline="hover"` to reveal the underline on hover and keyboard focus, `always` to keep it visible, or `none` to hide it. `animation="fade"` transitions the underline colour; `slide` draws the hover underline from left to right and clears it towards the right. Transitions respect reduced-motion preferences.',
        },
        {
            title: 'External destinations',
            text: 'Set `external` to show an external-link icon. A `target="_blank"` link shows the icon automatically and adds `noopener noreferrer` to any supplied `rel` values. The `external` prop only controls the icon; it does not change the browsing target.',
        },
        {
            title: 'Router links and disabled state',
            text: 'Use `asChild` with a single native or router link in the default slot. The child receives the link attributes, classes and external icon. Supply routing props on the child and avoid conflicting native attributes. `disabled` blocks primary and auxiliary navigation, suppresses click handlers and removes the link from the tab order. Anchor exposes a `click` event and no model bindings.',
        },
    ],
    alert: [
        {
            title: 'Visibility and dismissal',
            text: 'Alert is visible initially when `open` is omitted. Add `dismissable` for local dismissal, or bind `v-model:open` to manage visibility in your application. The dismiss button emits `update:open` with false, followed by `dismiss`; a controlled alert stays visible until the bound value changes. Set `dismissLabel` to customise the accessible button name, or use the translated close label.',
        },
        {
            title: 'Appearance and icons',
            text: 'Choose a semantic `variant` and use `appearance="soft"` for a tinted surface with outline icons. `showIcon` controls the built-in status icon; the `icon` slot takes precedence and remains visible when `showIcon` is false. A leading SVG or recognised icon component in the default slot also replaces the built-in icon. AlertTitle is optional.',
        },
    ],
    accordion: [
        {
            title: 'Keyboard navigation',
            text: 'Use Up and Down to move between triggers, Home and End to reach the first or last trigger, and Enter or Space to toggle a section. The inherited `orientation` prop changes the arrow keys to Left and Right; it does not change Miru’s vertical layout.',
        },
        {
            title: 'Icons and header content',
            text: 'Set `iconMode` on Accordion or override it on AccordionTrigger: `default` uses a down chevron, `modern` a left chevron, and `operator` a plus/minus symbol. Use the trigger’s `description` and `badges` slots for supporting content, and the header’s `actions` slot for independent buttons. `mutedActions` defaults to true; individual ButtonAction props take precedence.',
        },
        {
            title: 'Scrollable content',
            text: 'Set `maxHeight` on AccordionContent to a number of pixels or a CSS length, such as `240` or `12rem`, to scroll longer content within a ScrollArea.',
        },
        {
            title: 'Single or multiple sections',
            text: 'Use `type="single"` to open one item, or `type="multiple"` to open several. The controlled value is a string for single mode and an array for multiple mode. Add `collapsible` to allow closing the last item in single mode.',
        },
    ],
    ...formComponentNotes,
    'data-table': [
        {
            title: 'Connect your own data',
            text: 'The list contract keeps search, sorting and pagination independent of your backend. Use the Laravel or Adonis adapter, pass rows manually, or provide a custom adapter. Expanded rows can contain another DataTable.',
        },
    ],
    carousel: carouselNotes,
    popover: [
        {
            title: 'Position and compose',
            text: 'Choose `side` and `align` on PopoverContent. Add PopoverArrow when you want a pointer. Use `as-child` on the trigger to preserve the native button behaviour when composing components.',
        },
    ],
    calendar: [
        {
            title: 'Ranges and unavailable dates',
            text: 'Use `range` for a start and end date. Disabled dates cannot be selected; unavailable dates mark days off. Set `allow-non-contiguous-ranges` when a range may cross unavailable dates.',
        },
    ],
    'input-file': [
        {
            title: 'Your application owns uploads',
            text: 'File selection does not send a request. Handle the selected files in your application and keep upload progress, errors and persistence in your own state.',
        },
    ],
    'upload-zone': [
        {
            title: 'Selection and upload are separate',
            text: 'The component handles file selection and validation. Your application sends files, saves them and updates their status. Use gallery mode when images need sorting and previews.',
        },
    ],
    layouts: [
        {
            title: 'Bring your application content',
            text: 'Layouts provide structure and responsive behaviour. Supply routes, navigation, actions and content through props and slots. Authentication, permissions and persistence remain in your application.',
        },
    ],
};

for (const [module, notes] of Object.entries(formFieldNotes)) {
    componentNotes[module] = [
        ...notes,
        ...(componentNotes[module] ?? []).filter((note) => note.title === 'Colours'),
    ];
}

Object.assign(componentNotes, overlayNotes);
