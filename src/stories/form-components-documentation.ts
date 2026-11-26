import { componentDependenciesMarkdown } from './component-dependencies.ts';

/** Manually authored component copy; workflows live in the VitePress Forms guides. */
export const formComponentSummaries: Record<string, string> = {
    Field: 'A layout for a control, its label, hint and error messages. Shares validation display state with labels while leaving values and validation to the application.',
    FieldContent: 'A content column for a field’s label, hint and error messages.',
    FieldDescription: 'Supporting text that explains a field or control.',
    FieldError: 'Field error messages with alert semantics and duplicate-message removal.',
    FieldGroup:
        'A spaced group of fields that also provides the container for responsive field layouts.',
    FieldLabel: 'A field label with optional required and validation markers.',
    FieldLegend: 'A legend for a fieldset, with heading and label-size treatments.',
    FieldSeparator: 'A visual divider between field groups, with optional text.',
    FieldSet: 'A semantic fieldset for related controls and their legend.',
    FieldTitle: 'A styled title for field content that does not require a label association.',
    Label: 'An accessible label for a control, with optional required and validation markers. Inherits validation display state from a surrounding Field when no explicit state is supplied.',
    InputGroup:
        'A shared border and focus surface for a text control, prefixes, suffixes and actions. Compose its input, add-on and button parts to suit the control.',
    InputGroupAddon: 'An add-on before, after, above or below a grouped input.',
    InputGroupButton: 'A compact action button within an input group.',
    InputGroupInput: 'A text input styled to share its input group’s border and size.',
    InputGroupText: 'Supporting text, symbols or icons within an input group.',
    InputGroupTextarea: 'A multiline text control styled to share its input group’s surface.',
    Form: 'A complete form surface with generated fields, section navigation and responsive actions. Connect a form controller to display validation errors and handle submission in the application.',
    FormSectionRenderer:
        'A section renderer that turns typed field definitions into a responsive form grid. Composes field controls, headings and spacers while allowing custom field content.',
    FormFieldRenderer:
        'A field renderer that connects a field definition to the supplied form state and control.',
    FormDateTimeRangeField: 'A date-range control with optional times and an all-day mode.',
    FormHeader: 'A heading and optional description within a generated form grid.',
    FormSpacer: 'A spacing element within a generated form grid.',
    FormText: 'A text renderer for literal copy or a translation key.',
    FormLocaleSwitcher: 'A locale selector for forms with translated field values.',
    FormRelationSummary: 'A compact summary of related items, with optional item links.',
    FormRelationshipPicker: 'A searchable checkbox list for choosing related items.',
    FormRepeater:
        'A repeated-item layout with add and remove actions and optional accordion sections.',
};
export const generatorSummary =
    'Compose generated forms from typed sections and field definitions, with responsive grids and custom field slots. The generator combines Form, FormSectionRenderer and FormFieldRenderer rather than exporting a separate FormGenerator component.';
const ui = (name: string, slug: string, story: string, layout = false) => ({
    name,
    url: `/${layout ? 'layouts' : 'components'}/api/${slug}`,
    storybook: `/docs/${story}--docs`,
});
export function formComponentDependencies(name: string, storybook = false) {
    const common = ['clsx', 'tailwind-merge', 'vue'];
    if (name === 'Label')
        return componentDependenciesMarkdown(
            {
                packages: ['@tabler/icons-vue', '@vueuse/core', 'reka-ui', ...common],
                primitives: [
                    { name: 'Reka UI Label', url: 'https://reka-ui.com/docs/components/label' },
                ],
            },
            storybook,
        );
    if (name.startsWith('Field'))
        return componentDependenciesMarkdown(
            {
                components: [
                    ui('Label', 'label', 'form-label'),
                    ui('Separator', 'separator', 'components-separator'),
                ],
                packages: [
                    '@tabler/icons-vue',
                    '@vueuse/core',
                    'class-variance-authority',
                    'reka-ui',
                    ...common,
                ],
            },
            storybook,
        );
    if (name.startsWith('InputGroup'))
        return componentDependenciesMarkdown(
            {
                components: [
                    ui('Button', 'button', 'components-button'),
                    ui('Input', 'input', 'formfields-input'),
                    ui('Textarea', 'textarea', 'formfields-textarea'),
                ],
                packages: ['class-variance-authority', 'reka-ui', ...common],
            },
            storybook,
        );
    if (name === 'Form')
        return componentDependenciesMarkdown(
            {
                components: [
                    ui('Button', 'button', 'components-button'),
                    ui('Description', 'description', 'overlay-description'),
                    ui('FieldError', 'field-error', 'form-field'),
                    ui('FormLocaleSwitcher', 'form-locale-switcher', 'form-form'),
                    ui('FormLayout', 'form-layout', 'layout-formpage'),
                    ui('FormSectionRenderer', 'form-section-renderer', 'form-generator'),
                    ui('FormText', 'form-text', 'form-form'),
                ],
                packages: [
                    '@tabler/icons-vue',
                    '@vueuse/core',
                    'class-variance-authority',
                    'reka-ui',
                    ...common,
                ],
            },
            storybook,
        );
    if (name === 'FormSectionRenderer')
        return componentDependenciesMarkdown(
            {
                components: ['FormFieldRenderer', 'FormHeader', 'FormSpacer', 'FormText'].map(
                    (part) =>
                        ui(
                            part,
                            part.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase(),
                            'form-generator',
                        ),
                ),
                packages: ['vue'],
            },
            storybook,
        );
    if (name === 'FormLocaleSwitcher')
        return componentDependenciesMarkdown(
            {
                components: [
                    ui('Select', 'select', 'formfields-select'),
                    ui('FormText', 'form-text', 'form-form'),
                ],
                packages: ['@tabler/icons-vue', ...common],
            },
            storybook,
        );
    if (name === 'FormRepeater')
        return componentDependenciesMarkdown(
            {
                components: [
                    ui('Accordion', 'accordion', 'components-accordion'),
                    ui('Button', 'button', 'components-button'),
                ],
                packages: ['@tabler/icons-vue', 'vue'],
            },
            storybook,
        );
    if (name === 'FormRelationshipPicker')
        return componentDependenciesMarkdown(
            {
                components: [
                    ui('Checkbox', 'checkbox', 'formfields-checkbox'),
                    ui('Input', 'input', 'formfields-input'),
                ],
                packages: ['vue'],
            },
            storybook,
        );
    if (name === 'FormRelationSummary')
        return componentDependenciesMarkdown(
            {
                components: [ui('Button', 'button', 'components-button')],
                packages: ['vue'],
            },
            storybook,
        );
    if (['FormHeader', 'FormSpacer', 'FormText'].includes(name))
        return componentDependenciesMarkdown(
            {
                components: name === 'FormHeader' ? [ui('FormText', 'form-text', 'form-form')] : [],
                packages: ['vue'],
            },
            storybook,
        );
    if (name === 'FormDateTimeRangeField')
        return componentDependenciesMarkdown(
            {
                components: [
                    ui('Button', 'button', 'components-button'),
                    ui('Calendar', 'calendar', 'utilities-calendar'),
                    ui('Field', 'field', 'form-field'),
                    ui('InputDateTime', 'input-date-time', 'formfields-inputdatetime'),
                    ui('Popover', 'popover', 'overlay-popover'),
                ],
                packages: ['@internationalized/date', '@tabler/icons-vue', 'dayjs', 'vue'],
            },
            storybook,
        );
    return componentDependenciesMarkdown(
        {
            components: [
                ui('Checkbox', 'checkbox', 'formfields-checkbox'),
                ui('ComboboxField', 'combobox-field', 'formfields-combobox'),
                ui('Editor', 'editor', 'formfields-editortinymce'),
                ui('EditorJson', 'editor-json', 'formfields-editorjson'),
                ui('EditorMarkdown', 'editor-markdown', 'formfields-editormarkdown'),
                ui('Field', 'field', 'form-field'),
                ui('Input', 'input', 'formfields-input'),
                ui('InputDateTime', 'input-date-time', 'formfields-inputdatetime'),
                ui('InputGroup', 'input-group', 'form-inputgroup'),
                ui('InputPassword', 'input-password', 'formfields-inputpassword'),
                ui('RadioGroup', 'radio-group', 'formfields-radiogroup'),
                ui('Select', 'select', 'formfields-select'),
                ui('Switch', 'switch', 'formfields-switch'),
                ui('Textarea', 'textarea', 'formfields-textarea'),
            ],
            packages: ['vue'],
        },
        storybook,
    );
}
type Copy = {
    props: Record<string, string>;
    events?: Record<string, string>;
    slots?: Record<string, string>;
    defaults?: Record<string, string>;
};
const classProp = { class: 'Additional CSS classes for this element.' };
const validation = {
    valid: 'Set the valid display state; an invalid state takes precedence.',
    invalid: 'Set the invalid display state.',
    ariaValid: 'An input alias for valid state; rendered as data-valid rather than aria-valid.',
    ariaInvalid: 'Set the ARIA invalid state, including grammar or spelling errors.',
    dataValid: 'A data-attribute alias for valid state.',
    dataInvalid: 'A data-attribute alias for invalid state.',
};
const labelProps = {
    ...classProp,
    ...validation,
    for: 'The id of the control labelled by this element.',
    as: 'The HTML element or Vue component to render.',
    asChild: 'Merge label behaviour and attributes into the child element.',
    required: 'Show the required-field marker; does not validate the control.',
    showValidation: 'Show a valid or invalid marker; inherits the Field setting when omitted.',
};
const localeProps = {
    locale: 'The active locale for localised field values.',
    localeFieldPath: 'Use nested translation paths or locale-suffixed field names.',
};
export const formComponentApiCopy: Record<string, Copy> = {
    Field: {
        props: {
            ...classProp,
            ...validation,
            showValidation: 'Enable validation markers on labels within this field.',
            orientation:
                'Arrange the field vertically, horizontally or according to its group’s available width.',
        },
        slots: { default: 'The label, control, hint and error content.' },
        defaults: { orientation: '"vertical"' },
    },
    FieldContent: {
        props: classProp,
        slots: { default: 'The field’s text and supporting content.' },
    },
    FieldDescription: {
        props: classProp,
        slots: { default: 'Hint text; link it to the control with aria-describedby.' },
    },
    FieldError: {
        props: {
            ...classProp,
            errors: 'Error strings or message objects to display; duplicate messages are removed.',
        },
        slots: { default: 'Custom error content that replaces the errors list.' },
    },
    FieldGroup: {
        props: classProp,
        slots: { default: 'Related Field elements or nested field groups.' },
    },
    FieldLabel: { props: labelProps, slots: { default: 'The visible field label.' } },
    FieldLegend: {
        props: { ...classProp, variant: 'Choose the legend or smaller label text size.' },
        slots: { default: 'The name of the related control group.' },
    },
    FieldSeparator: {
        props: classProp,
        slots: { default: 'Optional text centred within the divider.' },
    },
    FieldSet: { props: classProp, slots: { default: 'A FieldLegend and related controls.' } },
    FieldTitle: { props: classProp, slots: { default: 'The field content title.' } },
    Label: { props: labelProps, slots: { default: 'The visible control label.' } },
    InputGroup: {
        props: { ...classProp, size: 'Set the group height and the inherited input size.' },
        slots: { default: 'The input or textarea, add-ons and grouped actions.' },
    },
    InputGroupAddon: {
        props: {
            ...classProp,
            align: 'Place the add-on at inline-start, inline-end, block-start or block-end.',
        },
        slots: { default: 'The prefix, suffix or grouped action.' },
    },
    InputGroupButton: {
        props: {
            ...classProp,
            variant: 'Set the button colour or appearance.',
            size: 'Set the grouped button dimensions.',
        },
        slots: { default: 'The action label or icon.' },
    },
    InputGroupInput: {
        props: { ...classProp, size: 'Override the input group’s inherited size.' },
    },
    InputGroupText: { props: classProp, slots: { default: 'Supporting text or an icon.' } },
    InputGroupTextarea: { props: classProp },
    Form: {
        props: {
            title: 'The form heading.',
            description: 'Additional form information shown by the default header.',
            form: 'The TanStack-compatible form API used by the generated fields.',
            sections: 'The ordered form sections and their field definitions.',
            cancelHref: 'The destination for the default back and cancel links.',
            loading: 'Show submission progress and disable the primary action.',
            primaryVariant: 'Set the primary action colour or appearance.',
            additionalActions: 'Extra actions identified by id, with labels and optional icons.',
            formError: 'A general error message displayed above the active section.',
            initialSection: 'The initial section when activeSection is not controlled.',
            activeSection:
                'The selected section id; bind with v-model:activeSection to control navigation.',
            cancelLabel: 'Literal or translated text for the cancel action.',
            saveLabel: 'Literal or translated text for the primary action.',
            loadingLabel: 'Literal or translated text shown on the primary action while loading.',
            actionsLabel: 'The accessible label for the actions region.',
            sectionSelectorLabel: 'The accessible label for section navigation.',
            localization: 'Locales and the storage strategy for translated field values.',
        },
        events: {
            submit: 'Emitted when the form is submitted; connect it to the form controller.',
            action: 'Emitted when an additional action is selected, with its id.',
            'update:activeSection':
                'Emitted when section navigation changes, with the selected section id.',
        },
        slots: {
            header: 'Replace the header; exposes title, description and cancelHref.',
            actions: 'Replace the desktop actions.',
            'additional-actions':
                'Replace additional action content; exposes layout slot properties.',
            'actions-before': 'Additional action content before actions-after; exposes loading.',
            'actions-after': 'Additional action content after actions-before; exposes loading.',
            'mobile-actions': 'Replace the mobile additional-action content.',
            'floating-app-bar': 'Render a FloatingAppBar using the supplied docking properties.',
            'field-[slot]':
                'Render a custom field; the name comes from the definition’s slot property.',
            'section-[id]-before': 'Content before a section’s fields.',
            'section-[id]-actions': 'Actions beside a section heading.',
            'section-[id]-after': 'Content after a section’s fields.',
        },
    },
    FormFieldRenderer: {
        props: {
            form: 'The form API that supplies the Field binding.',
            definition: 'The typed field definition to render.',
            ...localeProps,
        },
        slots: { custom: 'Render a custom field using the supplied definition and field binding.' },
    },
    FormSectionRenderer: {
        props: {
            form: 'The form API passed to the section’s fields.',
            section: 'The section definition, including its heading and ordered fields.',
            ...localeProps,
        },
        slots: {
            actions: 'Actions beside the section heading; exposes section and locale.',
            before: 'Content before the field grid; exposes section and locale.',
            after: 'Content after the field grid; exposes section and locale.',
            custom: 'Custom field content forwarded from FormFieldRenderer.',
        },
    },
    FormDateTimeRangeField: {
        props: {
            start: 'The start date or local date-time string.',
            end: 'The end date or local date-time string, or null for an open range.',
            allDay: 'Use dates without time inputs.',
            locale: 'The locale for date display.',
            rangeLabel: 'The visible date-range label.',
            rangeHint: 'Supporting text for the date range.',
            startTimeLabel: 'The start-time input label.',
            endTimeLabel: 'The end-time input label.',
            endErrors: 'Validation messages for the range end.',
        },
        events: {
            'update:start': 'Emitted when the start changes, with its string value.',
            'update:end': 'Emitted when the end changes, with its string value or null.',
        },
    },
    FormHeader: {
        props: {
            definition: 'The heading definition, with title, optional description and grid span.',
        },
    },
    FormSpacer: {
        props: { definition: 'The spacer definition, including its responsive grid span.' },
    },
    FormText: { props: { text: 'A literal value or translation key with optional replacements.' } },
    FormLocaleSwitcher: {
        props: {
            ...classProp,
            modelValue: 'The selected locale code; bind with v-model to update it.',
            locales: 'The available locale codes and their labels.',
            baseLocale: 'The base locale used by the form.',
        },
        events: { 'update:modelValue': 'Emitted when the selected locale changes, with its code.' },
    },
    FormRelationSummary: {
        props: {
            items: 'The related items to summarise, including any link destinations.',
            emptyLabel: 'Literal or translated text shown when there are no related items.',
        },
        slots: { item: 'Custom content for one related item.' },
    },
    FormRelationshipPicker: {
        props: {
            modelValue: 'The selected option values; bind with v-model to update them.',
            options: 'The related items available for selection.',
            disabled: 'Prevent changes to the selection.',
            size: 'Set the selection control size.',
        },
        events: {
            'update:modelValue': 'Emitted when selection changes, with the selected values.',
        },
    },
    FormRepeater: {
        props: {
            items: 'The ordered items rendered by the repeater.',
            addLabel: 'Literal or translated text for the add action.',
            removeLabel: 'Literal or translated text for the remove action.',
            emptyLabel: 'Literal or translated text shown when there are no items.',
            itemLabel: 'Return a literal or translated heading for an item index.',
            itemKey: 'Return a stable key for an item; defaults to its index.',
            canAdd: 'Allow the add action.',
            disabled: 'Disable add and remove actions.',
            accordion: 'Render items as collapsible accordion sections.',
            hideAdd: 'Hide the add action.',
        },
        events: {
            add: 'Request a new item; update the source array in the application.',
            remove: 'Request removal of an item, with its zero-based index.',
        },
        slots: {
            header: 'Content before the repeated items.',
            title: 'Custom heading content for an item.',
            'item-actions': 'Additional actions for an item.',
            item: 'The fields or content for each repeated item.',
        },
    },
};
export const formComponentNotes: Record<string, { title: string; text: string }[]> = {
    field: [
        {
            title: 'Composition and state',
            text: 'Compose FieldLabel, a control, FieldDescription and FieldError within Field. Bind values, disabled state and control-level ARIA attributes to the control itself. Field shares validation display state with labels; it does not run validation or disable arbitrary descendants. Invalid state takes precedence over valid state. Link hints and errors with `aria-describedby`.',
        },
    ],
    label: [
        {
            title: 'Association and validation markers',
            text: 'Match `for` to the control’s `id`. The required marker and validation icons describe state without adding validation rules or changing the control’s required attribute. Explicit validation props override Field context. The `ariaValid` alias becomes `data-valid`; no non-standard `aria-valid` attribute is rendered.',
        },
    ],
    'input-group': [
        {
            title: 'Controls, models and add-ons',
            text: 'Place InputGroupInput or InputGroupTextarea inside InputGroup and add InputGroupAddon, InputGroupText or InputGroupButton as needed. Bind `v-model`, native attributes and input events to the inner control; these wrappers forward them to Input or Textarea rather than declaring their own model. The group supplies shared presentation and size, while labels, validation and submission remain separate.',
        },
    ],
    form: [
        {
            title: 'Component responsibilities',
            text: 'Form renders the outer form through FormLayout. Do not nest it in another native form. Connect `submit` to your controller and pass its `loading` and `formError` state. FormSectionRenderer renders one generated section; FormFieldRenderer binds an individual field. There is no separate FormGenerator Vue export. Custom field and section slots extend the generated content.',
        },
    ],
};
