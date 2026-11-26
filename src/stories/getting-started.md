# Install Miru

A few imports, a little configuration, and you are ready to build. Miru brings its components, compiled styles and TypeScript declarations together in one package, ready to settle into your Vue application.

## Requirements

- Vue **3.5.45 or newer**, with an ESM-compatible build workflow.
- Node.js **24** and npm **11+**.

## Install the package

Install `@rat.md/miru` with your preferred package manager.

**npm**

```sh
npm install @rat.md/miru
```

**pnpm**

```sh
pnpm add @rat.md/miru
```

**Yarn**

```sh
yarn add @rat.md/miru
```

## Configure your application

Import the stylesheet once, before your theme overrides, and install Miru before mounting the application. The plugin shares locale, translation and form settings; `miru.wrap` adds the persistent application root and notification host.

These are two separate steps: `.use(miru)` installs configuration and plugins, while `miru.wrap(App)` renders your application inside [PageRoot](https://miru.at/layouts/page-root). The wrapper does not install the plugin for you.

### Vue

In your application entry file:

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

AJAX is the default form transport. Configure your endpoints and authentication in the application; Miru supplies the controls and shared behaviour.

### Inertia

Keep your existing Inertia application and install Miru alongside its Vue plugin. This example resolves Vue pages from `./Pages`; retain your own page resolver if your project uses a different arrangement.

```ts
import type { DefineComponent } from 'vue';
import { createApp } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { createMiru } from '@rat.md/miru';
import { inertiaAdapter } from '@rat.md/miru/adapters/inertia';
import '@rat.md/miru/style.css';

const pages = import.meta.glob<{ default: DefineComponent }>('./Pages/**/*.vue');

createInertiaApp({
    async resolve(name) {
        const load = pages[`./Pages/${name}.vue`];
        if (!load) throw new Error(`Unknown page: ${name}`);
        return (await load()).default;
    },
    setup({ el, App, props, plugin }) {
        const miru = createMiru({
            adapter: inertiaAdapter(),
            currency: 'EUR',
        });

        createApp({ render: () => miru.wrap(App, props) })
            .use(plugin)
            .use(miru)
            .mount(el);
    },
});
```

Install Inertia in the host application first. Its explicit adapter supplies form submission, navigation, links and optional locale and notification page props. Backend list conventions are configured separately: see [Adapters](https://miru.at/docs/guide/adapters).

Here, `miru.wrap(App, props)` forwards Inertia’s application props to `App` while keeping PageRoot outside the changing pages.

## The application root

`miru.wrap(App, props)` returns a Vue VNode: PageRoot containing your application component, with the optional props passed through to it. This is why the setup examples call it inside a `render` function.

PageRoot supplies the shared UI context, mounts the optional Toast host and processes configured page notifications. Mount it once above changing pages so those services stay in place during navigation. Installing the plugin with `.use(miru)` alone does not render PageRoot or a notification host.

### Alternative: add PageRoot yourself

You can install the plugin normally and manage PageRoot in your own template. In the application entry file:

```ts
import { createApp } from 'vue';
import { createMiru } from '@rat.md/miru';
import App from './App.vue';
import '@rat.md/miru/style.css';

const miru = createMiru({ locale: 'en-GB', currency: 'EUR' });

createApp(App).use(miru).mount('#app');
```

Then wrap the persistent content in `App.vue`:

```vue
<script setup lang="ts">
import { PageRoot, Button } from '@rat.md/miru';
</script>

<template>
    <PageRoot>
        <Button variant="primary">Make something wonderful</Button>
    </PageRoot>
</template>
```

Use either `miru.wrap` or the explicit PageRoot component; combining them would mount a second root and notification host. If your host already provides a notification system, set `toast: false` in `createMiru` to disable Miru’s notification host.

## Use a component

Import a component where you need it and use it directly in your template. A small button is quite enough to get acquainted:

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { Button } from '@rat.md/miru';

const count = ref(0);
</script>

<template>
    <Button variant="primary" @click="count++">Clicked {{ count }} times</Button>
</template>
```

## Import what you need

Components, composables and support helpers have their own entry points:

```ts
import { Button, Input, Checkbox } from '@rat.md/miru';
import { useForm, useToast } from '@rat.md/miru/composables';
import { numberFormat } from '@rat.md/miru/support';
```

The plugin configures shared services; components remain explicit imports in each application view. Browse the [component catalogue](https://miru.at/components/) for previews and complete references, or continue with [Theming](https://miru.at/docs/guide/theming) to give Miru your own colours and character.
