<template>
    <div
        v-if="visible"
        role="alert"
        data-slot="alert"
        :data-variant="variant"
        :data-appearance="appearance"
        :data-icon="showIcon || hasLeadingIcon() || !!$slots.icon"
        :class="cn(alertVariants({ variant, appearance }), dismissable && 'pr-12', props.class)">
        <span
            v-if="$slots.icon || (showIcon && !hasLeadingIcon())"
            data-slot="alert-icon"
            aria-hidden="true"
            class="col-start-1 row-start-1 row-end-[-1] flex size-9 shrink-0 items-center justify-center self-center rounded-xl [&>svg]:size-[21px] [&>svg]:shrink-0">
            <slot name="icon">
                <component
                    :is="statusIcon"
                    :stroke-width="appearance === 'soft' ? 1.5 : undefined" />
            </slot>
        </span>
        <slot />
        <ButtonAction
            v-if="dismissable"
            data-slot="alert-dismiss"
            :variant="variant ?? 'default'"
            borderless="yes"
            size="xs"
            icon-only
            :aria-label="dismissLabel || trans('common.actions.close')"
            class="absolute top-2 right-2"
            @click="dismiss">
            <IconX />
        </ButtonAction>
    </div>
</template>

<script setup lang="ts">
import type { AlertVariants } from '.';
import type { HTMLAttributes, VNode } from 'vue';
import {
    IconX,
    IconInfoCircleFilled,
    IconCircleCheckFilled,
    IconAlertTriangleFilled,
    IconAlertHexagonFilled,
    IconInfoCircle,
    IconCircleCheck,
    IconAlertTriangle,
    IconCircleX,
} from '@tabler/icons-vue';
import { computed, Fragment, useSlots, ref } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { cn } from '../../support/classNames';
import { ButtonAction } from '../button-action';
import { alertVariants } from '.';

const props = withDefaults(
    defineProps<{
        class?: HTMLAttributes['class'];
        variant?: AlertVariants['variant'];
        /** Keep the current toast-like style, or use a softly tinted status surface. */
        appearance?: AlertVariants['appearance'];
        showIcon?: boolean;
        dismissable?: boolean;
        dismissLabel?: string;
        open?: boolean;
    }>(),
    {
        variant: 'default',
        appearance: 'default',
        showIcon: true,
        dismissable: false,
        open: undefined,
    },
);
const emit = defineEmits<{ 'update:open': [value: boolean]; dismiss: [] }>();
const localOpen = ref(true);
const visible = computed(() => props.open ?? localOpen.value);
const { trans } = useI18n();
function dismiss() {
    localOpen.value = false;
    emit('update:open', false);
    emit('dismiss');
}
const slots = useSlots();
const statusIcon = computed(() => {
    if (props.appearance === 'soft') {
        return {
            default: IconInfoCircle,
            accent: IconInfoCircle,
            info: IconInfoCircle,
            success: IconCircleCheck,
            warning: IconAlertTriangle,
            danger: IconCircleX,
        }[props.variant ?? 'default'];
    }

    return {
        default: IconInfoCircleFilled,
        accent: IconInfoCircleFilled,
        info: IconInfoCircleFilled,
        success: IconCircleCheckFilled,
        warning: IconAlertTriangleFilled,
        danger: IconAlertHexagonFilled,
    }[props.variant ?? 'default'];
});
function isIcon(node: VNode): boolean {
    if (node.type === 'svg') return true;
    const type = node.type as {
        name?: string;
        __name?: string;
        displayName?: string;
        props?: unknown;
    };
    if (/^Icon/.test(type?.name ?? type?.__name ?? '')) return true;
    // Tabler exports functional components named "component", with a stable displayName/prop contract.
    return (
        !!type?.displayName &&
        Array.isArray(type.props) &&
        type.props.includes('size') &&
        type.props.includes('stroke')
    );
}
function containsIcon(nodes: VNode[]): boolean {
    return nodes.some(
        (node) =>
            isIcon(node) ||
            (node.type === Fragment &&
                Array.isArray(node.children) &&
                containsIcon(node.children as VNode[])),
    );
}
function hasLeadingIcon(): boolean {
    return containsIcon(slots.default?.() ?? []);
}
</script>
