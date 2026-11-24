import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

export { default as Input } from './Input.vue';

export const inputVariants = cva(
    [
        'miru-field w-full min-w-0 border border-input bg-background text-foreground shadow-xs',
        'transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground',
        'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground',
        'placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
        'aria-invalid:border-danger aria-invalid:ring-danger/20 dark:aria-invalid:ring-danger/40',
    ],
    {
        variants: {
            size: {
                default: 'h-9 rounded-md px-3 py-1 text-base md:text-sm',
                sm: 'h-8 rounded px-3 py-0.5 text-base md:text-xs',
                lg: 'h-10 rounded-md px-4 py-1.5 text-base',
            },
        },
        defaultVariants: {
            size: 'default',
        },
    },
);
export type InputVariants = VariantProps<typeof inputVariants>;
