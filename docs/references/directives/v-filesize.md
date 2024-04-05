---
title: v-filesize
titleTemplate: Directives | miru.ink
description: Simple convert seemingly endless number of bytes into human-readable formats. 
editLink: true
---

# v-filesize <Badge text="v0.1.0" />

Simple convert seemingly endless number of bytes into human-readable formats, using the [`filesize`](/references/utilities/filesize.html)
utility function as simple Vue directive.

<MiruSource component="v-tooltip">
<div class="flex flex-row items-center justify-center">
    <div class="flex items-center justify-center p-8 border border-gray-300 border-solid rounded-md bg-gray-50 dark:border-gray-500 dark:bg-gray-800">
        <span v-filesize.metric.3="4194304"></span>
    </div>
</div>

<template #source>

```vue
<template>
    <span v-filesize.metric.3="4194304"></span>
</template>
```

</template>
</MiruSource>

## Description

The `v-filesize` directive is automatically registered with the `createMiru` miru plugin but, 
however, you can also register it manually, of course.

::: code-group

```ts [src/app.ts - Plugin]{2,7}
import { createApp } from 'vue';
import { createMiru } from 'miru.ink';

import App from '@/App.vue';

const app = createApp(App);
app.use(createMiru());
app.mount('#app');
```

```ts [src/app.ts - Manual]{2,7}
import { createApp } from 'vue';
import FilesizeDirective from 'miru.ink/directives/filesize';

import App from '@/App.vue';

const app = createApp(App);
app.directive('filesize', FilesizeDirective);
app.mount('#app');
```

:::

## Value

The value inside the `v-filesize` attribute must be the desired number of bytes, you would like to 
convert. Keep in mind, that the content inside the directive'd element will be completely replaced.

```vue
<template>
    <span v-filesize="4194304"></span>
</template>
```

## Modifiers

Using modifiers you can change the conversion system (`metric`) and number of decimal places to 
display.

::: code-group

```vue [Metric]
<template>
    <span v-filesize.metric="4194304"></span>
</template>
```

```vue [Digits]
<template>
    <span v-filesize.4="4194304"></span>
</template>
```

:::
