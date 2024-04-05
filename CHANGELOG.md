miru.ink / Changelog
====================

## Version 0.0.10 - Experimental
- Add: New `default` slot on the `AvatarStd` component to replace `props.name` when no `props.avatar` is present.
- Update: Change the `AvtaraGroup` limit class and label when not enough space is available.
- Update: `package.json` dependencies.
- Fix: Minor stylings on `TooltipStd` component.
- Fix: TypeScript type issues on dts plugin / vite build process.

## Version 0.0.9 - Experimental
- Add: AlertMessage / AlertStd components & basic story demonstration.
- Add: AvatarStd / AvatarGroup components & basic story demonstration.
- Add: SimplePagination / AdvancedPagination components & basic story demonstration.
- Add: CardStd / CardCollapse components & basic story demonstration.
- Add: TableStd / TableColumn components & basic story demonstration.
- Add: CheckSign / ChevronsLeft / ChevronsRight / DotCircle / InfoCircle / TriangleAlert lucide icon components.
- Add: BackdropSupport support component & basic story demonstration.
- Add: BreakpointSupport support component & basic story demonstration.
- Add: CollapseSupport support component & basic story demonstration.
- Add: DeferredSupport support component & basic story demonstration (which does not work due to histoire `<Suspense />` Wrapper).
- Add: FloatingSupport support component & basic story demonstration.
- Add: New `now` utility helper function to create a database familiar "YYYY-MM-DD HH:ii:ss" stamp.
- Add: New Modal / Dialog and Offcanvas handling using new BackdropSupport component.
- Add: New `v-click-outside` directive to trigger on click outside of target element.
- Add: TypeScript / Typings-Support on `select` utility function.
- Update: Rename `size` property on ButtonGroup to `gap`.
- Update: Allow component-type on `label` property on Button component + add `labelProps` property.
- Update: New `reverse` property and stylings on ButtonGroup component.
- Update: New `else` slot on and story content for BreakpointSupport component.
- Update: Handle `duration` property on and add story content for CollapseSupport component.
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
