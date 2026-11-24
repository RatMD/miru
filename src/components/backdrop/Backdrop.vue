<template>
    <Transition name="miru-backdrop">
        <div
            v-if="visible"
            data-slot="backdrop"
            :data-faded="faded"
            :data-interactive="interactive"
            aria-hidden="true"
            :class="
                cn(
                    'miru-backdrop inset-0 z-40 select-none',
                    position,
                    !interactive && 'pointer-events-none',
                    props.class,
                )
            "
            :style="surfaceStyle"
            @click="interactive && emit('click', $event)" />
    </Transition>
</template>
<script setup lang="ts">
import type { CSSProperties, HTMLAttributes } from 'vue';
import { computed } from 'vue';
import { cn } from '../../support/classNames';

const props = withDefaults(
    defineProps<{
        visible?: boolean;
        position?: 'fixed' | 'absolute';
        /** false disables blur; true uses 12px. Numbers are CSS pixels. */
        blur?: boolean | number | 'sm' | 'default' | 'lg' | 'xl';
        faded?: boolean;
        /** Blur center in viewport coordinates for fixed, or container coordinates for absolute. */
        origin?: { x: string | number; y: string | number };
        color?: string;
        /** Intercept pointer clicks; the host owns dismissal and keyboard/focus handling. */
        interactive?: boolean;
        class?: HTMLAttributes['class'];
    }>(),
    {
        visible: true,
        position: 'fixed',
        blur: false,
        faded: false,
        color: 'rgb(0 0 0 / 0.2)',
        interactive: false,
        origin: () => ({ x: '50%', y: '50%' }),
    },
);
const emit = defineEmits<{ click: [event: MouseEvent] }>();
const length = (value: string | number) => (typeof value === 'number' ? `${value}px` : value);
const amount = computed(() =>
    typeof props.blur === 'number'
        ? Math.max(0, props.blur)
        : props.blur === true
          ? 12
          : props.blur === false
            ? 0
            : { sm: 4, default: 12, lg: 20, xl: 32 }[props.blur],
);
const surfaceStyle = computed<CSSProperties>(() => ({
    backgroundColor: props.color,
    backdropFilter: amount.value ? `blur(${amount.value}px)` : undefined,
    WebkitBackdropFilter: amount.value ? `blur(${amount.value}px)` : undefined,
    '--backdrop-origin-x': length(props.origin.x),
    '--backdrop-origin-y': length(props.origin.y),
}));
</script>
<style scoped>
.miru-backdrop[data-faded='true'] {
    --backdrop-mask: radial-gradient(
        circle farthest-corner at var(--backdrop-origin-x) var(--backdrop-origin-y),
        #000 0%,
        #000 18%,
        rgb(0 0 0 / 85%) 42%,
        rgb(0 0 0 / 35%) 75%,
        transparent 100%
    );
    mask-image: var(--backdrop-mask);
    -webkit-mask-image: var(--backdrop-mask);
}
.miru-backdrop-enter-active,
.miru-backdrop-leave-active {
    transition: opacity 200ms ease;
}
.miru-backdrop-enter-from,
.miru-backdrop-leave-to {
    opacity: 0;
}
@media (prefers-reduced-motion: reduce) {
    .miru-backdrop-enter-active,
    .miru-backdrop-leave-active {
        transition: none;
    }
}
</style>
