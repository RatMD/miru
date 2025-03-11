<template>
    <slot name="before" v-bind="pass" />

    <div class="form-wizard">
        <div class="form-wizard-pages" :style="styles">
            <slot name="default" v-bind="props" :prev="onPrev" :next="onNext" :cancel="onCancel" :submit="onSubmit" />
        </div>

        <template v-if="$slots.controls || props.controls">
            <slot name="controls" v-bind="pass">
                <div class="form-wizard-controls">
                    <div class="control-prev">
                        <button type="button" class="button-primary" @click="onPrev" :disabled="current <= 0">
                            <LucideArrowLeft :stroke-width="1.5" />
                        </button>
                    </div>
        
                    <div class="control-save">
                        <button type="button" class="button-success" @click="onSubmit" :disabled="current == 0 || current != (total-1)">
                            <LucideCheckSign :stroke-width="1.5" />
                        </button>
                    </div>
        
                    <div class="control-next">
                        <button type="button" class="button-primary" @click="onNext" :disabled="current >= (total-1)">
                            <LucideArrowRight :stroke-width="1.5" />
                        </button>
                    </div>
                </div>
            </slot>
        </template>
    </div>

    <slot name="after" v-bind="pass" />
</template>

<script lang="ts">
import type FormWizardPage from './FormWizardPage.vue';
import type { FormHandler } from '../../composables/use-form';

/**
 * FormWizard Properties
 */
export interface FormWizardProps {
    /**
     * FormWizard Form Handler.
     */
    form: FormHandler<any>;

    /**
     * Whether to show or hide the default wizard control actions (defaults to true).
     */
    controls?: boolean;
}

/**
 * FormWizard Slots
 */
export interface FormWizardSlotProps extends FormWizardProps {
    /**
     * Total number of available and valid FormWizardPage components.
     */
    total: number;

    /**
     * The current FormWizardPage (starting with 0).
     */
    current: number;

    /**
     * Current FormWizard Form Handler.
     */
    form: FormHandler<any>;
    
    /**
     * Previous Page Handler
     */
    prev(): void;

    /**
     * Next Page Handler
     */
    next(): void;

    /**
     * Submit Page Handler
     */
    submit(): void;

    /**
     * Cancel Page Handler
     */
    cancel(): void;
}

export interface FormWizardSlots {
    /**
     * The collection of available form wizard pages.
     */
    default(props: Omit<FormWizardSlotProps, 'total' | 'current'>): InstanceType<typeof FormWizardPage>[];

    /**
     * Custom FormWizard control components.
     */
    controls(props: FormWizardSlotProps): any;

    /**
     * Additional content above / before the FormWizard.
     */
    before(props: FormWizardSlotProps): any;

    /**
     * Additional content below / after the FormWizard.
     */
    after(props: FormWizardSlotProps): any;
}

/**
 * FormWizard Events
 */
export interface FormWizardEmits {
    /**
     * Event handler when whole FormWizard gets submitted.
     */
    (ev: 'submit'): void;
    
    /**
     * Event handler when whole FormWizard gets canceled.
     */
    (ev: 'cancel'): void;

    /**
     * Event handler when previous FormWizardPage gets shown.
     */
    (ev: 'prev'): void;
    
    /**
     * Event handler when next FormWizardPage gets shown.
     */
    (ev: 'next'): void;
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'FormWizard'
}
</script>

<script lang="ts" setup>
import LucideArrowLeft from '../lucide/ArrowLeft.vue';
import LucideArrowRight from '../lucide/ArrowRight.vue';
import LucideCheckSign from '../lucide/CheckSign.vue';
import { computed, ref } from 'vue';

// Define Component
const props = withDefaults(defineProps<FormWizardProps>(), {
    controls: true
});
const emits = defineEmits<FormWizardEmits>();
const slots = defineSlots<FormWizardSlots>();

// States
const current = ref<number>(0);
const pages = computed<InstanceType<typeof FormWizardPage>[]>(
    () => slots.default({ 
        prev: onPrev,
        next: onNext,
        cancel: onCancel,
        submit: onSubmit,
        ...props, 
    }).filter((slot: any) => slot.type != Symbol.for('v-cmt'))
);
const page = computed<InstanceType<typeof FormWizardPage>>(() => pages.value[current.value]);
const total = computed<number>(() => pages.value.length);
const styles = computed(() => ({ transform: `translateX(-${100 * (current.value)}%)` }));

const pass = computed<FormWizardSlotProps>(() => ({
    //@todo Why is total and current null on #controls slot
    total: total.value,
    current: current.value,
    prev: onPrev,
    next: onNext,
    cancel: onCancel,
    submit: onSubmit,
    ...props
}));

/**
 * Go to previous page
 */
function onPrev() {
    if (!page.value || current.value <= 0) {
        return false;
    } else {
        current.value -= 1;
        emits('prev');
    }
}

/**
 * Go to next page
 */
function onNext() {
    if (!page.value || current.value >= (total.value-1)) {
        return false;
    }

    //@todo Why is page.value.validate not available, when triggered by a next() call inside a FormPageWizard?
    let result = true;
    if (typeof page.value.validate == 'function') {
        result = page.value.validate();
    } else if (typeof (page.value as any).props != 'undefined' && Array.isArray((page.value as any).props.validation)) {
        let temp = props.form.validate((page.value as any).props.validation);
        result = temp.valid;
    }

    if (!result) {
        props.form.touch();
        return false;
    } else {
        props.form.untouch();
        current.value += 1;
        emits('next');
    }
}

/**
 * Cancel Form Wizard
 */
function onCancel() {
    emits('cancel');
}

/**
 * Cancel Form Wizard
 */
function onSubmit() {
    emits('submit');
}

// Expose Component
defineExpose({
    pages,
    page,
    total,
    current,
    prev: onPrev,
    next: onNext,
    cancel: onCancel,
    submit: onSubmit
});
</script>

<style scoped>
.form-wizard {
    @apply w-full h-full overflow-hidden relative;
}

.form-wizard-pages {
    @apply h-full flex flex-row whitespace-nowrap flex-nowrap;
    @apply duration-200 ease-in-out transition-transform;
}

.form-wizard-controls {
    @apply absolute left-0 right-0 bottom-0;

    @screen lg {
        max-width: 600px;
        margin: 0 auto;
    }

    & .control-prev {
        @apply left-0 bottom-0 absolute;
    }
    
    & .control-save {
        @apply left-1/2 bottom-0 absolute -translate-x-1/2;
    }
    
    & .control-next {
        @apply right-0 bottom-0 absolute;
    }

    & button {
        @apply w-12 h-12 flex items-center justify-center rounded-full border border-solid;
        @apply duration-200 ease-in-out transition-colors;
        @apply border-zinc-300 dark:border-zinc-700;
        
        &.button-primary:disabled {
            @apply border-zinc-400 bg-zinc-200 text-zinc-500;
            @apply dark:border-zinc-600 dark:bg-zinc-800;
        }

        &.button-success {
            @apply border-primary-700 bg-primary-600 text-primary-50;
            @apply dark:border-primary-600 dark:bg-primary-700 dark:text-primary-50;
        }

        &.button-success:disabled {
            @apply border-primary-300 bg-primary-300  text-primary-50;
            @apply dark:border-primary-800 dark:bg-primary-800  dark:text-primary-200;
        }
    }
}
</style>
