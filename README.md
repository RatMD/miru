MIRU - UI Kit
=============

Reusable Vue 3 component library providing consistent application UI,
themeable styles, and reusable form infrastructure.

Website: [miru.at](https://miru.at)

## Requirements

The library uses Vue 3, TypeScript, Tailwind CSS 4, and Vite. Component styles are compiled into the
package; consuming applications do not need to scan the library with Tailwind.

- Vue 3.5.45+ in the consuming application.
- Node.js 24 and npm 11+ for development and installation from Git.
- An existing Vue application with an ESM-compatible build workflow.

## Features

- **Shared UI:** Reusable components, form fields, and application building blocks.
- **Theming:** CSS-variable customization with light and dark mode support.
- **Forms:** TanStack Vue Form and Zod integration, with optional Inertia transport.
- **Validation:** `useValidation()` provides localized Zod factories for mail addresses, GTIN, IBAN and card numbers, plus app-local custom factories registered through `createMiru({ validators })`.
- **Application infrastructure:** Data presentation, media, notifications, and responsive overlays.
- **Localization:** App-local English/German UI copy and host translation integration.
- **Utilities:** Shared composables, directives, and framework-independent support helpers.
- **Browser and PWA:** SSR-safe `useClient`, reactive namespaced `useStorage`, and `useWorker` with correlated messages, timeouts and explicit cache management. See Storybook's **Composables / Browser and PWA** guide.
- **Documentation and testing:** Interactive Storybook examples and Vitest browser tests.

## Getting Started

Add `@rat.md/miru` to your application's dependencies:

```sh
npm install @rat.md/miru
```

For installation from a Git checkout, the `prepare` lifecycle builds the package.

Import the compiled stylesheet once, before application theme overrides, and install the plugin
on your existing Vue app before mounting:

```ts
import '@rat.md/miru/style.css';
import { createMiru } from '@rat.md/miru/miru';

app.use(createMiru({ locale: 'en' }));
```

Forms use AJAX through the plain request helper by default. Inertia is an optional
integration: install it in the host application, import `inertiaAdapter` from
`@rat.md/miru/adapters/inertia`, and pass `createMiru({ adapter: inertiaAdapter() })`
for Inertia form submissions, links and table navigation.
Transport and form adapters are available from `@rat.md/miru/adapters/ajax` and
`@rat.md/miru/adapters/inertia`. Core imports and types work without Inertia installed.

`createMiru()` installs app-local configuration, i18n, the validation registry and all bundled UI directives. The synchronous
`configure({ app, options })` hook runs before automatic plugins and can install host plugins, mutate
the configuration or return overrides. Use `plugins: false` for manual installation inside this hook,
or select individual defaults with `plugins: { i18n: false, directives: false }`.

Read settings through `useMiru` and translations through `useI18n`, both exported from
`@rat.md/miru/composables`. The i18n plugin accepts reactive `locale`, custom `messages`, a
`fallbackLocale`, and a library-independent `i18n` adapter with `translate`/`translateChoice` callbacks.
Storybook's **Plugins / i18n** guide covers standalone language switching, Vue I18n and Laravel adapters.
For fully manual installation, use `createMiruConfig`, `createMiruI18n`, `createMiruValidation` and
`createMiruDirectives`. Configuration is exported from `@rat.md/miru/miru`; the other factories
use the `@rat.md/miru/plugins/i18n`, `/validation` and `/directives` entry points.

Wrap persistent application content once with `PageRoot`. Import components explicitly where used:

```vue
<script setup lang="ts">
import { PageRoot } from '@rat.md/miru';
</script>

<template>
    <PageRoot><slot /></PageRoot>
</template>
```

Both grouped and individual imports are supported:

```ts
import { useForm, useToast } from '@rat.md/miru/composables';
import { numberFormat } from '@rat.md/miru/support';
// Alternatively, import individual modules:
// import { useForm } from '@rat.md/miru/composables/useForm';
// import { numberFormat } from '@rat.md/miru/support/numberFormat';
```

During development, export new public composables and support modules from the respective
`src/composables/index.ts` or `src/support/index.ts`. Vite derives their individual build entries
from these barrels; the wildcard package exports need no per-module changes. Internal helpers
that are not re-exported remain outside these individual runtime entry points.

Support modules use named exports consistently, including individual imports such as
`import { dayjs } from '@rat.md/miru/support/dayjs'`. Functions and methods include a short JSDoc
description, parameter documentation and a return description. Control-flow bodies use braces.
Collect value exports and type exports at the end of each support module under `// Export module`.

Validation helpers follow the same naming convention: `isValidMailAddress`, `isValidGtin`,
`isValidIban` and `isValidCreditCard`, all exported from `@rat.md/miru/support` and their individual
modules. IBAN checks national formats and MOD 97; card numbers use Luhn. These are local format
and checksum checks, without account/card existence verification.

Keep application labels, domain translations, routes, and upload requests in the host application.
Detailed installation, Inertia integration, and theme configuration are documented in Storybook.

## Development

Run `npm ci` in the library checkout, then `npm run dev` to start Storybook.

Interactive Storybook development hides Vue runtime warnings through the preview app's
`warnHandler`. This does not change the library, consumer apps, errors or test diagnostics.
Set `VITE_STORYBOOK_VUE_WARNINGS=true` before starting Storybook to show them again:

```powershell
$env:VITE_STORYBOOK_VUE_WARNINGS = 'true'
npm run dev
```

- `npm run dev` / `npm run storybook:dev`: Develop components and browse documentation in Storybook.
- `npm run typecheck`: Check Vue/TypeScript source, stories, and configuration.
- `npm run lint` / `npm run lint:fix`: Check conventions or apply available ESLint fixes.
- `npm run format` / `npm run format:fix`: Check formatting or apply Prettier fixes.
- `npm run build`: Check types and generate ESM, CSS, and TypeScript declarations in `dist/`.
- `npm run build:watch`: Watch JS/CSS output; use a full build to refresh declarations.
- `npm run storybook:build`: Generate the standalone documentation in `storybook-static/`.
- `npm run check:package`: Build and verify package exports and the build-only file list.
- `npm test`: Build once, verify package exports and type fixtures, run both Vitest projects (Node/integration and Storybook), then build the Storybook documentation. Failed checks produce a non-zero exit code.
- `npm run storybook:test`: Run only Storybook component and interaction tests in Chromium.
- `npm run storybook:test:watch`: Watch Storybook tests while developing.
- `npm run storybook:test:coverage`: Generate Storybook test coverage reports.
- `npm run browser:install`: Install Chromium for browser tests.

To apply all available convention and formatting fixes, run these in order:

```sh
npm run lint:fix
npm run format:fix
```

ESLint fixes block/import order and other automatically fixable rules. Prettier formats the result. Rules that need a manual decision remain visible in the check output.

Commit sources and the lockfile. Build output and test reports are generated locally. The package
ships compiled `dist/` files alongside standard package metadata; Storybook and test tools remain
development dependencies.

## Documentation

Storybook contains the installation guide, integration notes, theme configuration, component APIs,
interactive examples, and documentation for forms, plugins, and support utilities.

Use the Getting Started section for application setup and the component guides for individual APIs.

## Copyright & License

[MIT License](./LICENSE.md). \
Copyright © 2025 - 2026 rat.md

## Transport and backend adapters

All integrations live under `src/adapters`. AJAX is the default transport, equivalent to
`createMiru({ adapter: ajaxAdapter() })`. Import `ajaxAdapter` from `@rat.md/miru/adapters/ajax`
to configure shared request headers and credentials for forms and table mutations.

Backend data conventions are configured independently:

```ts
import { createMiru } from '@rat.md/miru/miru';
import { inertiaAdapter } from '@rat.md/miru/adapters/inertia';
import { adonisAdapter } from '@rat.md/miru/adapters/adonis';

app.use(createMiru({
    adapter: inertiaAdapter(),
    dataTable: adonisAdapter({ perPageKey: 'limit' }),
}));
```

Use `laravelAdapter()` from `@rat.md/miru/adapters/laravel` for Laravel paginator payloads.
Both backend adapters work with AJAX or Inertia and automatically supply table normalization
and query serialization. Tables can override these defaults with `data-format` or a custom
`querySerializer`. Each integration has one file in `src/adapters`: `ajax.ts`, `inertia.ts`,
`adonis.ts` and `laravel.ts`. Shared contracts are exported from the package root. DataTable
normalization and query helpers belong to the DataTable component; selecting an adapter
only chooses those conventions. Inertia remains an explicit optional import.


## Colour schemes

The base stylesheet uses Miru Original. Import an optional scheme after it and put application token overrides last:

```ts
import '@rat.md/miru/style.css';
import '@rat.md/miru/themes/modern.css';
import './overrides.css';
```

Available schemes: `original`, `modern`, `northern-lights`, `lagoon`, `rosewood`, `golden-hour`. Light/dark mode follows the root `.dark` class or `data-theme="dark"`. Theming does not require `createMiru()`.

Schemes are hand-maintained stylesheets in `src/themes/` and are copied unchanged into the package. Palette steps, foregrounds and interaction colours are explicit CSS values. The colour scheme calculator belongs to the documentation website and does not run during library builds or in your application.

## Release checks

`npm ci` installs the Husky pre-commit hook for this checkout. `npm run check` runs lint, package export/packing checks, build/type checks, unit/browser tests and the Storybook production build. CI and publishing use the same command. Install the test browser once with `npm run browser:install`. The complete pre-commit check can take several minutes.
