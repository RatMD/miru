import type { Component } from 'vue';
export interface CommandFilter {
    value: string;
    label: string;
}
export interface CommandItem {
    value: string;
    label: string;
    description?: string;
    group?: string;
    type?: string;
    keywords?: readonly string[];
    icon?: Component;
    shortcut?: string;
    disabled?: boolean;
}
