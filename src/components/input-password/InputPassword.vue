<template>
    <InputGroup :class="wrapperClass" :size="size" :data-disabled="disabled">
        <InputGroupInput
            v-bind="$attrs"
            v-model="modelValue"
            :type="visible ? 'text' : 'password'"
            :size="size"
            :disabled="disabled"
            :readonly="readonly"
            :class="props.class" />
        <InputGroupAddon v-if="showIcon">
            <IconKey class="size-4" aria-hidden="true" />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
            <InputGroupButton
                type="button"
                :size="size === 'sm' ? 'icon-xs' : 'icon-sm'"
                :disabled="disabled || readonly"
                :title="actionLabel"
                :aria-label="actionLabel"
                :aria-pressed="visible"
                @click="visible = !visible">
                <IconEyeOff v-if="visible" class="size-4 shrink-0" aria-hidden="true" />
                <IconEye v-else class="size-4 shrink-0" aria-hidden="true" />
            </InputGroupButton>
        </InputGroupAddon>
    </InputGroup>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { IconEye, IconEyeOff, IconKey } from '@tabler/icons-vue';
import { computed, ref } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '../input-group';
defineOptions({ inheritAttrs: false });

const props = defineProps<{
    size?: 'default' | 'sm' | 'lg';
    disabled?: boolean;
    showIcon?: boolean;
    class?: HTMLAttributes['class'];
    wrapperClass?: HTMLAttributes['class'];
    readonly?: boolean;
}>();

const modelValue = defineModel<string | number>();
const visible = ref(false);
const actionLabel = computed(() =>
    trans(
        visible.value ? 'common.accessibility.hide_password' : 'common.accessibility.show_password',
    ),
);

const { trans } = useI18n();
</script>
