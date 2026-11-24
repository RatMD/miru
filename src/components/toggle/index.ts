import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

export { default as Toggle } from './Toggle.vue';

/** Shared outer dimensions for standalone toggles and segmented groups. */
export const toggleFrameVariants = cva(
    'inline-flex w-fit shrink-0 items-center rounded-md bg-neutral-200 p-1 dark:bg-neutral-800',
    {
        variants: {
            size: { sm: 'h-8 rounded p-[3px]', default: 'h-9', lg: 'h-10' },
        },
        defaultVariants: { size: 'default' },
    },
);

const lightSelection =
    'data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm data-[state=on]:hover:bg-background';
const darkSelection =
    'data-[state=on]:bg-default data-[state=on]:text-default-foreground data-[state=on]:shadow-sm data-[state=on]:hover:bg-default-hover data-[state=on]:active:bg-neutral-900';

/** Shared inner surfaces; groups adjust the rounding at their outer edges. */
export const toggleVariants = cva(
    "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 bg-transparent font-medium whitespace-nowrap text-muted-foreground transition-[background-color,color,box-shadow] duration-150 outline-none hover:bg-background/70 hover:text-foreground focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-ring/50 active:bg-background disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-2 aria-invalid:ring-danger/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    {
        variants: {
            variant: {
                default: lightSelection,
                dark: darkSelection,
                /** @deprecated Use default for the light selection style. */
                outline: lightSelection,
            },
            size: {
                sm: 'h-[26px] min-w-[26px] rounded-[3px] px-2 text-xs',
                default: 'h-7 min-w-7 rounded px-2.5 text-sm',
                lg: 'h-8 min-w-8 rounded px-3 text-sm',
            },
            iconOnly: { true: 'aspect-square px-0', false: '' },
        },
        defaultVariants: { variant: 'default', size: 'default', iconOnly: false },
    },
);

export type ToggleVariants = VariantProps<typeof toggleVariants>;
