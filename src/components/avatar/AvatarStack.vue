<script lang="ts">
import type { AvatarVariants } from './variants';
import type { HTMLAttributes, PropType, SlotsType, VNode } from 'vue';
import { cloneVNode, Comment, defineComponent, Fragment, h, Text } from 'vue';
import { cn } from '../../support/classNames';
import Avatar from './Avatar.vue';
import AvatarFallback from './AvatarFallback.vue';
import { avatarCutout } from './shapes';

type AvatarSize = NonNullable<AvatarVariants['size']>;
type AvatarShape = NonNullable<AvatarVariants['shape']>;

const sizes: Record<AvatarSize, number> = {
    xs: 1.25,
    sm: 1.5,
    default: 2,
    lg: 3,
    xl: 4,
};
const overlaps = { sm: 0.15, default: 0.25, lg: 0.4 };

/**
 * Flatten slot fragments so v-for children count individually and v-if comments do not count.
 * @param nodes Default-slot nodes containing avatars.
 * @returns The renderable avatar nodes in their original order.
 */
function flattenAvatars(nodes: VNode[]): VNode[] {
    return nodes.flatMap((node) => {
        if (node.type === Comment || node.type === Text) {
            return [];
        }

        if (node.type === Fragment) {
            return flattenAvatars((node.children ?? []) as VNode[]);
        }

        return [node];
    });
}

export default defineComponent({
    name: 'AvatarStack',
    inheritAttrs: false,
    slots: Object as SlotsType<{
        default: () => VNode[];
        overflow: (props: { count: number }) => VNode[];
    }>,
    props: {
        /** Default size for child avatars and the overflow indicator. */
        size: { type: String as PropType<AvatarSize>, default: 'default' },
        /** Default shape; an individual Avatar may override it. */
        shape: { type: String as PropType<AvatarShape>, default: 'round' },
        /** Maximum visible avatars; the additional +N indicator does not consume a place. */
        max: { type: Number, default: undefined },
        /** Overlap as a fraction of the stack's avatar size (0 to .75), or a named preset. */
        overlap: {
            type: [String, Number] as PropType<keyof typeof overlaps | number>,
            default: 'default',
        },
        /** Accessible name for the avatar group. */
        label: { type: String, default: undefined },
        class: { type: [String, Object, Array] as PropType<HTMLAttributes['class']> },
    },
    setup(props, { attrs, slots }) {
        return () => {
            const overlapRatio =
                typeof props.overlap === 'number'
                    ? Number.isFinite(props.overlap)
                        ? Math.max(0, Math.min(0.75, props.overlap))
                        : overlaps.default
                    : overlaps[props.overlap];
            const avatars = flattenAvatars(slots.default?.() ?? []);
            const maximum =
                props.max == null || !Number.isFinite(props.max)
                    ? avatars.length
                    : Math.max(0, Math.floor(props.max));
            const visible = avatars.slice(0, maximum);
            const hidden = avatars.length - visible.length;
            const items = visible.map((node, index) => {
                const shape = (node.props?.shape ?? props.shape) as AvatarShape;
                const size = (node.props?.size ?? props.size) as AvatarSize;
                const next = visible[index + 1];
                const hasNext = next !== undefined || hidden > 0;
                const nextShape = (next?.props?.shape ?? props.shape) as AvatarShape;
                const nextSize = (next?.props?.size ?? props.size) as AvatarSize;
                const overlap = sizes[props.size] * overlapRatio;

                return h(
                    'span',
                    {
                        key: node.key ?? index,
                        'data-slot': 'avatar-stack-item',
                        'data-cutout-shape': hasNext ? nextShape : undefined,
                        class: 'miru-avatar-stack-item relative inline-flex shrink-0',
                        style: hasNext
                            ? {
                                  '--miru-avatar-next-size': `${sizes[nextSize]}rem`,
                                  '--miru-avatar-next-x-ltr': `${sizes[size] - overlap}rem`,
                                  '--miru-avatar-next-x-rtl': `${overlap - sizes[nextSize]}rem`,
                                  '--miru-avatar-next-y': `${(sizes[size] - sizes[nextSize]) / 2}rem`,
                                  '--miru-avatar-cutout-ltr': avatarCutout(
                                      nextShape,
                                      sizes[size],
                                      sizes[nextSize],
                                      overlap,
                                  ),
                                  '--miru-avatar-cutout-rtl': avatarCutout(
                                      nextShape,
                                      sizes[size],
                                      sizes[nextSize],
                                      overlap,
                                      true,
                                  ),
                              }
                            : undefined,
                    },
                    [cloneVNode(node, { size: node.props?.size ?? props.size, shape })],
                );
            });

            if (hidden > 0) {
                items.push(
                    h(
                        'span',
                        {
                            key: 'overflow',
                            'data-slot': 'avatar-stack-overflow',
                            class: 'miru-avatar-stack-item relative inline-flex shrink-0',
                        },
                        [
                            h(
                                Avatar,
                                { size: props.size, shape: props.shape, tone: 'ghostly' },
                                {
                                    default: () =>
                                        h(AvatarFallback, null, {
                                            default: () =>
                                                slots.overflow?.({ count: hidden }) ?? `+${hidden}`,
                                        }),
                                },
                            ),
                        ],
                    ),
                );
            }

            return h(
                'div',
                {
                    ...attrs,
                    'data-slot': 'avatar-stack',
                    role: 'group',
                    'aria-label': props.label,
                    class: cn('isolate inline-flex w-fit items-center', props.class),
                    style: [
                        {
                            '--miru-avatar-stack-size': `${sizes[props.size]}rem`,
                            '--miru-avatar-stack-overlap': overlapRatio,
                        },
                        attrs.style,
                    ],
                },
                items,
            );
        };
    },
});
</script>
