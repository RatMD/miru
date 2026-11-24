import type { VNode } from 'vue';
import { Comment, Fragment, createVNode, defineComponent, h, mergeProps } from 'vue';

function flatten(nodes: VNode[]): VNode[] {
    return nodes.flatMap((node) =>
        node.type === Fragment
            ? flatten(node.children as VNode[])
            : node.type === Comment
              ? []
              : [node],
    );
}

/** Merge anchor attributes and append the external icon inside a native/router link. */
export default defineComponent({
    inheritAttrs: false,
    setup(_, { attrs, slots }) {
        return () => {
            const [child, ...suffix] = flatten(slots.default?.() || []);
            if (!child) {
                return null;
            }
            const merged = mergeProps(attrs, child.props || {});
            if (!suffix.length) {
                return h(child, merged);
            }
            if (typeof child.type === 'string') {
                const node = createVNode(child.type, merged, [
                    ...(Array.isArray(child.children)
                        ? child.children
                        : typeof child.children === 'string'
                          ? [child.children]
                          : []),
                    ...suffix,
                ]);
                node.scopeId = child.scopeId;
                return node;
            }
            const content = child.children as { default?: () => VNode[] } | null;
            const node = createVNode(child.type, merged, {
                ...content,
                default: () => [...(content?.default?.() || []), ...suffix],
            });
            node.scopeId = child.scopeId;
            return node;
        };
    },
});
