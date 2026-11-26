<template>
    <div class="flex flex-wrap items-center gap-6 p-6">
        <Indicator
            :color="String(args.color || 'danger')"
            :size="size"
            :overlay="!!args.overlay"
            :position="position"
            :value="value"
            :icon="args.kind === 'icon' || args.withIcon ? IconCheck : undefined"
            :max="args.max === undefined ? undefined : Number(args.max)"
            :show-zero="args.showZero !== false"
            :visible="args.visible !== false"
            :pulse="!!args.pulse"
            :ping="!!args.ping"
            :cutout="args.cutout !== false"
            :cutout-gap="Number(args.cutoutGap ?? 2)"
            :foreground="args.foreground ? String(args.foreground) : undefined"
            :offset-x="Number(args.offsetX || 0)"
            :offset-y="Number(args.offsetY || 0)"
            :aria-label="args.ariaLabel ? String(args.ariaLabel) : undefined"
            :announce="!!args.announce">
            <ButtonShadow v-if="args.overlay" variant="primary" label="Notifications">
                <IconBell />
            </ButtonShadow>
        </Indicator>
        <span v-if="!args.overlay" class="text-sm">
            {{ locale === 'de' ? 'Verfügbar' : 'Available' }}
        </span>
    </div>
</template>
<script setup lang="ts">
import type { IndicatorPosition } from '../components/indicator';
import { IconBell, IconCheck } from '@tabler/icons-vue';
import { computed } from 'vue';
import { ButtonShadow } from '../components/button-shadow';
import { Indicator } from '../components/indicator';
const props = defineProps<{ args: Record<string, unknown>; locale: string }>();
const size = computed(() => (props.args.size || 'default') as 'sm' | 'default' | 'lg');
const position = computed(() => (props.args.position || 'top-right') as IndicatorPosition);
const value = computed(() =>
    props.args.kind === 'count'
        ? Number(props.args.value ?? 5)
        : props.args.kind === 'text'
          ? String(props.args.text ?? 'New')
          : undefined,
);
</script>
