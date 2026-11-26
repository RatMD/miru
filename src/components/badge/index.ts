import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

export { default as Badge } from './Badge.vue';
export { default as BadgePart } from './BadgePart.vue';
export { default as BadgeSeparator } from './BadgeSeparator.vue';

/** The same semantic colors as Button. */
export const badgeColorVariants = [
    'default',
    'primary',
    'secondary',
    'accent',
    'outline',
    'ghost',
    'danger',
    'warning',
    'success',
    'info',
    'ghostly',
] as const;

// Literal palette classes keep Tailwind extraction and host palette overrides working.
const badgePalette = [
    {
        variant: 'default',
        auto: 'border-transparent bg-neutral-950 text-white data-[interactive=true]:hover:bg-neutral-800 dark:border-neutral-400/30 dark:bg-neutral-400/10 dark:text-neutral-300 dark:data-[interactive=true]:hover:bg-neutral-400/20',
        solid: 'border-transparent bg-neutral-950 text-white data-[interactive=true]:hover:bg-neutral-800',
        soft: 'border-neutral-600/40 bg-neutral-500/10 text-neutral-700 data-[interactive=true]:hover:bg-neutral-500/20 dark:border-neutral-400/30 dark:bg-neutral-400/10 dark:text-neutral-300 dark:data-[interactive=true]:hover:bg-neutral-400/20',
    },
    {
        variant: 'primary',
        auto: 'border-transparent bg-primary-600 text-(--ui-primary-600-foreground) data-[interactive=true]:hover:bg-primary-700 data-[interactive=true]:hover:text-(--ui-primary-700-foreground) dark:border-primary-border/30 dark:bg-primary-400/10 dark:text-primary-300 dark:data-[interactive=true]:hover:bg-primary-400/20',
        solid: 'border-transparent bg-primary-600 text-(--ui-primary-600-foreground) data-[interactive=true]:hover:bg-primary-700 data-[interactive=true]:hover:text-(--ui-primary-700-foreground)',
        soft: 'border-primary-border/40 bg-primary-500/10 text-primary-700 data-[interactive=true]:hover:bg-primary-500/20 dark:border-primary-border/30 dark:bg-primary-400/10 dark:text-primary-300 dark:data-[interactive=true]:hover:bg-primary-400/20',
    },
    {
        variant: 'secondary',
        auto: 'border-transparent bg-secondary-600 text-(--ui-secondary-600-foreground) data-[interactive=true]:hover:bg-secondary-700 data-[interactive=true]:hover:text-(--ui-secondary-700-foreground) dark:border-secondary-border/30 dark:bg-secondary-400/10 dark:text-secondary-300 dark:data-[interactive=true]:hover:bg-secondary-400/20',
        solid: 'border-transparent bg-secondary-600 text-(--ui-secondary-600-foreground) data-[interactive=true]:hover:bg-secondary-700 data-[interactive=true]:hover:text-(--ui-secondary-700-foreground)',
        soft: 'border-secondary-border/40 bg-secondary-500/10 text-secondary-700 data-[interactive=true]:hover:bg-secondary-500/20 dark:border-secondary-border/30 dark:bg-secondary-400/10 dark:text-secondary-300 dark:data-[interactive=true]:hover:bg-secondary-400/20',
    },
    {
        variant: 'accent',
        auto: 'border-transparent bg-accent-600 text-(--ui-accent-600-foreground) data-[interactive=true]:hover:bg-accent-700 data-[interactive=true]:hover:text-(--ui-accent-700-foreground) dark:border-accent-border/30 dark:bg-accent-400/10 dark:text-accent-300 dark:data-[interactive=true]:hover:bg-accent-400/20',
        solid: 'border-transparent bg-accent-600 text-(--ui-accent-600-foreground) data-[interactive=true]:hover:bg-accent-700 data-[interactive=true]:hover:text-(--ui-accent-700-foreground)',
        soft: 'border-accent-border/40 bg-accent-500/10 text-accent-700 data-[interactive=true]:hover:bg-accent-500/20 dark:border-accent-border/30 dark:bg-accent-400/10 dark:text-accent-300 dark:data-[interactive=true]:hover:bg-accent-400/20',
    },
    {
        variant: 'danger',
        auto: 'border-transparent bg-danger-600 text-(--ui-danger-600-foreground) data-[interactive=true]:hover:bg-danger-700 data-[interactive=true]:hover:text-(--ui-danger-700-foreground) dark:border-danger-border/30 dark:bg-danger-400/10 dark:text-danger-300 dark:data-[interactive=true]:hover:bg-danger-400/20',
        solid: 'border-transparent bg-danger-600 text-(--ui-danger-600-foreground) data-[interactive=true]:hover:bg-danger-700 data-[interactive=true]:hover:text-(--ui-danger-700-foreground)',
        soft: 'border-danger-border/40 bg-danger-500/10 text-danger-700 data-[interactive=true]:hover:bg-danger-500/20 dark:border-danger-border/30 dark:bg-danger-400/10 dark:text-danger-300 dark:data-[interactive=true]:hover:bg-danger-400/20',
    },
    {
        variant: 'warning',
        auto: 'border-transparent bg-warning-400 text-(--ui-warning-400-foreground) data-[interactive=true]:hover:bg-warning-500 data-[interactive=true]:hover:text-(--ui-warning-500-foreground) dark:border-warning-border/30 dark:bg-warning-400/10 dark:text-warning-300 dark:data-[interactive=true]:hover:bg-warning-400/20',
        solid: 'border-transparent bg-warning-400 text-(--ui-warning-400-foreground) data-[interactive=true]:hover:bg-warning-500 data-[interactive=true]:hover:text-(--ui-warning-500-foreground)',
        soft: 'border-warning-border/40 bg-warning-500/10 text-warning-700 data-[interactive=true]:hover:bg-warning-500 data-[interactive=true]:hover:text-(--ui-warning-500-foreground)/20 dark:border-warning-border/30 dark:bg-warning-400/10 dark:text-warning-300 dark:data-[interactive=true]:hover:bg-warning-400/20',
    },
    {
        variant: 'success',
        auto: 'border-transparent bg-success-600 text-(--ui-success-600-foreground) data-[interactive=true]:hover:bg-success-700 data-[interactive=true]:hover:text-(--ui-success-700-foreground) dark:border-success-border/30 dark:bg-success-400/10 dark:text-success-300 dark:data-[interactive=true]:hover:bg-success-400/20',
        solid: 'border-transparent bg-success-600 text-(--ui-success-600-foreground) data-[interactive=true]:hover:bg-success-700 data-[interactive=true]:hover:text-(--ui-success-700-foreground)',
        soft: 'border-success-border/40 bg-success-500/10 text-success-700 data-[interactive=true]:hover:bg-success-500/20 dark:border-success-border/30 dark:bg-success-400/10 dark:text-success-300 dark:data-[interactive=true]:hover:bg-success-400/20',
    },
    {
        variant: 'info',
        auto: 'border-transparent bg-info-600 text-(--ui-info-600-foreground) data-[interactive=true]:hover:bg-info-700 data-[interactive=true]:hover:text-(--ui-info-700-foreground) dark:border-info-border/30 dark:bg-info-400/10 dark:text-info-300 dark:data-[interactive=true]:hover:bg-info-400/20',
        solid: 'border-transparent bg-info-600 text-(--ui-info-600-foreground) data-[interactive=true]:hover:bg-info-700 data-[interactive=true]:hover:text-(--ui-info-700-foreground)',
        soft: 'border-info-border/40 bg-info-500/10 text-info-700 data-[interactive=true]:hover:bg-info-500/20 dark:border-info-border/30 dark:bg-info-400/10 dark:text-info-300 dark:data-[interactive=true]:hover:bg-info-400/20',
    },
] as const;

export const badgeVariants = cva(
    'miru-badge data-[interactive=true]:cursor-pointer inline-flex w-fit shrink-0 items-center justify-center overflow-hidden rounded-full border font-medium whitespace-nowrap transition-[color,background-color,border-color,box-shadow] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-danger aria-invalid:ring-danger/20 dark:aria-invalid:ring-danger/40 [&>svg]:pointer-events-none [&>svg]:shrink-0 has-[>[data-slot=badge-part]]:gap-0 has-[>[data-slot=badge-part]]:p-0',
    {
        variants: {
            variant: {
                default: '',
                primary: '',
                secondary: '',
                accent: '',
                danger: '',
                warning: '',
                success: '',
                info: '',
                outline:
                    'border-input bg-background text-foreground data-[interactive=true]:hover:bg-outline-hover',
                ghost: 'border-transparent bg-transparent text-foreground data-[interactive=true]:hover:bg-surface-hover data-[interactive=true]:hover:text-surface-hover-foreground',
                ghostly:
                    'border-transparent bg-ghostly text-ghostly-foreground data-[interactive=true]:hover:bg-ghostly-hover dark:border-neutral-400/30 dark:bg-neutral-400/10 dark:text-neutral-300 dark:data-[interactive=true]:hover:bg-neutral-400/20',
            },
            appearance: { auto: '', solid: '', soft: '' },
            size: {
                default: 'gap-1 px-2 py-0.5 text-xs [&>svg]:size-3',
                lg: 'gap-1.5 px-3 py-1 text-sm [&>svg]:size-4',
            },
        },
        compoundVariants: badgePalette.flatMap(({ variant, auto, solid, soft }) => [
            { variant, appearance: 'auto' as const, class: auto },
            { variant, appearance: 'solid' as const, class: solid },
            { variant, appearance: 'soft' as const, class: soft },
        ]),
        defaultVariants: {
            variant: 'default',
            appearance: 'auto',
            size: 'default',
        },
    },
);
export type BadgeVariants = VariantProps<typeof badgeVariants>;
