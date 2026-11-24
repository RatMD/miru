/** A supplied hierarchy option in depth-first order; no application model dependency. */
export interface CategoryOption {
    value: string;
    label: string;
    emoji?: string | null;
    depth?: number;
    path?: string;
    parent_id?: string | null;
    disabled?: boolean;
    group?: string;
    group_id?: string;
    count?: number;
}
