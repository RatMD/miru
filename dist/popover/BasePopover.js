import { defineComponent as y, useSlots as m, ref as d, openBlock as r, createElementBlock as t, normalizeClass as c, renderSlot as s, normalizeProps as l, guardReactiveProps as a, normalizeStyle as w, createCommentVNode as n, createElementVNode as f, toDisplayString as _ } from "vue";
const h = { class: "popover-content" }, $ = { key: 0 }, k = { class: "popover-title" }, S = { key: 1 }, z = { key: 2 }, g = {
  name: "BasePopover"
}, P = /* @__PURE__ */ y({
  ...g,
  props: {
    title: {},
    arrow: { type: [Boolean, String] },
    arrowStyles: {},
    size: {}
  },
  setup(u, { expose: v }) {
    const e = u;
    m();
    const p = d(), i = d();
    return v({
      popover: p,
      arrow: i
    }), (o, B) => (r(), t("div", {
      ref_key: "popover",
      ref: p,
      class: c(["popover", [
        e.arrow != !1 ? "has-arrow" : null,
        e.size ? `popover-${e.size}` : null
      ]])
    }, [
      s(o.$slots, "popover", l(a(e)), () => [
        e.arrow != !1 ? (r(), t("div", {
          key: 0,
          ref_key: "arrow",
          ref: i,
          class: c(["popover-arrow", [typeof e.arrow == "string" ? `arrow-${e.arrow}` : ""]]),
          style: w(o.arrowStyles)
        }, null, 6)) : n("", !0),
        f("div", h, [
          s(o.$slots, "content", l(a(e)), () => [
            o.$slots.header || e.title ? (r(), t("header", $, [
              s(o.$slots, "header", l(a(e)), () => [
                f("div", k, _(e.title), 1)
              ])
            ])) : n("", !0),
            o.$slots.default ? (r(), t("article", S, [
              s(o.$slots, "default", l(a(e)))
            ])) : n("", !0),
            o.$slots.footer ? (r(), t("footer", z, [
              s(o.$slots, "footer", l(a(e)))
            ])) : n("", !0)
          ])
        ])
      ])
    ], 2));
  }
});
export {
  P as default
};
