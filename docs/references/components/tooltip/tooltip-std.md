---
title: TooltipStd
titleTemplate: Components | miru.ink
description: Provide helpful hints and additional information with Tooltip component, enhancing user guidance in a neat way.
editLink: true
---

# TooltipStd <Badge text="v0.1.0" />

Provide helpful hints and additional information with the `TooltipStd` component, enhancing user 
guidance in a neat way.

<MiruSource component="TooltipStd" histoire="/story/src-components-tooltip-tooltipstd-story-vue">
<div class="flex flex-row items-center justify-center">
    <TooltipStd label="Tooltip Text" placement="top" v-slot="{ show, hide }" arrow>
        <div class="flex items-center justify-center p-8 border border-gray-300 border-solid rounded-md bg-gray-50 dark:border-gray-500 dark:bg-gray-800"
            @pointerenter="show" @pointerleave="hide">
            Mouse-Over for Tooltip
        </div>
    </TooltipStd>
</div>

<template #source>

```vue
<template>
    <TooltipStd label="Tooltip Text" arrow v-slot="{ show, hide }">
        <div class="container" @pointerenter="show" @pointerleave="hide">
            Mouse-Over for Tooltip
        </div>
    </TooltipStd>
</template>

<script type="ts" setup>
import TooltipStd from 'miru.ink/tooltip/TooltipStd.vue';
</script>
```

</template>
</MiruSource>

## Description

The `TooltipStd` component works as a Wrapper, using the passed (default) slot content as target, 
for the tooltip text passed either as `label` property or using the `tooltip` slot. However, you 
can also use the `v-tooltip` directive, as described under [directives](/references/directives/v-tooltip), to use Tooltips 
without the need of using an additional wrapper itself.

## Properties

<MiruTable :props="{
    color: {
        text: 'The desired color used for this tooltip.',
        type: {
            'Color': ['primary', 'secondary', 'success', 'warning', 'danger', 'info']
        }
    },
    label: {
        text: 'The desired label text for this tooltip, used when no slot is passed.',
        type: 'string',
    },
    delay: {
        text: 'The amount of milliseconds until the tooltip starts to get visible.',
        type: 'number'
    },
    placement: {
        text: 'The floating-ui placement option for this tooltip.',
        type: {
            'Placement': [
                'top',
                'top-start',
                'top-end',
                'left',
                'left-start',
                'left-end',
                'right',
                'right-start',
                'right-end',
                'bottom',
                'bottom-start',
                'bottom-end',
            ]
        }
    },
    offset: {
        text: 'The floating-ui offset option for this tooltip.',
        type: 'OffsetOptions',
        type: {
            'number': null,
            'OffsetValue': {
                mainAxis: 'number',
                crossAxis: 'number',
                alignmentAxis: ['number', 'null'],
            }
        }
    },
    arrow: {
        text: 'Whether to show an arrow or not.',
        type: 'boolean'
    },
    center: {
        text: 'Whether to center the tooltip text or not.',
        type: 'boolean'
    }
}" />

## Slots

<MiruTable :props="{
    default: {
        text: 'Default content slot, used instead of the label property..'
    },
    tooltip: {
        text: 'Tooltip content slot, used instead of the label property.',
    }
}" />


<script setup>
import TooltipStd from '../../../../src/components/tooltip/TooltipStd.vue';
</script>
