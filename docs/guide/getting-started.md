
# Installation

Install **miru.ink** using your favourite bundler engine, like you'd install any other package:

```sh
npm i miru.ink
```

```sh
pnpm add miru.ink
```

```sh
bun add miru.ink
```

```sh
yarn add miru.ink
```


## Use as-is

The easiest way to integrate **miru.ink** _as-is_ into your project is to simple import the general 
stylesheet and **miru.ink** plugin, created by the `createMiru()` function, in your Vue3 App 
workflow. This way does not require tailwind, postcss or any other dependency to be installed, as 
said, it can be used _as-is_.

```js{1,3,8}
import 'miru.ink/themes/miru.min.css';

import { createMiru } from 'miru.ink';
import { createApp } from 'vue';
import App from '@/App.vue';

const app = createApp(App);
app.use(createMiru());
app.mount('#app');
```

Now you can simple import and use the desired components as you would use your own.

```vue{2,6}
<template>
    <ButtonStd label="Button" @click="console.log('Hello')" />
</template>

<script setup>
import ButtonStd from 'miru.ink/button';
</script>
```


## Use adaptive

The more adaptive way allows you to configure the styling aspects and apply your corporate identity 
and design. However, this requires your project to implement tailwind with postcss, and is currently 
only tested with Vite as bundler engine.

Make sure you've installed `tailwindcss`, `postcss` and `postcss-import` in your project, and added
the `tailwindcss/nesting` package in your PostCSS configuration file.

1. Add the **miru.ink** Vue3 plugin to your `main.ts`.

```js{1,6}
import { createMiru } from 'miru.ink';
import { createApp } from 'vue';
import App from '@/App.vue';

const app = createApp(App);
app.use(createMiru());
app.mount('#app');
```

2. Add the `miru.ink/tailwind/base` and `miru.ink/tailwind/components` stylesheets to your own 
stylesheet alongside the basic tailwind lines.

```css{2,5}
@import 'tailwindcss/base';
@import 'miru.ink/tailwind/base';

@import 'tailwindcss/components';
@import 'miru.ink/tailwind/components';

@import 'tailwindcss/utilities';
```

3. Create a `miru.config.js` configuration file in the root directory of your project.

```js
/** @type {import('miru.ink').Config} */
export default {
    breakpoints: 'default',
    colors: 'default',
    exclude: [],
    rounded: 'default',
}
```

4. Include the `miru.ink/tailwind` plugin in your `tailwind.config.js` file.

```js
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        /* [...] */
    ],
    
    /* [...] */
    
    plugins: [
        require('miru.ink/tailwind')
    ]
}
```

5. Use the `.vue` SFC components instead of the bundled js-versions.

```vue{2,6}
<template>
    <ButtonStd label="Button" @click="console.log('Hello')" />
</template>

<script setup>
import ButtonStd from 'miru.ink/button/ButtonStd.vue';
</script>
```

Now you're able to change the primary styling principles to apply your corporate design, as well as 
completely exclude single stylings in favour of your own without losing the component or its 
functionality itself.
