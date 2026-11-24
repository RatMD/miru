import popoverTooltipGuide from '../docs/popover-tooltip.mdx?raw';
import { componentSummary } from './component-documentation';

/** Concise English summaries for Storybook Autodocs; not part of the library build. */
const descriptions = {
    Attachment: [
        'A reusable file/image attachment with horizontal or vertical layout, type icons, optional MIME/size metadata, upload/processing/success/error states, progress, a primary badge and independent actions. Optional metadata editing supports locale-specific titles/descriptions; the fields slot binds application-owned form fields. No upload requests or object URLs are created by this component.',
        'Wiederverwendbarer Datei-/Bildanhang mit Status, Metadaten, Aktionen und optionalen mehrsprachigen Feldern.',
        ['ButtonAction', 'Badge', 'Progress', 'Field', 'Input', 'Textarea', 'FormLocaleSwitcher'],
        ['@tabler/icons-vue'],
    ],
    AttachmentList: [
        'A controlled Attachment collection with list, responsive grid or horizontal-row layout. Optional drag handles, move buttons, removal, primary-item marking and metadata editing emit immutable model updates. Keyboard move actions are available alongside lazy-loaded SortableJS; files and upload state remain host-owned.',
        'Anhangsliste mit optionaler Sortierung, Hauptbild und Metadatenbearbeitung.',
        ['Attachment'],
        ['sortablejs'],
    ],

    Carousel: [
        'Embla Vue 9.0.0-rc04 with prop-driven navigation, dot/number/counter/progress pagination, responsive slide counts and gaps, alignment, looping, grouping, dragging, RTL and vertical layouts. Built-in helpers provide Autoplay, Auto Scroll, Auto Height, Fade, Scale, Parallax and Opacity without passing plugin objects. Automatic movement pauses on hover/focus and supports a pause button and reduced-motion preferences. See the attached Guide for configuration and composition examples.',
        'Embla-Vue-Carousel mit konfigurierbaren Effekten, Navigation und responsiven Folien.',
        ['Button', 'Progress'],
        [
            'embla-carousel-vue@9.0.0-rc04',
            'embla-carousel@9.0.0-rc04',
            'embla-carousel-autoplay@9.0.0-rc04',
            'embla-carousel-auto-scroll@9.0.0-rc04',
            'embla-carousel-auto-height@9.0.0-rc04',
            'embla-carousel-fade@9.0.0-rc04',
            'embla-carousel-accessibility@9.0.0-rc04',
            '@vueuse/core',
            '@tabler/icons-vue',
        ],
    ],

    AspectRatio: [
        'Responsive media sizing through reka-ui AspectRatio. Presets: square (1:1), video (16:9), photo (4:3), portrait (3:4), cinema (21:9). A positive number or a width/height string (16x9, 4:3, 4/3) overrides the preset; invalid ratios fall back to 1. Parent layout controls width.',
        '',
        [],
        ['reka-ui'],
    ],
    Drawer: [
        'Draggable bottom surface by default, using reka-ui Drawer. Supports swipe dismissal, focus management, a visible drag handle, scrollable content and optional snapPoints. Drawer uses the Reka Drawer primitive; it is separate from Sheet, which uses Dialog. Responsive mobile surfaces now use Drawer. Bottom drawers start at 50% with a 90% expanded stop, remain anchored while pulling up, and cap height through maxHeight. DrawerContent centers a contentSize (default 5xl) frame with a ScrollArea, plus fixed header/footer slots. Swipe down/up/right/left closes toward that edge.',
        '',
        ['Button'],
        ['reka-ui', '@tabler/icons-vue'],
    ],
    Command: [
        'Application-independent command search (modal first in Storybook; Inline remains available) with full-width square hover rows, grouped results, query/filter models, keyboard navigation and a select event. Type chips share the DataTable overflow pattern. CommandDialog composes the same UI in a Dialog. Application search APIs, routes and global hotkeys remain host-owned; update items/loading for remote search.',
        '',
        ['FilterBadges', 'Dialog'],
        ['reka-ui', '@tabler/icons-vue'],
    ],
    FilterBadges: [
        'Responsive one-line filter chips. size supports sm, default and lg; removable chips have a separate bordered X action, and the overflow badge shows +N for the filters that do not fit. Available width, including the counter badge, is measured with ResizeObserver; the counter opens all filters in a content-sized popover. Each filter remains individually removable. Shared by DataTable and Command. Pass already-localized labels; remove/select events leave state ownership with the host.',
        '',
        ['Badge', 'Popover'],
        ['@vueuse/core', '@tabler/icons-vue'],
    ],
    ButtonGroup: [
        'Connected independent Button or ButtonAction controls with shared outer corners, overlapping 1px borders and visible keyboard focus. Supports horizontal/vertical orientation and the same size/shape options as Button for matching outer corners. Set the same size on the group and its buttons. Children own their variant, disabled and click behavior.',
        '',
        ['Button'],
        [],
    ],
    EditorJson: [
        'A lightweight JSON text editor with live syntax validation, an icon toolbar with format/minify actions and top tooltips, optional in-place escaped preview in a ScrollArea (previewMaxHeight defaults to 320px), valid/invalid status icons, optional synchronized line numbers (lineNumbers defaults to true), empty-value handling and validation events. An optional counter supports grouped numbers and limit/count/remaining modes. The model remains a string; use Zod for submission/schema validation.',
        'Ein einfacher JSON-Texteditor mit Syntaxprüfung, Formatierung und optionaler Textvorschau.',
        ['Textarea', 'Label', 'Button'],
        ['@tabler/icons-vue'],
    ],
    EditorMarkdown: [
        'A plain-text editor with selection-aware formatting, undo/redo, keyboard shortcuts and list continuation. Configure the toolbar and heading/bold/bullet/divider markers; standard and kleinanzeigen presets are included. The counter is opt-in with locale-aware grouped numbers and limit/count/remaining modes. No HTML rendering dependency.',
        'Ein konfigurierbarer Markdown-Texteditor mit Verlauf und Listenfortsetzung.',
        ['Textarea', 'Label', 'Button'],
        ['@tabler/icons-vue'],
    ],

    ComboboxField: [
        'A searchable selection field based on the shared Combobox primitives. Supports keyboard navigation, disabled options, a clear action, translated empty state, native form names and HTML attributes. Use ComboboxField with options and a string/null v-model, or compose the exported Combobox primitives. FormLayout accepts type=combobox with the same options as select.',
        '',
        ['Button'],
        ['reka-ui', '@tabler/icons-vue'],
    ],
    Overlay: [
        'Responsive base wrapper: a bottom Drawer below 768px and a Dialog on tablet/desktop. Shares title, description, icon, body and footer slots. Loading blocks dismissal; resizing preserves the open state.',
        '',
        ['Dialog', 'Drawer', 'ScrollArea'],
        ['@vueuse/core'],
    ],
    OverlayChoice: [
        'Responsive confirmation using Overlay, customizable primary/secondary actions and inline errors. Async confirmations stay open by default; set closeOnConfirm for immediate closure.',
        '',
        ['Overlay', 'Button', 'Alert'],
        ['@tabler/icons-vue'],
    ],
    OverlayNotice: [
        'Responsive notice using Overlay with optional content/actions and a close button.',
        '',
        ['Overlay', 'Button'],
        ['@tabler/icons-vue'],
    ],
    OverlayDetails: [
        'Responsive detail inspector with optional tabs, edge-to-edge JSON/HTML/text CodePanels and a close action. Tabs are hidden for a single section. Each section has a stable id, translated label, value and language.',
        '',
        ['Overlay', 'Tabs', 'CodePanel', 'Button'],
        [],
    ],
    CodePanel: [
        'Read-only JSON, HTML or plain-text panel with a rounded full frame by default; condensed=true selects the flush embedded/dialog appearance. Includes optional formatting, line numbers and an absolute Copy Action Button. Prettier is lazy-loaded; invalid input falls back to the original source. HTML is rendered as text. The copy action copies the displayed code without line numbers. See [Prettier browser documentation](https://prettier.io/docs/browser).',
        '',
        ['ScrollArea', 'ButtonAction', 'Tooltip'],
        ['prettier', '@vueuse/core', '@tabler/icons-vue'],
    ],
    Editor: [
        "A locally loaded TinyMCE editor based on MIRU's rich-text integration. Supports HTML v-model, translated toolbar labels, disabled/readonly states, height, toolbar configuration, blur/ready/error events and a host-owned licenseKey. FormLayout richtext fields use the same component. TinyMCE remains a runtime dependency; no cloud script is loaded. The host must supply its applicable licenseKey or explicitly use the existing GPL default.",
        '',
        ['Textarea'],
        ['tinymce'],
    ],
    ButtonAction: [
        'An icon-first action button with optional visible label. statusDot adds a shared top-right dot over the icon: false hides it, true follows variant, or pass a Button color independently. Dots are hidden during loading. Dots use palette step 500; neutral variants map to neutral-400. Supply status meaning in the translated label/title. The default slot contains the icon; use label for visible text. Eight Button colors are available; ghost and ghostly are excluded. Set muted=true for a muted resting icon/text that gains its semantic color on hover or keyboard focus. AccordionHeader supplies muted by default; an explicit button prop overrides it. Light-mode hover backgrounds use palette step 100. The resting surface follows --ui-background (override with --ui-action-background). Dark mode uses bright step-400 icons/borders and a subtle tinted hover surface; neutral actions follow --ui-foreground. Pressed actions retain the regular Button active fill. Status-dot cutouts follow the actual idle/hover/pressed surface. borderless="no" always shows the border; "effect" shows it on hover, focus, active and disabled/loading states; "yes" always hides it. Labels and accessible icon-only names are provided by the host.',
        '',
        ['Button'],
        ['reka-ui'],
    ],
    ButtonShadow: [
        'statusDot adds the shared dot over the icon. Use true to follow variant, a Button color for an independent status, or false to hide it. Dots use palette step 500; neutral variants map to neutral-400. The dot is hidden during loading and remains visible with rings or disabled states; provide status meaning through the translated label/title. Optional statusRing or timerRing surrounds the icon. The timer hides the status ring when both options are supplied. statusRing accepts true or a Button color; iconColor and timerColor can be set independently. Timer duration is in milliseconds (default 5000); timerProgress (0–100) overrides the internal countdown, timerPaused pauses it, restartTimer() restarts it and timer-end fires once on completion. ShadowButton is a round icon-only button with an expanding ::after halo. Supports all ten Button colors, four sizes, muted icons, keyboard focus, disabled/loading states and links. Pass label, title or aria-label as the accessible name. The original sm/default dimensions and halo sizes are retained.',
        '',
        ['Button'],
        ['reka-ui'],
    ],
    Accordion: [
        'Accessible expandable sections with single or multiple open items. iconMode selects default (down chevron, 180°), modern (left chevron, -90°) or operator (180° plus/minus with the symbol changing halfway). Set it on Accordion or override it on a trigger. AccordionContent accepts maxHeight (number in pixels or CSS length) and uses ScrollArea when limited. AccordionTrigger supports badgesPosition="below" with a compact badge gap. AccordionHeader defaults its Action Buttons to muted; set :muted-actions="false" on the header or :muted="false" on a button to opt out. Borders use gray-300 in Light Mode and gray-700 in Dark Mode.',
        '',
        ['ScrollArea'],
        ['reka-ui'],
    ],
    Alert: [
        'Status messages with independent variant and appearance props. appearance="default" retains the toast-inspired neutral surface, white inner border, colored ring/left accent, shadow and filled icons. appearance="soft" uses Spottle-style tinted surfaces, thin borders and round outline icons in light and dark mode. variant selects default (neutral), accent, info, success, warning or danger; The neutral variant is the default. Set dismissable=true for a localized close action; dismissal works locally or with v-model:open and emits dismiss. AlertTitle is optional. Use showIcon=false or the icon slot to customize icons; existing explicit icons are preserved.',
        '',
        ['ButtonAction'],
        ['class-variance-authority', '@tabler/icons-vue'],
    ],
    ApexChart: [
        'Theme-aware, client-mounted ApexCharts adapter. All upstream options and events can be supplied.',
        '',
        [],
        ['apexcharts', 'vue3-apexcharts'],
    ],
    Avatar: [
        'Avatar image with loading fallback and round, square, squircle or rounded hexagon shapes. Size, shape and tone are public props; images and fallbacks share the same shape. Use AvatarStack for overlapping collections with an optional +N indicator.',
        '',
        [],
        ['reka-ui'],
    ],
    Badge: [
        'Compact semantic labels with two sizes and optional icons. Interactive badges and links share the same central hover styles; BadgeCopy enables interactive styling automatically. Use href, as="link" or asTag="a" for interactive links, or asChild with your router link.',
        '',
        [],
        ['class-variance-authority'],
    ],
    BadgeCopy: [
        'A copyable badge with optional leading or trailing icon.',
        '',
        ['Copy', 'Badge'],
        [],
    ],
    BadgeCounter: ['A label with a locale-aware numeric counter on either side.', '', [], []],
    Breadcrumb: [
        'Composable accessible navigation breadcrumbs and overflow indicators. BreadcrumbMenu adds contextual links with a centered dropdown and an optional arrow; items support href, disabled and a selected value.',
        '',
        ['DropdownMenu'],
        ['reka-ui', '@tabler/icons-vue'],
    ],
    Card: [
        'Card surface with an Accordion-style header: UI typography, 16px padding and vertically centered badges/action buttons on the right. CardHeader accepts border and actions/badges slots; CardAction supports explicit composition. Card border defaults to true and can be disabled. The host owns font loading; --ui-font-heading defaults to the UI font.',
        '',
        ['ButtonAction', 'Badge'],
        [],
    ],
    CardChart: [
        'A chart surface retaining title, description, empty state and chart slot. See the [ApexCharts documentation](https://apexcharts.com/docs/) for chart options and configuration.',
        '',
        ['Card', 'ApexChart'],
        ['apexcharts', 'vue3-apexcharts'],
    ],
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
        ['@tanstack/vue-table', '@inertiajs/vue3'],
    ],
    Description: [
        'Info-circle explanation trigger: a bottom-start Popover with arrow on desktop and a bottom Drawer on mobile. Override the trigger slot for badges or custom controls. Edge alignment includes an 8px outward offset and 8px arrow padding to clear rounded corners; alignOffset and arrowPadding are configurable. Center alignment has no default offset.',
        '',
        ['Popover', 'Drawer'],
        ['@vueuse/core'],
    ],
    Dialog: [
        'Accessible modal parts with focus management, overlay and close control. Set size on DialogContent: sm, md, lg (default), xl, 2xl through 7xl, or full. Sizes cap width while preserving 16px viewport gutters. The Sizes story provides a labeled trigger for every size in one canvas. At narrow viewports, larger sizes share the same available width. DialogFooter has an optional border prop (false by default) for an edge-to-edge separator above the actions; see Footer Border.',
        '',
        [],
        ['reka-ui'],
    ],
    DropdownMenu: [
        'Composable menus with actions, checkboxes, radio groups and nested submenus.',
        '',
        [],
        ['reka-ui'],
    ],
    Field: [
        'Composable field containers, labels, descriptions, errors, groups and separators. valid/data-valid and aria-invalid expose validation state. aria-valid is accepted as an input alias but is not emitted as nonstandard markup; Labels inherit Field state. Dependencies: Label, Separator and class-variance-authority.',
        '',
        [],
        [''],
    ],
    FormLayout: [
        'Schema-driven form generator with section navigation, localized fields, section error details and 10/12-column layouts. Desktop actions stack Primary, Secondary, then separated additional actions. The mobile footer has at most three buttons: overflow, Secondary, Primary; additional actions open in a bottom Drawer. Uses the shared FormPageLayout for left/top tabs, action placement and optional FloatingAppBar docking. Dependencies: TanStack Form, Inertia, Zod, Field, Button, Tabs, Drawer and Description.',
        '',
        [],
        [''],
    ],
    InputGroup: [
        'Groups inputs or textareas with inline/block addons, text and action buttons, sharing focus, error and size styles. Dependencies: Input, Textarea, Button and class-variance-authority.',
        '',
        [],
        [''],
    ],
    Label: [
        'Accessible labels associated with a control through the for attribute; styles also support checkbox, radio and switch peers. Dependencies: Reka UI and @vueuse/core. Supports required markers and opt-in showValidation check/X icons. State can be supplied directly or inherited from Field; aria-valid is consumed as an alias and emitted as data-valid.',
        '',
        [],
        [''],
    ],
    Marker: [
        'Icon and content layout for timeline entries and activity markers. MarkerMeta adds a locale-formatted timestamp and author on the right.',
        '',
        [],
        [],
    ],
    Pagination: [
        'Keyboard-accessible paged navigation with first/last controls and ellipsis. Use mode="full", "compact", "navigation" or "simple" and variant="outline" or "ghost". connected=true joins buttons into segments separated by ellipses. The default slot remains available for custom composition.',
        '',
        ['Button'],
        ['reka-ui'],
    ],
    Popover: [
        'Anchored interactive content with portal, arrow and accessible trigger.',
        '',
        [],
        ['reka-ui'],
    ],
    Progress: [
        'Clamped progress indicator with semantic colors and optional animated stripes.',
        '',
        [],
        ['reka-ui'],
    ],
    ScrollArea: [
        'Scrollable content with styled vertical and horizontal scrollbars.',
        '',
        [],
        ['reka-ui'],
    ],
    Separator: ['Decorative or semantic horizontal and vertical dividers.', '', [], ['reka-ui']],
    Sheet: [
        'Modal panels positioned on any edge with accessible titles and descriptions.',
        '',
        [],
        ['reka-ui'],
    ],
    Skeleton: ['Themeable placeholders for content that is still loading.', '', [], []],
    Tabs: [
        'Root variant colors active labels and the indicator; TabItem.variant overrides it. Legacy tone remains supported. Responsive line tabs with badges, tones, animated indicator and overflow menu.',
        '',
        ['Badge', 'Popover', 'Drawer'],
        ['reka-ui'],
    ],
    Toast: [
        'MIRU notifications with icon tiles, color stripes and flat/frost/graphite surfaces. Set inline=true for page-flow previews; application layouts use floating notifications by default.',
        '',
        ['useToast'],
        ['vue-sonner', '@tabler/icons-vue', '@vueuse/core'],
    ],
    Tooltip: [
        'Keyboard and pointer hints with four sides, three alignments and all ten Button color variants.',
        '',
        [],
        ['reka-ui', '@vueuse/core'],
    ],
    Button: [
        'A configurable action button with color variants, sizes, round shapes, slot icons and loading states.',
        'Konfigurierbarer Aktionsbutton mit Farbvarianten, Größen, runder Form, Slot-Icons und Ladezuständen.',
        [],
        ['reka-ui', 'class-variance-authority'],
    ],
    Input: [
        'A text input with two-way binding, three sizes and consistent focus, disabled and validation styles.',
        'Texteingabe mit Zwei-Wege-Bindung, drei Größen sowie einheitlichen Fokus-, Disabled- und Validierungszuständen.',
        [],
        ['@vueuse/core', 'class-variance-authority'],
    ],
    InputSearch: [
        'A search input with a leading icon and a clear button that returns focus to the input.',
        'Sucheingabe mit vorangestelltem Icon und Löschbutton, der den Fokus zurück ins Eingabefeld setzt.',
        ['Input', 'Button'],
        ['@tabler/icons-vue'],
    ],
    InputPassword: [
        'A password input with a visibility toggle and an optional leading key icon.',
        'Passwortfeld mit umschaltbarer Sichtbarkeit und optionalem Schlüssel-Icon.',
        ['InputGroup', 'InputGroupInput', 'InputGroupAddon', 'InputGroupButton'],
        ['@tabler/icons-vue'],
    ],
    InputPhone: [
        'Combines a calling-code selector with a numeric national phone input; countries and labels are supplied by the application.',
        'Kombiniert eine Vorwahlauswahl mit einer numerischen Telefonnummer; Länder und Beschriftungen liefert die Anwendung.',
        ['Input', 'Select'],
        ['@tabler/icons-vue'],
    ],
    InputNumber: [
        'A composable numeric input with increment/decrement controls, limits and locale-aware number formatting.',
        'Zusammensetzbare Zahleneingabe mit Plus-/Minus-Steuerung, Grenzwerten und lokalisierter Zahlenformatierung.',
        ['Input (styles)'],
        ['reka-ui', '@vueuse/core', '@tabler/icons-vue'],
    ],
    InputOTP: [
        'maxlength configures the input length and default slots (6 by default). masked hides characters with maskCharacter (default *), while v-model retains the original value. Custom slot groups remain supported and inherit masking. ' +
            'A one-time-code input with composable character slots, separators, optional masking and three sizes.',
        'Einmalcode-Eingabe mit kombinierbaren Zeichenfeldern, Trennzeichen, optionaler Maskierung und drei Größen.',
        [],
        ['vue-input-otp', 'reka-ui', '@vueuse/core', '@tabler/icons-vue'],
    ],
    Textarea: [
        'An automatically growing multiline input with two-way binding, three sizes and validation styles.',
        'Automatisch wachsendes mehrzeiliges Eingabefeld mit Zwei-Wege-Bindung, drei Größen und Validierungsstyles.',
        [],
        ['@vueuse/core'],
    ],
    Select: [
        'Single or multiple selection using multiple and an array v-model. SelectSearch is the reusable single-selection variant with a search field inside the popup, also used by DataTable filters. It accepts labeled options, optional disabled/pinned flags and a nullable string model. See Searchable and Searchable Empty. Compose an optional SelectClear beside SelectTrigger for a separate localized X button; it clears the model (undefined for single, [] for multiple), closes the menu and returns focus to the trigger. SelectClear inherits disabled state. ' +
            'A keyboard-accessible select with composable triggers, groups, labels, items and a portalled options panel.',
        'Tastaturbedienbare Auswahl mit kombinierbaren Triggern, Gruppen, Labels, Optionen und einem portalierten Auswahlmenü.',
        [],
        ['reka-ui', '@vueuse/core', '@tabler/icons-vue'],
    ],
    Checkbox: [
        'Eight semantic variant colors; groups pass their reactive variant to children, with per-item overrides. A checkbox with an optional label or label slot, three sizes and support for the indeterminate state.',
        'Checkbox mit optionalem Label oder Label-Slot, drei Größen und Unterstützung für den unbestimmten Zustand.',
        ['Label'],
        ['reka-ui', '@vueuse/core', '@tabler/icons-vue'],
    ],
    CheckboxGroup: [
        'Eight semantic variant colors; groups pass their reactive variant to children, with per-item overrides. Manages multiple selected values and lays out labeled checkboxes vertically or horizontally.',
        'Verwaltet mehrere ausgewählte Werte und ordnet beschriftete Checkboxen vertikal oder horizontal an.',
        ['Checkbox'],
        ['@vueuse/core'],
    ],
    RadioBox: [
        'Eight semantic variant colors; groups pass their reactive variant to children, with per-item overrides. A labeled single-choice control that works inside RadioGroup or as a standalone controlled input.',
        'Beschriftete Einzelauswahl innerhalb einer RadioGroup oder als eigenständig gesteuertes Eingabefeld.',
        ['RadioGroupItem', 'Label'],
        ['reka-ui'],
    ],
    RadioGroup: [
        'Eight semantic variant colors; groups pass their reactive variant to children, with per-item overrides. Manages one selected option with labeled radio controls and vertical or horizontal keyboard navigation.',
        'Verwaltet eine ausgewählte Option mit beschrifteten Radio-Feldern und vertikaler oder horizontaler Tastaturnavigation.',
        ['RadioBox'],
        ['reka-ui', '@vueuse/core'],
    ],
    Switch: [
        'A two-state switch with three sizes, keyboard interaction, optional trackPadding and a customizable thumb slot. Variants: default (neutral off / black or white on), success (neutral off / green on), danger-success (red off / green on). Both states use contrasting thumbs in light and dark mode.',
        'Zustandsschalter mit drei Größen, Tastaturbedienung, optionalem trackPadding und anpassbarem Schalterknopf. Varianten: default (neutral aus), success (neutral aus / grün an) und danger-success (rot aus / grün an). Beide Zustände unterstützen Light und Dark Mode.',
        [],
        ['reka-ui', '@vueuse/core'],
    ],
    Toggle: [
        'A pressable toggle with a persistent on/off state, three sizes and optional icon-only presentation.',
        'Umschaltbutton mit dauerhaftem Ein-/Aus-Zustand, drei Größen und optionaler reiner Icon-Darstellung.',
        [],
        ['reka-ui', '@vueuse/core', 'class-variance-authority'],
    ],
    ToggleGroup: [
        'A segmented group with single or multiple selection, shared styling, spacing and optional non-empty selection.',
        'Segmentierte Gruppe mit Einzel- oder Mehrfachauswahl, gemeinsamen Styles, Abständen und optional verpflichtender Auswahl.',
        ['Toggle (styles)'],
        ['reka-ui', '@vueuse/core'],
    ],
    InputTags: [
        'Eight semantic variant colors; groups pass their reactive variant to children, with per-item overrides. A composable tag input with removable items, keyboard interaction and three sizes.',
        'Zusammensetzbare Tag-Eingabe mit entfernbaren Einträgen, Tastaturbedienung und drei Größen.',
        [],
        ['reka-ui', '@vueuse/core', '@tabler/icons-vue'],
    ],
    ColorPicker: [
        'Combines an editable HEX value with a full-height square color swatch that opens the shared Popover. Hover and validation borders follow the active theme.',
        'Kombiniert einen bearbeitbaren HEX-Wert mit einer quadratischen Farbfläche über die Feldhöhe und dem gemeinsamen Popover. Hover- und Validierungsrahmen folgen dem aktiven Theme.',
        ['InputGroup', 'Popover'],
        ['@cyhnkckali/vue3-color-picker'],
    ],
    Calendar: [
        'A shared single/range calendar. weekStartsOn defaults to 1 (Monday); use 0 for Sunday. Block weekdays (0–6), ISO disabledDates, minValue/maxValue, holidays (ISO date → name), or callback rules isDateDisabled/isDateUnavailable. Supplied holidays are blocked unless disableHolidays=false. availability maps dates to { available, closed, holiday, reason }; missing entries remain selectable. Ranges cannot cross blocked days unless allowNonContiguousRanges=true. The day slot exposes date, disabled, unavailable, available, holiday and reason for custom markers/tooltips. v-model:placeholder reports navigation for loading server availability. BookingAvailability demonstrates server-provided TimeSlots; capacity, holiday-region lookup and warning confirmation remain application concerns. InputDateTime forwards the same rules.',
        'Einzel-/Bereichskalender mit Montag als Standard. weekStartsOn (0–6), disabledWeekdays, disabledDates, minValue/maxValue, holidays, availability und Callback-Regeln steuern gesperrte Tage. Der day-Slot liefert Verfügbarkeitsdaten; v-model:placeholder meldet Navigation zum Laden von Backend-Daten. TimeSlots und Kapazitäten kommen aus der Anwendung. InputDateTime reicht die Regeln durch.',
        ['Button', 'Select'],
        ['reka-ui', '@internationalized/date', '@tabler/icons-vue'],
    ],
    InputDateTime: [
        'Unified local date/time field: mode=datetime, date, time or timeframe. Single values use strings (YYYY-MM-DDTHH:mm, YYYY-MM-DD or HH:mm); timeframe uses { start, end } with nullable endpoints. Calendar restrictions apply to date/datetime. Overnight ranges remain host-validated.',
        'Einheitliches Feld mit datetime, date, time und timeframe. Einzelwerte sind lokale Strings; timeframe nutzt { start, end } mit nullable Endpunkten. Über-Nacht-Zeiträume sind möglich; fachliche Grenzen validiert die Anwendung.',
        ['Calendar'],
        ['dayjs'],
    ],
    InputFile: [
        'A styled native file input that retains accept, multiple and disabled attributes and emits the selected files.',
        'Gestylte native Dateieingabe mit accept-, multiple- und disabled-Attributen sowie Ausgabe der ausgewählten Dateien.',
        ['Input (styles)'],
        [],
    ],
    UploadZone: [
        'A file-selection and drag-and-drop area with type, size, count and image-dimension checks plus processing feedback. Optional gallery mode adds ordered image previews, removal and drag/keyboard sorting with UploadImage[] v-model. The host owns actual uploads and persistence.',
        'Dateiauswahl und Drag-and-drop mit Prüfung von Typ, Größe, Anzahl und Bildabmessungen sowie Verarbeitungsfeedback.',
        ['Badge', 'SortableImageGallery'],
        ['@tabler/icons-vue', 'sortablejs (gallery only, lazy-loaded)'],
    ],
} as const;

export type DocumentedComponent = keyof typeof descriptions;

/** List composition and runtime packages without exposing development tooling. */
export function componentDescription(name: DocumentedComponent): string {
    const [en, , components, packages] = descriptions[name];
    const list = (items: readonly string[]): string =>
        items.map((item) => '`' + item + '`').join(', ');
    const dependencies = [
        ...(components.length ? ['- **UI:** ' + list(components)] : []),
        '- **Packages:** ' + list(['vue', ...packages, 'clsx', 'tailwind-merge']),
    ];
    const integration =
        name === 'Popover' || name === 'Tooltip'
            ? '\n\n' + popoverTooltipGuide.replace(/^# /, '### ')
            : '';
    return (
        componentSummary(name) +
        '\n\n### Details\n\n' +
        en +
        '\n\n' +
        dependencies.join('\n') +
        integration
    );
}
