import { componentDependenciesMarkdown } from './component-dependencies.ts';

/** Manually authored English copy shared by Storybook and VitePress. */
export const formFieldModules: Record<string, string> = {
    'auto-complete': 'AutoComplete',
    editable: 'Editable',
    rating: 'Rating',
    checkbox: 'Checkbox',
    'checkbox-group': 'CheckboxGroup',
    'color-picker': 'ColorPicker',
    combobox: 'ComboboxField',
    'editor-json': 'EditorJson',
    'editor-markdown': 'EditorMarkdown',
    editor: 'Editor',
    input: 'Input',
    'input-date-time': 'InputDateTime',
    'input-file': 'InputFile',
    'input-number': 'InputNumber',
    'input-password': 'InputPassword',
    'input-phone': 'InputPhone',
    'input-pin': 'InputPin',
    'input-search': 'InputSearch',
    'input-tags': 'InputTags',
    radiobox: 'RadioBox',
    'radio-group': 'RadioGroup',
    select: 'Select',
    slider: 'Slider',
    switch: 'Switch',
    textarea: 'Textarea',
    toggle: 'Toggle',
    'toggle-group': 'ToggleGroup',
    'upload-zone': 'UploadZone',
};
export const formFieldSummaries: Record<string, string> = {
    AutoComplete:
        'A text input with optional suggestions, keyboard navigation and a clear action. Accepts free text or a suggestion, with support for grouped options and application-loaded results.',
    AutoCompleteAnchor: 'A positioning anchor for the autocomplete input and suggestion list.',
    AutoCompleteEmpty: 'Content displayed when no autocomplete suggestions match.',
    AutoCompleteGroup: 'A group of autocomplete suggestions with an optional heading.',
    AutoCompleteInput: 'The text input within a composed autocomplete.',
    AutoCompleteItem: 'One suggestion that can replace the autocomplete text.',
    AutoCompleteList:
        'The floating autocomplete suggestion list, with positioning and dismissal controls.',
    AutoCompleteSeparator: 'A visual divider between autocomplete suggestions or groups.',
    AutoCompleteViewport: 'The viewport containing autocomplete suggestions.',
    Editable:
        'Inline text editing with edit, cancel and save actions, flexible sizing and optional multiline input. Supports asynchronous saving with pending feedback and draft recovery after a failed save.',
    Rating: 'A rating control with fractional stars or like/dislike choices, keyboard interaction and theme colours. Supports clearing, hover feedback and read-only display of exact averages.',
    Checkbox:
        'A checkbox for boolean or indeterminate state, with an optional label and theme colours. Supports keyboard interaction and custom checked and unchecked values.',
    Slider: 'A slider for choosing one number or a range with keyboard, pointer and touch interaction. Supports theme colours, step marks and individually labelled handles.',
    CheckboxGroup:
        'A group of labelled checkboxes for selecting several values. Arrange options vertically or horizontally, with shared sizing and per-option colours.',
    ColorPicker:
        'A colour picker built from Reka UI primitives, with a colour area, channel controls and editable HEX, RGB, HSL or HSV values. Supports opacity, preset swatches and optional recent-colour history.',
    Combobox:
        'Composable primitives for a searchable list of choices, with keyboard navigation and single or multiple selection.',
    ComboboxField:
        'A searchable single-choice field with labelled options, keyboard navigation and optional clearing. Use the Combobox primitives for custom composition or multiple selection.',
    ComboboxAnchor: 'A positioning anchor for the combobox input and popup.',
    ComboboxEmpty: 'Content displayed when the combobox has no matching options.',
    ComboboxGroup: 'A labelled group of combobox options.',
    ComboboxInput: 'The search input for a composed combobox.',
    ComboboxItem: 'One selectable option within a combobox.',
    ComboboxItemIndicator: 'An indicator displayed for a selected combobox option.',
    ComboboxList:
        'The floating list of combobox options, with configurable positioning and dismissal.',
    ComboboxSeparator: 'A visual divider between combobox options or groups.',
    ComboboxViewport: 'The scrollable viewport for combobox options.',
    EditorJson:
        'A JSON text editor with syntax feedback, formatting, minification and an optional preview. Uses EditorFrame for its toolbar, counter and editing surface.',
    EditorMarkdown:
        'A Markdown text editor with formatting tools, list continuation and undo history. Uses EditorFrame for its toolbar, counter and editing surface.',
    Editor: 'A rich-text editor that edits HTML through a locally loaded TinyMCE instance. Supports configurable tools, localised labels and disabled or read-only editing.',
    Input: 'A single-line text input with three sizes and a value model. Retains native input attributes and events for labels, validation and browser behaviour.',
    InputDateTime:
        'A date and time field with date, time, date-time and timeframe modes. Uses local date and clock-time values and shares Calendar’s date restrictions.',
    InputFile:
        'A styled native file input that reports the selected files. Supports native selection attributes while leaving uploads and persistence to the application.',
    InputNumber:
        'A numeric field with increment and decrement controls, locale-aware formatting and configurable bounds. Compose its input and buttons to suit the layout.',
    InputNumberContent: 'A shared surface for the numeric input and its step controls.',
    InputNumberDecrement: 'A button that decreases the numeric field value.',
    InputNumberIncrement: 'A button that increases the numeric field value.',
    InputNumberInput: 'The editable text input within a numeric field.',
    InputPassword:
        'A password input with an accessible visibility toggle and optional key icon. Shares the sizing and presentation of InputGroup.',
    InputPhone:
        'A phone input combining a country calling-code selector with a national number. Emits the combined value while leaving phone-number validation to the application.',
    InputPin:
        'A PIN or one-time-code input built on Reka UI, with separate character slots and a string model. Supports numeric or text entry, paste, masking and grouped layouts.',
    InputPinGroup: 'A group of PIN slots with optional joined borders.',
    InputPinSlot: 'One character position within a PIN input.',
    InputPinSeparator: 'A decorative separator between groups of PIN slots.',
    InputSearch:
        'A search input with a search icon and a clear button. Clearing restores focus to the input; searching and filtering remain application behaviour.',
    InputTags:
        'A tag input for entering and removing several values, with keyboard interaction and theme colours. Compose the input and tag parts to control their labels and presentation.',
    InputTagsInput: 'The text input used to create new tags.',
    InputTagsItem: 'One removable tag with an optional colour override.',
    InputTagsItemDelete: 'A control that removes its surrounding tag.',
    InputTagsItemText: 'The visible text of a tag.',
    RadioBox:
        'A labelled radio choice that works within RadioGroup or as a standalone controlled input. Supports shared sizing and individual colour overrides.',
    RadioGroup:
        'A group of radio choices for selecting one value, with labelled options and keyboard navigation. Shares sizing and colours with its items and supports per-option overrides.',
    RadioGroupItem: 'One selectable radio control within RadioGroup.',
    Select: 'A select control with keyboard navigation, grouped options and single or multiple selection. Compose its trigger and content, or use SelectSearch for a searchable single-choice field.',
    SelectContent: 'The select popup containing options, groups and optional scroll controls.',
    SelectGroup: 'A group of related select options.',
    SelectItem: 'One selectable option with an optional selection indicator.',
    SelectItemText: 'The option text used by a select control.',
    SelectLabel: 'A label for a group of select options.',
    SelectScrollDownButton: 'A control for scrolling towards later select options.',
    SelectScrollUpButton: 'A control for scrolling towards earlier select options.',
    SelectSeparator: 'A visual divider between select options or groups.',
    SelectTrigger: 'The button that opens a select popup and displays its current value.',
    SelectValue: 'The current select label or a placeholder when no value is selected.',
    SelectClear:
        'A control that clears the current select value and restores focus to its trigger.',
    SelectSearch:
        'A searchable single-choice select with labelled options and a nullable string model.',
    Switch: 'A two-state switch with three sizes, configurable track spacing and a customisable thumb. Choose neutral or status-based colours for its on and off states.',
    Textarea:
        'A multiline text input with three sizes and a value model. Retains native textarea attributes and events for editing, validation and accessibility.',
    Toggle: 'A button with a persistent pressed state, three sizes and optional icon-only presentation. Use it for an independent on/off action.',
    ToggleGroup:
        'A segmented group of related choices with single or multiple selection. Shares appearance and sizing while supporting gaps and optional non-empty selection.',
    ToggleGroupItem: 'One selectable action within a toggle group.',
    UploadZone:
        'A file picker and drop zone with file validation, processing feedback and an optional image gallery. The application handles upload requests and saved files.',
};
const uiLinks: Record<string, [string, string]> = {
    AutoCompleteAnchor: ['auto-complete-anchor', 'formfields-autocomplete'],
    AutoCompleteEmpty: ['auto-complete-empty', 'formfields-autocomplete'],
    AutoCompleteGroup: ['auto-complete-group', 'formfields-autocomplete'],
    AutoCompleteInput: ['auto-complete-input', 'formfields-autocomplete'],
    AutoCompleteItem: ['auto-complete-item', 'formfields-autocomplete'],
    AutoCompleteList: ['auto-complete-list', 'formfields-autocomplete'],
    AutoCompleteSeparator: ['auto-complete-separator', 'formfields-autocomplete'],
    AutoCompleteViewport: ['auto-complete-viewport', 'formfields-autocomplete'],
    ButtonAction: ['button-action', 'components-buttonaction'],
    ButtonShadow: ['button-shadow', 'components-buttonshadow'],
    Spinner: ['spinner', 'components-spinner'],
    TooltipContent: ['tooltip-content', 'overlay-tooltip'],
    TooltipProvider: ['tooltip-provider', 'overlay-tooltip'],
    TooltipTrigger: ['tooltip-trigger', 'overlay-tooltip'],
    Attachment: ['attachment', 'components-attachment'],
    Badge: ['badge', 'components-badge'],
    Button: ['button', 'components-button'],
    Calendar: ['calendar', 'utilities-calendar'],
    Checkbox: ['checkbox', 'formfields-checkbox'],
    EditorFrame: ['editor-frame', 'utilities-editorframe'],
    Input: ['input', 'formfields-input'],
    InputGroup: ['input-group', 'form-inputgroup'],
    Label: ['label', 'form-label'],
    Popover: ['popover', 'overlay-popover'],
    RadioBox: ['radio-box', 'formfields-radiobox'],
    RadioGroupItem: ['radio-group-item', 'formfields-radiogroup'],
    ScrollArea: ['scroll-area', 'utilities-scrollarea'],
    Select: ['select', 'formfields-select'],
    SortableImageGallery: ['sortable-image-gallery', 'formfields-uploadzone'],
    Textarea: ['textarea', 'formfields-textarea'],
    Tooltip: ['tooltip', 'overlay-tooltip'],
};
type Dependencies = { ui?: string[]; packages?: string[]; primitives?: string[]; plain?: boolean };
const dependencies: Record<string, Dependencies> = {
    'auto-complete': {
        ui: [
            'AutoCompleteAnchor',
            'AutoCompleteEmpty',
            'AutoCompleteInput',
            'AutoCompleteItem',
            'AutoCompleteList',
            'AutoCompleteViewport',
            'Input',
            'Spinner',
        ],
        packages: ['@tabler/icons-vue', '@vueuse/core', 'reka-ui'],
        primitives: ['Autocomplete'],
    },
    editable: {
        ui: [
            'ButtonAction',
            'ButtonShadow',
            'Tooltip',
            'TooltipContent',
            'TooltipProvider',
            'TooltipTrigger',
        ],
        packages: ['@tabler/icons-vue', 'reka-ui'],
        primitives: ['Editable'],
    },
    rating: {
        ui: ['ButtonAction'],
        packages: ['@tabler/icons-vue', 'reka-ui'],
        primitives: ['Radio Group', 'Rating'],
    },
    slider: { packages: ['@vueuse/core', 'reka-ui'], primitives: ['Slider'] },
    checkbox: {
        ui: ['Label'],
        packages: ['@tabler/icons-vue', '@vueuse/core', 'reka-ui'],
        primitives: ['Checkbox'],
    },
    'checkbox-group': { ui: ['Checkbox'], packages: ['@vueuse/core'] },
    'color-picker': {
        ui: ['Button', 'Input', 'InputGroup', 'Popover', 'Select'],
        packages: ['@tabler/icons-vue', 'class-variance-authority', 'reka-ui'],
        primitives: [
            'Color Area',
            'Color Field',
            'Color Slider',
            'Color Swatch',
            'Color Swatch Picker',
        ],
    },
    combobox: {
        ui: ['Button'],
        packages: ['@tabler/icons-vue', '@vueuse/core', 'reka-ui'],
        primitives: ['Combobox'],
    },
    'editor-json': {
        ui: ['EditorFrame', 'ScrollArea', 'Textarea', 'Tooltip'],
        packages: ['@tabler/icons-vue'],
        plain: true,
    },
    'editor-markdown': {
        ui: ['EditorFrame', 'Textarea'],
        packages: ['@tabler/icons-vue'],
        plain: true,
    },
    editor: { ui: ['Textarea'], packages: ['tinymce'] },
    input: { packages: ['@vueuse/core', 'class-variance-authority'] },
    'input-date-time': {
        ui: ['Button', 'Calendar', 'Input', 'Popover'],
        packages: ['@internationalized/date', '@tabler/icons-vue', 'class-variance-authority'],
    },
    'input-file': { ui: ['Input'], packages: ['class-variance-authority'] },
    'input-number': {
        ui: ['Input', 'InputGroup'],
        packages: ['@tabler/icons-vue', '@vueuse/core', 'reka-ui'],
        primitives: ['Number Field'],
    },
    'input-password': { ui: ['InputGroup'], packages: ['@tabler/icons-vue'] },
    'input-phone': { ui: ['Input', 'Select'], packages: ['@tabler/icons-vue'] },
    'input-pin': { packages: ['@tabler/icons-vue', 'reka-ui'], primitives: ['Pin Input'] },
    'input-search': { ui: ['Button', 'Input'], packages: ['@tabler/icons-vue'] },
    'input-tags': {
        packages: ['@tabler/icons-vue', '@vueuse/core', 'reka-ui'],
        primitives: ['Tags Input'],
    },
    radiobox: {
        ui: ['Label', 'RadioGroupItem'],
        packages: ['reka-ui'],
        primitives: ['Radio Group'],
    },
    'radio-group': {
        ui: ['RadioBox'],
        packages: ['@tabler/icons-vue', '@vueuse/core', 'reka-ui'],
        primitives: ['Radio Group'],
    },
    select: {
        ui: ['Button', 'Input'],
        packages: ['@tabler/icons-vue', '@vueuse/core', 'class-variance-authority', 'reka-ui'],
        primitives: ['Combobox', 'Select'],
    },
    switch: { packages: ['@vueuse/core', 'reka-ui'], primitives: ['Switch'] },
    textarea: { packages: ['@vueuse/core'] },
    toggle: {
        packages: ['@vueuse/core', 'class-variance-authority', 'reka-ui'],
        primitives: ['Toggle'],
    },
    'toggle-group': {
        packages: ['@vueuse/core', 'class-variance-authority', 'reka-ui'],
        primitives: ['Toggle Group'],
    },
    'upload-zone': {
        ui: ['Badge', 'SortableImageGallery'],
        packages: ['@tabler/icons-vue'],
        plain: true,
    },
};
export function formFieldModule(name: string): string | undefined {
    if (name.startsWith('AutoComplete')) return 'auto-complete';
    if (name.startsWith('Combobox')) return 'combobox';
    if (name.startsWith('InputNumber')) return 'input-number';
    if (name.startsWith('InputPin')) return 'input-pin';
    if (name.startsWith('InputTags')) return 'input-tags';
    if (name.startsWith('RadioGroup')) return 'radio-group';
    if (name.startsWith('Select')) return 'select';
    if (name.startsWith('ToggleGroup')) return 'toggle-group';
    return Object.keys(formFieldModules).find((module) => formFieldModules[module] === name);
}
export function formFieldDependencyMarkdown(name: string, storybook = false) {
    const config: Dependencies =
        name.startsWith('AutoComplete') && name !== 'AutoComplete'
            ? {
                  ui: name === 'AutoCompleteInput' ? ['Input'] : [],
                  packages: ['@vueuse/core', 'reka-ui'],
                  primitives: ['Autocomplete'],
              }
            : (dependencies[formFieldModule(name) ?? ''] ?? {});
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
export const formFieldNotes: Record<string, { title: string; text: string }[]> = {
    'auto-complete': [
        {
            title: 'Suggestions and free text',
            text: 'The model always contains text; choosing a suggestion is optional. Use options for a simple string list, or replace the default slot with AutoComplete parts for grouped or richer menus. AutoCompleteTrigger, AutoCompleteCancel and AutoCompleteLabel are also re-exported from Reka UI.\n\nFor remote suggestions, load results in the application, set loading during the request and enable ignoreFilter when the returned results are already filtered. AutoComplete does not fetch data itself.',
        },
    ],
    editable: [
        {
            title: 'Saving text',
            text: 'Editing starts through the edit button by default. Enter saves and Escape cancels; in multiline mode, Shift+Enter inserts a line break. The draft is separate from the committed model and hidden form value.\n\nProvide save(value) for asynchronous persistence. The model updates after the callback succeeds; returning a string replaces the submitted text. A thrown or rejected error reopens editing and retains the draft. The loading prop can also indicate externally managed work.',
        },
        {
            title: 'Content sizing',
            text: 'autoResize fits the preview and editor to the current content. minWidth and maxWidth accept CSS lengths or numeric pixel values; rows reserves a minimum number of lines. Use buttonStyle="shadow" for ButtonShadow actions instead of ButtonAction.',
        },
    ],
    rating: [
        {
            title: 'Scores and interaction',
            text: 'Star scores range from zero to length. Interactive scores follow step; read-only scores preserve exact fractions for averages. In like-dislike mode, -1 means dislike, 0 is neutral and 1 means like; the star-specific length, step, hoverable and showValue settings do not apply.\n\nArrow keys adjust the star score, Home chooses the first step and End chooses the maximum. With clearable enabled, clicking the selected value clears it. Use readonly for a static score and disabled to keep controls visible without allowing changes.',
        },
    ],
    slider: [
        {
            title: 'Values, labels and step marks',
            text: 'The model is always a number array: use one value for one handle or two for a range. Supply distinct thumbLabels for range handles. Configure finite bounds with max greater than min and a positive step. minStepsBetweenThumbs sets the minimum gap in step intervals; showSteps draws decorative marks only when there are at most 200 intervals. valueCommit reports a committed interaction, while model updates track changes. Orientation, direction and inverted control the visual axis and keyboard movement.',
        },
    ],
    checkbox: [
        {
            title: 'Values and labels',
            text: 'Use a boolean model, an indeterminate value or custom `trueValue` and `falseValue` values. Supply `label` or the default slot for a linked visible label; `indicator` replaces the checked-state content. With no visible label, provide an accessible name on the control. `class` styles the outer labelled wrapper.',
        },
    ],
    'checkbox-group': [
        {
            title: 'Options and composition',
            text: 'Pass options with string values and labels, or compose Checkbox children through the default slot. Bind a string-array model to store selection. Group colours are inherited by children unless a child or option supplies its own variant. Disabled options remain visible and cannot be changed.',
        },
    ],
    'color-picker': [
        {
            title: 'Editing and output',
            text: 'The editing `mode` is independent of `outputFormat`: switching modes does not convert the model. Text edits commit when confirmed or blurred; invalid drafts do not replace the model, and clearing emits null. `alpha` enables opacity editing. Swatches accept colour strings or labelled objects. Recent colours can be controlled with `v-model:recentColors`; `historyKey` opts into localStorage persistence. The screen sampler is shown only when the browser supports EyeDropper.',
        },
    ],
    combobox: [
        {
            title: 'Field and primitives',
            text: 'ComboboxField selects a string value or null and supplies filtering, a visible trigger and optional clearing. Its `option` slot replaces option content. Use Combobox with the exported anchor, input, list, viewport and item components for object values, multiple selection or custom filtering. Name the control and give clear or icon-only actions accessible labels.',
        },
    ],
    'editor-json': [
        {
            title: 'JSON validation and EditorFrame',
            text: 'The model remains a JSON string. The `validation` event reports syntax validity and the parsed value, including an initial validation result. `allowEmpty` controls whether blank content is valid. Formatting and minification change the string; preview displays parsed content without replacing the model. The shared [EditorFrame utility](/components/api/editor-frame) supplies the toolbar and counter. Validate application data separately from JSON syntax.',
        },
    ],
    'editor-markdown': [
        {
            title: 'Editing commands and EditorFrame',
            text: 'The model contains Markdown source rather than rendered HTML. Toolbar tools format the current selection, lists continue on Enter, and undo/redo history belongs to this editor instance. `syntax` selects standard or Kleinanzeigen formatting; `syntaxOptions` overrides individual markers. The shared [EditorFrame utility](/components/api/editor-frame) supplies the toolbar, counter and editing surface.',
        },
    ],
    editor: [
        {
            title: 'TinyMCE instance',
            text: 'The Vue export is Editor; Storybook names it EditorTinyMCE. TinyMCE loads locally on mount. `ready` supplies the instance and `error` reports loading or initialisation failure. `licenseKey` overrides the Miru editor configuration, with the configured fallback used otherwise. This editor has its own surface and does not use EditorFrame.',
        },
    ],
    input: [
        {
            title: 'Native input attributes',
            text: 'Bind `v-model` for a controlled value or use `defaultValue` for an initial value. Native attributes such as type, name, placeholder, autocomplete, required, disabled and readonly remain available, together with native input and blur events. Associate a Label with the input id or provide an accessible name.',
        },
    ],
    'input-date-time': [
        {
            title: 'Value formats and calendar rules',
            text: 'Date values use YYYY-MM-DD, date-time values use YYYY-MM-DDTHH:mm and time values use HH:mm. A timeframe is an object with nullable start and end clock-time strings. Values are local wall-clock values without time-zone conversion. Calendar rules apply to date and date-time modes; `maxValue` takes precedence over the allowFuture shortcut. Partial and overnight timeframes remain editable; validate their business meaning in the application.',
        },
    ],
    'input-file': [
        {
            title: 'File selection',
            text: 'The `files` event returns the selected File array. Pass native accept, multiple, name, required and disabled attributes to control selection. There is no file-value model and no upload request; handle the files in the application.',
        },
    ],
    'input-number': [
        {
            title: 'Composition and formatting',
            text: 'Compose InputNumberContent, InputNumberInput and the increment/decrement buttons within InputNumber. Set bounds and step on the root and a meaningful accessible name on the input. Locale and Intl formatOptions control number presentation. The model contains the numeric value rather than its formatted display text.',
        },
    ],
    'input-password': [
        {
            title: 'Password visibility',
            text: 'The visibility toggle changes how the same value is displayed. Native input attributes such as autocomplete, name, required and placeholder are forwarded to the inner input. `showIcon` controls the decorative key icon. The visibility action uses translated labels; supply a separate accessible name for the password input.',
        },
    ],
    'input-phone': [
        {
            title: 'Calling codes and values',
            text: 'Supply country options with stable values, labels and callingCode strings. Existing numbers are matched against the longest calling-code prefix; otherwise the default code, a pinned option or the first option is used. Non-digits are removed from the national number. The emitted value combines the selected calling code and digits, or is null when empty. This does not validate national number lengths or allocation rules.',
        },
    ],
    'input-pin': [
        {
            title: 'String model and slot composition',
            text: 'InputPin replaces the earlier InputOtp component and uses Reka Pin Input without the former OTP library. Numeric mode filters non-digits; text mode accepts characters up to maxlength. The default layout creates one slot per character. For a custom layout, compose InputPinGroup, InputPinSlot with zero-based indices and InputPinSeparator in the default slot. `complete` reports a fully filled value; it does not submit or verify the code. `otp` requests one-time-code autocomplete, while masked presentation leaves the string model unchanged.',
        },
    ],
    'input-search': [
        {
            title: 'Search behaviour',
            text: 'The clear button empties the value and returns focus to the input. Disabled and read-only states prevent clearing. The component does not emit a search request or apply filtering; observe the value or native events in the application. `class` styles the wrapper and `inputClass` styles the input.',
        },
    ],
    'input-tags': [
        {
            title: 'Tags and input behaviour',
            text: 'Compose InputTagsItem, InputTagsItemText and InputTagsItemDelete with InputTagsInput. Give delete actions accessible names. Root options control delimiters, duplicates, maximum count and when typed or pasted values become tags. Invalid additions are reported through `invalid`; value changes are reported through the model.',
        },
    ],
    radiobox: [
        {
            title: 'Group and standalone use',
            text: 'Within RadioGroup, RadioBox follows the group selection, size and colour unless overridden. Standalone use creates a radio group root and reports changes through its own model. Give every choice a distinct value and a label; use a shared RadioGroup when choices belong to one selection.',
        },
    ],
    'radio-group': [
        {
            title: 'Options and keyboard navigation',
            text: 'Pass labelled options or compose RadioGroupItem or RadioBox children. The root owns the selected value and supplies orientation, keyboard looping, size and colour. Use an accessible group name and individual option labels. A disabled group prevents changes to all its choices.',
        },
    ],
    select: [
        {
            title: 'Selection, clearing and search',
            text: 'Select stores one value or an array in multiple mode. Compose SelectTrigger, SelectValue and SelectContent with labelled SelectItem options. SelectClear resets a single value to undefined or multiple values to an empty array, closes the popup and restores trigger focus. SelectSearch is a separate searchable single-choice field with string/null values and optional pinned options. The root size and shape are inherited by its controls; a trigger size can override dropdown density.',
        },
    ],
    switch: [
        {
            title: 'Switch states and track spacing',
            text: 'Variants are default, success and danger-success. Default uses neutral styling, success uses green when on, and danger-success uses red when off and green when on. `trackPadding` adds a non-negative pixel inset while retaining thumb size and travel. Use a linked label or an accessible name; the thumb slot replaces only the moving content.',
        },
    ],
    textarea: [
        {
            title: 'Native textarea attributes',
            text: 'Bind `v-model` or supply an initial defaultValue. Native attributes such as rows, maxlength, name, required, disabled, readonly and placeholder are forwarded to the textarea. Use a linked label and describe hints or errors with aria-describedby.',
        },
    ],
    toggle: [
        {
            title: 'Pressed state and appearance',
            text: 'Toggle exposes a persistent pressed state through its model and aria-pressed. The default variant uses a light selected surface, dark uses a dark selected surface, and outline remains a compatibility alias for default. Supply an accessible name for icon-only content.',
        },
    ],
    'toggle-group': [
        {
            title: 'Single and multiple selection',
            text: 'Use type single for one selected value or multiple for an array. `allowEmpty` prevents clearing the last selection when false; it does not invent an initial choice. Items inherit root size and appearance unless overridden. `spacing` adds gaps between segments, and keyboard movement follows orientation and direction.',
        },
    ],
    'upload-zone': [
        {
            title: 'Selection, processing and uploads',
            text: 'The files event reports accepted File objects; the application sends upload requests. transformFiles can process the selection asynchronously before validation and preview creation. A rejected processing step emits processing-error. Gallery mode manages image preview URLs and an UploadImage array, with reorder/remove events and an attachments slot for custom rendering. Busy state prevents new gallery edits; simple file mode can still accept files when appropriate. File type, size, count and image-dimension checks do not replace server validation.',
        },
    ],
};
