export type FilterBadgeSize = 'sm' | 'default' | 'lg';
export const filterBadgeMetrics = {
    sm: { height: 24, more: 28 },
    default: { height: 28, more: 32 },
    lg: { height: 32, more: 36 },
} as const;
