/** Reviewed catalogue copy for the smaller public building blocks. */
export const primitiveSummaries: Record<string, string> = {
    AccordionContent:
        'The collapsible content of an accordion section, shown when its associated item is expanded.',
    AccordionHeader:
        'The heading container for an accordion section, grouping its trigger and optional header content.',
    AccordionItem:
        'One accordion section, pairing an expandable panel with a unique value and its own header.',
    AccordionTrigger:
        'The interactive heading control that expands or collapses its associated accordion section.',
    AlertDescription:
        'Supporting text within an alert, explaining the notice or the action someone should take next.',
    AlertTitle:
        'A concise heading within an alert, introducing its message before the supporting description.',
    AvatarFallback:
        'Alternative avatar content, such as initials or an icon, displayed while an image is unavailable.',
    AvatarImage:
        'The image inside an avatar, with loading feedback and a fallback when the image cannot be displayed.',
    BadgePart:
        'One segment of a composed badge, inheriting its shared size, colour and interactive appearance.',
    BadgeSeparator:
        'A decorative divider between badge segments, keeping related labels and actions visually distinct.',
    BreadcrumbEllipsis:
        'An ellipsis marking omitted breadcrumb levels when the full navigation trail is too long to show.',
    BreadcrumbItem:
        'One step in a breadcrumb trail, containing a destination link, current page or collapsed menu.',
    BreadcrumbLink:
        'A navigable destination within a breadcrumb trail, with support for application router links.',
    BreadcrumbList:
        'The ordered collection of breadcrumb steps, arranging the current page’s navigation hierarchy.',
    BreadcrumbMenu:
        'A menu for intermediate breadcrumb destinations that have been collapsed out of the visible trail.',
    BreadcrumbPage:
        'The current page in a breadcrumb trail, presented as the active destination rather than a link.',
    BreadcrumbSeparator:
        'A decorative divider between breadcrumb steps, making the navigation hierarchy easier to follow.',
    CardAction:
        'An action region within a card header, placing controls alongside its title and supporting description.',
    CardContent:
        'The main body of a card, providing consistent spacing for text, forms or other composed content.',
    CardDescription:
        'Supporting text beneath a card’s title, giving a brief introduction to the content or task inside.',
    CardFooter:
        'The closing region of a card, grouping related actions, summaries or supporting information.',
    CardHeader:
        'The introductory region of a card, grouping its heading, supporting description and optional actions.',
    CardTitle:
        'The heading of a card, identifying its content and inheriting the surrounding card’s typography.',
    ItemActions:
        'A dedicated region for an item’s controls, keeping secondary actions separate from its main content.',
    ItemContent:
        'The main text region of an item, arranging its title, description and other supporting content.',
    ItemDescription:
        'Supporting text within an item, adding context beneath its title without competing with the main label.',
    ItemFooter:
        'The closing region of an item, providing space for supplementary content or a separate action row.',
    ItemGroup:
        'A container for related items, arranging a consistent collection of content, media and actions.',
    ItemHeader:
        'The introductory region of an item, grouping a heading or supporting content above the main body.',
    ItemMedia:
        'A media region within an item, presenting an icon, image or other visual beside the main content.',
    ItemSeparator:
        'A decorative divider between related items, keeping neighbouring entries visually distinct.',
    ItemTitle:
        'The main label or heading of an item, identifying the entry alongside its media and supporting text.',
    KbdGroup:
        'A group of keyboard key labels, presenting shortcuts and key combinations with consistent spacing.',
    MarkerContent:
        'The main label within a marker, keeping its text aligned with an optional icon and supporting metadata.',
    MarkerIcon:
        'The icon region of a marker, providing a visual cue alongside its main label and optional metadata.',
    MarkerMeta:
        'Supplementary information within a marker, displaying a secondary value beside its main content.',
    PaginationContent:
        'The container for pagination controls, arranging page numbers, navigation buttons and omitted ranges.',
    PaginationEllipsis:
        'An indicator for omitted page numbers, keeping long pagination ranges compact and easy to scan.',
    PaginationFirst:
        'A pagination control that moves to the first page and reflects whether that destination is available.',
    PaginationItem:
        'A numbered pagination control, linking one page value to the collection’s current selection state.',
    PaginationLast:
        'A pagination control that moves to the final page and reflects whether that destination is available.',
    PaginationNext:
        'A pagination control that advances to the next page and reflects the collection’s navigation state.',
    PaginationPrevious:
        'A pagination control that returns to the previous page and reflects the current navigation state.',
    TableAddressValue:
        'A reusable address display, arranging address fields consistently within a table cell or other content.',
    TableBadgeValue:
        'A reusable badge display for table values, presenting a labelled value with its configured appearance.',
    TableBody:
        'The body of a static table, grouping its data rows separately from the header and optional footer.',
    TableBooleanToggle:
        'An interactive boolean control for a table value, allowing the application to handle value changes.',
    TableCaption:
        'A caption describing a static table, giving readers context for its rows and column headings.',
    TableCell:
        'A standard data cell in a static table, containing text, composed content or a specialised value display.',
    TableCellAddress:
        'A static table cell for structured addresses, using the shared address display and cell presentation.',
    TableCellBadge:
        'A static table cell for labelled badge values, combining the shared badge display with cell styling.',
    TableCellBoolean:
        'A static table cell for boolean values, presenting a consistent visual indication of true or false.',
    TableCellCount:
        'A static table cell for a count value, keeping numeric information consistently formatted and aligned.',
    TableCellDateTime:
        'A static table cell for dates and times, using the shared date display and its formatting options.',
    TableCellMoney:
        'A static table cell for monetary values, combining a formatted amount with its associated currency.',
    TableCellMultiCounts:
        'A static table cell for several related counts, keeping their values aligned within one column.',
    TableCellStatus:
        'A static table cell for status values, displaying the configured label and visual status treatment.',
    TableCountValue:
        'A reusable count display, formatting a numeric value consistently inside or outside a static table.',
    TableDateTimeValue:
        'A reusable date or time display, applying the configured locale and presentation to a table value.',
    TableFooter:
        'The closing row group of a static table, providing space for totals, summaries or supporting content.',
    TableHead:
        'A heading cell in a static table, labelling its corresponding column or row within the table structure.',
    TableHeader:
        'The header row group of a static table, arranging the column headings above its main data rows.',
    TableMoneyValue:
        'A reusable monetary display, formatting an amount and currency consistently across table content.',
    TableMultiCountsHeader:
        'A heading for several related count values, identifying the individual figures within one column.',
    TableMultiCountsValue:
        'A reusable display for several related counts, arranging their labels and numeric values together.',
    TableRow:
        'One row in a static table, grouping heading or data cells with consistent spacing and visual states.',
    TableStatusValue:
        'A reusable status display, translating a value into its configured label, icon and semantic colour.',
    FieldContent:
        'The content region of a field, grouping its control and supporting text within the field layout.',
    FieldDescription:
        'Supporting guidance for a field, explaining the expected value or adding context beneath its label.',
    FieldError:
        'Validation feedback for a field, presenting the errors associated with its control or form state.',
    FieldGroup:
        'A layout container for related fields, keeping their spacing and arrangement consistent within a form.',
    FieldLabel:
        'The label associated with a field’s control, supporting the shared required and validation presentation.',
    FieldLegend:
        'A heading for a fieldset, identifying the purpose of a related group of form controls to its readers.',
    FieldSeparator:
        'A visual divider between groups of fields, optionally introducing the next part of a form with text.',
    FieldSet:
        'A semantic fieldset for related controls, grouping their shared legend and supporting field content.',
    FieldTitle:
        'A title within a field layout, introducing its content without associating a label with one control.',
    FormDateTimeRangeField:
        'A composed form field for a date and time range, presenting its related values as one editing task.',
    FormFieldRenderer:
        'The renderer for one generated field, connecting its definition to the control and form controller.',
    FormHeader:
        'A form heading region, grouping introductory content and actions above the fields or generated sections.',
    FormLocaleSwitcher:
        'A locale selector for translated form values, allowing the user to choose which language to edit.',
    FormRelationshipPicker:
        'A relationship selection control for generated forms, allowing related records to be chosen.',
    FormRelationSummary:
        'A compact display of related records, showing the current relationship values and optional links.',
    FormRepeater:
        'A repeatable group of form fields, allowing the application to manage several similarly shaped entries.',
    FormSpacer:
        'A spacing element for generated form layouts, leaving deliberate room between neighbouring fields.',
    FormText:
        'Supporting text in a generated form, adding explanatory content between fields and section controls.',
    InputGroupAddon:
        'An attached region beside a grouped input, holding an icon, label or supplementary control.',
    InputGroupButton:
        'An action button within an input group, matching the surrounding control’s shared presentation.',
    InputGroupInput:
        'A text input for an input group, sharing its enclosing border, spacing and interaction treatment.',
    InputGroupText:
        'A supporting text element within an input group, presenting a prefix, suffix or other static value.',
    InputGroupTextarea:
        'A multiline input for an input group, sharing its surrounding addons and overall control surface.',
    StepperActions:
        'The action region of a stepper, arranging the controls used to move through or complete the workflow.',
    StepperContent:
        'The content associated with a step, displaying the fields or information needed for that stage.',
    StepperDescription:
        'Supporting text for a step, explaining its purpose or the information needed before continuing.',
    StepperIndicator:
        'The visual marker of a step, presenting its number, icon or current state within the step sequence.',
    StepperItem:
        'One stage in a stepper, connecting its value, indicator, heading and associated workflow content.',
    StepperLabel:
        'A label region for a step, grouping its title and supporting description beside the step indicator.',
    StepperList:
        'The navigation region of a stepper, arranging its ordered stages and the separators between them.',
    StepperSeparator:
        'A visual connector between steps, showing their relationship within the overall workflow sequence.',
    StepperTitle:
        'The main heading of a step, identifying the stage alongside its indicator and supporting description.',
    StepperTrigger:
        'The interactive control for selecting a step, following the stepper’s current navigation rules.',
    AutoCompleteAnchor:
        'The positioning anchor for autocomplete suggestions, aligning the popup with its input region.',
    AutoCompleteEmpty:
        'The empty state of an autocomplete list, explaining when no suggestions match the entered text.',
    AutoCompleteGroup:
        'A group of related autocomplete suggestions, keeping sections of the suggestion list together.',
    AutoCompleteInput:
        'The editable text control of an autocomplete, accepting a value and driving its suggestions.',
    AutoCompleteItem:
        'One autocomplete suggestion, allowing a proposed value to be selected from the matching results.',
    AutoCompleteList:
        'The popup list of autocomplete suggestions, containing matching items, groups and empty feedback.',
    AutoCompleteSeparator:
        'A decorative divider between autocomplete groups, making sections of suggestions easier to scan.',
    AutoCompleteViewport:
        'The viewport within an autocomplete popup, containing the visible region of its suggestion list.',
    Combobox:
        'The composed selection root for a combobox, coordinating its chosen value, search text and popup state.',
    ComboboxAnchor:
        'The positioning anchor of a combobox, keeping its popup aligned with the associated control.',
    ComboboxEmpty:
        'The empty state of a combobox list, explaining when no available options match the current search.',
    ComboboxGroup:
        'A group of related combobox options, organising the selection list into meaningful sections.',
    ComboboxInput:
        'The search input of a combobox, filtering its available options while retaining selection context.',
    ComboboxItem:
        'One selectable combobox option, connecting its value to the surrounding selection and search state.',
    ComboboxItemIndicator:
        'A selection marker inside a combobox option, indicating which value is currently selected.',
    ComboboxList:
        'The popup collection of combobox options, arranging selectable items, groups and empty feedback.',
    ComboboxSeparator:
        'A decorative divider between combobox groups, keeping related sets of options visually distinct.',
    ComboboxViewport:
        'The viewport of a combobox popup, containing the visible portion of its available selection items.',
    InputNumberContent:
        'The control region of a number input, grouping its editable value and increment or decrement buttons.',
    InputNumberDecrement:
        'A number-input control that decreases the current value using the configured step and limits.',
    InputNumberIncrement:
        'A number-input control that increases the current value using the configured step and limits.',
    InputNumberInput:
        'The editable value inside a number input, connecting typed numbers to the enclosing control state.',
    InputPinGroup:
        'A group of PIN input slots, keeping related characters together within the complete entry sequence.',
    InputPinSeparator:
        'A decorative divider within a PIN input, separating character groups without adding another value.',
    InputPinSlot:
        'One character position in a PIN input, displaying its value and participating in shared focus handling.',
    InputTagsInput:
        'The editable part of a tags input, accepting text that can be added to the existing collection.',
    InputTagsItem:
        'One tag within a tags input, grouping its text and removal control in the shared selection context.',
    InputTagsItemDelete:
        'The removal control of a tag, deleting its associated value from the surrounding tags input.',
    InputTagsItemText:
        'The visible label of a tag, presenting its value separately from the associated removal control.',
    RadioGroupItem:
        'One selectable radio option, sharing the group’s single-value selection and keyboard navigation.',
    SelectClear:
        'A control for clearing a select’s current value, returning the selection to its unselected state.',
    SelectContent:
        'The popup surface of a select, presenting its options, search control and supporting list structure.',
    SelectGroup:
        'A group of related select options, organising a longer collection into clearly labelled sections.',
    SelectItem:
        'One option in a select, connecting its value and label to the surrounding single-value selection.',
    SelectItemText:
        'The visible label of a select option, also supplying the text used to represent its selected value.',
    SelectLabel:
        'A heading for a group of select options, giving context to the choices that appear beneath it.',
    SelectScrollDownButton:
        'A scroll control for a select popup, revealing options below the currently visible list region.',
    SelectScrollUpButton:
        'A scroll control for a select popup, revealing options above the currently visible list region.',
    SelectSearch:
        'A search control within a select popup, helping users find an option in a longer collection.',
    SelectSeparator:
        'A decorative divider between select groups, making related sets of options easier to distinguish.',
    SelectTrigger:
        'The control that opens a select popup, displaying its current value and reflecting interaction state.',
    SelectValue:
        'The selected-value display of a select, presenting the chosen label or an unselected placeholder.',
    ToggleGroupItem:
        'One toggle in a group, sharing its selection mode, colour treatment and keyboard navigation.',
    CommandDialog:
        'A command palette inside a dialog, combining searchable actions with an accessible overlay surface.',
    DialogContent:
        'The main surface of a dialog, containing its heading, description, composed content and actions.',
    DialogDescription:
        'Supporting text for a dialog, explaining its purpose and providing an accessible description.',
    DialogFooter:
        'The closing region of a dialog, arranging confirmation, cancellation and other related actions.',
    DialogTitle:
        'The heading of a dialog, identifying its purpose and providing its accessible name to assistive tools.',
    DrawerContent:
        'The content surface of a drawer, holding its heading, supporting text and application-owned controls.',
    DrawerDescription:
        'Supporting text for a drawer, explaining its content and providing an accessible description.',
    DrawerFooter:
        'The closing region of a drawer, grouping its primary actions and other supporting controls.',
    DrawerHeader:
        'The introductory region of a drawer, arranging its title and supporting description together.',
    DrawerTitle:
        'The heading of a drawer, identifying the panel and providing its accessible name to assistive tools.',
    OverlayTrigger:
        'An interactive trigger for an overlay, connecting an application control to the shared opening state.',
    PopoverAnchor:
        'An alternative positioning anchor for a popover, placing its content independently of the trigger.',
    PopoverArrow:
        'A decorative pointer on a popover, showing the relationship between its content and anchor.',
    PopoverContent:
        'The floating surface of a popover, containing contextual information or application-owned controls.',
    PopoverTrigger:
        'The interactive control that opens or closes a popover and anchors its floating content by default.',
    SheetClose:
        'A control that closes its surrounding sheet, suitable for dismissal buttons within the panel content.',
    SheetContent:
        'The sliding panel of a sheet, containing its heading, supporting content and application actions.',
    SheetDescription:
        'Supporting text for a sheet, explaining the panel’s purpose and providing an accessible description.',
    SheetFooter:
        'The closing region of a sheet, grouping related actions beneath the panel’s main content.',
    SheetHeader:
        'The introductory region of a sheet, arranging the panel heading and its supporting description.',
    SheetTitle:
        'The heading of a sheet, identifying the panel and providing its accessible name to assistive tools.',
    SheetTrigger:
        'The interactive control that opens a sheet, connecting the launching action to its sliding panel.',
    Toaster:
        'An alternative export of Toast, mounting the same notification host and using the same configuration.',
    TooltipContent:
        'The floating text of a tooltip, presenting a short explanation associated with its trigger control.',
    TooltipProvider:
        'Shared tooltip settings for a component subtree, coordinating the timing of related tooltip triggers.',
    TooltipTrigger:
        'The control described by a tooltip, revealing its supporting text through pointer or keyboard focus.',
    CollapsibleContent:
        'The expandable content of a collapsible region, following its surrounding open or closed state.',
    CollapsibleTrigger:
        'The interactive control that expands or collapses its associated content region on activation.',
    ResizableHandle:
        'The divider between resizable panels, providing pointer and keyboard controls for changing their sizes.',
    ResizablePanel:
        'One adjustable region of a resizable group, holding content within its configured sizing constraints.',
    ScrollBar:
        'A scrollbar for a ScrollArea viewport, reflecting its scroll position and allowing direct navigation.',
    SortableImageGallery:
        'A compatibility wrapper around AttachmentList, presenting UploadImage records as a sortable gallery.',
    DataTableActionsCell:
        'A DataTable cell for row actions, presenting the application operations available for one record.',
    DataTableAddressCell:
        'A DataTable cell for address fields, arranging the record’s structured address consistently.',
    DataTableBadgeCell:
        'A DataTable cell for badge values, displaying a record value with its configured label and appearance.',
    DataTableBooleanToggle:
        'An interactive boolean control in a DataTable, reporting changes for the application to persist.',
    DataTableBulkActions:
        'The action region for selected DataTable records, presenting operations that apply to the selection.',
    DataTableCellRenderer:
        'The shared renderer for a DataTable cell, selecting its display from the column configuration.',
    DataTableCountCell:
        'A DataTable cell for numeric counts, applying the shared count display to a record’s value.',
    DataTableDateTimeCell:
        'A DataTable cell for a date or time value, following the column’s configured display options.',
    DataTableDateTimeValue:
        'A reusable date or time display for DataTable content, applying the selected format and locale.',
    DataTableExpandCell:
        'A DataTable control for expanded row content, allowing additional record details to be revealed.',
    DataTableFilterSheet:
        'A sheet containing DataTable filter controls, allowing the current query’s criteria to be edited.',
    DataTableMoneyCell:
        'A DataTable cell for monetary values, pairing the record’s amount with its associated currency.',
    DataTableMultiCountsCell:
        'A DataTable cell for several related counts, arranging their figures together within one column.',
    DataTableMultiCountsHeader:
        'A heading for a DataTable count collection, identifying the figures displayed within one column.',
    DataTableMultiCountsValue:
        'A reusable collection of count displays, presenting several related figures in DataTable content.',
    DataTablePageStepper:
        'A page-selection control for DataTable navigation, allowing the requested results page to be changed.',
    DataTablePagination:
        'The pagination region of a DataTable, presenting page navigation and the current results context.',
    DataTableSortOrderCell:
        'A DataTable cell for row ordering controls, reporting the application’s requested position changes.',
    DataTableStatusCell:
        'A DataTable cell for status values, applying the configured label, icon and semantic presentation.',
    DataTableStatusIndicator:
        'A compact status indicator for DataTable content, showing a record’s configured visual state.',
    FilterBadge:
        'A badge representing one active filter, presenting its current value and optional removal action.',
    ScheduleEventDetails:
        'A detail view for a schedule event, presenting its associated information in a consistent layout.',
    ContextMenuCheckboxItem:
        'A context-menu option with an independent checked state, allowing several choices to remain active.',
    ContextMenuContent:
        'The popup surface of a context menu, arranging actions and options beside the invoking location.',
    ContextMenuGroup:
        'A group of related context-menu entries, organising available actions into meaningful sections.',
    ContextMenuItem:
        'One actionable context-menu entry, displaying its label and participating in keyboard navigation.',
    ContextMenuLabel:
        'A non-interactive heading within a context menu, introducing the related actions or options below it.',
    ContextMenuPortal:
        'A mounting boundary for context-menu content, rendering the popup outside its local DOM container.',
    ContextMenuRadioGroup:
        'A group of mutually exclusive context-menu choices, sharing one selected value across its items.',
    ContextMenuRadioItem:
        'One radio option within a context menu, selecting a value from its mutually exclusive group.',
    ContextMenuSeparator:
        'A decorative divider within a context menu, separating related sets of actions and options.',
    ContextMenuShortcut:
        'A shortcut label beside a context-menu action, displaying its application-defined key combination.',
    ContextMenuSub:
        'The state container for a nested context menu, connecting its submenu trigger and popup content.',
    ContextMenuSubContent:
        'The popup of a nested context menu, displaying the actions opened by its associated submenu trigger.',
    ContextMenuSubTrigger:
        'A context-menu entry that opens a nested submenu, revealing its additional actions and options.',
    ContextMenuTrigger:
        'The region that opens a context menu, connecting its contextual interaction to the menu’s popup.',
    DropdownMenuArrow:
        'A decorative pointer on a dropdown menu, showing the relationship between its popup and trigger.',
    DropdownMenuCheckboxItem:
        'A dropdown-menu option with an independent checked state, allowing several choices to stay active.',
    DropdownMenuContent:
        'The floating surface of a dropdown menu, arranging its available actions, groups and selection items.',
    DropdownMenuGroup:
        'A group of related dropdown-menu entries, organising available actions into meaningful sections.',
    DropdownMenuItem:
        'One actionable dropdown-menu entry, displaying its label and participating in keyboard navigation.',
    DropdownMenuLabel:
        'A non-interactive heading within a dropdown menu, introducing the related entries displayed below it.',
    DropdownMenuRadioGroup:
        'A group of mutually exclusive dropdown-menu choices, sharing one selected value across its items.',
    DropdownMenuRadioItem:
        'One radio option within a dropdown menu, selecting a value from its mutually exclusive group.',
    DropdownMenuSeparator:
        'A decorative divider within a dropdown menu, separating related sets of actions and options.',
    DropdownMenuShortcut:
        'A shortcut label beside a dropdown-menu action, displaying its application-defined key combination.',
    DropdownMenuSub:
        'The state container for a nested dropdown menu, connecting its submenu trigger and popup content.',
    DropdownMenuSubContent:
        'The popup of a nested dropdown menu, displaying the additional actions opened by its submenu trigger.',
    DropdownMenuSubTrigger:
        'A dropdown-menu entry that opens a nested submenu, revealing its additional actions and options.',
    DropdownMenuTrigger:
        'The interactive control that opens a dropdown menu, connecting the launching action to its popup.',
};
