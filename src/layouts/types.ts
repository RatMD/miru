import type { ButtonVariants } from '../components/button';
import type { Component } from 'vue';

/** Host-owned, already translated action; filtered for permissions before rendering. */
export interface FormPageAction {
    id: string;
    label: string;
    icon?: Component;
    variant?: NonNullable<ButtonVariants['variant']>;
    disabled?: boolean;
}

/** Already translated host navigation; groups with children open a submenu. */
export interface DashboardNavigationItem {
    id: string;
    label: string;
    href?: string;
    icon?: Component;
    badge?: string | number;
    active?: boolean;
    disabled?: boolean;
    children?: readonly DashboardNavigationItem[];
}

export interface DashboardNavigationGroup {
    id: string;
    label?: string;
    boxed?: boolean;
    items: readonly DashboardNavigationItem[];
}

export interface DashboardBreadcrumb {
    label: string;
    href?: string;
}
