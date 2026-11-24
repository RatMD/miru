MIRU - Changelog
=====================

## Unreleased

- Add: Backdrop with plain, uniform blur and origin-based faded blur; Breakpoint/useBreakpoint with app/local viewport thresholds; Deferred with async loading, errors, retry and cancellation.
- Add: ContextMenu and Item families adapted from Spottle using existing dependencies.

- Add: reactive semantic variants for Tabs, checkboxes, radios and InputTags, with group inheritance and per-item overrides.
- Add: distinct Anchor hover tones and automatic external-link icons for external/new-tab destinations, including router adapters.

- Add: themed Anchor with fade/slide underlines, copyable inline Code with prompt prefix, and Kbd/KbdGroup keyboard hints.
- Change: rename UploadDropzone to UploadZone, including source directory, public export and examples.
- Docs: include Accent in soft Alert variants and demonstrate vertical Separator usage.

- Change: consolidate InputDate/InputTime into InputDateTime with datetime/date/time/timeframe modes and local range values.
- Add: accessible single/range Slider with steps, theme variants and keyboard controls.
- Add: reusable EditorFrame with local command extensions, shared by JSON/Markdown editors.
- Change: move Calendar documentation to Utilities and rename the floating-app-bar source directory to app-bar.

- Add: AuthPage and DashboardPage under layouts, with split/card authentication, palette artwork, configurable sidebar/icon rail, nested navigation, mobile Sheet and host-owned page slots.
- Update: Reorganize Storybook navigation and public composable/plugin guides; add Spinner and a separate condensed CodePanel appearance for embedded dialogs.
- Update: Give filled buttons dark palette surfaces with bright text/borders, lighter hover states and darker pressed states with inset shadows in dark mode.
- Add: Alert appearance="soft" with Spottle-style tinted surfaces, round outline icons and light/dark colors; add a neutral default status while retaining the existing default appearance and info status.
- Add: Numeric AvatarStack overlap controls and coral cutout previews; Accordion iconMode with default, modern and rotating plus/minus animations.
- Add: AvatarStack with overlapping avatars, max/overflow support and shared size/shape defaults; add squircle and rounded hexagon avatar shapes with Storybook examples.
- Add: Vue global directive types for template binding checks, including the file-size alias and manual plugin installation.
- Add: `useValidation` with localized Zod schema factories, app-local custom registration, local overrides and typed host extensions; install automatically through `createMiru` or manually through `createMiruValidation`.
- Add: Country-format/MOD 97 IBAN validation and length/Luhn card-number validation in dedicated support modules.
- Update: Use `isValidMailAddress` and `isValidGtin` directly without export aliases; correct GTIN lengths to 8, 12, 13 and 14 (18-digit SSCC is not GTIN).
- Update: Rename `support/utils` to `support/classNames` and `CentralStorage` to `MiruStorage`, including its callback type.
- Update: Standardize support utility JSDoc, control-flow braces and spacing. Remove support default exports in favor of named imports.
- Update: Move the Vue entry to `src/miru.ts`, configuration/i18n to plugins, and expose `useMiru` / `useI18n` as composables. Add synchronous configure hooks, standalone plugin factories, host i18n adapters and custom locale dictionaries.
- Add: SSR-safe browser/PWA composables `useClient`, `useStorage` and `useWorker`, with reactive state, scope cleanup, namespaced storage synchronization and HL Portal-compatible correlated worker messaging.
- Update: Rename the library to MIRU (`@rat.md/miru`, miru.at), generalize application-specific names and publish under the MIT License.
- Update: Use `createMiru`, `MiruPlugin`, `useMiru` and `createInertiaMiru`; rename the table variant to `compact` and the default data format to `default`.
- Add: Share provider-scoped floating bar state, owned stack layers and automatic page cleanup across applications.
- Add: Demonstrate nested input and camera bar restoration with the shared Storybook state controller.

- Add: Shared responsive form page layout with optional FloatingAppBar docking.
- Add: Layout Storybook category with bilingual demos, integration guide and interaction checks.
- Update: Use shared page layout in FormLayout while preserving its props and slots.

## Version 0.1.0

- Initial Release
