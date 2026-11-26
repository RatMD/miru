import { componentDependenciesMarkdown } from './component-dependencies.ts';

export const indicatorSummary =
    'A compact status indicator for dots, counts, short labels and icons. Place it inline or over content, with flexible positioning, transparent cutouts and optional animations.';

export function indicatorDependencyMarkdown(storybook = false): string {
    return componentDependenciesMarkdown(
        { packages: ['@vueuse/core', 'clsx', 'tailwind-merge', 'vue'] },
        storybook,
    );
}
export const indicatorApiCopy = {
    Indicator: {
        props: {
            class: 'Additional classes on the wrapper.',
            color: 'Semantic colour, current, or any CSS colour such as #a855f7 or var(--brand).',
            value: 'Optional number or text. Omit to show a dot; numeric zero remains visible by default.',
            icon: 'Optional Vue icon component; can be combined with value.',
            max: 'Optional upper cap for numeric values. max=99 displays 120 as 99+; strings are unchanged.',
            showZero: 'Show a numeric zero; false hides the indicator when value is 0.',
            size: 'sm, default or lg. Dot and content sizes adjust independently.',
            foreground:
                'Override the content colour. Semantic colours use theme foregrounds; opaque custom hex colours choose black or white automatically.',
            overlay: 'Position the indicator over the default slot instead of in the inline flow.',
            position:
                'One of nine overlay positions: top/center/bottom with left/center/right. Defaults to top-right.',
            offsetX:
                'Horizontal adjustment in pixels (number) or a CSS length; positive moves right.',
            offsetY: 'Vertical adjustment in pixels (number) or a CSS length; positive moves down.',
            visible: 'Hide only the indicator; the wrapped content remains mounted.',
            pulse: 'Pulse the background only; the label and cutout stay stable. Respects reduced motion.',
            ping: 'Animate an outward halo. Respects reduced motion.',
            cutout: 'Transparently mask the indicator shape out of the wrapped content; enabled by default for overlays.',
            cutoutGap:
                'Transparent spacing around the indicator in pixels; defaults to 2. Independent of all background colours.',
            ariaLabel:
                'Accessible meaning such as 5 unread messages. Without a label, a plain dot or icon is decorative; text and counts remain readable.',
            announce:
                'Announce changes politely using a status region. Supply ariaLabel for meaningful count/dot updates.',
        },
        slots: {
            default: 'The optional target: a button, icon, avatar or other content.',
            indicator:
                'Custom indicator content; receives value and displayValue (after the optional numeric cap).',
        },
    },
};
