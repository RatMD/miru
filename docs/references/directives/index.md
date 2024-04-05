---
title: Directives
titleTemplate: miru.ink
description: Some basic, handy and everyday usable utility functions for your application.
editLink: true
---

# Directives

**miru.ink** currently provides 3 custom Vue3 directives, which are automatically registered with 
the `createMiru` application itself, but can also be registered manually.

| Directive                     | Description |
| ----------------------------- | ----------- |
| [v-click-outside](./v-click-outside)  | Fetch clicks outside the desired element using a simple directive, without writing the entire logic behind it. |
| [v-filesize](./v-filesize)            | Simple convert seemingly endless number of bytes into human-readable formats.  |
| [v-tooltip](./v-tooltip)              | Easily access and create tooltips without using the TooltipStd component. |

<style scoped>
table tr td a {
    white-space: nowrap;
}
</style>
