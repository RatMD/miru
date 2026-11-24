export const componentCopy: Record<string, string> = {
    backdrop: 'Add a dimmed or blurred layer behind content.',
    breakpoint: 'Render a branch for a named breakpoint or viewport range.',
    deferred: 'Show a loading or error state while an async component resolves.',
    'context-menu': 'Open contextual actions from a right-click trigger.',
    item: 'Compose a compact row with content, media and actions.',
    button: 'A button for actions, links and loading states.',
    'button-action': 'A compact icon button with an accessible label.',
    'button-group': 'Group related actions in one row.',
    'button-shadow': 'An action button with a shadow treatment.',
    accordion: 'Show and hide related sections.',
    alert: 'Show a short notice, warning or error.',
    anchor: 'A themed link with optional underline animation.',
    attachment: 'Show a file, its status and its actions.',
    badge: 'A small label for a status or category.',
    'badge-copy': 'A badge that copies a value.',
    'badge-counter': 'Show a count beside a short label.',
    avatar: 'Show a person, image or initials.',
    breadcrumb: 'Show the path to the current page.',
    card: 'Group related content and actions in a surface.',
    'card-chart': 'A card for a chart and its summary.',
    carousel: 'Browse slides with responsive sizing and navigation.',
    code: 'Show a short code value with optional copying.',
    'code-panel': 'Show formatted source code with copy controls.',
    'filter-badges': 'Show active filters and let users remove them.',
    kbd: 'Show a keyboard key or shortcut.',
    marker: 'Mark a step or entry in a timeline.',
    pagination: 'Move between pages of results.',
    progress: 'Show progress toward a total.',
    spinner: 'Show that work is in progress.',
    field: 'Connect a control with its label, hint and errors.',
    form: 'Render schema-driven fields with validation states and responsive sections.',
    'input-group': 'Combine a text control with prefixes, suffixes or actions.',
    label: 'Name a control and show optional required or validation markers.',
    input: 'Edit a text value with v-model.',
    'input-search': 'A search input with clear and search controls.',
    'input-password': 'A password input with a visibility toggle.',
    'input-phone': 'Edit a phone number with a country calling code.',
    'input-number': 'Edit a number with increment and decrement controls.',
    'input-otp': 'Enter a one-time code in separate slots.',
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
    'sortable-image-gallery': 'Reorder an image collection.',
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
    tabs: 'Switch between related content panels.',
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
    separator: 'Separate groups of content.',
    skeleton: 'Reserve space while content loads.',
    provider: 'Share Miru locale, direction and UI context.',
    'editor-frame': 'Give a custom editor a consistent border, toolbar and status area.',
};

const componentSummaries: Record<string, string> = {
    ApexChart: 'Render a chart from your own series and options.',
    FloatingAppBar: 'Dock compact navigation and actions on small screens.',
    AttachmentList: 'Group files with upload status and actions.',
    AvatarStack: 'Show a group of people in overlapping avatars.',
    FormLayout: 'Arrange schema-driven fields in responsive sections.',
    FormSectionRenderer: 'Generate form sections from a typed schema.',
    AuthPage: 'Frame a sign-in screen with branding and content.',
    DashboardPage: 'Build an application shell with navigation and content.',
    FormPageLayout: 'Structure form pages with tabs and mobile actions.',
    UiRoot: 'Provide shared defaults for Miru components.',
    UiProvider: 'Configure locale, direction and UI context.',
};

export function componentSummary(
    name: string,
    module = name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase(),
    primary = true,
) {
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
    accordion: [
        {
            title: 'Single or multiple sections',
            text: 'Use `type="single"` to open one item, or `type="multiple"` to open several. The controlled value is a string for single mode and an array for multiple mode. Add `collapsible` to allow closing the last item in single mode.',
        },
    ],
    form: [
        {
            title: 'State, fields and page layout',
            text: 'Create state and validation with `useForm`, define sections with `defineFormSections`, then pass both to `FormLayout`. Use `FormPageLayout` for page tabs and mobile actions. Your application owns submission and persistence.',
        },
    ],
    'data-table': [
        {
            title: 'Connect your own data',
            text: 'The list contract keeps search, sorting and pagination independent of your backend. Use the Laravel or Adonis adapter, pass rows manually, or provide a custom adapter. Expanded rows can contain another DataTable.',
        },
    ],
    carousel: [
        {
            title: 'Automatic movement',
            text: 'Looping, autoplay and effects are optional. Keep a pause control for automatic movement and respect reduced-motion preferences. See the guide for responsive slide counts and effects.',
        },
    ],
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
