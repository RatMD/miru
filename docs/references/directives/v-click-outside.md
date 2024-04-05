---
title: v-click-outside
titleTemplate: Directives | miru.ink
description: Fetch clicks outside the desired element using a simple directive, without writing the entire logic behind it.
editLink: true
---

# v-click-outside <Badge text="v0.1.0" />

Fetch clicks outside the desired element using a simple directive, without writing the entire logic 
behind it.

<MiruSource component="v-click-outside">
<div class="flex flex-row items-center justify-center">
    <div class="flex items-center justify-center p-8 border border-gray-300 border-solid rounded-md bg-gray-50 dark:border-gray-500 dark:bg-gray-800"
        v-click-outside="onClick">
        <div v-if="clicked" class="select-none">You clicked <span class="tabular-nums">{{ count }}</span> time(s) outside!</div>
        <div v-else class="select-none">Click Outside!</div>
    </div>
</div>

<template #source>

```vue
<template>
    <div class="container" v-click-outside="onClick">
        <!-- show something -->
    </div>
</template>

<script setup>
function onClick() {
    console.log('do something')
}
</script>
```

</template>
</MiruSource>

## Description

The `v-click-outside` directive is automatically registered with the `createMiru` miru plugin but, 
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
import OutsideDirective from 'miru.ink/directives/outside';

import App from '@/App.vue';

const app = createApp(App);
app.directive('click-outside', OutsideDirective);
app.mount('#app');
```

:::

## Value

The value inside the `v-click-outside` attribute must be a callable function, which is called when 
a click outside the desired element occurs.

```vue
<template>
    <div class="container" v-click-outside="onClick">
        <!-- show something -->
    </div>
</template>

<script setup>
function onClick() {
    console.log('do something')
}
</script>
```

## Modifiers

The `v-click-outside` directive currently supports only one modifier, which is `once` and allows you 
to automatically remove the event listener after it occurred the first time.

::: code-group

```vue [once]
<template>
    <div class="container" v-click-outside.once="onClick">
        <!-- show something -->
    </div>
</template>

<script setup>
function onClick() {
    console.log('do something, one single time')
}
</script>
```

:::

<script setup>
import { ref } from 'vue';

const clicked = ref(false);
const count = ref(0);

function onClick() {
    clicked.value = true;
    count.value = count.value+1;
}
</script>
