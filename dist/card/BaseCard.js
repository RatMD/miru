import { defineComponent as n, useSlots as i, openBlock as s, createElementBlock as o, renderSlot as r, normalizeProps as a, guardReactiveProps as c, createElementVNode as d, toDisplayString as _, createCommentVNode as p } from "vue";
const m = { class: "card" }, h = {
  key: 0,
  class: "card-header"
}, u = { class: "card-title" }, f = { class: "card-content" }, k = {
  name: "BaseCard"
}, C = /* @__PURE__ */ n({
  ...k,
  props: {
    title: {}
  },
  setup(l) {
    const e = l;
    return i(), (t, v) => (s(), o("div", m, [
      t.$slots.header || e.title ? (s(), o("header", h, [
        r(t.$slots, "header", a(c(e)), () => [
          d("div", u, _(e.title), 1)
        ])
      ])) : p("", !0),
      d("article", f, [
        r(t.$slots, "default", a(c(e)))
      ])
    ]));
  }
});
export {
  C as default
};
