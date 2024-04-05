---
title: v-tooltip
titleTemplate: Directives | miru.ink
description: Easily access and create tooltips without using the TooltipStd component.
editLink: true
---

# v-tooltip <Badge text="v0.1.0" />

Simple access and create tooltips everywhere without using the `TooltipStd` component, instead rely 
on the `v-tooltip` directive.

<MiruSource component="v-tooltip" histoire="/story/src-components-tooltip-tooltipstd-story-vue">
<div class="flex flex-row items-center justify-center">
    <div class="flex items-center justify-center p-8 border border-gray-300 border-solid rounded-md bg-gray-50 dark:border-gray-500 dark:bg-gray-800"
        v-tooltip.arrow="'Tooltip-Text by Directive'">
        Mouse-Over for Tooltip
    </div>
</div>

<template #source>

```vue
<template>
    <div class="container" v-tooltip.arrow="'Tooltip-Text by Directive'">
        Mouse-Over for Tooltip
    </div>
</template>
```

</template>
</MiruSource>

## Description

The `v-tooltip` directive is automatically registered with the `createMiru` miru plugin but, 
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
import TooltipDirective from 'miru.ink/directives/tooltip';

import App from '@/App.vue';

const app = createApp(App);
app.directive('tooltip', TooltipDirective);
app.mount('#app');
```

:::

## Value

The value inside the `v-tooltip` attribute can either be a simple string, which is used as label, or 
an object containing all desired tooltip attributes, as described on [`TooltipStd`](/references/components/tooltip/tooltip-std.html#properties).

::: code-group

```vue [String]
<template>
    <span v-tooltip="'Tooltip Label'">Target</span>
</template>
```

```vue [Object]
<template>
    <span v-tooltip="{ label: 'Tooltip Label', color: 'primary' }">Target</span>
</template>
```

:::

## Modifiers

Most properties can also be set as modifier, such as the color, the placement, the delay, the arrow 
and the center option. You can also combine multiple modifiers, as shown below.

::: code-group

```vue [Color]
<template>
    <span v-tooltip.primary="'Primary Tooltip'">Target</span>
</template>
```

```vue [Placement]
<template>
    <span v-tooltip.right-end="'Right-End Tooltip'">Target</span>
</template>
```

```vue [Delay]
<template>
    <span v-tooltip.350ms="'350ms Delayed Tooltip'">Target</span>
</template>
```

```vue [Mixed]
<template>
    <span v-tooltip.left.arrow.center="'Left-Arrow-Center Tooltip'">Target</span>
</template>
```

:::

> [!NOTE]
> The delay is found / filtered out using the regular expression `[0-9]+m?s`, thus you've to make 
> sure that you use either `ms` or `s` as time unit.
