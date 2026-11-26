/** Handwritten API copy. Types, required flags and declared defaults remain source-owned. */
type Copy = {
    props: Record<string, string>;
    events: Record<string, string>;
    slots: Record<string, string>;
    exposed?: Record<string, string>;
};
export const formFieldClassComponents = [
    'AutoComplete',
    'AutoCompleteAnchor',
    'AutoCompleteEmpty',
    'AutoCompleteGroup',
    'AutoCompleteInput',
    'AutoCompleteItem',
    'AutoCompleteList',
    'AutoCompleteSeparator',
    'AutoCompleteViewport',
    'Editable',
    'Rating',
    'Slider',
    'Checkbox',
    'CheckboxGroup',
    'ColorPicker',
    'ComboboxAnchor',
    'ComboboxEmpty',
    'ComboboxField',
    'ComboboxGroup',
    'ComboboxInput',
    'ComboboxItem',
    'ComboboxItemIndicator',
    'ComboboxList',
    'ComboboxSeparator',
    'ComboboxViewport',
    'Editor',
    'Input',
    'InputDateTime',
    'InputFile',
    'InputNumber',
    'InputNumberContent',
    'InputNumberDecrement',
    'InputNumberIncrement',
    'InputNumberInput',
    'InputPassword',
    'InputPhone',
    'InputPin',
    'InputPinGroup',
    'InputPinSeparator',
    'InputPinSlot',
    'InputSearch',
    'InputTags',
    'InputTagsInput',
    'InputTagsItem',
    'InputTagsItemDelete',
    'InputTagsItemText',
    'RadioBox',
    'RadioGroup',
    'RadioGroupItem',
    'SelectClear',
    'SelectContent',
    'SelectItem',
    'SelectLabel',
    'SelectScrollDownButton',
    'SelectScrollUpButton',
    'SelectSeparator',
    'SelectTrigger',
    'Switch',
    'Textarea',
    'Toggle',
    'ToggleGroup',
    'ToggleGroupItem',
];
const commonProps: Record<string, string> = {
    class: 'Additional CSS classes for the component surface.',
    style: 'Inline styles for the editor wrapper.',
    as: 'The HTML element or Vue component to render.',
    asChild: 'Merge the component’s behaviour and attributes into its child.',
    id: 'The control id used for label and description associations.',
    name: 'The field name used for native form submission.',
    required: 'Mark the value as required for native form submission.',
    disabled: 'Prevent interaction with the control.',
    readonly: 'Allow reading and focus while preventing edits.',
    modelValue: 'The controlled value; bind with v-model to handle updates.',
    defaultValue: 'The initial value when the model is not controlled.',
    value: 'The value represented by this option.',
    trueValue: 'The model value emitted when the control is checked.',
    falseValue: 'The model value emitted when the control is unchecked.',
    size: 'Set the control dimensions, spacing and text size.',
    variant: 'Set the control colour or visual appearance.',
    label: 'The visible or accessible label for the control.',
    placeholder: 'Text displayed when no value has been entered or selected.',
    ariaLabel: 'The accessible name for the control.',
    invalid: 'Show the invalid appearance and expose invalid state to assistive technology.',
    valid: 'Show the valid appearance; an invalid state takes precedence.',
    orientation: 'Set the layout and keyboard navigation axis.',
    dir: 'Set the reading direction; inherits the surrounding provider when omitted.',
    open: 'The controlled popup state; bind with v-model:open to handle updates.',
    defaultOpen: 'The popup state when first rendered without an open binding.',
    multiple: 'Allow several selected values rather than a single value.',
    options: 'The ordered options, including values, labels and optional disabled states.',
    by: 'Compare object values using this field name or comparison function.',
    loop: 'Wrap keyboard focus from the last item to the first and back.',
    textValue:
        'The text used for filtering or type-ahead when the option content is not plain text.',
    heading: 'The visible heading for this option group.',
    forceMount: 'Keep this element mounted even when it would normally be hidden.',
    unmountOnHide: 'Remove hidden content from the DOM.',
    reference: 'The element or virtual reference used to position the popup.',
    position: 'Choose the popup positioning mode.',
    side: 'The preferred side of the positioning reference.',
    sideOffset: 'The distance from the positioning reference, in pixels.',
    sideFlip: 'Allow the popup to flip to the opposite side to avoid collisions.',
    align: 'Align the popup with the start, centre or end of its reference.',
    alignOffset: 'The offset from the chosen alignment, in pixels.',
    alignFlip: 'Allow alignment to flip when avoiding collisions.',
    avoidCollisions: 'Adjust popup placement to keep it within the collision boundary.',
    collisionBoundary: 'The element or elements that constrain popup positioning.',
    collisionPadding: 'The spacing to retain inside the collision boundary.',
    arrowPadding: 'The minimum distance between an arrow and the popup edges.',
    hideShiftedArrow: 'Hide an arrow when its position has to shift from the reference centre.',
    sticky: 'Control how the popup stays attached to its reference near a boundary.',
    hideWhenDetached: 'Hide the popup when its reference is no longer visible.',
    positionStrategy: 'Use fixed or absolute positioning for the popup.',
    updatePositionStrategy: 'Choose when the popup position is recalculated.',
    disableUpdateOnLayoutShift: 'Skip automatic position updates caused by layout shifts.',
    prioritizePosition: 'Prefer the requested placement when resolving popup collisions.',
    disableOutsidePointerEvents: 'Prevent pointer interaction outside the open content.',
    bodyLock: 'Control body scroll locking while the popup is open.',
    memoDependencies: 'Dependencies used to invalidate the option-list rendering cache.',
    hideWhenEmpty: 'Hide the list when no options are available.',
    nonce: 'The content-security-policy nonce for the viewport’s injected styles.',
    autoFocus: 'Focus the input when it is mounted.',
    autofocus: 'Focus the first PIN slot when mounted.',
    resetSearchTermOnBlur: 'Clear the combobox search text when it loses focus.',
    resetSearchTermOnSelect: 'Reset the search text after selecting an option.',
    openOnFocus: 'Open the option list when the input receives focus.',
    openOnClick: 'Open the option list when the input is clicked.',
    ignoreFilter: 'Skip built-in filtering so the application can provide matching options.',
    resetModelValueOnClear: 'Reset selection when the combobox input is cleared.',
    highlightOnHover: 'Highlight an option when the pointer moves over it.',
    displayValue: 'Convert a selected value into the text displayed by the input.',
    wrapperClass: 'Additional CSS classes for the combobox input wrapper.',
    disableIcon: 'Hide the combobox input’s decorative search icon.',
    clearable: 'Show a control that clears the selected value.',
    emptyLabel: 'Text displayed when there are no matching options.',
    shape: 'Choose standard corners or a rounded trigger shape.',
    for: 'The id of the element associated with this label.',
    min: 'The lowest allowed numeric value.',
    max: 'The highest allowed numeric value.',
    step: 'The amount added or removed by each step action.',
    stepSnapping: 'Snap numeric values to the configured step interval.',
    allowInvalid:
        'Keep typed values outside bounds or off the step grid; step controls still clamp and snap.',
    focusOnChange: 'Focus the numeric input when a step action changes its value.',
    formatOptions: 'Intl.NumberFormat options for the displayed numeric value.',
    locale: 'Override the locale used for labels or value formatting.',
    disableWheelChange: 'Prevent the mouse wheel from changing the numeric value.',
    invertWheelChange: 'Reverse the direction of numeric mouse-wheel changes.',
    startingValue: 'The value used when stepping from an empty numeric field.',
    maxlength: 'The maximum number of characters allowed in the value.',
    maxLength: 'The maximum length of text entered into the tag input.',
    counter: 'Show the editor’s character counter.',
    counterMode: 'Show the current count, remaining characters or count against the limit.',
    rows: 'The number of visible text rows.',
    toolbar: 'The editing tools shown in the toolbar.',
    convertValue: 'Convert entered tag text into a model value.',
    addOnPaste: 'Create tags from pasted text using the configured delimiter.',
    addOnTab: 'Create a tag when Tab is pressed.',
    addOnBlur: 'Create a tag when the input loses focus.',
    duplicate: 'Allow duplicate tag values.',
    delimiter: 'The delimiter used to separate entered or pasted tags.',
    rovingFocus: 'Use one tab stop and arrow-key navigation within the group.',
    spacing: 'The gap between toggle segments, in pixels.',
    allowEmpty: 'Allow the final selected toggle to be cleared.',
    iconOnly: 'Use equal width and height for icon-only content.',
};
const commonEvents: Record<string, string> = {
    'update:modelValue': 'Emitted when the value changes, with the updated value.',
    'update:open': 'Emitted when the popup opens or closes, with its new state.',
    blur: 'Emitted when the editing control loses focus.',
    highlight: 'Emitted when the highlighted option changes, with its details.',
    select: 'Emitted when this option is selected; prevent default to override selection.',
    escapeKeyDown: 'Emitted when Escape is pressed in the popup; can be prevented.',
    pointerDownOutside: 'Emitted on a pointer press outside the popup; can be prevented.',
    focusOutside: 'Emitted when focus moves outside the popup; can be prevented.',
    interactOutside: 'Emitted on focus or pointer interaction outside the popup; can be prevented.',
    closeAutoFocus: 'Emitted before focus is restored after closing; can be prevented.',
    invalid: 'Emitted when entered text cannot be added as a tag.',
    addTag: 'Emitted when a tag is added, with the added value.',
    removeTag: 'Emitted when a tag is removed, with the removed value.',
};
function copy(
    props: Record<string, string> = {},
    slots: Record<string, string> = {},
    events: Record<string, string> = {},
): Copy {
    return { props: { ...commonProps, ...props }, events: { ...commonEvents, ...events }, slots };
}
const selectionSlot = { default: 'The composed selection controls and their visible labels.' };
const popupSlot = { default: 'The option list, groups and empty-state content.' };
const textSlot = { default: 'The visible text or custom content.' };
const editorProps = {
    modelValue: 'The editor source string; bind with v-model to handle edits.',
    label: 'The accessible editor label; uses the translated fallback when omitted.',
    required: 'Mark the underlying editing control as required.',
};
export const formFieldApiCopy: Record<string, Copy> = {
    AutoComplete: copy(
        {
            modelValue: 'The current text; updates while typing and when a suggestion is chosen.',
            defaultValue: 'The initial text when no model is supplied.',
            options: 'The suggested strings displayed by the built-in menu.',
            ariaLabel: 'The accessible label for the built-in input.',
            clearable: 'Show an action that clears the current text.',
            loading: 'Show a spinner and loading message while suggestions are being loaded.',
            emptyText:
                'The message shown when no suggestions match; uses the translated fallback when omitted.',
            resetSearchTermOnBlur:
                'Restore the input display from the current text model when the suggestion list closes.',
            openOnFocus: 'Open the suggestion list when the input receives focus.',
            openOnClick: 'Open the suggestion list when the input is clicked.',
            ignoreFilter:
                'Disable built-in filtering, for example when the application supplies filtered results.',
            highlightOnHover: 'Highlight a suggestion when the pointer moves over it.',
            loop: 'Wrap keyboard navigation between the first and last suggestions.',
        },
        { default: 'Replace the built-in input and menu with composed AutoComplete parts.' },
        {
            'update:modelValue':
                'Emitted while typing, clearing or choosing a suggestion, with the current text.',
            highlight:
                'Emitted when the highlighted suggestion changes, with its element and value when available.',
        },
    ),
    AutoCompleteAnchor: copy({}, { default: 'The input, optional actions and suggestion list.' }),
    AutoCompleteEmpty: copy({}, { default: 'The message displayed when no suggestions match.' }),
    AutoCompleteGroup: copy(
        { heading: 'The optional visible heading for this suggestion group.' },
        { default: 'The suggestions in this group.' },
    ),
    AutoCompleteInput: copy(
        { modelValue: 'The input text, normally managed by the enclosing AutoComplete.' },
        {},
        { 'update:modelValue': 'Emitted when the input text changes.' },
    ),
    AutoCompleteItem: copy(
        {
            value: 'The suggestion value written to the text model when chosen.',
            textValue: 'The text used to filter the suggestion when its rendered content differs.',
        },
        { default: 'The visible suggestion content.' },
        {
            select: 'Emitted before a suggestion is selected; prevent the event to cancel selection.',
        },
    ),
    AutoCompleteList: copy(
        {},
        { default: 'The suggestion viewport, groups and empty-state content.' },
    ),
    AutoCompleteSeparator: copy({}, { default: 'Optional content within the suggestion divider.' }),
    AutoCompleteViewport: copy({}, { default: 'The suggestion items and groups.' }),
    Editable: {
        ...copy(
            {
                modelValue: 'The committed text; updates only after a successful save.',
                defaultValue: 'The initial committed text when no model is supplied.',
                ariaLabel:
                    'The accessible editing-control label; uses the translated fallback when omitted.',
                name: 'The name of the hidden form input containing the committed text.',
                placeholder: 'The text displayed when the value is empty.',
                readonly: 'Show the text without editing actions or activation.',
                loading:
                    'Show pending feedback and block editing while an external save is running.',
                error: 'An application-supplied error message; takes precedence over a failed-save message.',
                save: 'Save the draft; optionally return replacement text or a promise. Throw or reject to retain the draft for retry.',
                activationMode:
                    'Start editing only through the edit action (none), on focus, or on double click.',
                startWithEditMode: 'Begin in editing mode when the component is mounted.',
                selectOnFocus: 'Select the text when the editing control receives focus.',
                maxLength: 'The maximum number of characters accepted by the editing control.',
                autoResize:
                    'Fit the field width and height to its current content within the configured bounds.',
                minWidth: 'The minimum field width as a CSS length or a number of pixels.',
                maxWidth: 'The maximum field width as a CSS length or a number of pixels.',
                multiline: 'Use a textarea; Shift+Enter adds a line and Enter saves.',
                rows: 'The minimum number of text lines reserved for multiline content.',
                actionSize: 'The size of the edit, cancel and save buttons.',
                buttonStyle: 'Use ButtonAction or ButtonShadow for the editing actions.',
                muted: 'Use a muted appearance for the edit button.',
                editLabel:
                    'The edit action label and tooltip; uses the translated fallback when omitted.',
                cancelLabel:
                    'The cancel action label and tooltip; uses the translated fallback when omitted.',
                saveLabel:
                    'The save action label and tooltip; pending saves use the translated saving label.',
            },
            {},
            {
                'update:modelValue': 'Emitted after saving succeeds, with the committed text.',
                'update:editing':
                    'Emitted when entering or leaving editing mode, with the new state.',
                submit: 'Emitted with the draft before the save callback runs.',
                saved: 'Emitted after saving succeeds, with the final committed text.',
                cancel: 'Emitted when editing is cancelled and the committed text is restored.',
                error: 'Emitted when saving fails, with the thrown or rejected error.',
            },
        ),
        exposed: {
            edit: 'Enter editing mode unless disabled, read-only or busy.',
            cancel: 'Cancel editing and restore the committed text unless busy.',
            submit: 'Request a save of the current draft unless busy; disabled and read-only fields reject saving.',
        },
    },
    Rating: copy(
        {
            modelValue:
                'The score: 0 to length for stars, or -1, 0 and 1 for dislike, neutral and like.',
            defaultValue: 'The initial score when no model is supplied; defaults to zero.',
            length: 'The number of stars; finite values are rounded down with a minimum of one.',
            step: 'The star-selection interval: 1, 0.5, 0.25 or 0.1.',
            variant:
                'The theme colour used for filled stars; voting uses success and danger colours.',
            mode: 'Display a star scale or a pair of like/dislike actions.',
            readonly:
                'Display the score without interactive controls; fractional star values remain exact.',
            clearable: 'Allow an existing selection to return to zero.',
            hoverable: 'Preview star values while the pointer moves over the scale.',
            animated: 'Animate selected icons while respecting reduced-motion preferences.',
            showValue: 'Show the current numeric score beside the star scale.',
            ariaLabel:
                'The accessible label for the interactive control; uses the translated fallback when omitted.',
        },
        {},
        {
            'update:modelValue': 'Emitted when the user changes or clears the score.',
            change: 'Emitted with the same score after each user update.',
        },
    ),
    Slider: copy(
        {
            modelValue:
                'The numeric handle values; use one value for a single handle or two for a range.',
            defaultValue: 'The initial numeric handle values when no model is supplied.',
            min: 'The lowest value on the slider track.',
            max: 'The highest value on the slider track.',
            step: 'The value interval between allowed handle positions.',
            minStepsBetweenThumbs: 'The minimum gap between handles, measured in step intervals.',
            thumbAlignment:
                'Keep handles within the track (contain) or centred over its endpoints (overflow).',
            inverted: 'Reverse the visual value direction without changing the numeric bounds.',
            label: 'The accessible handle label when individual thumbLabels are not supplied.',
            thumbLabels: 'Accessible labels for individual handles, in model order.',
            showSteps: 'Show decorative step marks when the track has at most 200 intervals.',
        },
        {},
        {
            valueCommit:
                'Emitted when an interaction is committed, with the numeric handle values.',
        },
    ),
    Checkbox: copy(
        {
            modelValue: 'The checked or indeterminate state, or custom checked/unchecked value.',
            label: 'The optional visible label; replaced by the default slot when supplied.',
            variant: 'Set the selection colour; inherits the group colour when omitted.',
            class: 'Additional CSS classes for the outer label/control wrapper.',
        },
        {
            default: 'The visible label, linked to the checkbox control.',
            indicator: 'Custom checked-state content; receives the checkbox slot state.',
        },
    ),
    CheckboxGroup: copy(
        {
            modelValue: 'The selected string values; bind with v-model to update them.',
            defaultValue: 'The initial selected values when no model is supplied.',
            options:
                'The labelled checkbox options, with optional disabled states and colour overrides.',
        },
        { default: 'Custom Checkbox children; replaces the generated options.' },
    ),
    ColorPicker: copy(
        {
            modelValue: 'The colour string, or null when empty.',
            ariaLabel: 'The accessible name for the colour input and picker.',
            invalid: 'Show an invalid state independently of draft colour parsing.',
            modes: 'The enabled editing modes; an empty list falls back to HEX.',
            mode: 'The controlled editing mode; bind with v-model:mode to handle changes.',
            defaultMode: 'The initial editing mode when mode is not controlled.',
            outputFormat:
                'The format emitted for completed edits; independent of the editing mode.',
            alpha: 'Enable opacity editing; false keeps edited colours fully opaque.',
            showEyeDropper: 'Offer screen sampling when the browser supports EyeDropper.',
            swatches: 'Preset colour strings or objects with value and optional label.',
            showRecent: 'Show and record recently committed colours.',
            recentColors:
                'The controlled recent-colour list; bind with v-model:recentColors to update it.',
            recentLimit: 'The maximum number of recent colours to retain.',
            historyKey: 'An optional localStorage key for recent-colour persistence.',
        },
        {},
        {
            'update:modelValue':
                'Emitted as colour edits update the value, or with null when cleared.',
            change: 'Emitted when a valid colour edit is committed, with the colour string or null.',
            blur: 'Emitted when the colour text input loses focus, with the focus event.',
            'update:mode': 'Emitted when the editing mode changes, with its mode name.',
            'update:recentColors': 'Emitted when recent-colour history changes or is restored.',
        },
    ),
    Combobox: copy(
        {
            modelValue: 'The selected value or values; use an array in multiple mode.',
            defaultValue: 'The initial selection when the model is not controlled.',
        },
        selectionSlot,
    ),
    ComboboxAnchor: copy(
        {},
        { default: 'The input, trigger or other content used as the popup anchor.' },
    ),
    ComboboxEmpty: copy({}, { default: 'The message shown when no options match.' }),
    ComboboxGroup: copy({}, { default: 'The options in this labelled group.' }),
    ComboboxInput: copy(
        {
            modelValue: 'The search text; bind with v-model to control it.',
            displayValue: 'Convert the selected option into visible input text.',
        },
        { default: 'Optional content within the input wrapper.' },
    ),
    ComboboxItem: copy({}, { default: 'The option label and optional selection indicator.' }),
    ComboboxItemIndicator: copy({}, { default: 'The selected-option indicator.' }),
    ComboboxList: copy({}, popupSlot),
    ComboboxSeparator: copy({}, { default: 'Optional separator content.' }),
    ComboboxViewport: copy({}, { default: 'The scrollable options and groups.' }),
    ComboboxField: copy(
        {
            modelValue: 'The selected string value, or null when no option is selected.',
            label: 'The accessible field label.',
            options: 'The string-valued options with visible labels and optional disabled states.',
            clearable: 'Show a clear action that resets the model to null.',
        },
        { option: 'Custom option content; receives the option.' },
        { blur: 'Emitted when the composed field loses focus.' },
    ),
    EditorJson: copy(
        {
            ...editorProps,
            indent: 'The number of indentation spaces used by JSON formatting, clamped to 0–10.',
            allowEmpty: 'Treat empty or whitespace-only source as valid JSON input.',
            preview: 'Offer a read-only preview for valid JSON.',
            previewMaxHeight: 'The maximum preview height; numbers are interpreted as pixels.',
            lineNumbers: 'Show synchronised line numbers in the editor and preview.',
        },
        { counter: 'Custom counter content from EditorFrame.' },
        {
            validation:
                'Emitted initially and after source changes, with syntax validity and the parsed value when available.',
        },
    ),
    EditorMarkdown: copy(
        {
            ...editorProps,
            syntax: 'Choose standard Markdown or Kleinanzeigen marker conventions.',
            syntaxOptions: 'Override individual Markdown marker settings.',
            toolbar: 'The enabled heading, bold, list, ordered-list and divider tools.',
        },
        { counter: 'Custom counter content from EditorFrame.' },
    ),
    Editor: copy(
        {
            ...editorProps,
            height: 'The editor height in pixels.',
            toolbar: 'The TinyMCE toolbar configuration string, or false to hide it.',
            licenseKey:
                'The TinyMCE license key; falls back to the Miru editor setting and then gpl.',
            class: 'Additional CSS classes for the editor wrapper.',
        },
        {},
        {
            ready: 'Emitted after initialisation, with the TinyMCE editor instance.',
            error: 'Emitted if loading or initialising TinyMCE fails, with the error.',
        },
    ),
    Input: copy({
        modelValue: 'The current text or numeric value; bind with v-model to update it.',
    }),
    InputDateTime: copy({
        modelValue:
            'A local date/time string, a timeframe with nullable start/end values, or null.',
        mode: 'Choose datetime, date, time or timeframe editing.',
        allowFuture: 'Control future-date selection when no explicit maxValue is supplied.',
        minValue: 'The earliest calendar day that can be selected.',
        maxValue: 'The latest calendar day that can be selected; overrides allowFuture.',
        weekStartsOn: 'The first weekday, from 0 for Sunday to 6 for Saturday.',
        disabledWeekdays: 'Weekday numbers that cannot be selected.',
        disabledDates: 'ISO date strings that cannot be selected.',
        holidays: 'Holiday names keyed by ISO date.',
        disableHolidays: 'Prevent selection of dates included in holidays.',
        availability: 'Per-date availability information, including closed or unavailable days.',
        isDateDisabled: 'Return true for calendar dates that must be disabled.',
        isDateUnavailable: 'Return true for calendar dates that are unavailable.',
        label: 'The accessible label for the composed date/time control.',
        startLabel: 'The accessible label for the timeframe start input.',
        endLabel: 'The accessible label for the timeframe end input.',
    }),
    InputFile: copy(
        {},
        {},
        { files: 'Emitted after native selection, with the selected File array.' },
    ),
    InputNumber: copy(
        { modelValue: 'The numeric value; bind with v-model to update it.' },
        { default: 'The numeric input, shared content surface and step controls.' },
    ),
    InputNumberContent: copy(
        { size: 'Set the shared numeric field surface size.' },
        { default: 'The input and increment/decrement controls.' },
    ),
    InputNumberDecrement: copy({}, { default: 'Custom decrement icon or text.' }),
    InputNumberIncrement: copy({}, { default: 'Custom increment icon or text.' }),
    InputNumberInput: copy({ size: 'Override the numeric input’s inherited size.' }),
    InputPassword: copy({
        modelValue: 'The password value; bind with v-model to update it.',
        showIcon: 'Show the decorative key icon before the input.',
    }),
    InputPhone: copy({
        modelValue: 'The calling code and national digits combined, or null when empty.',
        countries: 'Country options with value, label, callingCode and optional pinned state.',
        countryCodeLabel: 'The accessible name for the country calling-code selector.',
        placeholder: 'The national-number input placeholder.',
        defaultCallingCode:
            'The fallback calling code when the current value has no matching prefix.',
    }),
    InputPin: copy(
        {
            modelValue: 'The complete PIN string; bind with v-model to update it.',
            defaultValue: 'The initial PIN string when no model is supplied.',
            maxlength: 'The number of PIN characters and default slots; at least one.',
            type: 'Accept digits only (number) or general text characters (text).',
            masked: 'Display mask characters while retaining the underlying string value.',
            maskCharacter: 'The character displayed for each masked value.',
            connected: 'Join adjacent slots with shared borders.',
            otp: 'Request one-time-code autocomplete support from the browser.',
            placeholder: 'The placeholder character for empty slots.',
            invalid: 'Set invalid display state; otherwise inherits Field context.',
            valid: 'Set valid display state; invalid takes precedence.',
        },
        { default: 'A custom group/slot layout; exposes the current string as value.' },
        {
            'update:modelValue': 'Emitted when the PIN string changes.',
            input: 'Emitted after accepted input, with the current PIN string.',
            complete: 'Emitted when every required character position is filled.',
            focus: 'Emitted when focus enters the PIN control from outside.',
            blur: 'Emitted when focus leaves the PIN control.',
            paste: 'Emitted when text is pasted into the PIN control, with the clipboard event.',
        },
    ),
    InputPinGroup: copy(
        { connected: 'Override inherited joined-border styling for this group.' },
        { default: 'The PIN slots in this group.' },
    ),
    InputPinSlot: copy({
        index: 'The zero-based character position represented by this slot.',
        masked: 'Override the root’s masking setting.',
        maskCharacter: 'Override the root’s mask character.',
        size: 'Override the root’s slot size.',
        readonly: 'Override the inherited read-only state.',
    }),
    InputPinSeparator: copy({}, { default: 'Custom decorative separator content.' }),
    InputSearch: copy({
        modelValue: 'The search text; bind with v-model to observe edits.',
        iconAlign: 'Align the search icon to the centre or top of its wrapper.',
        inputClass: 'Additional CSS classes for the native input.',
        class: 'Additional CSS classes for the search wrapper.',
    }),
    InputTags: copy(
        {
            modelValue: 'The ordered tag values; bind with v-model to update them.',
            max: 'The maximum number of tags.',
            displayValue: 'Convert a tag value into visible text.',
            variant: 'Set the tag colour inherited by its items.',
        },
        { default: 'The tag items, their delete controls and the entry input.' },
    ),
    InputTagsInput: copy({}, {}),
    InputTagsItem: copy(
        {
            value: 'The tag value represented by this item.',
            variant: 'Override the root’s tag colour.',
        },
        { default: 'The tag label and optional delete control.' },
    ),
    InputTagsItemDelete: copy({}, { default: 'Custom delete icon or accessible text.' }),
    InputTagsItemText: copy({}, { default: 'Custom visible tag text.' }),
    RadioBox: copy(
        {
            value: 'The string value selected by this radio choice.',
            modelValue: 'The selected string value for standalone use.',
            label: 'The optional visible radio label.',
            variant: 'Override the group’s selection colour.',
        },
        { default: 'The visible radio label; replaces label when supplied.' },
    ),
    RadioGroup: copy(
        {
            modelValue: 'The selected radio value; bind with v-model to update it.',
            options: 'Labelled radio options with values and optional disabled states or variants.',
        },
        { default: 'Custom RadioBox or RadioGroupItem children; replaces generated options.' },
    ),
    RadioGroupItem: copy(
        {
            variant: 'Override the root’s selection colour.',
            size: 'Override the root’s radio size.',
        },
        { default: 'Custom selected-state indicator content.' },
    ),
    Select: copy(
        {
            modelValue: 'The selected value, or an array in multiple mode.',
            nullableValue:
                'The hidden native select value used when the model is null or undefined.',
            autocomplete: 'The native form autocomplete hint.',
            size: 'The size inherited by the trigger and popup.',
            shape: 'The trigger shape inherited by SelectTrigger.',
        },
        { default: 'The trigger, current value, popup and options.' },
    ),
    SelectContent: copy({ size: 'Override the inherited popup size.' }, popupSlot),
    SelectGroup: copy({}, { default: 'The group label and related options.' }),
    SelectItem: copy(
        {},
        {
            default: 'The visible option content.',
            'indicator-icon': 'Custom selected-option indicator.',
        },
    ),
    SelectItemText: copy({}, textSlot),
    SelectLabel: copy({}, { default: 'The option-group heading.' }),
    SelectScrollDownButton: copy({}, { default: 'Custom downward-scroll indicator.' }),
    SelectScrollUpButton: copy({}, { default: 'Custom upward-scroll indicator.' }),
    SelectSeparator: copy(),
    SelectTrigger: copy(
        {
            size: 'Set trigger size and the inherited dropdown density.',
            shape: 'Override the root’s trigger shape.',
        },
        { default: 'The selected value or custom trigger content.' },
    ),
    SelectValue: copy(
        {},
        { default: 'Custom selected-value content; otherwise selected option text is used.' },
    ),
    SelectClear: copy({
        label: 'The accessible clear label; uses translated clear text when omitted.',
        disabled: 'Disable clearing; the root disabled state is also respected.',
    }),
    SelectSearch: copy({
        modelValue: 'The selected string value, or null when empty.',
        label: 'The accessible label and fallback visible placeholder.',
        options: 'Labelled string options with optional disabled and pinned states.',
    }),
    Switch: copy(
        {
            modelValue: 'The checked state or custom checked/unchecked value.',
            variant: 'Choose neutral, success or danger-success track colours.',
            trackPadding:
                'Extra non-negative track inset in pixels; retains thumb size and travel.',
        },
        { thumb: 'Custom content inside the moving switch thumb.' },
    ),
    Textarea: copy({ modelValue: 'The multiline text value; bind with v-model to update it.' }),
    Toggle: copy(
        {
            modelValue: 'The pressed boolean state; bind with v-model to update it.',
            variant:
                'Choose default or dark selected styling; outline is a compatibility alias for default.',
        },
        { default: 'The visible action label or icon.' },
    ),
    ToggleGroup: copy(
        {
            modelValue: 'One selected value in single mode or an array in multiple mode.',
            defaultValue: 'The initial selection when no model is supplied.',
            type: 'Choose single or multiple selection.',
            variant: 'The shared selected appearance inherited by items.',
            spacing: 'The gap between segments, in pixels.',
            allowEmpty:
                'Allow clearing the final selected value; false preserves an existing selection.',
        },
        { default: 'The grouped ToggleGroupItem controls.' },
    ),
    ToggleGroupItem: copy(
        {
            variant: 'Override the group’s selected appearance.',
            size: 'Override the group’s item size.',
        },
        { default: 'The visible option label or icon.' },
    ),
    UploadZone: copy(
        {
            title: 'The visible upload prompt.',
            transformFiles:
                'Process selected files before validation and preview creation; return File[] or a promise of it.',
            gallery: 'Render an editable image-preview gallery.',
            modelValue: 'The gallery’s image records; bind with v-model to update them.',
            sortable: 'Allow reordering of gallery images.',
            showPrimary: 'Mark the first gallery image as primary.',
            maxFiles: 'The maximum accepted gallery item count.',
            description: 'Supporting upload instructions.',
            accept: 'The accepted extensions or MIME types; defaults to images in gallery mode.',
            formats: 'A human-readable format label for hints and error messages.',
            maxSizeMiB: 'The maximum size of each accepted file in mebibytes.',
            multiple: 'Allow several files in a selection.',
            busy: 'Show application processing state; gallery editing is blocked while busy.',
            status: 'The application feedback state: idle, success or error.',
            error: 'An application-supplied error message.',
            minDimensions: 'The minimum accepted image width and height.',
            maxDimensions: 'The maximum accepted image width and height.',
        },
        {
            default: 'Custom content in the upload area.',
            attachments: 'Custom gallery rendering; exposes items, update and disabled.',
        },
        {
            files: 'Emitted with accepted files after optional processing and validation.',
            'processing-error':
                'Emitted when file processing fails, including rejected or invalid transformFiles results.',
            'update:modelValue': 'Emitted when the gallery records change.',
            reorder: 'Emitted after gallery reordering, with the ordered image ids.',
            remove: 'Emitted when a gallery image is removed, with its id.',
        },
    ),
};

/** Native and example controls still get clear descriptions without inventing component props. */
export function formFieldControlCopy(component: string, name: string) {
    if (component === 'Slider' && name === 'initialRange')
        return {
            description: 'Start this example with two handles rather than one.',
            category: 'Example content',
        };
    if (component === 'Select' && name === 'clearable')
        return {
            description: 'Show SelectClear beside the trigger in this example.',
            category: 'Example content',
        };
    return {
        description: formFieldApiCopy[component]?.props[name],
        category:
            ['Input', 'Textarea', 'InputFile'].includes(component) && name === 'disabled'
                ? 'Native attributes'
                : component + ' props',
    };
}

export function describeFormFieldControls(
    component: string,
    argTypes: Record<string, unknown> | undefined,
): void {
    for (const [name, control] of Object.entries(argTypes ?? {})) {
        if (!control || typeof control !== 'object' || !argTypes) continue;
        const table =
            'table' in control && control.table && typeof control.table === 'object'
                ? control.table
                : {};
        const copy = formFieldControlCopy(component, name);
        argTypes[name] = {
            ...control,
            description: copy.description,
            table: { ...table, category: copy.category },
        };
    }
}
