<template>
    <div class="attr-table">
        <div class="table-list">
            <template v-for="([name, prop], idx) of Object.entries(props.props)" :key="idx">
                <div class="list-row">
                    <div class="row-cell cell-code"><code>{{ name }}</code></div>
                    <div class="row-cell cell-text">{{ prop.text }}</div>
                    <template v-if="prop.type">
                        <div class="row-cell cell-type" v-if="typeof prop.type == 'string'">
                            <code>{{ prop.type }}</code>
                        </div>
                        <div class="row-cell cell-type" v-else>
                            <template v-for="([key, val]) of Object.entries(prop.type)" :key="`${idx}-${key}`">
                                <code v-if="(typeof val != 'object' || val == null)">{{ key }}</code>
                                <button type="button" @click="onSetActive(idx, key)" :class="`${idx}-${key}` == activeType ? 'is-active' : ''" v-else>
                                    <code>{{ key }}</code>
                                </button>
                            </template>
                        </div>
                    </template>
                </div>

                <template v-if="prop.type">
                    <template v-for="([key, val]) of Object.entries(prop.type)" :key="`${idx}-${key}-type`">
                        <template v-if="typeof val == 'object' && val != null">
                            <div class="list-row row-typings" :class="`${idx}-${key}` == activeType ? 'is-visible' : ''">
                                <div class="row-cell cell-typing-name">
                                    <code>{{ key }}</code>
                                </div>
                                <div class="row-cell cell-typing-value">
                                    <template v-if="Array.isArray(val)">
                                        <template v-for="(v) of val">
                                            <code>{{ v }}</code>
                                        </template>
                                    </template>
                                    <code v-else>{{ val }}</code>
                                </div>
                            </div>
                        </template>
                    </template>
                </template>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
export interface SourceProp {
    text: string;
    type?: string | { [key: string]: any };
}

/**
 * Miru Source Properties
 */
 export interface MiruSourceProps {
    /**
     * The desired properties to show.
     */
     props: { [name: string]: {
        text: string;
        type?: string;
     } };
}
</script>

<script lang="ts" setup>
import { ref } from 'vue';

// Define Component
const props = defineProps<MiruSourceProps>();

// States
const activeType = ref<string|null>();

/**
 * Set Typing Row Active
 * @param idx 
 * @param key 
 */
function onSetActive(idx: number, name: string) {
    let key = `${idx}-${name}`;
    if (activeType.value == key) {
        activeType.value = null;
    } else {
        activeType.value = key;
    }
}
</script>

<style scoped>
.attr-table {
    @apply w-full flex flex-col;
}

.table-list {
    @apply flex flex-col border border-solid rounded-lg;
    border-color: var(--vp-c-border);
}

.table-list .list-row {
    @apply flex flex-col lg:flex-row;

    &:not(:first-child):not(.row-typings) {
        @apply border-t border-solid;
        border-color: var(--vp-c-border);
    }

    &.row-typings {
        &:not(.is-visible) {
            @apply hidden;
        }
    }
    
    & .row-cell {
        @apply flex-1 text-sm px-4 py-2;
    }

    & .row-cell.cell-type {
        @apply flex flex-row flex-wrap items-center gap-2 text-xs;
        background-color: var(--vp-c-bg-alt);

        & code {
            @apply text-xs;
        }

        & button.is-active {
            @apply opacity-50;
        }
        
        & button code {
            color: var(--vp-c-bg);
            background-color: var(--vp-code-color);
        }
    }

    & .row-cell.cell-typing-name {
        background-color: var(--vp-c-bg-alt);
    }

    & .row-cell.cell-typing-value {
        @apply flex flex-row flex-wrap gap-2 overflow-y-auto whitespace-nowrap;
        background-color: var(--vp-c-bg-alt);
    }

    @screen lg {
        & .row-cell.cell-code {
            flex: 0 0 180px;
        }

        & .row-cell.cell-type {
            @apply text-end;
            flex: 0 0 150px;
        }

        & .row-cell.cell-typing-name {
            flex: 0 0 180px;
        }
    }
}
</style>
