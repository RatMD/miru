export type FloatingAppBarVariant = 'five' | 'three' | 'primary';
export type FloatingAppBarShape = 'circle' | 'rounded-hexagon';
export type FloatingAppBarTone = 'accent' | 'primary' | 'success' | 'danger' | 'warning' | 'info';
export type FloatingAppBarOrientation = 'horizontal' | 'vertical' | 'auto';

/** Exact rounded path used by the Portal AppBarButton, not a polygon approximation. */
export const floatingAppBarHexagonPath =
    'M64.786 181.4c-9.196 0-20.063-6.687-25.079-14.21L3.762 105.33c-5.016-8.36-5.016-20.9 0-29.259l35.945-61.86C44.723 5.851 55.59 0 64.786 0h71.055c9.196 0 20.063 6.688 25.079 14.211l35.945 61.86c4.18 8.36 4.18 20.899 0 29.258l-35.945 61.86c-4.18 8.36-15.883 14.211-25.079 14.211H64.786Z';

export const floatingAppBarHexagonMask = `url("data:image/svg+xml,${encodeURIComponent(
    `<svg width="200" height="182" xmlns="http://www.w3.org/2000/svg"><path d="${floatingAppBarHexagonPath}" fill="black"/></svg>`,
)}")`;

/** Original Portal gradient pairs, with CSS token overrides available to the host. */
export const floatingAppBarGradients: Record<FloatingAppBarTone, string> = {
    accent: 'linear-gradient(135deg, var(--ui-accent-400), var(--ui-accent-700))',
    primary:
        'linear-gradient(135deg, var(--color-indigo-500, #6366f1), var(--color-purple-600, #9333ea))',
    success:
        'linear-gradient(135deg, var(--color-teal-500, #14b8a6), var(--color-lime-600, #65a30d))',
    danger: 'linear-gradient(135deg, var(--color-red-500, #ef4444), var(--color-fuchsia-600, #c026d3))',
    warning:
        'linear-gradient(135deg, var(--color-orange-500, #f97316), var(--color-amber-500, #f59e0b))',
    info: 'linear-gradient(135deg, var(--color-sky-500, #0ea5e9), var(--color-cyan-600, #0891b2))',
};
