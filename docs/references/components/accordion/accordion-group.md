---
title: AccordionGroup
description: Efficiently organize content with multiple collapsible AccordionTab components, joined together within a simple AccordionGroup.
editLink: true
---
<script setup>
import AccordionGroup from '../../../../src/components/accordion/AccordionGroup.vue';
import AccordionTab from '../../../../src/components/accordion/AccordionTab.vue';
</script>

# AccordionGroup <Badge text="v0.1.0" />

Efficiently organize content with multiple collapsible [`AccordionTab`](/references/components/accordion/accordion-tab) 
components, joined together in a group, for seamless navigation.

<MiruSource component="AccordionGroup" :props="{
    id: {
        type: 'string',
        description: 'A custom accordion id, used for a11y purposes only, also passed to the single accordion tabs. Default value is an auto-generated UUID.'
    },
    multiple: {
        type: 'boolean',
        description: 'Whether to allow multiple accordion tabs to be open at the same time or not.'
    },
    condensed: {
        type: 'boolean',
        description: 'Whether to apply the condensed stylings or not.'
    },
    clean: {
        type: 'boolean',
        description: 'Whether to apply the clean stylings or not.'
    },
    pass: {
        type: 'object',
        description: 'Pass shared properties to the individual AccordionTab components.'
    },
}" :slots="{
    default: {
        description: 'Primary accordion content slot, must contain AccordionTab components only.'
    }
}" histoire="/story/src-components-accordion-accordiongroup-story-vue?variantId=src-components-accordion-accordiongroup-story-vue-0">
<AccordionGroup>
    <AccordionTab label="Accordion Tab #1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </AccordionTab>
    <AccordionTab label="Accordion Tab #2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </AccordionTab>
    <AccordionTab label="Accordion Tab #3">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </AccordionTab>
</AccordionGroup>

<template #properties>

## Properties

</template>

<template #slots>

## Slots

</template>

<template #source>

```vue
<template>
    <AccordionGroup>
        <AccordionTab label="AccordionItem">
            <!-- Content -->
        </AccordionTab>
    </AccordionGroup>
</template>

<script type="ts" setup>
import AccordionGroup from 'miru.ink/accordion/AccrodionGroup.vue';
import AccordionTab from 'miru.ink/accordion/AccordionTab.vue';
</script>
```

</template>
</MiruSource>
