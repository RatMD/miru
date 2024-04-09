<template>
    <slot name="before" v-bind="props" :prev="onPrev" :next="onNext" :cancel="onCancel" :submit="onSubmit" />

    <div class="form-wizard">
        <div class="form-wizard-pages" :style="styles">
            <slot name="default" v-bind="props" :prev="onPrev" :next="onNext" :cancel="onCancel" :submit="onSubmit" />
        </div>

        <template v-if="$slots.controls || props.controls">
            <slot name="controls" v-bind="props" :prev="onPrev" :next="onNext" :cancel="onCancel" :submit="onSubmit">
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

    <slot name="after" v-bind="props" :prev="onPrev" :next="onNext" :cancel="onCancel" :submit="onSubmit" />
</template>

<script lang="ts">
import type FormWizardPage from './FormWizardPage.vue';
import type { FormHandler } from '../../composables/use-form';

/**
 * FormWizard Properties
 */
export interface FormWizardProps {
    /**
     * Current Form Wizard Page.
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
    default(props: FormWizardSlotProps): InstanceType<typeof FormWizardPage>[];

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

    if (!page.value.validate()) {
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
    @apply duration-300 ease-in-out transition-transform;
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
        @apply duration-300 ease-in-out transition-colors;
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

.screen-footer {
    @apply w-full h-16 left-1/2 bottom-3 fixed -translate-x-1/2 translate-y-[calc(100%+50px)] pointer-events-none;
    @apply ease-in-out duration-300;
    z-index: 100;
    transition-property: transform;

    &.active {
        @apply translate-y-0;
    }
}
.screen-nav {
    @apply flex items-center justify-center w-full h-full px-1 py-0 relative;
    z-index: 50;

    & .nav-item {
        @apply flex-1 basis-[106px];
        
        button {
            @apply py-2 rounded-lg flex items-center justify-center relative pointer-events-auto;
            @apply duration-300 ease-in-out;
            @apply bg-indigo-600 text-indigo-50;
            transition-property: background-color, color, filter, opacity;
            width: 106px;
            height: 50px;
            mask-size: contain;
            mask-repeat: no-repeat;
            mask-position: center;

            &:disabled {
                opacity: 0.5;
                filter: grayscale(0.5);
            }

            &.button-danger {
                @apply bg-red-600 text-red-50;
            }
            &.button-success {
                @apply bg-emerald-600 text-emerald-50;
            }
            &.button-primary {
                @apply bg-zinc-600 text-zinc-50;
            }
        }
    }
    & .nav-item.item-left,
    & .nav-item.item-right {
        @apply flex-grow-0 flex-shrink-0 basis-auto;
        
        button {
            z-index: 30;
        }
    }
    & .nav-item.item-left button {
        @apply pl-6 pr-8;
        mask-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMjYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM6c2VyaWY9Imh0dHA6Ly93d3cuc2VyaWYuY29tLyIgc3R5bGU9ImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoyOyI+PHBhdGggZD0iTTI1LjIxMywtMGwtMy41NDEsMi4wNThjLTAuNzIxLDAuNDgxIC0xLjM2MiwxLjUyMiAtMS4zNjIsMi40MDNsLTAsNi44MDljLTAsMC44ODEgMC41NjEsMi4wMDMgMS4zNjIsMi40MDNsMy43MjksMi4xNjdsLTE1LjczNCwwYy01LjMzNSwwIC05LjY2NywtMy41NDkgLTkuNjY3LC03LjkybC0wLC0zLjk2Yy0wLC0yLjE4NiAyLjE2NiwtMy45NiA0LjgzNCwtMy45NmwyMC4zNzksLTBaIi8+PC9zdmc+");
    }
    & .nav-item.item-right button {
        @apply pl-8 pr-6;
        mask-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMjYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM6c2VyaWY9Imh0dHA6Ly93d3cuc2VyaWYuY29tLyIgc3R5bGU9ImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoyOyI+PHBhdGggZD0iTTAuMjI3LC0wbDMuNTQxLDIuMDU4YzAuNzIxLDAuNDgxIDEuMzYyLDEuNTIyIDEuMzYyLDIuNDAzbDAsNi44MDljMCwwLjg4MSAtMC41NjEsMi4wMDMgLTEuMzYyLDIuNDAzbC0zLjcyOSwyLjE2N2wxNS43MzQsMGM1LjMzNSwwIDkuNjY3LC0zLjU0OSA5LjY2NywtNy45MmwwLC0zLjk2YzAsLTIuMTg2IC0yLjE2NiwtMy45NiAtNC44MzQsLTMuOTZsLTIwLjM3OSwtMFoiLz48L3N2Zz4=");
    }
    
    & .nav-item.item-primary {
        @apply flex-grow-0 flex-shrink-0 basis-auto;
        
        button {
            @apply w-auto px-0 -mx-4;
            height: 56px;
            width: 56px;
            z-index: 50;
            mask-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTgyJyBoZWlnaHQ9JzIwMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cGF0aCBkPSdNLjMgNjUuNDg2YzAtOS4xOTYgNi42ODctMjAuMDYzIDE0LjIxMS0yNS4wNzhsNjEuODYtMzUuOTQ2YzguMzYtNS4wMTYgMjAuODk5LTUuMDE2IDI5LjI1OCAwbDYxLjg2IDM1Ljk0NmM4LjM2IDUuMDE1IDE0LjIxMSAxNS44ODIgMTQuMjExIDI1LjA3OHY3MS4wNTVjMCA5LjE5Ni02LjY4NyAyMC4wNjMtMTQuMjExIDI1LjA3OWwtNjEuODYgMzUuOTQ1Yy04LjM2IDQuMTgtMjAuODk5IDQuMTgtMjkuMjU4IDBMMTQuNTEgMTYxLjYyQzYuMTUxIDE1Ny40NC4zIDE0NS43MzcuMyAxMzYuNTRWNjUuNDg2WicgZmlsbD0nYmxhY2snIGZpbGwtcnVsZT0nbm9uemVybycvPjwvc3ZnPg==");
        }
    }
}
</style>
