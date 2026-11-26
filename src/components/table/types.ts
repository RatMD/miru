import type { Component, MaybeRefOrGetter } from 'vue';

export type TableText = MaybeRefOrGetter<string>;
export type TableAlign = 'left' | 'center' | 'right';

export interface TableCountDefinition {
    key: string;
    label?: TableText;
    labelKey?: string;
    icon?: Component;
}

export interface TableStatusDefinition {
    label?: TableText;
    labelKey?: string;
    containerClass?: string;
    colorClass?: string;
    icon?: Component;
}

export interface TableAddressLike {
    company_name?: string | null;
    recipient_name?: string | null;
    street?: string | null;
    house_number?: string | null;
    address_addition?: string | null;
    postal_code?: string | null;
    city?: string | null;
    state?: string | { name?: string | null } | null;
    country?: string | { name?: string | null } | null;
}
