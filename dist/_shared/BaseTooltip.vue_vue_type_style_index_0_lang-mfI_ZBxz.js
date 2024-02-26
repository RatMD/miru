import { defineComponent as s, useSlots as n, ref as a, openBlock as p, createElementBlock as c, normalizeClass as i, renderSlot as m, normalizeProps as _, guardReactiveProps as f, createElementVNode as u, toDisplayString as d } from "vue";
const k = {
  name: "BaseTooltip"
}, b = /* @__PURE__ */ s({
  ...k,
  props: {
    color: {},
    label: {}
  },
  setup(t, { expose: l }) {
    const o = t;
    n();
    const e = a();
    return l({
      tooltip: e
    }), (r, B) => (p(), c("div", {
      ref_key: "tooltip",
      ref: e,
      class: i(["tooltip", [
        o.color ? `tooltip-${o.color}` : ""
      ]])
    }, [
      m(r.$slots, "default", _(f(o)), () => [
        u("span", null, d(o.label), 1)
      ])
    ], 2));
  }
});
export {
  b as _
};
