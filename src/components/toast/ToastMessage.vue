<template>
    <ToastRoot
        :toast="item"
        :duration="options.duration ?? host.duration"
        :type="options.important ? 'foreground' : 'background'"
        data-slot="toast-message"
        :data-toast-id="item.id"
        :data-type="notification.type"
        :data-testid="options.testId"
        :data-rich-colors="options.richColors ?? host.richColors"
        :data-close-position="host.closeButtonPosition"
        :class="
            cn(
                'miru-toast-message',
                options.class,
                options.classes?.toast,
                options.classes?.[notification.type === 'message' ? 'toast' : notification.type],
            )
        "
        :style="options.style"
        @escape-key-down="escape"
        @swipe-start="swipe"
        @swipe-end="manual">
        <component
            v-if="item.data?.custom"
            :is="item.data.custom"
            :id="notification.id"
            :toast="notification"
            :dismiss="close" />
        <div
            v-else
            data-slot="toast-surface"
            :style="options.style"
            :class="
                cn(
                    'miru-toast-surface',
                    surface.toast,
                    options.class,
                    options.classes?.toast,
                    options.classes?.[
                        notification.type === 'message' ? 'toast' : notification.type
                    ],
                )
            ">
            <div
                v-if="hasIcon"
                data-slot="toast-icon"
                :class="cn('miru-toast-icon', options.classes?.icon)">
                <slot :name="`${notification.type}-icon`" :toast="notification">
                    <component
                        v-if="customIcon && !isVNode(customIcon)"
                        :is="customIcon"
                        class="size-[21px]"
                        aria-hidden="true" />
                    <ToastValue v-else-if="customIcon && isVNode(customIcon)" :value="customIcon" />
                    <span v-else class="miru-toast-icon-box" :class="iconClass">
                        <component
                            :is="icons[notification.type]"
                            class="size-[21px]"
                            :class="notification.type === 'loading' && 'animate-spin'"
                            aria-hidden="true" />
                    </span>
                </slot>
            </div>
            <div
                data-slot="toast-content"
                :class="cn('miru-toast-content', options.classes?.content)">
                <ToastTitle
                    v-if="notification.title !== undefined && notification.title !== ''"
                    data-slot="toast-title"
                    :class="
                        cn(
                            'font-heading text-[13px]/[18px] font-semibold',
                            surface.title,
                            options.classes?.title,
                        )
                    ">
                    <ToastValue :value="notification.title" />
                </ToastTitle>
                <ToastDescription
                    v-if="options.description !== undefined && options.description !== ''"
                    data-slot="toast-description"
                    :class="
                        cn(
                            'mt-0.5 whitespace-pre-wrap font-heading text-xs/[17px] font-semibold',
                            surface.description,
                            options.descriptionClass,
                            options.classes?.description,
                        )
                    ">
                    <ToastValue :value="options.description" />
                </ToastDescription>
                <div
                    v-if="options.action || options.cancel"
                    data-slot="toast-actions"
                    class="mt-3 flex flex-wrap items-center gap-2">
                    <ToastAction
                        v-if="options.action"
                        as-child
                        :alt-text="options.action.altText || actionLabel(options.action)"
                        :close-on-click="false">
                        <Button
                            size="xs"
                            variant="default"
                            :style="options.action.actionButtonStyle ?? options.actionButtonStyle"
                            :class="options.classes?.actionButton"
                            @click="runAction($event, options.action)">
                            <ToastValue :value="options.action.label" />
                        </Button>
                    </ToastAction>
                    <ToastAction
                        v-if="options.cancel"
                        as-child
                        :alt-text="options.cancel.altText || actionLabel(options.cancel)"
                        :close-on-click="false">
                        <Button
                            size="xs"
                            variant="outline"
                            :style="options.cancel.actionButtonStyle ?? options.cancelButtonStyle"
                            :class="options.classes?.cancelButton"
                            @click="runAction($event, options.cancel)">
                            <ToastValue :value="options.cancel.label" />
                        </Button>
                    </ToastAction>
                </div>
            </div>
            <ToastClose
                v-if="options.dismissible !== false && (options.closeButton ?? host.closeButton)"
                :aria-label="options.closeButtonAriaLabel || trans('common.toast.close')"
                :class="cn('miru-toast-close', surface.closeButton, options.classes?.closeButton)"
                @click.capture="manual">
                <slot name="close-icon" :toast="notification">
                    <component :is="host.icons?.close || IconX" class="size-4" aria-hidden="true" />
                </slot>
            </ToastClose>
        </div>
    </ToastRoot>
</template>
<script setup lang="ts">
import type { ToastRecord } from './toast';
import type { ToastAction as Action, ToasterProps } from './types';
import type { ToastObject } from 'reka-ui';
import {
    IconAlertHexagonFilled,
    IconAlertTriangleFilled,
    IconCircleCheckFilled,
    IconInfoCircleFilled,
    IconLoader2,
    IconX,
} from '@tabler/icons-vue';
import {
    ToastRoot,
    ToastTitle,
    ToastDescription,
    ToastAction,
    ToastClose,
    useToastManager,
} from 'reka-ui';
import { computed, isVNode } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { cn } from '../../support/classNames';
import { Button } from '../button';
import { toastAppearanceClasses } from './appearance';
import { markToastDismissed } from './toast';
import ToastValue from './ToastValue.vue';
const props = defineProps<{ item: ToastObject<ToastRecord>; host: ToasterProps }>();
const { close: closeManaged } = useToastManager();
const { trans } = useI18n();
const notification = computed(() => props.item.data!.notification);
const options = computed(() => ({
    ...props.host.toastOptions,
    ...(Object.fromEntries(
        Object.entries(notification.value).filter(([, value]) => value !== undefined),
    ) as typeof notification.value),
    classes: { ...props.host.toastOptions?.classes, ...notification.value.classes },
}));
const surface = computed(() => toastAppearanceClasses[props.host.appearance || 'frost']);
const icons = {
    success: IconCircleCheckFilled,
    info: IconInfoCircleFilled,
    warning: IconAlertTriangleFilled,
    error: IconAlertHexagonFilled,
    loading: IconLoader2,
    message: IconInfoCircleFilled,
};
const customIcon = computed(() =>
    options.value.icon === false
        ? false
        : (options.value.icon ??
          props.host.icons?.[
              notification.value.type as Exclude<typeof notification.value.type, 'message'>
          ]),
);
const hasIcon = computed(
    () =>
        options.value.icon !== false &&
        (notification.value.type !== 'message' || !!customIcon.value),
);
const iconClass = computed(
    () =>
        ({
            success: 'bg-success-100 text-success-600 dark:bg-success-950 dark:text-success-400',
            info: 'bg-info-100 text-info-600 dark:bg-info-950 dark:text-info-400',
            warning: 'bg-warning-100 text-warning-600 dark:bg-warning-950 dark:text-warning-400',
            error: 'bg-danger-100 text-danger-600 dark:bg-danger-950 dark:text-danger-400',
            loading: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300',
            message: 'bg-gray-100 text-gray-600',
        })[notification.value.type],
);
function manual() {
    markToastDismissed(props.host.id, props.item.id);
}
function close() {
    manual();
    closeManaged(props.item.id);
}
function escape(event: KeyboardEvent) {
    if (options.value.dismissible === false) event.preventDefault();
    else manual();
}
function swipe(event: Event) {
    if (options.value.dismissible === false) event.preventDefault();
}
function actionLabel(action: Action) {
    return (
        action.altText ||
        (typeof action.label === 'string' ? action.label : trans('common.toast.label'))
    );
}
function runAction(event: MouseEvent, action: Action) {
    action.onClick?.(event);
    if (action.closeOnClick !== false && !event.defaultPrevented) {
        if (event.detail === 0)
            (event.currentTarget as HTMLElement)?.closest<HTMLElement>('.miru-toaster')?.focus();
        close();
    }
}
</script>
