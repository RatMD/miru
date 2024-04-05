---
title: AccordionTab
titleTemplate: Components | miru.ink
description: Efficiently organize content with the collapsible AccordionTab component.
editLink: true
---

# AccordionTab <Badge text="v0.1.0" />

Efficiently organize large amount of content with the collapsible `AccordionTab` component. Connect 
several of these using the additional [`AccordionGroup`](./accordion-group) component for an even 
better behaviour and user experience. 

> [!INFO]
> In the background `AccordionTab` uses and works with the [`CollapseSupport`](../support/collapse-support) 
> component to realise the animation and height-calculation.

<MiruSource component="AccordionGroup" histoire="/story/src-components-accordion-accordiontab-story-vue">
<AccordionTab label="Accordion Item" v-model:visible="visible">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</AccordionTab>

<template #source>

```vue
<template>
    <AccordionTab label="Accordion Item" v-model:visible="visible">
        <!-- Content -->
    </AccordionTab>
</template>

<script type="ts" setup>
import { ref } from 'vue';
import AccordionTab from 'miru.ink/accordion/AccordionTab.vue';

const visible = ref<boolean>(false);
</script>
```

</template>
</MiruSource>

## Properties

<MiruTable :props="{
    id: {
        type: 'string',
        text: 'A custom accordion tab id, used for a11y purposes only. Default value is an auto-generated UUID.'
    },
    label: {
        type: 'string',
        text: 'The accordion label to toggle the accordion pane, used within the header slot.'
    },
    icon: {
        type: 'Component',
        text: 'The accordion toggle icon, uses a Chevron as default. Pass `null` to disable the icon completely.',
        nullable: true
    },
    iconPlacement: {
        type: ['left' | 'right'],
        text: 'Whether to show the accordion toggle icon on the left or right side of the label.'
    },
    iconProps: {
        type: 'object',
        text: 'Additional properties passed to the icon component, such as `size` or `stroke-width`'
    },
    duration: {
        type: ['number', 'slow', 'normal', 'fast'],
        text: 'The duration until the accordion pane content is fully toggled, you can either pass the time in milliseconds or a control-value to calculate the duration dynamically based on the amount of content.'
    },
    iconProps: {
        type: 'visible',
        text: 'The visibility state of the accordion pane content, must be passed as v-model value.',
        required: true
    },
    condensed: {
        type: 'boolean',
        text: 'Whether to apply the condensed stylings or not.'
    },
}" />

## Slots

<MiruTable :props="{
    default: {
        text: 'The primary accordion tab content slot.'
    },
    header: {
        text: 'Additional content slot, used as accordion header instead of the label property.'
    }
}" />

## Events

<MiruTable :props="{
    'update:visible': {
        text: 'Change visibility state.'
    },
    hide: {
        text: 'Event fires immediately, when the accordion pane starts to get hidden. (Passed to CollapseSupport)'
    },
    hidden: {
        text: 'Event fires after the accordion pane is fully hidden. (Passed to CollapseSupport)'
    },
    show: {
        text: 'Event fires immediately, when the accordion pane starts to get visible. (Passed to CollapseSupport)'
    },
    shown: {
        text: 'Event fires after the accordion pane is fully shown. (Passed to CollapseSupport)'
    },
}" />

<script setup>
import { ref } from 'vue';
import AccordionTab from '../../../../src/components/accordion/AccordionTab.vue';

const visible = ref(false);
</script>
