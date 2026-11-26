import { componentDependenciesMarkdown } from './component-dependencies.ts';

export const extensionModules: Record<string, string> = {
    apexcharts: 'ApexChart',
    'calendar-booking': 'CalendarBooking',
    'data-table': 'DataTable',
    'filter-bar': 'FilterBar',
    schedule: 'Schedule',
};
export const extensionSummaries: Record<string, string> = {
    ApexChart:
        'A themed chart renderer built on ApexCharts and its Vue adapter. Loads after mount and follows Miru colours while keeping series and chart options under application control.',
    CalendarBooking:
        'A date or date-range picker with optional time slots, capacity feedback and warning confirmation. The application supplies availability and handles the final booking.',
    DataTable:
        'A data table built on TanStack Vue Table for paginated results, search, filters and row actions. The application supplies typed columns, list data and the transport for each request.',
    FilterBar:
        'A responsive row of active filter badges with individual selection and removal actions. Moves overflow into a popover while the application owns the filter values.',
    FilterBadge: 'A filter label with an optional count, selection state and remove action.',
    Schedule:
        'A calendar for appointments and date ranges, with compact and full presentations. Supports configurable views, event details and local or application-controlled filtering.',
    ScheduleEventDetails:
        'A reusable event summary with localised dates and optional labelled details.',
    DataTableActionsCell:
        'Row actions with primary controls, overflow handling and confirmation support.',
    DataTableAddressCell: 'A structured, copyable address within a data table cell.',
    DataTableBadgeCell: 'A labelled status badge resolved from column metadata.',
    DataTableBooleanToggle:
        'An accessible boolean display that reports toggle requests to the application.',
    DataTableBulkActions: 'A selector for actions available to the current row selection.',
    DataTableCellRenderer:
        'Resolve a cell through its column renderer, component metadata or plain value.',
    DataTableCountCell: 'A circular numeric count with a subdued zero state.',
    DataTableDateTimeCell: 'A localised date or time value configured through column metadata.',
    DataTableDateTimeValue: 'A localised date or time value for a custom cell or layout.',
    DataTableExpandCell: 'An accessible control for expanding a data row.',
    DataTableFilterSheet: 'A responsive editor for the list’s declared filter definitions.',
    DataTableMoneyCell: 'A localised currency value using the row’s configured currency field.',
    DataTableMultiCountsCell: 'Several labelled counts resolved from one row and column metadata.',
    DataTableMultiCountsHeader: 'Matching labels or icons for a group of count values.',
    DataTableMultiCountsValue: 'Several labelled counts within a custom cell or layout.',
    DataTablePageStepper:
        'Previous and next page controls with an optional complete navigation group.',
    DataTableStatusCell: 'A status indicator with definitions supplied through column metadata.',
    DataTableSortOrderCell: 'Position feedback and guarded move-up or move-down actions.',
    DataTableStatusIndicator: 'A status icon or dot with a labelled tooltip.',
    DataTablePagination: 'Page navigation and page-size selection for a paginated list.',
};
const uiPaths: Record<string, string> = {
    Alert: 'alert',
    AlertDescription: 'alert/reference#alert-description',
    Badge: 'badge',
    Button: 'button',
    ButtonAction: 'button-action',
    ButtonGroup: 'button-group',
    Calendar: 'calendar',
    Checkbox: 'checkbox',
    Dialog: 'dialog',
    Drawer: 'drawer',
    DropdownMenu: 'dropdown-menu',
    FilterBar: 'filter-bar',
    Input: 'input',
    InputSearch: 'input-search',
    Label: 'label',
    Overlay: 'overlay',
    OverlayChoice: 'overlay-choice',
    Popover: 'popover',
    ScrollArea: 'scroll-area',
    Select: 'select',
    Separator: 'separator',
    Sheet: 'sheet',
    Switch: 'switch',
    Table: 'table',
    ToggleGroup: 'toggle-group',
    Tooltip: 'tooltip',
};
const dependencies: Record<string, { ui?: string[]; packages: string[] }> = {
    ApexChart: { packages: ['apexcharts', 'vue', 'vue3-apexcharts'] },
    CalendarBooking: {
        ui: ['Button', 'Calendar', 'OverlayChoice'],
        packages: ['@internationalized/date', 'vue'],
    },
    DataTable: {
        ui: [
            'Alert',
            'AlertDescription',
            'Badge',
            'Button',
            'ButtonAction',
            'ButtonGroup',
            'Checkbox',
            'Dialog',
            'Drawer',
            'DropdownMenu',
            'FilterBar',
            'Input',
            'Label',
            'OverlayChoice',
            'Popover',
            'ScrollArea',
            'Select',
            'Separator',
            'Sheet',
            'Switch',
            'Table',
            'Tooltip',
        ],
        packages: [
            '@tabler/icons-vue',
            '@tanstack/vue-table',
            '@vueuse/core',
            'vue',
        ],
    },
    FilterBar: {
        ui: ['Badge', 'Button', 'Popover'],
        packages: ['@tabler/icons-vue', '@vueuse/core', 'clsx', 'tailwind-merge', 'vue'],
    },
    Schedule: {
        ui: [
            'Badge',
            'Button',
            'ButtonGroup',
            'Drawer',
            'InputSearch',
            'Overlay',
            'Popover',
            'ScrollArea',
            'Select',
            'ToggleGroup',
            'Tooltip',
        ],
        packages: ['@internationalized/date', '@tabler/icons-vue', '@vueuse/core', 'vue'],
    },
};
export function extensionDependencyMarkdown(root: string, storybook = false): string {
    const config = dependencies[root];
    return componentDependenciesMarkdown(
        {
            packages: config.packages,
            components: (config.ui ?? []).map((name) => ({
                name,
                url: '/components/' + uiPaths[name],
                storybook:
                    '/docs/' +
                    (['Calendar'].includes(name)
                        ? 'utilities-'
                        : [
                                'Checkbox',
                                'Input',
                                'InputSearch',
                                'Select',
                                'Switch',
                                'ToggleGroup',
                            ].includes(name)
                          ? 'formfields-'
                          : name === 'Label'
                            ? 'form-'
                            : [
                                    'Dialog',
                                    'Drawer',
                                    'Overlay',
                                    'OverlayChoice',
                                    'Popover',
                                    'Sheet',
                                    'Tooltip',
                                ].includes(name)
                              ? 'overlay-'
                              : name === 'FilterBar'
                                ? 'extensions-'
                                : ['DropdownMenu', 'ScrollArea'].includes(name)
                                  ? 'utilities-'
                                  : 'components-') +
                    (name === 'AlertDescription' ? 'alert' : name.toLowerCase()) +
                    '--docs',
            })),
        },
        storybook,
    );
}
type Copy = Partial<Record<'props' | 'events' | 'slots' | 'exposed', Record<string, string>>>;
const cell = {
    value: 'The raw value to display.',
    item: 'The original row record.',
    column: 'The column instance and its display metadata.',
    align: 'The horizontal alignment.',
    counts: 'Ordered count definitions with field keys, labels and optional icons.',
    disabled: 'Prevent interaction with this control.',
    label: 'The accessible label for this control.',
    active: 'The current boolean display state.',
    activeClass: 'Additional classes when the boolean state is active.',
    statuses: 'Status definitions with labels, icons and colour classes.',
    translationPrefix: 'The translation prefix used when a status has no explicit label.',
    display: 'Show the date, time or both.',
};
const cellCopy: Copy = { props: cell };
export const extensionApiCopy: Record<string, Copy> = {
    ApexChart: {
        props: {
            type: 'The ApexCharts chart type.',
            series: 'Axis series objects or numeric values for non-axis charts such as donuts.',
            options: 'ApexCharts options merged over the Miru theme defaults.',
            width: 'The chart width as a number or CSS-compatible string.',
            height: 'The chart height as a number or CSS-compatible string.',
        },
    },
    CalendarBooking: {
        props: {
            slots: 'Available time-slot definitions for the selected date.',
            rules: 'Calendar restrictions, holiday data and date availability.',
            maxValue: 'The latest selectable calendar date.',
            range: 'Select a date range instead of a single date; time-slot controls are hidden.',
            numberOfMonths: 'The number of visible calendar months.',
            hideOutsideDays: 'Hide dates outside the displayed month.',
            futureYears: 'The future-year navigation span.',
            disabled: 'Prevent date and slot selection.',
            loading: 'Show loading feedback and block selection.',
            error: 'An application-provided availability or booking error.',
            locale: 'The calendar and label locale.',
            showSlots: 'Display the time-slot section after a single date is selected.',
            showCapacity: 'Display remaining and total capacity for each slot.',
            confirmWarnings: 'Ask for confirmation before accepting a slot with a warning.',
            slotsLabel: 'Override the translated time-slot heading.',
            date: 'The selected ISO calendar date, or null; bind with v-model:date.',
            slot: 'The selected slot value, or null; bind with v-model:slot.',
            rangeValue: 'The selected DateRange in range mode; bind with v-model:rangeValue.',
        },
        events: {
            'update:date': 'Emitted when the selected ISO date changes.',
            'update:slot': 'Emitted when the selected slot changes.',
            'update:rangeValue': 'Emitted when the selected range changes.',
            'visible-month-change':
                'Emitted with the visible placeholder date so the application can load availability.',
        },
        slots: {
            'after-calendar': 'Additional content after the calendar; receives the selected date.',
            slot: 'Custom content for a time-slot button; receives its selected state.',
        },
    },
    DataTable: {
        props: {
            tableKey: 'A unique, stable key for persisted column preferences.',
            list: 'The current page, query state, filter values and list configuration.',
            dataFormat: 'Override the app-wide dataTable adapter with Miru, Lucid or Laravel conventions.',
            rowKey: 'A record field or function returning a unique row key; defaults to id, then row index.',
            rowDisabled: 'Mark individual rows unavailable for interaction.',
            rowLoading: 'Mark individual rows busy while their application action runs.',
            loading: 'Show loading feedback and block table interactions.',
            loadingText: 'Override the translated loading message.',
            emptyText: 'Override the translated empty-state message.',
            searchable: 'Show search when the list also declares searchable fields.',
            columns: 'Typed TanStack column definitions with Miru display metadata.',
            actions: 'Row actions, including visibility, permission predicates and confirmation.',
            rowAction:
                'Action key or priority-ordered keys used for row activation; confirmation actions are excluded.',
            rowSelectable: 'Decide which records may be selected.',
            rowExpandable: 'Decide which records may expand.',
            disabled: 'Block query, selection and row interactions.',
            hasLeadingRows:
                'Suppress the default empty message when leading rows supply the empty state.',
            showToolbar:
                'Display search, filters, column preferences and additional toolbar controls.',
            showColumnToggle: 'Display column visibility and ordering controls.',
            paginationPosition: 'Place pagination above, below, in both positions or nowhere.',
            variant: 'Use the default or compact table presentation.',
            embedded: 'Let the surrounding surface own borders and scrolling.',
            toolbarOffset: 'The CSS offset for the sticky toolbar.',
            additionalQuery: 'Additional parameters merged into navigation requests.',
            querySerializer:
                'Map canonical state and filters to parameters for the configured navigation adapter.',
            queryProps:
                'Inertia partial-reload prop names; defaults to list for Miru payloads and a full response for Lucid.',
            bulkActionHandler:
                'Replace bulk submission through the navigation adapter; receives the action and current-page selection values.',
            queryHandler:
                'Handle query requests in the application; replaces built-in serialization and navigation.',
            selected:
                'Selected string row keys; bind with v-model:selected for controlled selection.',
        },
        events: {
            'update:selected': 'Emitted when selected row keys change.',
            'bulk-action-error':
                'Emitted when a bulk action handler fails, with the original error.',
        },
        slots: {
            'toolbar-actions': 'Additional controls in the shared toolbar.',
            content: 'Replace the row layout; receives rows, table and toggleSort.',
            'leading-rows': 'Table rows before the data, such as a summary.',
            loading: 'Custom loading content; receives the table instance.',
            'before-row': 'Rows before a record; receives item, row and colspan.',
            'expanded-row': 'Expanded content for a record; receives item and row.',
            'after-row': 'Rows after a record; receives item, row and colspan.',
            empty: 'Custom empty-state content; receives the table instance.',
            'cell-[columnId]': 'Custom cell content; receives item, cell, disabled and loading.',
        },
    },
    DataTableActionsCell: {
        props: {
            ...cell,
            actions: 'Available row actions with labels, callbacks and optional confirmation.',
        },
    },
    DataTableAddressCell: cellCopy,
    DataTableBadgeCell: cellCopy,
    DataTableCountCell: cellCopy,
    DataTableDateTimeCell: cellCopy,
    DataTableDateTimeValue: cellCopy,
    DataTableMoneyCell: cellCopy,
    DataTableMultiCountsCell: cellCopy,
    DataTableMultiCountsHeader: cellCopy,
    DataTableMultiCountsValue: cellCopy,
    DataTableStatusCell: cellCopy,
    DataTableStatusIndicator: cellCopy,
    DataTableBooleanToggle: {
        props: cell,
        events: { toggle: 'Emitted when activated; update the boolean value in the application.' },
        slots: { default: 'Custom content for the boolean control.' },
    },
    DataTableBulkActions: {
        props: {
            ...cell,
            actions: 'Bulk action definitions from the list configuration.',
            selectedCount: 'The number of selected rows used to enable available actions.',
        },
        events: { apply: 'Emitted with the selected bulk action.' },
    },
    DataTableCellRenderer: {
        props: {
            cell: 'The TanStack cell instance to render.',
            actions: 'Row action definitions available to custom cell components.',
        },
    },
    DataTableExpandCell: {
        props: {
            ...cell,
            row: 'The expandable row instance.',
            icon: 'An optional replacement expansion icon.',
        },
    },
    DataTableFilterSheet: {
        props: {
            ...cell,
            list: 'The current list and declared filter definitions.',
            activeCount: 'The number of applied filters.',
            compact: 'Use the compact filter trigger presentation.',
        },
        events: {
            apply: 'Emitted with validated draft filter values.',
            clear: 'Emitted when the application should clear filters.',
        },
    },
    DataTablePageStepper: {
        props: {
            ...cell,
            pagination: 'Current page and total-page metadata.',
            full: 'Show first and last controls alongside previous and next.',
        },
        events: { page: 'Emitted with the requested page number.' },
    },
    DataTableSortOrderCell: {
        props: {
            ...cell,
            moveUrl: 'The PATCH endpoint for moving this record.',
            moveHandler:
                'Application move callback receiving up or down; takes precedence over moveUrl.',
        },
    },
    DataTablePagination: {
        props: {
            ...cell,
            pagination: 'Current-page metadata and result totals.',
            pageSizes: 'Page sizes offered by the size selector.',
        },
        events: {
            page: 'Emitted with the requested page number.',
            'per-page': 'Emitted with the requested page size.',
        },
    },
    FilterBar: {
        props: {
            items: 'Ordered active filter badges with stable keys.',
            size: 'The shared badge size.',
            disabled: 'Disable badge selection and removal.',
            class: 'Additional CSS classes for the filter bar.',
        },
        events: {
            select: 'Emitted with the key of an activated non-removable badge.',
            remove: 'Emitted with the key of a filter requested for removal.',
        },
    },
    FilterBadge: {
        props: {
            label: 'The filter label displayed in the badge.',
            count: 'An optional count displayed beside the label.',
            size: 'The badge size.',
            selected: 'Apply the selected appearance to a selectable badge.',
            removable: 'Show a remove action; otherwise the badge acts as a selection button.',
            disabled: 'Disable selection and removal.',
            removeLabel: 'Override the translated accessible remove-button label.',
            class: 'Additional CSS classes for the badge.',
        },
        events: {
            select: 'Emitted when the non-removable badge is activated.',
            remove: 'Emitted when its remove button is activated.',
        },
    },
    Schedule: {
        props: {
            events: 'Appointment and interval records to display; event ends are exclusive.',
            presentation: 'Use a compact calendar or full organiser.',
            eventDisplay: 'Render dot markers or event bars.',
            rangePresentation: 'Use cards or marketing-style strips for date intervals.',
            filters: 'Filter facets with application-provided labels and options.',
            filterMode:
                'Filter supplied events locally, or delegate filtered results to the application.',
            createVisibility:
                'Show create actions continuously or on nearby hover; defaults follow the presentation.',
            highlightSundays: 'Apply Sunday highlighting.',
            highlightHolidays: 'Apply holiday highlighting.',
            minDayHeight:
                'Minimum day height in pixels; defaults to 80 in compact and 128 in full mode.',
            views: 'Available views in switch order; the active view is controlled separately.',
            timeZone: 'The timezone used to place timed events on calendar days.',
            weekStartsOn: 'The first weekday, using Sunday = 0 and Monday = 1.',
            locale: 'The display locale for dates and labels.',
            ariaLabel: 'The accessible name of the calendar.',
            dayDetails: 'Enable the built-in day detail popover or mobile drawer.',
            eventDetails: 'Enable built-in event detail presentation.',
            detailPresentation: 'The fallback event details treatment: list, cards or description.',
            eventSort: 'An optional comparator for event ordering.',
            readonly: 'Disable mutations while retaining event and day details.',
            canCreate: 'A permission flag or predicate for creating on a date.',
            canEdit: 'A permission flag or predicate for editing an event.',
            searchable: 'Show the search control.',
            searchMode: 'Filter search locally or let the application supply remote results.',
            loading: 'Show loading feedback for the visible range.',
            error: 'An application-provided range-loading error message.',
            holidays: 'Holiday labels keyed by ISO calendar date.',
            maxVisibleEvents: 'Maximum visible event lanes before expanding the week.',
            markerLimit: 'Maximum dot markers before overflow feedback.',
            today: 'Override the ISO date treated as today.',
            date: 'The active navigation date; bind with v-model:date.',
            view: 'The active view; bind with v-model:view.',
            selectedDate: 'The selected date for day details, or null.',
            search: 'The search text; bind with v-model:search.',
            filterValues: 'Selected facet values; bind with v-model:filterValues.',
            filtersOpen: 'Whether the animated search and filter area is expanded.',
        },
        events: {
            'update:date': 'Emitted when the navigation date changes.',
            'update:view': 'Emitted when the active view changes.',
            'update:selectedDate': 'Emitted when day selection changes.',
            'update:search': 'Emitted when search text changes.',
            'update:filterValues': 'Emitted when facet values change.',
            'update:filtersOpen': 'Emitted when the filter area opens or closes.',
            create: 'Emitted when creation is requested for a date.',
            edit: 'Emitted when editing is requested for an event.',
            'select-event': 'Emitted with the selected event.',
            'select-date': 'Emitted with the selected calendar date.',
            'range-change': 'Emitted with the visible interval to load, including padded dates.',
        },
        slots: {
            'title-actions': 'Additional actions beside the calendar title.',
            actions: 'Additional organiser actions.',
            filters: 'Custom filter controls.',
            error: 'Custom range-loading failure feedback.',
            event: 'Custom event content with event and segment state.',
            'event-details': 'Replace event details for the selected event.',
            'event-actions': 'Additional actions within event details.',
            'day-summary': 'Summary content for a day.',
            'day-content': 'Custom content inside a day cell.',
            'day-details': 'A selected-day sidebar receiving date and events.',
        },
    },
    ScheduleEventDetails: {
        props: {
            event: 'The event whose summary and details are displayed.',
            presentation: 'Display details as a list, cards or a description.',
            timeZone: 'The timezone used to format event times.',
            locale: 'The date and label locale.',
        },
        slots: { default: 'Additional event detail content.' },
    },
};

export function describeExtensionControls(root: string, argTypes: Record<string, any>) {
    for (const [name, control] of Object.entries(argTypes)) {
        const description = extensionApiCopy[root].props?.[name];
        if (description) argTypes[name] = { ...control, description };
    }
}
