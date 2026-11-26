miru. / Chagnelog
=================

## Version 0.1.0 (Alpha)
- Info: Complete redesign and reimagining.

## Version 0.0.26 (Experimental)
- Add: `icon`, `icon-props`, `icon-loading` and `icon-loading-props` properties to `FormControl`.
- Add: `loading` state to components using `SharedControlProps`.
- Add: `field` and `icon` slots to `FormControl`.
- Update: Replace `duration-300` with `duration-200` across all components.

## Version 0.0.25 (Experimental)
- Fix: Temporary workaround for `TableStd` typing issues.
- Fix: Broken builds for partial components.

## Version 0.0.24 (Experimental)
- Info: Raise the supported Node.js version to v22.
- Add: `MiruOptions` plugin options handler with `root` as its first option.
- Add: `$miru` custom property to access Miru options.
- Add: Testing with `vitest` and `@vue/test-utils`.
- Add: `badge` variant to `AlertMessage`.
- Add: `AlertDialog`, similar to `ConfirmDialog`, with a basic story.
- Add: `DividerStd` with variants and a basic story.
- Add: `PagedPagination` with variants and a basic story.
- Add: `ProgressBar` with variants and a basic story.
- Add: `transition` property to `CollapseSupport` to customise the timing function.
- Add: `closable` and `escape` properties to `OffcanvasStd`.
- Add: `Queue` utility class.
- Add: `merge` utility for deep merging of multiple objects.
- Add: Laravel-inspired `slugify` utility.
- Add: `strspn` utility.
- Add: `versionCompare` utility for semantic version comparison.
- Update: Package dependencies.
- Update: Complete `PopoverStd`, including styles and examples.
- Update: Use the `info` colour for `AlertMessage` and fix dark mode styles.
- Update: Minor `DialogStd` styling adjustments.
- Update: Adjust sizing for `CheckboxField`, `RadioField` and `SwitchField`.
- Update: Remove `tabindex` from the `ActionButton` in `PasswordField`.
- Fix: `PopoverStd` component.

## Version 0.0.23 (Experimental)
- Update: Package dependencies.

## Version 0.0.22 (Experimental)
- Add: `label` slot to Checkbox for HTML content.

## Version 0.0.21 - Experimental
- Add: `validationMessage` function to `useForm`.

## Version 0.0.20 (Experimental)
- Fix: Missing `valibot` upgrade and a typing issue.

## Version 0.0.19 (Experimental)
- Update: Package dependencies.

## Version 0.0.18 (Experimental)
- Add: `tabindex` property to `FormControl` and control components.
- Update: Use `SharedControlProps` across control components.
- Update: Support `disabled`, `required` and `invalid` on `NumberField`.

## Version 0.0.17 (Experimental)
- Update: Package dependencies.
- Update: `PopoverStd` and `ContextMenu` components.
- Fix: Missing directive bundle entries.

## Version 0.0.16 (Experimental)
- Add: `track` property to `CollapseSupport`.
- Add: `column` property to `BalloonSelector`.
- Update: Use `SharedControlProps` on `SelectField` and update its Histoire story to use `FormControl`.
- Fix: Minor `CollapseSupport` styling issues.
- Fix: Minor `SelectField` styling issues.

## Version 0.0.15 (Experimental)
- Add: `FormControl` support component with a basic story.
- Update: Use `SharedControlProps` on `BalloonSelector` and update its Histoire story to use `FormControl`.
- Update: Always use the `AdvancedOption` type when iterating over `BalloonSelector` items.
- Update: Apply the `field-custom` class to `BalloonSelector` when a default item slot is provided.
- Fix: Minor `BalloonSelector` styling issues on mobile devices.
- Fix: Minor styling issues with `sm` and `lg` sizes of `CheckboxField`.

## Version 0.0.14 (Experimental)
- Update: Pass the `class` attribute to the main modal element in `DialogStd`.

## Version 0.0.13 (Experimental)
- Fix: `debounce` invoking its callback immediately.

## Version 0.0.12 (Experimental)
- Add: `CardXen` component with a basic story.
- Update: Expose visibility state and `open` / `close` functions on `ConfirmDialog`.
- Update: Increase `z-index` for `BackdropSupport` and related components.
- Update: Support disabled options in `SelectField`.
- Fix: Allow numeric values in `AdvancedOption` / `BalloonSelector`.
- Fix: `CardStd` prop inheritance in `CardCollapse`.
- Fix: Incorrect import paths in bundled `.vue` files.
- Fix: Omit `ConfirmDialog` properties when passing props to `DialogStd`.
- Fix: Missing event forwarding from `DialogStd` through `ConfirmDialog`.
- Fix: Return joined error messages instead of the static `'invalid'` string in `useForm`.

## Version 0.0.11 (Experimental)
- Add: `valibot` validation library to replace `zod`.
- Add: `ArrowLeft` / `ArrowRight` Lucide icon components.
- Add: `FormWizard` / `FormWizardPage` components.
- Add: `isCustomValid` callback helper to `useForm`.
- Add: Custom `requestHandler` callback support in `useForm`.
- Update: Support nullable values in `useForm`.
- Update: Include types in the distribution bundle.
- Fix: Typing issues in the `tooltip` directive.

## Version 0.0.10 (Experimental)
- Add: `default` slot to `AvatarStd` to replace `props.name` when `props.avatar` is absent.
- Add: `arrow` and `center` options to `TooltipStd`.
- Add: `v-tooltip` directive for tooltips without `TooltipStd`.
- Add: `content` slot to `CardStd` to replace its `<article>` structure.
- Add: `format` property to `TableColumn`, three formats and a basic story.
- Add: `metric` and `digits` modifiers to `v-filesize`.
- Add: `once` modifier to `v-click-outside`.
- Add: TabGroup / TabPane components with a basic story.
- Add: `bordered` property to `AlertStd`.
- Add: `body` slot to `DialogStd` to replace its inner `<article>` structure.
- Add: `escape` property to `DialogStd` to close the modal with Esc.
- Add: Wobble animation when clicking outside a static modal.
- Add: `CheckCircle` / `XCircle` Lucide icon components.
- Add: `TimeSlots` input component for booking time slots.
- Update: Adjust the `AvatarGroup` limit class and label when space is limited.
- Update: Package dependencies.
- Update: Reduce `BadgeStd` height by decreasing padding.
- Update: Adjust `TableStd` styles for use inside `CardStd` via the new content slot.
- Update: Adjust the font size and icons in `AlertMessage`.
- Update: Adjust the font size in `AlertStd`.
- Update: Apply the 32 / 40 / 56 px height system to `BallonSelector`.
- Update: Apply the 32 / 40 / 56 px height system to `InputField`.
- Update: Apply the 32 / 40 / 56 px height system to `NumberField`.
- Update: Apply the 32 / 40 / 56 px height system to `PasswordField`.
- Update: Apply the 32 / 40 / 56 px height system to `SelectField`.
- Update: Rename `TimeFrameField` to `TimeFrame`.
- Update: Add a `type` option to `now()` to control its return value.
- Fix: Add responsive `max-width` styles to `DialogStd` to leave space at screen edges.
- Fix: Demo icons in Histoire stories.
- Fix: Minor `TooltipStd` styling issues.
- Fix: TypeScript issues in the DTS plugin and Vite build.
- Fix: Broken animations when reusing a tooltip instance with `v-tooltip`.
- Fix: Styling issues with `lg` sizes of `NumberField` and `PasswordField`.

## Version 0.0.9 (Experimental)
- Add: `AlertMessage` / `AlertStd` components with a basic story.
- Add: `AvatarStd` / `AvatarGroup` components with a basic story.
- Add: `SimplePagination` / `AdvancedPagination` components with a basic story.
- Add: `CardStd` / `CardCollapse` components with a basic story.
- Add: `TableStd` / `TableColumn` components with a basic story.
- Add: `CheckSign` / `ChevronsLeft` / `ChevronsRight` / `DotCircle` / `InfoCircle` / `TriangleAlert` Lucide icon components.
- Add: `BackdropSupport` support component with a basic story.
- Add: `BreakpointSupport` support component with a basic story.
- Add: `CollapseSupport` support component with a basic story.
- Add: `DeferredSupport` support component with a basic story (not working due to Histoire's `<Suspense />` wrapper).
- Add: `FloatingSupport` support component with a basic story.
- Add: `now` utility for database-style "YYYY-MM-DD HH:ii:ss" timestamps.
- Add: Modal, dialog and offcanvas handling through `BackdropSupport`.
- Add: `v-click-outside` directive to handle clicks outside the target element.
- Add: TypeScript support for the `select` utility.
- Update: Rename the `ButtonGroup` property `size` to `gap`.
- Update: Accept components in the `ButtonStd` property `label` and add `labelProps`.
- Update: Add the `reverse` property and styles to `ButtonGroup`.
- Update: Add the `else` slot and story content to `BreakpointSupport`.
- Update: Handle the `duration` property and add story content to `CollapseSupport`.
- Update: Integrate `Base*` variants into `*Std` components.
- Update: Refactor the `request` utility to support individual HTTP methods.
- Fix: Include base styles in the distribution bundle (temporary workaround).
- Fix: Incorrect date/time formatting in `now`.
- Fix: Incorrect typing and return type in `query`.
- Fix: Incorrect typing and return type in `reader`.

## Version 0.0.8 (Experimental)
- Add: MiruStorage class and utility composable.
- Add: ServiceWorker utility composable.
- Fix: Remaining `@/` imports in source files.
- Remove: `@/` aliases from TypeScript and Vite configuration.

## Version 0.0.7 (Experimental)
- Fix: Minor Histoire issues.
- Fix: CSS bundling and distribution generation.
- Fix: Replace absolute imports with relative paths to resolve broken `@/` imports in consuming projects.
- Remove: Module-relative index.ts exports.

## Version 0.0.6 (Experimental)
- Info: Switch from Storybook to Histoire.
- Add: ESLint rules and fix existing issues.
- Fix: Minor issues.
- Remove: Storybook dependencies.

## Version 0.0.5 (Experimental)
- Add: `.vue` files to the distribution bundle.

## Version 0.0.4 (Experimental)
- Test: GitHub Actions workflow.

## Version 0.0.3 (Experimental)
- Test: GitHub Actions workflow.

## Version 0.0.2 (Experimental)
- Add: `waitUntil` support function.
- Update: Dependencies.

## Version 0.0.1 (Experimental)
- Initial release.
