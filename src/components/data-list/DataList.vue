<template>
    <slot name="mobile" :items="items || void 0" :loading="loading" v-if="mobile" />
    <slot name="desktop" :items="items || void 0" :loading="loading" v-else />
</template>

<script lang="ts">
/**
 * Laravel-Styled Pagination Object
 */
export interface Pagination<T> {
    data: T[];
    current_page: number;
    first_page: number;
    last_page: number;
    from: number;
    to: number;
    per_page: number;
    total: number;
    path: string;
    first_page_url: null | string;
    last_page_url: null | string;
    prev_page_url: null | string;
    next_page_url: null | string;
    links: {
        active: boolean;
        label: null | string;
        url: null | string;
    }[];
}

/**
 * Generic Query Handler
 */
export interface Query {
    filter: null | any[];
    search: null | string;
    orderBy: null | {
        column: string;
        direction: 'ASC' | 'DESC';
    };
    limit: number;
    page: number;
}

/**
 * DataList Properties
 */
export interface DataListProps<T> {
    /**
     * The desired data set to be shown within this data list, can also be a function returning the 
     * data set or a promise resolving a data set.
     */
    data: (query: Query, formData: FormData) => Promise<Pagination<T>>;

    /**
     * Use a custom item limit, requires a data fetch function.
     */
    limit?: number;
    
    /**
     * Use a custom page number, requires a data fetch function.
     */
    page?: number;
}

/**
 * DataList Properties
 */
export interface DataListSlots<T> {
    /**
     * The desired mobile output
     * @param props 
     */
    mobile(props: { items?: Pagination<T>, loading: boolean; }): any;

    /**
     * The desired desktop output
     * @param props 
     */
    desktop(props: { items?: Pagination<T>, loading: boolean; }): any;
}
</script>

<script lang="ts" generic="T" setup>
import { onMounted, reactive, ref, watch } from 'vue';
import debounce from '../../utils/debounce';
import { useClient } from '../../composables/use-client';
import { BREAKPOINT_MD } from '../../constants/breakpoints';

// Define Component
const props = defineProps<DataListProps<T>>();
const slots = defineSlots<DataListSlots<T>>();

// Stores
const client = useClient();

// States
const mobile = ref<boolean>(false);
const loading = ref<boolean>(false);
const items = ref<Pagination<T>>();
const query = reactive<Query>({
    filter: null,
    search: null,
    orderBy: null,
    limit: props.limit || 10,
    page: Math.max(props.page || 1, 1),
});

// Debounced Loader
const loader = debounce(load, 350);

/**
 * Watch Client Width
 */
watch(client.width, () => {
    mobile.value = client.width.value <= BREAKPOINT_MD;
}, { immediate: true });

/**
 * Component mounted
 */
onMounted(() => {
    load();
});

/**
 * Watch Property changes
 */
watch(props, newValue => {
    if (typeof props.data != 'function') {
        return;
    }
    
    // Limit has been changed
    if (newValue.limit && newValue.limit != query.limit) {
        query.limit = newValue.limit;
    }
    
    // Page number has been changed
    if (newValue.page && newValue.page != query.page) {
        query.page = newValue.page;
    }
});

/**
 * Watch Query changes
 */
watch(query, () => {
    loader();
});

/**
 * Load Component
 */
async function load() {
    if (typeof props.data != 'function') {
        items.value = props.data;
        return;
    }

    if (loading.value) {
        return;
    }
    loading.value = true;

    try {
        const form = build(query);
        const result = await props.data(query, form);
        items.value = result;
    } catch (err) {
        console.error(err);
    } finally {
        loading.value = false;
    }
}

/**
 * Build FormData object
 * @param query
 */
function build(query: Query): FormData {
    const formData = new FormData;
    formData.set('limit', query.limit.toString());
    formData.set('page', query.page.toString());
    formData.set('search', query.search || '');
    formData.set('orderBy', query.orderBy ? `${query.orderBy.column} ${query.orderBy.direction}` : '');
    if (query.filter) {
        for (const [key, val] of Object.entries(query.filter)) {
            let index = key.indexOf('[');
            if (index >= 0) {
                formData.set(`filter[${key.slice(0, index)}]${key.slice(index)}`, val as string);
            } else {
                formData.set(`filter[${key}]`, val as string);
            }
        }
    }
    return formData;
}

/**
 * Pagination Handler - First Page
 */
function firstPage() {
    if (!items.value) {
        return;
    }

    if (items.value.current_page <= 1) {
        return;
    }

    query.page = 1;
}

/**
 * Pagination Handler - Previous Page
 */
function prevPage() {
    if (!items.value) {
        return;
    }

    if (items.value.current_page <= 1) {
        return;
    }

    query.page = items.value.current_page - 1;
}

/**
 * Pagination Handler - Next Page
 */
function nextPage() {
    if (!items.value) {
        return;
    }

    if (items.value.current_page >= items.value.last_page) {
        return;
    }

    query.page = items.value.current_page + 1;
}

/**
 * Pagination Handler - Last Page
 */
function lastPage() {
    if (!items.value) {
        return;
    }

    if (items.value.current_page >= items.value.last_page) {
        return;
    }

    query.page = items.value.last_page;
}

// Expose Component
defineExpose({
    query,
    firstPage,
    prevPage,
    nextPage,
    lastPage  
});
</script>

<style scoped>
</style>
