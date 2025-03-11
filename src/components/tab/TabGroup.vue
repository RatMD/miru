<template>
    <div class="tab-group" :class="[
        `group-active-${activeIdx}`,
        props.bordered ? `group-bordered` : '',
    ]">
        <nav class="group-tabs" role="tablist">
            <template v-for="(pane, idx) of groupPanes" :key="`${groupId}-tab-${idx}`">
                <button type="button" 
                    role="tab" 
                    class="tab-item" 
                    ref="groupTabs"
                    :class="groupStates[idx] ? 'is-active' : ''"
                    :aria-controls="`${groupId}-pane-${idx}`" 
                    :aria-selected="groupStates[idx] ? 'true' : 'false'"
                    @click="onShow(idx)">
                    <component :is="pane" :id="`${groupId}-tab-${idx}`" type="header" />
                </button>
            </template>
            <span ref="activeLine" class="tab-active-line" :style="activeStyles" v-if="!props.bordered"></span>
        </nav>

        <div class="group-panes">
            <component v-for="(pane, idx) of groupPanes" :key="`${groupId}-pane-${idx}`"
                :is="pane" 
                :id="`${groupId}-pane-${idx}`"
                type="content"
                v-model:visible="groupStates[idx]" />
        </div>
    </div>
</template>

<script lang="ts">
/**
 * TabGroup Properties
 */
export interface TabGroupProps {
    /**
     * A custom tab group id, used for a11y purposes only, also passed to the single tab panes.
     * Default value is an auto-generated UUID.
     */
    id?: string;

    /**
     * Whether to use the default or the bordered navigation style.
     */
    bordered?: boolean;
}

/**
 * TabGroup Slots
 */
export interface TabGroupSlots {
    /**
     * Primary tab group slot, must provide the desired TabPane components only.
     * @param props 
     */
    default(props: TabGroupProps): InstanceType<typeof TabPane>[];
}

// Default Export, used for IDE-related auto-import features
export default {
    name: 'TabGroup'
}
</script>

<script lang="ts" setup>
import { computed, nextTick, reactive, ref, watch } from 'vue';
import TabPane from './TabPane.vue';
import uuid from '../../utils/uuid';

// Define Component
const props = defineProps<TabGroupProps>();
const slots = defineSlots<TabGroupSlots>();

// States
const groupId = computed<string>(() => props.id || `accordion-${uuid().replace(/-/g, '')}`);
const groupTabs = ref<HTMLElement[]>();
const groupPanes = ref<InstanceType<typeof TabPane>[]>([]);
const groupStates = reactive<{ [key: string]: boolean }>({});

const activeIdx = ref<number>(0);
const activeLine = ref<HTMLElement>();
const activeStyles = reactive<{ left: string, width: string }>({
    left: '0px',
    width: '0px',
});

/**
 * Watch Slot Content
 */
watch(() => slots.default(props), newValue => {
    newValue.map((tab, idx) => {
        groupStates[idx] = idx === 0 ? true : false;
    });
    groupPanes.value = newValue;
}, { immediate: true });

/**
 * Watch Group States
 */
watch([groupStates, groupTabs], async () => {
    if (!groupTabs.value || !activeLine.value) {
        return;
    }
    await nextTick();
    
    const activeTab = groupTabs.value.find(el => el.classList.contains('is-active'));
    if (activeTab) {
        const rect = activeTab.getBoundingClientRect();
        activeStyles.left = `${rect.left}px`;
        activeStyles.width = `${rect.width}px`;
    } else {
        activeStyles.width = '0px';
    }
}, { immediate: true });

/**
 * Show event listener
 * @param idx 
 */
function onShow(idx: number) {
    activeIdx.value = idx;
    for (const [key, state] of Object.entries(groupStates)) {
        if (key != idx.toString() && state) {
            groupStates[key] = false;
        } else if (key == idx.toString()) {
            groupStates[key] = true;
        }
    }
}
</script>

<style scoped>
.tab-group {
    @apply flex flex-col;
}

.group-tabs {
    @apply relative flex flex-row;
}

.tab-item {
    @apply flex flex-row gap-2 items-center;
}

/** Default Navigation Style */
.tab-group:not(.group-bordered) .group-tabs {
    @apply border-b border-solid;
    @apply border-gray-300 dark:border-gray-600;

    & .tab-item {
        @apply px-3 py-2;
        @apply duration-200 ease-in-out transition-colors;
        @apply text-gray-400 dark:text-gray-600;
    
        &:hover {
            @apply text-primary-600 dark:text-primary-500;
        }
        
        &.is-active {
            @apply text-gray-800 dark:text-gray-200;
        }
    }

    & .tab-active-line {
        @apply absolute -bottom-px h-0.5 pointer-events-none;
        @apply duration-200 ease-in-out;
        @apply bg-gray-800 dark:bg-gray-300;
        transition-property: width, left;
    }
}

/** Bordered Navigation Style */
.tab-group.group-bordered .group-tabs {
    & .tab-item {
        @apply px-3 py-2 border border-solid rounded-t-lg -mb-px;
        @apply duration-200 ease-in-out;
        @apply text-gray-400 dark:text-gray-500;

        &:not(.is-active) {
            @apply border-transparent;
        }

        &:hover {
            @apply text-gray-800 bg-gray-100 border-b-gray-300;
            @apply dark:text-gray-200 dark:bg-gray-600;
        }

        &.is-active {
            @apply text-gray-800 bg-transparent border-gray-300 border-b-white;
        }
    }
}

.tab-group.group-bordered .group-panes {
    @apply border border-solid rounded-lg;
    @apply border-gray-300 dark:border-gray-600;
}

.tab-group.group-bordered.group-active-0 .group-panes {
    @apply rounded-tl-none;
}
</style>
