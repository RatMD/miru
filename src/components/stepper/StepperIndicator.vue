<template>
    <StepperIndicator
        data-slot="stepper-indicator"
        :class="cn('miru-stepper-indicator', props.class)"
        aria-hidden="true">
        <slot
            :step="item.step.value"
            :active="active"
            :completed="completed"
            :error="!!item.error.value">
            <IconAlertCircle v-if="item.error.value" class="size-[55%]" />
            <IconCheck v-else-if="completed && showCheck" class="size-[55%]" />
            <component v-else-if="icon" :is="icon" class="size-[55%]" />
            <span v-else>{{ item.step.value }}</span>
        </slot>
    </StepperIndicator>
</template>
<script setup lang="ts">
import type { Component, HTMLAttributes } from 'vue';
import { IconAlertCircle, IconCheck } from '@tabler/icons-vue';
import { StepperIndicator } from 'reka-ui';
import { computed, inject } from 'vue';
import { cn } from '../../support/classNames';
import { stepperKey, stepperItemKey } from './context';
const props = withDefaults(
    defineProps<{ icon?: Component; showCheck?: boolean; class?: HTMLAttributes['class'] }>(),
    { showCheck: true },
);
const group = inject(stepperKey);
const item = inject(stepperItemKey);
if (!group || !item) throw new Error('StepperIndicator must be inside StepperItem.');
const active = computed(() => group.current.value === item.step.value);
const completed = item.completed;
</script>
