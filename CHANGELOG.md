miru.ink / Changelog
====================

## Version 0.0.24 - Experimental
- Add: New `MiruOptions` plugin options handler + `root` as first option key.
- Add: New `$miru` called custom property to access new $miru options.
- Add: New `vitest` + `@vue/test-utils` testing framework.
- Add: New `badge` variant on `AlertMessage` component.
- Add: New `AlertDialog` component, similar to the `ConfirmDialog` one + basic story demonstration.
- Add: New `DividerStd` component with different variants + basic story demonstration.
- Add: New `PagedPagination` component with different variants + basic story demonstration.
- Add: New `ProgressBar` component with different variants + basic story demonstration.
- Add: New `transition` property on `CollapseSupport` component to change the desired timing function.
- Add: New `closable` and `escape` properties on `OffcanvasStd` component.
- Update: package.json dependencies.
- Update: Finish `PopoverStd` component, stylings and demonstration.
- Update: Use `info` color on `AlertMessage` component + Fix dark stylings.
- Update: Minor styling changes on `DialogStd` component.
- Update: Change size on `CheckboxField`, `RadioField` and `SwitchField` components.
- Update: Remove tabindex from `ActionButton` on the `PasswordField` component.
- Fix: `PopoverStd` component.

## Version 0.0.23 - Experimental
- Update: package.json dependencies.

## Version 0.0.22 - Experimental
- Add: New `label` slot on Checkbox to support HTML content.

## Version 0.0.21 - Experimental
- Add: New `validationMessage` function on `useForm` composable.

## Version 0.0.20 - Experimental
- Fix: Missing `valibot` upgrade and typing issue.

## Version 0.0.19 - Experimental
- Update: package.json dependencies.

## Version 0.0.18 - Experimental
- Add: New `tabindex` property on `FormControl` and control components.
- Update: Use `SharedControlProps` on many different control components.
- Update: Use `disabled`, `required` and `invalid` on `NumberField` control component.

## Version 0.0.17 - Experimental
- Update: package.json dependencies.
- Update: `PopoverStd` and `ContextMenu` components.
- Fix: Missing directives bundle entries.

## Version 0.0.16 - Experimental
- Add: New `track` property on `CollapseSupport` component.
- Add: New `column` property on `BalloonSelector` component.
- Update: Use `SharedControlProps` on `SelectField` & update histoire story using `FormControl`.
- Fix: Minor styling issues on `CollapseSupport` component.
- Fix: Minor styling issues on `SelectField` component.

## Version 0.0.15 - Experimental
- Add: New `FormControl` support component & basic story demonstration.
- Update: Use `SharedControlProps` on `BalloonSelector` & update histoire story using `FormControl`.
- Update: Always use `AdvancedOption` type inside items loop on `BalloonSelector` component.
- Update: New `field-custom` class on `BalloonSelector` component, when a default item slot is passed.
- Fix: Minor styling issues on mobile devices, `BalloonSelector` component.
- Fix: Minor styling issues on sm and lg sized `CheckboxField` component.

## Version 0.0.14 - Experimental
- Update: Pass `class` attribute to main modal element on `DialogStd`.

## Version 0.0.13 - Experimental
- Fix: `debounce` utility called callback function immediately.

## Version 0.0.12 - Experimental
- Add: New `CardXen` component & basic story demonstration.
- Update: Expose visibility state and `open` / `close` functions on `ConfirmDialog` component.
- Update: Increase `z-index` value on `BackdropSupport` and related components.
- Update: Support disabled select options on `SelectField` component.
- Fix: Allow numeric values on `AdvancedOption` / `BalloonSelector` component.
- Fix: Inheritance CardStd Props on `CardCollapse` component.
- Fix: Wrong import paths on bundled `.vue` files.
- Fix: Omit `ConfirmDialog` properties passed to `DialogStd` component.
- Fix: Missing event triggers on `ConfirmDialog` passed to `DialogStd` component.
- Fix: Return joined error messages instead of static `'invalid'` string on `useForm` composable.

## Version 0.0.11 - Experimental
- Add: New `valibot` validation library to replace `zod`.
- Add: New `ArrowLeft` / `ArrowRight` lucide icon components.
- Add: New `FormWizard` / `FormWizardPage` components.
- Add: New `isCustomValid` callback helper on `useForm` composable.
- Add: Support custom `requestHandler` callback parameter on `useForm` composable.
- Update: Support nullable values on `useForm` composable.
- Update: Include types in dist bundle.
- Fix: Typing issues on `tooltip` directive.

## Version 0.0.10 - Experimental
- Add: New `default` slot on the `AvatarStd` component to replace `props.name` when no `props.avatar` is present.
- Add: New `arrow` and `center` options on the `TooltipStd` component.
- Add: New `v-tooltip` directive to access directives without using `TooltipStd`.
- Add: New `content` slot on `CardStd` component to replace `<article>` structure.
- Add: New `format` property to `TableColumn` component + 3 new formats + basic story demonstration.
- Add: Support `metric` and `digits` modifiers on `v-filesize` directive.
- Add: Support `once` modifier on `v-click-outside` directive.
- Add: TabGroup / TabPane components & basic story demonstration.
- Add: New `bordered` property on `AlertStd` component.
- Add: New `body` slot on `DialogStd` component to replace inner `<article>` structure.
- Add: New `escape` property on `DialogStd` component to allow closing the modal using the ESC key.
- Add: New wobble animation when trying to close a static modal by an click outside.
- Add: `CheckCircle` / `XCircle` lucide icon components.
- Add: `TimeSlots` input control field component, supporting booking a timeslot.
- Update: Change the `AvatarGroup` limit class and label when not enough space is available.
- Update: `package.json` dependencies.
- Update: Decrease height (by lower the padding) on `BadgeStd` component.
- Update: Minor styling changes on `TableStd` to support usage inside `CardStd` (using new content slot).
- Update: Change font-size and icons on `AlertMessage` component.
- Update: Change font-size on `AlertStd` component.
- Update: Apply new 32 / 40 / 56 px height system on `BallonSelector` control field.
- Update: Apply new 32 / 40 / 56 px height system on `InputField` control field.
- Update: Apply new 32 / 40 / 56 px height system on `NumberField` control field.
- Update: Apply new 32 / 40 / 56 px height system on `PasswordField` control field.
- Update: Apply new 32 / 40 / 56 px height system on `SelectField` control field.
- Update: Rename `TimeFrameField` to `TimeFrame`.
- Update: Add `type` option to `now()` utility function to change returning value.
- Fix: Add media-query based `max-width` stylings on `DialogStd` to support some space to screen-borders.
- Fix: Demo-Icons on histoire stories.
- Fix: Minor styling changes on `TooltipStd` component.
- Fix: TypeScript type issues on dts plugin / vite build process.
- Fix: Re-Using same tooltip instance resulted in broken animation on `v-tooltip` directive.
- Fix: Styling issues on lg-sized `NumberField` and `PasswordField` component.

## Version 0.0.9 - Experimental
- Add: New `AlertMessage` / `AlertStd` components & basic story demonstration.
- Add: New `AvatarStd` / `AvatarGroup` components & basic story demonstration.
- Add: New `SimplePagination` / `AdvancedPagination` components & basic story demonstration.
- Add: New `CardStd` / `CardCollapse` components & basic story demonstration.
- Add: New `TableStd` / `TableColumn` components & basic story demonstration.
- Add: New `CheckSign` / `ChevronsLeft` / `ChevronsRight` / `DotCircle` / `InfoCircle` / `TriangleAlert` lucide icon components.
- Add: New `BackdropSupport` support component & basic story demonstration.
- Add: New `BreakpointSupport` support component & basic story demonstration.
- Add: New `CollapseSupport` support component & basic story demonstration.
- Add: New `DeferredSupport` support component & basic story demonstration (which does not work due to histoire `<Suspense />` Wrapper).
- Add: New `FloatingSupport` support component & basic story demonstration.
- Add: New `now` utility helper function to create a database familiar "YYYY-MM-DD HH:ii:ss" stamp.
- Add: New Modal / Dialog and Offcanvas handling using new `BackdropSupport` component.
- Add: New `v-click-outside` directive to trigger on click outside of target element.
- Add: TypeScript / Typings-Support on `select` utility function.
- Update: Rename `size` property on `ButtonGroup` to `gap`.
- Update: Allow component-type on `label` property on `ButtonStd` component + add `labelProps` property.
- Update: New `reverse` property and stylings on `ButtonGroup` component.
- Update: New `else` slot on and story content for `BreakpointSupport` component.
- Update: Handle `duration` property on and add story content for `CollapseSupport` component.
- Update: Integrate `Base*` variants in `*Std` components.
- Update: Refactored `request` utility function, supporting the single HTTP methods.
- Fix: Include base stylings in dist (temporary solution).
- Fix: Wrong date/time formatting on `now` utility function.
- Fix: Wrong typing / return type on `query` utility function.
- Fix: Wrong typing / return type on `reader` utility function.

## Version 0.0.8 - Experimental
- Add: MiruStorage class and utility composable.
- Add: ServiceWorker utility composable.
- Fix: Remaining `@/`-links on source files.
- Remove: `@/`-aliases in tsconfig / vite-config.

## Version 0.0.7 - Experimental
- Fix: Minor histoire issues.
- Fix: CSS-Bundle and Distribution-Generation process.
- Fix: Turn absolute import paths to relative ones, fixing broken `@/`-links on projects.
- Remove: Module-relative index.ts exports.

## Version 0.0.6 - Experimental
- Info: Switch from storybook to histoire.
- Add: EsLint rules + Fix current issues.
- Fix: Minor changes and fixes.
- Remove: Storybook dependencies.

## Version 0.0.5 - Experimental
- Add: `.vue` files to distribution bundle.

## Version 0.0.4 - Experimental
- Test: GitHub Actions / Workflow.

## Version 0.0.3 - Experimental
- Test: GitHub Actions / Workflow.

## Version 0.0.2 - Experimental
- Add: New `waitUntil` support function.
- Update: Dependencies.

## Version 0.0.1 - Experimental
- Initial Release.
