[<img src=".github/miru-mark.svg" alt="miru." width="80" height="80">](https://miru.at)

MIRU - Vue3 UI Kit
==================

A Vue 3 UI kit for thoughtful application interfaces, expressive forms and adaptable layouts. Built 
with [Vue](https://vuejs.org/), [Reka UI](https://reka-ui.com/), [TypeScript](https://www.typescriptlang.org/) 
and [Tailwind CSS](https://tailwindcss.com/), with shared styles and a little character with lot of 
love in every single component.

[Website & documentation](https://miru.at) · [Storybook](https://storybook.miru.at)

## Requirements

The library uses Vue 3, TypeScript, Tailwind CSS 4, and Vite. Component styles are compiled into the
package; consuming applications do not need to scan the library with Tailwind.

- Vue 3.5.45+ in the consuming application.
- Node.js 24 and npm 11+ for development and installation from Git.
- An existing Vue application with an ESM-compatible build workflow.

## Features

- **Components & layouts:** Reusable building blocks, data tables, media and responsive overlays.
- **Forms & validation:** TanStack Vue Form, Zod and localised validators, with optional Inertia integration.
- **Theming:** CSS variables, six colour schemes, and light and dark modes.
- **Localisation:** App-local English/German UI copy and support for your own translations.
- **Shared infrastructure:** Notifications, composables, directives and standalone utilities.
- **Interactive documentation:** Component examples, API references and browser tests.

## Getting Started

Install the package:

```sh
npm install @rat.md/miru
```

```sh
pnpm add @rat.md/miru
```

```sh
yarn add @rat.md/miru
```

Import the compiled stylesheet and install Miru before mounting your application. `miru.wrap` adds 
the persistent application root and notification host:

```ts
import { createApp } from 'vue';
import { createMiru } from '@rat.md/miru';
import App from './App.vue';
import '@rat.md/miru/style.css';

const miru = createMiru({ locale: 'en-GB', currency: 'EUR' });

createApp({ render: () => miru.wrap(App) })
    .use(miru)
    .mount('#app');
```

Import components where you use them:

```vue
<script setup lang="ts">
import { Button } from '@rat.md/miru';
</script>

<template>
    <Button variant="primary">Make something wonderful</Button>
</template>
```

To change the look, import an optional colour scheme after the base stylesheet and put your CSS 
variable overrides last:

```ts
import '@rat.md/miru/style.css';
import '@rat.md/miru/themes/modern.css';
import './overrides.css';
```

Toggle dark mode with the root `.dark` class or `data-theme="dark"`. See [Installation](https://miru.at/docs/guide/installation) 
for application setup and Inertia integration, and [Theming](https://miru.at/docs/guide/theming) for 
palettes and tokens.

## Development

Run `npm ci` in the library checkout, then `npm run dev` to start Storybook.

- `npm run build`: Build the library, styles and TypeScript declarations.
- `npm run typecheck`: Check Vue and TypeScript types.
- `npm run lint` / `npm run format`: Check code conventions and formatting; append `:fix` to apply fixes.
- `npm run check`: Run the complete lint, package, build and test checks. Install Chromium once with `npm run browser:install`.
- `npm run storybook:build`: Build the standalone Storybook site.

## Documentation

Visit [miru.at](https://miru.at) for setup guides, theming, forms and [component references](https://miru.at/components/). 
Explore [Storybook](https://storybook.miru.at) for interactive examples and component controls.

## Copyright & License

Published under the [MIT License](./LICENSE.md).  
Copyright © 2025 - 2026 rat.md (Sam \<sam@rat.md\>).

*rat.md is n OpenSource initiative by pytesNET.*
