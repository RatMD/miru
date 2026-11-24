import type { VariantProps } from 'class-variance-authority';
import type { ComputedRef, InjectionKey } from 'vue';
import { cva } from 'class-variance-authority';

export { default as InputGroup } from './InputGroup.vue';
export { default as InputGroupAddon } from './InputGroupAddon.vue';
export { default as InputGroupButton } from './InputGroupButton.vue';
export { default as InputGroupInput } from './InputGroupInput.vue';
export { default as InputGroupText } from './InputGroupText.vue';
export { default as InputGroupTextarea } from './InputGroupTextarea.vue';

export const inputGroupSizeKey: InjectionKey<ComputedRef<'sm' | 'default' | 'lg'>> =
    Symbol('InputGroupSize');

export const inputGroupAddonVariants = cva(
    "flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--ui-radius)-5px)] [&>svg:not([class*='size-'])]:size-4",
    {
        variants: {
            align: {
                'inline-start': 'order-first py-0 pl-3 has-[>button]:pl-1 has-[>kbd]:pl-1',
                'inline-end': 'order-last py-0 pr-3 has-[>button]:pr-1 has-[>kbd]:pr-1',
                'block-start':
                    'order-first w-full justify-start px-3 pt-3 group-has-[>input]/input-group:pt-2.5 [.border-b]:pb-3',
                'block-end':
                    'order-last w-full justify-start px-3 pb-3 group-has-[>input]/input-group:pb-2.5 [.border-t]:pt-3',
            },
        },
        defaultVariants: {
            align: 'inline-start',
        },
    },
);

export type InputGroupVariants = VariantProps<typeof inputGroupAddonVariants>;

export const inputGroupButtonVariants = cva('flex items-center gap-2 text-sm shadow-none', {
    variants: {
        size: {
            xs: "h-6 gap-1 rounded-[calc(var(--ui-radius)-5px)] px-2 has-[>svg]:px-2 [&>svg:not([class*='size-'])]:size-3.5",
            sm: 'h-8 gap-1.5 rounded-md px-2.5 has-[>svg]:px-2.5',
            'icon-xs': 'size-6 rounded-[calc(var(--ui-radius)-5px)] p-0 has-[>svg]:p-0',
            'icon-sm': 'size-8 p-0 has-[>svg]:p-0',
        },
    },
    defaultVariants: {
        size: 'xs',
    },
});

export type InputGroupButtonVariants = VariantProps<typeof inputGroupButtonVariants>;
